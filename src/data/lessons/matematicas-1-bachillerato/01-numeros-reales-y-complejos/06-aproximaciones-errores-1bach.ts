import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const aproximacionesErrores1bachLesson: InteractiveLesson = {
  slug: "aproximaciones-errores-1bach",
  title: "6. Aproximaciones y errores",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "error-absoluto",
      type: "slide",
      help: [
        { label: "Valor real desconocido", message: "A menudo no se conoce el valor real (una medida, por ejemplo). Entonces no se calcula el error exacto, sino una **cota**: un valor que el error no puede superar." },
      ],
      title: "Error absoluto",
      blocks: [
        { kind: "text", text: "Una báscula marca $54{,}4$ kg. ¿Cuánto pesas exactamente? No se sabe: solo que estás **cerca** de $54{,}4$. Todo valor medido o redondeado es una **aproximación**." },
        { kind: "rule", title: "Error absoluto", formula: "EA = |\\text{valor real} - \\text{valor aproximado}|" },
        { kind: "example", lines: [
          { math: "\\pi \\approx 3{,}1416:\\quad EA = |\\pi - 3{,}1416| \\approx 0{,}0000073" },
        ] },
      ],
      visual: { kind: "anim", scene: "error-aproximacion", params: { a: 183594, b: 180000 } },
    },
    {
      id: "cota",
      type: "slide",
      help: [
        { label: "Por qué la mitad", message: "Al redondear, el valor real está como mucho a media unidad del último orden conservado: más lejos, habría redondeado al otro lado." },
      ],
      title: "Cota del error al redondear",
      blocks: [
        { kind: "rule", title: "Media unidad del último orden", text: "Si se redondea hasta cierto orden, el error absoluto es **menor o igual que media unidad de ese orden**." },
        { kind: "example", lines: [
          { math: "N \\approx 3{,}7\\ \\text{(décimas)}:\\quad EA \\leq 0{,}05" },
          { math: "N \\approx 3{,}1416\\ \\text{(diezmilésimas)}:\\quad EA \\leq 0{,}00005" },
          { math: "N \\approx 300\\ \\text{(centenas)}:\\quad EA \\leq 50" },
        ] },
      ],
      visual: { kind: "tool", tool: "aproximacion-explorador", params: { a: 8, b: 3 }, hint: "Cambia el orden del redondeo: la cota siempre es la mitad de una unidad de ese orden." },
    },
    {
      id: "check-cota",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El último orden de $417{,}00$ son las centésimas; el de $417$ son las unidades." }],
      title: "417 no es lo mismo que 417,00",
      question: "¿Qué cota del error absoluto corresponde a la aproximación $417{,}00$ (redondeada a centésimas)?",
      choices: [
        { id: "a", label: "$EA \\leq 0{,}005$" },
        { id: "b", label: "$EA \\leq 0{,}5$", incorrectFeedback: "Eso sería $417$ redondeado a unidades. Con $417{,}00$ se conservan las centésimas." },
        { id: "c", label: "$EA \\leq 0{,}05$", incorrectFeedback: "Eso corresponde a décimas ($417{,}0$)." },
        { id: "d", label: "$EA \\leq 5$", incorrectFeedback: "Eso sería redondear a decenas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Las centésimas valen $0{,}01$; la mitad es $0{,}005$. Escribir los ceros dice **cuánta precisión** tiene la medida.",
    },
    {
      id: "error-relativo",
      type: "slide",
      help: [
        { label: "En porcentaje", message: "El error relativo se suele dar en %: se multiplica por 100. Si no se conoce el valor real se usa el aproximado, porque la diferencia es pequeña." },
      ],
      title: "Error relativo",
      blocks: [
        { kind: "rule", title: "Para comparar errores de magnitudes distintas", formula: "ER = \\dfrac{EA}{|\\text{valor real}|}" },
        { kind: "example", title: "(1+√5)/2 ≈ 1,6", lines: [
          { math: "EA = |1{,}6180\\ldots - 1{,}6| \\approx 0{,}018" },
          { math: "ER = \\dfrac{0{,}018}{1{,}618} \\approx 0{,}0111 \\approx 1{,}1\\,\\%" },
        ] },
        { kind: "text", text: "Un error de $1$ m es enorme al medir una pizarra y despreciable al medir la distancia entre ciudades: el relativo lo refleja." },
      ],
      visual: { kind: "anim", scene: "error-relativo-comparar", params: { a: 126, b: 13, c: 0.5, titles: ["Distancia entre dos ciudades", "Anchura de un arroyo"], unit: "km|m" } },
    },
    {
      id: "check-relativo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "EA = |200 − 198| = 2. Divide entre el valor real y pasa a porcentaje." }],
      title: "Error relativo en porcentaje",
      question: "Aproximamos $200$ por $198$. ¿Cuál es el error relativo **en %**? (solo el número)",
      correctAnswers: ["1", "1%"],
      explanation: "$EA = |200 - 198| = 2$ y $ER = \\frac{2}{200} = 0{,}01 = 1\\,\\%$.",
    },
    {
      id: "acumulacion",
      type: "slide",
      help: [
        { label: "Los errores se acumulan", message: "Al sumar medidas aproximadas, las cotas de error también se suman. Operar muchas veces con aproximaciones puede volver el resultado inservible." },
      ],
      title: "Los errores se suman",
      blocks: [
        { kind: "text", text: "Una balanza tiene un error de, como mucho, $50$ g. Con ella se preparan $5$ paquetes de café de $500$ g cada uno que forman un lote." },
        { kind: "steps", title: "Cota del lote", items: [
          "Cada paquete pesa entre $450$ y $550$ g.",
          "El lote pesa, como mínimo, $5 \\cdot 450 = 2\\,250$ g y, como máximo, $5 \\cdot 550 = 2\\,750$ g.",
          "La cota del error del lote es $5 \\cdot 50 = 250$ g: **cada error se suma**.",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-acumulacion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Cada paquete aporta, como mucho, 20 g de error y se suman los cuatro." }],
      title: "Cota total",
      question: "Con una balanza que se equivoca como mucho $20$ g en cada pesada se llenan $4$ paquetes. ¿Cuál es la cota del error del conjunto, en gramos? (solo el número)",
      correctAnswers: ["80"],
      explanation: "Los errores máximos se suman: $4 \\cdot 20 = 80$ g.",
    },
  ],
};
