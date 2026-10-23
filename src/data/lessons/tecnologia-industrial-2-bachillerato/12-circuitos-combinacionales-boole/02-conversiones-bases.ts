import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const conversionesBasesLesson: InteractiveLesson = {
  slug: "conversiones-bases",
  title: "2. Conversiones entre bases numéricas",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Pasar de **decimal a binario**: divisiones sucesivas por 2 (parte entera) y multiplicaciones (parte decimal)." },
        { kind: "definition", text: "Los restos leídos de abajo arriba forman los bits (MSB al final de dividir)." },
        { kind: "definition", text: "Ejemplo: $45_{10} = 101101_2$." },
      ],
      arrange: "stack",
      visual: { kind: "anim", scene: "puertas-logicas-basicas", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "Los restos leídos de abajo arriba forman los bits (MSB al final de dividir).", "Ejemplo: $45_{10} = 101101_2$.",
        ] },
        { kind: "warning", text: "Repasa el PDF del libro: las tablas de características y los ejemplos numéricos del tema." },
      ],
      arrange: "stack",
    },
    
    {
      id: "clasifica",
      type: "classify",
      title: "¿Combinacional o secuencial?",
      question: "Clasifica cada bloque.",
      groups: [
        { id: "comb", label: "Combinacional", tone: "cobalt" },
        { id: "sec", label: "Secuencial", tone: "violet" },
      ],
      items: [
        { id: "1", text: "Puerta NAND", group: "comb" },
        { id: "2", text: "Mapa de Karnaugh", group: "comb" },
        { id: "3", text: "Biestable J-K", group: "sec" },
        { id: "4", text: "Relé enclavado", group: "sec" },
      ],
      hint: "¿Necesita memoria de estados anteriores?",
      explanation: "Combinacional: salida solo depende de entradas actuales. Secuencial: hay memoria.",
    },
    {
      id: "check",
      type: "predict",
      title: "Comprueba",
      question: "Para convertir la parte entera de un decimal a binario se usa:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Divisiones sucesivas por 2 guardando restos" },
        { id: "mul", label: "Multiplicaciones por 2", incorrectFeedback: "Las multiplicaciones sirven para la parte fraccionaria." },
        { id: "sum", label: "Suma de potencias de 10", incorrectFeedback: "Eso convierte binario a decimal, no al revés." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Cada resto es un bit; el último cociente es el bit más significativo.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Cada resto es un bit; el último cociente es el bit más significativo." },
      ],
      arrange: "stack",
    },
  ],
};
