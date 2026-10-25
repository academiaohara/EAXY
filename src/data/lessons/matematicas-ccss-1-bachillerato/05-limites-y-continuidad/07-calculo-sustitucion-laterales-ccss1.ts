import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_5_SUBTITLE } from "@/data/lessons/shared";

export const calculoSustitucionLateralesCcss1Lesson: InteractiveLesson = {
  slug: "calculo-sustitucion-laterales-ccss1",
  title: "7. Cálculo de límites: sustitución y laterales",
  subtitle: TEMA_CCSS1_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "sustituir",
      type: "slide",
      help: [{ label: "Funciones continuas", message: "Funciona porque polinomios, raíces, exponenciales, logaritmos y funciones trigonométricas son continuas en su dominio." }],
      title: "Primer paso: sustituir",
      blocks: [
        { kind: "text", text: "Para calcular $\\displaystyle\\lim_{x\\to a} f(x)$ se **sustituye** $x$ por $a$ y se opera. Puede salir:" },
        { kind: "steps", items: [
          "Un **número**: ese es el límite.",
          "Un número distinto de $0$ dividido entre $0$: hay que estudiar los **límites laterales** (será $+\\infty$ o $-\\infty$ de cada lado).",
          "Una **indeterminación** ($\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\cdot\\infty$, $1^\\infty$…): hay que **transformar** la expresión.",
        ] },
        { kind: "example", title: "lím x→4 de (x² − 5x + 3)/(x − 3)", lines: [
          { math: "\\dfrac{4^2 - 5\\cdot 4 + 3}{4 - 3} = \\dfrac{16 - 20 + 3}{1} = -1" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-sustituir",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $x = -1$: numerador $(-1)^3 + 2(-1) = -3$ y denominador $-1 + 3 = 2$." }],
      title: "Sustituir",
      question: "Calcula $\\displaystyle\\lim_{x\\to -1}\\dfrac{x^3 + 2x}{x + 3}$. (decimal)",
      correctAnswers: ["-1,5", "−1,5", "-1.5", "−1.5", "-3/2", "−3/2"],
      explanation: "$\\dfrac{-1 - 2}{-1 + 3} = \\dfrac{-3}{2} = -1{,}5$.",
    },
    {
      id: "cambio-h",
      type: "slide",
      help: [{ label: "Para qué sirve", message: "Con $x = a + h$ y $h > 0$ pequeño nos movemos solo por la derecha; con $x = a - h$, por la izquierda. Luego se hace $h \\to 0$." }],
      title: "Límites laterales con x = a ± h",
      blocks: [
        { kind: "rule", title: "Cambio de variable", formula: "x \\to a^+ \\iff x = a + h,\\ h \\to 0^+\\qquad x \\to a^- \\iff x = a - h,\\ h \\to 0^+" },
        { kind: "example", title: "lím x→4⁺ de x² + 5x − 3", lines: [
          { math: "(4 + h)^2 + 5(4 + h) - 3 = 33 + 13h + h^2" },
          { math: "\\lim_{h\\to 0^+}(33 + 13h + h^2) = 33" },
        ] },
        { kind: "text", text: "Por la izquierda ($x = 4 - h$) también sale $33$; como coinciden, $\\displaystyle\\lim_{x\\to 4}(x^2 + 5x - 3) = 33$." },
      ],
      visual: { kind: "tool", tool: "limite-lateral-explorador", initial: [0, 1], hint: "El deslizador es h: los puntos verde (x = a − h) y rojo (x = a + h) se acercan a a, y f(x) se acerca al mismo valor por los dos lados." },
    },
    {
      id: "check-divcero",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Al sustituir sale $\\frac{5}{0}$. Estudia el signo de $x - 3$ a cada lado de $3$." }],
      title: "Dividir entre cero",
      question: "¿Qué ocurre con $\\displaystyle\\lim_{x\\to 3}\\dfrac{5}{x - 3}$?",
      choices: [
        { id: "a", label: "No existe: $+\\infty$ por la derecha y $-\\infty$ por la izquierda" },
        { id: "b", label: "Vale $+\\infty$", incorrectFeedback: "Solo por la derecha: por la izquierda $x - 3 < 0$ y la fracción es negativa." },
        { id: "c", label: "Vale $0$", incorrectFeedback: "El denominador tiende a $0$, no el numerador." },
        { id: "d", label: "Es una indeterminación", incorrectFeedback: "$\\frac{5}{0}$ no es indeterminación: es $\\pm\\infty$ según el lado." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "A la derecha $x - 3 \\to 0^+$ y la fracción $\\to +\\infty$; a la izquierda $x - 3 \\to 0^-$ y $\\to -\\infty$. Los laterales difieren: no hay límite.",
    },
    {
      id: "check-const",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $x = 3$ en $2x^2 - 7$." }],
      title: "Un límite directo",
      question: "Calcula $\\displaystyle\\lim_{x\\to 3}(2x^2 - 7)$. (solo el número)",
      correctAnswers: ["11"],
      explanation: "$2\\cdot 9 - 7 = 11$.",
    },
  ],
};
