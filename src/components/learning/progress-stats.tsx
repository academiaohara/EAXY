import type { ConceptProgress } from "@/lib/learning/queries";
import { getMasteryState, type MasteryState } from "@/lib/mastery/states";

type ProgressStatsProps = {
  concepts: ConceptProgress[];
};

type StatCounts = Record<MasteryState, number>;

const STAT_LABELS: Record<MasteryState, string> = {
  not_started: "Sin empezar",
  struggling: "En recuperación",
  developing: "En progreso",
  proficient: "Competente",
  mastered: "Dominado",
};

function computeStatCounts(concepts: ConceptProgress[]): StatCounts {
  const counts: StatCounts = {
    not_started: 0,
    struggling: 0,
    developing: 0,
    proficient: 0,
    mastered: 0,
  };

  for (const concept of concepts) {
    const state = getMasteryState(concept.mastery, concept.attemptCount);
    counts[state] += 1;
  }

  return counts;
}

export function ProgressStats({ concepts }: ProgressStatsProps) {
  const counts = computeStatCounts(concepts);

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-5"
      data-testid="mastery-stats"
    >
      {(Object.keys(counts) as MasteryState[]).map((state) => (
        <div
          key={state}
          className="rounded-[1.25rem] border border-border bg-paper-raised px-3 py-4 text-center shadow-[0_12px_32px_-30px_rgb(25_58_50/0.45)]"
        >
          <p className="font-display text-2xl font-semibold text-ink">
            {counts[state]}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {STAT_LABELS[state]}
          </p>
        </div>
      ))}
    </div>
  );
}
