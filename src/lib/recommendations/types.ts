export type RecommendationAction =
  | "practice"
  | "reinforce"
  | "recover"
  | "advance"
  | "rest";

export type RecommendationExplanation = {
  ruleId: string;
  summary: string;
  details: Record<string, unknown>;
};

export type Recommendation = {
  action: RecommendationAction;
  conceptId: string | null;
  exerciseId: string | null;
  lessonId: string | null;
  priority: number;
  explanation: RecommendationExplanation;
};

export type ConceptContext = {
  id: string;
  slug: string;
  title: string;
  mastery: number;
  attemptCount: number;
  lastAttemptAt: Date | null;
  exerciseIds: string[];
};

export type PrerequisiteContext = {
  conceptId: string;
  prerequisiteId: string;
  minMastery: number;
};

export type AttemptContext = {
  exerciseId: string;
  conceptId: string;
  correct: boolean;
  score: number;
  createdAt: Date;
};

export type LessonContext = {
  id: string;
  title: string;
  orderIndex: number;
  moduleOrderIndex: number;
  conceptIds: string[];
  pathStatus: "not_started" | "started" | "completed";
};

export type ExerciseContext = {
  id: string;
  conceptId: string;
  difficulty: number;
  lessonIds: string[];
};

export type AssignmentContext = {
  assignmentId: string;
  classroomId: string;
  classroomName: string;
  status: "pending" | "in_progress";
  exerciseIds: string[];
  conceptIds: string[];
};

export type RecommendationContext = {
  studentId: string;
  classroomId?: string;
  referenceDate: Date;
  concepts: ConceptContext[];
  prerequisites: PrerequisiteContext[];
  attempts: AttemptContext[];
  attemptsLastHour: number;
  lessons: LessonContext[];
  exercises: ExerciseContext[];
  assignments: AssignmentContext[];
};

export type RuleEvaluator = (context: RecommendationContext) => Recommendation | null;
