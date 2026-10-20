import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const resolucionEcuaciones2esoLesson: InteractiveLesson = {
  slug: "resolucion-ecuaciones-2eso",
  title: "2. Resolución de ecuaciones",
  subtitle: TEMA_2ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reducir-transponer",
      type: "slide",
      help: [
        {
          label: "Ecuaciones equivalentes",
          message: "Reducir y transponer no cambian la solución: cada paso produce una ecuación equivalente más sencilla.",
        },
        {
          label: "Objetivo",
          message: "Quedarte con la incógnita sola en un miembro y un número en el otro.",
        },
      ],
      title: "Reducir y transponer",
      blocks: [
        {
          kind: "text",
          text: "Para resolver una ecuación se va transformando en otras **equivalentes** más sencillas hasta dejar la incógnita sola. Hay dos recursos:",
        },
        {
          kind: "compare",
          left: {
            title: "Reducir",
            text: "Sumar o restar términos semejantes **dentro de cada miembro**.",
            tone: "ok",
          },
          right: {
            title: "Transponer",
            text: "Pasar términos **de un miembro al otro** invirtiendo su operación.",
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "ejemplo-basico",
      type: "slide",
      help: [
        {
          label: "Primero transponer el 5",
          message: "En $2x - 5 = 3$ el $5$ resta: pasa sumando. Después el $2$ multiplica: pasa dividiendo.",
        },
        {
          label: "Comprueba",
          message: "$2 \\cdot 4 - 5 = 3$ ✓.",
        },
      ],
      title: "Un ejemplo paso a paso",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "2x - 5 = 3", note: "ecuación" },
            { math: "2x = 3 + 5", note: "transponer: el $5$ pasa sumando" },
            { math: "2x = 8", note: "reducir" },
            { math: "x = \\dfrac{8}{2} = 4", note: "transponer: el $2$ pasa dividiendo" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["2x", "−", "5", "=", "3"], active: [1, 2], note: "el $5$ resta: pasa sumando al otro miembro." },
            { tokens: ["2x", "=", "3", "+", "5"], active: [2, 4], note: "reducimos el segundo miembro." },
            { tokens: ["2x", "=", "8"], active: [0, 0], note: "el $2$ multiplica: pasa dividiendo." },
            { tokens: ["x", "=", "8 : 2"], note: "calculamos." },
            { tokens: ["x", "=", "4"], fresh: [2, 2], note: "solución: $x = 4$." },
          ],
        },
      },
    },
    {
      id: "incognita-dos-lados",
      type: "slide",
      help: [
        {
          label: "Junta las x",
          message: "Pasa los términos con $x$ a un miembro y los números al otro. Después reduce.",
        },
        {
          label: "Un orden cómodo",
          message: "Conviene dejar los términos con $x$ a la izquierda y los números a la derecha.",
        },
      ],
      title: "Con la incógnita en los dos miembros",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Reduce** cada miembro.",
            "**Transpón** los términos con $x$ a un miembro y los números al otro.",
            "**Reduce** de nuevo y **despeja** la $x$.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "3x - 4 = x + 6", note: "ecuación" },
            { math: "3x - x = 6 + 4" },
            { math: "2x = 10" },
            { math: "x = 5" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "5x + 1 - 3x = 7", note: "ecuación" },
            { math: "2x + 1 = 7 \\to 2x = 6 \\to x = 3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "parentesis",
      type: "slide",
      help: [
        {
          label: "Distributiva",
          message: "$3(x - 2) = 3x - 6$: el $3$ multiplica a cada término del paréntesis, incluido el signo.",
        },
        {
          label: "Después, igual",
          message: "Una vez quitados los paréntesis, es una ecuación como las anteriores.",
        },
      ],
      title: "Con paréntesis",
      blocks: [
        {
          kind: "rule",
          text: "Se **quitan los paréntesis** con la propiedad distributiva y se sigue como siempre.",
        },
        {
          kind: "example",
          lines: [
            { math: "3(x - 2) = 2x + 1", note: "ecuación" },
            { math: "3x - 6 = 2x + 1" },
            { math: "3x - 2x = 1 + 6" },
            { math: "x = 7" },
          ],
        },
        {
          kind: "warning",
          text: "Cuidado con el signo menos delante de un paréntesis: cambia **todos** los signos de dentro.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "casos-especiales",
      type: "slide",
      help: [
        {
          label: "Si desaparece la x",
          message: "Si al reducir la $x$ se cancela, queda una igualdad numérica: o es siempre cierta o nunca.",
        },
      ],
      title: "Infinitas soluciones y sin solución",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Infinitas soluciones",
            text: "Queda $0x = 0$: se cumple para **cualquier** $x$.",
            math: ["2x + 3 = 2x + 3 \\to 0 = 0"],
            tone: "ok",
          },
          right: {
            title: "Sin solución",
            text: "Queda $0x = k$ con $k \\ne 0$: **no** se cumple para ningún $x$.",
            math: ["2x + 1 = 2x + 5 \\to 1 = 5"],
            tone: "warn",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-dos-pasos",
      type: "fill_in_blank",
      help: [
        {
          label: "Transpón el 3",
          message: "$5x - 3 = 2$: el $3$ pasa sumando: $5x = 5$.",
        },
      ],
      title: "Dos pasos",
      question: "Resuelve $5x - 3 = 2$ (solo el valor de $x$)",
      correctAnswers: ["1"],
      explanation: "$5x = 2 + 3 = 5$; $x = 1$.",
    },
    {
      id: "check-dos-lados",
      type: "fill_in_blank",
      help: [
        {
          label: "Junta las x",
          message: "Resta $x$ en los dos miembros y resta $7$ también: $3x - x = 15 - 7$.",
        },
      ],
      title: "Incógnita en los dos lados",
      question: "Resuelve $3x + 7 = x + 15$ (solo el valor de $x$)",
      correctAnswers: ["4"],
      explanation: "$3x - x = 15 - 7$; $2x = 8$; $x = 4$.",
    },
    {
      id: "check-signo",
      type: "predict",
      help: [
        {
          label: "Transpón el 4",
          message: "En $4 - 5x = 9$, el $4$ suma: pasa restando: $-5x = 9 - 4$.",
        },
        {
          label: "Signo negativo",
          message: "Al dividir entre $-5$, el signo del resultado cambia: positivo entre negativo da negativo.",
        },
      ],
      title: "Cuidado con los signos",
      question: "¿Cuál es la solución de $4 - 5x = 9$?",
      mode: "choice",
      choices: [
        { id: "-1", label: "$x = -1$" },
        { id: "1", label: "$x = 1$", incorrectFeedback: "Comprueba: $4 - 5 \\cdot 1 = -1 \\ne 9$." },
        { id: "13/5", label: "$x = \\dfrac{13}{5}$", incorrectFeedback: "Has sumado $4 + 9$; el $4$ pasa restando: $9 - 4$." },
        { id: "-13/5", label: "$x = -\\dfrac{13}{5}$", incorrectFeedback: "Has sumado $4 + 9$; el $4$ pasa restando: $9 - 4$." },
      ],
      correctChoiceId: "-1",
      shuffleChoices: true,
      explanation: "$-5x = 9 - 4 = 5$, así que $x = 5 : (-5) = -1$. Comprobación: $4 - 5 \\cdot (-1) = 9$.",
    },
    {
      id: "check-sin-solucion",
      type: "predict",
      help: [
        {
          label: "Resta 2x",
          message: "Al restar $2x$ en los dos miembros, ¿qué queda a cada lado?",
        },
      ],
      title: "¿Cuántas soluciones?",
      question: "La ecuación $2x + 4 = 2x + 9$...",
      mode: "choice",
      choices: [
        { id: "ninguna", label: "no tiene solución" },
        { id: "una", label: "tiene una única solución", incorrectFeedback: "Al restar $2x$ queda $4 = 9$, que nunca se cumple: no hay valor de $x$ que valga." },
        { id: "infinitas", label: "tiene infinitas soluciones", incorrectFeedback: "Eso ocurriría si quedara $4 = 4$; aquí queda $4 = 9$." },
        { id: "cero", label: "su solución es $x = 0$", incorrectFeedback: "Con $x = 0$: $4 = 9$, falso." },
      ],
      correctChoiceId: "ninguna",
      shuffleChoices: true,
      explanation: "Restando $2x$ queda $4 = 9$: imposible. La ecuación no tiene solución.",
    },
  ],
};
