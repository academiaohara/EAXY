import type { LessonVisual } from "@/lib/lesson/types";

/**
 * Conceptos que el tutor sabe explicar por separado. Se detectan en el texto de
 * sus mensajes (y en los términos resaltados de la teoría) para que el alumno
 * pueda pedir justo la explicación que le falta.
 */
export type LessonConcept = {
  id: string;
  /** Nombre corto con el que se muestra el concepto. */
  term: string;
  /** Texto del botón con el que el alumno lo pide. */
  question: string;
  /** Formas en que aparece en el texto (sin tildes ni mayúsculas). */
  aliases: string[];
  message: string;
  detail?: string[];
  math?: string[];
  visual?: LessonVisual;
  example?: { message: string; detail?: string[]; math?: string[]; visual?: LessonVisual };
};

const CROSSING_GRAPH = {
  lines: [
    { id: "r1", label: "$x + 2y = 4$", form: "standard" as const, a: 1, b: 2, c: 4, color: "#2f5fe0" },
    { id: "r2", label: "$x + y = 3$", form: "standard" as const, a: 1, b: 1, c: 3, color: "#c0392b" },
  ],
  highlightPoints: [{ x: 2, y: 1, label: "(2, 1)" }],
  xMin: -1,
  xMax: 5,
  yMin: -1,
  yMax: 4,
};

const PARALLEL_GRAPH = {
  lines: [
    { id: "r1", label: "$x + 2y = 4$", form: "standard" as const, a: 1, b: 2, c: 4, color: "#2f5fe0" },
    { id: "r2", label: "$x + 2y = 1$", form: "standard" as const, a: 1, b: 2, c: 1, color: "#c0392b" },
  ],
  xMin: -1,
  xMax: 5,
  yMin: -1,
  yMax: 4,
};

const COINCIDENT_GRAPH = {
  lines: [
    { id: "r1", label: "$x + 2y = 4$", form: "standard" as const, a: 1, b: 2, c: 4, color: "#2f5fe0" },
    { id: "r2", label: "$2x + 4y = 8$", form: "standard" as const, a: 2, b: 4, c: 8, color: "#c0392b" },
  ],
  xMin: -1,
  xMax: 5,
  yMin: -1,
  yMax: 4,
};

