import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasCoordenadasCartesianasLesson: InteractiveLesson = {
  slug: "tablas-graficas-coordenadas-cartesianas",
  title: "1. Coordenadas cartesianas",
  subtitle: TEMA_14_SUBTITLE,
  steps: [
    {
      id: "intro-descartes",
      type: "concept",
      title: "Descartes y el plano",
      content: [
        "Como en el ajedrez o en un tablero de barquitos, cada posición se puede designar con **fila y columna**.",
        "En el siglo XVII, **Descartes** (Cartesius en latín) propuso describir cada punto del plano con **dos números**: las **coordenadas cartesianas**.",
        "Eso permitió tratar la geometría con herramientas del álgebra y la aritmética.",
      ],
    },
    {
      id: "ejes",
      type: "concept",
      title: "Ejes y origen",
      content: [
        "En un sistema de ejes cartesianos:",
        "• El eje horizontal es el eje **X** (eje de **abscisas**).",
        "• El eje vertical es el eje **Y** (eje de **ordenadas**).",
        "• El punto **O**, donde se cortan, es el **origen** de coordenadas $(0, 0)$.",
        "Cada punto $P$ se escribe **$P(x, y)$**: la primera coordenada es la **abscisa** ($x$); la segunda, la **ordenada** ($y$).",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Cuadrantes del plano",
          items: [
            { title: "I", caption: "$x > 0$, $y > 0$", tone: "cobalt" },
            { title: "II", caption: "$x < 0$, $y > 0$", tone: "emerald" },
            { title: "III", caption: "$x < 0$, $y < 0$", tone: "amber" },
            { title: "IV", caption: "$x > 0$, $y < 0$", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "signos",
      type: "concept",
      title: "Signos de las coordenadas",
      content: [
        "En el eje **Y**, la abscisa es $0$: por ejemplo $A(0, 3)$.",
        "A la **derecha** del eje Y la abscisa es **positiva** ($B(3, 2)$); a la **izquierda**, **negativa** ($C(-3, 2)$).",
        "En el eje **X**, la ordenada es $0$: $D(-2, 0)$, $E(3, 0)$.",
        "Por **encima** del eje X la ordenada es positiva; **debajo**, negativa: $F(-2, -4)$, $G(4, -2)$.",
      ],
    },
    {
      id: "plano-ejemplo",
      type: "interactive_tool",
      title: "Representar puntos",
      tool: "system-graph",
      content: [
        "Observa el punto **$P(3, 5)$**: tres unidades a la derecha del origen y cinco hacia arriba.",
        "Si **intercambias** abscisa y ordenada obtienes **$Q(5, 3)$** — otro punto distinto.",
      ],
      graph: {
        lines: [],
        highlightPoints: [
          { x: 3, y: 5, label: "P(3, 5)" },
          { x: 5, y: 3, label: "Q(5, 3)" },
          { x: 0, y: 0, label: "O" },
        ],
        xMin: -1,
        xMax: 7,
        yMin: -1,
        yMax: 7,
      },
    },
    {
      id: "check-q",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cuál es la abscisa y cuál la ordenada?",
          message: "La primera coordenada es la abscisa ($x$, horizontal) y la segunda la ordenada ($y$, vertical).",
        },
        {
          label: "¿Qué es «cambiar de orden»?",
          message: "Que la primera coordenada pase a ser la segunda y la segunda la primera. No cambia ningún valor, solo su sitio.",
        },
      ],
      title: "Intercambiar coordenadas",
      question:
        "El punto $Q$ tiene la abscisa y la ordenada de $P(3, 5)$ pero **cambiadas de orden**. Escribe las coordenadas de $Q$ en la forma $(x, y)$.",
      correctAnswers: ["(5, 3)", "(5,3)", "5,3", "5, 3", "(5;3)", "5;3", "Q(5,3)", "Q(5, 3)"],
      hint: "La abscisa de $Q$ es la ordenada de $P$, y al revés.",
      explanation: "Se intercambian $x$ e $y$: de $(3, 5)$ pasamos a $(5, 3)$.",
    },
    {
      id: "check-eje-y",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Dónde está el eje Y?",
          message: "Es la línea vertical que pasa por el origen. ¿Cuánto te tienes que desplazar en horizontal para estar sobre ella?",
        },
        {
          label: "Prueba con puntos",
          message: "Sitúa $(2, 3)$, $(0, 3)$ y $(-2, 3)$. ¿Cuál de ellos está sobre el eje vertical?",
        },
      ],
      title: "Puntos sobre el eje Y",
      question: "¿Qué valor tiene la **abscisa** de cualquier punto del eje Y? (solo el número)",
      correctAnswers: ["0"],
      explanation: "En el eje Y, $x = 0$: por ejemplo $(0, 3)$.",
    },
  ],
};
