import { curriculum } from "@/content/curriculum";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Ruta relativa bajo `src/data/lessons/` para una lección del catálogo. */
export function lessonSourceRelativePath(
  courseSlug: string,
  moduleOrderIndex: number,
  moduleSlug: string,
  lessonOrderIndex: number,
  interactiveSlug: string,
): string {
  return `${courseSlug}/${pad2(moduleOrderIndex)}-${moduleSlug}/${pad2(lessonOrderIndex)}-${interactiveSlug}.ts`;
}

/** Busca la ruta relativa del fichero fuente a partir del `interactiveSlug`. */
export function findLessonSourceRelativePath(interactiveSlug: string): string | undefined {
  for (const course of curriculum.courses) {
    for (const courseModule of course.modules) {
      for (const lesson of courseModule.lessons) {
        if (lesson.interactiveSlug !== interactiveSlug) continue;
        return lessonSourceRelativePath(
          course.slug,
          courseModule.orderIndex,
          courseModule.slug,
          lesson.orderIndex,
          interactiveSlug,
        );
      }
    }
  }
  return undefined;
}
