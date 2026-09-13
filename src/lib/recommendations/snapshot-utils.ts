import { getMasteryState, type MasteryState } from "@/lib/mastery/states";
import type {
  ConceptMasterySnapshot,
  ConceptNode,
  StudentSnapshot,
} from "@/lib/recommendations/types";

export const MS_PER_HOUR = 60 * 60 * 1000;
export const MS_PER_DAY = 24 * MS_PER_HOUR;

export function masteryFor(
  snapshot: StudentSnapshot,
  conceptId: string,
): ConceptMasterySnapshot | undefined {
  return snapshot.mastery.find((entry) => entry.conceptId === conceptId);
}

export function stateFor(snapshot: StudentSnapshot, conceptId: string): MasteryState {
  const entry = masteryFor(snapshot, conceptId);
  return getMasteryState(entry?.mastery, entry?.attemptCount ?? 0);
}

export function hoursSinceLastAttempt(
  snapshot: StudentSnapshot,
  conceptId: string,
): number | null {
  const entry = masteryFor(snapshot, conceptId);
  if (!entry?.lastAttemptAt) return null;
  return (snapshot.now.getTime() - entry.lastAttemptAt.getTime()) / MS_PER_HOUR;
}

export function conceptsInCourseOrder(snapshot: StudentSnapshot): ConceptNode[] {
  return [...snapshot.concepts].sort((a, b) => a.orderIndex - b.orderIndex);
}

export function prerequisitesMet(snapshot: StudentSnapshot, concept: ConceptNode): boolean {
  return concept.prerequisites.every((prerequisite) => {
    const entry = masteryFor(snapshot, prerequisite.conceptId);
    return (entry?.attemptCount ?? 0) > 0 && (entry?.mastery ?? 0) >= prerequisite.minMastery;
  });
}

export function percent(value: number): number {
  return Math.round(value * 100);
}
