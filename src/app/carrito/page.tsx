"use client";

import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context"; // <-- Importamos el contexto de idioma
import { getProductBySlug } from "@/lib/products"; // <-- Importamos para buscar los datos traducidos en vivo
import { formatMXN } from "@/lib/format";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clear,
    subtotal,
    iva,
    total,
    count,
  } = useCart();

  const { t, lang } = useLanguage(); // <-- Extraemos las traducciones y el idioma activo

  return (
    <section className="min-h-[60vh] bg-bone pt-28 pb-20 sm:pt-32">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">{t.cartPage?.eyebrow || "Carrito"}</span>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.cartPage?.title || "Tu carrito"}
            </h1>
          </div>
          {count > 0 && (
            <p className="text-sm text-muted-foreground">
              {count} {count === 1 ? (t.cartPage?.items_one || "artículo") : (t.cartPage?.items_other || "artículos")}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-6 rounded-[1.75rem] border border-dashed border-sand bg-paper py-24 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-sand/60 text-pine">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <div>
              <p className="font-display text-2xl text-ink">
                {t.cartPage?.emptyTitle || "Tu carrito está vacío"}
              </p>
              <p className="mt-2 text-muted-foreground">
                {t.cartPage?.emptyDesc || "Aún no has agregado equipamiento a tu carrito."}
              </p>
            </div>
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-full bg-pine px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-pine-deep"
            >
              {t.cartPage?.btnStore || "Explorar la tienda"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Items */}
            <div className="lg:col-span-7 xl:col-span-8">
              <ul className="space-y-4">
                {items.map((item) => {
                  // CONSULTA EN TIEMPO REAL DEL PRODUCTO SEGÚN EL IDIOMA ACTIVO:
                  // Esto elimina el error de TypeScript porque ya no lee item.category del estado del carrito,
                  // sino del catálogo oficial. Además traduce el nombre y categoría dinámicamente.
                  const liveProduct = getProductBySlug(item.slug, lang);
                  const displayCategory = liveProduct?.category || "";
                  const displayName = liveProduct?.name || item.name;

                  return (
                    <li
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-sand bg-paper p-4 sm:flex-row sm:items-center"
                    >
                      <Link
                        href={`/producto/${item.slug}`}
                        className="grid h-28 w-full shrink-0 place-items-center overflow-hidden rounded-xl bg-bone sm:h-24 sm:w-24"
                      >
                        <img
                          src={item.image}
                          alt={displayName}
                          className="h-full w-full object-contain p-3 mix-blend-multiply"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-clay">
                          {displayCategory}
                        </p>
                        <Link
                          href={`/producto/${item.slug}`}
                          className="mt-1 font-display text-lg leading-snug text-ink hover:text-pine block line-clamp-2"
                        >
                          {displayName}
                        </Link>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatMXN(item.price)}{" "}
                          <span className="text-xs">{lang === "es" ? "+ IVA" : "+ Tax"}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="inline-flex items-center rounded-full border border-sand bg-bone">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="grid h-9 w-9 place-items-center rounded-full text-ink/70 hover:text-pine"
                            aria-label="Disminuir"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-9 text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="grid h-9 w-9 place-items-center rounded-full text-ink/70 hover:text-pine"
                            aria-label="Aumentar"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-lg font-semibold text-ink tabular-nums">
                            {formatMXN(item.price * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="grid h-9 w-9 place-items-center rounded-full text-ink/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex items-center justify-between">
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 text-sm font-medium text-pine hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {lang === "es" ? "Seguir comprando" : "Continue shopping"}
                </Link>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-muted-foreground transition-colors hover:text-destructive"
                >
                  {t.cartPage?.btnClear || "Vaciar carrito"}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 rounded-[1.5rem] border border-sand bg-paper p-7 shadow-card">
                <h2 className="font-display text-xl text-ink">
                  {t.cartPage?.summaryTitle || "Resumen del pedido"}
                </h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.cartPage?.subtotal || "Subtotal"}</dt>
                    <dd className="font-medium tabular-nums text-ink">
                      {formatMXN(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">
                      {lang === "es" ? "IVA (16%)" : "Tax (16%)"}
                    </dt>
                    <dd className="font-medium tabular-nums text-ink">
                      {formatMXN(iva)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">{t.cartPage?.shipping || "Envío"}</dt>
                    <dd className="font-medium text-pine">
                      {t.cartPage?.shippingTbd || "Por cotizar"}
                    </dd>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between border-t border-dashed border-sand pt-4">
                    <dt className="font-display text-lg text-ink">
                      {t.cartPage?.total || "Total"}
                    </dt>
                    <dd className="font-display text-2xl font-semibold text-pine tabular-nums">
                      {formatMXN(total)}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/checkout"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 text-sm font-semibold text-paper transition-colors hover:bg-clay/90"
                >
                  {t.cartPage?.btnCheckout || "Finalizar compra"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {t.cartPage?.footerNote ||
                    "Impuestos calculados al finalizar. El envío se cotiza según ubicación y volumen."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}