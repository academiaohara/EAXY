import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_2_SUBTITLE } from "@/data/lessons/shared";

export const sistemasParametro1Ccss2Lesson: InteractiveLesson = {
  slug: "sistemas-parametro-1-ccss2",
  title: "10. Discutir un sistema con un parámetro",
  subtitle: TEMA_CCSS2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Idea", message: "El rango solo baja cuando $|A| = 0$. Por eso los valores «peligrosos» del parámetro son las raíces del determinante." }],
      title: "Un método ordenado",
      blocks: [
        { kind: "steps", title: "Discusión con matriz cuadrada", items: [
          "Calcula $|A|$ en función del parámetro.",
          "Para los valores con $|A| \\neq 0$: $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 3$, **S.C.D.**",
          "Para cada raíz de $|A| = 0$, **sustituye** el valor y calcula los rangos de $A$ y $A^*$.",
          "Aplica Rouché–Frobenius en cada caso.",
        ] },
        { kind: "example", title: "$x + y + z = 1$, $\\ 2x + 3y + az = 3$, $\\ x + ay + 3z = 3$", lines: [
          { math: "|A| = -a^2 + 3a = -a(a - 3)", note: "raíces: $a = 0$ y $a = 3$" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-familia-explorador", initial: [0, 2], hint: "Recorre a. En a = 0 el sistema es incompatible; en a = 3, indeterminado; en el resto, determinado." },
    },
    {
      id: "check-det",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|A| = -a(a - 3)$ con $a = 2$." }],
      title: "El determinante",
      question: "Para el sistema anterior, ¿cuánto vale $|A|$ si $a = 2$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$-2\\cdot(2 - 3) = -2\\cdot(-1) = 2 \\neq 0$: para $a = 2$ el sistema es compatible determinado.",
    },
    {
      id: "casos",
      type: "slide",
      help: [{ label: "Comprobar", message: "Con Gauss en cada valor especial se ven a la vez los dos rangos." }],
      title: "Los casos especiales",
      blocks: [
        { kind: "compare",
          left: { title: "$a = 0$", text: "$\\operatorname{rg}(A) = 2$ y $\\operatorname{rg}(A^*) = 3$.", math: ["\\text{Incompatible}"], tone: "warn" },
          right: { title: "$a = 3$", text: "$\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 2 < 3$.", math: ["x = 0,\\ y = 1 - \\lambda,\\ z = \\lambda"], tone: "key" } },
        { kind: "text", text: "Para cualquier otro valor ($a \\neq 0, 3$), el sistema es **compatible determinado** y se resuelve, por ejemplo, con Cramer." },
      ],
    },
    {
      id: "check-a0",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En $a = 0$: $\\operatorname{rg}(A) = 2$, pero la ampliada tiene rango $3$." }],
      title: "El valor a = 0",
      question: "Para $a = 0$ el sistema $x + y + z = 1$, $\\ 2x + 3y = 3$, $\\ x + 3z = 3$ es…",
      choices: [
        { id: "a", label: "incompatible" },
        { id: "b", label: "compatible determinado", incorrectFeedback: "Con $|A| = 0$ no puede ser determinado." },
        { id: "c", label: "compatible indeterminado", incorrectFeedback: "Para ser indeterminado haría falta $\\operatorname{rg}(A) = \\operatorname{rg}(A^*)$; aquí son $2$ y $3$." },
        { id: "d", label: "homogéneo", incorrectFeedback: "Los términos independientes no son $0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Por rangos: $\\operatorname{rg}(A) = 2 < 3 = \\operatorname{rg}(A^*)$. Con Gauss se ve como una fila $(0\\ 0\\ 0\\ |\\ c)$ con $c \\neq 0$.",
    },
    {
      id: "check-y",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Para $a = 1$ el sistema es $x + y + z = 1$, $2x + 3y + z = 3$, $x + y + 3z = 3$. Resta la 1.ª a la 3.ª: $2z = 2$." }],
      title: "Resolver un caso",
      question: "Para $a = 1$ el sistema es compatible determinado. ¿Cuánto vale $y$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Resulta $z = 1$ (3.ª − 1.ª), después $2x + 3y + 1 = 3$ y $x + y + 1 = 1$, de donde $x = -2$, $y = 2$. Solución $(-2,\\ 2,\\ 1)$.",
    },
  ],
};
