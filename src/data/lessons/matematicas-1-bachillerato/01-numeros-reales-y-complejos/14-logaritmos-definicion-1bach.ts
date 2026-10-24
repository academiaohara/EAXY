import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const logaritmosDefinicion1bachLesson: InteractiveLesson = {
  slug: "logaritmos-definicion-1bach",
  title: "14. Logaritmos: definición",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        { label: "Origen de la palabra", message: "Viene del griego *logos* (relación) y *arithmos* (número): la relación entre un número y una base de referencia." },
      ],
      title: "El logaritmo es un exponente",
      blocks: [
        { kind: "definition", text: "El **logaritmo en base $a$** de un número $m > 0$ es el **exponente** al que hay que elevar la base $a$ para obtener $m$. La base es positiva y distinta de $1$." },
        { kind: "rule", title: "Dos formas de decir lo mismo", formula: "\\log_a m = z \\iff a^z = m" },
      ],
      visual: { kind: "anim", scene: "logaritmo-exponente", params: { a: 2, b: 3 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Si el número es una potencia exacta de la base, el logaritmo es entero. Si no, queda entre dos enteros consecutivos." }],
      title: "Prueba con distintas bases",
      blocks: [{ kind: "text", text: "Elige una base y un número. Busca varios para los que el logaritmo salga **exacto** y observa entre qué dos potencias queda el resto." }],
      visual: { kind: "tool", tool: "logaritmo-explorador", initial: [2, 8], hint: "Con base 10 prueba 10, 100 y 1000. Con base 3 prueba 9 y 81." },
    },
    {
      id: "check-calculo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "¿A qué exponente hay que elevar 3 para obtener 81? Prueba $3^2, 3^3, 3^4$." }],
      title: "Un logaritmo exacto",
      question: "Calcula $\\log_3 81$. (solo el número)",
      correctAnswers: ["4"],
      explanation: "$3^4 = 81$, así que $\\log_3 81 = 4$.",
    },
    {
      id: "especiales",
      type: "slide",
      help: [
        { label: "El número e", message: "$e = 2{,}71828\\ldots$ es irracional. Los logaritmos de base $e$ son los más naturales en cálculo y se llaman neperianos, por Neper." },
      ],
      title: "Los dos logaritmos que traen las calculadoras",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\log m = \\log_{10} m", label: "decimal" },
          { tex: "\\ln m = \\log_e m", label: "neperiano (e ≈ 2,718)" },
        ] },
        { kind: "example", lines: [
          { math: "\\log 1000 = 3 \\iff 10^3 = 1000" },
          { math: "\\log 0{,}1 = -1 \\iff 10^{-1} = 0{,}1" },
          { math: "\\ln e = 1 \\iff e^1 = e" },
        ] },
        { kind: "text", text: "Una elefanta de $2\\,700$ kg tiene $\\log 2700 \\approx 3{,}43$: su masa está en el orden de los miles de kilos. En base $2$, $\\log_2 2700 \\approx 11{,}4$: harían falta $12$ bits para guardar su valor entero." },
      ],
      arrange: "stack",
    },
    {
      id: "consecuencias",
      type: "slide",
      help: [
        { label: "Por qué no hay log de negativos", message: "La base es positiva, así que cualquier potencia suya es positiva: nunca puede salir $-4$ ni $0$." },
      ],
      title: "Consecuencias inmediatas",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\log_a 1 = 0", label: "porque a⁰ = 1" },
          { tex: "\\log_a a = 1", label: "porque a¹ = a" },
          { tex: "\\log_a a^n = n", label: "" },
        ] },
        { kind: "warning", title: "Solo los positivos tienen logaritmo", text: "$\\log_2(-4)$ y $\\log_2 0$ **no existen**. En cambio, el logaritmo **sí puede ser** negativo, fraccionario o irracional: $\\log 0{,}01 = -2$, $\\log_3\\sqrt{243} = \\frac{5}{2}$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-existe",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "¿Existe un exponente tal que $2^z = -4$?" }],
      title: "¿Cuál no existe?",
      question: "Uno de estos logaritmos **no existe**. ¿Cuál?",
      choices: [
        { id: "a", label: "$\\log_2(-4)$" },
        { id: "b", label: "$\\log_2 \\tfrac{1}{4}$", incorrectFeedback: "Existe: $2^{-2} = \\frac{1}{4}$, luego vale $-2$. Los logaritmos pueden ser negativos." },
        { id: "c", label: "$\\log_5 5$", incorrectFeedback: "Existe y vale $1$." },
        { id: "d", label: "$\\log 1$", incorrectFeedback: "Existe y vale $0$ en cualquier base." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Ninguna potencia de base positiva es negativa, así que $2^z = -4$ no tiene solución.",
    },
    {
      id: "check-base",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\log_x 25 = 2$ significa $x^2 = 25$, con $x > 0$." }],
      title: "Hallar la base",
      question: "Calcula $x$ en $\\log_x 25 = 2$. (solo el número)",
      correctAnswers: ["5"],
      explanation: "Por definición, $x^2 = 25$. La base es positiva, así que $x = 5$ (no $-5$).",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Escribe cada uno como pregunta: ¿a qué exponente elevo la base para obtener el número?" }],
      title: "¿Cuánto vale?",
      question: "Coloca cada logaritmo según su valor.",
      groups: [
        { id: "cero", label: "Vale 0", tone: "cobalt" },
        { id: "uno", label: "Vale 1", tone: "emerald" },
        { id: "dos", label: "Vale 2", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$\\log_5 1$", group: "cero" },
        { id: "b", text: "$\\log_2 2$", group: "uno" },
        { id: "c", text: "$\\log_5 25$", group: "dos" },
        { id: "d", text: "$\\log_3 1$", group: "cero" },
        { id: "e", text: "$\\log_7 7$", group: "uno" },
        { id: "f", text: "$\\log_3 9$", group: "dos" },
      ],
      hint: "$\\log_a 1 = 0$ y $\\log_a a = 1$ en cualquier base.",
    },
  ],
};
