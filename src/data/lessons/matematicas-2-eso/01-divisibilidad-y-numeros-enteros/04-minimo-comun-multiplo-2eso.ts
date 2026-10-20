import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const minimoComunMultiplo2esoLesson: InteractiveLesson = {
  slug: "minimo-comun-multiplo-2eso",
  title: "4. Mínimo común múltiplo",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mcm-idea",
      type: "slide",
      help: [
        {
          label: "¿Por qué «mínimo»?",
          message: "Hay infinitos múltiplos comunes, pero el que interesa es el primero en que coinciden.",
        },
        {
          label: "¿Cómo lo veo?",
          message: "Escribe los múltiplos de cada número y busca el primero que aparece en las dos listas.",
        },
      ],
      title: "Múltiplos comunes y mínimo común múltiplo",
      blocks: [
        {
          kind: "text",
          text: "Una persona toma una píldora cada **4** días y una cápsula cada **6**. ¿Cada cuánto coinciden las dos tomas?",
        },
        {
          kind: "definition",
          text: "El **mínimo común múltiplo** de varios números es el **menor** de sus múltiplos comunes (distinto de $0$).",
        },
        {
          kind: "example",
          lines: [
            { math: "M(4) = \\{4, 8, \\mathbf{12}, 16, 20, \\mathbf{24}, \\dots\\}" },
            { math: "M(6) = \\{6, \\mathbf{12}, 18, \\mathbf{24}, \\dots\\}" },
            { math: "\\text{m.c.m.}(4, 6) = 12", note: "coinciden cada $12$ días" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "multiplos-saltos", params: { a: 4, b: 6 } },
    },
    {
      id: "mcm-tres",
      type: "slide",
      help: [
        {
          label: "Con tres números",
          message: "El procedimiento no cambia: lista los múltiplos de cada uno y busca el primer valor que está en las tres listas.",
        },
        {
          label: "Todos los demás",
          message: "Los demás múltiplos comunes son múltiplos del m.c.m.: $30, 60, 90\\dots$",
        },
      ],
      title: "Método artesanal: listar múltiplos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Escribe los **múltiplos** de cada número.",
            "Marca los que son **comunes**.",
            "Toma el **menor**.",
          ],
        },
        {
          kind: "example",
          title: "m.c.m.(2, 3, 5)",
          lines: [
            { math: "M(2) = \\{2, 4, 6, \\dots, 30, \\dots\\}" },
            { math: "M(3) = \\{3, 6, 9, \\dots, 30, \\dots\\}" },
            { math: "M(5) = \\{5, 10, 15, \\dots, 30, \\dots\\}" },
            { math: "\\text{m.c.m.}(2, 3, 5) = 30" },
          ],
        },
        {
          kind: "warning",
          text: "Con números grandes la lista se hace enorme. Para eso está el método de los factores primos.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "mcm-factores",
      type: "slide",
      help: [
        {
          label: "¿Por qué el mayor exponente?",
          message: "El m.c.m. tiene que contener a cada número: necesita cada primo tantas veces como el número que más lo tenga.",
        },
        {
          label: "¿Y los no comunes?",
          message: "También entran: si dejaras uno fuera, el resultado no sería múltiplo del número que lo tiene.",
        },
      ],
      title: "Método óptimo: factores primos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Descompón cada número en **factores primos**.",
            "Toma **todos** los primos que aparezcan, comunes o no.",
            "Elévalos al **mayor exponente** con el que aparezcan.",
            "**Multiplica** los factores elegidos.",
          ],
        },
        {
          kind: "example",
          title: "m.c.m.(16, 24, 320)",
          lines: [
            { math: "16 = 2^4 \\quad 24 = 2^3 \\cdot 3 \\quad 320 = 2^6 \\cdot 5" },
            { math: "\\text{m.c.m.} = 2^6 \\cdot 3 \\cdot 5 = 960" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [16, 24, 320], mode: "mcm" } },
    },
    {
      id: "mcm-casos",
      type: "slide",
      help: [
        {
          label: "Uno es múltiplo del otro",
          message: "Si el mayor ya contiene al menor, no hace falta añadir nada: el m.c.m. es el mayor.",
        },
        {
          label: "Comprobación",
          message: "El m.c.m. nunca puede ser menor que el mayor de los números.",
        },
      ],
      title: "Cuando uno es múltiplo del otro",
      blocks: [
        {
          kind: "rule",
          text: "Si un número es múltiplo del otro, el m.c.m. es **el mayor** de los dos.",
        },
        {
          kind: "example",
          lines: [
            { math: "15 = 3 \\cdot 5 \\qquad 30 = 2 \\cdot 3 \\cdot 5" },
            { math: "\\text{m.c.m.}(15, 30) = 2 \\cdot 3 \\cdot 5 = 30" },
          ],
        },
        {
          kind: "example",
          title: "Otro caso",
          lines: [
            { math: "75 = 3 \\cdot 5^2 \\qquad 90 = 2 \\cdot 3^2 \\cdot 5" },
            { math: "\\text{m.c.m.}(75, 90) = 2 \\cdot 3^2 \\cdot 5^2 = 450" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-calculo",
      type: "fill_in_blank",
      help: [
        {
          label: "Descompón",
          message: "$20 = 2^2 \\cdot 5$ y $30 = 2 \\cdot 3 \\cdot 5$. Toma el $2$ al cuadrado, el $3$ y el $5$.",
        },
      ],
      title: "Calcula el m.c.m.",
      question: "m.c.m.$(20, 30)$ (solo el número)",
      correctAnswers: ["60"],
      hint: "Todos los primos, con el mayor exponente.",
      explanation: "$20 = 2^2 \\cdot 5$ y $30 = 2 \\cdot 3 \\cdot 5$: $\\text{m.c.m.} = 2^2 \\cdot 3 \\cdot 5 = 60$.",
    },
    {
      id: "check-torres",
      type: "predict",
      help: [
        {
          label: "¿Qué pregunta es?",
          message: "Las cimas coinciden cuando la altura es múltiplo de $30$ y de $36$. La primera vez es el menor múltiplo común.",
        },
        {
          label: "Calcula",
          message: "$30 = 2 \\cdot 3 \\cdot 5$ y $36 = 2^2 \\cdot 3^2$.",
        },
      ],
      title: "Dos torres de cubos",
      question:
        "Se apilan cubos de **30 cm** de arista en una torre y, al lado, cubos de **36 cm** en otra. ¿A qué altura, en cm, coinciden por primera vez las cimas?",
      mode: "choice",
      choices: [
        {
          id: "6",
          label: "$6$ cm",
          incorrectFeedback: "$6$ es el máximo común divisor, no un múltiplo.",
        },
        { id: "180", label: "$180$ cm" },
        {
          id: "360",
          label: "$360$ cm",
          incorrectFeedback: "Es múltiplo común, pero no el primero: ya coinciden a los $180$ cm.",
        },
        {
          id: "1080",
          label: "$1\\,080$ cm",
          incorrectFeedback: "$30 \\cdot 36 = 1\\,080$ es múltiplo común, pero está lejos del mínimo.",
        },
      ],
      correctChoiceId: "180",
      shuffleChoices: true,
      explanation: "$30 = 2 \\cdot 3 \\cdot 5$ y $36 = 2^2 \\cdot 3^2$: $\\text{m.c.m.} = 2^2 \\cdot 3^2 \\cdot 5 = 180$ cm.",
    },
    {
      id: "check-autobuses",
      type: "predict",
      help: [
        {
          label: "Plantea",
          message: "Vuelven a pasar juntos cuando han transcurrido un número de minutos que es múltiplo de $20$ y de $30$.",
        },
        {
          label: "No olvides la hora",
          message: "El m.c.m. son minutos. Súmalos a las $14{:}00$.",
        },
      ],
      title: "Dos líneas de autobús",
      question:
        "La línea roja pasa cada **20** min y la verde cada **30** min. Pasan juntas a las 14:00. ¿A qué hora vuelven a coincidir?",
      mode: "choice",
      choices: [
        {
          id: "1410",
          label: "14:10",
          incorrectFeedback: "$10$ es el máximo común divisor, no un múltiplo de $20$ ni de $30$.",
        },
        {
          id: "1430",
          label: "14:30",
          incorrectFeedback: "A las 14:30 pasa la verde, pero la roja pasó a las 14:20 y 14:40.",
        },
        { id: "1500", label: "15:00" },
        {
          id: "1600",
          label: "16:00",
          incorrectFeedback: "Es una coincidencia posterior; la primera es antes.",
        },
      ],
      correctChoiceId: "1500",
      shuffleChoices: true,
      explanation: "$\\text{m.c.m.}(20, 30) = 60$ min, es decir, una hora más tarde: a las 15:00.",
    },
  ],
};
