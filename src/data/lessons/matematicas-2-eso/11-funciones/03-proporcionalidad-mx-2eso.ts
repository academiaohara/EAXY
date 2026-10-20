import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadMx2esoLesson: InteractiveLesson = {
  slug: "proporcionalidad-mx-2eso",
  title: "3. Funciones de proporcionalidad: y = mx",
  subtitle: TEMA_2ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tabla",
      type: "slide",
      help: [
        {
          label: "Misma razón",
          message: "El cociente $\\frac{y}{x}$ es siempre el mismo: es la constante de proporcionalidad $m$.",
        },
        {
          label: "Una ecuación",
          message: "Si el patinete cuesta $0{,}5$ € la hora, $x$ horas cuestan $y = 0{,}5x$.",
        },
      ],
      title: "Una función de proporcionalidad",
      blocks: [
        {
          kind: "text",
          text: "En un parque se alquilan patines a $0{,}50$ € la hora. El coste es directamente proporcional al tiempo.",
        },
        {
          kind: "definition",
          text: "Una **función de proporcionalidad** relaciona dos valores directamente proporcionales. Su ecuación es $y = mx$.",
        },
        {
          kind: "example",
          lines: [{ math: "\\text{coste} = 0{,}5 \\cdot \\text{tiempo} \\ \\Rightarrow\\  y = 0{,}5x" }],
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-razon",
        params: { rel: "directa", a: 1, b: 0.5, nums: [1, 2, 3, 4], titles: ["Tiempo (h)", "Coste (€)"] },
      },
    },
    {
      id: "grafica-mx",
      type: "interactive_tool",
      help: [
        {
          label: "Siempre por el origen",
          message: "Con $x = 0$ resulta $y = 0$: la recta pasa siempre por $(0, 0)$.",
        },
        {
          label: "Más inclinada",
          message: "Cuanto mayor es $m$, más sube la recta: la bicicleta ($m = 2$) es más inclinada que los patines ($m = 0{,}5$).",
        },
      ],
      title: "Patines, monopatines y bicicletas",
      tool: "system-graph",
      content: [
        "Se representa con una **recta que pasa por el origen** $(0, 0)$. Patines: $y = 0{,}5x$; monopatines: $y = x$; bicicletas: $y = 2x$.",
        "La constante $m$ se llama **pendiente** y mide la inclinación.",
      ],
      graph: {
        lines: [
          { id: "p", label: "$y = 0{,}5x$", form: "standard", a: -0.5, b: 1, c: 0, color: "#2f5fe0" },
          { id: "m", label: "$y = x$", form: "standard", a: -1, b: 1, c: 0, color: "#c0392b" },
          { id: "b", label: "$y = 2x$", form: "standard", a: -2, b: 1, c: 0, color: "#2e9e5b" },
        ],
        highlightPoints: [{ x: 0, y: 0, label: "(0, 0)" }],
        xMin: -1,
        xMax: 5,
        yMin: -1,
        yMax: 8,
      },
    },
    {
      id: "pendiente",
      type: "slide",
      help: [
        {
          label: "Signo",
          message: "Con $m > 0$ la función es creciente; con $m < 0$, decreciente.",
        },
        {
          label: "Cómo se calcula $m$",
          message: "Divide cualquier $y$ entre su $x$ (distinto de $0$): por ejemplo, de $(2, 4)$ sale $m = 2$.",
        },
      ],
      title: "La pendiente",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "$m > 0$",
            text: "La recta **sube** de izquierda a derecha: función **creciente**.",
            math: ["y = 2x"],
            tone: "ok",
          },
          right: {
            title: "$m < 0$",
            text: "La recta **baja**: función **decreciente**.",
            math: ["y = -2x"],
            tone: "warn",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-coste",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye",
          message: "$y = 2x$ con $x = 5$.",
        },
      ],
      title: "Coste de una bicicleta",
      question: "Una bicicleta se alquila a $2$ €/h: $y = 2x$. ¿Cuánto cuesta alquilarla $5$ horas? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$y = 2 \\cdot 5 = 10$ €.",
    },
    {
      id: "check-ecuacion",
      type: "predict",
      help: [
        {
          label: "Razón y/x",
          message: "Divide $y$ entre $x$ en cada pareja: $\\frac{3}{1} = \\frac{6}{2} = \\frac{9}{3}$.",
        },
      ],
      title: "La ecuación de una tabla",
      question: "La tabla de valores es $(x, y)$: $(1, 3)$, $(2, 6)$, $(3, 9)$. ¿Cuál es la ecuación?",
      mode: "choice",
      choices: [
        { id: "3x", label: "$y = 3x$" },
        { id: "x+2", label: "$y = x + 2$", incorrectFeedback: "$y = x + 2$ da $3, 4, 5$, no $3, 6, 9$." },
        { id: "x/3", label: "$y = \\dfrac{x}{3}$", incorrectFeedback: "Has dividido al revés: $y$ es el triple de $x$." },
        { id: "6x", label: "$y = 6x$", incorrectFeedback: "Con $x = 1$ daría $6$, no $3$." },
      ],
      correctChoiceId: "3x",
      shuffleChoices: true,
      explanation: "$\\frac{y}{x} = 3$ en todas las parejas: $y = 3x$.",
    },
    {
      id: "check-pendiente",
      type: "predict",
      help: [
        {
          label: "Signo de m",
          message: "Una función decreciente tiene pendiente negativa.",
        },
      ],
      title: "Crece o decrece",
      question: "¿Cuál de estas funciones de proporcionalidad es decreciente?",
      mode: "choice",
      choices: [
        { id: "-3x", label: "$y = -3x$" },
        { id: "3x", label: "$y = 3x$", incorrectFeedback: "Con $m = 3 > 0$ es creciente." },
        { id: "x/2", label: "$y = \\dfrac{x}{2}$", incorrectFeedback: "Con $m = \\frac{1}{2} > 0$ es creciente." },
        { id: "0.1x", label: "$y = 0{,}1x$", incorrectFeedback: "Con $m = 0{,}1 > 0$ es creciente (aunque poco)." },
      ],
      correctChoiceId: "-3x",
      shuffleChoices: true,
      explanation: "Solo $m = -3$ es negativa: la recta baja.",
    },
  ],
};
