import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesRadicalesCcss1Lesson: InteractiveLesson = {
  slug: "ecuaciones-radicales-ccss1",
  title: "13. Ecuaciones radicales",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Idea", message: "Para quitar una raíz se aísla y se eleva al cuadrado; pero elevar al cuadrado puede añadir soluciones falsas." }],
      title: "Aislar el radical y elevar al cuadrado",
      blocks: [
        { kind: "definition", text: "Una **ecuación radical** (o irracional) tiene la incógnita bajo una raíz." },
        { kind: "steps", title: "Método", items: ["Aísla un radical en un miembro.", "Eleva **los dos miembros** al cuadrado (al índice).", "Si queda otro radical, repite desde el paso 1.", "Resuelve la ecuación resultante.", "**Comprueba** las soluciones en la ecuación original."] },
        { kind: "warning", text: "Al elevar al cuadrado, $a = b$ y $a = -b$ producen la misma ecuación. Por eso la comprobación **no es opcional**: puede haber soluciones falsas." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["√(2x−3)", "+", "1", "=", "x"], active: [0, 0], note: "primero se aísla la raíz." },
            { tokens: ["√(2x−3)", "=", "x", "−", "1"], active: [0, 4], note: "elevamos al cuadrado los dos miembros." },
            { tokens: ["2x", "−", "3", "=", "x²", "−", "2x", "+", "1"], active: [0, 8], note: "desarrollamos $(x - 1)^2$." },
            { tokens: ["x²", "−", "4x", "+", "4", "=", "0"], active: [0, 6], note: "ecuación de segundo grado." },
            { tokens: ["x", "=", "2"], fresh: [2, 2], note: "solución doble; comprobamos: $\\sqrt{1} + 1 = 2$ ✓." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-falsa",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x + 6 = x^2$ da $x = 3$ y $x = -2$. Comprueba cuál cumple $\\sqrt{x + 6} = x$." }],
      title: "Una solución falsa",
      question: "Resuelve $\\sqrt{x + 6} = x$. (solo la solución válida)",
      correctAnswers: ["3"],
      explanation: "$x + 6 = x^2 \\Rightarrow x = 3$ ó $x = -2$. Con $x = -2$: $\\sqrt{4} = 2 \\neq -2$. Solo vale $x = 3$ ($\\sqrt 9 = 3$ ✓).",
    },
    {
      id: "check-aislar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Aísla: $\\sqrt{2x + 1} = x - 1$. Entonces $2x + 1 = x^2 - 2x + 1$." }],
      title: "Primero aislar",
      question: "Resuelve $\\sqrt{2x + 1} + 1 = x$. (solo la solución válida)",
      correctAnswers: ["4"],
      explanation: "$2x + 1 = x^2 - 2x + 1 \\Rightarrow x^2 - 4x = 0 \\Rightarrow x = 0$ ó $x = 4$. Con $x = 0$: $\\sqrt{1} + 1 = 2 \\neq 0$. Con $x = 4$: $\\sqrt 9 + 1 = 4$ ✓.",
    },
    {
      id: "dos-radicales",
      type: "slide",
      help: [{ label: "Idea", message: "Con dos raíces: aísla una, eleva al cuadrado, y queda una raíz que se aísla y se vuelve a elevar." }],
      title: "Dos radicales: elevar dos veces",
      blocks: [
        { kind: "text", text: "Si aparecen dos raíces, tras el primer cuadrado sigue habiendo una. Se **vuelve a aislar** y se eleva otra vez." },
        { kind: "warning", text: "Al elevar $\\left(2 + \\sqrt{x - 2}\\right)^2$ hay un **doble producto**: $4 + 4\\sqrt{x - 2} + (x - 2)$." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["√(x+6)", "−", "√(x−2)", "=", "2"], active: [0, 4], note: "aislamos un radical." },
            { tokens: ["√(x+6)", "=", "2", "+", "√(x−2)"], active: [0, 4], note: "elevamos al cuadrado (con doble producto)." },
            { tokens: ["x+6", "=", "4", "+", "4√(x−2)", "+", "x−2"], active: [0, 6], note: "simplificamos y aislamos el radical que queda." },
            { tokens: ["4", "=", "4√(x−2)"], active: [0, 2], note: "dividimos entre 4 y elevamos otra vez." },
            { tokens: ["1", "=", "x−2"], fresh: [0, 2], note: "luego $x = 3$; comprobamos: $\\sqrt 9 - \\sqrt 1 = 2$ ✓." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-dos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\sqrt{x + 4} = 1 + \\sqrt{x - 1}\\Rightarrow x + 4 = 1 + 2\\sqrt{x - 1} + x - 1$." }],
      title: "Con dos radicales",
      question: "Resuelve $\\sqrt{x + 4} - \\sqrt{x - 1} = 1$. (solo el valor de $x$)",
      correctAnswers: ["5"],
      explanation: "$x + 4 = 1 + 2\\sqrt{x-1} + x - 1 \\Rightarrow 4 = 2\\sqrt{x - 1} \\Rightarrow x - 1 = 4 \\Rightarrow x = 5$. Comprobación: $\\sqrt 9 - \\sqrt 4 = 1$ ✓.",
    },
    {
      id: "check-concepto",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Piensa en $\\sqrt{x} = -3$: al elevar al cuadrado queda $x = 9$, pero $\\sqrt9 = 3$." }],
      title: "¿Por qué comprobar?",
      question: "En una ecuación radical, ¿por qué hay que comprobar siempre las soluciones al final?",
      choices: [
        { id: "a", label: "Porque elevar al cuadrado puede introducir soluciones que no cumplen la ecuación original" },
        { id: "b", label: "Porque la calculadora puede fallar", incorrectFeedback: "El motivo es matemático, no de cálculo: elevar al cuadrado no es una operación reversible." },
        { id: "c", label: "Porque siempre salen dos soluciones y una es falsa", incorrectFeedback: "A veces ambas valen y a veces ninguna: hay que comprobarlas una a una." },
        { id: "d", label: "Solo por costumbre; las soluciones siempre son válidas", incorrectFeedback: "Es falso: $\\sqrt{x + 6} = x$ da $x = -2$, que no cumple la ecuación." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Elevar al cuadrado transforma $a = b$ en $a^2 = b^2$, que también se cumple cuando $a = -b$. Las soluciones añadidas no valen en la ecuación original.",
    },
  ],
};
