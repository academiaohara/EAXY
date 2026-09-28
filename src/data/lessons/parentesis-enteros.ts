import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const parentesisEnterosLesson: InteractiveLesson = {
  slug: "parentesis-enteros",
  title: "4. Paréntesis con enteros",
  subtitle: TEMA_4_SUBTITLE,
  steps: [
    {
      id: "quitar",
      type: "concept",
      title: "Suprimir paréntesis",
      content: [
        "Los enteros suelen ir entre paréntesis. Al quitarlos, el signo delante del paréntesis manda.",
        "Sumar: $+(+a) = +a$, $+(-a) = -a$.",
        "Restar: $-(+a) = -a$, $-(-a) = +a$.",
      ],
      visuals: [
        {
          kind: "parenthesis-rules",
          title: "Las cuatro reglas (con dinero)",
        },
      ],
    },
    {
      id: "bloque",
      type: "concept",
      title: "Paréntesis con varios sumandos",
      content: [
        "Si delante hay «+», los signos interiores no cambian: $+(5 - 3) = 5 - 3$.",
        "Si delante hay «−», cambias todos los signos interiores: $-(8 - 6 - 5) = -8 + 6 + 5$.",
        "El paréntesis empaqueta un bloque: el signo exterior afecta a cada término dentro.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Ejemplo del temario",
          rows: ["-(+8 - 6 - 5)", "-8 + 6 + 5"],
          operator: "=",
          result: "+3",
          caption: "Al quitar el paréntesis precedido de −, cada signo se invierte.",
        },
      ],
    },
    {
      id: "animada",
      type: "animated_solution",
      title: "Expresión con corchetes",
      content: ["Resolvemos $12 - [8 - (7 - 10) + (2 - 6)]$ quitando paréntesis desde dentro."],
      frames: [
        {
          caption: "Dentro de los paréntesis pequeños:",
          math: "7 - 10 = -3,\\quad 2 - 6 = -4",
        },
        {
          caption: "Sustituimos en el corchete:",
          math: "12 - [8 - (-3) + (-4)] = 12 - [8 + 3 - 4]",
        },
        {
          caption: "Corchete:",
          math: "8 + 3 - 4 = 7",
        },
        {
          caption: "Resultado final:",
          math: "12 - 7 = 5",
        },
      ],
    },
    {
      id: "check",
      type: "fill_in_blank",
      title: "Quita paréntesis",
      question: "¿Cuánto vale $8 - (-2)$? (solo el número, con signo si hace falta: -3 o 10)",
      correctAnswers: ["10", "+10"],
      explanation: "$8 - (-2) = 8 + 2 = 10$.",
    },
  ],
};
