import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const areaPoliedros3esoLesson: InteractiveLesson = {
  slug: "area-poliedros-3eso",
  title: "3. Superficie de prismas y pirámides",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "desarrollo",
      type: "slide",
      help: [
        {
          label: "Desplegar",
          message: "El desarrollo es la figura plana que resulta al abrir el poliedro por sus aristas: sirve para ver todas las caras a la vez.",
        },
        {
          label: "Un ortoedro",
          message: "Un ortoedro tiene seis rectángulos iguales de dos en dos: $A = 2(ab + ac + bc)$.",
        },
      ],
      title: "Área de un poliedro: suma de sus caras",
      blocks: [
        {
          kind: "rule",
          text: "El área de un poliedro es la **suma de las áreas de todas sus caras**. Se facilita con su **desarrollo**.",
          formula: "A_{\\text{total}} = A_{\\text{lateral}} + A_{\\text{bases}}",
        },
        {
          kind: "example",
          title: "Ortoedro de aristas a, b, c",
          lines: [
            { math: "A = 2(ab + ac + bc)" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "desarrollo-ortoedro", params: { a: 5, b: 3, c: 4 } },
    },
    {
      id: "piramide",
      type: "slide",
      help: [
        {
          label: "Apotema de la pirámide",
          message: "La apotema de la pirámide $m$ es la altura de una cara lateral (triángulo); es distinta de la apotema de la base.",
        },
        {
          label: "Pitágoras",
          message: "$m$ sale de un triángulo rectángulo: con la arista lateral y media arista de la base, o con la altura y la apotema de la base.",
        },
      ],
      title: "Pirámide regular",
      blocks: [
        {
          kind: "example",
          title: "Pirámide cuadrada de base 16 cm y altura 15 cm",
          lines: [
            { math: "m = \\sqrt{15^2 + 8^2} = 17\\ \\text{cm}" },
            { math: "A_{\\text{cara}} = \\dfrac{16 \\cdot 17}{2} = 136\\ \\text{cm}^2" },
            { math: "A_{\\text{total}} = 4 \\cdot 136 + 16^2 = 800\\ \\text{cm}^2" },
          ],
        },
        {
          kind: "example",
          title: "Pirámide hexagonal de arista básica 5 cm y arista lateral 13 cm",
          lines: [
            { math: "m = \\sqrt{13^2 - 2{,}5^2} \\approx 12{,}76 \\qquad ap_{\\text{base}} = \\sqrt{5^2 - 2{,}5^2} \\approx 4{,}33" },
            { math: "A_{\\text{lateral}} = 6 \\cdot \\dfrac{5 \\cdot 12{,}76}{2} = 191{,}4 \\qquad A_{\\text{base}} = \\dfrac{30 \\cdot 4{,}33}{2} = 64{,}95" },
            { math: "A_{\\text{total}} = 256{,}35\\ \\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-ortoedro",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Fórmula",
          message: "$A = 2(ab + ac + bc)$ con $a = 5$, $b = 3$, $c = 4$.",
        },
      ],
      title: "Área de un ortoedro",
      question: "Calcula el área total de un ortoedro de aristas $5$ cm, $3$ cm y $4$ cm. (solo el número, en cm²)",
      correctAnswers: ["94"],
      explanation: "$A = 2(15 + 20 + 12) = 94$ cm².",
    },
    {
      id: "check-prisma",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Lateral y bases",
          message: "Lateral: perímetro de la base por la altura. Bases: dos veces el área de la base.",
        },
      ],
      title: "Prisma de base triangular",
      question: "Un prisma recto de $10$ cm de altura tiene como base un triángulo rectángulo de catetos $3$ cm y $4$ cm (hipotenusa $5$ cm). ¿Cuál es su área total? (solo el número, en cm²)",
      correctAnswers: ["132"],
      explanation: "Lateral: $(3 + 4 + 5) \\cdot 10 = 120$. Bases: $2 \\cdot \\frac{3 \\cdot 4}{2} = 12$. Total $132$ cm².",
    },
    {
      id: "check-piramide",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Apotema",
          message: "$m = \\sqrt{12^2 + 5^2} = 13$. Cada cara mide $\\frac{10 \\cdot 13}{2} = 65$.",
        },
      ],
      title: "Pirámide cuadrada",
      question: "Una pirámide recta de base cuadrada de $10$ cm de lado tiene altura $12$ cm. ¿Cuál es su área total? (solo el número, en cm²)",
      correctAnswers: ["360"],
      explanation: "$m = \\sqrt{144 + 25} = 13$; caras: $4 \\cdot 65 = 260$; base: $100$. Total $360$ cm².",
    },
  ],
};
