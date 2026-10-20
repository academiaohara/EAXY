import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const poliedros3esoLesson: InteractiveLesson = {
  slug: "poliedros-3eso",
  title: "1. Poliedros: prismas, pirámides y poliedros regulares",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "prismas-piramides",
      type: "slide",
      help: [
        {
          label: "Elementos",
          message: "Un poliedro tiene caras (polígonos), aristas (donde se unen dos caras) y vértices (donde se unen varias aristas).",
        },
        {
          label: "Regular",
          message: "Un prisma regular tiene por base un polígono regular y las caras laterales son rectángulos.",
        },
      ],
      title: "Prismas y pirámides",
      blocks: [
        {
          kind: "definition",
          text: "Los cuerpos limitados por **polígonos** se llaman **poliedros**. Tienen **caras**, **aristas** y **vértices**.",
        },
        {
          kind: "compare",
          left: { title: "Prisma", text: "Dos **bases** iguales y paralelas y caras laterales que son paralelogramos. Si todas las caras son rectángulos: **ortoedro**.", tone: "ok" },
          right: { title: "Pirámide", text: "Una **base** poligonal y caras laterales triangulares que se juntan en el **vértice**. Es regular si la base lo es y el vértice se proyecta en el centro.", tone: "info" },
        },
        {
          kind: "facts",
          items: [
            { tex: "n + 2,\\ 2n,\\ 3n", label: "prisma de base de n lados: caras, vértices, aristas" },
            { tex: "n + 1,\\ n + 1,\\ 2n", label: "pirámide: caras, vértices, aristas" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "prisma-elementos" },
    },
    {
      id: "regulares",
      type: "slide",
      help: [
        {
          label: "Las dos condiciones",
          message: "Un poliedro con caras idénticas pero distinto número de caras en cada vértice no es regular.",
        },
        {
          label: "Solo cinco",
          message: "Con polígonos regulares idénticos y las mismas caras en cada vértice solo se pueden construir cinco poliedros: los sólidos platónicos.",
        },
      ],
      title: "Poliedros regulares (sólidos platónicos)",
      blocks: [
        {
          kind: "definition",
          text: "Un poliedro es **regular** cuando sus caras son **polígonos regulares idénticos** y en **cada vértice** concurren el **mismo número de caras**. Solo hay cinco.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{Tetraedro}", label: "4 caras, triángulos" },
            { tex: "\\text{Cubo}", label: "6 caras, cuadrados" },
            { tex: "\\text{Octaedro}", label: "8 caras, triángulos" },
            { tex: "\\text{Dodecaedro}", label: "12 caras, pentágonos" },
            { tex: "\\text{Icosaedro}", label: "20 caras, triángulos" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "poliedros-regulares" },
    },
    {
      id: "duales",
      type: "slide",
      help: [
        {
          label: "Centros de las caras",
          message: "Si unes los centros de las caras contiguas de un cubo, los seis puntos son los vértices de un octaedro.",
        },
        {
          label: "Euler",
          message: "En cualquier poliedro convexo: caras + vértices = aristas + 2.",
        },
      ],
      title: "Poliedros duales y fórmula de Euler",
      blocks: [
        {
          kind: "text",
          text: "El **cubo** y el **octaedro** son **duales**: el número de caras de uno es el de vértices del otro, y tienen las mismas aristas.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{Cubo: } c = 6,\\ v = 8,\\ a = 12 \\qquad \\text{Octaedro: } c = 8,\\ v = 6,\\ a = 12" },
          ],
        },
        {
          kind: "rule",
          title: "Fórmula de Euler",
          text: "En todo poliedro convexo:",
          formula: "c + v = a + 2",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{Dodecaedro: } 12 + 20 = 30 + 2 \\quad\\checkmark" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-prisma",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "n + 2",
          message: "Un prisma de base de $n$ lados tiene $n$ caras laterales más $2$ bases.",
        },
      ],
      title: "Caras de un prisma",
      question: "¿Cuántas caras tiene un prisma hexagonal? (solo el número)",
      correctAnswers: ["8"],
      explanation: "$6$ caras laterales y $2$ bases: $8$ caras.",
    },
    {
      id: "check-piramide",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "2n",
          message: "Una pirámide de base con $n$ lados tiene $n$ aristas en la base y $n$ aristas laterales.",
        },
      ],
      title: "Aristas de una pirámide",
      question: "¿Cuántas aristas tiene una pirámide de base pentagonal? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$5$ en la base y $5$ laterales: $10$ aristas.",
    },
    {
      id: "check-euler",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Despeja",
          message: "$a = c + v - 2$.",
        },
      ],
      title: "Fórmula de Euler",
      question: "El icosaedro tiene $20$ caras y $12$ vértices. ¿Cuántas aristas tiene? (solo el número)",
      correctAnswers: ["30"],
      explanation: "$a = c + v - 2 = 20 + 12 - 2 = 30$.",
    },
    {
      id: "check-dual",
      type: "predict",
      help: [
        {
          label: "Cambian caras y vértices",
          message: "En un dual, las caras de uno son los vértices del otro: el dodecaedro tiene $12$ caras y $20$ vértices.",
        },
      ],
      title: "Poliedro dual",
      question: "El dodecaedro tiene $12$ caras y $20$ vértices. ¿Cuál es su poliedro dual?",
      mode: "choice",
      choices: [
        { id: "ico", label: "El icosaedro ($20$ caras y $12$ vértices)" },
        { id: "cub", label: "El cubo", incorrectFeedback: "El cubo tiene $6$ caras y $8$ vértices; es dual del octaedro." },
        { id: "tet", label: "El tetraedro", incorrectFeedback: "El tetraedro es dual de sí mismo." },
      ],
      correctChoiceId: "ico",
      shuffleChoices: true,
      explanation: "Las caras del icosaedro ($20$) son los vértices del dodecaedro, y viceversa.",
    },
  ],
};
