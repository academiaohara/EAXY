import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const desigualdadesInecuaciones1bachLesson: InteractiveLesson = {
  slug: "desigualdades-inecuaciones-1bach",
  title: "4. Desigualdades e inecuaciones",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "conceptos",
      type: "slide",
      help: [
        { label: "Grado", message: "Es el mayor exponente de la incógnita: $7 \\leq x + 1$ es de primer grado; $x^2 \\geq 14 - x$ es de segundo." },
      ],
      title: "Desigualdad e inecuación",
      blocks: [
        { kind: "definition", text: "Una **desigualdad** une dos expresiones con $<$, $\\leq$, $>$ o $\\geq$. Una **inecuación** es una desigualdad con una o más incógnitas. **Resolverla** es hallar todos los valores que la cumplen." },
        { kind: "example", lines: [
          { math: "4 < 2\\ \\text{(falsa)},\\qquad 7 \\leq x + 1,\\qquad x^2 \\geq 14 - x" },
          { math: "7 \\leq x + 5 \\iff 2 \\leq x \\iff x \\in [2, +\\infty)" },
        ] },
        { kind: "text", text: "A diferencia de una ecuación, la solución suele ser **un intervalo entero** de números, no uno o dos valores." },
      ],
      arrange: "stack",
    },
    {
      id: "reglas",
      type: "slide",
      help: [
        { label: "¿Por qué se invierte?", message: "$2 < 5$, pero si multiplicas por $-1$ los números se reflejan respecto del $0$: $-2 > -5$. El que estaba más a la izquierda pasa a estar más a la derecha." },
      ],
      title: "Transformaciones que mantienen la solución",
      blocks: [
        { kind: "steps", title: "Inecuaciones equivalentes", items: [
          "Sumar o restar lo mismo a los dos miembros: el sentido **no cambia**.",
          "Multiplicar o dividir por un número **positivo**: el sentido **no cambia**.",
          "Multiplicar o dividir por un número **negativo**: el sentido **se invierte**.",
        ] },
        { kind: "example", lines: [
          { math: "-x < 5 \\iff (-x)\\cdot(-1) > 5\\cdot(-1) \\iff x > -5" },
        ] },
      ],
      visual: { kind: "anim", scene: "inecuacion-signo", params: { nums: [-2, 6], ine: ">" } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Compara el sentido de la desigualdad al pasar de un coeficiente positivo a uno negativo." }],
      title: "Prueba el cambio de sentido",
      blocks: [{ kind: "text", text: "Con la herramienta resuelves $a\\,x + b \; \\square \; c$. Pon un coeficiente $a$ negativo y observa cómo cambia el sentido de la solución." }],
      visual: { kind: "tool", tool: "inecuacion-explorador", initial: [-2, 1, 7, 2], hint: "Pon a negativo y comprueba que el sentido se invierte." },
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Dividir entre un número negativo invierte el sentido." }],
      title: "Dividir por un negativo",
      question: "Resuelve $-2x \\geq 6$.",
      choices: [
        { id: "a", label: "$x \\leq -3$" },
        { id: "b", label: "$x \\geq -3$", incorrectFeedback: "Has dividido entre $-2$ sin invertir el sentido." },
        { id: "c", label: "$x \\leq 3$", incorrectFeedback: "El sentido es correcto, pero $6 : (-2) = -3$, no $3$." },
        { id: "d", label: "$x \\geq 3$", incorrectFeedback: "Ni el valor ni el sentido son correctos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$-2x \\geq 6 \\Rightarrow x \\leq 6 : (-2) = -3$. Al dividir entre un negativo, $\\geq$ se convierte en $\\leq$.",
    },
    {
      id: "resolver",
      type: "slide",
      help: [
        { label: "Comprobar", message: "Prueba un valor de la solución (por ejemplo $x = 0$) en la inecuación original: $3\\cdot 0 + 6 = 6 < 12$ ✓." },
      ],
      title: "Resolver una inecuación de primer grado",
      blocks: [
        { kind: "example", title: "3x + 6 < 12", lines: [
          { math: "3x + 6 - 6 < 12 - 6" },
          { math: "3x < 6" },
          { math: "x < 2" },
          { math: "x \\in (-\\infty,\\ 2)" },
        ] },
        { kind: "text", text: "La solución es **todo** número menor que $2$: $1{,}9$, $0$, $-100$… pero no el $2$ (la desigualdad es estricta)." },
      ],
      arrange: "stack",
    },
    {
      id: "check-entero",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Primero resuelve la inecuación; después busca el mayor entero que cabe en la solución." }],
      title: "El mayor entero",
      question: "¿Cuál es el mayor número **entero** que cumple $3x + 6 < 12$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$3x + 6 < 12 \\Rightarrow x < 2$. El $2$ no cumple (estricta), así que el mayor entero es $1$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Solo cambia el sentido cuando se multiplica o divide por un número negativo." }],
      title: "¿Cambia el sentido?",
      question: "Clasifica cada operación aplicada a los dos miembros de una desigualdad.",
      groups: [
        { id: "igual", label: "El sentido se mantiene", tone: "emerald" },
        { id: "invierte", label: "El sentido se invierte", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Sumar $5$", group: "igual" },
        { id: "b", text: "Multiplicar por $3$", group: "igual" },
        { id: "c", text: "Multiplicar por $-2$", group: "invierte" },
        { id: "d", text: "Dividir entre $-4$", group: "invierte" },
        { id: "e", text: "Restar $x$", group: "igual" },
        { id: "f", text: "Dividir entre $7$", group: "igual" },
      ],
      hint: "Solo los números negativos invierten el sentido.",
    },
  ],
};
