"use server";

import { requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { checkAnswer } from "@/lib/exercise-engine/check-answer";
import { parseExerciseAnswer, parseExerciseContent } from "@/lib/exercise-engine/schemas";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { mockSubmitExerciseAttempt } from "@/lib/exercises/e2e-mock";
import { recalculateStudentConceptMastery } from "@/lib/exercises/mastery";
import { syncLessonProgressForConcept } from "@/lib/learning-paths/service";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";
import { createServerSupabaseClient } from "@/lib/supabase";

type ExerciseRecord = {
  id: string;
  concept_id: string;
  type: ExerciseType;
  content: unknown;
};

export async function submitExerciseAttempt(
  exerciseId: string,
  answer: unknown,
  timeSpentMs: number,
  hintsUsed = 0,
): Promise<SubmitExerciseAttemptResult> {
  const studentId = await requireAuthenticatedUserId();

  if (isE2EMockClassroomEnabled()) {
    const mockResult = mockSubmitExerciseAttempt(studentId, exerciseId, answer, timeSpentMs);
    const exercise = await import("@/lib/exercises/e2e-mock").then((mod) =>
      mod.mockGetExerciseById(exerciseId),
    );
    if (exercise) {
      await syncLessonProgressForConcept(studentId, exercise.concept_id);
    }
    return mockResult;
  }

  const supabase = await createServerSupabaseClient();

  const { data: exercise, error: exerciseError } = await supabase
    .from("exercises")
    .select("id, concept_id, type, content")
    .eq("id", exerciseId)
    .maybeSingle();

  if (exerciseError) {
    throw new Error(`No se pudo cargar el ejercicio: ${exerciseError.message}`);
  }

  if (!exercise) {
    throw new Error("Ejercicio no encontrado");
  }

  const typedExercise = exercise as ExerciseRecord;
  const content = parseExerciseContent(typedExercise.type, typedExercise.content);
  const parsedAnswer = parseExerciseAnswer(typedExercise.type, answer);
  const result = checkAnswer(typedExercise.type, content, parsedAnswer);

  const { count: previousAttempts, error: countError } = await supabase
    .from("exercise_attempts")
    .select("id", { count: "exact", head: true })
    .eq("student_id", studentId)
    .eq("exercise_id", exerciseId);

  if (countError) {
    throw new Error(`No se pudo calcular el número de intento: ${countError.message}`);
  }

  const attemptNumber = (previousAttempts ?? 0) + 1;

  const { error: insertError } = await supabase.from("exercise_attempts").insert({
    student_id: studentId,
    exercise_id: exerciseId,
    answer: parsedAnswer,
    correct: result.correct,
    time_spent_ms: Math.max(0, timeSpentMs),
    hints_used: Math.max(0, hintsUsed),
    attempt_number: attemptNumber,
  });

  if (insertError) {
    throw new Error(`No se pudo guardar el intento: ${insertError.message}`);
  }

  const mastery = await recalculateStudentConceptMastery(studentId, typedExercise.concept_id);
  await syncLessonProgressForConcept(studentId, typedExercise.concept_id);

  const { data: concept } = await supabase
    .from("concepts")
    .select("title")
    .eq("id", typedExercise.concept_id)
    .maybeSingle();

  return {
    correct: result.correct,
    correctAnswer: result.correctAnswer,
    mastery,
    conceptTitle: concept?.title ?? "Concepto",
  };
}
