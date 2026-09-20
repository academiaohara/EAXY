export type StepType =
  | "concept"
  | "animated_solution"
  | "interactive_tool"
  | "multiple_choice"
  | "fill_in_blank";

export type LessonStepBase = {
  id: string;
  title: string;
  /** Párrafos de teoría (pueden incluir LaTeX inline con $...$). */
  content?: string[];
  /** Bloques de matemáticas en modo display (sin delimitadores). */
  math?: string[];
  /** Aviso destacado (p. ej. soluciones falsas). */
  warning?: string;
};

export type ConceptStep = LessonStepBase & {
  type: "concept";
};

export type SolutionAnimationFrame = {
  math: string;
  caption?: string;
};

/** Explicación paso a paso: el alumno avanza pulsando para ver cada transformación. */
export type AnimatedSolutionStep = LessonStepBase & {
  type: "animated_solution";
  frames: SolutionAnimationFrame[];
};

/** Recta en forma $ax + by = c$. */
export type GraphLineStandard = {
  id: string;
  label: string;
  form: "standard";
  a: number;
  b: number;
  c: number;
  color?: string;
};

export type GraphLineHorizontal = {
  id: string;
  label: string;
  form: "horizontal";
  y: number;
  color?: string;
};

export type GraphLineVertical = {
  id: string;
  label: string;
  form: "vertical";
  x: number;
  color?: string;
};

export type GraphLine = GraphLineStandard | GraphLineHorizontal | GraphLineVertical;

export type SystemGraphConfig = {
  lines: GraphLine[];
  highlightPoints?: { x: number; y: number; label?: string }[];
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
};

export type InteractiveToolStep = LessonStepBase & {
  type: "interactive_tool";
  tool: "system-graph";
  graph: SystemGraphConfig;
};

export type MultipleChoiceStep = LessonStepBase & {
  type: "multiple_choice";
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  hint?: string;
  explanation?: string;
};

export type FillInBlankStep = LessonStepBase & {
  type: "fill_in_blank";
  question: string;
  correctAnswers: string[];
  hint?: string;
  explanation?: string;
};

export type LessonStep =
  | ConceptStep
  | AnimatedSolutionStep
  | InteractiveToolStep
  | MultipleChoiceStep
  | FillInBlankStep;

export type InteractiveLesson = {
  slug: string;
  title: string;
  subtitle: string;
  steps: LessonStep[];
};

export type FeedbackStatus = "correct" | "incorrect";

export function isQuizStep(step: LessonStep): boolean {
  return step.type === "multiple_choice" || step.type === "fill_in_blank";
}

export function isPassiveStep(step: LessonStep): boolean {
  return !isQuizStep(step);
}
