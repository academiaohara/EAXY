import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesLinealesDosIncognitasLesson: InteractiveLesson = {
  slug: "ecuaciones-lineales-dos-incognitas",
  title: "1. Ecuaciones lineales con dos incógnitas",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "¿Qué es una ecuación lineal con dos incógnitas?",
      content: [
        "Una ecuación lineal con dos incógnitas se puede escribir como $ax + by = c$, donde $a$, $b$ y $c$ son números reales.",
        "Una **solución** es un par de valores $(x, y)$ que hace cierta la igualdad. Por ejemplo, en $x + 2y = 4$, el par $(2, 1)$ es solución porque $2 + 2 \\cdot 1 = 4$.",
        "Esta ecuación tiene **infinitas soluciones**: $(0, 2)$, $(4, 0)$, $(-2, 3)$…",
      ],
    },
    {
      id: "grafica-recta",
      type: "interactive_tool",
      title: "Representación gráfica",
      tool: "system-graph",
      content: [
        "Si interpretamos las soluciones como puntos del plano, todas caen sobre la **misma recta**.",
        "Para dibujarla basta con conocer **dos puntos**. Activa o desactiva la recta y observa su trazado.",
      ],
      graph: {
        lines: [
          {
            id: "main",
            label: "$x + 2y = 4$",
            form: "standard",
            a: 1,
            b: 2,
            c: 4,
            color: "#2f5fe0",
          },
        ],
        highlightPoints: [
          { x: 2, y: 1, label: "(2, 1)" },
          { x: 0, y: 2, label: "(0, 2)" },
          { x: 4, y: 0, label: "(4, 0)" },
        ],
        xMin: -3,
        xMax: 5,
        yMin: -1,
        yMax: 5,
      },
    },
    {
      id: "rectas-especiales",
      type: "concept",
      title: "Rectas horizontales y verticales",
      content: [
        "Las ecuaciones $y = k$ se representan con rectas **horizontales**.",
        "Las ecuaciones $x = k$ se representan con rectas **verticales**.",
      ],
      math: ["y = 3", "y = -2", "x = -\\frac{5}{2}", "x = \\frac{1}{2}"],
    },
    {
      id: "grafica-especiales",
      type: "interactive_tool",
      title: "Explora rectas especiales",
      tool: "system-graph",
      content: [
        "Pulsa cada ecuación para mostrar u ocultar su recta en el plano.",
      ],
      graph: {
        lines: [
          { id: "h1", label: "$y = 3$", form: "horizontal", y: 3, color: "#2f5fe0" },
          { id: "h2", label: "$y = -2$", form: "horizontal", y: -2, color: "#c0392b" },
          { id: "v1", label: "$x = -2$", form: "vertical", x: -2, color: "#16a085" },
          { id: "v2", label: "$x = 1$", form: "vertical", x: 1, color: "#d35400" },
        ],
        xMin: -4,
        xMax: 4,
        yMin: -4,
        yMax: 4,
      },
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuántas soluciones tiene, en general, una ecuación lineal con dos incógnitas?",
      options: [
        { id: "a", text: "Ninguna" },
        { id: "b", text: "Exactamente una" },
        { id: "c", text: "Infinitas" },
      ],
      correctOptionId: "c",
      explanation: "Una recta contiene infinitos puntos, y cada punto $(x, y)$ de la recta es una solución.",
    },
  ],
};
