import type { LearningPathRecord, LearningPathStatus } from "@/lib/learning-paths/types";

const mockLearningPathsByStudent = new Map<string, Map<string, LearningPathRecord>>();

export function mockGetLearningPaths(studentId: string): LearningPathRecord[] {
  const paths = mockLearningPathsByStudent.get(studentId);
  return paths ? [...paths.values()] : [];
}

export function mockGetLearningPath(
  studentId: string,
  lessonId: string,
): LearningPathRecord | null {
  return mockLearningPathsByStudent.get(studentId)?.get(lessonId) ?? null;
}

export function mockMarkLessonStarted(studentId: string, lessonId: string): LearningPathRecord {
  const studentPaths = mockLearningPathsByStudent.get(studentId) ?? new Map<string, LearningPathRecord>();
  const existing = studentPaths.get(lessonId);

  if (existing) {
    return existing;
  }

  const record: LearningPathRecord = {
    lessonId,
    status: "started",
    startedAt: new Date().toISOString(),
    completedAt: null,
  };

  studentPaths.set(lessonId, record);
  mockLearningPathsByStudent.set(studentId, studentPaths);
  return record;
}

export function mockMarkLessonCompleted(studentId: string, lessonId: string): LearningPathRecord {
  const studentPaths = mockLearningPathsByStudent.get(studentId) ?? new Map<string, LearningPathRecord>();
  const existing = studentPaths.get(lessonId);
  const now = new Date().toISOString();

  const record: LearningPathRecord = {
    lessonId,
    status: "completed",
    startedAt: existing?.startedAt ?? now,
    completedAt: now,
  };

  studentPaths.set(lessonId, record);
  mockLearningPathsByStudent.set(studentId, studentPaths);
  return record;
}

export function mockGetLearningPathStatus(
  studentId: string,
  lessonId: string,
): LearningPathStatus | null {
  return mockGetLearningPath(studentId, lessonId)?.status ?? null;
}

export function resetMockLearningPaths(): void {
  mockLearningPathsByStudent.clear();
}
