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
      visuals: [
        {
          kind: "graph-gallery",
          items: [
            {
              caption: "Se cortan en $(2, 1)$",
              detail: "Ese punto cumple las dos ecuaciones",
              graph: {
                lines: [
                  { id: "r1", label: "$x + 2y = 4$", form: "standard", a: 1, b: 2, c: 4, color: "#2f5fe0" },
                  { id: "r2", label: "$x + y = 3$", form: "standard", a: 1, b: 1, c: 3, color: "#c0392b" },
                ],
                highlightPoints: [{ x: 2, y: 1 }],
                xMin: -1,
                xMax: 5,
                yMin: -1,
                yMax: 4,
              },
            },
          ],
        },
      ],
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
      visuals: [
        {
          kind: "graph-gallery",
          title: "Cómo se ve cada tipo",
          items: [
            {
              caption: "Una solución",
              detail: "Se cortan",
              graph: {
                lines: [
                  { id: "r1", label: "$x + 2y = 4$", form: "standard", a: 1, b: 2, c: 4, color: "#2f5fe0" },
                  { id: "r2", label: "$x + y = 3$", form: "standard", a: 1, b: 1, c: 3, color: "#c0392b" },
                ],
                highlightPoints: [{ x: 2, y: 1 }],
                xMin: -1,
                xMax: 5,
                yMin: -1,
                yMax: 4,
              },
            },
            {
              caption: "Ninguna",
              detail: "Paralelas",
              graph: {
                lines: [
                  { id: "r1", label: "$x + 2y = 4$", form: "standard", a: 1, b: 2, c: 4, color: "#2f5fe0" },
                  { id: "r2", label: "$x + 2y = 1$", form: "standard", a: 1, b: 2, c: 1, color: "#c0392b" },
                ],
                xMin: -1,
                xMax: 5,
                yMin: -1,
                yMax: 4,
              },
            },
            {
              caption: "Infinitas",
              detail: "Coinciden",
              graph: {
                lines: [
                  { id: "r1", label: "$x + 2y = 4$", form: "standard", a: 1, b: 2, c: 4, color: "#2f5fe0" },
                  { id: "r2", label: "$2x + 4y = 8$", form: "standard", a: 2, b: 4, c: 8, color: "#c0392b" },
                ],
                xMin: -1,
                xMax: 5,
                yMin: -1,
                yMax: 4,
              },
            },
          ],
        },
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
      type: "classify",
      title: "Comprueba lo aprendido",
      question:
        "La solución de un sistema son los puntos comunes a las dos rectas. Clasifica cada caso según cuántas soluciones tiene.",
      groups: [
        { id: "una", label: "Una solución", tone: "emerald" },
        { id: "ninguna", label: "Ninguna solución", tone: "rose" },
        { id: "infinitas", label: "Infinitas soluciones", tone: "violet" },
      ],
      items: [
        { id: "corte", text: "Las rectas se cortan en un punto", group: "una" },
        { id: "paralelas", text: "Las rectas son paralelas", group: "ninguna" },
        { id: "coinciden", text: "Las rectas coinciden", group: "infinitas" },
        { id: "s1", text: "$x + 2y = 4$ y $x + y = 3$", group: "una" },
        { id: "s2", text: "$x + 2y = 4$ y $2x + 4y = 2$", group: "ninguna" },
        { id: "s3", text: "$x + 2y = 4$ y $2x + 4y = 8$", group: "infinitas" },
        { id: "s4", text: "$x - y = 0$ y $x + y = 2$", group: "una" },
      ],
      hint: "Imagina las dos rectas: ¿cuántos puntos tienen en común? Si una ecuación es otra multiplicada por un número, son la misma recta.",
      explanation:
        "La solución $(x, y)$ es el punto que pertenece a las dos rectas a la vez: si se cortan hay uno (por ejemplo $(2, 1)$ o $(1, 1)$), si son paralelas ninguno y si coinciden, infinitos.",
    },
  ],
};
