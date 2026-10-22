import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadSimple4esoLesson: InteractiveLesson = {
  slug: "proporcionalidad-simple-4eso",
  title: "1. Proporcionalidad simple: directa e inversa",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "directa",
      type: "slide",
      help: [
        {
          label: "Cómo saber que es directa",
          message: "Si al **duplicar** una magnitud se duplica la otra (al triplicar, se triplica…), son directamente proporcionales. Su cociente es constante.",
        },
        {
          label: "Regla de tres",
          message: "Se colocan los datos en dos filas y se iguala la razón: $\\frac{5}{45} = \\frac{3}{x}$, de donde $x = \\frac{45 \\cdot 3}{5}$.",
        },
      ],
      title: "Directa: más… más",
      blocks: [
        {
          kind: "text",
          text: "Dos magnitudes son **directamente proporcionales** si, al multiplicar una por un número, la otra queda multiplicada por **el mismo** número. Más cantidad, más precio.",
        },
        {
          kind: "rule",
          title: "Regla de tres directa",
          formula: "\\dfrac{A_1}{B_1} = \\dfrac{A_2}{B_2} \\quad\\Rightarrow\\quad x = \\dfrac{B_1 \\cdot A_2}{A_1}",
        },
        {
          kind: "example",
          lines: [
            { math: "5\\ \\text{entradas} \\to 45\\ € \\qquad 3\\ \\text{entradas} \\to x" },
            { math: "x = \\dfrac{45 \\cdot 3}{5} = 27\\ €" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "regla-tres-cruz", params: { a: 5, b: 45, c: 3, titles: ["Entradas", "Precio (€)"], unit: "€" } },
    },
    {
      id: "inversa",
      type: "slide",
      help: [
        {
          label: "Cómo saber que es inversa",
          message: "Si al **duplicar** una magnitud la otra se reduce a la **mitad**, son inversamente proporcionales. Su producto es constante.",
        },
        {
          label: "No es lo mismo menos",
          message: "Que una crezca y la otra decrezca no basta: tiene que cambiar **en la misma proporción**. Las edades y la altura no son inversas.",
        },
      ],
      title: "Inversa: más… menos",
      blocks: [
        {
          kind: "text",
          text: "Son **inversamente proporcionales** si, al multiplicar una por un número, la otra queda **dividida** por ese número. Más vacas, menos días de pasto.",
        },
        {
          kind: "rule",
          title: "Regla de tres inversa",
          formula: "A_1 \\cdot B_1 = A_2 \\cdot B_2 \\quad\\Rightarrow\\quad x = \\dfrac{A_1 \\cdot B_1}{A_2}",
        },
        {
          kind: "example",
          lines: [
            { math: "35\\ \\text{vacas} \\to 60\\ \\text{días} \\qquad 20\\ \\text{vacas} \\to x" },
            { math: "x = \\dfrac{35 \\cdot 60}{20} = 105\\ \\text{días}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "regla-tres-producto", params: { a: 35, b: 60, c: 20, titles: ["Vacas", "Días"], unit: "días" } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Las gráficas",
          message: "La directa es una **recta** que pasa por el origen. La inversa es una **hipérbola**: baja sin cortar nunca los ejes.",
        },
      ],
      title: "Explora: recta frente a hipérbola",
      blocks: [
        {
          kind: "text",
          text: "Cambia el tipo de relación y los datos. En la **directa** el cociente B/A no varía y los puntos están en una recta; en la **inversa** el producto A·B no varía y los puntos forman una curva.",
        },
        {
          kind: "warning",
          text: "Antes de hacer la regla de tres, decide **si es directa o inversa**: pregúntate qué le pasa a una magnitud cuando la otra aumenta.",
        },
      ],
      visual: { kind: "tool", tool: "proporcion-explorador", params: { a: 5, b: 45, c: 3 }, hint: "Con la relación inversa, sube el nuevo valor de A y mira cómo baja x." },
    },
    {
      id: "check-tipo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Un truco",
          message: "Inventa un caso extremo: si duplicas los operarios, ¿se duplican o se reducen a la mitad las horas?",
        },
      ],
      title: "¿Directa o inversa?",
      question: "Cinco operarios descargan un camión en $45$ minutos. ¿Cómo son el número de operarios y el tiempo?",
      choices: [
        { id: "inv", label: "Inversamente proporcionales" },
        { id: "dir", label: "Directamente proporcionales", incorrectFeedback: "Con más operarios el trabajo se hace **antes**: una magnitud crece y la otra decrece." },
        { id: "ninguna", label: "No son proporcionales", incorrectFeedback: "Con el doble de operarios (trabajando igual) se tarda la mitad: sí son proporcionales, de forma inversa." },
      ],
      correctChoiceId: "inv",
      shuffleChoices: true,
      explanation: "Más operarios, menos tiempo, y en la misma proporción: $5 \\cdot 45 = n \\cdot t$ es constante.",
    },
    {
      id: "check-operarios",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Producto constante",
          message: "$5 \\cdot 45 = 3 \\cdot x$, luego $x = 225 : 3$.",
        },
      ],
      title: "Con menos operarios",
      question: "Cinco operarios descargan un camión en $45$ min. ¿Cuántos minutos tardarían $3$ operarios? (solo el número)",
      correctAnswers: ["75"],
      explanation: "Inversa: $x = \\frac{5 \\cdot 45}{3} = 75$ minutos.",
    },
    {
      id: "check-cajas",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Peso de una caja",
          message: "$1\\,500 : 10 = 150$ g cada caja. Tres cajas: $3 \\cdot 150$.",
        },
      ],
      title: "Cajas de galletas",
      question: "$10$ cajas de galletas pesan $1\\,500$ g. ¿Cuántos gramos pesan $3$ cajas? (solo el número)",
      correctAnswers: ["450"],
      explanation: "Directa: $x = \\frac{1\\,500 \\cdot 3}{10} = 450$ g.",
    },
    {
      id: "check-furgoneta",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Más velocidad, menos tiempo",
          message: "Velocidad y tiempo (misma distancia) son inversas: $60 \\cdot 20 = 80 \\cdot x$.",
        },
      ],
      title: "Una furgoneta",
      question: "A $60$ km/h una furgoneta tarda $20$ min de un pueblo al vecino. ¿Cuántos minutos tardaría a $80$ km/h? (solo el número)",
      correctAnswers: ["15"],
      explanation: "Inversa: $x = \\frac{60 \\cdot 20}{80} = 15$ min.",
    },
    {
      id: "check-hortelano",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Menos terreno, más días",
          message: "El agua dura más si se riega menos terreno: es inversa. $2 \\cdot 3 = 1{,}2 \\cdot x$.",
        },
      ],
      title: "Agua para regar",
      question: "Un hortelano tiene agua para regar un campo de $2$ ha durante $3$ días. ¿Cuántos días le duraría si regase solo $1{,}2$ ha? (solo el número)",
      correctAnswers: ["5"],
      explanation: "Inversa: $x = \\frac{2 \\cdot 3}{1{,}2} = 5$ días.",
    },
    {
      id: "check-pan",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Primero al día",
          message: "$132 : 3 = 44$ barras al día; en una semana ($7$ días) son $308$ barras. Después multiplica por $0{,}35$.",
        },
      ],
      title: "Presupuesto del comedor",
      question: "En el comedor se consumen $132$ barras de pan en $3$ días. Una barra cuesta $0{,}35$ €. ¿Qué presupuesto semanal ($7$ días) hace falta, en euros? (escribe el número con coma)",
      correctAnswers: ["107,8", "107.8", "107,80"],
      explanation: "$132 : 3 \\cdot 7 = 308$ barras; $308 \\cdot 0{,}35 = 107{,}80$ €.",
    },
  ],
};
