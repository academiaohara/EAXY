import type { ExerciseContent, ExerciseType } from "@/lib/exercise-engine/types";

export type CurriculumCourse = {
  id: string;
  title: string;
  description: string;
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
  conceptSlugs: string[];
};

export type CurriculumModule = {
  id: string;
  title: string;
  orderIndex: number;
  lessons: CurriculumLesson[];
};

export type CurriculumExercise = {
  id: string;
  conceptSlug: string;
  type: ExerciseType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  content: ExerciseContent;
};

export type Curriculum = {
  course: CurriculumCourse;
  modules: CurriculumModule[];
  concepts: CurriculumConcept[];
  exercises: CurriculumExercise[];
};
