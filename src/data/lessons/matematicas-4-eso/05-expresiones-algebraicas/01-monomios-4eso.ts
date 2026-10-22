import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const monomios4esoLesson: InteractiveLesson = {
  slug: "monomios-4eso",
  title: "1. Monomios: coeficiente, grado y valor numérico",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Las letras son números",
          message: "Las letras representan números cuyo valor no conocemos (o puede cambiar). Por eso conservan todas las propiedades de los números y de sus operaciones.",
        },
        {
          label: "Un número también",
          message: "Un número solo, como $5$, es un monomio de **grado 0**, porque $5 = 5x^0$.",
        },
      ],
      title: "Un monomio: un número por letras",
      blocks: [
        {
          kind: "definition",
          text: "Un **monomio** es el producto indicado de un número por una o más letras. El número es el **coeficiente**; las letras con sus exponentes forman la **parte literal**.",
        },
        {
          kind: "rule",
          title: "Grado",
          text: "El **grado** de un monomio es el número de factores de su parte literal, es decir, la **suma de los exponentes**.",
        },
        {
          kind: "example",
          lines: [
            { math: "-5x^2y:\\ \\text{coeficiente } -5,\\ \\text{parte literal } x^2y,\\ \\text{grado } 3" },
            { math: "5:\\ \\text{coeficiente } 5,\\ \\text{sin parte literal},\\ \\text{grado } 0" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "monomio-partes" },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Grado",
          message: "Suma los exponentes de todas las letras: $x^2y$ tiene grado $2 + 1 = 3$. Si no hay letras, el grado es $0$.",
        },
        {
          label: "Semejantes",
          message: "Dos monomios son **semejantes** cuando tienen idéntica parte literal: $7x^2$ y $x^2$ lo son; $7x^2$ y $7x^3$ no.",
        },
      ],
      title: "Explora: coeficiente, grado y semejanza",
      blocks: [
        {
          kind: "text",
          text: "Cambia el coeficiente y los exponentes. La herramienta te dice el **grado**, el **valor numérico** y si el monomio es semejante a otros.",
        },
        {
          kind: "warning",
          text: "El coeficiente **no** influye en el grado: $100x$ tiene grado $1$ y $x^5$ tiene grado $5$.",
        },
      ],
      visual: { kind: "tool", tool: "monomio-explorador", params: { a: -5, b: 2, c: 1 }, hint: "Pon el exponente de y a 0: ¿qué cambia en el grado y en la semejanza?" },
    },
    {
      id: "check-grado",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Un solo factor",
          message: "En $-2x^7$ el único factor literal es $x^7$: su grado es el exponente, $7$.",
        },
      ],
      title: "El grado",
      question: "¿Cuál es el grado del monomio $-2x^{7}$? (solo el número)",
      correctAnswers: ["7"],
      explanation: "El coeficiente es $-2$, la parte literal es $x^7$ y el grado es $7$.",
    },
    {
      id: "check-grado-0",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "x⁰ = 1",
          message: "Un número es un monomio sin letras: $5 = 5 \\cdot x^0$.",
        },
      ],
      title: "Un número como monomio",
      question: "¿Cuál es el grado del monomio $5$ (un número sin letras)?",
      choices: [
        { id: "a", label: "$0$" },
        { id: "b", label: "$1$", incorrectFeedback: "El grado cuenta letras (con sus exponentes). Aquí no hay ninguna." },
        { id: "c", label: "$5$", incorrectFeedback: "Eso es el coeficiente, no el grado." },
        { id: "d", label: "No tiene grado", incorrectFeedback: "Sí lo tiene: es un monomio de grado $0$, pues $5 = 5x^0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$5 = 5x^0$: es un monomio de grado $0$.",
    },
    {
      id: "semejantes",
      type: "slide",
      help: [
        {
          label: "Mismas letras, mismos exponentes",
          message: "Para ser semejantes, las letras **y sus exponentes** deben coincidir. El coeficiente es lo único que puede cambiar.",
        },
        {
          label: "Para qué sirve",
          message: "Solo se pueden sumar y restar monomios **semejantes**: como sumar manzanas con manzanas.",
        },
      ],
      title: "Monomios semejantes",
      blocks: [
        {
          kind: "definition",
          text: "Dos monomios son **semejantes** cuando tienen **idéntica parte literal**. Pueden diferir en el coeficiente.",
        },
        {
          kind: "example",
          lines: [
            { math: "2x,\\ -5x,\\ \\tfrac{3}{4}x,\\ x \\quad \\text{semejantes}" },
            { math: "5x^2,\\ \\sqrt{2}x^2,\\ \\tfrac{3}{5}x^2,\\ x^2 \\quad \\text{semejantes}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "semejantes-agrupar", params: { a: 3, b: 2, c: 2 } },
    },
    {
      id: "check-semejantes",
      type: "classify",
      help: [
        {
          label: "Compara la parte literal",
          message: "Semejantes a $5x^2$: la parte literal debe ser exactamente $x^2$. $5x^3$ tiene otro exponente; $5xy$ lleva una $y$; $3x^2y$ también.",
        },
      ],
      title: "¿Semejantes a 5x²?",
      question: "Indica cuáles de estos monomios son semejantes a $5x^2$.",
      groups: [
        { id: "si", label: "Semejante a $5x^2$", tone: "emerald" },
        { id: "no", label: "No semejante", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$7x^2$", group: "si" },
        { id: "b", text: "$5x^3$", group: "no" },
        { id: "c", text: "$5x$", group: "no" },
        { id: "d", text: "$5xy$", group: "no" },
        { id: "e", text: "$x^2$", group: "si" },
        { id: "f", text: "$3x^2y$", group: "no" },
      ],
      hint: "El coeficiente no importa: solo las letras con sus exponentes.",
    },
    {
      id: "valor",
      type: "slide",
      help: [
        {
          label: "Sustituir y operar",
          message: "Se sustituye cada letra por su valor, con **paréntesis** si el valor es negativo, y se calcula respetando la jerarquía: primero las potencias.",
        },
      ],
      title: "Valor numérico",
      blocks: [
        {
          kind: "definition",
          text: "El **valor numérico** de un monomio es el número que resulta de sustituir cada letra por un número y operar.",
        },
        {
          kind: "example",
          lines: [
            { math: "3xy \\ \\text{para}\\ x = 2,\\ y = -5:\\quad 3 \\cdot 2 \\cdot (-5) = -30" },
            { math: "xy^2 \\ \\text{para}\\ x = 3,\\ y = -2:\\quad 3 \\cdot (-2)^2 = 12" },
          ],
        },
        {
          kind: "warning",
          text: "Con valores negativos, **pon paréntesis**: $y^2$ con $y = -2$ es $(-2)^2 = 4$, no $-2^2 = -4$.",
        },
      ],
      visual: { kind: "tool", tool: "monomio-explorador", params: { a: 1, b: 1, c: 2 }, hint: "Prueba y = −3 y luego y = 3: ¿cambia el valor de xy²? ¿Y si el exponente de y es 1?" },
    },
    {
      id: "check-valor-1",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Con signo",
          message: "$2xy$ para $x = 3$, $y = -2$: $2 \\cdot 3 \\cdot (-2)$.",
        },
      ],
      title: "Un valor numérico",
      question: "Calcula el valor de $2xy$ para $x = 3$, $y = -2$. (escribe el número con su signo)",
      correctAnswers: ["-12", "−12"],
      explanation: "$2 \\cdot 3 \\cdot (-2) = -12$.",
    },
    {
      id: "check-valor-2",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Potencia primero",
          message: "$(-2)^2 = 4$ y luego $3 \\cdot 4$.",
        },
      ],
      title: "Con un cuadrado",
      question: "Calcula el valor de $xy^2$ para $x = 3$, $y = -2$. (escribe el número con su signo)",
      correctAnswers: ["12", "+12"],
      explanation: "$3 \\cdot (-2)^2 = 3 \\cdot 4 = 12$.",
    },
    {
      id: "geometria",
      type: "slide",
      help: [
        {
          label: "Un cubo y su cara",
          message: "En un cubo de arista $x$: cada cara es un cuadrado de área $x^2$ y hay $6$, así que la superficie es $6x^2$ y el volumen $x^3$.",
        },
      ],
      title: "Monomios en la geometría",
      blocks: [
        {
          kind: "text",
          text: "Muchas fórmulas geométricas son monomios en las medidas.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{cuadrado: } A = x^2,\\ P = 4x" },
            { tex: "\\text{rectángulo: } A = xy" },
            { tex: "\\text{cubo: } V = x^3,\\ S = 6x^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-ortoedro",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Área de la base",
          message: "La base es un cuadrado de lado $x$: área $x^2$. El volumen es área de la base por altura.",
        },
      ],
      title: "Un ortoedro",
      question: "La base de un ortoedro es un cuadrado de lado $x$ y su altura es $y$. ¿Cuál es su volumen?",
      choices: [
        { id: "a", label: "$x^2y$" },
        { id: "b", label: "$xy$", incorrectFeedback: "Eso es el área de una cara lateral (lado $x$ por altura $y$), no el volumen." },
        { id: "c", label: "$4xy$", incorrectFeedback: "Eso sería el área lateral total (cuatro caras), no el volumen." },
        { id: "d", label: "$x^2 + y$", incorrectFeedback: "Un volumen es un **producto** de tres medidas: $x \\cdot x \\cdot y$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Área de la base $x \\cdot x = x^2$, por la altura $y$: $V = x^2y$.",
    },
  ],
};
