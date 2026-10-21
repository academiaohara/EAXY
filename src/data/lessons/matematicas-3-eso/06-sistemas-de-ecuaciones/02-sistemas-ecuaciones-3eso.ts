import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemasEcuaciones3esoLesson: InteractiveLesson = {
  slug: "sistemas-ecuaciones-3eso",
  title: "2. Sistemas de ecuaciones",
  subtitle: TEMA_3ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "Lo común",
          message: "Cada ecuación sola tiene infinitas soluciones; el sistema pide el par que cumple las dos a la vez.",
        },
        {
          label: "En el plano",
          message: "La solución del sistema es el punto donde se cortan las dos rectas.",
        },
      ],
      title: "Qué es un sistema de ecuaciones",
      blocks: [
        {
          kind: "definition",
          text: "Dos ecuaciones forman un **sistema** cuando buscamos su **solución común**: el par $(x, y)$ que cumple las dos. Gráficamente, es el punto donde se **cortan** las dos rectas.",
        },
        {
          kind: "example",
          title: "Las edades de Alba y Mario suman 50 años y Alba tiene 10 más",
          lines: [
            { math: "\\begin{cases} x + y = 50 \\\\ x - y = 10 \\end{cases}" },
            { math: "x = 30,\\ y = 20" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "unica" } },
    },
    {
      id: "comprobar",
      type: "slide",
      help: [
        {
          label: "Las dos ecuaciones",
          message: "Un par solo es solución del sistema si cumple las dos ecuaciones. Basta con que falle una para descartarlo.",
        },
        {
          label: "Un orden",
          message: "Sustituye el par en la primera ecuación; si falla, ya no hace falta mirar la segunda.",
        },
      ],
      title: "Comprobar si un par es solución",
      blocks: [
        {
          kind: "example",
          title: "5x + 6y = 15 y 3x + 4y = 8",
          lines: [
            { math: "(x, y) = (-3, 5):\\ 5(-3) + 6 \\cdot 5 = 15\\ \\checkmark;\\quad 3(-3) + 4 \\cdot 5 = 11 \\ne 8" },
            { math: "(x, y) = (2, 1):\\ 5 \\cdot 2 + 6 \\cdot 1 = 16 \\ne 15" },
            { math: "\\text{Ninguno de los dos es solución del sistema}" },
          ],
        },
        {
          kind: "warning",
          text: "Que un par cumpla **una** ecuación no basta: tiene que cumplir **las dos**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-par",
      type: "predict",
      help: [
        {
          label: "Sustituye en las dos",
          message: "Calcula $x + y$ y $x - y$ para cada par y compara con $15$ y $-1$.",
        },
      ],
      title: "Solución del sistema",
      question: "¿Cuál es la solución del sistema $x + y = 15$, $x - y = -1$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$x = 7,\\ y = 8$" },
        { id: "b", label: "$x = 8,\\ y = 7$", incorrectFeedback: "$8 - 7 = 1$, no $-1$: solo cumple la primera ecuación." },
        { id: "c", label: "$x = 5,\\ y = 10$", incorrectFeedback: "$5 - 10 = -5$, no $-1$: solo cumple la primera." },
        { id: "d", label: "$x = 14,\\ y = 1$", incorrectFeedback: "$14 - 1 = 13 \\ne -1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$7 + 8 = 15$ y $7 - 8 = -1$: cumple las dos ecuaciones.",
    },
    {
      id: "check-sistema",
      type: "predict",
      help: [
        {
          label: "Sustituye",
          message: "En $x + 2y = 4$ y $3x - y = 5$ sustituye $x = 2$, $y = 1$.",
        },
      ],
      title: "¿Es solución?",
      question: "¿Es $x = 2$, $y = 1$ solución del sistema $x + 2y = 4$, $3x - y = 5$?",
      mode: "choice",
      choices: [
        { id: "si", label: "Sí, cumple las dos ecuaciones" },
        { id: "no1", label: "No, solo cumple la primera", incorrectFeedback: "$3 \\cdot 2 - 1 = 5$: también cumple la segunda." },
        { id: "no2", label: "No, no cumple ninguna", incorrectFeedback: "$2 + 2 \\cdot 1 = 4$: cumple la primera." },
      ],
      correctChoiceId: "si",
      shuffleChoices: true,
      explanation: "$2 + 2 = 4$ y $6 - 1 = 5$: es solución.",
    },
  ],
};
