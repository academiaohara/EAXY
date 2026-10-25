import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const circunferencia1bachLesson: InteractiveLesson = {
  slug: "circunferencia-1bach",
  title: "9. La circunferencia",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ecuacion",
      type: "slide",
      help: [{ label: "Por Pitágoras", message: "La distancia de $P(x, y)$ al centro $C(a, b)$ es $\\sqrt{(x-a)^2 + (y-b)^2}$. Igualarla a $r$ y elevar al cuadrado da la ecuación." }],
      title: "Los puntos a distancia r del centro",
      blocks: [
        { kind: "definition", text: "La **circunferencia** de centro $C(a, b)$ y radio $r$ es el lugar geométrico de los puntos del plano cuya distancia a $C$ es $r$." },
        { kind: "rule", title: "Ecuación reducida", formula: "(x - a)^2 + (y - b)^2 = r^2" },
        { kind: "example", lines: [
          { math: "\\text{Centro } (3, -2),\\ r = 5:\\quad (x - 3)^2 + (y + 2)^2 = 25" },
          { math: "\\text{Desarrollada: } x^2 + y^2 - 6x + 4y - 12 = 0" },
        ] },
      ],
      visual: { kind: "tool", tool: "conica-explorador", initial: [0, 5, 3, 3, -2], hint: "Mueve el centro y el radio y mira cómo cambian la ecuación reducida y la general." },
    },
    {
      id: "check-ecuacion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El centro es $(1, -2)$: aparece $x - 1$ y $y + 2$. El radio al cuadrado es $9$." }],
      title: "Escribir la ecuación",
      question: "¿Cuál es la ecuación de la circunferencia de centro $(1, -2)$ y radio $3$?",
      choices: [
        { id: "a", label: "$(x - 1)^2 + (y + 2)^2 = 9$" },
        { id: "b", label: "$(x + 1)^2 + (y - 2)^2 = 9$", incorrectFeedback: "Has cambiado los signos del centro: con centro $(1, -2)$ aparece $x - 1$ e $y + 2$." },
        { id: "c", label: "$(x - 1)^2 + (y + 2)^2 = 3$", incorrectFeedback: "A la derecha va $r^2 = 9$, no $r$." },
        { id: "d", label: "$(x - 1)^2 - (y + 2)^2 = 9$", incorrectFeedback: "Con una resta no es una circunferencia (sería una hipérbola)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(x - a)^2 + (y - b)^2 = r^2$ con $a = 1$, $b = -2$, $r = 3$.",
    },
    {
      id: "general",
      type: "slide",
      help: [{ label: "Cuándo es circunferencia", message: "Si $r^2 = \\frac{D^2}{4} + \\frac{E^2}{4} - F$ sale negativo, no hay ningún punto; si es $0$, es un solo punto." }],
      title: "De la forma general al centro y el radio",
      blocks: [
        { kind: "rule", title: "Ecuación general", formula: "x^2 + y^2 + D\\,x + E\\,y + F = 0\\ \\Rightarrow\\ C\\left(-\\tfrac{D}{2},\\ -\\tfrac{E}{2}\\right),\\quad r^2 = \\tfrac{D^2}{4} + \\tfrac{E^2}{4} - F" },
        { kind: "example", title: "x² + y² − 6x + 4y − 12 = 0", lines: [
          { math: "C = (3, -2)" },
          { math: "r^2 = 9 + 4 + 12 = 25 \\Rightarrow r = 5" },
        ] },
        { kind: "text", text: "Se llega a lo mismo **completando cuadrados**: $(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-radio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$C = (2, -3)$ y $r^2 = 4 + 9 + 3$." }],
      title: "El radio",
      question: "¿Cuál es el radio de $x^2 + y^2 - 4x + 6y - 3 = 0$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "$C = \\left(\\frac{4}{2}, -\\frac{6}{2}\\right) = (2, -3)$ y $r^2 = 4 + 9 - (-3) = 16$, luego $r = 4$.",
    },
    {
      id: "pertenece",
      type: "slide",
      help: [{ label: "Interior y exterior", message: "Si $(x_0 - a)^2 + (y_0 - b)^2 < r^2$ el punto es **interior**; si es mayor, **exterior**." }],
      title: "¿Está un punto en la circunferencia?",
      blocks: [
        { kind: "text", text: "Se sustituye el punto en la ecuación: si se cumple, pertenece; si el primer miembro es menor que $r^2$ está dentro, y si es mayor, fuera." },
        { kind: "example", title: "(x − 3)² + (y + 2)² = 25", lines: [
          { math: "P(3, 3):\\ 0 + 25 = 25\\ \\checkmark\\quad\\text{pertenece}" },
          { math: "Q(0, 2):\\ 9 + 16 = 25\\ \\checkmark\\quad\\text{pertenece}" },
          { math: "R(1, 0):\\ 4 + 4 = 8 < 25\\quad\\text{interior}" },
        ] },
        { kind: "text", text: "La **tangente** en $P$ es perpendicular al radio $CP$. Aquí $P(3, 3)$ está justo encima del centro, así que la tangente es la recta horizontal $y = 3$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-punto",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Sustituye cada punto en $(x - 1)^2 + (y + 2)^2$ y compara con $9$." }],
      title: "¿Qué punto pertenece?",
      question: "¿Cuál de estos puntos pertenece a la circunferencia $(x - 1)^2 + (y + 2)^2 = 9$?",
      choices: [
        { id: "a", label: "$(4,\\ -2)$" },
        { id: "b", label: "$(3,\\ 0)$", incorrectFeedback: "$4 + 4 = 8 < 9$: es un punto interior." },
        { id: "c", label: "$(2,\\ 1)$", incorrectFeedback: "$1 + 9 = 10 > 9$: es un punto exterior." },
        { id: "d", label: "$(0,\\ 0)$", incorrectFeedback: "$1 + 4 = 5 < 9$: es un punto interior." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(4 - 1)^2 + (-2 + 2)^2 = 9 + 0 = 9$: pertenece.",
    },
  ],
};
