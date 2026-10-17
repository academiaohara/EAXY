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
    id: "sistema-numeracion",
    term: "Sistema de numeración",
    question: "¿Qué es un sistema de numeración?",
    aliases: ["sistema de numeracion", "sistemas de numeracion", "sistema numeracion"],
    message:
      "Un **sistema de numeración** junta **símbolos** (marcas, letras o cifras) con **reglas** para escribir cantidades.",
    example: {
      message: "Ejemplos que verás en esta lección:",
      math: ["\\text{Egipcio (aditivo)}, \\quad \\text{Romano}, \\quad \\text{Decimal (posicional)}"],
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
    id: "orden-unidades",
    term: "Orden de unidades",
    question: "¿Qué es el orden de unidades?",
    aliases: ["orden de unidades", "ordenes", "unidades decenas centenas"],
    message:
      "Cada cifra ocupa un **orden**: unidades, decenas, centenas, millares… Diez del mismo orden pasan al siguiente.",
    example: {
      message: "En $35318$:",
      math: ["3\\cdot 10\\,000 + 5\\cdot 1\\,000 + 3\\cdot 100 + 1\\cdot 10 + 8"],
    },
  },
  {
    id: "descomponer",
    term: "Descomponer un número",
    question: "¿Qué es descomponer un número?",
    aliases: ["descomponer", "descomposicion"],
    message:
      "**Descomponer** es escribir un número como **suma** de sus órdenes: cada cifra con los ceros que le corresponden.",
    example: {
      message: "Ejemplo:",
      math: ["35\\,318 = 30\\,000 + 5\\,000 + 300 + 10 + 8"],
    },
  },
  {
    id: "cero-posicional",
    term: "Cero posicional",
    question: "¿Para qué sirve el cero en el sistema decimal?",
    aliases: ["cero posicional", "el cero guarda", "cero guarda el sitio"],
    message:
      "El **0** no aporta unidades, pero **guarda el sitio** de un orden vacío. Si lo quitas, las cifras se desplazan y el número cambia.",
    example: {
      message: "$305$ sin el cero ya no son tres centenas:",
      math: ["305 \\neq 35"],
    },
  },
  {
    id: "numero-romano",
    term: "Número romano",
    question: "¿Cómo se lee un número romano?",
    aliases: ["numero romano", "numeros romanos", "romano"],
    message:
      "Se recorre de **izquierda a derecha**. Si una letra vale **menos** que la siguiente, **resta**; si no, **suma**.",
    example: {
      message: "XLIV:",
      math: ["40 + 4 = 44"],
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
    message: "La **división entera** (euclidiana) da **cociente** y **resto** con $0 \\le r < d$. Si $r = 0$ es **exacta**; si $r \\ne 0$ es **con resto**: $D = d \\cdot c + r$.",
    example: {
      message: "$43 : 8$",
      math: ["43 = 8 \\cdot 5 + 3"],
    },
  },
  {
    id: "potencia",
    term: "Potencia",
    question: "¿Qué es una potencia?",
    aliases: ["potencia", "potencias"],
    message: "Una **potencia** abrevia un producto de factores iguales: $a^n = a \\cdot a \\cdots a$ ($n$ veces).",
    visual: {
      kind: "equation-anatomy",
      parts: [
        { tex: "a", label: "base", tone: "cobalt" },
        { tex: "n", label: "exponente", tone: "violet" },
      ],
    },
  },
  {
    id: "base-potencia",
    term: "Base",
    question: "¿Qué es la base de una potencia?",
    aliases: ["base"],
    message: "La **base** es el factor que se repite en una potencia. En $5^3$, la base es $5$.",
  },
  {
    id: "exponente",
    term: "Exponente",
    question: "¿Qué es el exponente?",
    aliases: ["exponente", "exponente 0", "exponente cero"],
    message: "El **exponente** indica cuántas veces se multiplica la base. Además, cualquier número (≠0) elevado a **0** vale $1$.",
    example: {
      message: "Ejemplos:",
      math: ["5^3 = 125", "10^0 = 1"],
    },
  },
  {
    id: "cuadrado",
    term: "Cuadrado",
    question: "¿Qué es el cuadrado de un número?",
    aliases: ["cuadrado", "cuadrados"],
    message: "El **cuadrado** de un número es elevarlo a la $2$: $a^2 = a \\cdot a$.",
    example: { message: "Cuadrado de 5:", math: ["5^2 = 25"] },
  },
  {
    id: "cubo",
    term: "Cubo",
    question: "¿Qué es el cubo de un número?",
    aliases: ["cubo", "cubos"],
    message: "El **cubo** de un número es elevarlo a la $3$: $a^3 = a \\cdot a \\cdot a$.",
    example: { message: "Cubo de 5:", math: ["5^3 = 125"] },
  },
  {
    id: "potencia-base-10",
    term: "Potencias de base 10",
    question: "¿Cómo funcionan las potencias de 10?",
    aliases: ["potencias de base 10", "potencia de base 10", "base 10"],
    message: "En $10^n$ el resultado es la **unidad seguida de $n$ ceros**. El exponente coincide con el número de ceros.",
    example: { message: "Ejemplo:", math: ["10^4 = 10\\,000"] },
  },
  {
    id: "forma-abreviada",
    term: "Forma abreviada",
    question: "¿Qué es la forma abreviada?",
    aliases: ["forma abreviada", "expresa", "expresion abreviada"],
    message: "La **forma abreviada** escribe cantidades grandes como $a \\cdot 10^n$ para leerlas y compararlas más fácil.",
    example: {
      message: "Año luz:",
      math: ["95 \\cdot 10^{11}\\ \\text{km}"],
    },
  },
  {
    id: "raiz-cuadrada",
    term: "Raíz cuadrada",
    question: "¿Qué es la raíz cuadrada?",
    aliases: ["raiz cuadrada", "raiz"],
    message: "La **raíz cuadrada** deshace el cuadrado: si $b^2 = a$, entonces $\\sqrt{a} = b$.",
    example: { message: "Ejemplo:", math: ["4^2 = 16 \\Rightarrow \\sqrt{16} = 4"] },
  },
  {
    id: "radicando",
    term: "Radicando",
    question: "¿Qué es el radicando?",
    aliases: ["radicando"],
    message: "El **radicando** es el número dentro del radical: en $\\sqrt{40}$, el radicando es $40$.",
  },
  {
    id: "cuadrado-perfecto",
    term: "Cuadrados perfectos",
    question: "¿Qué es un cuadrado perfecto?",
    aliases: ["cuadrados perfectos", "cuadrado perfecto", "raiz exacta", "exacta"],
    message: "Un **cuadrado perfecto** es un número que es $n^2$ para algún entero. Entonces la **raíz exacta** es un entero.",
    example: { message: "Ejemplos:", math: ["\\sqrt{36} = 6", "\\sqrt{100} = 10"] },
  },
  {
    id: "raiz-entera",
    term: "Raíz entera",
    question: "¿Qué es la raíz entera?",
    aliases: ["raiz entera"],
    message: "Si no hay raíz exacta, la **raíz entera** es el mayor entero cuyo cuadrado no supera el radicando.",
    example: {
      message: "Con $\\sqrt{40}$:",
      math: ["6^2 = 36 < 40 < 49 = 7^2 \\Rightarrow \\sqrt{40} \\approx 6"],
    },
  },
  {
    id: "numero-negativo",
    term: "Número negativo",
    question: "¿Qué es un número negativo?",
    aliases: ["numero negativo", "negativos", "negativo"],
    message: "Un **número negativo** va con signo $-$ y representa lo contrario del positivo (deuda, bajo cero, sótano…).",
  },
  {
    id: "numero-positivo",
    term: "Número positivo",
    question: "¿Qué es un número positivo?",
    aliases: ["numero positivo", "positivos", "positivo"],
    message: "Un **número positivo** puede escribirse con $+$ o sin signo: $+3 = 3$.",
  },
  {
    id: "enteros-z",
    term: "Números enteros",
    question: "¿Qué es el conjunto Z?",
    aliases: ["numeros enteros", "enteros", "conjunto z"],
    message: "Los **números enteros** $\\mathbb{Z}$ incluyen negativos, $0$ y los naturales.",
    visual: {
      kind: "number-line",
      min: -3,
      max: 3,
      points: [
        { value: -2, tone: "rose" },
        { value: 0, tone: "cobalt" },
        { value: 2, tone: "emerald" },
      ],
    },
  },
  {
    id: "recta-numerica",
    term: "Recta numérica",
    question: "¿Cómo se ordenan en la recta?",
    aliases: ["recta numerica", "recta"],
    message: "En la **recta numérica**, a la izquierda están los menores y a la derecha los mayores.",
    visual: {
      kind: "number-line",
      min: -4,
      max: 4,
      points: [
        { value: -4, label: "menor", tone: "rose" },
        { value: 3, label: "mayor", tone: "emerald" },
      ],
    },
  },
  {
    id: "valor-absoluto",
    term: "Valor absoluto",
    question: "¿Qué es el valor absoluto?",
    aliases: ["valor absoluto"],
    message: "El **valor absoluto** $|a|$ es la distancia de $a$ al cero: quitamos el signo.",
    example: { message: "Ejemplos:", math: ["|-7| = 7", "|+4| = 4"] },
    visual: { kind: "number-line", min: -8, max: 2, absValue: -7 },
  },
  {
    id: "regla-signos",
    term: "Regla de los signos",
    question: "¿Cuál es la regla de los signos?",
    aliases: ["regla de los signos", "signo del resultado", "signo"],
    message: "Al multiplicar o dividir enteros: **signos iguales** → resultado $+$; **signos distintos** → $-$.",
    visual: { kind: "sign-rules", operation: "multiply" },
  },
  {
    id: "relacion-divisibilidad",
    term: "Relación de divisibilidad",
    question: "¿Qué es la relación de divisibilidad?",
    aliases: ["relacion de divisibilidad", "divisible", "divisibilidad"],
    message: "Hay **relación de divisibilidad** cuando un número cabe en otro un número exacto de veces: la división tiene resto $0$.",
    example: {
      message: "Ejemplo:",
      math: ["80 : 20 = 4 \\Rightarrow 80 \\text{ es múltiplo de } 20"],
    },
  },
  {
    id: "multiplo",
    term: "Múltiplo",
    question: "¿Qué es un múltiplo?",
    aliases: ["multiplo", "multiplos", "multiplo de 2", "multiplo de 3", "multiplo de 5", "multiplo de 10"],
    message: "Un **múltiplo** de $b$ es un número que contiene a $b$ una cantidad exacta de veces: $a = b \\cdot k$ con $k$ natural.",
  },
  {
    id: "divisor",
    term: "Divisor",
    question: "¿Qué es un divisor?",
    aliases: ["divisor", "divisores"],
    message: "Un **divisor** de $a$ es un número que divide a $a$ con resto $0$: está contenido en $a$ un número exacto de veces.",
  },
  {
    id: "criterios-divisibilidad",
    term: "Criterios de divisibilidad",
    question: "¿Para qué sirven los criterios de divisibilidad?",
    aliases: ["criterios de divisibilidad"],
    message: "Los **criterios de divisibilidad** son reglas para saber si un número es múltiplo de $2$, $3$, $5$ o $10$ sin hacer la división entera.",
  },
  {
    id: "suma-cifras",
    term: "Suma de cifras",
    question: "¿Cómo se aplica el criterio del 3?",
    aliases: ["suma de sus cifras", "suma de cifras"],
    message: "Para el **3**, suma las cifras del número: si el resultado es múltiplo de $3$, el número original también lo es.",
    example: { message: "$252$:", math: ["2 + 5 + 2 = 9"] },
  },
  {
    id: "numero-compuesto",
    term: "Número compuesto",
    question: "¿Qué es un número compuesto?",
    aliases: ["numero compuesto", "compuesto", "compuestos"],
    message: "Un **número compuesto** tiene más de dos divisores y se puede escribir como producto de factores más pequeños.",
    example: { message: "$18$:", math: ["18 = 2 \\cdot 3 \\cdot 3"] },
  },
  {
    id: "numero-primo",
    term: "Número primo",
    question: "¿Qué es un número primo?",
    aliases: ["numero primo", "primo", "primos", "dos divisores"],
    message: "Un **número primo** solo tiene dos divisores: $1$ y él mismo. No se factoriza en números más pequeños (excepto $1$).",
  },
  {
    id: "mcm",
    term: "Mínimo común múltiplo",
    question: "¿Qué es el m.c.m.?",
    aliases: ["minimo comun multiplo", "m.c.m.", "mcm"],
    message: "El **mínimo común múltiplo** es el menor número que es múltiplo de todos los dados a la vez.",
    example: { message: "Pastillas cada 4 y 6 días:", math: ["\\text{m.c.m.}(4, 6) = 12"] },
  },
  {
    id: "mcd",
    term: "Máximo común divisor",
    question: "¿Qué es el m.c.d.?",
    aliases: ["maximo comun divisor", "m.c.d.", "mcd"],
    message: "El **máximo común divisor** es el mayor número que divide a todos los dados a la vez.",
    example: { message: "8 gatos y 12 perros por jaula:", math: ["\\text{m.c.d.}(8, 12) = 4"] },
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
  {
    id: "parte-de-la-unidad",
    term: "Parte de la unidad",
    question: "¿Qué significa parte de la unidad?",
    aliases: ["parte de la unidad"],
    message:
      "Tomamos un **todo** como unidad, lo dividimos en partes iguales y la fracción indica cuántas de esas partes tomamos.",
    example: { message: "Ejemplo:", math: ["\\frac{2}{9} \\text{ son 2 porciones de 9 iguales}"] },
  },
  {
    id: "fraccion-operador",
    term: "Fracción como operador",
    question: "¿Qué significa que una fracción opere?",
    aliases: ["operador", "opera"],
    message:
      "Como **operador**, la fracción transforma una cantidad: $\\frac{n}{d}$ de $N$ significa repartir $N$ en $d$ partes y tomar $n$.",
    math: ["\\frac{n}{d} \\text{ de } N = (N : d) \\cdot n"],
  },
  {
    id: "division-indicada",
    term: "División indicada",
    question: "¿Qué es una división indicada?",
    aliases: ["division indicada"],
    message: "Escribir $\\frac{a}{b}$ es otra forma de indicar el **cociente** $a : b$.",
    example: { message: "Ejemplo:", math: ["\\frac{2}{5} = 2 : 5 = 0{,}4"] },
  },
  {
    id: "fraccion-menor-que-uno",
    term: "Fracción menor que 1",
    question: "¿Cuándo una fracción es menor que 1?",
    aliases: ["numerador es menor", "menor que 1"],
    message: "Si el **numerador es menor** que el denominador, la fracción es **menor que $1$** (no llega al todo).",
    example: { message: "Ejemplo:", math: ["\\frac{2}{7} < 1"] },
  },
  {
    id: "fraccion-igual-uno",
    term: "Fracción igual a 1",
    question: "¿Cuándo una fracción vale 1?",
    aliases: ["vale 1", "iguales"],
    message: "Si numerador y denominador son **iguales**, la fracción **vale $1$**: has tomado el todo entero.",
    example: { message: "Ejemplo:", math: ["\\frac{6}{6} = 1"] },
  },
  {
    id: "fraccion-mayor-que-uno",
    term: "Fracción mayor que 1",
    question: "¿Cuándo una fracción es mayor que 1?",
    aliases: ["mayor que 1", "mayor"],
    message: "Si el numerador es **mayor** que el denominador, la fracción es **mayor que $1$** (más de un todo).",
    example: { message: "Ejemplo:", math: ["\\frac{8}{5} > 1"] },
  },
  {
    id: "regla-fraccion-de-numero",
    term: "Regla de la fracción de un número",
    question: "¿Cómo calculo una fracción de un número?",
    aliases: ["regla:"],
    message: "**Regla:** divide entre el denominador y multiplica por el numerador.",
    math: ["\\frac{n}{d} \\text{ de } N = (N : d) \\cdot n"],
  },
  {
    id: "cociente",
    term: "Cociente",
    question: "¿Qué es el cociente?",
    aliases: ["cociente", "divide"],
    message: "El **cociente** es el resultado de **dividir** numerador entre denominador (o dividendo entre divisor).",
    example: { message: "Fracción a decimal:", math: ["\\frac{3}{8} = 3 : 8 = 0{,}375"] },
  },
  {
    id: "decimal-no-termina",
    term: "Decimal que no termina",
    question: "¿Qué pasa si la división no termina?",
    aliases: ["no terminan", "no termina"],
    message: "Algunas fracciones producen decimales **infinitos** (periódicos). La fracción sigue siendo la forma exacta.",
    example: { message: "Ejemplo:", math: ["\\frac{1}{3} = 0{,}333\\ldots"] },
  },
  {
    id: "fracciones-equivalentes",
    term: "Fracciones equivalentes",
    question: "¿Qué son fracciones equivalentes?",
    aliases: ["equivalentes"],
    message: "Dos fracciones **equivalentes** tienen distinta escritura pero la **misma porción** de unidad (mismo valor).",
    example: { message: "Ejemplo:", math: ["\\frac{1}{4} = \\frac{3}{12}"] },
  },
  {
    id: "misma-porcion",
    term: "Misma porción",
    question: "¿Qué significa misma porción?",
    aliases: ["misma porcion"],
    message: "Decimos **misma porción** cuando dos fracciones ocupan la misma cantidad del todo, aunque tengan distinto numerador o denominador.",
  },
  {
    id: "propiedad-fundamental-fracciones",
    term: "Propiedad fundamental de las fracciones",
    question: "¿Cómo obtengo fracciones equivalentes?",
    aliases: ["multiplicas o divides", "mismo numero"],
    message:
      "Si **multiplicas o divides** numerador y denominador por el **mismo número** (≠0), el valor de la fracción no cambia.",
    example: { message: "Ejemplo:", math: ["\\frac{3}{4} = \\frac{15}{20}"] },
  },
  {
    id: "simplificar-fraccion",
    term: "Simplificar una fracción",
    question: "¿Qué es simplificar?",
    aliases: ["simplificar"],
    message: "**Simplificar** es dividir numerador y denominador por un divisor común hasta dejar la fracción lo más reducida posible.",
    example: { message: "Ejemplo:", math: ["\\frac{12}{30} = \\frac{2}{5}"] },
  },
  {
    id: "fraccion-irreducible",
    term: "Fracción irreducible",
    question: "¿Qué es una fracción irreducible?",
    aliases: ["irreducible"],
    message: "Una fracción **irreducible** no se puede simplificar más: numerador y denominador no comparten divisores aparte de $1$.",
    example: { message: "Ejemplo:", math: ["\\frac{2}{5} \\text{ es irreducible}"] },
  },
  {
    id: "calcular-la-fraccion",
    term: "Calcular la fracción",
    question: "¿Cómo calculo qué fracción representa una parte?",
    aliases: ["calcular la fraccion:"],
    message:
      "Conoces **parte** y **total**: escribe $\\frac{\\text{parte}}{\\text{total}}$ y **simplifica** si puedes.",
    example: { message: "Ejemplo:", math: ["\\frac{540}{1800} = \\frac{3}{10}"] },
  },
  {
    id: "fraccion-de-un-numero",
    term: "Fracción de un número",
    question: "¿Cómo hallo una fracción de un número?",
    aliases: ["fraccion de un numero (directo):"],
    message: "Conoces el **total** y la fracción: aplica $(\\text{total} : d) \\cdot n$.",
    example: { message: "Ejemplo:", math: ["\\frac{3}{10} \\text{ de } 1800 = 540"] },
  },
  {
    id: "problema-inverso-fraccion",
    term: "Problema inverso con fracciones",
    question: "¿Qué es un problema inverso?",
    aliases: ["problema inverso:"],
    message:
      "Conoces la **parte** y la fracción que representa: despeja el total. Si la parte es $\\frac{n}{d}$ del total, total $= \\text{parte} : n \\cdot d$.",
    example: { message: "Queda $\\frac{2}{5}$ y son $14\\,€$:", math: ["\\text{total} = 14 : 2 \\cdot 5 = 35\\,€"] },
  },
  {
    id: "decimas-partes",
    term: "Décimas partes",
    question: "¿Qué son las décimas partes?",
    aliases: ["tres decimas partes"],
    message: "**Tres décimas partes** del total es la fracción $\\frac{3}{10}$: repartes en diez partes iguales y tomas tres.",
  },
  {
    id: "cifras-decimales",
    term: "Cifras decimales",
    question: "¿Qué son las cifras decimales?",
    aliases: ["cifras decimales"],
    message: "Las **cifras decimales** van a la derecha de la coma y representan décimas, centésimas, milésimas…",
  },
  {
    id: "parte-entera-decimal",
    term: "Parte entera",
    question: "¿Qué es la parte entera?",
    aliases: ["parte entera"],
    message: "La **parte entera** de un decimal son las cifras a la izquierda de la coma (unidades, decenas…).",
  },
  {
    id: "parte-decimal",
    term: "Parte decimal",
    question: "¿Qué es la parte decimal?",
    aliases: ["parte decimal"],
    message: "La **parte decimal** son las cifras a la derecha de la coma; su nombre depende del último orden usado.",
  },
  {
    id: "diezmilesimas",
    term: "Diezmilésimas",
    question: "¿Qué son las diezmilésimas?",
    aliases: ["diezmilesimas"],
    message: "Las **diezmilésimas** son la cuarta cifra decimal: $0{,}0001$ es una diezmilésima de unidad.",
  },
  {
    id: "comparar-decimales",
    term: "Comparar decimales",
    question: "¿Cómo comparo decimales?",
    aliases: ["comparar"],
    message: "Para **comparar** decimales: mira la parte entera; si coincide, iguala cifras con ceros a la derecha y compara.",
  },
  {
    id: "decimal-intermedio",
    term: "Decimal intermedio",
    question: "¿Hay decimales entre dos dados?",
    aliases: ["siempre"],
    message: "Entre dos decimales distintos **siempre** hay otro: basta usar más cifras decimales.",
  },
  {
    id: "operacion-en-columna",
    term: "Operación en columna",
    question: "¿Por qué en columna?",
    aliases: ["en columna"],
    message: "Colocar sumas y restas **en columna** con la coma alineada evita mezclar unidades con décimas.",
  },
  {
    id: "cifras-decimales-producto",
    term: "Cifras decimales en el producto",
    question: "¿Dónde va la coma al multiplicar?",
    aliases: ["todas"],
    message: "En una multiplicación, la coma del resultado cuenta **todas** las cifras decimales de los factores.",
  },
  {
    id: "coma-derecha",
    term: "Mover la coma a la derecha",
    question: "¿Qué pasa al multiplicar por 10?",
    aliases: ["derecha"],
    message: "Multiplicar por $10$, $100$… desplaza la coma a la **derecha** uno, dos, tres… lugares.",
  },
  {
    id: "centesimas-dinero",
    term: "Centésimas en dinero",
    question: "¿Por qué centésimas en euros?",
    aliases: ["centesimas"],
    message: "Un euro tiene $100$ céntimos: en dinero suele redondearse a **centésimas** (dos cifras decimales).",
  },
  {
    id: "pon-la-coma-cociente",
    term: "Coma en el cociente",
    question: "¿Cuándo pongo la coma al dividir?",
    aliases: ["pon la coma"],
    message: "Al bajar la primera cifra decimal del dividendo, **pon la coma** en el cociente.",
  },
  {
    id: "coma-izquierda",
    term: "Mover la coma a la izquierda",
    question: "¿Qué pasa al dividir por 10?",
    aliases: ["izquierda"],
    message: "Dividir entre $10$, $100$… mueve la coma a la **izquierda** tantos lugares como ceros tenga el divisor.",
  },
  {
    id: "smd-magnitudes",
    term: "Magnitudes",
    question: "¿Qué es una magnitud?",
    aliases: ["magnitudes"],
    message: "Las **magnitudes** son propiedades medibles: longitud, peso, capacidad, superficie, temperatura…",
  },
  {
    id: "smd-medir",
    term: "Medir",
    question: "¿Qué significa medir?",
    aliases: ["medir"],
    message: "**Medir** es comparar una cantidad con otra fija llamada unidad de medida.",
  },
  {
    id: "unidad-de-medida",
    term: "Unidad de medida",
    question: "¿Qué es una unidad de medida?",
    aliases: ["unidad de medida"],
    message: "La **unidad de medida** es la referencia fija con la que expresamos cuánto mide algo.",
  },
  {
    id: "unidad-convencional",
    term: "Unidad convencional",
    question: "¿Qué es convencional?",
    aliases: ["convencional"],
    message: "Una unidad **convencional** es la que acordamos usar todos (metro, litro, gramo en el S.M.D.).",
  },
  {
    id: "smd-1792",
    term: "Origen del S.M.D. (1792)",
    question: "¿Qué pasó en 1792?",
    aliases: ["1792"],
    message: "El Sistema Métrico Decimal se propuso en **1792** en Francia para unificar medidas.",
  },
  {
    id: "unidad-metro",
    term: "Metro",
    question: "¿Qué mide el metro?",
    aliases: ["metro"],
    message: "El **metro** es la unidad base de **longitud** en el S.M.D.",
  },
  {
    id: "unidad-litro",
    term: "Litro",
    question: "¿Qué mide el litro?",
    aliases: ["litro", "capacidad"],
    message: "El **litro** mide **capacidad** (volumen): equivale a $1\\,\\mathrm{dm}^3$.",
  },
  {
    id: "unidad-gramo",
    term: "Gramo",
    question: "¿Qué mide el gramo?",
    aliases: ["gramo", "peso"],
    message: "El **gramo** es la unidad base de **peso** (masa) en el temario del S.M.D.",
  },
  {
    id: "smd-submultiplos",
    term: "Submúltiplos",
    question: "¿Qué son los submúltiplos?",
    aliases: ["submultiplos"],
    message: "Los **submúltiplos** (deci, centi, mili…) son unidades más pequeñas que la unidad base.",
  },
  {
    id: "smd-factor-diez",
    term: "Diez unidades por orden",
    question: "¿Por qué diez?",
    aliases: ["diez"],
    message: "En longitud, capacidad y peso del S.M.D., **diez** unidades de un orden forman la del orden superior.",
  },
  {
    id: "smd-una-unidad-superior",
    term: "Una unidad del orden superior",
    question: "¿Qué significa «una» aquí?",
    aliases: ["una"],
    message: "Diez unidades pequeñas equivalen a **una** unidad del orden inmediatamente superior.",
  },
  {
    id: "kilogramo",
    term: "Kilogramo",
    question: "¿Qué es el kilogramo?",
    aliases: ["kilogramo"],
    message: "El **kilogramo** vale $1000\\,\\mathrm{g}$ y es la unidad habitual en la vida diaria.",
  },
  {
    id: "quintal",
    term: "Quintal",
    question: "¿Qué es un quintal?",
    aliases: ["quintal"],
    message: "Un **quintal** son $100\\,\\mathrm{kg}$.",
  },
  {
    id: "tonelada",
    term: "Tonelada",
    question: "¿Qué es una tonelada?",
    aliases: ["tonelada"],
    message: "Una **tonelada** son $1000\\,\\mathrm{kg}$.",
  },
  {
    id: "superficie-magnitud",
    term: "Superficie",
    question: "¿Qué es medir una superficie?",
    aliases: ["superficie"],
    message: "Medir **superficie** es contar cuántos cuadrados de unidad ($\\mathrm{m}^2$) caben en una región.",
  },
  {
    id: "smd-superficie-100",
    term: "Factor 100 en superficie",
    question: "¿Por qué 100 en m²?",
    aliases: ["100"],
    message: "En **superficie**, cada salto de unidad multiplica o divide por **100** (no por 10).",
  },
  {
    id: "unidades-agrarias",
    term: "Unidades agrarias",
    question: "¿Qué son las unidades agrarias?",
    aliases: ["unidades agrarias"],
    message: "**Unidades agrarias**: hectárea ($\\mathrm{ha}$), área ($\\mathrm{a}$) y centiárea ($\\mathrm{ca}$) para campos y fincas.",
  },
  {
    id: "coma-dos-lugares-superficie",
    term: "Coma en cambios de m²",
    question: "¿Cuánto se mueve la coma en m²?",
    aliases: ["cada salto desplaza la coma dos lugares"],
    message: "En la tabla de $\\mathrm{m}^2$, **cada salto desplaza la coma dos lugares** (factor $100$).",
  },
  {
    id: "mueve-la-coma",
    term: "Mueve la coma",
    question: "¿Cómo cambio de unidad?",
    aliases: ["mueve la coma"],
    message: "**Mueve la coma** tantos lugares como saltos haya en la tabla hasta la unidad pedida.",
  },
  {
    id: "forma-compleja",
    term: "Forma compleja",
    question: "¿Qué es la forma compleja?",
    aliases: ["compleja"],
    message: "Forma **compleja**: mezclas varias unidades ($2\\,\\mathrm{m}\\ 5\\,\\mathrm{dm}$).",
  },
  {
    id: "forma-incompleja",
    term: "Forma incompleja",
    question: "¿Qué es la forma incompleja?",
    aliases: ["incompleja"],
    message: "Forma **incompleja**: una sola unidad ($2{,}5\\,\\mathrm{m}$ o $250\\,\\mathrm{cm}$).",
  },
  {
    id: "micra",
    term: "Micra",
    question: "¿Qué es una micra?",
    aliases: ["micra"],
    message: "Una **micra** ($\\mu\\mathrm{m}$) es $0{,}001\\,\\mathrm{mm}$: medidas muy pequeñas.",
  },
  {
    id: "nanometro",
    term: "Nanómetro",
    question: "¿Qué es un nanómetro?",
    aliases: ["nanometro"],
    message: "El **nanómetro** es aún más pequeño que la micra; se usa en escalas microscópicas.",
  },
  {
    id: "angstrom",
    term: "Ángstrom",
    question: "¿Qué es el ángstrom?",
    aliases: ["angstrom"],
    message: "El **ángstrom** mide distancias atómicas (mucho menor que el nanómetro).",
  },
  {
    id: "unidad-astronomica",
    term: "Unidad astronómica",
    question: "¿Qué es una UA?",
    aliases: ["unidad astronomica"],
    message: "La **unidad astronómica** (UA) mide distancias dentro del Sistema Solar (Tierra–Sol).",
  },
  {
    id: "ano-luz",
    term: "Año luz",
    question: "¿Qué es un año luz?",
    aliases: ["ano luz"],
    message: "Un **año luz** es la distancia que recorre la luz en un año; sirve para galaxias y estrellas lejanas.",
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
