import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const poliedrosSemirregulares3esoLesson: InteractiveLesson = {
  slug: "poliedros-semirregulares-3eso",
  title: "2. Poliedros semirregulares y truncamientos",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "semirregulares",
      type: "slide",
      help: [
        {
          label: "Diferencia con regulares",
          message: "En un regular todas las caras son iguales; en un semirregular hay dos o más tipos de polígonos regulares, pero cada vértice los combina igual.",
        },
        {
          label: "Aristas iguales",
          message: "Todas las aristas de un semirregular miden lo mismo: cada arista une dos polígonos regulares del mismo lado.",
        },
      ],
      title: "Poliedros semirregulares",
      blocks: [
        {
          kind: "definition",
          text: "Un poliedro es **semirregular** cuando sus caras son polígonos regulares de **dos o más tipos** y en **todos los vértices** concurren los **mismos polígonos**.",
        },
        {
          kind: "example",
          title: "Dos ejemplos",
          lines: [
            { math: "\\text{Prisma pentagonal regular con caras laterales cuadradas}" },
            { math: "\\text{Antiprisma hexagonal: en cada vértice, un hexágono y tres triángulos}" },
          ],
        },
        {
          kind: "text",
          text: "Arquímedes estudió trece de estos poliedros, los **sólidos arquimedianos**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "truncar",
      type: "slide",
      help: [
        {
          label: "Truncar",
          message: "Truncar es cortar un vértice con un plano; si se hace en todos, cada vértice se sustituye por una cara nueva.",
        },
        {
          label: "Puntos medios",
          message: "Cortando por los puntos medios de las aristas, las caras originales quedan como polígonos del mismo número de lados y las nuevas son del tipo del vértice.",
        },
      ],
      title: "Truncar un poliedro regular",
      blocks: [
        {
          kind: "example",
          title: "Cubo truncado por los puntos medios de las aristas: cuboctaedro",
          lines: [
            { math: "6 \\text{ caras cuadradas (una por cada cara del cubo)}" },
            { math: "8 \\text{ caras triangulares (una por cada vértice cortado)}" },
            { math: "c = 14,\\ v = 12,\\ a = 24:\\quad 14 + 12 = 24 + 2 \\ \\checkmark" },
          ],
        },
        {
          kind: "text",
          text: "Si se truncan **dejando parte de las aristas**, las caras cuadradas pasan a **octógonos**: sale el **cubo truncado** (6 octógonos y 8 triángulos).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "otros",
      type: "slide",
      help: [
        {
          label: "Tetraedro",
          message: "Al truncar un tetraedro por los puntos medios, se obtiene un octaedro regular.",
        },
        {
          label: "Dualidad",
          message: "Truncar un poliedro y su dual por los puntos medios da la misma figura: el cubo y el octaedro dan el cuboctaedro.",
        },
      ],
      title: "Más truncamientos",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{Tetraedro} \\to \\text{octaedro}", label: "truncado por puntos medios" },
            { tex: "\\text{Octaedro} \\to \\text{cuboctaedro}", label: "igual que el cubo (duales)" },
            { tex: "\\text{Dodecaedro e icosaedro} \\to \\text{icosidodecaedro}", label: "igual figura (duales)" },
          ],
        },
        {
          kind: "example",
          title: "Tetraedro truncado (cortando a un tercio de las aristas)",
          lines: [
            { math: "4 \\text{ hexágonos} + 4 \\text{ triángulos}:\\ c = 8,\\ v = 12,\\ a = 18" },
            { math: "8 + 12 = 18 + 2 \\ \\checkmark" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-cubocta",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Suma",
          message: "$6$ cuadrados más $8$ triángulos.",
        },
      ],
      title: "Caras del cuboctaedro",
      question: "¿Cuántas caras tiene un cuboctaedro? (solo el número)",
      correctAnswers: ["14"],
      explanation: "$6$ cuadrados y $8$ triángulos: $14$ caras.",
    },
    {
      id: "check-aristas",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Euler",
          message: "$a = c + v - 2$ con $c = 14$ y $v = 24$ (cubo truncado: $6$ octógonos y $8$ triángulos).",
        },
      ],
      title: "Aristas del cubo truncado",
      question: "El cubo truncado tiene $14$ caras ($6$ octógonos y $8$ triángulos) y $24$ vértices. ¿Cuántas aristas tiene? (solo el número)",
      correctAnswers: ["36"],
      explanation: "$a = 14 + 24 - 2 = 36$. (Comprobación: $\\frac{6 \\cdot 8 + 8 \\cdot 3}{2} = 36$.)",
    },
    {
      id: "check-tetra",
      type: "predict",
      help: [
        {
          label: "Mitad de la arista",
          message: "Cortando justo por los puntos medios de las aristas, las cuatro caras triangulares originales quedan como triángulos y los cortes forman otros cuatro triángulos.",
        },
      ],
      title: "Truncar un tetraedro",
      question: "Al truncar un tetraedro regular por los puntos medios de sus aristas se obtiene un poliedro regular. ¿Cuál?",
      mode: "choice",
      choices: [
        { id: "oct", label: "El octaedro" },
        { id: "cub", label: "El cubo", incorrectFeedback: "El cubo tiene caras cuadradas y aquí solo hay triángulos." },
        { id: "ico", label: "El icosaedro", incorrectFeedback: "El icosaedro tiene $20$ caras; aquí hay $8$ (4 + 4 triángulos)." },
      ],
      correctChoiceId: "oct",
      shuffleChoices: true,
      explanation: "Quedan $4$ triángulos de las caras originales y $4$ de los vértices cortados: $8$ triángulos iguales, el octaedro.",
    },
  ],
};
