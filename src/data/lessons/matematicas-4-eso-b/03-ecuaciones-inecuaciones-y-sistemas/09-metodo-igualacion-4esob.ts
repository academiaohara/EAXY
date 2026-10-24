import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const metodoIgualacion4esobLesson: InteractiveLesson = {
  slug: "metodo-igualacion-4esob",
  title: "9. Método de igualación",
  subtitle: TEMA_4ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        { label: "Si ya está despejada", message: "Si las dos ecuaciones ya traen la misma incógnita despejada ($y = \\dots$ en las dos), la igualación es lo más rápido: es una sustitución disfrazada." },
        { label: "Por qué se puede igualar", message: "Si $y$ es igual a una cosa y también a otra, esas dos cosas son iguales entre sí." },
      ],
      title: "Despejar lo mismo en las dos",
      blocks: [
        {
          kind: "steps",
          title: "Método de igualación",
          items: [
            "Despeja **la misma incógnita** en las dos ecuaciones.",
            "**Iguala** las dos expresiones.",
            "Resuelve la ecuación con una incógnita.",
            "Sustituye en una de las expresiones despejadas.",
            "**Comprueba** la solución.",
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3x − 5y = 1", "·", "x + 2y = 15"], active: [0, 2], note: "el sistema." },
            { tokens: ["x = (1 + 5y)/3", "·", "x = 15 − 2y"], fresh: [0, 2], note: "despejamos $x$ en las dos." },
            { tokens: ["(1 + 5y)/3", "=", "15 − 2y"], active: [0, 2], note: "igualamos." },
            { tokens: ["1 + 5y", "=", "45 − 6y"], active: [0, 2], note: "multiplicamos por $3$." },
            { tokens: ["11y", "=", "44"], active: [0, 2], note: "agrupamos." },
            { tokens: ["y = 4", "·", "x = 15 − 8 = 7"], fresh: [0, 2], note: "despejamos y volvemos a $x = 15 - 2y$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-a",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Despeja", message: "$x = 4 - 5y$ y $x = -4 + 3y$. Igualando: $4 - 5y = -4 + 3y$." }],
      title: "Primer sistema",
      question: "Resuelve por igualación $\\begin{cases} x + 5y = 4 \\\\ x - 3y = -4 \\end{cases}$. ¿Cuánto vale $y$?",
      correctAnswers: ["1"],
      explanation: "$4 - 5y = -4 + 3y \\Rightarrow 8 = 8y \\Rightarrow y = 1$, y $x = -1$.",
    },
    {
      id: "check-c",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Despeja $y$", message: "$y = 3 - 5x$ e $y = 2x + 3$. Igualando: $3 - 5x = 2x + 3$." }],
      title: "Despeja y",
      question: "Resuelve $\\begin{cases} 5x + y = 3 \\\\ 2x - y = -3 \\end{cases}$. ¿Cuánto vale $x$?",
      correctAnswers: ["0"],
      explanation: "$3 - 5x = 2x + 3 \\Rightarrow -7x = 0 \\Rightarrow x = 0$, y $y = 3$.",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [{ label: "Despeja $x$", message: "$x = \\frac{3 - 3y}{4}$ y $x = \\frac{3 - 6y}{2}$. Igualando y multiplicando por $4$: $3 - 3y = 6 - 12y$." }],
      title: "Con fracciones",
      question: "Resuelve $\\begin{cases} 4x + 3y = 3 \\\\ 2x + 6y = 3 \\end{cases}$ y da el valor de $y$ como fracción irreducible.",
      correctAnswers: ["1/3"],
      explanation: "$3 - 3y = 6 - 12y \\Rightarrow 9y = 3 \\Rightarrow y = \\frac{1}{3}$ y $x = \\frac{3 - 1}{4} = \\frac{1}{2}$.",
    },
    {
      id: "check-ya-despejada",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Ya está", message: "Las dos traen $y$ despejada: iguala los lados derechos." }],
      title: "Ya vienen despejadas",
      question: "Resuelve $\\begin{cases} y = 2x - 1 \\\\ y = x + 3 \\end{cases}$. ¿Cuánto vale $x$?",
      correctAnswers: ["4"],
      explanation: "$2x - 1 = x + 3 \\Rightarrow x = 4$, y $y = 7$.",
    },
    {
      id: "comparar",
      type: "slide",
      help: [{ label: "Resumen", message: "Sustitución: despejas en una y metes en la otra. Igualación: despejas en las dos y las igualas." }],
      title: "Igualación frente a sustitución",
      blocks: [
        { kind: "compare", left: { title: "Sustitución", text: "Despejo en **una** y meto el resultado en la **otra**. Mejor si una incógnita tiene coeficiente $\\pm1$.", tone: "ok" }, right: { title: "Igualación", text: "Despejo la **misma** incógnita en **las dos** y las igualo. Mejor si ya vienen despejadas.", tone: "warn" } },
      ],
    },
    {
      id: "check-cual",
      type: "predict",
      mode: "choice",
      help: [{ label: "Mira cómo están", message: "$y = 2x + 1$ e $y = -x + 7$ ya traen $y$ despejada." }],
      title: "¿Qué método uso?",
      question: "Para $\\begin{cases} y = 2x + 1 \\\\ y = -x + 7 \\end{cases}$, ¿cuál es el método más directo?",
      choices: [
        { id: "igualacion", label: "Igualación: $2x + 1 = -x + 7$" },
        { id: "reduccion", label: "Reducción multiplicando por números", incorrectFeedback: "Funcionaría, pero hay un camino más corto: las dos ya tienen $y$ despejada." },
        { id: "tanteo", label: "Tanteo de valores", incorrectFeedback: "Con un método algebraico no necesitas adivinar." },
      ],
      correctChoiceId: "igualacion",
      shuffleChoices: true,
      explanation: "$2x + 1 = -x + 7 \\Rightarrow 3x = 6 \\Rightarrow x = 2$, $y = 5$.",
    },
  ],
};
