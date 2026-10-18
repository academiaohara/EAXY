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
      help: [
        {
          label: "¿Por qué abreviar?",
          message: "Contar ceros a ojo es fácil de equivocar. $10^{14}$ dice cuántos hay sin contarlos.",
        },
        {
          label: "Separar un factor",
          message: "En $240\\,000 = 24 \\cdot 10^4$ dejas las cifras con significado y mandas los ceros a la potencia.",
        },
      ],
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
      help: [
        {
          label: "Paso a paso",
          message: "Separas las cifras sin ceros finales, cuentas los ceros que quedan y los escribes como potencia de $10$.",
        },
        {
          label: "¿Cuál es el exponente?",
          message: "Cuenta los ceros que hay detrás de $95$ en el segundo paso: ese número es el exponente.",
        },
      ],
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
      help: [
        {
          label: "De ida y de vuelta",
          message: "Para volver al número, escribe el factor y añade tantos ceros como indica el exponente.",
        },
        {
          label: "Un ejemplo real",
          message: "«Veinticinco mil millones» es $25 \\cdot 10^9$: «mil millones» tiene nueve ceros.",
        },
      ],
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
      help: [
        {
          label: "¿Qué indica el exponente de $10$?",
          message: "Cuántos ceros van detrás del $1$. Se trata de separar el número en un factor «corto» por una unidad seguida de ceros.",
        },
        {
          label: "Separa los ceros",
          message: "Tapa las cifras significativas ($45$) y cuenta cuántos ceros quedan detrás.",
        },
        {
          label: "Compruébalo",
          message: "Multiplica $a$ por $10^n$ y verifica que recuperas el número original.",
        },
      ],
      title: "Practica",
      question: "Escribe $45\\,000\\,000$ como $a \\cdot 10^n$ con $a$ entero pequeño: ¿cuál es $n$? (solo el exponente)",
      correctAnswers: ["7"],
      hint: "$45\\,000\\,000 = 45 \\cdot 1\\,000\\,000$.",
      explanation: "$45\\,000\\,000 = 45 \\cdot 10^7$.",
    },
    {
      id: "check-mc",
      type: "classify",
      help: [
        {
          label: "De potencia a número",
          message: "$a \\cdot 10^n$ es $a$ seguido de $n$ ceros. Por ejemplo, $7 \\cdot 10^3$ es $7$ con tres ceros: $7000$.",
        },
        {
          label: "Un mismo número, varias formas",
          message: "$46 \\cdot 10^4$ y $460 \\cdot 10^3$ valen lo mismo: cada cero que pasa al factor, el exponente baja una unidad.",
        },
      ],
      title: "¿Qué número es?",
      question: "Coloca cada expresión debajo del número que representa.",
      groups: [
        { id: "a46mil", label: "$46\\,000$", tone: "cobalt" },
        { id: "a460mil", label: "$460\\,000$", tone: "emerald" },
        { id: "a4600mil", label: "$4\\,600\\,000$", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$46 \\cdot 10^3$", group: "a46mil" },
        { id: "b", text: "$46 \\cdot 10^4$", group: "a460mil" },
        { id: "c", text: "$46 \\cdot 10^5$", group: "a4600mil" },
        { id: "d", text: "$460 \\cdot 10^2$", group: "a46mil" },
        { id: "e", text: "$460 \\cdot 10^3$", group: "a460mil" },
        { id: "f", text: "$4600 \\cdot 10^3$", group: "a4600mil" },
      ],
      hint: "Escribe el número y añade tantos ceros como indica el exponente de $10$.",
      explanation:
        "$46 \\cdot 10^4 = 46 \\cdot 10\\,000 = 460\\,000$, igual que $460 \\cdot 10^3$. La forma abreviada más cómoda usa el número sin ceros finales: $460\\,000 = 46 \\cdot 10^4$.",
    },
  ],
};
