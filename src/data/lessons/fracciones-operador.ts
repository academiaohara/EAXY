import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesOperadorLesson: InteractiveLesson = {
  slug: "fracciones-operador",
  title: "2. La fracción como operador",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "regla",
      type: "concept",
      title: "Calcular una fracción de un número",
      content: [
        "Una fracción **opera** sobre una cantidad: la divide y toma partes.",
        "**Regla:** para calcular $\\frac{n}{d}$ de $N$, divide $N$ entre $d$ y multiplica por $n$:",
        "$$\\frac{n}{d} \\text{ de } N = (N : d) \\cdot n$$",
        "Ejemplo con un bidón de $20$ litros: $\\frac{1}{5}$ de $20 = 20 : 5 = 4$ litros; $\\frac{2}{5}$ de $20 = 4 \\cdot 2 = 8$ litros.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "$\\frac{2}{5}$ de $20$",
          rows: ["20 : 5", "4 · 2"],
          operator: "=",
          result: "8",
          caption: "Ocho litros.",
        },
      ],
    },
    {
      id: "mental",
      type: "concept",
      title: "Cálculo mental",
      content: [
        "Si conoces $\\frac{1}{4}$ de $8$ ($2$), entonces $\\frac{3}{4}$ de $8$ es $3 \\cdot 2 = 6$.",
        "Lo mismo con $\\frac{1}{3}$ de $12 = 4$ → $\\frac{2}{3}$ de $12 = 8$.",
      ],
    },
    {
      id: "bombones",
      type: "animated_solution",
      title: "Problema — caja de bombones",
      content: [
        "De una caja de $24$ bombones se ha consumido $\\frac{1}{6}$. ¿Cuántos se han comido? ¿Cuántos quedan?",
      ],
      frames: [
        {
          caption: "Consumidos:",
          math: "\\frac{1}{6} \\text{ de } 24 = 24 : 6 = 4 \\text{ bombones}",
        },
        {
          caption: "Quedan:",
          math: "24 - 4 = 20 \\text{ bombones}",
        },
      ],
    },
    {
      id: "clase",
      type: "animated_solution",
      title: "Problema — chicos y chicas",
      content: [
        "En una clase hay $27$ alumnos. Las chicas son $\\frac{4}{9}$ del total. ¿Cuántas chicas y cuántos chicos hay?",
      ],
      frames: [
        {
          caption: "Chicas:",
          math: "\\frac{4}{9} \\text{ de } 27 = (27 : 9) \\cdot 4 = 12",
        },
        {
          caption: "Chicos:",
          math: "27 - 12 = 15",
        },
      ],
    },
    {
      id: "check-calculo",
      type: "fill_in_blank",
      title: "Practica la regla",
      question: "Calcula $\\frac{3}{4}$ de $12$ (solo el resultado).",
      correctAnswers: ["9"],
      explanation: "$(12 : 4) \\cdot 3 = 3 \\cdot 3 = 9$.",
    },
    {
      id: "check-precio",
      type: "multiple_choice",
      title: "Fracción de un precio",
      question:
        "Boquerones a $5{,}4\\,€/\\mathrm{kg}$. ¿Cuánto cuestan $\\frac{3}{4}\\,\\mathrm{kg}$?",
      options: [
        { id: "a", text: "$3{,}6\\,€$" },
        { id: "b", text: "$4{,}05\\,€$" },
        { id: "c", text: "$4{,}5\\,€$" },
      ],
      correctOptionId: "b",
      explanation:
        "$\\frac{3}{4}$ de $5{,}4 = (5{,}4 : 4) \\cdot 3 = 1{,}35 \\cdot 3 = 4{,}05\\,€$.",
    },
  ],
};
