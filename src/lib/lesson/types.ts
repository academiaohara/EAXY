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
  /** Ayudas visuales animadas que acompañan a la teoría. */
  visuals?: LessonVisual[];
};

export type VisualTone = "cobalt" | "emerald" | "amber" | "violet" | "rose";

/** Descompone una fórmula en piezas y las va señalando con su nombre. */
export type EquationAnatomyVisual = {
  kind: "equation-anatomy";
  title?: string;
  parts: { tex: string; label?: string; tone?: VisualTone }[];
  caption?: string;
};

/** Sustituye pares $(x, y)$ en $ax + by = c$ y marca si cumplen la igualdad. */
export type SolutionCheckVisual = {
  kind: "solution-check";
  title?: string;
  a: number;
  b: number;
  c: number;
  pairs: [number, number][];
};

/** Varias gráficas pequeñas que se dibujan solas, cada una con su rótulo. */
export type GraphGalleryVisual = {
  kind: "graph-gallery";
  title?: string;
  items: { caption: string; detail?: string; graph: SystemGraphConfig }[];
};

/** Tarjetas comparativas (métodos, tipos…) que entran una tras otra. */
export type CardsVisual = {
  kind: "cards";
  title?: string;
  items: { title: string; math?: string; caption?: string; tone?: VisualTone }[];
};

/** Operación en columna: las filas aparecen y, bajo la raya, el resultado. */
export type StackVisual = {
  kind: "stack";
  title?: string;
  rows: string[];
  operator?: string;
  result: string;
  caption?: string;
};

/** Del enunciado al álgebra: cada frase se convierte en su expresión. */
export type TranslateVisual = {
  kind: "translate";
  title?: string;
  rows: { text: string; math: string }[];
};

/** Recta numérica con puntos y, opcionalmente, segmento de valor absoluto. */
export type NumberLineVisual = {
  kind: "number-line";
  title?: string;
  min: number;
  max: number;
  step?: number;
  points?: { value: number; label?: string; tone?: VisualTone }[];
  /** Muestra |n| como distancia desde 0 hasta n. */
  absValue?: number;
  caption?: string;
};

/** Tabla animada (+)(−)=… para producto o cociente. */
export type SignRulesVisual = {
  kind: "sign-rules";
  title?: string;
  operation?: "multiply" | "divide";
  caption?: string;
};

/** Situaciones opuestas (temperatura, dinero…) con + y −. */
export type OppositeScenariosVisual = {
  kind: "opposite-scenarios";
  title?: string;
  pairs: { context: string; positive: string; negative: string }[];
};

/** Reglas visuales suma/resta mismo signo vs distinto signo. */
export type IntegerAddRulesVisual = {
  kind: "integer-add-rules";
  title?: string;
};

/** Quitar paréntesis delante de + o −. */
export type ParenthesisRulesVisual = {
  kind: "parenthesis-rules";
  title?: string;
  activeCase?: "plus-add" | "plus-sub" | "minus-add" | "minus-sub";
};

export type LessonVisual =
  | EquationAnatomyVisual
  | SolutionCheckVisual
  | GraphGalleryVisual
  | CardsVisual
  | StackVisual
  | TranslateVisual
  | NumberLineVisual
  | SignRulesVisual
  | OppositeScenariosVisual
  | IntegerAddRulesVisual
  | ParenthesisRulesVisual;

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
