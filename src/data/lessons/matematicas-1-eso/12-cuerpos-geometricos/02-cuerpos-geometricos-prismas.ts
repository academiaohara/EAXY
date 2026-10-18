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
      type: "classify",
      help: [
        {
          label: "¿Qué define a un prisma?",
          message: "Dos bases iguales y paralelas, unidas por caras laterales que son paralelogramos. Si no hay dos bases, no es prisma.",
        },
        {
          label: "¿Y la pirámide?",
          message: "Tiene una sola base y caras triangulares que se juntan en un vértice. Compara una caja de zapatos con una tienda de campaña.",
        },
      ],
      title: "¿Es un prisma?",
      question: "Clasifica cada descripción u objeto: ¿es un prisma o una pirámide?",
      groups: [
        { id: "prisma", label: "Prisma", tone: "cobalt" },
        { id: "piramide", label: "Pirámide", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Dos bases iguales y paralelas y caras laterales paralelogramos", group: "prisma" },
        { id: "b", text: "Una caja de zapatos", group: "prisma" },
        { id: "c", text: "Un lápiz hexagonal sin afilar", group: "prisma" },
        { id: "d", text: "Una base y caras laterales triangulares que se unen en un vértice", group: "piramide" },
        { id: "e", text: "Las pirámides de Egipto", group: "piramide" },
        { id: "f", text: "Base hexagonal y seis triángulos laterales con un vértice común", group: "piramide" },
      ],
      hint: "Busca las dos bases iguales y paralelas: si las hay, es un prisma.",
      explanation:
        "Un prisma tiene dos bases iguales y paralelas unidas por paralelogramos (la caja, el lápiz). Si hay una sola base y triángulos que se juntan en un vértice, es una pirámide.",
    },
    {
      id: "check-pentagonal",
      type: "fill_in_blank",
      help: [
        {
          label: "Imagínate el prisma",
          message: "Un pentágono arriba, otro abajo y, alrededor, un rectángulo por cada lado del pentágono.",
          branches: [
            {
              label: "¿Cuántos lados tiene un pentágono?",
              message: "Cinco, como indica «penta». Ese es el número de caras laterales.",
            },
          ],
        },
        {
          label: "Con uno más sencillo",
          message: "Prisma triangular: $2$ triángulos y $3$ rectángulos, $5$ caras. Repite el razonamiento con la base pentagonal.",
        },
      ],
      title: "Prisma pentagonal",
      question:
        "Un prisma pentagonal tiene base pentagonal. ¿Cuántas caras tiene en total? (solo el número)",
      correctAnswers: ["7"],
      hint: "No olvides que el prisma tiene **dos** bases además de las caras laterales.",
      explanation: "$2$ bases + $5$ laterales $= 7$ caras ($n + 2$ con $n = 5$).",
    },
    {
      id: "aristas-triangular",
      type: "fill_in_blank",
      help: [
        {
          label: "Agrúpalas",
          message: "Las del triángulo de arriba, las del de abajo y las verticales que los unen.",
          math: ["\\text{arriba} + \\text{abajo} + \\text{verticales}"],
        },
        {
          label: "Compruébalo con el cubo",
          message: "El cubo es un prisma de base cuadrada y tiene $4 + 4 + 4 = 12$ aristas. ¿Qué regla sale para $n$ lados?",
        },
      ],
      title: "Conteo en el prisma triangular",
      question: "¿Cuántas aristas tiene un prisma triangular? (solo el número)",
      correctAnswers: ["9"],
      explanation: "Con $n = 3$: $3n = 9$ aristas.",
    },
    {
      id: "vertices-hexagonal",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Dónde están los vértices?",
          message: "En las esquinas de las dos bases. En las caras laterales no hay vértices extra.",
        },
        {
          label: "Con un prisma conocido",
          message: "El cubo tiene $8$ vértices: $4$ arriba y $4$ abajo. Aplica la misma idea a una base hexagonal.",
        },
      ],
      title: "Vértices del prisma hexagonal",
      question: "¿Cuántos vértices tiene un prisma hexagonal? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$2n = 2 \\cdot 6 = 12$ vértices.",
    },
  ],
};
