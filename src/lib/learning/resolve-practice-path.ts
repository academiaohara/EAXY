import {
  curriculum,
  getConceptById,
  getFirstModuleWithTopicExercises,
  getModuleById,
  getOrderedConcepts,
} from "@/content";
import { pickPracticeConceptSlug } from "@/lib/learning/pick-practice-concept";
import type { ConceptProgress } from "@/lib/learning/queries";

export function topicPracticePath(moduleId: string): string {
  return `/practicar/tema/${moduleId}`;
}

export function conceptPracticePath(conceptSlug: string): string {
  return `/practicar/${conceptSlug}`;
}

function firstConceptPracticePath(): string | null {
  const slug = getOrderedConcepts(curriculum)[0]?.slug;
  return slug ? conceptPracticePath(slug) : null;
}

function firstTopicPracticePath(): string | null {
  const target = getFirstModuleWithTopicExercises(curriculum);
  return target ? topicPracticePath(target.module.id) : null;
}

/** Destino por defecto cuando el usuario abre «Practicar» sin ruta concreta. */
export function resolveDefaultPracticePath(
  overviewConcepts: ConceptProgress[] = [],
): string | null {
  const conceptSlug = pickPracticeConceptSlug(overviewConcepts);
  if (conceptSlug) {
    return conceptPracticePath(conceptSlug);
  }

  return firstConceptPracticePath() ?? firstTopicPracticePath();
}

export function resolveRecommendedPracticePath(
  conceptId: string | null | undefined,
): string | null {
  if (conceptId) {
    const concept = getConceptById(conceptId, curriculum);
    if (concept) {
      return conceptPracticePath(concept.slug);
    }
  }

  return resolveDefaultPracticePath();
}

export function getTopicPracticeViewModel(moduleId: string) {
  const context = getModuleById(moduleId, curriculum);
  if (!context) {
    return null;
  }

  const exercises = context.module.topicExercises ?? [];
  if (exercises.length === 0) {
    return null;
  }

  return {
    courseId: context.course.id,
    courseTitle: context.course.title,
    moduleId: context.module.id,
    moduleTitle: context.module.title,
    exercises: exercises.map((exercise) => ({
      id: exercise.id,
      title: exercise.title,
      statement: exercise.statement,
      solutionText: exercise.solutionText,
      solutionImageUrl: exercise.solutionImageUrl,
      solutionVideoUrl: exercise.solutionVideoUrl,
    })),
  };
}
