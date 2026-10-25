import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const resolucionTriangulos1bachLesson: InteractiveLesson = {
  slug: "resolucion-triangulos-1bach",
  title: "12. Resolución general de triángulos",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "casos",
      type: "slide",
      help: [{ label: "Resolver", message: "Resolver un triángulo es hallar todos sus lados y ángulos a partir de tres datos (con al menos un lado)." }],
      title: "Cuatro casos según los datos",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\text{3 lados}", label: "teorema del coseno (ángulos)" },
          { tex: "\\text{2 lados y el ángulo entre ellos}", label: "teorema del coseno (3.er lado)" },
          { tex: "\\text{2 ángulos y 1 lado}", label: "teorema del seno (3.er ángulo por suma 180°)" },
          { tex: "\\text{2 lados y ángulo opuesto a uno}", label: "teorema del seno (caso ambiguo)" },
        ] },
        { kind: "text", text: "Después de hallar los tres lados y los tres ángulos, se puede calcular el **área** $\\dfrac{1}{2}\\,bc\\sin A$." },
      ],
      visual: { kind: "tool", tool: "triangulo-general-explorador", initial: [1, 5, 6, 7], hint: "Cambia de caso con el selector y comprueba que en cada uno la herramienta calcula los seis elementos y el área." },
    },
    {
      id: "check-caso",
      type: "classify",
      help: [{ label: "Pista", message: "Mira qué datos tienes: si el ángulo está entre los dos lados, coseno; si hay un lado y su ángulo opuesto, seno." }],
      title: "¿Qué teorema?",
      question: "Elige el teorema con el que se empieza a resolver cada triángulo.",
      groups: [
        { id: "cos", label: "Teorema del coseno", tone: "cobalt" },
        { id: "sen", label: "Teorema del seno", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$a = 5,\\ b = 6,\\ c = 7$", group: "cos" },
        { id: "b", text: "$b = 5,\\ c = 7,\\ A = 60^\\circ$", group: "cos" },
        { id: "c", text: "$A = 30^\\circ,\\ B = 45^\\circ,\\ a = 10$", group: "sen" },
        { id: "d", text: "$a = 7,\\ b = 10,\\ A = 30^\\circ$", group: "sen" },
        { id: "e", text: "$B = 50^\\circ,\\ C = 70^\\circ,\\ b = 8$", group: "sen" },
        { id: "f", text: "$a = 4,\\ c = 9,\\ B = 120^\\circ$", group: "cos" },
      ],
      hint: "Con los tres lados, o con dos lados y el ángulo que forman, no hay lado y ángulo opuesto enfrentados: se usa el coseno.",
    },
    {
      id: "area",
      type: "slide",
      help: [{ label: "Por qué", message: "La altura sobre el lado $b$ vale $c\\sin A$, así que el área es $\\frac{1}{2}\\cdot b\\cdot c\\sin A$." }],
      title: "Área de un triángulo",
      blocks: [
        { kind: "rule", title: "Con dos lados y el ángulo entre ellos", formula: "\\text{Área} = \\dfrac{1}{2}\\,b\\,c\\sin A" },
        { kind: "example", lines: [
          { math: "b = 6,\\ c = 7,\\ A = 30^\\circ:\\quad \\text{Área} = \\dfrac{1}{2}\\cdot 6\\cdot 7\\cdot\\dfrac{1}{2} = 10{,}5" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-area",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\frac{1}{2}\\cdot 8\\cdot 5\\cdot\\sin 30^\\circ$." }],
      title: "Un área",
      question: "Dos lados de un triángulo miden $8$ y $5$ y forman un ángulo de $30^\\circ$. ¿Cuál es su área? (con coma decimal)",
      correctAnswers: ["10"],
      explanation: "$\\frac{1}{2}\\cdot 8\\cdot 5\\cdot\\sin 30^\\circ = 20\\cdot\\frac{1}{2} = 10$.",
    },
    {
      id: "check-orden",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Los dos ángulos que se hallan primero con el teorema del seno sirven para el tercero por la suma de $180^\\circ$." }],
      title: "El orden importa",
      question: "En un triángulo con $A = 50^\\circ$, $B = 70^\\circ$ y $c = 12$, ¿qué conviene hacer **primero**?",
      choices: [
        { id: "a", label: "Calcular $C = 180^\\circ - 50^\\circ - 70^\\circ = 60^\\circ$ y después usar el teorema del seno con $c$ y $C$" },
        { id: "b", label: "Aplicar el teorema del coseno directamente", incorrectFeedback: "Falta un lado entre los datos: no se pueden aplicar las fórmulas del coseno aún." },
        { id: "c", label: "Aplicar Pitágoras", incorrectFeedback: "El triángulo no es rectángulo." },
        { id: "d", label: "Calcular el área", incorrectFeedback: "El área necesita antes otro lado o ángulos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con dos ángulos se obtiene el tercero ($60^\\circ$) y el lado dado ($c$) tiene ya su ángulo opuesto: se usa el seno para $a$ y $b$.",
    },
  ],
};
