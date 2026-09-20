import Link from "next/link";
import {
  BookOpenIcon,
  BrainCircuitIcon,
  GraduationCapIcon,
  LineChartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";
import { DemoExercise } from "@/components/marketing/demo-exercise";
import { HeroEquation } from "@/components/marketing/hero-equation";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { curriculum } from "@/content";

const features = [
  {
    icon: BrainCircuitIcon,
    title: "Aprendizaje adaptativo",
    description:
      "El sistema mide tu dominio en cada concepto y te sugiere qué practicar, reforzar o avanzar — con una explicación clara de por qué.",
  },
  {
    icon: BookOpenIcon,
    title: "De 1.º ESO a 2.º Bachillerato",
    description:
      "Catálogo progresivo por niveles: elige tu curso y accede a lecciones interactivas y ejercicios adaptados a lo que ya dominas.",
  },
  {
    icon: UsersIcon,
    title: "Aulas para profesores",
    description:
      "Alta masiva de alumnos con credenciales generadas, seguimiento del progreso del grupo y tarjetas de acceso para imprimir.",
  },
  {
    icon: LineChartIcon,
    title: "Dominio visible",
    description:
      "Cada respuesta actualiza tu mastery. Ves en qué conceptos vas bien y cuáles necesitan más práctica.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Privacidad de menores",
    description:
      "Los alumnos de aula entran con usuario y contraseña provisionados. Sin email ni datos de contacto del menor.",
  },
  {
    icon: SparklesIcon,
    title: "Sin caja negra",
    description:
      "Las recomendaciones son reglas deterministas y explicables. Sin IA opaca: sabes por qué te sugiere cada paso.",
  },
];

const steps = [
  {
    title: "Practica",
    description: "Resuelve ejercicios con feedback inmediato y explicaciones paso a paso.",
  },
  {
    title: "Mide tu dominio",
    description: "Cada intento actualiza tu mastery con una fórmula transparente.",
  },
  {
    title: "Sigue la recomendación",
    description: "El motor te indica el siguiente concepto: recuperar, reforzar o avanzar.",
  },
];

const faqs = [
  {
    q: "¿Para quién es Eaxy?",
    a: "Para estudiantes de ESO y bachillerato inicial que quieren practicar matemáticas, y para profesores que gestionan aulas con seguimiento del progreso.",
  },
  {
    q: "¿Cómo entran los alumnos de un aula?",
    a: "El profesor da de alta a los alumnos por nombre. Eaxy genera usuario y contraseña. Los alumnos entran en /entrar — no necesitan email propio.",
  },
  {
    q: "¿Puedo estudiar sin profesor?",
    a: "Sí. Crea una cuenta adulta y accede al curso completo en modo personal, con recomendaciones adaptativas.",
  },
  {
    q: "¿Usa inteligencia artificial?",
    a: "No en esta versión. Las recomendaciones se basan en reglas explícitas sobre tu dominio y tu historial de intentos.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full border border-cobalt/20 bg-cobalt-tint/50 px-3 py-1 text-xs font-medium text-cobalt">
                <GraduationCapIcon className="size-3.5" aria-hidden />
                Matemáticas adaptativas · ESO y Bachillerato
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
                Aprende matemáticas haciendo, a tu ritmo
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-ink-muted">
                Eaxy combina un curso estructurado con ejercicios interactivos y un motor de
                recomendaciones que te dice qué practicar a continuación — y por qué.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/registro">
                  <Button size="lg">Empezar gratis</Button>
                </Link>
                <Link href="/entrar">
                  <Button variant="outline" size="lg">
                    Soy alumno
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-ink-muted">
                {curriculum.courses.length} niveles · lecciones interactivas · feedback inmediato
              </p>
            </div>

            <div className="space-y-4">
              <HeroEquation />
              <DemoExercise />
            </div>
          </div>
        </section>

        <section id="como-funciona" className="border-b border-border bg-paper-raised/50">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Cómo funciona
              </h2>
              <p className="mt-3 text-ink-muted">
                Tres pasos simples. Sin algoritmos opacos: cada recomendación incluye su motivo.
              </p>
            </div>

            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="relative rounded-xl border border-border bg-paper-raised p-6">
                  <span className="font-display text-4xl font-semibold text-cobalt/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Todo lo que necesitas para aprender y enseñar
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="h-full">
                    <CardHeader>
                      <div className="mb-2 inline-flex rounded-lg bg-cobalt-tint p-2 text-cobalt">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <CardTitle className="font-display text-lg">{feature.title}</CardTitle>
                      <CardDescription className="leading-relaxed">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="para-profesores" className="border-b border-border bg-cobalt-tint/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Para profesores
              </h2>
              <p className="text-ink-muted">
                Crea un aula, pega la lista de nombres y Eaxy genera credenciales automáticamente.
                Consulta el progreso de cada alumno por concepto y exporta tarjetas de acceso cuando
                quieras.
              </p>
              <ul className="space-y-2 text-sm text-ink-muted">
                <li>· Alta masiva sin email del menor</li>
                <li>· Usuario y contraseña únicos por alumno</li>
                <li>· Mastery global visible por concepto</li>
                <li>· Co-docencia con otros profesores</li>
              </ul>
              <Link href="/login">
                <Button>Crear mi aula</Button>
              </Link>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Dos modos, un progreso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-ink-muted">
                <p>
                  <strong className="text-ink">Modo personal</strong> — el estudiante adulto recorre
                  el curso con recomendaciones adaptativas.
                </p>
                <p>
                  <strong className="text-ink">Modo aula</strong> — el profesor contextualiza el
                  aprendizaje con tareas y seguimiento, pero el mastery sigue siendo del alumno.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Preguntas frecuentes
            </h2>
            <dl className="mt-10 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-border bg-paper-raised p-5">
                  <dt className="font-medium text-ink">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="rounded-2xl border border-cobalt/20 bg-gradient-to-br from-cobalt-tint to-paper-raised px-6 py-12 text-center sm:px-12">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
                Empieza hoy con Eaxy
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-ink-muted">
                Regístrate gratis y practica tu primer ejercicio en menos de un minuto. Si eres
                profesor, crea tu aula y da de alta a tus alumnos al instante.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/registro">
                  <Button size="lg">Crear cuenta</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">
                    Acceso docente
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Eaxy</p>
          <div className="flex gap-4">
            <Link href="/entrar" className="transition-colors hover:text-cobalt">
              Entrar como alumno
            </Link>
            <Link href="/login" className="transition-colors hover:text-cobalt">
              Acceso docente
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
