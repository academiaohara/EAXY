import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenCheckIcon,
  BrainCircuitIcon,
  CheckIcon,
  ChevronDownIcon,
  CompassIcon,
  RouteIcon,
  SparklesIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { SiteHeader } from "@/components/layout/site-header";
import { DemoExercise } from "@/components/marketing/demo-exercise";
import { HeroEquation } from "@/components/marketing/hero-equation";
import { HomeContinueCard } from "@/components/marketing/home-continue-card";
import { HomeCourseExplorer } from "@/components/marketing/home-course-explorer";
import { Button } from "@/components/ui/button";
import { curriculum } from "@/content";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getAprenderContinueStudying } from "@/lib/curriculum/aprender-home";

const steps = [
  {
    icon: CompassIcon,
    number: "01",
    title: "Elige tu año",
    description: "Entra en una materia y abre tu nivel. Si hay itinerarios, los verás después.",
  },
  {
    icon: BookOpenCheckIcon,
    number: "02",
    title: "Aprende haciendo",
    description: "Recorre explicaciones visuales, responde y recibe feedback en cada paso.",
  },
  {
    icon: RouteIcon,
    number: "03",
    title: "Sigue tu ruta",
    description: "Tu progreso queda visible y Eaxy te devuelve siempre al siguiente paso útil.",
  },
];

const faqs = [
  {
    q: "¿Para quién es Eaxy?",
    a: "Para estudiantes de ESO y Bachillerato que quieren entender, practicar y avanzar en ciencias a su ritmo.",
  },
  {
    q: "¿Puedo empezar sin registrarme?",
    a: "Sí. Puedes abrir una materia y empezar de inmediato. El progreso se guarda en este navegador.",
  },
  {
    q: "¿Qué gano con una cuenta?",
    a: "Tu progreso se sincroniza para que puedas continuar en otro momento o dispositivo.",
  },
  {
    q: "¿Cómo decide Eaxy qué hacer después?",
    a: "Usa reglas claras basadas en las lecciones completadas, tus intentos y el dominio de cada concepto.",
  },
];

