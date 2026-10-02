import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadLaplaceLesson: InteractiveLesson = {
  slug: "probabilidad-laplace",
  title: "5. Probabilidad y regla de Laplace",
  subtitle: TEMA_15_SUBTITLE,
  steps: [
    {
      id: "definicion",
      type: "concept",
      title: "Probabilidad de un suceso",
      content: [
        "La **probabilidad** de un suceso es el número al que tiende su **frecuencia relativa** cuando repetimos el experimento muchas veces.",
        "Observa un dado de cuatro caras: al aumentar los lanzamientos, $h_{\\text{cara }1}$ se acerca a $0{,}25$. Entonces $P(\\text{cara }1) = 0{,}25$.",
        "Toda probabilidad cumple $0 \\leq P(A) \\leq 1$.",
      ],
    },
    {
      id: "laplace",
      type: "concept",
      title: "Regla de Laplace",
      content: [
        "Si todos los sucesos elementales son **equiprobables** (misma «facilidad» de salir), usamos la **regla de Laplace**:",
        "$$P(A) = \\dfrac{\\text{número de casos favorables a } A}{\\text{número de casos posibles}}$$",
        "Casos posibles = cardinal del espacio muestral $|E|$.",
        "Casos favorables = sucesos elementales que cumplen el suceso $A$.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Dado de seis caras",
          rows: ["\\text{Par: } \\{2,4,6\\} \\Rightarrow 3 \\text{ favorables}"],
          operator: "\\Rightarrow",
          result: "P(\\text{par}) = \\dfrac{3}{6} = \\dfrac{1}{2}",
          caption: "$6$ casos posibles en $E$.",
        },
      ],
    },
    {
      id: "ejemplos-dado",
      type: "animated_solution",
      title: "Probabilidades con un dado",
      content: ["$E = \\{1,2,3,4,5,6\\}$. Calculamos probabilidades con Laplace."],
      frames: [
        {
          caption: "Salir número par $\\{2,4,6\\}$:",
          math: "P = \\dfrac{3}{6} = \\dfrac{1}{2}",
        },
        {
          caption: "Par **o** menor que $5$ $\\{1,2,3,4\\}$ (unión):",
          math: "P = \\dfrac{4}{6} = \\dfrac{2}{3}",
        },
        {
          caption: "Par **y** $4$ (intersección, solo $\\{4\\}$):",
          math: "P = \\dfrac{1}{6}",
        },
      ],
    },
    {
      id: "o-y",
      type: "concept",
      title: "«O» frente a «y»",
      content: [
        "**«O»** (o): basta con que se cumpla **una** de las condiciones → cuentas la **unión** de sucesos elementales (sin repetir).",
        "**«Y»** (y): deben cumplirse **las dos** a la vez → cuentas la **intersección**.",
        "En problemas de baraja o urna, lista siempre $E$ antes de contar favorables.",
      ],
    },
    {
      id: "check",
      type: "fraction_pick",
      title: "Comprueba lo aprendido",
      question:
        "Lanzamos un dado equilibrado. Cada ficha es una de sus $6$ caras (casos posibles). Marca los casos favorables a «obtener un número mayor que $4$»: lo marcado será la probabilidad.",
      shape: "set",
      numerator: 2,
      denominator: 6,
      columns: 6,
      itemLabel: "cara",
      labels: ["1", "2", "3", "4", "5", "6"],
      correctPieces: [4, 5],
      hint: "Escribe $E = \\{1, 2, 3, 4, 5, 6\\}$ y señala qué resultados son **mayores** que $4$ (el $4$ no cuenta).",
      explanation: "Favorables: $\\{5, 6\\}$ → $2$ casos de $6$: $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.",
    },
  ],
};
