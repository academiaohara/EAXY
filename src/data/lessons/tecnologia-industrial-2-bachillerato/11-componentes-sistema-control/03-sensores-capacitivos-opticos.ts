import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const sensoresCapacitivosOpticosLesson: InteractiveLesson = {
  slug: "sensores-capacitivos-opticos",
  title: "3. Sensores capacitivos y ópticos",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Los **capacitivos** detectan cambios de **capacidad** del campo eléctrico; los **ópticos** usan luz modulada (infrarroja)." },
        { kind: "definition", text: "**Capacitivo**: oscilador RC; líquidos, polvos y metales alteran la capacidad." },
        { kind: "definition", text: "**Óptico**: modos **barrera**, **reflexión** con reflector o **directo** sobre el objeto." },
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
          "**Capacitivo**: oscilador RC; líquidos, polvos y metales alteran la capacidad.", "**Óptico**: modos **barrera**, **reflexión** con reflector o **directo** sobre el objeto.",
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
      question: "Para contar botellas transparentes en una cinta, ¿qué principio suele ser más adecuado?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Sensor óptico por barrera o reflexión" },
        { id: "ind", label: "Detector inductivo", incorrectFeedback: "No ve plástico ni vidrio." },
        { id: "cap", label: "Solo capacitivo en polvo seco", incorrectFeedback: "Puede valer, pero la óptica es la opción típica en embotellado." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La óptica detecta casi cualquier sólido opaco o reflectante; el inductivo exige metal.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "La óptica detecta casi cualquier sólido opaco o reflectante; el inductivo exige metal." },
      ],
      arrange: "stack",
    },
  ],
};
