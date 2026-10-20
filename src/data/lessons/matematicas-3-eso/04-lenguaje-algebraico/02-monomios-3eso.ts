import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const monomios3esoLesson: InteractiveLesson = {
  slug: "monomios-3eso",
  title: "2. Monomios",
  subtitle: TEMA_3ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "Convenios de escritura",
          message: "El coeficiente $1$ no se escribe ($1x = x$), el exponente $1$ tampoco ($x^1 = x$) y el signo de producto se omite ($x \\cdot y = xy$).",
        },
        {
          label: "Grado",
          message: "El grado de $-3x^2y$ es $2 + 1 = 3$, porque la parte literal tiene tres factores: $x \\cdot x \\cdot y$.",
        },
      ],
      title: "Partes de un monomio",
      blocks: [
        {
          kind: "definition",
          text: "Un **monomio** es el producto de un número, el **coeficiente**, por una o varias letras, la **parte literal**. El **grado** es la suma de los exponentes de la parte literal.",
        },
        {
          kind: "example",
          lines: [
            { math: "-3x^2y:\\ \\text{coeficiente } -3,\\ \\text{literal } x^2y,\\ \\text{grado } 3" },
            { math: "7a^2:\\ \\text{coeficiente } 7,\\ \\text{grado } 2" },
            { math: "9 = 9x^0:\\ \\text{grado } 0" },
          ],
        },
        {
          kind: "text",
          text: "Dos monomios son **semejantes** si tienen **la misma parte literal**: $2x$ y $5x$, o $5abx^2$ y $-7abx^2$.",
        },
      ],
      visual: { kind: "anim", scene: "monomio-partes" },
    },
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "Como frutas",
          message: "$4a + 3a$ son cuatro «a» y tres «a»: siete «a». Pero $4a + 3b$ son cosas distintas y no se mezclan.",
        },
        {
          label: "Resultado indicado",
          message: "Si no son semejantes, la suma queda **indicada**: $7x^5 + 11x^3$ no se puede reducir.",
        },
      ],
      title: "Sumar y restar monomios",
      blocks: [
        {
          kind: "rule",
          text: "Solo se pueden sumar o restar monomios **semejantes**: se suman los coeficientes y la parte literal no cambia.",
          formula: "7x^5 + 11x^5 = 18x^5",
        },
        {
          kind: "example",
          lines: [
            { math: "3abx^2 - 8abx^2 = -5abx^2" },
            { math: "4a + 3b \\ \\text{queda indicada}" },
          ],
        },
        {
          kind: "warning",
          text: "$2x + 3x^2$ **no** es $5x^3$: las partes literales son distintas, así que no son semejantes.",
        },
      ],
      visual: { kind: "anim", scene: "semejantes-agrupar", params: { a: 4, b: 3, c: 2 } },
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Desarrolla las potencias",
          message: "$x^2 \\cdot x^3 = (x \\cdot x)(x \\cdot x \\cdot x) = x^5$: se cuentan las letras.",
        },
        {
          label: "Signos",
          message: "Los signos siguen la regla de siempre: iguales dan $+$, distintos dan $-$.",
        },
      ],
      title: "Multiplicar monomios",
      blocks: [
        {
          kind: "rule",
          text: "El producto de monomios es un monomio: se multiplican los **coeficientes** y se multiplican las **partes literales** (sumando exponentes de la misma letra).",
          formula: "(3x^2ab) \\cdot (5xac) = 15x^3a^2bc",
        },
        {
          kind: "example",
          lines: [
            { math: "(2x) \\cdot (3x^2) = 6x^3" },
            { math: "(-3x^2) \\cdot (4x^3) = -12x^5" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "monomio-producto", params: { a: 2, b: 3, c: 1, d: 2 } },
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "Como una fracción",
          message: "Escribe la división como fracción y tacha letras iguales por parejas; los coeficientes se dividen aparte.",
        },
        {
          label: "Exponentes",
          message: "Al dividir letras iguales se restan los exponentes: $x^5 : x^2 = x^3$.",
        },
      ],
      title: "Dividir monomios",
      blocks: [
        {
          kind: "rule",
          text: "Se dividen por un lado los **coeficientes** y por otro las **partes literales** (restando exponentes).",
          formula: "(12x^5y^2) : (3x^2y) = 4x^3y",
        },
        {
          kind: "warning",
          text: "Si el exponente del divisor es mayor que el del dividendo, el resultado **no es un monomio**: $x^2 : x^5 = \\frac{1}{x^3}$.",
        },
      ],
      visual: { kind: "anim", scene: "monomio-cociente", params: { a: 12, b: 3, c: 5, d: 2 } },
    },
    {
      id: "check-grado",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Suma de exponentes",
          message: "Las letras son $x$ ($1$), $y$ ($2$) y $z$ ($3$): $1 + 2 + 3$.",
        },
      ],
      title: "Grado de un monomio",
      question: "¿Cuál es el grado del monomio $-5xy^2z^3$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "El grado es la suma de exponentes: $1 + 2 + 3 = 6$.",
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      help: [
        {
          label: "Mismos literales",
          message: "Los tres sumandos tienen la parte literal $x^2y$: suma los coeficientes $6 - 13 + 3 - 1$.",
        },
      ],
      title: "Suma de semejantes",
      question: "Simplifica $6x^2y - 13x^2y + 3x^2y - x^2y$. (escribe el monomio, por ejemplo 5x^2y)",
      correctAnswers: ["-5x^2y", "-5x²y"],
      explanation: "$6 - 13 + 3 - 1 = -5$, así que el resultado es $-5x^2y$.",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "Coeficientes y letras",
          message: "Coeficientes: $2 \\cdot (-6) = -12$. Letras: $x^3 \\cdot x = x^4$.",
        },
      ],
      title: "Producto de monomios",
      question: "Calcula $(2x^3) \\cdot (-6x)$. (escribe el monomio, por ejemplo 5x^2)",
      correctAnswers: ["-12x^4", "-12x⁴"],
      explanation: "$2 \\cdot (-6) = -12$ y $x^3 \\cdot x = x^4$.",
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide por separado",
          message: "$20 : 5 = 4$ y $x^6 : x^2 = x^4$.",
        },
      ],
      title: "Cociente de monomios",
      question: "Calcula $(20x^6) : (5x^2)$. (escribe el monomio, por ejemplo 5x^2)",
      correctAnswers: ["4x^4", "4x⁴"],
      explanation: "$20 : 5 = 4$ y $x^6 : x^2 = x^{6-2} = x^4$.",
    },
  ],
};