export default async function HomePage() {
  const studentId = await getAuthenticatedUserIdOrNull();
  const continueStudying = await getAprenderContinueStudying(studentId);
  const courses = [...curriculum.courses].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="campus-motion flex flex-1 flex-col bg-paper">
      <SiteHeader />

      <main className="flex-1">
        <section className="px-4 pb-16 pt-8 sm:px-6 lg:pb-24 lg:pt-12">
          <div className="relative mx-auto grid min-h-[36rem] w-full max-w-7xl items-center gap-10 overflow-hidden rounded-[2.5rem] bg-[#cfe9dd] px-7 py-12 sm:px-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.72fr)] lg:px-14 lg:py-16">
            <span className="pointer-events-none absolute -right-10 -top-16 size-60 rounded-full bg-[var(--sun)]/90" aria-hidden />
            <span className="pointer-events-none absolute -bottom-16 right-[28%] size-36 rounded-full bg-[var(--coral)]" aria-hidden />
            <span className="pointer-events-none absolute left-[52%] top-10 size-5 rounded-full bg-ink/20" aria-hidden />

            <div className="relative z-10 max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/55 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-[#2b7664] ring-1 ring-white/60">
                <SparklesIcon className="size-3.5" aria-hidden />
                Aprende haciendo
              </p>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.6rem]">
                Tu siguiente gran idea empieza aquí.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#46655d]">
                Ciencias explicadas con claridad, práctica con ayuda y una ruta que te enseña qué
                hacer después.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-full px-6"
                  nativeButton={false}
                  render={<Link href="#materias" />}
                >
                  Elegir mi curso
                  <ArrowRightIcon data-icon="inline-end" aria-hidden />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/75 bg-white/55 px-6"
                  nativeButton={false}
                  render={<Link href="#como-funciona" />}
                >
                  Ver cómo funciona
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-[#4d6b63]">
                {["Sin registro para empezar", "Feedback inmediato", "Progreso claro"].map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <CheckIcon className="size-4 text-[#2b7664]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 lg:pl-4">
              {continueStudying ? (
                <HomeContinueCard entry={continueStudying.primary} />
              ) : (
                <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-xl backdrop-blur">
                  <HeroEquation />
                  <p className="mt-4 text-sm font-semibold text-ink-muted">
                    Explora una idea, compruébala y sigue avanzando.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          id="materias"
          aria-labelledby="materias-title"
          className="scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#a55439]">Materias</p>
                <h2 id="materias-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">
                  ¿Qué quieres aprender?
                </h2>
                <p className="mt-3 text-ink-muted">
                  Primero elige una materia. Dentro verás tus años y, solo cuando haga falta, el itinerario.
                </p>
              </div>
              <Link href="/aprender" className="hidden items-center gap-1 text-sm font-bold text-ink hover:underline md:inline-flex">
                Abrir Aprender
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-10"><HomeCourseExplorer courses={courses} /></div>
          </div>
        </section>

        <section
          id="como-funciona"
          aria-labelledby="como-funciona-title"
          className="scroll-mt-24 border-y border-border bg-[#fff9eb] px-4 py-16 sm:px-6 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#a55439]">Cómo funciona</p>
                <h2 id="como-funciona-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">
                  Menos dudas. Más avanzar.
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
                  La estructura siempre te orienta: dónde estás, qué estás aprendiendo y qué viene después.
                </p>
              </div>
              <ol className="grid gap-4 md:grid-cols-3">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.number} className="rounded-[1.5rem] border border-border bg-paper-raised p-5 shadow-[0_16px_40px_-32px_rgb(25_58_50/0.45)]">
                      <div className="flex items-center justify-between">
                        <span className="flex size-10 items-center justify-center rounded-2xl bg-cobalt-tint text-ink"><Icon className="size-5" aria-hidden /></span>
                        <span className="font-mono text-xs font-bold text-ink-muted/60">{step.number}</span>
                      </div>
                      <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="demo-title" className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2b7664]">Dentro de una lección</p>
              <h2 id="demo-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">
                Las ideas se entienden cuando puedes probarlas.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-muted">
                Una explicación visual y una pregunta concreta convierten la teoría en algo que puedes comprobar por ti mismo.
              </p>
              <div className="mt-7 rounded-[1.5rem] border border-border bg-paper-raised p-4"><HeroEquation /></div>
            </div>
            <div className="rounded-[2rem] border border-border bg-[#e5eee9] p-4 shadow-[0_26px_60px_-42px_rgb(25_58_50/0.55)] sm:p-6"><DemoExercise /></div>
          </div>
        </section>

        <section aria-labelledby="preguntas-title" className="border-t border-border bg-paper-raised px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#a55439]">Antes de empezar</p>
              <h2 id="preguntas-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink">Preguntas frecuentes</h2>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border border-border bg-paper px-5 py-4 open:bg-[#fff9eb]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDownIcon className="size-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-ink px-8 py-14 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <span className="pointer-events-none absolute -right-16 -top-24 size-64 rounded-full bg-[var(--sun)]/90" aria-hidden />
            <div className="relative max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#cfe9dd]"><BrainCircuitIcon className="size-4" aria-hidden />Tu ruta empieza aquí</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Elige tu curso y abre la primera lección.</h2>
            </div>
            <Button variant="sun" size="lg" className="relative mt-7 rounded-full lg:mt-0" nativeButton={false} render={<Link href="/aprender" />}>
              Ir a Aprender<ArrowRightIcon data-icon="inline-end" aria-hidden />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-paper-raised">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-9 text-sm text-ink-muted sm:px-6">
          <div className="space-y-2"><BrandLogo /><p>© {new Date().getFullYear()} Eaxy — Ciencias para ESO y Bachillerato</p></div>
          <nav className="flex gap-5" aria-label="Pie de página">
            <Link href="/aprender" className="hover:text-ink">Aprender</Link>
            <Link href="/practicar" className="hover:text-ink">Practicar</Link>
            <Link href="/perfil" className="hover:text-ink">Mi progreso</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
