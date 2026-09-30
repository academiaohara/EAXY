import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesProblemasLesson: InteractiveLesson = {
  slug: "fracciones-problemas",
  title: "5. Problemas con fracciones",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "tipos",
      type: "concept",
      title: "Dos tipos habituales",
      content: [
        "**Calcular la fracción:** conoces parte y total → $\\text{fracción} = \\frac{\\text{parte}}{\\text{total}}$ y simplificas.",
        "**Fracción de un número (directo):** conoces total y fracción → $(\\text{total} : d) \\cdot n$.",
        "**Problema inverso:** conoces la parte y la fracción → total $= \\text{parte} : n \\cdot d$.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Del enunciado al cálculo",
          rows: [
            {
              text: "540 € de 1800 € en hipoteca",
              math: "\\frac{540}{1800} = \\frac{3}{10}",
            },
            {
              text: "Tres décimas de 1800 €",
              math: "\\frac{3}{10} \\text{ de } 1800 = 540\\,€",
            },
          ],
        },
      ],
    },
    {
      id: "hipoteca-fraccion",
      type: "animated_solution",
      title: "Calcular la fracción — hipoteca",
      content: [
        "Un empleado gana $1800\\,€$ al mes y dedica $540\\,€$ a la hipoteca. ¿Qué fracción de su sueldo es?",
      ],
      frames: [
        { caption: "Fracción:", math: "\\frac{540}{1800}" },
        { caption: "Simplificando entre 180:", math: "\\frac{540}{1800} = \\frac{3}{10}" },
      ],
    },
    {
      id: "hipoteca-numero",
      type: "animated_solution",
      title: "Fracción de un número — hipoteca",
      content: [
        "El mismo empleado dedica **tres décimas partes** ($\\frac{3}{10}$) del sueldo a la hipoteca. ¿Cuánto paga?",
      ],
      frames: [
        {
          caption: "Cálculo:",
          math: "\\frac{3}{10} \\text{ de } 1800 = (1800 : 10) \\cdot 3 = 180 \\cdot 3 = 540\\,€",
        },
      ],
    },
    {
      id: "bidon-frascos",
      type: "animated_solution",
      title: "Problema — bidón y frascos",
      content: [
        "Con un bidón de $20$ litros se llenan $200$ frascos iguales de agua de colonia. ¿Qué fracción de litro entra en cada frasco?",
      ],
      frames: [
        {
          caption: "Litros por frasco:",
          math: "20 : 200 = 0{,}1\\,\\mathrm{l} = \\frac{1}{10}\\,\\mathrm{l}",
        },
        {
          caption: "Como fracción de litro:",
          math: "\\frac{1\\,\\mathrm{l}}{10} = \\frac{1}{10}",
        },
      ],
    },
    {
      id: "rosario",
      type: "animated_solution",
      title: "Problema inverso — la hucha",
      content: [
        "Rosario saca $\\frac{3}{5}$ del dinero de su hucha y aún le quedan $14\\,€$. ¿Cuánto tenía?",
      ],
      frames: [
        {
          caption: "Lo que queda es $\\frac{2}{5}$ del total:",
          math: "\\frac{2}{5} \\text{ del total} = 14",
        },
        {
          caption: "Total:",
          math: "14 : 2 \\cdot 5 = 35\\,€",
        },
      ],
    },
    {
      id: "bidon-capacidad",
      type: "fill_in_blank",
      title: "Problema inverso — bidón de agua",
      question:
        "En un bidón hay $8$ litros, que son $\\frac{2}{5}$ de su capacidad total. ¿Cuántos litros caben en total? (solo el número)",
      correctAnswers: ["20"],
      explanation: "$\\frac{2}{5}$ del total $= 8$ → total $= 8 : 2 \\cdot 5 = 20$ litros.",
    },
    {
      id: "check-directo",
      type: "fill_in_blank",
      title: "Campamento",
      question:
        "En un campamento hay $280$ campistas; $\\frac{3}{7}$ son españoles. ¿Cuántos españoles? (solo el número)",
      correctAnswers: ["120"],
      explanation: "$(280 : 7) \\cdot 3 = 40 \\cdot 3 = 120$.",
    },
    {
      id: "check-fraccion",
      type: "multiple_choice",
      title: "Minutos en una hora",
      question: "¿Qué fracción de hora son $12$ minutos?",
      options: [
        { id: "a", text: "$\\frac{12}{60} = \\frac{1}{5}$" },
        { id: "b", text: "$\\frac{12}{60} = \\frac{1}{4}$" },
        { id: "c", text: "$\\frac{12}{100}$" },
      ],
      correctOptionId: "a",
      explanation: "$12$ min de $60$ min: $\\frac{12}{60} = \\frac{1}{5}$ h.",
    },
  ],
};
