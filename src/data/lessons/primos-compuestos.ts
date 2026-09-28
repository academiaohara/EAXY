import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const primosCompuestosLesson: InteractiveLesson = {
  slug: "primos-compuestos",
  title: "4. Números primos y compuestos",
  subtitle: TEMA_3_SUBTITLE,
  steps: [
    {
      id: "compuestos",
      type: "concept",
      title: "Números compuestos",
      content: [
        "Un **número compuesto** tiene más de dos divisores y se puede escribir como producto de factores más pequeños.",
        "Ejemplo: $18 = 2 \\cdot 9 = 3 \\cdot 6 = 2 \\cdot 3 \\cdot 3$.",
        "Cuantos más divisores, más formas de descomponerlo.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Descomposiciones de 18",
          items: [
            { title: "Dos factores", math: "2 \\cdot 9", tone: "cobalt" },
            { title: "Dos factores", math: "3 \\cdot 6", tone: "violet" },
            { title: "Tres factores", math: "2 \\cdot 3 \\cdot 3", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "primos",
      type: "concept",
      title: "Números primos",
      content: [
        "Un **número primo** solo tiene **dos divisores**: $1$ y él mismo. No se descompone en factores más pequeños (salvo $1$ y el número).",
        "Ejemplo: $13 = 13 \\cdot 1$; sus únicos divisores son $1$ y $13$.",
        "El 1 no se considera primo porque solo tiene un divisor.",
      ],
      warning: "En la criba del temario, los primos menores que 30 son los que no son múltiplos de 2, 3 o 5 (salvo 2, 3 y 5).",
    },
    {
      id: "criba",
      type: "concept",
      title: "Primos menores que 30",
      content: [
        "Marcando múltiplos de $2$, $3$, $5$… en una tabla del $1$ al $30$, los números sin marcar son primos:",
        "$2, 3, 5, 7, 11, 13, 17, 19, 23, 29$.",
        "Comprueba que ninguno se puede factorizar con factores distintos de $1$ y de sí mismo.",
      ],
    },
    {
      id: "descomponer",
      type: "animated_solution",
      title: "Descomponer 72",
      content: ["Factorizamos $72$ en el máximo número de factores posible (primos)."],
      frames: [
        {
          caption: "Primer paso:",
          math: "72 = 8 \\cdot 9 = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 3",
        },
        {
          caption: "Forma abreviada:",
          math: "72 = 2^3 \\cdot 3^2",
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuál de estos números es primo?",
      options: [
        { id: "a", text: "$21$" },
        { id: "b", text: "$29$" },
        { id: "c", text: "$33$" },
      ],
      correctOptionId: "b",
      explanation: "$29$ solo tiene divisores $1$ y $29$. $21 = 3 \\cdot 7$ y $33 = 3 \\cdot 11$ son compuestos.",
    },
  ],
};
