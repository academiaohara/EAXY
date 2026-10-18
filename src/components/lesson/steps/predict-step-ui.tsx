"use client";

import { CheckIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";
import { CalculatorPopover } from "@/components/lesson/CalculatorPopover";
import { cn } from "@/lib/utils";

/** Ana / Leo: al fallar solo la respuesta elegida lleva énfasis; la correcta se insinúa sin el brillo de selección. */
export function predictAnaLeoChoiceClassName(options: {
  choiceId: string;
  selectedChoiceId: string;
  correctChoiceId: string;
  checked: boolean;
  answerCorrect: boolean;
}) {
  const base =
    "lesson-stage-choice rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-center text-base font-bold text-ink transition min-h-11 min-w-[7rem] flex-1 hover:border-cobalt/35";

  if (!options.checked) {
    return cn(base, options.choiceId === options.selectedChoiceId && "is-selected");
  }

  const isPick = options.choiceId === options.selectedChoiceId;
  const isCorrectOption = options.choiceId === options.correctChoiceId;

  if (options.answerCorrect) {
    return cn(
      base,
      isPick && "is-selected border-emerald-500/80",
      !isPick && "opacity-50",
    );
  }

  if (isPick) {
    return cn(
      base,
      "border-amber-500/75 bg-amber-500/10 shadow-none",
    );
  }
  if (isCorrectOption) {
    return cn(
      base,
      "border-emerald-500/45 bg-emerald-500/5 opacity-100",
    );
  }
  return cn(base, "opacity-45");
}

export function predictChoiceClassName(options: {
  selected: boolean;
  checked: boolean;
}) {
  return cn(
    "lesson-stage-choice rounded-xl border-2 border-slate-200 bg-white px-5 py-3.5 text-left text-base font-medium text-ink transition hover:border-cobalt/35",
    options.selected && "is-selected",
    options.checked && !options.selected && "opacity-55",
  );
}

/** Respuestas compactas en fila (p. ej. paso distributiva con escena). */
export function predictInlineChoiceClassName(options: {
  selected: boolean;
  checked: boolean;
}) {
  return cn(
    "lesson-stage-choice min-h-[44px] min-w-[5.5rem] flex-1 rounded-lg border-2 px-3 py-2 text-center font-mono text-base font-semibold transition",
    options.selected && "is-selected",
    options.checked && !options.selected && "opacity-55",
  );
}

export function predictGridChoiceClassName(options: {
  selected: boolean;
  checked: boolean;
}) {
  return cn(
    "lesson-stage-choice group flex aspect-square min-h-[6rem] flex-col items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-3 text-center shadow-sm transition duration-200 hover:border-cobalt/50",
    "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--stage-accent,#58c4dd)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--stage-surface,#1a2332)]",
    options.selected && "is-selected",
    options.checked && !options.selected && "opacity-55",
  );
}

export function predictFeedbackStatusClassName(isCorrect: boolean) {
  return cn(
    "text-center text-base font-semibold",
    isCorrect
      ? "text-emerald-700 lesson-stage-theme-board:text-[color:var(--stage-accent-muted,#83c167)]"
      : "text-amber-900 lesson-stage-theme-board:text-[color:var(--amber,#ffd866)]",
  );
}

export function PredictCheckButton({
  disabled,
  onClick,
  testId = "lesson-check-button",
}: {
  disabled: boolean;
  onClick: () => void;
  testId?: string;
}) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        data-testid={testId}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "lesson-stage-check-button min-h-[44px] rounded-xl border-2 border-cobalt bg-cobalt px-8 py-2.5 text-base font-semibold text-white transition hover:bg-cobalt/90",
          disabled && "cursor-not-allowed opacity-45",
        )}
      >
        Comprobar
      </button>
    </div>
  );
}

const ACCENT = "var(--stage-accent, var(--cobalt))";
const INK = "var(--stage-ink, var(--ink))";

/** Cabecera de pregunta: etiqueta + enunciado grande, sin caja. */
export function PredictQuestionHeader({ children, calculator }: { children: ReactNode; calculator?: boolean }) {
  return (
    <div className="relative mx-auto mb-6 max-w-3xl text-center">
      {calculator ? <CalculatorPopover className="absolute -right-16 top-0" /> : null}
      <span
        className="mb-3 inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em]"
        style={{ color: ACCENT, borderColor: `color-mix(in srgb, ${ACCENT} 45%, transparent)` }}
      >
        Pregunta
      </span>
      <h3
        className="text-[1.35rem] font-medium leading-[1.55]"
        style={{ color: INK }}
        data-testid="lesson-predict-question"
      >
        {children}
      </h3>
    </div>
  );
}

