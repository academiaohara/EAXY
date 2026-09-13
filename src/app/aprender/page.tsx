import Link from "next/link";
import { AprenderQuickStats } from "@/components/learning/aprender-quick-stats";
import { CourseOutlineView } from "@/components/learning/course-outline";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getCourseOutline } from "@/lib/curriculum/queries";
import { getCourseOverview } from "@/lib/learning/queries";
import { resolveRecommendationHref } from "@/lib/recommendations/resolve-href";
import { getStudentRecommendation } from "@/lib/recommendations/queries";

export default async function AprenderPage() {
  const studentId = (await getAuthenticatedUserIdOrNull())!;

  const [outline, recommendation, overview] = await Promise.all([
    getCourseOutline(studentId),
    getStudentRecommendation(studentId),
    getCourseOverview(),
  ]);

  if (!outline) {
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
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6 sm:p-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Aprender</h1>
        <p className="text-muted-foreground">
          Tu espacio de aprendizaje personal. Practica ejercicios y sigue tu progreso por
          concepto.
        </p>
      </header>

      <AprenderQuickStats overview={overview} />

      {recommendation ? (
        <RecommendationCard
          recommendation={recommendation}
          actionHref={recommendationHref}
        />
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Práctica libre</CardTitle>
          <CardDescription>
            Continúa practicando para reforzar lo que vas aprendiendo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/practicar">
            <Button data-testid="aprender-practicar-link">Ir a practicar</Button>
          </Link>
          <Link href="/progreso">
            <Button variant="outline" data-testid="aprender-progreso-link">
              Ver progreso
            </Button>
          </Link>
        </CardContent>
      </Card>

      <CourseOutlineView outline={outline} />
    </main>
  );
}
