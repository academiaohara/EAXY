import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const divisionOrdenOperacionesNaturalesLesson: InteractiveLesson = {
  slug: "division-orden-operaciones-naturales",
  title: "5. División y orden de operaciones",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "paper" },
  steps: [
    {
      id: "dividir-narrate",
      type: "narrate",
      title: "Dividir",
      definitionBox: "**Dividir** es **repartir** en partes iguales.",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
    },
    {
      id: "dividir-predict",
      type: "predict",
      title: "Bombones por caja",
      question: "$150$ bombones en $6$ cajas iguales. ¿Cuántos van en cada caja?",
      mode: "choice",
      choices: [
        { id: "20", label: "$20$" },
        { id: "25", label: "$25$" },
        { id: "30", label: "$30$" },
      ],
      correctChoiceId: "25",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
      explanation: "$150 : 6 = 25$ bombones por caja.",
    },
    {
      id: "dividir-explore",
      type: "explore",
      title: "Reparte tú",
      question: "Reparte los $150$ bombones hasta que cada caja tenga la misma cantidad.",
      module: "mul-div-naturales",
      scene: "reparto-manual",
      mulDiv: { scene: "reparto-manual", total: 150, boxes: 6, perBox: 25 },
      goal: { kind: "boxes-equal", total: 150, boxes: 6, perBox: 25 },
      hint: "Usa $+$ en una caja mientras queden bombones en el montón.",
      explanation: "Seis cajas con $25$ suman $150$: división exacta.",
    },
    {
      id: "tipos-narrate",
      type: "narrate",
      title: "Exacta y entera",
      definitionBox:
        "Si el **resto es $0$**, la división es **exacta** ($D = d \\cdot c$). Si el resto es $\\neq 0$, es **entera** ($D = d \\cdot c + r$).",
      module: "mul-div-naturales",
      scene: "exacta-entera",
      mulDiv: { scene: "exacta-entera" },
    },
    {
      id: "tipos-predict",
      type: "predict",
      title: "Verificación",
      question: "Para $43 = 8 \\cdot 5 + 3$, ¿qué tipo de división es?",
      mode: "choice",
      choices: [
        { id: "exacta", label: "Exacta ($D = d \\cdot c$)" },
        { id: "entera", label: "Entera ($D = d \\cdot c + r$)" },
      ],
      correctChoiceId: "entera",
      explanation: "El resto $3$ es distinto de cero.",
    },
    {
      id: "orden",
      type: "concept",
      title: "Orden de las operaciones",
      content: [
        "En expresiones combinadas hay un orden fijo para que el resultado sea único:",
        "1. **Paréntesis** (y otros signos de agrupación).",
        "2. **Multiplicaciones y divisiones** (de izquierda a derecha).",
        "3. **Sumas y restas** (de izquierda a derecha).",
        "Sin paréntesis, $6 + 2 \\cdot 4 = 6 + 8 = 14$, pero $(6 + 2) \\cdot 4 = 32$.",
      ],
      warning: "Multiplicar y dividir tienen prioridad sobre sumar y restar, salvo que haya paréntesis.",
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      title: "Operando paso a paso",
      content: ["Resolvemos $2 + 3 \\cdot (7 - 4)$ siguiendo el orden correcto."],
      frames: [
        {
          caption: "1.º Paréntesis:",
          math: "7 - 4 = 3",
        },
        {
          caption: "2.º Multiplicación:",
          math: "3 \\cdot 3 = 9",
        },
        {
          caption: "3.º Suma:",
          math: "2 + 9 = 11",
        },
      ],
    },
    {
      id: "combinada",
      type: "animated_solution",
      title: "Varias operaciones",
      content: ["Otro ejemplo del temario: $4 \\cdot 5 - 3 \\cdot 4 - 2$."],
      frames: [
        {
          caption: "Multiplicaciones primero:",
          math: "4 \\cdot 5 - 3 \\cdot 4 - 2 = 20 - 12 - 2",
        },
        {
          caption: "Restas de izquierda a derecha:",
          math: "20 - 12 = 8",
        },
        {
          caption: "Última resta:",
          math: "8 - 2 = 6",
        },
      ],
    },
    {
      id: "check-orden",
      type: "classify",
      title: "Comprueba lo aprendido",
      question: "Calcula cada expresión respetando el orden de las operaciones y colócala según su valor.",
      groups: [
        { id: "catorce", label: "Vale $14$", tone: "cobalt" },
        { id: "treinta-dos", label: "Vale $32$", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$6 + 2 \\cdot 4$", group: "catorce" },
        { id: "b", text: "$(6 + 2) \\cdot 4$", group: "treinta-dos" },
        { id: "c", text: "$2 \\cdot 4 + 6$", group: "catorce" },
        { id: "d", text: "$4 \\cdot (6 + 2)$", group: "treinta-dos" },
        { id: "e", text: "$20 - 3 \\cdot 2$", group: "catorce" },
        { id: "f", text: "$40 - 2 \\cdot 4$", group: "treinta-dos" },
      ],
      hint: "Primero los paréntesis; después multiplicaciones; por último sumas y restas.",
      explanation:
        "$6 + 2 \\cdot 4 = 6 + 8 = 14$, pero $(6 + 2) \\cdot 4 = 8 \\cdot 4 = 32$. Igualmente $20 - 3 \\cdot 2 = 20 - 6 = 14$ y $40 - 2 \\cdot 4 = 40 - 8 = 32$.",
    },
  ],
};
