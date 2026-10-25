import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemasParametro22bachLesson: InteractiveLesson = {
  slug: "sistemas-parametro-2-2bach",
  title: "9. Discusión completa y resolución según el parámetro",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "planteamiento",
      type: "slide",
      help: [{ label: "Simetría", message: "El determinante de una matriz con $a$ en la diagonal y $1$ fuera se factoriza siempre como $(a - 1)^2(a + 2)$ en orden $3$." }],
      title: "Un sistema con parámetro en la diagonal",
      blocks: [
        { kind: "example", title: "$a\\,x + y + z = 1$, $\\ x + a\\,y + z = a$, $\\ x + y + a\\,z = a^2$", lines: [
          { math: "|A| = \\begin{vmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{vmatrix} = (a - 1)^2(a + 2)" },
          { math: "a \\neq 1,\\ a \\neq -2 \\Rightarrow \\text{S.C.D.}" },
        ] },
        { kind: "text", text: "Quedan dos valores por estudiar: $a = 1$ (raíz doble) y $a = -2$." },
      ],
      visual: { kind: "tool", tool: "sistema-familia-explorador", initial: [1, 0], hint: "Recorre a: el sistema es determinado salvo en a = 1 y a = −2. Observa el tipo en cada uno." },
    },
    {
      id: "especiales",
      type: "slide",
      help: [{ label: "Suma", message: "Para $a = -2$, la suma de las tres ecuaciones da $0 = 3$." }],
      title: "Los dos valores especiales",
      blocks: [
        { kind: "compare",
          left: { title: "$a = 1$", text: "Las tres ecuaciones son $x + y + z = 1$. $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 1 < 3$.", math: ["x = 1 - \\lambda - \\mu,\\ y = \\lambda,\\ z = \\mu"], tone: "key" },
          right: { title: "$a = -2$", text: "Sumando las tres ecuaciones: $0 = 1 - 2 + 4 = 3$. $\\operatorname{rg}(A) = 2 < 3 = \\operatorname{rg}(A^*)$.", math: ["\\text{Incompatible}"], tone: "warn" } },
      ],
    },
    {
      id: "check-a1",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $a = 1$ las tres ecuaciones coinciden: queda una sola ecuación con $3$ incógnitas." }],
      title: "El caso a = 1",
      question: "Para $a = 1$ el sistema es compatible indeterminado. ¿De cuántos parámetros depende su solución? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$n - \\operatorname{rg}(A) = 3 - 1 = 2$ parámetros: las soluciones son todos los puntos del plano $x + y + z = 1$.",
    },
    {
      id: "check-a-menos-1",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $a = -1$ el sistema es $-x + y + z = 1$, $x - y + z = -1$, $x + y - z = 1$. Suma las dos primeras: $2z = 0$." }],
      title: "Resolver para un valor concreto",
      question: "Para $a = -1$, ¿cuánto vale $y$ en la solución del sistema? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Para $a = -1$ el sistema es $-x + y + z = 1$, $x - y + z = -1$, $x + y - z = 1$. Sumando las dos primeras, $z = 0$; entonces $y - x = 1$ y $x + y = 1$, de donde $x = 0$, $y = 1$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Solo $a = 1$ y $a = -2$ anulan el determinante." }],
      title: "¿Qué tipo es?",
      question: "Clasifica el sistema $a\\,x + y + z = 1$, $\\ x + a\\,y + z = a$, $\\ x + y + a\\,z = a^2$ para cada valor.",
      groups: [
        { id: "scd", label: "Compatible determinado", tone: "emerald" },
        { id: "sci", label: "Compatible indeterminado", tone: "amber" },
        { id: "si", label: "Incompatible", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$a = 0$", group: "scd" },
        { id: "b", text: "$a = 1$", group: "sci" },
        { id: "c", text: "$a = -2$", group: "si" },
        { id: "d", text: "$a = 3$", group: "scd" },
        { id: "e", text: "$a = -1$", group: "scd" },
      ],
      hint: "Solo los valores que anulan $|A| = (a - 1)^2(a + 2)$ pueden ser S.C.I. o S.I.",
    },
  ],
};
