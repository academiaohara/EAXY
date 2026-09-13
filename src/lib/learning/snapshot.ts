import { curriculum, getExercisesForConcept, getOrderedConcepts } from "@/content";
import {
  isE2ELearningMockEnabled,
  mockGetRecentAttempts,
  mockGetStudentMastery,
} from "@/lib/learning/e2e-mock";
import type { StudentSnapshot } from "@/lib/recommendations/types";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function buildStudentSnapshot(studentId: string): Promise<StudentSnapshot> {
  const now = new Date();
  const orderedConcepts = getOrderedConcepts(curriculum);

  const conceptIdBySlug = new Map(orderedConcepts.map((concept) => [concept.slug, concept.id]));

  const concepts = orderedConcepts.map((concept, orderIndex) => ({
    id: concept.id,
    slug: concept.slug,
    title: concept.title,
    orderIndex,
    exerciseCount: getExercisesForConcept(concept.slug, curriculum).length,
    prerequisites: (concept.prerequisites ?? []).map((prerequisite) => ({
      conceptId: conceptIdBySlug.get(prerequisite.slug)!,
      minMastery: prerequisite.minMastery,
    })),
  }));

  if (isE2ELearningMockEnabled()) {
    const mastery = mockGetStudentMastery(studentId).map((entry) => ({
      conceptId: entry.conceptId,
      mastery: entry.mastery,
      attemptCount: entry.attemptCount,
      lastAttemptAt: entry.lastAttemptAt,
    }));

    return {
      now,
      concepts,
      mastery,
      recentAttempts: mockGetRecentAttempts(studentId),
      pendingAssignments: [],
    };
  }

  const supabase = await createServerSupabaseClient();

  const { data: masteryRows, error: masteryError } = await supabase
    .from("student_concept_mastery")
    .select("concept_id, mastery, updated_at")
    .eq("student_id", studentId);

  if (masteryError) {
    throw new Error(`No se pudo construir el snapshot de mastery: ${masteryError.message}`);
  }

  const { data: attemptRows, error: attemptsError } = await supabase
    .from("exercise_attempts")
    .select("correct, created_at, exercises!inner(concept_id)")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (attemptsError) {
    throw new Error(`No se pudo construir el snapshot de intentos: ${attemptsError.message}`);
  }

  const attemptCounts = new Map<string, number>();
  for (const row of attemptRows ?? []) {
    const exercise = Array.isArray(row.exercises) ? row.exercises[0] : row.exercises;
    const conceptId = exercise?.concept_id as string | undefined;
    if (!conceptId) continue;
    attemptCounts.set(conceptId, (attemptCounts.get(conceptId) ?? 0) + 1);
  }

  const mastery = orderedConcepts.map((concept) => {
    const entry = (masteryRows ?? []).find((row) => row.concept_id === concept.id);
    return {
      conceptId: concept.id,
      mastery: entry?.mastery ?? 0,
      attemptCount: attemptCounts.get(concept.id) ?? 0,
      lastAttemptAt: entry?.updated_at ? new Date(entry.updated_at) : null,
    };
  });

  const recentAttempts = (attemptRows ?? []).map((row) => {
    const exercise = Array.isArray(row.exercises) ? row.exercises[0] : row.exercises;
    return {
      conceptId: exercise?.concept_id as string,
      correct: row.correct,
      createdAt: new Date(row.created_at),
    };
  });

  return {
    now,
    concepts,
    mastery,
    recentAttempts,
    pendingAssignments: [],
  };
}
