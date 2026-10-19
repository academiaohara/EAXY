import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasCoordenadasCartesianasLesson: InteractiveLesson = {
  slug: "tablas-graficas-coordenadas-cartesianas",
  title: "1. Coordenadas cartesianas",
  subtitle: TEMA_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro-descartes",
      type: "slide",
      help: [
        {
          label: "Piensa en un tablero",
          message: "En los barquitos, «B4» da un lugar con una letra y un número. Las coordenadas son lo mismo con dos números.",
        },
        {
          label: "¿Por qué fue importante?",
          message: "Porque permitió convertir un dibujo en números: una recta, un círculo, se pueden estudiar con ecuaciones.",
        },
      ],
      title: "Descartes y el plano",
      blocks: [
        {
          kind: "text",
          text: "Como en el ajedrez o en un tablero de barquitos, cada posición se puede designar con **fila y columna**.",
        },
        {
          kind: "definition",
          text: "En el siglo XVII, **Descartes** propuso describir cada punto del plano con **dos números**: sus **coordenadas cartesianas**.",
        },
        {
          kind: "text",
          text: "Así la geometría se pudo tratar con las herramientas del álgebra y la aritmética.",
        },
      ],
    },
    {
      id: "ejes",
      type: "slide",
      help: [
        {
          label: "Un truco para el orden",
          message: "Primero se anda por el suelo ($x$) y luego se sube ($y$): primero la abscisa, luego la ordenada.",
        },
        {
          label: "El origen",
          message: "Es el punto de partida: ni a la derecha ni arriba, $(0, 0)$.",
        },
      ],
      title: "Ejes y origen",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "X", label: "eje horizontal: abscisas" },
            { tex: "Y", label: "eje vertical: ordenadas" },
            { tex: "O(0, 0)", label: "origen de coordenadas" },
          ],
        },
        {
          kind: "rule",
          title: "Un punto se escribe con dos coordenadas",
          formula: "P(x,\\, y)",
          text: "La primera es la abscisa o «x del punto»; la segunda, la ordenada o «y del punto».",
        },
      ],
      visual: { kind: "anim", scene: "plano-cartesiano", beatMs: 3200 },
    },
    {
      id: "signos",
      type: "slide",
      help: [
        {
          label: "Los cuatro cuadrantes",
          message: "Derecha y arriba: $(+, +)$. Izquierda y arriba: $(-, +)$. Izquierda y abajo: $(-, -)$. Derecha y abajo: $(+, -)$.",
        },
        {
          label: "Los ejes",
          message: "En el eje $Y$ la abscisa es $0$. En el eje $X$ la ordenada es $0$.",
        },
      ],
      title: "Cuadrantes y signos",
      blocks: [
        {
          kind: "text",
          text: "Los ejes dividen el plano en **cuatro cuadrantes**. El signo de las coordenadas indica en cuál está el punto.",
        },
        {
          kind: "warning",
          title: "Sobre los ejes",
          text: "Los puntos del eje $Y$ tienen $x = 0$ y los del eje $X$ tienen $y = 0$. No pertenecen a ningún cuadrante.",
        },
      ],
      visual: { kind: "anim", scene: "cuadrantes-signos", beatMs: 3500 },
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
      id: "explora-plano",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Cuando $x$ e $y$ son distintos, $(x, y)$ e $(y, x)$ son puntos distintos. Solo coinciden cuando $x = y$.",
        },
      ],
      title: "Explora: coloca un punto",
      blocks: [
        {
          kind: "text",
          text: "Mueve la abscisa y la ordenada, y pulsa **Intercambiar**. ¿Para qué puntos no cambia nada al intercambiar?",
        },
      ],
      visual: { kind: "tool", tool: "plano-explorador", params: { a: 3, b: 5 } },
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
    {
      id: "cuadrante-dron",
      type: "predict",
      help: [
        {
          label: "Mira los signos",
          message: "Una abscisa negativa está a la izquierda del eje Y; una ordenada positiva, por encima del eje X.",
        },
        {
          label: "Los cuadrantes",
          message: "Izquierda y arriba es el cuadrante II; izquierda y abajo, el III.",
        },
      ],
      title: "Un dron en el mapa",
      question:
        "En el mapa de un parque, el origen es la entrada. Un dron está en el punto (−4, 2), con las unidades en cientos de metros. ¿Dónde está respecto de la entrada?",
      mode: "choice",
      choices: [
        { id: "a", label: "A la izquierda y al norte: cuadrante II" },
        {
          id: "b",
          label: "A la derecha y al norte: cuadrante I",
          incorrectFeedback: "Una abscisa negativa ($-4$) significa a la **izquierda** del eje Y, no a la derecha.",
        },
        {
          id: "c",
          label: "A la izquierda y al sur: cuadrante III",
          incorrectFeedback: "La ordenada es $2$, positiva: está **por encima** del eje X (al norte), no por debajo.",
        },
        {
          id: "d",
          label: "A $2$ unidades a la izquierda y $4$ al norte",
          incorrectFeedback: "Has invertido el orden: la primera coordenada ($-4$) es la abscisa, el desplazamiento horizontal.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x = -4$ (a la izquierda) e $y = 2$ (arriba): está en el cuadrante II, a $400$ m al oeste y $200$ m al norte de la entrada.",
    },
  ],
};