export const LESSON_CONCEPTS: LessonConcept[] = [
  {
    id: "ecuacion-lineal",
    term: "Ecuación lineal",
    question: "¿Qué es una ecuación lineal?",
    aliases: ["ecuacion lineal", "ecuaciones lineales", "primer grado"],
    message: "Una ecuación es **lineal** cuando las incógnitas aparecen solas, sin potencias ni multiplicarse entre sí.",
    detail: ["Con dos incógnitas siempre se puede escribir como $ax + by = c$."],
    visual: {
      kind: "equation-anatomy",
      parts: [
        { tex: "a", label: "número", tone: "violet" },
        { tex: "x", label: "incógnita", tone: "cobalt" },
        { tex: "+" },
        { tex: "b", label: "número", tone: "violet" },
        { tex: "y", label: "incógnita", tone: "cobalt" },
        { tex: "=" },
        { tex: "c", label: "término independiente", tone: "emerald" },
      ],
    },
    example: {
      message: "Mira la diferencia:",
      math: ["3x - 2y = 7 \\quad \\checkmark", "x^2 + y = 7 \\quad \\text{(no lineal)}"],
    },
  },
  {
    id: "no-lineal",
    term: "Sistema no lineal",
    question: "¿Qué hace que un sistema no sea lineal?",
    aliases: ["no lineal", "no lineales", "segundo grado", "2.º grado"],
    message: "Basta con que **una** ecuación tenga $x^2$, $y^2$, $x \\cdot y$, raíces o una incógnita en el denominador.",
    detail: ["Se resuelve igual, casi siempre por sustitución, pero al final hay que comprobar cada solución."],
    visual: {
      kind: "cards",
      items: [
        { title: "Lineal", math: "y - x = 1", tone: "emerald" },
        { title: "No lineal", math: "x^2 + y^2 = 5", tone: "amber" },
        { title: "No lineal", math: "x \\cdot y = 6", tone: "amber" },
      ],
    },
  },
  {
    id: "incognita",
    term: "Incógnita",
    question: "¿Qué es una incógnita?",
    aliases: ["incognita", "incognitas"],
    message: "Una **incógnita** es un número que todavía no conocemos y representamos con una letra, como $x$ o $y$.",
    detail: ["Resolver es averiguar qué número se esconde detrás de cada letra."],
    example: {
      message: "Si un bocadillo cuesta $x$ euros, tres bocadillos cuestan $3x$:",
      math: ["3x = 6 \\implies x = 2"],
    },
  },
  {
    id: "infinitas-soluciones",
    term: "Infinitas soluciones",
    question: "¿Por qué hay infinitas soluciones?",
    aliases: ["infinitas soluciones", "infinitos puntos", "indeterminado", "coinciden"],
    message: "Cada punto de la recta es una solución, y una recta tiene **infinitos** puntos.",
    detail: [
      "En un sistema pasa lo mismo cuando las dos rectas son la misma: se «tocan» en todos sus puntos.",
    ],
    visual: {
      kind: "graph-gallery",
      items: [{ caption: "Rectas coincidentes", detail: "$2x + 4y = 8$ es $x + 2y = 4$ multiplicada por 2", graph: COINCIDENT_GRAPH }],
    },
  },
  {
    id: "solucion",
    term: "Solución",
    question: "¿Qué significa que algo sea solución?",
    aliases: ["solucion", "soluciones", "una solucion"],
    message: "Una **solución** es un par de valores $(x, y)$ que, al sustituirlos, hace que la igualdad sea cierta.",
    detail: ["Se comprueba sustituyendo: si los dos lados dan lo mismo, es solución."],
    visual: {
      kind: "solution-check",
      a: 1,
      b: 2,
      c: 4,
      pairs: [
        [2, 1],
        [1, 1],
        [0, 2],
      ],
    },
  },
  {
    id: "recta",
    term: "Recta",
    question: "¿Por qué sale una recta?",
    aliases: ["recta", "misma recta"],
    message: "Si dibujas cada solución $(x, y)$ como un punto del plano, todos quedan **alineados**: forman una recta.",
    detail: ["Por eso basta con calcular dos soluciones y unirlas con la regla."],
    example: {
      message: "Con $x + 2y = 4$:",
      detail: ["Si $x = 0$, entonces $y = 2$. Si $y = 0$, entonces $x = 4$. Une $(0, 2)$ y $(4, 0)$."],
    },
  },
  {
    id: "dos-puntos",
    term: "Dos puntos",
    question: "¿Por qué bastan dos puntos?",
    aliases: ["dos puntos"],
    message: "Por dos puntos pasa **una única** recta. Con dos soluciones ya sabes por dónde va.",
    detail: ["Lo más cómodo es dar $x = 0$ y luego $y = 0$: los cálculos salen solos."],
  },
  {
    id: "horizontal",
    term: "Recta horizontal",
    question: "¿Por qué $y = k$ es horizontal?",
    aliases: ["horizontal", "horizontales"],
    message: "En $y = k$ la $y$ vale siempre lo mismo, sea cual sea $x$: todos los puntos están a la misma altura.",
    visual: {
      kind: "graph-gallery",
      items: [
        {
          caption: "$y = 3$",
          graph: {
            lines: [{ id: "h", label: "$y = 3$", form: "horizontal", y: 3, color: "#2f5fe0" }],
            highlightPoints: [
              { x: -2, y: 3 },
              { x: 0, y: 3 },
              { x: 2, y: 3 },
            ],
            xMin: -3,
            xMax: 3,
            yMin: -1,
            yMax: 4,
          },
        },
      ],
    },
  },
  {
    id: "vertical",
    term: "Recta vertical",
    question: "¿Por qué $x = k$ es vertical?",
    aliases: ["vertical", "verticales"],
    message: "En $x = k$ la $x$ no cambia nunca: todos los puntos están en la misma columna.",
    visual: {
      kind: "graph-gallery",
      items: [
        {
          caption: "$x = 1$",
          graph: {
            lines: [{ id: "v", label: "$x = 1$", form: "vertical", x: 1, color: "#16a085" }],
            highlightPoints: [
              { x: 1, y: -1 },
              { x: 1, y: 1 },
              { x: 1, y: 3 },
            ],
            xMin: -2,
            xMax: 3,
            yMin: -2,
            yMax: 4,
          },
        },
      ],
    },
  },
  {
    id: "compatible-determinado",
    term: "Compatible determinado",
    question: "¿Qué es un sistema compatible determinado?",
    aliases: ["compatible determinado"],
    message: "**Compatible** porque tiene solución; **determinado** porque es una sola. Las rectas se cortan en un punto.",
    visual: {
      kind: "graph-gallery",
      items: [{ caption: "Se cortan en $(2, 1)$", graph: CROSSING_GRAPH }],
    },
  },
  {
    id: "incompatible",
    term: "Sistema incompatible",
    question: "¿Por qué no tiene solución?",
    aliases: ["incompatible", "paralelas", "ninguna solucion", "no se cortan"],
    message: "Las rectas son **paralelas**: van a la par y nunca se encuentran, así que no hay ningún punto común.",
    detail: ["Se nota en las ecuaciones: la parte de las letras es proporcional, pero el número de la derecha no."],
    visual: {
      kind: "graph-gallery",
      items: [{ caption: "Paralelas: nunca se cortan", graph: PARALLEL_GRAPH }],
    },
  },
  {
    id: "punto-de-corte",
    term: "Punto de corte",
    question: "¿Por qué el punto de corte es la solución?",
    aliases: ["punto de corte", "puntos de corte", "se cortan", "cortan", "comunes"],
    message: "El punto de corte está en **las dos rectas a la vez**, así que cumple las dos ecuaciones a la vez.",
    visual: {
      kind: "graph-gallery",
      items: [{ caption: "$(2, 1)$ cumple las dos", graph: CROSSING_GRAPH }],
    },
    example: {
      message: "Comprobemos $(2, 1)$ en las dos ecuaciones:",
      math: ["2 + 2 \\cdot 1 = 4 \\quad \\checkmark", "2 + 1 = 3 \\quad \\checkmark"],
    },
  },
  {
    id: "sistema",
    term: "Sistema de ecuaciones",
    question: "¿Qué es un sistema?",
    aliases: ["sistema", "sistemas", "dos ecuaciones"],
    message: "Un **sistema** son varias ecuaciones que deben cumplirse **a la vez**, con las mismas incógnitas.",
    detail: ["Buscamos los valores que valen para todas, no sólo para una."],
    math: ["\\begin{cases} x + 2y = 4 \\\\ x + y = 3 \\end{cases}"],
  },
  {
    id: "sustitucion",
    term: "Sustitución",
    question: "¿Cómo funciona la sustitución?",
    aliases: ["sustitucion", "sustituir", "sustituimos", "sustituyendo"],
    message: "Despejas una incógnita en una ecuación y **metes** esa expresión en la otra. Así queda una ecuación con una sola letra.",
    visual: {
      kind: "stack",
      rows: ["x = 15 - 2y", "3(\\,15 - 2y\\,) - 5y = 1"],
      operator: "\\Downarrow",
      result: "y = 4",
      caption: "Donde ponía $x$, ahora pone $15 - 2y$.",
    },
  },
  {
    id: "igualacion",
    term: "Igualación",
    question: "¿Cómo funciona la igualación?",
    aliases: ["igualacion", "igualar"],
    message: "Despejas **la misma** incógnita en las dos ecuaciones. Como las dos expresiones valen lo mismo, las igualas.",
    visual: {
      kind: "stack",
      rows: ["x = 15 - 2y", "x = \\dfrac{1 + 5y}{3}"],
      operator: "\\Downarrow",
      result: "15 - 2y = \\dfrac{1 + 5y}{3}",
    },
  },
  {
    id: "reduccion",
    term: "Reducción",
    question: "¿Cómo funciona la reducción?",
    aliases: ["reduccion", "sumar", "sumarlas", "sumamos"],
    message: "Preparas las ecuaciones para que una letra tenga coeficientes opuestos. Al **sumarlas**, esa letra desaparece.",
    visual: {
      kind: "stack",
      rows: ["\\cancel{3x} - 5y = 1", "\\cancel{-3x} - 6y = -45"],
      operator: "+",
      result: "-11y = -44",
      caption: "$3x$ y $-3x$ se anulan.",
    },
  },
  {
    id: "despejar",
    term: "Despejar",
    question: "¿Qué es despejar?",
    aliases: ["despejar", "despejamos", "despeje", "despeja"],
    message: "**Despejar** es dejar una letra sola a un lado del igual, pasando todo lo demás al otro lado.",
    detail: ["Lo que suma pasa restando, y lo que multiplica pasa dividiendo."],
    example: {
      message: "Despejamos $x$ en $x + 2y = 15$:",
      math: ["x + 2y = 15", "x = 15 - 2y"],
    },
  },
  {
    id: "coeficiente",
    term: "Coeficiente",
    question: "¿Qué es un coeficiente?",
    aliases: ["coeficiente", "coeficientes"],
    message: "El **coeficiente** es el número que multiplica a la letra. En $3x$ el coeficiente es $3$; en $x$ es $1$.",
  },
  {
    id: "comprobar",
    term: "Comprobar",
    question: "¿Por qué hay que comprobar?",
    aliases: ["comprobar", "comprueba", "comprobacion", "soluciones falsas", "sistema original"],
    message: "Al elevar al cuadrado o quitar denominadores pueden colarse **soluciones falsas**. Comprobando las descubres.",
    detail: ["Sustituye cada par en **todas** las ecuaciones del sistema original."],
    example: {
      message: "Comprobemos $(1, 2)$ en el sistema no lineal:",
      math: ["2 - 1 = 1 \\quad \\checkmark", "1^2 + 2^2 = 5 \\quad \\checkmark"],
    },
  },
  {
    id: "plantear",
    term: "Plantear el problema",
    question: "¿Cómo paso el enunciado a ecuaciones?",
    aliases: ["enunciado", "lenguaje algebraico", "plantear", "planteamos", "traduciendo"],
    message: "Primero dices qué es cada letra. Después conviertes cada dato del enunciado en una ecuación.",
    visual: {
      kind: "translate",
      rows: [
        { text: "Precio de un bocadillo", math: "x" },
        { text: "Precio de un refresco", math: "y" },
        { text: "4 bocadillos y 5 refrescos cuestan 14 €", math: "4x + 5y = 14" },
      ],
    },
  },
  {
    id: "porcentaje",
    term: "Porcentajes",
    question: "¿Cómo se escribe un porcentaje?",
    aliases: ["porcentaje", "porcentajes", "interes", "intereses"],
    message: "Un $4\\,\\%$ de una cantidad $x$ es $0{,}04x$: divides entre 100 y multiplicas.",
    example: {
      message: "El 5 % de 2000 €:",
      math: ["0{,}05 \\cdot 2000 = 100 \\text{ €}"],
    },
  },
  {
    id: "sistema-aditivo",
    term: "Sistema aditivo",
    question: "¿Qué es un sistema aditivo?",
    aliases: ["aditivo", "aditivos", "sistema aditivo"],
    message: "En un **sistema aditivo** escribes un número **sumando símbolos** (egipcio o romano). No importa tanto la posición como la cantidad de signos.",
    example: {
      message: "En romano, XIV es $10 + (5 - 1)$.",
      math: ["\\text{XIV} = 14"],
    },
  },
  {
    id: "sumar",
    term: "Sumar",
    question: "¿Qué significa sumar?",
    aliases: ["sumar"],
    message: "**Sumar** es juntar, unir o añadir cantidades para obtener un total.",
    example: {
      message: "Tres precios en euros:",
      math: ["583 + 162 + 45 + 38 = 828"],
    },
  },
  {
    id: "restar",
    term: "Restar",
    question: "¿Qué significa restar?",
    aliases: ["restar"],
    message: "**Restar** es quitar una cantidad de otra o hallar la diferencia entre dos números.",
    example: {
      message: "Lo que falta para comprar:",
      math: ["828 - 693 = 135"],
    },
  },
  {
    id: "multiplicar",
    term: "Multiplicar",
    question: "¿Qué significa multiplicar?",
    aliases: ["multiplicar"],
    message: "**Multiplicar** es sumar repetidas veces el mismo número de forma abreviada.",
    example: {
      message: "Cinco entradas de 38 €:",
      math: ["38 \\cdot 5 = 190"],
    },
  },
  {
    id: "sistema-posicional",
    term: "Sistema posicional",
    question: "¿Qué es un sistema posicional?",
    aliases: ["posicional", "posicionales", "sistema posicional", "sistema decimal"],
    message: "En un **sistema posicional** (como el decimal) el **valor de cada cifra depende del lugar** que ocupa: unidades, decenas, centenas…",
    detail: ["Diez unidades de un orden forman una del orden superior."],
    visual: {
      kind: "stack",
      rows: ["3\\cdot 1000", "5\\cdot 100", "3\\cdot 10", "1\\cdot 1"],
      operator: "+",
      result: "3531",
      caption: "La misma cifra $3$ vale distinto en cada columna.",
    },
  },
  {
    id: "redondeo",
    term: "Redondeo",
    question: "¿Cómo se redondea un número?",
    aliases: [
      "redondeo",
      "redondear",
      "aproximacion",
      "aproximar",
      "aproximado",
      "ceros",
      "primera cifra",
      "suma 1",
    ],
    message: "Para redondear a un orden: pon ceros a la derecha de ese orden y, si la primera cifra quitada es $\\geq 5$, suma 1 a la cifra del orden.",
    example: {
      message: "$458$ a las decenas:",
      math: ["458 \\longrightarrow 460"],
    },
  },
  {
    id: "parentesis",
    term: "Paréntesis",
    question: "¿Para qué sirven los paréntesis?",
    aliases: ["parentesis"],
    message: "Los **paréntesis** indican qué parte se calcula **primero**, aunque haya sumas, restas o multiplicaciones alrededor.",
    example: {
      message: "Compara:",
      math: ["9 - 1 + 3 = 11", "9 - (1 + 3) = 5"],
    },
  },
  {
    id: "propiedad-conmutativa",
    term: "Propiedad conmutativa",
    question: "¿Qué dice la propiedad conmutativa?",
    aliases: ["conmutativa", "propiedad conmutativa"],
    message: "La **propiedad conmutativa** permite cambiar el **orden** sin cambiar el resultado: en suma $a + b = b + a$; en producto $a \\cdot b = b \\cdot a$.",
  },
  {
    id: "propiedad-asociativa",
    term: "Propiedad asociativa",
    question: "¿Qué dice la propiedad asociativa?",
    aliases: ["asociativa", "propiedad asociativa"],
    message: "La **propiedad asociativa** dice que puedes **agrupar** distinto sin cambiar el resultado: $(a + b) + c = a + (b + c)$.",
  },
  {
    id: "propiedad-distributiva",
    term: "Propiedad distributiva",
    question: "¿Qué es la propiedad distributiva?",
    aliases: ["distributiva", "propiedad distributiva"],
    message: "La **propiedad distributiva** convierte una multiplicación de una **suma** en suma de productos: $a(b + c) = ab + ac$.",
    visual: {
      kind: "stack",
      rows: ["15 \\cdot (4 + 3)", "15 \\cdot 4 + 15 \\cdot 3"],
      operator: "=",
      result: "105",
    },
  },
  {
    id: "división-exacta",
    term: "División exacta",
    question: "¿Cuándo es exacta una división?",
    aliases: ["division exacta", "exacta", "resto cero", "resto 0"],
    message: "Una **división exacta** deja **resto 0**. Entonces el dividendo es igual al divisor por el cociente: $D = d \\cdot c$.",
    example: {
      message: "$40 : 8 = 5$",
      math: ["40 = 8 \\cdot 5"],
    },
  },
  {
    id: "división-entera",
    term: "División entera",
    question: "¿Qué es una división entera?",
    aliases: ["division entera", "resto", "cociente y resto", "dividir"],
    message: "En una **división entera** el **resto** es distinto de cero (y menor que el divisor). Se cumple $D = d \\cdot c + r$.",
    example: {
      message: "$43 : 8$",
      math: ["43 = 8 \\cdot 5 + 3"],
    },
  },
  {
    id: "orden-operaciones",
    term: "Orden de operaciones",
    question: "¿En qué orden se calcula?",
    aliases: [
      "orden de operaciones",
      "operaciones combinadas",
      "prioridad",
      "multiplicaciones y divisiones",
      "sumas y restas",
    ],
    message: "Primero paréntesis, luego multiplicaciones y divisiones (izquierda a derecha) y al final sumas y restas.",
    example: {
      message: "$6 + 2 \\cdot 4$:",
      math: ["6 + 8 = 14"],
    },
  },
];

