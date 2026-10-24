import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const complejosModuloArgumento1bachLesson: InteractiveLesson = {
  slug: "complejos-modulo-argumento-1bach",
  title: "11. Módulo, argumento y forma polar",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "modulo-argumento",
      type: "slide",
      help: [
        { label: "Módulo y valor absoluto", message: "Para un real, el módulo coincide con el valor absoluto: $|{-3}| = \\sqrt{(-3)^2 + 0^2} = 3$." },
      ],
      title: "Distancia y dirección",
      blocks: [
        { kind: "definition", text: "El **módulo** $|z| = \\sqrt{x^2 + y^2}$ es la distancia de $z$ al origen. El **argumento** es el ángulo que forma el vector con el semieje real positivo." },
        { kind: "text", text: "Los dos juntos fijan un punto del plano igual que $(x, y)$: son las coordenadas **polares**." },
      ],
      visual: { kind: "anim", scene: "complejo-polar", params: { a: -2, b: 2 } },
    },
    {
      id: "argumento",
      type: "slide",
      help: [
        { label: "Cuadrante", message: "$\\arctan(y/x)$ no distingue $(1, 1)$ de $(-1, -1)$ porque el cociente es el mismo. Hay que mirar el cuadrante en el que está el punto." },
      ],
      title: "El argumento no es único",
      blocks: [
        { kind: "text", text: "Sumar una vuelta ($360^\\circ$) no cambia el punto, así que cada complejo no nulo tiene **infinitos argumentos**: $\\theta + 360^\\circ k$. El de $z = 0$ no está definido." },
        { kind: "rule", title: "Argumento principal", text: "Se elige el argumento en $(-180^\\circ, 180^\\circ]$ (o $(-\\pi, \\pi]$). En general, **no** es cierto que $\\text{Arg}(zw) = \\text{Arg}(z) + \\text{Arg}(w)$; sí lo es con todos los argumentos." },
        { kind: "example", lines: [
          { math: "\\arg(5i) = 90^\\circ,\\quad \\arg(-7i) = -90^\\circ" },
          { math: "\\arg(3) = 0^\\circ,\\quad \\arg(-3) = 180^\\circ" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-modulo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|z| = \\sqrt{3^2 + 4^2}$." }],
      title: "Un módulo exacto",
      question: "¿Cuál es el módulo de $z = 3 + 4i$? (solo el número)",
      correctAnswers: ["5"],
      explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$ (la terna pitagórica $3, 4, 5$).",
    },
    {
      id: "check-arg",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$-1 - i$ está en el tercer cuadrante, a $45^\\circ$ del eje real negativo. Cuenta el ángulo desde el semieje positivo." }],
      title: "Argumento en el tercer cuadrante",
      question: "¿Cuál es el argumento principal de $z = -1 - i$?",
      choices: [
        { id: "a", label: "$-135^\\circ$" },
        { id: "b", label: "$45^\\circ$", incorrectFeedback: "Es el argumento de $1 + i$. El punto $(-1, -1)$ está en el tercer cuadrante." },
        { id: "c", label: "$135^\\circ$", incorrectFeedback: "Es el de $-1 + i$ (segundo cuadrante)." },
        { id: "d", label: "$-45^\\circ$", incorrectFeedback: "Es el de $1 - i$ (cuarto cuadrante)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El punto $(-1, -1)$ forma $225^\\circ$ con el semieje positivo, que en $(-180^\\circ, 180^\\circ]$ es $225^\\circ - 360^\\circ = -135^\\circ$.",
    },
    {
      id: "formas",
      type: "slide",
      help: [
        { label: "Para qué", message: "La forma polar hace que multiplicar, dividir y elevar sea trivial; la binómica es mejor para sumar. Hay que saber pasar de una a otra." },
      ],
      title: "Tres formas de escribir lo mismo",
      blocks: [
        { kind: "facts", items: [
          { tex: "z = x + yi", label: "binómica" },
          { tex: "z = r_\\theta", label: "polar" },
          { tex: "z = r(\\cos\\theta + i\\,\\sin\\theta)", label: "trigonométrica" },
        ] },
        { kind: "rule", title: "De polar a binómica", formula: "x = r\\cos\\theta,\\qquad y = r\\sin\\theta" },
        { kind: "example", title: "r = 2, θ = 60°", lines: [
          { math: "x = 2\\cos 60^\\circ = 1,\\qquad y = 2\\sin 60^\\circ = \\sqrt{3}" },
          { math: "2_{60^\\circ} = 1 + \\sqrt{3}\\,i" },
        ] },
      ],
      visual: { kind: "tool", tool: "complejo-explorador", initial: [-2, 2], hint: "Mueve el punto por los cuatro cuadrantes y observa cómo cambia el argumento principal mientras el módulo se mantiene." },
    },
    {
      id: "check-binomica",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\cos 60^\\circ = 0{,}5$." }],
      title: "De polar a binómica",
      question: "El complejo de módulo $4$ y argumento $60^\\circ$ es $x + yi$. ¿Cuánto vale $x$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$x = 4\\cos 60^\\circ = 4\\cdot 0{,}5 = 2$ (y $y = 4\\sin 60^\\circ = 2\\sqrt{3}$).",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Binómica: suma de real e imaginario. Polar: módulo con subíndice del ángulo. Trigonométrica: módulo por (cos + i sen)." }],
      title: "Reconoce la forma",
      question: "Clasifica cada expresión según la forma en la que está escrita.",
      groups: [
        { id: "bin", label: "Binómica", tone: "cobalt" },
        { id: "pol", label: "Polar", tone: "emerald" },
        { id: "tri", label: "Trigonométrica", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$3 + 4i$", group: "bin" },
        { id: "b", text: "$5_{53^\\circ}$", group: "pol" },
        { id: "c", text: "$2(\\cos 30^\\circ + i\\sin 30^\\circ)$", group: "tri" },
        { id: "d", text: "$-1 + i$", group: "bin" },
        { id: "e", text: "$\\sqrt{2}_{135^\\circ}$", group: "pol" },
        { id: "f", text: "$4(\\cos 90^\\circ + i\\sin 90^\\circ)$", group: "tri" },
      ],
      hint: "El subíndice con un ángulo indica forma polar.",
    },
  ],
};
