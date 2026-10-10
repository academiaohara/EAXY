import type { ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { cn } from "@/lib/utils";
import type { PracticeStep } from "@/lib/lesson/types";

type PracticeShellProps = {
  step: PracticeStep;
  compact?: boolean;
  testId: string;
  children: ReactNode;
};

/** En las actividades las fracciones se leen a tamaño completo, no encogidas en línea. */
export function tallFractions(text: string): string {
  return text.replace(/\\frac(?=\{)/g, "\\dfrac");
}

/**
 * Marco común de las actividades: la teoría de apoyo (si la hay) arriba y la
 * actividad debajo, centrada y a todo el ancho para que tenga protagonismo.
 */
export function PracticeShell({ step, compact = false, testId, children }: PracticeShellProps) {
  const showContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );

  return (
    <div className={cn("flex flex-col", compact ? "gap-5" : "gap-7")} data-testid={testId}>
      {showContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          visuals={step.visuals}
          layout={step.layout}
          compact={compact}
          showTitle={false}
        />
      ) : null}

      <section
        className={cn(
          "lesson-idea-enter rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
          compact ? "space-y-5 p-4 sm:p-5" : "space-y-6 p-6 sm:p-7",
        )}
        data-testid="lesson-practice"
      >
        <h3
          className={cn(
            "text-center font-heading font-semibold leading-snug text-[color:var(--stage-ink,#e8edf5)]",
            compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
          )}
        >
          <MathRenderer text={tallFractions(step.question)} />
        </h3>
        {children}
      </section>
    </div>
  );
}
