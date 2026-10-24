import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const funcionesRacionales1bachLesson: InteractiveLesson = {
  slug: "funciones-racionales-1bach",
  title: "4. Funciones racionales",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inversa",
      type: "slide",
      help: [{ label: "Proporcionalidad inversa", message: "Con $k > 0$ la gráfica ocupa los cuadrantes I y III; con $k < 0$, el II y el IV. Cuanto mayor es $|k|$, más separadas están las ramas de los ejes." }],
      title: "y = k/x: la hipérbola",
      blocks: [
        { kind: "definition", text: "Una **función racional** es un cociente de polinomios $f(x) = \\dfrac{P(x)}{Q(x)}$. La más sencilla es la de **proporcionalidad inversa** $y = \\dfrac{k}{x}$." },
        { kind: "facts", items: [
          { tex: "\\text{Dom} f = \\mathbb{R} - \\{0\\}", label: "" },
          { tex: "x = 0", label: "asíntota vertical" },
          { tex: "y = 0", label: "asíntota horizontal" },
        ] },
      ],
      visual: { kind: "anim", scene: "hiperbola-asintotas", params: { a: 4 } },
    },
    {
      id: "trasladada",
      type: "slide",
      help: [{ label: "Qué es una asíntota", message: "Una asíntota es una recta a la que la gráfica se acerca tanto como se quiera sin llegar a tocarla (en la vertical, la función se dispara; en la horizontal, se estabiliza)." }],
      title: "Trasladar: y = k/(x − h) + v",
      blocks: [
        { kind: "rule", title: "Asíntotas de la hipérbola trasladada", formula: "f(x) = \\dfrac{k}{x - h} + v\\ \\Rightarrow\\ \\text{vertical } x = h,\\quad \\text{horizontal } y = v" },
        { kind: "text", text: "El centro de simetría es el punto $(h, v)$ donde se cruzan las asíntotas. El dominio es $\\mathbb{R} - \\{h\\}$ y el recorrido, $\\mathbb{R} - \\{v\\}$." },
      ],
      visual: { kind: "tool", tool: "hiperbola-explorador", initial: [2, 1, -1], hint: "Mueve h y v: las asíntotas se trasladan con la curva. Con k negativo, las ramas pasan a los otros cuadrantes." },
    },
    {
      id: "division",
      type: "slide",
      help: [{ label: "División de polinomios", message: "$2x + 1 = 2(x - 1) + 3$, así que $\\frac{2x+1}{x-1} = 2 + \\frac{3}{x-1}$. La parte entera da la asíntota horizontal y el denominador, la vertical." }],
      title: "Reconocer la hipérbola en (ax + b)/(cx + d)",
      blocks: [
        { kind: "text", text: "Una función $\\dfrac{ax + b}{cx + d}$ (con $c \\neq 0$) es una hipérbola trasladada. Al **dividir** numerador entre denominador sale la forma $\\dfrac{k}{x - h} + v$." },
        { kind: "example", title: "(2x + 1)/(x − 1)", lines: [
          { math: "\\dfrac{2x + 1}{x - 1} = 2 + \\dfrac{3}{x - 1}" },
          { math: "\\text{Asíntota vertical } x = 1;\\quad \\text{horizontal } y = 2" },
        ] },
        { kind: "rule", title: "Atajo", text: "Asíntota vertical: $x = -\\dfrac{d}{c}$. Asíntota horizontal: $y = \\dfrac{a}{c}$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-horizontal",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$y = \\frac{a}{c}$ con $a = 4$ y $c = 2$." }],
      title: "Asíntota horizontal",
      question: "¿Cuál es la asíntota horizontal $y = ?$ de $f(x) = \\dfrac{4x - 3}{2x + 5}$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$y = \\frac{a}{c} = \\frac{4}{2} = 2$. (La vertical es $x = -\\frac{5}{2}$.)",
    },
    {
      id: "check-vertical",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La asíntota vertical está donde se anula el denominador." }],
      title: "Asíntota vertical",
      question: "¿Cuál es la asíntota vertical de $f(x) = \\dfrac{1}{x + 3}$?",
      choices: [
        { id: "a", label: "$x = -3$" },
        { id: "b", label: "$x = 3$", incorrectFeedback: "$x + 3 = 0$ cuando $x = -3$, no $3$." },
        { id: "c", label: "$y = -3$", incorrectFeedback: "Una asíntota vertical es de la forma $x = c$, no $y = c$." },
        { id: "d", label: "No tiene", incorrectFeedback: "El denominador se anula en $x = -3$ y el numerador no: hay asíntota vertical." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El denominador se anula en $x = -3$ y el numerador no: cerca de ese valor la función se dispara. Asíntota vertical: $x = -3$.",
    },
    {
      id: "check-dominio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El dominio es $\\mathbb{R}$ menos el valor de la asíntota vertical; el recorrido, $\\mathbb{R}$ menos el de la horizontal." }],
      title: "Recorrido de una hipérbola",
      question: "El recorrido de $f(x) = \\dfrac{3}{x - 1} + 2$ es…",
      choices: [
        { id: "a", label: "$\\mathbb{R} - \\{2\\}$" },
        { id: "b", label: "$\\mathbb{R} - \\{1\\}$", incorrectFeedback: "Eso es el **dominio**. El recorrido excluye el valor de la asíntota horizontal." },
        { id: "c", label: "$\\mathbb{R}$", incorrectFeedback: "La función nunca vale $2$: $\\frac{3}{x - 1}$ nunca es $0$." },
        { id: "d", label: "$(2, +\\infty)$", incorrectFeedback: "Toma valores por encima y por debajo de $2$ (una rama en cada lado)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{3}{x - 1}$ puede valer cualquier número salvo $0$, luego $f$ toma todos los valores salvo $2$.",
    },
  ],
};
