import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  ScanSearch,
  ClipboardCheck,
  PackageCheck,
  Building2,
  FlaskConical,
  Stethoscope,
  Bed,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { QuoteForm } from "@/components/quote-form";

export const metadata = {
  title: "Soluciones — CurexPlus",
  description:
    "Soluciones a la medida de tu institución: equipamiento técnico, funcional y adaptado a tu entorno sanitario.",
};

const STEPS = [
  {
    icon: MessageSquare,
    title: "Cuéntanos",
    body: "Compartes las necesidades y objetivos de tu proyecto.",
  },
  {
    icon: ScanSearch,
    title: "Analizamos",
    body: "Evaluamos requerimientos técnicos, espacio y normativa.",
  },
  {
    icon: ClipboardCheck,
    title: "Proponemos",
    body: "Diseñamos una propuesta funcional y a la medida.",
  },
  {
    icon: PackageCheck,
    title: "Implementamos",
    body: "Coordinamos entrega, instalación y seguimiento.",
  },
];

const AREAS = [
  {
    icon: Bed,
    title: "Áreas de hospitalización",
    body: "Camas, mobiliario clínico y equipamiento para pisos y cuidados.",
  },
  {
    icon: FlaskConical,
    title: "Laboratorios",
    body: "Mobiliario, microscopía e instrumentos de medición y análisis.",
  },
  {
    icon: Stethoscope,
    title: "Consultorios y exploración",
    body: "Equipo de diagnóstico, instrumental y mobiliario de consulta.",
  },
  {
    icon: Building2,
    title: "Proyectos integrales",
    body: "Implementación completa de áreas médicas y científicas.",
  },
];

export default function SolucionesPage() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden bg-bone pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
        <div
          className="pointer-events-none absolute -right-32 -top-10 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--clay)/0.5), transparent 70%)" }}
        />
        <div className="container-wide relative max-w-4xl">
          <Reveal>
            <span className="eyebrow">Soluciones</span>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.0] tracking-tight text-ink sm:text-6xl xl:text-7xl">
              Soluciones a la medida de tu{" "}
              <span className="italic text-pine">institución</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Cuéntanos las necesidades de tu proyecto y nuestro equipo propondrá
              una solución técnica, funcional y adaptada a tu entorno sanitario.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="container-wide">
          <Reveal>
            <span className="eyebrow">Cómo trabajamos</span>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl">
              Un proceso claro, de la consulta a la implementación
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <div className="relative h-full rounded-2xl border border-sand bg-bone p-7">
                  <span className="absolute right-6 top-6 font-display text-2xl font-semibold text-clay/30">
                    0{i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-pine text-paper">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Areas */}
      <section className="bg-bone py-20 sm:py-28">
        <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: areas + CTA */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Áreas que equipamos</span>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
                Envíanos tu consulta
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo a la
                brevedad para analizar cómo podemos apoyar tu proyecto.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {AREAS.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-2xl border border-sand bg-paper p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-pine/10 text-pine">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {a.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-pine/30 bg-paper p-5">
                <p className="flex-1 text-sm text-ink">
                  ¿Ya tienes una cotización con nosotros?
                </p>
                <Link
                  href="/pago-cotizacion"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pine px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-pine-deep"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="rounded-[1.75rem] border border-sand bg-paper p-7 shadow-card sm:p-9">
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
