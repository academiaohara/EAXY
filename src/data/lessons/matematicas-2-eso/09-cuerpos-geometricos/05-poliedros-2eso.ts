import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const poliedros2esoLesson: InteractiveLesson = {
  slug: "poliedros-2eso",
  title: "5. Poliedros",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "Todas las caras son polígonos",
          message: "Si alguna cara fuera curva, el cuerpo no sería un poliedro (un cilindro o una esfera no lo son).",
        },
        {
          label: "Poli-edro",
          message: "En griego, «muchas caras».",
        },
      ],
      title: "Poliedros y sus elementos",
      blocks: [
        {
          kind: "definition",
          text: "Los cuerpos geométricos limitados por **polígonos** se llaman **poliedros**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "C", label: "caras: los polígonos" },
            { tex: "A", label: "aristas: los lados" },
            { tex: "V", label: "vértices: las esquinas" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "poliedro-elementos", beatMs: 3200 },
    },
    {
      id: "prisma",
      type: "slide",
      help: [
        {
          label: "Caras laterales",
          message: "Son paralelogramos: si son todas rectángulos, el prisma es recto.",
        },
        {
          label: "Ortoedro",
          message: "Un ortoedro es un prisma recto en el que también las bases son rectángulos: las seis caras son rectángulos (como una caja).",
        },
      ],
      title: "Prismas",
      blocks: [
        {
          kind: "definition",
          text: "Un **prisma** es un poliedro limitado por **dos polígonos iguales y paralelos** (las **bases**) y varios **paralelogramos** (las **caras laterales**).",
        },
        {
          kind: "compare",
          left: { title: "Ortoedro", text: "Prisma cuyas **seis caras** son rectángulos.", tone: "ok" },
          right: { title: "Prisma regular", text: "Bases **polígonos regulares** y caras laterales rectángulos.", tone: "info" },
        },
      ],
      visual: { kind: "anim", scene: "prisma-elementos", beatMs: 3200 },
    },
    {
      id: "piramide",
      type: "slide",
      help: [
        {
          label: "Un vértice común",
          message: "Todas las caras laterales son triángulos que se juntan en un mismo punto, el vértice de la pirámide.",
        },
        {
          label: "Regular",
          message: "Si la base es un polígono regular y el vértice está justo encima del centro, la pirámide es regular y sus caras laterales son triángulos isósceles iguales.",
        },
      ],
      title: "Pirámides",
      blocks: [
        {
          kind: "definition",
          text: "Una **pirámide** tiene por **base** un polígono cualquiera y por **caras laterales** triángulos con un **vértice común**.",
        },
        {
          kind: "text",
          text: "Se llama **cuadrangular**, **pentagonal**… según el polígono de la base. Es **regular** si la base es regular y el vértice se proyecta sobre su centro.",
        },
      ],
      visual: { kind: "anim", scene: "piramide-elementos", beatMs: 3200 },
    },
    {
      id: "regulares",
      type: "slide",
      help: [
        {
          label: "Solo cinco",
          message: "Con polígonos regulares iguales y el mismo número de caras en cada vértice, solo se pueden construir cinco poliedros.",
        },
        {
          label: "Platón",
          message: "Los griegos los relacionaron con los elementos y con el universo: por eso se llaman sólidos platónicos.",
        },
      ],
      title: "Poliedros regulares",
      blocks: [
        {
          kind: "definition",
          text: "Un poliedro es **regular** si todas sus caras son **polígonos regulares idénticos** y en cada vértice **concurre el mismo número de caras**.",
        },
        {
          kind: "text",
          text: "Solo existen cinco: **tetraedro**, **cubo**, **octaedro**, **dodecaedro** e **icosaedro** (los sólidos platónicos).",
        },
      ],
      visual: { kind: "anim", scene: "poliedros-regulares", beatMs: 3200 },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Euler",
          message: "Para cualquier poliedro convexo: $C + V = A + 2$.",
        },
      ],
      title: "Explora prismas y pirámides",
      blocks: [
        {
          kind: "rule",
          title: "Fórmula de Euler",
          text: "En cualquier poliedro convexo, el número de caras más el de vértices es el de aristas más dos.",
          formula: "C + V = A + 2",
        },
      ],
      visual: { kind: "tool", tool: "poliedro-explorador", params: { n: 5, a: 0 }, hint: "Cambia el número de lados de la base y comprueba la fórmula de Euler." },
    },
    {
      id: "check-prisma",
      type: "fill_in_blank",
      help: [
        {
          label: "Caras",
          message: "Un prisma de base con $n$ lados tiene $n$ caras laterales y $2$ bases.",
        },
      ],
      title: "Caras de un prisma",
      question: "¿Cuántas caras tiene un prisma pentagonal? (solo el número)",
      correctAnswers: ["7"],
      explanation: "$5$ caras laterales $+ 2$ bases $= 7$ caras.",
    },
    {
      id: "check-piramide",
      type: "fill_in_blank",
      help: [
        {
          label: "Aristas",
          message: "Una pirámide hexagonal tiene $6$ aristas en la base y $6$ aristas laterales.",
        },
      ],
      title: "Aristas de una pirámide",
      question: "¿Cuántas aristas tiene una pirámide hexagonal? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$6$ aristas de la base $+ 6$ laterales $= 12$.",
    },
    {
      id: "check-euler",
      type: "predict",
      help: [
        {
          label: "Usa Euler",
          message: "$C + V = A + 2$: con $C = 6$ y $V = 8$ calcula $A$.",
        },
      ],
      title: "Las aristas de un cubo",
      question: "Un cubo tiene $6$ caras y $8$ vértices. Según la fórmula de Euler, ¿cuántas aristas tiene?",
      mode: "choice",
      choices: [
        { id: "12", label: "$12$" },
        { id: "14", label: "$14$", incorrectFeedback: "$C + V = 14$; hay que restar $2$: $A = 14 - 2$." },
        { id: "10", label: "$10$", incorrectFeedback: "Has restado $4$; son $2$." },
        { id: "16", label: "$16$", incorrectFeedback: "Has sumado $2$; Euler da $A = C + V - 2$." },
      ],
      correctChoiceId: "12",
      shuffleChoices: true,
      explanation: "$A = C + V - 2 = 6 + 8 - 2 = 12$.",
    },
  ],
};
