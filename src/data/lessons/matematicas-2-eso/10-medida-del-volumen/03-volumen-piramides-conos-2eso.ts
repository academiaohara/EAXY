import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_10_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const volumenPiramidesConos2esoLesson: InteractiveLesson = {
  slug: "volumen-piramides-conos-2eso",
  title: "3. Volumen de la pirámide y del cono",
  subtitle: TEMA_2ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tercio",
      type: "slide",
      help: [
        {
          label: "Experimento",
          message: "Si llenas de agua una pirámide y la viertes en un prisma de la misma base y altura, la llenas a un tercio. Hacen falta tres pirámides.",
        },
        {
          label: "Mismo para el cono",
          message: "Con un cono y un cilindro de igual base e igual altura pasa lo mismo: el cono ocupa un tercio.",
        },
      ],
      title: "Un tercio del prisma y del cilindro",
      blocks: [
        {
          kind: "rule",
          title: "Pirámide y cono",
          text: "El volumen es **la tercera parte** del área de la base por la altura.",
          formula: "V_{pirámide} = \\dfrac{1}{3} A_{base} \\cdot h \\qquad V_{cono} = \\dfrac{1}{3} \\pi r^2 \\cdot h",
        },
        {
          kind: "text",
          text: "Se necesitan **tres pirámides** para llenar un prisma con la misma base y la misma altura (y tres conos para un cilindro).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "ejemplo-piramide",
      type: "slide",
      help: [
        {
          label: "Falta un cateto",
          message: "La base es un triángulo rectángulo con hipotenusa $10$ y un cateto $6$: el otro cateto es $\\sqrt{10^2 - 6^2} = 8$.",
        },
        {
          label: "Después, un tercio",
          message: "$A_{base} = \\frac{6 \\cdot 8}{2} = 24$ y $V = \\frac{1}{3} \\cdot 24 \\cdot 20$.",
        },
      ],
      title: "Una pirámide con base triangular",
      blocks: [
        {
          kind: "text",
          text: "La altura de una pirámide es $20$ cm. Su base es un triángulo rectángulo de hipotenusa $10$ cm y un cateto de $6$ cm.",
        },
        {
          kind: "example",
          lines: [
            { math: "c = \\sqrt{10^2 - 6^2} = 8\\,\\text{cm}" },
            { math: "A_{base} = \\dfrac{6 \\cdot 8}{2} = 24\\,\\text{cm}^2" },
            { math: "V = \\dfrac{1}{3} \\cdot 24 \\cdot 20 = 160\\,\\text{cm}^3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "ejemplo-cono",
      type: "slide",
      help: [
        {
          label: "Una unidad común",
          message: "Radio $20$ cm y altura $4$ dm: pasa todo a dm ($r = 2$ dm) y el volumen saldrá en dm³, es decir, en litros.",
        },
      ],
      title: "Un cono",
      blocks: [
        {
          kind: "example",
          title: "Cono de 4 dm de altura y 20 cm de radio",
          lines: [
            { math: "r = 20\\,\\text{cm} = 2\\,\\text{dm}" },
            { math: "A_{base} = 3{,}14 \\cdot 2^2 = 12{,}56\\,\\text{dm}^2" },
            { math: "V = \\dfrac{1}{3} \\cdot 12{,}56 \\cdot 4 \\approx 16{,}75\\,\\text{dm}^3 = 16{,}75\\,\\text{l}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-keops",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Base cuadrada",
          message: "$A_{base} = 230^2 = 52\\,900$ m². $V = \\frac{1}{3} \\cdot 52\\,900 \\cdot 146$.",
        },
        {
          label: "Pasa a hm³",
          message: "$1$ hm³ $= 1\\,000\\,000$ m³.",
        },
      ],
      title: "La pirámide de Keops",
      question: "La pirámide de Keops es cuadrangular regular: base de $230$ m de lado y altura $146$ m. ¿Cuántos hm³ tiene aproximadamente?",
      mode: "choice",
      choices: [
        { id: "2.57", label: "$2{,}57$ hm³" },
        { id: "7.72", label: "$7{,}72$ hm³", incorrectFeedback: "Has olvidado dividir entre $3$: $52\\,900 \\cdot 146 = 7\\,723\\,400$ m³." },
        { id: "2574", label: "$2\\,574$ hm³", incorrectFeedback: "Está mal el cambio de unidades: $2\\,574\\,467$ m³ son $2{,}57$ hm³ (un millón de m³ por hm³)." },
        { id: "0.257", label: "$0{,}257$ hm³", incorrectFeedback: "Has corrido la coma un lugar de más: son $2\\,574\\,467$ m³." },
      ],
      correctChoiceId: "2.57",
      shuffleChoices: true,
      explanation: "$V = \\frac{1}{3} \\cdot 230^2 \\cdot 146 \\approx 2\\,574\\,467$ m³ $\\approx 2{,}57$ hm³.",
    },
    {
      id: "check-cono",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Misma unidad",
          message: "$2$ dm $= 20$ cm. Con radio $8$ cm y altura $20$ cm: $V = \\frac{1}{3} \\cdot 3{,}14 \\cdot 8^2 \\cdot 20$.",
        },
      ],
      title: "Otro cono",
      question: "Halla el volumen de un cono de $8$ cm de radio y $2$ dm de altura (usa $\\pi \\approx 3{,}14$).",
      mode: "choice",
      choices: [
        { id: "1339.7", label: "$1\\,339{,}7$ cm³" },
        { id: "4019", label: "$4\\,019$ cm³", incorrectFeedback: "Has olvidado dividir entre $3$." },
        { id: "133.97", label: "$133{,}97$ cm³", incorrectFeedback: "Has usado la altura $2$ en vez de $20$ cm: hay que pasar los dm a cm." },
        { id: "2679", label: "$2\\,679$ cm³", incorrectFeedback: "Has dividido entre $3/2$ o has usado $2\\pi r^2$: la fórmula es $\\frac{1}{3} \\pi r^2 h$." },
      ],
      correctChoiceId: "1339.7",
      shuffleChoices: true,
      explanation: "$V = \\frac{1}{3} \\cdot 3{,}14 \\cdot 64 \\cdot 20 \\approx 1\\,339{,}7$ cm³ $\\approx 1{,}34$ l.",
    },
    {
      id: "check-tercio",
      type: "fill_in_blank",
      help: [
        {
          label: "Un tercio",
          message: "Un cono con la misma base y altura ocupa un tercio del cilindro: divide entre $3$.",
        },
      ],
      title: "Cono y cilindro",
      question: "Un cilindro tiene un volumen de $600$ cm³. ¿Qué volumen tiene un cono con la misma base y la misma altura, en cm³? (solo el número)",
      correctAnswers: ["200"],
      explanation: "$600 : 3 = 200$ cm³.",
    },
  ],
};
