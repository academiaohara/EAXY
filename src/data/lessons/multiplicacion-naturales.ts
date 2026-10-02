import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionNaturalesLesson: InteractiveLesson = {
  slug: "multiplicacion-naturales",
  title: "4. Multiplicación",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "idea",
      type: "concept",
      title: "Multiplicar es sumar repetido",
      content: [
        "**Multiplicar** es una forma abreviada de sumar varias veces el mismo número.",
        "Si una entrada al circo cuesta $38$ €, cinco entradas cuestan $38 + 38 + 38 + 38 + 38 = 38 \\cdot 5 = 190$ €.",
        "Multiplicar por $10$, $100$ o $1000$ añade uno, dos o tres ceros al final del número (salvo que haya decimales).",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Cinco veces $38$",
          rows: ["38", "38", "38", "38", "38"],
          operator: "+",
          result: "190",
          caption: "Equivale a $38 \\cdot 5$.",
        },
      ],
    },
    {
      id: "propiedades",
      type: "concept",
      title: "Propiedades de la multiplicación",
      content: [
        "**Conmutativa**: $a \\cdot b = b \\cdot a$. El orden de los factores no cambia el producto.",
        "**Asociativa**: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$. Puedes reagrupar factores.",
        "**Distributiva**: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$. Multiplicar una suma es multiplicar cada sumando y sumar.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Las tres propiedades",
          items: [
            { title: "Conmutativa", math: "15 \\cdot 4 = 4 \\cdot 15", tone: "cobalt" },
            { title: "Asociativa", math: "(3 \\cdot 5) \\cdot 4 = 3 \\cdot (5 \\cdot 4)", tone: "violet" },
            { title: "Distributiva", math: "15 \\cdot (4 + 3) = 15 \\cdot 4 + 15 \\cdot 3", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "fontanero",
      type: "animated_solution",
      title: "Propiedad distributiva — El fontanero",
      content: [
        "Un fontanero trabaja $4$ h por la mañana y $3$ h por la tarde a $15$ €/h. Veamos las dos formas de calcular lo que gana.",
      ],
      frames: [
        {
          caption: "Sumamos horas y multiplicamos:",
          math: "15 \\cdot (4 + 3) = 15 \\cdot 7 = 105 \\text{ €}",
        },
        {
          caption: "Multiplicamos cada tramo y sumamos:",
          math: "15 \\cdot 4 + 15 \\cdot 3 = 60 + 45 = 105 \\text{ €}",
        },
        {
          caption: "Conclusión:",
          math: "15 \\cdot (4 + 3) = 15 \\cdot 4 + 15 \\cdot 3",
        },
      ],
    },
    {
      id: "mental",
      type: "concept",
      title: "Trucos de cálculo mental",
      content: [
        "La asociativa y la conmutativa permiten reagrupar: $22 \\times 45 = 11 \\times 2 \\times 9 \\times 5 = 99 \\times 10 = 990$.",
        "Para multiplicar por $9$ o $11$ un número de dos cifras: $23 \\cdot 9 = 23 \\cdot 10 - 23 = 207$ y $23 \\cdot 11 = 23 \\cdot 10 + 23 = 253$.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Por $9$",
          rows: ["23 \\cdot 10", "- 23"],
          operator: "=",
          result: "207",
          caption: "Restamos una vez el número.",
        },
      ],
    },
    {
      id: "check-distributiva",
      type: "classify",
      title: "Comprueba lo aprendido",
      question: "¿Qué expresiones valen lo mismo que $15 \\cdot (6 - 2)$? Coloca cada una en su grupo.",
      groups: [
        { id: "igual", label: "Igual a $15 \\cdot (6 - 2)$", tone: "emerald" },
        { id: "distinta", label: "No es igual", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$15 \\cdot 6 - 15 \\cdot 2$", group: "igual" },
        { id: "b", text: "$15 \\cdot 6 - 2$", group: "distinta" },
        { id: "c", text: "$15 \\cdot 4$", group: "igual" },
        { id: "d", text: "$15 \\cdot 6 - 15 \\cdot 2 - 2$", group: "distinta" },
        { id: "e", text: "$6 \\cdot 15 - 2 \\cdot 15$", group: "igual" },
        { id: "f", text: "$15 + 6 - 2$", group: "distinta" },
      ],
      hint: "El $15$ multiplica a **cada** término del paréntesis. También puedes calcular: ¿cuánto vale $15 \\cdot (6 - 2)$?",
      explanation:
        "La distributiva también vale con restas: $a(b - c) = ab - ac$. Así $15 \\cdot (6 - 2) = 15 \\cdot 6 - 15 \\cdot 2 = 15 \\cdot 4 = 60$. Las otras dan $88$, $58$ y $19$.",
    },
  ],
};
