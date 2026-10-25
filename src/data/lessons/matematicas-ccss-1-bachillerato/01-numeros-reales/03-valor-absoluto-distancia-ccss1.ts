import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_1_SUBTITLE } from "@/data/lessons/shared";

export const valorAbsolutoDistanciaCcss1Lesson: InteractiveLesson = {
  slug: "valor-absoluto-distancia-ccss1",
  title: "3. Valor absoluto y distancia",
  subtitle: TEMA_CCSS1_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        { label: "¿Es lo mismo que quitar el signo?", message: "Para un número concreto sí. Pero con una letra, $|x|$ no es «x sin signo»: si $x = -3$, $|x| = 3 = -x$. Por eso se define por casos." },
      ],
      title: "Valor absoluto: la distancia al cero",
      blocks: [
        { kind: "rule", title: "Definición por casos", formula: "|x| = \\begin{cases} x & \\text{si } x \\geq 0 \\\\ -x & \\text{si } x < 0 \\end{cases}" },
        { kind: "text", text: "Mide **cuánto se aleja** un número del cero, sin importar el lado. Por eso $|32| = |{-32}| = 32$. La gráfica de $f(x) = |x|$ tiene forma de «V»: es la recta $y = x$ con la parte negativa reflejada hacia arriba." },
      ],
      visual: { kind: "anim", scene: "valor-absoluto", params: { a: -7, b: 4 } },
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        { label: "Para qué sirve", message: "Los números negativos son una herramienta del cálculo. Una distancia, una longitud o una cantidad de objetos nunca es negativa: ahí aparece el valor absoluto." },
      ],
      title: "Propiedades del valor absoluto",
      blocks: [
        { kind: "facts", items: [
          { tex: "|a| \\geq 0", label: "no negatividad" },
          { tex: "|{-a}| = |a|", label: "simetría" },
          { tex: "|a| = 0 \\iff a = 0", label: "solo el cero vale cero" },
          { tex: "|a \\cdot b| = |a|\\cdot|b|", label: "producto" },
          { tex: "|a + b| \\leq |a| + |b|", label: "desigualdad triangular" },
        ] },
        { kind: "example", title: "Desigualdad triangular", lines: [
          { math: "a = 3,\\ b = -5:\\quad |a + b| = |-2| = 2" },
          { math: "|a| + |b| = 3 + 5 = 8 \\quad\\Rightarrow\\quad 2 \\leq 8" },
        ] },
        { kind: "warning", text: "En general $|a + b| \\neq |a| + |b|$: solo coinciden cuando $a$ y $b$ tienen el mismo signo." },
      ],
    },
    {
      id: "check-calculo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Calcula cada valor absoluto antes de sumar y restar." }],
      title: "Combinar valores absolutos",
      question: "Calcula $|{-7}| + |3| - |{-2}|$. (solo el número)",
      correctAnswers: ["8"],
      explanation: "$|{-7}| = 7$, $|3| = 3$ y $|{-2}| = 2$, así que $7 + 3 - 2 = 8$.",
    },
    {
      id: "distancia",
      type: "slide",
      help: [
        { label: "Por qué vale en cualquier orden", message: "$|x - y| = |y - x|$: la distancia de $x$ a $y$ es la misma que de $y$ a $x$ (simetría)." },
      ],
      title: "Distancia entre dos números",
      blocks: [
        { kind: "rule", title: "Distancia en la recta real", formula: "d(x, y) = |x - y|" },
        { kind: "example", lines: [
          { math: "d(3, 8) = |8 - 3| = 5" },
          { math: "d(-9, 5) = |5 - (-9)| = |14| = 14" },
          { math: "d(-1, 5) = |5 - (-1)| = 6" },
        ] },
        { kind: "text", text: "La segunda es la de un edificio: del sótano $-9$ a la planta $5$ se suben **14 pisos**. La tercera, un termómetro que pasa de $-1\\,°\\text{C}$ a $5\\,°\\text{C}$: sube $6$ grados." },
      ],
      arrange: "stack",
    },
    {
      id: "check-distancia",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Resta en cualquier orden y toma el valor absoluto." }],
      title: "Distancia con decimales",
      question: "¿Cuál es la distancia entre $-2{,}3$ y $4{,}5$?",
      choices: [
        { id: "a", label: "$6{,}8$" },
        { id: "b", label: "$2{,}2$", incorrectFeedback: "Has restado $4{,}5 - 2{,}3$, olvidando que $-2{,}3$ está al otro lado del cero." },
        { id: "c", label: "$-6{,}8$", incorrectFeedback: "Una distancia nunca es negativa: es un valor absoluto." },
        { id: "d", label: "$2{,}3$", incorrectFeedback: "Eso es la distancia de $-2{,}3$ al cero, no a $4{,}5$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$d(-2{,}3;\\ 4{,}5) = |4{,}5 - (-2{,}3)| = |6{,}8| = 6{,}8$.",
    },
    {
      id: "ecuacion",
      type: "slide",
      help: [
        { label: "Dos soluciones", message: "Hay dos puntos a una distancia dada de $3$: uno a la derecha y otro a la izquierda. Solo cuando la distancia es $0$ queda una." },
      ],
      title: "|x − 3| = 2: leer la distancia",
      blocks: [
        { kind: "text", text: "$|x - 3|$ es la distancia de $x$ a $3$. La ecuación $|x - 3| = 2$ pregunta: **¿qué números están a distancia 2 de 3?**" },
        { kind: "steps", title: "Se resuelve por casos", items: [
          "$x - 3 = 2 \\Rightarrow x = 5$ (dos unidades a la derecha).",
          "$x - 3 = -2 \\Rightarrow x = 1$ (dos unidades a la izquierda).",
        ] },
        { kind: "warning", text: "$|x| = -4$ no tiene solución: un valor absoluto nunca es negativo." },
      ],
      arrange: "stack",
    },
    {
      id: "check-ecuacion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Los dos números están a distancia 3 de 4: uno a la derecha y otro a la izquierda." }],
      title: "Suma de las soluciones",
      question: "La ecuación $|x - 4| = 3$ tiene dos soluciones. ¿Cuánto suman? (solo el número)",
      correctAnswers: ["8"],
      explanation: "$x - 4 = 3 \\Rightarrow x = 7$ y $x - 4 = -3 \\Rightarrow x = 1$. Suman $7 + 1 = 8$.",
    },
  ],
};
