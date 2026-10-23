import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const algebraBooleTablasLesson: InteractiveLesson = {
  slug: "algebra-boole-tablas",
  title: "3. Álgebra de Boole y tablas de verdad",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "El **álgebra de Boole** (Boole, Shannon) manipula variables que solo valen **0** o **1**." },
        { kind: "definition", text: "**Lógica positiva**: el nivel alto es 1; **negativa**: el alto es 0." },
        { kind: "definition", text: "**Tabla de verdad** lista todas las combinaciones de entradas y la salida." },
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
          "**Lógica positiva**: el nivel alto es 1; **negativa**: el alto es 0.", "**Tabla de verdad** lista todas las combinaciones de entradas y la salida.",
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
      question: "Una tabla de verdad de dos variables tiene:",
      mode: "choice",
      choices: [
        { id: "ok", label: "4 filas" },
        { id: "2", label: "2 filas", incorrectFeedback: "Son $2^2$ combinaciones." },
        { id: "8", label: "8 filas", incorrectFeedback: "Sería con tres variables." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Con $n$ variables hay $2^n$ filas; para $n=2$ son cuatro.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Con $n$ variables hay $2^n$ filas; para $n=2$ son cuatro." },
      ],
      arrange: "stack",
    },
  ],
};
