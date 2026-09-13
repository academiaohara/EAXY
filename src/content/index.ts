import { curriculum } from "@/content/curriculum";
import type {
  Curriculum,
  CurriculumConcept,
  CurriculumExercise,
  CurriculumLesson,
  CurriculumModule,
} from "@/content/types";
import { parseExerciseContent } from "@/lib/exercise-engine/schemas";

export { curriculum };
export type * from "@/content/types";

export function getConceptBySlug(slug: string, source: Curriculum = curriculum) {
  return source.concepts.find((concept) => concept.slug === slug);
}

export function getConceptById(id: string, source: Curriculum = curriculum) {
  return source.concepts.find((concept) => concept.id === id);
}

export function getExercisesForConcept(slug: string, source: Curriculum = curriculum) {
  return source.exercises.filter((exercise) => exercise.conceptSlug === slug);
}

export function getLessonForConcept(
  slug: string,
  source: Curriculum = curriculum,
): { module: CurriculumModule; lesson: CurriculumLesson } | undefined {
  for (const courseModule of source.modules) {
    for (const lesson of courseModule.lessons) {
      if (lesson.conceptSlugs.includes(slug)) {
        return { module: courseModule, lesson };
      }
    }
  }
  return undefined;
}

export function getLessonById(
  id: string,
  source: Curriculum = curriculum,
): { module: CurriculumModule; lesson: CurriculumLesson } | undefined {
  for (const courseModule of source.modules) {
    const lesson = courseModule.lessons.find((candidate) => candidate.id === id);
    if (lesson) {
      return { module: courseModule, lesson };
    }
  }
  return undefined;
}

/** Lecciones en orden lineal del curso (módulo → lección). */
export function getOrderedLessons(source: Curriculum = curriculum): CurriculumLesson[] {
  return [...source.modules]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .flatMap((module) => [...module.lessons].sort((a, b) => a.orderIndex - b.orderIndex));
}

/** Conceptos en el orden en que aparecen en el curso. */
export function getOrderedConcepts(source: Curriculum = curriculum): CurriculumConcept[] {
  const seen = new Set<string>();
  const ordered: CurriculumConcept[] = [];

  for (const lesson of getOrderedLessons(source)) {
    for (const slug of lesson.conceptSlugs) {
      if (seen.has(slug)) continue;
      const concept = getConceptBySlug(slug, source);
      if (concept) {
        seen.add(slug);
        ordered.push(concept);
      }
    }
  }

  return ordered;
}

export type CurriculumValidationIssue = { path: string; message: string };

/**
 * Comprueba la coherencia interna del catálogo: IDs únicos, slugs referenciados
 * existentes, prerrequisitos válidos y contenido de ejercicios conforme a su esquema Zod.
 */
export function validateCurriculum(source: Curriculum = curriculum): CurriculumValidationIssue[] {
  const issues: CurriculumValidationIssue[] = [];
  const conceptSlugs = new Set(source.concepts.map((concept) => concept.slug));

  const assertUnique = (label: string, values: string[]) => {
    const seen = new Set<string>();
    for (const value of values) {
      if (seen.has(value)) {
        issues.push({ path: label, message: `Duplicado: ${value}` });
      }
      seen.add(value);
    }
  };

  assertUnique("concepts.id", source.concepts.map((concept) => concept.id));
  assertUnique("concepts.slug", source.concepts.map((concept) => concept.slug));
  assertUnique("modules.id", source.modules.map((module) => module.id));
  assertUnique(
    "modules.orderIndex",
    source.modules.map((module) => String(module.orderIndex)),
  );
  assertUnique(
    "lessons.id",
    source.modules.flatMap((module) => module.lessons.map((lesson) => lesson.id)),
  );
  assertUnique("exercises.id", source.exercises.map((exercise) => exercise.id));

  for (const concept of source.concepts) {
    for (const prerequisite of concept.prerequisites ?? []) {
      if (!conceptSlugs.has(prerequisite.slug)) {
        issues.push({
          path: `concepts.${concept.slug}.prerequisites`,
          message: `Prerrequisito inexistente: ${prerequisite.slug}`,
        });
      }
      if (prerequisite.slug === concept.slug) {
        issues.push({
          path: `concepts.${concept.slug}.prerequisites`,
          message: "Un concepto no puede ser prerrequisito de sí mismo",
        });
      }
      if (prerequisite.minMastery < 0 || prerequisite.minMastery > 1) {
        issues.push({
          path: `concepts.${concept.slug}.prerequisites`,
          message: `minMastery fuera de rango: ${prerequisite.minMastery}`,
        });
      }
    }
  }

  for (const courseModule of source.modules) {
    assertUnique(
      `modules.${courseModule.id}.lessons.orderIndex`,
      courseModule.lessons.map((lesson) => String(lesson.orderIndex)),
    );
    for (const lesson of courseModule.lessons) {
      if (lesson.conceptSlugs.length === 0) {
        issues.push({ path: `lessons.${lesson.id}`, message: "La lección no cubre ningún concepto" });
      }
      for (const slug of lesson.conceptSlugs) {
        if (!conceptSlugs.has(slug)) {
          issues.push({ path: `lessons.${lesson.id}`, message: `Concepto inexistente: ${slug}` });
        }
      }
    }
  }

  for (const exercise of source.exercises) {
    if (!conceptSlugs.has(exercise.conceptSlug)) {
      issues.push({
        path: `exercises.${exercise.id}`,
        message: `Concepto inexistente: ${exercise.conceptSlug}`,
      });
    }
    try {
      parseExerciseContent(exercise.type, exercise.content);
    } catch (error) {
      issues.push({
        path: `exercises.${exercise.id}`,
        message: error instanceof Error ? error.message : "Contenido inválido",
      });
    }
    if (exercise.type === "multiple_choice") {
      const content = exercise.content as { options: { id: string }[]; correctOptionId: string };
      if (!content.options.some((option) => option.id === content.correctOptionId)) {
        issues.push({
          path: `exercises.${exercise.id}`,
          message: "correctOptionId no coincide con ninguna opción",
        });
      }
    }
  }

  for (const concept of source.concepts) {
    if (!source.exercises.some((exercise) => exercise.conceptSlug === concept.slug)) {
      issues.push({ path: `concepts.${concept.slug}`, message: "Concepto sin ejercicios" });
    }
    if (!getLessonForConcept(concept.slug, source)) {
      issues.push({ path: `concepts.${concept.slug}`, message: "Concepto sin lección" });
    }
  }

  return issues;
}

export type { CurriculumExercise };
