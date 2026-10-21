import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadMx3esoLesson: InteractiveLesson = {
  slug: "proporcionalidad-mx-3eso",
  title: "1. Función de proporcionalidad: y = mx",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Precio por litro",
          message: "Si el aceite cuesta $3$ €/l, $1$ litro cuesta $3$ €, $2$ litros $6$ €…: el coste es $3x$.",
        },
        {
          label: "La pendiente",
          message: "$m$ es lo que aumenta $y$ cuando $x$ aumenta una unidad: aquí, el precio de un litro.",
        },
      ],
      title: "Magnitudes proporcionales: y = mx",
      blocks: [
        {
          kind: "definition",
          text: "La **función de proporcionalidad** relaciona dos magnitudes directamente proporcionales. Su ecuación es $y = mx$ y su gráfica es una **recta que pasa por el origen** $(0, 0)$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "y = x", label: "leche, 1 €/l → m = 1" },
            { tex: "y = 3x", label: "aceite, 3 €/l → m = 3" },
            { tex: "y = \\tfrac{1}{2}x", label: "agua, 0,5 €/l → m = ½" },
          ],
        },
        {
          kind: "text",
          text: "La constante $m$, positiva o negativa, es la **pendiente**: indica la inclinación de la recta.",
        },
      ],
      visual: { kind: "anim", scene: "recta-pendiente", params: { a: 3, b: 0 } },
    },
    {
      id: "representar",
      type: "slide",
      help: [
        {
          label: "Dos puntos",
          message: "Una recta queda fijada por dos puntos: el origen y otro que obtienes dando un valor a $x$.",
        },
        {
          label: "Valor cómodo",
          message: "Elige un $x$ que anule el denominador de $m$: para $y = \\frac{3}{5}x$, el valor $x = 5$ da $y = 3$.",
        },
      ],
      title: "Representar y = mx",
      blocks: [
        {
          kind: "steps",
          items: [
            "Marca el origen $(0, 0)$: siempre es un punto de la recta.",
            "Da a $x$ un valor y calcula $y$ para obtener un segundo punto.",
            "Traza la recta por los dos puntos.",
          ],
        },
        {
          kind: "example",
          title: "y = (3/5)x",
          lines: [
            { math: "x = 5 \\Rightarrow y = \\dfrac{3}{5} \\cdot 5 = 3" },
            { math: "\\text{Recta por } (0, 0) \\text{ y } (5, 3)" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "recta-tabla-puntos", params: { a: 2, b: 0 } },
    },
    {
      id: "pendiente",
      type: "slide",
      help: [
        {
          label: "Sube o baja",
          message: "Si al avanzar hacia la derecha la recta sube, $m > 0$; si baja, $m < 0$.",
        },
        {
          label: "Cociente",
          message: "$m = \\frac{\\text{variación de } y}{\\text{variación de } x}$ entre dos puntos cualesquiera de la recta.",
        },
      ],
      title: "Hallar la ecuación a partir de la gráfica",
      blocks: [
        {
          kind: "rule",
          text: "Si la gráfica es una recta que pasa por el origen, es $y = mx$. Para hallar $m$: variación de $y$ entre variación de $x$ entre dos puntos.",
          formula: "m = \\dfrac{\\Delta y}{\\Delta x}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{Recta por } (0,0) \\text{ y } (4, 3):\\ m = \\dfrac{3}{4} \\Rightarrow y = \\dfrac{3}{4}x" },
            { math: "\\text{Recta por } (0,0) \\text{ y } (5, -3):\\ m = -\\dfrac{3}{5} \\Rightarrow y = -\\dfrac{3}{5}x" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-pendiente",
      type: "predict",
      help: [
        {
          label: "Despeja y",
          message: "La pendiente es el coeficiente de $x$ cuando $y$ está despejada: $y - 2x = 0 \\Rightarrow y = 2x$.",
        },
      ],
      title: "Pendiente",
      question: "¿Cuál es la pendiente de la recta $y - 2x = 0$?",
      mode: "choice",
      choices: [
        { id: "2", label: "$2$" },
        { id: "-2", label: "$-2$", incorrectFeedback: "Al despejar, $2x$ pasa sumando: $y = 2x$." },
        { id: "0", label: "$0$", incorrectFeedback: "El $0$ es el término independiente; la pendiente es el coeficiente de $x$." },
        { id: "1", label: "$1$", incorrectFeedback: "$1$ es el coeficiente de $y$, no de $x$." },
      ],
      correctChoiceId: "2",
      shuffleChoices: true,
      explanation: "$y = 2x$, así que $m = 2$.",
    },
    {
      id: "check-ecuacion",
      type: "fill_in_blank",
      help: [
        {
          label: "Cociente",
          message: "Con un punto $(x_0, y_0)$ de la recta, $m = \\frac{y_0}{x_0}$.",
        },
      ],
      title: "Ecuación de la recta",
      question: "Una recta pasa por el origen y por $(4, 12)$. Escribe su ecuación (por ejemplo y=5x).",
      correctAnswers: ["y=3x"],
      explanation: "$m = \\frac{12}{4} = 3$, así que $y = 3x$.",
    },
    {
      id: "check-problema",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Pendiente = precio",
          message: "Si $1$ kg de arroz cuesta $1{,}5$ €, la función coste es $y = 1{,}5x$.",
        },
      ],
      title: "Coste del arroz",
      question: "El arroz cuesta $1{,}5$ €/kg. Con la función $y = 1{,}5x$, ¿cuánto cuestan $6$ kg? (solo el número, en euros)",
      correctAnswers: ["9"],
      explanation: "$y = 1{,}5 \\cdot 6 = 9$ €.",
    },
  ],
};
