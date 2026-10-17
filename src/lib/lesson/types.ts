import type { RoundingOrderId } from "@/lib/lesson/naturales-redondeo";

export type StepType =
  | "concept"
  | "animated_solution"
  | "interactive_tool"
  | "narrate"
  | "slide"
  | "predict"
  | "explore"
  | "reveal"
  | "fill_in_blank"
  | "fraction_pick"
  | "classify"
  | "number_line_pick";

export type LessonStageTheme = "paper" | "board";

export type LessonStageConfig = {
  theme: LessonStageTheme;
};

export type StageModuleId =
  | "tienda-ciclista"
  | "bloques-numericos"
  | "piramide-reduccion"
  | "mul-div-naturales"
  | "jerarquia-operaciones"
  | "potencias"
  | "raices-cuadradas";

export type RaicesScene =
  | "inversa-cuadrado"
  | "cuadrados-perfectos"
  | "raiz-entera"
  | "raiz-calculadora";

export type RaicesConfig = {
  scene: RaicesScene;
  /** Lado del cuadrado (raíz) en escenas que lo usan. */
  root?: number;
  radicand?: number;
};

export type PotenciasScene =
  | "base-exponente"
  | "cuadrado-cubo"
  | "calcular-potencia"
  | "calculadora";

export type PotenciasConfig = {
  scene: PotenciasScene;
  base?: number;
  exponent?: number;
};

export type MulDivNaturalesScene =
  | "multiplicar-repetido"
  | "multiplicar-sexta-entrada"
  | "multiplicar-conteo"
  | "multiplicacion-mano"
  | "conmutativa-producto"
  | "asociativa-producto"
  | "asociativa-huevos"
  | "asociativa-truco"
  | "distributiva-bloques"
  | "reparto-igual"
  | "division-mano"
  | "reparto-manual"
  | "exacta-entera"
  | "cociente-resto-feedback"
  | "mul-div-cierre"
  | "puente-mult-div";

export type MulDivConfig = {
  scene: MulDivNaturalesScene;
  /** Factor o tamaño de grupo (p. ej. $8$ entradas). */
  a?: number;
  b?: number;
  c?: number;
  dividend?: number;
  divisor?: number;
  /** Reparto manual: total de fichas y número de cajas. */
  total?: number;
  boxes?: number;
  perBox?: number;
  /** Feedback de práctica cociente/resto: cajas y sobrantes elegidos. */
  quotient?: number;
  remainder?: number;
  feedbackCorrect?: boolean;
  /** `inverse`: muestra cajas fijas y comprueba el total. */
  practiceVariant?: "divide" | "inverse";
  /** En escena distributiva: mostrar desarrollo numérico (p. ej. tras acertar un predict). */
  revealDistributivaFormula?: boolean;
};

export type TiendaCiclistaItem = {
  id: string;
  label: string;
  price: number;
};

export type StageStepFields = {
  /** Definición breve en caja destacada (estilo diapositiva del profesor). */
  definitionBox?: string;
  /** No cuenta para estrellas; se puede saltar sin bloquear la lección. */
  optional?: boolean;
  /** Oculta el globo de speech del tutor en este paso. */
  suppressTutorBubble?: boolean;
};

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
  | "sistemas-historia-galeria"
  | "sistemas-historia-juego"
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

export type NaturalesNumeracionToolStep = LessonStepBase &
  StageStepFields & {
    type: "interactive_tool";
    tool: "naturales-numeracion";
    scene: NaturalesNumeracionScene;
    /** Configuración del ejercicio de redondeo (escena `redondeo-corte`). */
    roundingExercise?: { n: number; orderId: RoundingOrderId };
  };

/** Escenas del tema 2 (1.º ESO): potencias y raíces cuadradas. */
export type PotenciasRaicesScene =
  | "potencia-definicion"
  | "cuadrado-cubo"
  | "calcular-potencia"
  | "calculadora-potencia"
  | "raiz-inversa"
  | "cuadrados-perfectos"
  | "raiz-entera"
  | "calculadora-raiz";

export type PotenciasRaicesToolStep = LessonStepBase &
  StageStepFields & {
    type: "interactive_tool";
    tool: "potencias-raices";
    scene: PotenciasRaicesScene;
  };

export type InteractiveToolStep =
  | SystemGraphToolStep
  | NaturalesNumeracionToolStep
  | PotenciasRaicesToolStep;

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

