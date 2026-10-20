import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const maximoComunDivisor2esoLesson: InteractiveLesson = {
  slug: "maximo-comun-divisor-2eso",
  title: "5. Máximo común divisor",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mcd-idea",
      type: "slide",
      help: [
        {
          label: "¿Por qué «máximo»?",
          message: "Hay varios divisores comunes. Interesa el mayor: las jaulas más grandes que se puedan llenar por igual.",
        },
        {
          label: "Siempre hay uno",
          message: "El $1$ divide a todos los números, así que siempre hay al menos un divisor común.",
        },
      ],
      title: "Divisores comunes y máximo común divisor",
      blocks: [
        {
          kind: "text",
          text: "Hay que cortar dos cintas de **20 m** y **30 m** en trozos iguales, sin que sobre nada y **lo más largos posible**.",
        },
        {
          kind: "definition",
          text: "El **máximo común divisor** de varios números es el **mayor** de sus divisores comunes.",
        },
        {
          kind: "example",
          lines: [
            { math: "D(20) = \\{1, 2, 4, 5, 10, 20\\}" },
            { math: "D(30) = \\{1, 2, 3, 5, 6, 10, 15, 30\\}" },
            { math: "\\text{m.c.d.}(20, 30) = 10", note: "trozos de $10$ m" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "mcd-cortes", params: { a: 20, b: 30 } },
    },
    {
      id: "mcd-tres",
      type: "slide",
      help: [
        {
          label: "Con tres números",
          message: "Solo valen los divisores que están en las tres listas. El mayor de ellos es el m.c.d.",
        },
      ],
      title: "Método artesanal: listar divisores",
      blocks: [
        {
          kind: "steps",
          items: [
            "Escribe los **divisores** de cada número.",
            "Marca los que son **comunes**.",
            "Toma el **mayor**.",
          ],
        },
        {
          kind: "example",
          title: "m.c.d.(20, 30, 50)",
          lines: [
            { math: "D(20) = \\{1, 2, 4, 5, 10, 20\\}" },
            { math: "D(30) = \\{1, 2, 3, 5, 6, 10, 15, 30\\}" },
            { math: "D(50) = \\{1, 2, 5, 10, 25, 50\\}" },
            { math: "\\text{m.c.d.}(20, 30, 50) = 10" },
          ],
        },
        {
          kind: "warning",
          text: "Con números grandes encontrar todos los divisores cuesta. Se usan los factores primos.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "mcd-factores",
      type: "slide",
      help: [
        {
          label: "¿Por qué solo los comunes?",
          message: "El m.c.d. debe dividir a todos los números, así que solo puede estar hecho con primos que tengan todos.",
        },
        {
          label: "¿Por qué el menor exponente?",
          message: "Si un número tiene el primo menos veces, el divisor no puede llevar más: no cabría en él.",
        },
      ],
      title: "Método óptimo: factores primos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Descompón cada número en **factores primos**.",
            "Toma solo los primos que aparecen en **todos**.",
            "Elévalos al **menor exponente** con el que aparezcan.",
            "**Multiplica** los factores elegidos.",
          ],
        },
        {
          kind: "example",
          title: "m.c.d.(16, 24, 320)",
          lines: [
            { math: "16 = 2^4 \\quad 24 = 2^3 \\cdot 3 \\quad 320 = 2^6 \\cdot 5" },
            { math: "\\text{m.c.d.} = 2^3 = 8" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [16, 24, 320], mode: "mcd" } },
    },
    {
      id: "mcd-casos",
      type: "slide",
      help: [
        {
          label: "Uno es múltiplo del otro",
          message: "Si el mayor contiene al menor, todo el menor divide al mayor: el m.c.d. es el menor.",
        },
        {
          label: "Comprobación",
          message: "El m.c.d. nunca puede ser mayor que el menor de los números.",
        },
      ],
      title: "Cuando uno es múltiplo del otro",
      blocks: [
        {
          kind: "rule",
          text: "Si un número es múltiplo del otro, el m.c.d. es **el menor** de los dos.",
        },
        {
          kind: "example",
          lines: [
            { math: "15 = 3 \\cdot 5 \\qquad 30 = 2 \\cdot 3 \\cdot 5" },
            { math: "\\text{m.c.d.}(15, 30) = 3 \\cdot 5 = 15" },
          ],
        },
        {
          kind: "example",
          title: "Otro caso",
          lines: [
            { math: "150 = 2 \\cdot 3 \\cdot 5^2 \\qquad 225 = 3^2 \\cdot 5^2" },
            { math: "\\text{m.c.d.}(150, 225) = 3 \\cdot 5^2 = 75" },
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
          message: "$60 = 2^2 \\cdot 3 \\cdot 5$ y $40 = 2^3 \\cdot 5$. Los comunes son el $2$ y el $5$.",
        },
      ],
      title: "Calcula el m.c.d.",
      question: "m.c.d.$(60, 40)$ (solo el número)",
      correctAnswers: ["20"],
      hint: "Primos comunes, con el menor exponente.",
      explanation: "$60 = 2^2 \\cdot 3 \\cdot 5$ y $40 = 2^3 \\cdot 5$: $\\text{m.c.d.} = 2^2 \\cdot 5 = 20$.",
    },
    {
      id: "check-aceite",
      type: "predict",
      help: [
        {
          label: "¿Divisor o múltiplo?",
          message: "La capacidad de la garrafa debe caber un número exacto de veces en $80$ y en $60$: es un divisor común, y el mayor posible.",
        },
        {
          label: "Calcula",
          message: "$80 = 2^4 \\cdot 5$ y $60 = 2^2 \\cdot 3 \\cdot 5$.",
        },
      ],
      title: "Garrafas de aceite",
      question:
        "Un restaurante compra un bidón de **80** L de aceite de oliva y otro de **60** L de girasol y los envasa, sin mezclar, en garrafas iguales **lo más grandes posible**. ¿Qué capacidad tiene cada garrafa?",
      mode: "choice",
      choices: [
        { id: "10", label: "$10$ L", incorrectFeedback: "Vale, pero no es la mayor: caben garrafas más grandes." },
        { id: "20", label: "$20$ L" },
        {
          id: "40",
          label: "$40$ L",
          incorrectFeedback: "$60$ no es múltiplo de $40$: sobrarían $20$ L.",
        },
        {
          id: "240",
          label: "$240$ L",
          incorrectFeedback: "$240$ es el m.c.m.; la garrafa no puede ser mayor que los bidones.",
        },
      ],
      correctChoiceId: "20",
      shuffleChoices: true,
      explanation: "$\\text{m.c.d.}(80, 60) = 2^2 \\cdot 5 = 20$ L: salen $4$ garrafas de oliva y $3$ de girasol.",
    },
    {
      id: "check-listones",
      type: "fill_in_blank",
      help: [
        {
          label: "Qué se pide",
          message: "Trozos iguales, lo más largos posible y sin desperdiciar: el m.c.d. de las dos longitudes.",
        },
      ],
      title: "Listones",
      question:
        "Un carpintero corta dos listones de **180 cm** y **240 cm** en trozos iguales, lo más largos posible y sin desperdicio. ¿Cuántos cm mide cada trozo? (solo el número)",
      correctAnswers: ["60"],
      explanation: "$180 = 2^2 \\cdot 3^2 \\cdot 5$ y $240 = 2^4 \\cdot 3 \\cdot 5$: $\\text{m.c.d.} = 2^2 \\cdot 3 \\cdot 5 = 60$ cm.",
    },
    {
      id: "check-equipos",
      type: "predict",
      help: [
        {
          label: "Sin mezclar clases",
          message: "El tamaño del equipo tiene que dividir a $24$ y a $30$ a la vez: es un divisor común.",
        },
        {
          label: "Todos los divisores comunes",
          message: "Los divisores comunes de $24$ y $30$ son los divisores de su m.c.d.",
        },
      ],
      title: "Equipos en 2.º A y 2.º B",
      question:
        "En 2.º A hay **24** estudiantes y en 2.º B, **30**. Se hacen equipos del mismo tamaño sin mezclar clases. ¿Cuál es el mayor tamaño posible?",
      mode: "choice",
      choices: [
        { id: "3", label: "$3$", incorrectFeedback: "Sirve, pero hay un tamaño mayor." },
        { id: "6", label: "$6$" },
        {
          id: "12",
          label: "$12$",
          incorrectFeedback: "$30$ no es múltiplo de $12$.",
        },
        {
          id: "120",
          label: "$120$",
          incorrectFeedback: "Es el m.c.m.; un equipo no puede tener más gente que la clase.",
        },
      ],
      correctChoiceId: "6",
      shuffleChoices: true,
      explanation: "$\\text{m.c.d.}(24, 30) = 6$. También valen los demás divisores de $6$: equipos de $1$, $2$ o $3$.",
    },
  ],
};
