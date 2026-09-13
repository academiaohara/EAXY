"use server";

import { revalidatePath } from "next/cache";
import { requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import {
  completeLessonForStudent,
  startLessonForStudent,
} from "@/lib/learning-paths/queries";

export async function startLesson(lessonId: string): Promise<void> {
  const studentId = await requireAuthenticatedUserId();
  await startLessonForStudent(studentId, lessonId);
  revalidatePath("/aprender/curso");
  revalidatePath(`/aprender/curso/${lessonId}`);
}

export type CompleteLessonActionResult = {
  success: boolean;
  error?: string;
};

export async function completeLesson(lessonId: string): Promise<CompleteLessonActionResult> {
  const studentId = await requireAuthenticatedUserId();
  const result = await completeLessonForStudent(studentId, lessonId);

  if (result.success) {
    revalidatePath("/aprender/curso");
    revalidatePath(`/aprender/curso/${lessonId}`);
    revalidatePath("/aprender");
  }

  return result;
}
