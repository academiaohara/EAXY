"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatRecommendationDetails } from "@/lib/recommendations/format-details";
import type { Recommendation, RecommendationAction } from "@/lib/recommendations/types";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

function actionLabel(action: RecommendationAction): string {
  switch (action) {
    case "recover":
      return "Recuperación";
    case "reinforce":
      return "Refuerzo";
    case "advance":
      return "Avance";
    case "rest":
      return "Descanso";
    default:
      return "Práctica";
  }
}

function actionHref(recommendation: Recommendation): string | null {
  if (recommendation.action === "rest") {
    return null;
  }

  if (recommendation.exerciseId) {
    return `/aprender/ejercicio/${recommendation.exerciseId}`;
  }

  if (recommendation.lessonId) {
    return `/aprender/leccion/${recommendation.lessonId}`;
  }

  return "/aprender";
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const href = actionHref(recommendation);
  const detailRows = formatRecommendationDetails(recommendation.explanation.details);

  return (
    <Card className="border-cobalt/20 bg-cobalt-tint/20 p-5" data-testid="recommendation-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-medium">Recomendado para ti</h2>
            <Badge variant="secondary">{actionLabel(recommendation.action)}</Badge>
          </div>
          <p className="text-sm text-ink" data-testid="recommendation-summary">
            {recommendation.explanation.summary}
          </p>
          <button
            type="button"
            className="text-sm text-cobalt underline-offset-4 hover:underline"
            onClick={() => setShowDetails((current) => !current)}
            data-testid="recommendation-why-toggle"
          >
            {showDetails ? "Ocultar detalles" : "¿Por qué me recomiendas esto?"}
          </button>
          {showDetails ? (
            <dl
              className="rounded-md bg-paper-raised p-3 text-sm"
              data-testid="recommendation-details"
            >
              {detailRows.map((row) => (
                <div key={row.label} className="flex flex-wrap gap-x-2 py-1">
                  <dt className="text-muted-foreground">{row.label}:</dt>
                  <dd className="font-medium text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {href ? (
          <Button
            nativeButton={false}
            render={<Link href={href} data-testid="recommendation-cta" />}
          >
            Empezar
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
