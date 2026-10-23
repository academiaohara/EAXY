import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const codificadoresMultiplexoresLesson: InteractiveLesson = {
  slug: "codificadores-multiplexores",
  title: "8. Codificadores, decodificadores y multiplexores",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Los **decodificadores** activan una de $2^n$ salidas; los **multiplexores** eligen una de varias entradas." },
        { kind: "definition", text: "**74154**: decodificador/demultiplexor 4→16 con entradas de inhibición." },
        { kind: "definition", text: "Se usan en selección de memoria y generación de señales de control." },
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
          "**74154**: decodificador/demultiplexor 4→16 con entradas de inhibición.", "Se usan en selección de memoria y generación de señales de control.",
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
      question: "Un multiplexor de 4 entradas necesita _____ entradas de selección.",
      mode: "choice",
      choices: [
        { id: "ok", label: "2" },
        { id: "4", label: "4", incorrectFeedback: "Son entradas de datos, no de selección." },
        { id: "1", label: "1", incorrectFeedback: "Con 1 bit solo elegirías 2 entradas." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$2^2 = 4$ canales; cada combinación de $S_1S_0$ elige una entrada.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "$2^2 = 4$ canales; cada combinación de $S_1S_0$ elige una entrada." },
      ],
      arrange: "stack",
    },
  ],
};
