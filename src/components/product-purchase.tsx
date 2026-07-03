"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const { t } = useLanguage();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    toast.success(t.store.productCard.toastAdded, {
      description: `${qty} × ${product.name}`,
      action: { label: t.store.productCard.toastAction, onClick: () => openCart() },
    });
    setTimeout(() => setAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-full border border-sand bg-paper p-1">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-bone hover:text-pine"
            aria-label={t.store.productPurchase.decrease}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-display text-lg font-semibold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-bone hover:text-pine"
            aria-label={t.store.productPurchase.increase}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "group inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all",
            added
              ? "bg-pine text-paper"
              : "bg-clay text-paper hover:bg-clay/90",
          )}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> {t.store.productPurchase.added}
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" /> {t.store.productPurchase.add}
            </>
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-pine/25 px-6 py-3.5 text-sm font-medium text-pine transition-colors hover:bg-paper"
      >
        {t.store.productPurchase.buyNow}
      </button>
    </div>
  );
}