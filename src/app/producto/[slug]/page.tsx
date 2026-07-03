"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Tag } from "lucide-react";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { formatMXN } from "@/lib/format";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/context/language-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Desempaquetamos los parámetros en un Client Component usando React.use()
  const { slug } = use(params);
  const { t, lang } = useLanguage();

  // Buscamos la información del producto en el idioma actual
  const product = getProductBySlug(slug, lang);
  if (!product) notFound();

  // Traemos los productos relacionados en el mismo idioma
  const related = getRelatedProducts(product, lang, 4);

  return (
    <>
      <section className="bg-bone pt-28 sm:pt-32">
        <div className="container-wide">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-pine">
              {t.productPage.breadcrumbHome}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tienda" className="hover:text-pine">
              {t.productPage.breadcrumbStore}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-ink line-clamp-1">
              {product.name}
            </span>
          </nav>

          <div className="mt-8 grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div>
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-sand bg-paper">
                <div className="absolute inset-0 bg-grid opacity-40" />
                {product.badge && (
                  <span className="absolute left-5 top-5 z-10 rounded-full bg-pine px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-paper">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-contain p-10 mix-blend-multiply"
                />
              </div>
            </div>

            {/* Info */}
            <div className="lg:py-2">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-clay">
                {product.category}
              </p>
              <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-pine">
                  {formatMXN(product.price)}
                </span>
                <span className="text-sm text-muted-foreground">{t.productPage.tax}</span>
              </div>

              <p className="mt-5 max-w-prose leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="my-7 h-px w-full bg-sand" />

              <ProductPurchase product={product} />

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-pine" />
                  {t.productPage.skuLabel} {product.id}
                </span>
                <span>
                  {t.productPage.categoryLabel}{" "}
                  <span className="font-medium text-ink">{product.category}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details accordion */}
      <section className="bg-paper py-14">
        <div className="container-tight">
          <Accordion
            type="multiple"
            defaultValue={["desc", "features"]}
            className="w-full"
          >
            <AccordionItem value="desc" className="border-sand">
              <AccordionTrigger className="font-display text-xl text-ink hover:no-underline">
                {t.productPage.descriptionTab}
              </AccordionTrigger>
              <AccordionContent className="text-[0.95rem] leading-relaxed text-muted-foreground">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="features" className="border-sand">
              <AccordionTrigger className="font-display text-xl text-ink hover:no-underline">
                {t.productPage.featuresTab}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[0.95rem] text-ink"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                      {f}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Related */}
      <section className="bg-bone py-16 sm:py-20">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              {t.productPage.relatedTitle}
            </h2>
            <Link
              href="/tienda"
              className="hidden text-sm font-medium text-pine hover:underline sm:block"
            >
              {t.productPage.viewAll}
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} className="h-full" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}