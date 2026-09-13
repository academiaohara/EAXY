import { DEFAULT_COURSE_ID } from "@/lib/content/constants";
import type { CourseOutline, LessonDetail } from "@/lib/content/types";
import { PRACTICE_EXERCISE_FIXTURES } from "@/lib/practice/fixtures";

export const CONTENT_LESSON_IDS = {
  linearBasic: "a3000000-0000-4000-8000-000000000001",
  parentheses: "a3000000-0000-4000-8000-000000000002",
} as const;

const LESSON_DEFINITIONS = [
  {
    id: CONTENT_LESSON_IDS.linearBasic,
    moduleId: "a2000000-0000-4000-8000-000000000001",
    title: "Ecuaciones lineales básicas",
    orderIndex: 0,
    videoUrl: "https://www.youtube.com/embed/KO5jN1S0N-k",
    conceptIds: ["b1000000-0000-4000-8000-000000000001"],
  },
  {
    id: CONTENT_LESSON_IDS.parentheses,
    moduleId: "a2000000-0000-4000-8000-000000000001",
    title: "Ecuaciones con paréntesis",
    orderIndex: 1,
    videoUrl: null,
    conceptIds: ["b1000000-0000-4000-8000-000000000002"],
  },
] as const;

const CONCEPT_DEFINITIONS = [
  {
    id: "b1000000-0000-4000-8000-000000000001",
    title: "Ecuaciones lineales básicas",
    description: "Resolver ecuaciones de la forma ax + b = c despejando la incógnita.",
  },
  {
    id: "b1000000-0000-4000-8000-000000000002",
    title: "Ecuaciones con paréntesis",
    description:
      "Resolver ecuaciones que requieren aplicar la propiedad distributiva antes de despejar.",
  },
] as const;

export function getContentConceptIdsForLesson(lessonId: string): string[] {
  const lesson = LESSON_DEFINITIONS.find((entry) => entry.id === lessonId);
  return lesson ? [...lesson.conceptIds] : [];
}

export function getContentExerciseIdsForLesson(lessonId: string): string[] {
  const conceptIds = new Set(getContentConceptIdsForLesson(lessonId));
  return PRACTICE_EXERCISE_FIXTURES.filter((exercise) => conceptIds.has(exercise.conceptId)).map(
    (exercise) => exercise.id,
  );
}

export function buildMockCourseOutline(
  learningPathByLesson: Record<string, "started" | "completed">,
): CourseOutline {
  return {
    id: DEFAULT_COURSE_ID,
    title: "Matemáticas 2º ESO",
    description:
      "Curso de matemáticas de segundo de la ESO. Contenido inicial: ecuaciones de primer grado.",
    modules: [
      {
        id: "a2000000-0000-4000-8000-000000000001",
        title: "Ecuaciones",
        orderIndex: 0,
        lessons: LESSON_DEFINITIONS.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          orderIndex: lesson.orderIndex,
          videoUrl: lesson.videoUrl,
          status: learningPathByLesson[lesson.id] ?? null,
          conceptCount: lesson.conceptIds.length,
        })),
      },
    ],
  };
}

export function buildMockLessonDetail(
  lessonId: string,
  learningPathByLesson: Record<string, "started" | "completed">,
  masteryByConcept: Record<string, number>,
  conceptIdsWithCorrectAttempt: string[],
): LessonDetail | null {
  const lesson = LESSON_DEFINITIONS.find((entry) => entry.id === lessonId);
  if (!lesson) {
    return null;
  }

  const concepts = lesson.conceptIds.map((conceptId) => {
    const concept = CONCEPT_DEFINITIONS.find((entry) => entry.id === conceptId);
    return {
      id: conceptId,
      title: concept?.title ?? "Concepto",
      description: concept?.description ?? null,
      mastery: masteryByConcept[conceptId] ?? 0,
    };
  });

  const canComplete = lesson.conceptIds.every((conceptId) =>
    conceptIdsWithCorrectAttempt.includes(conceptId),
  );

  return {
    id: lesson.id,
    title: lesson.title,
    orderIndex: lesson.orderIndex,
    videoUrl: lesson.videoUrl,
    moduleTitle: "Ecuaciones",
    courseTitle: "Matemáticas 2º ESO",
    status: learningPathByLesson[lesson.id] ?? null,
    concepts,
    canComplete,
  };
}
