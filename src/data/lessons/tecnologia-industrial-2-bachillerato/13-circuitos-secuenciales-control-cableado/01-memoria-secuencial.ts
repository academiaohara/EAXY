import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const memoriaSecuencialLesson: InteractiveLesson = {
  slug: "memoria-secuencial",
  title: "1. Circuitos secuenciales y memoria",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "En un circuito **secuencial** la salida depende de las **entradas actuales y del historial**." },
        { kind: "definition", text: "**Memoria**: desde relés hasta biestables integrados." },
        { kind: "definition", text: "En automatización aún se diseñan esquemas con **relés** antes de pasarlos a PLC." },
      ],
      arrange: "stack",
      visual: { kind: "anim", scene: "biestable-rs", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "**Memoria**: desde relés hasta biestables integrados.", "En automatización aún se diseñan esquemas con **relés** antes de pasarlos a PLC.",
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
      question: "¿Qué elemento aporta la memoria en un circuito secuencial?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Un biestable o elemento equivalente" },
        { id: "and", label: "Una puerta AND", incorrectFeedback: "Es combinatoria, sin memoria." },
        { id: "wire", label: "Un simple cable", incorrectFeedback: "No almacena estados." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Los biestables guardan un bit; las máquinas de estados los encadenan.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Los biestables guardan un bit; las máquinas de estados los encadenan." },
      ],
      arrange: "stack",
    },
  ],
};
