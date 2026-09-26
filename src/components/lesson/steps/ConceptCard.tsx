import { AlertTriangleIcon } from "lucide-react";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { Card } from "@/components/ui/card";
import type { LessonStepBase } from "@/lib/lesson/types";

type ConceptCardProps = Pick<LessonStepBase, "title" | "content" | "math" | "warning"> & {
  compact?: boolean;
  showTitle?: boolean;
};

export function ConceptCard({
  title,
  content,
  math,
  warning,
  compact = false,
  showTitle = true,
}: ConceptCardProps) {
  return (
    <Card
      className={
        compact
          ? "space-y-2 border-0 bg-transparent p-0 shadow-none"
          : "space-y-4 border-border bg-paper-raised p-6 shadow-sm"
      }
    >
      {showTitle ? (
        <h2
          className={
            compact
              ? "font-heading text-lg font-semibold tracking-tight text-ink"
              : "font-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl"
          }
        >
          {title}
        </h2>
      ) : null}

      {content?.map((paragraph) => (
        <p
          key={paragraph}
          className={
            compact ? "text-sm leading-snug text-ink-muted" : "text-sm leading-relaxed text-ink-muted"
          }
        >
          <MathRenderer text={paragraph} />
        </p>
      ))}

      {math && math.length > 0 ? <MathBlockList blocks={math} /> : null}

      {warning ? (
        <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>
            <MathRenderer text={warning} />
          </p>
        </div>
      ) : null}
    </Card>
  );
}
