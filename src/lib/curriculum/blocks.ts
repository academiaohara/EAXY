import {
  getBlocksForSubject,
  getLessonBlockSlug,
  getModuleBlockSlug,
  type CurriculumBlock,
} from "@/content/blocks";
import { sortModules } from "@/lib/curriculum/course-navigation";
import type { CourseOutline, CourseSummary, ModuleSummary } from "@/lib/curriculum/types";
import type { SubjectKey } from "@/lib/navigation/subjects";

export type BlockCourseSection = {
  course: CourseSummary;
  /**
   * Temas del curso que aportan lecciones al bloque. Cada uno conserva el `id` y el orden del
   * tema original, pero solo trae las lecciones de este bloque. Los ejercicios de tema solo
   * van en el bloque por defecto del tema, para no repetirlos.
   */
  modules: ModuleSummary[];
};

export type BlockOutline = {
  block: CurriculumBlock;
  sections: BlockCourseSection[];
};

export type BlockSummary = {
  block: CurriculumBlock;
  /** Cursos con contenido en el bloque, de menor a mayor. */
  courses: CourseSummary[];
  lessonCount: number;
  topicExerciseCount: number;
  /** Mismos temas virtuales que la vista del bloque, para calcular el progreso. */
  modules: ModuleSummary[];
};

function sortOutlines(outlines: CourseOutline[]): CourseOutline[] {
  return [...outlines].sort(
    (a, b) =>
      (a.course.orderIndex ?? Number.MAX_SAFE_INTEGER) -
      (b.course.orderIndex ?? Number.MAX_SAFE_INTEGER),
  );
}

function sliceModuleForBlock(
  courseSlug: string,
  courseModule: ModuleSummary,
  blockSlug: string,
): ModuleSummary | null {
  const lessons = courseModule.lessons.filter(
    (lesson) => getLessonBlockSlug(courseSlug, courseModule.slug, lesson.orderIndex) === blockSlug,
  );
  const ownsExercises = getModuleBlockSlug(courseSlug, courseModule.slug) === blockSlug;
  const topicExercises = ownsExercises ? courseModule.topicExercises : [];

  if (lessons.length === 0 && topicExercises.length === 0) {
    return null;
  }
  return { ...courseModule, lessons, topicExercises };
}

export function buildBlockOutline(block: CurriculumBlock, outlines: CourseOutline[]): BlockOutline {
  const sections: BlockCourseSection[] = [];

  for (const outline of sortOutlines(outlines)) {
    const modules = sortModules(outline.modules)
      .map((courseModule) => sliceModuleForBlock(outline.course.slug, courseModule, block.slug))
      .filter((courseModule): courseModule is ModuleSummary => courseModule !== null);

    if (modules.length > 0) {
      sections.push({ course: outline.course, modules });
    }
  }

  return { block, sections };
}

/** Resumen de todos los bloques de una asignatura que tienen contenido en `outlines`. */
export function summarizeBlocks(subject: SubjectKey, outlines: CourseOutline[]): BlockSummary[] {
  const summaries: BlockSummary[] = [];

  for (const block of getBlocksForSubject(subject)) {
    const outline = buildBlockOutline(block, outlines);
    if (outline.sections.length === 0) {
      continue;
    }
    const modules = outline.sections.flatMap((section) => section.modules);
    summaries.push({
      block,
      courses: outline.sections.map((section) => section.course),
      lessonCount: modules.reduce((sum, courseModule) => sum + courseModule.lessons.length, 0),
      topicExerciseCount: modules.reduce(
        (sum, courseModule) => sum + courseModule.topicExercises.length,
        0,
      ),
      modules,
    });
  }

  return summaries;
}
