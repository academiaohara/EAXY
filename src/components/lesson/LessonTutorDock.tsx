"use client";

import { useEffect, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";
import { splitTutorSpeech, tutorSpeechDuration } from "@/lib/lesson/tutor-speech";
import { tutorMoodForReaction, type TutorReaction } from "@/lib/lesson/tutor-message";

type LessonTutorDockProps = {
  /** Lo que el tutor dice ahora mismo; se cuenta frase a frase. */
  message: string;
  reaction?: TutorReaction;
  /** Abre el panel con el historial de mensajes. */
  onOpenPanel: () => void;
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

/**
 * Suelta las frases del mensaje una detrás de otra, como si el tutor las fuera
 * diciendo, y desaparece al acabar: la bola se queda sola y lo dicho vive en el
 * panel. Se monta con `key={message}` para empezar de nuevo con cada mensaje.
 */
function TutorSpeechBubble({
  message,
  reaction,
  muted,
}: {
  message: string;
  reaction: TutorReaction;
  muted: boolean;
}) {
  const lines = useMemo(() => splitTutorSpeech(message), [message]);
  const [spoken, setSpoken] = useState(0);
  const line = lines[spoken];

  useEffect(() => {
    if (muted || line === undefined) {
      return;
    }

    const timer = window.setTimeout(
      () => setSpoken((previous) => previous + 1),
      tutorSpeechDuration(line),
    );

    return () => window.clearTimeout(timer);
  }, [line, muted]);

  if (muted || line === undefined) {
    return null;
  }

  return (
    <div
      key={spoken}
      className={cn(
        "lesson-tutor-speech pointer-events-auto relative min-w-0 max-w-[15rem] rounded-2xl border px-4 py-2.5 text-sm leading-snug text-ink shadow-lg sm:max-w-[22rem]",
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
        <MathRenderer text={line} />
      </p>
    </div>
  );
}

/**
 * El tutor flota sobre la lección en vez de ocupar el pie: habla cuando tiene
 * algo que decir y, al pulsarlo, abre el historial de mensajes.
 */
export function LessonTutorDock({
  message,
  reaction = "idle",
  onOpenPanel,
  panelOpen = false,
  className,
}: LessonTutorDockProps) {
  return (
    <div
      className={cn("pointer-events-none flex items-center gap-3 sm:gap-4", className)}
      data-testid="lesson-tutor"
      aria-live="polite"
    >
      {panelOpen ? null : (
        <button
          type="button"
          onClick={onOpenPanel}
          className="pointer-events-auto relative shrink-0 rounded-full drop-shadow-[0_6px_14px_rgba(15,23,42,0.18)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label="Ver los mensajes del tutor"
          aria-expanded={false}
          data-testid="lesson-tutor-button"
        >
          <TutorMascot mood={tutorMoodForReaction(reaction)} size={76} label={null} />
        </button>
      )}

      <TutorSpeechBubble key={message} message={message} reaction={reaction} muted={panelOpen} />
    </div>
  );
}
