import { AlertTriangleIcon } from "lucide-react";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";
import type { LessonStepBase } from "@/lib/lesson/types";

type ConceptCardProps = Pick<LessonStepBase, "title" | "content" | "math" | "warning"> & {
  variant?: "card" | "inline";
};

export function ConceptCard({
  title,
  content,
  math,
  warning,
  variant = "card",
}: ConceptCardProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        variant === "card" &&
          "rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6",
      )}
    >
      <h2 className="font-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>

      {content?.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-relaxed text-ink-muted sm:text-base">
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
    </div>
  );
}
