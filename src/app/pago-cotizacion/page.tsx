"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { ArrowRight, FileText, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Product, Category } from "@/lib/products";

interface FormErrors {
  quoteNumber?: boolean;
  email?: boolean;
  total?: boolean;
}

export default function PagoCotizacionPage() {
  const { addItem, openCart } = useCart();
  const { t, lang } = useLanguage();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleTotalChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Permitir solo números y un punto decimal
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setTotal(val);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};

    if (!quoteNumber.trim()) nextErrors.quoteNumber = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = true;
    
    const parsedTotal = parseFloat(total);
    if (isNaN(parsedTotal) || parsedTotal <= 0) nextErrors.total = true;

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // GENERACIÓN DEL PRODUCTO VIRTUAL EN TIEMPO REAL
    const quoteAmount = parseFloat(total);
    const quoteProduct: Product = {
      // Usamos un ID negativo o basado en timestamp para que jamás choque con los del catálogo
      id: Math.floor(Date.now() / 1000) * -1, 
      slug: `cotizacion-${quoteNumber.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      name: lang === "es" 
        ? `Pago de Cotización N° ${quoteNumber.toUpperCase()} (${email})`
        : `Quote Payment No. ${quoteNumber.toUpperCase()} (${email})`,
      price: quoteAmount,
      category: (lang === "es" ? "Servicios" : "Services") as Category,
      image: "https://images.pexels.com/photos/7709171/pexels-photo-7709171.jpeg",
      blurb: lang === "es" ? `Cotización formal N° ${quoteNumber}` : `Formal quote No. ${quoteNumber}`,
      description: lang === "es" 
        ? `Servicio de procesamiento de pago para la cotización formal N° ${quoteNumber} enviada al correo ${email}.`
        : `Payment processing service for formal quote No. ${quoteNumber} sent to ${email}.`,
      features: [
        lang === "es" ? `Referencia: ${quoteNumber.toUpperCase()}` : `Reference: ${quoteNumber.toUpperCase()}`,
        `Email: ${email}`
      ]
    };

    // Añadir al carrito global
    addItem(quoteProduct, 1);

    // Alerta de éxito elegante nativa
    toast.success(t.quotePaymentPage?.toastAddedTitle || "Cotización añadida", {
      description: t.quotePaymentPage?.toastAddedDesc || "Se ha integrado al carrito de compras con éxito.",
      action: {
        label: lang === "es" ? "Ver Carrito" : "View Cart",
        onClick: () => openCart(),
      },
    });

    // Limpiar formulario para permitir agregar más cosas si el usuario lo desea
    setQuoteNumber("");
    setEmail("");
    setTotal("");
  };

  return (
    <section className="min-h-[80vh] bg-bone pt-28 pb-20 sm:pt-32">
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        
        {/* Lado Izquierdo: Información */}
        <div className="lg:col-span-5">
          <span className="eyebrow">
            {t.quotePaymentPage?.eyebrow || "Servicios en línea"}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            {t.quotePaymentPage?.title || "Pago de Cotizaciones"}
          </h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {t.quotePaymentPage?.desc ||
              "Introduce los datos de tu cotización formal para añadirla al carrito de compra y proceder con el pago seguro junto con tus otros productos."}
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-sand bg-paper p-5">
            <div className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pine/10 text-pine">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h4 className="text-sm font-semibold text-ink">
                  {lang === "es" ? "Acumulable y Combinable" : "Combinable Order"}
                </h4>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {lang === "es"
                    ? "Puedes agregar tu cotización y seguir navegando en la tienda para comprar insumos adicionales en el mismo pago."
                    : "You can add your quote and continue browsing the store to purchase additional items in a single checkout."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Formulario */}
        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[1.75rem] border border-sand bg-paper p-6 shadow-card sm:p-9">
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              
              {/* Número de cotización */}
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">
                  {t.quotePaymentPage?.quoteNumLabel || "Número de cotización"} <span className="text-clay">*</span>
                </span>
                <div className={cn("block", errors.quoteNumber && "[&_input]:border-destructive [&_input]:ring-destructive/15")}>
                  <input
                    className="input-box uppercase"
                    value={quoteNumber}
                    onChange={(e) => setQuoteNumber(e.target.value)}
                    placeholder={t.quotePaymentPage?.quoteNumPh || "COT-2026-1024"}
                  />
                </div>
                {errors.quoteNumber && (
                  <span className="mt-1 block text-xs text-destructive">
                    {t.quotePaymentPage?.errQuoteNum || "Ingresa el número de tu cotización"}
                  </span>
                )}
              </label>

              {/* Email */}
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">
                  {t.quotePaymentPage?.emailLabel || "Email de contacto"} <span className="text-clay">*</span>
                </span>
                <div className={cn("block", errors.email && "[&_input]:border-destructive [&_input]:ring-destructive/15")}>
                  <input
                    className="input-box"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.quotePaymentPage?.emailPh || "nombre@institucion.com"}
                  />
                </div>
                {errors.email && (
                  <span className="mt-1 block text-xs text-destructive">
                    {t.quotePaymentPage?.errEmail || "Ingresa tu correo electrónico"}
                  </span>
                )}
              </label>

              {/* Categoría fija (Visual) */}
              <label className="block opacity-80">
                <span className="mb-1.5 block text-sm font-medium text-ink">
                  {t.quotePaymentPage?.categoryLabel || "Categoría"}
                </span>
                <input
                  className="input-box bg-bone select-none font-medium text-pine"
                  value={t.quotePaymentPage?.categoryValue || "Servicios"}
                  readOnly
                />
              </label>

              {/* Monto Total */}
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">
                  {t.quotePaymentPage?.totalLabel || "Total de la cotización (Antes de IVA)"} <span className="text-clay">*</span>
                </span>
                <div className={cn("relative rounded-md shadow-sm block", errors.total && "[&_input]:border-destructive [&_input]:ring-destructive/15")}>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-sm font-semibold text-pine">$</span>
                  </div>
                  <input
                    className="input-box pl-8 pr-16 font-mono text-lg font-semibold text-ink"
                    value={total}
                    onChange={handleTotalChange}
                    placeholder={t.quotePaymentPage?.totalPh || "0.00"}
                    inputMode="decimal"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <span className="text-xs font-bold text-muted-foreground">MXN</span>
                  </div>
                </div>
                {errors.total && (
                  <span className="mt-1 block text-xs text-destructive">
                    {t.quotePaymentPage?.errTotal || "Ingresa un monto válido mayor a 0"}
                  </span>
                )}
              </label>

              {/* Botón enviar */}
              <button
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-semibold text-paper transition-all hover:bg-clay/90"
              >
                <ShoppingBag className="h-4 w-4" />
                {t.quotePaymentPage?.btnSubmit || "Agregar al carrito"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}