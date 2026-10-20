import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaFracciones2esoLesson: InteractiveLesson = {
  slug: "suma-resta-fracciones-2eso",
  title: "2. Suma y resta de fracciones",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mismo-denominador",
      type: "slide",
      help: [
        {
          label: "Se cuentan trozos",
          message: "Si los trozos son del mismo tamaño, sumar es contar cuántos hay en total: $2$ cuartos y $3$ cuartos son $5$ cuartos.",
        },
        {
          label: "El denominador no se suma",
          message: "El denominador solo dice el tamaño del trozo y no cambia: $\\frac{2}{4} + \\frac{3}{4} \\ne \\frac{5}{8}$.",
        },
      ],
      title: "Con el mismo denominador",
      blocks: [
        {
          kind: "rule",
          text: "Se suman (o restan) los **numeradores** y se deja el **mismo denominador**.",
          formula: "\\dfrac{a}{c} \\pm \\dfrac{b}{c} = \\dfrac{a \\pm b}{c}",
        },
        {
          kind: "example",
          lines: [{ math: "\\dfrac{2}{4} + \\dfrac{3}{4} = \\dfrac{2 + 3}{4} = \\dfrac{5}{4}" }],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-barras-suma", params: { a: 2, b: 4, c: 3, d: 4, op: "+" } },
    },
    {
      id: "distinto-denominador",
      type: "slide",
      help: [
        {
          label: "Por qué el m.c.m.",
          message: "Buscas trozos del mismo tamaño que valgan para las dos fracciones: el denominador común más pequeño es el m.c.m. de los denominadores.",
        },
        {
          label: "Cómo amplificar",
          message: "Divide el m.c.m. entre cada denominador: ese es el número por el que multiplicas numerador y denominador.",
        },
      ],
      title: "Con distinto denominador: el m.c.m.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Calcula el **m.c.m.** de los denominadores.",
            "**Amplifica** cada fracción hasta ese denominador.",
            "Suma o resta los numeradores.",
            "**Simplifica** si se puede.",
          ],
        },
        {
          kind: "example",
          title: "4/3 − 3/4",
          lines: [
            { math: "\\text{m.c.m.}(3, 4) = 12" },
            { math: "\\dfrac{4}{3} - \\dfrac{3}{4} = \\dfrac{16}{12} - \\dfrac{9}{12} = \\dfrac{7}{12}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-barras-suma", params: { a: 4, b: 3, c: 3, d: 4, op: "-" } },
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Denominador común",
          message: "$\\text{m.c.m.}(4, 6) = 12$. Amplifica $\\frac{3}{4}$ por $3$ y $\\frac{5}{6}$ por $2$.",
        },
      ],
      title: "Suma",
      question: "Calcula $\\dfrac{3}{4} + \\dfrac{5}{6}$ (fracción irreducible).",
      correctAnswers: ["19/12"],
      explanation: "$\\frac{9}{12} + \\frac{10}{12} = \\frac{19}{12}$. No se puede simplificar: $19$ es primo.",
    },
    {
      id: "check-resta",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Denominador común",
          message: "$\\text{m.c.m.}(6, 4) = 12$ para $\\frac{5}{6} - \\frac{1}{4}$... prueba con ese.",
        },
        {
          label: "Simplifica al final",
          message: "Si el numerador y el denominador son pares, divide entre $2$.",
        },
      ],
      title: "Resta",
      question: "Calcula $\\dfrac{5}{6} - \\dfrac{1}{4}$ (fracción irreducible).",
      correctAnswers: ["7/12"],
      explanation: "$\\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$.",
    },
    {
      id: "check-problema",
      type: "predict",
      help: [
        {
          label: "Qué se pide",
          message: "Lo que queda es el total menos lo que se ha consumido: $1 - (\\frac{1}{3} + \\frac{1}{4})$.",
        },
        {
          label: "La unidad como fracción",
          message: "$1 = \\frac{12}{12}$ cuando el denominador común es $12$.",
        },
      ],
      title: "Una tarta",
      question: "Se come $\\dfrac{1}{3}$ de una tarta por la mañana y $\\dfrac{1}{4}$ por la tarde. ¿Qué fracción queda?",
      mode: "choice",
      choices: [
        { id: "5-12", label: "$\\dfrac{5}{12}$" },
        { id: "7-12", label: "$\\dfrac{7}{12}$", incorrectFeedback: "Es lo que se ha comido ($\\frac{4}{12} + \\frac{3}{12}$); lo que queda es el resto hasta la unidad." },
        { id: "2-7", label: "$\\dfrac{2}{7}$", incorrectFeedback: "No se suman denominadores: $3 + 4$ no es el tamaño del trozo." },
        { id: "1-12", label: "$\\dfrac{1}{12}$", incorrectFeedback: "Has restado $\\frac{1}{3} - \\frac{1}{4}$ en vez de calcular lo que queda de la unidad." },
      ],
      correctChoiceId: "5-12",
      shuffleChoices: true,
      explanation: "Se ha comido $\\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$. Queda $\\frac{12}{12} - \\frac{7}{12} = \\frac{5}{12}$.",
    },
  ],
};
