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
