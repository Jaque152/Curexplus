"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import { formatMXN } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem, openCart } = useCart();
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    toast.success(t.store.productCard.toastAdded, {
      description: product.name,
      action: { label: t.store.productCard.toastAction, onClick: () => openCart() },
    });
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-sand bg-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-bone"
      >
        <div className="absolute inset-0 bg-grid opacity-40" />
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-pine px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-paper">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-clay">
          {product.category}
        </p>
        <Link
          href={`/producto/${product.slug}`}
          className="mt-2 line-clamp-2 font-display text-[1.05rem] leading-snug text-ink transition-colors group-hover:text-pine"
        >
          {product.name}
        </Link>

        <div className="mt-4 flex items-end justify-between gap-3 pt-1">
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              {formatMXN(product.price)}
            </p>
            <p className="text-[0.7rem] text-muted-foreground">{t.store.productCard.tax}</p>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={t.store.productCard.add}
            className={cn(
              "inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-all",
              added
                ? "bg-pine text-paper"
                : "bg-sand/70 text-pine hover:bg-clay hover:text-paper",
            )}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                <span className="hidden sm:inline">{t.store.productCard.added}</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t.store.productCard.add}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}