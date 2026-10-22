import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const productoPolinomios4esoLesson: InteractiveLesson = {
  slug: "producto-polinomios-4eso",
  title: "5. Producto de polinomios",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "monomio-polinomio",
      type: "slide",
      help: [
        {
          label: "Propiedad distributiva",
          message: "$a(b + c) = ab + ac$. El monomio multiplica a **todos** los términos del paréntesis, no solo al primero.",
        },
        {
          label: "Con letras",
          message: "Al multiplicar términos se multiplican coeficientes y se **suman** los exponentes de las mismas letras: $5x^2 \\cdot 6x^2 = 30x^4$.",
        },
      ],
      title: "Monomio por polinomio: se reparte",
      blocks: [
        {
          kind: "rule",
          text: "Para multiplicar un monomio por un polinomio, se multiplica el monomio **por cada término** del polinomio.",
        },
        {
          kind: "example",
          lines: [
            { math: "(2x^2 - 3) \\cdot (2x) = 4x^3 - 6x" },
            { math: "7(2x + 5) = 14x + 35" },
            { math: "(5x^2)(6x^2 - 4x + 3) = 30x^4 - 20x^3 + 15x^2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "area-distributiva", params: { a: 4, b: 5, c: 3 } },
    },
    {
      id: "check-monomio",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Término a término",
          message: "$2x(3x^2 - 2) = 6x^3 - 4x$ y $5(3x - 4) = 15x - 20$. Suma los semejantes.",
        },
      ],
      title: "Con un monomio",
      question: "Simplifica $2x(3x^2 - 2) + 5(3x - 4)$. En el resultado, ¿cuánto vale el coeficiente de $x$? (escribe el número con su signo)",
      correctAnswers: ["11", "+11"],
      explanation: "$6x^3 - 4x + 15x - 20 = 6x^3 + 11x - 20$. El coeficiente de $x$ es $11$.",
    },
    {
      id: "dos-polinomios",
      type: "slide",
      help: [
        {
          label: "Todos por todos",
          message: "Cada término del primero se multiplica por cada término del segundo: si hay $2$ y $2$ términos, salen $4$ productos.",
        },
        {
          label: "Reducir después",
          message: "Tras multiplicar aparecen términos semejantes (como $8x^2$ y $-3x$): se suman al final.",
        },
      ],
      title: "Polinomio por polinomio: todos por todos",
      blocks: [
        {
          kind: "rule",
          text: "Se multiplica **cada término de un factor por todos los del otro** y después se suman los semejantes.",
        },
        {
          kind: "example",
          lines: [
            { math: "(2x^2 - 1)(3x + 4) = 6x^3 + 8x^2 - 3x - 4" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "polinomio-tabla" },
    },
    {
      id: "area",
      type: "slide",
      help: [
        {
          label: "El área es el producto",
          message: "El área de un rectángulo es base por altura. Si la base es $x + 2$ y la altura $x + 3$, el área $(x + 2)(x + 3)$ se parte en cuatro rectángulos.",
        },
      ],
      title: "Por qué «todos por todos»: el área",
      blocks: [
        {
          kind: "text",
          text: "Un rectángulo de base $ax + b$ y altura $cx + d$ se parte en cuatro. Cada rectángulo es el producto de **un término de la base por uno de la altura**.",
        },
      ],
      visual: { kind: "anim", scene: "producto-area", params: { a: 1, b: 2, c: 1, d: 3 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Comprobar con un valor",
          message: "Si sustituyes $x$ por un número, el producto factorizado y el desarrollado deben valer lo mismo. Es una buena forma de detectar errores.",
        },
      ],
      title: "Explora: desarrollar y comprobar",
      blocks: [
        {
          kind: "text",
          text: "Cambia los coeficientes de los binomios. La herramienta desarrolla el producto y **comprueba con un valor de $x$** que coinciden.",
        },
      ],
      visual: { kind: "tool", tool: "producto-polinomios-explorador", initial: [1, 2, 1, 3], params: { a: 2 }, hint: "Prueba (x+3)(x−3): ¿qué pasa con el término de x?" },
    },
    {
      id: "check-binomios",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cuatro productos",
          message: "$(5x - 2)(3 - 2x) = 15x - 10x^2 - 6 + 4x$.",
        },
      ],
      title: "Dos binomios",
      question: "Desarrolla $(5x - 2)(3 - 2x)$. ¿Cuánto vale el coeficiente de $x$? (escribe el número con su signo)",
      correctAnswers: ["19", "+19"],
      explanation: "$15x - 10x^2 - 6 + 4x = -10x^2 + 19x - 6$. El coeficiente de $x$ es $19$.",
    },
    {
      id: "check-cubico",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Mayor grado",
          message: "El término de mayor grado sale de multiplicar los de mayor grado: $3x^2 \\cdot (-2x) = -6x^3$.",
        },
      ],
      title: "Un producto de tercer grado",
      question: "Sean $P = 3x^2 - 5$ y $R = -2x + 5$. En $P \\cdot R$, ¿cuánto vale el coeficiente de $x^3$? (escribe el número con su signo)",
      correctAnswers: ["-6", "−6"],
      explanation: "$P \\cdot R = -6x^3 + 15x^2 + 10x - 25$. El coeficiente de $x^3$ es $-6$.",
    },
    {
      id: "check-tres",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Q por R",
          message: "$(x^2 - 3x + 2)(-2x + 5) = -2x^3 + 5x^2 + 6x^2 - 15x - 4x + 10$.",
        },
      ],
      title: "Un trinomio por un binomio",
      question: "Sean $Q = x^2 - 3x + 2$ y $R = -2x + 5$. En $Q \\cdot R$, ¿cuánto vale el coeficiente de $x^2$? (escribe el número con su signo)",
      correctAnswers: ["11", "+11"],
      explanation: "$Q \\cdot R = -2x^3 + 11x^2 - 19x + 10$. El coeficiente de $x^2$ es $5 + 6 = 11$.",
    },
    {
      id: "check-resta-producto",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Primero los productos",
          message: "$(x^2 - 3)(x + 1) = x^3 + x^2 - 3x - 3$ y $x(2x^2 + 5x) = 2x^3 + 5x^2$. Después se resta.",
        },
      ],
      title: "Un producto menos otro",
      question: "Simplifica $(x^2 - 3)(x + 1) - x(2x^2 + 5x)$. ¿Cuánto vale el coeficiente de $x^2$? (escribe el número con su signo)",
      correctAnswers: ["-4", "−4"],
      explanation: "$x^3 + x^2 - 3x - 3 - 2x^3 - 5x^2 = -x^3 - 4x^2 - 3x - 3$. El coeficiente de $x^2$ es $1 - 5 = -4$.",
    },
  ],
};
