import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const diagramasReglaPalancaLesson: InteractiveLesson = {
  slug: "diagramas-regla-palanca",
  title: "4. Diagramas de fases y regla de la palanca",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-es-diagrama",
      type: "slide",
      help: [
        {
          label: "¿Por qué solo temperatura y composición?",
          message: "Porque la presión suele ser la atmosférica y no cambia. Las dos variables que quedan son la temperatura y la composición de la aleación.",
        },
      ],
      title: "Diagramas de equilibrio de fases",
      blocks: [
        {
          kind: "definition",
          text: "Un **diagrama de fases** (o de equilibrio) representa qué fases hay, con qué composición y en qué cantidad, según la temperatura y la composición de la aleación.",
        },
        {
          kind: "text",
          text: "En el eje horizontal se lee la concentración: de $0\\,\\%$ de B (todo A) a $100\\,\\%$ de B. En el vertical, la temperatura. Las fases se nombran con letras griegas, salvo el material fundido, que es «líquido».",
        },
        {
          kind: "text",
          text: "Sirven para **predecir transformaciones**: qué fase aparece al enfriar y cuánto hay de cada una.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "palanca",
      type: "slide",
      help: [
        {
          label: "¿Por qué el segmento del lado contrario?",
          message: "Como en una palanca: cuanto más cerca está tu aleación de una fase, más cantidad hay de ella. Por eso la longitud que mide la fase α es la que queda del lado de β.",
        },
      ],
      title: "Regla de la palanca",
      blocks: [
        {
          kind: "steps",
          items: [
            "Traza la **isoterma** a la temperatura de estudio: corta las líneas de fase en $C_\\beta$ y $C_\\alpha$.",
            "La fracción de una fase es el segmento **hacia la otra fase**, dividido entre la isoterma completa.",
            "Para pasar de fracción a porcentaje, multiplica por 100.",
          ],
        },
        {
          kind: "rule",
          formula: "W_\\alpha = \\dfrac{C - C_\\beta}{C_\\alpha - C_\\beta}\\qquad W_\\beta = \\dfrac{C_\\alpha - C}{C_\\alpha - C_\\beta}",
        },
      ],
      visual: { kind: "anim", scene: "regla-palanca", beatMs: 4200 },
    },
    {
      id: "explora-palanca",
      type: "slide",
      help: [
        {
          label: "¿Qué debo probar?",
          message: "Sitúa el punto dentro de la zona $\\alpha + L$ y mira cómo cambian los dos segmentos de la recta de reparto al mover la temperatura o la composición.",
        },
      ],
      title: "Prueba la regla de la palanca",
      blocks: [
        {
          kind: "text",
          text: "Este es el diagrama real de dos metales totalmente solubles (cobre y níquel). Dentro de la zona bifásica, la recta de reparto y la regla de la palanca dan la composición y la cantidad de cada fase. Sube la temperatura: ¿qué pasa con la fracción de líquido?",
        },
      ],
      visual: { kind: "tool", tool: "diagrama-binario", params: { a: 40, b: 1250 } },
    },
    {
      id: "check-beta",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        { label: "Segmento contrario", message: "Para la fase β se usa el segmento que va de la aleación a $C_\\alpha$: $C_\\alpha - C$." },
      ],
      title: "Fracción de β",
      question: "Aleación con el $40\\,\\%$ de B, con $C_\\beta = 25\\,\\%$ y $C_\\alpha = 60\\,\\%$. ¿Qué porcentaje de fase β hay? (redondea a la unidad, solo el número)",
      correctAnswers: ["57"],
      explanation: "$W_\\beta = \\dfrac{60 - 40}{60 - 25} = 0{,}5714$, es decir, un $57\\,\\%$.",
    },
    {
      id: "check-alfa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        { label: "Los datos", message: "$C = 35$, $C_\\beta = 20$ y $C_\\alpha = 60$. La longitud total de la isoterma es $60 - 20 = 40$." },
      ],
      title: "Fracción de α",
      question: "Con $C = 35\\,\\%$, $C_\\beta = 20\\,\\%$ y $C_\\alpha = 60\\,\\%$, ¿qué porcentaje de fase α hay? (con una decimal, solo el número)",
      correctAnswers: ["37,5", "37.5"],
      explanation: "$W_\\alpha = \\dfrac{35 - 20}{60 - 20} = \\dfrac{15}{40} = 0{,}375$, o sea, el $37{,}5\\,\\%$.",
    },
    {
      id: "check-liquidus",
      type: "predict",
      help: [
        { label: "Pista", message: "Por encima de esa línea la aleación ya no tiene nada sólido." },
      ],
      title: "La línea de liquidus",
      question: "En un diagrama de equilibrio, la línea de «liquidus» separa:",
      mode: "choice",
      choices: [
        { id: "liq", label: "La zona en la que la aleación está toda en estado líquido de la que ya contiene cristales" },
        { id: "sol", label: "La temperatura por debajo de la cual la aleación está toda sólida", incorrectFeedback: "Esa es la línea de «solidus»." },
        { id: "fus", label: "La temperatura de fusión de la aleación", incorrectFeedback: "Una aleación no suele fundir a una única temperatura: funde en un intervalo entre solidus y liquidus." },
      ],
      correctChoiceId: "liq",
      shuffleChoices: true,
      explanation: "Por encima del «liquidus» todo es líquido; por debajo del «solidus» todo es sólido; en medio coexisten ambos.",
    },
  ],
};
