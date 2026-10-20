import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const triangulos2esoLesson: InteractiveLesson = {
  slug: "triangulos-2eso",
  title: "1. Triángulos",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "clasificacion",
      type: "slide",
      help: [
        {
          label: "Siempre hay dos agudos",
          message: "Los tres ángulos suman $180^\\circ$: como máximo uno puede ser recto u obtuso, así que al menos dos son agudos.",
        },
        {
          label: "Dos criterios",
          message: "Un triángulo se clasifica a la vez por sus ángulos y por sus lados: por ejemplo, rectángulo e isósceles.",
        },
      ],
      title: "Clasificación de los triángulos",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Según sus ángulos",
            text: "**Acutángulo**: los tres menores de $90^\\circ$. **Rectángulo**: uno de $90^\\circ$. **Obtusángulo**: uno mayor de $90^\\circ$.",
            tone: "ok",
          },
          right: {
            title: "Según sus lados",
            text: "**Equilátero**: tres lados iguales. **Isósceles**: dos iguales. **Escaleno**: ninguno igual.",
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "triangulos-clasificacion", beatMs: 3200 },
    },
    {
      id: "explora-tipo",
      type: "slide",
      help: [
        {
          label: "Mueve el vértice",
          message: "Al mover el vértice $C$ cambian los lados y los ángulos: observa cómo el triángulo pasa de un tipo a otro.",
        },
      ],
      title: "Explora los tipos",
      blocks: [
        {
          kind: "text",
          text: "El tipo de triángulo depende de la posición del tercer vértice.",
        },
      ],
      visual: { kind: "tool", tool: "triangulo-clasificador", params: { a: 3, b: 4 }, hint: "Mueve el vértice C y observa el nombre del triángulo según lados y según ángulos." },
    },
    {
      id: "mediana",
      type: "slide",
      help: [
        {
          label: "Punto medio",
          message: "La mediana parte el lado opuesto en dos mitades iguales. Hay una por cada vértice.",
        },
        {
          label: "Centro de gravedad",
          message: "El baricentro es el punto donde se equilibraría un triángulo de cartón apoyado en un lápiz.",
        },
      ],
      title: "Medianas y baricentro",
      blocks: [
        {
          kind: "definition",
          text: "Una **mediana** es el segmento que une un vértice con el **punto medio** del lado opuesto. Las tres medianas se cortan en el **baricentro**.",
        },
        {
          kind: "rule",
          text: "El baricentro divide a cada mediana en dos partes: la que va al vértice mide el **doble** que la que va al lado ($2 : 1$).",
        },
      ],
      visual: { kind: "anim", scene: "triangulo-mediana", beatMs: 3000 },
    },
    {
      id: "altura",
      type: "slide",
      help: [
        {
          label: "Perpendicular",
          message: "La altura forma un ángulo de $90^\\circ$ con el lado opuesto, o con su prolongación si el triángulo es obtusángulo.",
        },
        {
          label: "Ortocentro fuera",
          message: "En un triángulo obtusángulo, el ortocentro queda **fuera** del triángulo.",
        },
      ],
      title: "Alturas y ortocentro",
      blocks: [
        {
          kind: "definition",
          text: "Una **altura** es el segmento que va, **perpendicularmente**, desde un vértice al lado opuesto o a su prolongación. Las tres alturas se cortan en el **ortocentro**.",
        },
      ],
      visual: { kind: "anim", scene: "triangulo-altura", beatMs: 3200 },
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Ángulos o lados",
          message: "Aquí se te dan los lados: cuenta cuántos son iguales.",
        },
      ],
      title: "Según sus lados",
      question: "Clasifica cada triángulo según la longitud de sus lados.",
      groups: [
        { id: "equilatero", label: "Equilátero", tone: "emerald" },
        { id: "isosceles", label: "Isósceles", tone: "cobalt" },
        { id: "escaleno", label: "Escaleno", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$5,\\ 5,\\ 5$", group: "equilatero" },
        { id: "b", text: "$4,\\ 4,\\ 6$", group: "isosceles" },
        { id: "c", text: "$3,\\ 4,\\ 5$", group: "escaleno" },
        { id: "d", text: "$7,\\ 7,\\ 2$", group: "isosceles" },
        { id: "e", text: "$6,\\ 8,\\ 10$", group: "escaleno" },
      ],
      explanation: "Los tres lados iguales: equilátero. Dos iguales: isósceles. Ninguno igual: escaleno.",
    },
    {
      id: "check-angulo",
      type: "fill_in_blank",
      help: [
        {
          label: "Suman 180",
          message: "Los tres ángulos de un triángulo suman $180^\\circ$: $180 - 90 - 35$.",
        },
      ],
      title: "El tercer ángulo",
      question: "Un triángulo rectángulo tiene un ángulo de $35^\\circ$. ¿Cuánto mide el tercer ángulo, en grados? (solo el número)",
      correctAnswers: ["55"],
      explanation: "$180^\\circ - 90^\\circ - 35^\\circ = 55^\\circ$.",
    },
    {
      id: "check-altura",
      type: "fill_in_blank",
      help: [
        {
          label: "Triángulo rectángulo",
          message: "La altura parte la base en dos mitades de $5$ cm. Tienes un triángulo rectángulo con hipotenusa $10$ y un cateto $5$.",
        },
        {
          label: "Pitágoras",
          message: "$h^2 = 10^2 - 5^2 = 75$. Aproxima $\\sqrt{75}$ a las centésimas.",
        },
      ],
      title: "Altura de un triángulo equilátero",
      question: "Calcula la altura de un triángulo equilátero de $10$ cm de lado, redondeada a las centésimas (escribe el número con coma).",
      correctAnswers: ["8,66", "8.66"],
      explanation: "$h = \\sqrt{10^2 - 5^2} = \\sqrt{75} = 8{,}66\\dots \\approx 8{,}66$ cm.",
    },
  ],
};
