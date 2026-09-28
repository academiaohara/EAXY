import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const raizCuadradaNaturalesLesson: InteractiveLesson = {
  slug: "raiz-cuadrada-naturales",
  title: "4. Raíz cuadrada",
  subtitle: TEMA_2_SUBTITLE,
  steps: [
    {
      id: "inversa",
      type: "concept",
      title: "Operación inversa del cuadrado",
      content: [
        "Calcular la **raiz cuadrada** es deshacer un **cuadrado**: si $b^2 = a$, entonces $\\sqrt{a} = b$.",
        "Ejemplos: $4^2 = 16 \\Rightarrow \\sqrt{16} = 4$; $15^2 = 225 \\Rightarrow \\sqrt{225} = 15$.",
        "En $\\sqrt{a}$, el $a$ se llama **radicando** y el resultado es la raíz.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Par cuadrado ↔ raíz",
          items: [
            { title: "Cuadrado", math: "6^2 = 36", tone: "cobalt" },
            { title: "Raíz", math: "\\sqrt{36} = 6", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "exactas",
      type: "concept",
      title: "Raíces exactas y cuadrados perfectos",
      content: [
        "Si la raíz es un número entero, la raíz es **exacta**. El radicando es un **cuadrado perfecto** ($36$, $100$, $400$…).",
        "Conviene memorizar los primeros cuadrados: $1^2=1$, $2^2=4$, …, $15^2=225$, etc.",
        "Entonces $\\sqrt{36}=6$, $\\sqrt{100}=10$, $\\sqrt{400}=20$ salen al instante.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Algunos cuadrados perfectos",
          items: [
            { title: "$7^2$", math: "49", tone: "violet" },
            { title: "$12^2$", math: "144", tone: "amber" },
            { title: "$20^2$", math: "400", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "entera",
      type: "concept",
      title: "Raíz entera",
      content: [
        "Para muchos números la raíz no es entera. Buscamos el entero más cercano por debajo: la **raiz entera**.",
        "Con $\\sqrt{40}$: $6^2 = 36 < 40$ y $7^2 = 49 > 40$, así que $6 < \\sqrt{40} < 7$ y la raíz entera es $6$.",
        "Se escribe $\\sqrt{40} \\approx 6$ cuando nos quedamos con esa aproximación entera.",
      ],
      warning: "Raíz exacta = entero exacto. Raíz entera = mejor entero por debajo cuando no hay exacta.",
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      title: "Ejemplo resuelto — $\\sqrt{1\\,444}$",
      content: ["Como en el libro: usamos cuadrados cercanos para decidir si la raíz es exacta o entera."],
      frames: [
        {
          caption: "Cuadrados de referencia:",
          math: "37^2 = 1369,\\quad 38^2 = 1444,\\quad 39^2 = 1521",
        },
        {
          caption: "Como $1444 = 38^2$:",
          math: "\\sqrt{1444} = 38 \\quad \\text{(raíz exacta)}",
        },
        {
          caption: "Para $\\sqrt{1580}$:",
          math: "1580 \\text{ está entre } 39^2 \\text{ y } 40^2 \\Rightarrow \\sqrt{1580} \\approx 39 \\text{ (raíz entera)}",
        },
      ],
    },
    {
      id: "problema",
      type: "concept",
      title: "Problema geométrico",
      content: [
        "Una finca cuadrada de $900\\ \\text{m}^2$ tiene lado $\\sqrt{900} = 30$ m.",
        "Para cercarla hacen falta $4 \\cdot 30 = 120$ m de alambrada.",
        "Un cubo de $10$ cm de arista se formó con $10^3 = 1000$ cubitos de $1$ cm.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Del área al lado",
          rows: [
            { text: "Superficie cuadrada 900 m²", math: "l^2 = 900" },
            { text: "Lado", math: "l = \\sqrt{900} = 30" },
            { text: "Perímetro (alambrada)", math: "4 \\cdot 30 = 120\\ \\text{m}" },
          ],
        },
      ],
    },
    {
      id: "check-exacta",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuánto vale $\\sqrt{81}$?",
      options: [
        { id: "a", text: "$8$" },
        { id: "b", text: "$9$" },
        { id: "c", text: "$81$" },
      ],
      correctOptionId: "b",
      explanation: "$9^2 = 81$, así que $\\sqrt{81} = 9$ (raíz exacta).",
    },
    {
      id: "check-entera",
      type: "fill_in_blank",
      title: "Raíz entera",
      question: "¿Cuál es la raíz entera de $50$? (solo el número)",
      correctAnswers: ["7"],
      hint: "$7^2 = 49$ y $8^2 = 64$.",
      explanation: "$49 < 50 < 64$, así que la raíz entera es $7$.",
    },
  ],
};
