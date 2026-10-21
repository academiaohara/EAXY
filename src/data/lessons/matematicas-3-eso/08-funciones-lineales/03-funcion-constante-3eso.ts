import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const funcionConstante3esoLesson: InteractiveLesson = {
  slug: "funcion-constante-3eso",
  title: "3. La función constante: y = k",
  subtitle: TEMA_3ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "No depende de x",
          message: "Da igual el valor de $x$: la $y$ siempre vale lo mismo, $k$.",
        },
        {
          label: "Pendiente cero",
          message: "Es el caso $m = 0$ de $y = mx + n$: la recta no sube ni baja.",
        },
      ],
      title: "Cuando y no depende de x",
      blocks: [
        {
          kind: "definition",
          text: "La función $y = k$ se llama **función constante**: el valor de $y$ no depende de $x$. Su gráfica es una **recta paralela al eje $X$**, a distancia $k$ de él.",
        },
        {
          kind: "example",
          title: "Pistas de patinaje: se puede estar el tiempo que se quiera",
          lines: [
            { math: "\\text{Niños: } y = 3 \\qquad \\text{Jóvenes: } y = 5 \\qquad \\text{Adultos: } y = 10" },
            { math: "\\text{El coste no cambia con las horas}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "no-funcion",
      type: "slide",
      help: [
        {
          label: "Vertical",
          message: "En $x = 5$ hay infinitos valores de $y$ para ese único $x$: no cumple la definición de función.",
        },
        {
          label: "Forma general",
          message: "Las rectas verticales se escriben $x = k$, es decir, $ax + by = c$ con $b = 0$.",
        },
      ],
      title: "No confundir con x = k",
      blocks: [
        {
          kind: "compare",
          left: { title: "y = k", text: "Recta horizontal. **Sí** es función: a cada $x$ le corresponde un único $y$.", math: ["y = 3"], tone: "ok" },
          right: { title: "x = k", text: "Recta vertical. **No** es función: a un $x$ le corresponden infinitos $y$.", math: ["x = 5"], tone: "warn" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-horizontal",
      type: "predict",
      help: [
        {
          label: "Paralela a un eje",
          message: "Si $y$ siempre vale $-2$, los puntos tienen todos la misma altura.",
        },
      ],
      title: "Gráfica de y = −2",
      question: "¿Cómo es la gráfica de la función $y = -2$?",
      mode: "choice",
      choices: [
        { id: "h", label: "Una recta horizontal, dos unidades por debajo del eje $X$" },
        { id: "v", label: "Una recta vertical que pasa por $x = -2$", incorrectFeedback: "Eso es $x = -2$. Aquí $y$ siempre vale $-2$." },
        { id: "o", label: "Una recta que pasa por el origen", incorrectFeedback: "No pasa por $(0, 0)$: en $x = 0$ vale $y = -2$." },
      ],
      correctChoiceId: "h",
      shuffleChoices: true,
      explanation: "$y = k$ es horizontal: pasa por $(0, -2)$ y su pendiente es $0$.",
    },
    {
      id: "check-funcion",
      type: "predict",
      help: [
        {
          label: "Cada x, un solo y",
          message: "Una función asocia a cada $x$ un único $y$.",
        },
      ],
      title: "¿Es función?",
      question: "¿Cuál de estas rectas **no** es la gráfica de una función?",
      mode: "choice",
      choices: [
        { id: "x", label: "$x = 5$" },
        { id: "y", label: "$y = 5$", incorrectFeedback: "Es la función constante: sí es función." },
        { id: "mx", label: "$y = 5x$", incorrectFeedback: "Es una función de proporcionalidad." },
        { id: "mxn", label: "$y = x + 5$", incorrectFeedback: "Es una función lineal." },
      ],
      correctChoiceId: "x",
      shuffleChoices: true,
      explanation: "En $x = 5$ el valor de $x$ es el mismo y $y$ puede ser cualquiera: no es función.",
    },
  ],
};
