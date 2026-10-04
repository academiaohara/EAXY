import {
  curriculum,
  getAllCourses,
  getConceptBySlug,
  getCourseById,
  getLessonById,
  getLessonForConcept,
} from "@/content";
import { resolveCourseRef } from "@/lib/curriculum/resolve-ref";
import { getCurriculumLessonMeta } from "@/lib/curriculum/lesson-meta";
import type {
  CourseCatalogEntry,
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

function buildLessonSummary(lesson: {
  id: string;
  title: string;
  orderIndex: number;
  videoUrl?: string;
  conceptSlugs: string[];
}): CourseOutline["modules"][number]["lessons"][number] {
  const meta = getCurriculumLessonMeta(lesson.id);

  return {
    id: lesson.id,
    title: lesson.title,
    orderIndex: lesson.orderIndex,
    videoUrl: lesson.videoUrl ?? null,
    exerciseCount: curriculum.exercises.filter((exercise) =>
      lesson.conceptSlugs.includes(exercise.conceptSlug),
    ).length,
    pathStatus: "not_started",
    conceptIds: lesson.conceptSlugs
      .map((slug) => getConceptBySlug(slug)?.id)
      .filter((id): id is string => Boolean(id)),
    kind: meta?.kind ?? "exercises",
    interactiveSlug: meta?.interactiveSlug,
    stepCount: meta?.stepCount,
  };
}

export function getPreviewCourseCatalog(): CourseCatalogEntry[] {
  return getAllCourses(curriculum).map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    description: course.description,
    orderIndex: course.orderIndex,
    moduleCount: course.modules.length,
    lessonCount: course.modules.reduce((count, module) => count + module.lessons.length, 0),
  }));
}

export function getPreviewCourseOutline(courseRef: string): CourseOutline | null {
  const resolved = resolveCourseRef(courseRef);
  if (!resolved) {
    return null;
  }

  const course = getCourseById(resolved.id, curriculum);
  if (!course) {
    return null;
  }

  return {
    course: {
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      orderIndex: course.orderIndex,
    },
    modules: [...course.modules]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((courseModule) => ({
        id: courseModule.id,
        slug: courseModule.slug,
        title: courseModule.title,
        orderIndex: courseModule.orderIndex,
        lessons: [...courseModule.lessons]
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((lesson) => buildLessonSummary(lesson)),
        topicExercises: (courseModule.topicExercises ?? []).map((exercise) => ({
          id: exercise.id,
          title: exercise.title,
          statement: exercise.statement,
          solutionText: exercise.solutionText,
          solutionVideoUrl: exercise.solutionVideoUrl,
        })),
      })),
  };
}

export function getPreviewLessonDetail(lessonId: string): LessonDetail | null {
  const lessonRef = getLessonById(lessonId);
  if (!lessonRef) {
    return null;
  }

  const { course, module: courseModule, lesson } = lessonRef;
  const meta = getCurriculumLessonMeta(lesson.id);
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
    courseId: course.id,
    courseSlug: course.slug,
    moduleId: courseModule.id,
    moduleSlug: courseModule.slug,
    moduleTitle: courseModule.title,
    courseTitle: course.title,
    kind: meta?.kind ?? "exercises",
    interactiveSlug: meta?.interactiveSlug,
    stepCount: meta?.stepCount,
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
