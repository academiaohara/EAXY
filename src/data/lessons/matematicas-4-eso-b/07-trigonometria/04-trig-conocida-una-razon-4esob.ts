import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigConocidaUnaRazon4esobLesson: InteractiveLesson = {
  slug: "trig-conocida-una-razon-4esob",
  title: "4. Conocida una razón, calcular las otras",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "desde-coseno",
      type: "slide",
      help: [
        { label: "Raíz positiva", message: "Un ángulo agudo tiene seno, coseno y tangente positivos: al hacer la raíz solo te quedas con el valor positivo." },
        { label: "Orden", message: "Primero la relación $(\\operatorname{sen})^2 + (\\cos)^2 = 1$ para la razón que falta, después $\\operatorname{tg} = \\operatorname{sen}/\\cos$." },
      ],
      title: "Conocido el coseno",
      blocks: [
        { kind: "steps", items: ["De $(\\operatorname{sen}\\alpha)^2 + (\\cos\\alpha)^2 = 1$ despeja el seno (raíz positiva).", "Calcula la tangente con $\\operatorname{tg}\\alpha = \\operatorname{sen}\\alpha / \\cos\\alpha$."] },
        { kind: "example", title: "$\\cos\\alpha = 0{,}63$", lines: [{ math: "(\\operatorname{sen}\\alpha)^2 = 1 - 0{,}63^2 = 0{,}6031" }, { math: "\\operatorname{sen}\\alpha = 0{,}777" }, { math: "\\operatorname{tg}\\alpha = \\dfrac{0{,}777}{0{,}63} = 1{,}23" }] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["cos α = 0,63"], active: [0, 0], note: "dato." },
            { tokens: ["(sen α)² = 1 − 0,63² = 0,6031"], active: [0, 0], note: "relación fundamental." },
            { tokens: ["sen α = √0,6031 = 0,777"], active: [0, 0], note: "raíz positiva (ángulo agudo)." },
            { tokens: ["tg α = 0,777 / 0,63 = 1,23"], fresh: [0, 0], note: "tangente = seno entre coseno." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-seno",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pitágoras numérico", message: "$(\\operatorname{sen}\\alpha)^2 = 1 - 0{,}8^2 = 0{,}36$." }],
      title: "Seno desde el coseno",
      question: "Si $\\cos\\alpha = 0{,}8$ ($\\alpha$ agudo), ¿cuánto vale $\\operatorname{sen}\\alpha$? (decimal con coma)",
      correctAnswers: ["0,6", "0.6"],
      explanation: "$(\\operatorname{sen}\\alpha)^2 = 1 - 0{,}64 = 0{,}36$, así que $\\operatorname{sen}\\alpha = 0{,}6$ (y $\\operatorname{tg}\\alpha = 0{,}75$).",
    },
    {
      id: "desde-tangente",
      type: "slide",
      help: [
        { label: "Sistema", message: "Con $\\operatorname{tg}\\alpha = 2$ sabes que $\\operatorname{sen}\\alpha = 2\\cos\\alpha$. Sustituyes en la relación fundamental y queda una ecuación solo con el coseno." },
        { label: "Racionalizar", message: "$\\dfrac{1}{\\sqrt5} = \\dfrac{\\sqrt5}{5}$: se multiplica arriba y abajo por $\\sqrt5$." },
      ],
      title: "Conocida la tangente",
      blocks: [
        { kind: "text", text: "Con $\\operatorname{tg}\\alpha = 2$ se tiene $\\operatorname{sen}\\alpha = 2\\cos\\alpha$. Se sustituye en la relación fundamental y se resuelve." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["tg α = 2", "⇒", "sen α = 2 cos α"], active: [0, 2], note: "$\\operatorname{tg}\\alpha = \\operatorname{sen}\\alpha / \\cos\\alpha$." },
            { tokens: ["(2 cos α)² + (cos α)² = 1"], active: [0, 0], note: "se sustituye en $(\\operatorname{sen}\\alpha)^2 + (\\cos\\alpha)^2 = 1$." },
            { tokens: ["5 (cos α)² = 1", "⇒", "cos α = 1/√5 = √5/5"], active: [0, 2], note: "$4c^2 + c^2 = 5c^2$; se racionaliza." },
            { tokens: ["sen α = 2 cos α = 2√5/5 ≈ 0,894"], fresh: [0, 0], note: "y $\\cos\\alpha = \\sqrt5/5 \\approx 0{,}447$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-tg",
      type: "predict",
      mode: "choice",
      help: [{ label: "Sustituye", message: "Con $\\operatorname{tg}\\alpha = 2$: $\\cos\\alpha = \\dfrac{1}{\\sqrt5} = \\dfrac{\\sqrt5}{5}$." }],
      title: "El coseno exacto",
      question: "Si $\\operatorname{tg}\\alpha = 2$ ($\\alpha$ agudo), ¿cuánto vale $\\cos\\alpha$ en forma exacta?",
      choices: [
        { id: "a", label: "$\\dfrac{\\sqrt5}{5}$" },
        { id: "b", label: "$\\dfrac{2\\sqrt5}{5}$", incorrectFeedback: "Esa es la del seno: $\\operatorname{sen}\\alpha = 2\\cos\\alpha$." },
        { id: "c", label: "$\\dfrac12$", incorrectFeedback: "Eso sería $\\cos 60°$; aquí hay que usar la relación fundamental." },
        { id: "d", label: "$\\dfrac{1}{2}\\sqrt5$", incorrectFeedback: "Es mayor que $1$, imposible para un coseno." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$5(\\cos\\alpha)^2 = 1 \\Rightarrow \\cos\\alpha = \\dfrac{1}{\\sqrt5} = \\dfrac{\\sqrt5}{5} \\approx 0{,}447$.",
    },
    {
      id: "check-tg07",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Otra ruta", message: "Con $\\operatorname{tg}\\alpha = 0{,}7$ se tiene $\\cos\\alpha = \\dfrac{1}{\\sqrt{1 + 0{,}7^2}} = \\dfrac{1}{\\sqrt{1{,}49}} \\approx 0{,}819$, y $\\operatorname{sen}\\alpha = \\operatorname{tg}\\alpha \\cdot \\cos\\alpha$." }],
      title: "Seno desde la tangente",
      question: "Si $\\operatorname{tg}\\alpha = 0{,}7$ ($\\alpha$ agudo), ¿cuánto vale $\\operatorname{sen}\\alpha$? (redondea a las milésimas, con coma)",
      correctAnswers: ["0,573", "0.573"],
      explanation: "$\\cos\\alpha = 1/\\sqrt{1{,}49} \\approx 0{,}8192$ y $\\operatorname{sen}\\alpha = 0{,}7 \\cdot 0{,}8192 \\approx 0{,}573$.",
    },
    {
      id: "check-exacto",
      type: "predict",
      mode: "choice",
      help: [{ label: "Con radicales", message: "$(\\operatorname{sen}\\alpha)^2 = 1 - \\left(\\dfrac23\\right)^2 = \\dfrac59$, luego $\\operatorname{sen}\\alpha = \\dfrac{\\sqrt5}{3}$." }],
      title: "Valor exacto",
      question: "Si $\\cos\\alpha = \\dfrac23$ ($\\alpha$ agudo), ¿cuánto vale $\\operatorname{sen}\\alpha$ de forma exacta?",
      choices: [
        { id: "a", label: "$\\dfrac{\\sqrt5}{3}$" },
        { id: "b", label: "$\\dfrac13$", incorrectFeedback: "Has hecho $1 - \\frac23$ sin elevar al cuadrado." },
        { id: "c", label: "$\\dfrac{5}{9}$", incorrectFeedback: "Eso es $(\\operatorname{sen}\\alpha)^2$; falta la raíz cuadrada." },
        { id: "d", label: "$\\dfrac{\\sqrt3}{2}$", incorrectFeedback: "Ese es el seno de $60°$, no de este ángulo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(\\operatorname{sen}\\alpha)^2 = 1 - \\frac49 = \\frac59 \\Rightarrow \\operatorname{sen}\\alpha = \\frac{\\sqrt5}{3} \\approx 0{,}745$.",
    },
  ],
};
