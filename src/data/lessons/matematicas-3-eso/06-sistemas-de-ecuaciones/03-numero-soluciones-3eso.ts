import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const numeroSoluciones3esoLesson: InteractiveLesson = {
  slug: "numero-soluciones-3eso",
  title: "3. Número de soluciones de un sistema",
  subtitle: TEMA_3ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "incompatible",
      type: "slide",
      help: [
        {
          label: "Contradicción",
          message: "Si $2x + 3y = 15$, no puede ser a la vez $2x + 3y = 9$: dicen cosas incompatibles.",
        },
        {
          label: "Segundo ejemplo",
          message: "En $2x + 3y = 15$ y $4x + 6y = 18$, la segunda ecuación es el doble en el primer miembro, así que debería valer $30$, no $18$.",
        },
      ],
      title: "Sistemas sin solución: incompatibles",
      blocks: [
        {
          kind: "definition",
          text: "Un sistema **incompatible** no tiene solución. Gráficamente, son dos rectas **paralelas**: no tienen ningún punto común.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\begin{cases} 2x + 3y = 15 \\\\ 2x + 3y = 9 \\end{cases}" },
            { math: "\\begin{cases} 2x + 3y = 15 \\\\ 4x + 6y = 18 \\end{cases}" },
          ],
        },
        {
          kind: "text",
          text: "Pista: los **coeficientes** son proporcionales, pero los **términos independientes** no lo son.",
        },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "incompatible" } },
    },
    {
      id: "indeterminado",
      type: "slide",
      help: [
        {
          label: "Dos veces lo mismo",
          message: "La segunda ecuación es la primera multiplicada por $2$: dice exactamente lo mismo.",
        },
        {
          label: "Soluciones",
          message: "Las soluciones del sistema son las de cualquiera de las dos ecuaciones: infinitas.",
        },
      ],
      title: "Sistemas con infinitas soluciones: indeterminados",
      blocks: [
        {
          kind: "definition",
          text: "Un sistema **indeterminado** tiene infinitas soluciones. Gráficamente, las dos rectas **coinciden**: todos sus puntos son comunes.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\begin{cases} 2x + 3y = 15 \\\\ 4x + 6y = 30 \\end{cases}" },
            { math: "4x + 6y = 30 \\ \\text{es} \\ 2 \\cdot (2x + 3y = 15)" },
          ],
        },
        {
          kind: "text",
          text: "Pista: **todos** los coeficientes, incluido el término independiente, son proporcionales.",
        },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "indeterminado" } },
    },
    {
      id: "resumen",
      type: "slide",
      help: [
        {
          label: "Comparar cocientes",
          message: "Mira $\\frac{a}{a'}$, $\\frac{b}{b'}$ y $\\frac{c}{c'}$: si los tres coinciden, indeterminado; si coinciden los dos primeros pero no el tercero, incompatible; si los dos primeros difieren, solución única.",
        },
      ],
      title: "Cómo reconocer el tipo sin resolver",
      blocks: [
        {
          kind: "relations",
          items: [
            { left: "rectas que se cortan", relation: "→", right: "1 solución", tone: "ok" },
            { left: "rectas paralelas", relation: "→", right: "ninguna", tone: "warn" },
            { left: "rectas coincidentes", relation: "→", right: "infinitas", tone: "info" },
          ],
        },
        {
          kind: "compare",
          left: { title: "Incompatible", text: "$a$ y $b$ proporcionales; $c$, no.", math: ["2x + 3y = 15", "4x + 6y = 18"], tone: "warn" },
          right: { title: "Indeterminado", text: "$a$, $b$ y $c$ proporcionales.", math: ["2x + 3y = 15", "4x + 6y = 30"], tone: "ok" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tipo",
      type: "predict",
      help: [
        {
          label: "Compara las ecuaciones",
          message: "En $2x + y = 7$ y $4x + 2y = 14$, la segunda es el doble de la primera en todos sus términos.",
        },
      ],
      title: "¿Qué tipo de sistema es?",
      question: "El sistema $2x + y = 7$, $4x + 2y = 14$, ¿cuántas soluciones tiene?",
      mode: "choice",
      choices: [
        { id: "inf", label: "Infinitas (indeterminado)" },
        { id: "una", label: "Una sola", incorrectFeedback: "La segunda ecuación es el doble de la primera: las rectas coinciden." },
        { id: "ninguna", label: "Ninguna (incompatible)", incorrectFeedback: "Para ser incompatible, el término independiente no debería ser proporcional: aquí $14 = 2 \\cdot 7$." },
      ],
      correctChoiceId: "inf",
      shuffleChoices: true,
      explanation: "Ambas ecuaciones dicen lo mismo: son la misma recta.",
    },
    {
      id: "check-incompatible",
      type: "predict",
      help: [
        {
          label: "Multiplica la primera",
          message: "Si multiplicas $x + y = 3$ por $2$ obtienes $2x + 2y = 6$, pero el sistema dice $2x + 2y = 7$.",
        },
      ],
      title: "Una contradicción",
      question: "El sistema $x + y = 3$, $2x + 2y = 7$, ¿qué tipo de sistema es?",
      mode: "choice",
      choices: [
        { id: "inc", label: "Incompatible: las rectas son paralelas" },
        { id: "una", label: "Compatible con una solución", incorrectFeedback: "Los coeficientes de $x$ e $y$ son proporcionales, así que las rectas no se cortan en un solo punto." },
        { id: "inf", label: "Indeterminado", incorrectFeedback: "El término independiente no es proporcional: $2 \\cdot 3 = 6 \\ne 7$." },
      ],
      correctChoiceId: "inc",
      shuffleChoices: true,
      explanation: "$2x + 2y = 2(x + y) = 6$, no $7$: es una contradicción. Sin solución.",
    },
  ],
};
