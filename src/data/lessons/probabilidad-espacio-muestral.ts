import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadEspacioMuestralLesson: InteractiveLesson = {
  slug: "probabilidad-espacio-muestral",
  title: "2. Espacio muestral y sucesos elementales",
  subtitle: TEMA_15_SUBTITLE,
  steps: [
    {
      id: "definicion",
      type: "concept",
      title: "Espacio muestral",
      content: [
        "El **espacio muestral** $E$ es el conjunto de **todos los resultados posibles** de un experimento aleatorio.",
        "Cada resultado individual se llama **suceso elemental**.",
        "Ejemplos clásicos del temario:",
        "— Moneda: $E = \\{\\text{cara},\\ \\text{cruz}\\}$; sucesos elementales: cara ($c$) y cruz ($x$).",
        "— Dado de seis caras: $E = \\{1, 2, 3, 4, 5, 6\\}$; cada número es un suceso elemental.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Moneda",
          rows: ["E = \\{\\text{cara},\\ \\text{cruz}\\}"],
          operator: "\\Rightarrow",
          result: "2\\ \\text{sucesos elementales}",
          caption: "Todos los resultados posibles del experimento.",
        },
      ],
    },
    {
      id: "tetraedro",
      type: "animated_solution",
      title: "Dado de ocho caras",
      content: [
        "Tenemos un dado en forma de octaedro con caras numeradas del $1$ al $8$. Lo lanzamos una vez.",
      ],
      frames: [
        {
          caption: "a) Espacio muestral:",
          math: "E = \\{1, 2, 3, 4, 5, 6, 7, 8\\}",
        },
        {
          caption: "b) Sucesos elementales:",
          math: "1,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6,\\ 7\\ \\text{y}\\ 8",
        },
        {
          caption: "Hay $8$ resultados equiprobables (una cara por resultado).",
          math: "|E| = 8",
        },
      ],
    },
    {
      id: "urna-tres",
      type: "concept",
      title: "Sacar bolas de una urna",
      content: [
        "Sacamos **tres bolas**, sin volver a meter la bola extraída, de una urna con bolas $1$, $2$ y $3$.",
        "El orden importa si distinguimos extracciones: por ejemplo $(1,2,3)$ es distinto de $(3,2,1)$.",
        "En el temario se listan todas las ternas posibles sin repetición; el número de resultados crece rápido cuando aumentan las bolas o extracciones.",
      ],
    },
    {
      id: "suma-dados",
      type: "animated_solution",
      title: "Sumar dos dados",
      content: ["Lanzamos dos dados y **sumamos** los puntos. ¿Cuántos resultados distintos hay?"],
      frames: [
        {
          caption: "La suma mínima es $1+1=2$ y la máxima $6+6=12$.",
          math: "2 \\leq \\text{suma} \\leq 12",
        },
        {
          caption: "Valores posibles de la suma:",
          math: "E = \\{2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\\}",
        },
        {
          caption: "Número de resultados distintos:",
          math: "|E| = 11",
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "Al lanzar un dado estándar de seis caras, ¿cuál es el espacio muestral?",
      options: [
        { id: "a", text: "$E = \\{0, 1, 2, 3, 4, 5, 6\\}$" },
        { id: "b", text: "$E = \\{1, 2, 3, 4, 5, 6\\}$" },
        { id: "c", text: "$E = \\{\\text{par}, \\text{ impar}\\}$" },
      ],
      correctOptionId: "b",
      explanation: "Cada cara del dado es un suceso elemental; no incluye el $0$ ni agrupa resultados.",
    },
  ],
};
