import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const operacionesMonomios4esoLesson: InteractiveLesson = {
  slug: "operaciones-monomios-4eso",
  title: "2. Operaciones con monomios",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "Semejantes",
          message: "Sumar $7x^2 + 11x^2$ es como sumar $7$ cajas más $11$ cajas: $18$ cajas. La unidad (la parte literal) no cambia.",
        },
        {
          label: "No semejantes",
          message: "$7x - 2x^2$ no se puede simplificar: $x$ y $x^2$ son «cosas distintas». Se deja indicado.",
        },
      ],
      title: "Suma y resta: solo semejantes",
      blocks: [
        {
          kind: "rule",
          text: "La suma de monomios **semejantes** es otro monomio semejante cuyo coeficiente es la **suma de los coeficientes**. Si no son semejantes, la suma queda **indicada**.",
        },
        {
          kind: "example",
          lines: [
            { math: "7x^2 + 11x^2 = 18x^2" },
            { math: "3xy - 4xy + 7xy = 6xy" },
            { math: "7x - 2x^2 \\quad \\text{no se puede simplificar}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "semejantes-agrupar", params: { a: 7, b: 11, c: 3 } },
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Contar letras",
          message: "$x^2 \\cdot x^3$ son dos $x$ por tres $x$: cinco $x$ en total, $x^5$. Se **suman** los exponentes.",
        },
        {
          label: "Potencia de un monomio",
          message: "$(2x^2)^3 = 2^3 \\cdot (x^2)^3 = 8x^6$: la potencia afecta al coeficiente y a la parte literal.",
        },
      ],
      title: "Producto: coeficientes por coeficientes, letras por letras",
      blocks: [
        {
          kind: "rule",
          text: "El producto de dos monomios es otro monomio: su **coeficiente** es el producto de los coeficientes y su **parte literal**, el producto de las partes literales (se suman los exponentes).",
        },
        {
          kind: "example",
          lines: [
            { math: "(2x) \\cdot (3x^2) = 6x^3" },
            { math: "(2x) \\cdot (3xy) = 6x^2y" },
            { math: "(2x^2)^3 = 8x^6" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "monomio-producto", params: { a: 2, b: 3, c: 2, d: 3 } },
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "Tachar letras",
          message: "Cada $x$ de abajo se va con una $x$ de arriba: se **restan** los exponentes. $x^3 : x = x^2$.",
        },
        {
          label: "No siempre es monomio",
          message: "Si la letra queda en el denominador (exponente negativo), como en $\\frac{2}{x}$, el resultado **no es un monomio**.",
        },
      ],
      title: "Cociente: puede no ser un monomio",
      blocks: [
        {
          kind: "rule",
          text: "El cociente de dos monomios se obtiene dividiendo los coeficientes y **restando los exponentes**. El resultado puede ser un monomio o no.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{6x^3}{3x} = 2x^2 \\quad \\text{(monomio)}" },
            { math: "\\dfrac{2x}{x^2} = \\dfrac{2}{x} \\quad \\text{(no es un monomio)}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "monomio-cociente", params: { a: 6, b: 2, c: 3, d: 1 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Los exponentes",
          message: "En el producto se suman los exponentes; en el cociente, se restan. Si resta negativo, no es monomio.",
        },
      ],
      title: "Explora: las cuatro operaciones",
      blocks: [
        {
          kind: "text",
          text: "Elige una operación y cambia los dos monomios. Comprueba **cuándo se puede sumar** y **cuándo el cociente deja de ser un monomio**.",
        },
      ],
      visual: { kind: "tool", tool: "monomios-operador", initial: [3, 2, 4, 2, 0, 0, 0], hint: "Cambia el exponente de B y mira qué pasa con la suma. Después prueba el cociente con exponente de B mayor." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Coeficientes",
          message: "$5 - 3 + 4 + 7 - 11 + 1$.",
        },
      ],
      title: "Una suma de semejantes",
      question: "$5x - 3x + 4x + 7x - 11x + x = kx$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$5 - 3 + 4 + 7 - 11 + 1 = 3$, luego el resultado es $3x$.",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Números y letras",
          message: "$3 \\cdot 5 = 15$. Letras: $x^2 \\cdot x \\cdot y = x^3y$.",
        },
      ],
      title: "Un producto",
      question: "Calcula $(3x^2) \\cdot (5xy)$.",
      choices: [
        { id: "a", label: "$15x^3y$" },
        { id: "b", label: "$15x^2y$", incorrectFeedback: "Los exponentes de $x$ se **suman**: $x^2 \\cdot x = x^3$." },
        { id: "c", label: "$8x^3y$", incorrectFeedback: "Los coeficientes se **multiplican** ($3 \\cdot 5 = 15$), no se suman." },
        { id: "d", label: "$15x^2y^2$", incorrectFeedback: "Hay $x^2$ por $x$: $x^3$; y solo una $y$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3 \\cdot 5 = 15$; $x^2 \\cdot x = x^3$; $y$ queda como está: $15x^3y$.",
    },
    {
      id: "check-potencia",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Raíz al cuadrado",
          message: "$(\\sqrt{3}x)^2 = (\\sqrt{3})^2 x^2 = 3x^2$. Después, $3x^2 \\cdot 2x = 6x^3$.",
        },
      ],
      title: "Potencia y producto",
      question: "$(\\sqrt{3}x)^2 \\cdot (2x) = kx^3$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$(\\sqrt{3}x)^2 = 3x^2$ y $3x^2 \\cdot 2x = 6x^3$.",
    },
    {
      id: "check-abc",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Divide coeficientes y resta exponentes",
          message: "$A \\cdot B = 5x^2 \\cdot 4x = 20x^3$. Después $20x^3 : (-2x^2) = -10x$.",
        },
      ],
      title: "Con tres monomios",
      question: "Sean $A = 5x^2$, $B = 4x$, $C = -2x^2$. Calcula $(A \\cdot B) : C = kx$. ¿Cuánto vale $k$? (escribe el número con su signo)",
      correctAnswers: ["-10", "−10"],
      explanation: "$A \\cdot B = 20x^3$ y $\\dfrac{20x^3}{-2x^2} = -10x$.",
    },
    {
      id: "check-no-monomio",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Mira el denominador",
          message: "Si tras simplificar queda alguna letra en el denominador, no es un monomio.",
        },
      ],
      title: "¿Es un monomio?",
      question: "¿En cuál de estos cocientes el resultado **no** es un monomio?",
      choices: [
        { id: "a", label: "$\\dfrac{2x}{x^2}$" },
        { id: "b", label: "$\\dfrac{6x^3}{3x}$", incorrectFeedback: "$= 2x^2$: es un monomio." },
        { id: "c", label: "$\\dfrac{8x^2}{2x^2}$", incorrectFeedback: "$= 4$: es un monomio de grado $0$." },
        { id: "d", label: "$\\dfrac{9x^4}{3}$", incorrectFeedback: "$= 3x^4$: es un monomio." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{2x}{x^2} = \\dfrac{2}{x}$: queda una letra en el denominador, así que no es un monomio.",
    },
  ],
};
