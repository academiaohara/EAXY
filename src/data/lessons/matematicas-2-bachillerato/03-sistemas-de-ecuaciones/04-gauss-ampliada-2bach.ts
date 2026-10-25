import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const gaussAmpliada2bachLesson: InteractiveLesson = {
  slug: "gauss-ampliada-2bach",
  title: "4. Gauss con la matriz ampliada",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Ventaja", message: "Se escribe menos y se evitan errores de signo: solo hay números, sin las incógnitas." }],
      title: "El mismo método, solo con números",
      blocks: [
        { kind: "text", text: "En lugar de escribir las ecuaciones, se trabaja con la **matriz ampliada** $A^*$ y se aplican operaciones elementales **por filas**: intercambiar filas, multiplicar una por $a \\neq 0$ o sumarle un múltiplo de otra." },
        { kind: "text", text: "El objetivo es una matriz **escalonada**: ceros por debajo de la diagonal. Cada fila equivale a una ecuación del sistema." },
      ],
      visual: { kind: "anim", scene: "sistema-gauss-ampliada", params: { nums: [1, 1, 1, 3, 2, -1, 1, 2, 1, 2, -3, 0] } },
    },
    {
      id: "check-operacion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Para anular el $2$ de la fila 2 se resta el doble de la fila 1." }],
      title: "Hacer un cero",
      question: "En $\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 3 \\\\ 2 & -1 & 1 & 2 \\\\ 1 & 2 & -3 & 0 \\end{array}\\right)$, ¿qué operación anula el elemento $(2, 1)$?",
      choices: [
        { id: "a", label: "$F_2 \\to F_2 - 2F_1$" },
        { id: "b", label: "$F_2 \\to F_2 + 2F_1$", incorrectFeedback: "Daría $2 + 2 = 4$. Hay que **restar** el doble de la fila 1." },
        { id: "c", label: "$F_1 \\to F_1 - 2F_2$", incorrectFeedback: "Eso modifica la fila 1 y no toca la posición $(2, 1)$." },
        { id: "d", label: "$F_3 \\to F_3 - 2F_1$", incorrectFeedback: "Eso actúa sobre la fila 3; el elemento $(3, 1)$ es $1$ y quedaría $-1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$F_2 - 2F_1 = (2 - 2,\\ -1 - 2,\\ 1 - 2\\ |\\ 2 - 6) = (0,\\ -3,\\ -1\\ |\\ -4)$.",
    },
    {
      id: "casos",
      type: "slide",
      help: [{ label: "Lectura", message: "Se mira la última fila no nula de la matriz escalonada." }],
      title: "Cómo se lee la matriz escalonada",
      blocks: [
        { kind: "steps", items: [
          "Última fila $(0\\ 0\\ c\\ |\\ d)$ con $c \\neq 0$: se despeja $z = d/c$ y se sube. **S.C.D.**",
          "Última fila $(0\\ 0\\ 0\\ |\\ 0)$: la ecuación sobra y queda una incógnita libre. **S.C.I.**",
          "Última fila $(0\\ 0\\ 0\\ |\\ d)$ con $d \\neq 0$: $0 = d$ es absurdo. **S.I.**",
        ] },
      ],
      visual: { kind: "anim", scene: "sistema-gauss-ampliada", params: { nums: [1, 1, 1, 3, 2, -1, 1, 2, 1, 1, 1, 4] } },
    },
    {
      id: "check-fila",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Una fila $(0\\ 0\\ 0\\ |\\ 0)$ equivale a $0 = 0$, que siempre se cumple." }],
      title: "Una fila de ceros",
      question: "Tras escalonar una matriz ampliada de un sistema de $3$ ecuaciones con $3$ incógnitas queda, como última fila, $(0\\ 0\\ 0\\ |\\ 0)$ y las dos primeras filas son independientes. El sistema es…",
      choices: [
        { id: "a", label: "compatible indeterminado" },
        { id: "b", label: "compatible determinado", incorrectFeedback: "Solo hay dos ecuaciones independientes para tres incógnitas." },
        { id: "c", label: "incompatible", incorrectFeedback: "$0 = 0$ no es una contradicción." },
        { id: "d", label: "No se puede saber", incorrectFeedback: "Se puede: $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 2 < 3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 2 < 3$: infinitas soluciones con $3 - 2 = 1$ parámetro.",
    },
    {
      id: "check-incompatible",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "En el sistema $x + y + z = 3$, $2x - y + z = 2$, $x + y + z = 4$, $F_3 \\to F_3 - F_1$ da $(0\\ 0\\ 0\\ |\\ 1)$." }],
      title: "El absurdo en la matriz",
      question: "Al escalonar la matriz ampliada de $x + y + z = 3$, $\\ 2x - y + z = 2$, $\\ x + y + z = 4$ aparece una fila $(0\\ 0\\ 0\\ |\\ d)$. ¿Cuánto vale $d$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$F_3 - F_1 = (0, 0, 0 \\mid 4 - 3) = (0, 0, 0 \\mid 1)$: $0 = 1$, absurdo. Sistema incompatible.",
    },
  ],
};
