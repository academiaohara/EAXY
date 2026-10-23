import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const detectoresInductivosLesson: InteractiveLesson = {
  slug: "detectores-inductivos",
  title: "2. Detectores inductivos",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Los **detectores inductivos** ven piezas **metálicas** sin contacto gracias a un campo magnético alterno." },
        { kind: "definition", text: "**Corrientes de Foucault**: en el metal cercano disipan energía y **amortiguan** el oscilador LC." },
        { kind: "definition", text: "**Distancia de reacción** $S_n$: alcance nominal; la **histéresis** evita conmutaciones repetidas al límite." },
      ],
      arrange: "stack",
    },
    {
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{ kind: "text", text: "Los **detectores inductivos** ven piezas **metálicas** sin contacto gracias a un campo magnético alterno." }],
      visual: { kind: "anim", scene: "sensor-inductivo", beatMs: 5200 },
    },
    {
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        { kind: "steps", items: [
          "**Corrientes de Foucault**: en el metal cercano disipan energía y **amortiguan** el oscilador LC.", "**Distancia de reacción** $S_n$: alcance nominal; la **histéresis** evita conmutaciones repetidas al límite.",
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
      question: "¿Qué material detecta con fiabilidad un sensor inductivo enrasado?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Una arandela de acero que se acerca al frente activo" },
        { id: "alu", label: "Un bloque de aluminio grueso a 40 mm", incorrectFeedback: "El aluminio es peor conductor magnético; suele reducirse el alcance." },
        { id: "plast", label: "Una pieza de plástico", incorrectFeedback: "No induce Foucault útiles: no activa la salida." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Los inductivos están pensados para metales ferromagnéticos o al menos conductores en el rango de $S_n$.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "Los inductivos están pensados para metales ferromagnéticos o al menos conductores en el rango de $S_n$." },
      ],
      arrange: "stack",
    },
  ],
};
