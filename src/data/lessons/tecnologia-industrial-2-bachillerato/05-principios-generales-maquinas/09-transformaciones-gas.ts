import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const transformacionesGasLesson: InteractiveLesson = {
  slug: "transformaciones-gas",
  title: "9. Transformaciones de un gas en un cilindro",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "isobarica",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale F = p S?",
          message: "La presión es la fuerza repartida sobre la superficie: $p = F/S$. Despejando, la fuerza sobre el pistón es $F = p\\,S$.",
        },
      ],
      title: "Trabajo de expansión a presión constante",
      blocks: [
        {
          kind: "text",
          text: "Un gas en un cilindro puede evolucionar de varias formas: **isobárica** (presión constante), **isoterma** (temperatura constante), **isocora** (volumen constante), **adiabática** (sin intercambio de calor) y **politrópica** (generalización).",
        },
        {
          kind: "rule",
          title: "Isobárica",
          formula: "W = F\\,\\Delta x = p\\,S\\,\\Delta x = p\\,\\Delta V",
          text: "En el diagrama $p$–$V$, el trabajo es el **área encerrada** bajo la curva entre $V_1$ y $V_2$.",
        },
      ],
      visual: { kind: "anim", scene: "piston-trabajo", beatMs: 4500 },
    },
    {
      id: "check-cilindro",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Unidades SI", message: "$p = 6$ kp/cm² $= 588\\,000$ Pa. $\\Delta V = \\dfrac{\\pi D^2}{4}\\,\\Delta x$ con $D = 0{,}02$ m y $\\Delta x = 0{,}1$ m." }],
      title: "Cilindro neumático",
      question: "Un cilindro neumático de $20$ mm de diámetro y $100$ mm de carrera se alimenta con $6$ kp/cm². ¿Qué trabajo, en julios, desarrolla en una salida del vástago? (con una decimal)",
      correctAnswers: ["18,5", "18.5", "18,47", "18.47"],
      explanation: "$\\Delta V = \\pi\\cdot 0{,}02^2/4\\cdot 0{,}1 = \\pi\\cdot 10^{-5}$ m³ y $W = 588\\,000\\cdot \\pi\\cdot 10^{-5} = 18{,}47$ J.",
    },
    {
      id: "explora-pv",
      type: "slide",
      help: [
        {
          label: "¿Qué cambia entre isoterma y adiabática?",
          message: "En la isoterma $p\\,V = $ cte; en la adiabática $p\\,V^{\\gamma} = $ cte, con $\\gamma \\approx 1{,}4$ para el aire. Por eso la adiabática tiene más pendiente.",
        },
      ],
      title: "Explora las transformaciones en el diagrama p–V",
      blocks: [
        {
          kind: "text",
          text: "Elige una transformación, cambia las condiciones iniciales y la expansión (o compresión). Compara la isoterma con la adiabática: misma $p_1$, $V_1$ y $V_2$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "p\\,V^n = \\text{cte}", label: "ecuación de la politrópica" },
            { tex: "n = 0", label: "isobárica" },
            { tex: "n = 1", label: "isoterma" },
            { tex: "n = \\gamma \\approx 1{,}4", label: "adiabática" },
            { tex: "n = \\pm\\infty", label: "isocora" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "diagrama-pv", params: { a: 4, b: 1, c: 2 } },
    },
    {
      id: "clasifica-transformaciones",
      type: "classify",
      help: [{ label: "Pista", message: "Una isocora no tiene variación de volumen y, por tanto, no hay trabajo. En la isoterma cambian p y V con T constante." }],
      title: "Cada transformación, con su ecuación",
      question: "Relaciona cada ecuación o característica con la transformación del gas.",
      groups: [
        { id: "isobarica", label: "Isobárica", tone: "cobalt" },
        { id: "isoterma", label: "Isoterma", tone: "emerald" },
        { id: "isocora", label: "Isocora", tone: "amber" },
        { id: "adiabatica", label: "Adiabática", tone: "rose" },
      ],
      items: [
        { id: "a", text: "p = constante; W = p·ΔV", group: "isobarica" },
        { id: "b", text: "p·V = constante (ley de Boyle); W = C·ln(V₂/V₁)", group: "isoterma" },
        { id: "c", text: "V = constante: el trabajo es nulo", group: "isocora" },
        { id: "d", text: "p·V^γ = constante, sin intercambio de calor", group: "adiabatica" },
        { id: "e", text: "Ley de Gay-Lussac: p₁/T₁ = p₂/T₂", group: "isocora" },
        { id: "f", text: "Se puede considerar así la combustión de un motor, por rapidez", group: "adiabatica" },
      ],
      hint: "Identifica qué magnitud permanece constante.",
      explanation: "En la isobárica $p$ es constante; en la isoterma, $T$; en la isocora, $V$ (sin trabajo); en la adiabática no hay calor intercambiado.",
    },
    {
      id: "check-isoterma",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Isoterma", message: "$W = p_1V_1\\ln\\dfrac{V_2}{V_1}$. Con $p_1V_1 = 4$ bar·L, $\\ln 2 = 0{,}693$. Recuerda: $1$ bar·L $= 100$ J." }],
      title: "Expansión isoterma",
      question: "Un gas a $4$ bar ocupa $1$ L y se expande a temperatura constante hasta $2$ L. ¿Qué trabajo realiza, en julios? (redondea a la unidad)",
      correctAnswers: ["277"],
      explanation: "$W = p_1V_1\\ln(V_2/V_1) = 4\\cdot 1\\cdot \\ln 2 = 2{,}77$ bar·L $= 277$ J.",
    },
    {
      id: "check-isocora",
      type: "predict",
      help: [{ label: "Volumen", message: "El trabajo es $p\\,\\Delta V$." }],
      title: "Trabajo en una isocora",
      question: "En una transformación isocora, el trabajo es:",
      mode: "choice",
      choices: [
        { id: "nulo", label: "Nulo, porque no hay variación de volumen" },
        { id: "max", label: "Máximo, porque la presión cambia", incorrectFeedback: "El trabajo depende del cambio de volumen, no del de presión." },
        { id: "pv", label: "$p\\,V$", incorrectFeedback: "$p\\,V$ no es un trabajo: el trabajo es $p\\,\\Delta V$." },
      ],
      correctChoiceId: "nulo",
      shuffleChoices: true,
      explanation: "$W = p\\,\\Delta V = 0$ cuando $\\Delta V = 0$.",
    },
    {
      id: "check-adiabatica",
      type: "predict",
      help: [{ label: "Pendiente", message: "En una adiabática $p\\,V^{\\gamma} = $ cte con $\\gamma > 1$: la presión cae más deprisa que en la isoterma." }],
      title: "Adiabática frente a isoterma",
      question: "En el diagrama $p$–$V$, la curva adiabática, comparada con la isoterma por el mismo punto:",
      mode: "choice",
      choices: [
        { id: "pend", label: "Tiene más pendiente" },
        { id: "menos", label: "Tiene menos pendiente", incorrectFeedback: "Al contrario: $\\gamma > 1$ hace que la presión caiga más rápido." },
        { id: "igual", label: "Coincide con ella", incorrectFeedback: "Solo coinciden cuando $n = 1$; la adiabática tiene $n = \\gamma \\approx 1{,}4$." },
      ],
      correctChoiceId: "pend",
      shuffleChoices: true,
      explanation: "Es importante notar que la adiabática tiene más pendiente que la isoterma.",
    },
  ],
};
