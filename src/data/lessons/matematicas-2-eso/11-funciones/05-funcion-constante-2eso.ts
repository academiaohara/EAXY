import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const funcionConstante2esoLesson: InteractiveLesson = {
  slug: "funcion-constante-2eso",
  title: "5. Funciones constantes: y = k",
  subtitle: TEMA_2ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pista",
      type: "slide",
      help: [
        {
          label: "No depende de x",
          message: "Entras, pagas y puedes estar el tiempo que quieras: el precio es el mismo para $1$, $2$ o $4$ horas.",
        },
        {
          label: "Un valor por categoría",
          message: "Cada categoría de entrada tiene su propia función constante: $3$, $5$ o $10$.",
        },
      ],
      title: "Una entrada para estar el tiempo que quieras",
      blocks: [
        {
          kind: "text",
          text: "El acceso a unas pistas de patinaje vale $3$ € para niños, $5$ € para jóvenes y $10$ € para adultos. Una vez dentro, se puede estar todo el tiempo que se quiera.",
        },
        {
          kind: "facts",
          items: [
            { tex: "x = 0, 1, 2, 3 \\to y = 5" },
            { tex: "y = 5", label: "jóvenes" },
          ],
        },
        {
          kind: "definition",
          text: "En una **función constante**, $y = k$, el valor de $y$ **no depende de $x$**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "grafica-k",
      type: "interactive_tool",
      help: [
        {
          label: "Paralela al eje X",
          message: "La altura es siempre $k$: la recta es horizontal, a distancia $k$ del eje $X$.",
        },
      ],
      title: "Rectas horizontales",
      tool: "system-graph",
      content: [
        "La función $y = k$ se representa con una **recta paralela al eje $X$**, a una distancia $k$ de este.",
      ],
      graph: {
        lines: [
          { id: "n", label: "$y = 3$ (niños)", form: "horizontal", y: 3, color: "#2e9e5b" },
          { id: "j", label: "$y = 5$ (jóvenes)", form: "horizontal", y: 5, color: "#2f5fe0" },
          { id: "a", label: "$y = 10$ (adultos)", form: "horizontal", y: 10, color: "#c0392b" },
        ],
        xMin: -1,
        xMax: 6,
        yMin: -1,
        yMax: 11,
      },
    },
    {
      id: "check-coste",
      type: "fill_in_blank",
      help: [
        {
          label: "No depende del tiempo",
          message: "En una función constante, $y$ vale siempre lo mismo, sea cual sea $x$.",
        },
      ],
      title: "Cuatro horas en la pista",
      question: "Un joven entra a las pistas, donde la entrada es $y = 5$ €, y está $4$ horas. ¿Cuánto paga en total? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$y = 5$ para cualquier $x$: paga $5$ € las $4$ horas, igual que si estuviera una.",
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Mira si aparece x",
          message: "Si $x$ no aparece en la ecuación (solo hay un número), es constante.",
        },
      ],
      title: "Tipo de función",
      question: "Clasifica cada ecuación.",
      groups: [
        { id: "constante", label: "Constante: y = k", tone: "amber" },
        { id: "proporcionalidad", label: "Proporcionalidad: y = mx", tone: "cobalt" },
        { id: "lineal", label: "Lineal: y = mx + n", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$y = 7$", group: "constante" },
        { id: "b", text: "$y = 4x$", group: "proporcionalidad" },
        { id: "c", text: "$y = 4x + 1$", group: "lineal" },
        { id: "d", text: "$y = -2$", group: "constante" },
        { id: "e", text: "$y = -0{,}5x$", group: "proporcionalidad" },
      ],
      explanation: "Sin $x$: constante. Con $x$ y sin término independiente: proporcionalidad. Con $x$ y un término independiente: lineal.",
    },
    {
      id: "check-recta",
      type: "predict",
      help: [
        {
          label: "Horizontal",
          message: "Una recta horizontal tiene siempre la misma altura.",
        },
      ],
      title: "¿Cuál es horizontal?",
      question: "¿Qué ecuación se representa con una recta paralela al eje $X$?",
      mode: "choice",
      choices: [
        { id: "y4", label: "$y = 4$" },
        { id: "x4", label: "$x = 4$", incorrectFeedback: "$x = 4$ es una recta vertical (y ni siquiera es una función)." },
        { id: "yx", label: "$y = x$", incorrectFeedback: "Es la recta que pasa por el origen con pendiente $1$." },
        { id: "y2x", label: "$y = 2x + 4$", incorrectFeedback: "Tiene pendiente $2$: es una recta inclinada." },
      ],
      correctChoiceId: "y4",
      shuffleChoices: true,
      explanation: "$y = 4$ es una función constante: recta horizontal a distancia $4$ del eje $X$.",
    },
  ],
};
