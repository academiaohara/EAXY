import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const piramides2esoLesson: InteractiveLesson = {
  slug: "piramides-2eso",
  title: "7. Área de pirámides",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "Altura y apotema no son lo mismo",
          message: "La **altura** baja del vértice al centro de la base. La **apotema de la pirámide** baja del vértice al punto medio de un lado de la base, por la cara lateral.",
        },
        {
          label: "Dos apotemas",
          message: "Además está la apotema de la base ($a'$), la del polígono regular de la base.",
        },
      ],
      title: "Elementos de una pirámide regular",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "h", label: "altura: vértice → base" },
            { tex: "a", label: "apotema de la pirámide (cara lateral)" },
            { tex: "a'", label: "apotema de la base" },
          ],
        },
        {
          kind: "rule",
          text: "La apotema de la pirámide es la **hipotenusa** de un triángulo rectángulo cuyos catetos son la altura y la apotema de la base.",
          formula: "a = \\sqrt{h^2 + a'^2}",
        },
      ],
      visual: { kind: "anim", scene: "piramide-elementos", beatMs: 3200 },
    },
    {
      id: "superficie",
      type: "slide",
      help: [
        {
          label: "Triángulos iguales",
          message: "Las $n$ caras laterales son triángulos iguales de base $l$ y altura $a$: $n \\cdot \\frac{l \\cdot a}{2} = \\frac{(n \\cdot l) \\cdot a}{2}$.",
        },
        {
          label: "Base regular",
          message: "El área de la base, un polígono regular, es $\\frac{P_{base} \\cdot a'}{2}$.",
        },
      ],
      title: "Superficie de una pirámide regular",
      blocks: [
        {
          kind: "rule",
          title: "Pirámide regular",
          text: "El área lateral es la suma de los $n$ triángulos iguales. Se suma el área de la base.",
          formula: "A_{lat} = \\dfrac{P_{base} \\cdot a}{2} \\qquad A_{total} = A_{lat} + A_{base}",
        },
      ],
      arrange: "stack",
    },
    {
      id: "keops",
      type: "slide",
      help: [
        {
          label: "Primero la apotema",
          message: "No conoces la apotema $a$, así que se calcula con Pitágoras: $a'$ es la mitad del lado de la base cuadrada.",
        },
        {
          label: "Perímetro",
          message: "La base es un cuadrado de lado $230$ m: $P = 4 \\cdot 230$.",
        },
      ],
      title: "La pirámide de Keops",
      blocks: [
        {
          kind: "text",
          text: "La pirámide de Keops es cuadrangular regular: altura $146$ m y lado de la base $230$ m. ¿Cuál es su superficie lateral?",
        },
        {
          kind: "example",
          lines: [
            { math: "a' = 230 : 2 = 115\\,\\text{m}" },
            { math: "a = \\sqrt{146^2 + 115^2} = \\sqrt{34\\,541} \\approx 186\\,\\text{m}" },
            { math: "A_{lat} = \\dfrac{(4 \\cdot 230) \\cdot 186}{2} = 85\\,560\\,\\text{m}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-apotema",
      type: "fill_in_blank",
      help: [
        {
          label: "Pitágoras",
          message: "$a'$ es la mitad del lado: $5$. $a = \\sqrt{12^2 + 5^2}$.",
        },
      ],
      title: "Apotema de la pirámide",
      question: "Una pirámide regular tiene base cuadrada de $10$ cm de lado y altura $12$ cm. ¿Cuánto mide la apotema de la pirámide, en cm? (solo el número)",
      correctAnswers: ["13"],
      explanation: "$a = \\sqrt{12^2 + 5^2} = \\sqrt{169} = 13$ cm.",
    },
    {
      id: "check-total",
      type: "predict",
      help: [
        {
          label: "Lateral",
          message: "$A_{lat} = \\frac{40 \\cdot 13}{2} = 260$.",
        },
        {
          label: "Base",
          message: "La base es un cuadrado de lado $10$: $100$ cm².",
        },
      ],
      title: "Área total",
      question: "Con los mismos datos (base cuadrada de $10$ cm y apotema $13$ cm), ¿cuál es el área total?",
      mode: "choice",
      choices: [
        { id: "360", label: "$360$ cm²" },
        { id: "260", label: "$260$ cm²", incorrectFeedback: "Es solo el área lateral; falta la base." },
        { id: "460", label: "$460$ cm²", incorrectFeedback: "Has sumado $260 + 100 + 100$: la base se cuenta una sola vez en una pirámide." },
        { id: "520", label: "$520$ cm²", incorrectFeedback: "Has olvidado dividir entre $2$ en el área lateral." },
      ],
      correctChoiceId: "360",
      shuffleChoices: true,
      explanation: "$A_{lat} = \\frac{40 \\cdot 13}{2} = 260$ y $A_{base} = 100$. Total: $360$ cm².",
    },
    {
      id: "check-hexagonal",
      type: "predict",
      help: [
        {
          label: "Una sola base",
          message: "A diferencia del prisma, la pirámide tiene una sola base.",
        },
      ],
      title: "Una base o dos",
      question: "Al calcular el área total, ¿cuántas veces se suma el área de la base en una pirámide?",
      mode: "choice",
      choices: [
        { id: "1", label: "Una vez" },
        { id: "2", label: "Dos veces", incorrectFeedback: "Eso es en un prisma, que tiene dos bases." },
        { id: "0", label: "Ninguna: solo la lateral", incorrectFeedback: "El área total incluye la base." },
        { id: "n", label: "Tantas veces como lados tiene la base", incorrectFeedback: "Eso se aplica a las caras laterales, no a la base." },
      ],
      correctChoiceId: "1",
      shuffleChoices: true,
      explanation: "Una pirámide tiene una única base: $A_{total} = A_{lat} + A_{base}$.",
    },
  ],
};
