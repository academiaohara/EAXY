import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const sistemasEcuaciones2esoLesson: InteractiveLesson = {
  slug: "sistemas-ecuaciones-2eso",
  title: "2. Sistemas de ecuaciones",
  subtitle: TEMA_2ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "sistema",
      type: "slide",
      help: [
        {
          label: "Dos condiciones a la vez",
          message: "La primera ecuación no basta para saber las edades; la segunda añade otra condición. La solución debe cumplir las dos.",
        },
        {
          label: "La llave",
          message: "La llave $\\{$ indica que las dos ecuaciones se cumplen a la vez.",
        },
      ],
      title: "Qué es un sistema",
      blocks: [
        {
          kind: "text",
          text: "Las edades de Alba ($x$) y Mario ($y$) suman $50$ años. Además, Alba tiene $10$ años más que Mario.",
        },
        {
          kind: "formula",
          tex: "\\begin{cases} x + y = 50 \\\\ x - y = 10 \\end{cases}",
        },
        {
          kind: "definition",
          text: "Dos ecuaciones lineales forman un **sistema de ecuaciones**. Su **solución** es la pareja $(x, y)$ que cumple **las dos** a la vez.",
        },
        {
          kind: "example",
          lines: [
            { math: "(30, 20): \\ 30 + 20 = 50 \\ \\checkmark \\qquad 30 - 20 = 10 \\ \\checkmark" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "grafica-sistema",
      type: "interactive_tool",
      help: [
        {
          label: "Dónde se cortan",
          message: "Cada ecuación es una recta. Un punto que cumple las dos está en las dos rectas: en su cruce.",
        },
        {
          label: "Comprueba",
          message: "Sustituye el punto de corte en las dos ecuaciones: deben cumplirse ambas.",
        },
      ],
      title: "Solución gráfica",
      tool: "system-graph",
      content: [
        "Representa las dos rectas en los mismos ejes. El **punto de corte** es la solución del sistema.",
      ],
      graph: {
        lines: [
          { id: "r1", label: "$x + 2y = 4$", form: "standard", a: 1, b: 2, c: 4, color: "#2f5fe0" },
          { id: "r2", label: "$x + y = 3$", form: "standard", a: 1, b: 1, c: 3, color: "#c0392b" },
        ],
        highlightPoints: [{ x: 2, y: 1, label: "(2, 1)" }],
        xMin: -2,
        xMax: 5,
        yMin: -1,
        yMax: 4,
      },
    },
    {
      id: "tipos",
      type: "slide",
      help: [
        {
          label: "Tres posiciones de dos rectas",
          message: "Dos rectas en el plano pueden cortarse en un punto, ser paralelas (no se cortan) o coincidir (se superponen).",
        },
        {
          label: "Cómo reconocerlos",
          message: "Si una ecuación es la otra multiplicada por un número, son la misma recta. Si solo coinciden los coeficientes de $x$ e $y$ pero no el término independiente, son paralelas.",
        },
      ],
      title: "Tipos de sistemas",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Compatible determinado",
            text: "Las rectas **se cortan**: **una** solución.",
            math: ["\\begin{cases} x + y = 3 \\\\ x - y = 1 \\end{cases}"],
            tone: "ok",
          },
          right: {
            title: "Incompatible",
            text: "Las rectas son **paralelas**: **ninguna** solución.",
            math: ["\\begin{cases} x + y = 3 \\\\ x + y = 5 \\end{cases}"],
            tone: "warn",
          },
        },
        {
          kind: "compare",
          left: {
            title: "Compatible indeterminado",
            text: "Las ecuaciones son **equivalentes**: las rectas coinciden y hay **infinitas** soluciones.",
            math: ["\\begin{cases} x + y = 3 \\\\ 2x + 2y = 6 \\end{cases}"],
            tone: "info",
          },
          right: {
            title: "Cómo verlo sin dibujar",
            text: "Compara coeficientes: ¿es una ecuación la otra multiplicada por un número?",
            tone: "key",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "grafica-paralelas",
      type: "interactive_tool",
      help: [
        {
          label: "No se cortan",
          message: "Rectas paralelas tienen la misma inclinación y nunca coinciden en ningún punto.",
        },
      ],
      title: "Un sistema sin solución",
      tool: "system-graph",
      content: [
        "$x + y = 3$ y $x + y = 5$ tienen la misma inclinación pero pasan por sitios distintos: **no se cortan**, el sistema es incompatible.",
      ],
      graph: {
        lines: [
          { id: "r1", label: "$x + y = 3$", form: "standard", a: 1, b: 1, c: 3, color: "#2f5fe0" },
          { id: "r2", label: "$x + y = 5$", form: "standard", a: 1, b: 1, c: 5, color: "#c0392b" },
        ],
        xMin: -2,
        xMax: 6,
        yMin: -2,
        yMax: 6,
      },
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Multiplica una ecuación",
          message: "Si al multiplicar la primera ecuación por un número obtienes la segunda, son la misma recta.",
        },
        {
          label: "Mismo lado izquierdo",
          message: "Si los coeficientes de $x$ e $y$ coinciden pero el segundo miembro es distinto, las rectas son paralelas.",
        },
      ],
      title: "¿Cuántas soluciones?",
      question: "Clasifica cada sistema según su número de soluciones.",
      groups: [
        { id: "una", label: "Una solución", tone: "emerald" },
        { id: "ninguna", label: "Ninguna solución", tone: "rose" },
        { id: "infinitas", label: "Infinitas soluciones", tone: "violet" },
      ],
      items: [
        { id: "s1", text: "$x + 2y = 4$ y $x + y = 3$", group: "una" },
        { id: "s2", text: "$x + 2y = 4$ y $2x + 4y = 2$", group: "ninguna" },
        { id: "s3", text: "$x + 2y = 4$ y $2x + 4y = 8$", group: "infinitas" },
        { id: "s4", text: "$x - y = 0$ y $x + y = 2$", group: "una" },
      ],
      explanation: "$2x + 4y = 8$ es la primera ecuación multiplicada por $2$ (misma recta). $2x + 4y = 2$ tiene los mismos coeficientes pero otro segundo miembro (paralelas).",
    },
    {
      id: "check-par",
      type: "predict",
      help: [
        {
          label: "Las dos ecuaciones",
          message: "Una pareja es solución del sistema solo si cumple **las dos** ecuaciones.",
        },
      ],
      title: "¿Es solución del sistema?",
      question: "¿Cuál es la solución del sistema $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$(3, 2)$" },
        { id: "b", label: "$(2, 3)$", incorrectFeedback: "Cumple $x + y = 5$ pero $2 - 3 = -1 \\ne 1$." },
        { id: "c", label: "$(4, 1)$", incorrectFeedback: "Cumple $x + y = 5$, pero $4 - 1 = 3 \\ne 1$." },
        { id: "d", label: "$(5, 0)$", incorrectFeedback: "Cumple $x + y = 5$, pero $5 - 0 = 5 \\ne 1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3 + 2 = 5$ y $3 - 2 = 1$: cumple las dos ecuaciones.",
    },
  ],
};
