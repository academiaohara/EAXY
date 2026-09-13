"use server";

import { revalidatePath } from "next/cache";
import { requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import {
  isE2EMockClassroomEnabled,
  mockMarkLessonCompleted,
  mockMarkLessonStarted,
} from "@/lib/classrooms/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

export type MarkLessonResult = {
  error?: string;
};

export async function markLessonStarted(lessonId: string): Promise<MarkLessonResult> {
  const studentId = await requireAuthenticatedUserId();

  if (isE2EMockClassroomEnabled()) {
    mockMarkLessonStarted(studentId, lessonId);
    revalidatePath("/curso");
    revalidatePath(`/curso/${lessonId}`);
    return {};
  }

  const supabase = await createServerSupabaseClient();

  const { data: existing, error: selectError } = await supabase
    .from("learning_paths")
    .select("status")
    .eq("student_id", studentId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (selectError) {
    return { error: `No se pudo leer el progreso: ${selectError.message}` };
  }

  if (existing) {
    return {};
  }

  const { error: insertError } = await supabase.from("learning_paths").insert({
    student_id: studentId,
    lesson_id: lessonId,
    status: "started",
  });

  if (insertError) {
    return { error: `No se pudo registrar el inicio de la lección: ${insertError.message}` };
  }

  revalidatePath("/curso");
  revalidatePath(`/curso/${lessonId}`);
  return {};
}

export async function markLessonCompleted(lessonId: string): Promise<MarkLessonResult> {
  const studentId = await requireAuthenticatedUserId();

  if (isE2EMockClassroomEnabled()) {
    mockMarkLessonCompleted(studentId, lessonId);
    revalidatePath("/curso");
    revalidatePath(`/curso/${lessonId}`);
    return {};
  }

  const supabase = await createServerSupabaseClient();
  const completedAt = new Date().toISOString();

  const { data: existing, error: selectError } = await supabase
    .from("learning_paths")
    .select("status")
    .eq("student_id", studentId)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (selectError) {
    return { error: `No se pudo leer el progreso: ${selectError.message}` };
  }

  if (existing?.status === "completed") {
    return {};
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("learning_paths")
      .update({
        status: "completed",
        completed_at: completedAt,
      })
      .eq("student_id", studentId)
      .eq("lesson_id", lessonId);

    if (updateError) {
      return { error: `No se pudo completar la lección: ${updateError.message}` };
    }
  } else {
    const { error: insertError } = await supabase.from("learning_paths").insert({
      student_id: studentId,
      lesson_id: lessonId,
      status: "completed",
      completed_at: completedAt,
    });

    if (insertError) {
      return { error: `No se pudo completar la lección: ${insertError.message}` };
    }
  }

  revalidatePath("/curso");
  revalidatePath(`/curso/${lessonId}`);
  return {};
}
