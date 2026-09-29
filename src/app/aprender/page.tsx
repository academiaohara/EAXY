import Link from "next/link";
import { AprenderContinueSection } from "@/components/learning/aprender-continue-section";
import { AprenderQuickStats } from "@/components/learning/aprender-quick-stats";
import { CourseCatalogView } from "@/components/learning/course-catalog";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAprenderContinueStudying } from "@/lib/curriculum/aprender-home";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseCatalog } from "@/lib/curriculum/queries";
import { getCourseOverview } from "@/lib/learning/queries";
import { resolveRecommendationHref } from "@/lib/recommendations/resolve-href";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function AprenderPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  const [catalog, recommendation, overview, continueStudying] = await Promise.all([
    getCourseCatalog(),
    studentId ? getStudentRecommendation(studentId) : Promise.resolve(null),
    studentId ? getCourseOverview() : Promise.resolve(null),
    getAprenderContinueStudying(studentId),
  ]);

  if (catalog.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Aprender</h1>
        <p className="mt-2 text-muted-foreground">
          No hay cursos disponibles todavía. Vuelve más tarde.
        </p>
      </main>
    );
  }

  const recommendationHref = recommendation
    ? resolveRecommendationHref(recommendation)
    : null;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Inicio</h1>
        <p className="max-w-2xl text-muted-foreground">
          Retoma lo que estabas estudiando o elige un curso del catálogo completo.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
        <div className="space-y-10">
          {continueStudying ? <AprenderContinueSection data={continueStudying} /> : null}

          {recommendation ? (
            <RecommendationCard
              recommendation={recommendation}
              actionHref={recommendationHref}
            />
          ) : null}

          <div id="todos-los-cursos" className="scroll-mt-6">
            <CourseCatalogView courses={catalog} />
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          {overview && overview.concepts.length > 0 ? (
            <AprenderQuickStats overview={overview} />
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Práctica libre</CardTitle>
              <CardDescription>
                Refuerza conceptos con ejercicios cuando estén disponibles en tu nivel.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/practicar" className="w-full">
                <Button data-testid="aprender-practicar-link" className="w-full">
                  Ir a practicar
                </Button>
              </Link>
              <Link href="/progreso" className="w-full">
                <Button variant="outline" data-testid="aprender-progreso-link" className="w-full">
                  Ver progreso
                </Button>
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
