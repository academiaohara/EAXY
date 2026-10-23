import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const disenoSecuenciasPlcLesson: InteractiveLesson = {
  slug: "diseno-secuencias-plc",
  title: "6. Diseño de secuencias y autómatas",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "El diseño va del **diagrama de secuencia** al **esquema eléctrico** y, hoy, al **programa de autómata**." },
        { kind: "definition", text: "Ecuaciones tipo $KA_1 = \\overline{KT_2}\\cdot(SM + KA_1)$ incluyen enclavamiento." },
        { kind: "definition", text: "Los **PLC** sustituyen paneles de relés con la misma lógica reprogramable." },
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
          "Ecuaciones tipo $KA_1 = \\overline{KT_2}\\cdot(SM + KA_1)$ incluyen enclavamiento.", "Los **PLC** sustituyen paneles de relés con la misma lógica reprogramable.",
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
      question: "Frente a un panel de relés, un autómata programable:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Ocupa menos espacio y facilita cambios de secuencia" },
        { id: "slow", label: "Siempre es más lento", incorrectFeedback: "Suele ser más rápido y fiable." },
        { id: "no", label: "No puede implementar temporizadores", incorrectFeedback: "Los PLCs incluyen temporizadores software." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La lógica cableada enseña el razonamiento; el PLC lo ejecuta sin re-cablear.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "La lógica cableada enseña el razonamiento; el PLC lo ejecuta sin re-cablear." },
      ],
      arrange: "stack",
    },
  ],
};
