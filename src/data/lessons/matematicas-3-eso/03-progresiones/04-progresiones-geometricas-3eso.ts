import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const progresionesGeometricas3esoLesson: InteractiveLesson = {
  slug: "progresiones-geometricas-3eso",
  title: "4. Progresiones geométricas",
  subtitle: TEMA_3ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Cociente constante",
          message: "Divide cada término entre el anterior: si siempre sale lo mismo, es una progresión geométrica y ese cociente es la razón.",
        },
        {
          label: "Razón negativa",
          message: "Con $r < 0$ los términos alternan de signo; con $|r| < 1$ se acercan a $0$.",
        },
      ],
      title: "Multiplicar siempre por lo mismo",
      blocks: [
        {
          kind: "definition",
          text: "Una **progresión geométrica** es una sucesión en la que se pasa de cada término al siguiente **multiplicando por un número fijo** $r$, la **razón**.",
        },
        {
          kind: "example",
          lines: [
            { math: "3, 6, 12, 24, 48, \\dots \\quad r = 2" },
            { math: "3, 30, 300, 3\\,000, \\dots \\quad r = 10" },
            { math: "80, -40, 20, -10, 5, \\dots \\quad r = -\\dfrac{1}{2}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "progresion-pasos", params: { a: 3, b: 2, c: 5, d: 25, prog: "geometrica" } },
    },
    {
      id: "termino-general",
      type: "slide",
      help: [
        {
          label: "Cuenta los pasos",
          message: "De $a_1$ a $a_{25}$ hay $24$ pasos, y cada uno multiplica por $r$: se multiplica $24$ veces, es decir, por $r^{24}$.",
        },
        {
          label: "Crece muy deprisa",
          message: "Con $r = 2$ el término $25$ ya supera los cincuenta millones. Las progresiones geométricas crecen (o decrecen) muy rápido.",
        },
      ],
      title: "Término general de una progresión geométrica",
      blocks: [
        {
          kind: "rule",
          text: "Para pasar de $a_1$ a $a_n$ se dan $n-1$ pasos, y cada uno multiplica por $r$:",
          formula: "a_n = a_1 \\cdot r^{\\,n-1}",
        },
        {
          kind: "example",
          title: "5, 15, 45, 135, … (a₁ = 5, r = 3)",
          lines: [
            { math: "a_n = 5 \\cdot 3^{n-1}" },
            { math: "a_{100} = 5 \\cdot 3^{99}" },
          ],
        },
        {
          kind: "warning",
          text: "En $a_1 \\cdot r^{n-1}$ el exponente es $n-1$ y la potencia se calcula **antes** de multiplicar por $a_1$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "hallar-razon",
      type: "slide",
      help: [
        {
          label: "Divide",
          message: "$r = \\frac{a_2}{a_1}$, el cociente de dos términos consecutivos.",
        },
        {
          label: "Comprueba",
          message: "Multiplica cada término por $r$: debe dar el siguiente.",
        },
      ],
      title: "Hallar la razón",
      blocks: [
        {
          kind: "example",
          title: "a₁ = 250 y a₂ = 300",
          lines: [
            { math: "a_2 = a_1 \\cdot r \\ \\Rightarrow\\  r = \\dfrac{300}{250} = 1{,}2" },
            { math: "a_n = 250 \\cdot 1{,}2^{\\,n-1}" },
            { math: "a_6 = 250 \\cdot 1{,}2^{5} = 622{,}08" },
          ],
        },
        {
          kind: "text",
          text: "Con $r = 1{,}2$ cada término es un $20\\,\\%$ mayor que el anterior: crecer un porcentaje fijo es una progresión geométrica.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-razon",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cociente",
          message: "$r = \\frac{20}{40}$, que es igual a $\\frac{10}{20}$.",
        },
      ],
      title: "La razón",
      question: "En la progresión $40, 20, 10, 5, \\dots$, ¿cuánto vale la razón $r$? (en decimal)",
      correctAnswers: ["0,5", "0.5", "1/2"],
      explanation: "$r = \\frac{20}{40} = 0{,}5$.",
    },
    {
      id: "check-general",
      type: "predict",
      help: [
        {
          label: "Primer término y razón",
          message: "$a_1 = 5$ y $r = 10$ porque $50 : 5 = 10$.",
        },
      ],
      title: "Término general",
      question: "¿Cuál es el término general de la progresión geométrica $5, 50, 500, 5\\,000, \\dots$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$a_n = 5 \\cdot 10^{n-1}$" },
        { id: "b", label: "$a_n = 5 \\cdot 10^{n}$", incorrectFeedback: "Daría $a_1 = 50$, pero el primer término es $5$." },
        { id: "c", label: "$a_n = 5 + 45(n-1)$", incorrectFeedback: "Eso es una progresión aritmética: aquí se multiplica, no se suma." },
        { id: "d", label: "$a_n = 10 \\cdot 5^{n-1}$", incorrectFeedback: "Se han cambiado $a_1$ y $r$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$a_1 = 5$ y $r = 10$, así que $a_n = 5 \\cdot 10^{n-1}$.",
    },
    {
      id: "check-termino",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Pasos",
          message: "Hasta $a_6$ hay $5$ pasos: $5 \\cdot 2^5$.",
        },
      ],
      title: "Un término concreto",
      question: "En una progresión geométrica $a_1 = 5$ y $r = 2$. Calcula $a_6$ (solo el número).",
      correctAnswers: ["160"],
      explanation: "$a_6 = 5 \\cdot 2^{5} = 160$.",
    },
    {
      id: "check-distinguir",
      type: "predict",
      help: [
        {
          label: "Diferencias y cocientes",
          message: "Prueba con las diferencias entre términos y con los cocientes: una de las dos es constante.",
        },
      ],
      title: "¿Aritmética o geométrica?",
      question: "¿Qué tipo de progresión es $2, 6, 18, 54, \\dots$?",
      mode: "choice",
      choices: [
        { id: "geo", label: "Geométrica de razón $3$" },
        { id: "arit", label: "Aritmética de diferencia $4$", incorrectFeedback: "Las diferencias son $4, 12, 36$: no son constantes. Los cocientes sí lo son." },
        { id: "ninguna", label: "Ninguna de las dos", incorrectFeedback: "Cada término es el triple del anterior." },
      ],
      correctChoiceId: "geo",
      shuffleChoices: true,
      explanation: "$6 : 2 = 18 : 6 = 54 : 18 = 3$: se multiplica siempre por $3$.",
    },
  ],
};
