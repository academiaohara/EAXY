import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const numerosRealesRecta4esoLesson: InteractiveLesson = {
  slug: "numeros-reales-recta-4eso",
  title: "2. Números reales y la recta real",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reales",
      type: "slide",
      help: [
        {
          label: "Unión",
          message: "$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$, donde $\\mathbb{I}$ es el conjunto de los irracionales. Un número real es **o racional o irracional**, nunca las dos cosas.",
        },
        {
          label: "Un número, varios conjuntos",
          message: "$-3$ es entero y también racional y real. Los conjuntos están **anidados**, así que un número puede estar en varios.",
        },
      ],
      title: "Los reales: racionales más irracionales",
      blocks: [
        {
          kind: "definition",
          text: "El conjunto de los **números reales** $\\mathbb{R}$ está formado por los racionales y los irracionales juntos.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}" },
            { tex: "\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}" },
          ],
        },
        {
          kind: "text",
          text: "Con los reales se hacen las mismas operaciones que con los racionales y, además, se puede extraer **cualquier raíz de índice impar**, y la de índice par de los positivos, con resultado real.",
        },
      ],
      visual: { kind: "anim", scene: "conjuntos-numericos" },
    },
    {
      id: "explora-conjuntos",
      type: "slide",
      help: [
        {
          label: "Los que engañan",
          message: "$\\frac{28}{7}$ parece una fracción pero vale $4$: es natural. $-\\sqrt{9}$ parece un radical pero vale $-3$: es entero.",
        },
      ],
      title: "Explora: ¿en qué conjuntos está?",
      blocks: [
        {
          kind: "text",
          text: "Elige cada número y mira en qué conjuntos está. Algunos aparecen en **varios**; otros engañan: una fracción que es un entero, una raíz que es un natural.",
        },
        {
          kind: "warning",
          text: "Antes de clasificar un radical o una fracción, **simplifícala**: puede resultar un entero.",
        },
      ],
      visual: { kind: "tool", tool: "conjuntos-explorador", params: { a: 2 }, hint: "Encuentra tres números que estén a la vez en ℤ y en ℚ pero no en ℕ." },
    },
    {
      id: "check-sitiar",
      type: "classify",
      help: [
        {
          label: "Simplifica",
          message: "$\\sqrt{49} = 7$ (natural), $-\\sqrt{36} = -6$ (entero), $\\frac{73}{9} = 8{,}\\overline{1}$ (racional no entero), $\\pi - 3$ (irracional).",
        },
      ],
      title: "El conjunto más pequeño",
      question: "Coloca cada número en el conjunto **más pequeño** al que pertenece.",
      groups: [
        { id: "natural", label: "Natural", tone: "cobalt" },
        { id: "entero", label: "Entero (no natural)", tone: "amber" },
        { id: "racional", label: "Racional (no entero)", tone: "emerald" },
        { id: "irracional", label: "Irracional", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$107$", group: "natural" },
        { id: "b", text: "$\\sqrt{49}$", group: "natural" },
        { id: "c", text: "$-7$", group: "entero" },
        { id: "d", text: "$-\\sqrt{36}$", group: "entero" },
        { id: "e", text: "$3{,}95$", group: "racional" },
        { id: "f", text: "$\\dfrac{73}{9}$", group: "racional" },
        { id: "g", text: "$\\sqrt{20}$", group: "irracional" },
        { id: "h", text: "$\\pi - 3$", group: "irracional" },
      ],
      hint: "Cada número va en el conjunto más pequeño que lo contiene.",
    },
    {
      id: "recta-real",
      type: "slide",
      help: [
        {
          label: "Un punto, un número",
          message: "A cada punto de la recta le corresponde **exactamente un** número real y a cada real un punto. Por eso se llama **recta real**.",
        },
        {
          label: "Con regla y compás",
          message: "Algunos irracionales se construyen: $\\sqrt{2}$ es la hipotenusa de un triángulo de catetos $1$ y $1$.",
        },
      ],
      title: "La recta real: ni un hueco",
      blocks: [
        {
          kind: "text",
          text: "Con racionales la recta tiene «huecos» (los puntos irracionales). Con los **reales no queda ninguno**: a cada punto le corresponde un número real y viceversa.",
        },
        {
          kind: "example",
          title: "Situar $\\sqrt{2}$",
          lines: [
            { math: "\\sqrt{2} = \\sqrt{1^2 + 1^2}", note: "hipotenusa de un triángulo de catetos 1 y 1" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "raiz-en-recta", params: { a: 2 } },
    },
    {
      id: "raiz-cinco",
      type: "slide",
      help: [
        {
          label: "Otros radicandos",
          message: "Basta descomponer el radicando en suma de dos cuadrados: $5 = 2^2 + 1^2$, $10 = 3^2 + 1^2$, $13 = 3^2 + 2^2$.",
        },
      ],
      title: "Y √5, √10, √13…",
      blocks: [
        {
          kind: "text",
          text: "Para situar $\\sqrt{a}$ con regla y compás, se escribe $a$ como **suma de dos cuadrados** y se construye el triángulo rectángulo con esos catetos.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{5} = \\sqrt{2^2 + 1^2}" },
            { math: "\\sqrt{10} = \\sqrt{3^2 + 1^2}" },
            { math: "\\sqrt{13} = \\sqrt{3^2 + 2^2}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "raiz-en-recta", params: { a: 5 } },
    },
    {
      id: "recta-3",
      type: "number_line_pick",
      help: [
        {
          label: "Aproxima",
          message: "$\\sqrt{3}$ está entre $\\sqrt{1} = 1$ y $\\sqrt{4} = 2$; como $1{,}7^2 = 2{,}89$ y $1{,}8^2 = 3{,}24$, vale unos $1{,}73$.",
        },
      ],
      title: "Coloca √3",
      question: "Marca en la recta, aproximadamente, el número $\\sqrt{3}$.",
      min: 0,
      max: 3,
      subdivisions: 10,
      target: 1.732,
      readout: "decimal",
    },
    {
      id: "recta-5",
      type: "number_line_pick",
      help: [
        {
          label: "Negativo",
          message: "$\\sqrt{5} \\approx 2{,}24$ (porque $2{,}2^2 = 4{,}84$ y $2{,}3^2 = 5{,}29$). Su opuesto está al otro lado del $0$.",
        },
      ],
      title: "Coloca −√5",
      question: "Marca en la recta, aproximadamente, el número $-\\sqrt{5}$.",
      min: -4,
      max: 0,
      subdivisions: 10,
      target: -2.236,
      readout: "decimal",
    },
    {
      id: "check-orden",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Pasa a decimal",
          message: "$\\sqrt{3} \\approx 1{,}732$; $\\frac{7}{4} = 1{,}75$; $1{,}\\overline{7} = 1{,}777\\ldots$ Compáralos.",
        },
      ],
      title: "Ordenar reales",
      question: "Ordena de menor a mayor: $\\sqrt{3},\\ \\dfrac{7}{4},\\ 1{,}\\overline{7}$.",
      choices: [
        { id: "a", label: "$\\sqrt{3} < \\dfrac{7}{4} < 1{,}\\overline{7}$" },
        { id: "b", label: "$\\dfrac{7}{4} < \\sqrt{3} < 1{,}\\overline{7}$", incorrectFeedback: "$\\frac{7}{4} = 1{,}75$ y $\\sqrt{3} \\approx 1{,}732$: $\\sqrt{3}$ es menor." },
        { id: "c", label: "$1{,}\\overline{7} < \\dfrac{7}{4} < \\sqrt{3}$", incorrectFeedback: "$1{,}\\overline{7} = 1{,}777\\ldots$ es el mayor de los tres." },
        { id: "d", label: "$\\sqrt{3} < 1{,}\\overline{7} < \\dfrac{7}{4}$", incorrectFeedback: "$1{,}75 < 1{,}777\\ldots$, así que $\\frac{7}{4}$ va antes que $1{,}\\overline{7}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{3} \\approx 1{,}732 < 1{,}75 < 1{,}777\\ldots$",
    },
  ],
};