export type NarrateStep = LessonStepBase &
  StageStepFields & {
    type: "narrate";
    module: StageModuleId;
    scene: string;
    /** Configuración para `tienda-ciclista`. */
    tienda?: {
      items: TiendaCiclistaItem[];
      wallet?: number;
      /** Importe pagado en escena de resta (p. ej. $693$ € en la diapositiva). */
      spendAmount?: number;
      mode: "sumar-cesta" | "restar-cartera" | "calcular-faltante" | "calcular-sobra";
      /** Ahorros disponibles en `calcular-faltante` / `calcular-sobra` (p. ej. $693$ €). */
      savedAmount?: number;
    };
    /** Configuración para `piramide-reduccion`. */
    piramide?: {
      variant: "dual-parentesis";
    };
    mulDiv?: MulDivConfig;
    potencias?: PotenciasConfig;
    raices?: RaicesConfig;
  };

export type PredictChoice = {
  id: string;
  label: string;
  /** Mensaje tras comprobar si el alumno elige esta opción y no es la correcta. */
  incorrectFeedback?: string;
};

export type PredictStep = LessonStepBase &
  StageStepFields &
  PracticeFields & {
    type: "predict";
    mode: "numeric" | "choice";
    correctAnswers?: string[];
    choices?: PredictChoice[];
    correctChoiceId?: string;
    /** Mezcla las opciones con orden estable según el id del paso. */
    shuffleChoices?: boolean;
    /** Opciones en fila con casillas cuadradas (p. ej. raíz entera). Por defecto, lista vertical. */
    choiceLayout?: "stack" | "grid";
    /** La pista solo aparece al pulsar el botón «?». */
    hintHiddenUntilRequested?: boolean;
    /** Tras responder, reproducir escena de refuerzo (p. ej. suma completa). */
    module?: StageModuleId;
    scene?: string;
    tienda?: NarrateStep["tienda"];
    mulDiv?: MulDivConfig;
  };

export type ExploreGoal =
  | {
      kind: "wallet-remainder";
      wallet: number;
      /** Queda estrictamente menos que este valor. */
      maxRemainder: number;
    }
  | {
      kind: "expression-result";
      /** Expresión base con tokens separados por espacios, p. ej. "9 - 1 + 3". */
      tokens: string[];
      target: number;
    }
  | {
      kind: "hierarchy-sequence";
      /** ids de operación en el orden correcto (p. ej. parentesis, div, mul). */
      sequence: string[];
    }
  | {
      kind: "hierarchy-reduce";
      /** Tokens separados (p. ej. "4", "+", "3", "−", "2", "×", "3"). */
      tokens: string[];
    }
  | {
      kind: "boxes-equal";
      total: number;
      boxes: number;
      perBox: number;
    };

export type ExploreStep = LessonStepBase &
  StageStepFields &
  PracticeFields & {
    type: "explore";
    module: StageModuleId;
    scene: string;
    goal: ExploreGoal;
    tienda?: {
      items: TiendaCiclistaItem[];
      wallet: number;
    };
    mulDiv?: MulDivConfig;
    /** La pista solo aparece al pulsar el botón «?». */
    hintHiddenUntilRequested?: boolean;
  };

export type RevealStep = LessonStepBase &
  StageStepFields & {
    type: "reveal";
    module: StageModuleId;
    scene: string;
    blocks?: number[];
    mulDiv?: MulDivConfig;
    equationHighlight?: string;
  };

export type StageStep = NarrateStep | PredictStep | ExploreStep | RevealStep;

/** Identificadores de las animaciones tipo Manim registradas para diapositivas. */
export type SlideAnimId =
  | "egipcio-aditivo"
  | "romano-resta"
  | "decimal-canje"
  | "decimal-posicion"
  | "redondeo-recta"
  | "resta-diferencia"
  | "area-distributiva"
  | "reparto-agrupar"
  | "expr-reescritura";

export type ExprStep = {
  tokens: string[];
  active?: [number, number];
  fresh?: [number, number];
  /** Frase que explica la transición hacia el paso siguiente. */
  note?: string;
};

/** Parámetros opcionales de cada animación (cada escena lee los suyos). */
export type SlideAnimParams = {
  /** Número protagonista (redondeo, egipcio, posición…). */
  n?: number;
  /** Orden de redondeo (potencia de 10 de la cifra que se conserva). */
  power?: number;
  a?: number;
  b?: number;
  c?: number;
  /**
   * `expr-reescritura`: derivación paso a paso. Cada paso es la expresión completa;
   * `active` marca lo que se calcula a continuación y `fresh` lo que acaba de salir.
   */
  expr?: ExprStep[];
  /** `expr-reescritura`: segunda derivación en paralelo (para comparar dos órdenes). */
  expr2?: ExprStep[];
  /** `expr-reescritura`: títulos de las columnas. */
  titles?: string[];
  /** `romano-resta`: numerales que se desglosan. */
  romans?: string[];
};

