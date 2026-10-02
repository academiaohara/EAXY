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
      type: "classify",
      title: "Comprueba lo aprendido",
      question: "Sabemos que $54 = 9 \\cdot 6$ y $40 = 8 \\cdot 5$. Clasifica cada afirmación.",
      groups: [
        { id: "correcta", label: "Correcta", tone: "emerald" },
        { id: "incorrecta", label: "Incorrecta", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$54$ es múltiplo de $6$", group: "correcta" },
        { id: "b", text: "$9$ es divisor de $54$", group: "correcta" },
        { id: "c", text: "$9$ es múltiplo de $54$", group: "incorrecta" },
        { id: "d", text: "$6$ no es divisor de $54$", group: "incorrecta" },
        { id: "e", text: "$40$ es múltiplo de $5$", group: "correcta" },
        { id: "f", text: "$40$ es divisor de $8$", group: "incorrecta" },
      ],
      hint: "El número grande (el producto) es el **múltiplo**; los factores pequeños son sus **divisores**.",
      explanation:
        "El producto es múltiplo de cada factor: $54$ de $6$ y de $9$; $40$ de $8$ y de $5$. Al revés, los factores son divisores del producto, nunca múltiplos.",
    },
  ],
};
