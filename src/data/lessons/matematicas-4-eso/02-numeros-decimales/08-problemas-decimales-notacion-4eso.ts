import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const problemasDecimalesNotacion4esoLesson: InteractiveLesson = {
  slug: "problemas-decimales-notacion-4eso",
  title: "8. Problemas con decimales, errores y notación científica",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "estrategia",
      type: "slide",
      help: [
        {
          label: "Unidades primero",
          message: "En problemas de ciencia, lo que más falla es mezclar unidades (g con kg, cm con km). Pasa todo a la misma unidad **antes** de operar.",
        },
        {
          label: "Estimar",
          message: "Antes de calcular, estima el orden de magnitud: ¿esperas un número de millones, de miles de millones…? Así detectas errores de exponente.",
        },
      ],
      title: "Antes de calcular: unidades y orden de magnitud",
      blocks: [
        {
          kind: "steps",
          title: "Método",
          items: [
            "Pasa los datos a **notación científica** y a la **misma unidad**.",
            "Estima el orden de magnitud del resultado.",
            "Opera (mantisas por un lado, potencias de $10$ por otro).",
            "Ajusta la mantisa a $[1, 10)$ y redondea con las **cifras significativas** adecuadas.",
          ],
        },
      ],
      visual: { kind: "tool", tool: "notacion-explorador", params: { a: 138, b: 8 }, hint: "Teclea 1,38 y exponente 8: es 138 toneladas expresadas en gramos. ¿Cuántos ceros tiene?" },
    },
    {
      id: "check-detergente",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Producto",
          message: "$735 \\cdot 10{,}95 = 735 \\cdot 10 + 735 \\cdot 0{,}95 = 7\\,350 + 698{,}25$.",
        },
      ],
      title: "La recaudación",
      question: "En un supermercado se venden $735$ unidades de un detergente a $10{,}95$ € cada una. ¿Cuántos euros se han recaudado? (escribe el número con coma)",
      correctAnswers: ["8048,25", "8048.25", "8 048,25"],
      explanation: "$735 \\cdot 10{,}95 = 8\\,048{,}25$ €.",
    },
    {
      id: "check-detergente-error",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Dos cifras significativas",
          message: "Con dos cifras: $8\\,048{,}25 \\approx 8\\,000$. Error: $|8\\,048{,}25 - 8\\,000|$.",
        },
      ],
      title: "Error al aproximar",
      question: "Aproxima la recaudación $8\\,048{,}25$ € con dos cifras significativas ($8\\,000$ €). ¿Cuánto vale el error absoluto? (escribe el número con coma)",
      correctAnswers: ["48,25", "48.25"],
      explanation: "$|8\\,048{,}25 - 8\\,000| = 48{,}25$ €. Una cota, según la regla, es $5$ decenas: error $< 50$ €.",
    },
    {
      id: "check-presupuesto",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "En notación científica",
          message: "$3\\,430$ millones $= 3{,}43 \\cdot 10^{9}$ €. Con dos cifras: $3{,}4 \\cdot 10^{9}$. Se suprime el $3$ de $3{,}43$: la cota absoluta es $5 \\cdot 10^{7}$ (50 millones).",
        },
      ],
      title: "Presupuesto de infraestructuras",
      question: "El presupuesto de una región es de $3\\,430$ millones de €. Se aproxima por $3{,}4 \\cdot 10^{9}$ (dos cifras significativas), con error absoluto $< 5 \\cdot 10^{7}$ €. ¿Qué cota del error relativo se obtiene? Da el resultado con tres decimales (escribe el número con coma).",
      correctAnswers: ["0,015", "0.015"],
      explanation: "$\\dfrac{5 \\cdot 10^{7}}{3{,}4 \\cdot 10^{9}} \\approx 0{,}0147 \\approx 0{,}015$ (un $1{,}5\\,\\%$).",
    },
    {
      id: "check-virus",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Pasa a gramos",
          message: "$138$ t $= 138 \\cdot 10^{6}$ g $= 1{,}38 \\cdot 10^{8}$ g. Cuántos virus: $\\dfrac{1{,}38 \\cdot 10^{8}}{10^{-18}}$.",
        },
      ],
      title: "Una ballena y un virus",
      question: "El ser vivo más pequeño es un virus de $10^{-18}$ g; el mayor, la ballena azul, pesa unas $138$ t. ¿Cuántos virus igualan el peso de una ballena? Es $1{,}38 \\cdot 10^{n}$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["26"],
      explanation: "$138$ t $= 1{,}38 \\cdot 10^{8}$ g. Dividido entre $10^{-18}$: $1{,}38 \\cdot 10^{8 - (-18)} = 1{,}38 \\cdot 10^{26}$ virus.",
    },
    {
      id: "check-arena",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Proporcionalidad",
          message: "$1$ tonelada son $1\\,000$ kg $= 20 \\cdot 50$ kg. Hay $20$ veces más arena, luego $20$ veces más granos.",
        },
      ],
      title: "Granos de arena",
      question: "En $50$ kg de arena hay unos $3 \\cdot 10^{6}$ granos. ¿Cuántos millones de granos hay en una tonelada? (solo el número)",
      correctAnswers: ["60"],
      explanation: "$1\\,000 : 50 = 20$, así que hay $20 \\cdot 3 \\cdot 10^{6} = 6 \\cdot 10^{7}$ granos, es decir, $60$ millones.",
    },
    {
      id: "check-vacuna",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Producto",
          message: "$0{,}05 \\cdot 10^{8} = 5 \\cdot 10^{-2} \\cdot 10^{8}$.",
        },
      ],
      title: "Una dosis de vacuna",
      question: "La dosis de una vacuna es $0{,}05$ cm³ y tiene $100\\,000\\,000$ bacterias por cm³. En notación científica, el número de bacterias es $5 \\cdot 10^{n}$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$0{,}05 = 5 \\cdot 10^{-2}$ y $100\\,000\\,000 = 10^{8}$. Producto: $5 \\cdot 10^{6}$ bacterias.",
    },
    {
      id: "check-pelo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Unidades",
          message: "$1$ km $= 10^{5}$ cm, así que $1{,}6 \\cdot 10^{-8}$ km/h $= 1{,}6 \\cdot 10^{-3}$ cm/h. Un mes de $30$ días tiene $30 \\cdot 24 = 720$ horas.",
        },
      ],
      title: "Crecimiento del cabello",
      question: "El cabello crece a $1{,}6 \\cdot 10^{-8}$ km/h. ¿Cuántos centímetros crece en un mes de $30$ días? (escribe el número con coma)",
      correctAnswers: ["1,152", "1.152"],
      explanation: "$1{,}6 \\cdot 10^{-8}$ km/h $= 1{,}6 \\cdot 10^{-3}$ cm/h. En $720$ h: $720 \\cdot 1{,}6 \\cdot 10^{-3} = 1{,}152$ cm. En un año ($8\\,760$ h) serían unos $14$ cm.",
    },
    {
      id: "check-agua",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Divide",
          message: "Masa de una molécula $= \\dfrac{18\\ \\text{g}}{6{,}02 \\cdot 10^{23}}$.",
        },
      ],
      title: "La masa de una molécula de agua",
      question: "En $18$ g de agua hay $6{,}02 \\cdot 10^{23}$ moléculas. ¿Cuál es la masa, en gramos, de una molécula?",
      choices: [
        { id: "a", label: "$\\approx 2{,}99 \\cdot 10^{-23}$ g" },
        { id: "b", label: "$\\approx 3{,}34 \\cdot 10^{22}$ g", incorrectFeedback: "Esa es la cantidad de moléculas por gramo, no los gramos de una molécula, y además sale muchísimo más." },
        { id: "c", label: "$\\approx 1{,}08 \\cdot 10^{25}$ g", incorrectFeedback: "Has multiplicado ($18 \\cdot 6{,}02 \\cdot 10^{23}$) en lugar de dividir. Una molécula pesa muy poco." },
        { id: "d", label: "$\\approx 2{,}99 \\cdot 10^{23}$ g", incorrectFeedback: "La masa de una molécula es **minúscula**: el exponente debe ser negativo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{18}{6{,}02 \\cdot 10^{23}} = 2{,}99 \\cdot 10^{-23}$ g.",
    },
  ],
};
