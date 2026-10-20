import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const circunferencias2esoLesson: InteractiveLesson = {
  slug: "circunferencias-2eso",
  title: "4. Circunferencias",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "Línea y superficie",
          message: "La circunferencia es solo el borde (una línea); el círculo incluye también el interior.",
        },
        {
          label: "El diámetro es la cuerda mayor",
          message: "El diámetro pasa por el centro y mide el doble del radio: es la cuerda más larga.",
        },
      ],
      title: "Elementos de la circunferencia",
      blocks: [
        {
          kind: "definition",
          text: "La **circunferencia** es la línea que rodea al **círculo**. Todos sus puntos están a la misma distancia (el **radio**) del **centro**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "d = 2r", label: "diámetro" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "circunferencia-elementos", beatMs: 3000 },
    },
    {
      id: "recta",
      type: "slide",
      help: [
        {
          label: "Compara d y r",
          message: "La distancia $d$ del centro a la recta decide: $d > r$ exteriores; $d = r$ tangentes; $d < r$ secantes.",
        },
        {
          label: "Tangente y radio",
          message: "La tangente es perpendicular al radio en el punto de contacto.",
        },
      ],
      title: "Recta y circunferencia",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "d > r", label: "exteriores: ningún punto común" },
            { tex: "d = r", label: "tangentes: un punto común" },
            { tex: "d < r", label: "secantes: dos puntos comunes" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "circunferencia-recta", beatMs: 3500 },
    },
    {
      id: "explora-recta",
      type: "slide",
      help: [
        {
          label: "Mueve la recta",
          message: "Acerca la recta al centro hasta que toque la circunferencia: ahí es tangente.",
        },
      ],
      title: "Explora: recta y circunferencia",
      blocks: [
        {
          kind: "text",
          text: "Cambia la distancia y el radio y observa la posición relativa.",
        },
      ],
      visual: { kind: "tool", tool: "circ-recta-explorador", params: { a: 6, b: 3 }, hint: "Busca el valor de la distancia en que la recta es tangente." },
    },
    {
      id: "dos-circunferencias",
      type: "slide",
      help: [
        {
          label: "Distancia entre centros",
          message: "Con radios $R$ y $r$ y distancia $d$ entre centros: exteriores si $d > R + r$, tangentes exteriores si $d = R + r$, secantes si $R - r < d < R + r$, tangentes interiores si $d = R - r$, interiores si $d < R - r$.",
        },
      ],
      title: "Dos circunferencias",
      blocks: [
        {
          kind: "text",
          text: "Dos circunferencias pueden ser **exteriores**, **tangentes exteriores**, **secantes**, **tangentes interiores**, **interiores** o **concéntricas** (mismo centro).",
        },
      ],
      visual: { kind: "anim", scene: "circunferencias-posiciones", beatMs: 3500 },
    },
    {
      id: "explora-circ",
      type: "slide",
      help: [
        {
          label: "Suma y diferencia",
          message: "Compara $d$ con $R + r$ y con $R - r$.",
        },
      ],
      title: "Explora: dos circunferencias",
      blocks: [
        {
          kind: "text",
          text: "Cambia los radios y la distancia entre los centros.",
        },
      ],
      visual: { kind: "tool", tool: "circ-circ-explorador", params: { a: 4, b: 2, c: 5 }, hint: "Ajusta la distancia para ver cada una de las seis posiciones." },
    },
    {
      id: "check-recta",
      type: "predict",
      help: [
        {
          label: "Compara $d$ con $r$",
          message: "$d = 3$ y $r = 5$: la recta pasa más cerca del centro que el radio.",
        },
      ],
      title: "Posición de una recta",
      question: "Una recta pasa a $3$ cm del centro de una circunferencia de radio $5$ cm. ¿Cómo es su posición?",
      mode: "choice",
      choices: [
        { id: "secante", label: "Secante" },
        { id: "tangente", label: "Tangente", incorrectFeedback: "Sería tangente si la distancia fuera igual al radio ($5$ cm)." },
        { id: "exterior", label: "Exterior", incorrectFeedback: "Sería exterior si la distancia fuera mayor que el radio." },
        { id: "concentrica", label: "Concéntrica", incorrectFeedback: "La concéntrica es una relación entre dos circunferencias, no entre recta y circunferencia." },
      ],
      correctChoiceId: "secante",
      shuffleChoices: true,
      explanation: "$d = 3 < r = 5$: la recta corta a la circunferencia en dos puntos: es secante.",
    },
    {
      id: "check-circ",
      type: "predict",
      help: [
        {
          label: "Suma y diferencia de radios",
          message: "$R + r = 6$ y $R - r = 2$. La distancia $5$ está entre $2$ y $6$.",
        },
      ],
      title: "Dos circunferencias",
      question: "Dos circunferencias de radios $4$ cm y $2$ cm tienen sus centros a $5$ cm. ¿Cómo son entre sí?",
      mode: "choice",
      choices: [
        { id: "secantes", label: "Secantes" },
        { id: "exteriores", label: "Exteriores", incorrectFeedback: "Serían exteriores si la distancia fuera mayor que $4 + 2 = 6$." },
        { id: "tangentes", label: "Tangentes", incorrectFeedback: "Serían tangentes exteriores si $d = 6$ o tangentes interiores si $d = 2$." },
        { id: "interiores", label: "Interiores", incorrectFeedback: "Serían interiores si $d < 4 - 2 = 2$." },
      ],
      correctChoiceId: "secantes",
      shuffleChoices: true,
      explanation: "$R - r = 2 < d = 5 < 6 = R + r$: se cortan en dos puntos.",
    },
  ],
};
