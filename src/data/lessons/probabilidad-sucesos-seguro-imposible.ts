import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadSucesosSeguroImposibleLesson: InteractiveLesson = {
  slug: "probabilidad-sucesos-seguro-imposible",
  title: "3. Sucesos, suceso seguro e imposible",
  subtitle: TEMA_15_SUBTITLE,
  steps: [
    {
      id: "suceso",
      type: "concept",
      title: "¿Qué es un suceso?",
      content: [
        "Un **suceso** está formado por **uno o varios sucesos elementales** del experimento.",
        "Ejemplo: al lanzar un dado, «salir número par» es el suceso $\\{2, 4, 6\\}$.",
        "«Salir un $5$» es el suceso $\\{5\\}$ (un solo elemental).",
      ],
    },
    {
      id: "seguro-imposible",
      type: "concept",
      title: "Suceso seguro e imposible",
      content: [
        "El **suceso seguro** contiene **todos** los sucesos elementales de $E$. **Siempre** ocurre.",
        "El **suceso imposible** no contiene ningún elemental. **Nunca** ocurre.",
        "Al lanzar un dado: «obtener un número menor que $7$» es **seguro**; «obtener el $30$» es **imposible**.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "En un dado de seis caras",
          items: [
            {
              title: "Seguro",
              math: "\\text{«Menor que } 7\\text{»}",
              caption: "Incluye $\\{1,\\ldots,6\\}$",
              tone: "emerald",
            },
            {
              title: "Imposible",
              math: "\\text{«Sale } 30\\text{»}",
              caption: "Ningún elemental",
              tone: "rose",
            },
          ],
        },
      ],
    },
    {
      id: "cartas",
      type: "animated_solution",
      title: "Sucesos en cartas del 1 al 8",
      content: [
        "Tenemos ocho cartas numeradas del $1$ al $8$. Sacamos una carta al azar. Escribimos los sucesos elementales de cada suceso.",
      ],
      frames: [
        {
          caption: "a) Número par:",
          math: "\\{2, 4, 6, 8\\}",
        },
        {
          caption: "b) Múltiplo de $3$:",
          math: "\\{3, 6\\}",
        },
        {
          caption: "c) Número mayor que $4$:",
          math: "\\{5, 6, 7, 8\\}",
        },
      ],
    },
    {
      id: "baraja",
      type: "concept",
      title: "Baraja española (40 cartas)",
      content: [
        "En una baraja española de $40$ cartas, ejemplos de sucesos:",
        "— «Sacar oros»: $10$ cartas (todas las de oros).",
        "— «Sacar un $5$»: $4$ cartas (uno por palo).",
        "— «Sacar figura»: rey, caballo o sota en cualquier palo.",
        "Cada lista de cartas que cumple la condición es un suceso formado por varios elementales.",
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question:
        "En una bolsa con $2$ bolas rojas y $3$ verdes, ¿qué tipo de suceso es «sacar una bola azul»?",
      options: [
        { id: "a", text: "Suceso seguro" },
        { id: "b", text: "Suceso imposible" },
        { id: "c", text: "Suceso elemental" },
      ],
      correctOptionId: "b",
      explanation: "No hay bolas azules en la bolsa; el suceso no tiene ningún resultado posible.",
    },
  ],
};
