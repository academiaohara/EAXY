"use client";

import { createContext, useContext } from "react";

type LessonTutorActions = {
  /** Pide al tutor que explique un concepto del glosario (p. ej. al pulsar un término). */
  askAboutConcept: (conceptId: string, term: string) => void;
};

const LessonTutorContext = createContext<LessonTutorActions | null>(null);

export const LessonTutorProvider = LessonTutorContext.Provider;

/** `null` fuera de una lección: los términos se muestran pero no se pueden pulsar. */
export function useLessonTutor(): LessonTutorActions | null {
  return useContext(LessonTutorContext);
}
