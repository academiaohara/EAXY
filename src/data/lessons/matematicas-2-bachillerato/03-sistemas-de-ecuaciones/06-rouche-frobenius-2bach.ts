import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const roucheFrobenius2bachLesson: InteractiveLesson = {
  slug: "rouche-frobenius-2bach",
  title: "6. Teorema de Rouché–Frobenius",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "teorema",
      type: "slide",
      help: [{ label: "Por qué", message: "$A^*$ tiene una columna más que $A$: su rango puede ser igual o una unidad mayor." }],
      title: "Los rangos deciden el tipo de sistema",
      blocks: [
        { kind: "rule", title: "Teorema", text: "Un sistema de $m$ ecuaciones con $n$ incógnitas, con matriz $A$ y ampliada $A^*$, es:", formula: "\\begin{cases} \\text{S.C.D.} & \\operatorname{rg}(A) = \\operatorname{rg}(A^*) = n \\\\ \\text{S.C.I.} & \\operatorname{rg}(A) = \\operatorname{rg}(A^*) < n \\\\ \\text{S.I.} & \\operatorname{rg}(A) < \\operatorname{rg}(A^*) \\end{cases}" },
        { kind: "text", text: "En el caso S.C.I., la solución depende de $n - \\operatorname{rg}(A)$ **parámetros**." },
      ],
      visual: { kind: "anim", scene: "rouche-casos" },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Compara los dos rangos entre sí y con el número de incógnitas $n$." }],
      title: "Aplicar el teorema",
      question: "Clasifica cada sistema a partir de sus rangos.",
      groups: [
        { id: "scd", label: "Compatible determinado", tone: "emerald" },
        { id: "sci", label: "Compatible indeterminado", tone: "amber" },
        { id: "si", label: "Incompatible", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$\\operatorname{rg}(A) = 3$, $\\operatorname{rg}(A^*) = 3$, $n = 3$", group: "scd" },
        { id: "b", text: "$\\operatorname{rg}(A) = 2$, $\\operatorname{rg}(A^*) = 2$, $n = 3$", group: "sci" },
        { id: "c", text: "$\\operatorname{rg}(A) = 2$, $\\operatorname{rg}(A^*) = 3$, $n = 3$", group: "si" },
        { id: "d", text: "$\\operatorname{rg}(A) = 1$, $\\operatorname{rg}(A^*) = 2$, $n = 2$", group: "si" },
        { id: "e", text: "$\\operatorname{rg}(A) = 2$, $\\operatorname{rg}(A^*) = 2$, $n = 2$", group: "scd" },
        { id: "f", text: "$\\operatorname{rg}(A) = 1$, $\\operatorname{rg}(A^*) = 1$, $n = 3$", group: "sci" },
      ],
      hint: "Si los rangos son distintos: incompatible. Si son iguales, mira si valen $n$ (determinado) o menos (indeterminado).",
    },
    {
      id: "check-parametros",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Número de parámetros $= n - \\operatorname{rg}(A)$ con $n = 4$." }],
      title: "Cuántos parámetros",
      question: "Un sistema con $4$ incógnitas cumple $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 2$. ¿De cuántos parámetros depende su solución general? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$n - \\operatorname{rg}(A) = 4 - 2 = 2$ parámetros: las soluciones forman un plano dentro del espacio de $4$ dimensiones.",
    },
    {
      id: "explorar",
      type: "slide",
      help: [{ label: "Prueba", message: "Un sistema pasa de determinado a indeterminado cuando una ecuación pasa a ser combinación de las otras." }],
      title: "Explora con tus propios sistemas",
      blocks: [
        { kind: "text", text: "Modifica los coeficientes y los términos independientes. Fíjate en que $\\operatorname{rg}(A)$ y $\\operatorname{rg}(A^*)$ cambian, y con ellos el tipo del sistema y su solución." },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, 1, 1, 3, 2, -1, 1, 2, 3, 0, 2, 5], hint: "Aquí la 3.ª ecuación es la suma de las otras: sistema indeterminado. Cambia el 5 del último término a otro número y observa el cambio." },
    },
    {
      id: "check-tipo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Con $\\operatorname{rg}(A) = 2$, $\\operatorname{rg}(A^*) = 3$ y $n = 3$, los rangos son distintos." }],
      title: "¿Qué tipo es?",
      question: "En un sistema de $3$ ecuaciones con $3$ incógnitas, $\\operatorname{rg}(A) = 2$ y $\\operatorname{rg}(A^*) = 3$. El sistema es…",
      choices: [
        { id: "a", label: "incompatible" },
        { id: "b", label: "compatible determinado", incorrectFeedback: "Haría falta $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 3$." },
        { id: "c", label: "compatible indeterminado", incorrectFeedback: "Haría falta $\\operatorname{rg}(A) = \\operatorname{rg}(A^*)$." },
        { id: "d", label: "homogéneo", incorrectFeedback: "Un homogéneo siempre cumple $\\operatorname{rg}(A) = \\operatorname{rg}(A^*)$, porque la columna añadida es nula." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\operatorname{rg}(A) < \\operatorname{rg}(A^*)$: la columna $B$ aporta información nueva que contradice las ecuaciones: incompatible.",
    },
  ],
};
