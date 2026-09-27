import { StepPhaseBadge } from "@/components/lesson/StepPhaseBadge";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { LessonStep } from "@/lib/lesson/types";

type LessonStepHeaderProps = {
  step: LessonStep;
};

/** Fila del título del paso, encima del contenedor de la explicación. */
export function LessonStepHeader({ step }: LessonStepHeaderProps) {
  return (
    <header className="space-y-3" data-testid="lesson-step-header">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <StepPhaseBadge step={step} className="h-6 px-2.5 text-xs" />
        <h2 className="min-w-0 flex-1 basis-[18rem] font-heading text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
          <MathRenderer text={step.title} />
        </h2>
      </div>
      <div className="lesson-title-rule h-0.5 w-full rounded-full bg-gradient-to-r from-cobalt/50 via-cobalt/15 to-transparent" aria-hidden />
    </header>
  );
}
