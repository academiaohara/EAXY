import type { RoundingOrderId } from "@/lib/lesson/naturales-redondeo";

export type StepType =
  | "concept"
  | "animated_solution"
  | "interactive_tool"
  | "fill_in_blank"
  | "fraction_pick"
  | "classify"
  | "number_line_pick";

/**
 * Cómo se reparte el paso en pantalla:
 * - `stack`: la teoría arriba y las ayudas visuales o la actividad debajo (por defecto).
 * - `visual-first`: la ayuda visual manda y la teoría la acompaña debajo.
 * - `split`: teoría a un lado y visuales al otro en pantallas anchas.
 */
export type StepLayout = "stack" | "visual-first" | "split";

export type LessonStepBase = {
  id: string;
  title: string;
  layout?: StepLayout;
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

export type FractionShape = "bar" | "circle" | "grid" | "set";

/** Figura (barra, tarta, cuadrícula o conjunto) con algunas partes coloreadas. */
export type FractionFigureVisual = {
  kind: "fraction-figure";
  title?: string;
  shape: FractionShape;
  /** Partes iguales de cada unidad. */
  parts: number;
  /** Partes coloreadas en total (pueden ocupar varias unidades). */
  shaded: number;
  /** Unidades que se dibujan; por defecto las necesarias para `shaded`. */
  wholes?: number;
  columns?: number;
  caption?: string;
  tone?: VisualTone;
};

export type LessonVisual =
  | FractionFigureVisual
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

/** Escenas de la lección 1 (1.º ESO): origen y sistemas de numeración. */
export type NaturalesNumeracionScene =
  | "origen-contar"
  | "sistemas-historia"
  | "decimal-intro"
  | "contar-diez"
  | "redondeo-demo"
  | "redondeo-corte";

export type { RoundingOrderId } from "@/lib/lesson/naturales-redondeo";

export type SystemGraphToolStep = LessonStepBase & {
  type: "interactive_tool";
  tool: "system-graph";
  graph: SystemGraphConfig;
};

export type NaturalesNumeracionToolStep = LessonStepBase & {
  type: "interactive_tool";
  tool: "naturales-numeracion";
  scene: NaturalesNumeracionScene;
  /** Configuración del ejercicio de redondeo (escena `redondeo-corte`). */
  roundingExercise?: { n: number; orderId: RoundingOrderId };
};

export type InteractiveToolStep = SystemGraphToolStep | NaturalesNumeracionToolStep;

type PracticeFields = {
  question: string;
  hint?: string;
  explanation?: string;
};

export type FillInBlankStep = LessonStepBase &
  PracticeFields & {
    type: "fill_in_blank";
    correctAnswers: string[];
  };

/**
 * El alumno toca las partes de una figura (o los elementos de un conjunto)
 * hasta formar la fracción pedida. Vale cualquier marcado equivalente a
 * `numerator`/`denominator`.
 */
export type FractionPickStep = LessonStepBase &
  PracticeFields & {
    type: "fraction_pick";
    shape: FractionShape;
    numerator: number;
    denominator: number;
    /** Partes en que aparece dividida cada unidad; por defecto, el denominador. */
    parts?: number;
    /** Unidades disponibles (más de una para fracciones mayores que 1). */
    wholes?: number;
    /** Si es true, el alumno decide también en cuántas partes divide la unidad. */
    adjustableParts?: boolean;
    /** Si es true, sólo vale dividir la unidad en exactamente `denominator` partes. */
    exactParts?: boolean;
    columns?: number;
    /** Nombre de cada elemento en conjuntos (p. ej. «canica»). */
    itemLabel?: string;
    /** Texto dentro de cada parte (p. ej. las caras de un dado). */
    labels?: string[];
    /** Índices de las partes que hay que marcar, cuando no vale cualquiera. */
    correctPieces?: number[];
  };

/** El alumno reparte tarjetas entre dos o más grupos. */
export type ClassifyStep = LessonStepBase &
  PracticeFields & {
    type: "classify";
    groups: { id: string; label: string; tone?: VisualTone }[];
    items: { id: string; text: string; group: string }[];
  };

/** El alumno marca un valor en la recta numérica. */
export type NumberLinePickStep = LessonStepBase &
  PracticeFields & {
    type: "number_line_pick";
    min: number;
    max: number;
    /** Divisiones entre dos enteros consecutivos (por defecto 1). */
    subdivisions?: number;
    target: number;
    /** Cómo se lee el valor marcado: decimal (por defecto) o fracción. */
    readout?: "decimal" | "fraction";
  };

export type PracticeStep = FillInBlankStep | FractionPickStep | ClassifyStep | NumberLinePickStep;

export type LessonStep = ConceptStep | AnimatedSolutionStep | InteractiveToolStep | PracticeStep;

export type InteractiveLesson = {
  slug: string;
  title: string;
  subtitle: string;
  steps: LessonStep[];
};

export type FeedbackStatus = "correct" | "incorrect";

const PRACTICE_TYPES: ReadonlySet<StepType> = new Set([
  "fill_in_blank",
  "fraction_pick",
  "classify",
  "number_line_pick",
]);

export function isQuizStep(step: LessonStep): step is PracticeStep {
  return PRACTICE_TYPES.has(step.type);
}

export function isPassiveStep(step: LessonStep): boolean {
  return !isQuizStep(step);
}
