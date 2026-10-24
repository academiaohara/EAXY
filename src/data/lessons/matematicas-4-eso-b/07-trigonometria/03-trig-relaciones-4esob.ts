import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigRelaciones4esobLesson: InteractiveLesson = {
  slug: "trig-relaciones-4esob",
  title: "3. Relaciones trigonométricas fundamentales",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pitagorica",
      type: "slide",
      help: [
        { label: "Notación", message: "$\\operatorname{sen}^2\\alpha$ es $(\\operatorname{sen}\\alpha)^2$. En este curso escribimos el paréntesis para no confundirlo con otras cosas." },
        { label: "Pitágoras escondido", message: "Es el teorema de Pitágoras dividido entre la hipotenusa al cuadrado." },
      ],
      title: "sen² + cos² = 1",
      blocks: [
        { kind: "rule", title: "Relación fundamental (I)", formula: "(\\operatorname{sen}\\alpha)^2 + (\\cos\\alpha)^2 = 1" },
        { kind: "text", text: "Es el **teorema de Pitágoras** disfrazado: si dividimos $b^2 + c^2 = a^2$ entre $a^2$ aparecen el seno y el coseno al cuadrado." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(sen α)² + (cos α)²"], active: [0, 0], note: "se escribe con los lados: $\\left(\\frac{b}{a}\\right)^2 + \\left(\\frac{c}{a}\\right)^2$." },
            { tokens: ["b²/a² + c²/a²"], active: [0, 0], note: "mismo denominador: se suman los numeradores." },
            { tokens: ["(b² + c²) / a²"], active: [0, 0], note: "Pitágoras: $b^2 + c^2 = a^2$." },
            { tokens: ["a² / a² = 1"], fresh: [0, 0], note: "se cumple siempre, sea cual sea el ángulo." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-coseno",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Despeja el coseno", message: "$(\\cos\\alpha)^2 = 1 - 0{,}28^2 = 1 - 0{,}0784 = 0{,}9216$. En un ángulo agudo el coseno es positivo." }],
      title: "Calcular el coseno",
      question: "Si $\\operatorname{sen}\\alpha = 0{,}28$ y $\\alpha$ es agudo, ¿cuánto vale $\\cos\\alpha$? (decimal con coma)",
      correctAnswers: ["0,96", "0.96"],
      explanation: "$(\\cos\\alpha)^2 = 1 - 0{,}28^2 = 0{,}9216$, y $\\cos\\alpha = \\sqrt{0{,}9216} = 0{,}96$ (positivo, por ser agudo).",
    },
    {
      id: "tangente",
      type: "slide",
      help: [{ label: "Demostración", message: "$\\dfrac{\\operatorname{sen}\\alpha}{\\cos\\alpha} = \\dfrac{b/a}{c/a} = \\dfrac{b}{c} = \\operatorname{tg}\\alpha$: la hipotenusa se simplifica." }],
      title: "tg = sen / cos",
      blocks: [
        { kind: "rule", title: "Relación fundamental (II)", formula: "\\operatorname{tg}\\alpha = \\dfrac{\\operatorname{sen}\\alpha}{\\cos\\alpha}" },
        { kind: "text", text: "Con las dos relaciones, si conoces **una** razón de un ángulo agudo puedes calcular las otras dos." },
      ],
      visual: { kind: "tool", tool: "trig-explorador", params: { a: 40, b: 8 }, hint: "Comprueba con la calculadora de cabeza: sen/cos da la tangente que ves, y sen² + cos² = 1." },
    },
    {
      id: "check-tg",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Divide", message: "$\\operatorname{tg}\\alpha = \\dfrac{0{,}28}{0{,}96} \\approx 0{,}2917$." }],
      title: "Calcular la tangente",
      question: "Con $\\operatorname{sen}\\alpha = 0{,}28$ y $\\cos\\alpha = 0{,}96$, ¿cuánto vale $\\operatorname{tg}\\alpha$? (redondea a las milésimas, con coma)",
      correctAnswers: ["0,292", "0.292"],
      explanation: "$\\operatorname{tg}\\alpha = \\dfrac{0{,}28}{0{,}96} = 0{,}29166\\ldots \\approx 0{,}292$.",
    },
    {
      id: "check-imposible",
      type: "predict",
      mode: "choice",
      help: [{ label: "Suma de cuadrados", message: "Tiene que cumplirse $(\\operatorname{sen}\\alpha)^2 + (\\cos\\alpha)^2 = 1$. Eleva al cuadrado y suma." }],
      title: "¿Puede existir ese ángulo?",
      question: "¿Qué pareja de valores **no** puede corresponder a un mismo ángulo agudo?",
      choices: [
        { id: "a", label: "$\\operatorname{sen}\\alpha = 0{,}8$ y $\\cos\\alpha = 0{,}8$" },
        { id: "b", label: "$\\operatorname{sen}\\alpha = 0{,}6$ y $\\cos\\alpha = 0{,}8$", incorrectFeedback: "$0{,}36 + 0{,}64 = 1$: es posible (corresponde al ángulo de unos $36{,}9°$)." },
        { id: "c", label: "$\\operatorname{sen}\\alpha = 0{,}28$ y $\\cos\\alpha = 0{,}96$", incorrectFeedback: "$0{,}0784 + 0{,}9216 = 1$: es posible." },
        { id: "d", label: "$\\operatorname{sen}\\alpha = 0$ y $\\cos\\alpha = 1$", incorrectFeedback: "Cumple la relación, aunque corresponde al ángulo $0°$ (no es un triángulo)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$0{,}8^2 + 0{,}8^2 = 0{,}64 + 0{,}64 = 1{,}28 \\neq 1$: seno y coseno no pueden valer lo mismo $0{,}8$ en un mismo ángulo.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Prueba la relación", message: "Si el cuadrado del seno más el del coseno da $1$, los valores son compatibles." }],
      title: "¿Compatibles?",
      question: "Decide si cada pareja puede ser (seno, coseno) de un ángulo agudo.",
      groups: [
        { id: "si", label: "Sí puede ser", tone: "emerald" },
        { id: "no", label: "Imposible", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$0{,}6$ y $0{,}8$", group: "si" },
        { id: "b", text: "$0{,}5$ y $0{,}5$", group: "no" },
        { id: "c", text: "$0{,}28$ y $0{,}96$", group: "si" },
        { id: "d", text: "$0{,}9$ y $0{,}9$", group: "no" },
        { id: "e", text: "$\\tfrac12$ y $\\tfrac{\\sqrt3}{2}$", group: "si" },
        { id: "f", text: "$0{,}3$ y $0{,}3$", group: "no" },
      ],
      hint: "Suma los cuadrados y mira si da exactamente 1.",
    },
  ],
};
