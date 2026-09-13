export type LearningPathStatus = "started" | "completed";

export type LearningPathRecord = {
  lessonId: string;
  status: LearningPathStatus;
  startedAt: string;
  completedAt: string | null;
};
