import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesPrimerGrado1bachLesson: InteractiveLesson = {
  slug: "ecuaciones-primer-grado-1bach",
  title: "7. Ecuaciones de primer grado y problemas",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Tres casos", message: "Tras reducir se llega a $ax = b$. Si $a \\neq 0$: una solución. Si $a = 0$ y $b \\neq 0$: ninguna. Si $a = 0$ y $b = 0$: infinitas (identidad)." }],
      title: "Resolver una ecuación de primer grado",
      blocks: [
        { kind: "steps", items: [
          "Quitar **paréntesis** y **denominadores** (multiplicando por el m.c.m.).",
          "Pasar las incógnitas a un miembro y los números al otro.",
          "Reducir hasta $ax = b$ y despejar.",
          "**Comprobar** sustituyendo en la ecuación original.",
        ] },
        { kind: "example", title: "(x + 1)/2 + (x − 1)/3 = 6", lines: [
          { math: "3(x + 1) + 2(x - 1) = 36" },
          { math: "3x + 3 + 2x - 2 = 36 \\Rightarrow 5x = 35 \\Rightarrow x = 7" },
        ] },
      ],
      visual: { kind: "tool", tool: "ecuacion-lineal-explorador", initial: [2, 1, 1, 4], hint: "Haz que los coeficientes de x coincidan: ¿qué pasa si los términos independientes son distintos? ¿Y si son iguales?" },
    },
    {
      id: "check-resolver",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Pasa las $x$ a la izquierda y los números a la derecha." }],
      title: "Resolver",
      question: "Resuelve $3x - 7 = 2x + 5$. (solo el número)",
      correctAnswers: ["12"],
      explanation: "$3x - 2x = 5 + 7 \\Rightarrow x = 12$. Comprobación: $36 - 7 = 29$ y $24 + 5 = 29$.",
    },
    {
      id: "check-identidad",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Desarrolla el paréntesis y compara ambos miembros." }],
      title: "¿Cuántas soluciones?",
      question: "La ecuación $2(x + 3) = 2x + 6$ tiene…",
      choices: [
        { id: "a", label: "infinitas soluciones: es una identidad" },
        { id: "b", label: "una única solución, $x = 0$", incorrectFeedback: "Cualquier valor de $x$ la cumple, no solo $0$." },
        { id: "c", label: "ninguna solución", incorrectFeedback: "Al reducir queda $0 = 0$, que **siempre** es cierto, no un absurdo." },
        { id: "d", label: "dos soluciones", incorrectFeedback: "Una ecuación de primer grado nunca tiene exactamente dos soluciones." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2x + 6 = 2x + 6$ se cumple para cualquier $x$.",
    },
    {
      id: "problemas",
      type: "slide",
      help: [{ label: "Interpretar", message: "La solución de la ecuación hay que leerla en el contexto: una cantidad de personas no puede ser negativa ni decimal." }],
      title: "Plantear problemas",
      blocks: [
        { kind: "steps", title: "Tres pasos", items: [
          "**Plantear** una ecuación que traduzca el enunciado, con una incógnita bien definida.",
          "**Resolver** la ecuación.",
          "**Comprobar** el resultado e interpretarlo en el contexto.",
        ] },
        { kind: "example", title: "Un taxi", lines: [
          { math: "\\text{Bajada } 3\\text{ €} + 1{,}2\\text{ €/km}\\cdot x = 21\\text{ €}" },
          { math: "1{,}2x = 18 \\Rightarrow x = 15\\ \\text{km}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-consecutivos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Llama $x$ al menor: los otros son $x + 1$ y $x + 2$." }],
      title: "Números consecutivos",
      question: "La suma de tres números consecutivos es $72$. ¿Cuál es el **menor**? (solo el número)",
      correctAnswers: ["23"],
      explanation: "$x + (x+1) + (x+2) = 72 \\Rightarrow 3x + 3 = 72 \\Rightarrow x = 23$. Los números son $23$, $24$ y $25$.",
    },
  ],
};
