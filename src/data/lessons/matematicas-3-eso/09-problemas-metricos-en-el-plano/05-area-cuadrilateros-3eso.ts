import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const areaCuadrilateros3esoLesson: InteractiveLesson = {
  slug: "area-cuadrilateros-3eso",
  title: "5. Área de los cuadriláteros",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "basicos",
      type: "slide",
      help: [
        {
          label: "Altura",
          message: "En un paralelogramo la altura es la distancia entre los lados paralelos medida en perpendicular, no el lado inclinado.",
        },
        {
          label: "Mismo área, distinto perímetro",
          message: "Al inclinar un paralelogramo manteniendo base y altura, el área no cambia pero el perímetro sí.",
        },
      ],
      title: "Rectángulo, cuadrado y paralelogramo",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "A = b \\cdot a,\\ P = 2b + 2a", label: "rectángulo (base b, altura a)" },
            { tex: "A = l^2,\\ P = 4l", label: "cuadrado" },
            { tex: "A = b \\cdot a", label: "paralelogramo (altura a, no el lado)" },
          ],
        },
        {
          kind: "warning",
          text: "En el paralelogramo se multiplica la base por la **altura** (perpendicular), no por el lado oblicuo.",
        },
      ],
      visual: { kind: "tool", tool: "paralelogramo-area", params: { a: 6, b: 4, c: 2 }, hint: "Inclina el paralelogramo: el área no cambia, el perímetro sí." },
    },
    {
      id: "rombo",
      type: "slide",
      help: [
        {
          label: "Un rectángulo",
          message: "El rombo cabe justo en un rectángulo de lados $d$ y $d'$; ocupa la mitad de su área.",
        },
        {
          label: "Con diagonales",
          message: "Si no te dan las diagonales, puedes hallarlas con Pitágoras a partir del lado y una de ellas.",
        },
      ],
      title: "Rombo",
      blocks: [
        {
          kind: "rule",
          text: "El área del rombo es la **mitad del producto de sus diagonales**.",
          formula: "A = \\dfrac{d \\cdot d'}{2}",
        },
        {
          kind: "example",
          title: "Rombo de lado 13 cm y diagonal 24 cm",
          lines: [
            { math: "d' = 2\\sqrt{13^2 - 12^2} = 10\\ \\text{cm}" },
            { math: "A = \\dfrac{24 \\cdot 10}{2} = 120\\ \\text{cm}^2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "area-rombo" },
    },
    {
      id: "trapecio",
      type: "slide",
      help: [
        {
          label: "Dos trapecios iguales",
          message: "Dos trapecios iguales, uno girado, forman un paralelogramo de base $b + b'$.",
        },
        {
          label: "Semisuma",
          message: "Es como multiplicar la altura por la longitud media de las bases.",
        },
      ],
      title: "Trapecio",
      blocks: [
        {
          kind: "rule",
          text: "El área del trapecio es la **semisuma de las bases por la altura**.",
          formula: "A = \\dfrac{(b + b') \\cdot a}{2}",
        },
        {
          kind: "example",
          title: "Bases 37 cm y 55 cm, lado oblicuo 14 cm (trapecio isósceles)",
          lines: [
            { math: "a = \\sqrt{14^2 - 9^2} \\approx 10{,}7\\ \\text{cm}" },
            { math: "A = \\dfrac{(37 + 55) \\cdot 10{,}7}{2} \\approx 492{,}2\\ \\text{cm}^2" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "trapecio-area", params: { a: 8, b: 4, c: 3 }, hint: "Cambia las bases y la altura y comprueba la fórmula." },
    },
    {
      id: "check-rombo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Fórmula",
          message: "$A = \\frac{d \\cdot d'}{2}$ con $d = 12$ y $d' = 9$.",
        },
      ],
      title: "Área de un rombo",
      question: "Un rombo tiene diagonales de $12$ cm y $9$ cm. ¿Cuál es su área? (solo el número, en cm²)",
      correctAnswers: ["54"],
      explanation: "$A = \\frac{12 \\cdot 9}{2} = 54$ cm².",
    },
    {
      id: "check-trapecio",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Semisuma",
          message: "$\\frac{10 + 6}{2} = 8$. Multiplica por la altura.",
        },
      ],
      title: "Área de un trapecio",
      question: "Un trapecio tiene bases de $10$ cm y $6$ cm y altura $5$ cm. ¿Cuál es su área? (solo el número, en cm²)",
      correctAnswers: ["40"],
      explanation: "$A = \\frac{(10 + 6) \\cdot 5}{2} = 40$ cm².",
    },
    {
      id: "check-paralelogramo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Altura, no lado",
          message: "Usa la altura perpendicular ($4$ cm), no el lado oblicuo ($5$ cm).",
        },
      ],
      title: "Paralelogramo",
      question: "Un paralelogramo tiene base $9$ cm, lado oblicuo $5$ cm y altura $4$ cm. ¿Cuál es su área? (solo el número, en cm²)",
      correctAnswers: ["36"],
      explanation: "$A = b \\cdot a = 9 \\cdot 4 = 36$ cm².",
    },
  ],
};
