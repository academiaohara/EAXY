import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const anguloDobleMitad1bachLesson: InteractiveLesson = {
  slug: "angulo-doble-mitad-1bach",
  title: "6. Razones del ángulo doble y del ángulo mitad",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "doble",
      type: "slide",
      help: [{ label: "De la suma", message: "Basta tomar $b = a$ en las fórmulas de la suma: $\\sin(a + a) = \\sin a\\cos a + \\cos a\\sin a = 2\\sin a\\cos a$." }],
      title: "Ángulo doble",
      blocks: [
        { kind: "rule", title: "Fórmulas del ángulo doble", formula: "\\sin 2a = 2\\sin a\\cos a\\qquad \\cos 2a = \\cos^2 a - \\sin^2 a\\qquad \\tan 2a = \\dfrac{2\\tan a}{1 - \\tan^2 a}" },
        { kind: "text", text: "Con $\\sin^2 a + \\cos^2 a = 1$ el coseno del ángulo doble también se escribe $\\cos 2a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$." },
      ],
      visual: { kind: "tool", tool: "doble-mitad-explorador", initial: [60], hint: "Comprueba cada fórmula con distintos ángulos: el valor directo y el de la fórmula coinciden." },
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Sin calculadora", message: "Conocida una razón y el cuadrante, se hallan las demás con $\\sin^2 + \\cos^2 = 1$ y después se aplican las fórmulas." }],
      title: "Ejemplo: cos α = 3/5, α agudo",
      blocks: [
        { kind: "steps", items: [
          "Del cuadrante I: $\\sin\\alpha = \\sqrt{1 - \\frac{9}{25}} = \\frac{4}{5}$.",
          "$\\sin 2\\alpha = 2\\cdot\\frac{4}{5}\\cdot\\frac{3}{5} = \\frac{24}{25}$.",
          "$\\cos 2\\alpha = \\frac{9}{25} - \\frac{16}{25} = -\\frac{7}{25}$.",
        ] },
        { kind: "text", text: "Se puede comprobar: $\\left(\\frac{24}{25}\\right)^2 + \\left(\\frac{-7}{25}\\right)^2 = \\frac{576 + 49}{625} = 1$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-sen2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\sin 2\\alpha = 2\\sin\\alpha\\cos\\alpha = 2\\cdot\\frac{4}{5}\\cdot\\frac{3}{5}$." }],
      title: "sen 2α",
      question: "Si $\\sin\\alpha = \\dfrac{4}{5}$ y $\\cos\\alpha = \\dfrac{3}{5}$, ¿cuánto vale $\\sin 2\\alpha$? (con coma decimal)",
      correctAnswers: ["0,96", "0.96", "24/25"],
      explanation: "$\\sin 2\\alpha = 2\\cdot\\frac{4}{5}\\cdot\\frac{3}{5} = \\frac{24}{25} = 0{,}96$.",
    },
    {
      id: "mitad",
      type: "slide",
      help: [{ label: "De dónde sale", message: "Despejando de $\\cos a = 1 - 2\\sin^2\\frac{a}{2}$ queda $\\sin\\frac{a}{2} = \\pm\\sqrt{\\frac{1 - \\cos a}{2}}$, y de $\\cos a = 2\\cos^2\\frac{a}{2} - 1$, el coseno." }],
      title: "Ángulo mitad",
      blocks: [
        { kind: "rule", title: "Fórmulas del ángulo mitad", formula: "\\sin\\dfrac{a}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos a}{2}}\\qquad \\cos\\dfrac{a}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos a}{2}}\\qquad \\tan\\dfrac{a}{2} = \\pm\\sqrt{\\dfrac{1 - \\cos a}{1 + \\cos a}}" },
        { kind: "warning", text: "El signo $\\pm$ lo decide el **cuadrante de $\\dfrac{a}{2}$**, no el de $a$." },
        { kind: "example", title: "cos 15° con a = 30°", lines: [
          { math: "\\cos 15^\\circ = +\\sqrt{\\dfrac{1 + \\cos 30^\\circ}{2}} = \\sqrt{\\dfrac{2 + \\sqrt{3}}{4}} \\approx 0{,}9659" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si $a = 200^\\circ$, entonces $\\frac{a}{2} = 100^\\circ$, que está en el cuadrante II." }],
      title: "El signo de la raíz",
      question: "Para $a = 200^\\circ$, ¿qué signo tiene $\\cos\\dfrac{a}{2}$ en la fórmula $\\cos\\dfrac{a}{2} = \\pm\\sqrt{\\dfrac{1 + \\cos a}{2}}$?",
      choices: [
        { id: "a", label: "Negativo, porque $\\frac{a}{2} = 100^\\circ$ está en el cuadrante II" },
        { id: "b", label: "Positivo, porque $a = 200^\\circ$ está en el cuadrante III", incorrectFeedback: "El signo lo decide el cuadrante del **ángulo mitad** ($100^\\circ$), no el de $a$." },
        { id: "c", label: "Positivo, porque la raíz cuadrada siempre es positiva", incorrectFeedback: "Por eso lleva el $\\pm$ delante: el signo se elige según el cuadrante." },
        { id: "d", label: "No se puede decidir", incorrectFeedback: "Sí se puede: basta ver en qué cuadrante cae $\\frac{a}{2}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{a}{2} = 100^\\circ$ está en el cuadrante II, donde el coseno es negativo: $\\cos 100^\\circ = -\\sqrt{\\frac{1 + \\cos 200^\\circ}{2}} \\approx -0{,}1736$.",
    },
    {
      id: "check-mitad",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\sin\\frac{\\alpha}{2} = \\sqrt{\\frac{1 - \\frac{3}{5}}{2}} = \\sqrt{\\frac{1}{5}}$." }],
      title: "sen(α/2)",
      question: "Si $\\cos\\alpha = \\dfrac{3}{5}$ y $\\alpha$ es agudo, ¿cuánto vale $\\sin\\dfrac{\\alpha}{2}$? (redondeado a **dos decimales**, con coma)",
      correctAnswers: ["0,45", "0.45"],
      explanation: "$\\sin\\frac{\\alpha}{2} = \\sqrt{\\frac{1 - 3/5}{2}} = \\sqrt{\\frac{1}{5}} \\approx 0{,}447 \\approx 0{,}45$.",
    },
  ],
};
