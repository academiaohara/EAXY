import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaEnteros2esoLesson: InteractiveLesson = {
  slug: "suma-resta-enteros-2eso",
  title: "6. Suma y resta de números enteros",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reglas",
      type: "slide",
      help: [
        {
          label: "Ingresos y gastos",
          message: "Un entero positivo es un ingreso y uno negativo, un gasto. Sumar dos gastos es gastar más; un ingreso y un gasto se compensan en parte.",
        },
        {
          label: "Resta como suma",
          message: "Restar un número es sumar su opuesto: $3 - 7 = 3 + (-7)$.",
        },
      ],
      title: "Reglas de la suma y la resta",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Mismo signo",
            text: "Se **suman** los valores absolutos y se pone el **signo común**.",
            math: ["+3 + 5 = +8", "-4 - 2 = -6"],
            tone: "ok",
          },
          right: {
            title: "Distinto signo",
            text: "Se **restan** los valores absolutos y se pone el signo del **mayor**.",
            math: ["-3 + 8 = +5", "+3 - 7 = -4"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "suma-recta", params: { a: -3, b: 8 } },
    },
    {
      id: "check-mental",
      type: "fill_in_blank",
      help: [
        {
          label: "Distinto signo",
          message: "Resta los valores absolutos ($17 - 12 = 5$) y pon el signo del mayor, que es el positivo.",
        },
      ],
      title: "Cálculo mental",
      question: "Calcula $-12 + 17$ (escribe el número con su signo)",
      correctAnswers: ["5", "+5"],
      explanation: "Signos distintos: $17 - 12 = 5$, con el signo del mayor ($+$).",
    },
    {
      id: "varios",
      type: "slide",
      help: [
        {
          label: "Por qué se puede reordenar",
          message: "La suma es conmutativa: $8 - 6 + 3 - 7 = 8 + 3 - 6 - 7$ (cada número lleva su signo).",
        },
        {
          label: "Dos caminos",
          message: "Puedes ir de izquierda a derecha o agrupar. El resultado es el mismo.",
        },
      ],
      title: "Varios números: positivos por un lado, negativos por otro",
      blocks: [
        {
          kind: "steps",
          items: [
            "Suma los números **positivos**.",
            "Suma los números **negativos** (por su valor absoluto).",
            "**Réstalos** y pon el signo del que tenga mayor valor absoluto.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "8 - 6 + 3 - 7 = (8 + 3) - (6 + 7) = 11 - 13 = -2" },
            { math: "-15 - 4 + 12 - 3 - 11 - 2 = 12 - 35 = -23" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-varios",
      type: "fill_in_blank",
      help: [
        {
          label: "Agrupa",
          message: "Positivos: $3 + 4 + 13 = 20$. Negativos: $9 + 8 + 2 = 19$.",
        },
      ],
      title: "Varios sumandos",
      question: "Calcula $3 - 9 + 4 - 8 - 2 + 13$ (escribe el número con su signo)",
      correctAnswers: ["1", "+1"],
      explanation: "$(3 + 4 + 13) - (9 + 8 + 2) = 20 - 19 = 1$.",
    },
    {
      id: "parentesis",
      type: "slide",
      help: [
        {
          label: "Por qué cambian",
          message: "Restar un grupo es restar cada uno de sus términos: $-(-3 + 8 - 2)$ resta $-3$ (equivale a sumar $3$), resta $8$ y resta $-2$ (equivale a sumar $2$).",
        },
      ],
      title: "Quitar paréntesis",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Precedido de +",
            text: "Los signos de dentro **no cambian**.",
            math: ["+(-3 + 8 - 2) = -3 + 8 - 2"],
            tone: "ok",
          },
          right: {
            title: "Precedido de −",
            text: "Se **cambian todos** los signos de dentro.",
            math: ["-(-3 + 8 - 2) = +3 - 8 + 2"],
            tone: "warn",
          },
        },
        {
          kind: "example",
          lines: [
            { math: "+(+4) + (-7) - (+3) - (-5) = 4 - 7 - 3 + 5 = -1" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "parentesis-signos", params: { sign: "-", nums: [-3, 8, -2] } },
    },
    {
      id: "check-parentesis",
      type: "predict",
      help: [
        {
          label: "Signo menos delante",
          message: "$-(2 - 7 + 3)$ cambia cada signo: $-2 + 7 - 3$.",
        },
      ],
      title: "Quitar paréntesis",
      question: "¿A qué es igual $9 - (2 - 7 + 3) + (-2 + 6)$?",
      mode: "choice",
      choices: [
        { id: "15", label: "$15$" },
        { id: "9", label: "$9$", incorrectFeedback: "El signo menos delante del primer paréntesis cambia todos sus términos." },
        { id: "-3", label: "$-3$", incorrectFeedback: "$-(2 - 7 + 3) = -2 + 7 - 3$, y se suma $-2 + 6$." },
        { id: "11", label: "$11$", incorrectFeedback: "Comprueba: $9 - (-2) + 4 = 9 + 2 + 4$." },
      ],
      correctChoiceId: "15",
      shuffleChoices: true,
      explanation: "Dos caminos: $9 - 2 + 7 - 3 - 2 + 6 = 22 - 7 = 15$; o $9 - (-2) + (+4) = 9 + 2 + 4 = 15$.",
    },
    {
      id: "corchetes",
      type: "slide",
      help: [
        {
          label: "De dentro hacia fuera",
          message: "En la segunda forma se opera siempre el grupo más interior primero: $(8 - 2)$, luego el corchete, luego la resta.",
        },
        {
          label: "Mismo resultado",
          message: "Con cualquiera de las dos formas sale $-5$. Elige la que te dé menos riesgo de equivocarte con los signos.",
        },
      ],
      title: "Paréntesis y corchetes",
      blocks: [
        {
          kind: "text",
          text: "Los corchetes agrupan paréntesis. Se pueden resolver de dos formas: **quitando paréntesis** o **operando dentro** primero.",
        },
        {
          kind: "example",
          title: "6 − [5 + (8 − 2)]",
          lines: [
            { math: "6 - [5 + 8 - 2] = 6 - 5 - 8 + 2 = -5", note: "quitando paréntesis" },
            { math: "6 - [5 + (+6)] = 6 - [+11] = -5", note: "operando dentro" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Quitando paréntesis", "Operando dentro"],
          expr: [
            { tokens: ["6", "−", "[5", "+", "(8", "−", "2)]"], note: "quitamos los paréntesis de dentro hacia fuera." },
            { tokens: ["6", "−", "[5", "+", "8", "−", "2]"], active: [1, 6], note: "el menos delante del corchete cambia todos los signos." },
            { tokens: ["6", "−", "5", "−", "8", "+", "2"], active: [0, 6], note: "$6 + 2 = 8$ y $5 + 8 = 13$." },
            { tokens: ["−5"], fresh: [0, 0], note: "$8 - 13 = -5$." },
          ],
          expr2: [
            { tokens: ["6", "−", "[5", "+", "(8", "−", "2)]"], note: "empezamos por el paréntesis." },
            { tokens: ["6", "−", "[5", "+", "6]"], active: [2, 4], note: "$8 - 2 = 6$." },
            { tokens: ["6", "−", "11"], active: [0, 2], note: "$5 + 6 = 11$." },
            { tokens: ["−5"], fresh: [0, 0], note: "$6 - 11 = -5$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-corchete",
      type: "fill_in_blank",
      help: [
        {
          label: "Primero lo de dentro",
          message: "Se opera de dentro hacia fuera: $13 - 4 = 9$, después $8 - 9$ y por último la suma con $-9$.",
        },
      ],
      title: "Un corchete",
      question: "Calcula $-9 + [8 - (13 - 4)]$ (escribe el número con su signo)",
      correctAnswers: ["-10", "−10"],
      explanation: "$13 - 4 = 9$; $8 - 9 = -1$; $-9 + (-1) = -10$.",
    },
  ],
};
