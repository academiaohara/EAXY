import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const prismas2esoLesson: InteractiveLesson = {
  slug: "prismas-2eso",
  title: "6. Área de prismas",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "area-total",
      type: "slide",
      help: [
        {
          label: "Desarrollo",
          message: "El desarrollo es la figura plana que sale al abrir el cuerpo por algunas aristas. Su área es el área del cuerpo.",
        },
        {
          label: "Lateral y bases",
          message: "En un prisma recto, las caras laterales juntas forman un rectángulo de base el perímetro de la base y altura $h$.",
        },
      ],
      title: "Área lateral y área total",
      blocks: [
        {
          kind: "rule",
          title: "Prisma recto",
          text: "El área lateral es el **perímetro de la base por la altura**. El área total suma las **dos bases**.",
          formula: "A_{lat} = P_{base} \\cdot h \\qquad A_{total} = A_{lat} + 2A_{base}",
        },
        {
          kind: "text",
          text: "El **área total** de un poliedro es la suma de las áreas de todos los polígonos que lo forman.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "ortoedro",
      type: "slide",
      help: [
        {
          label: "Tres pares de caras",
          message: "Un ortoedro tiene seis caras iguales de dos en dos: $ab$, $ac$ y $bc$, cada una dos veces.",
        },
        {
          label: "Mira el desarrollo",
          message: "Al abrirlo, los rectángulos de cada color son idénticos: suma las seis áreas.",
        },
      ],
      title: "Ortoedro",
      blocks: [
        {
          kind: "rule",
          text: "Un ortoedro de aristas $a$, $b$ y $c$ tiene tres pares de caras iguales.",
          formula: "A = 2(ab + ac + bc)",
        },
        {
          kind: "example",
          lines: [
            { math: "2(6 \\cdot 3 + 6 \\cdot 2 + 3 \\cdot 2) = 2(18 + 12 + 6) = 72\\,\\text{cm}^2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "desarrollo-ortoedro", params: { a: 6, b: 3, c: 2 }, beatMs: 3400 },
    },
    {
      id: "cubo",
      type: "slide",
      help: [
        {
          label: "Seis cuadrados iguales",
          message: "Las seis caras del cubo son cuadrados de lado $a$: $6 \\cdot a^2$.",
        },
      ],
      title: "Cubo",
      blocks: [
        {
          kind: "rule",
          text: "Un cubo de arista $a$ tiene seis caras cuadradas iguales.",
          formula: "A = 6a^2",
        },
        {
          kind: "example",
          lines: [{ math: "a = 5\\,\\text{dm}: \\quad 6 \\cdot 5^2 = 6 \\cdot 25 = 150\\,\\text{dm}^2" }],
        },
      ],
      arrange: "stack",
    },
    {
      id: "base-rombo",
      type: "slide",
      help: [
        {
          label: "Lado de la base",
          message: "Las diagonales de un rombo se cortan en perpendicular: el lado es la hipotenusa de un triángulo con catetos $4$ y $3$.",
        },
        {
          label: "Área del rombo",
          message: "$A = \\frac{D \\cdot d}{2} = \\frac{8 \\cdot 6}{2} = 24$.",
        },
      ],
      title: "Un prisma con otra base",
      blocks: [
        {
          kind: "text",
          text: "Las bases de un prisma recto son rombos de diagonales $8$ cm y $6$ cm, y su altura es $10$ cm.",
        },
        {
          kind: "example",
          lines: [
            { math: "l = \\sqrt{4^2 + 3^2} = 5\\,\\text{cm}" },
            { math: "A_{base} = \\dfrac{8 \\cdot 6}{2} = 24\\,\\text{cm}^2" },
            { math: "A_{lat} = (4 \\cdot 5) \\cdot 10 = 200\\,\\text{cm}^2" },
            { math: "A_{total} = 200 + 2 \\cdot 24 = 248\\,\\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-cubo",
      type: "fill_in_blank",
      help: [
        {
          label: "Una cara",
          message: "Cada cara tiene área $10^2 = 100$ cm². Son seis.",
        },
      ],
      title: "Cubo de 10 cm",
      question: "Halla el área total de un cubo de $10$ cm de arista, en cm². (solo el número)",
      correctAnswers: ["600"],
      explanation: "$6 \\cdot 10^2 = 600$ cm².",
    },
    {
      id: "check-ortoedro",
      type: "predict",
      help: [
        {
          label: "Tres productos",
          message: "$ab = 12$, $ac = 48$, $bc = 36$.",
        },
      ],
      title: "Ortoedro",
      question: "Un ortoedro mide $4$ cm, $3$ cm y $12$ cm. ¿Cuál es su área total?",
      mode: "choice",
      choices: [
        { id: "192", label: "$192$ cm²" },
        { id: "96", label: "$96$ cm²", incorrectFeedback: "Has sumado las tres áreas distintas pero no las has duplicado: hay dos caras de cada tipo." },
        { id: "144", label: "$144$ cm²", incorrectFeedback: "Es el volumen ($4 \\cdot 3 \\cdot 12$), no el área." },
        { id: "19", label: "$19$ cm²", incorrectFeedback: "Has sumado las aristas; el área suma productos de aristas." },
      ],
      correctChoiceId: "192",
      shuffleChoices: true,
      explanation: "$2(4 \\cdot 3 + 4 \\cdot 12 + 3 \\cdot 12) = 2(12 + 48 + 36) = 192$ cm².",
    },
    {
      id: "check-trapecio",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "Lado oblicuo",
          message: "En el trapecio rectángulo, la diferencia de bases es $16 - 11 = 5$; con la altura $12$ forma un triángulo rectángulo: $l = \\sqrt{12^2 + 5^2} = 13$.",
        },
        {
          label: "Perímetro y área",
          message: "Perímetro: $11 + 16 + 12 + 13 = 52$. Área de la base: $\\frac{(11 + 16) \\cdot 12}{2} = 162$.",
        },
      ],
      title: "Una base en forma de trapecio",
      question: "Un prisma recto de $20$ cm de altura tiene por base un trapecio rectángulo de bases $11$ cm y $16$ cm y altura $12$ cm. ¿Cuál es su área total?",
      mode: "choice",
      choices: [
        { id: "1364", label: "$1\\,364$ cm²" },
        { id: "1040", label: "$1\\,040$ cm²", incorrectFeedback: "Es solo el área lateral ($52 \\cdot 20$); faltan las dos bases." },
        { id: "1202", label: "$1\\,202$ cm²", incorrectFeedback: "Has sumado solo una base: son dos." },
        { id: "324", label: "$324$ cm²", incorrectFeedback: "Son únicamente las dos bases; falta el área lateral." },
      ],
      correctChoiceId: "1364",
      shuffleChoices: true,
      explanation: "$A_{lat} = 52 \\cdot 20 = 1\\,040$ y $2A_{base} = 2 \\cdot 162 = 324$. Total: $1\\,364$ cm².",
    },
  ],
};
