import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const elementosControlCableadoLesson: InteractiveLesson = {
  slug: "elementos-control-cableado",
  title: "4. Elementos del control cableado",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "El **control cableado** usa **contactos** y **relés** en esquemas tipo **ladder**." },
        { kind: "definition", text: "**Pulsador NA**: vuelve solo; **interruptor**: mantiene posición." },
        { kind: "definition", text: "**Relé/contactor** y **temporizadores** KT generan retardos." },
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
          "**Pulsador NA**: vuelve solo; **interruptor**: mantiene posición.", "**Relé/contactor** y **temporizadores** KT generan retardos.",
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
      question: "Un pulsador normalmente abierto:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Cierra el circuito solo mientras se presiona" },
        { id: "lock", label: "Mantiene la posición cerrada", incorrectFeedback: "Eso es un interruptor." },
        { id: "timer", label: "Retarda la señal automáticamente", incorrectFeedback: "El retardo lo da un temporizador." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Al soltar el dedo vuelve a abrir: un solo estado estable (abierto).",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Al soltar el dedo vuelve a abrir: un solo estado estable (abierto)." },
      ],
      arrange: "stack",
    },
  ],
};
