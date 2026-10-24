import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const posicionesRelativas1bachLesson: InteractiveLesson = {
  slug: "posiciones-relativas-1bach",
  title: "6. Posiciones relativas de dos rectas",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tres",
      type: "slide",
      help: [{ label: "Sistema lineal", message: "Hallar los puntos comunes de dos rectas es resolver el sistema de sus dos ecuaciones: es el mismo sistema que viste en álgebra." }],
      title: "Secantes, paralelas o coincidentes",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\text{un punto común}", label: "secantes (sistema compatible determinado)" },
          { tex: "\\text{ningún punto común}", label: "paralelas (sistema incompatible)" },
          { tex: "\\text{infinitos puntos comunes}", label: "coincidentes (compatible indeterminado)" },
        ] },
        { kind: "rule", title: "Con A₁x + B₁y + C₁ = 0 y A₂x + B₂y + C₂ = 0", formula: "\\dfrac{A_1}{A_2} \\neq \\dfrac{B_1}{B_2}\\ \\text{secantes}\\qquad \\dfrac{A_1}{A_2} = \\dfrac{B_1}{B_2} \\neq \\dfrac{C_1}{C_2}\\ \\text{paralelas}\\qquad \\dfrac{A_1}{A_2} = \\dfrac{B_1}{B_2} = \\dfrac{C_1}{C_2}\\ \\text{coincidentes}" },
      ],
      visual: { kind: "tool", tool: "rectas-angulo-explorador", initial: [1, 1, 4, 1, -1, 1], hint: "Haz que A₂ y B₂ sean el doble de A₁ y B₁ y juega con C₂: ¿cuándo son paralelas y cuándo coincidentes?" },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Compara las razones $\\frac{A_1}{A_2}$, $\\frac{B_1}{B_2}$ y $\\frac{C_1}{C_2}$." }],
      title: "¿Qué posición?",
      question: "Clasifica cada pareja de rectas.",
      groups: [
        { id: "sec", label: "Secantes", tone: "emerald" },
        { id: "par", label: "Paralelas", tone: "amber" },
        { id: "coi", label: "Coincidentes", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "$x + 2y = 3$ y $2x + 4y = 6$", group: "coi" },
        { id: "b", text: "$x - y = 1$ y $2x - 2y = 5$", group: "par" },
        { id: "c", text: "$x + y = 2$ y $x - y = 0$", group: "sec" },
        { id: "d", text: "$3x - y = 4$ y $6x - 2y = 8$", group: "coi" },
        { id: "e", text: "$2x + y = 5$ y $2x + y = -1$", group: "par" },
        { id: "f", text: "$x + 3y = 1$ y $3x + y = 1$", group: "sec" },
      ],
      hint: "Si las razones de $A$ y $B$ coinciden, miras $C$: si también, coincidentes; si no, paralelas.",
    },
    {
      id: "corte",
      type: "slide",
      help: [{ label: "Comprobar", message: "Sustituye el punto en las dos ecuaciones: ambas deben cumplirse." }],
      title: "El punto de corte",
      blocks: [
        { kind: "example", title: "x + y = 4  y  x − y = 1", lines: [
          { math: "\\text{Sumando: } 2x = 5 \\Rightarrow x = \\tfrac{5}{2}" },
          { math: "y = 4 - \\tfrac{5}{2} = \\tfrac{3}{2}\\Rightarrow P\\left(\\tfrac{5}{2},\\ \\tfrac{3}{2}\\right)" },
        ] },
        { kind: "text", text: "Si al resolver sale $0 = 0$, las rectas coinciden; si sale un absurdo ($0 = 5$), son paralelas." },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "unica" } },
    },
    {
      id: "check-corte",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Suma $2x + y = 5$ y $x - y = 1$ para eliminar $y$." }],
      title: "Punto de corte",
      question: "Las rectas $2x + y = 5$ y $x - y = 1$ se cortan en un punto. ¿Cuál es su abscisa? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Sumando: $3x = 6 \\Rightarrow x = 2$, y $y = x - 1 = 1$. Punto de corte $(2, 1)$.",
    },
    {
      id: "check-paralela",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Una paralela mantiene $(A, B)$ y cambia $C$. Impón que pase por el punto." }],
      title: "Una paralela por un punto",
      question: "¿Cuál es la recta paralela a $2x - y + 1 = 0$ que pasa por $P(1, 5)$?",
      choices: [
        { id: "a", label: "$2x - y + 3 = 0$" },
        { id: "b", label: "$x + 2y - 11 = 0$", incorrectFeedback: "Esa es **perpendicular** a la dada (cambia $(A, B)$ a $(B, -A)$)." },
        { id: "c", label: "$2x - y + 1 = 0$", incorrectFeedback: "Es la propia recta dada: no pasa por $P$ ($2 - 5 + 1 \\neq 0$)." },
        { id: "d", label: "$2x - y - 3 = 0$", incorrectFeedback: "No pasa por $P$: $2 - 5 - 3 \\neq 0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La paralela es $2x - y + C = 0$ y debe cumplirse $2 - 5 + C = 0$, luego $C = 3$.",
    },
    {
      id: "check-coincidentes",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Para coincidir, las ecuaciones deben ser proporcionales: $\\frac{1}{2} = \\frac{2}{4} = \\frac{3}{k}$." }],
      title: "Un parámetro",
      question: "¿Qué valor de $k$ hace que $x + 2y = 3$ y $2x + 4y = k$ sean la misma recta? (solo el número)",
      correctAnswers: ["6"],
      explanation: "La segunda es el doble de la primera: $2x + 4y = 6$. Con cualquier otro $k$ serían paralelas.",
    },
  ],
};
