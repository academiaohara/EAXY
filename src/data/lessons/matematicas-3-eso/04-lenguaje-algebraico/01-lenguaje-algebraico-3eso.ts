import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const lenguajeAlgebraico3esoLesson: InteractiveLesson = {
  slug: "lenguaje-algebraico-3eso",
  title: "1. Lenguaje algebraico",
  subtitle: TEMA_3ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "traducir",
      type: "slide",
      help: [
        {
          label: "Por trozos",
          message: "Traduce una frase en partes: primero «un número» ($x$), luego la operación que se le aplica, y por último la siguiente.",
        },
        {
          label: "Una letra, un valor",
          message: "La letra representa un número desconocido o que puede cambiar: la **variable** o **incógnita**.",
        },
      ],
      title: "Traducir enunciados a expresiones",
      blocks: [
        {
          kind: "definition",
          text: "El **lenguaje algebraico** usa letras, números y signos de operación. Una **expresión algebraica** es un conjunto de números y letras combinados con operaciones. Las letras son **variables** o **incógnitas**.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{La suma de dos números} \\to a + b" },
            { math: "\\text{Un número aumentado en 4 unidades} \\to x + 4" },
            { math: "\\text{El triple de un número} \\to 3x" },
            { math: "\\text{El triple del resultado de restarle 4} \\to 3(x - 4)" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "enunciado-expresion" },
    },
    {
      id: "dos-incognitas",
      type: "slide",
      help: [
        {
          label: "Un dibujo ayuda",
          message: "Dibuja el campo y escribe $x$ e $y$ sobre sus lados: el perímetro es la suma de los cuatro lados.",
        },
        {
          label: "Área",
          message: "El área de un rectángulo es base por altura: $x \\cdot y$.",
        },
      ],
      title: "Con dos incógnitas",
      blocks: [
        {
          kind: "text",
          text: "Un campo rectangular de largo $x$ y ancho $y$ se describe con dos letras.",
        },
        {
          kind: "facts",
          items: [
            { tex: "P = x + y + x + y = 2x + 2y", label: "perímetro" },
            { tex: "A = x \\cdot y", label: "área" },
          ],
        },
        {
          kind: "text",
          text: "Si $x$ e $y$ son las edades de dos hermanos, «la suma de sus edades hace $5$ años» es $(x - 5) + (y - 5) = x + y - 10$.",
        },
      ],
      visual: { kind: "anim", scene: "campo-perimetro-area" },
    },
    {
      id: "plantear",
      type: "slide",
      help: [
        {
          label: "Elige la incógnita",
          message: "Llama $x$ a lo que no conoces y que sirve para expresar lo demás: aquí, el lado menor.",
        },
        {
          label: "Después, la condición",
          message: "El dato «el perímetro es $60$ cm» convierte la expresión en una igualdad.",
        },
      ],
      title: "De la expresión a la igualdad",
      blocks: [
        {
          kind: "example",
          title: "Perímetro de 60 cm y un lado triple del otro",
          lines: [
            { math: "\\text{lados: } x \\text{ y } 3x" },
            { math: "P = x + 3x + x + 3x = 8x" },
            { math: "8x = 60", note: "así se plantea una ecuación" },
          ],
        },
        {
          kind: "warning",
          text: "«El triple de un número menos cuatro» es $3x - 4$, pero «el triple del resultado de restar cuatro» es $3(x - 4)$: el paréntesis cambia el significado.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-triple",
      type: "predict",
      help: [
        {
          label: "Qué se triplica",
          message: "Se triplica el resultado de restar $4$ al número, es decir, toda la resta.",
        },
      ],
      title: "El triple de un resultado",
      question: "¿Qué expresión corresponde a «el triple del resultado de restarle cuatro unidades a un número»?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3(x - 4)$" },
        { id: "b", label: "$3x - 4$", incorrectFeedback: "Eso es «el triple de un número menos cuatro unidades»: el $4$ no se triplica." },
        { id: "c", label: "$3 - 4x$", incorrectFeedback: "Se ha multiplicado el $4$ por la incógnita." },
        { id: "d", label: "$x - 12$", incorrectFeedback: "Se ha triplicado solo el $4$ y no el resultado de la resta." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Primero se resta ($x - 4$) y después se triplica: $3(x - 4)$.",
    },
    {
      id: "check-mitad",
      type: "fill_in_blank",
      help: [
        {
          label: "Dos números",
          message: "Llama $a$ y $b$ a los números: su suma es $a + b$, y la mitad de la suma se escribe con una fracción.",
        },
      ],
      title: "Mitad de la suma",
      question: "Escribe «la mitad de la suma de dos números» usando $a$ y $b$ (por ejemplo, con la forma (a+b)/2).",
      correctAnswers: ["(a+b)/2", "(b+a)/2", "(a+b):2", "(b+a):2", "1/2(a+b)", "1/2(b+a)", "0,5(a+b)", "0.5(a+b)"],
      explanation: "$\\frac{a + b}{2}$: primero se suma y después se divide entre $2$.",
    },
    {
      id: "check-rectangulo",
      type: "fill_in_blank",
      help: [
        {
          label: "Cuatro lados",
          message: "Dos lados miden $x$ y dos miden $3x$: $x + 3x + x + 3x$.",
        },
      ],
      title: "Perímetro",
      question: "Un rectángulo mide $x$ de base y $3x$ de altura. ¿Cuánto vale su perímetro, simplificado? (escribe la expresión, por ejemplo 5x)",
      correctAnswers: ["8x"],
      explanation: "$x + 3x + x + 3x = 8x$.",
    },
  ],
};
