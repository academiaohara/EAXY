import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const factorComun3esoLesson: InteractiveLesson = {
  slug: "factor-comun-3eso",
  title: "5. Extracción de factor común",
  subtitle: TEMA_3ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "distributiva",
      type: "slide",
      help: [
        {
          label: "En el sentido contrario",
          message: "Con la propiedad distributiva se «reparte» un factor; al sacar factor común se «recoge».",
        },
        {
          label: "Con áreas",
          message: "Un rectángulo de lado $a$ partido en dos tiene área $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.",
        },
      ],
      title: "La propiedad distributiva",
      blocks: [
        {
          kind: "rule",
          title: "Propiedad distributiva",
          formula: "a \\cdot (b + c) = a \\cdot b + a \\cdot c",
        },
        {
          kind: "text",
          text: "Leída de derecha a izquierda, es la **extracción de factor común**: una suma de productos con un factor repetido se convierte en un producto.",
        },
      ],
      visual: { kind: "anim", scene: "area-distributiva", params: { a: 3, b: 4, c: 2 } },
    },
    {
      id: "extraer",
      type: "slide",
      help: [
        {
          label: "Cómo saber qué queda en el paréntesis",
          message: "Divide cada término entre el factor común. Para $6x + 9$ con factor $3$: $6x : 3 = 2x$ y $9 : 3 = 3$.",
        },
        {
          label: "Comprueba",
          message: "Aplica la distributiva al resultado: debes recuperar la expresión original.",
        },
      ],
      title: "Extraer factor común",
      blocks: [
        {
          kind: "definition",
          text: "**Extraer factor común** es identificar lo que se **repite en todos los términos**, escribirlo **una sola vez** y multiplicarlo por un paréntesis con lo que queda.",
        },
        {
          kind: "steps",
          items: [
            "Busca el **número** más grande que divide a todos los coeficientes (el m.c.d.) y las **letras** que están en todos los términos, con el menor exponente.",
            "Escribe el factor común **fuera** del paréntesis.",
            "Dentro, pon el **cociente** de cada término entre el factor común.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "ab + ac = a(b + c)" },
            { math: "6x + 9 = 3(2x + 3)" },
            { math: "4x^2 + 6x = 2x(2x + 3)" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-numero",
      type: "fill_in_blank",
      help: [
        {
          label: "m.c.d. de los coeficientes",
          message: "$12$ y $18$: el mayor número que divide a los dos es $6$.",
        },
      ],
      title: "El factor numérico",
      question: "Al extraer factor común en $12x + 18$, ¿qué número queda fuera del paréntesis? (el mayor posible)",
      correctAnswers: ["6"],
      explanation: "$\\text{m.c.d.}(12, 18) = 6$ y $12x + 18 = 6(2x + 3)$.",
    },
    {
      id: "check-expresion",
      type: "predict",
      help: [
        {
          label: "Divide cada término",
          message: "Factor común $5x$: $10x^2 : 5x = 2x$ y $15x : 5x = 3$.",
        },
      ],
      title: "Saca factor común",
      question: "¿Cuál es la expresión $10x^2 + 15x$ con el factor común extraído?",
      mode: "choice",
      choices: [
        { id: "a", label: "$5x(2x + 3)$" },
        { id: "b", label: "$5(2x^2 + 3x)$", incorrectFeedback: "Es correcta, pero se puede sacar también la $x$: no es la extracción completa." },
        { id: "c", label: "$5x(2x + 15)$", incorrectFeedback: "$15x : 5x = 3$, no $15$." },
        { id: "d", label: "$10x(x + 15)$", incorrectFeedback: "$10x \\cdot 15 = 150x$, no $15x$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El m.c.d. de $10$ y $15$ es $5$ y la $x$ está en ambos: $10x^2 + 15x = 5x(2x + 3)$.",
    },
    {
      id: "varias-letras",
      type: "slide",
      help: [
        {
          label: "Menor exponente",
          message: "De cada letra se saca la potencia de **menor exponente** entre los términos en los que aparece, y solo si aparece en todos.",
        },
        {
          label: "Un término que coincide",
          message: "Cuando un sumando coincide con el factor común, queda un $1$ en el paréntesis: $xy + x^2 + x = x(y + x + 1)$.",
        },
      ],
      title: "Con varias letras",
      blocks: [
        {
          kind: "example",
          title: "3x²y + 6x²z + 9xyz",
          lines: [
            { math: "\\text{coeficientes: m.c.d.}(3, 6, 9) = 3" },
            { math: "\\text{letra común a los tres términos: } x \\text{ (menor exponente: 1)}" },
            { math: "3x^2y + 6x^2z + 9xyz = 3x(xy + 2xz + 3yz)" },
          ],
        },
        {
          kind: "warning",
          text: "Si una letra no aparece en **todos** los términos (como $y$ o $z$ aquí), no es factor común.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-letras",
      type: "predict",
      help: [
        {
          label: "Qué se repite",
          message: "El $4$ divide a $8$ y a $12$. La $a$ está en los dos términos, con exponentes $2$ y $1$: sale con exponente $1$.",
        },
      ],
      title: "Extracción con letras",
      question: "¿Cuál es la extracción completa de factor común de $8a^2b + 12ab$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4ab(2a + 3)$" },
        { id: "b", label: "$4(2a^2b + 3ab)$", incorrectFeedback: "Es correcta, pero se pueden sacar también $a$ y $b$." },
        { id: "c", label: "$2ab(4a + 6)$", incorrectFeedback: "Se puede sacar un $4$, no solo un $2$." },
        { id: "d", label: "$4ab(2a + 12)$", incorrectFeedback: "$12ab : 4ab = 3$, no $12$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\text{m.c.d.}(8, 12) = 4$ y las letras $a$ y $b$ están en ambos: $8a^2b + 12ab = 4ab(2a + 3)$.",
    },
    {
      id: "calculo-mental",
      type: "slide",
      help: [
        {
          label: "Para qué sirve",
          message: "Convierte una suma de productos en un solo producto, que suele ser más fácil de calcular.",
        },
      ],
      title: "Para calcular con facilidad",
      blocks: [
        {
          kind: "text",
          text: "El factor común también simplifica cuentas con números.",
        },
        {
          kind: "example",
          lines: [
            { math: "37 \\cdot 8 + 37 \\cdot 2 = 37 \\cdot (8 + 2) = 37 \\cdot 10 = 370" },
            { math: "25 \\cdot 13 - 25 \\cdot 3 = 25 \\cdot 10 = 250" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-mental",
      type: "fill_in_blank",
      help: [
        {
          label: "Factor común",
          message: "$45 \\cdot 7 + 45 \\cdot 3 = 45 \\cdot (7 + 3)$.",
        },
      ],
      title: "Cálculo con factor común",
      question: "Calcula $45 \\cdot 7 + 45 \\cdot 3$ sacando factor común (solo el número)",
      correctAnswers: ["450"],
      explanation: "$45 \\cdot (7 + 3) = 45 \\cdot 10 = 450$.",
    },
  ],
};
