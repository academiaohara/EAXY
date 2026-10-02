import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen y sistemas de numeración",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "origen",
      type: "concept",
      title: "¿Para qué sirve un sistema de numeración?",
      content: [
        "Los números surgen de la necesidad de contar. Cada cultura inventó símbolos y reglas para escribirlos y operar con ellos.",
        "Algunos sistemas son **aditivos**: se suman símbolos (egipcio, romano). Otros son **posicionales**: el valor de una cifra depende del lugar que ocupa (decimal).",
        "El sistema romano es aditivo con restas en casos como IV o XC. Sumar o multiplicar con él es incómodo; por eso hoy usamos el **sistema decimal**.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Tres formas de escribir números",
          items: [
            {
              title: "Egipcio (aditivo)",
              math: "47 = \\text{símbolos repetidos}",
              caption: "Se van añadiendo signos hasta completar la cantidad.",
              tone: "amber",
            },
            {
              title: "Romano (aditivo con restas)",
              math: "\\text{XIV} = 14,\\; \\text{XC} = 90",
              caption: "A la izquierda de un signo mayor, el menor resta.",
              tone: "violet",
            },
            {
              title: "Decimal (posicional)",
              math: "47 = 4\\cdot 10 + 7",
              caption: "Diez unidades de un orden forman una del orden superior.",
              tone: "emerald",
            },
          ],
        },
      ],
    },
    {
      id: "decimal",
      type: "concept",
      title: "El sistema decimal",
      content: [
        "Usamos diez cifras: $0, 1, 2, \\ldots, 9$. Cada posición es un orden (unidades, decenas, centenas…).",
        "Es un **sistema posicional**: la cifra $3$ en $353\\,18$ vale $30\\,000$ en las decenas de millar, $300$ en las centenas y $3$ en las unidades.",
        "Diez unidades de un orden cualquiera equivalen a una unidad del orden inmediato superior: $10$ unidades $= 1$ decena, $10$ decenas $= 1$ centena, etc.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Descomponiendo $35\\,318$",
          rows: ["3\\cdot 10\\,000", "5\\cdot 1\\,000", "3\\cdot 100", "1\\cdot 10", "8\\cdot 1"],
          operator: "+",
          result: "35\\,318",
          caption: "Cada cifra multiplica a la potencia de $10$ de su columna.",
        },
      ],
    },
    {
      id: "romano-animado",
      type: "animated_solution",
      title: "Del romano al decimal",
      content: [
        "Traducir números romanos es repasar las reglas aditivas. Pulsa el botón «Ver siguiente paso» para avanzar.",
      ],
      frames: [
        {
          caption: "MCCLXXX: leemos de izquierda a derecha, sumando y restando:",
          math: "1000 + 100 + 100 + 50 + 10 + 10 + 10 = 1280",
        },
        {
          caption: "XIV: la I a la izquierda de V resta:",
          math: "10 + (5 - 1) = 14",
        },
        {
          caption: "XC: la X a la izquierda de C resta:",
          math: "(100 - 10) = 90",
        },
        {
          caption: "Comprobación en decimal:",
          math: "1280 + 14 + 90 = 1384",
        },
      ],
    },
    {
      id: "check-posicional",
      type: "classify",
      title: "Comprueba lo aprendido",
      question: "¿Cada rasgo es propio de un sistema posicional como el decimal o de uno aditivo como el egipcio o el romano?",
      groups: [
        { id: "posicional", label: "Posicional (decimal)", tone: "emerald" },
        { id: "aditivo", label: "Aditivo (egipcio, romano)", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El valor de una cifra depende de la posición que ocupa", group: "posicional" },
        { id: "b", text: "En $353$, el primer $3$ vale $300$ y el último vale $3$", group: "posicional" },
        { id: "c", text: "Diez unidades de un orden forman una del orden superior", group: "posicional" },
        { id: "d", text: "Se repiten símbolos y se suman sus valores", group: "aditivo" },
        { id: "e", text: "$\\text{XXX} = 10 + 10 + 10 = 30$", group: "aditivo" },
        { id: "f", text: "Se van añadiendo signos hasta completar la cantidad", group: "aditivo" },
      ],
      hint: "En un sistema posicional importa **dónde** está cada cifra; en uno aditivo, **cuántos** símbolos hay.",
      explanation:
        "En el decimal, la misma cifra puede valer unidades, decenas o millares según la columna en la que esté. En los aditivos, la cantidad se forma sumando el valor de los símbolos.",
    },
    {
      id: "check-ordenes",
      type: "fill_in_blank",
      title: "Órdenes y equivalencias",
      question: "¿Cuántas decenas hay en $3$ unidades de millar? Escribe solo el número.",
      correctAnswers: ["300", "300 decenas"],
      hint: "Una unidad de millar son $1000$ unidades. ¿Cuántos grupos de $10$ unidades caben?",
      explanation: "$3000 \\div 10 = 300$ decenas.",
    },
  ],
};
