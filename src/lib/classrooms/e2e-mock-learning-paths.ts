import type { LearningPathStatus } from "@/lib/learning-paths/types";

type MockLearningPathRecord = {
  studentId: string;
  lessonId: string;
  status: LearningPathStatus;
  startedAt: Date;
  completedAt: Date | null;
};

const mockLearningPaths: MockLearningPathRecord[] = [];

export function mockResetLearningPathState(): void {
  mockLearningPaths.length = 0;
}

export function mockGetLearningPathStatus(
  studentId: string,
  lessonId: string,
): LearningPathStatus | null {
  return (
    mockLearningPaths.find(
      (record) => record.studentId === studentId && record.lessonId === lessonId,
    )?.status ?? null
  );
}

export function mockGetLearningPathMap(studentId: string): Record<string, LearningPathStatus> {
  const map: Record<string, LearningPathStatus> = {};

  for (const record of mockLearningPaths) {
    if (record.studentId === studentId) {
      map[record.lessonId] = record.status;
    }
  }

  return map;
}

export function mockStartLesson(studentId: string, lessonId: string): void {
  const existing = mockLearningPaths.find(
    (record) => record.studentId === studentId && record.lessonId === lessonId,
  );

  if (existing) {
    return;
  }

  mockLearningPaths.push({
    studentId,
    lessonId,
    status: "started",
    startedAt: new Date(),
    completedAt: null,
  });
}

export function mockCompleteLesson(studentId: string, lessonId: string): boolean {
  let record = mockLearningPaths.find(
    (entry) => entry.studentId === studentId && entry.lessonId === lessonId,
  );

  if (!record) {
    mockStartLesson(studentId, lessonId);
    record = mockLearningPaths.find(
      (entry) => entry.studentId === studentId && entry.lessonId === lessonId,
    );
  }

  if (!record || record.status === "completed") {
    return record?.status === "completed";
  }

  record.status = "completed";
  record.completedAt = new Date();
  return true;
}
