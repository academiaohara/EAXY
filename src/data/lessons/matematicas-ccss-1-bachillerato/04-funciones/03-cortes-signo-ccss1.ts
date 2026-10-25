import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_4_SUBTITLE } from "@/data/lessons/shared";

export const cortesSignoCcss1Lesson: InteractiveLesson = {
  slug: "cortes-signo-ccss1",
  title: "3. Cortes con los ejes y signo",
  subtitle: TEMA_CCSS1_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cortes",
      type: "slide",
      help: [{ label: "Pueden no existir", message: "Una función tiene como mucho **un** punto de corte con el eje $Y$ (si $0 \\in \\text{Dom} f$), pero puede tener varios con el eje $X$, o ninguno." }],
      title: "Dónde corta a los ejes",
      blocks: [
        { kind: "rule", title: "Eje Y y eje X", text: "**Eje $Y$:** se hace $x = 0$ y se calcula $f(0)$. **Eje $X$:** se resuelve $f(x) = 0$ (las raíces)." },
        { kind: "example", title: "f(x) = x² − x − 6", lines: [
          { math: "x = 0 \\Rightarrow f(0) = -6:\\quad (0, -6)" },
          { math: "x^2 - x - 6 = 0 \\Rightarrow x = -2,\\ x = 3:\\quad (-2, 0)\\ \\text{y}\\ (3, 0)" },
        ] },
      ],
      visual: { kind: "tool", tool: "signo-explorador", initial: [-2, 3, 0, 0, 1], hint: "Observa que la parábola pasa por los puntos amarillos (raíces) y por el verde (corte con el eje Y)." },
    },
    {
      id: "check-y",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$f(0) = (0 - 1)(0 + 4)$." }],
      title: "Corte con el eje Y",
      question: "¿Cuál es la ordenada del punto de corte de $f(x) = (x - 1)(x + 4)$ con el eje $Y$? (solo el número)",
      correctAnswers: ["-4", "−4"],
      explanation: "$f(0) = (-1)(4) = -4$: el punto es $(0, -4)$.",
    },
    {
      id: "signo",
      type: "slide",
      help: [{ label: "Raíz doble", message: "Si un factor aparece al cuadrado, $(x - a)^2$, la función **toca** el eje en $a$ sin cruzarlo: el signo no cambia." }],
      title: "El signo de una función",
      blocks: [
        { kind: "steps", items: [
          "Se hallan las **raíces** y los puntos **fuera del dominio**: dividen la recta en intervalos.",
          "En cada intervalo el signo **no cambia**: basta evaluar un punto cualquiera.",
          "Se recogen en una **tabla de signos**.",
        ] },
        { kind: "example", title: "f(x) = (x + 2)(x − 3)", lines: [
          { math: "(-\\infty, -2):\\ f(-3) = 6 > 0\\qquad (-2, 3):\\ f(0) = -6 < 0\\qquad (3, +\\infty):\\ f(4) = 6 > 0" },
        ] },
      ],
      visual: { kind: "tool", tool: "signo-explorador", initial: [-2, 3, 1, 1, 1], hint: "Con tres raíces distintas el signo alterna en cada una. Iguala dos raíces: en la raíz doble la curva toca el eje y no cambia de signo." },
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Evalúa un punto del intervalo $(-2, 3)$, por ejemplo $x = 0$: $f(0) = -6$." }],
      title: "¿Dónde es negativa?",
      question: "La función $f(x) = (x + 2)(x - 3)$ es negativa en…",
      choices: [
        { id: "a", label: "$(-2,\\ 3)$" },
        { id: "b", label: "$(-\\infty,\\ -2) \\cup (3,\\ +\\infty)$", incorrectFeedback: "Ahí es positiva: $f(-3) = 6 > 0$ y $f(4) = 6 > 0$." },
        { id: "c", label: "$(-\\infty,\\ -2)$", incorrectFeedback: "Ahí $f(-3) = 6$ es positiva." },
        { id: "d", label: "$(3,\\ +\\infty)$", incorrectFeedback: "Ahí $f(4) = 6$ es positiva." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Es una parábola hacia arriba con raíces $-2$ y $3$: negativa entre ellas.",
    },
    {
      id: "check-cortes-x",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x^3 - x = x(x - 1)(x + 1)$." }],
      title: "Cortes con el eje X",
      question: "¿En cuántos puntos corta $f(x) = x^3 - x$ al eje $X$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$x^3 - x = x(x - 1)(x + 1) = 0$ en $x = 0, 1, -1$: tres puntos.",
    },
    {
      id: "check-doble",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$(x - 1)^2 \\geq 0$ siempre; el signo lo decide el factor $(x + 2)$." }],
      title: "Una raíz doble",
      question: "En $f(x) = (x - 1)^2 (x + 2)$, al pasar por $x = 1$ el signo de $f$…",
      choices: [
        { id: "a", label: "no cambia, porque $x = 1$ es raíz doble" },
        { id: "b", label: "cambia de positivo a negativo", incorrectFeedback: "Una raíz de multiplicidad par no produce cambio de signo." },
        { id: "c", label: "cambia de negativo a positivo", incorrectFeedback: "Una raíz de multiplicidad par no produce cambio de signo." },
        { id: "d", label: "no se puede saber", incorrectFeedback: "Sí: $(x - 1)^2 \\geq 0$ y solo $x + 2$ puede cambiar el signo (en $x = -2$)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(x - 1)^2$ es siempre $\\geq 0$: la curva **toca** el eje en $x = 1$ y sigue por el mismo lado.",
    },
  ],
};
