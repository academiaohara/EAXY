import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const raices3esoLesson: InteractiveLesson = {
  slug: "raices-3eso",
  title: "3. Las raíces",
  subtitle: TEMA_3ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "raiz-inversa",
      type: "slide",
      help: [
        {
          label: "Operación inversa",
          message: "Si $5^2 = 25$, entonces $\\sqrt{25} = 5$: la raíz deshace la potencia.",
        },
        {
          label: "Dos números, un símbolo",
          message: "$(-5)^2$ también es $25$. Pero el símbolo $\\sqrt{25}$ se reserva para la raíz **positiva**.",
        },
      ],
      title: "La raíz es la operación inversa de la potencia",
      blocks: [
        {
          kind: "definition",
          text: "Si $a = b^n$, entonces la **raíz** $n$-ésima de $a$ es $b$: $\\sqrt[n]{a} = b$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\sqrt{25} = 5 \\ \\text{porque}\\ 5^2 = 25" },
            { tex: "\\sqrt[3]{8} = 2 \\ \\text{porque}\\ 2^3 = 8" },
            { tex: "\\sqrt[4]{10\\,000} = 10 \\ \\text{porque}\\ 10^4 = 10\\,000" },
            { tex: "\\sqrt[5]{32} = 2 \\ \\text{porque}\\ 2^5 = 32" },
          ],
        },
        {
          kind: "warning",
          text: "$9$ tiene **dos** raíces cuadradas, $3$ y $-3$, pero el símbolo $\\sqrt{9}$ designa solo la positiva: $\\sqrt{9} = 3$. Las raíces cuadradas de números negativos no existen.",
        },
      ],
      visual: { kind: "anim", scene: "raiz-cuadrado", params: { a: 5 } },
    },
    {
      id: "exactas",
      type: "slide",
      help: [
        {
          label: "Factoriza",
          message: "Si $N$ es un cuadrado perfecto, todos los exponentes de su descomposición en primos son pares.",
        },
        {
          label: "Ejemplo",
          message: "$4\\,356 = 2^2 \\cdot 3^2 \\cdot 11^2 = (2 \\cdot 3 \\cdot 11)^2 = 66^2$.",
        },
      ],
      title: "Calcular raíces exactas",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Descompón** el radicando en factores primos.",
            "Agrupa los factores según el **índice** de la raíz.",
            "La raíz es el producto de los factores de cada grupo, una vez.",
          ],
        },
        {
          kind: "example",
          title: "√4 356",
          lines: [
            { math: "4\\,356 = 2^2 \\cdot 3^2 \\cdot 11^2 = (2 \\cdot 3 \\cdot 11)^2 = 66^2" },
            { math: "\\sqrt{4\\,356} = 66" },
          ],
        },
        {
          kind: "example",
          title: "Con fracciones",
          lines: [
            { math: "\\sqrt{\\dfrac{49}{16}} = \\dfrac{7}{4}", note: "porque $\\left(\\frac{7}{4}\\right)^2 = \\frac{49}{16}$" },
            { math: "\\sqrt[3]{\\dfrac{1}{64}} = \\dfrac{1}{4}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "raiz-entera",
      type: "slide",
      help: [
        {
          label: "Entre dos cuadrados",
          message: "$36 < 40 < 49$, así que $6 < \\sqrt{40} < 7$.",
        },
        {
          label: "Resto",
          message: "El resto de la raíz es lo que sobra: $40 - 6^2 = 4$.",
        },
      ],
      title: "Cuando la raíz no es exacta: la raíz entera",
      blocks: [
        {
          kind: "text",
          text: "La mayoría de números **no son cuadrados perfectos**. Su raíz no es un número natural.",
        },
        {
          kind: "rule",
          title: "Raíz entera",
          text: "Es el mayor número natural cuyo cuadrado no supera al radicando.",
          formula: "6^2 = 36 \\le 40 < 49 = 7^2 \\ \\Rightarrow\\  \\text{raíz entera de } 40 = 6",
        },
        {
          kind: "text",
          text: "Con calculadora, $\\sqrt{40} = 6{,}32455\\dots$ es un número con infinitas cifras decimales sin periodo, es decir, **no es racional**.",
        },
      ],
      visual: { kind: "anim", scene: "raiz-entre-cuadrados", params: { a: 40 } },
    },
    {
      id: "check-exacta",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Busca la base",
          message: "¿Qué número multiplicado por sí mismo tres veces da $343$? Prueba con $7$.",
        },
      ],
      title: "Raíz cúbica",
      question: "Calcula $\\sqrt[3]{343}$ (solo el número)",
      correctAnswers: ["7"],
      explanation: "$7^3 = 343$.",
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Raíz de cada término",
          message: "La raíz de una fracción es la fracción de las raíces: $\\sqrt{25} = 5$ y $\\sqrt{36} = 6$.",
        },
      ],
      title: "Raíz de una fracción",
      question: "Calcula $\\sqrt{\\dfrac{25}{36}}$.",
      correctAnswers: ["5/6"],
      explanation: "$\\sqrt{\\frac{25}{36}} = \\frac{\\sqrt{25}}{\\sqrt{36}} = \\frac{5}{6}$.",
    },
    {
      id: "check-factorizar",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Descompón",
          message: "$900 = 2^2 \\cdot 3^2 \\cdot 5^2$.",
        },
      ],
      title: "Raíz por factorización",
      question: "Calcula $\\sqrt{900}$ descomponiendo en factores primos (solo el número).",
      correctAnswers: ["30"],
      explanation: "$900 = 2^2 \\cdot 3^2 \\cdot 5^2 = (2 \\cdot 3 \\cdot 5)^2 = 30^2$.",
    },
    {
      id: "check-entera",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Entre dos cuadrados",
          message: "$8^2 = 64$ y $9^2 = 81$. ¿Dónde cae $75$?",
        },
      ],
      title: "Raíz entera",
      question: "¿Cuál es la raíz entera de $75$? (solo el número)",
      correctAnswers: ["8"],
      explanation: "$8^2 = 64 \\le 75 < 81 = 9^2$, así que la raíz entera de $75$ es $8$.",
    },
  ],
};
