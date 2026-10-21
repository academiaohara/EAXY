import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const funcionMxN3esoLesson: InteractiveLesson = {
  slug: "funcion-mx-n-3eso",
  title: "2. La función y = mx + n",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Cantidad fija",
          message: "$n$ es lo que vale la función cuando $x = 0$: lo que se paga solo por empezar, antes de que pase nada.",
        },
        {
          label: "Paralelas",
          message: "Si cambias $n$ pero no $m$, la recta se desplaza hacia arriba o hacia abajo sin cambiar de inclinación.",
        },
      ],
      title: "Pendiente y ordenada en el origen",
      blocks: [
        {
          kind: "rule",
          text: "La ecuación $y = mx + n$ se representa por una **recta** de **pendiente** $m$ que corta al eje $Y$ en $(0, n)$. $n$ es la **ordenada en el origen**.",
          formula: "y = mx + n",
        },
        {
          kind: "example",
          title: "Pista de patinaje: 3 € de entrada y 0,5 € por hora",
          lines: [
            { math: "y = 3 + 0{,}5x" },
            { math: "m = 0{,}5 \\ (\\text{coste por hora}),\\quad n = 3 \\ (\\text{entrada})" },
          ],
        },
        {
          kind: "text",
          text: "Dos rectas con la **misma pendiente** son **paralelas**. Si $n = 0$, la función es de proporcionalidad $y = mx$.",
        },
      ],
      visual: { kind: "anim", scene: "recta-pendiente", params: { a: 1, b: 3 } },
    },
    {
      id: "representar",
      type: "slide",
      help: [
        {
          label: "Un punto gratis",
          message: "El punto $(0, n)$ ya está: es donde la recta corta al eje $Y$.",
        },
        {
          label: "Con la pendiente",
          message: "Desde $(0, n)$ avanza $1$ a la derecha y sube (o baja) $m$ para el siguiente punto.",
        },
      ],
      title: "Representar y = mx + n",
      blocks: [
        {
          kind: "example",
          title: "y = 2x − 3",
          lines: [
            { math: "x = 0 \\Rightarrow y = -3" },
            { math: "x = 2 \\Rightarrow y = 1" },
            { math: "m = 2,\\quad n = -3" },
          ],
        },
        {
          kind: "example",
          title: "y = 7 − 4x",
          lines: [
            { math: "y = -4x + 7:\\quad m = -4,\\ n = 7" },
            { math: "\\text{La recta baja } 4 \\text{ por cada unidad que avanza}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "recta-tabla-puntos", params: { a: 2, b: -3 } },
    },
    {
      id: "check-identificar",
      type: "predict",
      help: [
        {
          label: "Ordena",
          message: "Escribe la ecuación como $y = mx + n$: $y = -\\frac{3}{4}x + 2$.",
        },
      ],
      title: "Pendiente y ordenada",
      question: "En la recta $y = -\\dfrac{3}{4}x + 2$, ¿cuáles son la pendiente y la ordenada en el origen?",
      mode: "choice",
      choices: [
        { id: "a", label: "$m = -\\frac{3}{4}$ y $n = 2$" },
        { id: "b", label: "$m = 2$ y $n = -\\frac{3}{4}$", incorrectFeedback: "Se han intercambiado: $m$ acompaña a la $x$ y $n$ es el término independiente." },
        { id: "c", label: "$m = \\frac{3}{4}$ y $n = 2$", incorrectFeedback: "El signo de la pendiente es negativo: la recta baja." },
        { id: "d", label: "$m = -\\frac{3}{4}$ y $n = 0$", incorrectFeedback: "Corta al eje $Y$ en $(0, 2)$, no en el origen." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En $y = mx + n$, $m$ es el coeficiente de $x$ y $n$ el término independiente.",
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Sustituye",
          message: "$y = 3x + 2$ con $x = 2$.",
        },
      ],
      title: "Valor de la función",
      question: "Calcula $y$ en la recta $y = 3x + 2$ cuando $x = 2$ (solo el número).",
      correctAnswers: ["8"],
      explanation: "$y = 3 \\cdot 2 + 2 = 8$.",
    },
    {
      id: "check-problema",
      type: "fill_in_blank",
      help: [
        {
          label: "Fijo y variable",
          message: "El sueldo fijo es la ordenada en el origen y la comisión por coche es la pendiente.",
        },
      ],
      title: "El sueldo de Sara",
      question: "Sara cobra $1\\,000$ € fijos al mes más $250$ € por cada coche que vende. Escribe la función del sueldo $y$ en función del número de coches $x$ (por ejemplo y=5x+3).",
      correctAnswers: ["y=250x+1000", "y=1000+250x"],
      explanation: "$y = 250x + 1\\,000$: pendiente $250$ (comisión) y ordenada $1\\,000$ (sueldo fijo).",
    },
  ],
};
