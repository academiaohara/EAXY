import type { Recommendation } from "@/lib/recommendations/types";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <section
      className="rounded-lg border border-cobalt/30 bg-cobalt-tint/20 p-4"
      data-testid="recommendation-card"
    >
      <p className="text-sm font-medium text-ink" data-testid="recommendation-summary">
        {recommendation.explanation.summary}
      </p>

      <details className="mt-3 text-sm text-muted-foreground">
        <summary
          className="cursor-pointer font-medium text-cobalt"
          data-testid="recommendation-why-toggle"
        >
          ¿Por qué me recomiendas esto?
        </summary>
        <pre
          className="mt-2 overflow-x-auto rounded-md bg-paper p-3 text-xs"
          data-testid="recommendation-details"
        >
          {JSON.stringify(recommendation.explanation.details, null, 2)}
        </pre>
      </details>
    </section>
  );
}
