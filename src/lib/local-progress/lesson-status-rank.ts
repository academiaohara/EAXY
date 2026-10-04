import type { LocalLessonStatus } from "@/lib/local-progress/types";
import type { LessonSummary } from "@/lib/curriculum/types";

const STATUS_RANK: Record<LocalLessonStatus | "not_started", number> = {
  not_started: 0,
  started: 1,
  incomplete: 2,
  completed: 3,
};

export function pickStrongerLessonStatus(
  a: LessonSummary["pathStatus"],
  b: LocalLessonStatus | undefined,
): LessonSummary["pathStatus"] {
  if (!b) {
    return a;
  }
  const rankA = STATUS_RANK[a];
  const rankB = STATUS_RANK[b];
  return rankB > rankA ? b : a;
}

export function shouldReplaceLocalLessonStatus(
  current: LocalLessonStatus | undefined,
  next: LocalLessonStatus,
): boolean {
  if (!current) {
    return true;
  }
  return STATUS_RANK[next] > STATUS_RANK[current];
}
