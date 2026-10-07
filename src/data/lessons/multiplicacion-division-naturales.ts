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
      title: "Dentro del paréntesis",
      question: "¿Cuánto vale $8 \\cdot (5 + 2)$ **antes** de usar la propiedad distributiva?",
      mode: "choice",
      choices: [
        { id: "40", label: "$40$" },
        { id: "56", label: "$56$" },
        { id: "80", label: "$80$" },
      ],
      correctChoiceId: "56",
      hint: "Primero suma lo del paréntesis: $5 + 2$.",
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
      title: "Reparte el factor",
      question: "¿Qué expresión tiene el mismo valor que $6 \\cdot (4 + 3)$?",
      mode: "choice",
      shuffleChoices: true,
      hintHiddenUntilRequested: true,
      hint: "El número de fuera multiplica a **cada sumando** del paréntesis.",
      choices: [
        {
          id: "distribuye-ambos",
          label: "$6 \\cdot 4 + 6 \\cdot 3$",
        },
        {
          id: "solo-primero",
          label: "$6 \\cdot 4 + 3$",
          incorrectFeedback:
            "El $6$ tiene que multiplicar a los dos sumandos, no solo al primero. Aquí vale $24 + 3 = 27$, y $6 \\cdot 7 = 42$.",
        },
        {
          id: "factores-cruzados",
          label: "$6 \\cdot 4 + 4 \\cdot 3$",
          incorrectFeedback:
            "Cada sumando se multiplica por el mismo número de fuera: el $6$. Aquí vale $24 + 12 = 36$, y no $42$.",
        },
      ],
      correctChoiceId: "distribuye-ambos",
      explanation:
        "Correcto. $6 \\cdot (4 + 3) = 6 \\cdot 7 = 42$ y $6 \\cdot 4 + 6 \\cdot 3 = 24 + 18 = 42$. Salen igual.",
    },
    {
      id: "puente-narrate",
      type: "narrate",
      title: "Dos preguntas gemelas",
      definitionBox:
        "**Multiplicar** junta grupos iguales; **dividir** reparte un total en grupos iguales.",
      module: "mul-div-naturales",
      scene: "puente-mult-div",
      mulDiv: { scene: "puente-mult-div", a: 8, b: 5, dividend: 150, divisor: 6 },
    },
    {
      id: "dividir-narrate",
      type: "narrate",
      title: "Dividir",
      definitionBox: "**Dividir** es **repartir** en partes iguales.",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
    },
    {
      id: "dividir-predict",
      type: "predict",
      title: "Antes de abrir las cajas",
      question:
        "Se reparten $150$ bombones en $6$ cajas **iguales**. ¿Cuántos bombones irán en **cada** caja?",
      mode: "choice",
      choices: [
        { id: "20", label: "$20$" },
        { id: "25", label: "$25$" },
        { id: "30", label: "$30$" },
      ],
      correctChoiceId: "25",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
      explanation: "$150 : 6 = 25$. Comprueba: $6 \\cdot 25 = 150$.",
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
      question: "Llena las $6$ cajas **por igual** hasta vaciar el montón de $150$.",
      module: "mul-div-naturales",
      scene: "reparto-manual",
      mulDiv: { scene: "reparto-manual", total: 150, boxes: 6, perBox: 25 },
      goal: { kind: "boxes-equal", total: 150, boxes: 6, perBox: 25 },
      hint: "Cada caja debe llevar la misma cantidad; el montón debe quedar en $0$.",
      explanation: "Seis veces $25$ es $150$: división **exacta**.",
    },
    {
      id: "tipos-narrate",
      type: "narrate",
      title: "Exacta y entera",
      definitionBox:
        "Si el **resto es $0$**, la división es **exacta** ($D = d \\cdot c$). Si sobra algo, es **entera** ($D = d \\cdot c + r$, con $r < d$).",
      module: "mul-div-naturales",
      scene: "exacta-entera",
      mulDiv: { scene: "exacta-entera" },
    },
    {
      id: "tipos-predict",
      type: "predict",
      title: "Comprueba la fórmula",
      question: "En $43 = 8 \\cdot 5 + 3$, ¿qué describe mejor esta división?",
      mode: "choice",
      choices: [
        { id: "exacta", label: "Exacta — resto $0$" },
        { id: "entera", label: "Entera — sobra resto $r$" },
      ],
      correctChoiceId: "entera",
      explanation: "El resto $3$ es distinto de $0$ y menor que el divisor $8$.",
    },
  ],
};
