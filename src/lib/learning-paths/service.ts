import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import {
  mockGetLessonConceptIds,
  mockGetLessonsForConcept,
} from "@/lib/curriculum/e2e-mock";
import { isLessonComplete } from "@/lib/learning-paths/completion";
import {
  mockMarkLessonCompleted,
  mockMarkLessonStarted,
} from "@/lib/learning-paths/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

async function getPracticedConceptIds(studentId: string): Promise<Set<string>> {
  if (isE2EMockClassroomEnabled()) {
    const { mockGetAttemptedExerciseIds, MOCK_EXERCISES } = await import(
      "@/lib/exercises/e2e-mock"
    );
    const attemptedExerciseIds = mockGetAttemptedExerciseIds(studentId);
    const practicedConceptIds = new Set<string>();

    for (const exercise of MOCK_EXERCISES) {
      if (attemptedExerciseIds.has(exercise.id)) {
        practicedConceptIds.add(exercise.concept_id);
      }
    }

    return practicedConceptIds;
  }

  const supabase = await createServerSupabaseClient();
  const { data: attempts, error } = await supabase
    .from("exercise_attempts")
    .select("exercise_id")
    .eq("student_id", studentId);

  if (error) {
    throw new Error(`No se pudieron cargar intentos: ${error.message}`);
  }

  const exerciseIds = [...new Set((attempts ?? []).map((row) => row.exercise_id))];

  if (exerciseIds.length === 0) {
    return new Set();
  }

  const { data: exercises, error: exercisesError } = await supabase
    .from("exercises")
    .select("concept_id")
    .in("id", exerciseIds);

  if (exercisesError) {
    throw new Error(`No se pudieron cargar ejercicios: ${exercisesError.message}`);
  }

  return new Set((exercises ?? []).map((row) => row.concept_id));
}

async function getLessonConceptIds(lessonId: string): Promise<string[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetLessonConceptIds(lessonId);
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

async function getLessonsForConcept(conceptId: string): Promise<string[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetLessonsForConcept(conceptId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("lesson_concepts")
    .select("lesson_id")
    .eq("concept_id", conceptId);

  if (error) {
    throw new Error(`No se pudieron cargar lecciones del concepto: ${error.message}`);
  }

  return (data ?? []).map((row) => row.lesson_id);
}

export async function markLessonStarted(studentId: string, lessonId: string): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    mockMarkLessonStarted(studentId, lessonId);
    return;
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("learning_paths").upsert(
    {
      student_id: studentId,
      lesson_id: lessonId,
      status: "started",
    },
    { onConflict: "student_id,lesson_id", ignoreDuplicates: true },
  );

  if (error) {
    throw new Error(`No se pudo registrar el inicio de la lección: ${error.message}`);
  }
}

async function markLessonCompleted(studentId: string, lessonId: string): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    mockMarkLessonCompleted(studentId, lessonId);
    return;
  }

  const supabase = await createServerSupabaseClient();
  const completedAt = new Date().toISOString();

  const { error } = await supabase.from("learning_paths").upsert(
    {
      student_id: studentId,
      lesson_id: lessonId,
      status: "completed",
      completed_at: completedAt,
    },
    { onConflict: "student_id,lesson_id" },
  );

  if (error) {
    throw new Error(`No se pudo completar la lección: ${error.message}`);
  }
}

export async function syncLessonProgressForConcept(
  studentId: string,
  conceptId: string,
): Promise<void> {
  const lessonIds = await getLessonsForConcept(conceptId);
  if (lessonIds.length === 0) {
    return;
  }

  const practicedConceptIds = await getPracticedConceptIds(studentId);

  for (const lessonId of lessonIds) {
    const lessonConceptIds = await getLessonConceptIds(lessonId);

    if (!isLessonComplete(lessonConceptIds, practicedConceptIds)) {
      continue;
    }

    await markLessonCompleted(studentId, lessonId);
  }
}

export async function syncLessonProgress(studentId: string, lessonId: string): Promise<void> {
  const lessonConceptIds = await getLessonConceptIds(lessonId);
  const practicedConceptIds = await getPracticedConceptIds(studentId);

  if (isLessonComplete(lessonConceptIds, practicedConceptIds)) {
    await markLessonCompleted(studentId, lessonId);
  }
}
