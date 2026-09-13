import type { LessonProgressStatus } from "@/lib/learning-paths/types";

export type CourseSummary = {
  id: string;
  title: string;
  description: string | null;
};

export type LessonOutline = {
  id: string;
  title: string;
  orderIndex: number;
  videoUrl: string | null;
  conceptCount: number;
  status: LessonProgressStatus;
};

export type ModuleOutline = {
  id: string;
  title: string;
  orderIndex: number;
  lessons: LessonOutline[];
};

export type CourseOutline = {
  course: CourseSummary;
  modules: ModuleOutline[];
};

export type LessonDetail = {
  id: string;
  title: string;
  videoUrl: string | null;
  moduleTitle: string;
  courseId: string;
  courseTitle: string;
  conceptTitles: string[];
  status: LessonProgressStatus;
  practiceExerciseId: string | null;
};
