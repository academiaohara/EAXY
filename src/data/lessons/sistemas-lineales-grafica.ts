import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const sistemasLinealesGraficaLesson: InteractiveLesson = {
  slug: "sistemas-lineales-grafica",
  title: "2. Sistemas de ecuaciones lineales",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "¿Qué es un sistema de ecuaciones?",
      content: [
        "Varias ecuaciones forman un **sistema** cuando buscamos las soluciones **comunes** a todas ellas.",
        "Cada ecuación lineal con dos incógnitas se representa con una recta. La solución del sistema es el **punto de corte** de esas rectas.",
      ],
      math: ["\\begin{cases} x + 2y = 4 \\\\ x + y = 3 \\end{cases}"],
    },
    {
      id: "grafica-sistema",
      type: "interactive_tool",
      title: "Solución gráfica",
      tool: "system-graph",
      content: [
        "Representa las dos rectas en los mismos ejes. El punto donde se cortan es la solución del sistema.",
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
      type: "concept",
      title: "Tipos de sistemas lineales",
      content: [
        "**Compatible determinado**: las rectas se cortan en un punto → **una solución**.",
        "**Incompatible**: las rectas son paralelas → **ninguna solución**.",
        "**Indeterminado**: las rectas coinciden → **infinitas soluciones**.",
      ],
    },
    {
      id: "paralelas",
      type: "interactive_tool",
      title: "Sistema incompatible (rectas paralelas)",
      tool: "system-graph",
      content: [
        "Observa el sistema $x + 2y = 4$ y $2x + 4y = 2$. Las rectas son paralelas y no se cortan.",
      ],
      graph: {
        lines: [
          { id: "r1", label: "$x + 2y = 4$", form: "standard", a: 1, b: 2, c: 4, color: "#2f5fe0" },
          { id: "r2", label: "$2x + 4y = 2$", form: "standard", a: 2, b: 4, c: 2, color: "#c0392b" },
        ],
        xMin: -2,
        xMax: 5,
        yMin: -1,
        yMax: 4,
      },
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "Gráficamente, ¿qué representa la solución de un sistema de dos ecuaciones lineales con dos incógnitas?",
      options: [
        { id: "a", text: "El área entre las dos rectas" },
        { id: "b", text: "El punto de corte de las rectas" },
        { id: "c", text: "La pendiente de una de las rectas" },
      ],
      correctOptionId: "b",
      explanation: "La solución $(x, y)$ es el punto que pertenece a las dos rectas a la vez.",
    },
  ],
};
