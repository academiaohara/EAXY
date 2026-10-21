import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesPrimerGrado3esoLesson: InteractiveLesson = {
  slug: "ecuaciones-primer-grado-3eso",
  title: "2. Ecuaciones de primer grado",
  subtitle: TEMA_3ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "equivalentes",
      type: "slide",
      help: [
        {
          label: "Misma solución",
          message: "Dos ecuaciones equivalentes tienen exactamente las mismas soluciones: transformar sin cambiar la solución es la clave.",
        },
        {
          label: "Una balanza",
          message: "Si haces lo mismo en los dos platos de una balanza en equilibrio, sigue en equilibrio.",
        },
      ],
      title: "Transformaciones que mantienen la solución",
      blocks: [
        {
          kind: "definition",
          text: "Una ecuación de **primer grado** se reduce a $ax + b = 0$ con $a \\ne 0$ y tiene una única solución, $x = -\\frac{b}{a}$.",
        },
        {
          kind: "compare",
          left: { title: "Sumar o restar", text: "Lo mismo en los dos miembros: lo que suma en un miembro pasa **restando** al otro.", math: ["x + 5 = 9 \\Rightarrow x = 9 - 5"], tone: "ok" },
          right: { title: "Multiplicar o dividir", text: "Por el mismo número distinto de cero: lo que multiplica pasa **dividiendo**.", math: ["3x = 12 \\Rightarrow x = 12 : 3"], tone: "info" },
        },
      ],
      visual: { kind: "tool", tool: "balanza-explorador", params: { a: 2, b: 3, c: 11 }, hint: "Haz la misma operación en los dos platos y observa que la solución no cambia." },
    },
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "No es rígido",
          message: "El orden es una guía: si hay paréntesis fáciles, puedes empezar por ellos. Lo importante es que cada paso sea una transformación válida.",
        },
        {
          label: "Para qué comprobar",
          message: "Un descuido de signos es muy habitual: sustituir en la ecuación original lo detecta.",
        },
      ],
      title: "Pasos para resolver",
      blocks: [
        {
          kind: "steps",
          items: [
            "Quita **denominadores** (multiplica por el m.c.m.).",
            "Quita **paréntesis**.",
            "Pasa los términos en $x$ a un miembro y los números al otro.",
            "**Simplifica** cada miembro.",
            "**Despeja** $x$.",
            "**Comprueba** sustituyendo en la ecuación inicial.",
          ],
        },
        {
          kind: "example",
          title: "3x − 2(x + 3) = x − 3(x + 1)",
          lines: [
            { math: "3x - 2x - 6 = x - 3x - 3" },
            { math: "x - 6 = -2x - 3" },
            { math: "3x = 3 \\Rightarrow x = 1" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "anomalas",
      type: "slide",
      help: [
        {
          label: "Sin término en x",
          message: "Si los términos en $x$ se cancelan, queda $0 \\cdot x = k$. Si $k \\ne 0$ es imposible; si $k = 0$ siempre se cumple.",
        },
        {
          label: "Cómo se interpretan",
          message: "Una ecuación sin solución no puede cumplirse nunca; una con infinitas soluciones es, en realidad, una identidad.",
        },
      ],
      title: "Ecuaciones sin solución o con infinitas",
      blocks: [
        {
          kind: "compare",
          left: { title: "Sin solución", math: ["4x - 6 = 4(x + 3)", "4x - 6 = 4x + 12", "0 \\cdot x = 18"], tone: "warn" },
          right: { title: "Infinitas soluciones", math: ["4x - 6 = 4(x - 2) + 2", "4x - 6 = 4x - 6", "0 \\cdot x = 0"], tone: "ok" },
        },
        {
          kind: "text",
          text: "Si al simplificar desaparece la $x$, observa el resultado: una igualdad **falsa** (sin solución) o **siempre cierta** (infinitas).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-resolver",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Quita paréntesis",
          message: "$4(2x - 7) = 8x - 28$ y $3(3x + 1) = 9x + 3$.",
        },
      ],
      title: "Una ecuación con paréntesis",
      question: "Resuelve $4(2x - 7) - 3(3x + 1) = -5 + x$ (solo el número).",
      correctAnswers: ["-13"],
      explanation: "$8x - 28 - 9x - 3 = -5 + x \\Rightarrow -x - 31 = x - 5 \\Rightarrow -2x = 26 \\Rightarrow x = -13$.",
    },
    {
      id: "check-simple",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Agrupa",
          message: "Pasa los términos en $x$ a la izquierda: $5x - 2x = 3 + 6$.",
        },
      ],
      title: "Términos en los dos miembros",
      question: "Resuelve $5x - 6 = 2x + 3$ (solo el número).",
      correctAnswers: ["3"],
      explanation: "$3x = 9 \\Rightarrow x = 3$. Comprobación: $15 - 6 = 9$ y $6 + 3 = 9$.",
    },
    {
      id: "check-tipo",
      type: "predict",
      help: [
        {
          label: "Simplifica",
          message: "Desarrolla el paréntesis y compara los dos miembros.",
        },
      ],
      title: "¿Cuántas soluciones?",
      question: "¿Cuántas soluciones tiene la ecuación $3(x + 2) = 3x + 6$?",
      mode: "choice",
      choices: [
        { id: "inf", label: "Infinitas: es cierta para cualquier $x$" },
        { id: "una", label: "Una sola", incorrectFeedback: "Al desarrollar queda $3x + 6 = 3x + 6$, siempre cierta." },
        { id: "ninguna", label: "Ninguna", incorrectFeedback: "No se llega a una contradicción: los dos miembros son idénticos." },
      ],
      correctChoiceId: "inf",
      shuffleChoices: true,
      explanation: "$3x + 6 = 3x + 6$ equivale a $0 \\cdot x = 0$: infinitas soluciones.",
    },
  ],
};
