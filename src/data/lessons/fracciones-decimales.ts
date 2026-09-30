import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesDecimalesLesson: InteractiveLesson = {
  slug: "fracciones-decimales",
  title: "3. Fracciones y números decimales",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "division",
      type: "concept",
      title: "Fracción = división",
      content: [
        "Toda fracción equivale al **cociente** del numerador entre el denominador.",
        "$\\frac{2}{5} = 2 : 5 = 0{,}4$ (cuatro décimas).",
        "Para pasar una fracción a decimal, **divide** numerador entre denominador.",
      ],
      visuals: [
        {
          kind: "equation-anatomy",
          title: "Equivalencia",
          parts: [
            { tex: "\\frac{2}{5}", label: "Fracción", tone: "cobalt" },
            { tex: "=", label: "" },
            { tex: "2 : 5", label: "División", tone: "emerald" },
            { tex: "= 0{,}4", label: "Decimal", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "periodicos",
      type: "concept",
      title: "Decimales periódicos",
      content: [
        "Algunas divisiones **no terminan**: $\\frac{1}{3} = 0{,}333\\ldots = 0{,}\\overline{3}$.",
        "En esos casos la **fracción es más exacta** que el decimal truncado.",
        "$\\frac{5}{12} = 0{,}416666\\ldots$; si pides dos decimales, aproximas.",
      ],
      warning:
        "No confundas fracción exacta con decimal aproximado cuando el cociente es infinito.",
    },
    {
      id: "anim-25",
      type: "animated_solution",
      title: "Ejemplo — $\\frac{2}{5}$ en la recta",
      content: ["Representa $\\frac{2}{5}$ como decimal y compáralo con $\\frac{4}{10}$."],
      frames: [
        { caption: "División:", math: "2 : 5 = 0{,}4" },
        { caption: "Fracción equivalente:", math: "\\frac{2}{5} = \\frac{4}{10} = 0{,}4" },
      ],
    },
    {
      id: "check-decimal",
      type: "fill_in_blank",
      title: "Pasa a decimal",
      question: "Expresa $\\frac{3}{8}$ como número decimal (usa coma).",
      correctAnswers: ["0,375", "0.375"],
      explanation: "$3 : 8 = 0{,}375$.",
    },
    {
      id: "check-13",
      type: "multiple_choice",
      title: "Periódico simple",
      question: "¿Cuál es el valor decimal de $\\frac{1}{3}$?",
      options: [
        { id: "a", text: "$0{,}3$ (exacto)" },
        { id: "b", text: "$0{,}33$ (exacto)" },
        { id: "c", text: "$0{,}333\\ldots$ (infinito)" },
      ],
      correctOptionId: "c",
      explanation: "$1 : 3$ no termina; el $3$ se repite indefinidamente.",
    },
  ],
};
