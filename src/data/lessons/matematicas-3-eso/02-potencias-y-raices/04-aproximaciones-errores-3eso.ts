import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const aproximacionesErrores3esoLesson: InteractiveLesson = {
  slug: "aproximaciones-errores-3eso",
  title: "4. Aproximaciones y errores",
  subtitle: TEMA_3ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "aproximar",
      type: "slide",
      help: [
        {
          label: "Para qué",
          message: "A veces no hace falta (o no se puede) dar el valor exacto: «tres millones y medio» basta para un premio de $3\\,527\\,834{,}56$ €.",
        },
        {
          label: "Redondear",
          message: "Se suprimen las cifras a la derecha del orden elegido; si la primera suprimida es $5$ o más, se suma $1$ a la anterior.",
        },
      ],
      title: "Números aproximados y cifras significativas",
      blocks: [
        {
          kind: "text",
          text: "Usamos **números aproximados** cuando no conviene dar la cantidad exacta o cuando no es posible medirla con exactitud.",
        },
        {
          kind: "definition",
          text: "Las **cifras significativas** son las que se usan para expresar un número aproximado. Solo deben escribirse aquellas cuya exactitud nos conste.",
        },
        {
          kind: "example",
          title: "Altura de un avión",
          lines: [
            { math: "9\\ \\text{km} \\to 1\\ \\text{cifra}" },
            { math: "9{,}2\\ \\text{km} \\to 2\\ \\text{cifras}" },
            { math: "9\\,246\\ \\text{m} \\to 4\\ \\text{cifras}" },
          ],
        },
        {
          kind: "warning",
          text: "Los ceros del final no son significativos cuando solo sirven para expresar la cantidad en la unidad deseada: $9\\,200$ m puede tener solo dos cifras significativas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "errores",
      type: "slide",
      help: [
        {
          label: "Error absoluto",
          message: "Es una distancia, así que no tiene signo: se calcula el valor absoluto de la diferencia.",
        },
        {
          label: "Error relativo",
          message: "Compara el error con el tamaño de lo que se mide: $50$ m de error son poco al medir un avión y mucho al medir un edificio.",
        },
      ],
      title: "Error absoluto y error relativo",
      blocks: [
        {
          kind: "compare",
          left: { title: "Error absoluto", text: "Diferencia en valor absoluto entre el valor real y el aproximado.", math: ["E_a = |\\text{real} - \\text{aprox.}|"], tone: "ok" },
          right: { title: "Error relativo", text: "Cociente entre el error absoluto y el valor real.", math: ["E_r = \\dfrac{E_a}{|\\text{real}|}"], tone: "info" },
        },
        {
          kind: "text",
          text: "Cuantas **más cifras significativas** se usan, **menor** es el error relativo.",
        },
      ],
      visual: { kind: "anim", scene: "error-aproximacion", params: { a: 7236, b: 7200 } },
    },
    {
      id: "cota",
      type: "slide",
      help: [
        {
          label: "A qué distancia está",
          message: "Si dices $9{,}2$ es porque el valor está más cerca de $9{,}2$ que de $9{,}1$ o de $9{,}3$.",
        },
        {
          label: "La mitad del orden",
          message: "El error es como mucho la mitad de una unidad del último orden: $\\frac{0{,}1}{2} = 0{,}05$.",
        },
      ],
      title: "Cota del error al redondear",
      blocks: [
        {
          kind: "rule",
          text: "Al aproximar por redondeo hasta un orden, el error absoluto es **menor o igual que la mitad** de una unidad de ese orden.",
          formula: "9{,}2\\ \\text{km} \;\\Rightarrow\; E_a < 0{,}05\\ \\text{km} = 50\\ \\text{m}",
        },
        {
          kind: "example",
          title: "Redondeo del precio de un coche",
          lines: [
            { math: "\\text{Real: } 12\\,387\\ \\text{€};\\quad \\text{aprox.: } 12\\,400\\ \\text{€}" },
            { math: "E_a = |12\\,387 - 12\\,400| = 13\\ \\text{€}" },
            { math: "E_r = \\dfrac{13}{12\\,387} \\approx 0{,}001 = 0{,}1\\,\\%" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-absoluto",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Resta y sin signo",
          message: "$|81{,}4 - 80|$ es la diferencia entre ambos, siempre positiva.",
        },
      ],
      title: "Error absoluto",
      question: "Una carrera dura $81{,}4$ min y se anuncia como $80$ min. ¿Cuál es el error absoluto en minutos? (solo el número)",
      correctAnswers: ["1,4", "1.4"],
      explanation: "$E_a = |81{,}4 - 80| = 1{,}4$ min.",
    },
    {
      id: "check-relativo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Divide entre el real",
          message: "El error relativo es $\\frac{E_a}{\\text{valor real}}$, con el valor real en el denominador.",
        },
      ],
      title: "Error relativo",
      question: "El altímetro de un avión marca $7\\,200$ m cuando la altura real es $7\\,236$ m. ¿Cuál es el error relativo, redondeado a las milésimas? (solo el número)",
      correctAnswers: ["0,005", "0.005"],
      explanation: "$E_a = 36$ m y $E_r = \\frac{36}{7\\,236} \\approx 0{,}005$, es decir, un $0{,}5\\,\\%$.",
    },
    {
      id: "check-comparar",
      type: "predict",
      help: [
        {
          label: "Importancia del error",
          message: "Un mismo error absoluto es más grave sobre una cantidad pequeña que sobre una grande.",
        },
      ],
      title: "Qué medida es más precisa",
      question: "Se pesa una ballena y se dice $37$ toneladas; se pesa un pavo y se dice $3$ kg. En ambos casos el error absoluto cometido es menor que la mitad de la última unidad. ¿En cuál es menor el error relativo?",
      mode: "choice",
      choices: [
        { id: "ballena", label: "En la ballena: tiene más cifras significativas" },
        { id: "pavo", label: "En el pavo: pesa menos", incorrectFeedback: "El error máximo es $0{,}5$ kg sobre $3$ kg (más del $16\\,\\%$); en la ballena es $0{,}5$ t sobre $37$ t (menos del $2\\,\\%$)." },
        { id: "igual", label: "Es el mismo, porque el error absoluto máximo es el mismo", incorrectFeedback: "Las unidades son distintas y los valores también: hay que dividir entre el valor real." },
      ],
      correctChoiceId: "ballena",
      shuffleChoices: true,
      explanation: "Para la ballena $\\frac{0{,}5}{37} \\approx 1{,}4\\,\\%$ y para el pavo $\\frac{0{,}5}{3} \\approx 17\\,\\%$.",
    },
    {
      id: "check-redondeo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Primera cifra suprimida",
          message: "En $2{,}3148$ a las centésimas se queda $2{,}31$ y la cifra siguiente es $4$, menor que $5$.",
        },
      ],
      title: "Redondeo",
      question: "Redondea $2{,}3148$ a las centésimas. (solo el número)",
      correctAnswers: ["2,31", "2.31"],
      explanation: "La primera cifra suprimida es $4$, menor que $5$: se queda $2{,}31$.",
    },
  ],
};
