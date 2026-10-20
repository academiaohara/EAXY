import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const variacionesPorcentuales3esoLesson: InteractiveLesson = {
  slug: "variaciones-porcentuales-3eso",
  title: "9. Aumentos y disminuciones porcentuales",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "aumento",
      type: "slide",
      help: [
        {
          label: "En dos pasos",
          message: "Primero calculas el aumento ($460 \\cdot 0{,}20 = 92$) y se lo sumas al precio inicial.",
        },
        {
          label: "En un solo paso",
          message: "Subir un $20\\,\\%$ es pasar a pagar el $120\\,\\%$ del precio: multiplicas por $1{,}20$.",
        },
      ],
      title: "Aumento porcentual e índice de variación",
      blocks: [
        {
          kind: "text",
          text: "Un billete de avión costaba **460 €** y sube un **20 %**. Hay dos formas de calcular el precio nuevo:",
        },
        {
          kind: "compare",
          left: { title: "En dos pasos", math: ["460 \\cdot 0{,}20 = 92", "460 + 92 = 552"], tone: "info" },
          right: { title: "Índice de variación", math: ["460 \\cdot 1{,}20 = 552"], tone: "ok" },
        },
        {
          kind: "rule",
          title: "Aumento",
          text: "El índice de variación es $1$ más el aumento en forma decimal.",
          formula: "\\text{valor final} = \\text{valor inicial} \\cdot (1 + 0{,}01 \\cdot x)",
        },
      ],
      visual: { kind: "anim", scene: "aumento-barra", params: { a: 460, b: 20, sign: "+" } },
    },
    {
      id: "disminucion",
      type: "slide",
      help: [
        {
          label: "Lo que se queda",
          message: "Si te quitan un $15\\,\\%$, te quedas con el $85\\,\\%$.",
        },
        {
          label: "Índice menor que 1",
          message: "En una rebaja el índice es menor que $1$; en un aumento, mayor que $1$.",
        },
      ],
      title: "Disminución porcentual",
      blocks: [
        {
          kind: "rule",
          title: "Disminución",
          text: "El índice de variación es $1$ menos la disminución en forma decimal.",
          formula: "\\text{valor final} = \\text{valor inicial} \\cdot (1 - 0{,}01 \\cdot x)",
        },
        {
          kind: "example",
          title: "Nevera de 620 € con rebaja del 40 %",
          lines: [
            { math: "\\text{índice} = 1 - 0{,}40 = 0{,}60" },
            { math: "620 \\cdot 0{,}60 = 372\\ \\text{€}" },
          ],
        },
        {
          kind: "facts",
          items: [
            { tex: "+25\\,\\% \\to 1{,}25" },
            { tex: "+5\\,\\% \\to 1{,}05" },
            { tex: "-15\\,\\% \\to 0{,}85" },
            { tex: "-1\\,\\% \\to 0{,}99" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "factor-cambio", params: { a: 460, b: 20, c: 620, d: 40 } },
    },
    {
      id: "cantidad-inicial",
      type: "slide",
      help: [
        {
          label: "Deshacer la operación",
          message: "Si multiplicar por $1{,}35$ lleva del precio inicial al final, dividir entre $1{,}35$ vuelve al inicial.",
        },
        {
          label: "No restes el porcentaje",
          message: "El $35\\,\\%$ ya no se calcula sobre el precio final, sino sobre el inicial; por eso no vale restárselo al final.",
        },
      ],
      title: "Hallar la cantidad inicial",
      blocks: [
        {
          kind: "rule",
          text: "Si conocemos la cantidad final tras una variación porcentual, la inicial se obtiene **dividiendo** entre el índice de variación.",
          formula: "\\text{valor inicial} = \\text{valor final} : \\text{índice de variación}",
        },
        {
          kind: "example",
          title: "Un ordenador cuesta 783 € tras subir un 35 %",
          lines: [
            { math: "\\text{índice} = 1 + 0{,}35 = 1{,}35" },
            { math: "783 : 1{,}35 = 580\\ \\text{€}" },
          ],
        },
        {
          kind: "warning",
          text: "Quitar un $35\\,\\%$ al precio final **no** devuelve el precio inicial: $783 \\cdot 0{,}65 = 508{,}95$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-aumento",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Índice de variación",
          message: "Un aumento del $8\\,\\%$ corresponde al índice $1{,}08$.",
        },
      ],
      title: "Menú del día",
      question: "Un restaurante sube el menú del día un $8\\,\\%$. Si costaba $7{,}50$ €, ¿cuál es el nuevo precio? (solo el número)",
      correctAnswers: ["8,1", "8.1", "8,10", "8.10"],
      explanation: "$7{,}5 \\cdot 1{,}08 = 8{,}10$ €.",
    },
    {
      id: "check-rebaja",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Índice de variación",
          message: "Un descuento del $40\\,\\%$ deja el $60\\,\\%$: índice $0{,}60$.",
        },
      ],
      title: "Zapatos rebajados",
      question: "Unos zapatos de $68$ € tienen un descuento del $40\\,\\%$. ¿Cuánto cuestan ahora? (solo el número)",
      correctAnswers: ["40,8", "40.8", "40,80", "40.80"],
      explanation: "$68 \\cdot 0{,}60 = 40{,}80$ €.",
    },
    {
      id: "check-inicial",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Índice",
          message: "Con IVA del $18\\,\\%$ el precio se multiplicó por $1{,}18$. Para volver, divide entre $1{,}18$.",
        },
      ],
      title: "Sin IVA",
      question: "Un televisor cuesta $566{,}40$ € con un $18\\,\\%$ de IVA incluido. ¿Cuánto costaba antes de cargarle el IVA? (solo el número)",
      correctAnswers: ["480"],
      explanation: "$566{,}40 : 1{,}18 = 480$ €.",
    },
    {
      id: "check-rebajas",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Índice de la rebaja",
          message: "Con $30\\,\\%$ de descuento el índice es $0{,}70$. El precio final es el inicial por $0{,}70$.",
        },
      ],
      title: "Precio antes de la rebaja",
      question: "En unas rebajas del $30\\,\\%$, Roberto ha comprado una cámara por $50{,}40$ €. ¿Cuál era su precio inicial? (solo el número)",
      correctAnswers: ["72"],
      explanation: "$50{,}40 : 0{,}70 = 72$ €.",
    },
  ],
};
