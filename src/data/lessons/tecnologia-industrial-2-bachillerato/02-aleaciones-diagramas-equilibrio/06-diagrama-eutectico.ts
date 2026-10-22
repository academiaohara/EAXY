import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const diagramaEutecticoLesson: InteractiveLesson = {
  slug: "diagrama-eutectico",
  title: "6. Aleaciones eutécticas",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "insolubles",
      type: "slide",
      help: [
        {
          label: "¿Qué significa insoluble en estado sólido?",
          message: "Al solidificar, los átomos de A y de B no se mezclan en un mismo cristal: se forman cristales de A y cristales de B por separado.",
        },
      ],
      title: "Solubles en líquido, insolubles en sólido",
      blocks: [
        {
          kind: "text",
          text: "Si se enfrían aleaciones A-B de distinta composición, **todas terminan de solidificar a la misma temperatura**. Uniendo los puntos de inicio se obtiene el «liquidus»; los de fin, el «solidus».",
        },
        {
          kind: "definition",
          text: "La aleación **eutéctica** es la de **punto de fusión más bajo**: solidifica a temperatura constante y de golpe, como un metal puro.",
        },
        {
          kind: "text",
          text: "Por eso funde a la temperatura más baja posible, llena mejor los moldes y es más homogénea: es la ideal para fabricar piezas fundidas.",
        },
      ],
      visual: { kind: "anim", scene: "eutectico-enfriamiento", beatMs: 4200 },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "¿Qué debo mirar?",
          message: "Elige una vertical (composición) y baja la temperatura: cuándo aparece el primer cristal, cuándo desaparece el líquido y qué hay por debajo de la línea horizontal.",
        },
      ],
      title: "Recorre el diagrama",
      blocks: [
        {
          kind: "text",
          text: "Compara una aleación **hipoeutéctica** (menos B que la eutéctica), la **eutéctica** (60 % de B) y una **hipereutéctica** (más B).",
        },
      ],
      visual: { kind: "tool", tool: "diagrama-eutectico", params: { a: 30, b: 650 } },
    },
    {
      id: "check-liquido",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Isoterma", message: "A 600 °C la isoterma va de A puro ($0\\,\\%$ de B) hasta el «liquidus» ($45\\,\\%$ de B). La aleación está en el $30\\,\\%$." }],
      title: "Cantidad de líquido",
      question: "Aleación con el $30\\,\\%$ de B a $600$ °C: sólido A puro ($0\\,\\%$ B) y líquido con el $45\\,\\%$ de B. ¿Qué porcentaje de líquido hay? (con una decimal, solo el número)",
      correctAnswers: ["66,7", "66.7"],
      explanation: "$W_L = \\dfrac{30 - 0}{45 - 0} = 0{,}667$, es decir, el $66{,}7\\,\\%$ es líquido y el $33{,}3\\,\\%$, cristales de A.",
    },
    {
      id: "check-eutectico",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Reparto", message: "Justo por debajo de la temperatura eutéctica, el líquido restante (con $60\\,\\%$ de B) solidifica como eutéctico. La fracción es $C/C_E$." }],
      title: "Cuánto eutéctico",
      question: "La misma aleación ($30\\,\\%$ de B) se enfría por debajo de la temperatura eutéctica. ¿Qué porcentaje de **eutéctico** hay, si la composición eutéctica es el $60\\,\\%$ de B? (solo el número)",
      correctAnswers: ["50"],
      explanation: "$W_E = \\dfrac{30}{60} = 0{,}5$: la mitad es eutéctico y la otra mitad, cristales de A formados antes (A primario).",
    },
    {
      id: "check-definicion",
      type: "predict",
      help: [{ label: "Recuerda", message: "Piensa en la curva de enfriamiento: ¿tiene tramo horizontal?" }],
      title: "Aleación eutéctica",
      question: "Una aleación eutéctica es:",
      mode: "choice",
      choices: [
        { id: "cte", label: "La que tiene una composición tal que solidifica manteniendo constante la temperatura" },
        { id: "igual", label: "La que tiene la misma proporción de soluto que de disolvente", incorrectFeedback: "Su composición no es 50-50: depende del diagrama (en el ejemplo, 40 % A y 60 % B)." },
        { id: "comp", label: "Un compuesto químico, no una aleación", incorrectFeedback: "Es una mezcla de cristales de A y B muy íntimamente unidos, no un compuesto." },
      ],
      correctChoiceId: "cte",
      shuffleChoices: true,
      explanation: "Es la aleación de menor punto de fusión; solidifica a temperatura constante como un metal puro.",
    },
    {
      id: "check-hiper",
      type: "predict",
      help: [{ label: "Compara con 60 %", message: "La composición eutéctica es el 60 % de B. ¿El 80 % queda a su izquierda o a su derecha?" }],
      title: "Hipo o hiper",
      question: "Con el punto eutéctico en el $60\\,\\%$ de B, una aleación con el $80\\,\\%$ de B es:",
      mode: "choice",
      choices: [
        { id: "hiper", label: "Hipereutéctica: tiene más B que la eutéctica" },
        { id: "hipo", label: "Hipoeutéctica", incorrectFeedback: "Hipoeutéctica significa menos del contenido eutéctico (a la izquierda del punto)." },
        { id: "eut", label: "Eutéctica", incorrectFeedback: "Solo la del 60 % es eutéctica." },
      ],
      correctChoiceId: "hiper",
      shuffleChoices: true,
      explanation: "A la derecha del punto eutéctico están las hipereutécticas: primero cristaliza B puro y después el eutéctico.",
    },
  ],
};
