import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_12_SUBTITLE } from "@/data/lessons/shared";

export const sumadoresBinariosLesson: InteractiveLesson = {
  slug: "sumadores-binarios",
  title: "9. Sumadores binarios",
  subtitle: TEMA_TI2_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "La **suma binaria** usa **arrastre** (carry) igual que el decimal, pero con reglas $1+1=10_2$." },
        { kind: "definition", text: "**Medio sumador**: suma dos bits; **sumador completo** incluye carry de entrada." },
        { kind: "definition", text: "Los sumadores encadenados forman la ALU de un procesador." },
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
          "**Medio sumador**: suma dos bits; **sumador completo** incluye carry de entrada.", "Los sumadores encadenados forman la ALU de un procesador.",
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
      question: "En binario, $1 + 1 + 1$ (bit de arrastre incluido) da:",
      mode: "choice",
      choices: [
        { id: "ok", label: "11₂ (suma 3)" },
        { id: "10", label: "10₂", incorrectFeedback: "Falta contar el carry entrante." },
        { id: "100", label: "100₂", incorrectFeedback: "Demasiado alto para tres unos." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$1+1+1 = 3$, que se escribe $11_2$ (carry 1 y suma 1).",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "$1+1+1 = 3$, que se escribe $11_2$ (carry 1 y suma 1)." },
      ],
      arrange: "stack",
    },
  ],
};
