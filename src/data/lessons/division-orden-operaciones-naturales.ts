import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const divisionOrdenOperacionesNaturalesLesson: InteractiveLesson = {
  slug: "division-orden-operaciones-naturales",
  title: "5. División y orden de operaciones",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "division",
      type: "concept",
      title: "¿Qué es dividir?",
      content: [
        "**Dividir** puede significar repartir en partes iguales ($150$ bombones en $6$ cajas → $25$ por caja) o ver cuántas veces cabe un número ($150 : 25 = 6$ cajas).",
        "**División exacta**: el resto es $0$ y $D = d \\cdot c$.",
        "**División entera**: el resto $r$ es distinto de $0$ y $D = d \\cdot c + r$, con $r < d$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Exacta frente a entera",
          items: [
            { title: "Exacta", math: "40 : 8 = 5 \\text{ resto } 0", caption: "$40 = 8 \\cdot 5$", tone: "emerald" },
            { title: "Entera", math: "43 : 8 = 5 \\text{ resto } 3", caption: "$43 = 8 \\cdot 5 + 3$", tone: "amber" },
          ],
        },
      ],
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
    {
      id: "check-resto",
      type: "fill_in_blank",
      title: "División entera",
      question: "Al dividir $43$ entre $8$, ¿cuál es el resto? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$43 = 8 \\cdot 5 + 3$, así que el resto es $3$.",
    },
  ],
};
