"use client";

import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products, CATEGORIES_ES, CATEGORIES_EN, type Category } from "@/lib/products";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = "default" | "price-asc" | "price-desc" | "name";
const PER_PAGE = 12;

export default function TiendaPage() {
  const { lang, t } = useLanguage();
  const currentProducts = products[lang];
  const CATEGORIES = lang === "es" ? CATEGORIES_ES : CATEGORIES_EN;

  const [activeCat, setActiveCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [page, setPage] = useState(1);

  // Previene que se rompa la cuadrícula si el usuario cambia de idioma
  // mientras tiene seleccionada una categoría específica
  useEffect(() => {
    setActiveCat("all");
    setPage(1);
  }, [lang]);

  const SORT_LABELS: Record<SortKey, string> = {
    default: lang === "es" ? "Orden por defecto" : "Default order",
    "price-asc": lang === "es" ? "Precio: menor a mayor" : "Price: low to high",
    "price-desc": lang === "es" ? "Precio: mayor a menor" : "Price: high to low",
    name: lang === "es" ? "Nombre (A–Z)" : "Name (A–Z)",
  };

  const filtered = useMemo(() => {
    const list =
      activeCat === "all"
        ? [...currentProducts]
        : currentProducts.filter((p) => p.category === activeCat);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name, lang));
        break;
    }
    return list;
  }, [activeCat, sort, currentProducts, lang]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (current - 1) * PER_PAGE,
    current * PER_PAGE,
  );

  const changeCat = (c: Category | "all") => {
    setActiveCat(c);
    setPage(1);
  };

  const countForCat = (c: Category) =>
    currentProducts.filter((p) => p.category === c).length;

  return (
    <>
      {/* Header */}
      <section className="grain relative overflow-hidden bg-pine-deep pt-32 pb-16 text-paper sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--clay)), transparent 70%)" }}
        />
        <div className="container-wide relative">
          <span className="eyebrow text-clay-soft">{t.nav.store}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl">
            {lang === "es" ? "Catálogo de equipamiento clínico" : "Clinical equipment catalog"}
          </h1>
          <p className="mt-5 max-w-xl text-paper/70">
            {lang === "es" 
              ? "Mobiliario hospitalario, equipo médico, instrumental, laboratorio y más. Todos los precios se muestran antes de IVA."
              : "Hospital furniture, medical equipment, instruments, laboratory, and more. All prices are shown before tax."}
          </p>
        </div>
      </section>

      {/* Toolbar + grid */}
      <section className="bg-bone py-12 sm:py-16">
        <div className="container-wide">
          {/* Category chips */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => changeCat("all")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeCat === "all"
                  ? "bg-pine text-paper"
                  : "border border-sand bg-paper text-ink/70 hover:border-pine/30 hover:text-pine",
              )}
            >
              {lang === "es" ? "Todos" : "All"}
              <span className="ml-1.5 text-xs opacity-70">{currentProducts.length}</span>
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => changeCat(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCat === c
                    ? "bg-pine text-paper"
                    : "border border-sand bg-paper text-ink/70 hover:border-pine/30 hover:text-pine",
                )}
              >
                {c}
                <span className="ml-1.5 text-xs opacity-70">
                  {countForCat(c)}
                </span>
              </button>
            ))}
          </div>

          {/* Results bar */}
          <div className="mt-6 flex flex-col items-start justify-between gap-3 border-y border-sand py-4 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">
              {lang === "es" ? "Mostrando " : "Showing "}
              <span className="font-semibold text-ink">
                {filtered.length === 0
                  ? 0
                  : (current - 1) * PER_PAGE + 1}
                –{Math.min(current * PER_PAGE, filtered.length)}
              </span>{" "}
              {lang === "es" ? "de " : "of "} <span className="font-semibold text-ink">{filtered.length}</span>{" "}
              {lang === "es" ? "resultados" : "results"}
            </p>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="w-[220px] rounded-full border-sand bg-paper">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
                    <SelectItem key={k} value={k}>
                      {SORT_LABELS[k]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Grid */}
          {pageItems.length === 0 ? (
            <p className="py-24 text-center text-muted-foreground">
              {lang === "es" ? "No hay productos en esta categoría." : "There are no products in this category."}
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} className="h-full" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={current === 1}
                className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-paper text-ink transition-colors hover:border-pine/30 hover:text-pine disabled:opacity-40 disabled:hover:border-sand"
                aria-label={lang === "es" ? "Anterior" : "Previous"}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={cn(
                    "h-10 w-10 rounded-full text-sm font-semibold transition-colors",
                    n === current
                      ? "bg-pine text-paper"
                      : "border border-sand bg-paper text-ink hover:border-pine/30 hover:text-pine",
                  )}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={current === totalPages}
                className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-paper text-ink transition-colors hover:border-pine/30 hover:text-pine disabled:opacity-40 disabled:hover:border-sand"
                aria-label={lang === "es" ? "Siguiente" : "Next"}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}