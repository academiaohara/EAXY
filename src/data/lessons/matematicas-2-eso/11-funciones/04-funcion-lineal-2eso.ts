import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const funcionLineal2esoLesson: InteractiveLesson = {
  slug: "funcion-lineal-2eso",
  title: "4. Funciones lineales: y = mx + n",
  subtitle: TEMA_2ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "canoa",
      type: "slide",
      help: [
        {
          label: "Un pago fijo",
          message: "Los $1{,}50$ € de entrada se pagan siempre, aunque no se use la canoa: es el valor de $y$ para $x = 0$.",
        },
        {
          label: "Un pago por hora",
          message: "Cada hora añade $1$ € más: es la pendiente.",
        },
      ],
      title: "Una cuota fija y un precio por hora",
      blocks: [
        {
          kind: "text",
          text: "Alquilar una canoa cuesta $1$ € cada hora, pero antes hay que pagar $1{,}50$ € para entrar en el recinto.",
        },
        {
          kind: "facts",
          items: [
            { tex: "0\\,\\text{h} \\to 1{,}5\\,€" },
            { tex: "1\\,\\text{h} \\to 2{,}5\\,€" },
            { tex: "2\\,\\text{h} \\to 3{,}5\\,€" },
            { tex: "x\\,\\text{h} \\to x + 1{,}5\\,€" },
          ],
        },
        {
          kind: "formula",
          tex: "y = x + 1{,}5",
        },
      ],
      arrange: "stack",
    },
    {
      id: "grafica-canoa",
      type: "interactive_tool",
      help: [
        {
          label: "Corta al eje Y",
          message: "Con $x = 0$, $y = 1{,}5$: la recta corta al eje vertical en $(0, 1{,}5)$.",
        },
      ],
      title: "La recta de la canoa",
      tool: "system-graph",
      content: [
        "La ecuación $y = mx + n$ se representa con una **recta de pendiente $m$** que corta al eje $Y$ en el punto $(0, n)$. $n$ es la **ordenada en el origen**.",
      ],
      graph: {
        lines: [{ id: "c", label: "$y = x + 1{,}5$", form: "standard", a: -1, b: 1, c: 1.5, color: "#2f5fe0" }],
        highlightPoints: [
          { x: 0, y: 1.5, label: "(0; 1,5)" },
          { x: 2, y: 3.5, label: "(2; 3,5)" },
        ],
        xMin: -1,
        xMax: 5,
        yMin: -1,
        yMax: 7,
      },
    },
    {
      id: "pendiente-ordenada",
      type: "slide",
      help: [
        {
          label: "Dos números",
          message: "$m$ dice cuánto sube la recta por cada unidad hacia la derecha; $n$ dice por dónde corta al eje $Y$.",
        },
      ],
      title: "Pendiente y ordenada en el origen",
      blocks: [
        {
          kind: "rule",
          title: "Función lineal",
          text: "$y = mx + n$: $m$ es la **pendiente** y $n$ la **ordenada en el origen**. Si $n = 0$ es una función de proporcionalidad.",
        },
      ],
      visual: { kind: "anim", scene: "recta-pendiente", params: { a: 2, b: 1 }, beatMs: 3600 },
    },
    {
      id: "paralelas",
      type: "interactive_tool",
      help: [
        {
          label: "Misma inclinación",
          message: "Si dos rectas tienen la misma pendiente, suben igual de rápido: nunca se cortan.",
        },
      ],
      title: "Rectas paralelas",
      tool: "system-graph",
      content: [
        "Dos ecuaciones con la **misma pendiente** se representan con **rectas paralelas**: solo cambia dónde cortan al eje $Y$.",
      ],
      graph: {
        lines: [
          { id: "a", label: "$y = 2x + 1$", form: "standard", a: -2, b: 1, c: 1, color: "#2f5fe0" },
          { id: "b", label: "$y = 2x - 3$", form: "standard", a: -2, b: 1, c: -3, color: "#c0392b" },
        ],
        highlightPoints: [
          { x: 0, y: 1, label: "(0, 1)" },
          { x: 0, y: -3, label: "(0, -3)" },
        ],
        xMin: -3,
        xMax: 4,
        yMin: -5,
        yMax: 6,
      },
    },
    {
      id: "check-canoa",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye",
          message: "$y = x + 1{,}5$ con $x = 5$.",
        },
      ],
      title: "Cinco horas",
      question: "¿Cuánto cuesta un paseo en canoa de $5$ horas? (escribe el número con coma)",
      correctAnswers: ["6,5", "6.5"],
      explanation: "$y = 5 + 1{,}5 = 6{,}5$ €.",
    },
    {
      id: "check-ecuacion",
      type: "predict",
      help: [
        {
          label: "Ordenada",
          message: "Pasa por $(0, 3)$: $n = 3$. Al pasar de $x = 0$ a $x = 1$, $y$ sube de $3$ a $5$: $m = 2$.",
        },
      ],
      title: "La ecuación de una recta",
      question: "Una recta pasa por $(0, 3)$ y por $(1, 5)$. ¿Cuál es su ecuación?",
      mode: "choice",
      choices: [
        { id: "2x+3", label: "$y = 2x + 3$" },
        { id: "3x+2", label: "$y = 3x + 2$", incorrectFeedback: "Has intercambiado $m$ y $n$: la ordenada en el origen es $3$ y la pendiente, $2$." },
        { id: "5x", label: "$y = 5x$", incorrectFeedback: "No pasa por el origen: con $x = 0$, $y = 3$." },
        { id: "x+3", label: "$y = x + 3$", incorrectFeedback: "Con $x = 1$ daría $4$, no $5$." },
      ],
      correctChoiceId: "2x+3",
      shuffleChoices: true,
      explanation: "$n = 3$ y $m = \\frac{5 - 3}{1 - 0} = 2$: $y = 2x + 3$.",
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Mira m",
          message: "Con $m > 0$ la función es creciente; con $m < 0$, decreciente.",
        },
      ],
      title: "Crece o decrece",
      question: "Clasifica cada función lineal según su pendiente.",
      groups: [
        { id: "crece", label: "Creciente", tone: "emerald" },
        { id: "decrece", label: "Decreciente", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$y = 3x - 1$", group: "crece" },
        { id: "b", text: "$y = -x + 4$", group: "decrece" },
        { id: "c", text: "$y = 0{,}5x + 2$", group: "crece" },
        { id: "d", text: "$y = -2x - 5$", group: "decrece" },
      ],
      explanation: "Solo importa el signo de la pendiente $m$ (el número que multiplica a $x$).",
    },
  ],
};
