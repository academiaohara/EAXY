import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const implementacionNandNorLesson: InteractiveLesson = {
  slug: "implementacion-nand-nor",
  title: "7. Implementación con NAND y NOR",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Cualquier AND/OR/NOT se construye solo con **NAND** o solo con **NOR**." },
        { kind: "definition", text: "NOT: NAND con entradas unidas; AND: NAND + inversor NAND." },
        { kind: "definition", text: "Tras simplificar en Karnaugh, se convierte a red NAND con De Morgan." },
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
          "NOT: NAND con entradas unidas; AND: NAND + inversor NAND.", "Tras simplificar en Karnaugh, se convierte a red NAND con De Morgan.",
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
      question: "¿Por qué se llaman universales a NAND y NOR?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Porque cualquier función lógica puede implementarse solo con ellas" },
        { id: "cheap", label: "Porque son más baratas", incorrectFeedback: "El motivo es funcional, no económico." },
        { id: "fast", label: "Porque son más rápidas", incorrectFeedback: "No es la definición de puerta universal." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Con repeticiones de una sola puerta universal se obtiene cualquier circuito combinatorio.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Con repeticiones de una sola puerta universal se obtiene cualquier circuito combinatorio." },
      ],
      arrange: "stack",
    },
  ],
};
