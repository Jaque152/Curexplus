import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { QuoteRequestPayload, FormApiResponse } from "@/types/forms";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request): Promise<NextResponse<FormApiResponse>> {
  try {
    const rawText = await request.text();
    if (!rawText) {
      return NextResponse.json({ success: false, error: "Petición vacía." }, { status: 400 });
    }

    const body: QuoteRequestPayload = JSON.parse(rawText);
    const {
      firstName,
      lastName,
      company = "Particular",
      email,
      phone,
      subject,
      message,
      lang = "es",
    } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: lang === "es" ? "Faltan campos obligatorios." : "Missing required fields." },
        { status: 400 }
      );
    }

    const adminEmail = "atencion@curexplus.com";
    const isEs = lang === "es";

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        // 1. Confirmación al Cliente
        resend.emails.send({
          from: `Curexplus <${adminEmail}>`,
          to: email,
          subject: isEs ? `Solicitud de cotización recibida: ${subject}` : `Quote request received: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 12px;">
              <div style="background-color: #0f2e26; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Curexplus</h1>
                <p style="color: #a3e635; margin: 5px 0 0; font-size: 14px;">${isEs ? "División de Proyectos y Cotizaciones" : "Projects & Quotes Division"}</p>
              </div>
              <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
                <h2 style="color: #111827; font-size: 20px; margin-top: 0;">${isEs ? `¡Gracias por tu solicitud, ${firstName}!` : `Thank you for your request, ${firstName}!`}</h2>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                  ${isEs 
                    ? "Hemos registrado tu solicitud de cotización. Nuestro equipo técnico comercial analizará las especificaciones y te contactará con una propuesta formal en menos de 24 horas hábiles." 
                    : "We have registered your quote request. Our commercial technical team will analyze the specifications and contact you with a formal proposal within 24 business hours."}
                </p>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
                  <p style="margin: 0; font-size: 13px; color: #111827;"><strong>${isEs ? "Asunto:" : "Subject:"}</strong> ${subject}</p>
                  <p style="margin: 6px 0 0; font-size: 13px; color: #111827;"><strong>${isEs ? "Institución / Empresa:" : "Institution / Company:"}</strong> ${company}</p>
                  <p style="margin: 10px 0 0; font-size: 13px; color: #4b5563; font-style: italic;">"${message || (isEs ? "Sin observaciones específicas" : "No specific observations")}"</p>
                </div>
              </div>
            </div>`,
        }),

        // 2. Alerta de Oportunidad de Venta al Admin
        resend.emails.send({
          from: `Sistema Curexplus <${adminEmail}>`,
          to: adminEmail,
          subject: `📋 SOLICITUD DE COTIZACIÓN: ${subject} (${company})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #0f2e26; margin-top: 0;">Nueva Solicitud de Cotización Formal</h2>
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px;"><strong>Cliente:</strong> ${firstName} ${lastName}</p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Empresa / Institución:</strong> ${company}</p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Asunto:</strong> <span style="background-color: #0f2e26; color: #ffffff; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${subject}</span></p>
              </div>
              <h3 style="font-size: 16px; color: #111827;">Especificaciones del Proyecto:</h3>
              <p style="font-size: 14px; color: #374151; background-color: #ffffff; padding: 14px; border: 1px solid #d1d5db; border-radius: 6px; white-space: pre-line;">
                ${message || "No se adjuntó descripción adicional."}
              </p>
            </div>`,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error interno al enviar cotización.";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}