import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionNaturalesLesson: InteractiveLesson = {
  slug: "multiplicacion-division-naturales",
  title: "4. Multiplicación y división",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "multiplicar-narrate",
      type: "narrate",
      title: "Multiplicar",
      definitionBox:
        "**Multiplicar** es una forma abreviada de **sumar varias veces el mismo número**.",
      module: "mul-div-naturales",
      scene: "multiplicar-repetido",
      mulDiv: { scene: "multiplicar-repetido", a: 8, b: 5 },
    },
    {
      id: "multiplicar-sexta-predict",
      type: "predict",
      title: "Multiplicar",
      question: "Ahora con $6$ entradas, ¿cuánto cuestan?",
      mode: "choice",
      choices: [
        { id: "40", label: "$40$ €" },
        { id: "48", label: "$48$ €" },
        { id: "56", label: "$56$ €" },
      ],
      correctChoiceId: "48",
      module: "mul-div-naturales",
      scene: "multiplicar-sexta-entrada",
      mulDiv: { scene: "multiplicar-sexta-entrada", a: 8, b: 5, c: 6 },
      explanation: "$8 \\cdot 6 = 8 \\cdot 5 + 8 = 48$ €.",
    },
    {
      id: "multiplicacion-mano-narrate",
      type: "narrate",
      title: "Multiplicar a mano",
      definitionBox:
        "Con **varias cifras**, multiplica por cada cifra del segundo factor y **suma** las filas (desplazando cuando corresponda).",
      module: "mul-div-naturales",
      scene: "multiplicacion-mano",
      mulDiv: { scene: "multiplicacion-mano", a: 34, b: 12 },
    },
    {
      id: "conmutativa-reveal",
      type: "reveal",
      title: "Conmutativa",
      definitionBox:
        "El **producto no varía** al cambiar el orden de los factores: $a \\cdot b = b \\cdot a$.",
      module: "mul-div-naturales",
      scene: "conmutativa-producto",
      mulDiv: { scene: "conmutativa-producto", a: 3, b: 5 },
    },
    {
      id: "asociativa-reveal",
      type: "reveal",
      title: "Asociativa",
      definitionBox:
        "Puedes **agrupar** los factores como quieras: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.",
      module: "mul-div-naturales",
      scene: "asociativa-producto",
      mulDiv: { scene: "asociativa-producto", a: 8, b: 5, c: 2 },
    },
    {
      id: "distributiva-predict",
      type: "predict",
      title: "Dos formas de calcularlo",
      question:
        "Compras $8$ menús. Cada menú cuesta $5$ € el bocadillo y $2$ € la bebida. ¿Cuánto pagas en total?",
      mode: "choice",
      choices: [
        {
          id: "40",
          label: "$40$ €",
          incorrectFeedback: "Ese solo cuenta los bocadillos. Falta la bebida.",
        },
        { id: "56", label: "$56$ €" },
        {
          id: "80",
          label: "$80$ €",
          incorrectFeedback:
            "Has multiplicado $8 \\cdot 10$; recuerda que cada menú cuesta $5 + 2 = 7$ €.",
        },
      ],
      correctChoiceId: "56",
      hint: "Suma lo que cuesta un menú completo: bocadillo más bebida.",
      explanation:
        "Puedes pensar: cada menú cuesta $5 + 2 = 7$ €, así que $8 \\cdot 7 = 56$ €. O también: $8 \\cdot 5 = 40$ € de bocadillos y $8 \\cdot 2 = 16$ € de bebidas, $40 + 16 = 56$ €. ¡Salen igual!",
    },
    {
      id: "distributiva-narrate",
      type: "narrate",
      title: "Distributiva",
      definitionBox:
        "Multiplicar una **suma** es multiplicar **cada sumando** y volver a sumar: $a(b + c) = ab + ac$.",
      module: "mul-div-naturales",
      scene: "distributiva-bloques",
      mulDiv: { scene: "distributiva-bloques", a: 8, b: 5, c: 2 },
    },
    {
      id: "distributiva-equivalencia",
      type: "predict",
      title: "Misma cantidad",
      question: "¿Qué expresión tiene **el mismo valor** que $8 \\cdot (5 + 2)$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$8 \\cdot 5 + 8 \\cdot 2$" },
        { id: "b", label: "$8 \\cdot 5 + 2$" },
        { id: "c", label: "$(8 + 5) \\cdot 2$" },
      ],
      correctChoiceId: "a",
      explanation: "$40 + 16 = 56$: el $8$ multiplica a **cada** sumando.",
    },
    {
      id: "dividir-predict",
      type: "predict",
      title: "Antes de abrir las cajas",
      question:
        "Se reparten $150$ bombones en $6$ cajas **iguales**. ¿Cuántos bombones irán en **cada** caja?",
      mode: "choice",
      choices: [
        {
          id: "20",
          label: "$20$",
          incorrectFeedback: "$20 \\cdot 6 = 120$, te quedan $30$ bombones sin repartir.",
        },
        { id: "25", label: "$25$" },
        {
          id: "30",
          label: "$30$",
          incorrectFeedback: "$30 \\cdot 6 = 180$, te pasas.",
        },
      ],
      correctChoiceId: "25",
      explanation:
        "Piensa en la multiplicación: ¿qué número por $6$ da $150$? $25 \\cdot 6 = 150$, así que $150 : 6 = 25$.",
    },
    {
      id: "dividir-narrate",
      type: "narrate",
      title: "Dividir",
      definitionBox:
        "**Dividir** reparte un total en partes iguales; es el camino de vuelta de **multiplicar**.",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
    },
    {
      id: "division-mano-narrate",
      type: "narrate",
      title: "Dividir a mano",
      definitionBox:
        "En la división **cifra a cifra**: escribe el cociente, multiplica, resta y **baja** la siguiente cifra del dividendo.",
      module: "mul-div-naturales",
      scene: "division-mano",
      mulDiv: { scene: "division-mano", dividend: 150, divisor: 6 },
    },
    {
      id: "dividir-explore",
      type: "explore",
      title: "Reparte tú",
      question: "Reparte $60$ bombones en $4$ cajas **iguales** hasta vaciar el montón.",
      module: "mul-div-naturales",
      scene: "reparto-manual",
      mulDiv: { scene: "reparto-manual", total: 60, boxes: 4, perBox: 15 },
      goal: { kind: "boxes-equal", total: 60, boxes: 4, perBox: 15 },
      suppressTutorBubble: true,
      hint: "Reparte de forma que todas las cajas queden iguales.",
      explanation: "$60 : 4 = 15$. Comprobación: $4 \\cdot 15 = 60$.",
    },
    {
      id: "tipos-narrate",
      type: "narrate",
      title: "Exacta y entera",
      definitionBox:
        "Si el **resto es 0**, la división es **exacta** ($D = d \\cdot c$). Si sobra algo, es **entera** ($D = d \\cdot c + r$, con $r < d$).",
      module: "mul-div-naturales",
      scene: "exacta-entera",
      mulDiv: { scene: "exacta-entera" },
    },
    {
      id: "tipos-predict",
      type: "predict",
      title: "Cociente y resto",
      question:
        "$47$ bombones se reparten en cajas de $6$. ¿Cuál es el **cociente** y cuál el **resto**?",
      mode: "choice",
      choices: [
        { id: "7-5", label: "$7$ y $5$" },
        {
          id: "6-11",
          label: "$6$ y $11$",
          incorrectFeedback:
            "$6 \\cdot 6 + 11 = 47$, pero el resto no puede ser mayor que el divisor: aún caben más cajas.",
        },
        {
          id: "8-1",
          label: "$8$ y $1$",
          incorrectFeedback:
            "$6 \\cdot 8 + 1 = 49$, no es $47$. Comprueba siempre con $D = d \\cdot c + r$.",
        },
      ],
      correctChoiceId: "7-5",
      explanation: "Correcto. $6 \\cdot 7 + 5 = 47$ y $5 < 6$.",
    },
  ],
};
