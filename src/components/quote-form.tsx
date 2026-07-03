"use client";

import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import type { FormApiResponse } from "@/types/forms";

const MAX = 280;

export function QuoteForm() {
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (t.forms.quote.subjects && t.forms.quote.subjects.length > 0) {
      setForm((prev) => ({ ...prev, subject: t.forms.quote.subjects[0] }));
    }
  }, [t.forms.quote.subjects]);

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const next: Record<string, boolean> = {};
    (["firstName", "lastName", "email", "phone"] as const).forEach((k) => {
      if (!form[k].trim()) next[k] = true;
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });

      const data: FormApiResponse = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "No se pudo enviar la solicitud.");
      }

      setSent(true);
      toast.success(t.forms.quote.toastSuccess, {
        description: t.forms.quote.toastDesc,
      });
      setForm({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        subject: t.forms.quote.subjects[0],
        message: "",
      });
      setTimeout(() => setSent(false), 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al enviar cotización.";
      toast.error(lang === "es" ? "Error" : "Error", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.forms.quote.firstName} required error={errors.firstName}>
          <input
            className="input-box disabled:opacity-50"
            disabled={loading}
            value={form.firstName}
            onChange={set("firstName")}
            placeholder={t.forms.quote.firstName}
          />
        </Field>
        <Field label={t.forms.quote.lastName} required error={errors.lastName}>
          <input
            className="input-box disabled:opacity-50"
            disabled={loading}
            value={form.lastName}
            onChange={set("lastName")}
            placeholder={t.forms.quote.lastName}
          />
        </Field>
        <Field label={t.forms.quote.company}>
          <input
            className="input-box disabled:opacity-50"
            disabled={loading}
            value={form.company}
            onChange={set("company")}
            placeholder={t.forms.quote.optional}
          />
        </Field>
        <Field label={t.forms.quote.email} required error={errors.email}>
          <input
            type="email"
            className="input-box disabled:opacity-50"
            disabled={loading}
            value={form.email}
            onChange={set("email")}
            placeholder={t.forms.contact.emailPh}
          />
        </Field>
        <Field label={t.forms.quote.phone} required error={errors.phone}>
          <input
            className="input-box disabled:opacity-50"
            disabled={loading}
            value={form.phone}
            onChange={set("phone")}
            placeholder={t.forms.contact.phonePh}
          />
        </Field>
        <Field label={t.forms.quote.subject}>
          <select
            className="input-box disabled:opacity-50"
            disabled={loading}
            value={form.subject}
            onChange={set("subject")}
          >
            {t.forms.quote.subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t.forms.quote.message} hint={`${form.message.length} / ${MAX}`}>
        <textarea
          className="input-box resize-none disabled:opacity-50"
          rows={4}
          disabled={loading}
          value={form.message}
          onChange={(e) =>
            setForm((f) => ({ ...f, message: e.target.value.slice(0, MAX) }))
          }
          placeholder={t.forms.quote.messagePh}
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-all sm:w-auto disabled:opacity-70",
          sent ? "bg-pine text-paper" : "bg-clay text-paper hover:bg-clay/90"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {lang === "es" ? "Enviando..." : "Sending..."}
          </>
        ) : sent ? (
          <>
            <Check className="h-4 w-4" /> {t.forms.quote.btnSent}
          </>
        ) : (
          <>
            {t.forms.quote.btnSubmit}
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
  error?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink">
        <span>
          {label} {required && <span className="text-clay">*</span>}
        </span>
        {hint && (
          <span className="text-xs font-normal text-muted-foreground">{hint}</span>
        )}
      </span>
      <span
        className={cn(
          "block",
          error && "[&_.input-box]:border-destructive [&_.input-box]:ring-destructive/15"
        )}
      >
        {children}
      </span>
    </label>
  );
}