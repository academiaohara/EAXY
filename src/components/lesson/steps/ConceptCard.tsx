import { AlertTriangleIcon } from "lucide-react";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { Card } from "@/components/ui/card";
import type { LessonStepBase } from "@/lib/lesson/types";

type ConceptCardProps = Pick<LessonStepBase, "title" | "content" | "math" | "warning">;

export function ConceptCard({ title, content, math, warning }: ConceptCardProps) {
  return (
    <Card className="space-y-4 border-border bg-paper-raised p-6 shadow-sm">
      <h2 className="font-heading text-xl font-semibold tracking-tight text-ink">{title}</h2>

      {content?.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-relaxed text-ink-muted">
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
