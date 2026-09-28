import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const potenciasBase10Lesson: InteractiveLesson = {
  slug: "potencias-base-10",
  title: "2. Potencias de base 10",
  subtitle: TEMA_2_SUBTITLE,
  steps: [
    {
      id: "regla",
      type: "concept",
      title: "Potencias de 10",
      content: [
        "Como ya sabes, multiplicar por $10$ añade un cero. Las **potencias de base 10** son aún más rápidas de calcular.",
        "$10^2 = 100$, $10^3 = 1\\,000$, $10^4 = 10\\,000$…",
        "El número de ceros del resultado coincide con el **exponente**: $10^n$ es la unidad seguida de $n$ ceros.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "De exponente a ceros",
          rows: ["10^2", "10^3", "10^9"],
          operator: "\\rightarrow",
          result: "1\\,000\\,000\\,000",
          caption: "$10^9$ tiene 9 ceros.",
        },
      ],
    },
    {
      id: "interpretar",
      type: "concept",
      title: "Leer números grandes",
      content: [
        "Escribir cantidades con potencias de $10$ facilita ver su orden de magnitud sin contar cifras.",
        "Por ejemplo, $1\\,000\\,000\\,000\\,000 = 10^{12}$: el exponente $12$ indica cuántos ceros hay.",
        "Arquímedes usó ideas parecidas para describir números enormes en la Antigüedad.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Equivalencias útiles",
          items: [
            { title: "Millar", math: "10^3", tone: "cobalt" },
            { title: "Millón", math: "10^6", tone: "emerald" },
            { title: "Mil millones", math: "10^9", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "atomos",
      type: "concept",
      title: "Aplicación: átomos en un gramo",
      content: [
        "En un gramo de plata hay unos $5\\,600\\,000\\,000\\,000\\,000\\,000\\,000$ átomos (20 cifras).",
        "Es más claro escribir $56 \\cdot 10^{20}$ átomos: el $20$ del exponente indica el tamaño del número.",
        "Así se expresa y se comprende mejor una cantidad enorme.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Forma abreviada",
          rows: [
            { text: "Número con muchos ceros", math: "5\\,600\\ldots 0" },
            { text: "Potencia de 10", math: "56 \\cdot 10^{20}" },
          ],
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuántos ceros tiene $10^8$ escrito con todas sus cifras?",
      options: [
        { id: "a", text: "$6$ ceros" },
        { id: "b", text: "$8$ ceros" },
        { id: "c", text: "$10$ ceros" },
      ],
      correctOptionId: "b",
      explanation: "$10^8 = 100\\,000\\,000$: la unidad seguida de 8 ceros.",
    },
    {
      id: "check-millones",
      type: "fill_in_blank",
      title: "Escribe la potencia",
      question: "Un millón se escribe $10$ elevado a ¿qué exponente? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$1\\,000\\,000 = 10^6$.",
    },
  ],
};
