import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const turbinaGasBraytonLesson: InteractiveLesson = {
  slug: "turbina-gas-brayton",
  title: "4. Turbina de gas: el ciclo Brayton",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "¿Y los motores de chorro?",
          message: "El turborreactor de un avión es una turbina de gas cuyo escape se expulsa a alta velocidad: el empuje sale del principio de acción y reacción.",
        },
      ],
      title: "Los tres elementos de una turbina de gas",
      blocks: [
        {
          kind: "text",
          text: "En un motor **rotativo** la combustión es **continua** y los gases actúan sobre una turbina. Los elementos de una turbina de gas son:",
        },
        {
          kind: "steps",
          items: [
            "**Compresor** (axial o radial): comprime el aire y transforma energía cinética en energía de presión.",
            "**Cámara de combustión**: llega el aire comprimido y se inyecta combustible pulverizado. Solo se quema parte del aire; el resto enfría los gases.",
            "**Turbina**: los gases lanzados contra los álabes ceden energía; se mueve el compresor y, además, un alternador o una hélice.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "brayton-circuito", beatMs: 5600 },
    },
    {
      id: "rendimiento",
      type: "slide",
      help: [
        {
          label: "¿Por qué dos adiabáticas y dos isobáricas?",
          message: "En el compresor y en la turbina apenas hay tiempo de intercambiar calor (adiabáticas); en la cámara y en la salida, la presión es la del circuito (isobáricas).",
        },
      ],
      title: "El rendimiento depende de la relación de presiones",
      blocks: [
        {
          kind: "rule",
          title: "Rendimiento del ciclo Brayton (Joule)",
          formula: "\\eta = 1 - \\dfrac{T_4 - T_1}{T_3 - T_2} = 1 - \\dfrac{1}{r_p^{(\\gamma-1)/\\gamma}}",
          text: "Con $r_p = p_2/p_1$ (relación de presiones) y $\\gamma = 1{,}4$ para el aire. Una turbina de ciclo abierto depende de la presión de entrada (≈ 1 bar) y de la de salida del compresor.",
        },
        {
          kind: "text",
          text: "Mueve la relación de presiones y observa cómo crece el rendimiento teórico.",
        },
      ],
      visual: { kind: "tool", tool: "brayton-explorador", params: { a: 10 } },
    },
    {
      id: "check-perdida",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Cálculo", message: "$r_p^{(\\gamma-1)/\\gamma} = 10^{0{,}2857} = 1{,}931$, así que $\\eta = 1 - 1/1{,}931$." }],
      title: "Energía no utilizable",
      question: "Una turbina de gas toma aire a $1$ bar y el compresor lo comprime a $10$ bar. Con $\\gamma = 1{,}4$, ¿qué porcentaje de la energía **no** será utilizable? (redondea a la unidad)",
      correctAnswers: ["52", "52 %", "52%", "51,8", "51.8"],
      explanation: "$\\eta = 1 - 1/1{,}931 = 0{,}48$. Se pierde $1 - 0{,}48 = 0{,}52$: el $52\\,\\%$ sale con los gases de escape.",
    },
    {
      id: "check-rp5",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Exponente", message: "$(\\gamma-1)/\\gamma = 0{,}4/1{,}4 = 0{,}2857$ y $5^{0{,}2857} = 1{,}584$." }],
      title: "Una relación de presiones menor",
      question: "¿Qué rendimiento teórico tiene el ciclo Brayton con $r_p = 5$? (en %, redondea a la unidad)",
      correctAnswers: ["37", "37 %", "37%", "36,9", "36.9"],
      explanation: "$\\eta = 1 - 1/5^{0{,}2857} = 1 - 1/1{,}584 = 0{,}369$: $37\\,\\%$. Con menor relación de presiones, menor rendimiento.",
    },
    {
      id: "check-realidad",
      type: "predict",
      help: [{ label: "Pista", message: "Parte del trabajo de la turbina mueve el compresor." }],
      title: "Del 48 % ideal a lo real",
      question: "Con $\\eta = 0{,}48$ en el ciclo ideal, solo se aprovecha entre el $30$ y el $35\\,\\%$ de la energía. ¿Por qué?",
      mode: "choice",
      choices: [
        { id: "compresor", label: "Porque parte de la energía que da la turbina se gasta en mover el propio compresor" },
        { id: "aire", label: "Porque el aire tiene demasiado oxígeno", incorrectFeedback: "Cantidad de oxígeno no es el problema: se usa aire en exceso a propósito." },
        { id: "pared", label: "Porque las paredes de la turbina absorben el calor", incorrectFeedback: "Hay pérdidas, pero la principal razón es mover el compresor." },
      ],
      correctChoiceId: "compresor",
      shuffleChoices: true,
      explanation: "La energía neta que suministra la turbina es la diferencia entre su trabajo y el que consume el compresor.",
    },
    {
      id: "regenerativo",
      type: "slide",
      help: [
        {
          label: "¿Qué es un regenerador?",
          message: "Un intercambiador de calor: los gases calientes de escape ceden calor al aire comprimido antes de entrar en la cámara de combustión.",
        },
      ],
      title: "Aprovechar los gases de escape: ciclo regenerativo",
      blocks: [
        {
          kind: "text",
          text: "Los gases de escape salen todavía muy calientes. Se usan para **calentar el aire que sale del compresor** (no el que entra) y así procurarle más energía antes de la cámara.",
        },
        {
          kind: "text",
          text: "Esta variante se llama **ciclo regenerativo** y aumenta la energía de los gases de combustión; el regenerador es un intercambiador de calor.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-regenerador",
      type: "predict",
      help: [{ label: "Pista", message: "Recupera calor de los gases de escape." }],
      title: "El regenerador",
      question: "¿Qué hace el regenerador de una turbina de gas?",
      mode: "choice",
      choices: [
        { id: "calienta", label: "Calienta el aire que sale del compresor con el calor de los gases de escape" },
        { id: "enfria", label: "Enfría el aire antes del compresor", incorrectFeedback: "Esa sería la función de un enfriador previo, no del regenerador." },
        { id: "quema", label: "Quema el combustible sobrante", incorrectFeedback: "La combustión se hace en la cámara." },
      ],
      correctChoiceId: "calienta",
      shuffleChoices: true,
      explanation: "Reutiliza calor que de otro modo se perdería por el escape.",
    },
  ],
};
