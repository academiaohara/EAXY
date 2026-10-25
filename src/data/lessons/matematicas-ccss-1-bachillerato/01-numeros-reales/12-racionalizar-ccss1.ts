import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_1_SUBTITLE } from "@/data/lessons/shared";

export const racionalizarCcss1Lesson: InteractiveLesson = {
  slug: "racionalizar-ccss1",
  title: "12. Racionalización",
  subtitle: TEMA_CCSS1_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [
        {
          label: "Por qué no cambia el valor",
          message: "$\\frac{\\sqrt{2}}{\\sqrt{2}} = 1$, y multiplicar por $1$ no cambia nada. Estás escribiendo el mismo número de otra manera.",
        },
        {
          label: "Por qué se hace",
          message: "Con el radical abajo es incómodo calcular o comparar. Con denominador entero es más fácil: $\\frac{3}{\\sqrt{2}}$ no dice si es mayor o menor que $2$, pero $\\frac{3\\sqrt{2}}{2}$ es fácil de estimar.",
        },
      ],
      title: "Multiplicar por 1 para que desaparezca la raíz",
      blocks: [
        {
          kind: "text",
          text: "Es costumbre dejar **sin radicales en el denominador**. Se logra multiplicando numerador y denominador por el radical que hace falta: no cambia el valor, porque se multiplica por $1$.",
        },
        {
          kind: "rule",
          title: "Raíz cuadrada en el denominador",
          formula: "\\dfrac{a}{\\sqrt{b}} = \\dfrac{a \\cdot \\sqrt{b}}{\\sqrt{b} \\cdot \\sqrt{b}} = \\dfrac{a\\sqrt{b}}{b}",
        },
      ],
      visual: { kind: "anim", scene: "racionalizar", params: { a: 3, b: 2 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Simplifica el resultado",
          message: "Si el radicando del denominador tiene factores cuadrados ($\\sqrt{8} = 2\\sqrt{2}$), primero se simplifica y después se racionaliza, o se simplifica la fracción final.",
        },
      ],
      title: "Explora: mismo valor, otra forma",
      blocks: [
        {
          kind: "text",
          text: "Cambia el numerador y el radicando. Comprueba que el valor decimal **antes y después** es siempre el mismo. Fíjate en los casos con radicandos como $8$ o $12$, que se simplifican.",
        },
      ],
      visual: { kind: "tool", tool: "racionalizar-explorador", params: { a: 3, b: 8 }, hint: "Con radicando 8 o 12 el resultado se simplifica más. ¿Por qué?" },
    },
    {
      id: "check-uno-raiz-tres",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Multiplica arriba y abajo",
          message: "$\\frac{1}{\\sqrt{3}} \\cdot \\frac{\\sqrt{3}}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$.",
        },
      ],
      title: "Racionalizar",
      question: "Elimina el radical del denominador de $\\dfrac{1}{\\sqrt{3}}$.",
      choices: [
        { id: "a", label: "$\\dfrac{\\sqrt{3}}{3}$" },
        { id: "b", label: "$\\dfrac{\\sqrt{3}}{\\sqrt{3}}$", incorrectFeedback: "Eso vale $1$. Solo se multiplica el denominador por $\\sqrt{3}$ **y también el numerador**, y entonces $\\sqrt{3} \\cdot \\sqrt{3} = 3$." },
        { id: "c", label: "$\\dfrac{1}{3}$", incorrectFeedback: "Se ha multiplicado solo el denominador: eso cambia el valor. Hay que multiplicar **también el numerador**." },
        { id: "d", label: "$3\\sqrt{3}$", incorrectFeedback: "Se ha dado la vuelta a la fracción. $\\sqrt{3} \\cdot \\sqrt{3} = 3$ queda **en el denominador**." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{1}{\\sqrt{3}} = \\dfrac{1 \\cdot \\sqrt{3}}{\\sqrt{3} \\cdot \\sqrt{3}} = \\dfrac{\\sqrt{3}}{3} \\approx 0{,}577$.",
    },
    {
      id: "con-numerador",
      type: "slide",
      help: [
        {
          label: "Numerador con radical",
          message: "El numerador puede ser un radical: se multiplican los dos radicales: $\\sqrt{3} \\cdot \\sqrt{2} = \\sqrt{6}$.",
        },
      ],
      title: "Con radical también arriba",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{\\sqrt{3}}{\\sqrt{2}} = \\dfrac{\\sqrt{3} \\cdot \\sqrt{2}}{\\sqrt{2} \\cdot \\sqrt{2}} = \\dfrac{\\sqrt{6}}{2}" },
            { math: "\\dfrac{2}{\\sqrt{5}} = \\dfrac{2\\sqrt{5}}{5}" },
          ],
        },
        {
          kind: "text",
          text: "Siempre se multiplica por **el mismo radical arriba y abajo**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "raiz-cubica",
      type: "slide",
      help: [
        {
          label: "Hay que completar el cubo",
          message: "En $\\sqrt[3]{7}$ hace falta otro $\\sqrt[3]{7^2}$ para formar $\\sqrt[3]{7^3} = 7$: se multiplica por el radical que **completa la potencia** al índice.",
        },
      ],
      title: "Con una raíz cúbica",
      blocks: [
        {
          kind: "text",
          text: "Con otros índices, hay que multiplicar por el radical que **completa el radicando hasta una potencia del índice**.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{1}{\\sqrt[3]{7}} = \\dfrac{\\sqrt[3]{7^2}}{\\sqrt[3]{7} \\cdot \\sqrt[3]{7^2}} = \\dfrac{\\sqrt[3]{49}}{\\sqrt[3]{7^3}} = \\dfrac{\\sqrt[3]{49}}{7}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-cuadrada",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Raíz de 2",
          message: "$\\frac{3}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{2}$.",
        },
      ],
      title: "Con coeficiente",
      question: "Elimina el radical del denominador de $\\dfrac{3}{\\sqrt{2}}$.",
      choices: [
        { id: "a", label: "$\\dfrac{3\\sqrt{2}}{2}$" },
        { id: "b", label: "$\\dfrac{3}{2}$", incorrectFeedback: "Solo se ha cambiado el denominador. Hay que multiplicar también el numerador por $\\sqrt{2}$." },
        { id: "c", label: "$3\\sqrt{2}$", incorrectFeedback: "Falta dividir entre $2$: $\\sqrt{2} \\cdot \\sqrt{2} = 2$ queda en el denominador." },
        { id: "d", label: "$\\dfrac{\\sqrt{2}}{3}$", incorrectFeedback: "Se han intercambiado el numerador y el denominador." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{3}{\\sqrt{2}} = \\dfrac{3\\sqrt{2}}{2} \\approx 2{,}121$.",
    },
    {
      id: "check-simplificar-final",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Simplifica primero",
          message: "$\\sqrt{8} = 2\\sqrt{2}$, así que $\\frac{2}{\\sqrt{8}} = \\frac{2}{2\\sqrt{2}} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$.",
        },
      ],
      title: "Simplificar antes",
      question: "Racionaliza y simplifica $\\dfrac{2}{\\sqrt{8}}$.",
      choices: [
        { id: "a", label: "$\\dfrac{\\sqrt{2}}{2}$" },
        { id: "b", label: "$\\dfrac{2\\sqrt{8}}{8}$", incorrectFeedback: "Es correcto pero **no está simplificado**: $\\frac{2\\sqrt{8}}{8} = \\frac{4\\sqrt{2}}{8} = \\frac{\\sqrt{2}}{2}$." },
        { id: "c", label: "$\\sqrt{2}$", incorrectFeedback: "Falta dividir entre $2$: $\\frac{2}{2\\sqrt{2}} = \\frac{1}{\\sqrt{2}}$." },
        { id: "d", label: "$\\dfrac{1}{2}$", incorrectFeedback: "$\\sqrt{8} \\neq 4$. Simplifica: $\\sqrt{8} = 2\\sqrt{2}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{2}{\\sqrt{8}} = \\dfrac{2}{2\\sqrt{2}} = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2} \\approx 0{,}707$.",
    },
  ],
};
