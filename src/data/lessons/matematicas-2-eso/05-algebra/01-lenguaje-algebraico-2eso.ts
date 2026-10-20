import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const lenguajeAlgebraico2esoLesson: InteractiveLesson = {
  slug: "lenguaje-algebraico-2eso",
  title: "1. Lenguaje algebraico",
  subtitle: TEMA_2ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "expresiones",
      type: "slide",
      help: [
        {
          label: "Una letra, un número cualquiera",
          message: "En $x + 4$, la $x$ representa un número que no conocemos o que puede cambiar. La expresión vale lo que valga la $x$ más $4$.",
        },
        {
          label: "¿Por qué letras?",
          message: "Permiten escribir una regla que vale para todos los números, no solo para uno.",
        },
      ],
      title: "Expresiones algebraicas",
      blocks: [
        {
          kind: "definition",
          text: "El **lenguaje algebraico** usa letras junto a números y signos. Una **expresión algebraica** es un conjunto de números y letras combinados con las operaciones aritméticas.",
        },
        {
          kind: "relations",
          items: [
            { left: "La suma de dos números", relation: "se escribe", right: "a + b", tone: "ok" },
            { left: "Un número aumentado en 4", relation: "se escribe", right: "x + 4", tone: "info" },
            { left: "El triple de un número", relation: "se escribe", right: "3x", tone: "key" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "traducir",
      type: "slide",
      help: [
        {
          label: "Por trozos",
          message: "Primero «la edad del año pasado» ($x - 1$) y después «el doble de eso»: se necesita paréntesis.",
        },
        {
          label: "El error típico",
          message: "$2x - 1$ es «el doble de la edad, menos uno». No es lo mismo que el doble de $x - 1$.",
        },
      ],
      title: "Traducir un enunciado",
      blocks: [
        {
          kind: "text",
          text: "Se traduce **por trozos**, de dentro a fuera, y se usan paréntesis cuando hace falta.",
        },
        {
          kind: "example",
          title: "«El doble de la edad del año pasado»",
          lines: [
            { math: "x", note: "edad actual" },
            { math: "x - 1", note: "edad del año pasado" },
            { math: "2(x - 1)", note: "el doble de eso" },
          ],
        },
        {
          kind: "warning",
          text: "$2x - 1$ es el doble de la edad **menos uno**, que es otra cosa.",
        },
      ],
      visual: { kind: "anim", scene: "enunciado-expresion" },
    },
    {
      id: "campo",
      type: "slide",
      help: [
        {
          label: "Perímetro y área",
          message: "El perímetro suma los cuatro lados; el área multiplica largo por ancho.",
        },
        {
          label: "Una fórmula vale para todos",
          message: "Con $x = 10$ e $y = 4$ y con $x = 7$ e $y = 5$ se usa la misma expresión.",
        },
      ],
      title: "Una expresión para todos los campos",
      blocks: [
        {
          kind: "text",
          text: "Un campo rectangular tiene largo $x$ y ancho $y$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "P = x + y + x + y = 2x + 2y", label: "perímetro" },
            { tex: "A = x \\cdot y = xy", label: "área" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "campo-perimetro-area" },
    },
    {
      id: "valor-numerico",
      type: "slide",
      help: [
        {
          label: "Sustituir",
          message: "Escribe el número en lugar de la letra, respetando las operaciones: $2x + 3$ con $x = 5$ es $2 \\cdot 5 + 3$.",
        },
      ],
      title: "Valor numérico",
      blocks: [
        {
          kind: "rule",
          title: "Valor numérico",
          text: "Es el número que resulta al **sustituir las letras por números** y hacer las operaciones.",
        },
        {
          kind: "example",
          lines: [{ math: "2x + 3 \\text{ para } x = 5: \\quad 2 \\cdot 5 + 3 = 13" }],
        },
      ],
      visual: { kind: "tool", tool: "valor-numerico", params: { a: 2, b: 3, n: 5 }, hint: "Mueve el valor de la letra y observa cómo cambia la expresión." },
    },
    {
      id: "check-traducir",
      type: "predict",
      help: [
        {
          label: "Por trozos",
          message: "«El cuádruple de un número» es $4x$. Después, «menos $3$».",
        },
      ],
      title: "Traduce",
      question: "¿Qué expresión representa «el cuádruple de un número, menos 3»?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4x - 3$" },
        { id: "b", label: "$4(x - 3)$", incorrectFeedback: "Eso es el cuádruple de «el número menos 3»." },
        { id: "c", label: "$x^4 - 3$", incorrectFeedback: "$x^4$ es $x$ multiplicado por sí mismo cuatro veces, no el cuádruple." },
        { id: "d", label: "$4 + x - 3$", incorrectFeedback: "Se suma el $4$ en lugar de multiplicar." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El cuádruple de $x$ es $4x$; menos $3$: $4x - 3$.",
    },
    {
      id: "check-valor",
      type: "fill_in_blank",
      help: [
        {
          label: "Sustituye",
          message: "$3x - 2$ para $x = 4$: $3 \\cdot 4 - 2$.",
        },
      ],
      title: "Valor numérico",
      question: "Calcula el valor numérico de $3x - 2$ para $x = 4$ (solo el número)",
      correctAnswers: ["10"],
      explanation: "$3 \\cdot 4 - 2 = 12 - 2 = 10$.",
    },
    {
      id: "check-perimetro",
      type: "predict",
      help: [
        {
          label: "Sustituye",
          message: "Usa $P = 2x + 2y$ con $x = 12$ e $y = 5$.",
        },
      ],
      title: "Perímetro del campo",
      question: "Un campo mide $12$ m de largo y $5$ m de ancho. ¿Cuántos metros de valla hacen falta para rodearlo?",
      mode: "choice",
      choices: [
        { id: "34", label: "$34$ m" },
        { id: "60", label: "$60$ m", incorrectFeedback: "$60$ es el área en m², no el perímetro." },
        { id: "17", label: "$17$ m", incorrectFeedback: "Es la suma de largo y ancho: faltan los otros dos lados." },
        { id: "22", label: "$22$ m", incorrectFeedback: "Has hecho $2 \\cdot 12 - 2$. El perímetro es $2x + 2y$." },
      ],
      correctChoiceId: "34",
      shuffleChoices: true,
      explanation: "$P = 2 \\cdot 12 + 2 \\cdot 5 = 24 + 10 = 34$ m.",
    },
  ],
};
