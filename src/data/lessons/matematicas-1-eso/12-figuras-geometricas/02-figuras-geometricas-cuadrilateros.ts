import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const figurasGeometricasCuadrilaterosLesson: InteractiveLesson = {
  slug: "figuras-geometricas-cuadrilateros",
  title: "2. Cuadriláteros",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "familia",
      type: "slide",
      help: [
        {
          label: "¿Por qué se llaman cuadriláteros?",
          message: "Del latín: «cuatro lados». Todos tienen cuatro lados, cuatro vértices y dos diagonales.",
        },
        {
          label: "¿Cómo los ordeno?",
          message: "Primero pregunta cuántos pares de lados paralelos hay: dos pares (paralelogramo), uno (trapecio) o ninguno (trapezoide).",
        },
      ],
      title: "Los cuadriláteros y sus tres familias",
      blocks: [
        {
          kind: "rule",
          title: "Cuadrilátero",
          text: "Polígono de $4$ lados. Sus ángulos suman $360^\\circ$ y tiene $2$ diagonales.",
          formula: "\\alpha + \\beta + \\gamma + \\delta = 360^\\circ",
        },
        {
          kind: "steps",
          title: "Según sus lados paralelos",
          items: ["**Paralelogramos:** dos pares de lados paralelos.", "**Trapecios:** un solo par.", "**Trapezoides:** ninguno."],
        },
      ],
      visual: { kind: "anim", scene: "cuadrilateros-familia", beatMs: 3000 },
    },
    {
      id: "explora-paralelogramo",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message:
            "Un rombo tiene los cuatro lados iguales, un rectángulo los cuatro ángulos rectos, y el cuadrado las dos cosas. Mira qué valores hacen falta para cada uno.",
        },
      ],
      title: "Explora: del romboide al cuadrado",
      blocks: [
        {
          kind: "text",
          text: "Cambia los lados y el ángulo. ¿Qué dos condiciones tienen que cumplirse a la vez para que salga un **cuadrado**?",
        },
      ],
      visual: { kind: "tool", tool: "paralelogramo-explorador", params: { a: 5, b: 3, c: 70 } },
    },
    {
      id: "clasificar-cuadrilateros",
      type: "classify",
      help: [
        {
          label: "Empieza por los lados paralelos",
          message: "Si hay dos pares de lados paralelos es un paralelogramo; si solo hay un par, un trapecio; si no hay ninguno, un trapezoide.",
        },
        {
          label: "Los cuatro paralelogramos",
          message: "Romboide, rombo, rectángulo y cuadrado: todos son paralelogramos, aunque algunos tengan propiedades extra.",
        },
      ],
      title: "¿Qué familia?",
      question: "Clasifica cada cuadrilátero en su familia.",
      groups: [
        { id: "paralelogramo", label: "Paralelogramo", tone: "cobalt" },
        { id: "trapecio", label: "Trapecio", tone: "emerald" },
        { id: "trapezoide", label: "Trapezoide", tone: "violet" },
      ],
      items: [
        { id: "a", text: "Un cuadrado", group: "paralelogramo" },
        { id: "b", text: "Un rombo", group: "paralelogramo" },
        { id: "c", text: "Un rectángulo", group: "paralelogramo" },
        { id: "d", text: "Un cuadrilátero con solo dos lados paralelos", group: "trapecio" },
        { id: "e", text: "Una rampa de perfil: dos ángulos rectos y solo dos lados paralelos", group: "trapecio" },
        { id: "f", text: "Un cuadrilátero sin ningún par de lados paralelos", group: "trapezoide" },
      ],
      hint: "Cuenta los pares de lados paralelos: dos, uno o ninguno.",
      explanation:
        "Cuadrado, rombo y rectángulo tienen dos pares de lados paralelos: son paralelogramos. La rampa y el cuadrilátero con un solo par son trapecios. Sin ningún par paralelo, es un trapezoide.",
    },
    {
      id: "trapecios",
      type: "slide",
      help: [
        {
          label: "¿Y si los lados no paralelos son iguales?",
          message: "Entonces es un trapecio isósceles. Sus ángulos de la base mayor son iguales entre sí.",
        },
      ],
      title: "Trapecios: bases, altura y tipos",
      blocks: [
        {
          kind: "definition",
          text: "Un **trapecio** tiene dos lados paralelos, las **bases**, y otros dos que no lo son. La **altura** es la distancia entre las bases.",
        },
        {
          kind: "facts",
          items: [
            { tex: "2 \\text{ ángulos rectos}", label: "trapecio rectángulo" },
            { tex: "\\text{lados no paralelos iguales}", label: "trapecio isósceles" },
          ],
        },
        {
          kind: "text",
          text: "Los cuadriláteros **sin ningún par de lados paralelos** se llaman **trapezoides**.",
        },
      ],
      visual: { kind: "anim", scene: "trapecio-tipos", beatMs: 3200 },
    },
    {
      id: "ventana",
      type: "predict",
      help: [
        {
          label: "¿Qué cumple?",
          message: "Cuatro ángulos rectos obligan a que los lados opuestos sean paralelos: ya es al menos un paralelogramo.",
        },
        {
          label: "¿Cuándo sería cuadrado?",
          message: "Si además los cuatro lados fueran iguales. Aquí se dice que son desiguales.",
        },
      ],
      title: "Una ventana",
      question:
        "Una ventana tiene los cuatro ángulos rectos, pero su ancho es mayor que su alto. ¿Qué cuadrilátero es?",
      mode: "choice",
      choices: [
        { id: "a", label: "Rectángulo" },
        {
          id: "b",
          label: "Cuadrado",
          incorrectFeedback: "El cuadrado exige también los cuatro lados iguales, y el ancho es mayor que el alto.",
        },
        {
          id: "c",
          label: "Rombo",
          incorrectFeedback: "El rombo tiene los cuatro lados iguales y sus ángulos no son rectos (salvo que sea un cuadrado).",
        },
        {
          id: "d",
          label: "Trapecio",
          incorrectFeedback: "Un trapecio tiene solo un par de lados paralelos; la ventana tiene dos pares.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Cuatro ángulos rectos y lados que no son todos iguales: es un **rectángulo**.",
    },
    {
      id: "cuarto-angulo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cuánto suman?",
          message: "Los cuatro ángulos de cualquier cuadrilátero suman $360^\\circ$.",
        },
        {
          label: "Primero suma los tres",
          message: "Suma los tres ángulos que te dan y resta el resultado a $360^\\circ$.",
        },
      ],
      title: "El cuarto ángulo",
      question:
        "Un trapezoide tiene tres ángulos de 90°, 80° y 100°. ¿Cuánto mide el cuarto? (escribe solo el número)",
      correctAnswers: ["90", "90º", "90°"],
      hint: "Suman $360^\\circ$ en total.",
      explanation: "$90^\\circ + 80^\\circ + 100^\\circ = 270^\\circ$, y $360^\\circ - 270^\\circ = 90^\\circ$.",
    },
    {
      id: "verdadero",
      type: "predict",
      help: [
        {
          label: "Compara las condiciones",
          message: "Un rombo pide cuatro lados iguales. Un rectángulo pide cuatro ángulos rectos. ¿Qué pide un cuadrado?",
        },
        {
          label: "Un contraejemplo",
          message: "Busca una figura que cumpla la frase pero no la propiedad que se afirma. Si existe, la frase es falsa.",
        },
      ],
      title: "¿Qué frase es verdadera?",
      question: "Elige la afirmación correcta sobre los cuadriláteros.",
      mode: "choice",
      choices: [
        { id: "a", label: "Todo cuadrado es a la vez un rombo y un rectángulo" },
        {
          id: "b",
          label: "Todo rectángulo es un cuadrado",
          incorrectFeedback: "Un rectángulo de $5 \\times 3$ tiene los cuatro ángulos rectos pero sus lados no son iguales: no es cuadrado.",
        },
        {
          id: "c",
          label: "Todo trapecio es un paralelogramo",
          incorrectFeedback: "Un trapecio tiene un solo par de lados paralelos; un paralelogramo necesita dos pares.",
        },
        {
          id: "d",
          label: "Un rombo siempre tiene sus ángulos rectos",
          incorrectFeedback: "Un rombo puede estar «aplastado» y tener ángulos de $60^\\circ$ y $120^\\circ$. Solo el rombo que además es cuadrado los tiene rectos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "El cuadrado tiene los cuatro lados iguales (como el rombo) y los cuatro ángulos rectos (como el rectángulo): es los dos a la vez.",
    },
  ],
};
