import Link from "next/link";
import { MasteryBadge } from "@/components/learning/mastery-badge";
import { MasteryProgressBar } from "@/components/learning/mastery-progress-bar";
import { formatMasteryPercent } from "@/lib/mastery/states";
import type { ConceptProgress } from "@/lib/learning/queries";
import { cn } from "@/lib/utils";

type ConceptMapProps = {
  concepts: ConceptProgress[];
  groupByModule?: boolean;
};

export function ConceptMap({ concepts, groupByModule = true }: ConceptMapProps) {
  if (!groupByModule) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {concepts.map((concept) => (
          <ConceptCard key={concept.conceptId} concept={concept} />
        ))}
      </div>
    );
  }

  const modules = new Map<string, ConceptProgress[]>();
  for (const concept of concepts) {
    const key = concept.moduleTitle || "General";
    const group = modules.get(key) ?? [];
    group.push(concept);
    modules.set(key, group);
  }

  return (
    <div className="space-y-8">
      {[...modules.entries()].map(([moduleTitle, moduleConcepts]) => (
        <section key={moduleTitle}>
          <h3 className="mb-4 font-display text-lg font-medium text-ink">{moduleTitle}</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {moduleConcepts.map((concept) => (
              <ConceptCard key={concept.conceptId} concept={concept} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ConceptCard({ concept }: { concept: ConceptProgress }) {
  const hasStarted = concept.attemptCount > 0;

  return (
    <Link
      href={`/practicar/${concept.conceptSlug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-lg border border-border bg-paper-raised p-4 transition-all",
        "hover:border-cobalt/40 hover:shadow-sm",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-ink-muted">{concept.lessonTitle}</p>
          <h4 className="mt-1 font-medium text-ink group-hover:text-cobalt">{concept.title}</h4>
        </div>
        <MasteryBadge mastery={concept.mastery} attemptCount={concept.attemptCount} />
      </div>

      <p className="line-clamp-2 text-sm text-ink-muted">{concept.description}</p>

      <div className="flex items-center justify-between text-xs text-ink-muted">
        <span>{concept.exerciseCount} ejercicios</span>
        {hasStarted ? <span>{formatMasteryPercent(concept.mastery)} dominio</span> : <span>Sin empezar</span>}
      </div>

      <MasteryProgressBar mastery={concept.mastery} attemptCount={concept.attemptCount} />
    </Link>
  );
}
