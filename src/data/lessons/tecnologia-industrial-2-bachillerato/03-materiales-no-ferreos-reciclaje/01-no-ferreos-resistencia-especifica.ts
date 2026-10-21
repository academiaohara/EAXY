import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_3_SUBTITLE } from "@/data/lessons/shared";

export const noFerreosResistenciaEspecificaLesson: InteractiveLesson = {
  slug: "no-ferreos-resistencia-especifica",
  title: "1. Metales no férreos y resistencia específica",
  subtitle: TEMA_TI2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "por-que-no-ferreos",
      type: "slide",
      help: [
        {
          label: "¿Qué es un metal no férreo?",
          message: "Los que no contienen hierro o lo contienen en un porcentaje muy pequeño. Se clasifican por el elemento mayoritario: cobre, aluminio, magnesio, titanio…",
        },
      ],
      title: "Por qué hacen falta otros metales",
      blocks: [
        {
          kind: "steps",
          title: "Defectos de los productos siderúrgicos",
          items: [
            "**Densidad** relativamente elevada.",
            "**Conductividad eléctrica** comparativamente baja.",
            "Sensibles a la **corrosión** y a la oxidación atmosférica.",
          ],
        },
        {
          kind: "text",
          text: "Las aleaciones no férreas se clasifican por el elemento mayoritario. Sus propiedades tienen un abanico muy amplio: la temperatura de fusión va desde unos $30$ °C (Ga) hasta más de $3\\,000$ °C (W). Y la densidad: 1 litro de Mg pesa $1{,}74$ kg; uno de Pb, $11{,}34$ kg.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "resistencia-especifica",
      type: "slide",
      help: [
        {
          label: "¿Por qué dividir entre la densidad?",
          message: "Porque en transporte y aviación no importa solo lo que aguanta el material, sino cuánto pesa para aguantarlo. Una aleación más débil pero mucho más ligera puede soportar más carga por kilo.",
        },
      ],
      title: "Resistencia mecánica específica",
      blocks: [
        {
          kind: "definition",
          text: "La **resistencia mecánica específica** es la resistencia a la rotura dividida entre la densidad.",
        },
        {
          kind: "formula",
          tex: "R_e = \\dfrac{\\sigma_{\\text{rotura}}}{\\rho}",
        },
        {
          kind: "text",
          text: "Ordena los metales de la tabla 3.1 por cada propiedad y divide los valores entre los del hierro. Mira cómo cambia el orden al pasar de la tensión de rotura a la resistencia específica.",
        },
      ],
      visual: { kind: "tool", tool: "resistencia-especifica", params: { a: 3 } },
    },
    {
      id: "check-mejor-especifica",
      type: "predict",
      help: [{ label: "Usa la herramienta", message: "Selecciona «Resistencia específica» y mira el metal con la barra más larga." }],
      title: "El mejor cociente",
      question: "De los metales de la tabla 3.1, ¿cuál tiene mayor resistencia específica?",
      mode: "choice",
      choices: [
        { id: "ti", label: "Titanio (50,3)" },
        { id: "fe", label: "Hierro (36,1)", incorrectFeedback: "El hierro es el que más resiste a la rotura, pero pesa mucho." },
        { id: "al", label: "Aluminio (43,7)", incorrectFeedback: "Es muy bueno, pero el titanio lo supera." },
      ],
      correctChoiceId: "ti",
      shuffleChoices: true,
      explanation: "El titanio soporta $227$ MPa con solo $4{,}51$ kg/dm³: $227/4{,}51 = 50{,}3$.",
    },
    {
      id: "check-conductividad",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Cociente", message: "Divide la conductividad entre la densidad de cada metal: Cu $59{,}8/8{,}93$ y Al $37{,}7/2{,}70$." }],
      title: "Cobre frente a aluminio",
      question: "Divide la conductividad entre la densidad del aluminio ($37{,}7$ y $2{,}70$) y calcula cuántas veces mayor es ese cociente que el del cobre ($59{,}8$ y $8{,}93$). (redondea a una décima, solo el número)",
      correctAnswers: ["2,1", "2.1"],
      explanation: "Aluminio: $37{,}7/2{,}70 = 13{,}96$. Cobre: $59{,}8/8{,}93 = 6{,}70$. El cociente entre ambos es $2{,}08 \\approx 2{,}1$. Por eso se elige aluminio para tendidos de alta tensión: conduce casi igual por kilo y cuesta menos.",
    },
    {
      id: "peso-minimo",
      type: "slide",
      help: [
        {
          label: "¿Qué sección necesita?",
          message: "Para no deformarse, la tensión $F/A$ debe ser como mucho el límite elástico: $A = F/\\sigma_e$. Con esa sección, la masa es densidad por volumen.",
        },
      ],
      title: "Elegir material para un peso mínimo",
      blocks: [
        {
          kind: "text",
          text: "Una pieza de $300$ mm debe soportar $50\\,000$ N sin deformarse. ¿Qué material da la pieza más ligera: latón, acero o aluminio?",
        },
        {
          kind: "warning",
          text: "El acero es el **más resistente**, pero no el que da la pieza más ligera. Compara siempre la masa necesaria.",
        },
      ],
      visual: { kind: "tool", tool: "pieza-peso-minimo", params: { a: 50, b: 300 } },
    },
    {
      id: "check-peso-minimo",
      type: "predict",
      help: [{ label: "Compara masas", message: "Para cada material calcula $A = F/\\sigma_e$ y luego $m = \\rho\\,A\\,L$. Con la herramienta ves las tres masas." }],
      title: "Material de peso mínimo",
      question: "Con $F = 50\\,000$ N y $L = 300$ mm, ¿qué material elegirías para que la pieza pese lo mínimo?",
      mode: "choice",
      choices: [
        { id: "al", label: "Aluminio: unos 147 g" },
        { id: "acero", label: "Acero: unos 172 g", incorrectFeedback: "Es el más resistente, pero necesita menos sección y aun así pesa más que el aluminio." },
        { id: "laton", label: "Latón: unos 370 g", incorrectFeedback: "Es el más pesado de los tres." },
      ],
      correctChoiceId: "al",
      shuffleChoices: true,
      explanation: "Aluminio: $A = 50\\,000/275 = 182$ mm², $m = 2{,}7\\cdot 54{,}5 = 147$ g. Acero: $172$ g. Latón: $370$ g.",
    },
    {
      id: "check-carroceria",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Relación de densidades", message: "La masa es proporcional a la densidad. Una carrocería de acero de $1\\,200$ kg pasa a pesar $1\\,200\\cdot \\dfrac{2{,}7}{7{,}87}$ si es de aluminio, con el mismo volumen." }],
      title: "Carrocería de aluminio",
      question: "Una carrocería de acero ($7{,}87$ kg/dm³) tiene una masa de $1\\,200$ kg. Si se hiciera del mismo volumen en aluminio ($2{,}70$ kg/dm³), ¿cuántos kg pesaría? (redondea a la unidad)",
      correctAnswers: ["412"],
      explanation: "$1\\,200 \\cdot \\dfrac{2{,}70}{7{,}87} = 411{,}7 \\approx 412$ kg. Con el mismo motor, ahorrar masa se traduce en más prestaciones o menos consumo.",
    },
  ],
};
