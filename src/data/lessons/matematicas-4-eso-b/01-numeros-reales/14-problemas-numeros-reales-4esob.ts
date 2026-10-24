import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const problemasNumerosReales4esobLesson: InteractiveLesson = {
  slug: "problemas-numeros-reales-4esob",
  title: "14. Problemas con números reales",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "diagonal",
      type: "slide",
      help: [
        {
          label: "Diagonal de un rectángulo",
          message: "La diagonal $d$ de un rectángulo de lados $a$ y $b$ cumple $d^2 = a^2 + b^2$ (Pitágoras).",
        },
        {
          label: "Racional o irracional",
          message: "Después de calcular, simplifica el resultado: si la raíz es **exacta** el resultado es racional; si no, irracional.",
        },
      ],
      title: "Geometría: ¿el resultado es racional?",
      blocks: [
        {
          kind: "text",
          text: "Muchos números reales aparecen al **medir**: diagonales, áreas de círculos, longitudes con Pitágoras. Siempre se calcula y **después se clasifica**: ¿es una raíz exacta o no?",
        },
        {
          kind: "example",
          lines: [
            { math: "d = \\sqrt{1^2 + 1^2} = \\sqrt{2} \\quad \\text{irracional}" },
            { math: "d = \\sqrt{(\\sqrt{2})^2 + (\\sqrt{2})^2} = \\sqrt{4} = 2 \\quad \\text{racional}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "raiz-en-recta", params: { a: 8 } },
    },
    {
      id: "check-clasifica-geom",
      type: "classify",
      help: [
        {
          label: "Calcula cada medida",
          message: "$24^2 + 7^2 = 576 + 49 = 625 = 25^2$: el cateto que falta es $7$ (racional). El área de un círculo de radio $2$ es $\\pi \\cdot 2^2 = 4\\pi$ (irracional).",
        },
      ],
      title: "¿Racional o irracional?",
      question: "Calcula cada medida y clasifícala.",
      groups: [
        { id: "racional", label: "Racional", tone: "emerald" },
        { id: "irracional", label: "Irracional", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Diagonal de un cuadrado de lado $1$: $\\sqrt{2}$", group: "irracional" },
        { id: "b", text: "Diagonal de un cuadrado de lado $\\sqrt{2}$ cm", group: "racional" },
        { id: "c", text: "Área de un círculo de radio $2$ cm", group: "irracional" },
        { id: "d", text: "Cateto de un triángulo rectángulo con hipotenusa $25$ cm y otro cateto $24$ cm", group: "racional" },
        { id: "e", text: "Diagonal de un cuadrado de lado $\\sqrt{3}$", group: "irracional" },
      ],
      hint: "La diagonal de un cuadrado de lado $l$ es $l\\sqrt{2}$.",
    },
    {
      id: "check-cateto",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Pitágoras",
          message: "$c^2 = 25^2 - 24^2 = 625 - 576 = 49$.",
        },
      ],
      title: "El cateto que falta",
      question: "Un triángulo rectángulo tiene hipotenusa $25$ cm y un cateto de $24$ cm. ¿Cuánto mide el otro cateto? (solo el número, en cm)",
      correctAnswers: ["7"],
      explanation: "$c = \\sqrt{25^2 - 24^2} = \\sqrt{49} = 7$ cm. Es un número **racional**.",
    },
    {
      id: "reducir",
      type: "slide",
      help: [
        {
          label: "Todo a potencias",
          message: "Para combinar radicales distintos, pásalos a potencias de la misma base y suma o resta los exponentes.",
        },
        {
          label: "Ejemplo",
          message: "$5\\sqrt{5} = 5^1 \\cdot 5^{1/2} = 5^{3/2}$; $a^2 \\sqrt[4]{a^3} = a^2 \\cdot a^{3/4} = a^{11/4}$.",
        },
      ],
      title: "Reducir a una sola potencia",
      blocks: [
        {
          kind: "steps",
          title: "Para escribir como potencia única",
          items: [
            "Pasa cada radical a exponente fraccionario.",
            "Agrupa las potencias de la misma base.",
            "Suma (producto) o resta (cociente) los exponentes.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "5\\sqrt{5} = 5^{1} \\cdot 5^{1/2} = 5^{3/2}" },
            { math: "x \\cdot \\sqrt[4]{x^2} = x^{1} \\cdot x^{2/4} = x^{3/2}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["5", "·", "√5"], active: [0, 2], note: "pasamos el radical a potencia." },
            { tokens: ["5¹", "·", "5^(1/2)"], active: [0, 2], note: "misma base: se suman los exponentes." },
            { tokens: ["5^(1+1/2)"], active: [0, 0], note: "$1 + \\frac{1}{2} = \\frac{3}{2}$." },
            { tokens: ["5^(3/2)"], fresh: [0, 0], note: "potencia única." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-reducir",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma de exponentes",
          message: "$5\\sqrt{5} = 5^{1} \\cdot 5^{1/2} = 5^{3/2}$. El exponente es $\\frac{3}{2} = 1{,}5$.",
        },
      ],
      title: "El exponente",
      question: "Escribe $5\\sqrt{5}$ como $5^{k}$. ¿Cuánto vale $k$? (escribe el número con coma)",
      correctAnswers: ["1,5", "1.5", "3/2"],
      explanation: "$5\\sqrt{5} = 5^{1} \\cdot 5^{1/2} = 5^{3/2} = 5^{1{,}5}$.",
    },
    {
      id: "check-combinada",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Extrae factores",
          message: "$\\sqrt{12} = 2\\sqrt{3}$, $\\sqrt{48} = 4\\sqrt{3}$, $\\sqrt{27} = 3\\sqrt{3}$, $\\sqrt{75} = 5\\sqrt{3}$. Suma coeficientes: $2 + 4 - 3 - 5$.",
        },
      ],
      title: "Una suma de cuatro radicales",
      question: "$\\sqrt{12} + \\sqrt{48} - \\sqrt{27} - \\sqrt{75} = k\\sqrt{3}$. ¿Cuánto vale $k$? (escribe el número con su signo)",
      correctAnswers: ["-2", "−2"],
      explanation: "$2\\sqrt{3} + 4\\sqrt{3} - 3\\sqrt{3} - 5\\sqrt{3} = -2\\sqrt{3}$.",
    },
    {
      id: "check-mezcla",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Ordena cada paso",
          message: "Primero multiplica los radicales ($\\sqrt{2} \\cdot \\sqrt{8} = 4$), luego suma. $\\sqrt{2} \\cdot \\sqrt{8} + \\sqrt{50} = 4 + 5\\sqrt{2}$.",
        },
      ],
      title: "Un cálculo con varios radicales",
      question: "Calcula $\\sqrt{2} \\cdot \\sqrt{8} + \\sqrt{50}$ y simplifica.",
      choices: [
        { id: "a", label: "$4 + 5\\sqrt{2}$" },
        { id: "b", label: "$9\\sqrt{2}$", incorrectFeedback: "$4$ y $5\\sqrt{2}$ no son términos semejantes: uno es entero y el otro lleva radical." },
        { id: "c", label: "$\\sqrt{66}$", incorrectFeedback: "No se pueden sumar los radicandos. Hay que multiplicar primero y extraer factores." },
        { id: "d", label: "$9 + \\sqrt{2}$", incorrectFeedback: "$\\sqrt{50} = 5\\sqrt{2}$, no $5 + \\sqrt{2}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$ y $\\sqrt{50} = 5\\sqrt{2}$. Resultado: $4 + 5\\sqrt{2}$.",
    },
  ],
};
