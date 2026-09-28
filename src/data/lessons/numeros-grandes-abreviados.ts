import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const numerosGrandesAbreviadosLesson: InteractiveLesson = {
  slug: "numeros-grandes-abreviados",
  title: "3. Números grandes abreviados",
  subtitle: TEMA_2_SUBTITLE,
  steps: [
    {
      id: "idea",
      type: "concept",
      title: "Forma abreviada",
      content: [
        "Un número con muchos ceros se entiende mejor como **potencia de base 10**: $100\\,000\\,000\\,000\\,000 = 10^{14}$.",
        "A veces conviene separar un factor «pequeño» y una potencia de $10$, como en el temario: $240\\,000 = 24 \\cdot 10^4$.",
        "Dos pasos: descomponer en producto por la unidad seguida de ceros, y escribir ese factor como $10^n$.",
      ],
    },
    {
      id: "ano-luz",
      type: "animated_solution",
      title: "Ejemplo — Un año luz",
      content: [
        "Un año luz son unos $9\\,500\\,000\\,000\\,000$ km. Vamos a dejarlo en forma manejable.",
      ],
      frames: [
        {
          caption: "Partimos del número:",
          math: "9\\,500\\,000\\,000\\,000",
        },
        {
          caption: "Separamos un factor sin ceros finales:",
          math: "95 \\cdot 100\\,000\\,000\\,000",
        },
        {
          caption: "La unidad seguida de ceros es una potencia de 10:",
          math: "95 \\cdot 10^{11}",
        },
        {
          caption: "Conclusión:",
          math: "\\text{Un año luz} \\approx 95 \\cdot 10^{11}\\ \\text{km}",
        },
      ],
    },
    {
      id: "transformar",
      type: "concept",
      title: "Transformar como en el libro",
      content: [
        "Para pasar de $240\\,000$ a forma abreviada: $240\\,000 = 24 \\cdot 10\\,000 = 24 \\cdot 10^4$.",
        "Para volver atrás: $4 \\cdot 10^5 = 400\\,000$; $15 \\cdot 10^9 = 15\\,000\\,000\\,000$.",
        "Los glóbulos rojos de una persona (25 mil millones) se escriben $25 \\cdot 10^9$.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Ida y vuelta",
          rows: [
            { text: "72 000", math: "72 \\cdot 10^3" },
            { text: "25 000 000 000 glóbulos", math: "25 \\cdot 10^9" },
            { text: "4 · 10^5 con todas las cifras", math: "400\\,000" },
          ],
        },
      ],
    },
    {
      id: "check",
      type: "fill_in_blank",
      title: "Practica",
      question: "Escribe $45\\,000\\,000$ como $a \\cdot 10^n$ con $a$ entero pequeño: ¿cuál es $n$? (solo el exponente)",
      correctAnswers: ["7"],
      hint: "$45\\,000\\,000 = 45 \\cdot 1\\,000\\,000$.",
      explanation: "$45\\,000\\,000 = 45 \\cdot 10^7$.",
    },
    {
      id: "check-mc",
      type: "multiple_choice",
      title: "Elige la forma correcta",
      question: "¿Cuál es la forma abreviada de $460\\,000$?",
      options: [
        { id: "a", text: "$46 \\cdot 10^3$" },
        { id: "b", text: "$46 \\cdot 10^4$" },
        { id: "c", text: "$460 \\cdot 10^3$" },
      ],
      correctOptionId: "b",
      explanation: "$460\\,000 = 46 \\cdot 10\\,000 = 46 \\cdot 10^4$.",
    },
  ],
};
