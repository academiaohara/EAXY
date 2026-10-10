import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { LessonStep } from "@/lib/lesson/types";

type LessonStepHeaderProps = {
  step: LessonStep;
};

/** Título del paso sobre la pizarra (sin fase ni tarjeta). */
export function LessonStepHeader({ step }: LessonStepHeaderProps) {
  return (
    <header className="shrink-0" data-testid="lesson-step-header">
      <h2 className="min-w-0 font-heading text-2xl font-semibold leading-tight tracking-tight text-[color:var(--stage-ink,#e8edf5)] sm:text-[1.75rem]">
        <MathRenderer text={step.title} />
      </h2>
      <div
        className="lesson-title-rule mt-3 h-px w-full bg-gradient-to-r from-cobalt/45 via-cobalt/12 to-transparent"
        aria-hidden
      />
    </header>
  );
}
