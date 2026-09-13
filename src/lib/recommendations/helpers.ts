import {
  MASTERY_DEVELOPING_MAX,
  MASTERY_MASTERED_MIN,
  MASTERY_PROFICIENT_MIN,
  MASTERY_STRUGGLING_MAX,
} from "@/lib/mastery/constants";
import { formatMasteryPercent } from "@/lib/mastery/state";
import type { ConceptContext, RecommendationContext } from "@/lib/recommendations/types";

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export function hoursSince(date: Date, referenceDate: Date): number {
  return (referenceDate.getTime() - date.getTime()) / MS_PER_HOUR;
}

export function daysSince(date: Date, referenceDate: Date): number {
  return (referenceDate.getTime() - date.getTime()) / MS_PER_DAY;
}

export function getConceptById(
  context: RecommendationContext,
  conceptId: string,
): ConceptContext | undefined {
  return context.concepts.find((concept) => concept.id === conceptId);
}

export function getAttemptsForConcept(
  context: RecommendationContext,
  conceptId: string,
): RecommendationContext["attempts"] {
  return context.attempts.filter((attempt) => attempt.conceptId === conceptId);
}

export function getLastAttemptsForConcept(
  context: RecommendationContext,
  conceptId: string,
  limit: number,
): RecommendationContext["attempts"] {
  return getAttemptsForConcept(context, conceptId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}

export function conceptHasExercises(concept: ConceptContext): boolean {
  return concept.exerciseIds.length > 0;
}

export function isConceptNotStarted(concept: ConceptContext): boolean {
  return concept.attemptCount === 0;
}

export function isConceptDeveloping(concept: ConceptContext): boolean {
  return (
    concept.attemptCount > 0 &&
    concept.mastery >= MASTERY_STRUGGLING_MAX &&
    concept.mastery < MASTERY_DEVELOPING_MAX
  );
}

export function isConceptStruggling(concept: ConceptContext): boolean {
  return concept.attemptCount > 0 && concept.mastery < MASTERY_STRUGGLING_MAX;
}

export function isConceptProficient(concept: ConceptContext): boolean {
  return concept.mastery >= MASTERY_PROFICIENT_MIN && concept.mastery < MASTERY_MASTERED_MIN;
}

export function prerequisitesMet(
  context: RecommendationContext,
  conceptId: string,
): boolean {
  const requirements = context.prerequisites.filter(
    (edge) => edge.conceptId === conceptId,
  );

  if (requirements.length === 0) {
    return true;
  }

  return requirements.every((requirement) => {
    const prerequisite = getConceptById(context, requirement.prerequisiteId);
    return (prerequisite?.mastery ?? 0) >= requirement.minMastery;
  });
}

export function formatConceptMastery(concept: ConceptContext): string {
  return formatMasteryPercent(concept.mastery);
}

export function getSortedLessons(context: RecommendationContext) {
  return [...context.lessons].sort((a, b) => {
    if (a.moduleOrderIndex !== b.moduleOrderIndex) {
      return a.moduleOrderIndex - b.moduleOrderIndex;
    }
    return a.orderIndex - b.orderIndex;
  });
}

export function getNextIncompleteLesson(context: RecommendationContext) {
  return getSortedLessons(context).find((lesson) => lesson.pathStatus !== "completed");
}

export function lessonIncludesConcept(lessonId: string, conceptId: string, context: RecommendationContext) {
  const lesson = context.lessons.find((item) => item.id === lessonId);
  return lesson?.conceptIds.includes(conceptId) ?? false;
}
