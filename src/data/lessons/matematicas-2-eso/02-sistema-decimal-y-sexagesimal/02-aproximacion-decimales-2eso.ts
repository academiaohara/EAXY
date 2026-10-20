import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const aproximacionDecimales2esoLesson: InteractiveLesson = {
  slug: "aproximacion-decimales-2eso",
  title: "2. Aproximación de números decimales",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "redondeo",
      type: "slide",
      help: [
        {
          label: "Mira la primera cifra que se quita",
          message: "Solo decide esa cifra: si es $5$ o más, la última cifra que queda sube una unidad; si es menor que $5$, se queda igual.",
        },
        {
          label: "Por qué redondear",
          message: "En la vida real no se pagan milésimas de euro: se aproxima a los céntimos.",
        },
      ],
      title: "Redondeo",
      blocks: [
        {
          kind: "rule",
          title: "Regla del redondeo",
          text: "Se **suprimen las cifras decimales** a partir de un orden, y se **suma una unidad** a la última cifra que queda si la primera suprimida es **5 o mayor**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "2{,}818 \\to 2{,}8", label: "décimas" },
            { tex: "2{,}818 \\to 2{,}82", label: "centésimas" },
            { tex: "0{,}099 \\to 0{,}1", label: "décimas" },
            { tex: "0{,}099 \\to 0{,}10", label: "centésimas" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "redondeo-decimal", params: { dec: "2,818" } },
    },
    {
      id: "check-redondeo",
      type: "fill_in_blank",
      help: [
        {
          label: "Mira la milésima",
          message: "Para llegar a las centésimas, mira la milésima de $0{,}476$: es un $6$, mayor que $5$.",
        },
      ],
      title: "A las centésimas",
      question: "Redondea $0{,}476$ a las centésimas (escribe el número con coma)",
      correctAnswers: ["0,48", "0.48"],
      explanation: "La primera cifra suprimida es $6 \\ge 5$: el $7$ pasa a $8$. Queda $0{,}48$.",
    },
    {
      id: "error",
      type: "slide",
      help: [
        {
          label: "Qué mide el error",
          message: "Es lo que te alejas del valor real al aproximar. Siempre es una cantidad positiva: una distancia.",
        },
        {
          label: "Media unidad",
          message: "Al redondear a las décimas, el error nunca llega a media décima ($0{,}05$); a las centésimas, a media centésima ($0{,}005$).",
        },
      ],
      title: "El error del redondeo",
      blocks: [
        {
          kind: "definition",
          text: "El **error** de una aproximación es la **diferencia** (en valor absoluto) entre el valor exacto y el aproximado.",
        },
        {
          kind: "example",
          lines: [
            { math: "6{,}2235 \\to 6{,}2", note: "redondeo a las décimas" },
            { math: "\\text{error} = 6{,}2235 - 6{,}2 = 0{,}0235 < 0{,}05" },
          ],
        },
        {
          kind: "rule",
          text: "El error cometido al redondear es **menor que media unidad** del orden al que se aproxima.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-error",
      type: "predict",
      help: [
        {
          label: "Resta",
          message: "Calcula $3{,}1416 - 3{,}14$ y compara con media centésima, $0{,}005$.",
        },
      ],
      title: "Aproximar el número π",
      question: "Se aproxima $3{,}1416$ por $3{,}14$ (centésimas). ¿Cuál es el error cometido?",
      mode: "choice",
      choices: [
        { id: "a", label: "$0{,}0016$" },
        { id: "b", label: "$0{,}016$", incorrectFeedback: "La coma está mal colocada: $3{,}1416 - 3{,}1400 = 0{,}0016$." },
        { id: "c", label: "$0{,}01$", incorrectFeedback: "Eso es una centésima entera; el error de redondear siempre es menor que media centésima." },
        { id: "d", label: "$0{,}14$", incorrectFeedback: "Es la parte decimal de $3{,}14$, no la diferencia entre los dos números." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3{,}1416 - 3{,}14 = 0{,}0016 < 0{,}005$ (media centésima).",
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "Un decimal más",
          message: "Para redondear a las centésimas calcula el cociente con una cifra más (la milésima) y mira si es 5 o más.",
        },
        {
          label: "Periódicos",
          message: "$10 : 3$ nunca termina: siempre sale $3$ y el resto es $1$. Hay que cortar y redondear.",
        },
      ],
      title: "Aproximar un cociente",
      blocks: [
        {
          kind: "text",
          text: "Si una división no es exacta, el cociente puede tener infinitas cifras. Se **corta** en el orden que interesa y se **redondea**.",
        },
        {
          kind: "example",
          lines: [
            { math: "10 : 3 = 3{,}333\\dots \\approx 3{,}33", note: "centésimas: la milésima es $3 < 5$" },
            { math: "2 : 3 = 0{,}666\\dots \\approx 0{,}67", note: "centésimas: la milésima es $6 \\ge 5$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["10", "3"], places: 2 } },
    },
    {
      id: "check-cociente",
      type: "predict",
      help: [
        {
          label: "Una cifra más",
          message: "$5 : 6 = 0{,}8333\\dots$ La milésima es $3$.",
        },
      ],
      title: "Repartir un gasto",
      question: "Cinco euros se reparten entre $6$ personas. ¿Cuánto paga cada una, redondeando a céntimos?",
      mode: "choice",
      choices: [
        { id: "a", label: "$0{,}83$ €" },
        { id: "b", label: "$0{,}84$ €", incorrectFeedback: "La milésima de $0{,}8333\\dots$ es $3 < 5$: no se sube." },
        { id: "c", label: "$0{,}8$ €", incorrectFeedback: "Se pide a céntimos (centésimas): $0{,}83$." },
        { id: "d", label: "$0{,}85$ €", incorrectFeedback: "Redondea $0{,}8333\\dots$: la tercera cifra decimal es $3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$5 : 6 = 0{,}8333\\dots \\approx 0{,}83$ €.",
    },
  ],
};
