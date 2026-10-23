import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const teoriaBimodalGrafosLesson: InteractiveLesson = {
  slug: "teoria-bimodal-grafos",
  title: "5. Teoría bimodal y grafos",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "La **teoría bimodal** representa estados y transiciones con **grafos** y obtiene **ecuaciones** de cada relé." },
        { kind: "definition", text: "Cada estado $KA_i$ se activa con condiciones de encendido y se mantiene con realimentación." },
        { kind: "definition", text: "Los **cronogramas** muestran tiempos de temporizadores en paralelo." },
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
          "Cada estado $KA_i$ se activa con condiciones de encendido y se mantiene con realimentación.", "Los **cronogramas** muestran tiempos de temporizadores en paralelo.",
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
      question: "Un grafo bimodal representa:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Estados del sistema y condiciones de paso entre ellos" },
        { id: "truth", label: "Una tabla de verdad combinatoria", incorrectFeedback: "Las tablas no incluyen memoria temporal." },
        { id: "analog", label: "Una señal analógica", incorrectFeedback: "Es herramienta de lógica secuencial." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Los nodos son estados (relés); las aristas, condiciones de transición.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Los nodos son estados (relés); las aristas, condiciones de transición." },
      ],
      arrange: "stack",
    },
  ],
};
