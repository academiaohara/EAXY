import type { FeedbackStatus, LessonVisual } from "@/lib/lesson/types";

export type TutorLogAuthor = "tutor" | "student";

export type TutorLogEntry = {
  /** Identifica el mensaje para no repetirlo si el efecto se vuelve a ejecutar. */
  key: string;
  author: TutorLogAuthor;
  /** Texto principal; admite LaTeX inline con `$...$` y `**negrita**`. */
  text: string;
  /** Párrafos de apoyo. */
  detail?: string[];
  /** Bloques de matemáticas en modo display. */
  math?: string[];
  /** Ayuda visual que el tutor enseña junto al mensaje. */
  visual?: LessonVisual;
  /** Paso de la lección en que se dijo; permite preguntar por el mensaje después. */
  stepId?: string;
  /** Reacción a una respuesta: tiñe el mensaje como el globo de la lección. */
  tone?: FeedbackStatus;
};

export function stepMessageKey(stepId: string): string {
  return `step:${stepId}`;
}

export function feedbackMessageKey(stepId: string, status: FeedbackStatus): string {
  return `feedback:${stepId}:${status}`;
}

/** Clave de la frase `index` que el tutor dice en voz alta en un paso. */
export function speechMessageKey(
  stepId: string,
  feedback: FeedbackStatus | null,
  index: number,
): string {
  return `speech:${stepId}:${feedback ?? "none"}:${index}`;
}

/**
 * Registra una frase dicha por el tutor. Como el globo puede volver a montarse
 * (p. ej. al cerrar el panel), una frase ya guardada no se repite.
 */
export function appendSpokenEntry(log: TutorLogEntry[], entry: TutorLogEntry): TutorLogEntry[] {
  if (log.some((existing) => existing.key === entry.key)) {
    return log;
  }
  return [...log, entry];
}

/**
 * Añade un mensaje al historial, ignorando el que repite la clave del anterior:
 * un doble clic en el mismo botón no debe duplicar lo que dice el tutor.
 */
export function appendTutorEntry(log: TutorLogEntry[], entry: TutorLogEntry): TutorLogEntry[] {
  if (log.at(-1)?.key === entry.key) {
    return log;
  }
  return [...log, entry];
}

export function countTutorEntries(entries: TutorLogEntry[]): number {
  return entries.filter((entry) => entry.author === "tutor").length;
}
