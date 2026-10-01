import { curriculum, getOrderedConcepts } from "@/content";
import type { CourseOverview } from "@/lib/learning/queries";

/** Vista de progreso para visitantes (dominio en localStorage no se refleja aquí todavía). */
export function getGuestCourseOverview(): CourseOverview {
  const concepts = getOrderedConcepts(curriculum);
  const firstCourse = curriculum.courses[0];

  return {
    courseTitle: firstCourse?.title ?? "Matemáticas",
    courseDescription: firstCourse?.description ?? "",
    concepts: concepts.map((concept) => {
      const lessonRef = curriculum.courses
        .flatMap((course) => course.modules)
        .flatMap((courseModule) => courseModule.lessons)
        .find((lesson) => lesson.conceptSlugs.includes(concept.slug));

      const courseModule = curriculum.courses
        .flatMap((course) => course.modules.map((module) => ({ course, module })))
        .find(({ module }) => module.lessons.some((lesson) => lesson.id === lessonRef?.id));

      return {
        conceptId: concept.id,
        conceptSlug: concept.slug,
        title: concept.title,
        description: concept.description,
        mastery: 0,
        attemptCount: 0,
        lastAttemptAt: null,
        exerciseCount: curriculum.exercises.filter((exercise) => exercise.conceptSlug === concept.slug)
          .length,
        moduleTitle: courseModule?.module.title ?? "",
        lessonTitle: lessonRef?.title ?? "",
      };
    }),
    practicedCount: 0,
    masteredCount: 0,
  };
}
