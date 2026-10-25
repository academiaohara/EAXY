import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNoLinealesGraficaCcss1Lesson: InteractiveLesson = {
  slug: "sistemas-no-lineales-grafica-ccss1",
  title: "20. Sistemas no lineales y comprobación gráfica",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "sustitucion",
      type: "slide",
      help: [{ label: "Idea", message: "Se despeja una incógnita de la ecuación de primer grado, se sustituye en la otra y se resuelve la ecuación resultante." }],
      title: "Sustitución en un sistema no lineal",
      blocks: [
        { kind: "definition", text: "Un sistema es **no lineal** cuando al menos una de sus ecuaciones no es de primer grado. Su solución es cada par $(x, y)$ que cumple las dos ecuaciones." },
        { kind: "steps", items: ["Despeja una incógnita (si puedes, de la ecuación de primer grado).", "Sustitúyela en la otra ecuación.", "Resuelve la ecuación que sale.", "Calcula la otra incógnita para cada valor.", "Comprueba cada par en las dos ecuaciones."] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x²", "+", "y²", "=", "25"], active: [2, 2], note: "de $x + y = 7$ despejamos $y = 7 - x$ y lo sustituimos." },
            { tokens: ["x²", "+", "(7−x)²", "=", "25"], active: [2, 2], note: "sustituimos y desarrollamos $(7 - x)^2$." },
            { tokens: ["2x²", "−", "14x", "+", "24", "=", "0"], active: [0, 6], note: "dividimos entre $2$: $x^2 - 7x + 12 = 0$." },
            { tokens: ["x", "=", "3", "o", "x", "=", "4"], fresh: [2, 6], note: "con $y = 7 - x$: $(3, 4)$ y $(4, 3)$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "grafica",
      type: "slide",
      help: [{ label: "Interpretación", message: "Cada ecuación es una curva en el plano; las soluciones del sistema son los puntos donde se cortan." }],
      title: "Las soluciones son los puntos de corte",
      blocks: [
        { kind: "text", text: "La ecuación $x^2 + y^2 = 25$ es una circunferencia y $x + y = 7$, una recta. Sus puntos de corte son $(3, 4)$ y $(4, 3)$. Una recta y una curva pueden cortarse en $0$, $1$ ó $2$ puntos: ese es el número de soluciones." },
      ],
      visual: { kind: "tool", tool: "sistema-no-lineal-explorador", initial: [0, -1, 7], hint: "Con la circunferencia x² + y² = 25, la recta y = −x + 7 la corta en (3, 4) y (4, 3). Mueve n hasta que sea tangente." },
    },
    {
      id: "check-hiperbola",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "De $x + y = 5$: $y = 5 - x$. Entonces $x(5 - x) = 6$." }],
      title: "Con una hipérbola",
      question: "Resuelve $\\begin{cases} xy = 6 \\\\ x + y = 5 \\end{cases}$. ¿Cuál es el **menor** de los dos valores de $x$?",
      correctAnswers: ["2"],
      explanation: "$x(5 - x) = 6 \\Rightarrow x^2 - 5x + 6 = 0 \\Rightarrow x = 2$ ó $x = 3$. Las soluciones son $(2, 3)$ y $(3, 2)$.",
    },
    {
      id: "check-parabola",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $y = x^2$ en $y = x + 2$: $x^2 = x + 2$." }],
      title: "Parábola y recta",
      question: "Resuelve $\\begin{cases} y = x^2 \\\\ y = x + 2 \\end{cases}$. ¿Cuál es el valor **positivo** de $x$?",
      correctAnswers: ["2"],
      explanation: "$x^2 - x - 2 = 0 \\Rightarrow x = -1$ ó $x = 2$. Puntos: $(-1, 1)$ y $(2, 4)$.",
    },
    {
      id: "check-tangente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Sustituye $y = 5$ en $x^2 + y^2 = 25$." }],
      title: "Un solo punto de corte",
      question: "¿Cuántas soluciones tiene $\\begin{cases} x^2 + y^2 = 25 \\\\ y = 5 \\end{cases}$?",
      choices: [
        { id: "a", label: "Una: $(0, 5)$, porque la recta es tangente a la circunferencia" },
        { id: "b", label: "Dos", incorrectFeedback: "Al sustituir queda $x^2 = 0$, que solo tiene la solución doble $x = 0$." },
        { id: "c", label: "Ninguna", incorrectFeedback: "$(0, 5)$ cumple las dos ecuaciones: $0 + 25 = 25$ y $y = 5$." },
        { id: "d", label: "Infinitas", incorrectFeedback: "Una recta y una circunferencia nunca comparten infinitos puntos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^2 + 25 = 25 \\Rightarrow x = 0$ (raíz doble): la recta toca la circunferencia en un solo punto, $(0, 5)$.",
    },
    {
      id: "check-sin",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Con $y = 6$: $x^2 + 36 = 25$." }],
      title: "Sin solución",
      question: "El sistema $\\begin{cases} x^2 + y^2 = 25 \\\\ y = 6 \\end{cases}$ no tiene solución real. ¿Por qué?",
      choices: [
        { id: "a", label: "Porque $x^2 = -11$ no tiene solución real: la recta no corta a la circunferencia" },
        { id: "b", label: "Porque la recta es paralela al eje $x$", incorrectFeedback: "Una recta horizontal sí puede cortar a una circunferencia, como en el caso $y = 3$." },
        { id: "c", label: "Porque el radio es $25$", incorrectFeedback: "El radio es $5$ ($r^2 = 25$): la recta $y = 6$ pasa por encima de la circunferencia." },
        { id: "d", label: "Porque faltan datos", incorrectFeedback: "El sistema está completo; simplemente no hay puntos comunes." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La circunferencia llega como mucho a $y = 5$; la recta $y = 6$ queda fuera y al sustituir sale $x^2 = -11$.",
    },
  ],
};
