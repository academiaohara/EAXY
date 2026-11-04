import { AprenderContinueSection } from "@/components/learning/aprender-continue-section";
import { SubjectCards } from "@/components/learning/subject-cards";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { getSessionUser } from "@/lib/auth/session";
import { getAprenderContinueStudying } from "@/lib/curriculum/aprender-home";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseCatalog } from "@/lib/curriculum/queries";
import { resolveRecommendationHref } from "@/lib/recommendations/resolve-href";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function AprenderPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  const [catalog, recommendation, continueStudying, user] = await Promise.all([
    getCourseCatalog(),
    studentId ? getStudentRecommendation(studentId) : Promise.resolve(null),
    getAprenderContinueStudying(studentId),
    getSessionUser(),
  ]);

  if (catalog.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Aprender
        </h1>
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
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-6 py-10 lg:px-10 lg:py-14">
      <header className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-10 text-white shadow-[0_28px_70px_-42px_rgb(25_58_50/0.7)]">
        <span
          className="absolute -right-12 -top-20 size-64 rounded-full bg-sun/90"
          aria-hidden
        />
        <span
          className="absolute -bottom-20 right-40 size-40 rotate-12 rounded-[2.5rem] bg-coral/80"
          aria-hidden
        />
        <div className="relative max-w-2xl space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sun">
            Tu campus
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {firstName ? `Hola, ${firstName}` : "¿Qué aprendemos hoy?"}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-white/75">
            {continueStudying
              ? "Retoma donde lo dejaste o explora otra materia."
              : "Matemáticas, física y tecnología: elige una materia y empieza tu primera lección."}
          </p>
        </div>
      </header>

      <div className="min-w-0 space-y-10">
        {continueStudying ? (
          <AprenderContinueSection data={continueStudying} />
        ) : null}

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
    </div>
  );
}
