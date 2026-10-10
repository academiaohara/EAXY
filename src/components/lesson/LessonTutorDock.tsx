"use client";

import { useEffect, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { TUTOR_NICKNAME } from "@/lib/tutor/identity";
import { cn } from "@/lib/utils";
import { flattenTutorSpeech, tutorSpeechDuration } from "@/lib/lesson/tutor-speech";
import { tutorMoodForReaction, type TutorReaction } from "@/lib/lesson/tutor-message";

type LessonTutorDockProps = {
  /** Reinicia la secuencia de frases al cambiar de paso o de feedback. */
  speechKey: string;
  /** Bloques que el tutor va leyendo en orden (título, teoría, pista…). */
  messages: readonly string[];
  reaction?: TutorReaction;
  /** Abre el panel con el historial de mensajes. */
  onOpenPanel: () => void;
  /** Avisa de cada frase que el tutor dice, para guardarla en el historial. */
  onSpeak?: (index: number, line: string) => void;
  panelOpen?: boolean;
  className?: string;
};

const bubbleTone: Record<TutorReaction, string> = {
  idle: "border-slate-300 bg-white",
  thinking: "border-slate-300 bg-white",
  correct: "border-emerald-300 bg-emerald-100 font-semibold text-emerald-950",
  incorrect: "border-amber-300 bg-amber-100 font-semibold text-amber-950",
};

/** Pico del globo: mismo relleno y borde que la burbuja, apuntando a la bola. */
const tailTone: Record<TutorReaction, string> = {
  idle: "fill-white stroke-slate-300",
  thinking: "fill-white stroke-slate-300",
  correct: "fill-emerald-100 stroke-emerald-300",
  incorrect: "fill-amber-100 stroke-amber-300",
};

/**
 * Recorre frase a frase toda la cola del paso: cada una se muestra el tiempo de
 * lectura, desaparece y entra la siguiente. Al acabar no queda globo. Con el
 * panel abierto se calla y retoma la frase al cerrarlo.
 */
function TutorSpeechBubble({
  messages,
  reaction,
  muted,
  anchorRight,
  onSpeak,
}: {
  messages: readonly string[];
  reaction: TutorReaction;
  muted: boolean;
  anchorRight: boolean;
  onSpeak?: (index: number, line: string) => void;
}) {
  const lines = useMemo(() => flattenTutorSpeech(messages), [messages]);
  const [spoken, setSpoken] = useState(0);
  const line = lines[spoken];

  useEffect(() => {
    if (!muted && line !== undefined) {
      onSpeak?.(spoken, line);
    }
  }, [line, muted, onSpeak, spoken]);

  useEffect(() => {
    if (muted || line === undefined) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSpoken((previous) => previous + 1);
    }, tutorSpeechDuration(line));

    return () => {
      window.clearTimeout(timer);
    };
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
        className={cn(
          "absolute top-1/2 h-6 w-4 -translate-y-1/2",
          anchorRight ? "-right-[15px] scale-x-[-1]" : "-left-[15px]",
        )}
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
 * El tutor flota sobre la lección: habla al entrar en cada paso y, al pulsarlo,
 * abre el historial en el panel lateral.
 */
export function LessonTutorDock({
  speechKey,
  messages,
  reaction = "idle",
  onOpenPanel,
  onSpeak,
  panelOpen = false,
  className,
}: LessonTutorDockProps) {
  const anchorRight = panelOpen;

  return (
    <div
      className={cn(
        "pointer-events-none flex items-center gap-3 sm:gap-4",
        anchorRight && "flex-row-reverse",
        className,
      )}
      data-testid="lesson-tutor"
      aria-live="polite"
    >
      {panelOpen ? null : (
        <button
          type="button"
          onClick={onOpenPanel}
          className="pointer-events-auto relative shrink-0 rounded-full drop-shadow-[0_8px_18px_rgba(67,83,255,0.35)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
          aria-label={`Ver los mensajes de ${TUTOR_NICKNAME}`}
          aria-expanded={false}
          data-testid="lesson-tutor-button"
        >
          <TutorMascot mood={tutorMoodForReaction(reaction)} size={76} label={null} />
        </button>
      )}

      <TutorSpeechBubble
        key={speechKey}
        messages={messages}
        reaction={reaction}
        muted={panelOpen}
        anchorRight={anchorRight}
        onSpeak={onSpeak}
      />
    </div>
  );
}
