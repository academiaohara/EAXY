import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const relacionDivisibilidadLesson: InteractiveLesson = {
  slug: "relacion-divisibilidad",
  title: "1. La relación de divisibilidad",
  subtitle: TEMA_3_SUBTITLE,
  steps: [
    {
      id: "idea",
      type: "concept",
      title: "¿Cuándo hay divisibilidad?",
      content: [
        "Dos números están ligados por la **relación de divisibilidad** cuando uno cabe en el otro un número exacto de veces: la división es exacta (resto $0$).",
        "Ejemplo del temario: en $80$ cm caben exactamente cuatro cazuelas de $20$ cm → $80$ es **divisible** entre $20$.",
        "Con fuentes de $25$ cm no ocurre: $80 : 25$ no es exacta → $80$ no es divisible entre $25$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Compara",
          items: [
            { title: "Sí hay divisibilidad", math: "80 : 20 = 4", caption: "Resto 0", tone: "emerald" },
            { title: "No hay divisibilidad", math: "80 : 25 = 3", caption: "Resto 5", tone: "rose" },
          ],
        },
      ],
    },
    {
      id: "multiplo-divisor",
      type: "concept",
      title: "Múltiplo y divisor",
      content: [
        "Si $a : b$ es exacta ($b \\neq 0$):",
        "— $a$ es **múltiplo** de $b$ (el mayor «contiene» al menor).",
        "— $b$ es **divisor** de $a$ (el menor «cabe» en el mayor).",
        "Ejemplo: $40 = 8 \\cdot 5$ → $40$ es múltiplo de $8$ y $8$ es divisor de $40$.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Con $40$ y $8$",
          rows: ["40 : 8 = 5", "8 \\cdot 5 = 40"],
          operator: "\\Leftrightarrow",
          result: "\\text{múltiplo / divisor}",
          caption: "Cada divisor va emparejado con otro: $5$ también divide a $40$.",
        },
      ],
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      title: "Comprobar divisibilidad",
      content: ["¿Es $78$ divisible entre $6$? Lo comprobamos como en el libro."],
      frames: [
        {
          caption: "Hacemos la división:",
          math: "78 : 6 = 13 \\text{ resto } 0",
        },
        {
          caption: "Conclusión:",
          math: "78 = 6 \\cdot 13 \\Rightarrow 78 \\text{ es múltiplo de } 6",
        },
        {
          caption: "También:",
          math: "6 \\text{ es divisor de } 78",
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "Si $54 = 9 \\cdot 6$, ¿qué afirmación es correcta?",
      options: [
        { id: "a", text: "$9$ es múltiplo de $54$" },
        { id: "b", text: "$54$ es múltiplo de $6$" },
        { id: "c", text: "$6$ no es divisor de $54$" },
      ],
      correctOptionId: "b",
      explanation: "El producto mayor es múltiplo de los factores; $6$ y $9$ son divisores de $54$.",
    },
  ],
};
