import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_13_SUBTITLE } from "@/data/lessons/shared";

export const biestablesJkDTLesson: InteractiveLesson = {
  slug: "biestables-jk-d-t",
  title: "3. Biestables J-K, D y T",
  subtitle: TEMA_TI2_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Los biestables **J-K**, **D** y **T** evitan el estado prohibido y permiten **sincronismo** con reloj." },
        { kind: "definition", text: "**D**: retrasa la entrada un ciclo ($Q_{n+1}=D$)." },
        { kind: "definition", text: "**T**: con $T=1$ conmuta; con $T=0$ mantiene." },
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
          "**D**: retrasa la entrada un ciclo ($Q_{n+1}=D$).", "**T**: con $T=1$ conmuta; con $T=0$ mantiene.",
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
      question: "El biestable D se usa principalmente para:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Registrar (almacenar) un bit en el flanco de reloj" },
        { id: "osc", label: "Oscilar libremente", incorrectFeedback: "Eso sería un multivibrador astable." },
        { id: "add", label: "Sumar bits", incorrectFeedback: "La suma es combinatoria." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "En el flanco activo copia D a Q: es la celda básica de un registro.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "En el flanco activo copia D a Q: es la celda básica de un registro." },
      ],
      arrange: "stack",
    },
  ],
};
