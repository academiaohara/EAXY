export type RecommendationAction = "practice" | "reinforce" | "recover" | "advance" | "rest";

export type Recommendation = {
  action: RecommendationAction;
  conceptId: string | null;
  lessonId: string | null;
  exerciseId: string | null;
  priority: number;
  explanation: {
    ruleId: string;
    summary: string;
    details: Record<string, unknown>;
  };
};

export type ConceptSummary = {
  id: string;
  title: string;
};

export type ConceptMasterySnapshot = {
  conceptId: string;
  mastery: number;
  lastAttemptAt: Date | null;
};

export type ExerciseSummary = {
  id: string;
  conceptId: string;
  difficulty: number;
};

export type AttemptSnapshot = {
  exerciseId: string;
  conceptId: string;
  correct: boolean;
  createdAt: Date;
};

export type LessonSnapshot = {
  id: string;
  title: string;
  moduleOrderIndex: number;
  orderIndex: number;
  conceptIds: string[];
  progressStatus: "not_started" | "started" | "completed";
};

export type ConceptPrerequisite = {
  conceptId: string;
  prerequisiteId: string;
  minMastery: number;
};

export type PendingAssignment = {
  id: string;
  classroomName: string;
  conceptId: string | null;
  exerciseId: string | null;
};

export type RecommendationContext = {
  now: Date;
  concepts: ConceptSummary[];
  masteryByConcept: Map<string, ConceptMasterySnapshot>;
  exercises: ExerciseSummary[];
  attempts: AttemptSnapshot[];
  lessons: LessonSnapshot[];
  prerequisites: ConceptPrerequisite[];
  pendingAssignments: PendingAssignment[];
};
