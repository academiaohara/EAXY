import Link from "next/link";
import {
  ArrowRightIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  CheckIcon,
  ChevronDownIcon,
  CloudIcon,
  LineChartIcon,
  SparklesIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DemoExercise } from "@/components/marketing/demo-exercise";
import { HeroEquation } from "@/components/marketing/hero-equation";
import { SectionDotNav } from "@/components/marketing/section-dot-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { curriculum } from "@/content";
import { courseHref, courseShortTitle } from "@/lib/navigation/learning-trail";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BrainCircuitIcon,
    title: "Aprendizaje adaptativo",
    description:
      "El sistema mide tu dominio en cada concepto y te sugiere qué practicar, reforzar o avanzar — con una explicación clara de por qué.",
    className: "lg:col-span-2",
  },
  {
    icon: SparklesIcon,
    title: "Lecciones interactivas",
    description:
      "Recorridos guiados con tutor integrado, teoría resaltada y feedback inmediato en cada paso.",
  },
  {
    icon: BookOpenIcon,
    title: "De 1.º ESO a 2.º Bachillerato",
    description:
      "Catálogo progresivo por niveles: elige tu curso y accede a lecciones y ejercicios adaptados a lo que ya dominas.",
  },
  {
    icon: LineChartIcon,
    title: "Dominio visible",
    description:
      "Cada respuesta actualiza tu dominio. Ves en qué conceptos vas bien y cuáles necesitan más práctica.",
  },
  {
    icon: CloudIcon,
    title: "Con o sin cuenta",
    description:
      "Empieza al instante sin registrarte; tu progreso se guarda en el navegador. Con cuenta, se sincroniza para no perderlo.",
  },
];

const steps = [
  {
    title: "Elige tu curso",
    description: "Entra en tu nivel y abre el temario: verás qué temas hay y por dónde seguir.",
  },
  {
    title: "Aprende y practica",
    description: "Lecciones guiadas paso a paso y ejercicios con feedback inmediato.",
  },
  {
    title: "Sigue la recomendación",
    description: "Tu dominio se actualiza en cada intento y te indica el siguiente paso: recuperar, reforzar o avanzar.",
  },
];

const faqs = [
  {
    q: "¿Para quién es Eaxy?",
    a: "Para estudiantes de ESO y bachillerato que quieren practicar matemáticas a su ritmo, con o sin cuenta.",
  },
  {
    q: "¿Puedo usar Eaxy sin registrarme?",
    a: "Sí. Entra en Aprender y empieza. Tu progreso se guarda solo en este navegador; si borras datos o cambias de dispositivo, puedes perderlo.",
  },
  {
    q: "¿Qué gano con una cuenta?",
    a: "Tu progreso, intentos y dominio se guardan en la nube y te siguen en cualquier dispositivo donde inicies sesión.",
  },
  {
    q: "¿Usa inteligencia artificial?",
    a: "No en esta versión. Las recomendaciones se basan en reglas explícitas sobre tu dominio y tu historial de intentos.",
  },
];

const HIGHLIGHTS = ["Gratis", "Sin registro para empezar", "Feedback inmediato"];

const PAGE_SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "como-funciona", label: "Cómo funciona" },
  { id: "cursos", label: "Cursos" },
  { id: "ventajas", label: "Ventajas" },
  { id: "preguntas", label: "Preguntas" },
] as const;

