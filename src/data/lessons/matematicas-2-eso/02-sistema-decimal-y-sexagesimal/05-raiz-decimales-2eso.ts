import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`); con una sola, JS la elimina. */
export const raizDecimales2esoLesson: InteractiveLesson = {
  slug: "raiz-decimales-2eso",
  title: "5. Raíz cuadrada de un número decimal",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "exactas",
      type: "slide",
      help: [
        {
          label: "Misma idea que con enteros",
          message: "$\\sqrt{a} = b$ significa $b^2 = a$. Con decimales se busca un decimal que elevado al cuadrado dé el radicando.",
        },
        {
          label: "Cifras decimales",
          message: "Al elevar al cuadrado, el número de cifras decimales se duplica: $1{,}2^2 = 1{,}44$. Por eso la raíz tiene la mitad de decimales que el radicando.",
        },
      ],
      title: "Raíces exactas de decimales",
      blocks: [
        {
          kind: "text",
          text: "La raíz cuadrada es la operación inversa de elevar al cuadrado, también con decimales.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{0{,}25} = 0{,}5 \\iff 0{,}5^2 = 0{,}25" },
            { math: "\\sqrt{1{,}44} = 1{,}2 \\iff 1{,}2^2 = 1{,}44" },
          ],
        },
        {
          kind: "story",
          text: "Una parcela cuadrada tiene **17,64 dam²** de superficie. Su lado $x$ cumple $x \\cdot x = 17{,}64$, es decir, $x = \\sqrt{17{,}64} = 4{,}2$ dam.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-exacta",
      type: "fill_in_blank",
      help: [
        {
          label: "Tanteo",
          message: "Busca un decimal con una cifra decimal cuyo cuadrado sea $2{,}25$. Prueba $1{,}5 \\cdot 1{,}5$.",
        },
      ],
      title: "Una raíz exacta",
      question: "Calcula $\\sqrt{2{,}25}$ (escribe el número con coma)",
      correctAnswers: ["1,5", "1.5"],
      explanation: "$1{,}5^2 = 2{,}25$, luego $\\sqrt{2{,}25} = 1{,}5$.",
    },
    {
      id: "tanteo",
      type: "slide",
      help: [
        {
          label: "Atrapar entre dos valores",
          message: "Primero entre dos enteros, luego entre dos décimas consecutivas, luego entre dos centésimas… Cada paso añade una cifra.",
        },
        {
          label: "Siempre hay una más",
          message: "La raíz de $7$ nunca termina: es un decimal no exacto y no periódico. Podemos acercarnos tanto como queramos.",
        },
      ],
      title: "Raíces no exactas: aproximar por tanteo",
      blocks: [
        {
          kind: "text",
          text: "Cuando la raíz no es exacta se **atrapa** entre dos números consecutivos del orden que se quiera.",
        },
        {
          kind: "example",
          title: "Aproximaciones de √7",
          lines: [
            { math: "2^2 = 4 < 7 < 9 = 3^2 \\ \\Rightarrow\\  2 < \\sqrt{7} < 3" },
            { math: "2{,}6^2 = 6{,}76 < 7 < 7{,}29 = 2{,}7^2 \\ \\Rightarrow\\  2{,}6 < \\sqrt{7} < 2{,}7" },
            { math: "2{,}64^2 = 6{,}9696 < 7 < 7{,}0225 = 2{,}65^2 \\ \\Rightarrow\\  2{,}64 < \\sqrt{7} < 2{,}65" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["2²=4", "<", "7", "<", "3²=9"], note: "entre dos enteros: $2 < \\sqrt{7} < 3$." },
            { tokens: ["2,6²=6,76", "<", "7", "<", "2,7²=7,29"], active: [0, 4], note: "entre dos décimas: $2{,}6 < \\sqrt{7} < 2{,}7$." },
            { tokens: ["2,64²=6,9696", "<", "7", "<", "2,65²=7,0225"], active: [0, 4], note: "entre dos centésimas: $2{,}64 < \\sqrt{7} < 2{,}65$." },
            { tokens: ["√7", "≈", "2,65"], fresh: [0, 2], note: "redondeando a las centésimas, $\\sqrt{7} \\approx 2{,}65$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-tanteo",
      type: "predict",
      help: [
        {
          label: "Calcula los cuadrados",
          message: "$3{,}1^2 = 9{,}61$ y $3{,}2^2 = 10{,}24$. ¿Entre cuáles queda $10$?",
        },
      ],
      title: "Entre qué décimas",
      question: "¿Entre qué dos décimas consecutivas está $\\sqrt{10}$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3{,}1 < \\sqrt{10} < 3{,}2$" },
        { id: "b", label: "$3{,}0 < \\sqrt{10} < 3{,}1$", incorrectFeedback: "$3{,}1^2 = 9{,}61 < 10$: la raíz ya pasó de $3{,}1$." },
        { id: "c", label: "$3{,}2 < \\sqrt{10} < 3{,}3$", incorrectFeedback: "$3{,}2^2 = 10{,}24 > 10$: la raíz queda antes de $3{,}2$." },
        { id: "d", label: "$1{,}0 < \\sqrt{10} < 1{,}1$", incorrectFeedback: "$1{,}1^2 = 1{,}21$, muy lejos de $10$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3{,}1^2 = 9{,}61 < 10 < 10{,}24 = 3{,}2^2$.",
    },
    {
      id: "calculadora",
      type: "slide",
      help: [
        {
          label: "Cuántos decimales",
          message: "La calculadora muestra muchos decimales; tú decides a qué orden redondeas mirando la cifra siguiente.",
        },
        {
          label: "Comprueba",
          message: "Eleva al cuadrado el resultado redondeado: debe acercarse al radicando.",
        },
      ],
      title: "Con la calculadora",
      blocks: [
        {
          kind: "text",
          text: "Con la tecla $\\sqrt{\\ }$ se obtiene la raíz con muchas cifras; después se **aproxima** al orden pedido.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{35} = 5{,}9160797\\dots" },
            { math: "\\sqrt{35} \\approx 5{,}92", note: "centésimas" },
            { math: "\\sqrt{35} \\approx 5{,}916", note: "milésimas" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-calculadora",
      type: "fill_in_blank",
      help: [
        {
          label: "Décimas",
          message: "$\\sqrt{35} = 5{,}916\\dots$ A las décimas: mira la centésima, que es $1$.",
        },
      ],
      title: "A las décimas",
      question: "Aproxima $\\sqrt{35}$ a las décimas (escribe el número con coma)",
      correctAnswers: ["5,9", "5.9"],
      explanation: "$5{,}9160797\\dots$: la centésima es $1 < 5$, así que queda $5{,}9$.",
    },
    {
      id: "check-lado",
      type: "predict",
      help: [
        {
          label: "Área y lado",
          message: "El lado de un cuadrado es la raíz cuadrada de su área.",
        },
      ],
      title: "Lado de un cuadrado",
      question: "Una pieza cuadrada tiene una superficie de $6{,}25$ m². ¿Cuánto mide su lado?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2{,}5$ m" },
        { id: "b", label: "$3{,}125$ m", incorrectFeedback: "Has dividido entre $2$; el lado es la raíz del área." },
        { id: "c", label: "$25$ m", incorrectFeedback: "Comprueba: $25^2 = 625$." },
        { id: "d", label: "$0{,}25$ m", incorrectFeedback: "$0{,}25^2 = 0{,}0625$, no $6{,}25$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{6{,}25} = 2{,}5$, porque $2{,}5^2 = 6{,}25$.",
    },
  ],
};
