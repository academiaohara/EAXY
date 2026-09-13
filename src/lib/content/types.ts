export type LessonProgressStatus = "not_started" | "started" | "completed";

export type CourseLessonSummary = {
  id: string;
  title: string;
  orderIndex: number;
  progressStatus: LessonProgressStatus;
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
  completedLessons: number;
  totalLessons: number;
};

export type LessonConceptSummary = {
  id: string;
  title: string;
};

export type LessonExerciseSummary = {
  id: string;
  type: string;
  difficulty: number;
};

export type LessonDetail = {
  id: string;
  title: string;
  videoUrl: string | null;
  moduleTitle: string;
  courseTitle: string;
  concepts: LessonConceptSummary[];
  exercises: LessonExerciseSummary[];
  progressStatus: LessonProgressStatus;
};

export type LearningPathRecord = {
  lessonId: string;
  status: "started" | "completed";
  completedAt: string | null;
};
