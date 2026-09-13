import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import {
  mockGetConceptIdsWithCorrectAttempt,
  mockGetMasteryByConcept,
} from "@/lib/classrooms/e2e-mock-practice";
import {
  mockCompleteLesson,
  mockGetLearningPathMap,
  mockStartLesson,
} from "@/lib/classrooms/e2e-mock-learning-paths";
import { getContentConceptIdsForLesson } from "@/lib/content/fixtures";
import { canCompleteLesson } from "@/lib/learning-paths/completion";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function getConceptIdsWithCorrectAttemptForStudent(
  studentId: string,
): Promise<string[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetConceptIdsWithCorrectAttempt(studentId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: attempts, error: attemptsError } = await supabase
    .from("exercise_attempts")
    .select("correct, exercises!inner(concept_id)")
    .eq("student_id", studentId)
    .eq("correct", true);

  if (attemptsError) {
    throw new Error(`No se pudieron cargar intentos: ${attemptsError.message}`);
  }

  const conceptIds = new Set<string>();

  for (const attempt of attempts ?? []) {
    const conceptId = (attempt.exercises as { concept_id: string }).concept_id;
    conceptIds.add(conceptId);
  }

  return [...conceptIds];
}

export async function getLessonConceptIds(lessonId: string): Promise<string[]> {
  if (isE2EMockClassroomEnabled()) {
    return getContentConceptIdsForLesson(lessonId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("lesson_concepts")
    .select("concept_id")
    .eq("lesson_id", lessonId);

  if (error) {
    throw new Error(`No se pudieron cargar conceptos de la lección: ${error.message}`);
  }

  return (data ?? []).map((row) => row.concept_id);
}

export async function startLessonForStudent(studentId: string, lessonId: string): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    mockStartLesson(studentId, lessonId);
    return;
  }

  const supabase = await createServerSupabaseClient();
  const { data: existing, error: existingError } = await supabase
    .from("learning_paths")
    .select("lesson_id")
    .eq("student_id", studentId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (existingError) {
    throw new Error(`No se pudo comprobar el progreso de la lección: ${existingError.message}`);
  }

  if (existing) {
    return;
  }

  const { error: insertError } = await supabase.from("learning_paths").insert({
    student_id: studentId,
    lesson_id: lessonId,
    status: "started",
  });

  if (insertError) {
    throw new Error(`No se pudo registrar el inicio de la lección: ${insertError.message}`);
  }
}

export type CompleteLessonResult = {
  success: boolean;
  error?: string;
};

export async function completeLessonForStudent(
  studentId: string,
  lessonId: string,
): Promise<CompleteLessonResult> {
  const lessonConceptIds = await getLessonConceptIds(lessonId);
  const conceptIdsWithCorrectAttempt = await getConceptIdsWithCorrectAttemptForStudent(studentId);

  if (!canCompleteLesson(lessonConceptIds, conceptIdsWithCorrectAttempt)) {
    return {
      success: false,
      error: "Aún no has acertado al menos un ejercicio de cada concepto de esta lección.",
    };
  }

  if (isE2EMockClassroomEnabled()) {
    mockCompleteLesson(studentId, lessonId);
    return { success: true };
  }

  await startLessonForStudent(studentId, lessonId);

  const supabase = await createServerSupabaseClient();
  const completedAt = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("learning_paths")
    .update({
      status: "completed",
      completed_at: completedAt,
    })
    .eq("student_id", studentId)
    .eq("lesson_id", lessonId);

  if (updateError) {
    throw new Error(`No se pudo completar la lección: ${updateError.message}`);
  }

  return { success: true };
}

export async function getLearningPathMapForStudent(
  studentId: string,
): Promise<Record<string, "started" | "completed">> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetLearningPathMap(studentId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("learning_paths")
    .select("lesson_id, status")
    .eq("student_id", studentId);

  if (error) {
    throw new Error(`No se pudo cargar el progreso del curso: ${error.message}`);
  }

  return Object.fromEntries((data ?? []).map((row) => [row.lesson_id, row.status]));
}

export async function getMasteryByConceptForStudent(
  studentId: string,
): Promise<Record<string, number>> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetMasteryByConcept(studentId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("student_concept_mastery")
    .select("concept_id, mastery")
    .eq("student_id", studentId);

  if (error) {
    throw new Error(`No se pudo cargar mastery: ${error.message}`);
  }

  return Object.fromEntries((data ?? []).map((row) => [row.concept_id, Number(row.mastery)]));
}
