import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const hiperbola1bachLesson: InteractiveLesson = {
  slug: "hiperbola-1bach",
  title: "11. La hipérbola",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Dos ramas", message: "Como la diferencia de distancias puede ser $+2a$ o $-2a$ según de qué foco esté más cerca el punto, la curva tiene dos ramas, una alrededor de cada foco." }],
      title: "Diferencia de distancias constante",
      blocks: [
        { kind: "definition", text: "La **hipérbola** es el lugar geométrico de los puntos cuya **diferencia de distancias a dos focos** es constante en valor absoluto e igual a $2a$ (con $2a < $ distancia entre los focos)." },
      ],
      visual: { kind: "anim", scene: "conica-lugar", params: { conica: "hiperbola" } },
    },
    {
      id: "ecuacion",
      type: "slide",
      help: [{ label: "Asíntotas", message: "Las ramas se acercan cada vez más a dos rectas que pasan por el centro sin llegar a tocarlas: las asíntotas. Son las diagonales del rectángulo de lados $2a$ y $2b$." }],
      title: "Ecuación reducida, focos y asíntotas",
      blocks: [
        { kind: "rule", title: "Centro en el origen", formula: "\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1\\qquad c^2 = a^2 + b^2\\qquad F(\\pm c, 0)\\qquad e = \\dfrac{c}{a} > 1\\qquad y = \\pm\\dfrac{b}{a}\\,x" },
        { kind: "example", title: "x²/9 − y²/16 = 1", lines: [
          { math: "a = 3,\\ b = 4,\\ c = \\sqrt{9 + 16} = 5\\Rightarrow F(\\pm 5, 0),\\ e = \\tfrac{5}{3}" },
          { math: "\\text{Asíntotas: } y = \\pm\\tfrac{4}{3}x" },
        ] },
      ],
      visual: { kind: "tool", tool: "conica-explorador", initial: [2, 3, 4, 0, 0], hint: "Sube b: las asíntotas se abren y la hipérbola se hace más «ancha». Compara con la elipse: aquí c² = a² + b²." },
    },
    {
      id: "check-c",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$c^2 = a^2 + b^2 = 16 + 9$." }],
      title: "Distancia focal",
      question: "En la hipérbola $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$, ¿cuánto vale $c$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$c = \\sqrt{16 + 9} = 5$ (en la elipse se **restaba**; aquí se **suma**).",
    },
    {
      id: "check-asintota",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La pendiente de las asíntotas es $\\pm\\frac{b}{a}$." }],
      title: "Asíntotas",
      question: "¿Cuáles son las asíntotas de $\\dfrac{x^2}{9} - \\dfrac{y^2}{16} = 1$?",
      choices: [
        { id: "a", label: "$y = \\pm\\dfrac{4}{3}x$" },
        { id: "b", label: "$y = \\pm\\dfrac{3}{4}x$", incorrectFeedback: "Has invertido la pendiente: es $\\frac{b}{a} = \\frac{4}{3}$, no $\\frac{a}{b}$." },
        { id: "c", label: "$y = \\pm 4x$", incorrectFeedback: "La pendiente es $\\frac{b}{a} = \\frac{4}{3}$, no $b$." },
        { id: "d", label: "$y = \\pm\\dfrac{16}{9}x$", incorrectFeedback: "$\\frac{16}{9}$ es $\\frac{b^2}{a^2}$; la pendiente es $\\frac{b}{a}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$a = 3$ y $b = 4$, así que las asíntotas son $y = \\pm\\frac{b}{a}x = \\pm\\frac{4}{3}x$.",
    },
    {
      id: "equilatera",
      type: "slide",
      help: [{ label: "Girada", message: "$x^2 - y^2 = a^2$ es una hipérbola equilátera ($a = b$) con asíntotas $y = \\pm x$. Al girarla $45^\\circ$ queda $xy = k$, con los ejes como asíntotas." }],
      title: "La hipérbola equilátera: xy = k",
      blocks: [
        { kind: "text", text: "Cuando $a = b$ las asíntotas son **perpendiculares**: la hipérbola es **equilátera**. Su excentricidad es $e = \\frac{c}{a} = \\sqrt{2}$." },
        { kind: "text", text: "Si se toman como ejes las propias asíntotas, la ecuación es $x\\,y = k$, o $y = \\dfrac{k}{x}$: la **proporcionalidad inversa** que ya conoces." },
      ],
      visual: { kind: "tool", tool: "hiperbola-explorador", initial: [4, 0, 0], hint: "Sube k: las ramas se alejan de los ejes, que son las asíntotas." },
    },
    {
      id: "check-equilatera",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $a = b$: $c = \\sqrt{2}a$, luego $e = \\frac{c}{a} = \\sqrt{2}$." }],
      title: "Excentricidad de la equilátera",
      question: "¿Cuánto vale, redondeada a **dos decimales**, la excentricidad de una hipérbola equilátera? (con coma decimal)",
      correctAnswers: ["1,41", "1.41"],
      explanation: "$e = \\sqrt{2} \\approx 1{,}41$.",
    },
  ],
};
