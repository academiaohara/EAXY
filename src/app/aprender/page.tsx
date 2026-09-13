import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, TargetIcon, TrophyIcon } from "lucide-react";
import { ConceptMap } from "@/components/learning/concept-map";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { getConceptById } from "@/content";
import {
  getCourseOverview,
  getPrimaryRecommendationForStudent,
} from "@/lib/learning/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AprenderPage() {
  const [overview, recommendation] = await Promise.all([
    getCourseOverview(),
    getPrimaryRecommendationForStudent(),
  ]);

  const recommendedConcept =
    recommendation?.conceptId != null
      ? getConceptById(recommendation.conceptId)
      : undefined;

  const nextConcepts = overview.concepts
    .filter((concept) => concept.attemptCount === 0)
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Aprender</h1>
        <p className="max-w-2xl text-ink-muted">{overview.courseDescription}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <BookOpenIcon className="size-5 text-cobalt" aria-hidden />
            <CardTitle className="text-base">Conceptos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-semibold">{overview.concepts.length}</p>
            <p className="text-sm text-ink-muted">en {overview.courseTitle}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <TargetIcon className="size-5 text-cobalt" aria-hidden />
            <CardTitle className="text-base">Practicados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-semibold">{overview.practicedCount}</p>
            <p className="text-sm text-ink-muted">conceptos con al menos un intento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <TrophyIcon className="size-5 text-cobalt" aria-hidden />
            <CardTitle className="text-base">Dominados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-display text-3xl font-semibold">{overview.masteredCount}</p>
            <p className="text-sm text-ink-muted">mastery ≥ 85 %</p>
          </CardContent>
        </Card>
      </div>

      {recommendation && (
        <RecommendationCard
          recommendation={recommendation}
          conceptTitle={recommendedConcept?.title}
          conceptSlug={recommendedConcept?.slug ?? null}
        />
      )}

      {nextConcepts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-ink">Por empezar</h2>
            <Link href="/progreso">
              <Button variant="ghost" size="sm">
                Ver mapa completo
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
            </Link>
          </div>
          <ConceptMap concepts={nextConcepts} groupByModule={false} />
        </section>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">Todo el curso</h2>
        <ConceptMap concepts={overview.concepts} />
      </section>
    </div>
  );
}
