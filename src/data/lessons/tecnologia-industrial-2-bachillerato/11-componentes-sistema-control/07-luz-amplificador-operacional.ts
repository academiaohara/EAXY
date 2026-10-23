import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const luzAmplificadorOperacionalLesson: InteractiveLesson = {
  slug: "luz-amplificador-operacional",
  title: "7. Transductores de luz y amplificador operacional",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Las **LDR** y los **fotodiodos** convierten luz en señal eléctrica; el **operacional** amplifica o compara." },
        { kind: "definition", text: "**Amplificador inversor**: $-V_s/V_e = R_2/R_1$ con virtual ground en la entrada −." },
        { kind: "definition", text: "**Comparador**: la salida satura a ±$V_{cc}$ según cuál entrada sea mayor." },
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
          "**Amplificador inversor**: $-V_s/V_e = R_2/R_1$ con virtual ground en la entrada −.", "**Comparador**: la salida satura a ±$V_{cc}$ según cuál entrada sea mayor.",
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
      question: "En un amplificador inversor ideal, si $R_2 = 100\\,\\text{k}\\Omega$ y $R_1 = 10\\,\\text{k}\\Omega$, la ganancia en módulo es:",
      mode: "choice",
      choices: [
        { id: "ok", label: "10" },
        { id: "0.1", label: "0,1", incorrectFeedback: "Es la relación $R_2/R_1$, no su inversa." },
        { id: "100", label: "100", incorrectFeedback: "Revisa la fórmula del inversor." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La ganancia es $|R_2/R_1| = 10$: 1 V de entrada produce 10 V de salida (invertidos).",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "La ganancia es $|R_2/R_1| = 10$: 1 V de entrada produce 10 V de salida (invertidos)." },
      ],
      arrange: "stack",
    },
  ],
};
