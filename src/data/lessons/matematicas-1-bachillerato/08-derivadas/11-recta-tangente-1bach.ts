import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const rectaTangente1bachLesson: InteractiveLesson = {
  slug: "recta-tangente-1bach",
  title: "11. La recta tangente",
  subtitle: TEMA_1BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ecuacion",
      type: "slide",
      help: [{ label: "Punto-pendiente", message: "Es la ecuación de la recta que pasa por $(a, f(a))$ con pendiente $m = f'(a)$." }],
      title: "Ecuación de la tangente",
      blocks: [
        { kind: "rule", title: "Tangente a y = f(x) en x = a", formula: "y = f(a) + f'(a)\\,(x - a)" },
        { kind: "example", title: "y = x³ + 3x en x = 1", lines: [
          { math: "f(1) = 1 + 3 = 4\\qquad f'(x) = 3x^2 + 3\\ \\Rightarrow\\ f'(1) = 6" },
          { math: "y = 4 + 6(x - 1) = 6x - 2" },
        ] },
      ],
      visual: { kind: "tool", tool: "funcion-derivada-explorador", initial: [1, 20], hint: "La recta amarilla es la tangente: la herramienta escribe su ecuación en cada punto. Con x³ − 3x en x = 2: y = 9x − 16." },
    },
    {
      id: "check-pendiente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f'(x) = 14x + 5$." }],
      title: "Pendiente de la tangente",
      question: "¿Qué pendiente tiene la tangente a $y = 7x^2 + 5x - 3$ en $x = 2$? (solo el número)",
      correctAnswers: ["33"],
      explanation: "$f'(x) = 14x + 5 \\Rightarrow f'(2) = 28 + 5 = 33$.",
    },
    {
      id: "check-ordenada",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f(2) = 28 + 10 - 3 = 35$ y la tangente es $y = 35 + 33(x - 2)$." }],
      title: "Ordenada en el origen de la tangente",
      question: "La tangente es $y = 35 + 33(x - 2) = 33x + n$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["-31", "−31"],
      explanation: "$35 + 33x - 66 = 33x - 31$, luego $n = -31$.",
    },
    {
      id: "check-montana",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$y' = 0{,}05 - 0{,}02x$." }],
      title: "El perfil de una montaña",
      question: "El perfil de una montaña es $y = 0{,}05x - 0{,}01x^2$ (km). ¿Qué pendiente tiene la tangente en $x = 1$? (decimal)",
      correctAnswers: ["0,03", "0.03"],
      explanation: "$y' = 0{,}05 - 0{,}02x$, y en $x = 1$ vale $0{,}03$.",
    },
    {
      id: "check-horizontal",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Una recta horizontal tiene pendiente $0$." }],
      title: "Tangente horizontal",
      question: "La tangente a la gráfica de $f$ en $x = a$ es horizontal cuando…",
      choices: [
        { id: "a", label: "$f'(a) = 0$" },
        { id: "b", label: "$f(a) = 0$", incorrectFeedback: "Eso significa que la gráfica corta el eje $X$, no que la tangente sea horizontal." },
        { id: "c", label: "$f''(a) = 0$", incorrectFeedback: "La segunda derivada informa de la curvatura, no de la pendiente." },
        { id: "d", label: "$f'(a)$ no existe", incorrectFeedback: "Si no existe la derivada, puede haber esquina o tangente vertical." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La pendiente de la tangente es $f'(a)$: es horizontal si y solo si vale $0$.",
    },
  ],
};
