"use client";

import Link from "next/link";
import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import { getProductBySlug } from "@/lib/products";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  CheckoutRequestPayload,
  CheckoutApiResponse,
  CheckoutItemPayload,
} from "@/types/checkout";

interface FormState {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
  rfc: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  cardName: string;
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
}

const MX_STATES: string[] = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México",
  "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit",
  "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí",
  "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];

export default function CheckoutPage() {
  const { items, subtotal, iva, total, count, clear } = useCart();
  const { t, lang } = useLanguage();

  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    company: "",
    rfc: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    cardName: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  const [errors, setErrors] = useState<Record<keyof FormState, boolean>>(
    {} as Record<keyof FormState, boolean>
  );

  const handleInputChange =
    (k: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value = e.target.value;

      if (k === "cardName") {
        value = value.toUpperCase();
      } else if (k === "cardNumber") {
        // Máximo 16 dígitos separados por espacio cada 4
        const digits = value.replace(/\D/g, "").slice(0, 16);
        value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
      } else if (k === "cardExp") {
        // Formato MM/AA o MM/YY
        const digits = value.replace(/\D/g, "").slice(0, 4);
        if (digits.length >= 3) {
          value = `${digits.slice(0, 2)}/${digits.slice(2)}`;
        } else {
          value = digits;
        }
      } else if (k === "cardCvc") {
        value = value.replace(/\D/g, "").slice(0, 4);
      }

      setForm((prev) => ({ ...prev, [k]: value }));
    };

  const requiredFields: (keyof FormState)[] = [
    "email",
    "phone",
    "firstName",
    "lastName",
    "address",
    "city",
    "state",
    "zip",
    "cardName",
    "cardNumber",
    "cardExp",
    "cardCvc",
  ];

  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setApiError(null);
    const nextErrors = {} as Record<keyof FormState, boolean>;

    requiredFields.forEach((k) => {
      if (!form[k].trim()) nextErrors[k] = true;
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = true;
    }

    const rawCardNum = form.cardNumber.replace(/\s/g, "");
    if (rawCardNum.length !== 16) {
      nextErrors.cardNumber = true;
    }

    if (!form.cardExp.includes("/") || form.cardExp.length !== 5) {
      nextErrors.cardExp = true;
    }

    if (form.cardCvc.length < 3) {
      nextErrors.cardCvc = true;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      document
        .getElementById("checkout-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setLoading(true);

    const [expMonth = "12", expYear = "28"] = form.cardExp
      .split("/")
      .map((s) => s.trim());

    const itemsPayload: CheckoutItemPayload[] = items.map((item) => ({
      id: item.id,
      title: item.name,
      amount: item.price,
      quantity: item.quantity,
    }));

    const payload: CheckoutRequestPayload = {
      amount: Number(total.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
      iva: Number(iva.toFixed(2)),
      currency: 484,
      reference: `CRX-${Date.now()}`,
      lang: lang,
      customerInformation: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone1: form.phone,
        city: form.city,
        address1: form.address,
        postalCode: form.zip,
        state: form.state,
        country: "MX",
      },
      cardInformation: {
        cardNumber: rawCardNum,
        cardholderName: form.cardName,
        expirationMonth: expMonth,
        expirationYear: expYear,
        cvv: form.cardCvc,
      },
      items: itemsPayload,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let data: CheckoutApiResponse = { success: false };

      try {
        if (rawText) data = JSON.parse(rawText);
      } catch {
        throw new Error(
          lang === "es"
            ? "El servidor bancario devolvió una respuesta inesperada."
            : "Payment gateway returned an unexpected response."
        );
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            (lang === "es"
              ? "No fue posible procesar el pago con tu tarjeta."
              : "Unable to process payment.")
        );
      }

      setPlacedOrderId(
        data.transactionId || data.reference || payload.reference
      );
      clear();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : lang === "es"
          ? "Ocurrió un error inesperado al conectar con el servidor."
          : "An unexpected error occurred.";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  if (placedOrderId) {
    return (
      <section className="min-h-[70vh] bg-bone pt-32 pb-24">
        <div className="container-tight">
          <div className="mx-auto max-w-xl rounded-[1.75rem] border border-sand bg-paper p-8 text-center shadow-card sm:p-12">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-pine/10 text-pine">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="mt-6 font-display text-3xl text-ink">
              {t.checkoutPage?.successTitle || "¡Pedido recibido exitosamente!"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {t.checkoutPage?.successDesc ||
                "Gracias por tu compra. Hemos despachado tu recibo por correo electrónico."}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-deep"
              >
                {t.checkoutPage?.btnContinue || "Seguir comprando"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-pine/20 px-7 py-3.5 text-sm font-medium text-pine transition-colors hover:bg-bone"
              >
                {t.checkoutPage?.btnHome || "Volver al inicio"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] bg-bone pt-32 pb-24">
        <div className="container-tight flex flex-col items-center justify-center gap-6 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-sand/60 text-pine">
            <ShoppingBag className="h-9 w-9" />
          </div>
          <div>
            <h1 className="font-display text-3xl text-ink">
              {t.checkoutPage?.emptyTitle || "Tu carrito está vacío"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t.checkoutPage?.emptyDesc ||
                "Agrega productos al carrito para proceder al pago."}
            </p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-deep"
          >
            {t.checkoutPage?.btnStore || "Explorar catálogo"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-bone pt-28 pb-20 sm:pt-32">
      <div className="container-wide">
        <Link
          href="/carrito"
          className="inline-flex items-center gap-2 text-sm font-medium text-pine hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.checkoutPage?.backToCart || "Volver al carrito"}
        </Link>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {t.checkoutPage?.title || "Finalizar compra"}
        </h1>

        {apiError && (
          <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive">
            ⚠️ {apiError}
          </div>
        )}

        <form
          id="checkout-form"
          onSubmit={onSubmit}
          className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10"
          noValidate
        >
          <div className="space-y-8 lg:col-span-7 xl:col-span-8">
            <FormCard
              step="1"
              title={t.checkoutPage?.step1Title || "Datos de contacto"}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldBox
                  label={t.checkoutPage?.emailLabel || "Correo electrónico"}
                  required
                  error={errors.email}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <input
                    className="input-box"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange("email")}
                    placeholder={
                      t.checkoutPage?.emailPh || "nombre@institucion.com"
                    }
                  />
                </FieldBox>
                <FieldBox
                  label={t.checkoutPage?.phoneLabel || "Teléfono"}
                  required
                  error={errors.phone}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <input
                    className="input-box"
                    value={form.phone}
                    onChange={handleInputChange("phone")}
                    placeholder={t.checkoutPage?.phonePh || "+52 55 0000 0000"}
                  />
                </FieldBox>
              </div>
            </FormCard>

            <FormCard
              step="2"
              title={
                t.checkoutPage?.step2Title || "Datos de envío y facturación"
              }
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldBox
                  label={t.checkoutPage?.firstNameLabel || "Nombre"}
                  required
                  error={errors.firstName}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <input
                    className="input-box"
                    value={form.firstName}
                    onChange={handleInputChange("firstName")}
                    placeholder={t.checkoutPage?.firstNamePh || "Nombre"}
                  />
                </FieldBox>
                <FieldBox
                  label={t.checkoutPage?.lastNameLabel || "Apellidos"}
                  required
                  error={errors.lastName}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <input
                    className="input-box"
                    value={form.lastName}
                    onChange={handleInputChange("lastName")}
                    placeholder={t.checkoutPage?.lastNamePh || "Apellidos"}
                  />
                </FieldBox>
                <FieldBox
                  label={
                    t.checkoutPage?.companyLabel || "Institución / Empresa"
                  }
                >
                  <input
                    className="input-box"
                    value={form.company}
                    onChange={handleInputChange("company")}
                    placeholder={t.checkoutPage?.companyPh || "Opcional"}
                  />
                </FieldBox>
                <FieldBox label={t.checkoutPage?.rfcLabel || "RFC"}>
                  <input
                    className="input-box"
                    value={form.rfc}
                    onChange={handleInputChange("rfc")}
                    placeholder={t.checkoutPage?.rfcPh || "Para facturación"}
                  />
                </FieldBox>
                <div className="sm:col-span-2">
                  <FieldBox
                    label={t.checkoutPage?.addressLabel || "Dirección"}
                    required
                    error={errors.address}
                    errorMessage={t.checkoutPage?.requiredError}
                  >
                    <input
                      className="input-box"
                      value={form.address}
                      onChange={handleInputChange("address")}
                      placeholder={
                        t.checkoutPage?.addressPh ||
                        "Calle, número exterior e interior, colonia"
                      }
                    />
                  </FieldBox>
                </div>
                <FieldBox
                  label={t.checkoutPage?.cityLabel || "Ciudad"}
                  required
                  error={errors.city}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <input
                    className="input-box"
                    value={form.city}
                    onChange={handleInputChange("city")}
                    placeholder={t.checkoutPage?.cityPh || "Ciudad"}
                  />
                </FieldBox>
                <FieldBox
                  label={t.checkoutPage?.stateLabel || "Estado"}
                  required
                  error={errors.state}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <select
                    className="input-box"
                    value={form.state}
                    onChange={handleInputChange("state")}
                  >
                    <option value="">
                      {t.checkoutPage?.selectState || "Selecciona tu estado…"}
                    </option>
                    {MX_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </FieldBox>
                <FieldBox
                  label={t.checkoutPage?.zipLabel || "Código postal"}
                  required
                  error={errors.zip}
                  errorMessage={t.checkoutPage?.requiredError}
                >
                  <input
                    className="input-box"
                    value={form.zip}
                    onChange={handleInputChange("zip")}
                    placeholder={t.checkoutPage?.zipPh || "C.P."}
                  />
                </FieldBox>
              </div>
            </FormCard>

            <FormCard
              step="3"
              title={t.checkoutPage?.step3Title || "Método de pago"}
            >
              <div className="space-y-4">
                {/* Cabecera Única: Tarjeta de Crédito/Débito y Logo Etomin */}
                <div className="flex w-full items-center justify-between rounded-2xl border border-pine bg-pine/[0.04] p-4 ring-4 ring-pine/10">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-pine text-paper">
                      <CreditCard className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="block font-medium text-ink">
                        {lang === "es"
                          ? "Tarjeta de Crédito / Débito"
                          : "Credit / Debit Card"}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {lang === "es"
                          ? "Procesado en tiempo real vía Etomin."
                          : "Processed securely in real-time via Etomin."}
                      </span>
                    </div>
                  </div>
                  {/* IMAGEN DEL LOGO DE ETOMIN EN /public */}
                  <img
                    src="/etomin_logo.svg"
                    alt="Etomin"
                    className="h-7 w-auto shrink-0"
                  />
                </div>

                <div className="grid gap-4 rounded-2xl border border-pine/20 bg-pine/[0.02] p-5 sm:grid-cols-2">
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2 border-b border-sand pb-3.5">
                    {/* IMAGEN DEL SELLO SEGURO EN /public */}
                    <div className="flex items-center gap-2">
                      <img
                        src="/etomin_secbadge.svg"
                        alt="Secure SSL"
                        className="h-5 w-auto"
                      />
                      <span className="text-xs font-semibold text-pine">
                        {lang === "es"
                          ? "Pago 100% Seguro · Etomin SSL"
                          : "100% Secure Payment · Etomin SSL"}
                      </span>
                    </div>
                    <span className="text-[0.72rem] font-medium text-muted-foreground">
                      {lang === "es"
                        ? "Tarjetas 16 dígitos"
                        : "16-digit cards only"}
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <FieldBox
                      label={
                        t.checkoutPage?.cardNameLabel ||
                        "Titular de la tarjeta (Mayúsculas)"
                      }
                      required
                      error={errors.cardName}
                      errorMessage={t.checkoutPage?.requiredError}
                    >
                      <input
                        className="input-box uppercase"
                        value={form.cardName}
                        onChange={handleInputChange("cardName")}
                        placeholder="JUAN PEREZ"
                      />
                    </FieldBox>
                  </div>

                  <div className="sm:col-span-2">
                    <FieldBox
                      label={
                        t.checkoutPage?.cardNumberLabel ||
                        "Número de tarjeta (16 dígitos)"
                      }
                      required
                      error={errors.cardNumber}
                      errorMessage={
                        lang === "es"
                          ? "Debe contener 16 dígitos válidos"
                          : "Must contain 16 valid digits"
                      }
                    >
                      <input
                        className="input-box font-mono"
                        inputMode="numeric"
                        maxLength={19}
                        value={form.cardNumber}
                        onChange={handleInputChange("cardNumber")}
                        placeholder="4500 0000 0000 0000"
                      />
                    </FieldBox>
                  </div>

                  <FieldBox
                    label={
                      t.checkoutPage?.cardExpLabel || "Vencimiento (MM/AA)"
                    }
                    required
                    error={errors.cardExp}
                    errorMessage={
                      lang === "es" ? "Formato MM/AA" : "Format MM/YY"
                    }
                  >
                    <input
                      className="input-box font-mono"
                      inputMode="numeric"
                      maxLength={5}
                      value={form.cardExp}
                      onChange={handleInputChange("cardExp")}
                      placeholder="MM/AA"
                    />
                  </FieldBox>

                  <FieldBox
                    label={t.checkoutPage?.cardCvcLabel || "CVC / CVV"}
                    required
                    error={errors.cardCvc}
                    errorMessage={t.checkoutPage?.requiredError}
                  >
                    <input
                      className="input-box font-mono"
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={form.cardCvc}
                      onChange={handleInputChange("cardCvc")}
                      placeholder="•••"
                    />
                  </FieldBox>
                </div>
              </div>
            </FormCard>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 rounded-[1.5rem] border border-sand bg-paper p-7 shadow-card">
              <h2 className="font-display text-xl text-ink">
                {t.checkoutPage?.summaryTitle || "Tu pedido"}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({count})
                </span>
              </h2>

              <ul className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
                {items.map((item) => {
                  const liveProduct = getProductBySlug(item.slug, lang);
                  const displayName = liveProduct?.name || item.name;

                  return (
                    <li key={item.id} className="flex gap-3">
                      <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-bone">
                        <img
                          src={item.image}
                          alt={displayName}
                          className="h-full w-full object-contain p-2 mix-blend-multiply"
                        />
                        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pine px-1 text-[0.65rem] font-bold text-paper">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm leading-snug text-ink">
                          {displayName}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-clay tabular-nums">
                          {formatMXN(item.price * item.quantity)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <dl className="mt-5 space-y-2.5 border-t border-dashed border-sand pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {t.checkoutPage?.subtotal || "Subtotal"}
                  </dt>
                  <dd className="tabular-nums text-ink">
                    {formatMXN(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {t.checkoutPage?.tax || "IVA (16%)"}
                  </dt>
                  <dd className="tabular-nums text-ink">{formatMXN(iva)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">
                    {t.checkoutPage?.shipping || "Envío"}
                  </dt>
                  <dd className="text-pine">
                    {t.checkoutPage?.shippingTbd || "Por cotizar"}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-dashed border-sand pt-3">
                  <dt className="font-display text-lg text-ink">
                    {t.checkoutPage?.total || "Total"}
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-pine tabular-nums">
                    {formatMXN(total)}
                  </dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-semibold text-paper transition-all hover:bg-clay/90 disabled:opacity-60"
                )}
              >
                <Lock className="h-4 w-4" />
                {loading
                  ? lang === "es"
                    ? "Conectando con Etomin..."
                    : "Connecting to Etomin..."
                  : t.checkoutPage?.btnSubmit || "Pagar y confirmar pedido"}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                {t.checkoutPage?.protectedData ||
                  "Tus datos están protegidos por SSL."}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function FormCard({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-sand bg-paper p-6 shadow-card sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-pine font-display text-sm font-semibold text-paper">
          {step}
        </span>
        <h2 className="font-display text-xl text-ink">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FieldBox({
  label,
  required,
  error,
  errorMessage,
  children,
}: {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      <span
        className={cn(
          "block",
          error &&
            "[&_.input-box]:border-destructive [&_.input-box]:ring-destructive/15"
        )}
      >
        {children}
      </span>
      {error && (
        <span className="mt-1 block text-xs text-destructive">
          {errorMessage || "Este campo es obligatorio"}
        </span>
      )}
    </label>
  );
}