import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesMultiplicacionDivisionLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-multiplicacion-division",
  title: "3. Multiplicación y división de fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "multiplicacion",
      type: "concept",
      title: "Multiplicar fracciones",
      content: [
        "Multiplica **numerador por numerador** y **denominador por denominador**:",
        "$\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d}$.",
        "Puedes **simplificar antes** de multiplicar si hay factores comunes.",
        "La **fracción de otra fracción** es una multiplicación: $\\dfrac{3}{4}$ de $\\dfrac{2}{5} = \\dfrac{3}{4} \\cdot \\dfrac{2}{5}$.",
      ],
    },
    {
      id: "ejemplo-fraccion-fraccion",
      type: "animated_solution",
      title: "Fracción de otra fracción",
      content: ["Calcula $\\dfrac{3}{4}$ de $\\dfrac{2}{5}$."],
      frames: [
        { caption: "Multiplicamos:", math: "\\frac{3}{4} \\cdot \\frac{2}{5} = \\frac{6}{20}" },
        { caption: "Simplificamos:", math: "\\frac{6}{20} = \\frac{3}{10}" },
      ],
    },
    {
      id: "division",
      type: "concept",
      title: "Dividir fracciones",
      content: [
        "Para $\\dfrac{a}{b} : \\dfrac{c}{d}$, multiplica en **cruz** (términos cruzados):",
        "$\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a \\cdot d}{b \\cdot c}$.",
        "Equivale a multiplicar la primera por la **inversa** de la segunda.",
      ],
    },
    {
      id: "ejemplo-division",
      type: "animated_solution",
      title: "Ejemplo de división",
      content: ["Calcula $\\dfrac{2}{5} : \\dfrac{3}{10}$."],
      frames: [
        { caption: "Cruz:", math: "\\frac{2 \\cdot 10}{5 \\cdot 3} = \\frac{20}{15}" },
        { caption: "Simplificamos:", math: "\\frac{20}{15} = \\frac{4}{3}" },
      ],
    },
    {
      id: "combinadas-intro",
      type: "concept",
      title: "Operaciones combinadas",
      content: [
        "Respeta **paréntesis** y la prioridad: primero paréntesis, luego multiplicaciones y divisiones, después sumas y restas.",
        "Ejemplo resuelto: $\\dfrac{5}{11} \\cdot \\left(\\dfrac{3}{2} - \\dfrac{2}{5}\\right) = \\dfrac{5}{11} \\cdot \\dfrac{11}{10} = \\dfrac{1}{2}$.",
      ],
    },
    {
      id: "check-mult",
      type: "multiple_choice",
      title: "Multiplicación rápida",
      question: "¿Cuánto es $\\dfrac{2}{3} \\cdot \\dfrac{9}{8}$ simplificado?",
      options: [
        { id: "a", text: "$\\dfrac{3}{4}$" },
        { id: "b", text: "$\\dfrac{18}{24}$ sin simplificar" },
        { id: "c", text: "$\\dfrac{2}{3}$" },
      ],
      correctOptionId: "a",
      explanation: "$\\dfrac{18}{24} = \\dfrac{3}{4}$ (divide numerador y denominador por $6$).",
    },
  ],
};
