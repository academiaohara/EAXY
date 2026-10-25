import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const complejosProductoMoivre1bachLesson: InteractiveLesson = {
  slug: "complejos-producto-moivre-1bach",
  title: "12. Producto, cociente, potencias y Moivre",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        { label: "Giro y escala", message: "Multiplicar por $r_\\alpha$ es girar el vector $\\alpha$ y estirarlo en un factor $r$ (una homotecia de razón $r$). Por eso es tan útil en mecánica." },
      ],
      title: "Producto: módulos que se multiplican, ángulos que se suman",
      blocks: [
        { kind: "rule", title: "Producto en forma polar", formula: "r_\\alpha \\cdot s_\\beta = (r\\,s)_{\\alpha + \\beta}" },
        { kind: "text", text: "Con $i = 1_{90^\\circ}$ se explica por qué multiplicar por $i$ gira $90^\\circ$: el módulo (1) no cambia y el argumento suma $90^\\circ$." },
      ],
      visual: { kind: "anim", scene: "complejo-producto-polar", params: { a: 2, b: 20, c: 1.5, d: 55 } },
    },
    {
      id: "demostracion",
      type: "slide",
      help: [{ label: "Identidades usadas", message: "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$ y $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$." }],
      title: "Por qué funciona",
      blocks: [
        { kind: "steps", title: "Producto en forma trigonométrica", items: [
          "$r(\\cos\\alpha + i\\sin\\alpha)\\cdot s(\\cos\\beta + i\\sin\\beta)$",
          "Se multiplica: $rs\\,[(\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta) + i(\\cos\\alpha\\sin\\beta + \\sin\\alpha\\cos\\beta)]$.",
          "Las dos agrupaciones son $\\cos(\\alpha+\\beta)$ y $\\sin(\\alpha+\\beta)$: queda $rs\\,[\\cos(\\alpha+\\beta) + i\\sin(\\alpha+\\beta)]$.",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "cociente",
      type: "slide",
      help: [{ label: "Inverso", message: "El inverso de $r_\\alpha$ es $\\left(\\frac{1}{r}\\right)_{-\\alpha}$: el módulo se invierte y el ángulo cambia de signo." }],
      title: "Cociente e inverso",
      blocks: [
        { kind: "rule", title: "Cociente en forma polar", formula: "\\dfrac{r_\\alpha}{s_\\beta} = \\left(\\dfrac{r}{s}\\right)_{\\alpha - \\beta}" },
        { kind: "example", title: "2 ÷ (1 + √3 i)", lines: [
          { math: "2 = 2_{0^\\circ},\\qquad 1 + \\sqrt{3}\\,i = 2_{60^\\circ}" },
          { math: "\\dfrac{2_{0^\\circ}}{2_{60^\\circ}} = 1_{-60^\\circ} = \\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}\\,i" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Se dividen los módulos: $6 : 3$." }],
      title: "Módulo de un cociente",
      question: "¿Cuál es el módulo de $\\dfrac{6_{80^\\circ}}{3_{20^\\circ}}$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$\\dfrac{6_{80^\\circ}}{3_{20^\\circ}} = 2_{60^\\circ}$: módulo $6:3 = 2$ y argumento $80^\\circ - 20^\\circ = 60^\\circ$.",
    },
    {
      id: "moivre",
      type: "slide",
      help: [
        { label: "Con módulo 1", message: "Si $r = 1$, la potencia se queda en la circunferencia unidad y solo gira: $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$, que es la fórmula de Moivre." },
      ],
      title: "Potencias y fórmula de Moivre",
      blocks: [
        { kind: "rule", title: "Potencia", formula: "(r_\\theta)^n = (r^n)_{n\\theta}" },
        { kind: "rule", title: "Fórmula de Moivre", formula: "(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)" },
        { kind: "example", title: "(1 + i)¹⁶", lines: [
          { math: "1 + i = \\sqrt{2}_{45^\\circ}" },
          { math: "(1 + i)^{16} = \\big((\\sqrt{2})^{16}\\big)_{16\\cdot 45^\\circ} = 256_{720^\\circ} = 256_{0^\\circ} = 256" },
        ] },
      ],
      visual: { kind: "tool", tool: "potencia-compleja-explorador", initial: [10, 30, 3], hint: "Con módulo 1 la potencia gira sobre la circunferencia unidad. Prueba θ = 30° y n = 12: ¿qué número sale?" },
    },
    {
      id: "check-potencia",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$1 + i = \\sqrt{2}_{45^\\circ}$. Eleva el módulo a 8 y multiplica el ángulo por 8." }],
      title: "(1 + i)⁸",
      question: "Calcula $(1 + i)^8$. (solo el número)",
      correctAnswers: ["16"],
      explanation: "$(\\sqrt{2})^8 = 2^4 = 16$ y el argumento es $8\\cdot 45^\\circ = 360^\\circ \\equiv 0^\\circ$. Resultado: $16$.",
    },
    {
      id: "check-moivre",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Multiplica el ángulo por 9: $9\\cdot 20^\\circ = 180^\\circ$." }],
      title: "Una potencia de módulo 1",
      question: "¿Cuánto vale $(\\cos 20^\\circ + i\\sin 20^\\circ)^9$?",
      choices: [
        { id: "a", label: "$-1$" },
        { id: "b", label: "$1$", incorrectFeedback: "Daría $1$ si el ángulo final fuese $360^\\circ$; aquí es $9\\cdot 20^\\circ = 180^\\circ$." },
        { id: "c", label: "$i$", incorrectFeedback: "Eso sería un ángulo de $90^\\circ$." },
        { id: "d", label: "$\\cos 29^\\circ + i\\sin 29^\\circ$", incorrectFeedback: "Los ángulos no se suman con el exponente: se **multiplican** por él." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Moivre: $\\cos 180^\\circ + i\\sin 180^\\circ = -1 + 0i = -1$.",
    },
    {
      id: "doble",
      type: "slide",
      help: [{ label: "Para qué sirve", message: "Con $n = 3$ y el binomio de Newton se obtienen $\\cos 3\\theta$ y $\\sin 3\\theta$ en función de $\\cos\\theta$ y $\\sin\\theta$." }],
      title: "Un regalo: ángulo doble",
      blocks: [
        { kind: "text", text: "Moivre con $n = 2$ y el desarrollo del cuadrado de un binomio dan las fórmulas del ángulo doble:" },
        { kind: "example", lines: [
          { math: "(\\cos\\theta + i\\sin\\theta)^2 = \\cos^2\\theta - \\sin^2\\theta + 2i\\sin\\theta\\cos\\theta" },
          { math: "\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta,\\qquad \\sin 2\\theta = 2\\sin\\theta\\cos\\theta" },
        ] },
      ],
      arrange: "stack",
    },
  ],
};
