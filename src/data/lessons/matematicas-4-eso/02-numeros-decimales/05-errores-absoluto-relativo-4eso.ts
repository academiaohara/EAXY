import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const erroresAbsolutoRelativo4esoLesson: InteractiveLesson = {
  slug: "errores-absoluto-relativo-4eso",
  title: "5. Error absoluto y error relativo",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "error-absoluto",
      type: "slide",
      help: [
        {
          label: "Por qué se usa valor absoluto",
          message: "Un error no tiene signo: equivocarse por $3$ de más o por $3$ de menos es el mismo tamaño de error.",
        },
        {
          label: "Lo desconocido",
          message: "Si no conocemos el valor real, tampoco podemos conocer el error exacto. Lo que sí se puede es **acotarlo**: decir «es menor que…».",
        },
      ],
      title: "Error absoluto: cuánto nos equivocamos",
      blocks: [
        {
          kind: "definition",
          text: "El **error absoluto** es la diferencia entre el valor real y el aproximado: $\;E_a = |\\,\\text{valor real} - \\text{aproximación}\\,|$.",
        },
        {
          kind: "text",
          text: "Casi nunca se conoce el valor real, así que no se calcula el error, sino una **cota**: un número del que sabemos que el error es menor.",
        },
      ],
      visual: { kind: "anim", scene: "error-aproximacion", params: { a: 183594, b: 180000 } },
    },
    {
      id: "cota",
      type: "slide",
      help: [
        {
          label: "Por qué 5 unidades",
          message: "Al redondear a un orden, se sube o se baja a la marca más cercana. La distancia máxima a esa marca es **media unidad** del orden: justo 5 unidades del orden de la cifra siguiente.",
        },
        {
          label: "Ejemplo",
          message: "$81\\,394 \\to 81\\,000$: se suprime la cifra de las centenas, así que el error es menor que $5$ centenas $= 500$.",
        },
      ],
      title: "La cota del error al redondear",
      blocks: [
        {
          kind: "rule",
          title: "Cota al redondear",
          text: "El error cometido es **menor que 5 unidades del orden de la primera cifra suprimida**.",
        },
        {
          kind: "example",
          lines: [
            { math: "81\\,394 \\to 81\\,000 \\qquad E_a < 500", note: "se suprime la centena" },
            { math: "183\\,594 \\to 180\\,000 \\qquad E_a < 5\\,000", note: "se suprime el millar" },
            { math: "11\\,892\\,583 \\to 12\\ \\text{millones} \\qquad E_a < 0{,}5\\ \\text{millones}", note: "se suprime la centena de millar" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "aproximacion-explorador", params: { a: 8, b: 3 }, hint: "Cambia el orden del redondeo: la cota siempre es la mitad de una unidad de ese orden." },
    },
    {
      id: "check-error-absoluto",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta",
          message: "$15{,}123 \\to 15{,}12$: error $= |15{,}123 - 15{,}12| = 0{,}003$.",
        },
      ],
      title: "Un error exacto",
      question: "Calcula el error absoluto al redondear $15{,}123$ a las centésimas. (escribe el número con coma)",
      correctAnswers: ["0,003", "0.003"],
      explanation: "$15{,}123 \\to 15{,}12$, y $|15{,}123 - 15{,}12| = 0{,}003$.",
    },
    {
      id: "check-cota",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Primera cifra suprimida",
          message: "En $234\\,590 \\to 200\\,000$ la primera cifra suprimida es la de los **decenas de millar** (el $3$). Cinco de esas unidades son $50\\,000$.",
        },
      ],
      title: "Cota del error",
      question: "Se aproxima $234\\,590$ por $200\\,000$ (una cifra significativa). ¿Qué cota del error absoluto es correcta?",
      choices: [
        { id: "a", label: "Menor que $50\\,000$" },
        { id: "b", label: "Menor que $5\\,000$", incorrectFeedback: "Esa cota corresponde a suprimir el millar. Aquí se suprime la decena de millar ($3\\cdot 10\\,000$)." },
        { id: "c", label: "Menor que $500\\,000$", incorrectFeedback: "Es demasiado grande: la primera cifra suprimida es la decena de millar, no la centena." },
        { id: "d", label: "Exactamente $34\\,590$", incorrectFeedback: "Eso es lo que vale el error si se conoce el valor real; la cota solo dice entre qué se mueve." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La primera cifra suprimida es la decena de millar: el error es menor que $5$ decenas de millar $= 50\\,000$.",
    },
    {
      id: "error-relativo",
      type: "slide",
      help: [
        {
          label: "Qué mide",
          message: "El error relativo dice cuánto pesa el error **sobre el tamaño de lo que se mide**: equivocarse $1$ cm midiendo una mesa no es lo mismo que equivocarse $1$ cm midiendo un lápiz.",
        },
        {
          label: "Como porcentaje",
          message: "Se multiplica por $100$: un error relativo de $0{,}04$ es un $4\\,\\%$.",
        },
      ],
      title: "Error relativo: el peso del error",
      blocks: [
        {
          kind: "text",
          text: "El mismo error absoluto no pesa igual sobre una medida grande que sobre una pequeña. Para comparar la «finura» de dos mediciones hace falta el **error relativo**.",
        },
        {
          kind: "rule",
          formula: "E_r = \\dfrac{E_a}{\\text{valor real}}",
        },
        {
          kind: "text",
          text: "El error relativo es tanto menor cuantas **más cifras significativas** se usen. Suele darse como cota o como porcentaje.",
        },
      ],
      visual: { kind: "anim", scene: "error-relativo-comparar", params: { a: 126, b: 13, c: 0.5, titles: ["Distancia entre dos ciudades", "Anchura de un arroyo"], unit: "km|m" } },
    },
    {
      id: "check-mas-fina",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Compara los cocientes",
          message: "$\\frac{0{,}5}{126} \\approx 0{,}004$ y $\\frac{0{,}5}{13} \\approx 0{,}04$. El menor error relativo corresponde a la medida más precisa.",
        },
      ],
      title: "¿Qué medida es más precisa?",
      question: "Se mide una distancia de $126$ km y la anchura de un arroyo de $13$ m, las dos con un error absoluto menor que $0{,}5$ (km y m, respectivamente). ¿Qué medida es proporcionalmente más precisa?",
      choices: [
        { id: "a", label: "La distancia de $126$ km" },
        { id: "b", label: "La anchura del arroyo", incorrectFeedback: "Se equivoca en $0{,}5$ m sobre $13$ m (casi un $4\\,\\%$): relativamente es la más burda." },
        { id: "c", label: "Las dos son igual de precisas", incorrectFeedback: "Tienen el mismo error absoluto pero distinto error relativo: $0{,}4\\,\\%$ frente a $3{,}8\\,\\%$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Error relativo: $\\frac{0{,}5}{126} \\approx 0{,}004$ ($0{,}4\\,\\%$) frente a $\\frac{0{,}5}{13} \\approx 0{,}04$ ($4\\,\\%$).",
    },
    {
      id: "check-relativo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Cota entre aproximación",
          message: "Cota del error relativo $< \\dfrac{\\text{cota absoluta}}{\\text{aproximación}} = \\dfrac{50\\,000}{200\\,000}$.",
        },
      ],
      title: "Cota del error relativo",
      question: "Se aproxima $234\\,590$ manifestantes por $200\\,000$ (error absoluto $< 50\\,000$). ¿Qué cota del error relativo se obtiene? (escribe el número con coma)",
      correctAnswers: ["0,25", "0.25"],
      explanation: "$\\frac{50\\,000}{200\\,000} = 0{,}25$: ¡un $25\\,\\%$! Con una sola cifra significativa el error relativo es muy grande.",
    },
  ],
};
