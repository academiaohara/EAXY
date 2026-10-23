import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const presionTemperaturaLesson: InteractiveLesson = {
  slug: "presion-temperatura",
  title: "6. Transductores de presión y temperatura",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Presión y temperatura son magnitudes clave en procesos; existen captadores **mecánicos**, **electromecánicos** y **electrónicos**." },
        { kind: "definition", text: "**Tubo Bourdon** y **diafragma**: elementos elásticos que se deforman con la presión." },
        { kind: "definition", text: "**Termopares** y **RTD (Pt100)**: generan señal eléctrica según la temperatura." },
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
          "**Tubo Bourdon** y **diafragma**: elementos elásticos que se deforman con la presión.", "**Termopares** y **RTD (Pt100)**: generan señal eléctrica según la temperatura.",
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
      question: "Un manómetro de tubo Bourdon mide directamente:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Presión mediante deformación de un tubo curvo" },
        { id: "temp", label: "Temperatura del fluido", incorrectFeedback: "Para temperatura usarías termopar o RTD." },
        { id: "caud", label: "Caudal volumétrico", incorrectFeedback: "El caudal requiere otro tipo de captador." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "El Bourdon se endereza con la presión interior y acciona un puntero o un transmisor.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "El Bourdon se endereza con la presión interior y acciona un puntero o un transmisor." },
      ],
      arrange: "stack",
    },
  ],
};
