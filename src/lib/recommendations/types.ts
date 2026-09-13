export const RECOMMENDATION_ACTIONS = [
  "practice",
  "reinforce",
  "recover",
  "advance",
  "rest",
] as const;

export type RecommendationAction = (typeof RECOMMENDATION_ACTIONS)[number];

export type ConceptNode = {
  id: string;
  slug: string;
  title: string;
  /** Posición del concepto en el recorrido lineal del curso (0 = primero). */
  orderIndex: number;
  exerciseCount: number;
  prerequisites: { conceptId: string; minMastery: number }[];
};

export type ConceptMasterySnapshot = {
  conceptId: string;
  mastery: number;
  attemptCount: number;
  lastAttemptAt: Date | null;
};

export type AttemptSnapshot = {
  conceptId: string;
  correct: boolean;
  createdAt: Date;
};

export type PendingAssignmentSnapshot = {
  id: string;
  title: string;
  classroomName: string;
  conceptId?: string;
};

/** Todo lo que el motor necesita saber de un estudiante. Se construye en la capa de datos. */
export type StudentSnapshot = {
  now: Date;
  concepts: ConceptNode[];
  mastery: ConceptMasterySnapshot[];
  /** Intentos recientes ordenados de más reciente a más antiguo. */
  recentAttempts: AttemptSnapshot[];
  pendingAssignments: PendingAssignmentSnapshot[];
};

export type RecommendationExplanation = {
  /** Identificador estable de la regla (R1…R7). */
  ruleId: string;
  /** Texto en español para el usuario. */
  summary: string;
  /** Datos que activaron la regla, para el panel «¿Por qué?». */
  details: Record<string, string | number | boolean | null>;
};

export type Recommendation = {
  action: RecommendationAction;
  conceptId: string | null;
  priority: number;
  explanation: RecommendationExplanation;
};

export type RecommendationRule = {
  id: string;
  evaluate: (snapshot: StudentSnapshot) => Recommendation | null;
};
