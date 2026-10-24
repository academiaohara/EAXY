import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const teoremaSeno1bachLesson: InteractiveLesson = {
  slug: "teorema-seno-1bach",
  title: "11. El teorema del seno y el caso ambiguo",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "enunciado",
      type: "slide",
      help: [{ label: "El 2R", message: "El valor común de los tres cocientes es el **diámetro** $2R$ de la circunferencia circunscrita al triángulo." }],
      title: "Lados y senos son proporcionales",
      blocks: [
        { kind: "rule", title: "Teorema del seno", formula: "\\dfrac{a}{\\sin A} = \\dfrac{b}{\\sin B} = \\dfrac{c}{\\sin C} = 2R" },
        { kind: "text", text: "A **mayor lado**, **mayor ángulo opuesto**. Sirve cuando se conoce un lado y su ángulo opuesto, más otro dato." },
        { kind: "example", title: "A = 30°, B = 45°, a = 10", lines: [
          { math: "b = \\dfrac{a\\sin B}{\\sin A} = \\dfrac{10\\cdot\\frac{\\sqrt{2}}{2}}{\\frac{1}{2}} = 10\\sqrt{2} \\approx 14{,}14" },
          { math: "C = 180^\\circ - 30^\\circ - 45^\\circ = 105^\\circ" },
        ] },
      ],
      visual: { kind: "tool", tool: "triangulo-general-explorador", initial: [2, 30, 45, 10], hint: "Con A = 30°, B = 45° y a = 10 salen b ≈ 14,14 y C = 105°. Cambia los datos." },
    },
    {
      id: "check-c",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Los ángulos de un triángulo suman $180^\\circ$." }],
      title: "El tercer ángulo",
      question: "En un triángulo $A = 30^\\circ$ y $B = 45^\\circ$. ¿Cuántos grados mide $C$? (solo el número)",
      correctAnswers: ["105"],
      explanation: "$C = 180^\\circ - 30^\\circ - 45^\\circ = 105^\\circ$.",
    },
    {
      id: "ambiguo",
      type: "slide",
      help: [{ label: "Por qué dos", message: "$\\sin B = \\sin(180^\\circ - B)$: dos ángulos distintos tienen el mismo seno. Si $A + (180^\\circ - B) < 180^\\circ$, el segundo ángulo también forma un triángulo." }],
      title: "El caso ambiguo: lados a, b y ángulo A",
      blocks: [
        { kind: "text", text: "Con dos lados y el ángulo **opuesto a uno de ellos**, el teorema da $\\sin B = \\dfrac{b\\sin A}{a}$. Según este valor hay **0, 1 o 2** triángulos." },
        { kind: "facts", items: [
          { tex: "\\sin B > 1", label: "ningún triángulo" },
          { tex: "\\sin B = 1", label: "uno (rectángulo en B)" },
          { tex: "\\sin B < 1", label: "uno o dos (B agudo y B obtuso)" },
        ] },
        { kind: "example", title: "a = 7, b = 10, A = 30°", lines: [
          { math: "\\sin B = \\dfrac{10\\cdot 0{,}5}{7} \\approx 0{,}714 \\Rightarrow B = 45{,}6^\\circ\\ \\text{o}\\ B = 134{,}4^\\circ" },
          { math: "\\text{Los dos valen: } 30^\\circ + 134{,}4^\\circ < 180^\\circ" },
        ] },
      ],
      visual: { kind: "tool", tool: "triangulo-general-explorador", initial: [3, 7, 10, 30], hint: "Con a = 7, b = 10 y A = 30° salen dos triángulos. Acorta a hasta 5 y queda uno; por debajo de 5, ninguno." },
    },
    {
      id: "check-cuantos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Calcula $\\sin B = \\frac{b\\sin A}{a} = \\frac{10\\cdot 0{,}5}{3}$." }],
      title: "¿Cuántos triángulos?",
      question: "Con $a = 3$, $b = 10$ y $A = 30^\\circ$, ¿cuántos triángulos existen?",
      choices: [
        { id: "a", label: "Ninguno, porque sale $\\sin B \\approx 1{,}67 > 1$" },
        { id: "b", label: "Uno", incorrectFeedback: "Solo habría uno si $\\sin B = 1$ o si $a \\geq b$." },
        { id: "c", label: "Dos", incorrectFeedback: "Habría dos si $\\sin B < 1$ y $a < b$. Aquí $\\sin B$ no existe." },
        { id: "d", label: "Infinitos", incorrectFeedback: "Los datos fijan el triángulo salvo, a lo sumo, la ambigüedad de dos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sin B = \\frac{10\\cdot 0{,}5}{3} = 1{,}67 > 1$: el lado $a = 3$ es demasiado corto para llegar al otro lado.",
    },
    {
      id: "check-un-triangulo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si el lado opuesto al ángulo dado es **mayor o igual** que el otro lado, el ángulo opuesto al otro es menor: no puede ser obtuso." }],
      title: "El lado grande no deja ambigüedad",
      question: "Con $a = 12$, $b = 10$ y $A = 30^\\circ$, ¿cuántos triángulos hay?",
      choices: [
        { id: "a", label: "Uno" },
        { id: "b", label: "Dos", incorrectFeedback: "El segundo ángulo posible sería $B = 180^\\circ - 24{,}6^\\circ = 155{,}4^\\circ$, pero $30^\\circ + 155{,}4^\\circ = 185{,}4^\\circ > 180^\\circ$: no cabe en un triángulo." },
        { id: "c", label: "Ninguno", incorrectFeedback: "$\\sin B = \\frac{10\\cdot 0{,}5}{12} \\approx 0{,}417 < 1$: el triángulo existe." },
        { id: "d", label: "Tres", incorrectFeedback: "Nunca hay más de dos soluciones." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sin B \\approx 0{,}417 \\Rightarrow B \\approx 24{,}6^\\circ$ o $155{,}4^\\circ$. La segunda no cabe ($30^\\circ + 155{,}4^\\circ > 180^\\circ$): hay **un** triángulo. En general, si $a \\geq b$ no hay ambigüedad.",
    },
  ],
};
