import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import {
  mockGetConceptMasterySummaries,
  mockGetPracticeExercise,
} from "@/lib/classrooms/e2e-mock-practice";
import { selectNextPracticeExercise } from "@/lib/practice/select-next-exercise";
import type { ConceptMasterySummary, PracticeExercise } from "@/lib/practice/types";
import { createServerSupabaseClient } from "@/lib/supabase";

type ExerciseRow = {
  id: string;
  concept_id: string;
  type: PracticeExercise["type"];
  difficulty: number;
  content: unknown;
  concepts: {
    title: string;
  } | null;
};

export async function getPracticeExerciseForStudent(
  studentId: string,
  preferredExerciseId?: string | null,
): Promise<PracticeExercise | null> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetPracticeExercise(studentId, preferredExerciseId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: exercises, error: exercisesError } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty, content, concepts(title)")
    .order("difficulty", { ascending: true })
    .order("id", { ascending: true });

  if (exercisesError) {
    throw new Error(`No se pudieron cargar ejercicios: ${exercisesError.message}`);
  }

  const typedExercises = (exercises ?? []) as ExerciseRow[];

  if (typedExercises.length === 0) {
    return null;
  }

  const { data: attempts, error: attemptsError } = await supabase
    .from("exercise_attempts")
    .select("exercise_id, correct")
    .eq("student_id", studentId);

  if (attemptsError) {
    throw new Error(`No se pudieron cargar intentos: ${attemptsError.message}`);
  }

  const { data: masteryRows, error: masteryError } = await supabase
    .from("student_concept_mastery")
    .select("concept_id, mastery")
    .eq("student_id", studentId);

  if (masteryError) {
    throw new Error(`No se pudo cargar mastery: ${masteryError.message}`);
  }

  const masteryByConcept = Object.fromEntries(
    (masteryRows ?? []).map((row) => [row.concept_id, Number(row.mastery)]),
  );

  const exerciseId = selectNextPracticeExercise(
    typedExercises.map((exercise) => ({
      id: exercise.id,
      conceptId: exercise.concept_id,
      difficulty: exercise.difficulty,
    })),
    (attempts ?? []).map((attempt) => ({
      exerciseId: attempt.exercise_id,
      correct: attempt.correct,
    })),
    masteryByConcept,
    preferredExerciseId,
  );

  if (!exerciseId) {
    return null;
  }

  const exercise = typedExercises.find((row) => row.id === exerciseId);
  if (!exercise) {
    return null;
  }

  return {
    id: exercise.id,
    conceptId: exercise.concept_id,
    conceptTitle: exercise.concepts?.title ?? "Concepto",
    type: exercise.type,
    difficulty: exercise.difficulty,
    content: exercise.content,
  };
}

export async function getConceptMasterySummariesForStudent(
  studentId: string,
): Promise<ConceptMasterySummary[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetConceptMasterySummaries(studentId);
  }

  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("student_concept_mastery")
    .select("concept_id, mastery, concepts(title)")
    .eq("student_id", studentId)
    .order("concept_id", { ascending: true });

  if (error) {
    throw new Error(`No se pudo cargar mastery: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    conceptId: row.concept_id,
    conceptTitle:
      (row.concepts as { title: string } | null)?.title ?? "Concepto",
    mastery: Number(row.mastery),
  }));
}

export async function getPracticeExerciseById(
  studentId: string,
  exerciseId: string,
): Promise<PracticeExercise | null> {
  return getPracticeExerciseForStudent(studentId, exerciseId);
}
