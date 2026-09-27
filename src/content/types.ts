import type { ExerciseContent, ExerciseType } from "@/lib/exercise-engine/types";

export type LessonKind = "exercises" | "interactive";

export type CurriculumCourse = {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  modules: CurriculumModule[];
};

export type CurriculumConcept = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Slugs de conceptos previos y mastery mínimo requerido (0–1). */
  prerequisites?: { slug: string; minMastery: number }[];
};

export type CurriculumLesson = {
  id: string;
  title: string;
  summary: string;
  orderIndex: number;
  videoUrl?: string;
  kind?: LessonKind;
  /** Slug de lección interactiva cuando kind === "interactive". */
  interactiveSlug?: string;
  conceptSlugs: string[];
};

/** Ejercicio de tema con enunciado y vídeo de resolución (fuera del motor interactivo). */
export type CurriculumTopicExercise = {
  id: string;
  title: string;
  /** Enunciado en texto plano; admite LaTeX inline con $...$. */
  statement: string;
  /** Resolución escrita; admite LaTeX como el enunciado. Cada línea (`\n`) es un paso. */
  solutionText: string;
  solutionVideoUrl: string;
};

export type CurriculumModule = {
  id: string;
  title: string;
  orderIndex: number;
  lessons: CurriculumLesson[];
  topicExercises?: CurriculumTopicExercise[];
};

export type CurriculumExercise = {
  id: string;
  conceptSlug: string;
  type: ExerciseType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  content: ExerciseContent;
};

export type Curriculum = {
  courses: CurriculumCourse[];
  concepts: CurriculumConcept[];
  exercises: CurriculumExercise[];
};