/** Minúsculas, sin tildes ni marcas de formato, para comparar texto libre. */
export function normalizeConceptText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[$*\\{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type ConceptMatch = { concept: LessonConcept; start: number; end: number };

function isWordChar(char: string | undefined): boolean {
  return char !== undefined && /[a-z0-9ñ]/.test(char);
}

function matchesIn(text: string): ConceptMatch[] {
  const matches: ConceptMatch[] = [];
  for (const concept of LESSON_CONCEPTS) {
    for (const alias of concept.aliases) {
      let from = text.indexOf(alias);
      while (from !== -1) {
        const end = from + alias.length;
        if (!isWordChar(text[from - 1]) && !isWordChar(text[end])) {
          matches.push({ concept, start: from, end });
        }
        from = text.indexOf(alias, from + 1);
      }
    }
  }
  return matches;
}

/**
 * Conceptos que aparecen en un texto, en orden de aparición. Si dos se solapan
 * gana el más largo: «infinitas soluciones» no cuenta también como «soluciones».
 */
export function findConcepts(text: string): LessonConcept[] {
  const normalized = normalizeConceptText(text);
  const accepted: ConceptMatch[] = [];

  const byLength = matchesIn(normalized).sort(
    (left, right) => right.end - right.start - (left.end - left.start),
  );
  for (const match of byLength) {
    const overlaps = accepted.some((other) => match.start < other.end && other.start < match.end);
    if (!overlaps) {
      accepted.push(match);
    }
  }

  const seen = new Set<string>();
  return accepted
    .sort((left, right) => left.start - right.start)
    .map((match) => match.concept)
    .filter((concept) => {
      if (seen.has(concept.id)) {
        return false;
      }
      seen.add(concept.id);
      return true;
    });
}

/** Concepto al que se refiere un término suelto (p. ej. una palabra resaltada). */
export function findConceptForTerm(term: string): LessonConcept | undefined {
  return findConcepts(term)[0];
}

export function getConcept(id: string): LessonConcept | undefined {
  return LESSON_CONCEPTS.find((concept) => concept.id === id);
}
