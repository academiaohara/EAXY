import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionRecta2esoLesson: InteractiveLesson = {
  slug: "ecuacion-recta-2eso",
  title: "6. Representar y escribir la ecuación de una recta",
  subtitle: TEMA_2ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "representar",
      type: "slide",
      help: [
        {
          label: "Dos puntos bastan",
          message: "Una recta queda determinada por dos puntos: calcula dos valores de $y$, márcalos y únelos con una regla.",
        },
        {
          label: "Elige x fáciles",
          message: "Conviene $x = 0$ y $x = 1$ (o $2$) para que las cuentas sean sencillas.",
        },
      ],
      title: "Representar una recta con una tabla",
      blocks: [
        {
          kind: "steps",
          items: [
            "Haz una **tabla de valores** con dos o tres valores de $x$.",
            "Marca los **puntos** $(x, y)$ en los ejes.",
            "**Une** los puntos con una recta.",
          ],
        },
        {
          kind: "example",
          title: "y = 2x − 1",
          lines: [
            { math: "x = 0 \\to y = -1 \\qquad x = 1 \\to y = 1 \\qquad x = 2 \\to y = 3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "pendiente",
      type: "slide",
      help: [
        {
          label: "Cuánto sube por cada unidad",
          message: "La pendiente es la variación de $y$ dividida entre la variación de $x$ al pasar de un punto a otro.",
        },
        {
          label: "Después la ordenada",
          message: "Con $m$ calculada, sustituye uno de los puntos en $y = mx + n$ y despeja $n$.",
        },
      ],
      title: "Escribir la ecuación de una recta",
      blocks: [
        {
          kind: "rule",
          title: "Pendiente",
          text: "La pendiente es el cociente entre lo que **varía $y$** y lo que **varía $x$** entre dos puntos.",
          formula: "m = \\dfrac{y_2 - y_1}{x_2 - x_1}",
        },
        {
          kind: "example",
          title: "Recta por (1, 3) y (3, 7)",
          lines: [
            { math: "m = \\dfrac{7 - 3}{3 - 1} = 2" },
            { math: "3 = 2 \\cdot 1 + n \\ \\Rightarrow\\  n = 1" },
            { math: "y = 2x + 1" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "recta-pendiente", params: { a: 2, b: 1 }, beatMs: 3600 },
    },
    {
      id: "check-tabla",
      type: "predict",
      help: [
        {
          label: "Mira la tabla",
          message: "Para $x = 0$, $y = -1$: esa es la ordenada en el origen $n$. Cada vez que $x$ sube $1$, $y$ sube $3$.",
        },
      ],
      title: "Ecuación desde una tabla",
      question: "La tabla $(x, y)$ es: $(0, -1)$, $(1, 2)$, $(2, 5)$. ¿Cuál es la ecuación de la recta?",
      mode: "choice",
      choices: [
        { id: "3x-1", label: "$y = 3x - 1$" },
        { id: "-x+3", label: "$y = -x + 3$", incorrectFeedback: "$y$ aumenta cuando aumenta $x$: la pendiente es positiva." },
        { id: "x-1", label: "$y = x - 1$", incorrectFeedback: "Con $x = 1$ daría $0$, no $2$." },
        { id: "3x+1", label: "$y = 3x + 1$", incorrectFeedback: "Con $x = 0$ daría $1$, no $-1$." },
      ],
      correctChoiceId: "3x-1",
      shuffleChoices: true,
      explanation: "$n = -1$ (valor en $x = 0$) y $m = \\frac{2 - (-1)}{1 - 0} = 3$: $y = 3x - 1$.",
    },
    {
      id: "check-dos-puntos",
      type: "fill_in_blank",
      help: [
        {
          label: "Variaciones",
          message: "$y$ pasa de $4$ a $10$ (sube $6$) cuando $x$ pasa de $1$ a $3$ (sube $2$).",
        },
      ],
      title: "Pendiente entre dos puntos",
      question: "Calcula la pendiente de la recta que pasa por $(1, 4)$ y $(3, 10)$. (solo el número)",
      correctAnswers: ["3"],
      explanation: "$m = \\frac{10 - 4}{3 - 1} = \\frac{6}{2} = 3$.",
    },
    {
      id: "check-valor",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye",
          message: "$y = 2 \\cdot 10 + 1$.",
        },
      ],
      title: "Un valor lejano",
      question: "En la recta $y = 2x + 1$, ¿cuánto vale $y$ cuando $x = 10$? (solo el número)",
      correctAnswers: ["21"],
      explanation: "$y = 2 \\cdot 10 + 1 = 21$.",
    },
    {
      id: "check-cuota",
      type: "predict",
      help: [
        {
          label: "Cuota fija y precio por unidad",
          message: "La ordenada en el origen es lo que se paga con $0$ minutos (la cuota) y la pendiente, lo que cuesta cada minuto.",
        },
      ],
      title: "Una tarifa",
      question: "Una llamada cuesta $0{,}40$ € de cuota fija más $0{,}20$ € por minuto. ¿Cuál es la función que da el coste $y$ de $x$ minutos?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$y = 0{,}2x + 0{,}4$" },
        { id: "inv", label: "$y = 0{,}4x + 0{,}2$", incorrectFeedback: "Has intercambiado la cuota y el precio por minuto." },
        { id: "prop", label: "$y = 0{,}6x$", incorrectFeedback: "No hay una cuota por minuto: la cuota se paga una sola vez." },
        { id: "const", label: "$y = 0{,}6$", incorrectFeedback: "El coste depende de los minutos: no es constante." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$m = 0{,}2$ (€ por minuto) y $n = 0{,}4$ (cuota fija): $y = 0{,}2x + 0{,}4$.",
    },
  ],
};
