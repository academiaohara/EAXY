import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaFracciones3esoLesson: InteractiveLesson = {
  slug: "suma-resta-fracciones-3eso",
  title: "2. Suma y resta de fracciones",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mismo-denominador",
      type: "slide",
      help: [
        {
          label: "Trozos del mismo tamaño",
          message: "Si los trozos son iguales, sumar es contar: $2$ cuartos y $3$ cuartos son $5$ cuartos.",
        },
        {
          label: "El denominador no se suma",
          message: "El denominador solo dice cómo de grande es cada trozo; al sumar no cambia.",
        },
      ],
      title: "Con el mismo denominador",
      blocks: [
        {
          kind: "rule",
          text: "Se suman o restan los **numeradores** y se mantiene el **denominador**.",
          formula: "\\dfrac{a}{c} \\pm \\dfrac{b}{c} = \\dfrac{a \\pm b}{c}",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{2}{4} + \\dfrac{3}{4} = \\dfrac{5}{4}" },
            { math: "\\dfrac{7}{9} - \\dfrac{10}{9} = -\\dfrac{3}{9} = -\\dfrac{1}{3}", note: "el resultado puede ser negativo" },
          ],
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
          message: "Necesitas trozos del mismo tamaño para las dos fracciones. El denominador común más pequeño es el m.c.m.",
        },
        {
          label: "Cuánto amplificar",
          message: "Divide el m.c.m. entre el denominador de cada fracción: ese es el factor por el que multiplicas arriba y abajo.",
        },
      ],
      title: "Con distinto denominador: el m.c.m.",
      blocks: [
        {
          kind: "steps",
          items: [
            "Halla el **m.c.m.** de los denominadores.",
            "Amplifica cada fracción hasta ese denominador.",
            "Suma o resta los numeradores.",
            "Simplifica el resultado.",
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
      id: "varios-terminos",
      type: "slide",
      help: [
        {
          label: "Un solo denominador",
          message: "Con varios términos, busca el m.c.m. de todos los denominadores a la vez y pasa todo a ese denominador.",
        },
        {
          label: "Cuidado con los signos",
          message: "Un signo menos delante de una fracción afecta a todo su numerador: $-\\frac{25}{60}$ resta $25$ sesentavos.",
        },
      ],
      title: "Sumas y restas con varios términos",
      blocks: [
        {
          kind: "example",
          title: "7/10 − 5/12 + 2",
          lines: [
            { math: "\\text{m.c.m.}(10, 12, 1) = 60" },
            { math: "\\dfrac{7}{10} - \\dfrac{5}{12} + 2 = \\dfrac{42}{60} - \\dfrac{25}{60} + \\dfrac{120}{60}" },
            { math: "= \\dfrac{42 - 25 + 120}{60} = \\dfrac{137}{60}" },
          ],
        },
        {
          kind: "warning",
          text: "Un número entero también se amplifica: $2 = \\frac{2}{1} = \\frac{120}{60}$. No se queda suelto al pasar a común denominador.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-resta",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Común denominador",
          message: "$\\text{m.c.m.}(4, 6) = 12$. Pasa $\\frac{3}{4}$ a $\\frac{9}{12}$ y $\\frac{5}{6}$ a $\\frac{10}{12}$.",
        },
      ],
      title: "Suma con distinto denominador",
      question: "Calcula $\\dfrac{3}{4} + \\dfrac{5}{6}$ y simplifica.",
      correctAnswers: ["19/12"],
      explanation: "$\\frac{9}{12} + \\frac{10}{12} = \\frac{19}{12}$, que ya es irreducible.",
    },
    {
      id: "check-simplificar",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Denominador común",
          message: "$\\text{m.c.m.}(6, 9) = 18$: $\\frac{5}{6} = \\frac{15}{18}$ y $\\frac{4}{9} = \\frac{8}{18}$.",
        },
      ],
      title: "Resta y simplifica",
      question: "Calcula $\\dfrac{5}{6} - \\dfrac{4}{9}$ y da la fracción irreducible.",
      correctAnswers: ["7/18"],
      explanation: "$\\frac{15}{18} - \\frac{8}{18} = \\frac{7}{18}$.",
    },
    {
      id: "check-tres",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "m.c.m. de tres",
          message: "$\\text{m.c.m.}(3, 4, 6) = 12$. Los numeradores quedan $8$, $9$ y $10$.",
        },
      ],
      title: "Tres términos",
      question: "Calcula $\\dfrac{2}{3} + \\dfrac{3}{4} - \\dfrac{5}{6}$ y da la fracción irreducible.",
      correctAnswers: ["7/12"],
      explanation: "$\\frac{8}{12} + \\frac{9}{12} - \\frac{10}{12} = \\frac{7}{12}$.",
    },
    {
      id: "check-error",
      type: "predict",
      help: [
        {
          label: "Prueba con números sencillos",
          message: "$\\frac{1}{2} + \\frac{1}{2}$ debe dar $1$. ¿Qué daría sumando denominadores?",
        },
      ],
      title: "Detecta el error",
      question: "Un alumno escribe $\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{2}{7}$. ¿Qué ha hecho mal?",
      mode: "choice",
      choices: [
        { id: "den", label: "Ha sumado también los denominadores en lugar de buscar un denominador común" },
        { id: "num", label: "Ha sumado mal los numeradores", incorrectFeedback: "Los numeradores sí suman $2$, pero eso solo vale con el mismo denominador." },
        { id: "bien", label: "Está bien hecho", incorrectFeedback: "El resultado $\\frac{2}{7}$ es menor que $\\frac{1}{3}$: una suma de positivos no puede dar menos que un sumando." },
      ],
      correctChoiceId: "den",
      shuffleChoices: true,
      explanation: "Lo correcto es $\\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$.",
    },
  ],
};
