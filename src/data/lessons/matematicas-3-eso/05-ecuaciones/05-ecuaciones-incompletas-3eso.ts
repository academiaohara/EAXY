import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesIncompletas3esoLesson: InteractiveLesson = {
  slug: "ecuaciones-incompletas-3eso",
  title: "5. Ecuaciones de segundo grado incompletas",
  subtitle: TEMA_3ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "sin-x",
      type: "slide",
      help: [
        {
          label: "Despeja x²",
          message: "Pasa el término independiente al otro miembro y divide entre el coeficiente de $x^2$.",
        },
        {
          label: "Dos raíces",
          message: "Si $x^2 = 25$, hay dos números que elevados al cuadrado dan $25$: $5$ y $-5$.",
        },
      ],
      title: "Sin término en x: ax² + c = 0",
      blocks: [
        {
          kind: "definition",
          text: "Una ecuación de segundo grado es **incompleta** si $b = 0$ o $c = 0$. Aunque vale la fórmula general, hay métodos más rápidos.",
        },
        {
          kind: "rule",
          title: "ax² + c = 0",
          text: "Se despeja $x^2$ y se hace la raíz, con doble signo.",
          formula: "x = \\pm\\sqrt{-\\dfrac{c}{a}}",
        },
        {
          kind: "example",
          lines: [
            { math: "3x^2 - 75 = 0 \\Rightarrow x^2 = 25 \\Rightarrow x = \\pm 5" },
            { math: "2x^2 + 98 = 0 \\Rightarrow x^2 = -49", note: "no tiene solución real" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "parabola-raices",
        params: { a: 1, b: 0, c: -4 },
        captions: [
          "La gráfica de $y = x^2 - 4$ es una parábola; resolver $x^2 - 4 = 0$ es buscar dónde $y = 0$.",
          "Corta al eje $X$ en **dos puntos simétricos**: $x = -2$ y $x = 2$. Al despejar, $x^2 = 4$ y $x = \\pm 2$.",
          "Como falta el término en $x$, la parábola es simétrica respecto del eje $Y$: las soluciones son opuestas (o no existen).",
        ],
      },
    },
    {
      id: "sin-independiente",
      type: "slide",
      help: [
        {
          label: "Producto cero",
          message: "Si $A \\cdot B = 0$, entonces $A = 0$ o $B = 0$: no hay otra forma de que un producto valga cero.",
        },
        {
          label: "No simplifiques la x",
          message: "No dividas por $x$: perderías la solución $x = 0$.",
        },
      ],
      title: "Sin término independiente: ax² + bx = 0",
      blocks: [
        {
          kind: "rule",
          title: "ax² + bx = 0",
          text: "Se saca $x$ como **factor común** y se iguala a cero cada factor.",
          formula: "x(ax + b) = 0 \\Rightarrow x_1 = 0,\\ x_2 = -\\dfrac{b}{a}",
        },
        {
          kind: "example",
          title: "7x² + 14x = 0",
          lines: [
            { math: "x(7x + 14) = 0" },
            { math: "x = 0 \\quad\\text{o}\\quad 7x + 14 = 0 \\Rightarrow x = -2" },
          ],
        },
        {
          kind: "warning",
          text: "Una ecuación $ax^2 + bx = 0$ siempre tiene la solución $x = 0$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "parabola-raices",
        params: { a: 1, b: 2, c: 0 },
        captions: [
          "La gráfica de $y = x^2 + 2x$ es una parábola; resolver $x^2 + 2x = 0$ es buscar dónde $y = 0$.",
          "Pasa por el **origen** y corta al eje $X$ en otro punto: $x = 0$ y $x = -2$. Se factoriza: $x(x + 2) = 0$.",
          "Sin término independiente, $x = 0$ siempre es solución: la parábola siempre pasa por $(0, 0)$.",
        ],
      },
    },
    {
      id: "check-sin-x",
      type: "fill_in_blank",
      help: [
        {
          label: "Despeja",
          message: "$2x^2 = 98$, así que $x^2 = 49$.",
        },
      ],
      title: "Sin término en x",
      question: "Resuelve $2x^2 - 98 = 0$. Escribe las dos soluciones separadas por coma, de menor a mayor.",
      correctAnswers: ["-7,7", "-7, 7", "-7;7", "-7 y 7"],
      explanation: "$x^2 = 49 \\Rightarrow x = \\pm 7$.",
    },
    {
      id: "check-sin-ind",
      type: "fill_in_blank",
      help: [
        {
          label: "Factor común",
          message: "$3x^2 - 12x = 3x(x - 4)$. Iguala cada factor a $0$.",
        },
      ],
      title: "Sin término independiente",
      question: "Resuelve $3x^2 - 12x = 0$. Escribe las dos soluciones separadas por coma, de menor a mayor.",
      correctAnswers: ["0,4", "0, 4", "0;4", "0 y 4"],
      explanation: "$3x(x - 4) = 0 \\Rightarrow x = 0$ o $x = 4$.",
    },
    {
      id: "check-sin-solucion",
      type: "predict",
      help: [
        {
          label: "Despeja x²",
          message: "$4x^2 = -100$. ¿Puede un cuadrado ser negativo?",
        },
      ],
      title: "¿Tiene solución?",
      question: "La ecuación $4x^2 + 100 = 0$, ¿tiene solución real?",
      mode: "choice",
      choices: [
        { id: "no", label: "No: quedaría $x^2 = -25$" },
        { id: "si", label: "Sí: $x = \\pm 5$", incorrectFeedback: "$(\\pm 5)^2 = 25$, no $-25$." },
        { id: "una", label: "Sí: $x = 0$", incorrectFeedback: "Con $x = 0$ queda $100 = 0$, que es falso." },
      ],
      correctChoiceId: "no",
      shuffleChoices: true,
      explanation: "$x^2 = -25$ es imposible: un cuadrado nunca es negativo.",
    },
  ],
};
