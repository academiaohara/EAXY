export type LessonKind = "exercises" | "interactive";

export type CourseSummary = {
  id: string;
  title: string;
  description: string | null;
  orderIndex?: number;
};

export type CourseCatalogEntry = CourseSummary & {
  orderIndex: number;
  moduleCount: number;
  lessonCount: number;
};

export type TopicExerciseSummary = {
  id: string;
  title: string;
  statement: string;
  solutionText: string;
  solutionVideoUrl: string;
};

export type ModuleSummary = {
  id: string;
  title: string;
  orderIndex: number;
  lessons: LessonSummary[];
  topicExercises: TopicExerciseSummary[];
};

export type LessonSummary = {
  id: string;
  title: string;
  orderIndex: number;
  videoUrl: string | null;
  exerciseCount: number;
  pathStatus: "not_started" | "started" | "completed";
  conceptIds: string[];
  kind: LessonKind;
  interactiveSlug?: string;
  stepCount?: number;
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
