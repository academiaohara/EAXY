"use client";

import { Button } from "@/components/ui/button";
import type { FeedbackStatus } from "@/lib/lesson/types";

type LessonHelpButtonProps = {
  feedback: FeedbackStatus | null;
  onClick: () => void;
};

/** Puerta de entrada a la ayuda guiada: el alumno dice que no lo entiende. */
export function LessonHelpButton({ feedback, onClick }: LessonHelpButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full rounded-full border-slate-300 bg-white py-6 font-semibold sm:w-auto sm:py-3"
      onClick={onClick}
      data-testid="lesson-help-button"
    >
      {feedback === "incorrect" ? "Vamos a verlo" : "No lo entiendo"}
    </Button>
  );
}
