import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFracciones4esoLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-4eso",
  title: "6. Operaciones con fracciones",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma-resta",
      type: "slide",
      help: [
        {
          label: "Mismo denominador",
          message: "Con el mismo denominador, los trozos son del mismo tamaño y solo se cuentan: $\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}$.",
        },
        {
          label: "Denominador común",
          message: "Con denominadores distintos, se buscan fracciones equivalentes con el mismo denominador. Lo más cómodo es el m.c.m.",
        },
      ],
      title: "Sumar y restar: hace falta el mismo trozo",
      blocks: [
        {
          kind: "text",
          text: "Con el **mismo denominador**, se suman o restan los numeradores y el denominador se mantiene. Con distinto denominador, hay que pasar antes a **fracciones equivalentes** con denominador común.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{4} + \\dfrac{4}{5} - \\dfrac{5}{1}" },
            { math: "= \\dfrac{15}{20} + \\dfrac{16}{20} - \\dfrac{100}{20} = \\dfrac{-69}{20}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-barras-suma", params: { a: 2, b: 3, c: 3, d: 4, op: "+" } },
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "m.c.m.",
          message: "$\\text{m.c.m.}(4, 8, 6) = 24$: $\\frac{18}{24} - \\frac{21}{24} + \\frac{20}{24}$.",
        },
      ],
      title: "Suma y resta con tres denominadores",
      question: "Calcula $\\dfrac{3}{4} - \\dfrac{7}{8} + \\dfrac{5}{6}$ y da la fracción irreducible.",
      correctAnswers: ["17/24"],
      explanation: "$\\frac{18}{24} - \\frac{21}{24} + \\frac{20}{24} = \\frac{17}{24}$.",
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Parte de una parte",
          message: "La tercera parte de la cuarta parte es la doceava parte: $\\frac{1}{3} \\cdot \\frac{1}{4} = \\frac{1}{12}$.",
        },
        {
          label: "Simplifica antes",
          message: "Antes de multiplicar, puedes tachar un factor del numerador con otro del denominador (aunque sean de fracciones distintas).",
        },
      ],
      title: "Multiplicar: una parte de otra parte",
      blocks: [
        {
          kind: "rule",
          formula: "\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d}",
        },
        {
          kind: "text",
          text: "Se multiplican numeradores y denominadores. Dibujado: la primera fracción reparte el **ancho**, la segunda el **alto**, y el resultado es la zona común.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-de-fraccion", params: { a: 2, b: 3, c: 3, d: 4 } },
    },
    {
      id: "explora-producto",
      type: "slide",
      help: [
        {
          label: "Menor que cada factor",
          message: "Al multiplicar dos fracciones propias, el resultado es menor que cada una de ellas: es una parte de una parte.",
        },
      ],
      title: "Explora el producto",
      blocks: [
        {
          kind: "text",
          text: "Cambia numeradores y denominadores. Fíjate en qué le pasa al resultado cuando las dos fracciones son propias.",
        },
        {
          kind: "warning",
          text: "Multiplicar por una fracción propia **reduce** el número, al contrario de lo que pasa con los naturales.",
        },
      ],
      visual: { kind: "tool", tool: "fraction-product", initial: [2, 3, 3, 4], hint: "Haz que el segundo factor sea 1 y comprueba qué sucede con el producto." },
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Signos y simplificación",
          message: "Tres factores con dos signos negativos: el producto es positivo. Tacha factores comunes antes de multiplicar.",
        },
      ],
      title: "Tres factores con signo",
      question: "Calcula $\\dfrac{-3}{4} \\cdot \\dfrac{8}{9} \\cdot \\dfrac{5}{-6}$ y da la fracción irreducible.",
      correctAnswers: ["5/9"],
      explanation: "Signos: $(-)\\cdot(-) = +$. Numerador: $3 \\cdot 8 \\cdot 5 = 120$. Denominador: $4 \\cdot 9 \\cdot 6 = 216$. $\\frac{120}{216} = \\frac{5}{9}$.",
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "Inversa",
          message: "La inversa de $\\frac{a}{b}$ es $\\frac{b}{a}$. La inversa de un entero $n$ es $\\frac{1}{n}$.",
        },
      ],
      title: "Dividir: multiplicar por la inversa",
      blocks: [
        {
          kind: "rule",
          formula: "\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c} = \\dfrac{a \\cdot d}{b \\cdot c}",
        },
        {
          kind: "text",
          text: "Se da la vuelta a la **segunda** fracción (el divisor), nunca a la primera. En el producto en cruz: extremos arriba, medios abajo.",
        },
      ],
      visual: { kind: "anim", scene: "simplificar-factores", params: { a: 4, b: 8, c: 3, d: 4, inv: true } },
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Da la vuelta",
          message: "$\\frac{3}{5} : \\left(-\\frac{9}{10}\\right) = \\frac{3}{5} \\cdot \\left(-\\frac{10}{9}\\right)$.",
        },
      ],
      title: "Dividir con signo",
      question: "Calcula $\\dfrac{3}{5} : \\left(-\\dfrac{9}{10}\\right)$ y da la fracción irreducible.",
      correctAnswers: ["-2/3", "−2/3"],
      explanation: "$\\frac{3}{5} \\cdot \\left(-\\frac{10}{9}\\right) = -\\frac{30}{45} = -\\frac{2}{3}$.",
    },
    {
      id: "combinadas",
      type: "slide",
      help: [
        {
          label: "Mismo orden que con enteros",
          message: "Paréntesis, potencias, productos y cocientes, sumas y restas. Con fracciones, cada paso deja una fracción que conviene simplificar.",
        },
      ],
      title: "Combinadas con fracciones",
      blocks: [
        {
          kind: "text",
          text: "El **orden de las operaciones** es el mismo que con enteros. Un buen hábito: simplificar el resultado de cada paso para que los números sigan siendo pequeños.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-combinada", params: { a: 3, b: 4, c: 1, d: 2, e: 1, f: 3, op: "-" } },
    },
    {
      id: "check-combinada",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Primero el paréntesis",
          message: "$\\frac{1}{2} - \\frac{1}{3} + \\frac{1}{4} = \\frac{6 - 4 + 3}{12} = \\frac{5}{12}$.",
        },
      ],
      title: "Un paréntesis y un producto",
      question: "Calcula $\\left(\\dfrac{1}{2} - \\dfrac{1}{3} + \\dfrac{1}{4}\\right) \\cdot (-6)$ y da la fracción irreducible.",
      correctAnswers: ["-5/2", "−5/2"],
      explanation: "$\\frac{5}{12} \\cdot (-6) = -\\frac{30}{12} = -\\frac{5}{2}$.",
    },
    {
      id: "check-hipoteca",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Qué resta",
          message: "Si aporta $\\frac{3}{10}$ del precio, el resto es $1 - \\frac{3}{10} = \\frac{7}{10}$.",
        },
      ],
      title: "Comprar un piso",
      question: "Mauro compra un piso de $245\\,000$ €. Aporta en efectivo $\\dfrac{3}{10}$ de esa cantidad y pide una hipoteca por el resto. ¿Cuántos euros pide de hipoteca? (solo el número)",
      correctAnswers: ["171500", "171 500", "171.500"],
      explanation: "El resto es $\\frac{7}{10}$ de $245\\,000 = 245\\,000 : 10 \\cdot 7 = 24\\,500 \\cdot 7 = 171\\,500$ €.",
    },
    {
      id: "check-dentista",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Repartir una fracción",
          message: "$1$ h y $\\frac{3}{4}$ son $\\frac{7}{4}$ de hora. Repartir entre $15$ es dividir: $\\frac{7}{4} : 15$.",
        },
      ],
      title: "Fracción de hora por paciente",
      question: "Un dentista dedica $1$ h y $\\dfrac{3}{4}$ a su consulta y recibe a $15$ pacientes. ¿Qué fracción de hora dedica a cada uno? Da la fracción irreducible.",
      correctAnswers: ["7/60"],
      explanation: "$1 + \\frac{3}{4} = \\frac{7}{4}$ y $\\frac{7}{4} : 15 = \\frac{7}{60}$ de hora, es decir, $7$ minutos.",
    },
  ],
};
