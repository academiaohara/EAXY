import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const senalAnalogicaDigitalLesson: InteractiveLesson = {
  slug: "senal-analogica-digital",
  title: "1. Señales analógicas y conversión digital",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Para **regular** una magnitud física conviene convertirla en **señal eléctrica** medible con voltímetro o registrador." },
        { kind: "definition", text: "**Señal analógica**: puede tomar infinitos valores entre dos extremos; un reóstato o un 4–20 mA son ejemplos." },
        { kind: "definition", text: "**Señal digital**: solo toma valores discretos; con $n$ bits hay $2^n$ intervalos de cuantización." },
      ],
      arrange: "stack",
    },
    {
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{ kind: "text", text: "Para **regular** una magnitud física conviene convertirla en **señal eléctrica** medible con voltímetro o registrador." }],
      visual: { kind: "anim", scene: "senal-analogica-digital", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "**Señal analógica**: puede tomar infinitos valores entre dos extremos; un reóstato o un 4–20 mA son ejemplos.", "**Señal digital**: solo toma valores discretos; con $n$ bits hay $2^n$ intervalos de cuantización.",
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
      question: "En un depósito, un flotador mueve un cursor sobre un reóstato alimentado a 12 V. ¿Qué tipo de señal entrega?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Analógica continua (tensión proporcional al nivel)" },
        { id: "dig", label: "Digital de un solo bit", incorrectFeedback: "Cuantizaría el nivel en intervalos discretos." },
        { id: "onoff", label: "Solo encendido/apagado", incorrectFeedback: "Eso sería un detector de umbral, no un reóstato lineal." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Mientras la tensión varía en continuo con el nivel, la señal es analógica; la digitalización llega después con un A/D.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Mientras la tensión varía en continuo con el nivel, la señal es analógica; la digitalización llega después con un A/D." },
      ],
      arrange: "stack",
    },
  ],
};
