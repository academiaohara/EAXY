"use server";

import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { shouldUseLocalCatalog } from "@/lib/curriculum/local-catalog";
import { checkAnswer } from "@/lib/exercise-engine/check-answer";
import { parseExerciseAnswer, parseExerciseContent } from "@/lib/exercise-engine/schemas";
import type { ExerciseType } from "@/lib/exercise-engine/types";
import { getConceptBySlug } from "@/content";
import { mockSubmitExerciseAttempt } from "@/lib/exercises/e2e-mock";
import { recalculateStudentConceptMastery } from "@/lib/exercises/mastery";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";
import {
  mockGetExercise,
  mockRecordExerciseAttempt,
} from "@/lib/learning/e2e-mock";
import { syncLessonCompletionForExercise } from "@/lib/learning-paths/actions";
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
  const studentId = await getAuthenticatedUserIdOrNull();

  if (isE2EMockClassroomEnabled() && studentId) {
    const catalogExercise = mockGetExercise(exerciseId);
    if (catalogExercise) {
      const content = parseExerciseContent(catalogExercise.type, catalogExercise.content);
      const parsedAnswer = parseExerciseAnswer(catalogExercise.type, answer);
      const result = checkAnswer(catalogExercise.type, content, parsedAnswer);
      const mastery = mockRecordExerciseAttempt(studentId, exerciseId, result.correct);
      const concept = getConceptBySlug(catalogExercise.concept_slug);

      return {
        correct: result.correct,
        correctAnswer: result.correctAnswer,
        explanation: result.explanation,
        mastery,
        conceptTitle: concept?.title ?? "Concepto",
      };
    }

    return mockSubmitExerciseAttempt(studentId, exerciseId, answer, timeSpentMs);
  }

  if (!studentId || shouldUseLocalCatalog(studentId)) {
    const catalogExercise = mockGetExercise(exerciseId);
    if (!catalogExercise) {
      throw new Error("Ejercicio no encontrado");
    }

    const content = parseExerciseContent(catalogExercise.type, catalogExercise.content);
    const parsedAnswer = parseExerciseAnswer(catalogExercise.type, answer);
    const result = checkAnswer(catalogExercise.type, content, parsedAnswer);
    const concept = getConceptBySlug(catalogExercise.concept_slug);

    return {
      correct: result.correct,
      correctAnswer: result.correctAnswer,
      explanation: result.explanation,
      mastery: 0,
      conceptTitle: concept?.title ?? "Concepto",
      persistLocally: true,
    };
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

  const { data: concept } = await supabase
    .from("concepts")
    .select("title")
    .eq("id", typedExercise.concept_id)
    .maybeSingle();

  let lessonCompleted = false;

  if (result.correct) {
    const completion = await syncLessonCompletionForExercise(exerciseId);
    lessonCompleted = completion.lessonCompleted;
  }

  return {
    correct: result.correct,
    correctAnswer: result.correctAnswer,
    explanation: result.explanation,
    mastery,
    conceptTitle: concept?.title ?? "Concepto",
    lessonCompleted,
  };
}
