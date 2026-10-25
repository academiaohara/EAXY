import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const teoremaCoseno1bachLesson: InteractiveLesson = {
  slug: "teorema-coseno-1bach",
  title: "10. El teorema del coseno",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "enunciado",
      type: "slide",
      help: [{ label: "Notación", message: "Los vértices son $A, B, C$; el lado opuesto a cada uno se llama con la minúscula ($a$ opuesto a $A$) y el ángulo en el vértice, con la letra griega ($\\alpha$ en $A$) o con la misma mayúscula." }],
      title: "Un Pitágoras para cualquier triángulo",
      blocks: [
        { kind: "rule", title: "Teorema del coseno", formula: "a^2 = b^2 + c^2 - 2bc\\cos A" },
        { kind: "text", text: "Vale para **cualquier** triángulo y se puede escribir con cualquiera de los tres vértices. Si $A = 90^\\circ$, $\\cos A = 0$ y queda el **teorema de Pitágoras**: es su generalización." },
        { kind: "example", title: "b = 5, c = 7, A = 60°", lines: [
          { math: "a^2 = 25 + 49 - 2\\cdot 5\\cdot 7\\cos 60^\\circ = 74 - 35 = 39 \\Rightarrow a = \\sqrt{39} \\approx 6{,}24" },
        ] },
      ],
      visual: { kind: "tool", tool: "triangulo-general-explorador", initial: [0, 5, 7, 60], hint: "Pon A = 90° y comprueba que el teorema del coseno se reduce a Pitágoras. Después cambia A." },
    },
    {
      id: "check-lado",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$a^2 = 8^2 + 5^2 - 2\\cdot 8\\cdot 5\\cos 60^\\circ$." }],
      title: "El cuadrado del lado",
      question: "En un triángulo $b = 8$, $c = 5$ y $A = 60^\\circ$. ¿Cuánto vale $a^2$? (solo el número)",
      correctAnswers: ["49"],
      explanation: "$a^2 = 64 + 25 - 2\\cdot 8\\cdot 5\\cdot\\frac{1}{2} = 89 - 40 = 49$, luego $a = 7$.",
    },
    {
      id: "angulos",
      type: "slide",
      help: [{ label: "Siempre existe", message: "Si los tres lados cumplen la desigualdad triangular, el coseno que sale está entre $-1$ y $1$ y el ángulo existe. Si no, no hay triángulo." }],
      title: "Despejar un ángulo",
      blocks: [
        { kind: "rule", title: "Con los tres lados", formula: "\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}" },
        { kind: "example", title: "Lados 5, 6 y 7", lines: [
          { math: "\\cos A = \\dfrac{36 + 49 - 25}{2\\cdot 6\\cdot 7} = \\dfrac{60}{84} \\approx 0{,}714 \\Rightarrow A \\approx 44{,}4^\\circ" },
          { math: "\\cos B = \\dfrac{25 + 49 - 36}{2\\cdot 5\\cdot 7} \\approx 0{,}543 \\Rightarrow B \\approx 57{,}1^\\circ,\\quad C = 180^\\circ - A - B \\approx 78{,}5^\\circ" },
        ] },
        { kind: "text", text: "Un coseno **negativo** indica un ángulo **obtuso** (mayor que $90^\\circ$)." },
      ],
      visual: { kind: "tool", tool: "triangulo-general-explorador", initial: [1, 5, 6, 7], hint: "Con 5, 6 y 7 sale A ≈ 44,4°. Prueba 3, 4 y 5 (rectángulo) y 1, 2 y 5 (no existe triángulo)." },
    },
    {
      id: "check-recto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Lados $3$, $4$ y $5$ con $a = 5$: $\\cos A = \\frac{16 + 9 - 25}{24}$." }],
      title: "Un triángulo 3-4-5",
      question: "En un triángulo de lados $3$, $4$ y $5$, ¿cuántos grados mide el ángulo opuesto al lado de $5$? (solo el número)",
      correctAnswers: ["90"],
      explanation: "$\\cos A = \\frac{16 + 9 - 25}{2\\cdot 4\\cdot 3} = 0 \\Rightarrow A = 90^\\circ$. Es el triángulo rectángulo pitagórico.",
    },
    {
      id: "check-obtuso",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Un coseno negativo corresponde a un ángulo entre $90^\\circ$ y $180^\\circ$." }],
      title: "Signo del coseno",
      question: "Al aplicar el teorema del coseno a un triángulo, $\\cos A$ sale negativo. El ángulo $A$ es…",
      choices: [
        { id: "a", label: "obtuso (mayor que $90^\\circ$)" },
        { id: "b", label: "agudo", incorrectFeedback: "En un ángulo agudo el coseno es positivo." },
        { id: "c", label: "recto", incorrectFeedback: "En un ángulo recto el coseno vale $0$." },
        { id: "d", label: "imposible: es un error de cálculo", incorrectFeedback: "No es un error: en un triángulo obtusángulo el coseno del ángulo obtuso es negativo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\cos A < 0$ solo ocurre en el segundo cuadrante: $A$ está entre $90^\\circ$ y $180^\\circ$.",
    },
    {
      id: "check-existe",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La suma de dos lados debe superar al tercero." }],
      title: "¿Existe el triángulo?",
      question: "¿Con cuáles de estas medidas de lados **no** se puede construir un triángulo?",
      choices: [
        { id: "a", label: "$1,\\ 2,\\ 5$" },
        { id: "b", label: "$3,\\ 4,\\ 5$", incorrectFeedback: "Sí existe: $3 + 4 > 5$ (es rectángulo)." },
        { id: "c", label: "$5,\\ 6,\\ 7$", incorrectFeedback: "Sí existe: la suma de los dos menores supera al mayor." },
        { id: "d", label: "$2,\\ 2,\\ 3$", incorrectFeedback: "Sí existe: $2 + 2 > 3$ (es isósceles)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$1 + 2 = 3 < 5$: los dos lados menores no llegan a cerrar el triángulo (con $\\cos A$ saldría fuera de $[-1, 1]$).",
    },
  ],
};
