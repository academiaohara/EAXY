import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const metodoSustitucion2esoLesson: InteractiveLesson = {
  slug: "metodo-sustitucion-2eso",
  title: "3. Método de sustitución",
  subtitle: TEMA_2ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        {
          label: "Una ecuación con una incógnita",
          message: "Al sustituir una incógnita por su expresión, la otra ecuación se queda con una sola incógnita, y eso ya sabes resolverlo.",
        },
        {
          label: "Después, la otra",
          message: "Con el valor encontrado, vuelves a la expresión despejada y calculas la segunda incógnita.",
        },
      ],
      title: "El método de sustitución",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Despeja** una incógnita en una de las ecuaciones.",
            "**Sustituye** esa expresión en la otra ecuación.",
            "**Resuelve** la ecuación con una sola incógnita.",
            "Calcula la **otra incógnita** y **comprueba**.",
          ],
        },
        {
          kind: "example",
          title: "Alba y Mario: x + y = 50 y x = y + 10",
          lines: [
            { math: "(y + 10) + y = 50 \\to 2y = 40 \\to y = 20" },
            { math: "x = 20 + 10 = 30" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x + y = 50", ";", "x = y + 10"], note: "la segunda ecuación ya tiene la $x$ despejada." },
            { tokens: ["(y+10) + y = 50"], active: [0, 0], note: "sustituimos la $x$ en la primera." },
            { tokens: ["2y + 10 = 50"], note: "reducimos." },
            { tokens: ["y = 20"], fresh: [0, 0], note: "$2y = 40$." },
            { tokens: ["x = 20 + 10 = 30"], fresh: [0, 0], note: "volvemos a la expresión de $x$." },
          ],
        },
      },
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [
        {
          label: "Por qué la $x$ de la segunda",
          message: "Tiene coeficiente $1$: despejarla no genera fracciones.",
        },
        {
          label: "Paréntesis",
          message: "La expresión despejada hay que ponerla entre paréntesis para que multiplique a todo: $3(8 - 2y)$.",
        },
      ],
      title: "Un ejemplo completo",
      blocks: [
        {
          kind: "formula",
          tex: "\\begin{cases} 3x - y = 3 \\\\ x + 2y = 8 \\end{cases}",
        },
        {
          kind: "steps",
          items: [
            "Despejo $x$ en la segunda: $x = 8 - 2y$.",
            "Sustituyo en la primera: $3(8 - 2y) - y = 3$.",
            "Resuelvo: $24 - 6y - y = 3 \\to 7y = 21 \\to y = 3$.",
            "Calculo $x = 8 - 2 \\cdot 3 = 2$.",
          ],
        },
        {
          kind: "example",
          title: "Comprobación",
          lines: [{ math: "3 \\cdot 2 - 3 = 3 \\ \\checkmark \\qquad 2 + 2 \\cdot 3 = 8 \\ \\checkmark" }],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3x − y = 3", ";", "x + 2y = 8"], note: "despejamos $x$ en la segunda ecuación." },
            { tokens: ["x = 8 − 2y"], fresh: [0, 0], note: "sustituimos en la primera." },
            { tokens: ["3(8 − 2y) − y = 3"], active: [0, 0], note: "quitamos paréntesis." },
            { tokens: ["24 − 6y − y = 3"], note: "reducimos." },
            { tokens: ["7y = 21"], note: "$24 - 7y = 3 \\Rightarrow -7y = -21 \\Rightarrow 7y = 21$." },
            { tokens: ["y = 3"], fresh: [0, 0], note: "$x = 8 - 2 \\cdot 3 = 2$." },
          ],
        },
      },
    },
    {
      id: "check-pasos",
      type: "predict",
      help: [
        {
          label: "Sustituye la expresión",
          message: "Si $x = 2y$, en la ecuación $x + y = 12$ se reemplaza $x$ por $2y$: $2y + y = 12$.",
        },
      ],
      title: "Plantear la sustitución",
      question: "En el sistema $\\begin{cases} x + y = 12 \\\\ x = 2y \\end{cases}$, ¿qué ecuación resulta al sustituir $x$ en la primera?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2y + y = 12$" },
        { id: "b", label: "$2y = 12$", incorrectFeedback: "Se ha perdido la $y$ de la primera ecuación." },
        { id: "c", label: "$x + 2y = 12$", incorrectFeedback: "No se ha sustituido la $x$ por $2y$." },
        { id: "d", label: "$2y \\cdot y = 12$", incorrectFeedback: "En la ecuación hay una suma, no un producto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2y + y = 12 \\Rightarrow 3y = 12 \\Rightarrow y = 4$ y $x = 2 \\cdot 4 = 8$.",
    },
    {
      id: "check-resolver",
      type: "fill_in_blank",
      help: [
        {
          label: "Despeja la $x$",
          message: "De $x - y = 2$ sale $x = y + 2$. Sustituye en $2x + y = 7$: $2(y + 2) + y = 7$.",
        },
      ],
      title: "Resolver un sistema",
      question: "Resuelve $\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$. ¿Cuánto vale $y$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$x = y + 2$; $2(y + 2) + y = 7 \\Rightarrow 3y + 4 = 7 \\Rightarrow y = 1$. Entonces $x = 3$.",
    },
    {
      id: "check-x",
      type: "fill_in_blank",
      help: [
        {
          label: "Vuelve a la expresión",
          message: "Con $y = 1$ en $x = y + 2$: $x = 1 + 2$.",
        },
      ],
      title: "La otra incógnita",
      question: "En el mismo sistema, ¿cuánto vale $x$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$x = y + 2 = 1 + 2 = 3$. Comprobación: $2 \\cdot 3 + 1 = 7$ y $3 - 1 = 2$.",
    },
  ],
};
