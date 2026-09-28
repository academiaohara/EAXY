import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const enterosPositivosNegativosLesson: InteractiveLesson = {
  slug: "enteros-positivos-negativos",
  title: "1. Números positivos y negativos",
  subtitle: TEMA_4_SUBTITLE,
  steps: [
    {
      id: "historia",
      type: "concept",
      title: "Cuando los naturales no bastan",
      content: [
        "Los naturales cuentan cantidades, pero no siempre bastan para la situación opuesta: subir o bajar, ganar o perder, calor o frío bajo cero.",
        "Los chinos usaban varillas rojas y negras; en la India (siglo vii) se sistematizaron el cero y los negativos. Los signos + y − para operar llegaron mucho más tarde.",
        "Escribir $9 + 6 - 7 = 8$ hoy es inmediato; a la humanidad le costó milenios llegar aquí.",
      ],
    },
    {
      id: "opuestos",
      type: "concept",
      title: "Parejas de opuestos",
      content: [
        "Un **número negativo** va precedido de $-$ y representa lo contrario del positivo: $+8$ °C frente a $-8$ °C, $+20$ € ganados frente a $-20$ € gastados.",
        "Sin signo escrito, el número es **positivo**: $3 = +3$.",
        "En operaciones conviene escribir los negativos entre paréntesis: $5 + (-2)$, $(-4) \\cdot (-3)$.",
      ],
      visuals: [
        {
          kind: "opposite-scenarios",
          title: "Del enunciado al signo",
          pairs: [
            { context: "Temperatura", positive: "+8", negative: "-8" },
            { context: "Dinero de Julián", positive: "+20", negative: "-20" },
            { context: "Planta del edificio", positive: "+6 \\text{ (piso)}", negative: "-2 \\text{ (sótano)}" },
            { context: "Cuenta bancaria", positive: "+150", negative: "-85" },
          ],
        },
      ],
    },
    {
      id: "fijas-vs-cambio",
      type: "concept",
      title: "Posición fija o variación",
      content: [
        "Positivos y negativos describen posiciones (piso, saldo) o variaciones (subir 3 plantas → $+3$; bajar 5 → $-5$).",
        "El termómetro sube $+2$ °C o baja $-2$ °C según el cambio, no solo la lectura.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Variaciones",
          rows: [
            { text: "Subes del 2.º al 5.º", math: "+3" },
            { text: "Bajas del 3.º al 2.º sótano", math: "-5" },
            { text: "Suben 2 °C", math: "+2" },
            { text: "Bajan 2 °C", math: "-2" },
          ],
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "Francisco debe 85 €. ¿Qué número entero lo representa mejor?",
      options: [
        { id: "a", text: "$+85$" },
        { id: "b", text: "$-85$" },
        { id: "c", text: "$0$" },
      ],
      correctOptionId: "b",
      explanation: "Una deuda es una cantidad negativa: $-85$.",
    },
  ],
};
