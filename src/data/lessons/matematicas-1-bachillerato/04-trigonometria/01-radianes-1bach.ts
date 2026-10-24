import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const radianes1bachLesson: InteractiveLesson = {
  slug: "radianes-1bach",
  title: "1. Medida de ángulos: grados y radianes",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "radian",
      type: "slide",
      help: [{ label: "Por qué radianes", message: "Con radianes, longitud de arco y ángulo se relacionan sin constantes ($s = \\theta r$), y las derivadas de seno y coseno son sencillas. Por eso en cálculo se usan siempre radianes." }],
      title: "El radián",
      blocks: [
        { kind: "definition", text: "Un **radián** es el ángulo central cuyo arco mide **lo mismo que el radio**. Como la circunferencia mide $2\\pi r$, una vuelta completa son $2\\pi$ radianes." },
        { kind: "rule", title: "Equivalencias", formula: "360^\\circ = 2\\pi\\ \\text{rad}\\qquad 180^\\circ = \\pi\\ \\text{rad}" },
      ],
      visual: { kind: "anim", scene: "radian-arco", params: { a: 3 } },
    },
    {
      id: "convertir",
      type: "slide",
      help: [{ label: "Regla de tres", message: "Para pasar de grados a radianes se multiplica por $\\frac{\\pi}{180}$; de radianes a grados, por $\\frac{180}{\\pi}$." }],
      title: "Pasar de grados a radianes y al revés",
      blocks: [
        { kind: "example", lines: [
          { math: "60^\\circ = 60\\cdot\\dfrac{\\pi}{180} = \\dfrac{\\pi}{3}\\qquad 225^\\circ = \\dfrac{5\\pi}{4}\\qquad 330^\\circ = \\dfrac{11\\pi}{6}" },
          { math: "\\dfrac{\\pi}{6}\\ \\text{rad} = 30^\\circ\\qquad \\dfrac{3\\pi}{2}\\ \\text{rad} = 270^\\circ" },
        ] },
        { kind: "text", text: "Se suelen dejar los radianes como **fracción de $\\pi$**." },
      ],
      visual: { kind: "tool", tool: "radianes-explorador", initial: [120, 2], hint: "Recorre 30°, 45°, 60°, 90°, 180°, 270° y 360° y anota su valor en radianes." },
    },
    {
      id: "check-pi",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$150^\\circ = 150\\cdot\\frac{\\pi}{180}$, y simplifica la fracción." }],
      title: "Grados a radianes",
      question: "¿Cuántos radianes son $150^\\circ$?",
      choices: [
        { id: "a", label: "$\\dfrac{5\\pi}{6}$" },
        { id: "b", label: "$\\dfrac{3\\pi}{4}$", incorrectFeedback: "$\\frac{3\\pi}{4}$ son $135^\\circ$." },
        { id: "c", label: "$\\dfrac{2\\pi}{3}$", incorrectFeedback: "$\\frac{2\\pi}{3}$ son $120^\\circ$." },
        { id: "d", label: "$\\dfrac{5\\pi}{3}$", incorrectFeedback: "$\\frac{5\\pi}{3}$ son $300^\\circ$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$150\\cdot\\frac{\\pi}{180} = \\frac{150\\pi}{180} = \\frac{5\\pi}{6}$.",
    },
    {
      id: "check-grados",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\frac{3\\pi}{2}\\cdot\\frac{180}{\\pi}$." }],
      title: "Radianes a grados",
      question: "¿Cuántos grados son $\\dfrac{3\\pi}{2}$ radianes? (solo el número)",
      correctAnswers: ["270"],
      explanation: "$\\frac{3\\pi}{2}\\cdot\\frac{180^\\circ}{\\pi} = 270^\\circ$.",
    },
    {
      id: "arco",
      type: "slide",
      help: [{ label: "Con grados", message: "Con grados habría que pasar antes a radianes: $s = \\frac{\\pi}{180}\\cdot\\alpha^\\circ\\cdot r$. Con radianes la fórmula es directa." }],
      title: "Longitud de un arco",
      blocks: [
        { kind: "rule", title: "Con el ángulo en radianes", formula: "s = \\theta\\cdot r" },
        { kind: "example", lines: [
          { math: "\\theta = 3\\ \\text{rad},\\ r = 2\\ \\text{m}\\Rightarrow s = 3\\cdot 2 = 6\\ \\text{m}" },
          { math: "\\theta = 40^\\circ = \\dfrac{2\\pi}{9}\\ \\text{rad},\\ r = 2\\ \\text{m}\\Rightarrow s = \\dfrac{4\\pi}{9}\\approx 1{,}40\\ \\text{m}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-arco",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$s = \\theta r$ con $\\theta = 1{,}5$ rad y $r = 4$ m." }],
      title: "Un arco",
      question: "Un móvil recorre un ángulo de $1{,}5$ rad en una circunferencia de radio $4$ m. ¿Cuántos metros ha recorrido? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$s = \\theta\\cdot r = 1{,}5\\cdot 4 = 6$ m.",
    },
  ],
};
