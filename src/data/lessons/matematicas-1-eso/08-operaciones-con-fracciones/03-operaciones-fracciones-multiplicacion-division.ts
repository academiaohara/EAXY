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
      help: [
        {
          label: "¿Qué significa multiplicar fracciones?",
          message: "Tomar una fracción de otra: $\\frac{3}{4}$ de $\\frac{2}{5}$ es repartir ese $\\frac{2}{5}$ en cuatro y quedarte con tres.",
        },
        {
          label: "¿Por qué no hace falta común denominador?",
          message: "Porque no estás juntando trozos del mismo tamaño: estás partiendo un trozo en otros más pequeños.",
        },
        {
          label: "Simplificar antes",
          message: "Si un numerador y un denominador (de fracciones distintas) tienen un factor común, puedes simplificarlos antes de multiplicar.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué sale algo más pequeño?",
          message: "Porque tomas una parte de una parte. Ni $\\frac{3}{4}$ ni $\\frac{2}{5}$ llegan a $1$, así que el producto es menor que ambos.",
        },
        {
          label: "Dibujo mental",
          message: "Parte una barra en $5$ y coge $2$. Parte esos $2$ trozos en $4$ y quédate con $3$ de esos pedacitos.",
        },
      ],
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
      help: [
        {
          label: "¿Qué significa dividir fracciones?",
          message: "Preguntar cuántas veces cabe la segunda en la primera. Por eso suele salir un número mayor que $1$ si divides entre algo pequeño.",
        },
        {
          label: "Multiplicar en cruz",
          message: "El numerador de la primera se multiplica por el denominador de la segunda y al revés. Es lo mismo que voltear la segunda y multiplicar.",
        },
        {
          label: "Cuidado",
          message: "Solo se voltea la fracción por la que divides, la segunda.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué sale mayor que $1$?",
          message: "Porque $\\frac{3}{10}$ es más pequeño que $\\frac{2}{5}$ y cabe más de una vez.",
        },
        {
          label: "Compruébalo",
          message: "El cociente multiplicado por la segunda fracción debe devolver la primera.",
          math: ["\\frac{4}{3} \\cdot \\frac{3}{10} = \\frac{12}{30} = \\frac{2}{5}"],
        },
      ],
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
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Por el paréntesis. Resuelve la resta de dentro con común denominador y luego multiplica.",
        },
        {
          label: "Simplifica por el camino",
          message: "Antes de multiplicar, mira si un numerador y un denominador cruzados se pueden simplificar. Aquí se simplifica el $11$.",
        },
      ],
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
