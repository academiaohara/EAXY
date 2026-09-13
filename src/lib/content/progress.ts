import type { LessonProgressStatus, LearningPathRecord } from "@/lib/content/types";

export function resolveLessonProgressStatus(
  path: LearningPathRecord | undefined,
): LessonProgressStatus {
  if (!path) {
    return "not_started";
  }

  return path.status === "completed" ? "completed" : "started";
}

export function countCompletedLessons(
  lessonIds: readonly string[],
  paths: readonly LearningPathRecord[],
): number {
  const pathByLesson = new Map(paths.map((path) => [path.lessonId, path]));

  return lessonIds.filter(
    (lessonId) => pathByLesson.get(lessonId)?.status === "completed",
  ).length;
}
