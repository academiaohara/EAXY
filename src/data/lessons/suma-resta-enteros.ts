import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaEnterosLesson: InteractiveLesson = {
  slug: "suma-resta-enteros",
  title: "3. Suma y resta de enteros",
  subtitle: TEMA_4_SUBTITLE,
  steps: [
    {
      id: "reglas",
      type: "concept",
      title: "Dos casos al operar",
      content: [
        "Con dos enteros (sin paréntesis extra), mira si llevan el mismo signo o signos distintos.",
        "Mismo signo: sumas valores absolutos y mantienes el signo ($-3 - 8 = -11$).",
        "Distinto signo: restas valores absolutos y pones el signo del que gana ($-2 + 8 = +6$).",
      ],
      visuals: [
        {
          kind: "integer-add-rules",
          title: "Elige el caso",
        },
      ],
    },
    {
      id: "paso-a-paso",
      type: "animated_solution",
      title: "Método 1 — De izquierda a derecha",
      content: ["Calcula $3 - 8 + 6 - 4$ operando en el orden en que aparecen los números."],
      frames: [
        { caption: "Empezamos:", math: "3 - 8 + 6 - 4" },
        { caption: "$3 - 8 = -5$", math: "-5 + 6 - 4" },
        { caption: "$-5 + 6 = 1$", math: "1 - 4" },
        { caption: "$1 - 4 = -3$", math: "-3" },
      ],
    },
    {
      id: "agrupar",
      type: "animated_solution",
      title: "Método 2 — Agrupar por signo",
      content: ["Otra forma válida para $3 - 8 + 6 - 4$:"],
      frames: [
        { caption: "Separamos positivos y negativos:", math: "3 + 6 - 8 - 4" },
        { caption: "Sumamos cada grupo:", math: "9 - 12" },
        { caption: "Resultado:", math: "-3" },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuánto vale $+4 - 9$?",
      options: [
        { id: "a", text: "$+13$" },
        { id: "b", text: "$-5$" },
        { id: "c", text: "$+5$" },
      ],
      correctOptionId: "b",
      explanation: "Signos distintos: $9 - 4 = 5$ y gana el negativo → $-5$.",
    },
  ],
};
