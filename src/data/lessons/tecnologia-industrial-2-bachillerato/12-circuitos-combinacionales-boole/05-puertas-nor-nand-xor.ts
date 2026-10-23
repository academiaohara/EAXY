import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const puertasNorNandXorLesson: InteractiveLesson = {
  slug: "puertas-nor-nand-xor",
  title: "5. Puertas NOR, NAND y XOR",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "**NOR** y **NAND** son **universales**: con ellas se puede implementar cualquier función." },
        { kind: "definition", text: "**XOR** ($\\oplus$): salida 1 si las entradas son **distintas**." },
        { kind: "definition", text: "Integrados: 7400 (NAND), 7402 (NOR), 7486 (XOR)." },
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
          "**XOR** ($\\oplus$): salida 1 si las entradas son **distintas**.", "Integrados: 7400 (NAND), 7402 (NOR), 7486 (XOR).",
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
      question: "¿Qué puerta tiene salida 1 cuando las entradas son diferentes?",
      mode: "choice",
      choices: [
        { id: "ok", label: "XOR" },
        { id: "and", label: "AND", incorrectFeedback: "Requiere ambas a 1." },
        { id: "or", label: "OR", incorrectFeedback: "Con 1 y 0 ya valdría, pero también con 1 y 1." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La O-exclusiva detecta desigualdad: $1\\oplus0=1$, $1\\oplus1=0$.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "La O-exclusiva detecta desigualdad: $1\\oplus0=1$, $1\\oplus1=0$." },
      ],
      arrange: "stack",
    },
  ],
};
