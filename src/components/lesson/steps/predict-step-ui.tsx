"use client";

import { cn } from "@/lib/utils";

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
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        data-testid="lesson-check-button"
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
