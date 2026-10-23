import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const aplicacionesAutomocionLesson: InteractiveLesson = {
  slug: "aplicaciones-automocion",
  title: "8. Aplicaciones en automoción",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "El **acelerador electrónico** ya no usa cable Bowden: un **potenciómetro** envía la consigna al módulo de gestión." },
        { kind: "definition", text: "**ASR**: limita el par si las ruedas patinan; comparte sensores con el **ABS**." },
        { kind: "definition", text: "Todo ello son lazos **cerrados** con captadores, ECU y actuadores." },
      ],
      arrange: "stack",
    },
    {
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{ kind: "text", text: "El **acelerador electrónico** ya no usa cable Bowden: un **potenciómetro** envía la consigna al módulo de gestión." }],
      visual: { kind: "anim", scene: "lazo-abierto-cerrado", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "**ASR**: limita el par si las ruedas patinan; comparte sensores con el **ABS**.", "Todo ello son lazos **cerrados** con captadores, ECU y actuadores.",
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
      question: "El pedal acelerador moderno actúa como:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Mando que genera señal eléctrica de consigna" },
        { id: "act", label: "Actuador de par directo sobre el motor", incorrectFeedback: "El actuador es la mariposa o el motor eléctrico asociado." },
        { id: "capt", label: "Captador de velocidad de rueda", incorrectFeedback: "Eso está en el sistema ABS." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "El pedal es el mando; la ECU interpreta la señal y acciona la mariposa o el motor eléctrico.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "El pedal es el mando; la ECU interpreta la señal y acciona la mariposa o el motor eléctrico." },
      ],
      arrange: "stack",
    },
  ],
};
