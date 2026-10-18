import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuerposGeometricosPiramidesLesson: InteractiveLesson = {
  slug: "cuerpos-geometricos-piramides",
  title: "3. Pirámides",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  steps: [
    {
      id: "concepto",
      type: "concept",
      title: "Concepto de pirámide",
      content: [
        "Una **pirámide** es un poliedro con **una base** (cualquier polígono) y caras laterales que son **triángulos** con un vértice común, la **cúspide**.",
        "Se nombran por la base: pirámide triangular, cuadrangular, pentagonal…",
        "El **desarrollo** muestra la base y los triángulos laterales dispuestos alrededor.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Elementos",
          items: [
            { title: "Base", caption: "Polígono inferior.", tone: "cobalt" },
            { title: "Caras laterales", caption: "Triángulos que llegan a la cúspide.", tone: "emerald" },
            { title: "Cúspide", caption: "Vértice donde concurren los triángulos.", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "conteo",
      type: "concept",
      title: "Caras, vértices y aristas",
      content: [
        "Si la base es un polígono de $n$ lados: **caras** $= n + 1$ (base + $n$ triángulos).",
        "**Vértices** $= n + 1$ ($n$ en la base + la cúspide).",
        "**Aristas** $= 2n$ ($n$ en la base + $n$ que suben a la cúspide).",
      ],
    },
    {
      id: "check-cuadrangular",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cómo me imagino la pirámide?",
          message: "Una base en el suelo y una punta arriba. De cada lado de la base sube una cara hasta la punta.",
          branches: [
            {
              label: "¿Qué forma tienen esas caras?",
              message: "Son triángulos, uno por cada lado de la base. ¿Cuántos lados tiene un cuadrado?",
            },
          ],
        },
        {
          label: "Generalízalo",
          message: "Con base triangular (tetraedro): $3$ laterales y la base. ¿Qué regla sale para $n$ lados?",
          math: ["n \\text{ lados} \\;\\Rightarrow\\; ?\\ \\text{caras}"],
        },
      ],
      title: "Pirámide cuadrangular",
      question: "¿Cuántas caras tiene en total una pirámide cuadrangular? (solo el número)",
      correctAnswers: ["5"],
      hint: "Cuenta la base y los triángulos laterales: hay uno por cada lado de la base.",
      explanation: "Base cuadrada + $4$ triángulos laterales $= 5$ caras ($n + 1$ con $n = 4$).",
    },
    {
      id: "check-vs-prisma",
      type: "classify",
      help: [
        {
          label: "¿Cómo los distingo?",
          message: "Hazte tres preguntas: ¿cuántas bases tiene? ¿Las caras laterales son triángulos o paralelogramos? ¿Hay un punto donde todas se juntan?",
        },
        {
          label: "Mira el conteo",
          message: "Con base de $n$ lados: la pirámide tiene $n + 1$ caras y $2n$ aristas; el prisma, $n + 2$ caras y $3n$ aristas. Si una tarjeta da un número, prueba con $n = 3$.",
        },
      ],
      title: "Diferencia con el prisma",
      question: "¿Cada característica es de la pirámide o del prisma?",
      groups: [
        { id: "piramide", label: "Pirámide", tone: "amber" },
        { id: "prisma", label: "Prisma", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Una cúspide común a las caras laterales", group: "piramide" },
        { id: "b", text: "Caras laterales triangulares", group: "piramide" },
        { id: "c", text: "Una sola base", group: "piramide" },
        { id: "d", text: "Dos bases iguales y paralelas", group: "prisma" },
        { id: "e", text: "Caras laterales paralelogramos", group: "prisma" },
        { id: "f", text: "Aristas $= 3n$", group: "prisma" },
      ],
      hint: "Imagina una pirámide de Egipto y una caja de zapatos: ¿cuántas bases tiene cada una y qué forma tienen sus caras laterales?",
      explanation:
        "En la pirámide las caras laterales son triángulos que se unen en la cúspide y hay una sola base ($2n$ aristas). El prisma tiene dos bases iguales y paralelas unidas por paralelogramos ($3n$ aristas).",
    },
    {
      id: "aristas-hexagonal",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué aristas hay?",
          message: "Las de la base y las que suben hasta la punta: dos grupos.",
          math: ["\\text{aristas de la base} + \\text{aristas laterales}"],
        },
        {
          label: "Hazlo primero con una cuadrangular",
          message: "Base cuadrada: $4$ aristas en la base y $4$ que suben. ¿Qué cambia si la base tiene $6$ lados?",
        },
      ],
      title: "Pirámide hexagonal",
      question: "¿Cuántas aristas tiene una pirámide hexagonal? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$2n = 2 \\cdot 6 = 12$ aristas.",
    },
    {
      id: "vertices-pentagonal",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Dónde están los vértices?",
          message: "En cada esquina de la base, más uno más en la punta.",
        },
        {
          label: "Compruébalo con Euler",
          message: "Si conoces las caras ($n + 1$) y las aristas ($2n$), la fórmula de Euler te da los vértices.",
          math: ["C + V = A + 2"],
        },
      ],
      title: "Vértices",
      question: "¿Cuántos vértices tiene una pirámide pentagonal? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$n + 1 = 5 + 1 = 6$ vértices.",
    },
  ],
};
