import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_2_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesAlgebraicasSumaResta4esobLesson: InteractiveLesson = {
  slug: "fracciones-algebraicas-suma-resta-4esob",
  title: "11. Suma y resta de fracciones algebraicas",
  subtitle: TEMA_4ESOB_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mismo-denominador",
      type: "slide",
      help: [
        { label: "Paréntesis al restar", message: "Si restas una fracción, **todo** su numerador cambia de signo. Por eso se escribe entre paréntesis: $-(x - 2) = -x + 2$." },
      ],
      title: "Con el mismo denominador",
      blocks: [
        { kind: "rule", text: "Se suman o restan los **numeradores** y se mantiene el denominador." },
        { kind: "example", lines: [{ math: "\\dfrac{3}{x + 1} + \\dfrac{x}{x + 1} - \\dfrac{x - 2}{x + 1} = \\dfrac{3 + x - (x - 2)}{x + 1} = \\dfrac{5}{x + 1}" }] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3 / (x + 1)", "+", "x / (x + 1)", "−", "(x − 2) / (x + 1)"], active: [0, 4], note: "mismo denominador: se opera con los numeradores." },
            { tokens: ["(3 + x − (x − 2)) / (x + 1)"], active: [0, 0], note: "el signo $-$ afecta a todo el paréntesis." },
            { tokens: ["5 / (x + 1)"], fresh: [0, 0], note: "$3 + x - x + 2 = 5$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "distinto-denominador",
      type: "slide",
      help: [
        { label: "Denominador común", message: "Lo más sencillo es multiplicar los denominadores. Si hay factores repetidos, basta el producto con el **mayor exponente** de cada factor (el m.c.m.)." },
      ],
      title: "Con distinto denominador",
      blocks: [
        { kind: "steps", items: ["Factoriza los denominadores y busca un **denominador común** (múltiplo de todos).", "Multiplica numerador y denominador de cada fracción por el factor que le falta.", "Suma o resta los numeradores y simplifica."] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3 / x", "+", "5 / (x − 2)"], active: [0, 2], note: "denominadores $x$ y $x - 2$: común $x(x - 2)$." },
            { tokens: ["3(x − 2) / (x(x − 2))", "+", "5x / (x(x − 2))"], active: [0, 2], note: "cada fracción recibe el factor que le faltaba." },
            { tokens: ["(3x − 6 + 5x) / (x(x − 2))"], active: [0, 0], note: "se suman los numeradores." },
            { tokens: ["(8x − 6) / (x(x − 2))"], fresh: [0, 0], note: "resultado: $\\dfrac{8x - 6}{x(x - 2)}$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-numerador",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Común 2x", message: "$\\dfrac{2}{x} = \\dfrac{4}{2x}$ y $\\dfrac{3}{2x}$ ya está. Suma los numeradores." }],
      title: "El numerador de la suma",
      question: "Suma $\\dfrac{2}{x} + \\dfrac{3}{2x}$ con denominador común $2x$. ¿Cuánto vale el **numerador**? (solo el número)",
      correctAnswers: ["7"],
      explanation: "$\\dfrac{2}{x} = \\dfrac{4}{2x}$, así que $\\dfrac{4}{2x} + \\dfrac{3}{2x} = \\dfrac{7}{2x}$.",
    },
    {
      id: "denominadores-distintos",
      type: "slide",
      help: [{ label: "Producto", message: "Cuando los denominadores no comparten factores, el común es su producto: $(x + 1)(x - 1) = x^2 - 1$." }],
      title: "Dos binomios en el denominador",
      blocks: [
        { kind: "example", title: "Del libro", lines: [{ math: "\\dfrac{3x}{x - 1} - \\dfrac{2}{x + 1} = \\dfrac{3x(x + 1) - 2(x - 1)}{(x + 1)(x - 1)}" }, { math: "= \\dfrac{3x^2 + 3x - 2x + 2}{x^2 - 1} = \\dfrac{3x^2 + x + 2}{x^2 - 1}" }] },
        { kind: "warning", text: "Al restar, el signo $-$ afecta a **todo** el segundo numerador: $-2(x - 1) = -2x + 2$, no $-2x - 1$." },
      ],
      visual: { kind: "tool", tool: "fraccion-alg-explorador", params: { a: 2, b: 0 }, hint: "Elige la fracción 3 y prueba x = −1: fíjate en el valor excluido." },
    },
    {
      id: "check-coef",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Desarrolla", message: "$x(x + 2) + 1\\cdot(x - 2) = x^2 + 2x + x - 2 = x^2 + 3x - 2$." }],
      title: "Un coeficiente del resultado",
      question: "Suma $\\dfrac{x}{x - 2} + \\dfrac{1}{x + 2}$ con denominador común $(x - 2)(x + 2)$. En el numerador $x^2 + bx + c$, ¿cuánto vale $b$? (escribe el número con su signo)",
      correctAnswers: ["3", "+3"],
      explanation: "$x(x + 2) + (x - 2) = x^2 + 2x + x - 2 = x^2 + 3x - 2$. El coeficiente de $x$ es $3$.",
    },
    {
      id: "check-resta",
      type: "predict",
      mode: "choice",
      help: [{ label: "Paréntesis", message: "$(2x + 1) - (x - 3) = 2x + 1 - x + 3$." }],
      title: "Cuidado con el signo",
      question: "Efectúa $\\dfrac{2x + 1}{x} - \\dfrac{x - 3}{x}$.",
      choices: [
        { id: "a", label: "$\\dfrac{x + 4}{x}$" },
        { id: "b", label: "$\\dfrac{x - 2}{x}$", incorrectFeedback: "Has restado el $x$ pero has dejado el $-3$ con su signo: debe pasar a $+3$." },
        { id: "c", label: "$\\dfrac{3x - 2}{x}$", incorrectFeedback: "Has sumado en lugar de restar." },
        { id: "d", label: "$x + 4$", incorrectFeedback: "El denominador $x$ se mantiene." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{2x + 1 - (x - 3)}{x} = \\dfrac{2x + 1 - x + 3}{x} = \\dfrac{x + 4}{x}$.",
    },
  ],
};
