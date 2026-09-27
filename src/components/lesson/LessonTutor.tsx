"use client";

import { MathRenderer } from "@/components/lesson/MathRenderer";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";
import { tutorMoodForReaction, type TutorReaction } from "@/lib/lesson/tutor-message";

type LessonTutorProps = {
  message: string;
  reaction?: TutorReaction;
  /** Abre el panel con el historial de mensajes. */
  onOpenPanel?: () => void;
  /** Mensajes que el alumno no ha visto en el panel. */
  unreadCount?: number;
  panelOpen?: boolean;
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

export function LessonTutor({
  message,
  reaction = "idle",
  onOpenPanel,
  unreadCount = 0,
  panelOpen = false,
  className,
}: LessonTutorProps) {
  const mascot = <TutorMascot mood={tutorMoodForReaction(reaction)} size={76} label={null} priority />;

  return (
    <div
      className={cn("flex min-w-0 items-center gap-4 sm:gap-5", className)}
      data-testid="lesson-tutor"
      aria-live="polite"
    >
      {onOpenPanel ? (
        <button
          type="button"
          onClick={onOpenPanel}
          className="relative shrink-0 rounded-full transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Ver los mensajes del tutor"
          aria-expanded={panelOpen}
          data-testid="lesson-tutor-button"
        >
          {mascot}
          {unreadCount > 0 ? (
            <span
              className="absolute right-0 top-1 flex size-5 items-center justify-center rounded-full bg-cobalt text-[0.6875rem] font-bold tabular-nums text-white ring-2 ring-white"
              data-testid="lesson-tutor-unread"
            >
              {unreadCount}
            </span>
          ) : null}
        </button>
      ) : (
        <div className="shrink-0">{mascot}</div>
      )}

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
      </div>
    </div>
  );
}
