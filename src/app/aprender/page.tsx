import Link from "next/link";
import { ArrowRightIcon, TargetIcon } from "lucide-react";
import { AprenderContinueSection } from "@/components/learning/aprender-continue-section";
import { AprenderQuickStats } from "@/components/learning/aprender-quick-stats";
import { SubjectCards } from "@/components/learning/subject-cards";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { getSessionUser } from "@/lib/auth/session";
import { getAprenderContinueStudying } from "@/lib/curriculum/aprender-home";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseCatalog } from "@/lib/curriculum/queries";
import { getCourseOverview } from "@/lib/learning/queries";
import { resolveRecommendationHref } from "@/lib/recommendations/resolve-href";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

const QUICK_LINKS = [
  {
    href: "/practicar",
    label: "Práctica libre",
    description: "Ejercicios del concepto que más te conviene ahora.",
    icon: TargetIcon,
    testId: "aprender-practicar-link",
  },
] as const;

export default async function AprenderPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  const [catalog, recommendation, overview, continueStudying, user] = await Promise.all([
    getCourseCatalog(),
    studentId ? getStudentRecommendation(studentId) : Promise.resolve(null),
    studentId ? getCourseOverview() : Promise.resolve(null),
    getAprenderContinueStudying(studentId),
    getSessionUser(),
  ]);

  if (catalog.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Aprender</h1>
        <p className="mt-2 text-muted-foreground">
          No hay cursos disponibles todavía. Vuelve más tarde.
        </p>
      </div>
    );
  }

  const recommendationHref = recommendation
    ? resolveRecommendationHref(recommendation)
    : null;
  const firstName = user?.displayName.split(/\s+/)[0];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {firstName ? `Hola, ${firstName}` : "¿Qué aprendemos hoy?"}
        </h1>
        <p className="max-w-2xl text-ink-muted">
          {continueStudying
            ? "Retoma donde lo dejaste o explora otra materia."
            : "Matemáticas, física y tecnología: elige una materia y empieza tu primera lección."}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="min-w-0 space-y-10">
          {continueStudying ? <AprenderContinueSection data={continueStudying} /> : null}

          {recommendation ? (
            <RecommendationCard
              recommendation={recommendation}
              actionHref={recommendationHref}
            />
          ) : null}

          <div id="materias" className="scroll-mt-24">
            <SubjectCards courses={catalog} />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {overview && overview.concepts.length > 0 ? (
            <AprenderQuickStats overview={overview} />
          ) : null}

          <nav aria-label="Accesos rápidos" className="space-y-3">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={link.testId}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-paper-raised p-4 shadow-xs outline-none transition-all hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-cobalt/40"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cobalt-tint text-cobalt transition-colors group-hover:bg-cobalt group-hover:text-white"
                    aria-hidden
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink">{link.label}</span>
                    <span className="block text-xs text-ink-muted">{link.description}</span>
                  </span>
                  <ArrowRightIcon
                    className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-cobalt"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
}
