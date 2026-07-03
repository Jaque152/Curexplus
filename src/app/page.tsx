"use client"; 

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Boxes,
  Truck,
  Headset,
  Scale,
  Target,
  HeartHandshake,
  Sparkles,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/product-card";
import { ContactForm } from "@/components/contact-form";
import { getFeaturedProducts} from "@/lib/products";
import { useLanguage } from "@/context/language-context"; // <-- Importación

const HERO_IMG = "https://ext.same-assets.com/450352746/317648177.jpeg";
const EXPERIENCE_IMG = "https://ext.same-assets.com/450352746/2862864717.jpeg";
const VISION_IMG = "https://ext.same-assets.com/450352746/1067437340.jpeg";

const VALUES_ICONS = [Scale, Target, HeartHandshake, Sparkles]; // Extraemos iconos

export default function HomePage() {
  const { t, lang } = useLanguage();
  const featured = getFeaturedProducts(lang, 8);


  return (
    <>
      {/* ============ HERO ============ */}
      <section className="grain relative overflow-hidden bg-bone pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div className="container-wide relative grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                {t.home.hero.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-[2.75rem] font-medium leading-[0.98] tracking-tight text-ink sm:text-6xl xl:text-7xl">
                {t.home.hero.title1}
                <br />
                {t.home.hero.title2}
                <br />
                <span className="italic text-pine">{t.home.hero.title3}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                {t.home.hero.desc}
              </p>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-sand pt-8">
                <div>
                  <dt className="font-display text-3xl font-semibold text-pine">{t.home.hero.stat1Num}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{t.home.hero.stat1Label}</dd>
                </div>
                <div>
                  <dt className="font-display text-3xl font-semibold text-pine">{t.home.hero.stat2Num}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted-foreground">{t.home.hero.stat2Label}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={200} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-pine-deep shadow-lift sm:aspect-[5/5]">
                <img src={HERO_IMG} alt="Instrumental" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, hsl(var(--pine)/0.55), transparent 45%), linear-gradient(0deg, hsl(var(--pine-deep)/0.85), transparent 55%)" }} />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-paper/15 bg-pine-deep/60 p-5 backdrop-blur-md">
                  <p className="text-sm text-paper/80">{t.home.hero.cardDesc}</p>
                </div>
              </div>
              <div className="absolute -left-4 top-8 hidden rounded-2xl border border-sand bg-paper p-4 shadow-card sm:block">
                <p className="font-display text-2xl font-semibold text-pine">{t.home.hero.badgeTitle}</p>
                <p className="text-[0.7rem] text-muted-foreground whitespace-pre-line">{t.home.hero.badgeDesc}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="bg-bone py-20 sm:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-pine-deep">
              <img src={EXPERIENCE_IMG} alt="Profesionales" className="aspect-[4/3] w-full object-cover opacity-75 mix-blend-luminosity" />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:pt-6">
            <Reveal>
              <span className="eyebrow">{t.home.about.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{t.home.about.title}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t.home.about.p1}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t.home.about.p2}</p>
              <Link href="/soluciones" className="link-underline mt-6 inline-flex items-center gap-2 font-medium text-pine">
                {t.home.about.link}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="bg-paper pb-20 sm:pb-28 pt-20">
        <div className="container-wide">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2rem] bg-clay px-8 py-14 text-paper sm:px-14 sm:py-16">
              <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">{t.home.cta.title}</h2>
                  <p className="mt-3 text-paper/85">{t.home.cta.desc}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/soluciones" className="inline-flex items-center gap-2 rounded-full bg-pine-deep px-6 py-3.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.02]">
                    {t.home.cta.btnQuote} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/pago-cotizacion" className="inline-flex items-center gap-2 rounded-full border border-paper/40 px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-paper/10">
                    {t.home.cta.btnContact}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contacto" className="bg-bone py-20 sm:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">{t.home.contact.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{t.home.contact.title}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{t.home.contact.desc}</p>

              <ul className="mt-8 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pine/10 text-pine"><MapPin className="h-5 w-5" /></span>
                  <span className="text-sm leading-relaxed text-ink">{t.home.contact.address}</span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pine/10 text-pine"><Mail className="h-5 w-5" /></span>
                  <a href="mailto:atencion@curexplus.com" className="self-center text-sm text-ink hover:text-pine">atencion@curexplus.com</a>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pine/10 text-pine"><Phone className="h-5 w-5" /></span>
                  <a href="tel:+5215552044092" className="self-center text-sm text-ink hover:text-pine">+52 1 55 5204 4092</a>
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="rounded-[1.75rem] border border-sand bg-paper p-7 shadow-card sm:p-9">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}