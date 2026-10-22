import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesPrimerGrado4esoLesson: InteractiveLesson = {
  slug: "ecuaciones-primer-grado-4eso",
  title: "2. Ecuaciones de primer grado",
  subtitle: TEMA_4ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "equilibrio",
      type: "slide",
      help: [
        {
          label: "Equivalentes",
          message: "Sumar, restar, multiplicar o dividir (por algo distinto de $0$) los **dos miembros** por lo mismo da una ecuación equivalente: tiene las mismas soluciones.",
        },
        {
          label: "Pasar al otro lado",
          message: "«Pasar sumando al otro lado» es en realidad restar lo mismo en los dos miembros. Si lo entiendes así, nunca fallas el signo.",
        },
      ],
      title: "Una balanza: lo mismo en los dos platos",
      blocks: [
        {
          kind: "text",
          text: "Una ecuación es una **balanza en equilibrio**. Para despejar $x$ se hace **lo mismo en los dos miembros** hasta dejarla sola.",
        },
        {
          kind: "rule",
          title: "Ecuación de primer grado",
          text: "Tras simplificar, llega a la forma $ax + b = 0$, con $a \\neq 0$: tiene **una única solución**, $x = -\\dfrac{b}{a}$.",
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { a: 2, b: 3, c: 9, sign: "+" } },
    },
    {
      id: "metodo",
      type: "slide",
      help: [
        {
          label: "Orden flexible",
          message: "A veces conviene dar los pasos en otro orden (por ejemplo, quitar denominadores primero). Con práctica sabrás qué hacer en cada caso.",
        },
      ],
      title: "Los seis pasos",
      blocks: [
        {
          kind: "steps",
          title: "Cómo resolver una ecuación complicada",
          items: [
            "Quita **paréntesis**.",
            "Quita **denominadores**: multiplica los dos miembros por el m.c.m.",
            "Pasa los términos en $x$ a un miembro y los números al otro.",
            "Simplifica cada miembro.",
            "**Despeja** la $x$.",
            "**Comprueba** la solución sustituyendo.",
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(−x−1)/6", "−", "3(x+5)/12", "=", "2(11−x)/9", "−", "6"], active: [0, 6], note: "ecuación con paréntesis y denominadores." },
            { tokens: ["36·(−x−1)/6", "−", "36·3(x+5)/12", "=", "36·2(11−x)/9", "−", "36·6"], active: [0, 6], note: "m.c.m.(6, 12, 9) = 36: multiplicamos cada término." },
            { tokens: ["6(−x−1)", "−", "9(x+5)", "=", "8(11−x)", "−", "216"], active: [0, 6], note: "simplificamos los denominadores." },
            { tokens: ["−6x−6−9x−45", "=", "88−8x−216"], active: [0, 2], note: "quitamos paréntesis." },
            { tokens: ["−7x", "=", "−77"], active: [0, 2], note: "$x$ a un lado, números al otro: $-15x + 8x = 88 - 216 + 6 + 45$." },
            { tokens: ["x", "=", "11"], fresh: [0, 2], note: "despejamos: $x = \\frac{-77}{-7} = 11$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Tres casos",
          message: "Tras agrupar, queda $(a - c)x = d - b$. Si $a \\neq c$, una solución. Si $a = c$: o $0 = 0$ (identidad) o $0 = \\text{número} \\neq 0$ (imposible).",
        },
      ],
      title: "Explora: ¿cuántas soluciones?",
      blocks: [
        {
          kind: "text",
          text: "Cambia los cuatro coeficientes de $ax + b = cx + d$. Observa los **tres casos** posibles: una solución, ninguna o todas.",
        },
        {
          kind: "warning",
          text: "Si al despejar desaparece la $x$ y queda **una igualdad falsa** (como $3 = 2$), la ecuación **no tiene solución**. Si queda una **verdadera** ($0 = 0$), es una identidad.",
        },
      ],
      visual: { kind: "tool", tool: "ecuacion-lineal-explorador", initial: [3, 15, 1, 1], hint: "Iguala a y c: primero con b distinto de d (sin solución) y luego con b = d (identidad)." },
    },
    {
      id: "check-simple",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Desarrolla",
          message: "$3(x + 5) = x + 1 \\to 3x + 15 = x + 1 \\to 2x = -14$.",
        },
      ],
      title: "Una ecuación con paréntesis",
      question: "Resuelve $3(x + 5) = x + 1$. (escribe el número con su signo)",
      correctAnswers: ["-7", "−7"],
      explanation: "$3x + 15 = x + 1 \\Rightarrow 2x = -14 \\Rightarrow x = -7$.",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Agrupa",
          message: "$3(5x - 7) + 2(x - 1) = 5x - 3 \\to 17x - 23 = 5x - 3 \\to 12x = 20$.",
        },
      ],
      title: "Una solución fraccionaria",
      question: "Resuelve $3(5x - 7) + 2(x - 1) = 5x - 3$ y da la solución como fracción irreducible.",
      correctAnswers: ["5/3"],
      explanation: "$15x - 21 + 2x - 2 = 5x - 3 \\Rightarrow 12x = 20 \\Rightarrow x = \\frac{5}{3}$.",
    },
    {
      id: "check-sin-solucion",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Simplifica cada lado",
          message: "Izquierda: $5x + 3 - 3x = 2x + 3$. Derecha: $12 + 2x - 10 = 2x + 2$. Queda $2x + 3 = 2x + 2$.",
        },
      ],
      title: "¿Cuántas soluciones?",
      question: "La ecuación $5x + 3(1 - x) = 12 + 2(x - 5)$, ¿cuántas soluciones tiene?",
      choices: [
        { id: "ninguna", label: "Ninguna" },
        { id: "una", label: "Una", incorrectFeedback: "Al simplificar, la $x$ desaparece: $2x + 3 = 2x + 2$ da $3 = 2$, que es falso." },
        { id: "todas", label: "Infinitas (todos los valores)", incorrectFeedback: "Sería así si quedase $0 = 0$. Aquí queda $3 = 2$, que es falso." },
      ],
      correctChoiceId: "ninguna",
      shuffleChoices: true,
      explanation: "$2x + 3 = 2x + 2 \\Rightarrow 3 = 2$: imposible. La ecuación no tiene solución.",
    },
    {
      id: "check-identidad",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Simplifica",
          message: "$4(2 + 3x) = 8 + 12x$. $10(x - 1) + 2(x + 9) = 10x - 10 + 2x + 18 = 12x + 8$.",
        },
      ],
      title: "¿Cuántas soluciones?",
      question: "La ecuación $4(2 + 3x) = 10(x - 1) + 2(x + 9)$, ¿cuántas soluciones tiene?",
      choices: [
        { id: "todas", label: "Infinitas: es una identidad" },
        { id: "una", label: "Una", incorrectFeedback: "Los dos miembros se simplifican a $12x + 8$: coinciden siempre." },
        { id: "ninguna", label: "Ninguna", incorrectFeedback: "No queda una igualdad falsa: queda $12x + 8 = 12x + 8$, que es siempre cierta." },
      ],
      correctChoiceId: "todas",
      shuffleChoices: true,
      explanation: "$12x + 8 = 12x + 8$: se cumple para **cualquier** $x$. Es una identidad.",
    },
    {
      id: "check-completa",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Comprueba",
          message: "Para comprobar, sustituye $x = 11$ en los dos miembros. Izquierda: $\\frac{-12}{6} - \\frac{3 \\cdot 16}{12} = -2 - 4 = -6$.",
        },
      ],
      title: "Comprobar la solución",
      question: "Resuelve $\\dfrac{-x - 1}{6} - \\dfrac{3(x + 5)}{12} = \\dfrac{2(11 - x)}{9} - 6$. (solo el número)",
      correctAnswers: ["11"],
      explanation: "Con $x = 11$: izquierda $\\frac{-12}{6} - \\frac{48}{12} = -6$; derecha $\\frac{0}{9} - 6 = -6$. Coinciden.",
    },
  ],
};
