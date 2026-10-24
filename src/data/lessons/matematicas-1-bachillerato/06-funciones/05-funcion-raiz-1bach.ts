import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const funcionRaiz1bachLesson: InteractiveLesson = {
  slug: "funcion-raiz-1bach",
  title: "5. La función raíz",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "par",
      type: "slide",
      help: [{ label: "Media parábola", message: "$y = \\sqrt{x}$ es la mitad de la parábola $x = y^2$: la rama superior. Es la inversa de $y = x^2$ restringida a $x \\geq 0$." }],
      title: "Raíz de índice par",
      blocks: [
        { kind: "rule", title: "f(x) = √x", formula: "\\text{Dom} f = [0, +\\infty)\\qquad \\text{Im} f = [0, +\\infty)\\qquad \\text{creciente}" },
        { kind: "text", text: "Con **índice par** el radicando no puede ser negativo. La gráfica nace en $(0, 0)$ y crece cada vez más despacio." },
      ],
      visual: { kind: "tool", tool: "funcion-raiz-explorador", initial: [2, 1, 0, 0], hint: "Mueve h: el dominio empieza en h. Cambia el signo de a: la rama baja en lugar de subir." },
    },
    {
      id: "impar",
      type: "slide",
      help: [{ label: "Simetría", message: "$\\sqrt[3]{-x} = -\\sqrt[3]{x}$: la raíz cúbica es una función impar, simétrica respecto del origen." }],
      title: "Raíz de índice impar",
      blocks: [
        { kind: "rule", title: "f(x) = ∛x", formula: "\\text{Dom} f = \\mathbb{R}\\qquad \\text{Im} f = \\mathbb{R}\\qquad \\text{creciente e impar}" },
        { kind: "text", text: "Con **índice impar** existe la raíz de cualquier número real: $\\sqrt[3]{-8} = -2$. Es la inversa de $y = x^3$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-dominio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$x + 3 \\geq 0$. La constante $-1$ y el factor $2$ no afectan al dominio." }],
      title: "Dominio con traslación",
      question: "¿Cuál es el dominio de $f(x) = 2\\sqrt{x + 3} - 1$?",
      choices: [
        { id: "a", label: "$[-3,\\ +\\infty)$" },
        { id: "b", label: "$[3,\\ +\\infty)$", incorrectFeedback: "$x + 3 \\geq 0$ da $x \\geq -3$." },
        { id: "c", label: "$[-1,\\ +\\infty)$", incorrectFeedback: "El $-1$ desplaza la gráfica hacia abajo y afecta al recorrido, no al dominio." },
        { id: "d", label: "$\\mathbb{R}$", incorrectFeedback: "El radicando $x + 3$ es negativo para $x < -3$ y no existe la raíz." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x + 3 \\geq 0 \\iff x \\geq -3$. El recorrido es $[-1, +\\infty)$ (el mínimo es $2\\cdot 0 - 1 = -1$).",
    },
    {
      id: "check-recorrido",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$\\sqrt{x} \\geq 0$, luego $-\\sqrt{x} \\leq 0$." }],
      title: "Recorrido de −√x",
      question: "¿Cuál es el recorrido de $f(x) = -\\sqrt{x}$?",
      choices: [
        { id: "a", label: "$(-\\infty,\\ 0]$" },
        { id: "b", label: "$[0,\\ +\\infty)$", incorrectFeedback: "El signo menos refleja la gráfica respecto del eje $X$: los valores son $\\leq 0$." },
        { id: "c", label: "$\\mathbb{R}$", incorrectFeedback: "$\\sqrt{x}$ nunca es negativa, así que $-\\sqrt{x}$ nunca es positiva." },
        { id: "d", label: "$(-\\infty,\\ 0)$", incorrectFeedback: "En $x = 0$ vale $0$: el $0$ sí está en el recorrido." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{x} \\in [0, +\\infty)$ y cambiar el signo da $(-\\infty, 0]$.",
    },
    {
      id: "check-cubica",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\sqrt[3]{x - 8}$ con $x = 0$: $\\sqrt[3]{-8}$." }],
      title: "Una raíz cúbica",
      question: "Si $f(x) = \\sqrt[3]{x - 8}$, ¿cuánto vale $f(0)$? (solo el número)",
      correctAnswers: ["-2", "−2"],
      explanation: "$f(0) = \\sqrt[3]{-8} = -2$. La raíz cúbica sí está definida para números negativos.",
    },
  ],
};
