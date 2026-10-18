import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoPesoLesson: InteractiveLesson = {
  slug: "sistema-metrico-peso",
  title: "4. Medida del peso",
  subtitle: TEMA_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "gramo-cambio",
      type: "slide",
      title: "El gramo y sus cambios de unidad",
      blocks: [
        {
          kind: "definition",
          text: "El **gramo** ($\\mathrm{g}$) es el peso de **1 cm³ de agua**. Es tan pequeño que en la práctica se usa sobre todo el **kilogramo**.",
        },
        {
          kind: "rule",
          text: "Sus múltiplos y submúltiplos van **de 10 en 10** y se operan como en longitud y capacidad: la coma se mueve tantos lugares como saltos.",
        },
        {
          kind: "example",
          lines: [
            { math: "0{,}0583\\ \\mathrm{kg} = 58{,}3\\ \\mathrm{g}", note: "3 saltos a la derecha: ×1 000" },
            { math: "630\\ \\mathrm{cg} = 6{,}3\\ \\mathrm{g}", note: "2 saltos a la izquierda: :100" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tabla-unidades", params: { units: "g", dec: "0,0583", from: "kg", to: "g" } },
    },
    {
      id: "quintal-tonelada",
      type: "slide",
      title: "Para pesos grandes: quintal y tonelada",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "1\\ \\mathrm{q}", label: "quintal métrico = 100 kg" },
            { tex: "1\\ \\mathrm{t}", label: "tonelada métrica = 1 000 kg" },
          ],
        },
        {
          kind: "rule",
          text: "Son dos múltiplos del kilogramo que se añaden a la tabla. Pasar de kg a toneladas es **dividir entre 1 000**: la coma se mueve tres lugares a la izquierda.",
          formula: "13\\,500\\ \\mathrm{kg} = 13\\,500 : 1\\,000 = 13{,}5\\ \\mathrm{t}",
        },
      ],
      visual: { kind: "anim", scene: "coma-potencias10", params: { dec: "13500", dir: "div" } },
    },
    {
      id: "check-reparto",
      type: "predict",
      title: "La furgoneta de reparto",
      question: "Una furgoneta de reparto lleva una carga de 8 200 kg. ¿Cuántas toneladas son?",
      mode: "choice",
      choices: [
        { id: "a", label: "$8{,}2\\ \\mathrm{t}$" },
        {
          id: "b",
          label: "$82\\ \\mathrm{t}$",
          incorrectFeedback:
            "Has dividido entre 100: eso son **quintales**. La tonelada son 1 000 kg: la coma se mueve tres lugares.",
        },
        {
          id: "c",
          label: "$820\\ \\mathrm{t}$",
          incorrectFeedback: "Has dividido entre 10. Una furgoneta que carga 820 toneladas sería más pesada que un buque.",
        },
        {
          id: "d",
          label: "$8\\,200\\,000\\ \\mathrm{t}$",
          incorrectFeedback:
            "Has multiplicado en vez de dividir. La tonelada es una unidad **mayor** que el kilogramo: el número tiene que disminuir.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$8\\,200 : 1\\,000 = 8{,}2$. La tonelada es mil veces mayor que el kilo, así que hacen falta mil veces menos.",
    },
    {
      id: "compleja",
      type: "slide",
      title: "Forma compleja e incompleja con gramos",
      blocks: [
        {
          kind: "rule",
          text: "Cada parte va en la columna de su unidad, con **ceros** en las vacías, y la coma se coloca tras la unidad pedida.",
        },
        {
          kind: "example",
          title: "Juntar (en la animación)",
          lines: [{ math: "8\\ \\mathrm{hg}\\ 6\\ \\mathrm{g}\\ 7\\ \\mathrm{dg}\\ 5\\ \\mathrm{cg} = 806{,}75\\ \\mathrm{g}" }],
        },
        {
          kind: "example",
          title: "Separar",
          lines: [
            {
              math: "1\\,206\\ \\mathrm{g} = 1\\ \\mathrm{kg}\\ 2\\ \\mathrm{hg}\\ 6\\ \\mathrm{g}",
              note: "la columna de los dag vale 0",
            },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-unidades",
        params: { units: "g", parts: ["8 hg", "6 g", "7 dg", "5 cg"], to: "g" },
      },
    },
    {
      id: "check-pelo",
      type: "predict",
      title: "La peluquería canina",
      question:
        "Un perro pesaba 4 kg 50 g. Tras cortarle el pelo pesa 3 985 g. ¿Cuántos gramos pesaba el pelo cortado?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$65\\ \\mathrm{g}$" },
        {
          id: "b",
          label: "$515\\ \\mathrm{g}$",
          incorrectFeedback:
            "Has escrito $4\\ \\mathrm{kg}\\ 50\\ \\mathrm{g}$ como $4\\,500\\ \\mathrm{g}$. Los $50\\ \\mathrm{g}$ van en las unidades y las decenas de gramo: son $4\\,050\\ \\mathrm{g}$.",
        },
        {
          id: "c",
          label: "$8\\,035\\ \\mathrm{g}$",
          incorrectFeedback:
            "Has **sumado** los dos pesos. El pelo cortado es la **diferencia** entre el peso de antes y el de después.",
        },
        {
          id: "d",
          label: "$0{,}065\\ \\mathrm{g}$",
          incorrectFeedback:
            "Ese número sería $0{,}065\\ \\mathrm{kg}$ ($65\\ \\mathrm{g}$) si lo expresaras en kilogramos. Aquí se pide en gramos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$4\\ \\mathrm{kg}\\ 50\\ \\mathrm{g} = 4\\,050\\ \\mathrm{g}$ y $4\\,050 - 3\\,985 = 65\\ \\mathrm{g}$: se unifica la unidad antes de restar.",
    },
    {
      id: "check-comprimido",
      type: "predict",
      title: "El prospecto",
      question:
        "El prospecto de un medicamento indica la cantidad de principio activo de cada comprimido. ¿Qué unidad es más adecuada?",
      mode: "choice",
      choices: [
        { id: "a", label: "El miligramo ($\\mathrm{mg}$)" },
        {
          id: "b",
          label: "El kilogramo ($\\mathrm{kg}$)",
          incorrectFeedback: "Un comprimido tiene una cantidad de principio activo mil millones de veces menor que un kilo.",
        },
        {
          id: "c",
          label: "El quintal métrico ($\\mathrm{q}$)",
          incorrectFeedback: "El quintal son $100\\ \\mathrm{kg}$: se usa para cosechas, no para pastillas.",
        },
        {
          id: "d",
          label: "La tonelada ($\\mathrm{t}$)",
          incorrectFeedback: "La tonelada son $1\\,000\\ \\mathrm{kg}$: sirve para camiones y barcos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Los principios activos suelen medirse en miligramos (milésimas de gramo): así los números salen cómodos, como $500\\ \\mathrm{mg}$.",
    },
  ],
};
