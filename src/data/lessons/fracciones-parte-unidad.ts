import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesParteUnidadLesson: InteractiveLesson = {
  slug: "fracciones-parte-unidad",
  title: "1. Parte de la unidad",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Tres formas de ver una fracción",
      content: [
        "Una fracción puede entenderse como **parte de la unidad**, como **operador** (transforma una cantidad) o como **división indicada** ($\\frac{a}{b} = a : b$).",
        "En esta lección profundizamos en el significado de **parte de la unidad**: tomamos un todo como unidad y lo dividimos en porciones iguales.",
        "Los egipcios solo usaban fracciones unitarias ($\\frac{1}{2}$, $\\frac{1}{3}$…); repartir $4$ panes entre $7$ personas les obligaba a sumar varias fracciones unitarias.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Términos de $\\frac{a}{b}$",
          items: [
            {
              title: "Numerador",
              math: "a",
              caption: "Porciones que se toman.",
              tone: "cobalt",
            },
            {
              title: "Denominador",
              math: "b",
              caption: "Porciones iguales en que se divide la unidad.",
              tone: "emerald",
            },
          ],
        },
      ],
    },
    {
      id: "partes-iguales",
      type: "concept",
      title: "Parte de la unidad",
      layout: "visual-first",
      content: [
        "Tomamos un **todo** como unidad y lo dividimos en **porciones iguales**. La fracción $\\frac{a}{b}$ indica que tomamos $a$ de esas $b$ partes.",
        "En esta barra partida en $9$ trozos iguales hay $2$ coloreados: representa $\\frac{2}{9}$.",
        "Lo importante es que las partes sean **del mismo tamaño**; si no, la fracción no describe bien la cantidad.",
      ],
      visuals: [
        {
          kind: "fraction-figure",
          title: "$\\frac{2}{9}$ de la barra",
          shape: "bar",
          parts: 9,
          shaded: 2,
        },
      ],
    },
    {
      id: "marca-pizza",
      type: "fraction_pick",
      title: "Colorea la fracción",
      question: "Toca las porciones de la tarta hasta colorear $\\frac{3}{8}$.",
      shape: "circle",
      numerator: 3,
      denominator: 8,
      itemLabel: "porción",
      hint: "La tarta ya está partida en $8$ porciones iguales: el denominador. Colorea tantas como dice el numerador.",
      explanation: "$\\frac{3}{8}$ son $3$ porciones de las $8$ iguales en que se ha partido la tarta.",
    },
    {
      id: "semana",
      type: "fraction_pick",
      title: "Fracciones en la vida cotidiana",
      question:
        "Cada casilla es un día de la semana. Marca los días hábiles (de lunes a viernes): ¿qué fracción de la semana forman?",
      shape: "bar",
      numerator: 5,
      denominator: 7,
      itemLabel: "día",
      hint: "La semana tiene $7$ días: esa es la unidad. ¿Cuántos van de lunes a viernes?",
      explanation: "Hay $5$ días hábiles de $7$: $\\frac{5}{7}$ de la semana.",
    },
    {
      id: "divide-tu",
      type: "fraction_pick",
      title: "Divide tú la unidad",
      question:
        "Ahora la barra está entera. Divídela en las partes que necesites y colorea $\\frac{2}{5}$.",
      shape: "bar",
      numerator: 2,
      denominator: 5,
      adjustableParts: true,
      exactParts: true,
      hint: "Primero el denominador: ¿en cuántas partes iguales hay que dividir la barra? Después colorea el numerador.",
      explanation: "El denominador $5$ dice en cuántas partes iguales se divide la barra; el numerador $2$, cuántas se colorean.",
    },
    {
      id: "comparar-unidad",
      type: "concept",
      title: "Comparar con la unidad",
      content: [
        "Si el **numerador es menor** que el denominador, la fracción es **menor que $1$** (por ejemplo $\\frac{2}{5}$).",
        "Si son **iguales**, la fracción **vale $1$** ($\\frac{5}{5}$).",
        "Si el numerador es **mayor**, la fracción es **mayor que $1$** ($\\frac{7}{5}$): no cabe en una sola unidad y hay que empezar otra.",
      ],
      visuals: [
        {
          kind: "fraction-figure",
          title: "$\\frac{7}{5}$: una unidad entera y $2$ quintos más",
          shape: "bar",
          parts: 5,
          shaded: 7,
          tone: "rose",
        },
      ],
    },
    {
      id: "check-mayor",
      type: "fraction_pick",
      title: "Más de una unidad",
      question: "Tienes dos barras partidas en quintos. Colorea $\\frac{8}{5}$.",
      shape: "bar",
      numerator: 8,
      denominator: 5,
      wholes: 2,
      hint: "Una barra entera son $\\frac{5}{5}$. ¿Cuántos quintos te faltan para llegar a $8$?",
      explanation:
        "$\\frac{8}{5}$ es una barra entera ($\\frac{5}{5}$) y $3$ quintos más: como $8 > 5$, $\\frac{8}{5} > 1$.",
    },
    {
      id: "check-unidad-lote",
      type: "classify",
      title: "Comparar con la unidad (actividad 4)",
      question: "Coloca cada fracción en su grupo.",
      groups: [
        { id: "menor", label: "Menor que $1$", tone: "cobalt" },
        { id: "igual", label: "Igual a $1$", tone: "amber" },
        { id: "mayor", label: "Mayor que $1$", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$\\frac{2}{7}$", group: "menor" },
        { id: "b", text: "$\\frac{6}{6}$", group: "igual" },
        { id: "c", text: "$\\frac{8}{5}$", group: "mayor" },
        { id: "d", text: "$\\frac{5}{6}$", group: "menor" },
        { id: "e", text: "$\\frac{9}{4}$", group: "mayor" },
        { id: "f", text: "$\\frac{3}{3}$", group: "igual" },
      ],
      hint: "Compara numerador y denominador en cada una.",
      explanation:
        "Numerador menor: menor que $1$. Iguales: vale $1$. Numerador mayor: mayor que $1$.",
    },
    {
      id: "check-terminos",
      type: "fill_in_blank",
      title: "Identifica el denominador",
      question: "En $\\frac{2}{9}$, ¿cuál es el denominador? (escribe solo el número)",
      correctAnswers: ["9"],
      explanation: "El denominador es el número de partes iguales: $9$.",
    },
  ],
};
