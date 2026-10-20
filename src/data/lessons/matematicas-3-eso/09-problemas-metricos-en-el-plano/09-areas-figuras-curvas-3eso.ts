import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const areasFigurasCurvas3esoLesson: InteractiveLesson = {
  slug: "areas-figuras-curvas-3eso",
  title: "9. Áreas de figuras curvas",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "sector",
      type: "slide",
      help: [
        {
          label: "Fracción del círculo",
          message: "Un sector de $90^\\circ$ es una cuarta parte del círculo; uno de $180^\\circ$, la mitad.",
        },
        {
          label: "Grados",
          message: "En la fórmula el ángulo va en grados, y se divide entre $360$ porque la circunferencia completa son $360^\\circ$.",
        },
      ],
      title: "Sector circular",
      blocks: [
        {
          kind: "rule",
          text: "Un sector circular de amplitud $a$ grados es la fracción $\\frac{a}{360}$ del círculo:",
          formula: "A = \\pi r^2 \\cdot \\dfrac{a}{360}",
        },
      ],
      visual: { kind: "anim", scene: "sector-circular", params: { a: 120, b: 6 } },
    },
    {
      id: "corona",
      type: "slide",
      help: [
        {
          label: "Resta",
          message: "La corona es el círculo grande al que se le quita el círculo pequeño interior.",
        },
        {
          label: "Factor común",
          message: "$\\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)$: no es $\\pi (R - r)^2$.",
        },
      ],
      title: "Corona circular",
      blocks: [
        {
          kind: "rule",
          text: "La corona circular entre dos circunferencias concéntricas de radios $R > r$:",
          formula: "A = \\pi R^2 - \\pi r^2 = \\pi(R^2 - r^2)",
        },
        {
          kind: "warning",
          text: "$\\pi(R^2 - r^2)$ **no** es $\\pi(R - r)^2$: primero se elevan al cuadrado y después se resta.",
        },
      ],
      visual: { kind: "anim", scene: "corona-circular" },
    },
    {
      id: "elipse",
      type: "slide",
      help: [
        {
          label: "Se estira el círculo",
          message: "Si estiras un círculo de radio $r$ hasta convertirlo en elipse de semiejes $a$ y $b$, el área se multiplica por la misma razón que el rectángulo.",
        },
        {
          label: "Caso circular",
          message: "Si $a = b = r$, la elipse es un círculo y $\\pi ab = \\pi r^2$.",
        },
      ],
      title: "Elipse y segmento de parábola",
      blocks: [
        {
          kind: "compare",
          left: { title: "Elipse", text: "Con semiejes $a$ y $b$ ocupa $\\frac{\\pi}{4}$ del rectángulo $2a \\times 2b$ que la contiene.", math: ["A = \\pi ab"], tone: "ok" },
          right: { title: "Segmento de parábola", text: "Es $\\frac{2}{3}$ del rectángulo que lo contiene.", math: ["A = \\dfrac{2}{3}ab"], tone: "info" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-sector",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Fracción",
          message: "$90^\\circ$ es $\\frac{90}{360} = \\frac{1}{4}$ del círculo.",
        },
      ],
      title: "Área de un sector",
      question: "Calcula el área de un sector circular de $90^\\circ$ y radio $10$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm²)",
      correctAnswers: ["78,5", "78.5"],
      explanation: "$A = 3{,}14 \\cdot 100 \\cdot \\frac{90}{360} = 78{,}5$ cm².",
    },
    {
      id: "check-corona",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Cuadrados",
          message: "$R^2 = 100$ y $r^2 = 36$. Resta y multiplica por $\\pi$.",
        },
      ],
      title: "Área de una corona",
      question: "Una corona circular tiene radio exterior $10$ cm e interior $6$ cm. ¿Cuál es su área, con $\\pi \\approx 3{,}14$? (solo el número, en cm²)",
      correctAnswers: ["200,96", "200.96"],
      explanation: "$A = 3{,}14 \\cdot (100 - 36) = 3{,}14 \\cdot 64 = 200{,}96$ cm².",
    },
    {
      id: "check-elipse",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Semiejes",
          message: "$A = \\pi ab$ con $a = 5$ y $b = 3$.",
        },
      ],
      title: "Área de una elipse",
      question: "Una elipse tiene semiejes de $5$ cm y $3$ cm. ¿Cuál es su área, con $\\pi \\approx 3{,}14$? (solo el número, en cm²)",
      correctAnswers: ["47,1", "47.1"],
      explanation: "$A = 3{,}14 \\cdot 5 \\cdot 3 = 47{,}1$ cm².",
    },
  ],
};
