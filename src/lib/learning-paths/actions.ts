"use server";

import { requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import { isContentPreviewModeEnabled } from "@/lib/content-preview/mode";
import { isLessonComplete } from "@/lib/learning-paths/completion";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function markLessonStarted(lessonId: string): Promise<void> {
  if (isContentPreviewModeEnabled()) {
    return;
  }

  const studentId = await requireAuthenticatedUserId();
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

/**
 * Tras un intento correcto, comprueba si la lección queda completada
 * y actualiza learning_paths si aplica.
 */
export async function syncLessonCompletionForExercise(
  exerciseId: string,
): Promise<{ lessonCompleted: boolean; lessonId: string | null }> {
  if (isContentPreviewModeEnabled()) {
    return { lessonCompleted: false, lessonId: null };
  }

  const studentId = await requireAuthenticatedUserId();
  const supabase = await createServerSupabaseClient();

  const { data: exercise, error: exerciseError } = await supabase
    .from("exercises")
    .select("id, concept_id")
    .eq("id", exerciseId)
    .maybeSingle();

  if (exerciseError || !exercise) {
    return { lessonCompleted: false, lessonId: null };
  }

  const { data: lessonLinks, error: lessonLinksError } = await supabase
    .from("lesson_concepts")
    .select("lesson_id")
    .eq("concept_id", exercise.concept_id);

  if (lessonLinksError || !lessonLinks || lessonLinks.length === 0) {
    return { lessonCompleted: false, lessonId: null };
  }

  const lessonIds = [...new Set(lessonLinks.map((row) => row.lesson_id as string))];
  let anyLessonCompleted = false;
  let completedLessonId: string | null = null;

  for (const lessonId of lessonIds) {
    const { data: conceptRows, error: conceptRowsError } = await supabase
      .from("lesson_concepts")
      .select("concept_id")
      .eq("lesson_id", lessonId);

    if (conceptRowsError || !conceptRows) {
      continue;
    }

    const conceptIds = conceptRows.map((row) => row.concept_id as string);

    const { data: lessonExercises, error: lessonExercisesError } = await supabase
      .from("exercises")
      .select("id")
      .in("concept_id", conceptIds);

    if (lessonExercisesError || !lessonExercises || lessonExercises.length === 0) {
      continue;
    }

    const exerciseIds = lessonExercises.map((row) => row.id as string);

    const { data: attempts, error: attemptsError } = await supabase
      .from("exercise_attempts")
      .select("exercise_id, correct")
      .eq("student_id", studentId)
      .in("exercise_id", exerciseIds);

    if (attemptsError) {
      continue;
    }

    const correctByExercise = new Map<string, boolean>();
    for (const attempt of attempts ?? []) {
      if (attempt.correct) {
        correctByExercise.set(attempt.exercise_id as string, true);
      }
    }

    const statuses = exerciseIds.map((id) => ({
      exerciseId: id,
      hasCorrectAttempt: correctByExercise.get(id) ?? false,
    }));

    if (!isLessonComplete(statuses)) {
      continue;
    }

    const { error: upsertError } = await supabase.from("learning_paths").upsert(
      {
        student_id: studentId,
        lesson_id: lessonId,
        status: "completed",
        completed_at: new Date().toISOString(),
      },
      { onConflict: "student_id,lesson_id" },
    );

    if (!upsertError) {
      anyLessonCompleted = true;
      completedLessonId = lessonId;
    }
  }

  return { lessonCompleted: anyLessonCompleted, lessonId: completedLessonId };
}
