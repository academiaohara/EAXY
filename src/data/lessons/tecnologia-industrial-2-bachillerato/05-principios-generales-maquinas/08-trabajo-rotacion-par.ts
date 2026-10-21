import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const trabajoRotacionParLesson: InteractiveLesson = {
  slug: "trabajo-rotacion-par",
  title: "8. Trabajo de rotación y par",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "par",
      type: "slide",
      help: [
        {
          label: "¿Qué es un par de fuerzas?",
          message: "Un sistema de dos fuerzas de igual intensidad, direcciones paralelas y sentidos contrarios. No desplaza el centro del cuerpo: lo hace girar.",
        },
      ],
      title: "Del esfuerzo de empuje al esfuerzo de giro",
      blocks: [
        {
          kind: "text",
          text: "Cuando un cuerpo gira, el esfuerzo se manifiesta como un **par de fuerzas**, caracterizado por su **momento**. Si las fuerzas son perpendiculares al brazo $d$:",
        },
        {
          kind: "rule",
          formula: "M = d\\,F \\quad (\\text{N·m})",
          text: "El momento es una magnitud **vectorial**, de dirección perpendicular al plano de giro. No se debe confundir con el trabajo, que es un escalar aunque tenga las mismas unidades (N·m).",
        },
      ],
      visual: { kind: "anim", scene: "par-trabajo", beatMs: 4500 },
    },
    {
      id: "explora-par",
      type: "slide",
      help: [
        {
          label: "¿Por qué el ángulo en radianes?",
          message: "Porque la longitud de un arco es $\\theta\\,r$ solo si el ángulo está en radianes. Una vuelta completa son $2\\pi$ rad.",
        },
      ],
      title: "Trabajo = momento × ángulo",
      blocks: [
        {
          kind: "rule",
          formula: "W = M\\,\\theta",
          text: "Con $\\theta$ en radianes (puede ser mayor que $2\\pi$ si hay más de una vuelta).",
        },
        {
          kind: "text",
          text: "Ejemplo del libro: el par en la rueda de un coche es $500$ N·m y el diámetro, $0{,}5$ m. ¿Qué trabajo se hace al recorrer $1\\,000$ m?",
        },
      ],
      visual: { kind: "tool", tool: "par-trabajo-explorador", params: { a: 500, b: 0.5, c: 1000 } },
    },
    {
      id: "check-vueltas",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Ángulo y arco", message: "$\\theta = \\dfrac{s}{r}$ con $r = D/2 = 0{,}25$ m y $s = 1\\,000$ m." }],
      title: "Ángulo girado",
      question: "Una rueda de $0{,}5$ m de diámetro recorre $1\\,000$ m. ¿Cuántos radianes ha girado? (solo el número)",
      correctAnswers: ["4000", "4.000", "4 000"],
      explanation: "$\\theta = s/r = 1\\,000/0{,}25 = 4\\,000$ rad (unas $637$ vueltas).",
    },
    {
      id: "check-trabajo-rueda",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "W = M θ", message: "$W = 500\\ \\text{N·m}\\cdot 4\\,000\\ \\text{rad}$." }],
      title: "Trabajo en la rueda",
      question: "Con un par de $500$ N·m y los $4\\,000$ rad anteriores, ¿qué trabajo se realiza, en julios? (solo el número)",
      correctAnswers: ["2000000", "2.000.000", "2 000 000"],
      explanation: "$W = M\\,\\theta = 500\\cdot 4\\,000 = 2\\cdot 10^6$ J.",
    },
    {
      id: "check-fuerza-contacto",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "M = F · radio", message: "Las dos fuerzas del par (contacto con el suelo y la reacción en el eje) están separadas por el radio: $d = 0{,}25$ m." }],
      title: "Fuerza de contacto",
      question: "¿Cuál es la fuerza de contacto con el asfalto, en newtons, si $M = 500$ N·m y el radio de la rueda es $0{,}25$ m?",
      correctAnswers: ["2000"],
      explanation: "$F = M/d = 500/0{,}25 = 2\\,000$ N $\\approx 204$ kp.",
    },
    {
      id: "check-momento-trabajo",
      type: "predict",
      help: [{ label: "Escalar o vector", message: "El momento tiene dirección perpendicular al plano de giro; el trabajo no tiene dirección." }],
      title: "Momento frente a trabajo",
      question: "El momento de un par de fuerzas y el trabajo se miden en N·m. ¿Es correcto decir que son la misma magnitud?",
      mode: "choice",
      choices: [
        { id: "no", label: "No: el momento es un vector (perpendicular al plano de giro) y el trabajo es un escalar" },
        { id: "si", label: "Sí, porque tienen las mismas unidades", incorrectFeedback: "Misma unidad no implica misma magnitud: el momento es vectorial." },
        { id: "depende", label: "Solo si el ángulo girado es de una vuelta", incorrectFeedback: "El trabajo es momento por ángulo; aun con una vuelta no son iguales." },
      ],
      correctChoiceId: "no",
      shuffleChoices: true,
      explanation: "El momento se obtiene con el producto vectorial $\\vec{d}\\times\\vec{F}$; el trabajo, con el producto escalar de fuerza y desplazamiento.",
    },
  ],
};
