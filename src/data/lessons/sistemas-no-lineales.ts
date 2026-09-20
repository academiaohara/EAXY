import type { InteractiveLesson } from "@/lib/lesson/types";

export const sistemasNoLinealesLesson: InteractiveLesson = {
  slug: "sistemas-no-lineales",
  title: "Sistemas de ecuaciones no lineales",
  subtitle: "4.º ESO A · Tema 7 — Sistemas de ecuaciones",
  steps: [
    {
      id: "intro",
      title: "¿Qué es un sistema no lineal?",
      type: "multiple_choice",
      content: [
        "Un sistema de ecuaciones es **no lineal** cuando al menos una de sus ecuaciones no es de primer grado: contiene $x^2$, $y^2$, $x \\cdot y$, raíces o incógnitas en el denominador.",
      ],
      question: "¿Cuál de los siguientes sistemas es NO lineal?",
      options: [
        { id: "a", text: "$y - x = 1$ / $2x + y = 3$" },
        { id: "b", text: "$y - x = 1$ / $x^2 + y^2 = 5$" },
        { id: "c", text: "$3x + 2y = 0$ / $x - y = 4$" },
      ],
      correctOptionId: "b",
      explanation:
        "El sistema B contiene $x^2 + y^2 = 5$, una ecuación de segundo grado. Los otros dos solo tienen términos de primer grado.",
    },
    {
      id: "metodos",
      title: "¿Cómo los resolvemos?",
      type: "multiple_choice",
      content: [
        "El método más habitual es el de **sustitución**: despejar una incógnita en la ecuación lineal y sustituirla en la no lineal. También se puede usar **reducción**.",
      ],
      warning:
        "Si hay raíces o incógnitas en el denominador, pueden surgir soluciones falsas. ¡Siempre hay que comprobar el resultado al final!",
      question:
        "Si un sistema no lineal contiene raíces cuadradas, no es necesario comprobar las soluciones obtenidas.",
      options: [
        { id: "true", text: "Verdadero" },
        { id: "false", text: "Falso" },
      ],
      correctOptionId: "false",
      explanation:
        "Falso. Las raíces y los denominadores con incógnitas pueden introducir soluciones que no verifican el sistema original.",
    },
    {
      id: "despejar",
      title: "Ejercicio guiado — Paso 1: Despejar",
      type: "fill_in_blank",
      content: ["Resolvemos el sistema:"],
      math: ["y - x = 1", "x^2 + y^2 = 5"],
      question: "Si despejamos $y$ en la primera ecuación ($y - x = 1$), obtenemos: $y =$",
      correctAnswers: ["1 + x", "x + 1", "1+x", "x+1"],
      hint: "Suma $x$ a ambos lados de $y - x = 1$.",
      explanation: "Despejando: $y - x = 1 \\implies y = 1 + x$ (equivalente a $y = x + 1$).",
    },
    {
      id: "sustituir",
      title: "Ejercicio guiado — Paso 2: Sustituir y simplificar",
      type: "multiple_choice",
      content: ["Sustituimos $y = 1 + x$ en $x^2 + y^2 = 5$:"],
      math: [
        "x^2 + (1 + x)^2 = 5",
        "x^2 + 1 + 2x + x^2 = 5 \\implies 2x^2 + 2x - 4 = 0",
        "x^2 + x - 2 = 0",
      ],
      question: "¿Cuáles son los valores de $x$ al resolver $x^2 + x - 2 = 0$?",
      options: [
        { id: "a", text: "$x_1 = 1$, $x_2 = -2$" },
        { id: "b", text: "$x_1 = 2$, $x_2 = -1$" },
        { id: "c", text: "$x_1 = 0$, $x_2 = 2$" },
      ],
      correctOptionId: "a",
      explanation:
        "Factorizando $(x + 2)(x - 1) = 0$ obtenemos $x = -2$ o $x = 1$.",
    },
    {
      id: "soluciones",
      title: "Ejercicio guiado — Paso 3: Hallar $y$ y comprobar",
      type: "multiple_choice",
      content: ["Sustituimos los valores de $x$ en $y = 1 + x$:"],
      math: [
        "x_1 = 1 \\implies y_1 = 1 + 1 = 2",
        "x_2 = -2 \\implies y_2 = 1 + (-2) = -1",
      ],
      question: "¿Cuáles son los pares de soluciones completos $(x, y)$ del sistema?",
      options: [
        { id: "a", text: "$(1, 2)$ y $(-2, -1)$" },
        { id: "b", text: "$(2, 1)$ y $(-1, -2)$" },
      ],
      correctOptionId: "a",
      explanation:
        "Las soluciones del sistema son $(1, 2)$ y $(-2, -1)$. Comprueba sustituyendo en ambas ecuaciones originales.",
    },
  ],
};

export const interactiveLessons = {
  "sistemas-no-lineales": sistemasNoLinealesLesson,
} as const;

export type InteractiveLessonSlug = keyof typeof interactiveLessons;
