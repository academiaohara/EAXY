import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_11_SUBTITLE } from "@/data/lessons/shared";

export const desplazamientoGalgasLesson: InteractiveLesson = {
  slug: "desplazamiento-galgas",
  title: "4. Desplazamiento y galgas extensiométricas",
  subtitle: TEMA_TI2_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        { kind: "text", text: "Medir **desplazamientos** cortos puede hacerse con **potenciómetros**, **reglas ópticas** o **galgas extensiométricas**." },
        { kind: "definition", text: "**Potenciómetro lineal**: simple y barato, pero hay **desgaste** por rozamiento." },
        { kind: "definition", text: "**Galga extensiométrica**: $\\Delta R = R\\,k\\,\\varepsilon$ con deformación $\\varepsilon = \\sigma/E$." },
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
          "**Potenciómetro lineal**: simple y barato, pero hay **desgaste** por rozamiento.", "**Galga extensiométrica**: $\\Delta R = R\\,k\\,\\varepsilon$ con deformación $\\varepsilon = \\sigma/E$.",
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
      question: "Una galga de $1200\\,\\Omega$ y factor $k=2{,}1$ sufre $\\varepsilon=0{,}001$. ¿Cuánto cambia la resistencia?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Aumenta unos 2,5 Ω" },
        { id: "25", label: "Aumenta 25 Ω", incorrectFeedback: "Revisa $\\Delta R = R\\,k\\,\\varepsilon$." },
        { id: "0", label: "No cambia", incorrectFeedback: "La deformación modifica la resistencia." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$\\Delta R = 1200 \\cdot 2{,}1 \\cdot 0{,}001 \\approx 2{,}52\\,\\Omega$.",
    },
    {
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        { kind: "rule", title: "Llévate esto", text: "$\\Delta R = 1200 \\cdot 2{,}1 \\cdot 0{,}001 \\approx 2{,}52\\,\\Omega$." },
      ],
      arrange: "stack",
    },
  ],
};
