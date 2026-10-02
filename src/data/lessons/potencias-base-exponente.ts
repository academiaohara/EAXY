import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const potenciasBaseExponenteLesson: InteractiveLesson = {
  slug: "potencias-base-exponente",
  title: "1. Potencias: base y exponente",
  subtitle: TEMA_2_SUBTITLE,
  steps: [
    {
      id: "idea",
      type: "concept",
      title: "¿Qué es una potencia?",
      content: [
        "Una **potencia** es una forma abreviada de escribir un producto de factores iguales: $3 \\cdot 3 \\cdot 3 \\cdot 3 = 3^4$.",
        "El factor repetido se llama **base** y el número de veces que se repite, **exponente**.",
        "Se lee «$a$ elevado a $n$» o «$a$ elevado a la $n$-ésima». Por ejemplo, $5^3 = 5 \\cdot 5 \\cdot 5 = 125$.",
      ],
      visuals: [
        {
          kind: "equation-anatomy",
          title: "Partes de una potencia",
          parts: [
            { tex: "a", label: "base", tone: "cobalt" },
            { tex: "^", label: "" },
            { tex: "n", label: "exponente", tone: "violet" },
          ],
          caption: "$a^n$ indica multiplicar $a$ por sí mismo $n$ veces.",
        },
        {
          kind: "cards",
          title: "Del producto a la potencia",
          items: [
            { title: "Cuatro treses", math: "3^4", caption: "$3 \\cdot 3 \\cdot 3 \\cdot 3$", tone: "emerald" },
            { title: "Cinco doses", math: "2^5", caption: "$2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2$", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "cuadrado-cubo",
      type: "concept",
      title: "Cuadrado y cubo",
      content: [
        "El **cuadrado** de un número es la potencia de exponente $2$: $5^2 = 25$ (25 «cuadraditos»).",
        "El **cubo** de un número es la potencia de exponente $3$: $5^3 = 125$ (125 «cubitos»).",
        "Los pitagóricos relacionaron estos nombres con la geometría: área de un cuadrado y volumen de un cubo.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Ejemplos con 5",
          items: [
            { title: "Cuadrado", math: "5^2 = 25", tone: "cobalt" },
            { title: "Cubo", math: "5^3 = 125", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "exponente-cero",
      type: "concept",
      title: "Exponente cero",
      content: [
        "Convención importante: la potencia de **exponente 0** de cualquier número (distinto de cero en contextos avanzados) es igual a 1.",
        "Por ejemplo: $5^0 = 1$, $10^0 = 1$, $134^0 = 1$.",
        "Así mantenemos coherentes las reglas cuando más adelante trabajes con propiedades de potencias.",
      ],
      warning: "En 1.º ESO recuerda sobre todo: «elevado a 0» da $1$.",
    },
    {
      id: "calcular",
      type: "animated_solution",
      title: "Calcular potencias",
      content: ["Calculamos $8^5$ paso a paso (como en el libro, antes de usar la calculadora)."],
      frames: [
        {
          caption: "Escribimos el producto:",
          math: "8^5 = 8 \\cdot 8 \\cdot 8 \\cdot 8 \\cdot 8",
        },
        {
          caption: "Vamos agrupando:",
          math: "8 \\cdot 8 = 64 \\Rightarrow 64 \\cdot 8 = 512 \\Rightarrow 512 \\cdot 8 = 4096",
        },
        {
          caption: "Última multiplicación:",
          math: "4096 \\cdot 8 = 32\\,768",
        },
      ],
    },
    {
      id: "check",
      type: "fill_in_blank",
      title: "Comprueba lo aprendido",
      question: "¿Cuánto vale $10^4$? (solo el número)",
      correctAnswers: ["10000", "10 000", "10.000"],
      hint: "Escribe el producto de cuatro dieces: $10 \\cdot 10 \\cdot 10 \\cdot 10$.",
      explanation: "$10^4 = 10 \\cdot 10 \\cdot 10 \\cdot 10 = 10\\,000$: la base se multiplica $4$ veces, no $10 \\cdot 4$.",
    },
    {
      id: "check-cero",
      type: "fill_in_blank",
      title: "Exponente cero",
      question: "¿Cuánto vale $7^0$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Cualquier número distinto de cero elevado a 0 vale 1.",
    },
  ],
};
