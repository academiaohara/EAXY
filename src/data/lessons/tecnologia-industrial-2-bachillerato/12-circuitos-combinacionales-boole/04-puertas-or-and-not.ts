import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const puertasOrAndNotLesson: InteractiveLesson = {
  slug: "puertas-or-and-not",
  title: "4. Puertas OR, AND y NOT",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Las **puertas lógicas** implementan operaciones booleanas en electrónica." },
        { kind: "definition", text: "**OR** ($+$): 1 si alguna entrada es 1; contactos en **paralelo**." },
        { kind: "definition", text: "**AND** ($\\cdot$): 1 solo si todas valen 1; contactos en **serie**." },
        { kind: "definition", text: "**NOT**: invierte; símbolo con círculo o puerta 7404." },
      ],
      arrange: "stack",
    },
    {
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{ kind: "text", text: "Las **puertas lógicas** implementan operaciones booleanas en electrónica." }],
      visual: { kind: "anim", scene: "puertas-logicas-basicas", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "**OR** ($+$): 1 si alguna entrada es 1; contactos en **paralelo**.", "**AND** ($\\cdot$): 1 solo si todas valen 1; contactos en **serie**.", "**NOT**: invierte; símbolo con círculo o puerta 7404.",
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
      question: "La salida de una puerta AND es 1 cuando:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Todas las entradas valen 1" },
        { id: "one", label: "Al menos una entrada vale 1", incorrectFeedback: "Eso describe la puerta OR." },
        { id: "none", label: "Todas valen 0", incorrectFeedback: "En ese caso la salida es 0." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "AND es producto lógico: solo $1\\cdot1=1$.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "AND es producto lógico: solo $1\\cdot1=1$." },
      ],
      arrange: "stack",
    },
  ],
};
