import type { FeedbackStatus, LessonStep } from "@/lib/lesson/types";
import type { TutorMood } from "@/lib/tutor/moods";

/** Estado emocional del tutor; define el símbolo que aparece sobre la bola. */
export type TutorReaction = "idle" | "thinking" | "correct" | "incorrect";

/** Ánimo por defecto cuando la pregunta no trae pista. */
const QUIZ_FALLBACK_MESSAGE: Record<"multiple_choice" | "fill_in_blank", string> = {
  multiple_choice: "Elige la opción que creas correcta. Sin miedo.",
  fill_in_blank: "Escribe tu respuesta en la casilla.",
};

/** Texto corto para el globo del tutor según el paso actual. */
export function getStepTutorMessage(step: LessonStep): string {
  if (step.type === "multiple_choice" || step.type === "fill_in_blank") {
    return step.hint ?? QUIZ_FALLBACK_MESSAGE[step.type];
  }
  return step.title;
}

/** Texto del globo cuando el alumno acaba de responder. */
export function getFeedbackTutorMessage(status: FeedbackStatus): string {
  return status === "correct" ? "¡Muy bien! Lo has clavado." : "Casi. Vamos a repasarlo juntos.";
}

/** Texto del globo teniendo en cuenta el feedback en curso. */
export function getTutorMessage(step: LessonStep, feedback: FeedbackStatus | null): string {
  return feedback ? getFeedbackTutorMessage(feedback) : getStepTutorMessage(step);
}

/** Reacción del tutor: responde al feedback y, si no hay, al tipo de paso. */
export function getTutorReaction(
  step: LessonStep,
  feedback: FeedbackStatus | null,
): TutorReaction {
  if (feedback === "correct") {
    return "correct";
  }
  if (feedback === "incorrect") {
    return "incorrect";
  }
  if (step.type === "multiple_choice" || step.type === "fill_in_blank") {
    return "thinking";
  }
  return "idle";
}

const REACTION_MOODS: Record<TutorReaction, TutorMood> = {
  idle: "idle",
  thinking: "thinking",
  correct: "celebrate",
  incorrect: "sad",
};

/** Ánimo de la mascota para una reacción de la lección. */
export function tutorMoodForReaction(reaction: TutorReaction): TutorMood {
  return REACTION_MOODS[reaction];
}
