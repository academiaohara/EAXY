import {
  curriculum,
  getConceptBySlug,
  getLessonById,
  getLessonForConcept,
} from "@/content";
import type {
  CourseOutline,
  ExerciseSummary,
  LessonDetail,
} from "@/lib/curriculum/types";

function extractQuestionPreview(content: unknown): string {
  if (
    typeof content === "object" &&
    content !== null &&
    "question" in content &&
    typeof content.question === "string"
  ) {
    return content.question;
  }

  return "Ejercicio";
}

export function getPreviewCourseOutline(): CourseOutline {
  return {
    course: {
      id: curriculum.course.id,
      title: curriculum.course.title,
      description: curriculum.course.description,
    },
    modules: [...curriculum.modules]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((courseModule) => ({
        id: courseModule.id,
        title: courseModule.title,
        orderIndex: courseModule.orderIndex,
        lessons: [...courseModule.lessons]
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            orderIndex: lesson.orderIndex,
            videoUrl: lesson.videoUrl ?? null,
            exerciseCount: curriculum.exercises.filter((exercise) =>
              lesson.conceptSlugs.includes(exercise.conceptSlug),
            ).length,
            pathStatus: "not_started" as const,
            conceptIds: lesson.conceptSlugs
              .map((slug) => getConceptBySlug(slug)?.id)
              .filter((id): id is string => Boolean(id)),
          })),
      })),
  };
}

export function getPreviewLessonDetail(lessonId: string): LessonDetail | null {
  const lessonRef = getLessonById(lessonId);
  if (!lessonRef) {
    return null;
  }

  const { module: courseModule, lesson } = lessonRef;
  const concepts = lesson.conceptSlugs
    .map((slug) => getConceptBySlug(slug))
    .filter((concept): concept is NonNullable<typeof concept> => Boolean(concept));

  const conceptIds = concepts.map((concept) => concept.id);
  const exercises = curriculum.exercises.filter((exercise) =>
    lesson.conceptSlugs.includes(exercise.conceptSlug),
  );

  const exerciseSummaries: ExerciseSummary[] = exercises.map((exercise) => {
    const concept = getConceptBySlug(exercise.conceptSlug);
    return {
      id: exercise.id,
      type: exercise.type,
      difficulty: exercise.difficulty,
      conceptId: concept?.id ?? "",
      questionPreview: extractQuestionPreview(exercise.content),
      attemptCount: 0,
      hasCorrectAttempt: false,
    };
  });

  return {
    id: lesson.id,
    title: lesson.title,
    orderIndex: lesson.orderIndex,
    videoUrl: lesson.videoUrl ?? null,
    exerciseCount: exerciseSummaries.length,
    pathStatus: "not_started",
    conceptIds,
    moduleTitle: courseModule.title,
    courseTitle: curriculum.course.title,
    concepts: concepts.map((concept) => ({
      id: concept.id,
      slug: concept.slug,
      title: concept.title,
      mastery: 0,
      attemptCount: 0,
    })),
    exercises: exerciseSummaries,
  };
}

export function getPreviewExerciseForPractice(exerciseId: string) {
  const exercise = curriculum.exercises.find((entry) => entry.id === exerciseId);
  if (!exercise) {
    return null;
  }

  const lessonRef = getLessonForConcept(exercise.conceptSlug);

  return {
    id: exercise.id,
    conceptId: getConceptBySlug(exercise.conceptSlug)?.id ?? "",
    type: exercise.type,
    content: exercise.content,
    lessonId: lessonRef?.lesson.id ?? null,
    lessonTitle: lessonRef?.lesson.title ?? null,
  };
}
