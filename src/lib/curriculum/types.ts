export type CourseSummary = {
  id: string;
  title: string;
  description: string | null;
};

export type ModuleSummary = {
  id: string;
  title: string;
  orderIndex: number;
  lessons: LessonSummary[];
};

export type LessonSummary = {
  id: string;
  title: string;
  orderIndex: number;
  videoUrl: string | null;
  exerciseCount: number;
  pathStatus: "not_started" | "started" | "completed";
  conceptIds: string[];
};

export type LessonDetail = LessonSummary & {
  moduleTitle: string;
  courseTitle: string;
  exercises: ExerciseSummary[];
  concepts: ConceptSummary[];
};

export type ExerciseSummary = {
  id: string;
  type: string;
  difficulty: number;
  conceptId: string;
  questionPreview: string;
  attemptCount: number;
  hasCorrectAttempt: boolean;
};

export type ConceptSummary = {
  id: string;
  slug: string;
  title: string;
  mastery: number;
  attemptCount: number;
};

export type CourseOutline = {
  course: CourseSummary;
  modules: ModuleSummary[];
};
