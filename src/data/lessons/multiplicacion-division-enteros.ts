import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionEnterosLesson: InteractiveLesson = {
  slug: "multiplicacion-division-enteros",
  title: "5. Multiplicación y división",
  subtitle: TEMA_4_SUBTITLE,
  steps: [
    {
      id: "producto",
      type: "concept",
      title: "Multiplicar enteros",
      content: [
        "Multiplicamos como con naturales; lo nuevo es el signo del resultado (regla de los signos).",
        "Tres ingresos de $+5$ €: $(+3) \\cdot (+5) = +15$.",
        "Tres facturas de $5$ €: $(+3) \\cdot (-5) = -15$.",
        "Anular 3 facturas de $5$ € (quitar deudas): $(-3) \\cdot (-5) = +15$.",
      ],
      visuals: [
        {
          kind: "sign-rules",
          title: "Regla de los signos (producto)",
          operation: "multiply",
        },
      ],
    },
    {
      id: "division",
      type: "concept",
      title: "Dividir enteros",
      content: [
        "El cociente se calcula con naturales; el signo sigue la misma regla que en la multiplicación.",
        "Ejemplos: $(-12) : (+4) = -3$, $(+30) : (-5) = -6$, $(-15) : (-3) = +5$.",
        "Cuidado: la división de enteros no es asociativa (el orden de los corchetes importa).",
      ],
      visuals: [
        {
          kind: "sign-rules",
          title: "Regla de los signos (cociente)",
          operation: "divide",
          caption: "Signos iguales → $+$; signos distintos → $-$.",
        },
      ],
    },
    {
      id: "combinada",
      type: "animated_solution",
      title: "Operaciones combinadas",
      content: ["Prioridad: paréntesis → $\\times$ y $:$ → $+$ y $-$."],
      frames: [
        {
          caption: "Expresión:",
          math: "15 - 3 \\cdot [6 - (-12) : (+4)]",
        },
        {
          caption: "Dentro del corchete, primero la división:",
          math: "(-12) : (+4) = -3",
        },
        {
          caption: "Seguimos:",
          math: "6 - (-3) = 6 + 3 = 9",
        },
        {
          caption: "Multiplicación y resta:",
          math: "15 - 3 \\cdot 9 = 15 - 27 = -12",
        },
      ],
    },
    {
      id: "check-signo",
      type: "classify",
      title: "Signo del producto",
      question: "Sin calcular del todo, coloca cada operación según el signo de su resultado.",
      groups: [
        { id: "pos", label: "Resultado positivo", tone: "emerald" },
        { id: "neg", label: "Resultado negativo", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$(-4) \\cdot (-5)$", group: "pos" },
        { id: "b", text: "$(+3) \\cdot (-6)$", group: "neg" },
        { id: "c", text: "$(-8) : (+2)$", group: "neg" },
        { id: "d", text: "$(-12) : (-3)$", group: "pos" },
        { id: "e", text: "$(+7) \\cdot (+2)$", group: "pos" },
        { id: "f", text: "$(-2) \\cdot (-3) \\cdot (-1)$", group: "neg" },
      ],
      hint: "Fíjate solo en los signos: ¿son iguales o distintos? Con tres factores, ve de dos en dos.",
      explanation:
        "Signos iguales → positivo: $(-4) \\cdot (-5) = 20$, $(-12) : (-3) = 4$, $(+7) \\cdot (+2) = 14$. Signos distintos → negativo: $-18$ y $-4$. En $(-2) \\cdot (-3) \\cdot (-1)$: $(+6) \\cdot (-1) = -6$.",
    },
    {
      id: "check-div",
      type: "fill_in_blank",
      title: "División",
      question: "¿Cuánto vale $(-20) : (-5)$? (solo el número)",
      correctAnswers: ["4", "+4"],
      explanation: "Signos iguales → cociente positivo: $4$.",
    },
  ],
};
