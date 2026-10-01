import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuerposGeometricosPoliedrosLesson: InteractiveLesson = {
  slug: "cuerpos-geometricos-poliedros",
  title: "1. Elementos del poliedro y poliedros regulares",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Qué es un poliedro",
      content: [
        "Un **poliedro** es un cuerpo geométrico limitado por **caras** en forma de polígonos.",
        "Sus **elementos** son: **caras** (polígonos que lo limitan), **aristas** (lados comunes a dos caras) y **vértices** (puntos donde se unen tres o más caras).",
        "Si **desplegamos** la superficie sobre un plano obtenemos el **desarrollo** del poliedro, útil para construirlo con cartón.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Ejemplo: cubo",
          items: [
            { title: "Caras", math: "6", caption: "Cuadrados.", tone: "cobalt" },
            { title: "Aristas", math: "12", caption: "Segmentos entre vértices.", tone: "emerald" },
            { title: "Vértices", math: "8", caption: "Esquinas del cubo.", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "regulares",
      type: "concept",
      title: "Poliedros regulares",
      content: [
        "Un **poliedro regular** tiene caras que son **polígonos regulares iguales** y el mismo número de aristas en cada vértice.",
        "Solo existen **cinco** poliedros regulares (los sólidos platónicos).",
        "Un **dado de parchís** es un hexaedro regular (cubo): seis caras cuadradas iguales.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Los cinco poliedros regulares",
          items: [
            { title: "Tetraedro", math: "4", caption: "Triángulos equiláteros.", tone: "cobalt" },
            { title: "Hexaedro (cubo)", math: "6", caption: "Cuadrados.", tone: "emerald" },
            { title: "Octaedro", math: "8", caption: "Triángulos equiláteros.", tone: "violet" },
            { title: "Dodecaedro", math: "12", caption: "Pentágonos regulares.", tone: "amber" },
            { title: "Icosaedro", math: "20", caption: "Triángulos equiláteros.", tone: "rose" },
          ],
        },
      ],
    },
    {
      id: "euler",
      type: "concept",
      title: "Fórmula de Euler",
      content: [
        "En la mayoría de los poliedros (sin agujeros) se cumple la **fórmula de Euler**:",
        "Si $C$ es el número de caras, $V$ el de vértices y $A$ el de aristas, entonces $C + V = A + 2$.",
        "Por ejemplo, en el cubo: $6 + 8 = 12 + 2 = 14$.",
      ],
      math: ["C + V = A + 2"],
    },
    {
      id: "check-cubo",
      type: "multiple_choice",
      title: "Elementos del cubo",
      question: "¿Cuántas aristas tiene un cubo?",
      options: [
        { id: "a", text: "$6$" },
        { id: "b", text: "$8$" },
        { id: "c", text: "$12$" },
        { id: "d", text: "$20$" },
      ],
      correctOptionId: "c",
      explanation: "El hexaedro regular (cubo) tiene $12$ aristas.",
    },
    {
      id: "check-tetraedro",
      type: "multiple_choice",
      title: "Poliedros regulares",
      question: "¿Qué poliedro regular tiene exactamente $4$ caras triangulares?",
      options: [
        { id: "a", text: "Octaedro" },
        { id: "b", text: "Tetraedro" },
        { id: "c", text: "Icosaedro" },
        { id: "d", text: "Dodecaedro" },
      ],
      correctOptionId: "b",
      explanation: "El tetraedro es el poliedro regular con $4$ caras (triángulos equiláteros).",
    },
    {
      id: "check-vf",
      type: "multiple_choice",
      title: "Verdadero o falso (act. 10)",
      question: "«En cualquier poliedro, sus caras son iguales.» ¿Es verdadera?",
      options: [
        { id: "a", text: "Verdadera" },
        { id: "b", text: "Falsa" },
      ],
      correctOptionId: "b",
      explanation:
        "Solo los poliedros **regulares** tienen caras iguales; un prisma triangular no tiene todas las caras iguales.",
    },
    {
      id: "euler-fill",
      type: "fill_in_blank",
      title: "Fórmula de Euler en el octaedro",
      question:
        "Un octaedro tiene $8$ caras, $6$ vértices y $12$ aristas. ¿Cuánto es $C + V$? (solo el número)",
      correctAnswers: ["14"],
      explanation: "$8 + 6 = 14$, y también $12 + 2 = 14$ (Euler).",
    },
    {
      id: "caras-icosaedro",
      type: "fill_in_blank",
      title: "Identificar el poliedro (act. 7)",
      question: "¿Cuántas caras tiene el icosaedro regular? (solo el número)",
      correctAnswers: ["20"],
      explanation: "El icosaedro tiene $20$ caras triangulares equiláteras.",
    },
  ],
};
