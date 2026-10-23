import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const biestableRsLesson: InteractiveLesson = {
  slug: "biestable-rs",
  title: "2. Biestable R-S asíncrono",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "El **biestable R-S** tiene entradas **Reset** y **Set** y salidas complementarias $Q$ y $\\bar Q$." },
        { kind: "definition", text: "Con $R=S=0$ **mantiene** el estado; $S=1$ pone $Q=1$; $R=1$ pone $Q=0$." },
        { kind: "definition", text: "La combinación $11$ es **prohibida** en la versión con NOR." },
      ],
      arrange: "stack",
    },
    {
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{ kind: "text", text: "El **biestable R-S** tiene entradas **Reset** y **Set** y salidas complementarias $Q$ y $\\bar Q$." }],
      visual: { kind: "anim", scene: "biestable-rs", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "Con $R=S=0$ **mantiene** el estado; $S=1$ pone $Q=1$; $R=1$ pone $Q=0$.", "La combinación $11$ es **prohibida** en la versión con NOR.",
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
      question: "En un R-S asíncrono con NOR, ¿qué ocurre si R=0 y S=0?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Se conserva el estado anterior" },
        { id: "set", label: "Siempre Q=1", incorrectFeedback: "Eso corresponde a Set activo." },
        { id: "reset", label: "Siempre Q=0", incorrectFeedback: "Eso corresponde a Reset activo." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Ambas entradas a 0 bloquean cambios: es el modo memoria.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Ambas entradas a 0 bloquean cambios: es el modo memoria." },
      ],
      arrange: "stack",
    },
  ],
};
