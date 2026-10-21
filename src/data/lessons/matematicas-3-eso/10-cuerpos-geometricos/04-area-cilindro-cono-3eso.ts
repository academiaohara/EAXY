import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const areaCilindroCono3esoLesson: InteractiveLesson = {
  slug: "area-cilindro-cono-3eso",
  title: "4. Superficie de cilindros, conos y troncos de cono",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cilindro",
      type: "slide",
      help: [
        {
          label: "Un rectángulo",
          message: "Si cortas el lateral de un cilindro y lo estiras, es un rectángulo: la base mide lo que la circunferencia y la altura es $h$.",
        },
        {
          label: "Dos círculos",
          message: "Las dos bases son círculos de área $\\pi r^2$ cada uno.",
        },
      ],
      title: "Cilindro",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "A_{\\text{lateral}} = 2\\pi r h" },
            { tex: "A_{\\text{bases}} = 2\\pi r^2" },
            { tex: "A_{\\text{total}} = 2\\pi r h + 2\\pi r^2 = 2\\pi r(h + r)" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "desarrollo-cilindro", params: { a: 3, b: 5 } },
    },
    {
      id: "cono",
      type: "slide",
      help: [
        {
          label: "Sector",
          message: "El lateral de un cono es un sector circular de radio $g$ (la generatriz) cuyo arco mide lo que la circunferencia de la base, $2\\pi r$.",
        },
        {
          label: "Generatriz",
          message: "$g^2 = r^2 + h^2$: la generatriz, el radio y la altura forman un triángulo rectángulo.",
        },
      ],
      title: "Cono",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "A_{\\text{lateral}} = \\pi r g" },
            { tex: "A_{\\text{total}} = \\pi r g + \\pi r^2" },
            { tex: "g^2 = r^2 + h^2" },
          ],
        },
        {
          kind: "example",
          title: "Cono con altura = radio = 10 cm",
          lines: [
            { math: "g = \\sqrt{10^2 + 10^2} \\approx 14{,}14" },
            { math: "A_{\\text{lateral}} = \\pi \\cdot 10 \\cdot 14{,}14 \\approx 444\\ \\text{cm}^2" },
            { math: "A_{\\text{total}} = 444 + \\pi \\cdot 10^2 \\approx 758\\ \\text{cm}^2" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "desarrollo-cono", params: { a: 3, b: 5 } },
    },
    {
      id: "tronco",
      type: "slide",
      help: [
        {
          label: "Parecido a un trapecio",
          message: "El lateral desarrollado es como un trapecio curvo: semisuma de las dos circunferencias por la generatriz del tronco.",
        },
        {
          label: "Pitágoras",
          message: "$g^2 = h^2 + (r - r')^2$: altura, diferencia de radios y generatriz forman un triángulo rectángulo.",
        },
      ],
      title: "Tronco de cono",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "A_{\\text{lateral}} = \\pi(r + r')\\,g" },
            { tex: "A_{\\text{total}} = \\pi(r + r')g + \\pi r^2 + \\pi r'^2" },
          ],
        },
        {
          kind: "example",
          title: "Cono de 12 cm de altura y 9 cm de radio, cortado a 4 cm de la base",
          lines: [
            { math: "r' = 6,\\quad g = \\sqrt{4^2 + 3^2} = 5" },
            { math: "A_{\\text{lateral}} = 3{,}14 \\cdot (9 + 6) \\cdot 5 = 235{,}5" },
            { math: "A_{\\text{total}} = 235{,}5 + 3{,}14 \\cdot 81 + 3{,}14 \\cdot 36 = 602{,}88\\ \\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-cilindro",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Factor común",
          message: "$A = 2\\pi r(h + r) = 2 \\cdot 3{,}14 \\cdot 5 \\cdot 15$.",
        },
      ],
      title: "Área de un cilindro",
      question: "Calcula el área total de un cilindro de radio $5$ cm y altura $10$ cm, con $\\pi \\approx 3{,}14$. (solo el número, en cm²)",
      correctAnswers: ["471"],
      explanation: "$A = 2 \\cdot 3{,}14 \\cdot 5 \\cdot (10 + 5) = 471$ cm².",
    },
    {
      id: "check-cono",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Lateral y base",
          message: "$A_{\\text{lateral}} = \\pi \\cdot 6 \\cdot 10 = 188{,}4$ y $A_{\\text{base}} = \\pi \\cdot 36 = 113{,}04$.",
        },
      ],
      title: "Área de un cono",
      question: "Un cono tiene radio $6$ cm y generatriz $10$ cm. ¿Cuál es su área total, con $\\pi \\approx 3{,}14$? (solo el número, en cm²)",
      correctAnswers: ["301,44", "301.44"],
      explanation: "$A = 3{,}14 \\cdot 6 \\cdot 10 + 3{,}14 \\cdot 36 = 188{,}4 + 113{,}04 = 301{,}44$ cm².",
    },
    {
      id: "check-generatriz",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Pitágoras",
          message: "$g^2 = 6^2 + 8^2$.",
        },
      ],
      title: "Generatriz",
      question: "Un cono tiene radio $6$ cm y altura $8$ cm. ¿Cuánto mide su generatriz? (solo el número, en cm)",
      correctAnswers: ["10"],
      explanation: "$g = \\sqrt{36 + 64} = 10$ cm.",
    },
  ],
};
