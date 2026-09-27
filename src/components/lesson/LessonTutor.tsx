"use client";

import { SparklesIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";
import { tutorMoodForReaction, type TutorReaction } from "@/lib/lesson/tutor-message";

type LessonTutorProps = {
  message: string;
  /** Texto secundario opcional (p. ej. la explicación tras responder). */
  detail?: string;
  reaction?: TutorReaction;
  className?: string;
};

const bubbleTone: Record<TutorReaction, string> = {
  idle: "border-slate-300 bg-white",
  thinking: "border-slate-300 bg-white",
  correct: "border-emerald-300 bg-emerald-50",
  incorrect: "border-rose-300 bg-rose-50",
};

/** Pico del globo: mismo relleno y borde que la burbuja, apuntando a la bola. */
const tailTone: Record<TutorReaction, string> = {
  idle: "fill-white stroke-slate-300",
  thinking: "fill-white stroke-slate-300",
  correct: "fill-emerald-50 stroke-emerald-300",
  incorrect: "fill-rose-50 stroke-rose-300",
};

function TutorReactionBadge({ reaction }: { reaction: TutorReaction }) {
  if (reaction === "idle") {
    return null;
  }

  return (
    <span
      className={cn(
        "absolute -top-1 left-1/2 z-10 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border text-xs font-bold shadow-sm",
        reaction === "correct" &&
          "animate-[lesson-tutor-pop_0.35s_ease-out] border-emerald-200 bg-white text-amber-500",
        reaction === "incorrect" && "border-rose-200 bg-white text-rose-500",
        reaction === "thinking" &&
          "animate-[lesson-tutor-pulse_1.8s_ease-in-out_infinite] border-cobalt/25 bg-white text-cobalt",
      )}
      data-testid="lesson-tutor-reaction"
      data-reaction={reaction}
      aria-hidden
    >
      {reaction === "correct" ? <SparklesIcon className="size-4" /> : "?"}
    </span>
  );
}

export function LessonTutor({ message, detail, reaction = "idle", className }: LessonTutorProps) {
  return (
    <div
      className={cn("flex min-w-0 items-center gap-4 sm:gap-5", className)}
      data-testid="lesson-tutor"
      aria-live="polite"
    >
      <div className="relative shrink-0">
        <TutorReactionBadge reaction={reaction} />
        <TutorMascot mood={tutorMoodForReaction(reaction)} size={76} label={null} priority />
      </div>

      <div
        className={cn(
          "relative min-w-0 max-w-xl rounded-2xl border px-4 py-2.5 text-sm leading-snug text-ink shadow-sm transition-colors",
          bubbleTone[reaction],
        )}
        data-testid="lesson-tutor-bubble"
      >
        <svg
          className="absolute -left-[15px] top-1/2 h-6 w-4 -translate-y-1/2"
          viewBox="0 0 16 24"
          aria-hidden
        >
          <path d="M16 2 L1.5 12 L16 22" className={tailTone[reaction]} strokeWidth={1} />
        </svg>
        <p className="font-medium">
          <MathRenderer text={message} />
        </p>
        {detail ? (
          <p className="mt-1.5 text-[0.8125rem] font-normal leading-relaxed text-ink-muted">
            <MathRenderer text={detail} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
