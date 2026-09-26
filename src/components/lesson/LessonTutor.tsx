"use client";

import Image from "next/image";
import { SparklesIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";
import type { TutorReaction } from "@/lib/lesson/tutor-message";

type LessonTutorProps = {
  message: string;
  /** Texto secundario opcional (p. ej. la explicación tras responder). */
  detail?: string;
  reaction?: TutorReaction;
  size?: "md" | "lg";
  className?: string;
};

const bubbleTone: Record<TutorReaction, string> = {
  idle: "border-slate-200/90 bg-white",
  thinking: "border-slate-200/90 bg-white",
  correct: "border-emerald-200 bg-emerald-50",
  incorrect: "border-rose-200 bg-rose-50",
};

const tailTone: Record<TutorReaction, string> = {
  idle: "border-slate-200/90 bg-white",
  thinking: "border-slate-200/90 bg-white",
  correct: "border-emerald-200 bg-emerald-50",
  incorrect: "border-rose-200 bg-rose-50",
};

const spriteAnimation: Record<TutorReaction, string> = {
  idle: "animate-[lesson-tutor-float_3s_ease-in-out_infinite]",
  thinking: "animate-[lesson-tutor-float_3s_ease-in-out_infinite]",
  correct: "animate-[lesson-tutor-hop_0.6s_ease-out_2]",
  incorrect: "animate-[lesson-tutor-wobble_0.5s_ease-in-out_1]",
};

function TutorReactionBadge({ reaction }: { reaction: TutorReaction }) {
  if (reaction === "idle") {
    return null;
  }

  return (
    <span
      className={cn(
        "absolute -top-3 left-1/2 z-10 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border text-xs font-bold shadow-sm",
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

export function LessonTutor({
  message,
  detail,
  reaction = "idle",
  size = "md",
  className,
}: LessonTutorProps) {
  const spriteSize = size === "lg" ? "size-24" : "size-16 sm:size-[4.5rem]";

  return (
    <div
      className={cn("flex min-w-0 items-center gap-3 sm:gap-4", className)}
      data-testid="lesson-tutor"
      aria-live="polite"
    >
      <div className="relative shrink-0">
        <TutorReactionBadge reaction={reaction} />
        <div
          className="absolute inset-x-2 -bottom-1 h-2 rounded-full bg-black/10 blur-sm"
          aria-hidden
        />
        <Image
          src="/tutor/soot-sprite.jpg"
          alt="Tutor Eaxy"
          width={96}
          height={96}
          className={cn(
            "relative rounded-full object-cover object-center ring-2 ring-white",
            spriteSize,
            spriteAnimation[reaction],
          )}
          priority
        />
      </div>

      <div
        className={cn(
          "relative min-w-0 max-w-xl rounded-2xl border px-4 py-2.5 text-sm leading-snug text-ink shadow-sm transition-colors",
          bubbleTone[reaction],
        )}
        data-testid="lesson-tutor-bubble"
      >
        <span
          className={cn(
            "absolute -left-1.5 top-1/2 size-3 -translate-y-1/2 rotate-45 border-b border-l",
            tailTone[reaction],
          )}
          aria-hidden
        />
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
