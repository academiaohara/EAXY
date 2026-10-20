import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const volumenPrismaCilindro3esoLesson: InteractiveLesson = {
  slug: "volumen-prisma-cilindro-3eso",
  title: "6. Volumen del prisma y del cilindro",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "capas",
      type: "slide",
      help: [
        {
          label: "Apilar capas",
          message: "Un prisma es una pila de capas iguales a la base. Si la base tiene $28$ unidades cuadradas y hay $5$ capas, hay $28 \\cdot 5 = 140$ unidades cúbicas.",
        },
        {
          label: "Sección",
          message: "Si cortas el prisma o el cilindro con un plano paralelo a la base, la sección es igual a la base.",
        },
      ],
      title: "Área de la base por la altura",
      blocks: [
        {
          kind: "rule",
          text: "El volumen de cualquier cuerpo con **dos bases iguales y paralelas** (prisma o cilindro) es el área de la base por la altura.",
          formula: "V = A_{\\text{base}} \\cdot h",
        },
        {
          kind: "facts",
          items: [
            { tex: "V_{\\text{prisma}} = A_{\\text{base}} \\cdot h", label: "depende de la base" },
            { tex: "V_{\\text{cilindro}} = \\pi r^2 h" },
            { tex: "V_{\\text{ortoedro}} = a \\cdot b \\cdot c" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cubo-dm3" },
    },
    {
      id: "ejemplos",
      type: "slide",
      help: [
        {
          label: "Calcula la base primero",
          message: "En un prisma de base poligonal, halla antes el área de la base: triángulo, trapecio, hexágono regular…",
        },
        {
          label: "Unidades",
          message: "El volumen se mide en unidades cúbicas: $\\text{cm}^3$, $\\text{m}^3$…",
        },
      ],
      title: "Ejemplos",
      blocks: [
        {
          kind: "example",
          title: "Prisma de base triángulo rectángulo (catetos 3 y 4) y altura 10",
          lines: [
            { math: "A_{\\text{base}} = \\dfrac{3 \\cdot 4}{2} = 6" },
            { math: "V = 6 \\cdot 10 = 60\\ \\text{cm}^3" },
          ],
        },
        {
          kind: "example",
          title: "Cilindro de radio 5 cm y altura 8 cm",
          lines: [
            { math: "V = \\pi \\cdot 5^2 \\cdot 8 = 200\\pi \\approx 628\\ \\text{cm}^3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-prisma",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Base",
          message: "Base: $\\frac{6 \\cdot 8}{2} = 24$ cm².",
        },
      ],
      title: "Prisma triangular",
      question: "Un prisma tiene por base un triángulo de base $6$ cm y altura $8$ cm, y su altura es $12$ cm. ¿Cuál es su volumen? (solo el número, en cm³)",
      correctAnswers: ["288"],
      explanation: "$A_{\\text{base}} = 24$ y $V = 24 \\cdot 12 = 288$ cm³.",
    },
    {
      id: "check-cilindro",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Cuadrado del radio",
          message: "$r^2 = 9$, luego la base es $3{,}14 \\cdot 9 = 28{,}26$.",
        },
      ],
      title: "Volumen de un cilindro",
      question: "Calcula el volumen de un cilindro de radio $3$ cm y altura $10$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm³)",
      correctAnswers: ["282,6", "282.6"],
      explanation: "$V = 3{,}14 \\cdot 9 \\cdot 10 = 282{,}6$ cm³.",
    },
    {
      id: "check-capacidad",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "1 dm³ = 1 L",
          message: "Pasa a decímetros: $20$ cm $= 2$ dm; $30$ cm $= 3$ dm; $50$ cm $= 5$ dm.",
        },
      ],
      title: "Capacidad de un depósito",
      question: "Un depósito con forma de ortoedro mide $20$ cm × $30$ cm × $50$ cm. ¿Cuántos litros caben? (solo el número)",
      correctAnswers: ["30"],
      explanation: "$2 \\cdot 3 \\cdot 5 = 30$ dm³ $= 30$ litros.",
    },
  ],
};
