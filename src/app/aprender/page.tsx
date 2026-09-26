import Link from "next/link";
import { AprenderQuickStats } from "@/components/learning/aprender-quick-stats";
import { CourseCatalogView } from "@/components/learning/course-catalog";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseCatalog } from "@/lib/curriculum/queries";
import { getCourseOverview } from "@/lib/learning/queries";
import { resolveRecommendationHref } from "@/lib/recommendations/resolve-href";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function AprenderPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  const [catalog, recommendation, overview] = await Promise.all([
    getCourseCatalog(),
    studentId ? getStudentRecommendation(studentId) : Promise.resolve(null),
    studentId ? getCourseOverview() : Promise.resolve(null),
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
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Aprender</h1>
        <p className="text-muted-foreground">
          Elige tu nivel y accede a las lecciones disponibles. Iremos ampliando el catálogo poco a
          poco.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
        <div className="space-y-6">
          {recommendation ? (
            <RecommendationCard
              recommendation={recommendation}
              actionHref={recommendationHref}
            />
          ) : null}

          <CourseCatalogView courses={catalog} />
        </div>

        <aside className="space-y-4 lg:row-start-1 lg:col-start-2">
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