export type SlideTone = "info" | "key" | "ok" | "warn";

/** Piezas con las que se compone una diapositiva (cada una con su forma propia). */
export type SlideBlock =
  /** Párrafo normal. */
  | { kind: "text"; text: string }
  /** Definición grande, con el término destacado. */
  | { kind: "definition"; text: string }
  /** Regla o fórmula que hay que retener (caja con acento + fórmula display). */
  | { kind: "rule"; title?: string; text?: string; formula?: string }
  /** Ejemplo resuelto: líneas de matemáticas (LaTeX sin delimitadores) con notas. */
  | { kind: "example"; title?: string; lines: { math: string; note?: string }[] }
  /** Aviso («ojo»): error típico o matiz. */
  | { kind: "warning"; text: string; title?: string }
  /** Dos formas de ver lo mismo, lado a lado. */
  | {
      kind: "compare";
      left: { title: string; text?: string; math?: string[]; tone?: SlideTone };
      right: { title: string; text?: string; math?: string[]; tone?: SlideTone };
    }
  /** Pasos numerados. */
  | { kind: "steps"; title?: string; items: string[] }
  /** Fichas cortas «símbolo = valor» (símbolos, equivalencias, órdenes…). */
  | { kind: "facts"; items: { tex: string; label?: string }[] }
  /** Enunciado con ilustración al lado (la ilustración se omite si el fichero aún no existe). */
  | {
      kind: "story";
      text: string;
      src: string;
      alt: string;
      side?: "left" | "right";
      /** Ancho máximo de la ilustración en px (por defecto 150). */
      maxWidth?: number;
    }
  /** Ilustración PNG de `public/lesson/…` (se omite si el fichero aún no existe). */
  | { kind: "figure"; src: string; alt: string; caption?: string; maxWidth?: number }
  /** Animación controlada (play/pausa/paso a paso) dentro de la diapositiva. */
  | {
      kind: "anim";
      scene: SlideAnimId;
      params?: SlideAnimParams;
      /** Sustituye los textos de paso de la escena (uno por paso). */
      captions?: string[];
      /** Milisegundos por paso en reproducción automática. */
      beatMs?: number;
    };

/**
 * Diapositiva declarativa: título + bloques de texto con forma propia + un elemento
 * visual (animación o figura). Es el formato por defecto para teoría nueva.
 */
export type SlideStep = LessonStepBase &
  StageStepFields & {
    type: "slide";
    /** Columna de texto (de arriba abajo). */
    blocks: SlideBlock[];
    /** Elemento visual principal; en pantallas anchas va al lado del texto. */
    visual?: Extract<SlideBlock, { kind: "anim" | "figure" }>;
    /**
     * `split` (por defecto con visual): texto | visual. `visual-top`: visual ancho
     * arriba y texto debajo en columnas. `stack`: todo en una columna.
     */
    arrange?: "split" | "visual-top" | "stack";
  };

export type LessonStep =
  | ConceptStep
  | SlideStep
  | AnimatedSolutionStep
  | InteractiveToolStep
  | StageStep
  | PracticeStep;

export type InteractiveLesson = {
  slug: string;
  title: string;
  subtitle: string;
  steps: LessonStep[];
  /** Contenedor visual de escenario (tema paper/board). */
  stage?: LessonStageConfig;
};

export type FeedbackStatus = "correct" | "incorrect";

const PRACTICE_TYPES: ReadonlySet<StepType> = new Set([
  "fill_in_blank",
  "fraction_pick",
  "classify",
  "number_line_pick",
  "predict",
  "explore",
]);

export function isQuizStep(
  step: LessonStep,
): step is PracticeStep | PredictStep | ExploreStep {
  return PRACTICE_TYPES.has(step.type);
}

export function isPassiveStep(step: LessonStep): boolean {
  return !isQuizStep(step);
}

export function isStageStep(step: LessonStep): step is StageStep {
  return (
    step.type === "narrate" ||
    step.type === "predict" ||
    step.type === "explore" ||
    step.type === "reveal"
  );
}

export function stepHasDefinitionBox(
  step: LessonStep,
): step is LessonStep & Required<Pick<StageStepFields, "definitionBox">> {
  return "definitionBox" in step && Boolean(step.definitionBox);
}
