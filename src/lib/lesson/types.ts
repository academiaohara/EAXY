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
  | "number_line_pick"
  | "divisibility_grid";

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
  /** Árbol de ayuda propio del paso; sustituye a repetir el enunciado y la teoría. */
  help?: HelpBranch[];
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

/**
 * Una explicación del tutor escrita a propósito para el ejercicio: debe decir
 * algo que la diapositiva no dice (otro ángulo, un caso más sencillo, una
 * pregunta guiada). Cada rama puede abrir otras más concretas.
 */
export type HelpBranch = {
  /** Texto del botón con el que el alumno la pide. */
  label: string;
  message: string;
  detail?: string[];
  math?: string[];
  visual?: LessonVisual;
  /** Ramas más concretas que se ofrecen tras esta explicación. */
  branches?: HelpBranch[];
};

type PracticeFields = {
  question: string;
  hint?: string;
  explanation?: string;
};

export type FillInBlankStep = LessonStepBase &
  PracticeFields & {
    type: "fill_in_blank";
    correctAnswers: string[];
    /**
     * `fraction`: la respuesta se escribe en dos casillas (numerador sobre la raya,
     * denominador debajo). Las respuestas válidas siguen escribiéndose como «n/d».
     */
    answerFormat?: "fraction";
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

/**
 * Cuadrícula de divisibilidad: filas = números, columnas = divisores. El alumno toca las
 * casillas que deberían llevar ✓: si acierta aparece ✓ y si falla ✗, con la explicación
 * del criterio. Completa cuando todos los ✓ correctos están puestos.
 */
export type DivisibilityGridStep = LessonStepBase &
  PracticeFields & {
    type: "divisibility_grid";
    numbers: number[];
    divisors: number[];
  };

export type PracticeStep =
  | FillInBlankStep
  | FractionPickStep
  | ClassifyStep
  | NumberLinePickStep
  | DivisibilityGridStep;

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
    /** Muestra un botón de calculadora junto a la pregunta (para problemas con cuentas). */
    calculator?: boolean;
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
  | "expr-reescritura"
  | "divisibilidad-grupos"
  | "divisores-rectangulos"
  | "multiplos-saltos"
  | "criterio-suma-cifras"
  | "criterio-alternada"
  | "criterio-ejemplos"
  | "criba-eratostenes"
  | "descomposicion-primos"
  | "tabla-exponentes"
  | "mcd-cortes"
  | "ascensor-enteros"
  | "recta-enteros"
  | "valor-absoluto"
  | "comparar-enteros"
  | "suma-recta"
  | "fichas-opuestos"
  | "resta-opuesto"
  | "parentesis-signos"
  | "producto-signos"
  | "division-inversa"
  | "decimal-zoom"
  | "tabla-decimal"
  | "comparar-decimales"
  | "redondeo-decimal"
  | "decimal-columna"
  | "decimal-producto"
  | "coma-potencias10"
  | "division-decimal"
  | "division-coma-divisor"
  | "medir-unidad"
  | "meridiano-metro"
  | "cubo-agua"
  | "escalera-unidades"
  | "tabla-unidades"
  | "escala-longitudes"
  | "cuadrados-area"
  | "m2-dm2"
  | "tabla-razon"
  | "reduccion-unidad"
  | "regla-tres-cruz"
  | "regla-tres-producto"
  | "porcentaje-mental"
  | "factor-cambio"
  | "cuadricula-porcentaje"
  | "aumento-barra"
  | "fraccion-partes"
  | "fraccion-recta"
  | "fraccion-operador"
  | "fraccion-equivalente"
  | "fraccion-barras-suma"
  | "fraccion-de-fraccion"
  | "simplificar-factores"
  | "simplificar-irreducible"
  | "fraccion-cabe"
  | "fraccion-combinada"
  | "fraccion-gasto-resto"
  | "balanza-ecuacion"
  | "maquina-funcion"
  | "semejantes-agrupar"
  | "letras-valores"
  | "enunciado-expresion"
  | "campo-perimetro-area"
  | "monomio-partes"
  | "monomio-producto"
  | "monomio-cociente"
  | "ecuacion-identidad"
  | "comprobar-solucion"
  | "pasos-problema"
  | "recta-semirrecta"
  | "posiciones-rectas"
  | "mediatriz-equidistan"
  | "mediatriz-compas"
  | "bisectriz-equidistan"
  | "bisectriz-compas"
  | "angulo-elementos"
  | "angulos-opuestos"
  | "paralelas-secante"
  | "grado-minuto"
  | "angulos-columna"
  | "triangulo-180"
  | "poligono-triangulos"
  | "triangulos-clasificacion"
  | "triangulo-mediana"
  | "triangulo-altura"
  | "cuadrilateros-familia"
  | "trapecio-tipos"
  | "poligono-regular-circunscrito"
  | "poligono-apotema"
  | "circunferencia-elementos"
  | "circunferencia-recta"
  | "circunferencias-posiciones"
  | "revolucion-giro"
  | "poliedro-elementos"
  | "poliedros-regulares"
  | "prisma-elementos"
  | "piramide-elementos"
  | "area-perimetro"
  | "area-rectangulo"
  | "area-paralelogramo"
  | "area-rombo"
  | "area-trapecio"
  | "area-triangulo"
  | "area-triangulo-rectangulo"
  | "area-poligono-triangulos"
  | "area-poligono-regular"
  | "longitud-pi"
  | "area-circulo"
  | "corona-circular"
  | "plano-cartesiano"
  | "cuadrantes-signos"
  | "diagrama-puntos"
  | "grafica-tramos"
  | "grafica-llamadas"
  | "tabla-frecuencias"
  | "media-mediana-moda"
  | "mediana-par"
  | "grafico-barras-histograma"
  | "diagrama-sectores"
  | "exp-determinista-aleatorio"
  | "espacio-muestral"
  | "sucesos-conjuntos"
  | "frecuencias-dado"
  | "grandes-numeros"
  | "laplace-dado"
  | "suceso-union-interseccion"
  | "pitagoras-cuadrados"
  | "semejanza-figuras"
  | "tales-sombras"
  | "desarrollo-ortoedro"
  | "desarrollo-cilindro"
  | "desarrollo-cono"
  | "esfera-cilindro"
  | "cubo-dm3"
  | "arquimedes-volumenes"
  | "funcion-temperatura"
  | "funcion-tramos-extremos"
  | "funcion-es-no-es"
  | "recta-pendiente"
  | "dispersion-puntos"
  | "caja-bigotes"
  | "error-aproximacion"
  | "notacion-cientifica"
  | "progresion-pasos"
  | "suma-gauss"
  | "cuadrado-suma"
  | "suma-por-diferencia"
  | "parabola-raices"
  | "sistema-rectas"
  | "funcion-continuidad"
  | "funcion-tendencia-periodo"
  | "pendiente-dos-puntos"
  | "rectas-encuentro"
  | "conica-lugar"
  | "sector-circular"
  | "husos-horarios"
  | "potencias-factores"
  | "potencias-exp-negativo"
  | "potencia-signo"
  | "potencia-de-potencia"
  | "potencia-de-producto"
  | "potencia-fraccion-inversa"
  | "fraccion-mixta"
  | "racionales-zoom"
  | "decimal-periodico-restos"
  | "generatriz-periodico"
  | "error-relativo-comparar"
  | "notacion-operacion"
  | "aproximacion-raiz"
  | "numero-oro-construccion"
  | "pi-circunferencia"
  | "conjuntos-numericos"
  | "raiz-en-recta"
  | "radical-potencia"
  | "radical-extraer"
  | "radicales-semejantes"
  | "racionalizar"
  | "raiz-cuadrado"
  | "raiz-entre-cuadrados"
  | "sustitucion-sistema"
  | "sistema-test"
  | "progresion-comparar"
  | "recta-tabla-puntos"
  | "recta-constante"
  | "dominio-recorrido"
  | "tabla-formula"
  | "tarifas-escalones"
  | "fracciones-orden"
  | "fraccion-total"
  | "cantidad-inicial"
  | "pitagoras-demostracion"
  | "coordenadas-geograficas"
  | "cuadrado-diferencia"
  | "polinomio-tabla"
  | "factor-comun-area"
  | "red-solucion-solida"
  | "curva-enfriamiento"
  | "solidificacion-etapas"
  | "regla-palanca"
  | "eutectico-enfriamiento"
  | "fec-enfriamiento"
  | "grafito-fundiciones"
  | "vidrio-red"
  | "prensado-sinterizado"
  | "barbotina"
  | "polimerizacion-adicion"
  | "polimerizacion-condensacion"
  | "polimeros-calor"
  | "extrusion-tornillo"
  | "deposito-seguridad"
  | "austenita-martensita"
  | "jominy-ensayo"
  | "ttt-lectura"
  | "ciclos-tratamiento"
  | "cementacion-difusion"
  | "pila-corrosion"
  | "aireacion-diferencial"
  | "proteccion-catodica"
  | "desgaste-asperezas"
  | "cavitacion"
  | "plano-inclinado"
  | "trabajo-area-curva"
  | "resorte-trabajo"
  | "rodadura-carrera"
  | "primer-principio-flujos"
  | "par-trabajo"
  | "piston-trabajo"
  | "presa-turbina"
  /* industrial-anim-end */;

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
  /** `criterio-ejemplos`: divisor cuyo criterio se aplica a los tres números de `nums`. */
  d?: number;
  /** `fraccion-combinada`: segunda fracción del paréntesis (`a/b · (c/d ∓ e/f)`). */
  e?: number;
  f?: number;
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
  /** `divisibilidad-grupos`: objetos que se añaden al total para que el resto deje de ser 0. */
  extra?: number;
  /** `tabla-exponentes`: números que se descomponen en la tabla. */
  nums?: number[];
  /** `tabla-exponentes`: qué se elige de la tabla (m.c.m. o m.c.d.). */
  mode?: "mcm" | "mcd";
  /** `tabla-razon` / `reduccion-unidad`: tipo de proporcionalidad. */
  rel?: "directa" | "inversa";
  /** `regla-tres-cruz` / `regla-tres-producto`: unidad de la magnitud que se pide («g»). */
  unit?: string;
  /** `generatriz-periodico`: cifras del periodo («84»); la parte entera y no periódica va en `dec`. */
  per?: string;
  /** `notacion-operacion`: operación con notación científica. */
  nop?: "mul" | "div" | "sum" | "pow";
  /** `parentesis-signos`: signo que va delante del paréntesis (`nums` son los términos de dentro, con signo). */
  sign?: "+" | "-";
  /** Escenas de decimales: número con coma escrito como texto («2,375»). */
  dec?: string;
  /** Escenas de decimales: operandos con coma («12,85», «3,5»). */
  terms?: string[];
  /** `decimal-columna`: suma o resta en columna. */
  op?: "+" | "-";
  /** Cifras decimales que se calculan o a las que se aproxima el resultado. */
  places?: number;
  /** `coma-potencias10`: multiplicar o dividir por 10, 100 y 1000. */
  dir?: "mul" | "div";
  /** Escenas del sistema métrico: familia de unidades (metro, litro, gramo, metro cuadrado). */
  units?: "m" | "l" | "g" | "m2";
  /** `tabla-unidades`: unidad de la que se parte («km») y a la que se llega («m»). */
  from?: string;
  to?: string;
  /** `tabla-unidades`: cantidad compleja, cada parte con su unidad («3 dam», «8 m», «7 cm»). */
  parts?: string[];
  /** `simplificar-factores`: el producto viene de una división (se da la vuelta a la segunda fracción). */
  inv?: boolean;
  /** `progresion-pasos`: tipo de progresión. */
  prog?: "aritmetica" | "geometrica";
  /** `sistema-rectas`: caso del sistema lineal. */
  sys?: "unica" | "incompatible" | "indeterminado";
  /** `conica-lugar`: curva que se define como lugar geométrico. */
  conica?: "elipse" | "parabola" | "hiperbola";
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
  /** Igualdad o fórmula destacada, sin caja, centrada. */
  | { kind: "formula"; tex: string }
  /** Frases «A relación B» sueltas (sin caja), con los números en ficha de color. */
  | {
      kind: "relations";
      items: { left: string; relation: string; right: string; tone?: SlideTone }[];
    }
  /** Fichas cortas «símbolo = valor» (símbolos, equivalencias, órdenes…). */
  | { kind: "facts"; items: { tex: string; label?: string }[] }
  /** Enunciado con ilustración al lado (la ilustración se omite si el fichero aún no existe). */
  | {
      kind: "story";
      text: string;
      src?: string;
      alt?: string;
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
    }
  /** Herramienta interactiva: el alumno cambia valores y ve el resultado al instante. */
  | {
      kind: "tool";
      tool: SlideToolId;
      /** Valores iniciales (y fracción de partida en `fraccion-equivalentes`). */
      params?: { n?: number; d?: number; k?: number; a?: number; b?: number; c?: number };
      /** `fraction-product`: numerador y denominador de cada fracción, `[a, b, c, d]`. */
      initial?: number[];
      /** Una línea que dice qué probar. */
      hint?: string;
    };

/** Herramientas interactivas disponibles para `{ kind: "tool", tool }`. */
export type SlideToolId =
  | "fraccion-explorador"
  | "fraccion-equivalentes"
  | "fraction-product"
  | "enteros-explorador"
  | "potencia-explorador"
  | "racional-explorador"
  | "gasto-resto-explorador"
  | "decimal-explorador"
  | "generatriz-explorador"
  | "aproximacion-explorador"
  | "notacion-explorador"
  | "raiz-aprox-explorador"
  | "conjuntos-explorador"
  | "raiz-indice-explorador"
  | "radical-exponencial-explorador"
  | "radical-simplificador"
  | "racionalizar-explorador"
  | "valor-numerico"
  | "balanza-explorador"
  | "porcentaje-cuadricula"
  | "rectas-posicion"
  | "punto-mediatriz"
  | "compas-mediatriz"
  | "compas-bisectriz"
  | "bisectriz-explorador"
  | "angulo-explorador"
  | "angulos-suma"
  | "paralelas-explorador"
  | "transportador"
  | "triangulo-explorador"
  | "poligono-explorador"
  | "triangulo-clasificador"
  | "triangulo-centros"
  | "paralelogramo-explorador"
  | "poligono-regular-explorador"
  | "circ-recta-explorador"
  | "circ-circ-explorador"
  | "poliedro-explorador"
  | "rectangulo-explorador"
  | "paralelogramo-area"
  | "trapecio-area"
  | "triangulo-area"
  | "poligono-regular-area"
  | "circulo-explorador"
  | "plano-explorador"
  | "datos-explorador"
  | "sectores-explorador"
  | "dado-simulador"
  | "laplace-explorador"
  | "aleacion-concentracion"
  | "energia-fusion"
  | "gibbs-explorador"
  | "diagrama-binario"
  | "diagrama-eutectico"
  | "fe-c-explorador"
  | "acero-clasificador"
  | "resistencia-especifica"
  | "pieza-peso-minimo"
  | "aleaciones-filtro"
  | "grieta-griffith"
  | "grado-polimerizacion"
  | "rtp-comunidades"
  | "intersticio-red"
  | "dureza-martensita"
  | "ttt-explorador"
  | "jominy-explorador"
  | "temperaturas-tratamiento"
  | "perfil-dureza"
  | "pila-electroquimica"
  | "nernst-explorador"
  | "faraday-explorador"
  | "recubrimiento-rayado"
  | "pilling-bedworth"
  | "conversor-industrial"
  | "plano-inclinado-trabajo"
  | "resorte-explorador"
  | "energia-rampa"
  | "momento-inercia"
  | "equilibrio-termico"
  | "primer-principio-explorador"
  | "rendimiento-cadena"
  | "potencia-vehiculo"
  | "par-trabajo-explorador"
  | "diagrama-pv"
  | "potencia-electrica-hidraulica"
  /* industrial-tool-end */;

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
    visual?: Extract<SlideBlock, { kind: "anim" | "figure" | "tool" }>;
    /**
     * `split` (por defecto con visual): texto | visual. `visual-top`: visual ancho
     * arriba y texto debajo en columnas. `text-top`: los bloques de texto en dos
     * columnas arriba y la visual a todo el ancho debajo (para animaciones anchas).
     * `stack`: todo en una columna.
     */
    arrange?: "split" | "visual-top" | "text-top" | "stack";
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
  "divisibility_grid",
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
