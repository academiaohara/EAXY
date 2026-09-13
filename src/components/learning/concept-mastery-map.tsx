import Link from "next/link";
import { MasteryBadge } from "@/components/exercises/mastery-badge";
import { MasteryProgressBar } from "@/components/learning/mastery-progress-bar";
import { Button } from "@/components/ui/button";
import type { ConceptMasterySummary } from "@/lib/exercises/types";
import { getMasteryStatus } from "@/lib/mastery/status";

type ConceptMasteryMapProps = {
  summaries: ConceptMasterySummary[];
};

type ProgressStats = {
  mastered: number;
  proficient: number;
  developing: number;
  struggling: number;
  notStarted: number;
};

function computeStats(summaries: ConceptMasterySummary[]): ProgressStats {
  const stats: ProgressStats = {
    mastered: 0,
    proficient: 0,
    developing: 0,
    struggling: 0,
    notStarted: 0,
  };

  for (const summary of summaries) {
    const status = getMasteryStatus(summary.mastery, summary.hasAttempts);
    stats[status === "not_started" ? "notStarted" : status] += 1;
  }

  return stats;
}

export function ConceptMasteryMap({ summaries }: ConceptMasteryMapProps) {
  const stats = computeStats(summaries);

  if (summaries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground" data-testid="mastery-map-empty">
        Aún no hay conceptos disponibles en el catálogo.
      </p>
    );
  }

  return (
    <div className="space-y-8" data-testid="concept-mastery-map">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5" data-testid="mastery-stats">
        <StatCard label="Dominados" value={stats.mastered} />
        <StatCard label="Competentes" value={stats.proficient} />
        <StatCard label="En progreso" value={stats.developing} />
        <StatCard label="En recuperación" value={stats.struggling} />
        <StatCard label="Sin empezar" value={stats.notStarted} />
      </div>

      <ul className="space-y-3">
        {summaries.map((summary) => (
          <li
            key={summary.conceptId}
            className="rounded-lg border border-border bg-paper-raised p-4"
            data-testid={`concept-mastery-${summary.conceptId}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-medium text-ink">{summary.conceptTitle}</span>
              <MasteryBadge mastery={summary.mastery} hasAttempts={summary.hasAttempts} />
            </div>
            <div className="mt-3">
              <MasteryProgressBar mastery={summary.mastery} hasAttempts={summary.hasAttempts} />
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link href="/practicar">
          <Button data-testid="progreso-practicar-link">Practicar ahora</Button>
        </Link>
        <Link href="/aprender">
          <Button variant="outline">Volver a Aprender</Button>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-paper-raised px-3 py-4 text-center">
      <p className="font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
