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
      type: "fill_in_blank",
      help: [
        {
          label: "Simplifica antes de multiplicar",
          message: "Busca un factor común entre un numerador y un denominador (en cruz). Simplificar antes ahorra cuentas con números grandes.",
          math: [
            "\\frac{2}{3} \\cdot \\frac{9}{8}:\\ \\ 9\\ \\text{y}\\ 3\\ \\text{comparten un factor}",
          ],
        },
        {
          label: "¿Cómo sé que está simplificado?",
          message: "Comprueba que numerador y denominador no tengan ningún divisor común distinto de $1$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Multiplicar por $\\frac{2}{3}$, que es menor que $1$, reduce: el resultado tiene que ser menor que $\\frac{9}{8}$.",
        },
      ],
      title: "Multiplicación rápida",
      question:
        "Calcula $\\dfrac{2}{3} \\cdot \\dfrac{9}{8}$ y escribe el resultado **simplificado** (por ejemplo, 5/7).",
      correctAnswers: ["3/4", "0,75", "0.75"],
      hint: "Numerador por numerador y denominador por denominador; después divide ambos por su m.c.d.",
      explanation:
        "$\\dfrac{2 \\cdot 9}{3 \\cdot 8} = \\dfrac{18}{24} = \\dfrac{3}{4}$ (divide numerador y denominador por $6$).",
    },
  ],
};
