"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import type { FormApiResponse } from "@/types/forms";

const MAX = 180;

export function ContactForm({ className }: { className?: string }) {
  const { t, lang } = useLanguage();
  
  // Estados del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Estados de control de la API
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!name.trim()) next.name = t.forms.contact.errName;
    if (!email.trim()) next.email = t.forms.contact.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = t.forms.contact.errEmailInvalid;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate() || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, lang }),
      });

      const data: FormApiResponse = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || (lang === "es" ? "No se pudo enviar el mensaje." : "Could not send the message."));
      }

      // Éxito: Activamos el estado 'sent' para renderizar la vista de éxito inline
      setSent(true);
      
      // Limpiamos los campos
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al conectar con el servidor.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================================
  // VISTA DE ÉXITO INLINE (Reemplaza la burbuja flotante de abajo)
  // =========================================================================
  if (sent) {
    return (
      <div className={cn("flex flex-col items-center justify-center text-center py-8 px-4 animate-fadeIn", className)}>
        <div className="grid h-16 w-16 place-items-center rounded-full bg-pine/10 text-pine">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl text-ink">
          {t.forms.contact.toastSuccess || "¡Mensaje recibido!"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {t.forms.contact.toastDesc || "Nuestro equipo revisará tu consulta y te responderá a la brevedad."}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-xs font-semibold uppercase tracking-wider text-pine hover:underline"
        >
          {lang === "es" ? "Enviar otro mensaje" : "Send another message"}
        </button>
      </div>
    );
  }

  // =========================================================================
  // RENDER DEL FORMULARIO
  // =========================================================================
  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", className)} noValidate>
      
      {/* Alerta de Error de la API en el Servidor */}
      {apiError && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs font-medium text-destructive">
          ⚠️ <strong>Error de envío:</strong> {apiError}
        </div>
      )}

      <Field label={t.forms.contact.name} required error={errors.name}>
        <input
          value={name}
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.forms.contact.namePh}
          className="input-line disabled:opacity-50"
        />
      </Field>

      <Field label={t.forms.contact.email} required error={errors.email}>
        <input
          type="email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.forms.contact.emailPh}
          className="input-line disabled:opacity-50"
        />
      </Field>

      <Field label={t.forms.contact.phone}>
        <input
          value={phone}
          disabled={loading}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t.forms.contact.phonePh}
          className="input-line disabled:opacity-50"
        />
      </Field>

      <Field label={t.forms.contact.message} hint={`${message.length} / ${MAX}`}>
        <textarea
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
          rows={4}
          placeholder={t.forms.contact.messagePh}
          className="input-line resize-none disabled:opacity-50"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "group inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-clay/90 disabled:opacity-70 sm:w-auto"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {lang === "es" ? "Enviando..." : "Sending..."}
          </>
        ) : (
          <>
            {t.forms.contact.btnSubmit}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm font-medium text-ink">
        <span>
          {label} {required && <span className="text-clay">*</span>}
        </span>
        {hint && (
          <span className="text-xs font-normal text-muted-foreground">{hint}</span>
        )}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}