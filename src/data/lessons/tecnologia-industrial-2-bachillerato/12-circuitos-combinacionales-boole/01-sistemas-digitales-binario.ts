import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const sistemasDigitalesBinarioLesson: InteractiveLesson = {
  slug: "sistemas-digitales-binario",
  title: "1. Sistemas digitales y código binario",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Los sistemas digitales trabajan con **dos niveles** (0 y 1), lo que simplifica el diseño de circuitos muy rápidos." },
        { kind: "definition", text: "**Bit**: dígito binario; **byte**: palabra de 8 bits ($256$ estados)." },
        { kind: "definition", text: "Un PC realiza millones de operaciones binarias por segundo sin ambigüedad de niveles." },
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
          "**Bit**: dígito binario; **byte**: palabra de 8 bits ($256$ estados).", "Un PC realiza millones de operaciones binarias por segundo sin ambigüedad de niveles.",
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
      question: "¿Cuántos estados distintos codifica un byte?",
      mode: "choice",
      choices: [
        { id: "ok", label: "256" },
        { id: "8", label: "8", incorrectFeedback: "Son 8 bits, pero las combinaciones son $2^8$." },
        { id: "16", label: "16", incorrectFeedback: "Recuerda $2^8$." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$2^8 = 256$ combinaciones posibles de ocho bits.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "$2^8 = 256$ combinaciones posibles de ocho bits." },
      ],
      arrange: "stack",
    },
  ],
};
