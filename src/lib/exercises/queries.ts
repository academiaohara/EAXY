import { getAuthenticatedUserId } from "@/lib/auth/session";
import {
  isE2EMockClassroomEnabled,
  mockGetPracticeExercise,
  mockGetPracticeExerciseCatalog,
  mockGetAttemptedExerciseIds,
} from "@/lib/classrooms/e2e-mock";
import { selectNextPracticeExercise } from "@/lib/exercises/practice";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { createServerSupabaseClient } from "@/lib/supabase";

export type PracticeExercise = {
  id: string;
  conceptId: string;
  conceptTitle: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
};

type ExerciseRow = {
  id: string;
  concept_id: string;
  type: ExerciseType;
  difficulty: number;
  content: unknown;
  concepts: { title: string } | { title: string }[] | null;
};

export async function getAttemptedExerciseIds(studentId: string): Promise<Set<string>> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetAttemptedExerciseIds(studentId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercise_attempts")
    .select("exercise_id")
    .eq("student_id", studentId);

  if (error) {
    throw new Error(`No se pudieron cargar los intentos: ${error.message}`);
  }

  return new Set((data ?? []).map((row) => row.exercise_id));
}

export async function getPracticeExerciseCatalog() {
  if (isE2EMockClassroomEnabled()) {
    return mockGetPracticeExerciseCatalog();
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty")
    .order("difficulty", { ascending: true });

  if (error) {
    throw new Error(`No se pudo cargar el catálogo de ejercicios: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    conceptId: row.concept_id,
    type: row.type,
    difficulty: row.difficulty,
  }));
}

export async function getPracticeExerciseById(exerciseId: string): Promise<PracticeExercise | null> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetPracticeExercise(exerciseId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty, content, concepts(title)")
    .eq("id", exerciseId)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar el ejercicio: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const row = data as ExerciseRow;
  const concept = Array.isArray(row.concepts) ? row.concepts[0] : row.concepts;

  return {
    id: row.id,
    conceptId: row.concept_id,
    conceptTitle: concept?.title ?? "Concepto",
    type: row.type,
    difficulty: row.difficulty,
    content: row.content,
  };
}

export async function getNextPracticeExercise(
  exerciseId?: string,
): Promise<PracticeExercise | null> {
  if (exerciseId) {
    return getPracticeExerciseById(exerciseId);
  }

  const studentId = await getAuthenticatedUserId();
  if (!studentId) {
    return null;
  }

  const catalog = await getPracticeExerciseCatalog();
  const attemptedIds = await getAttemptedExerciseIds(studentId);
  const selected = selectNextPracticeExercise(catalog, attemptedIds);

  if (!selected) {
    return null;
  }

  return getPracticeExerciseById(selected.id);
}
