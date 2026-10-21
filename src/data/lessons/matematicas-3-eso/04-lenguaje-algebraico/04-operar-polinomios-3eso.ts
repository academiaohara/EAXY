import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const operarPolinomios3esoLesson: InteractiveLesson = {
  slug: "operar-polinomios-3eso",
  title: "4. Operar con polinomios",
  subtitle: TEMA_3ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma-resta",
      type: "slide",
      help: [
        {
          label: "Una columna por grado",
          message: "Coloca los términos del mismo grado en la misma columna, dejando un hueco donde falte alguno.",
        },
        {
          label: "Restar es sumar el opuesto",
          message: "El opuesto de un polinomio cambia de signo todos sus términos: al restar, los signos del sustraendo se invierten.",
        },
      ],
      title: "Sumar y restar polinomios",
      blocks: [
        {
          kind: "rule",
          text: "Para **sumar**, se agrupan los términos y se suman los semejantes. Para **restar**, se suma al minuendo el **opuesto** del sustraendo.",
        },
        {
          kind: "example",
          title: "A = 6x² − 4x + 1 y B = x³ + 2x² − 11",
          lines: [
            { math: "A + B = x^3 + 8x^2 - 4x - 10" },
            { math: "A - B = 6x^2 - 4x + 1 - x^3 - 2x^2 + 11 = -x^3 + 4x^2 - 4x + 12" },
          ],
        },
        {
          kind: "warning",
          text: "Al restar, el signo menos afecta a **todos** los términos del segundo polinomio, no solo al primero.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "monomio-polinomio",
      type: "slide",
      help: [
        {
          label: "Propiedad distributiva",
          message: "El monomio multiplica a cada término del polinomio, uno por uno.",
        },
        {
          label: "Con áreas",
          message: "Un rectángulo de lado $a$ partido en dos trozos tiene área $a \\cdot b + a \\cdot c = a(b + c)$.",
        },
      ],
      title: "Monomio por polinomio",
      blocks: [
        {
          kind: "rule",
          text: "Se multiplica el monomio por **cada término** del polinomio y se suman los resultados.",
          formula: "(3x^2)(x^3 - 2x^2 - 1) = 3x^5 - 6x^4 - 3x^2",
        },
        {
          kind: "example",
          lines: [
            { math: "2x(x^2 + 3x - 1) = 2x^3 + 6x^2 - 2x" },
            { math: "-7x^5(2x^2 - 3x - 1) = -14x^7 + 21x^6 + 7x^5" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "area-distributiva", params: { a: 3, b: 4, c: 2 } },
    },
    {
      id: "polinomio-polinomio",
      type: "slide",
      help: [
        {
          label: "Todos con todos",
          message: "Cada término del primer polinomio multiplica a cada término del segundo: si tienen $2$ y $2$ términos hay $4$ productos.",
        },
        {
          label: "Ordena el resultado",
          message: "Escribe cada producto parcial alineando los términos semejantes en columnas y suma al final.",
        },
      ],
      title: "Polinomio por polinomio",
      blocks: [
        {
          kind: "steps",
          items: [
            "Multiplica **cada monomio** del primer factor por **todos** los del segundo.",
            "Escribe los productos parciales (puedes alinear los términos semejantes).",
            "**Suma** los términos semejantes.",
          ],
        },
        {
          kind: "example",
          title: "(2x² − 1)(3x + 4)",
          lines: [
            { math: "2x^2 \\cdot 3x + 2x^2 \\cdot 4 - 1 \\cdot 3x - 1 \\cdot 4" },
            { math: "= 6x^3 + 8x^2 - 3x - 4" },
          ],
        },
        {
          kind: "example",
          title: "P = 5x³ − 2x² − 1 por Q = 6x − 3",
          lines: [
            { math: "-3P = -15x^3 + 6x^2 + 3" },
            { math: "6x \\cdot P = 30x^4 - 12x^3 - 6x" },
            { math: "P \\cdot Q = 30x^4 - 27x^3 + 6x^2 - 6x + 3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "polinomio-tabla" },
    },
    {
      id: "check-suma",
      type: "predict",
      help: [
        {
          label: "Por grados",
          message: "Suma por separado los términos en $x^3$, en $x^2$, en $x$ y los independientes.",
        },
      ],
      title: "Suma de polinomios",
      question: "Si $A = 2x^3 - 7x^2 + 1$ y $B = 5x^2 - 4x + 2$, ¿cuánto vale $A + B$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2x^3 - 2x^2 - 4x + 3$" },
        { id: "b", label: "$2x^3 - 12x^2 - 4x + 3$", incorrectFeedback: "$-7x^2 + 5x^2 = -2x^2$, no $-12x^2$." },
        { id: "c", label: "$7x^3 - 2x^2 - 4x + 3$", incorrectFeedback: "Solo $A$ tiene término en $x^3$: se queda como $2x^3$." },
        { id: "d", label: "$2x^3 - 2x^2 - 4x - 1$", incorrectFeedback: "El término independiente es $1 + 2 = 3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2x^3 + (-7 + 5)x^2 - 4x + (1 + 2) = 2x^3 - 2x^2 - 4x + 3$.",
    },
    {
      id: "check-resta",
      type: "fill_in_blank",
      help: [
        {
          label: "Cambia los signos",
          message: "$P - Q = 3x^2 - 5x + 2 - x^2 + 2x - 1$ y después reduces.",
        },
      ],
      title: "Resta de polinomios",
      question: "Si $P = 3x^2 - 5x + 2$ y $Q = x^2 - 2x + 1$, calcula $P - Q$. (escribe el polinomio, por ejemplo 2x^2-3x+1)",
      correctAnswers: ["2x^2-3x+1", "2x²-3x+1"],
      explanation: "$(3 - 1)x^2 + (-5 + 2)x + (2 - 1) = 2x^2 - 3x + 1$.",
    },
    {
      id: "check-monomio",
      type: "fill_in_blank",
      help: [
        {
          label: "Término a término",
          message: "$2x \\cdot x^2 = 2x^3$, $2x \\cdot 3x = 6x^2$ y $2x \\cdot (-1) = -2x$.",
        },
      ],
      title: "Monomio por polinomio",
      question: "Calcula $2x(x^2 + 3x - 1)$. (escribe el polinomio, por ejemplo 2x^3+x)",
      correctAnswers: ["2x^3+6x^2-2x", "2x³+6x²-2x"],
      explanation: "$2x^3 + 6x^2 - 2x$.",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "Cuatro productos",
          message: "$x \\cdot x = x^2$, $x \\cdot 3 = 3x$, $2 \\cdot x = 2x$ y $2 \\cdot 3 = 6$. Después reduce.",
        },
      ],
      title: "Producto de binomios",
      question: "Desarrolla $(x + 2)(x + 3)$. (escribe el polinomio, por ejemplo x^2+x+1)",
      correctAnswers: ["x^2+5x+6", "x²+5x+6"],
      explanation: "$x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.",
    },
  ],
};
