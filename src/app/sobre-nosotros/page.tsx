"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, BadgeCheck, Gem } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { useLanguage } from "@/context/language-context";

const HERO_IMG = "https://ext.same-assets.com/450352746/3232783417.jpeg";
const STORY_IMG_A = "https://ext.same-assets.com/450352746/2862864717.jpeg";
const STORY_IMG_B = "https://ext.same-assets.com/450352746/1067437340.jpeg";

export default function SobreNosotrosPage() {
  const { t } = useLanguage();

  const PILLARS = [
    {
      n: "01",
      icon: BrainCircuit,
      title: t.aboutPage.pillars.items[0].title,
      body: t.aboutPage.pillars.items[0].body,
    },
    {
      n: "02",
      icon: BadgeCheck,
      title: t.aboutPage.pillars.items[1].title,
      body: t.aboutPage.pillars.items[1].body,
    },
    {
      n: "03",
      icon: Gem,
      title: t.aboutPage.pillars.items[2].title,
      body: t.aboutPage.pillars.items[2].body,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-pine-deep pt-32 pb-20 text-paper sm:pt-40 sm:pb-28">
        <img
          src={HERO_IMG}
          alt="Sector salud"
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/70 to-pine-deep/40" />
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-40" />
        <div className="container-wide relative">
          <Reveal>
            <span className="eyebrow text-clay-soft">{t.aboutPage.hero.eyebrow}</span>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
              {t.aboutPage.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-paper/75">
              {t.aboutPage.hero.desc}
            </p>
            <Link
              href="/soluciones"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-clay/90"
            >
              {t.aboutPage.hero.btnSolutions}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-bone py-20 sm:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Collage */}
          <Reveal className="lg:col-span-6">
            <div className="relative">
              <div className="grid grid-cols-5 grid-rows-6 gap-4 sm:h-[30rem]">
                <div className="col-span-3 row-span-6 overflow-hidden rounded-[1.5rem] bg-pine-deep">
                  <img
                    src={STORY_IMG_A}
                    alt="Equipo médico"
                    className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
                  />
                </div>
                <div className="col-span-2 row-span-3 overflow-hidden rounded-[1.5rem] bg-pine-deep">
                  <img
                    src={STORY_IMG_B}
                    alt="Laboratorio"
                    className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
                  />
                </div>
                <div className="col-span-2 row-span-3 grid place-items-center rounded-[1.5rem] bg-clay p-6 text-center text-paper">
                  <div>
                    <p className="mt-1 text-sm text-paper/85">
                      {t.aboutPage.story.badgeText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="lg:col-span-6 lg:pt-4">
            <Reveal>
              <span className="eyebrow">{t.aboutPage.story.eyebrow}</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                {t.aboutPage.story.title}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {t.aboutPage.story.p1}
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t.aboutPage.story.p2}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">{t.aboutPage.pillars.eyebrow}</span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              {t.aboutPage.pillars.title}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} delay={i * 110}>
                <div className="group flex h-full flex-col rounded-[1.5rem] border border-sand bg-bone p-8 transition-colors hover:border-pine/30">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-pine text-paper">
                      <p.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-4xl font-semibold text-clay/25">
                      {p.n}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-bone py-20 sm:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow">{t.aboutPage.contact.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              {t.aboutPage.contact.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              {t.aboutPage.contact.desc}
            </p>
            <div className="mt-8 rounded-[1.5rem] border border-sand bg-pine-deep p-8 text-paper">
              <p className="font-display text-2xl">
                {t.aboutPage.contact.quote}
              </p>
              <p className="mt-4 text-sm text-paper/60">{t.aboutPage.contact.author}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[1.75rem] border border-sand bg-paper p-7 shadow-card sm:p-9">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}