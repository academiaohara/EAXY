import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadDirecta2esoLesson: InteractiveLesson = {
  slug: "proporcionalidad-directa-2eso",
  title: "1. Proporcionalidad directa",
  subtitle: TEMA_2ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "razon-proporcion",
      type: "slide",
      help: [
        {
          label: "Razón es una fracción",
          message: "La razón entre $a$ y $b$ se escribe $\\frac{a}{b}$: compara cuántas veces cabe uno en el otro.",
        },
        {
          label: "Medios y extremos",
          message: "En $\\frac{a}{b} = \\frac{c}{d}$ los extremos son $a$ y $d$, y los medios son $b$ y $c$. Su producto coincide.",
        },
      ],
      title: "Razón y proporción",
      blocks: [
        {
          kind: "definition",
          text: "La **razón** entre dos números $a$ y $b$ es el cociente $\\dfrac{a}{b}$. Una **proporción** es la igualdad de dos razones.",
        },
        {
          kind: "rule",
          title: "Propiedad fundamental",
          text: "En una proporción, el producto de los extremos es igual al producto de los medios.",
          formula: "\\dfrac{a}{b} = \\dfrac{c}{d} \\iff a \\cdot d = b \\cdot c",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{5} = \\dfrac{12}{20}", note: "$3 \\cdot 20 = 5 \\cdot 12 = 60$" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "directa",
      type: "slide",
      help: [
        {
          label: "Doble, triple, mitad",
          message: "Si compras el doble de balones, pagas el doble. Si compras la mitad, pagas la mitad.",
        },
        {
          label: "Un cociente que no cambia",
          message: "En una proporcionalidad directa, el cociente entre las dos magnitudes es siempre el mismo: aquí $\\frac{10}{2} = \\frac{15}{3} = 5$ € por balón.",
        },
      ],
      title: "Magnitudes directamente proporcionales",
      blocks: [
        {
          kind: "definition",
          text: "Dos magnitudes son **directamente proporcionales** cuando, al **multiplicar o dividir** una por un número (doble, triple, mitad…), la otra queda multiplicada o dividida **por el mismo número**.",
        },
        {
          kind: "rule",
          title: "Constante de proporcionalidad",
          text: "El cociente entre cada pareja de valores es siempre el mismo.",
          formula: "\\dfrac{\\text{precio}}{\\text{balones}} = 5",
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-razon",
        params: { rel: "directa", a: 1, b: 5, nums: [1, 2, 3, 8], titles: ["Balones", "Precio (€)"] },
      },
    },
    {
      id: "reduccion-unidad",
      type: "slide",
      help: [
        {
          label: "Primero la unidad",
          message: "Si sabes cuánto pesa una chocolatina, pesar cuatro es multiplicar por cuatro.",
        },
        {
          label: "Una división y una multiplicación",
          message: "Se divide entre el número de chocolatinas conocido y se multiplica por el que se pide.",
        },
      ],
      title: "Método de reducción a la unidad",
      blocks: [
        {
          kind: "text",
          text: "Tres chocolatinas pesan $60$ g. ¿Cuánto pesan cuatro?",
        },
        {
          kind: "steps",
          items: [
            "Calcula el valor de **una unidad**: divide.",
            "Multiplica por la cantidad que se pide.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "60 : 3 = 20\\,\\text{g}", note: "una chocolatina" },
            { math: "20 \\cdot 4 = 80\\,\\text{g}", note: "cuatro chocolatinas" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "reduccion-unidad",
        params: { rel: "directa", a: 3, b: 60, c: 4, titles: ["Chocolatinas", "Peso (g)"] },
      },
    },
    {
      id: "regla-tres",
      type: "slide",
      help: [
        {
          label: "Magnitud con magnitud",
          message: "Arriba y abajo van siempre la misma magnitud en las dos fracciones: chocolatinas con chocolatinas y gramos con gramos.",
        },
        {
          label: "Despeja la x",
          message: "De $3 \\cdot x = 60 \\cdot 4$ se despeja $x = \\frac{60 \\cdot 4}{3}$.",
        },
      ],
      title: "Regla de tres directa",
      blocks: [
        {
          kind: "text",
          text: "Con **dos pares de valores proporcionales** se forman dos fracciones **equivalentes** y se despeja la incógnita con el producto en cruz.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{4} = \\dfrac{60}{x}" },
            { math: "3 \\cdot x = 4 \\cdot 60 \\ \\Rightarrow\\  x = \\dfrac{240}{3} = 80\\,\\text{g}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "regla-tres-cruz",
        params: { a: 3, b: 60, c: 8, titles: ["Chocolatinas", "Peso (g)"], unit: "g" },
      },
    },
    {
      id: "check-balones",
      type: "fill_in_blank",
      help: [
        {
          label: "Precio de uno",
          message: "$25 : 5 = 5$ € por balón. Con $8$ balones...",
        },
      ],
      title: "Balones",
      question: "Cinco balones cuestan $25$ €. ¿Cuántos euros cuestan $8$ balones? (solo el número)",
      correctAnswers: ["40"],
      explanation: "$25 : 5 = 5$ € cada uno; $5 \\cdot 8 = 40$ €.",
    },
    {
      id: "check-gasolina",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Plantea la regla de tres",
          message: "Litros con litros y euros con euros: $\\frac{12}{18} = \\frac{x}{27}$... cuidado con cuál es cuál.",
        },
        {
          label: "Estima",
          message: "$27$ es una vez y media $18$, así que el precio será una vez y media el de $18$ L.",
        },
      ],
      title: "Gasolina",
      question: "Por $18$ litros de gasolina se pagan $27$ €. ¿Cuánto se pagará por $30$ litros?",
      mode: "choice",
      choices: [
        { id: "45", label: "$45$ €" },
        { id: "50", label: "$50$ €", incorrectFeedback: "Cada litro cuesta $27 : 18 = 1{,}5$ €, así que $30$ litros no pueden costar $50$ €." },
        { id: "18", label: "$18$ €", incorrectFeedback: "Más litros deben costar más euros, no menos." },
        { id: "40.5", label: "$40{,}50$ €", incorrectFeedback: "Has multiplicado por $1{,}35$; la razón es $27 : 18 = 1{,}5$ €/L." },
      ],
      correctChoiceId: "45",
      shuffleChoices: true,
      explanation: "$27 : 18 = 1{,}5$ € por litro. $30 \\cdot 1{,}5 = 45$ €.",
    },
    {
      id: "check-razon",
      type: "fill_in_blank",
      help: [
        {
          label: "Producto en cruz",
          message: "$\\frac{6}{9} = \\frac{x}{15}$ implica $6 \\cdot 15 = 9 \\cdot x$.",
        },
      ],
      title: "Término desconocido",
      question: "Halla $x$ en $\\dfrac{6}{9} = \\dfrac{x}{15}$ (solo el número)",
      correctAnswers: ["10"],
      explanation: "$6 \\cdot 15 = 90 = 9 \\cdot x$, luego $x = 10$.",
    },
  ],
};