export type PredictChoiceCardState = "idle" | "selected" | "correct" | "wrong" | "dimmed";

export function predictChoiceCardState(options: {
  selected: boolean;
  checked: boolean;
  isCorrectOption: boolean;
  answerCorrect: boolean;
}): PredictChoiceCardState {
  if (!options.checked) {
    return options.selected ? "selected" : "idle";
  }
  if (options.isCorrectOption && (options.selected || !options.answerCorrect)) {
    return "correct";
  }
  if (options.selected) {
    return "wrong";
  }
  return "dimmed";
}

const CARD_STATE_CLASS: Record<PredictChoiceCardState, string> = {
  idle: "border-white/15 bg-white/[0.04] hover:-translate-y-0.5 hover:border-[color:var(--stage-accent,var(--cobalt))] hover:bg-white/[0.08] hover:shadow-[0_8px_24px_rgb(0_0_0/0.25)]",
  selected:
    "-translate-y-0.5 border-[color:var(--stage-accent,var(--cobalt))] bg-[color:var(--stage-accent,var(--cobalt))]/15 shadow-[0_0_0_3px_color-mix(in_srgb,var(--stage-accent,var(--cobalt))_30%,transparent)]",
  correct: "border-[#83c167] bg-[#83c167]/15",
  wrong: "border-[#fc6255] bg-[#fc6255]/12",
  dimmed: "border-white/10 bg-white/[0.02] opacity-45",
};

const BADGE_STATE_CLASS: Record<PredictChoiceCardState, string> = {
  idle: "bg-white/10 text-[color:var(--stage-muted,var(--ink-muted))] group-hover:bg-[color:var(--stage-accent,var(--cobalt))] group-hover:text-[#1a2332]",
  selected: "bg-[color:var(--stage-accent,var(--cobalt))] text-[#1a2332]",
  correct: "bg-[#83c167] text-[#1a2332]",
  wrong: "bg-[#fc6255] text-[#1a2332]",
  dimmed: "bg-white/10 text-[color:var(--stage-muted,var(--ink-muted))]",
};

/** Opción de test en tarjeta: letra, contenido y marca de acierto/error. */
export function PredictChoiceCard({
  letter,
  state,
  disabled,
  testId,
  onClick,
  children,
  layout = "row",
}: {
  layout?: "row" | "tile";
  letter: string;
  state: PredictChoiceCardState;
  disabled?: boolean;
  testId?: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      data-state={state}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={state === "selected" || state === "correct" || state === "wrong"}
      className={cn(
        "group relative flex rounded-2xl border-2 transition-all duration-200 motion-reduce:transition-none",
        layout === "row"
          ? "min-h-[4.5rem] items-center gap-4 px-5 py-4 text-left"
          : "min-h-[7.5rem] flex-col items-center justify-center gap-2 px-3 py-5 text-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--stage-accent,var(--cobalt))] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a2332]",
        CARD_STATE_CLASS[state],
      )}
      style={{ color: INK }}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors",
          layout === "tile" && "absolute left-2.5 top-2.5 size-7 text-xs",
          BADGE_STATE_CLASS[state],
        )}
        aria-hidden
      >
        {state === "correct" ? <CheckIcon className="size-5" /> : state === "wrong" ? <XIcon className="size-5" /> : letter}
      </span>
      <span className={cn("min-w-0 font-medium leading-snug", layout === "row" ? "flex-1 text-[1.15rem]" : "text-3xl font-semibold")}>{children}</span>
    </button>
  );
}

/** Resultado tras comprobar: panel con color, título y explicación. */
export function PredictFeedbackPanel({
  correct,
  children,
}: {
  correct: boolean;
  children?: ReactNode;
}) {
  const tone = correct ? "#83c167" : "#ffd866";
  return (
    <div
      className="lesson-idea-enter mx-auto mt-6 flex max-w-3xl items-start gap-4 rounded-2xl border-2 px-5 py-4"
      style={{
        borderColor: `color-mix(in srgb, ${tone} 60%, transparent)`,
        background: `color-mix(in srgb, ${tone} 12%, transparent)`,
      }}
      role="status"
      data-testid="lesson-predict-feedback"
    >
      <span
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full text-[#1a2332]"
        style={{ background: tone }}
        aria-hidden
      >
        {correct ? <CheckIcon className="size-5" /> : <span className="text-lg font-bold">!</span>}
      </span>
      <div className="text-[1.05rem] leading-[1.6]" style={{ color: INK }}>
        <p className="mb-0.5 font-bold" style={{ color: tone }}>
          {correct ? "¡Correcto!" : "Casi. Revisa esto:"}
        </p>
        {children}
      </div>
    </div>
  );
}
