import { calculateMastery, roundMastery } from "@/lib/mastery/calculator";
import type { MasteryAttemptInput } from "@/lib/mastery/types";
import { createAdminClient } from "@/lib/supabase/admin";

type AttemptRow = {
  correct: boolean;
  created_at: string;
};

/**
 * Recalcula y persiste mastery para un estudiante y concepto
 * a partir de todos los intentos en ejercicios de ese concepto.
 */
export async function recalculateStudentConceptMastery(
  studentId: string,
  conceptId: string,
): Promise<number> {
  const admin = createAdminClient();

  const { data: exercises, error: exercisesError } = await admin
    .from("exercises")
    .select("id")
    .eq("concept_id", conceptId);

  if (exercisesError) {
    throw new Error(`No se pudieron cargar ejercicios del concepto: ${exercisesError.message}`);
  }

  const exerciseIds = (exercises ?? []).map((row) => row.id);

  if (exerciseIds.length === 0) {
    return 0;
  }

  const { data: attempts, error: attemptsError } = await admin
    .from("exercise_attempts")
    .select("correct, created_at")
    .eq("student_id", studentId)
    .in("exercise_id", exerciseIds)
    .order("created_at", { ascending: true });

  if (attemptsError) {
    throw new Error(`No se pudieron cargar intentos: ${attemptsError.message}`);
  }

  const masteryInputs: MasteryAttemptInput[] = ((attempts ?? []) as AttemptRow[]).map(
    (attempt) => ({
      correct: attempt.correct,
      createdAt: new Date(attempt.created_at),
    }),
  );

  const mastery = roundMastery(calculateMastery(masteryInputs));

  const { error: upsertError } = await admin.rpc("upsert_student_concept_mastery", {
    p_student_id: studentId,
    p_concept_id: conceptId,
    p_mastery: mastery,
  });

  if (upsertError) {
    throw new Error(`No se pudo actualizar mastery: ${upsertError.message}`);
  }

  return mastery;
}
