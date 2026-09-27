"use client";

import { HelpCircleIcon } from "lucide-react";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonHelpButtonProps = {
  feedback: FeedbackStatus | null;
  onClick: () => void;
};

/** Puerta de entrada a la ayuda guiada: el alumno pide que se lo expliquen. */
export function LessonHelpButton({ feedback, onClick }: LessonHelpButtonProps) {
  const label = feedback === "incorrect" ? "Vamos a verlo" : "No lo entiendo";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm transition-colors hover:border-cobalt/40 hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
      aria-label={label}
      title={label}
      data-testid="lesson-help-button"
    >
      <HelpCircleIcon className="size-6" aria-hidden />
    </button>
  );
}
