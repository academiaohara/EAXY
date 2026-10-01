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
      type: "multiple_choice",
      title: "Pirámide cuadrangular",
      question: "Una pirámide cuadrangular tiene…",
      options: [
        { id: "a", text: "$4$ caras en total" },
        { id: "b", text: "$5$ caras en total" },
        { id: "c", text: "$6$ caras en total" },
      ],
      correctOptionId: "b",
      explanation: "Base cuadrada + $4$ triángulos laterales $= 5$ caras.",
    },
    {
      id: "check-vs-prisma",
      type: "multiple_choice",
      title: "Diferencia con el prisma",
      question: "¿Qué elemento tiene la pirámide y no el prisma?",
      options: [
        { id: "a", text: "Dos bases iguales" },
        { id: "b", text: "Caras laterales paralelogramos" },
        { id: "c", text: "Una cúspide común a los triángulos laterales" },
      ],
      correctOptionId: "c",
      explanation: "En la pirámide las caras laterales son triángulos que se unen en la cúspide.",
    },
    {
      id: "aristas-hexagonal",
      type: "fill_in_blank",
      title: "Pirámide hexagonal",
      question: "¿Cuántas aristas tiene una pirámide hexagonal? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$2n = 2 \\cdot 6 = 12$ aristas.",
    },
    {
      id: "vertices-pentagonal",
      type: "fill_in_blank",
      title: "Vértices",
      question: "¿Cuántos vértices tiene una pirámide pentagonal? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$n + 1 = 5 + 1 = 6$ vértices.",
    },
  ],
};
