import { MapPin, Mail, Phone, Clock, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contacto — CurexPlus",
  description:
    "Ponte en contacto con CurexPlus para asesoría sobre equipamiento médico, clínico y de laboratorio.",
};

const INFO = [
  {
    icon: MapPin,
    label: "Visítanos",
    value:
      "Calle Guanajuato N°224, Piso 8 despacho 801-802, Colonia Roma, Cuauhtémoc, C.P. 06700, CDMX",
  },
  {
    icon: Mail,
    label: "Escríbenos",
    value: "atencion@CurexPlus.com.mx",
    href: "mailto:atencion@CurexPlus.com.mx",
  },
  {
    icon: Phone,
    label: "Llámanos",
    value: "+52 1 55 5204 4092",
    href: "tel:+5215552044092",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun – Vie · 9:00 a 18:00 h",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="grain relative overflow-hidden bg-pine-deep pt-32 pb-16 text-paper sm:pt-36 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50" />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--clay)), transparent 70%)" }}
        />
        <div className="container-wide relative">
          <span className="eyebrow text-clay-soft">Contacto</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.02] tracking-tight sm:text-6xl">
            Hablemos de tu próximo proyecto clínico
          </h1>
          <p className="mt-5 max-w-xl text-paper/70">
            Estamos listos para asesorarte. Completa el formulario o contáctanos
            por los medios disponibles y nuestro equipo te responderá a la
            brevedad.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 sm:py-24">
        <div className="container-wide grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Info + map */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {INFO.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-sand bg-paper p-5"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-pine/10 text-pine">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-clay">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-sm leading-relaxed text-ink hover:text-pine"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-ink">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <a
                href="https://maps.google.com/?q=Colonia+Roma+Cuauhtemoc+CDMX"
                target="_blank"
                rel="noreferrer"
                className="group relative mt-4 block h-64 overflow-hidden rounded-2xl border border-sand bg-pine-deep"
              >
                <div className="absolute inset-0 bg-grid-dark opacity-60" />
                {/* stylized map */}
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, hsl(var(--moss)/0.6), transparent 40%), radial-gradient(circle at 70% 70%, hsl(var(--clay)/0.45), transparent 45%)",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative grid h-12 w-12 place-items-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay/40" />
                    <span className="relative grid h-10 w-10 place-items-center rounded-full bg-clay text-paper">
                      <MapPin className="h-5 w-5" />
                    </span>
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-paper/15 bg-pine-deep/70 px-4 py-3 backdrop-blur-md">
                  <span className="text-sm font-medium text-paper">
                    Colonia Roma, CDMX
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-clay-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <div className="rounded-[1.75rem] border border-sand bg-paper p-7 shadow-card sm:p-9">
                <h2 className="font-display text-2xl text-ink">
                  Envíanos un mensaje
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cuéntanos qué necesitas y te contactaremos a la brevedad.
                </p>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
