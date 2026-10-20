import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const problemasEcuaciones2esoLesson: InteractiveLesson = {
  slug: "problemas-ecuaciones-2eso",
  title: "4. Problemas con ecuaciones",
  subtitle: TEMA_2ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "Elige bien la incógnita",
          message: "Llama $x$ a lo que te piden o a la cantidad de la que dependen las demás.",
        },
        {
          label: "No te saltes el cuarto paso",
          message: "La solución de la ecuación debe tener sentido en el problema: una edad no puede ser negativa.",
        },
      ],
      title: "Los cuatro pasos",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Nombra** la incógnita y expresa con ella las demás cantidades.",
            "**Relaciona**: escribe la igualdad que dice el enunciado.",
            "**Resuelve** la ecuación.",
            "**Interpreta** la solución en el contexto y comprueba.",
          ],
        },
        {
          kind: "example",
          title: "Pablo y Lucía suman 30",
          lines: [
            { math: "x + (x + 6) = 30", note: "Pablo $x$, Lucía $x + 6$" },
            { math: "2x = 24 \\to x = 12", note: "Pablo $12$, Lucía $18$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "pasos-problema" },
    },
    {
      id: "fracciones",
      type: "slide",
      help: [
        {
          label: "Parte de un número",
          message: "«La tercera parte de un número» es $\\frac{x}{3}$ y «su mitad» es $\\frac{x}{2}$.",
        },
        {
          label: "Con denominadores",
          message: "Multiplica por el m.c.m. de $3$ y $2$, que es $6$.",
        },
      ],
      title: "Un problema con fracciones",
      blocks: [
        {
          kind: "text",
          text: "Al sumar la tercera parte de un número con su mitad, se obtiene $20$. ¿Qué número es?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{x}{3} + \\dfrac{x}{2} = 20" },
            { math: "2x + 3x = 120 \\to 5x = 120 \\to x = 24" },
            { math: "\\dfrac{24}{3} + \\dfrac{24}{2} = 8 + 12 = 20", note: "comprobación" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "consecutivos",
      type: "slide",
      help: [
        {
          label: "Consecutivos",
          message: "Si el primero es $x$, el siguiente es $x + 1$.",
        },
      ],
      title: "Números consecutivos y geometría",
      blocks: [
        {
          kind: "example",
          title: "Dos consecutivos que suman 133",
          lines: [
            { math: "x + (x + 1) = 133 \\to 2x = 132 \\to x = 66" },
            { math: "66 \\text{ y } 67" },
          ],
        },
        {
          kind: "example",
          title: "Finca de 150 m de alambrada, el largo es el doble del ancho",
          lines: [
            { math: "2x + 2 \\cdot 2x = 150 \\to 6x = 150 \\to x = 25" },
            { math: "\\text{ancho } 25\\text{ m},\\ \\text{largo } 50\\text{ m}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-triple",
      type: "fill_in_blank",
      help: [
        {
          label: "Traduce",
          message: "«El triple de un número» es $3x$; «le restas $8$»: $3x - 8$; «obtienes $25$»: $= 25$.",
        },
      ],
      title: "El triple de un número",
      question: "Si al triple de un número le restas $8$, obtienes $25$. ¿Qué número es? (solo el número)",
      correctAnswers: ["11"],
      explanation: "$3x - 8 = 25 \\Rightarrow 3x = 33 \\Rightarrow x = 11$.",
    },
    {
      id: "check-edades",
      type: "predict",
      help: [
        {
          label: "Incógnita",
          message: "Llama $x$ a la edad de Bea. Entonces Ana tiene $x + 3$.",
        },
        {
          label: "No olvides lo que piden",
          message: "La ecuación da la edad de Bea, y se pregunta por la de Ana.",
        },
      ],
      title: "Edades",
      question: "Ana tiene $3$ años más que Bea y entre las dos suman $29$ años. ¿Qué edad tiene Ana?",
      mode: "choice",
      choices: [
        { id: "16", label: "$16$ años" },
        { id: "13", label: "$13$ años", incorrectFeedback: "Es la edad de Bea ($x = 13$); Ana tiene $3$ más." },
        { id: "13.5", label: "$13{,}5$ años", incorrectFeedback: "Has dividido $27 : 2$ sin tener en cuenta que las edades difieren en $3$: $x + (x + 3) = 29$." },
        { id: "26", label: "$26$ años", incorrectFeedback: "Comprueba: $26 + 23 = 49 \\ne 29$." },
      ],
      correctChoiceId: "16",
      shuffleChoices: true,
      explanation: "$x + (x + 3) = 29 \\Rightarrow 2x = 26 \\Rightarrow x = 13$ (Bea). Ana tiene $13 + 3 = 16$ años.",
    },
    {
      id: "check-finca",
      type: "predict",
      help: [
        {
          label: "Perímetro",
          message: "Si el ancho es $x$ y el largo $2x$, el perímetro es $2x + 2 \\cdot 2x$.",
        },
      ],
      title: "Una parcela",
      question: "Un campo rectangular tiene el largo igual al triple del ancho y su perímetro mide $80$ m. ¿Cuánto mide el ancho?",
      mode: "choice",
      choices: [
        { id: "10", label: "$10$ m" },
        { id: "20", label: "$20$ m", incorrectFeedback: "Comprueba: con ancho $20$ y largo $60$, el perímetro sería $160$ m, el doble del dato." },
        { id: "30", label: "$30$ m", incorrectFeedback: "Es el largo si el ancho fuera $10$; pero se pide el ancho." },
        { id: "16", label: "$16$ m", incorrectFeedback: "Has dividido $80$ entre $5$; el perímetro es $2x + 6x = 8x$." },
      ],
      correctChoiceId: "10",
      shuffleChoices: true,
      explanation: "$2x + 2 \\cdot 3x = 8x = 80 \\Rightarrow x = 10$ m (y el largo mide $30$ m).",
    },
  ],
};
