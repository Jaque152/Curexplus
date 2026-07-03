import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { CartProvider } from "@/context/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartDrawer } from "@/components/cart-drawer";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/language-context";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Curexplus — Equipamiento médico, clínico y de laboratorio",
  description:
    "Distribuimos mobiliario, equipo clínico, instrumental quirúrgico y equipamiento de laboratorio para hospitales, clínicas y centros de investigación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${hanken.variable} ${mono.variable}`}>
      <head>
        <Script crossOrigin="anonymous" src="//unpkg.com/react-grab/dist/index.global.js" />
        <Script crossOrigin="anonymous" src="//unpkg.com/same-runtime/dist/index.global.js" />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <LanguageProvider> {/* <-- Envolvemos todo aquí */}
            <CartProvider>
              <SiteHeader />
              <main className="min-h-screen">{children}</main>
              <SiteFooter />
              <CartDrawer />
              <Toaster />
            </CartProvider>
          </LanguageProvider>
        </ClientBody>
      </body>
    </html>
  );
}
