import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesProblemasLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-problemas",
  title: "4. Problemas con fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "dos-tipos",
      type: "concept",
      title: "Dos situaciones distintas",
      content: [
        "**Suma de fracciones del total**: gasto $\\dfrac{1}{2}$ y $\\dfrac{1}{3}$ de **todo** el dinero → sumo $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
        "**Fracción de lo que queda**: gasto $\\dfrac{1}{2}$ y después $\\dfrac{1}{3}$ **de lo que quedaba** → la segunda parte es $\\dfrac{1}{3} \\cdot \\dfrac{1}{2}$.",
        "Lee bien si la segunda fracción actúa sobre el **total inicial** o sobre el **resto**.",
      ],
    },
    {
      id: "manuel",
      type: "animated_solution",
      title: "Problema 1 — Manuel (suma sobre el total)",
      content: [
        "Manuel gasta la mitad en el cine y un tercio en una hamburguesa. ¿Qué fracción ha gastado? ¿Qué le queda?",
      ],
      frames: [
        { caption: "Gastado:", math: "\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}" },
        { caption: "Queda:", math: "1 - \\frac{5}{6} = \\frac{1}{6}" },
      ],
    },
    {
      id: "marta",
      type: "animated_solution",
      title: "Problema 2 — Marta (fracción del resto)",
      content: [
        "Marta gasta $\\dfrac{1}{2}$ en un concierto y $\\dfrac{1}{3}$ de lo que le quedaba en una revista.",
      ],
      frames: [
        { caption: "Tras el concierto queda:", math: "\\frac{1}{2}" },
        { caption: "Revista: $\\frac{1}{3}$ de $\\frac{1}{2}$", math: "\\frac{1}{3} \\cdot \\frac{1}{2} = \\frac{1}{6}" },
        { caption: "Queda:", math: "\\frac{2}{3} \\cdot \\frac{1}{2} = \\frac{2}{6} = \\frac{1}{3}" },
        { caption: "Total gastado:", math: "\\frac{1}{2} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}" },
      ],
    },
    {
      id: "queso",
      type: "animated_solution",
      title: "Problema resuelto — queso de Rosa",
      content: ["Rosa compra $\\dfrac{3}{4}$ kg de queso y regala $\\dfrac{1}{2}$ kg a su hija."],
      frames: [
        { caption: "Resta con común denominador $4$:", math: "\\frac{3}{4} - \\frac{1}{2} = \\frac{3}{4} - \\frac{2}{4}" },
        { caption: "Se queda:", math: "\\frac{1}{4}\\ \\text{kg}" },
      ],
    },
    {
      id: "check-tipo",
      type: "multiple_choice",
      title: "¿Suma o producto?",
      question:
        "Iván gasta $\\dfrac{2}{3}$ del dinero en una camisa y $\\dfrac{1}{5}$ **de lo que le quedaba** en una corbata. ¿Cómo calculas el gasto en la corbata?",
      options: [
        { id: "a", text: "$\\dfrac{1}{5} + \\dfrac{2}{3}$" },
        { id: "b", text: "$\\dfrac{1}{5} \\cdot \\left(1 - \\dfrac{2}{3}\\right)$" },
        { id: "c", text: "$\\dfrac{1}{5} \\cdot \\dfrac{2}{3}$" },
      ],
      correctOptionId: "b",
      explanation:
        "Tras la camisa queda $\\dfrac{1}{3}$; la corbata es $\\dfrac{1}{5}$ de ese resto: $\\dfrac{1}{5} \\cdot \\dfrac{1}{3}$.",
    },
  ],
};
