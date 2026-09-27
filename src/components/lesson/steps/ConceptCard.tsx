import { AlertTriangleIcon } from "lucide-react";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LessonStepBase } from "@/lib/lesson/types";

type ConceptCardProps = Pick<LessonStepBase, "title" | "content" | "math" | "warning"> & {
  compact?: boolean;
  showTitle?: boolean;
  /** En pantallas anchas coloca la teoría y las fórmulas en dos columnas. */
  split?: boolean;
};

export function ConceptCard({
  title,
  content,
  math,
  warning,
  compact = false,
  showTitle = true,
  split = false,
}: ConceptCardProps) {
  const hasMath = Boolean(math && math.length > 0);
  const isSplit = split && hasMath;

  return (
    <Card
      className={
        compact
          ? "border-0 bg-transparent p-0 shadow-none"
          : "border-border bg-paper-raised p-6 shadow-sm"
      }
    >
      <div
        className={cn(
          isSplit ? "grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12" : "space-y-4",
          !isSplit && compact && "space-y-3",
        )}
      >
        <div className={cn(compact ? "space-y-3" : "space-y-4", "max-w-[78ch]")}>
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
                compact
                  ? "text-[0.9375rem] leading-relaxed text-ink-muted sm:text-base xl:text-[1.0625rem]"
                  : "text-sm leading-relaxed text-ink-muted"
              }
            >
              <MathRenderer text={paragraph} />
            </p>
          ))}

          {warning ? (
            <div className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
              <p>
                <MathRenderer text={warning} />
              </p>
            </div>
          ) : null}
        </div>

        {hasMath ? <MathBlockList blocks={math ?? []} /> : null}
      </div>
    </Card>
  );
}
