import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuerposGeometricosPrismasLesson: InteractiveLesson = {
  slug: "cuerpos-geometricos-prismas",
  title: "6. Prismas",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "Imagina una caja de zapatos",
          message: "Dos bases iguales (tapa y fondo) y paredes que son paralelogramos.",
        },
        {
          label: "Cómo se nombran",
          message: "Por la forma de la base: triangular, cuadrangular, pentagonal…",
        },
        {
          label: "El desarrollo",
          message: "Las dos bases más un «cinturón» de rectángulos o paralelogramos unidos.",
        },
      ],
      title: "Concepto de prisma",
      blocks: [
        {
          kind: "definition",
          text: "Un **prisma** es un poliedro limitado por dos polígonos iguales y paralelos, las **bases**, y varios paralelogramos, las **caras laterales**.",
        },
        {
          kind: "text",
          text: "Se nombra por el polígono de la base: prisma triangular, cuadrangular, pentagonal… Su **desarrollo** son las dos bases y un «cinturón» de paralelogramos.",
        },
      ],
      visual: { kind: "anim", scene: "prisma-elementos", beatMs: 3200 },
    },
    {
      id: "tipos",
      type: "slide",
      help: [
        {
          label: "De dónde salen las fórmulas",
          message: "Caras: $n$ laterales más $2$ bases. Vértices: $n$ arriba y $n$ abajo. Aristas: $n$ arriba, $n$ abajo y $n$ verticales.",
        },
        {
          label: "Compruébalo con el cubo",
          message: "Con $n = 4$: $6$ caras, $8$ vértices y $12$ aristas.",
          math: ["n + 2 = 6 \\qquad 2n = 8 \\qquad 3n = 12"],
        },
      ],
      title: "Tipos de prismas y su recuento",
      blocks: [
        {
          kind: "text",
          text: "Los prismas cuyas caras son todas **rectángulos** se llaman **ortoedros** (como una caja de zapatos). Si las bases son polígonos regulares y las caras laterales rectángulos, el prisma es **regular**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "C = n + 2", label: "caras" },
            { tex: "V = 2n", label: "vértices" },
            { tex: "A = 3n", label: "aristas" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "poliedro-explorador", params: { n: 5, a: 0 } },
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
