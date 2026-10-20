import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const monomios2esoLesson: InteractiveLesson = {
  slug: "monomios-2eso",
  title: "2. Monomios",
  subtitle: TEMA_2ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "Coeficiente y letras",
          message: "En $-3x^2y$, el número es $-3$ (coeficiente) y lo demás, $x^2y$, es la parte literal.",
        },
        {
          label: "Grado",
          message: "Se suman los exponentes de las letras: $x^2y = x^2y^1$, así que $2 + 1 = 3$.",
        },
      ],
      title: "Partes de un monomio",
      blocks: [
        {
          kind: "definition",
          text: "Un **monomio** es el producto de un número conocido, el **coeficiente**, por una o varias letras, la **parte literal**.",
        },
        {
          kind: "rule",
          title: "Grado",
          text: "El **grado** de un monomio es la **suma de los exponentes** de su parte literal.",
        },
        {
          kind: "example",
          lines: [
            { math: "-3x^2y", note: "coeficiente $-3$, literal $x^2y$, grado $3$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "monomio-partes" },
    },
    {
      id: "escritura",
      type: "slide",
      help: [
        {
          label: "Por qué se omiten",
          message: "Son convenios de escritura para no recargar: $1 \\cdot x^1 \\cdot y^1$ se escribe $xy$.",
        },
      ],
      title: "Cómo se escribe un monomio",
      blocks: [
        {
          kind: "steps",
          items: [
            "El coeficiente **$1$ no se escribe**: $1x = x$.",
            "El exponente **$1$ no se indica**: $x^1 = x$.",
            "El signo de **producto no se escribe** entre números y letras ni entre letras: $3 \\cdot x \\cdot y = 3xy$.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "semejantes",
      type: "slide",
      help: [
        {
          label: "Misma parte literal",
          message: "Deben tener las mismas letras con los mismos exponentes: $2x$ y $5x$ sí; $2x$ y $5x^2$ no.",
        },
        {
          label: "Como agrupar objetos",
          message: "$2x + 5x$ son dos «x» y cinco «x»: siete «x». Pero $4a + 3b$ son cosas distintas que no se agrupan.",
        },
      ],
      title: "Monomios semejantes y su suma",
      blocks: [
        {
          kind: "definition",
          text: "Dos monomios son **semejantes** cuando tienen la **misma parte literal**.",
        },
        {
          kind: "rule",
          text: "Solo se pueden sumar o restar monomios semejantes: se suman los **coeficientes** y se deja la **parte literal**. Si no son semejantes, la operación se **deja indicada**.",
        },
        {
          kind: "example",
          lines: [
            { math: "2x + 5x = 7x" },
            { math: "4a + 3b", note: "no semejantes: queda indicada" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "semejantes-agrupar", params: { a: 3, b: 2, c: 2 } },
    },
    {
      id: "check-semejantes",
      type: "classify",
      help: [
        {
          label: "Compara las letras",
          message: "Mira la parte literal completa, con los exponentes: $x^2y$ no es lo mismo que $xy^2$.",
        },
      ],
      title: "Semejantes a $3x^2y$",
      question: "Decide si cada monomio es semejante a $3x^2y$.",
      groups: [
        { id: "si", label: "Semejante", tone: "cobalt" },
        { id: "no", label: "No semejante", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$-5x^2y$", group: "si" },
        { id: "b", text: "$\\frac{1}{2}x^2y$", group: "si" },
        { id: "c", text: "$3xy^2$", group: "no" },
        { id: "d", text: "$3x^2$", group: "no" },
        { id: "e", text: "$x^2y$", group: "si" },
      ],
      explanation: "Es semejante el que tiene exactamente $x^2y$ como parte literal. $xy^2$ y $x^2$ tienen otras letras o exponentes.",
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Coeficientes con coeficientes",
          message: "$(2x^2)(3x^3)$: $2 \\cdot 3 = 6$ y $x^2 \\cdot x^3 = x^5$.",
        },
        {
          label: "Signos",
          message: "Se aplica la regla de los signos: $(5x)(-3x^2) = -15x^3$.",
        },
      ],
      title: "Producto de monomios",
      blocks: [
        {
          kind: "rule",
          text: "El producto de dos monomios es **otro monomio**: se multiplican los coeficientes y las partes literales (se **suman** los exponentes de la misma letra).",
        },
        {
          kind: "example",
          lines: [
            { math: "(2x^2) \\cdot (3x^3) = 6x^5" },
            { math: "(5x) \\cdot (-3x^2) = -15x^3" },
          ],
        },
        {
          kind: "text",
          text: "El grado del producto es la **suma de los grados** de los factores.",
        },
      ],
      visual: { kind: "anim", scene: "monomio-producto", params: { a: 2, b: 3, c: 2, d: 3 } },
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "Coeficientes aparte",
          message: "Se dividen los coeficientes por un lado y las letras por otro: $(6x^3) : (2x) = 3x^2$.",
        },
        {
          label: "Tres resultados posibles",
          message: "Puede salir un número ($\\frac{2a^2b}{3a^2b} = \\frac{2}{3}$), un monomio ($5x$) o una fracción algebraica ($\\frac{a}{3b}$).",
        },
      ],
      title: "Cociente de monomios",
      blocks: [
        {
          kind: "rule",
          text: "Se **dividen los coeficientes** por un lado y las **partes literales** por otro (se **restan** los exponentes de la misma letra).",
        },
        {
          kind: "example",
          lines: [
            { math: "(15x^4) : (3x^3) = 5x" },
            { math: "(2ab) : (6b^2) = \\dfrac{a}{3b}", note: "queda una fracción algebraica" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "monomio-cociente", params: { a: 6, b: 2, c: 3, d: 1 } },
    },
    {
      id: "check-producto",
      type: "predict",
      help: [
        {
          label: "Por separado",
          message: "Coeficientes: $4 \\cdot (-2)$. Letras: $x^3 \\cdot x$ y $y \\cdot y^2$.",
        },
      ],
      title: "Multiplica",
      question: "¿Cuánto vale $(4x^3y) \\cdot (-2xy^2)$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$-8x^4y^3$" },
        { id: "b", label: "$-8x^3y^2$", incorrectFeedback: "Los exponentes de la misma letra se suman, no se multiplican ni se dejan." },
        { id: "c", label: "$2x^4y^3$", incorrectFeedback: "Los coeficientes se multiplican: $4 \\cdot (-2) = -8$." },
        { id: "d", label: "$-8x^4y^2$", incorrectFeedback: "Para la $y$: $y^1 \\cdot y^2 = y^3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$4 \\cdot (-2) = -8$; $x^3 \\cdot x = x^4$; $y \\cdot y^2 = y^3$. Resultado: $-8x^4y^3$.",
    },
    {
      id: "check-grado",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma de exponentes",
          message: "$5a^2b^3$: $2 + 3$.",
        },
      ],
      title: "Grado",
      question: "¿Cuál es el grado de $5a^2b^3$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "El grado es la suma de los exponentes: $2 + 3 = 5$.",
    },
  ],
};
