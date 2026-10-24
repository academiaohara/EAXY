import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_3_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesFactorizadas4esobLesson: InteractiveLesson = {
  slug: "ecuaciones-factorizadas-4esob",
  title: "5. Ecuaciones factorizadas y de grado superior",
  subtitle: TEMA_4ESOB_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto-cero",
      type: "slide",
      help: [
        { label: "Producto cero", message: "Si $A \\cdot B = 0$, entonces $A = 0$ o $B = 0$. Con varios factores, basta con que **uno** sea cero." },
        { label: "Un factor, una ecuación", message: "Cada factor da una ecuación más sencilla: de primer grado o de segundo grado, que ya sabes resolver." },
      ],
      title: "Un producto igualado a cero",
      blocks: [
        { kind: "rule", text: "Para que un producto de factores sea $0$, **alguno** de los factores tiene que ser $0$. Se iguala a cero cada factor y se resuelve cada ecuación." },
        { kind: "example", lines: [{ math: "x(x - 1)(x^2 - 5x + 6) = 0" }, { math: "x = 0,\\quad x - 1 = 0,\\quad x^2 - 5x + 6 = 0" }, { math: "x_1 = 0,\\ x_2 = 1,\\ x_3 = 2,\\ x_4 = 3" }] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x", "(x − 1)", "(x² − 5x + 6)", "= 0"], active: [0, 2], note: "producto de tres factores igualado a cero." },
            { tokens: ["x = 0", "x − 1 = 0", "x² − 5x + 6 = 0"], active: [0, 2], note: "cada factor, a cero por separado." },
            { tokens: ["x = 0", "x = 1", "x = 2  y  x = 3"], fresh: [0, 2], note: "$x^2 - 5x + 6 = 0$ da $x = 2$ y $x = 3$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Dos soluciones", message: "$x - 4 = 0$ da $x = 4$ y $x - 6 = 0$ da $x = 6$." }],
      title: "Dos factores",
      question: "Resuelve $(x - 4)(x - 6) = 0$. ¿Cuánto suman sus soluciones? (solo el número)",
      correctAnswers: ["10"],
      explanation: "Las soluciones son $x = 4$ y $x = 6$; suman $10$.",
    },
    {
      id: "grado-superior",
      type: "slide",
      help: [
        { label: "Ruffini", message: "Busca una raíz entera entre los divisores del término independiente. Al dividir por $x - a$ el grado baja uno." },
        { label: "Sin factores a la vista", message: "Si la ecuación no está factorizada, primero se factoriza el polinomio; después se aplica «producto igual a cero»." },
      ],
      title: "Si no está factorizada, se factoriza",
      blocks: [
        { kind: "steps", items: ["Pasa todo a un miembro: $P(x) = 0$.", "Factoriza $P(x)$ (factor común, identidades, Ruffini).", "Iguala cada factor a cero y resuelve."] },
        { kind: "example", lines: [{ math: "x^3 - 2x^2 - 5x + 6 = 0" }, { math: "(x - 1)(x + 2)(x - 3) = 0" }, { math: "x = 1,\\quad x = -2,\\quad x = 3" }] },
      ],
      visual: { kind: "tool", tool: "ruffini-explorador", initial: [1, -2, -5, 6, 1], hint: "Con a = 1 el resto es 0. Divide el cociente x² − x − 6 y obtendrás las otras dos raíces." },
    },
    {
      id: "check-mayor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Prueba el 1", message: "$1 - 7 + 6 = 0$. Ruffini con $a = 1$ da $x^2 + x - 6 = (x - 2)(x + 3)$." }],
      title: "Una cúbica",
      question: "Resuelve $x^3 - 7x + 6 = 0$ (tiene tres soluciones enteras). ¿Cuál es la **mayor**? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$x^3 - 7x + 6 = (x - 1)(x - 2)(x + 3)$: las soluciones son $1$, $2$ y $-3$. La mayor es $2$.",
    },
    {
      id: "check-distintas",
      type: "predict",
      mode: "choice",
      help: [{ label: "Raíz repetida", message: "El factor $x^2$ repite la solución $x = 0$, pero sigue siendo **una** solución distinta." }],
      title: "Cuántas soluciones distintas",
      question: "¿Cuántas soluciones **distintas** tiene $x^2(x + 1)(x - 3) = 0$?",
      choices: [
        { id: "a", label: "$3$: $0$, $-1$ y $3$" },
        { id: "b", label: "$4$", incorrectFeedback: "El factor $x^2$ da dos veces $x = 0$, pero ese valor se cuenta una sola vez como solución." },
        { id: "c", label: "$2$", incorrectFeedback: "Cada factor $x^2$, $x + 1$ y $x - 3$ aporta un valor distinto: $0$, $-1$ y $3$." },
        { id: "d", label: "$5$", incorrectFeedback: "El grado es $4$, pero hay una solución repetida: son menos de $4$ distintas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^2 = 0$ da $x = 0$ (doble), $x + 1 = 0$ da $x = -1$ y $x - 3 = 0$ da $x = 3$: tres valores distintos.",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Segundo grado", message: "$x^2 + 5x - 24 = 0$ da $x = 3$ y $x = -8$; el otro factor da $x = -1/2$." }],
      title: "Soluciones enteras",
      question: "Resuelve $(2x + 1)(x^2 + 5x - 24) = 0$. Tiene dos soluciones enteras: ¿cuánto vale su **producto**? (escribe el número con su signo)",
      correctAnswers: ["-24", "−24"],
      explanation: "$2x + 1 = 0$ da $x = -\\tfrac12$; $x^2 + 5x - 24 = 0$ da $x = 3$ y $x = -8$. Las enteras son $3$ y $-8$: su producto es $-24$.",
    },
  ],
};
