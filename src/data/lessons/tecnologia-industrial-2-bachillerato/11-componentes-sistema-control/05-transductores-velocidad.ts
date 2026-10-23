import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const transductoresVelocidadLesson: InteractiveLesson = {
  slug: "transductores-velocidad",
  title: "5. Transductores de velocidad",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "La **velocidad** angular o lineal se convierte en **trenes de impulsos** o en una **tensión proporcional**." },
        { kind: "definition", text: "**Encoder incremental**: ranuras + emisor/receptor → pulsos contados con reloj." },
        { kind: "definition", text: "**Tacómetro**: $e = K B \\omega$ relaciona velocidad angular y tensión de salida." },
      ],
      arrange: "stack",
      visual: { kind: "anim", scene: "sensor-inductivo", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "**Encoder incremental**: ranuras + emisor/receptor → pulsos contados con reloj.", "**Tacómetro**: $e = K B \\omega$ relaciona velocidad angular y tensión de salida.",
        ] },
        { kind: "warning", text: "Repasa el PDF del libro: las tablas de características y los ejemplos numéricos del tema." },
      ],
      arrange: "stack",
    },
    
    {
      id: "clasifica",
      type: "classify",
      title: "Conceptos clave",
      question: "Relaciona cada elemento con su unidad o magnitud.",
      groups: [
        { id: "a", label: "Captación", tone: "cobalt" },
        { id: "b", label: "Procesado", tone: "emerald" },
      ],
      items: [
        { id: "1", text: "Transductor / sensor", group: "a" },
        { id: "2", text: "Amplificador o A/D", group: "b" },
        { id: "3", text: "Tabla de verdad", group: "b" },
        { id: "4", text: "Magnitud física medida", group: "a" },
      ],
      hint: "Piensa si convierte una magnitud o manipula señales/lógica.",
      explanation: "Los captadores miran al proceso; el procesado prepara la señal o la lógica.",
    },
    {
      id: "check",
      type: "predict",
      title: "Comprueba",
      question: "¿Para medir la posición angular de un eje con resolución fina suele usarse?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Encoder óptico incremental" },
        { id: "term", label: "Termopar tipo K", incorrectFeedback: "Mide temperatura, no ángulo." },
        { id: "ldr", label: "Fotorresistencia LDR", incorrectFeedback: "Depende de la luz ambiente, no de la posición mecánica." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Contando pulsos del encoder conoces desplazamiento angular (y velocidad si usas un reloj).",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Contando pulsos del encoder conoces desplazamiento angular (y velocidad si usas un reloj)." },
      ],
      arrange: "stack",
    },
  ],
};
