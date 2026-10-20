import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const porcentajes2esoLesson: InteractiveLesson = {
  slug: "porcentajes-2eso",
  title: "3. Porcentajes",
  subtitle: TEMA_2ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-es",
      type: "slide",
      help: [
        {
          label: "Por cada cien",
          message: "$20\\,\\%$ significa que de cada $100$ elementos, $20$ cumplen la condición.",
        },
        {
          label: "Es una fracción",
          message: "$x\\,\\% = \\frac{x}{100}$, y también se puede escribir como decimal: $20\\,\\% = 0{,}20$.",
        },
      ],
      title: "Qué es un porcentaje",
      blocks: [
        {
          kind: "definition",
          text: "Un **porcentaje** indica cuántas partes **de cada 100** se toman. Es una fracción de denominador $100$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "20\\,\\% = \\dfrac{20}{100}" },
            { tex: "20\\,\\% = 0{,}2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cuadricula-porcentaje", params: { a: 20, b: 100 } },
    },
    {
      id: "otro-total",
      type: "slide",
      help: [
        {
          label: "Fracción equivalente",
          message: "Busca la fracción con denominador $100$ equivalente a la tuya: $\\frac{3}{5} = \\frac{60}{100}$.",
        },
        {
          label: "Como un cociente",
          message: "También vale dividir: $3 : 5 = 0{,}6$ y multiplicar por $100$: $60\\,\\%$.",
        },
      ],
      title: "Cuando el total no es 100",
      blocks: [
        {
          kind: "text",
          text: "Hay $5$ pelotas: $3$ azules, $1$ roja y $1$ blanca. ¿Qué porcentaje son azules?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{5} = \\dfrac{60}{100} = 60\\,\\%" },
            { math: "10 \\text{ de } 50 \\ \\to\\  \\dfrac{10}{50} = \\dfrac{20}{100} = 20\\,\\%" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cuadricula-porcentaje", params: { a: 20, b: 50 } },
    },
    {
      id: "calcular",
      type: "slide",
      help: [
        {
          label: "10 % es dividir entre 10",
          message: "El $10\\,\\%$ de una cantidad es su décima parte. El $5\\,\\%$ es la mitad del $10\\,\\%$.",
        },
        {
          label: "Con decimal",
          message: "También: $15\\,\\% \\text{ de } 260 = 0{,}15 \\cdot 260 = 39$.",
        },
      ],
      title: "Calcular el porcentaje de una cantidad",
      blocks: [
        {
          kind: "rule",
          text: "El $p\\,\\%$ de una cantidad es esa cantidad **multiplicada por** $\\dfrac{p}{100}$.",
        },
        {
          kind: "example",
          lines: [
            { math: "20\\,\\% \\text{ de } 260 = 260 \\cdot 0{,}2 = 52" },
            { math: "15\\,\\% = 10\\,\\% + 5\\,\\% = 26 + 13 = 39" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "porcentaje-mental", params: { a: 260 } },
    },
    {
      id: "check-pelotas",
      type: "fill_in_blank",
      help: [
        {
          label: "Una fracción",
          message: "La fracción es $\\frac{12}{40}$. Pásala a denominador $100$ o divide y multiplica por $100$.",
        },
      ],
      title: "Aprobados",
      question: "En una clase de $40$ alumnos aprueban $30$. ¿Qué porcentaje aprueba? (solo el número)",
      correctAnswers: ["75"],
      explanation: "$\\frac{30}{40} = \\frac{75}{100} = 75\\,\\%$.",
    },
    {
      id: "check-calculo",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Multiplica por el decimal",
          message: "$35\\,\\% = 0{,}35$. Multiplícalo por $480$.",
        },
        {
          label: "Estima",
          message: "$35\\,\\%$ está entre el $25\\,\\%$ y el $50\\,\\%$: entre $120$ y $240$.",
        },
      ],
      title: "Alumnos de un colegio",
      question: "En un colegio con $480$ alumnos, el $35\\,\\%$ va en autobús. ¿Cuántos alumnos son?",
      mode: "choice",
      choices: [
        { id: "168", label: "$168$" },
        { id: "135", label: "$135$", incorrectFeedback: "Es el $28\\,\\%$ aproximadamente; comprueba $0{,}35 \\cdot 480$." },
        { id: "312", label: "$312$", incorrectFeedback: "Es el $65\\,\\%$, el resto de alumnos." },
        { id: "16.8", label: "$16{,}8$", incorrectFeedback: "Has dividido en vez de multiplicar por $0{,}35$ y sin la coma bien colocada." },
      ],
      correctChoiceId: "168",
      shuffleChoices: true,
      explanation: "$480 \\cdot 0{,}35 = 168$ alumnos.",
    },
    {
      id: "check-mental",
      type: "fill_in_blank",
      help: [
        {
          label: "Mitad del 10 %",
          message: "El $10\\,\\%$ de $300$ es $30$. El $5\\,\\%$ es la mitad.",
        },
      ],
      title: "Cálculo mental",
      question: "Calcula mentalmente el $15\\,\\%$ de $300$ (solo el número)",
      correctAnswers: ["45"],
      explanation: "$10\\,\\% = 30$, $5\\,\\% = 15$; $30 + 15 = 45$.",
    },
  ],
};
