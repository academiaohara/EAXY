import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const sistemasGauss1bachLesson: InteractiveLesson = {
  slug: "sistemas-gauss-1bach",
  title: "12. Sistemas lineales: el método de Gauss",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Geometría", message: "Cada ecuación lineal con tres incógnitas es un **plano** en el espacio. Resolver el sistema es buscar los puntos comunes a los tres planos." }],
      title: "Escalonar un sistema",
      blocks: [
        { kind: "definition", text: "El **método de Gauss** transforma un sistema en otro **equivalente** (con las mismas soluciones) en forma de escalera: la 1.ª ecuación tiene tres incógnitas, la 2.ª dos y la 3.ª una. Se resuelve de abajo arriba." },
        { kind: "rule", title: "Transformaciones permitidas", text: "Intercambiar dos ecuaciones; multiplicar una por un número **distinto de cero**; sumar a una ecuación un múltiplo de otra. Con ellas el sistema sigue siendo equivalente." },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 1, 1, 6, 2, -1, 1, 3, 1, 2, -1, 2] } },
    },
    {
      id: "check-permitido",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Multiplicar por $0$ convierte la ecuación en $0 = 0$ y se pierde la información." }],
      title: "¿Qué no está permitido?",
      question: "Una de estas operaciones **no** conserva las soluciones del sistema. ¿Cuál?",
      choices: [
        { id: "a", label: "Multiplicar una ecuación por $0$" },
        { id: "b", label: "Intercambiar la 1.ª y la 3.ª ecuación", incorrectFeedback: "El orden de las ecuaciones no cambia las soluciones: sí está permitido." },
        { id: "c", label: "Multiplicar una ecuación por $-3$", incorrectFeedback: "Multiplicar por un número no nulo sí está permitido." },
        { id: "d", label: "Restar a la 2.ª el doble de la 1.ª", incorrectFeedback: "Sumar a una ecuación un múltiplo de otra sí está permitido: es lo que se usa en Gauss." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Multiplicar por $0$ destruye la ecuación (queda $0 = 0$). Por eso el multiplicador debe ser distinto de cero.",
    },
    {
      id: "check-y",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El sistema escalonado da primero $z$, después $y$ y por último $x$. En el sistema de la animación $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$." }],
      title: "Valor de y",
      question: "El sistema $x + y + z = 6$, $2x - y + z = 3$, $x + 2y - z = 2$ tiene solución única. ¿Cuánto vale $y$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Resulta $x = 1$, $y = 2$, $z = 3$. Comprobación en la 2.ª: $2 - 2 + 3 = 3$ ✓.",
    },
    {
      id: "otro",
      type: "slide",
      help: [{ label: "Tamaño", message: "El método sirve igual con más ecuaciones e incógnitas: es el mismo procedimiento de «eliminar hacia abajo»." }],
      title: "Otro sistema: x + 2y + 3z = 1",
      blocks: [
        { kind: "example", title: "Sistema", lines: [
          { math: "x + 2y + 3z = 1" },
          { math: "2x - 3y - 2z = 3" },
          { math: "-x + 2y + 4z = -4" },
        ] },
        { kind: "text", text: "La primera ecuación **no cambia**. Se usa para eliminar $x$ de las otras dos; después, la segunda sirve para eliminar $y$ de la tercera." },
      ],
      visual: { kind: "anim", scene: "gauss-eliminacion", params: { nums: [1, 2, 3, 1, 2, -3, -2, 3, -1, 2, 4, -4] } },
    },
    {
      id: "check-z",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La última ecuación del sistema escalonado tiene solo $z$. Sustituye hacia arriba para comprobar." }],
      title: "Valor de z",
      question: "El sistema $x + 2y + 3z = 1$, $2x - 3y - 2z = 3$, $-x + 2y + 4z = -4$ tiene solución única. ¿Cuánto vale $z$? (solo el número)",
      correctAnswers: ["-1", "−1"],
      explanation: "La solución es $x = 2$, $y = 1$, $z = -1$. Comprobación en la 1.ª: $2 + 2 - 3 = 1$ ✓.",
    },
  ],
};
