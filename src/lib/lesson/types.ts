export type StepType = "concept" | "multiple_choice" | "fill_in_blank";

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

export type LessonStep = ConceptStep | MultipleChoiceStep | FillInBlankStep;

export type InteractiveLesson = {
  slug: string;
  title: string;
  subtitle: string;
  steps: LessonStep[];
};

export type FeedbackStatus = "correct" | "incorrect";