export default function HomePage() {
  const courses = [...curriculum.courses].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <SectionDotNav sections={PAGE_SECTIONS} />

      <main className="flex-1">
        <section id="inicio" className="relative scroll-mt-20 overflow-hidden bg-app-glow">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
            <div className="space-y-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-cobalt/15 bg-paper-raised/80 px-3 py-1 text-xs font-semibold text-cobalt shadow-xs">
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                Matemáticas adaptativas · ESO y Bachillerato
              </p>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Aprende matemáticas{" "}
                <span className="bg-gradient-to-r from-cobalt to-violet-500 bg-clip-text text-transparent">
                  haciendo
                </span>
                , a tu ritmo
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-ink-muted">
                Un curso estructurado con lecciones interactivas y un motor de recomendaciones que te
                dice qué practicar a continuación — y por qué.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="rounded-full"
                  nativeButton={false}
                  render={<Link href="/aprender" />}
                >
                  Empezar ahora
                  <ArrowRightIcon data-icon="inline-end" aria-hidden />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full"
                  nativeButton={false}
                  render={<Link href="/registro" />}
                >
                  Crear cuenta
                </Button>
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-muted">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <CheckIcon className="size-4 text-emerald-500" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cobalt/15 via-violet-400/10 to-emerald-300/15 blur-2xl"
                aria-hidden
              />
              <div className="relative space-y-4 rounded-[2rem] border border-white/60 bg-white/50 p-4 shadow-xl shadow-cobalt/5 backdrop-blur sm:p-5">
                <HeroEquation />
                <DemoExercise />
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-20 border-y border-border bg-paper-raised">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cobalt">Cómo funciona</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Siempre sabes cuál es tu siguiente paso
              </h2>
              <p className="mt-3 text-ink-muted">
                Sin algoritmos opacos: cada recomendación incluye su motivo.
              </p>
            </div>

            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-paper p-6"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-cobalt font-display text-base font-bold text-white shadow-md shadow-cobalt/25">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="cursos" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cobalt">Cursos</p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  Elige tu nivel
                </h2>
              </div>
              <Link
                href="/aprender"
                className="inline-flex items-center gap-1 text-sm font-semibold text-cobalt hover:underline underline-offset-4"
              >
                Ver todo en Aprender
                <ArrowRightIcon className="size-4" aria-hidden />
              </Link>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => {
                const lessonCount = course.modules.reduce(
                  (sum, courseModule) => sum + courseModule.lessons.length,
                  0,
                );
                const available = lessonCount > 0;
                return (
                  <li key={course.id}>
                    <Link
                      href={courseHref(course.slug)}
                      className={cn(
                        "group flex items-center justify-between gap-3 rounded-2xl border bg-paper-raised px-5 py-4 shadow-xs transition-all",
                        available
                          ? "border-border hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md"
                          : "border-dashed border-border opacity-70",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block font-display font-bold text-ink group-hover:text-cobalt">
                          {courseShortTitle(course.title)}
                        </span>
                        <span className="block text-xs text-ink-muted">
                          {available
                            ? `${course.modules.length} temas · ${lessonCount} lecciones`
                            : "Próximamente"}
                        </span>
                      </span>
                      <ArrowRightIcon
                        className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="ventajas" className="scroll-mt-20 border-y border-border bg-paper-raised">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Todo lo que necesitas para aprender
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={cn(
                      "rounded-2xl border border-border bg-paper p-6 transition-colors hover:border-cobalt/30",
                      feature.className,
                    )}
                  >
                    <span className="inline-flex rounded-xl bg-cobalt-tint p-2.5 text-cobalt">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="preguntas" className="scroll-mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.5fr] lg:py-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-cobalt">FAQ</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Preguntas frecuentes
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-border bg-paper-raised px-5 py-4 shadow-xs open:border-cobalt/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDownIcon
                      className="size-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-cobalt via-indigo-600 to-violet-600 px-6 py-14 text-center text-white shadow-xl shadow-cobalt/20 sm:px-12">
            <div
              className="pointer-events-none absolute -left-10 -top-24 size-80 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
            <h2 className="relative font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Empieza hoy con Eaxy
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-white/80">
              Prueba el catálogo sin registro o crea una cuenta gratis para guardar tu progreso en la
              nube.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="rounded-full bg-white text-cobalt hover:bg-white/90"
                nativeButton={false}
                render={<Link href="/aprender" />}
              >
                Ir a Aprender
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full text-white ring-1 ring-white/40 hover:bg-white/15 hover:text-white"
                nativeButton={false}
                render={<Link href="/registro" />}
              >
                Crear cuenta
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-paper-raised">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-2">
            <BrandLogo />
            <p>© {new Date().getFullYear()} Eaxy · Matemáticas adaptativas</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Pie de página">
            <Link href="/aprender" className="transition-colors hover:text-cobalt">
              Aprender
            </Link>
            <Link href="/practicar" className="transition-colors hover:text-cobalt">
              Practicar
            </Link>
            <Link href="/progreso" className="transition-colors hover:text-cobalt">
              Progreso
            </Link>
            <Link href="/login" className="transition-colors hover:text-cobalt">
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
