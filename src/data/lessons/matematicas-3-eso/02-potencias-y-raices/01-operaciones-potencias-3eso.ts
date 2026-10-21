import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const operacionesPotencias3esoLesson: InteractiveLesson = {
  slug: "operaciones-potencias-3eso",
  title: "1. Operaciones con potencias",
  subtitle: TEMA_3ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "misma-base",
      type: "slide",
      help: [
        {
          label: "Cuenta los factores",
          message: "$a^3 \\cdot a^4$ son tres factores $a$ y cuatro factores $a$: siete factores en total, $a^7$.",
        },
        {
          label: "Cociente",
          message: "$a^6 : a^4$ es $\\frac{a \\cdot a \\cdot a \\cdot a \\cdot a \\cdot a}{a \\cdot a \\cdot a \\cdot a}$: se tachan cuatro factores y quedan dos.",
        },
      ],
      title: "Potencias de la misma base",
      blocks: [
        {
          kind: "definition",
          text: "Una potencia es un producto de factores iguales: $a^n = a \\cdot a \\cdots a$ ($n$ veces). La **base** es el factor y el **exponente**, cuántas veces se repite.",
        },
        {
          kind: "facts",
          items: [
            { tex: "a^m \\cdot a^n = a^{m+n}", label: "producto: se suman los exponentes" },
            { tex: "a^m : a^n = a^{m-n}", label: "cociente: se restan los exponentes" },
            { tex: "(a^m)^n = a^{m \\cdot n}", label: "potencia de una potencia: se multiplican" },
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "5^2 \\cdot 5^6 \\cdot 5^3 = 5^{2+6+3} = 5^{11}" },
            { math: "5^8 : 5^6 = 5^{8-6} = 5^2" },
            { math: "(2^3)^4 = 2^{3 \\cdot 4} = 2^{12}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "potencias-factores", params: { a: 4, b: 2 } },
    },
    {
      id: "mismo-exponente",
      type: "slide",
      help: [
        {
          label: "Agrupa factores",
          message: "$(a \\cdot b)^3 = (a \\cdot b)(a \\cdot b)(a \\cdot b) = a^3 \\cdot b^3$: los tres $a$ juntos y los tres $b$ juntos.",
        },
        {
          label: "Úsalo al revés",
          message: "$2^7 \\cdot 5^7 = (2 \\cdot 5)^7 = 10^7$ es mucho más cómodo de calcular.",
        },
      ],
      title: "Potencias con el mismo exponente",
      blocks: [
        {
          kind: "compare",
          left: { title: "Producto", text: "Se pueden agrupar las bases.", math: ["(a \\cdot b)^n = a^n \\cdot b^n", "2^7 \\cdot 5^7 = 10^7"], tone: "ok" },
          right: { title: "Cociente", text: "Se puede dividir primero las bases.", math: ["\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}", "\\dfrac{14^5}{7^5} = 2^5"], tone: "info" },
        },
        {
          kind: "warning",
          text: "Estas propiedades no sirven con sumas: $(2 + 3)^2 = 25$ y en cambio $2^2 + 3^2 = 13$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma exponentes",
          message: "$3^4 \\cdot 3^2 = 3^{4+2}$.",
        },
      ],
      title: "Producto de potencias",
      question: "$3^4 \\cdot 3^2 = 3^n$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "Al multiplicar potencias de la misma base se suman los exponentes: $4 + 2 = 6$.",
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta exponentes",
          message: "$7^9 : 7^4 = 7^{9-4}$.",
        },
      ],
      title: "Cociente de potencias",
      question: "$7^9 : 7^4 = 7^n$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "En un cociente de la misma base se restan los exponentes: $9 - 4 = 5$.",
    },
    {
      id: "check-potencia-potencia",
      type: "predict",
      help: [
        {
          label: "No es una suma",
          message: "$(2^3)^4$ son cuatro grupos de $2^3$: $3 + 3 + 3 + 3 = 12$ factores.",
        },
      ],
      title: "Potencia de una potencia",
      question: "¿A qué es igual $(2^3)^4$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2^{12}$" },
        { id: "b", label: "$2^7$", incorrectFeedback: "Se han sumado los exponentes; eso es para el producto, no para la potencia de una potencia." },
        { id: "c", label: "$2^{81}$", incorrectFeedback: "Se ha calculado $3^4$; el exponente se multiplica, no se eleva." },
        { id: "d", label: "$4^3$", incorrectFeedback: "La base sigue siendo $2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(2^3)^4 = 2^{3 \\cdot 4} = 2^{12}$.",
    },
    {
      id: "check-reducir",
      type: "fill_in_blank",
      help: [
        {
          label: "Mismo exponente",
          message: "Las bases $2$ y $5$ tienen el mismo exponente: agrúpalas en $(2 \\cdot 5)^{10}$.",
        },
      ],
      title: "Reduce a una potencia",
      question: "$2^{10} \\cdot 5^{10} = 10^n$. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$2^{10} \\cdot 5^{10} = (2 \\cdot 5)^{10} = 10^{10}$.",
    },
    {
      id: "check-dividir",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide las bases",
          message: "$15^3 : 5^3 = (15 : 5)^3$.",
        },
      ],
      title: "Cociente con el mismo exponente",
      question: "Calcula $15^3 : 5^3$ (solo el número)",
      correctAnswers: ["27"],
      explanation: "$15^3 : 5^3 = (15 : 5)^3 = 3^3 = 27$.",
    },
  ],
};
