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
      visuals: [
        {
          kind: "equation-anatomy",
          title: "Las piezas de la ecuación",
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
        {
          kind: "solution-check",
          title: "¿Es solución? Pulsa un par",
          a: 1,
          b: 2,
          c: 4,
          pairs: [
            [2, 1],
            [0, 2],
            [1, 1],
            [-2, 3],
          ],
        },
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
      visuals: [
        {
          kind: "graph-gallery",
          items: [
            {
              caption: "Horizontales: $y = k$",
              detail: "$y = 3$ y $y = -2$",
              graph: {
                lines: [
                  { id: "h1", label: "$y = 3$", form: "horizontal", y: 3, color: "#2f5fe0" },
                  { id: "h2", label: "$y = -2$", form: "horizontal", y: -2, color: "#c0392b" },
                ],
                xMin: -3,
                xMax: 3,
                yMin: -3,
                yMax: 4,
              },
            },
            {
              caption: "Verticales: $x = k$",
              detail: "$x = -\\frac{5}{2}$ y $x = \\frac{1}{2}$",
              graph: {
                lines: [
                  { id: "v1", label: "$x = -5/2$", form: "vertical", x: -2.5, color: "#16a085" },
                  { id: "v2", label: "$x = 1/2$", form: "vertical", x: 0.5, color: "#d35400" },
                ],
                xMin: -3,
                xMax: 3,
                yMin: -3,
                yMax: 4,
              },
            },
          ],
        },
      ],
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
