import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_2_SUBTITLE } from "@/data/lessons/shared";

export const factorizacionPolinomios4esobLesson: InteractiveLesson = {
  slug: "factorizacion-polinomios-4esob",
  title: "9. Factorización de polinomios",
  subtitle: TEMA_4ESOB_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [
        { label: "Menor grado posible", message: "Factorizar es descomponer en producto de factores que ya no se puedan dividir más (con coeficientes que sabemos encontrar)." },
        { label: "Cada raíz, un factor", message: "Si $a$ es raíz de $P$, entonces $(x - a)$ es un factor de $P$." },
      ],
      title: "Cómo se factoriza",
      blocks: [
        { kind: "definition", text: "**Factorizar** un polinomio es escribirlo como producto de polinomios del **menor grado posible**." },
        { kind: "steps", title: "Orden recomendado", items: ["**Factor común**, si lo hay.", "**Identidades notables** (diferencia de cuadrados, cuadrado de un binomio).", "**Ruffini** con los divisores del término independiente.", "Si queda un polinomio de segundo grado, **ecuación de segundo grado**; si no tiene raíces, se deja como factor."] },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x⁴ − x³ − 20x²"], active: [0, 0], note: "todos los términos tienen $x^2$: factor común." },
            { tokens: ["x²", "(x² − x − 20)"], active: [1, 1], note: "$x^2 - x - 20 = 0$ da $x = 5$ y $x = -4$." },
            { tokens: ["x²", "(x − 5)", "(x + 4)"], fresh: [0, 2], note: "factorizado: $x^2(x - 5)(x + 4)$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "ruffini-factor",
      type: "slide",
      help: [
        { label: "Prueba por orden", message: "Los divisores de $2$ son $\\pm 1, \\pm 2$. Se prueba hasta encontrar resto $0$; luego se sigue con el cociente." },
        { label: "Después de cada raíz", message: "Se busca en el **cociente** (de grado menor), no en el polinomio original." },
      ],
      title: "Factorizar con Ruffini",
      blocks: [
        { kind: "text", text: "Para $P(x) = 4x^4 - 4x^3 - 9x^2 + x + 2$ se prueban los divisores de $2$. El $1$ no es raíz; el $-1$ sí lo es. Se repite la búsqueda con el cociente." },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["4x⁴ − 4x³ − 9x² + x + 2"], active: [0, 0], note: "Ruffini con $a = -1$: resto $0$, cociente $4x^3 - 8x^2 - x + 2$." },
            { tokens: ["(x + 1)", "(4x³ − 8x² − x + 2)"], active: [1, 1], note: "Ruffini con $a = 2$ en el cociente: resto $0$, cociente $4x^2 - 1$." },
            { tokens: ["(x + 1)", "(x − 2)", "(4x² − 1)"], active: [2, 2], note: "$4x^2 - 1$ es una diferencia de cuadrados: $(2x + 1)(2x - 1)$." },
            { tokens: ["(x + 1)", "(x − 2)", "(2x + 1)", "(2x − 1)"], fresh: [0, 3], note: "cuatro factores de primer grado: las raíces son $-1, 2, -1/2, 1/2$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-suma-raices",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Prueba el 1", message: "$1 - 6 + 11 - 6 = 0$: el $1$ es raíz. Divide por $x - 1$ y resuelve el cociente $x^2 - 5x + 6$." }],
      title: "Las raíces de un cúbico",
      question: "Factoriza $x^3 - 6x^2 + 11x - 6$. Tiene tres raíces enteras distintas. ¿Cuánto suman? (solo el número)",
      correctAnswers: ["6"],
      explanation: "Ruffini con $a = 1$ da $x^2 - 5x + 6 = (x - 2)(x - 3)$. Así $P(x) = (x - 1)(x - 2)(x - 3)$ y las raíces $1 + 2 + 3 = 6$.",
    },
    {
      id: "check-segundo-grado",
      type: "predict",
      mode: "choice",
      help: [{ label: "Raíces", message: "$3x^2 + 2x - 8 = 0$ da $x = 4/3$ y $x = -2$. Entonces $3(x - 4/3)(x + 2) = (3x - 4)(x + 2)$." }],
      title: "Un trinomio con coeficiente principal",
      question: "¿Cómo se factoriza $3x^2 + 2x - 8$?",
      choices: [
        { id: "a", label: "$(3x - 4)(x + 2)$" },
        { id: "b", label: "$(x - 4)(x + 2)$", incorrectFeedback: "Al desarrollar, el coeficiente de $x^2$ sería $1$, no $3$. Falta el $3$ que acompaña a la raíz $4/3$." },
        { id: "c", label: "$(3x + 4)(x - 2)$", incorrectFeedback: "Las raíces serían $-4/3$ y $2$; aquí son $4/3$ y $-2$." },
        { id: "d", label: "$3(x + 2)(x + 4)$", incorrectFeedback: "Esas raíces serían $-2$ y $-4$; $-4$ no es raíz." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Raíces $x = 4/3$ y $x = -2$: $3(x - \\tfrac{4}{3})(x + 2) = (3x - 4)(x + 2)$.",
    },
    {
      id: "especiales",
      type: "slide",
      help: [{ label: "Raíz doble", message: "Si un factor se repite, $(x - a)^2$, la raíz $a$ es doble. Al hacer Ruffini, vuelve a dar resto $0$ con el mismo $a$." }],
      title: "Raíces dobles y polinomios que no se descomponen",
      blocks: [
        { kind: "example", title: "Raíz doble", lines: [{ math: "x^3 - 6x^2 + 9x = x(x^2 - 6x + 9) = x(x - 3)^2", note: "0 y 3 (doble)" }] },
        { kind: "example", title: "Sin más raíces", lines: [{ math: "x^3 - x + 6 = (x + 2)(x^2 - 2x + 3)", note: "$x^2 - 2x + 3 = 0$ no tiene solución" }] },
        { kind: "warning", text: "Un factor de segundo grado **sin raíces reales** se deja tal cual: no se puede descomponer más." },
      ],
      visual: { kind: "tool", tool: "ruffini-explorador", initial: [1, -6, 9, 0, 3], hint: "Con a = 3 el resto es 0. Divide otra vez por x − 3 y comprueba que la raíz es doble." },
    },
    {
      id: "check-primera-raiz",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Factor común", message: "$x^3 - 2x^2 - 15x = x(x^2 - 2x - 15)$ y $x^2 - 2x - 15 = 0$ da $x = 5$ y $x = -3$." }],
      title: "Factor común y segundo grado",
      question: "Factoriza $x^3 - 2x^2 - 15x$ y escribe su raíz **positiva**. (solo el número)",
      correctAnswers: ["5"],
      explanation: "$x(x - 5)(x + 3)$: las raíces son $0$, $5$ y $-3$. La positiva es $5$.",
    },
    {
      id: "check-metodo",
      type: "classify",
      help: [{ label: "Por dónde empezar", message: "Mira primero si todos los términos comparten algo; luego si es una identidad conocida; si no, Ruffini." }],
      title: "¿Con qué empiezas?",
      question: "Elige el primer método que usarías para factorizar cada polinomio.",
      groups: [
        { id: "comun", label: "Factor común", tone: "cobalt" },
        { id: "identidad", label: "Identidad notable", tone: "emerald" },
        { id: "ruffini", label: "Ruffini", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$3x^3 - 12x$", group: "comun" },
        { id: "b", text: "$x^2 + 12x + 36$", group: "identidad" },
        { id: "c", text: "$4x^2 - 25$", group: "identidad" },
        { id: "d", text: "$x^3 - 2x^2 - 5x + 6$", group: "ruffini" },
        { id: "e", text: "$5x^4 - 20x^2$", group: "comun" },
        { id: "f", text: "$x^3 - 7x^2 + 8x + 16$", group: "ruffini" },
      ],
      hint: "Sin factor común ni identidad reconocible, toca Ruffini.",
    },
  ],
};
