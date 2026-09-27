import type { FeedbackStatus } from "@/lib/lesson/types";

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
};

export function stepMessageKey(stepId: string): string {
  return `step:${stepId}`;
}

export function feedbackMessageKey(stepId: string, status: FeedbackStatus): string {
  return `feedback:${stepId}:${status}`;
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
