"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import { formatMXN } from "@/lib/format";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setOpen,
    updateQuantity,
    removeItem,
    subtotal,
    iva,
    total,
    count,
  } = useCart();

  const { t } = useLanguage();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full max-w-md flex-col gap-0 border-l border-sand bg-bone p-0"
      >
        <SheetHeader className="flex-row items-center justify-between space-y-0 border-b border-sand px-6 py-5 text-left">
          <SheetTitle className="font-display text-xl text-ink">
            {t.store.cartDrawer.title}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({count} {count === 1 ? t.store.cartDrawer.items_one : t.store.cartDrawer.items_other})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-sand/60 text-pine">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <div>
              <p className="font-display text-xl text-ink">
                {t.store.cartDrawer.emptyTitle}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.store.cartDrawer.emptyDesc}
              </p>
            </div>
            <SheetClose asChild>
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 rounded-full bg-pine px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-pine-deep"
              >
                {t.store.cartDrawer.btnReturn}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-sand/80 bg-paper p-3"
                  >
                    <Link
                      href={`/producto/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-bone"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain mix-blend-multiply"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/producto/${item.slug}`}
                        onClick={() => setOpen(false)}
                        className="line-clamp-2 text-sm font-medium leading-snug text-ink hover:text-pine"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-0.5 text-sm font-semibold text-clay">
                        {formatMXN(item.price)}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border border-sand bg-bone">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="grid h-7 w-7 place-items-center rounded-full text-ink/70 hover:text-pine"
                            aria-label={t.store.cartDrawer.decrease}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="grid h-7 w-7 place-items-center rounded-full text-ink/70 hover:text-pine"
                            aria-label={t.store.cartDrawer.increase}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="grid h-7 w-7 place-items-center rounded-full text-ink/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
                          aria-label={t.store.cartDrawer.remove}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-sand bg-paper px-6 py-5">
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>{t.store.cartDrawer.subtotal}</dt>
                  <dd className="tabular-nums text-ink">
                    {formatMXN(subtotal)}
                  </dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>{t.store.cartDrawer.tax}</dt>
                  <dd className="tabular-nums text-ink">{formatMXN(iva)}</dd>
                </div>
                <div className="flex justify-between border-t border-dashed border-sand pt-2 font-display text-lg text-ink">
                  <dt>{t.store.cartDrawer.total}</dt>
                  <dd className="tabular-nums">{formatMXN(total)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    href="/checkout"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-clay/90"
                  >
                    {t.store.cartDrawer.btnCheckout}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/carrito"
                    className="inline-flex items-center justify-center rounded-full border border-pine/20 px-6 py-3 text-sm font-medium text-pine transition-colors hover:bg-sand/50"
                  >
                    {t.store.cartDrawer.btnViewCart}
                  </Link>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}