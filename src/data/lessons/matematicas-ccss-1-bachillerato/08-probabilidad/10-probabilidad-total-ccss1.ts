import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_8_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadTotalCcss1Lesson: InteractiveLesson = {
  slug: "probabilidad-total-ccss1",
  title: "10. Teorema de la probabilidad total",
  subtitle: TEMA_CCSS1_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "teorema",
      type: "slide",
      help: [{ label: "Sistema completo", message: "$\\{A_1, A_2, \\ldots, A_n\\}$ es un sistema completo de sucesos si son incompatibles dos a dos y su unión es todo el espacio muestral: siempre ocurre uno, y solo uno." }],
      title: "Un suceso que puede llegar por varios caminos",
      blocks: [
        { kind: "rule", title: "Probabilidad total", formula: "P(B) = P(B/A_1)\\,P(A_1) + P(B/A_2)\\,P(A_2) + \\cdots + P(B/A_n)\\,P(A_n)" },
        { kind: "text", text: "Es lo que ya hacemos en un árbol: se **multiplica** por las ramas de cada camino que acaba en $B$ y se **suman** los caminos." },
      ],
      visual: { kind: "tool", tool: "prob-total-explorador", initial: [1, 0], hint: "Tres cajas con distinto número de bolas negras: P(negra) es la suma de las tres ramas. Es 113/360 ≈ 0,314." },
    },
    {
      id: "check-cajas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P = \\frac{1}{3}\\left(\\frac{4}{10} + \\frac{1}{6} + \\frac{3}{8}\\right)$." }],
      title: "Tres cajas",
      question: "Caja A: $4$ negras de $10$; caja B: $1$ negra de $6$; caja C: $3$ negras de $8$. Se elige una caja al azar y se saca una bola. ¿Cuál es la probabilidad de que sea negra? (fracción)",
      correctAnswers: ["113/360"],
      explanation: "$\\dfrac{1}{3}\\cdot\\dfrac{4}{10} + \\dfrac{1}{3}\\cdot\\dfrac{1}{6} + \\dfrac{1}{3}\\cdot\\dfrac{3}{8} = \\dfrac{113}{360} \\approx 0{,}314$.",
    },
    {
      id: "check-moneda",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Si sale cara ($\\frac{3}{5}$), de $1$ a $8$ hay $4$ impares; si sale cruz ($\\frac{2}{5}$), de $1$ a $6$ hay $3$." }],
      title: "Moneda trucada y números",
      question: "Una moneda trucada da cara con probabilidad $\\frac{3}{5}$ y cruz con $\\frac{2}{5}$. Si sale cara se elige un número del $1$ al $8$ y si sale cruz, del $1$ al $6$. ¿Cuál es la probabilidad de que el número sea **impar**? (decimal)",
      correctAnswers: ["0,5", "0.5", "1/2"],
      explanation: "$\\dfrac{3}{5}\\cdot\\dfrac{4}{8} + \\dfrac{2}{5}\\cdot\\dfrac{3}{6} = \\dfrac{3}{10} + \\dfrac{1}{5} = \\dfrac{1}{2}$.",
    },
    {
      id: "check-tornillos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Primero $P(\\text{defectuoso}) = \\frac{15}{120}\\cdot 0{,}01 + \\frac{30}{120}\\cdot 0{,}02 + \\frac{75}{120}\\cdot 0{,}03$." }],
      title: "Tres máquinas",
      question: "En una caja hay $120$ tornillos: $15$ de la máquina A ($1\\,\\%$ defectuosos), $30$ de la B ($2\\,\\%$) y $75$ de la C ($3\\,\\%$). ¿Cuál es la probabilidad de que un tornillo al azar **no** sea defectuoso? (decimal)",
      correctAnswers: ["0,975", "0.975"],
      explanation: "$P(\\text{defectuoso}) = \\dfrac{0{,}15 + 0{,}6 + 2{,}25}{120} = \\dfrac{3}{120} = 0{,}025$, luego $P(\\text{correcto}) = 0{,}975$.",
    },
    {
      id: "check-condicion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si $A_1$ y $A_2$ no cubren todo $E$, faltaría algún camino hacia $B$." }],
      title: "Cuándo se puede aplicar",
      question: "Para aplicar el teorema de la probabilidad total, los sucesos $A_1, \\ldots, A_n$ deben…",
      choices: [
        { id: "a", label: "ser incompatibles dos a dos y cubrir todo el espacio muestral" },
        { id: "b", label: "ser independientes entre sí", incorrectFeedback: "Si fueran independientes (y con probabilidad no nula) no serían incompatibles. Lo que se exige es que formen una partición de $E$." },
        { id: "c", label: "tener todos la misma probabilidad", incorrectFeedback: "No hace falta: en el ejemplo de los tornillos valen $\\frac{1}{8}$, $\\frac{1}{4}$ y $\\frac{5}{8}$." },
        { id: "d", label: "ser compatibles con $B$", incorrectFeedback: "Lo importante es que formen una partición del espacio muestral." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Deben formar un **sistema completo**: siempre ocurre uno y solo uno, de modo que $B$ se reparte entre ellos sin repeticiones ni huecos.",
    },
  ],
};
