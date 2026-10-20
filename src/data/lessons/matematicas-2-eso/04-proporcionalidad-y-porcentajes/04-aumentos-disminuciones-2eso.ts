import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const aumentosDisminuciones2esoLesson: InteractiveLesson = {
  slug: "aumentos-disminuciones-2eso",
  title: "4. Aumentos y disminuciones porcentuales",
  subtitle: TEMA_2ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "aumento",
      type: "slide",
      help: [
        {
          label: "Dos pasos",
          message: "Primero calculas cuánto es el aumento (el $20\\,\\%$ del precio) y después se lo sumas al precio inicial.",
        },
        {
          label: "Estima",
          message: "El $20\\,\\%$ es una quinta parte: $460 : 5 = 92$.",
        },
      ],
      title: "Aumento porcentual",
      blocks: [
        {
          kind: "text",
          text: "Un billete de avión a París costaba $460$ € y ha subido un $20\\,\\%$. ¿Cuánto cuesta ahora?",
        },
        {
          kind: "rule",
          formula: "\\text{precio nuevo} = \\text{precio viejo} + \\text{aumento}",
        },
        {
          kind: "example",
          lines: [
            { math: "460 \\cdot 0{,}20 = 92" },
            { math: "460 + 92 = 552\\,€" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "aumento-barra", params: { a: 460, b: 20, sign: "+" } },
    },
    {
      id: "disminucion",
      type: "slide",
      help: [
        {
          label: "Se resta",
          message: "En una rebaja el descuento se **resta** del precio inicial.",
        },
        {
          label: "Comprueba",
          message: "El precio rebajado tiene que ser menor que el inicial, pero no menor que la mitad con un $15\\,\\%$.",
        },
      ],
      title: "Disminución porcentual",
      blocks: [
        {
          kind: "text",
          text: "Un televisor de $900$ € se rebaja un $15\\,\\%$. ¿Cuánto cuesta ahora?",
        },
        {
          kind: "rule",
          formula: "\\text{precio nuevo} = \\text{precio viejo} - \\text{rebaja}",
        },
        {
          kind: "example",
          lines: [
            { math: "900 \\cdot 0{,}15 = 135" },
            { math: "900 - 135 = 765\\,€" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "aumento-barra", params: { a: 900, b: 15, sign: "-" } },
    },
    {
      id: "factor",
      type: "slide",
      help: [
        {
          label: "Por qué 1,20",
          message: "Un aumento del $20\\,\\%$ deja el $100\\,\\% + 20\\,\\% = 120\\,\\%$ del precio: $1{,}20$.",
        },
        {
          label: "Y para la rebaja",
          message: "Con una rebaja del $15\\,\\%$ queda el $100\\,\\% - 15\\,\\% = 85\\,\\%$: $0{,}85$.",
        },
      ],
      title: "Otra forma: un único factor",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Aumento del $a\\,\\%$",
            text: "Se multiplica por $1 + \\frac{a}{100}$.",
            math: ["460 \\cdot 1{,}20 = 552"],
            tone: "ok",
          },
          right: {
            title: "Disminución del $a\\,\\%$",
            text: "Se multiplica por $1 - \\frac{a}{100}$.",
            math: ["900 \\cdot 0{,}85 = 765"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "factor-cambio", params: { a: 460, b: 20, c: 900, d: 15 } },
    },
    {
      id: "check-iva",
      type: "fill_in_blank",
      help: [
        {
          label: "Un solo factor",
          message: "Con un $21\\,\\%$ de IVA se multiplica por $1{,}21$.",
        },
      ],
      title: "Precio con IVA",
      question: "Un producto cuesta $80$ € sin IVA. Con un IVA del $21\\,\\%$, ¿cuánto cuesta en euros? (escribe el número con coma)",
      correctAnswers: ["96,8", "96,80", "96.8", "96.80"],
      explanation: "$80 \\cdot 1{,}21 = 96{,}80$ €.",
    },
    {
      id: "check-rebaja",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Factor de rebaja",
          message: "Una rebaja del $30\\,\\%$ deja el $70\\,\\%$ del precio: $0{,}70$.",
        },
      ],
      title: "Rebajas",
      question: "Una chaqueta de $120$ € se rebaja un $30\\,\\%$. ¿Cuánto cuesta ahora?",
      mode: "choice",
      choices: [
        { id: "84", label: "$84$ €" },
        { id: "36", label: "$36$ €", incorrectFeedback: "Es la rebaja ($0{,}30 \\cdot 120$), no el precio final." },
        { id: "156", label: "$156$ €", incorrectFeedback: "Has sumado el $30\\,\\%$ en vez de restarlo." },
        { id: "90", label: "$90$ €", incorrectFeedback: "Has restado $30$ € en vez del $30\\,\\%$ del precio." },
      ],
      correctChoiceId: "84",
      shuffleChoices: true,
      explanation: "$120 \\cdot 0{,}70 = 84$ €.",
    },
    {
      id: "check-inversa",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Plantea",
          message: "Si el precio inicial es $x$, entonces $x \\cdot 1{,}25 = 150$.",
        },
        {
          label: "No restes el 25 %",
          message: "El $25\\,\\%$ se calculó sobre el precio inicial, no sobre el final: quitar el $25\\,\\%$ de $150$ no devuelve el precio original.",
        },
      ],
      title: "¿Cuánto costaba antes?",
      question: "Tras subir un $25\\,\\%$, un abrigo cuesta $150$ €. ¿Cuánto costaba antes de la subida?",
      mode: "choice",
      choices: [
        { id: "120", label: "$120$ €" },
        { id: "112.5", label: "$112{,}50$ €", incorrectFeedback: "Has quitado el $25\\,\\%$ de $150$; el aumento se aplicó sobre el precio original, que es menor." },
        { id: "125", label: "$125$ €", incorrectFeedback: "Has restado $25$ € en vez de dividir entre $1{,}25$." },
        { id: "187.5", label: "$187{,}50$ €", incorrectFeedback: "Eso sería subir otro $25\\,\\%$ sobre $150$." },
      ],
      correctChoiceId: "120",
      shuffleChoices: true,
      explanation: "$x \\cdot 1{,}25 = 150 \\Rightarrow x = 150 : 1{,}25 = 120$ €.",
    },
  ],
};
