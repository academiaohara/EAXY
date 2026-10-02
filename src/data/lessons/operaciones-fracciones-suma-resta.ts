import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesSumaRestaLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-suma-resta",
  title: "2. Suma y resta de fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "igual-denominador",
      type: "concept",
      title: "Mismo denominador",
      content: [
        "Suma o resta los **numeradores** y deja el **mismo denominador**.",
        "Ejemplo: $\\dfrac{5}{9} + \\dfrac{8}{9} - \\dfrac{7}{9} = \\dfrac{5 + 8 - 7}{9} = \\dfrac{6}{9} = \\dfrac{2}{3}$.",
        "Simplifica el resultado siempre que puedas (fracción irreducible).",
      ],
    },
    {
      id: "distinto-denominador",
      type: "concept",
      title: "Distinto denominador",
      content: [
        "Primero **reduce a común denominador** (MCM de los denominadores).",
        "Después opera con los numeradores como en el caso anterior.",
      ],
    },
    {
      id: "ejemplo-mixto",
      type: "animated_solution",
      title: "Ejercicio resuelto — tres fracciones",
      content: ["Calcula $\\dfrac{1}{4} + \\dfrac{3}{5} - \\dfrac{1}{10}$."],
      frames: [
        { caption: "m.c.m.$(4, 5, 10) = 20$", math: "" },
        {
          caption: "Fracciones equivalentes:",
          math: "\\frac{5}{20} + \\frac{12}{20} - \\frac{2}{20}",
        },
        { caption: "Operamos numeradores:", math: "\\frac{5 + 12 - 2}{20} = \\frac{15}{20}" },
        { caption: "Simplificamos:", math: "\\frac{15}{20} = \\frac{3}{4}" },
      ],
    },
    {
      id: "enteros",
      type: "concept",
      title: "Números enteros en la suma",
      content: [
        "Un entero se escribe como fracción con denominador $1$: $2 = \\dfrac{2}{1}$.",
        "Luego reduces a común denominador con el resto.",
        "Ejemplo: $2 - \\dfrac{7}{3} + \\dfrac{5}{6}$ → m.c.m.$(1, 3, 6) = 6$ → $\\dfrac{12}{6} - \\dfrac{14}{6} + \\dfrac{5}{6} = \\dfrac{1}{2}$.",
      ],
    },
    {
      id: "mental",
      type: "fraction_pick",
      title: "Cálculo mental",
      question:
        "La barra entera es $1$. Le quitamos $\\frac{1}{4}$: colorea lo que queda, $1 - \\frac{1}{4}$.",
      shape: "bar",
      numerator: 3,
      denominator: 4,
      hint: "La barra está partida en cuartos, así que la unidad son $\\frac{4}{4}$. ¿Cuántos cuartos quedan si quitas uno?",
      explanation: "$1 = \\dfrac{4}{4}$; $\\dfrac{4}{4} - \\dfrac{1}{4} = \\dfrac{3}{4}$: quedan $3$ de los $4$ cuartos.",
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      title: "Suma con distinto denominador",
      question: "Calcula $\\dfrac{1}{2} + \\dfrac{1}{5}$ (numerador del resultado, ya simplificado).",
      correctAnswers: ["7"],
      hint: "Denominador común $10$: $\\frac{5}{10} + \\frac{2}{10}$.",
      explanation: "$\\dfrac{5}{10} + \\dfrac{2}{10} = \\dfrac{7}{10}$.",
    },
  ],
};
