import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const gaussEliminacion2bachLesson: InteractiveLesson = {
  slug: "gauss-eliminacion-2bach",
  title: "3. Método de Gauss: eliminaciones sucesivas",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Escalonado", message: "Escalonado: la 1.ª ecuación tiene las tres incógnitas, la 2.ª solo dos y la 3.ª una." }],
      title: "Escalonar el sistema",
      blocks: [
        { kind: "steps", items: [
          "Con la 1.ª ecuación **elimina $x$** de las demás (restando múltiplos de ella).",
          "Con la 2.ª **elimina $y$** de la 3.ª.",
          "El sistema queda **escalonado** y es equivalente al original: se resuelve **de abajo arriba**.",
        ] },
        { kind: "example", title: "$x + 2y + z = 8$, $\\ 2x - y + z = 3$, $\\ x + y - z = 0$", lines: [
          { math: "E_2 \\to E_2 - 2E_1,\\quad E_3 \\to E_3 - E_1", note: "se elimina $x$" },
          { math: "\\text{de abajo arriba: } z = 3,\\ y = 2,\\ x = 1" },
        ] },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 2, 1, 8, 2, -1, 1, 3, 1, 1, -1, 0] } },
    },
    {
      id: "check-z",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "De la 3.ª ecuación, $z = x + y$. Sustituye en las otras dos." }],
      title: "Resolver de abajo arriba",
      question: "El sistema $x + 2y + z = 8$, $\\ 2x - y + z = 3$, $\\ x + y - z = 0$ es compatible determinado. ¿Cuánto vale $z$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "La solución es $x = 1$, $y = 2$, $z = 3$. Comprobación en la 1.ª: $1 + 4 + 3 = 8$ ✓.",
    },
    {
      id: "indeterminado",
      type: "slide",
      help: [{ label: "Parámetro", message: "Una incógnita «libre» se pasa al segundo miembro como parámetro $\\lambda$ y las otras se expresan con ella." }],
      title: "Cuando una ecuación desaparece",
      blocks: [
        { kind: "text", text: "Si la 3.ª ecuación es combinación de las anteriores, al eliminar queda $0 = 0$: **sobra una ecuación** y hay una incógnita libre. El sistema es **compatible indeterminado**." },
        { kind: "example", title: "$x + y + z = 3$, $\\ 2x - y + z = 2$, $\\ 3x + 2z = 5$", lines: [
          { math: "E_3 = E_1 + E_2", note: "la 3.ª ecuación es la suma de las otras dos" },
          { math: "x = \\tfrac{5}{3} - \\tfrac{2}{3}\\lambda,\\quad y = \\tfrac{4}{3} - \\tfrac{1}{3}\\lambda,\\quad z = \\lambda", note: "infinitas soluciones: una por cada valor de $\\lambda$" },
        ] },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 1, 1, 3, 2, -1, 1, 2, 3, 0, 2, 5] } },
    },
    {
      id: "check-parametros",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Parámetros libres = incógnitas − ecuaciones independientes." }],
      title: "¿Cuántos parámetros?",
      question: "Un sistema con $3$ incógnitas se reduce, tras Gauss, a **dos** ecuaciones independientes. ¿Cuántos parámetros aparecen en su solución general? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$3 - 2 = 1$ incógnita libre: las soluciones forman una recta (intersección de dos planos).",
    },
    {
      id: "incompatible",
      type: "slide",
      help: [{ label: "Absurdo", message: "Aparece $0 = c$ con $c \\neq 0$: una igualdad imposible." }],
      title: "Cuando aparece un absurdo",
      blocks: [
        { kind: "text", text: "Si al eliminar queda una ecuación $0\\,x + 0\\,y + 0\\,z = c$ con $c \\neq 0$, el sistema es **incompatible**: no se puede seguir." },
        { kind: "example", title: "$x + y + z = 3$, $\\ 2x - y + z = 2$, $\\ x + y + z = 4$", lines: [
          { math: "E_3 \\to E_3 - E_1 \\Rightarrow 0 = 1", note: "absurdo: sin solución" },
        ] },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 1, 1, 3, 2, -1, 1, 2, 1, 1, 1, 4] } },
    },
    {
      id: "check-tipo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La última ecuación $0 = 5$ no se cumple para ningún valor." }],
      title: "Leer el sistema escalonado",
      question: "Tras aplicar Gauss queda como última ecuación $0x + 0y + 0z = 5$. El sistema es…",
      choices: [
        { id: "a", label: "incompatible" },
        { id: "b", label: "compatible determinado", incorrectFeedback: "Sería determinado si la última ecuación fuera $z = \\text{número}$." },
        { id: "c", label: "compatible indeterminado", incorrectFeedback: "Sería indeterminado si la última ecuación fuera $0 = 0$." },
        { id: "d", label: "homogéneo", incorrectFeedback: "Un homogéneo siempre es compatible; $0 = 5$ no tiene solución." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$0 = 5$ es imposible, luego el sistema no tiene solución: incompatible.",
    },
  ],
};
