import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const sumaProgresionAritmetica3esoLesson: InteractiveLesson = {
  slug: "suma-progresion-aritmetica-3eso",
  title: "3. Suma de los términos de una progresión aritmética",
  subtitle: TEMA_3ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "gauss",
      type: "slide",
      help: [
        {
          label: "La idea",
          message: "Al escribir la suma al revés y colocarla debajo, cada pareja de números suma lo mismo.",
        },
        {
          label: "Por qué dividir entre 2",
          message: "Sumar las dos filas cuenta la suma dos veces, así que al final se divide entre $2$.",
        },
      ],
      title: "Sumar de dos en dos: el truco de Gauss",
      blocks: [
        {
          kind: "text",
          text: "Los números naturales forman una progresión aritmética de $d = 1$. Para sumar $1 + 2 + \\dots + 10$ se escribe la suma **dos veces**, una al revés.",
        },
        {
          kind: "rule",
          title: "Propiedad clave",
          text: "En una progresión aritmética de $n$ términos, los términos **equidistantes de los extremos suman lo mismo**.",
        },
      ],
      visual: { kind: "anim", scene: "suma-gauss", params: { a: 10 } },
    },
    {
      id: "formula",
      type: "slide",
      help: [
        {
          label: "Extremos",
          message: "Solo necesitas el primer término, el último y cuántos términos hay.",
        },
        {
          label: "Si no tienes a_n",
          message: "Primero calcula $a_n = a_1 + (n-1)d$ y luego aplica la fórmula.",
        },
      ],
      title: "Fórmula de la suma",
      blocks: [
        {
          kind: "rule",
          text: "La suma de los $n$ primeros términos de una progresión aritmética es:",
          formula: "S_n = \\dfrac{(a_1 + a_n) \\cdot n}{2}",
        },
        {
          kind: "example",
          title: "Suma de los números pares menores que 100",
          lines: [
            { math: "2 + 4 + 6 + \\dots + 98:\\quad a_1 = 2,\\ a_n = 98,\\ n = 49" },
            { math: "S_{49} = \\dfrac{(2 + 98) \\cdot 49}{2} = 2\\,450" },
          ],
        },
        {
          kind: "example",
          title: "Con término general a_n = 7n − 4, treinta términos",
          lines: [
            { math: "a_1 = 3,\\quad a_{30} = 7 \\cdot 30 - 4 = 206" },
            { math: "S_{30} = \\dfrac{(3 + 206) \\cdot 30}{2} = 3\\,135" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-gauss",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Extremos",
          message: "$a_1 = 1$, $a_n = 100$ y hay $100$ términos.",
        },
      ],
      title: "La suma clásica",
      question: "Calcula $1 + 2 + 3 + \\dots + 100$ (solo el número).",
      correctAnswers: ["5050"],
      explanation: "$S_{100} = \\frac{(1 + 100) \\cdot 100}{2} = 5\\,050$.",
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Último término",
          message: "$a_{20} = 2 \\cdot 20 - 7 = 33$ y $a_1 = 2 \\cdot 1 - 7 = -5$.",
        },
      ],
      title: "Suma con término general",
      question: "Calcula la suma de los veinte primeros términos de la progresión $a_n = 2n - 7$ (solo el número).",
      correctAnswers: ["280"],
      explanation: "$a_1 = -5$, $a_{20} = 33$ y $S_{20} = \\frac{(-5 + 33) \\cdot 20}{2} = 280$.",
    },
    {
      id: "check-tratamiento",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Una progresión",
          message: "La dosis baja $5$ mg cada día: $d = -5$. El último día es el duodécimo.",
        },
      ],
      title: "Tratamiento médico",
      question: "Un medicamento se toma $100$ mg el primer día y $5$ mg menos cada día siguiente, durante $12$ días. ¿Cuántos miligramos se toman en total? (solo el número)",
      correctAnswers: ["870"],
      explanation: "$a_{12} = 100 + 11 \\cdot (-5) = 45$ y $S_{12} = \\frac{(100 + 45) \\cdot 12}{2} = 870$ mg.",
    },
    {
      id: "check-intermedios",
      type: "predict",
      help: [
        {
          label: "Mismo número de términos",
          message: "Si hay $n$ términos, la suma de la mitad izquierda y la de la mitad derecha de la lista aportan igual por pareja.",
        },
      ],
      title: "Términos equidistantes",
      question: "En la progresión $3, 7, 11, 15, 19, 23, 27, 31$, ¿cuánto suman los términos equidistantes de los extremos, como el $7$ y el $27$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$34$, igual que $3 + 31$" },
        { id: "b", label: "$30$", incorrectFeedback: "Suma $7 + 27$: da $34$." },
        { id: "c", label: "Depende de la pareja", incorrectFeedback: "Todas las parejas equidistantes de los extremos suman lo mismo; es la propiedad que permite la fórmula." },
      ],
      correctChoiceId: "a",
      explanation: "$3 + 31 = 7 + 27 = 11 + 23 = 15 + 19 = 34$.",
    },
  ],
};
