import { StepPhaseBadge } from "@/components/lesson/StepPhaseBadge";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { LessonStep } from "@/lib/lesson/types";

type LessonStepHeaderProps = {
  step: LessonStep;
};

export function LessonStepHeader({ step }: LessonStepHeaderProps) {
  return (
    <header className="space-y-2 xl:sticky xl:top-0" data-testid="lesson-step-header">
      <StepPhaseBadge step={step} />
      <h2 className="font-heading text-xl font-semibold leading-tight tracking-tight text-ink sm:text-2xl xl:text-[1.75rem]">
        <MathRenderer text={step.title} />
      </h2>
      <div className="hidden h-0.5 w-12 rounded-full bg-cobalt/30 xl:block" aria-hidden />
    </header>
  );
}
