import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const enterosZRectaValorAbsolutoLesson: InteractiveLesson = {
  slug: "enteros-z-recta-valor-absoluto",
  title: "2. Recta numérica y valor absoluto",
  subtitle: TEMA_4_SUBTITLE,
  steps: [
    {
      id: "conjunto-z",
      type: "concept",
      title: "El conjunto $\\mathbb{Z}$",
      content: [
        "Si a los naturales $\\mathbb{N}$ les añadimos los negativos correspondientes y el $0$, obtenemos los **números enteros** $\\mathbb{Z}$.",
        "En la **recta numérica**, a la izquierda están los menores: si $a < b$, entonces $a$ queda a la izquierda de $b$.",
        "Ejemplo de orden: $-4 < -1 < +3$.",
      ],
      visuals: [
        {
          kind: "number-line",
          title: "Orden en la recta",
          min: -5,
          max: 5,
          points: [
            { value: -4, label: "$-4$", tone: "rose" },
            { value: -1, label: "$-1$", tone: "rose" },
            { value: 0, label: "$0$", tone: "cobalt" },
            { value: 3, label: "$+3$", tone: "emerald" },
          ],
          caption: "Lee de izquierda a derecha: cada número es mayor que el anterior.",
        },
      ],
    },
    {
      id: "absoluto",
      type: "concept",
      title: "Valor absoluto",
      content: [
        "El **valor absoluto** $|a|$ es la distancia de $a$ al $0$ en la recta: siempre es un natural (o $0$).",
        "$|-7| = 7$ y $|+4| = 4$: quitamos el signo.",
        "Se escribe con barras: $|a|$ = valor absoluto de $a$.",
      ],
      visuals: [
        {
          kind: "number-line",
          title: "Distancia al cero",
          min: -8,
          max: 6,
          absValue: -7,
          points: [
            { value: -7, label: "$-7$", tone: "rose" },
            { value: 4, label: "$+4$", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "comparar",
      type: "concept",
      title: "Comparar enteros",
      content: [
        "Entre dos **positivos**, gana el de mayor valor absoluto: $+20 > +8$.",
        "Cualquier positivo es mayor que $0$ y cualquier negativo es menor que $0$.",
        "Entre dos **negativos**, gana el de menor valor absoluto: $-8 > -20$ (está más a la derecha).",
      ],
      visuals: [
        {
          kind: "number-line",
          title: "$-8$ vs $-20$",
          min: -22,
          max: 2,
          points: [
            { value: -20, label: "$-20$", tone: "rose" },
            { value: -8, label: "$-8$", tone: "amber" },
          ],
          caption: "$-8 > -20$ porque $-8$ está más cerca del cero por la derecha.",
        },
      ],
    },
    {
      id: "check",
      type: "fill_in_blank",
      title: "Valor absoluto",
      question: "¿Cuánto vale $|-11|$? (solo el número)",
      correctAnswers: ["11"],
      explanation: "$|-11| = 11$.",
    },
    {
      id: "check-orden",
      type: "multiple_choice",
      title: "Orden",
      question: "¿Cuál es la comparación correcta?",
      options: [
        { id: "a", text: "$-2 > +5$" },
        { id: "b", text: "$-2 < +5$" },
        { id: "c", text: "$-2 = +5$" },
      ],
      correctOptionId: "b",
      explanation: "Los negativos son menores que los positivos.",
    },
  ],
};
