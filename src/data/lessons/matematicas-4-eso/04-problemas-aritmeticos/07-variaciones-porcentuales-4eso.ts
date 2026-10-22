import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const variacionesPorcentuales4esoLesson: InteractiveLesson = {
  slug: "variaciones-porcentuales-4eso",
  title: "7. Aumentos, disminuciones e índice de variación",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "indice",
      type: "slide",
      help: [
        {
          label: "Por qué 1 + …",
          message: "Subir un $15\\,\\%$ es quedarse con el $100\\,\\%$ de lo que había **más** el $15\\,\\%$: el $115\\,\\% = 1{,}15$.",
        },
        {
          label: "Una sola multiplicación",
          message: "Es más rápido que calcular el aumento y sumarlo: $5\\,400 \\cdot 1{,}15$ da el valor final directamente.",
        },
      ],
      title: "El índice de variación",
      blocks: [
        {
          kind: "definition",
          text: "El **índice de variación** es el número por el que hay que **multiplicar** la cantidad inicial para obtener la final.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{aumento } 15\\,\\% \\to 1{,}15" },
            { tex: "\\text{disminución } 15\\,\\% \\to 0{,}85" },
          ],
        },
        {
          kind: "rule",
          text: "Aumento: $1 + \\text{aumento}$. Disminución: $1 - \\text{disminución}$ (en forma decimal).",
        },
      ],
      visual: { kind: "anim", scene: "factor-cambio", params: { a: 5400, b: 15, c: 1400, d: 15 } },
    },
    {
      id: "check-indice",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Resta y suma",
          message: "Rebajar un $30\\,\\%$ es quedarse con el $70\\,\\%$: $1 - 0{,}30 = 0{,}70$.",
        },
      ],
      title: "¿Qué índice?",
      question: "¿Cuál es el índice de variación de una **rebaja del 30 %**?",
      choices: [
        { id: "a", label: "$0{,}70$" },
        { id: "b", label: "$1{,}30$", incorrectFeedback: "Eso es un **aumento** del $30\\,\\%$. En una rebaja se resta: $1 - 0{,}30$." },
        { id: "c", label: "$0{,}30$", incorrectFeedback: "Eso es el $30\\,\\%$ de la cantidad, lo que se **descuenta**. El precio final es el $70\\,\\%$." },
        { id: "d", label: "$0{,}03$", incorrectFeedback: "Has dividido entre $1\\,000$. El $30\\,\\%$ es $0{,}30$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$1 - 0{,}30 = 0{,}70$: el precio final es el $70\\,\\%$ del inicial.",
    },
    {
      id: "check-impresora",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Índice",
          message: "Subida del $7\\,\\%$: $1{,}07$.",
        },
      ],
      title: "Una subida",
      question: "Una tienda sube todos los productos un $7\\,\\%$. Un ordenador valía $840$ €. ¿Cuánto vale ahora? (escribe el número con coma)",
      correctAnswers: ["898,8", "898.8", "898,80"],
      explanation: "$840 \\cdot 1{,}07 = 898{,}80$ €.",
    },
    {
      id: "check-coche",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Índice",
          message: "Si me dan un $35\\,\\%$ menos: $1 - 0{,}35 = 0{,}65$.",
        },
      ],
      title: "Un coche usado",
      question: "Compré un coche por $8\\,000$ €. Si lo vendiera ahora me darían un $35\\,\\%$ menos de su valor inicial. ¿Cuánto me darían? (solo el número)",
      correctAnswers: ["5200"],
      explanation: "$8\\,000 \\cdot 0{,}65 = 5\\,200$ €.",
    },
    {
      id: "encadenadas",
      type: "slide",
      help: [
        {
          label: "Se multiplican",
          message: "Cada variación se aplica sobre el resultado de la anterior, así que los **índices se multiplican**: $0{,}80 \\cdot 0{,}60 = 0{,}48$.",
        },
        {
          label: "No se suman",
          message: "Sumar $-20\\,\\%$ y $-40\\,\\%$ da $-60\\,\\%$, pero lo correcto es $-52\\,\\%$: el $40\\,\\%$ se calcula sobre los que **quedan**, no sobre los iniciales.",
        },
      ],
      title: "Dos variaciones seguidas: se multiplican los índices",
      blocks: [
        {
          kind: "text",
          text: "En una carrera abandonan el $20\\,\\%$ de los corredores la primera semana y el $40\\,\\%$ **de los que quedaban** la segunda. ¿Qué porcentaje de los iniciales sigue en carrera?",
        },
        {
          kind: "rule",
          formula: "I_{\\text{total}} = I_1 \\cdot I_2 = 0{,}80 \\cdot 0{,}60 = 0{,}48 \\to 48\\,\\%",
        },
        {
          kind: "warning",
          text: "Las variaciones porcentuales **no se suman**: $-20\\,\\%$ y $-40\\,\\%$ no son $-60\\,\\%$, sino $-52\\,\\%$.",
        },
      ],
      visual: { kind: "tool", tool: "indice-variacion-explorador", params: { a: 100, b: -20, c: -40 }, hint: "Prueba un +20 % seguido de un −20 %: ¿se vuelve al valor inicial?" },
    },
    {
      id: "check-carrera",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Índices",
          message: "$0{,}80 \\cdot 0{,}60 = 0{,}48$: queda el $48\\,\\%$.",
        },
      ],
      title: "Corredores que siguen",
      question: "En una carrera abandonan el $20\\,\\%$ de los corredores la primera semana y el $40\\,\\%$ de los que quedaban la segunda. ¿Qué porcentaje de los que empezaron sigue en carrera? (solo el número)",
      correctAnswers: ["48"],
      explanation: "$0{,}80 \\cdot 0{,}60 = 0{,}48$: sigue el $48\\,\\%$.",
    },
    {
      id: "check-gps",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Dos índices",
          message: "Rebaja del $20\\,\\%$: $0{,}80$. IVA del $18\\,\\%$: $1{,}18$. $556 \\cdot 0{,}80 \\cdot 1{,}18$.",
        },
      ],
      title: "Rebaja e IVA",
      question: "Un GPS cuesta $556$ €. Le hacen una rebaja del $20\\,\\%$ y después le cargan un $18\\,\\%$ de IVA. ¿Cuánto paga? (escribe el número con coma, con dos decimales)",
      correctAnswers: ["524,86", "524.86"],
      explanation: "$556 \\cdot 0{,}80 \\cdot 1{,}18 = 524{,}8640 \\approx 524{,}86$ €.",
    },
    {
      id: "inverso",
      type: "slide",
      help: [
        {
          label: "De final a inicial",
          message: "Si $C \\cdot I = F$, entonces $C = F : I$. Es una división, no una resta.",
        },
        {
          label: "La trampa",
          message: "No se puede calcular el $17\\,\\%$ de $81{,}34$ y sumarlo: el $17\\,\\%$ se calculó sobre el precio **inicial**, no sobre el final.",
        },
      ],
      title: "Al revés: hallar el precio inicial",
      blocks: [
        {
          kind: "text",
          text: "Gonzalo ha pagado $81{,}34$ € por unos zapatos rebajados un $17\\,\\%$. ¿Cuánto costaban antes?",
        },
        {
          kind: "example",
          lines: [
            { math: "0{,}83 \\cdot \\text{precio inicial} = 81{,}34" },
            { math: "\\text{precio inicial} = 81{,}34 : 0{,}83 = 98\\ €" },
          ],
        },
        {
          kind: "warning",
          text: "El $17\\,\\%$ **no** se calcula sobre $81{,}34$: es el $17\\,\\%$ del precio **antes** de la rebaja.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-camisa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Divide",
          message: "Rebaja del $10\\,\\%$: pagó el $90\\,\\%$, así que $0{,}90 \\cdot P = 63$.",
        },
      ],
      title: "Una camisa rebajada",
      question: "Ignacio ha pagado $63$ € por una camisa rebajada un $10\\,\\%$. ¿Cuánto costaba antes de la rebaja? (solo el número)",
      correctAnswers: ["70"],
      explanation: "$P = 63 : 0{,}90 = 70$ €.",
    },
    {
      id: "check-piso",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "IVA y gastos",
          message: "IVA: $180\\,000 \\cdot 1{,}08 = 194\\,400$. Se suman además los $5\\,400$ € de notaría.",
        },
      ],
      title: "Gasto total de un piso",
      question: "Para comprar un piso de $180\\,000$ € hay que pagar además un $8\\,\\%$ de IVA y $5\\,400$ € de notaría y gestión. ¿Cuál es el gasto total? (solo el número, en euros)",
      correctAnswers: ["199800", "199 800", "199.800"],
      explanation: "$180\\,000 \\cdot 1{,}08 = 194\\,400$ y $194\\,400 + 5\\,400 = 199\\,800$ €.",
    },
  ],
};
