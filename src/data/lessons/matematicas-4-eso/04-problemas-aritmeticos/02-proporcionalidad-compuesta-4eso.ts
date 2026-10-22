import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadCompuesta4esoLesson: InteractiveLesson = {
  slug: "proporcionalidad-compuesta-4eso",
  title: "2. Proporcionalidad compuesta",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [
        {
          label: "La incógnita, al final",
          message: "Se coloca en la **última columna** la magnitud que lleva la incógnita. Después se compara cada una de las demás **solo con ella**, ignorando el resto.",
        },
        {
          label: "Cada magnitud, por separado",
          message: "Para decidir si vacas es directa o inversa con kilos, piensa «si hay más vacas (y el mismo número de días), ¿hay más o menos pienso?». Después haz lo mismo con los días.",
        },
      ],
      title: "Más de dos magnitudes: se comparan de una en una",
      blocks: [
        {
          kind: "definition",
          text: "En la **proporcionalidad compuesta** intervienen **más de dos magnitudes** ligadas por proporcionalidad. Cada una se relaciona con la incógnita de forma **directa o inversa**.",
        },
        {
          kind: "steps",
          title: "Método",
          items: [
            "Ordena las magnitudes, los datos y la incógnita (esta, en la última columna).",
            "Para cada magnitud, decide si es **directa** o **inversa** respecto de la incógnita.",
            "Multiplica el dato conocido por una razón por cada magnitud: tal cual si es directa, **invertida** si es inversa.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "proporcion-compuesta", params: { nums: [15, 7, 294, 10, 30], rels: ["d", "d"], titles: ["vacas", "días", "kilos"] } },
    },
    {
      id: "inversa",
      type: "slide",
      help: [
        {
          label: "Por qué se invierte",
          message: "Si trabajan más horas al día, se necesitan **menos días**: la razón $\\frac{10}{8}$ se escribe al revés, $\\frac{8}{10}$.",
        },
      ],
      title: "Cuando una magnitud es inversa",
      blocks: [
        {
          kind: "text",
          text: "Una cuadrilla, trabajando $8$ horas al día, construye $400$ m² de pared en $15$ días. ¿Cuánto tardaría en construir $600$ m² trabajando $10$ horas diarias?",
        },
        {
          kind: "compare",
          left: { title: "m² → días", text: "Más pared, **más** días: **directa**.", tone: "ok" },
          right: { title: "horas/día → días", text: "Más horas por día, **menos** días: **inversa**.", tone: "warn" },
        },
      ],
      visual: { kind: "anim", scene: "proporcion-compuesta", params: { nums: [400, 8, 15, 600, 10], rels: ["d", "i"], titles: ["m²", "horas/día", "días"] } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Cambia la relación",
          message: "Si cambias una magnitud de directa a inversa, su razón se invierte y el resultado cambia por completo.",
        },
      ],
      title: "Explora: directa o inversa, ¿cambia mucho?",
      blocks: [
        {
          kind: "text",
          text: "Cambia los valores nuevos y el tipo de relación de cada magnitud. Observa cómo se construye la fórmula: **una razón por magnitud**.",
        },
      ],
      visual: { kind: "tool", tool: "compuesta-explorador", params: { a: 15, b: 7, c: 294 }, initial: [10, 30, 0, 0], hint: "Pon la 2.ª magnitud como inversa y compara con el caso directo." },
    },
    {
      id: "check-albañiles",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Las dos son directas",
          message: "Más horas por día, más pared; más días, más pared. $600 \\cdot \\frac{8}{10} \\cdot \\frac{15}{18}$.",
        },
      ],
      title: "Metros construidos",
      question: "Una cuadrilla, trabajando $10$ h al día, construye $600$ m² de pared en $18$ días. ¿Cuántos m² construirá en $15$ días trabajando $8$ h diarias? (solo el número)",
      correctAnswers: ["400"],
      explanation: "$600 \\cdot \\dfrac{8}{10} \\cdot \\dfrac{15}{18} = 400$ m².",
    },
    {
      id: "check-excavadora",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Horas inversa, metros directa",
          message: "Más horas al día, menos días (inversa); menos metros, menos días (directa). $8 \\cdot \\frac{10}{12} \\cdot \\frac{600}{1000}$.",
        },
      ],
      title: "Una zanja",
      question: "Una excavadora, trabajando $10$ h al día, abre $1\\,000$ m de zanja en $8$ días. ¿Cuántos días tarda en abrir $600$ m trabajando $12$ h al día? (solo el número)",
      correctAnswers: ["4"],
      explanation: "$8 \\cdot \\dfrac{10}{12} \\cdot \\dfrac{600}{1\\,000} = 4$ días.",
    },
    {
      id: "check-riego",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "El caudal total",
          message: "El tiempo que dura el aljibe es inversamente proporcional al número de bocas y al caudal de cada una: $8 \\cdot \\frac{3}{4} \\cdot \\frac{1{,}5}{0{,}9}$.",
        },
      ],
      title: "Bocas de riego",
      question: "Con tres bocas de riego de $1{,}5$ l/s cada una, un aljibe se vacía en $8$ h. ¿En cuántas horas se vaciaría con cuatro bocas de $0{,}9$ l/s? (solo el número)",
      correctAnswers: ["10"],
      explanation: "Las dos son inversas: $8 \\cdot \\dfrac{3}{4} \\cdot \\dfrac{1{,}5}{0{,}9} = 10$ h.",
    },
    {
      id: "check-tintoreria",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Beneficio por horas y días",
          message: "Beneficio $\\propto$ horas al día y $\\propto$ días. $1\\,932 \\cdot \\frac{8}{7} \\cdot \\frac{5}{15}$.",
        },
      ],
      title: "Una tintorería",
      question: "Trabajando $7$ h al día, una tintorería obtuvo $1\\,932$ € en $15$ días. ¿Qué beneficio cabe esperar en los próximos $5$ días si se trabaja $8$ h al día? (solo el número)",
      correctAnswers: ["736"],
      explanation: "$1\\,932 \\cdot \\dfrac{8}{7} \\cdot \\dfrac{5}{15} = 736$ €.",
    },
    {
      id: "check-bomba",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Caudal inverso",
          message: "Más caudal, menos tiempo (inversa): $40 \\cdot \\frac{5}{8}$.",
        },
      ],
      title: "Una motobomba",
      question: "Una motobomba de $5$ l/s llena un depósito en $40$ min. ¿Cuántos minutos tarda con otra de $8$ l/s? (solo el número)",
      correctAnswers: ["25"],
      explanation: "Inversa: $40 \\cdot \\frac{5}{8} = 25$ min.",
    },
  ],
};
