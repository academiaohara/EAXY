import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadEspacioMuestralLesson: InteractiveLesson = {
  slug: "probabilidad-espacio-muestral",
  title: "2. Espacio muestral y sucesos elementales",
  subtitle: TEMA_15_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Una lista de todo lo que puede pasar",
          message: "El espacio muestral es esa lista completa, sin repetir ni olvidar nada.",
        },
        {
          label: "Resultado frente a suceso",
          message: "Un suceso elemental es un solo resultado. Un suceso puede agrupar varios, como «par» en un dado.",
        },
      ],
      title: "Espacio muestral",
      blocks: [
        {
          kind: "definition",
          text: "El **espacio muestral** $E$ es el conjunto de **todos los resultados posibles** de un experimento aleatorio. Cada resultado es un **suceso elemental**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "E = \\{c, x\\}", label: "moneda: 2 elementales" },
            { tex: "E = \\{1, \\ldots, 6\\}", label: "dado: 6 elementales" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "espacio-muestral", beatMs: 3200 },
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "¿Qué es el espacio muestral?",
          message: "El conjunto de todos los resultados posibles del experimento, uno por uno.",
        },
        {
          label: "Resultado frente a suceso",
          message: "Un resultado es una sola cara. Un suceso puede agrupar varias («par»). Solo los resultados individuales forman el espacio muestral.",
        },
      ],
      title: "Comprueba lo aprendido",
      question:
        "Lanzamos un dado estándar de seis caras. ¿Qué elementos forman parte de su espacio muestral $E$?",
      groups: [
        { id: "dentro", label: "Es un elemento de $E$", tone: "emerald" },
        { id: "fuera", label: "No es un elemento de $E$", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$1$", group: "dentro" },
        { id: "b", text: "$0$", group: "fuera" },
        { id: "c", text: "$6$", group: "dentro" },
        { id: "d", text: "$7$", group: "fuera" },
        { id: "e", text: "$4$", group: "dentro" },
        { id: "f", text: "«Par»", group: "fuera" },
      ],
      hint: "Los elementos de $E$ son los resultados que puedes ver en la cara superior del dado, uno a uno.",
      explanation:
        "$E = \\{1, 2, 3, 4, 5, 6\\}$: cada cara es un suceso elemental. No incluye el $0$ ni el $7$, y «par» agrupa varios resultados ($\\{2, 4, 6\\}$), así que es un suceso, no un elemento de $E$.",
    },
    {
      id: "urna-tres",
      type: "slide",
      help: [
        {
          label: "¿Por qué importa el orden?",
          message: "Porque $(1,2,3)$ y $(3,2,1)$ son resultados distintos si distinguimos las extracciones.",
        },
        {
          label: "¿Por qué crece tan rápido?",
          message: "Cada bola extra multiplica las posibilidades: por eso el espacio muestral se hace enorme enseguida.",
        },
      ],
      title: "Sacar bolas de una urna",
      blocks: [
        {
          kind: "text",
          text: "Sacamos **tres bolas**, sin devolverlas, de una urna con las bolas $1$, $2$ y $3$. Si distinguimos el orden de extracción, $(1, 2, 3)$ y $(3, 2, 1)$ son resultados distintos.",
        },
        {
          kind: "example",
          title: "Espacio muestral",
          lines: [
            { math: "E = \\{(1,2,3),\\ (1,3,2),\\ (2,1,3),\\ (2,3,1),\\ (3,1,2),\\ (3,2,1)\\}" },
            { math: "|E| = 3 \\cdot 2 \\cdot 1 = 6", note: "tres opciones para la primera, dos para la segunda y una para la tercera" },
          ],
        },
        {
          kind: "warning",
          text: "El número de resultados crece muy rápido al añadir bolas o extracciones.",
        },
      ],
    },
    {
      id: "check-octaedro",
      type: "fill_in_blank",
      help: [
        {
          label: "Una cara, un resultado",
          message: "Cada cara que puede quedar arriba es un resultado distinto.",
        },
        {
          label: "Cuenta las caras",
          message: "Un octaedro tiene tantas caras como indica «octa».",
        },
      ],
      title: "Un dado de ocho caras",
      question:
        "Lanzamos un dado en forma de octaedro, con las caras numeradas del 1 al 8. ¿Cuántos sucesos elementales tiene su espacio muestral? (solo el número)",
      correctAnswers: ["8", "ocho"],
      hint: "Cada cara es un suceso elemental.",
      explanation: "$E = \\{1, 2, 3, 4, 5, 6, 7, 8\\}$: hay $8$ sucesos elementales, equiprobables si el dado está equilibrado.",
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cuál es la suma menor?",
          message: "Cada dado da al menos $1$, así que la suma mínima es $1 + 1$.",
        },
        {
          label: "Desde el menor hasta el mayor",
          message: "Las sumas posibles van de $2$ a $12$, de uno en uno. Cuéntalas.",
        },
      ],
      title: "Sumar dos dados",
      question:
        "Lanzamos dos dados y sumamos los puntos. ¿Cuántos resultados distintos puede tener la suma? (solo el número)",
      correctAnswers: ["11", "once"],
      hint: "Las sumas van de $2$ a $12$.",
      explanation: "$E = \\{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\\}$: $11$ sumas posibles. Ojo: no todas son igual de probables.",
    },
  ],
};
