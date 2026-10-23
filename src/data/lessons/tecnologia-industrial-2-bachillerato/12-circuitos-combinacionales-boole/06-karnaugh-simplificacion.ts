import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const karnaughSimplificacionLesson: InteractiveLesson = {
  slug: "karnaugh-simplificacion",
  title: "6. Mapas de Karnaugh",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "El **mapa de Karnaugh** agrupa **unos adyacentes** para obtener la expresión mínima." },
        { kind: "definition", text: "Grupos de 1, 2, 4 u 8 celdas; la variable que cambia dentro del grupo se elimina." },
        { kind: "definition", text: "Ejemplo: $\\bar A B + A B \\rightarrow S = B$." },
      ],
      arrange: "stack",
    },
    {
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{ kind: "text", text: "El **mapa de Karnaugh** agrupa **unos adyacentes** para obtener la expresión mínima." }],
      visual: { kind: "anim", scene: "karnaugh-dos-variables", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "Grupos de 1, 2, 4 u 8 celdas; la variable que cambia dentro del grupo se elimina.", "Ejemplo: $\\bar A B + A B \\rightarrow S = B$.",
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
      question: "Al agrupar dos unos adyacentes en un mapa de 2 variables, suele desaparecer:",
      mode: "choice",
      choices: [
        { id: "ok", label: "La variable que cambia de valor dentro del grupo" },
        { id: "const", label: "La variable que se mantiene constante", incorrectFeedback: "La constante es la que permanece en el término." },
        { id: "out", label: "Toda la función", incorrectFeedback: "Solo se simplifica, no se anula." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Si dentro del grupo $A$ pasa de 0 a 1, $A$ no puede formar parte del producto simplificado.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Si dentro del grupo $A$ pasa de 0 a 1, $A$ no puede formar parte del producto simplificado." },
      ],
      arrange: "stack",
    },
  ],
};
