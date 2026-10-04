import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen y sistemas de numeración",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "origen-contar",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "origen-contar",
      title: "¿De dónde salen los números?",
      layout: "stack",
    },
    {
      id: "sistemas-historia",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "sistemas-historia",
      title: "Tres maneras de contar",
      layout: "stack",
    },
    {
      id: "decimal-intro",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "decimal-intro",
      title: "El sistema decimal",
      layout: "stack",
    },
    {
      id: "contar-diez",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "contar-diez",
      title: "Contar unidades hasta diez",
      layout: "stack",
    },
    {
      id: "redondeo-demo",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "redondeo-demo",
      title: "Aproximar redondeando",
      layout: "stack",
      content: [
        "Cuando un número tiene muchas cifras, usamos un valor **aproximado** terminado en ceros. La **raya** marca el último dígito que conservamos; a la derecha, todo pasa a ceros (y quizá sumamos 1).",
      ],
    },
    {
      id: "redondeo-corte",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "redondeo-corte",
      title: "Practica el corte",
      layout: "stack",
      content: [
        "Pulsa el **último dígito que se conserva** al redondear al orden pedido. A su derecha irán ceros; si la primera cifra que quitas es 5 o mayor, suma 1 a la cifra anterior.",
      ],
      roundingExercise: { n: 4587, orderId: "decenas" },
    },
    {
      id: "redondeo-escribir",
      type: "fill_in_blank",
      title: "Escribe el redondeo",
      content: [
        "Para redondear a los **millares**, fíjate en la cifra de **centenas**: si es 5 o mayor, el millar sube; si es menor que 5, se mantiene.",
      ],
      question: "Redondea $24\\,963$ a los millares. Escribe el número (puedes usar o no espacios).",
      correctAnswers: ["25000", "25 000", "25.000"],
      hint: "Mira la cifra de centenas ($9$). ¿Es 5 o mayor?",
      explanation: "Como $9 \\geq 5$, el millar sube: $25\\,000$.",
    },
  ],
};
