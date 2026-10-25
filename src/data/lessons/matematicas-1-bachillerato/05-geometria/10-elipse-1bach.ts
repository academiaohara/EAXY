import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const elipse1bachLesson: InteractiveLesson = {
  slug: "elipse-1bach",
  title: "10. La elipse",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "El jardinero", message: "Para trazar una elipse en el suelo se clavan dos estacas (los focos), se ata una cuerda de longitud $2a$ y se mueve un palo manteniendo la cuerda tensa: la suma de distancias a los focos es constante." }],
      title: "Suma de distancias constante",
      blocks: [
        { kind: "definition", text: "La **elipse** es el lugar geométrico de los puntos cuya **suma de distancias a dos puntos fijos** (los **focos** $F$ y $F'$) es constante e igual a $2a$." },
        { kind: "text", text: "Si $F$ y $F'$ coinciden, la elipse es una circunferencia. Cuanto más separados están los focos, más «aplastada» es." },
      ],
      visual: { kind: "anim", scene: "conica-lugar", params: { conica: "elipse" } },
    },
    {
      id: "ecuacion",
      type: "slide",
      help: [{ label: "Excentricidad", message: "$e = \\frac{c}{a}$ mide lo aplastada que es: $e = 0$ es una circunferencia y cuanto más cerca de $1$, más alargada." }],
      title: "Ecuación reducida, focos y excentricidad",
      blocks: [
        { kind: "rule", title: "Centro en el origen, semiejes a ≥ b", formula: "\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1\\qquad c^2 = a^2 - b^2\\qquad F(\\pm c, 0)\\qquad e = \\dfrac{c}{a} < 1" },
        { kind: "example", title: "x²/25 + y²/9 = 1", lines: [
          { math: "a = 5,\\ b = 3,\\ c = \\sqrt{25 - 9} = 4\\Rightarrow F(\\pm 4, 0)" },
          { math: "e = \\dfrac{4}{5} = 0{,}8" },
        ] },
      ],
      visual: { kind: "tool", tool: "conica-explorador", initial: [1, 5, 3, 0, 0], hint: "Acerca b a a: los focos se juntan en el centro y la elipse se acerca a una circunferencia (e → 0)." },
    },
    {
      id: "check-c",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$c^2 = a^2 - b^2 = 169 - 144$." }],
      title: "Distancia focal",
      question: "En la elipse $\\dfrac{x^2}{169} + \\dfrac{y^2}{144} = 1$, ¿cuánto vale $c$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$a = 13$, $b = 12$ y $c = \\sqrt{169 - 144} = \\sqrt{25} = 5$.",
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La suma de distancias a los focos es siempre $2a$." }],
      title: "La suma constante",
      question: "Un punto cualquiera de la elipse $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$ cumple $d(P, F) + d(P, F') = $… (solo el número)",
      correctAnswers: ["10"],
      explanation: "$2a = 2\\cdot 5 = 10$. Por ejemplo, para $P(0, 3)$ cada distancia a un foco es $\\sqrt{16 + 9} = 5$ y la suma, $10$.",
    },
    {
      id: "check-vertical",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El semieje mayor es el que está bajo la mayor de las dos fracciones: aquí $25$, bajo $y^2$." }],
      title: "¿Dónde están los focos?",
      question: "En $\\dfrac{x^2}{9} + \\dfrac{y^2}{25} = 1$, los focos están en…",
      choices: [
        { id: "a", label: "$(0, \\pm 4)$, sobre el eje $Y$" },
        { id: "b", label: "$(\\pm 4, 0)$, sobre el eje $X$", incorrectFeedback: "Los focos están siempre sobre el eje **mayor**; aquí es el eje $Y$ ($25 > 9$)." },
        { id: "c", label: "$(0, \\pm 5)$", incorrectFeedback: "$5$ es el semieje mayor $a$, no la distancia focal. $c = \\sqrt{25 - 9} = 4$." },
        { id: "d", label: "$(\\pm 3, 0)$", incorrectFeedback: "$3$ es el semieje menor." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El eje mayor es el vertical ($a^2 = 25$) y $c = \\sqrt{25 - 9} = 4$: focos en $(0, \\pm 4)$.",
    },
    {
      id: "check-e",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$e = \\frac{c}{a} = \\frac{6}{10}$." }],
      title: "Excentricidad",
      question: "Una elipse tiene semieje mayor $a = 10$ y distancia focal $c = 6$. ¿Cuánto vale su excentricidad? (con coma decimal)",
      correctAnswers: ["0,6", "0.6", "3/5"],
      explanation: "$e = \\frac{c}{a} = \\frac{6}{10} = 0{,}6 < 1$. (Además $b = \\sqrt{100 - 36} = 8$.)",
    },
  ],
};
