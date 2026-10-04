import { getCourseById } from "@/content";
import { getPreviewCourseCatalog, getPreviewCourseOutline } from "@/lib/content-preview/curriculum-queries";
import type { CourseCatalogEntry, CourseOutline, LessonDetail } from "@/lib/curriculum/types";

const DEMO_COURSE_ID = "a1000000-0000-4000-8000-000000000004";
const DEMO_LESSON_ID = "a3000000-0000-4000-8000-000000000701";

export function getE2EMockCourseCatalog(): CourseCatalogEntry[] {
  return getPreviewCourseCatalog();
}

export function getE2EMockCourseOutline(courseId: string): CourseOutline | null {
  return getPreviewCourseOutline(courseId);
}

export function getE2EMockLessonDetail(lessonId: string): LessonDetail | null {
  const outline = getPreviewCourseOutline(DEMO_COURSE_ID);
  const lesson = outline?.modules
    .flatMap((module) => module.lessons)
    .find((entry) => entry.id === lessonId);

  if (!lesson || !outline) {
    return null;
  }

  const course = getCourseById(DEMO_COURSE_ID);
  const courseModule = course?.modules.find((entry) =>
    entry.lessons.some((candidate) => candidate.id === lessonId),
  );

  return {
    ...lesson,
    courseId: DEMO_COURSE_ID,
    courseSlug: course?.slug ?? "matematicas-4-eso",
    moduleId: courseModule?.id ?? "",
    moduleSlug: courseModule?.slug ?? "sistemas-de-ecuaciones",
    moduleTitle: courseModule?.title ?? "Sistemas de ecuaciones",
    courseTitle: course?.title ?? "Matemáticas 4º ESO",
    concepts: [],
    exercises: [],
  };
}

export function getE2EMockExercise(exerciseId: string) {
  void exerciseId;
  return null;
}

export { DEMO_COURSE_ID, DEMO_LESSON_ID };
