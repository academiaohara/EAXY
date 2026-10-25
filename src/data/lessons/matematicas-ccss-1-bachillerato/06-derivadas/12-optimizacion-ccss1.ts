import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_6_SUBTITLE } from "@/data/lessons/shared";

export const optimizacionCcss1Lesson: InteractiveLesson = {
  slug: "optimizacion-ccss1",
  title: "12. Problemas de optimización",
  subtitle: TEMA_CCSS1_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Lo importante", message: "El paso más difícil es el primero: escribir lo que se quiere optimizar como función de **una sola variable** usando la condición del enunciado." }],
      title: "Método",
      blocks: [
        { kind: "steps", items: [
          "Se elige la **variable** y se escribe la **función a optimizar** usando las condiciones del enunciado.",
          "Se determina el **dominio** con las restricciones del problema.",
          "Se **deriva** y se resuelve $f'(x) = 0$.",
          "Se **comprueba** (criterio de $f''$ o signo de $f'$) y se **comparan** los candidatos con los **extremos del dominio**.",
        ] },
        { kind: "example", title: "Ventana de 1 m² con perfil mínimo", lines: [
          { math: "xy = 1\\ \\Rightarrow\\ y = \\dfrac{1}{x}\\qquad P(x) = 2x + \\dfrac{2}{x}" },
          { math: "P'(x) = 2 - \\dfrac{2}{x^2} = 0\\ \\Rightarrow\\ x = 1\\ (x > 0)" },
          { math: "P''(x) = \\dfrac{4}{x^3}\\ \\Rightarrow\\ P''(1) = 4 > 0:\\ \\text{mínimo};\\quad P(1) = 4\\ \\text{m (un cuadrado)}" },
        ] },
      ],
      visual: { kind: "tool", tool: "optimizacion-explorador", initial: [0, 40], hint: "Mueve x y mira el perímetro: la derivada se anula en el mínimo, en x = 1." },
    },
    {
      id: "check-max-area",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$A(x) = x(10 - x)$ y $A'(x) = 10 - 2x$." }],
      title: "Rectángulo de área máxima",
      question: "Un rectángulo tiene $20$ m de perímetro. ¿Cuál es el área máxima, en m²? (solo el número)",
      correctAnswers: ["25"],
      explanation: "Base $x$ y altura $10 - x$: $A = 10x - x^2$, $A' = 10 - 2x = 0 \\Rightarrow x = 5$ y $A = 25$ m² (un cuadrado de lado $5$).",
    },
    {
      id: "luz-maxima",
      type: "slide",
      help: [{ label: "Dominio", message: "La parábola $A(x) = 7x - x^2$ tiene su máximo en $x = 3{,}5$. Pero una altura $y = 7 - 3{,}5 = 3{,}5$ m no cabe en una pared de $2{,}5$ m." }],
      title: "Cuando el dominio manda",
      blocks: [
        { kind: "text", text: "Se quieren ventanas rectangulares con $14$ m de perfil ($2x + 2y = 14$, luego $y = 7 - x$) y la **máxima luz** $A(x) = 7x - x^2$." },
        { kind: "text", text: "Sin restricciones: $A'(x) = 7 - 2x = 0 \\Rightarrow x = 3{,}5$ y $A = 12{,}25$ m². Pero la pared mide $2{,}5\\times 5$ m: $y \\leq 2{,}5$ obliga a $x \\geq 4{,}5$, y $x \\leq 5$. En $[4{,}5;\\ 5]$ la función **decrece**, así que el máximo está en un **extremo**: $x = 4{,}5$, $A = 11{,}25$ m²." },
      ],
      visual: { kind: "tool", tool: "optimizacion-explorador", initial: [2, 50], hint: "Con la restricción de la pared el dominio es [4,5; 5] y la derivada se anula fuera de él: el máximo está en x = 4,5." },
    },
    {
      id: "check-extremo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$A'(x) = 7 - 2x < 0$ para $x > 3{,}5$: en $[4{,}5;\\ 5]$ la función decrece." }],
      title: "¿Dónde está el máximo?",
      question: "En el dominio $[4{,}5;\\ 5]$, ¿en qué punto es máxima la luz $A(x) = 7x - x^2$?",
      choices: [
        { id: "a", label: "En $x = 4{,}5$, el extremo izquierdo del dominio" },
        { id: "b", label: "En $x = 3{,}5$, donde se anula la derivada", incorrectFeedback: "$3{,}5$ no pertenece al dominio $[4{,}5;\\ 5]$." },
        { id: "c", label: "En $x = 5$, el extremo derecho", incorrectFeedback: "$A(5) = 10 < A(4{,}5) = 11{,}25$: la función decrece." },
        { id: "d", label: "En el punto medio $x = 4{,}75$", incorrectFeedback: "$A(4{,}75) \\approx 10{,}69 < 11{,}25$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con un dominio restringido hay que comparar los extremos: $A(4{,}5) = 11{,}25$ y $A(5) = 10$.",
    },
    {
      id: "cilindro",
      type: "slide",
      help: [{ label: "Dos variables", message: "El volumen fijo permite despejar $h$ en función de $r$ y dejar la superficie en función de una sola variable." }],
      title: "Depósito cilíndrico de 4 m³ con chapa mínima",
      blocks: [
        { kind: "example", title: "Superficie en función de r", lines: [
          { math: "V = \\pi r^2 h = 4\\ \\Rightarrow\\ h = \\dfrac{4}{\\pi r^2}" },
          { math: "S = 2\\pi r h + 2\\pi r^2 = \\dfrac{8}{r} + 2\\pi r^2" },
          { math: "S'(r) = -\\dfrac{8}{r^2} + 4\\pi r = 0\\ \\Rightarrow\\ r^3 = \\dfrac{2}{\\pi}\\ \\Rightarrow\\ r = \\sqrt[3]{2/\\pi} \\approx 0{,}86\\ \\text{m}" },
          { math: "S''(r) = \\dfrac{16}{r^3} + 4\\pi > 0\\ \\Rightarrow\\ \\text{mínimo};\\quad h = 2r \\approx 1{,}72\\ \\text{m}" },
        ] },
      ],
      visual: { kind: "tool", tool: "optimizacion-explorador", initial: [3, 40], hint: "Con r = 0,86 m la superficie es mínima (≈ 13,95 m²) y la altura resulta el doble del radio." },
    },
    {
      id: "check-cilindro",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$S''(r) = \\dfrac{16}{r^3} + 4\\pi$ es positiva para todo $r > 0$." }],
      title: "Comprobar el tipo de punto crítico",
      question: "En el depósito, $S''(r) = \\dfrac{16}{r^3} + 4\\pi > 0$ en el punto crítico. Eso indica que es…",
      choices: [
        { id: "a", label: "un mínimo: la chapa empleada es la menor posible" },
        { id: "b", label: "un máximo: la chapa empleada es la mayor posible", incorrectFeedback: "$f'' > 0$ indica un mínimo; un máximo exigiría $f'' < 0$." },
        { id: "c", label: "un punto de inflexión", incorrectFeedback: "Un punto de inflexión de tangente horizontal exige $f'' = 0$." },
        { id: "d", label: "no se puede saber", incorrectFeedback: "El signo de la segunda derivada decide." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con $f'(a) = 0$ y $f''(a) > 0$ hay un **mínimo**: justo lo que se buscaba.",
    },
  ],
};
