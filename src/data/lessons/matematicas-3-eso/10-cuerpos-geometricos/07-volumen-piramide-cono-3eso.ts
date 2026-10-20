import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const volumenPiramideCono3esoLesson: InteractiveLesson = {
  slug: "volumen-piramide-cono-3eso",
  title: "7. Volumen de la pirámide, del cono y de sus troncos",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "un-tercio",
      type: "slide",
      help: [
        {
          label: "Tres pirámides",
          message: "Un cubo puede descomponerse en tres pirámides iguales con la base del cubo y su altura: cada una ocupa un tercio.",
        },
        {
          label: "Misma base y altura",
          message: "La relación vale para pirámides y conos de cualquier base, siempre que tengan la misma base y altura que el prisma o el cilindro.",
        },
      ],
      title: "Un tercio del prisma o del cilindro",
      blocks: [
        {
          kind: "rule",
          text: "El volumen de una pirámide (o un cono) es **un tercio** del área de la base por la altura.",
          formula: "V = \\dfrac{1}{3} A_{\\text{base}} \\cdot h",
        },
        {
          kind: "facts",
          items: [
            { tex: "V_{\\text{pirámide}} = \\tfrac{1}{3}\\,V_{\\text{prisma}}" },
            { tex: "V_{\\text{cono}} = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3}\\,V_{\\text{cilindro}}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "arquimedes-volumenes" },
    },
    {
      id: "tronco",
      type: "slide",
      help: [
        {
          label: "Semejanza",
          message: "El cono pequeño y el grande son semejantes: radios y alturas están en la misma proporción.",
        },
        {
          label: "Resta",
          message: "El tronco es lo que queda del cono grande al quitarle el cono pequeño de arriba.",
        },
      ],
      title: "Tronco de cono o de pirámide",
      blocks: [
        {
          kind: "rule",
          text: "El volumen del tronco es el del cuerpo **completo** menos el del cuerpo **pequeño** que se quita.",
          formula: "V_{\\text{tronco}} = V_{\\text{mayor}} - V_{\\text{menor}}",
        },
        {
          kind: "example",
          title: "Cono de 10 cm de radio y 30 cm de altura, cortado a 12 cm de la base",
          lines: [
            { math: "\\text{El cono pequeño mide } 30 - 12 = 18 \\text{ de alto: } \\dfrac{18}{30} = \\dfrac{x}{10} \\Rightarrow x = 6" },
            { math: "V = \\tfrac{1}{3}\\pi \\cdot 10^2 \\cdot 30 - \\tfrac{1}{3}\\pi \\cdot 6^2 \\cdot 18 = 3\\,140 - 678{,}24" },
            { math: "V = 2\\,461{,}76\\ \\text{cm}^3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-piramide",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Base",
          message: "La base es un cuadrado de lado $6$: $36$ cm².",
        },
      ],
      title: "Volumen de una pirámide",
      question: "Calcula el volumen de una pirámide de base cuadrada de $6$ cm de lado y $10$ cm de altura. (solo el número, en cm³)",
      correctAnswers: ["120"],
      explanation: "$V = \\frac{1}{3} \\cdot 36 \\cdot 10 = 120$ cm³.",
    },
    {
      id: "check-cono",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Un tercio",
          message: "$V = \\frac{1}{3} \\cdot 3{,}14 \\cdot 3^2 \\cdot 7$.",
        },
      ],
      title: "Volumen de un cono",
      question: "Calcula el volumen de un cono de radio $3$ cm y altura $7$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm³)",
      correctAnswers: ["65,94", "65.94"],
      explanation: "$V = \\frac{1}{3} \\cdot 3{,}14 \\cdot 9 \\cdot 7 = 65{,}94$ cm³.",
    },
    {
      id: "check-relacion",
      type: "predict",
      help: [
        {
          label: "Misma base y altura",
          message: "El cono ocupa un tercio del cilindro con su misma base y altura.",
        },
      ],
      title: "Relación con el cilindro",
      question: "Un cilindro tiene $90$ cm³ de volumen. ¿Qué volumen tiene un cono con la misma base y la misma altura?",
      mode: "choice",
      choices: [
        { id: "30", label: "$30$ cm³" },
        { id: "45", label: "$45$ cm³", incorrectFeedback: "Esa sería la mitad; el cono es un tercio." },
        { id: "60", label: "$60$ cm³", incorrectFeedback: "Son dos tercios del cilindro; ese es el caso de la semiesfera." },
      ],
      correctChoiceId: "30",
      shuffleChoices: true,
      explanation: "$V_{\\text{cono}} = \\frac{1}{3} \\cdot 90 = 30$ cm³.",
    },
  ],
};
