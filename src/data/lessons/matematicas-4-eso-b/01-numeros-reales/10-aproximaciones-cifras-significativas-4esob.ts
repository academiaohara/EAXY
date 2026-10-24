import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const aproximacionesCifrasSignificativas4esobLesson: InteractiveLesson = {
  slug: "aproximaciones-cifras-significativas-4esob",
  title: "10. Cantidades aproximadas y cifras significativas",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "medida-real",
      type: "slide",
      help: [
        {
          label: "Por qué no hay medida exacta",
          message: "Todo instrumento tiene un límite de precisión. Una regla que aprecia milímetros no distingue $4{,}21$ cm de $4{,}24$ cm: solo permite asegurar entre qué valores está.",
        },
        {
          label: "Y las cuentas",
          message: "Al dividir $2$ m entre $3$ sale $0{,}666\\ldots$ m: infinitas cifras. Hay que cortar en algún sitio, y ese corte es una aproximación.",
        },
      ],
      title: "Medir es aproximar",
      blocks: [
        {
          kind: "text",
          text: "En la medición real casi nunca se conoce el valor exacto: o falta precisión en el instrumento o el número tiene infinitas cifras. Se maneja una **aproximación**.",
        },
        {
          kind: "example",
          title: "Un pendrive medido con regla (apreciación: 1 mm)",
          lines: [
            { math: "4{,}2\\ \\text{cm} < l < 4{,}3\\ \\text{cm} \\quad\\Rightarrow\\quad l \\approx 4{,}2\\ \\text{cm}" },
          ],
        },
        {
          kind: "example",
          title: "Una varilla de 2 m cortada en 3 trozos iguales",
          lines: [
            { math: "k = 2 : 3 = 0{,}\\overline{6}\\ \\text{m} \\approx 67\\ \\text{cm} \\approx 667\\ \\text{mm}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "redondeo-decimal", params: { dec: "0,667" } },
    },
    {
      id: "significativas",
      type: "slide",
      help: [
        {
          label: "Qué son",
          message: "Las **cifras significativas** son las que se usan para expresar la aproximación. En $67$ cm hay $2$; en $667$ mm hay $3$.",
        },
        {
          label: "Más cifras no es mejor siempre",
          message: "Dar más cifras de las que se saben es engañar: parece que se mide con una precisión que no existe.",
        },
      ],
      title: "Cifras significativas: cuántas decir",
      blocks: [
        {
          kind: "definition",
          text: "Las **cifras significativas** son las cifras que se utilizan para expresar un número aproximado. Solo deben usarse las que **aportan información**.",
        },
        {
          kind: "compare",
          left: { title: "Es exacta", text: "Visitantes de un museo (se cuentan en taquilla): $183\\,594$ personas.", tone: "ok" },
          right: { title: "Es aproximada", text: "Asistentes a una manifestación: nadie los cuenta uno a uno. «Más de $200\\,000$».", tone: "warn" },
        },
        {
          kind: "text",
          text: "Granos de arroz de un saco: $11\\,892\\,583$ es una precisión imposible. Lo razonable: **«unos 12 millones»**, una o dos cifras.",
        },
      ],
      visual: { kind: "tool", tool: "aproximacion-explorador", params: { a: 2, b: 6 }, hint: "Baja el orden del redondeo y observa cuántas cifras significativas se usan y cómo crece la precisión." },
    },
    {
      id: "check-granos",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Preguntate si alguien lo contó",
          message: "Si se cuentan de uno en uno (entradas vendidas) la cifra es exacta. Si no (granos, multitudes), solo hay una estimación.",
        },
      ],
      title: "Granos de arroz",
      question: "Un saco de arroz tiene $11\\,892\\,583$ granos según un cálculo. ¿Cuál es la forma más razonable de comunicarlo?",
      choices: [
        { id: "a", label: "Unos $12$ millones de granos" },
        { id: "b", label: "$11\\,892\\,583$ granos exactamente", incorrectFeedback: "Esa precisión es imposible: nadie ha contado los granos uno a uno." },
        { id: "c", label: "$11\\,892\\,000$ granos", incorrectFeedback: "Sigue dando seis cifras significativas: aparenta una precisión que no existe." },
        { id: "d", label: "Más de $10$ granos", incorrectFeedback: "Es verdad, pero tan poco informativo que no sirve." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En una estimación de este tipo, una o dos cifras significativas son lo máximo que tiene sentido: $12$ millones.",
    },
    {
      id: "redondeo",
      type: "slide",
      help: [
        {
          label: "Regla del 5",
          message: "Mira la primera cifra que se suprime: si es $5$ o más, la última que se conserva sube una unidad; si es menos de $5$, se queda igual.",
        },
        {
          label: "Orden",
          message: "Redondear «a los millares» significa que la última cifra que se conserva es la de los millares.",
        },
      ],
      title: "Redondear: cortar y mirar la siguiente cifra",
      blocks: [
        {
          kind: "rule",
          title: "Redondeo",
          text: "Se corta en el orden elegido. Si la **primera cifra suprimida** es $\\ge 5$ se sube una unidad la última conservada; si es $< 5$, se deja.",
        },
        {
          kind: "example",
          lines: [
            { math: "81\\,394 \\to 81\\,000 \\quad (\\text{se suprime }3\\text{: se deja})" },
            { math: "81\\,629 \\to 82\\,000 \\quad (\\text{se suprime }6\\text{: se sube})" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "redondeo-recta", params: { n: 81629, power: 3 } },
    },
    {
      id: "check-centesimas",
      type: "fill_in_blank",
      help: [
        {
          label: "Mira la milésima",
          message: "Para redondear a las centésimas se mira la milésima: $18{,}073$ → la milésima es $3$ → se deja.",
        },
      ],
      title: "Redondear a las centésimas",
      question: "Redondea $18{,}073$ a las centésimas. (escribe el número con coma)",
      correctAnswers: ["18,07", "18.07"],
      explanation: "La primera cifra suprimida es $3 < 5$: se queda $18{,}07$.",
    },
    {
      id: "check-redondeo-subida",
      type: "fill_in_blank",
      help: [
        {
          label: "Mira la cifra suprimida",
          message: "$3{,}2414$ a las centésimas: la milésima es $1$, menos de $5$. Pero $0{,}318$: la milésima es $8$.",
        },
      ],
      title: "Una que sube",
      question: "Redondea $0{,}318$ a las centésimas. (escribe el número con coma)",
      correctAnswers: ["0,32", "0.32"],
      explanation: "La primera cifra suprimida es $8 \\ge 5$: el $1$ sube a $2$. Resultado: $0{,}32$.",
    },
    {
      id: "check-nsig",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cuenta desde la primera cifra",
          message: "Los ceros a la izquierda ($0{,}00\\ldots$) no cuentan: solo sirven para colocar la coma. Cuenta desde el $8$.",
        },
      ],
      title: "Cifras significativas",
      question: "Un virus mide $0{,}008375$ mm. Si lo damos como $0{,}0084$ mm, ¿cuántas cifras significativas usamos? (solo el número)",
      correctAnswers: ["2"],
      explanation: "En $0{,}0084$ los ceros iniciales solo colocan la coma. Las cifras significativas son $8$ y $4$: dos.",
    },
  ],
};
