import Link from "next/link";
import { MasteryProgressBar } from "@/components/learning/mastery-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseOverview } from "@/lib/learning/queries";
import { formatMasteryPercent } from "@/lib/mastery/states";

type AprenderQuickStatsProps = {
  overview: CourseOverview;
};

export function AprenderQuickStats({ overview }: AprenderQuickStatsProps) {
  const averageMastery =
    overview.concepts.length > 0
      ? overview.concepts.reduce((sum, concept) => sum + concept.mastery, 0) /
        overview.concepts.length
      : 0;

  return (
    <Card data-testid="aprender-quick-stats">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Tu progreso</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              {formatMasteryPercent(averageMastery)}
            </p>
            <p className="text-xs text-muted-foreground">Dominio medio</p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              {overview.practicedCount}/{overview.concepts.length}
            </p>
            <p className="text-xs text-muted-foreground">Practicados</p>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              {overview.masteredCount}
            </p>
            <p className="text-xs text-muted-foreground">Dominados</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progreso global</span>
            <span>{formatMasteryPercent(averageMastery)}</span>
          </div>
          <MasteryProgressBar
            mastery={averageMastery}
            attemptCount={overview.practicedCount > 0 ? 1 : 0}
          />
        </div>

        <Link href="/perfil">
          <Button variant="outline" size="sm" className="w-full">
            Ver mapa de conceptos
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
