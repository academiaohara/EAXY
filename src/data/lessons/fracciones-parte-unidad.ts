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
      content: [
        "Tomamos un **todo** como unidad y lo dividimos en **porciones iguales**. La fracción $\\frac{a}{b}$ indica que tomamos $a$ de esas $b$ partes.",
        "En una barra partida en $9$ trozos iguales, colorear $2$ trozos representa $\\frac{2}{9}$.",
        "Lo importante es que las partes sean **del mismo tamaño**; si no, la fracción no describe bien la cantidad.",
      ],
    },
    {
      id: "semana",
      type: "multiple_choice",
      title: "Fracciones en la vida cotidiana",
      question:
        "Una semana tiene $7$ días. ¿Qué fracción de la semana ocupan los días hábiles (lunes a viernes)?",
      options: [
        { id: "a", text: "$\\frac{2}{7}$ (fin de semana)" },
        { id: "b", text: "$\\frac{5}{7}$ (días hábiles)" },
        { id: "c", text: "$\\frac{5}{5} = 1$" },
      ],
      correctOptionId: "b",
      explanation: "Hay $5$ días hábiles de $7$: $\\frac{5}{7}$ de la semana.",
    },
    {
      id: "comparar-unidad",
      type: "concept",
      title: "Comparar con la unidad",
      content: [
        "Si el **numerador es menor** que el denominador, la fracción es **menor que $1$** (por ejemplo $\\frac{2}{5}$).",
        "Si son **iguales**, la fracción **vale $1$** ($\\frac{5}{5}$).",
        "Si el numerador es **mayor**, la fracción es **mayor que $1$** ($\\frac{7}{5}$).",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Ejemplos con un bidón",
          items: [
            { title: "Menor que 1", math: "\\frac{2}{5} < 1", tone: "cobalt" },
            { title: "Igual a 1", math: "\\frac{5}{5} = 1", tone: "amber" },
            { title: "Mayor que 1", math: "\\frac{7}{5} > 1", tone: "rose" },
          ],
        },
      ],
    },
    {
      id: "check-unidad-lote",
      type: "multiple_choice",
      title: "Comparar con la unidad (actividad 4)",
      question: "Entre estas fracciones, ¿cuál es **igual** a la unidad?",
      options: [
        { id: "a", text: "$\\frac{2}{7}$" },
        { id: "b", text: "$\\frac{6}{6}$" },
        { id: "c", text: "$\\frac{8}{5}$" },
        { id: "d", text: "$\\frac{5}{6}$" },
      ],
      correctOptionId: "b",
      explanation:
        "Solo cuando numerador y denominador coinciden la fracción vale $1$. $\\frac{6}{6} = 1$; las demás son menores o mayores.",
    },
    {
      id: "check-mayor",
      type: "multiple_choice",
      title: "¿Mayor, igual o menor que 1?",
      question: "¿Cómo es $\\frac{8}{5}$ respecto a la unidad?",
      options: [
        { id: "a", text: "Menor que $1$" },
        { id: "b", text: "Igual a $1$" },
        { id: "c", text: "Mayor que $1$" },
      ],
      correctOptionId: "c",
      explanation: "$8 > 5$, así que $\\frac{8}{5} > 1$.",
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
