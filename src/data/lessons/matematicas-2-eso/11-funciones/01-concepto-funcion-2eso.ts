import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const conceptoFuncion2esoLesson: InteractiveLesson = {
  slug: "concepto-funcion-2eso",
  title: "1. Concepto de función",
  subtitle: TEMA_2ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "grafica",
      type: "slide",
      help: [
        {
          label: "Un punto, dos valores",
          message: "Cada punto $(x, y)$ de la gráfica relaciona un valor del eje horizontal con otro del vertical.",
        },
        {
          label: "Cuál es cuál",
          message: "La variable independiente es la que «puede variar libremente» (el tiempo); la dependiente depende de ella (la temperatura).",
        },
      ],
      title: "Las gráficas describen relaciones",
      blocks: [
        {
          kind: "text",
          text: "Una gráfica relaciona **dos variables**. La que va en el eje **horizontal** es la **variable independiente** ($x$) y la del eje **vertical**, la **dependiente** ($y$).",
        },
        {
          kind: "definition",
          text: "La variable $y$ es **función** de la variable $x$ cuando a cada valor de $x$ le corresponde **un único valor** de $y$.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-temperatura", beatMs: 3400 },
    },
    {
      id: "es-funcion",
      type: "slide",
      help: [
        {
          label: "Recta vertical",
          message: "Una recta vertical fija un valor de $x$. Si la gráfica la corta dos veces, a ese $x$ le corresponden dos valores de $y$: no es función.",
        },
        {
          label: "Un ejemplo",
          message: "En una circunferencia, para casi cualquier $x$ hay un punto arriba y otro abajo.",
        },
      ],
      title: "¿Es una función?",
      blocks: [
        {
          kind: "rule",
          title: "Criterio de la vertical",
          text: "Una gráfica es una función si **toda recta vertical la corta, como mucho, en un punto**.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-es-no-es", beatMs: 3600 },
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Traza una vertical",
          message: "Imagina una recta vertical cualquiera y cuenta cuántas veces corta la gráfica.",
        },
      ],
      title: "Función o no",
      question: "Decide si cada gráfica corresponde a una función.",
      groups: [
        { id: "si", label: "Es función", tone: "emerald" },
        { id: "no", label: "No es función", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Una recta inclinada", group: "si" },
        { id: "b", text: "Una parábola con las ramas hacia arriba", group: "si" },
        { id: "c", text: "Una circunferencia", group: "no" },
        { id: "d", text: "Una recta vertical $x = 2$", group: "no" },
        { id: "e", text: "Una recta horizontal $y = 3$", group: "si" },
      ],
      explanation: "En la circunferencia y en la recta vertical hay valores de $x$ con varios valores de $y$. En el resto, cada $x$ tiene un único $y$.",
    },
    {
      id: "check-lectura",
      type: "predict",
      help: [
        {
          label: "Sube hasta el punto",
          message: "Sitúate en $x = 14$ en el eje horizontal, sube hasta la gráfica y lee la altura.",
        },
      ],
      title: "Leer un valor",
      question: "En la gráfica de la temperatura, ¿qué temperatura había a las $14$ h?",
      mode: "choice",
      choices: [
        { id: "20", label: "$20\\,°\\text{C}$" },
        { id: "10", label: "$10\\,°\\text{C}$", incorrectFeedback: "A las $9$ h hacía $10\\,°\\text{C}$; a las $14$ h la gráfica estaba más arriba." },
        { id: "12", label: "$12\\,°\\text{C}$", incorrectFeedback: "Esa era la temperatura a las $0$ h." },
        { id: "14", label: "$14\\,°\\text{C}$", incorrectFeedback: "No confundas la hora con la temperatura: $14$ es el valor de $x$." },
      ],
      correctChoiceId: "20",
      shuffleChoices: true,
      explanation: "El punto de la gráfica en $x = 14$ es $(14, 20)$: $20\\,°\\text{C}$.",
    },
    {
      id: "check-variables",
      type: "predict",
      help: [
        {
          label: "Qué depende de qué",
          message: "El precio a pagar depende de los kilos que compras, no al revés.",
        },
      ],
      title: "Variable independiente",
      question: "El precio de la fruta depende de los kilos comprados. ¿Cuál es la variable independiente?",
      mode: "choice",
      choices: [
        { id: "kilos", label: "Los kilos comprados" },
        { id: "precio", label: "El precio a pagar", incorrectFeedback: "El precio es la variable dependiente: su valor depende de los kilos." },
        { id: "fruta", label: "El tipo de fruta", incorrectFeedback: "El tipo de fruta es un dato fijo en este caso, no una variable de la gráfica." },
        { id: "ninguna", label: "Ninguna", incorrectFeedback: "Siempre hay una variable independiente y otra dependiente." },
      ],
      correctChoiceId: "kilos",
      shuffleChoices: true,
      explanation: "Los kilos van en el eje $x$ (independiente) y el precio en el eje $y$ (dependiente).",
    },
  ],
};
