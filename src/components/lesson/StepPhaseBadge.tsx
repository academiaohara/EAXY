import { Badge } from "@/components/ui/badge";
import {
  getLessonStepPhase,
  LESSON_STEP_PHASE_LABELS,
  type LessonStepPhase,
} from "@/lib/lesson/step-phase";
import type { LessonStep } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type StepPhaseBadgeProps = {
  step: LessonStep;
  className?: string;
};

const phaseStyles: Record<LessonStepPhase, string> = {
  explanation: "border-cobalt/30 bg-cobalt-tint/60 text-cobalt",
  resolution: "border-emerald-300/60 bg-emerald-50 text-emerald-800",
  exploration: "border-violet-300/60 bg-violet-50 text-violet-800",
  practice: "border-amber-300/60 bg-amber-50 text-amber-800",
};

export function StepPhaseBadge({ step, className }: StepPhaseBadgeProps) {
  const phase = getLessonStepPhase(step);

  return (
    <Badge
      variant="outline"
      className={cn("font-medium", phaseStyles[phase], className)}
      data-testid="lesson-step-phase"
    >
      {LESSON_STEP_PHASE_LABELS[phase]}
    </Badge>
  );
}
