import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const rectaDosPuntos3esoLesson: InteractiveLesson = {
  slug: "recta-dos-puntos-3eso",
  title: "5. Recta que pasa por dos puntos",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pendiente",
      type: "slide",
      help: [
        {
          label: "Contando cuadros",
          message: "En una gráfica puedes contar cuánto sube y cuánto avanza entre los dos puntos.",
        },
        {
          label: "Orden de la resta",
          message: "Resta en el mismo orden arriba y abajo: $y_2 - y_1$ y $x_2 - x_1$. Si cambias uno, cambia el signo.",
        },
      ],
      title: "Pendiente conociendo dos puntos",
      blocks: [
        {
          kind: "rule",
          text: "La pendiente de la recta por $P_1(x_1, y_1)$ y $P_2(x_2, y_2)$ es la variación de $y$ entre la variación de $x$:",
          formula: "m = \\dfrac{y_2 - y_1}{x_2 - x_1}",
        },
        {
          kind: "example",
          title: "P(2, −5) y Q(6, 1)",
          lines: [
            { math: "m = \\dfrac{1 - (-5)}{6 - 2} = \\dfrac{6}{4} = \\dfrac{3}{2}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "pendiente-dos-puntos", params: { a: 2, b: -5, c: 6, d: 1 } },
    },
    {
      id: "ecuacion",
      type: "slide",
      help: [
        {
          label: "Cualquiera de los dos",
          message: "Puedes usar $P_1$ o $P_2$ para la ecuación punto-pendiente: el resultado es el mismo.",
        },
        {
          label: "Comprueba",
          message: "Sustituye el otro punto en la ecuación final: debe cumplirla.",
        },
      ],
      title: "Ecuación de la recta por dos puntos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Calcula la **pendiente** $m$ con los dos puntos.",
            "Escribe la ecuación **punto-pendiente** con uno de ellos.",
            "**Simplifica** hasta $y = mx + n$.",
          ],
        },
        {
          kind: "example",
          title: "P(5, 3) y Q(−3, 4)",
          lines: [
            { math: "m = \\dfrac{4 - 3}{-3 - 5} = -\\dfrac{1}{8}" },
            { math: "y = 3 - \\dfrac{1}{8}(x - 5)" },
            { math: "y = -\\dfrac{1}{8}x + \\dfrac{29}{8}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-pendiente",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Resta ordenada",
          message: "$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{3 - 6}{3 - 4}$.",
        },
      ],
      title: "Pendiente",
      question: "Calcula la pendiente de la recta que pasa por $P(4, 6)$ y $Q(3, 3)$ (solo el número).",
      correctAnswers: ["3"],
      explanation: "$m = \\frac{3 - 6}{3 - 4} = \\frac{-3}{-1} = 3$.",
    },
    {
      id: "check-ecuacion",
      type: "fill_in_blank",
      help: [
        {
          label: "Primero m",
          message: "$m = \\frac{5 - 0}{5 - (-1)} = \\frac{5}{6}$; con el punto $(-1, 0)$: $y = \\frac{5}{6}(x + 1)$.",
        },
      ],
      title: "Ecuación por dos puntos",
      question: "Halla la ecuación de la recta que pasa por $(1, 3)$ y $(3, 7)$ (por ejemplo y=5x-2).",
      correctAnswers: ["y=2x+1"],
      explanation: "$m = \\frac{7 - 3}{3 - 1} = 2$ y $y = 3 + 2(x - 1) = 2x + 1$.",
    },
    {
      id: "check-signo",
      type: "predict",
      help: [
        {
          label: "Mira cómo va",
          message: "Si al aumentar $x$ el valor de $y$ disminuye, la pendiente es negativa.",
        },
      ],
      title: "Signo de la pendiente",
      question: "La recta que pasa por $(0, 4)$ y $(2, 0)$, ¿tiene pendiente positiva, negativa o nula?",
      mode: "choice",
      choices: [
        { id: "neg", label: "Negativa: $m = -2$" },
        { id: "pos", label: "Positiva: $m = 2$", incorrectFeedback: "$y$ pasa de $4$ a $0$ al avanzar de $x = 0$ a $x = 2$: baja." },
        { id: "nula", label: "Nula", incorrectFeedback: "Una recta horizontal tendría los dos puntos a la misma altura." },
      ],
      correctChoiceId: "neg",
      shuffleChoices: true,
      explanation: "$m = \\frac{0 - 4}{2 - 0} = -2$.",
    },
  ],
};
