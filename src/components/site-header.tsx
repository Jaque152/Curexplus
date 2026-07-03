"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context"; // <-- Importación
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const { t, lang, setLang } = useLanguage(); // <-- Hook de idioma
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Generamos la navegación dinámicamente según el idioma
  const NAV = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.about, href: "/sobre-nosotros" },
    { label: t.nav.solutions, href: "/soluciones" },
    { label: t.nav.store, href: "/tienda" },
  ];

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <div className="container-wide pt-3 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-4 rounded-full border px-3 py-2 pl-4 sm:pl-5 transition-all duration-300",
            scrolled
              ? "border-sand bg-paper/85 backdrop-blur-xl shadow-card"
              : "border-transparent bg-paper/40 backdrop-blur-md"
          )}
        >
          <Link href="/" className="shrink-0" aria-label="Curexplus inicio">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-pine" : "text-ink/70 hover:text-pine"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-clay" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            
            {/* Botón selector de idioma */}
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="mr-2 px-2 py-1 text-sm font-bold text-ink/70 transition-colors hover:text-pine"
              aria-label="Cambiar idioma"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            <button
              type="button"
              onClick={openCart}
              className="group relative inline-flex items-center gap-2 rounded-full bg-pine px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-pine-deep"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">{t.nav.cart}</span>
              <span
                className={cn(
                  "grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[0.7rem] font-bold text-paper transition-transform",
                  mounted && count > 0 ? "scale-100" : "scale-0"
                )}
              >
                {mounted ? count : 0}
              </span>
            </button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="grid h-10 w-10 place-items-center rounded-full border border-sand bg-paper text-pine lg:hidden"
                  aria-label={t.header?.openMenu || "Menú"}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88%] max-w-sm border-l border-sand bg-bone p-0">
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="border-b border-sand p-6">
                    <Logo />
                  </div>
                  <nav className="flex flex-col gap-1 p-4">
                    {NAV.map((item) => {
                      const active = isActive(pathname, item.href);
                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg transition-colors",
                              active ? "bg-pine text-paper" : "text-ink hover:bg-sand/60"
                            )}
                          >
                            {item.label}
                            <span className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-clay" : "bg-transparent")} />
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>
                  <div className="mt-auto p-6">
                    <p className="text-sm text-muted-foreground">{t.nav.techSupport}</p>
                    <a href="tel:+5215552044092" className="mt-1 block font-display text-xl text-pine">
                      +52 1 55 5204 4092
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}