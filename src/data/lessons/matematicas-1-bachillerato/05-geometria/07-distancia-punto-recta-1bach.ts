import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const distanciaPuntoRecta1bachLesson: InteractiveLesson = {
  slug: "distancia-punto-recta-1bach",
  title: "7. Ángulos y distancias",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "angulo",
      type: "slide",
      help: [{ label: "Agudo", message: "Dos rectas secantes forman cuatro ángulos: dos iguales agudos y dos iguales obtusos suplementarios. Se suele dar el agudo." }],
      title: "Ángulo entre dos rectas",
      blocks: [
        { kind: "rule", title: "Con sus vectores directores", formula: "\\cos\\theta = \\dfrac{|\\vec{d}_1\\cdot\\vec{d}_2|}{|\\vec{d}_1|\\,|\\vec{d}_2|}" },
        { kind: "text", text: "El valor absoluto da el **ángulo agudo**. Las rectas son **perpendiculares** si $\\vec{d}_1\\cdot\\vec{d}_2 = 0$, es decir, $A_1A_2 + B_1B_2 = 0$." },
        { kind: "example", title: "x + y = 4 y x − y = 1", lines: [
          { math: "\\vec{d}_1 = (1, -1),\\ \\vec{d}_2 = (1, 1)\\Rightarrow \\vec{d}_1\\cdot\\vec{d}_2 = 0\\Rightarrow \\theta = 90^\\circ" },
        ] },
      ],
      visual: { kind: "tool", tool: "rectas-angulo-explorador", initial: [1, 0, 0, 0, 1, 2], hint: "Las rectas x = 0 e y = 2 son perpendiculares (90°). Pon A₂ = 1: el ángulo pasa a ser 45°." },
    },
    {
      id: "check-angulo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\vec{d}_1 = (1, 0)$ (eje $X$) y $\\vec{d}_2 = (1, 1)$ (la bisectriz)." }],
      title: "Un ángulo entre rectas",
      question: "¿Qué ángulo agudo forman las rectas $y = 0$ y $y = x$? (solo el número, en grados)",
      correctAnswers: ["45"],
      explanation: "$\\cos\\theta = \\frac{|1\\cdot 1 + 0\\cdot 1|}{1\\cdot\\sqrt{2}} = \\frac{\\sqrt{2}}{2} \\Rightarrow \\theta = 45^\\circ$.",
    },
    {
      id: "distancia",
      type: "slide",
      help: [{ label: "De dónde sale", message: "Se proyecta el vector que va de un punto cualquiera $Q$ de la recta a $P$ sobre el vector normal $(A, B)$: $\\frac{|\\vec{QP}\\cdot(A, B)|}{\\sqrt{A^2 + B^2}}$." }],
      title: "Distancia de un punto a una recta",
      blocks: [
        { kind: "rule", title: "Fórmula", formula: "d(P, r) = \\dfrac{|A x_0 + B y_0 + C|}{\\sqrt{A^2 + B^2}}" },
        { kind: "example", title: "P(2, 3) y r: 3x + 4y − 5 = 0", lines: [
          { math: "d = \\dfrac{|3\\cdot 2 + 4\\cdot 3 - 5|}{\\sqrt{9 + 16}} = \\dfrac{13}{5} = 2{,}6" },
        ] },
        { kind: "text", text: "La distancia se mide siempre sobre la **perpendicular** a la recta por $P$." },
      ],
      visual: { kind: "tool", tool: "distancia-punto-recta-explorador", initial: [3, 4, -5, 2, 3], hint: "Mueve P hasta la recta: la distancia es 0. El pie de la perpendicular es el punto más cercano." },
    },
    {
      id: "check-dist",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\frac{|0 + 0 - 10|}{\\sqrt{3^2 + 4^2}}$." }],
      title: "Distancia al origen",
      question: "¿A qué distancia está el origen de la recta $3x + 4y - 10 = 0$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$d = \\frac{|3\\cdot 0 + 4\\cdot 0 - 10|}{\\sqrt{25}} = \\frac{10}{5} = 2$.",
    },
    {
      id: "paralelas",
      type: "slide",
      help: [{ label: "Área", message: "Con la distancia del tercer vértice a la recta que contiene la base, el área del triángulo es $\\frac{1}{2}\\cdot\\text{base}\\cdot d$." }],
      title: "Entre paralelas y el área de un triángulo",
      blocks: [
        { kind: "text", text: "**Distancia entre dos rectas paralelas:** es la distancia de un punto cualquiera de una a la otra. Con $3x + 4y - 5 = 0$ y $3x + 4y + 5 = 0$: el punto $(0, \\tfrac{5}{4})$ de la primera está de la segunda a $\\frac{|5 + 5|}{5} = 2$." },
        { kind: "example", title: "Área del triángulo A(0, 0), B(4, 0), C(1, 3)", lines: [
          { math: "\\text{base } AB = 4\\qquad d(C,\\ AB) = 3\\quad\\Rightarrow\\quad \\text{Área} = \\tfrac{1}{2}\\cdot 4\\cdot 3 = 6" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-area",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La base $AB$ está sobre el eje $X$ y la altura es la ordenada de $C$." }],
      title: "Un área",
      question: "Calcula el área del triángulo de vértices $A(0, 0)$, $B(6, 0)$ y $C(2, 4)$. (solo el número)",
      correctAnswers: ["12"],
      explanation: "Base $6$ sobre el eje $X$ y altura $4$ (ordenada de $C$): $\\frac{1}{2}\\cdot 6\\cdot 4 = 12$.",
    },
    {
      id: "check-paralelas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con la misma $(A, B)$, la distancia es $\\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}$." }],
      title: "Distancia entre paralelas",
      question: "¿Qué distancia hay entre $3x + 4y - 5 = 0$ y $3x + 4y + 5 = 0$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Para rectas paralelas con la misma $(A, B)$: $d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}} = \\frac{10}{5} = 2$.",
    },
  ],
};
