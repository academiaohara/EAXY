import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import type { ExerciseRow } from "@/lib/exercise-engine/types";
import {
  mockGetAttemptedExerciseIds,
  mockGetConceptById,
  mockGetConceptMastery,
  mockGetExerciseById,
  mockListConcepts,
  mockListExercises,
  mockStudentHasAttemptsForConcept,
} from "@/lib/exercises/e2e-mock";
import { selectPracticeExercise } from "@/lib/exercises/select-practice-exercise";
import type { ConceptMasterySummary, PracticeExerciseContext } from "@/lib/exercises/types";
import { createServerSupabaseClient } from "@/lib/supabase";

function mapExerciseRow(row: {
  id: string;
  concept_id: string;
  type: string;
  difficulty: number;
  content: unknown;
}): ExerciseRow {
  return {
    id: row.id,
    concept_id: row.concept_id,
    type: row.type as ExerciseRow["type"],
    difficulty: row.difficulty,
    content: row.content as ExerciseRow["content"],
  };
}

async function loadExercisesFromDatabase(): Promise<ExerciseRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty, content")
    .order("difficulty", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron cargar ejercicios: ${error.message}`);
  }

  return (data ?? []).map(mapExerciseRow);
}

async function loadAttemptedExerciseIds(studentId: string): Promise<Set<string>> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercise_attempts")
    .select("exercise_id")
    .eq("student_id", studentId);

  if (error) {
    throw new Error(`No se pudieron cargar intentos: ${error.message}`);
  }

  return new Set((data ?? []).map((row) => row.exercise_id));
}

export async function getPracticeExerciseContext(
  studentId: string,
  preferredExerciseId?: string,
): Promise<PracticeExerciseContext | null> {
  if (isE2EMockClassroomEnabled()) {
    const exercises = mockListExercises().map((exercise) => mapExerciseRow(exercise));
    const attemptedExerciseIds = mockGetAttemptedExerciseIds(studentId);
    const exercise = selectPracticeExercise(
      exercises,
      attemptedExerciseIds,
      preferredExerciseId,
    );

    if (!exercise) {
      return null;
    }

    const concept = mockGetConceptById(exercise.concept_id);
    const mastery = mockGetConceptMastery(studentId, exercise.concept_id);
    const hasAttempts = mockStudentHasAttemptsForConcept(studentId, exercise.concept_id);

    return {
      exercise,
      conceptTitle: concept?.title ?? "Concepto",
      mastery,
      hasAttempts,
      attemptedCount: attemptedExerciseIds.size,
      totalExercises: exercises.length,
    };
  }

  const [exercises, attemptedExerciseIds] = await Promise.all([
    loadExercisesFromDatabase(),
    loadAttemptedExerciseIds(studentId),
  ]);

  const exercise = selectPracticeExercise(
    exercises,
    attemptedExerciseIds,
    preferredExerciseId,
  );

  if (!exercise) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  const [{ data: concept }, { count: attemptCount }] = await Promise.all([
    supabase
      .from("concepts")
      .select("title")
      .eq("id", exercise.concept_id)
      .maybeSingle(),
    supabase
      .from("exercise_attempts")
      .select("id", { count: "exact", head: true })
      .eq("student_id", studentId)
      .eq("exercise_id", exercise.id),
  ]);

  const { data: masteryRow } = await supabase
    .from("student_concept_mastery")
    .select("mastery")
    .eq("student_id", studentId)
    .eq("concept_id", exercise.concept_id)
    .maybeSingle();

  return {
    exercise,
    conceptTitle: concept?.title ?? "Concepto",
    mastery: masteryRow?.mastery ?? 0,
    hasAttempts: (attemptCount ?? 0) > 0,
    attemptedCount: attemptedExerciseIds.size,
    totalExercises: exercises.length,
  };
}

export async function getStudentConceptMasterySummaries(
  studentId: string,
): Promise<ConceptMasterySummary[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockListConcepts().map((concept) => {
      const hasAttempts = mockStudentHasAttemptsForConcept(studentId, concept.id);
      return {
        conceptId: concept.id,
        conceptTitle: concept.title,
        mastery: mockGetConceptMastery(studentId, concept.id),
        hasAttempts,
      };
    });
  }

  const supabase = await createServerSupabaseClient();
  const { data: concepts, error: conceptsError } = await supabase
    .from("concepts")
    .select("id, title")
    .order("title", { ascending: true });

  if (conceptsError) {
    throw new Error(`No se pudieron cargar conceptos: ${conceptsError.message}`);
  }

  const { data: masteryRows, error: masteryError } = await supabase
    .from("student_concept_mastery")
    .select("concept_id, mastery")
    .eq("student_id", studentId);

  if (masteryError) {
    throw new Error(`No se pudo cargar mastery: ${masteryError.message}`);
  }

  const masteryByConcept = new Map(
    (masteryRows ?? []).map((row) => [row.concept_id, row.mastery]),
  );

  const { data: exercises } = await supabase.from("exercises").select("id, concept_id");
  const exerciseIdsByConcept = new Map<string, string[]>();

  for (const exercise of exercises ?? []) {
    const existing = exerciseIdsByConcept.get(exercise.concept_id) ?? [];
    existing.push(exercise.id);
    exerciseIdsByConcept.set(exercise.concept_id, existing);
  }

  const { data: attempts } = await supabase
    .from("exercise_attempts")
    .select("exercise_id")
    .eq("student_id", studentId);

  const attemptedExerciseIds = new Set((attempts ?? []).map((row) => row.exercise_id));

  return (concepts ?? []).map((concept) => {
    const conceptExerciseIds = exerciseIdsByConcept.get(concept.id) ?? [];
    const hasAttempts = conceptExerciseIds.some((exerciseId) =>
      attemptedExerciseIds.has(exerciseId),
    );

    return {
      conceptId: concept.id,
      conceptTitle: concept.title,
      mastery: masteryByConcept.get(concept.id) ?? 0,
      hasAttempts,
    };
  });
}

export async function getExerciseById(exerciseId: string): Promise<ExerciseRow | null> {
  if (isE2EMockClassroomEnabled()) {
    const exercise = mockGetExerciseById(exerciseId);
    return exercise ? mapExerciseRow(exercise) : null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty, content")
    .eq("id", exerciseId)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar el ejercicio: ${error.message}`);
  }

  return data ? mapExerciseRow(data) : null;
}
