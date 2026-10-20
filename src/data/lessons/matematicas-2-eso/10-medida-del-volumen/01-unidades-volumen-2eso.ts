import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const unidadesVolumen2esoLesson: InteractiveLesson = {
  slug: "unidades-volumen-2eso",
  title: "1. Unidades de volumen",
  subtitle: TEMA_2ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cubo",
      type: "slide",
      help: [
        {
          label: "Un cubo de lado 1",
          message: "El centímetro cúbico es el volumen de un cubo de $1$ cm de lado. Con cualquier otra unidad de longitud, se define igual su unidad cúbica.",
        },
        {
          label: "Contar cubitos",
          message: "Medir un volumen es contar cuántos cubitos unidad caben dentro.",
        },
      ],
      title: "Un decímetro cúbico, en cubitos",
      blocks: [
        {
          kind: "definition",
          text: "La unidad de volumen es el **cubo de arista una unidad de longitud**: cm³, dm³, m³…",
        },
        {
          kind: "example",
          lines: [
            { math: "1\\,\\text{dm} = 10\\,\\text{cm}" },
            { math: "10 \\cdot 10 \\cdot 10 = 1\\,000 \\ \\Rightarrow\\  1\\,\\text{dm}^3 = 1\\,000\\,\\text{cm}^3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cubo-dm3", beatMs: 3400 },
    },
    {
      id: "unidades",
      type: "slide",
      help: [
        {
          label: "Mil, no diez",
          message: "En longitud cada unidad vale $10$ veces la anterior; en superficie, $100$; en volumen, $1\\,000$ (porque es $10 \\cdot 10 \\cdot 10$).",
        },
        {
          label: "Para hacerse una idea",
          message: "$1$ dm³ es el volumen de una botella normal. $1$ m³ cabe en la esquina de una habitación: te ducharías entre $15$ y $20$ veces con esa agua.",
        },
      ],
      title: "Las unidades: de mil en mil",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{km}^3" },
            { tex: "\\text{hm}^3" },
            { tex: "\\text{dam}^3" },
            { tex: "\\text{m}^3" },
            { tex: "\\text{dm}^3" },
            { tex: "\\text{cm}^3" },
            { tex: "\\text{mm}^3" },
          ],
        },
        {
          kind: "rule",
          text: "Cada unidad de volumen es **1 000 veces** la inferior y la **milésima parte** (0,001) de la superior.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "cambio",
      type: "slide",
      help: [
        {
          label: "Tres cifras por columna",
          message: "Cada unidad ocupa **tres** cifras: de $\\text{m}^3$ a $\\text{dm}^3$ la coma se corre tres lugares; a $\\text{cm}^3$, seis.",
        },
        {
          label: "Hacia abajo y hacia arriba",
          message: "Para pasar a una unidad menor se multiplica por $1\\,000$ por cada escalón; para pasar a una mayor, se divide.",
        },
      ],
      title: "Cambiar de unidad",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "0{,}03972\\,\\text{dam}^3 = 0{,}03972 \\cdot 10^6\\,\\text{dm}^3 = 39\\,720\\,\\text{dm}^3" },
            { math: "438\\,\\text{m}^3\\ 12\\,\\text{dm}^3 = 438 \\cdot 10^6\\,\\text{cm}^3 + 12 \\cdot 10^3\\,\\text{cm}^3 = 438\\,012\\,000\\,\\text{cm}^3" },
          ],
        },
        {
          kind: "warning",
          text: "Cada escalón son **tres ceros**, no uno: pasar de m³ a cm³ son dos escalones, es decir, $\\cdot 1\\,000\\,000$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "capacidad",
      type: "slide",
      help: [
        {
          label: "Volumen y capacidad",
          message: "La capacidad (litros) mide lo que cabe en un recipiente, y el volumen (m³, dm³…) es el espacio que ocupa un cuerpo. Se relacionan por $1\\ \\text{dm}^3 = 1\\ \\text{l}$.",
        },
        {
          label: "Con agua",
          message: "$1$ dm³ de agua pesa $1$ kg y $1$ cm³ de agua, $1$ g.",
        },
      ],
      title: "Volumen y capacidad",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "1\\,\\text{dm}^3 = 1\\,\\text{l}" },
            { tex: "1\\,\\text{cm}^3 = 1\\,\\text{ml}" },
            { tex: "1\\,\\text{m}^3 = 1\\,000\\,\\text{l}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cubo-agua" },
    },
    {
      id: "check-km3",
      type: "fill_in_blank",
      help: [
        {
          label: "Tres escalones",
          message: "De km³ a m³ hay tres escalones (hm³, dam³, m³): $\\cdot 1\\,000^3 = 10^9$.",
        },
      ],
      title: "De km³ a m³",
      question: "Expresa $0{,}0037\\,\\text{km}^3$ en m³. (solo el número, sin espacios)",
      correctAnswers: ["3700000"],
      explanation: "$1\\ \\text{km}^3 = 10^9\\ \\text{m}^3$: $0{,}0037 \\cdot 10^9 = 3\\,700\\,000$ m³.",
    },
    {
      id: "check-dm3",
      type: "fill_in_blank",
      help: [
        {
          label: "Un escalón",
          message: "De m³ a dm³ se multiplica por $1\\,000$.",
        },
      ],
      title: "De m³ a dm³",
      question: "Expresa $2{,}5\\,\\text{m}^3$ en dm³. (solo el número, sin espacios)",
      correctAnswers: ["2500"],
      explanation: "$2{,}5 \\cdot 1\\,000 = 2\\,500$ dm³.",
    },
    {
      id: "check-complejo",
      type: "predict",
      help: [
        {
          label: "Grupos de tres cifras",
          message: "Separa $45\\,125\\,145$ dm³ de derecha a izquierda en grupos de tres: dm³, m³, dam³.",
        },
      ],
      title: "Forma compleja",
      question: "Expresa $45\\,125\\,145\\,\\text{dm}^3$ en forma compleja.",
      mode: "choice",
      choices: [
        { id: "a", label: "$45\\,\\text{dam}^3\\ 125\\,\\text{m}^3\\ 145\\,\\text{dm}^3$" },
        { id: "b", label: "$45\\,\\text{m}^3\\ 125\\,\\text{dm}^3\\ 145\\,\\text{cm}^3$", incorrectFeedback: "Has leído las unidades un escalón por debajo: el último grupo de tres cifras son los dm³ y el siguiente, los m³." },
        { id: "c", label: "$4\\,\\text{hm}^3\\ 512\\,\\text{dam}^3\\ 5\\,145\\,\\text{dm}^3$", incorrectFeedback: "Cada unidad ocupa tres cifras: no se agrupan cifras sueltas." },
        { id: "d", label: "$451\\,\\text{m}^3\\ 25\\,\\text{dm}^3\\ 145\\,\\text{cm}^3$", incorrectFeedback: "Los grupos de tres cifras se forman desde la derecha." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$45\\,125\\,145 = 45 \\cdot 10^6 + 125 \\cdot 10^3 + 145$: $45$ dam³, $125$ m³ y $145$ dm³.",
    },
    {
      id: "check-razonable",
      type: "predict",
      help: [
        {
          label: "Un dm³ es una botella",
          message: "Un vaso normal es una fracción de una botella de un litro.",
        },
      ],
      title: "¿Cuál es razonable?",
      question: "¿Cuál de estos volúmenes es razonable para un vaso normal?",
      mode: "choice",
      choices: [
        { id: "0.2", label: "$0{,}2\\,\\text{dm}^3$" },
        { id: "2", label: "$2\\,\\text{dm}^3$", incorrectFeedback: "$2$ dm³ son dos litros: más que una botella." },
        { id: "0.02", label: "$0{,}02\\,\\text{dm}^3$", incorrectFeedback: "$0{,}02$ dm³ son $20$ cm³, es decir, $20$ ml: como una cucharada grande." },
        { id: "20", label: "$20\\,\\text{dm}^3$", incorrectFeedback: "$20$ dm³ son $20$ litros: un cubo grande." },
      ],
      correctChoiceId: "0.2",
      shuffleChoices: true,
      explanation: "Un vaso normal contiene unos $200$ ml $= 200$ cm³ $= 0{,}2$ dm³.",
    },
  ],
};
