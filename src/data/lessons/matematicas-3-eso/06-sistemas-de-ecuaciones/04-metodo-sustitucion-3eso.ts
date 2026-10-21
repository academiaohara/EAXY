import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const metodoSustitucion3esoLesson: InteractiveLesson = {
  slug: "metodo-sustitucion-3eso",
  title: "4. Método de sustitución",
  subtitle: TEMA_3ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "Despeja la más fácil",
          message: "Elige la incógnita que sale sin fracciones: la que tiene coeficiente $1$ o $-1$.",
        },
        {
          label: "Una sola incógnita",
          message: "Al sustituir, la ecuación solo tiene una incógnita: ya sabes resolverla.",
        },
      ],
      title: "Despejar y sustituir",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Despeja** una incógnita en una de las ecuaciones.",
            "**Sustituye** su expresión en la otra ecuación.",
            "**Resuelve** la ecuación con una sola incógnita.",
            "**Sustituye** el valor obtenido en la expresión del paso 1.",
            "Escribe la **solución** y comprueba.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [
        {
          label: "Paréntesis",
          message: "Al sustituir $x = 3y - 5$ en $3x + 2y$, la expresión va entre paréntesis: $3(3y - 5)$.",
        },
        {
          label: "Comprueba",
          message: "Sustituye $x = 4$, $y = 3$ en las dos ecuaciones originales.",
        },
      ],
      title: "Un ejemplo completo",
      blocks: [
        {
          kind: "example",
          title: "3x + 2y = 18 y x − 3y = −5",
          lines: [
            { math: "x = 3y - 5", note: "1. despejar x en la 2.ª" },
            { math: "3(3y - 5) + 2y = 18", note: "2. sustituir en la 1.ª" },
            { math: "9y - 15 + 2y = 18 \\Rightarrow 11y = 33 \\Rightarrow y = 3", note: "3. resolver" },
            { math: "x = 3 \\cdot 3 - 5 = 4", note: "4. calcular x" },
            { math: "\\text{Solución: } x = 4,\\ y = 3", note: "5. comprobar: 12 + 6 = 18 y 4 − 9 = −5" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "sustitucion-sistema" },
    },
    {
      id: "check-despejar",
      type: "predict",
      help: [
        {
          label: "Coeficiente 1",
          message: "La incógnita sin coeficiente es la que se despeja sin fracciones.",
        },
      ],
      title: "Qué despejar",
      question: "En el sistema $2x - 5y = 6$, $x - 3y = 2$, ¿cuál es la forma más cómoda de empezar?",
      mode: "choice",
      choices: [
        { id: "a", label: "Despejar $x$ en la segunda: $x = 2 + 3y$" },
        { id: "b", label: "Despejar $y$ en la primera: $y = \\frac{2x - 6}{5}$", incorrectFeedback: "Aparece una fracción: es más incómodo." },
        { id: "c", label: "Despejar $y$ en la segunda: $y = \\frac{x - 2}{3}$", incorrectFeedback: "También aparece una fracción." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x$ tiene coeficiente $1$ en la segunda ecuación y se despeja sin fracciones.",
    },
    {
      id: "check-resolver",
      type: "fill_in_blank",
      help: [
        {
          label: "Despeja y",
          message: "En $5x + y = 1$, despeja $y = 1 - 5x$ y sustitúyelo en $3x - 2y = 11$.",
        },
      ],
      title: "Resolver el sistema",
      question: "Resuelve $5x + y = 1$, $3x - 2y = 11$. Escribe $x$ e $y$ separados por coma (por ejemplo 2,-1).",
      correctAnswers: ["1,-4", "1, -4", "x=1,y=-4"],
      explanation: "$y = 1 - 5x$; $3x - 2(1 - 5x) = 11 \\Rightarrow 13x = 13 \\Rightarrow x = 1$; $y = 1 - 5 = -4$.",
    },
    {
      id: "check-otro",
      type: "fill_in_blank",
      help: [
        {
          label: "Despeja y",
          message: "En $3x - y = 1$ despeja $y = 3x - 1$.",
        },
      ],
      title: "Otro sistema",
      question: "Resuelve $3x - y = 1$, $x + 2y = 5$. Escribe $x$ e $y$ separados por coma.",
      correctAnswers: ["1,2", "1, 2", "x=1,y=2"],
      explanation: "$y = 3x - 1$; $x + 2(3x - 1) = 5 \\Rightarrow 7x = 7 \\Rightarrow x = 1$; $y = 2$.",
    },
  ],
};
