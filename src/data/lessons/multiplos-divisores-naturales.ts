import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const multiplosDivisoresNaturalesLesson: InteractiveLesson = {
  slug: "multiplos-divisores-naturales",
  title: "2. Múltiplos y divisores",
  subtitle: TEMA_3_SUBTITLE,
  steps: [
    {
      id: "multiplos",
      type: "concept",
      title: "Múltiplos de un número",
      content: [
        "Los **múltiplos** de $a$ son los números $a \\cdot k$ con $k$ natural: $20, 40, 60, 80\\ldots$ son múltiplos de $20$.",
        "Todo número es múltiplo de sí mismo y de $1$. Un número distinto de cero tiene infinitos múltiplos.",
        "En el temario se anota un múltiplo de $7$ con un punto sobre el número: $\\overset{\\cdot}{7}$ significa «múltiplo de $7$».",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Saltos de 20 cm",
          rows: [
            { text: "1.er salto", math: "20 \\cdot 1 = 20" },
            { text: "2.º salto", math: "20 \\cdot 2 = 40" },
            { text: "3.er salto", math: "20 \\cdot 3 = 60" },
          ],
        },
      ],
    },
    {
      id: "divisores",
      type: "concept",
      title: "Divisores de un número",
      content: [
        "Los **divisores** de $a$ son los números que lo dividen con resto $0$. Para $20$ alumnos en equipos iguales: $1, 2, 4, 5, 10, 20$.",
        "Los divisores forman parejas cuyo producto es $a$: $1 \\cdot 20$, $2 \\cdot 10$, $4 \\cdot 5$.",
        "Para buscarlos probamos divisiones exactas: $30 : 1$, $30 : 2$, $30 : 3$… y nos quedamos con las que den resto $0$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Divisores de 20",
          items: [
            { title: "Pareja 1", math: "1 \\cdot 20", tone: "cobalt" },
            { title: "Pareja 2", math: "2 \\cdot 10", tone: "violet" },
            { title: "Pareja 3", math: "4 \\cdot 5", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "buscar-30",
      type: "animated_solution",
      title: "Divisores de 30",
      content: ["Seguimos el método del libro para listar todos los divisores de $30$."],
      frames: [
        {
          caption: "Probamos divisores pequeños:",
          math: "30 : 1 = 30,\\; 30 : 2 = 15,\\; 30 : 3 = 10,\\; 30 : 4 \\text{ no},\\; 30 : 5 = 6",
        },
        {
          caption: "Lista completa (sin repetir parejas):",
          math: "1,\\; 2,\\; 3,\\; 5,\\; 6,\\; 10,\\; 15,\\; 30",
        },
      ],
    },
    {
      id: "check-multiplos",
      type: "fill_in_blank",
      title: "Múltiplos",
      question: "Escribe un múltiplo de 12 mayor que 50 y menor que 70 (solo el número).",
      correctAnswers: ["60"],
      hint: "Prueba $12 \\cdot 5$, $12 \\cdot 6$…",
      explanation: "$60 = 12 \\cdot 5$ es el único múltiplo de $12$ estrictamente entre $50$ y $70$.",
    },
    {
      id: "check-divisores",
      type: "multiple_choice",
      title: "Divisores",
      question: "¿Cuántos divisores tiene el número primo 13?",
      options: [
        { id: "a", text: "1" },
        { id: "b", text: "2" },
        { id: "c", text: "13" },
      ],
      correctOptionId: "b",
      explanation: "Un primo solo tiene dos divisores: $1$ y él mismo.",
    },
  ],
};
