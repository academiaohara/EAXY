import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesSegundoGrado3esoLesson: InteractiveLesson = {
  slug: "ecuaciones-segundo-grado-3eso",
  title: "4. Ecuaciones de segundo grado",
  subtitle: TEMA_3ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "Identifica a, b y c",
          message: "Primero deja la ecuación en la forma $ax^2 + bx + c = 0$ y lee los tres coeficientes con su signo.",
        },
        {
          label: "El doble signo",
          message: "El $\\pm$ da dos resultados: uno con $+$ y otro con $-$.",
        },
      ],
      title: "La fórmula general",
      blocks: [
        {
          kind: "definition",
          text: "Una ecuación de **segundo grado** tiene la forma $ax^2 + bx + c = 0$ con $a \\ne 0$.",
        },
        {
          kind: "rule",
          title: "Fórmula general",
          formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        },
        {
          kind: "example",
          title: "3x² − 5x − 2 = 0 (a = 3, b = −5, c = −2)",
          lines: [
            { math: "x = \\dfrac{5 \\pm \\sqrt{25 + 24}}{6} = \\dfrac{5 \\pm 7}{6}" },
            { math: "x_1 = \\dfrac{12}{6} = 2,\\qquad x_2 = \\dfrac{-2}{6} = -\\dfrac{1}{3}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "discriminante",
      type: "slide",
      help: [
        {
          label: "Mira solo el signo",
          message: "No hace falta resolver para saber cuántas soluciones hay: basta calcular $\\Delta = b^2 - 4ac$.",
        },
        {
          label: "Con la gráfica",
          message: "Las soluciones son los puntos donde la parábola $y = ax^2 + bx + c$ corta al eje $X$.",
        },
      ],
      title: "El discriminante decide cuántas soluciones hay",
      blocks: [
        {
          kind: "definition",
          text: "El **discriminante** es $\\Delta = b^2 - 4ac$. Su signo indica cuántas soluciones tiene la ecuación.",
        },
        {
          kind: "relations",
          items: [
            { left: "$\\Delta > 0$", relation: "→", right: "dos soluciones distintas", tone: "ok" },
            { left: "$\\Delta = 0$", relation: "→", right: "una solución doble", tone: "info" },
            { left: "$\\Delta < 0$", relation: "→", right: "ninguna solución real", tone: "warn" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "parabola-raices", params: { a: 1, b: -2, c: -3 } },
    },
    {
      id: "casos",
      type: "slide",
      help: [
        {
          label: "Raíz de cero",
          message: "Si $\\Delta = 0$, la raíz vale $0$ y $\\pm 0$ da el mismo resultado: $x = \\frac{-b}{2a}$.",
        },
        {
          label: "Raíz de negativo",
          message: "No existe la raíz cuadrada de un número negativo en los números reales.",
        },
      ],
      title: "Un solo valor y ninguno",
      blocks: [
        {
          kind: "example",
          title: "Solución doble: x² − 6x + 9 = 0",
          lines: [
            { math: "\\Delta = 36 - 36 = 0" },
            { math: "x = \\dfrac{6}{2} = 3" },
          ],
        },
        {
          kind: "example",
          title: "Sin solución: x² + x + 3 = 0",
          lines: [
            { math: "\\Delta = 1 - 12 = -11 < 0" },
            { math: "\\sqrt{-11} \\text{ no existe: no hay solución real}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "parabola-raices", params: { a: 1, b: 1, c: 3 } },
    },
    {
      id: "check-discriminante",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Sustituye",
          message: "$a = 1$, $b = -4$, $c = -5$: $b^2 = 16$ y $-4ac = 20$.",
        },
      ],
      title: "Calcula el discriminante",
      question: "Calcula el discriminante de $x^2 - 4x - 5 = 0$ (solo el número).",
      correctAnswers: ["36"],
      explanation: "$\\Delta = (-4)^2 - 4 \\cdot 1 \\cdot (-5) = 16 + 20 = 36$.",
    },
    {
      id: "check-soluciones",
      type: "fill_in_blank",
      help: [
        {
          label: "Aplica la fórmula",
          message: "$x = \\frac{4 \\pm 6}{2}$. Calcula el valor con $+$ y el valor con $-$.",
        },
      ],
      title: "Las dos soluciones",
      question: "Resuelve $x^2 - 4x - 5 = 0$. Escribe las dos soluciones separadas por coma, de menor a mayor (por ejemplo -2,3).",
      correctAnswers: ["-1,5", "-1, 5", "-1;5", "-1 y 5"],
      explanation: "$x = \\frac{4 \\pm \\sqrt{36}}{2} = \\frac{4 \\pm 6}{2}$: $x_1 = -1$ y $x_2 = 5$.",
    },
    {
      id: "check-numero",
      type: "predict",
      help: [
        {
          label: "Discriminante",
          message: "Calcula $b^2 - 4ac$ para cada ecuación: $9x^2 - 6x + 1$ da $36 - 36$.",
        },
      ],
      title: "¿Cuántas soluciones?",
      question: "¿Cuántas soluciones reales tiene $9x^2 - 6x + 1 = 0$?",
      mode: "choice",
      choices: [
        { id: "una", label: "Una (solución doble)" },
        { id: "dos", label: "Dos soluciones distintas", incorrectFeedback: "$\\Delta = 36 - 36 = 0$: las dos soluciones coinciden." },
        { id: "ninguna", label: "Ninguna", incorrectFeedback: "$\\Delta = 0$ no es negativo: sí hay solución." },
      ],
      correctChoiceId: "una",
      shuffleChoices: true,
      explanation: "$\\Delta = (-6)^2 - 4 \\cdot 9 \\cdot 1 = 0$, así que hay una solución doble: $x = \\frac{6}{18} = \\frac{1}{3}$.",
    },
  ],
};
