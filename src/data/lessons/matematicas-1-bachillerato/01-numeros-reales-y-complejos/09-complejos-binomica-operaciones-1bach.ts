import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const complejosBinomicaOperaciones1bachLesson: InteractiveLesson = {
  slug: "complejos-binomica-operaciones-1bach",
  title: "9. Operaciones en forma binómica",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [{ label: "Como los polinomios", message: "Se opera como con expresiones algebraicas en las que $i$ es una «letra», con la regla extra $i^2 = -1$." }],
      title: "Suma y resta: parte a parte",
      blocks: [
        { kind: "rule", title: "Se suman las partes reales y las imaginarias por separado", formula: "(x + yi) + (u + vi) = (x + u) + (y + v)\\,i" },
        { kind: "example", lines: [
          { math: "(3 + 2i) + (1 - 5i) = 4 - 3i" },
          { math: "(3 + 2i) - (1 - 5i) = 2 + 7i" },
        ] },
        { kind: "warning", text: "Al restar, el signo menos cambia **las dos** partes del segundo número: $-(1 - 5i) = -1 + 5i$." },
      ],
      arrange: "stack",
    },
    {
      id: "producto",
      type: "slide",
      help: [
        { label: "Fórmula directa", message: "$(x+yi)(u+vi) = (xu - yv) + (xv + yu)\\,i$. No hace falta memorizarla: basta aplicar la distributiva y cambiar $i^2$ por $-1$." },
      ],
      title: "Producto: distributiva e i² = −1",
      blocks: [
        { kind: "example", title: "(2 − i)(1 + 2i)", lines: [
          { math: "= 2 + 4i - i - 2i^2" },
          { math: "= 2 + 3i - 2(-1)" },
          { math: "= 4 + 3i" },
        ] },
        { kind: "text", text: "Pruébalo con la herramienta: pon $z_1 = 2 - i$, $z_2 = 1 + 2i$ y la operación producto, y mira dónde cae el resultado en el plano." },
      ],
      visual: { kind: "tool", tool: "complejos-operaciones-explorador", initial: [2, -1, 1, 2, 2], hint: "Prueba z₂ = i con el producto: multiplicar por i gira z₁ noventa grados." },
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(3+i)(2-i) = 6 - 3i + 2i - i^2$. Recuerda $i^2 = -1$." }],
      title: "Parte real de un producto",
      question: "Calcula $(3 + i)(2 - i)$. ¿Cuál es su **parte real**? (solo el número)",
      correctAnswers: ["7"],
      explanation: "$(3+i)(2-i) = 6 - 3i + 2i - i^2 = 6 - i + 1 = 7 - i$. Parte real: $7$.",
    },
    {
      id: "conjugado",
      type: "slide",
      help: [
        { label: "Por qué sale un real", message: "$(x+yi)(x-yi) = x^2 - y^2 i^2 = x^2 + y^2$: es una diferencia de cuadrados en la que $-i^2 = +1$." },
      ],
      title: "Conjugado y división",
      blocks: [
        { kind: "definition", text: "El **conjugado** de $z = x + yi$ es $\\bar{z} = x - yi$. El producto de un complejo por su conjugado es un real positivo: $z\\,\\bar{z} = x^2 + y^2$." },
        { kind: "steps", title: "Dividir", items: [
          "Se multiplican numerador y denominador por el **conjugado del denominador**.",
          "El denominador se convierte en un número real.",
          "Se separan parte real y parte imaginaria.",
        ] },
        { kind: "example", lines: [
          { math: "\\dfrac{2}{1 + i} = \\dfrac{2(1 - i)}{(1 + i)(1 - i)} = \\dfrac{2 - 2i}{2} = 1 - i" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-division",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Multiplica arriba y abajo por $1 + 2i$ (conjugado de $1 - 2i$); el denominador será $1^2 + 2^2 = 5$." }],
      title: "Un cociente complejo",
      question: "Calcula $\\dfrac{3 + 4i}{1 - 2i}$.",
      choices: [
        { id: "a", label: "$-1 + 2i$" },
        { id: "b", label: "$1 - 2i$", incorrectFeedback: "Has dividido solo la parte real; hay que multiplicar por el conjugado $1 + 2i$ arriba y abajo." },
        { id: "c", label: "$3 + 2i$", incorrectFeedback: "El numerador da $(3 + 4i)(1 + 2i) = -5 + 10i$, no $3 + 2i$." },
        { id: "d", label: "$-5 + 10i$", incorrectFeedback: "Ese es el numerador. Falta dividir entre el denominador real: $1 + 4 = 5$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{(3+4i)(1+2i)}{(1-2i)(1+2i)} = \\frac{3 + 6i + 4i + 8i^2}{5} = \\frac{-5 + 10i}{5} = -1 + 2i$.",
    },
    {
      id: "potencias",
      type: "slide",
      help: [{ label: "Binomio de Newton", message: "También funciona, pero es más largo: $(1+i)^4 = 1 + 4i + 6i^2 + 4i^3 + i^4 = 1 + 4i - 6 - 4i + 1 = -4$." }],
      title: "Potencias: un truco con cuadrados",
      blocks: [
        { kind: "example", title: "(1 + i)⁴", lines: [
          { math: "(1 + i)^2 = 1 + 2i + i^2 = 2i" },
          { math: "(1 + i)^4 = \\big((1 + i)^2\\big)^2 = (2i)^2 = 4i^2 = -4" },
        ] },
        { kind: "text", text: "Para potencias grandes conviene la **forma polar**, que verás dos lecciones más adelante: allí $(1+i)^{16}$ sale en una línea." },
      ],
      arrange: "stack",
    },
    {
      id: "check-potencia",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Desarrolla $(a-b)^2 = a^2 - 2ab + b^2$ con $a = 1$ y $b = i$." }],
      title: "Un cuadrado",
      question: "Calcula $(1 - i)^2$. ¿Cuánto vale su **parte imaginaria**? (solo el número)",
      correctAnswers: ["-2", "−2"],
      explanation: "$(1 - i)^2 = 1 - 2i + i^2 = 1 - 2i - 1 = -2i$. Parte imaginaria: $-2$.",
    },
  ],
};
