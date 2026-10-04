import { isQuizStep, type FeedbackStatus, type LessonStep, type PracticeStep } from "@/lib/lesson/types";
import type { TutorMood } from "@/lib/tutor/moods";

/** Estado emocional del tutor; define el símbolo que aparece sobre la bola. */
export type TutorReaction = "idle" | "thinking" | "correct" | "incorrect";

/** Ánimo por defecto cuando la pregunta no trae pista. */
const QUIZ_FALLBACK_MESSAGE: Record<PracticeStep["type"], string> = {
  fill_in_blank: "Escribe tu respuesta en la casilla.",
  fraction_pick: "Toca las partes para colorearlas. Si te equivocas, vuelve a tocar.",
  classify: "Toca una tarjeta y luego el grupo donde va.",
  number_line_pick: "Toca la recta en el punto que corresponde.",
};

/** Texto corto para el globo del tutor según el paso actual. */
export function getStepTutorMessage(step: LessonStep): string {
  if (isQuizStep(step)) {
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

/**
 * Bloques que el tutor va leyendo al entrar en un paso: título, párrafos de
 * teoría y avisos, uno tras otro. Con feedback activo sólo suena la reacción.
 */
export function getTutorSpeechQueue(
  step: LessonStep,
  feedback: FeedbackStatus | null,
): string[] {
  if (feedback) {
    return [getFeedbackTutorMessage(feedback)];
  }

  if (isQuizStep(step)) {
    return [getStepTutorMessage(step)];
  }

  const queue: string[] = [step.title];
  if (step.content?.length) {
    queue.push(...step.content);
  }
  if (step.warning) {
    queue.push(step.warning);
  }

  return queue;
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
  if (isQuizStep(step)) {
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
