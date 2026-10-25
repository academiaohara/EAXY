import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const recorridoSimetrias1bachLesson: InteractiveLesson = {
  slug: "recorrido-simetrias-1bach",
  title: "2. Recorrido, simetrías y periodicidad",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "recorrido",
      type: "slide",
      help: [{ label: "Cómo se halla", message: "Con la gráfica, se proyecta sobre el eje $Y$. Analíticamente, se despeja $x$ en $y = f(x)$ y se ve para qué $y$ tiene solución." }],
      title: "El recorrido: los valores que alcanza",
      blocks: [
        { kind: "text", text: "El **recorrido** (o **imagen**) de $f$ es el conjunto de valores $y$ que $f$ toma. Se lee proyectando la gráfica sobre el **eje $Y$**; el dominio, sobre el eje $X$." },
        { kind: "example", lines: [
          { math: "f(x) = x^2 \\Rightarrow \\text{Im} f = [0, +\\infty)\\qquad f(x) = \\sqrt{x} \\Rightarrow \\text{Im} f = [0, +\\infty)" },
          { math: "f(x) = \\dfrac{1}{x} \\Rightarrow \\text{Im} f = \\mathbb{R} - \\{0\\}\\qquad f(x) = \\sin x \\Rightarrow \\text{Im} f = [-1, 1]" },
        ] },
      ],
      visual: { kind: "anim", scene: "dominio-recorrido" },
    },
    {
      id: "simetria",
      type: "slide",
      help: [{ label: "Para qué sirve", message: "Si sabes que una función es par o impar, te basta estudiarla en $x \\geq 0$ y completar el resto por simetría." }],
      title: "Funciones pares e impares",
      blocks: [
        { kind: "rule", title: "Par", text: "$f(-x) = f(x)$ para todo $x$ del dominio. Gráfica simétrica respecto del **eje $Y$**.", formula: "f(x) = x^2,\\ |x|,\\ \\cos x" },
        { kind: "rule", title: "Impar", text: "$f(-x) = -f(x)$ para todo $x$ del dominio. Gráfica simétrica respecto del **origen**.", formula: "f(x) = x^3,\\ \\sin x,\\ \\dfrac{1}{x}" },
        { kind: "text", text: "Para decidirlo se calcula $f(-x)$ y se compara con $f(x)$ y con $-f(x)$. Muchas funciones no son ni pares ni impares." },
      ],
      visual: { kind: "tool", tool: "simetria-explorador", initial: [3, 3], hint: "Recorre las diez funciones: ¿cuáles dan f(−x₀) igual a f(x₀), cuáles el opuesto y cuáles ninguna de las dos?" },
    },
    {
      id: "check-impar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Impar: $f(-2) = -f(2)$." }],
      title: "Una función impar",
      question: "Si $f$ es **impar** y $f(2) = 5$, ¿cuánto vale $f(-2)$? (solo el número)",
      correctAnswers: ["-5", "−5"],
      explanation: "$f(-2) = -f(2) = -5$ (simetría respecto del origen).",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Sustituye $x$ por $-x$: potencias pares no cambian, potencias impares cambian de signo; los términos independientes no cambian." }],
      title: "¿Par o impar?",
      question: "Clasifica cada función.",
      groups: [
        { id: "par", label: "Par", tone: "emerald" },
        { id: "impar", label: "Impar", tone: "cobalt" },
        { id: "no", label: "Ni par ni impar", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$x^4 - 2x^2 + 3$", group: "par" },
        { id: "b", text: "$x^5 - x$", group: "impar" },
        { id: "c", text: "$x^2 + x$", group: "no" },
        { id: "d", text: "$\\cos x$", group: "par" },
        { id: "e", text: "$\\sin x$", group: "impar" },
        { id: "f", text: "$x^3 + 1$", group: "no" },
      ],
      hint: "$x^3 + 1$: $f(-x) = -x^3 + 1$, que no es $f(x)$ ni $-f(x) = -x^3 - 1$.",
    },
    {
      id: "periodica",
      type: "slide",
      help: [{ label: "Periodo", message: "El periodo es el **menor** $T > 0$ con $f(x + T) = f(x)$. Seno y coseno tienen periodo $2\\pi$ y la tangente, $\\pi$." }],
      title: "Funciones periódicas",
      blocks: [
        { kind: "definition", text: "$f$ es **periódica** de periodo $T$ si $f(x + T) = f(x)$ para todo $x$ del dominio. Su gráfica se repite cada $T$ unidades: basta estudiar un periodo." },
        { kind: "example", lines: [
          { math: "T = 4,\\ f(1) = 7:\\quad f(5) = f(9) = f(-3) = 7" },
          { math: "\\sin(x + 2\\pi) = \\sin x\\qquad \\tan(x + \\pi) = \\tan x" },
        ] },
      ],
      visual: { kind: "tool", tool: "periodica-explorador", initial: [4, 11], hint: "Cambia el periodo y el instante: el resto de dividir t entre T indica en qué punto del ciclo está." },
    },
    {
      id: "check-periodo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$9 = 1 + 2\\cdot 4$: dos periodos más que $x = 1$." }],
      title: "Aprovechar el periodo",
      question: "$f$ es periódica de periodo $4$ y $f(1) = 7$. ¿Cuánto vale $f(9)$? (solo el número)",
      correctAnswers: ["7"],
      explanation: "$9 = 1 + 2\\cdot 4$, así que $f(9) = f(1) = 7$.",
    },
  ],
};
