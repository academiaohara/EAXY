import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const problemasTrigonometria1bachLesson: InteractiveLesson = {
  slug: "problemas-trigonometria-1bach",
  title: "13. Problemas de trigonometría",
  subtitle: TEMA_1BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "una-medida",
      type: "slide",
      help: [{ label: "Ángulo de elevación", message: "Es el ángulo que forma la visual al punto más alto con la horizontal." }],
      title: "Altura con una sola medida",
      blocks: [
        { kind: "text", text: "Si se conoce la **distancia $d$** hasta la base y el **ángulo de elevación $\\alpha$**, la altura es $h = d\\tan\\alpha$ (más la altura del observador, si hay que añadirla)." },
        { kind: "example", lines: [
          { math: "d = 20\\ \\text{m},\\ \\alpha = 50^\\circ:\\quad h = 20\\tan 50^\\circ \\approx 23{,}8\\ \\text{m}" },
        ] },
      ],
      visual: { kind: "anim", scene: "trig-altura-arbol", params: { a: 50, b: 20 } },
    },
    {
      id: "inaccesible",
      type: "slide",
      help: [{ label: "Por qué dos medidas", message: "Cuando no se puede llegar a la base (un río, una torre en una isla), no se conoce $d$. Con dos observaciones a distancia $x$ entre sí se plantean dos ecuaciones con $h$ y la distancia." }],
      title: "Altura inaccesible: dos medidas",
      blocks: [
        { kind: "text", text: "Se mide el ángulo de elevación desde dos puntos alineados con la base, a distancia $x$ entre sí: $\\alpha$ desde el más lejano y $\\beta$ desde el más cercano ($\\beta > \\alpha$)." },
        { kind: "steps", items: [
          "Sea $d$ la distancia del punto cercano a la base: $\\tan\\beta = \\dfrac{h}{d}$ y $\\tan\\alpha = \\dfrac{h}{d + x}$.",
          "Se despejan $d = h\\cot\\beta$ y $d + x = h\\cot\\alpha$.",
          "Se restan: $x = h\\,(\\cot\\alpha - \\cot\\beta)$, luego $h = \\dfrac{x}{\\cot\\alpha - \\cot\\beta}$.",
        ] },
        { kind: "example", title: "x = 20 m, α = 30°, β = 45°", lines: [
          { math: "h = \\dfrac{20}{\\cot 30^\\circ - \\cot 45^\\circ} = \\dfrac{20}{\\sqrt{3} - 1} \\approx 27{,}3\\ \\text{m}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-altura",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$h = \\frac{x}{\\cot\\alpha - \\cot\\beta}$ con $\\cot 30^\\circ = \\sqrt{3}$ y $\\cot 45^\\circ = 1$." }],
      title: "Una torre inaccesible",
      question: "Se mide una torre desde dos puntos alineados con su base y separados $20$ m. Los ángulos de elevación son $30^\\circ$ y $45^\\circ$. ¿Cuántos metros mide, con un decimal? (con coma decimal)",
      correctAnswers: ["27,3", "27.3"],
      explanation: "$h = \\frac{20}{\\sqrt{3} - 1} = \\frac{20}{0{,}732} \\approx 27{,}3$ m.",
    },
    {
      id: "distancia",
      type: "slide",
      help: [{ label: "Triángulo oblicuo", message: "Cuando los datos no forman un triángulo rectángulo (distancias entre puntos de un terreno, barcos…), se aplica el teorema del seno o del coseno." }],
      title: "Distancia entre dos puntos inaccesibles",
      blocks: [
        { kind: "text", text: "Para medir la distancia entre dos puntos $P$ y $Q$ separados por un lago se toma una **base** $AB$ medible y se miden los ángulos bajo los que se ven desde sus extremos. Se resuelven los triángulos con los teoremas del seno y del coseno." },
        { kind: "example", lines: [
          { math: "A = 40^\\circ,\\ B = 60^\\circ,\\ c = AB = 100\\ \\text{m}\\Rightarrow C = 80^\\circ" },
          { math: "a = \\dfrac{c\\sin A}{\\sin C} = \\dfrac{100\\sin 40^\\circ}{\\sin 80^\\circ} \\approx 65{,}3\\ \\text{m}" },
        ] },
      ],
      visual: { kind: "tool", tool: "triangulo-general-explorador", initial: [2, 80, 40, 100], hint: "Con A = 80° (el ángulo opuesto a la base de 100 m) y B = 40°, la herramienta da el lado opuesto a 40°, ≈ 65,3 m, y el ángulo de 60°." },
    },
    {
      id: "check-barco",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$A + B + C = 180^\\circ$, y $\\frac{a}{\\sin A} = \\frac{c}{\\sin C}$." }],
      title: "El tercer ángulo del problema",
      question: "Desde los extremos de una base de $100$ m se ve un objeto bajo ángulos de $40^\\circ$ y $60^\\circ$. ¿Cuántos grados mide el ángulo del objeto? (solo el número)",
      correctAnswers: ["80"],
      explanation: "El ángulo del vértice del objeto es $180^\\circ - 40^\\circ - 60^\\circ = 80^\\circ$.",
    },
    {
      id: "check-modelo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Fíjate en si el triángulo es rectángulo o no, y en qué datos tienes." }],
      title: "Elegir el método",
      question: "Dos barcos parten del mismo puerto con rumbos que forman $50^\\circ$ y recorren $12$ y $9$ km. Para hallar la distancia entre ellos se usa…",
      choices: [
        { id: "a", label: "el teorema del coseno: dos lados y el ángulo que forman" },
        { id: "b", label: "Pitágoras", incorrectFeedback: "El ángulo entre los rumbos es $50^\\circ$, no $90^\\circ$." },
        { id: "c", label: "el teorema del seno directamente", incorrectFeedback: "No hay un lado con su ángulo opuesto conocido; se necesita antes el coseno." },
        { id: "d", label: "la tangente", incorrectFeedback: "No hay ningún triángulo rectángulo en los datos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$d^2 = 12^2 + 9^2 - 2\\cdot 12\\cdot 9\\cos 50^\\circ \\approx 225 - 138{,}8 = 86{,}2$, luego $d \\approx 9{,}3$ km.",
    },
  ],
};
