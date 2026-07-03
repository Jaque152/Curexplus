import { NextResponse } from "next/server";
import { Resend } from "resend";
import type {
  CheckoutRequestPayload,
  CheckoutApiResponse,
  EtominSigninResponse,
  EtominTokenizerResponse,
  EtominSaleResponse,
  CheckoutItemPayload,
} from "@/types/checkout";

const resend = new Resend(process.env.RESEND_API_KEY);

const formatMXN = (val: number, lang: "es" | "en"): string =>
  new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-US", {
    style: "currency",
    currency: "MXN",
  }).format(val);

export async function POST(
  request: Request
): Promise<NextResponse<CheckoutApiResponse>> {
  try {
    const rawBodyText = await request.text();
    if (!rawBodyText) {
      return NextResponse.json(
        { success: false, error: "El cuerpo de la petición está vacío." },
        { status: 400 }
      );
    }

    const body: CheckoutRequestPayload = JSON.parse(rawBodyText);
    const {
      amount,
      subtotal,
      iva,
      reference,
      lang = "es",
      customerInformation,
      cardInformation,
      items,
    } = body;

    const etominEmail = process.env.ETOMIN_EMAIL;
    const etominPassword = process.env.ETOMIN_PASSWORD;
    const etominApiUrl =
      process.env.ETOMIN_API_URL || "https://pagos.etomin.com/api/v1";

    if (!etominEmail || !etominPassword) {
      return NextResponse.json(
        {
          success: false,
          error:
            lang === "es"
              ? "Credenciales de Etomin no configuradas en el servidor (.env.local)."
              : "Etomin API credentials missing on server.",
        },
        { status: 500 }
      );
    }

    if (!cardInformation || !cardInformation.cardNumber) {
      return NextResponse.json(
        {
          success: false,
          error:
            lang === "es"
              ? "Faltan los datos bancarios de la tarjeta."
              : "Missing credit card details.",
        },
        { status: 400 }
      );
    }

    const baseHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    };

    // 1. SIGNIN ETOMIN
    const signinRes = await fetch(`${etominApiUrl}/signin`, {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({ email: etominEmail, password: etominPassword }),
    });

    const signinText = await signinRes.text();
    let signinData: EtominSigninResponse = {};
    try {
      signinData = signinText ? JSON.parse(signinText) : {};
    } catch {
      return NextResponse.json(
        { success: false, error: "Etomin /signin devolvió una respuesta inválida." },
        { status: 502 }
      );
    }

    if (!signinData.authToken) {
      return NextResponse.json(
        {
          success: false,
          error: signinData.message || signinData.error || "Error de autenticación con Etomin.",
        },
        { status: 401 }
      );
    }

    const authToken = signinData.authToken;
    const authHeaders = { ...baseHeaders, Authorization: `Bearer ${authToken}` };

    // 2. TOKENIZAR TARJETA
    const tokenizerRes = await fetch(`${etominApiUrl}/card/tokenizer`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        cardData: {
          cardNumber: cardInformation.cardNumber.replace(/\D/g, ""),
          cardholderName: cardInformation.cardholderName,
          expirationMonth: cardInformation.expirationMonth,
          expirationYear: cardInformation.expirationYear,
        },
      }),
    });

    const tokenizerText = await tokenizerRes.text();
    let tokenizerData: EtominTokenizerResponse = {};
    try {
      tokenizerData = tokenizerText ? JSON.parse(tokenizerText) : {};
    } catch {
      return NextResponse.json(
        { success: false, error: "Error de formato al tokenizar la tarjeta." },
        { status: 502 }
      );
    }

    if (!tokenizerData.cardNumberToken) {
      return NextResponse.json(
        {
          success: false,
          error: tokenizerData.message || tokenizerData.error || "No se pudo tokenizar la tarjeta.",
        },
        { status: 400 }
      );
    }

    // 3. PROCESAR VENTA
    const salePayload = {
      amount: Number(amount.toFixed(2)),
      currency: 484, // MXN
      reference: reference,
      customerInformation: {
        firstName: customerInformation.firstName,
        lastName: customerInformation.lastName,
        middleName: "",
        email: customerInformation.email,
        phone1: customerInformation.phone1,
        city: customerInformation.city,
        address1: customerInformation.address1,
        postalCode: customerInformation.postalCode,
        state: customerInformation.state,
        country: "MX",
        ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      },
      cardData: {
        cardNumberToken: tokenizerData.cardNumberToken,
        cvv: cardInformation.cvv,
      },
      items: items.map((i) => ({
        id: String(i.id),
        title: i.title,
        amount: Number(i.amount.toFixed(2)),
        quantity: i.quantity,
      })),
      redirectUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://curexplus.com.mx/checkout",
    };

    const saleRes = await fetch(`${etominApiUrl}/sale`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(salePayload),
    });

    const saleText = await saleRes.text();
    let saleData: EtominSaleResponse = {};
    try {
      saleData = saleText ? JSON.parse(saleText) : {};
    } catch {
      return NextResponse.json(
        { success: false, error: "El banco devolvió una respuesta ilegible al procesar el cobro." },
        { status: 502 }
      );
    }

    const statusUpper = (saleData.status || "").toUpperCase();
    if (!saleRes.ok || (statusUpper !== "APPROVED" && statusUpper !== "SUCCESS")) {
      const errorMsg =
        saleData.message ||
        saleData.error ||
        (lang === "es"
          ? `El pago no pudo procesarse. Estado: ${saleData.status || "DECLINADO"}`
          : `Payment could not be processed. Status: ${saleData.status || "DECLINED"}`);
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: saleRes.status || 400 }
      );
    }

    const transactionId = saleData.transactionId || reference;
    const authorizationNumber = saleData.authorizationNumber || "AUT-OK";

    // 4. ENVÍO DE CORREOS CON RESEND (MANEJO DE ERRORES REAL)
    if (process.env.RESEND_API_KEY) {
      const isEs = lang === "es";
      const adminEmail =  "atencion@curexplus.com";
      const customerEmail = customerInformation.email;

      const itemsHtmlTable = items
        .map(
          (item: CheckoutItemPayload) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px;">
            <strong>${item.title}</strong><br/>
            <span style="color: #6b7280; font-size: 12px;">${isEs ? "Cantidad:" : "Quantity:"} ${item.quantity}</span>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-size: 14px; font-weight: bold;">
            ${formatMXN(item.amount * item.quantity, lang)}
          </td>
        </tr>`
        )
        .join("");

      try {
        console.log(`[Resend] Intentando enviar correo al cliente: ${customerEmail} desde ${adminEmail}`);
        
        const clientEmailRes = await resend.emails.send({
          from: `Curexplus <${adminEmail}>`,
          to: customerEmail,
          subject: isEs
            ? `Confirmación de compra — Curexplus`
            : `Order Confirmation — Curexplus`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 12px;">
              <div style="background-color: #0f2e26; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Curexplus</h1>
                <p style="color: #a3e635; margin: 5px 0 0; font-size: 14px;">${isEs ? "Equipamiento médico y clínico" : "Medical & Clinical Equipment"}</p>
              </div>
              <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
                <h2 style="color: #111827; font-size: 20px; margin-top: 0;">${isEs ? `¡Hola, ${customerInformation.firstName}!` : `Hello, ${customerInformation.firstName}!`}</h2>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.5;">
                  ${isEs ? `Tu compra ha sido procesada exitosamente. Autorización: <strong style="color: #0f2e26;">${authorizationNumber}</strong>.` : `Your purchase has been successfully processed. Auth number: <strong style="color: #0f2e26;">${authorizationNumber}</strong>.`}
                </p>
                <h3 style="color: #111827; font-size: 16px; border-bottom: 2px solid #0f2e26; padding-bottom: 8px; margin-top: 24px;">${isEs ? "Desglose de compra" : "Order Summary"}</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tbody>${itemsHtmlTable}</tbody>
                  <tfoot>
                    <tr><td style="padding: 8px 10px; color: #6b7280; font-size: 14px;">Subtotal:</td><td style="padding: 8px 10px; text-align: right; color: #111827; font-size: 14px;">${formatMXN(subtotal, lang)}</td></tr>
                    <tr><td style="padding: 8px 10px; color: #6b7280; font-size: 14px;">${isEs ? "IVA (16%):" : "Tax (16%):"}</td><td style="padding: 8px 10px; text-align: right; color: #111827; font-size: 14px;">${formatMXN(iva, lang)}</td></tr>
                    <tr><td style="padding: 12px 10px; font-weight: bold; color: #0f2e26; font-size: 16px; border-top: 1px dashed #d1d5db;">Total:</td><td style="padding: 12px 10px; text-align: right; font-weight: bold; color: #0f2e26; font-size: 18px; border-top: 1px dashed #d1d5db;">${formatMXN(amount, lang)}</td></tr>
                  </tfoot>
                </table>
              </div>
            </div>`,
        });

        if (clientEmailRes.error) {
          console.error("[Resend Error Cliente]:", clientEmailRes.error);
        } else {
          console.log("[Resend Éxito Cliente ID]:", clientEmailRes.data?.id);
        }

        console.log(`[Resend] Intentando enviar correo al admin: ${adminEmail}`);
        const adminEmailRes = await resend.emails.send({
          from: `Sistema Curexplus <${adminEmail}>`,
          to: adminEmail,
          subject: `🚨 ¡NUEVA VENTA! Autorización: ${authorizationNumber} (${formatMXN(amount, "es")})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #0f2e26; margin-top: 0;">¡Nueva venta aprobada!</h2>
              <p style="font-size: 14px; color: #374151;">Se cobró una orden mediante <strong>Tarjeta Bancaria</strong>.</p>
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px;"><strong>ID Transacción:</strong> ${transactionId}</p>
                <p style="margin: 5px 0 0; font-size: 14px;"><strong>Autorización:</strong> ${authorizationNumber}</p>
                <p style="margin: 5px 0 0; font-size: 14px;"><strong>Cliente:</strong> ${customerInformation.firstName} ${customerInformation.lastName} (${customerInformation.email})</p>
                <p style="margin: 5px 0 0; font-size: 14px;"><strong>Teléfono:</strong> ${customerInformation.phone1}</p>
              </div>
              <h3 style="font-size: 16px; color: #111827;">Artículos:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">${itemsHtmlTable}</table>
            </div>`,
        });

        if (adminEmailRes.error) {
          console.error("[Resend Error Admin]:", adminEmailRes.error);
        } else {
          console.log("[Resend Éxito Admin ID]:", adminEmailRes.data?.id);
        }
      } catch (emailErr) {
        console.error("[Resend Excepción Crítica]:", emailErr);
      }
    } else {
      console.warn("[Resend] Variable RESEND_API_KEY no configurada.");
    }

    return NextResponse.json({
      success: true,
      status: statusUpper,
      reference: reference,
      transactionId: transactionId,
      authorizationNumber: authorizationNumber,
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "Error interno del servidor al procesar el pago.";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}