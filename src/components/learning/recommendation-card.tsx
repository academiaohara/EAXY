import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recommendation } from "@/lib/recommendations/types";

const ACTION_LABELS: Record<Recommendation["action"], string> = {
  practice: "Practicar",
  reinforce: "Reforzar",
  recover: "Recuperar",
  advance: "Avanzar",
  rest: "Descansar",
};

type RecommendationCardProps = {
  recommendation: Recommendation;
  conceptTitle?: string;
  conceptSlug?: string | null;
};

export function RecommendationCard({
  recommendation,
  conceptTitle,
  conceptSlug,
}: RecommendationCardProps) {
  const isRest = recommendation.action === "rest";
  const slug = conceptSlug ?? null;
  const canPractice = !isRest && slug;

  return (
    <Card className="border-cobalt/20 bg-gradient-to-br from-cobalt-tint/40 to-paper-raised">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-cobalt/10 p-2 text-cobalt">
            <SparklesIcon className="size-5" aria-hidden />
          </div>
          <div className="space-y-1">
            <CardDescription>Tu siguiente paso</CardDescription>
            <CardTitle className="font-display text-xl">
              {conceptTitle ?? ACTION_LABELS[recommendation.action]}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-ink-muted">{recommendation.explanation.summary}</p>

        <details className="rounded-lg border border-border bg-paper px-3 py-2 text-sm">
          <summary className="cursor-pointer font-medium text-ink">
            ¿Por qué me recomiendas esto?
          </summary>
          <dl className="mt-3 space-y-2 text-ink-muted">
            <div>
              <dt className="font-medium text-ink">Regla</dt>
              <dd>{recommendation.explanation.ruleId}</dd>
            </div>
            {Object.entries(recommendation.explanation.details).map(([key, value]) => (
              <div key={key}>
                <dt className="font-medium capitalize text-ink">{key.replace(/([A-Z])/g, " $1")}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </details>

        {canPractice && (
          <Link href={`/practicar/${slug}`}>
            <Button className="w-full sm:w-auto">{ACTION_LABELS[recommendation.action]}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
