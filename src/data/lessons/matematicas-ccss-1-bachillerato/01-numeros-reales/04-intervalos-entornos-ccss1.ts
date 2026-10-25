import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_1_SUBTITLE } from "@/data/lessons/shared";

export const intervalosEntornosCcss1Lesson: InteractiveLesson = {
  slug: "intervalos-entornos-ccss1",
  title: "4. Intervalos y entornos",
  subtitle: TEMA_CCSS1_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tipos",
      type: "slide",
      help: [
        { label: "Corchete o paréntesis", message: "Corchete: el extremo **entra** (desigualdad $\\leq$). Paréntesis: **no entra** (desigualdad estricta $<$)." },
      ],
      title: "Intervalos acotados",
      blocks: [
        { kind: "definition", text: "Un **intervalo** es un trozo de la recta real: el conjunto de números entre dos extremos $a < b$. Según incluya o no los extremos recibe un nombre." },
        { kind: "facts", items: [
          { tex: "(a, b) = \\{x : a < x < b\\}", label: "abierto" },
          { tex: "[a, b] = \\{x : a \\leq x \\leq b\\}", label: "cerrado" },
          { tex: "(a, b] = \\{x : a < x \\leq b\\}", label: "semiabierto por la izquierda" },
          { tex: "[a, b) = \\{x : a \\leq x < b\\}", label: "semiabierto por la derecha" },
        ] },
      ],
      visual: { kind: "anim", scene: "intervalo-recta", params: { a: -2, b: 3, c: 3 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Cuando el número de prueba coincide con un extremo, solo pertenece si ese extremo es cerrado." }],
      title: "¿Entra el extremo?",
      blocks: [{ kind: "text", text: "Cambia el tipo de intervalo y lleva el número de prueba hasta un extremo. La herramienta te dice si pertenece o no." }],
      visual: { kind: "tool", tool: "intervalo-explorador", initial: [-2, 3, 0, 3], hint: "Pon el número de prueba en uno de los extremos y alterna entre paréntesis y corchete." },
    },
    {
      id: "semirrectas",
      type: "slide",
      help: [
        { label: "Por qué siempre paréntesis", message: "$+\\infty$ y $-\\infty$ no son números: no hay un punto de la recta que «entre». Por eso nunca se cierran con corchete." },
      ],
      title: "Semirrectas",
      blocks: [
        { kind: "text", text: "Si no hay extremo en un lado, el intervalo **no acaba**: es una semirrecta. Se escribe con $+\\infty$ o $-\\infty$ y **siempre con paréntesis** en ese extremo." },
        { kind: "facts", items: [
          { tex: "(a, +\\infty)", label: "x > a" },
          { tex: "[a, +\\infty)", label: "x ≥ a" },
          { tex: "(-\\infty, a)", label: "x < a" },
          { tex: "(-\\infty, a]", label: "x ≤ a" },
        ] },
        { kind: "text", text: "Toda la recta es $\\mathbb{R} = (-\\infty, +\\infty)$, la unión de $S^+ = (0, +\\infty)$, $S^- = (-\\infty, 0)$ y $\\{0\\}$." },
      ],
      visual: { kind: "anim", scene: "semirrecta-recta", params: { a: 2, c: 3 } },
    },
    {
      id: "check-notacion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Mira cada extremo: «≥» deja entrar al extremo (corchete); «<» no lo deja (paréntesis)." }],
      title: "De la desigualdad al intervalo",
      question: "El conjunto $\\{x : -3 \\leq x < 5\\}$ se escribe…",
      choices: [
        { id: "a", label: "$[-3, 5)$" },
        { id: "b", label: "$(-3, 5]$", incorrectFeedback: "Has cambiado los extremos: el $-3$ sí entra (≤) y el $5$ no (<)." },
        { id: "c", label: "$[-3, 5]$", incorrectFeedback: "El $5$ no entra: la desigualdad es estricta en ese lado." },
        { id: "d", label: "$(-3, 5)$", incorrectFeedback: "El $-3$ sí entra porque la desigualdad es «≤»." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El extremo izquierdo entra ($\\leq$): corchete. El derecho no ($<$): paréntesis. Resultado: $[-3, 5)$.",
    },
    {
      id: "entornos",
      type: "slide",
      help: [
        { label: "Por qué es un abierto", message: "Se exige distancia **menor** que $r$, no menor o igual, así que los extremos $a \\pm r$ quedan fuera." },
      ],
      title: "Entornos: un intervalo con centro",
      blocks: [
        { kind: "definition", text: "El **entorno** de centro $a$ y radio $r$ es el conjunto de números cuya distancia a $a$ es menor que $r$." },
        { kind: "rule", title: "Entorno e intervalo", formula: "E(a, r) = \\{x : |x - a| < r\\} = (a - r,\\ a + r)" },
        { kind: "example", lines: [
          { math: "E(5, 2) = (5 - 2,\\ 5 + 2) = (3, 7)" },
          { math: "E(-2, 4) = (-6,\\ 2)" },
        ] },
      ],
      visual: { kind: "tool", tool: "entorno-explorador", initial: [5, 4, 14], hint: "Mueve el centro y el radio, y comprueba cuándo el número de prueba entra en el entorno." },
    },
    {
      id: "inverso",
      type: "slide",
      help: [
        { label: "Punto medio", message: "El centro de $(b, c)$ es $\\frac{b+c}{2}$ y el radio es la mitad de la anchura, $\\frac{c-b}{2}$." },
      ],
      title: "De un intervalo abierto a un entorno",
      blocks: [
        { kind: "rule", title: "Centro y radio de (b, c)", formula: "(b, c) = E\\!\\left(\\dfrac{b + c}{2},\\ \\dfrac{c - b}{2}\\right)" },
        { kind: "example", title: "(3, 10)", lines: [
          { math: "\\text{centro} = \\dfrac{3 + 10}{2} = 6{,}5" },
          { math: "\\text{radio} = \\dfrac{10 - 3}{2} = 3{,}5" },
          { math: "(3, 10) = E(6{,}5;\\ 3{,}5)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-radio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El radio es la mitad de la longitud del intervalo." }],
      title: "El radio",
      question: "El intervalo abierto $(-4, 8)$ es un entorno. ¿Cuál es su **radio**? (solo el número)",
      correctAnswers: ["6"],
      explanation: "La longitud es $8 - (-4) = 12$ y el radio es la mitad: $6$. El centro es $\\frac{-4 + 8}{2} = 2$, y $(-4, 8) = E(2, 6)$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Un extremo entra cuando va con corchete." }],
      title: "¿Entra el 3?",
      question: "Clasifica los conjuntos según si el número $3$ pertenece a ellos.",
      groups: [
        { id: "entra", label: "El 3 pertenece", tone: "emerald" },
        { id: "no", label: "El 3 no pertenece", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$[3, 8)$", group: "entra" },
        { id: "b", text: "$(3, 8)$", group: "no" },
        { id: "c", text: "$[-1, 3]$", group: "entra" },
        { id: "d", text: "$(-1, 3)$", group: "no" },
        { id: "e", text: "$[3, +\\infty)$", group: "entra" },
        { id: "f", text: "$(-\\infty, 3)$", group: "no" },
      ],
      hint: "Solo el extremo con corchete pertenece al conjunto.",
    },
  ],
};
