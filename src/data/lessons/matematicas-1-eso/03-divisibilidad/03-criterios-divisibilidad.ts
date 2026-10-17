import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const criteriosDivisibilidadLesson: InteractiveLesson = {
  slug: "criterios-divisibilidad",
  title: "3. Criterios de divisibilidad",
  subtitle: TEMA_3_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Reglas rápidas",
      content: [
        "Los **criterios de divisibilidad** permiten saber si un número es múltiplo de $2$, $3$, $5$ o $10$ sin hacer la división completa.",
        "Son atajos muy usados antes de factorizar o calcular MCM y MCD.",
      ],
    },
    {
      id: "dos-cinco-diez",
      type: "concept",
      title: "Múltiplos de 2, 5 y 10",
      content: [
        "Múltiplo de 2: la última cifra es par ($0, 2, 4, 6, 8$). Ej.: $378$ sí, $451$ no.",
        "Múltiplo de 5: termina en $0$ o $5$. Ej.: $280$ sí, $557$ no.",
        "Múltiplo de 10: termina en $0$. Todos los múltiplos de $10$ son también múltiplos de $2$ y de $5$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Mira la última cifra",
          items: [
            { title: "Entre 2", math: "378 \\rightarrow 8", tone: "cobalt" },
            { title: "Entre 5", math: "280 \\rightarrow 0", tone: "emerald" },
            { title: "Entre 10", math: "30 \\rightarrow 0", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "tres",
      type: "concept",
      title: "Múltiplo de 3",
      content: [
        "Un número es múltiplo de 3 cuando la **suma de sus cifras** es múltiplo de $3$.",
        "Ejemplos del libro: $33 \\rightarrow 3+3=6$ (sí); $72 \\rightarrow 7+2=9$ (sí); $359 \\rightarrow 3+5+9=17$ (no).",
        "También: $408 \\rightarrow 4+0+8=12$ (sí, porque $12$ es múltiplo de $3$).",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Comprobar 252",
          rows: ["2 + 5 + 2", "= 9"],
          operator: "\\Rightarrow",
          result: "252 \\text{ es múltiplo de } 3",
          caption: "$9$ es múltiplo de $3$.",
        },
      ],
    },
    {
      id: "check",
      type: "classify",
      title: "Comprueba lo aprendido",
      question: "Usa el criterio del $3$ y coloca cada número en su grupo.",
      groups: [
        { id: "si", label: "Múltiplo de $3$", tone: "emerald" },
        { id: "no", label: "No es múltiplo de $3$", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$186$", group: "si" },
        { id: "b", text: "$436$", group: "no" },
        { id: "c", text: "$105$", group: "si" },
        { id: "d", text: "$124$", group: "no" },
        { id: "e", text: "$246$", group: "si" },
        { id: "f", text: "$298$", group: "no" },
      ],
      hint: "Suma las cifras de cada número. Que sea par o termine en $6$ no te dice nada sobre el $3$.",
      explanation:
        "$186 \\rightarrow 15$, $105 \\rightarrow 6$ y $246 \\rightarrow 12$ son múltiplos de $3$. En cambio $436 \\rightarrow 13$, $124 \\rightarrow 7$ y $298 \\rightarrow 19$ no lo son, aunque terminen en cifra par.",
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      title: "Suma de cifras",
      question: "Para comprobar si 510 es múltiplo de 3, suma sus cifras. ¿Cuánto da? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$5 + 1 + 0 = 6$, y $6$ es múltiplo de $3$, así que $510$ también.",
    },
  ],
};
