import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { ContactRequestPayload, FormApiResponse } from "@/types/forms";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request): Promise<NextResponse<FormApiResponse>> {
  try {
    const rawText = await request.text();
    if (!rawText) {
      return NextResponse.json({ success: false, error: "Petición vacía." }, { status: 400 });
    }

    const body: ContactRequestPayload = JSON.parse(rawText);
    const { name, email, phone = "No especificado", message, lang = "es" } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: lang === "es" ? "Faltan campos obligatorios." : "Missing required fields." },
        { status: 400 }
      );
    }

    const adminEmail = "atencion@curexplus.com";
    const isEs = lang === "es";

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        // 1. Correo de confirmación al Cliente
        resend.emails.send({
          from: `Curexplus <${adminEmail}>`,
          to: email,
          subject: isEs ? "Hemos recibido tu mensaje — Curexplus" : "We received your message — Curexplus",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 12px;">
              <div style="background-color: #0f2e26; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Curexplus</h1>
                <p style="color: #a3e635; margin: 5px 0 0; font-size: 14px;">${isEs ? "Equipamiento médico y clínico" : "Medical & Clinical Equipment"}</p>
              </div>
              <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
                <h2 style="color: #111827; font-size: 20px; margin-top: 0;">${isEs ? `¡Hola, ${name}!` : `Hello, ${name}!`}</h2>
                <p style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                  ${isEs 
                    ? "Hemos recibido tu mensaje correctamente. Nuestro equipo técnico revisará tu consulta y se pondrá en contacto contigo a la brevedad." 
                    : "We have successfully received your message. Our technical team will review your inquiry and get back to you shortly."}
                </p>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 20px;">
                  <p style="margin: 0; font-size: 12px; color: #6b7280; text-transform: uppercase;">${isEs ? "Mensaje enviado:" : "Sent message:"}</p>
                  <p style="margin: 8px 0 0; font-size: 14px; color: #111827; font-style: italic;">"${message || (isEs ? "Sin mensaje adicional" : "No message provided")}"</p>
                </div>
              </div>
            </div>`,
        }),

        // 2. Notificación al Administrador
        resend.emails.send({
          from: `Sistema Curexplus <${adminEmail}>`,
          to: adminEmail,
          subject: `💬 Nuevo mensaje de contacto: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #0f2e26; margin-top: 0;">Nuevo lead desde Formulario de Contacto</h2>
              <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 14px;"><strong>Nombre:</strong> ${name}</p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
                <p style="margin: 8px 0 0; font-size: 14px;"><strong>Idioma:</strong> ${lang.toUpperCase()}</p>
              </div>
              <h3 style="font-size: 16px; color: #111827;">Mensaje del cliente:</h3>
              <p style="font-size: 14px; color: #374151; background-color: #ffffff; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;">
                ${message || "No escribió mensaje."}
              </p>
            </div>`,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Error interno al enviar correo.";
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}