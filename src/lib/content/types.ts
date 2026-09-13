import type { LearningPathStatus } from "@/lib/learning-paths/types";

export type LessonConceptSummary = {
  id: string;
  title: string;
  description: string | null;
  mastery: number;
};

export type CourseLessonSummary = {
  id: string;
  title: string;
  orderIndex: number;
  videoUrl: string | null;
  status: LearningPathStatus | null;
  conceptCount: number;
};

export type CourseModuleSummary = {
  id: string;
  title: string;
  orderIndex: number;
  lessons: CourseLessonSummary[];
};

export type CourseOutline = {
  id: string;
  title: string;
  description: string | null;
  modules: CourseModuleSummary[];
};

export type LessonDetail = {
  id: string;
  title: string;
  orderIndex: number;
  videoUrl: string | null;
  moduleTitle: string;
  courseTitle: string;
  status: LearningPathStatus | null;
  concepts: LessonConceptSummary[];
  canComplete: boolean;
};
