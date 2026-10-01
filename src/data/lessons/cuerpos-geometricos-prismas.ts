import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuerposGeometricosPrismasLesson: InteractiveLesson = {
  slug: "cuerpos-geometricos-prismas",
  title: "2. Prismas",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  steps: [
    {
      id: "concepto",
      type: "concept",
      title: "Concepto de prisma",
      content: [
        "Un **prisma** es un poliedro con **dos bases** paralelas e **iguales** y caras laterales que son **paralelogramos**.",
        "Se **nombran** según el polígono de la base: prisma triangular, cuadrangular, pentagonal, hexagonal…",
        "Su **desarrollo** está formado por las dos bases y un «cinturón» de paralelogramos.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Elementos principales",
          items: [
            { title: "Bases", caption: "Dos caras iguales y paralelas.", tone: "cobalt" },
            { title: "Caras laterales", caption: "Paralelogramos entre las bases.", tone: "emerald" },
            { title: "Aristas", caption: "Unen vértices de una base con la otra.", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "tipos",
      type: "concept",
      title: "Tipos de prismas",
      content: [
        "Si la base es un **triángulo**, es un **prisma triangular** ($5$ caras: $2$ triángulos + $3$ paralelogramos).",
        "Si la base es un **cuadrado**, es un **prisma cuadrangular** (como una caja de zapatos).",
        "En un prisma de base $n$-ágona: **caras** $= n + 2$, **vértices** $= 2n$, **aristas** $= 3n$.",
      ],
    },
    {
      id: "check-es-prisma",
      type: "multiple_choice",
      title: "¿Es un prisma?",
      question:
        "¿Cuál de estas descripciones corresponde siempre a un prisma?",
      options: [
        { id: "a", text: "Tiene una base y caras laterales triangulares que se unen en un vértice." },
        { id: "b", text: "Tiene dos bases iguales y paralelas y caras laterales paralelogramos." },
        { id: "c", text: "Todas sus caras son triángulos equiláteros." },
      ],
      correctOptionId: "b",
      explanation: "Esa es la definición de prisma; la opción a describe una pirámide.",
    },
    {
      id: "check-pentagonal",
      type: "multiple_choice",
      title: "Prisma pentagonal",
      question: "Un prisma pentagonal tiene base pentagonal. ¿Cuántas caras tiene en total?",
      options: [
        { id: "a", text: "$5$" },
        { id: "b", text: "$6$" },
        { id: "c", text: "$7$" },
        { id: "d", text: "$10$" },
      ],
      correctOptionId: "c",
      explanation: "$2$ bases + $5$ laterales $= 7$ caras ($n + 2$ con $n = 5$).",
    },
    {
      id: "aristas-triangular",
      type: "fill_in_blank",
      title: "Conteo en el prisma triangular",
      question: "¿Cuántas aristas tiene un prisma triangular? (solo el número)",
      correctAnswers: ["9"],
      explanation: "Con $n = 3$: $3n = 9$ aristas.",
    },
    {
      id: "vertices-hexagonal",
      type: "fill_in_blank",
      title: "Vértices del prisma hexagonal",
      question: "¿Cuántos vértices tiene un prisma hexagonal? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$2n = 2 \\cdot 6 = 12$ vértices.",
    },
  ],
};
