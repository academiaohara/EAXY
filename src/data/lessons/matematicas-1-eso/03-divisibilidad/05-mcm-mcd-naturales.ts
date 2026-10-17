import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const mcmMcdNaturalesLesson: InteractiveLesson = {
  slug: "mcm-mcd-naturales",
  title: "5. MCM y MCD",
  subtitle: TEMA_3_SUBTITLE,
  steps: [
    {
      id: "mcm-idea",
      type: "concept",
      title: "Mínimo común múltiplo (MCM)",
      content: [
        "El **mínimo común múltiplo** de varios números es el menor número que es múltiplo de todos a la vez.",
        "Ejemplo Doña Rosita: pastillas cada $4$ días y cada $6$ días → coinciden en múltiplos comunes de $4$ y $6$; el primero es $12$.",
        "Se escribe $\\text{m.c.m.}(4, 6) = 12$.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Método artesanal del MCM",
          rows: [
            { text: "Múltiplos de 4", math: "4, 8, 12, 16, 20, 24\\ldots" },
            { text: "Múltiplos de 6", math: "6, 12, 18, 24, 30\\ldots" },
            { text: "Comunes (el menor)", math: "12" },
          ],
        },
      ],
    },
    {
      id: "mcm-animado",
      type: "animated_solution",
      title: "m.c.m. (10, 15)",
      frames: [
        {
          caption: "Múltiplos de 10:",
          math: "10, 20, 30, 40, 50, 60\\ldots",
        },
        {
          caption: "Múltiplos de 15:",
          math: "15, 30, 45, 60, 75\\ldots",
        },
        {
          caption: "El menor común:",
          math: "\\text{m.c.m.}(10, 15) = 30",
        },
      ],
    },
    {
      id: "mcd-idea",
      type: "concept",
      title: "Máximo común divisor (MCD)",
      content: [
        "El **máximo común divisor** es el mayor número que divide a todos a la vez.",
        "Ejemplo: $8$ gatos y $12$ perros en jaulas iguales y grandes → probamos $1$, $2$, $4$ animales por jaula; el mayor posible es $4$.",
        "Se escribe $\\text{m.c.d.}(8, 12) = 4$.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Método artesanal del MCD",
          rows: [
            { text: "Divisores de 8", math: "1, 2, 4, 8" },
            { text: "Divisores de 12", math: "1, 2, 3, 4, 6, 12" },
            { text: "Comunes (el mayor)", math: "4" },
          ],
        },
      ],
    },
    {
      id: "mcd-animado",
      type: "animated_solution",
      title: "m.c.d. (20, 30)",
      frames: [
        {
          caption: "Divisores de 20:",
          math: "1, 2, 4, 5, 10, 20",
        },
        {
          caption: "Divisores de 30:",
          math: "1, 2, 3, 5, 6, 10, 15, 30",
        },
        {
          caption: "El mayor común:",
          math: "\\text{m.c.d.}(20, 30) = 10",
        },
      ],
    },
    {
      id: "problema",
      type: "concept",
      title: "¿MCM o MCD?",
      content: [
        "Usa el **mínimo común múltiplo** cuando buscas cuándo vuelven a coincidir ciclos (autobuses cada 20 y 30 min).",
        "Usa el **máximo común divisor** cuando repartes en grupos lo más grandes posibles sin sobrar (listones de 180 y 240 cm).",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Pista rápida",
          items: [
            { title: "Coinciden otra vez", math: "\\text{m.c.m.}", tone: "cobalt" },
            { title: "Reparto máximo", math: "\\text{m.c.d.}", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "check-mcm",
      type: "fill_in_blank",
      title: "Practica MCM",
      question: "m.c.m. (4, 8) = ? (solo el número)",
      correctAnswers: ["8"],
      explanation: "Los múltiplos de 8 ya son múltiplos de 4; el menor común es $8$.",
    },
    {
      id: "check-mcd",
      type: "fill_in_blank",
      title: "Practica MCD",
      question: "m.c.d. (15, 20) = ? (solo el número)",
      correctAnswers: ["5"],
      hint: "Escribe los divisores de $15$ y los de $20$, y busca el **mayor** que se repite. El m.c.d. nunca supera al menor de los dos números.",
      explanation:
        "Divisores de $15$: $1, 3, 5, 15$. Divisores de $20$: $1, 2, 4, 5, 10, 20$. Comunes: $1, 5$. El mayor es $5$.",
    },
  ],
};
