import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNoLinealesLesson: InteractiveLesson = {
  slug: "sistemas-no-lineales",
  title: "4. Sistemas no lineales",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      help: [
        {
          label: "¿Qué lo hace no lineal?",
          message: "Que alguna ecuación no sea de primer grado: $x^2$, $y^2$, $xy$, raíces o incógnitas en el denominador.",
        },
        {
          label: "¿Por qué hay que comprobar?",
          message: "Al elevar al cuadrado o quitar denominadores pueden aparecer valores que no cumplen el sistema original.",
        },
        {
          label: "Mismos métodos",
          message: "Sustitución o reducción siguen valiendo; solo cambia que a veces sale una ecuación de segundo grado.",
        },
      ],
      title: "¿Qué es un sistema no lineal?",
      content: [
        "Un sistema es **no lineal** cuando al menos una ecuación no es de primer grado: contiene $x^2$, $y^2$, $x \\cdot y$, raíces o incógnitas en el denominador.",
        "Se resuelven con los mismos métodos (sustitución, reducción…), pero hay que **comprobar** las soluciones al final.",
      ],
      warning:
        "Si hay raíces o incógnitas en el denominador, pueden aparecer soluciones falsas. ¡Comprueba siempre en el sistema original!",
      visuals: [
        {
          kind: "cards",
          title: "¿Lineal o no lineal?",
          items: [
            { title: "Lineal", math: "2x + y = 3", caption: "Letras solas, sin potencias.", tone: "emerald" },
            { title: "No lineal", math: "x^2 + y^2 = 5", caption: "Hay cuadrados.", tone: "amber" },
            { title: "No lineal", math: "x \\cdot y = 6", caption: "Las letras se multiplican.", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué despejo en la lineal?",
          message: "Porque es la más fácil de despejar y no genera una ecuación más complicada.",
        },
        {
          label: "¿Por qué salen dos soluciones?",
          message: "Una ecuación de segundo grado puede tener dos raíces. Cada una da una $x$ y, con ella, una $y$.",
        },
        {
          label: "Cuidado al desarrollar",
          message: "$(1 + x)^2$ no es $1 + x^2$: es $1 + 2x + x^2$.",
        },
      ],
      title: "Ejemplo resuelto del libro",
      content: [
        "Resolvemos el sistema del ejercicio resuelto. Avanza paso a paso:",
      ],
      math: ["\\begin{cases} y - x = 1 \\\\ x^2 + y^2 = 5 \\end{cases}"],
      frames: [
        {
          caption: "Despejamos $y$ en la ecuación lineal:",
          math: "y = 1 + x",
        },
        {
          caption: "Sustituimos en la ecuación no lineal:",
          math: "x^2 + (1 + x)^2 = 5",
        },
        {
          caption: "Desarrollamos y simplificamos:",
          math: "x^2 + 1 + 2x + x^2 = 5 \\implies 2x^2 + 2x - 4 = 0",
        },
        {
          caption: "Dividimos entre 2:",
          math: "x^2 + x - 2 = 0",
        },
        {
          caption: "Resolvemos la ecuación de 2.º grado:",
          math: "x_1 = 1,\\quad x_2 = -2",
        },
        {
          caption: "Hallamos $y$ con $y = 1 + x$:",
          math: "y_1 = 2,\\quad y_2 = -1",
        },
        {
          caption: "Soluciones del sistema:",
          math: "(1, 2) \\quad\\text{y}\\quad (-2, -1)",
        },
      ],
    },
    {
      id: "grafica-parcial",
      type: "interactive_tool",
      help: [
        {
          label: "¿Qué muestra la recta?",
          message: "Todos los puntos que cumplen $y - x = 1$. Las soluciones del sistema tienen que estar sobre ella.",
        },
        {
          label: "¿Y la circunferencia?",
          message: "$x^2 + y^2 = 5$ es una circunferencia con centro en el origen. Los puntos de corte con la recta son las soluciones.",
        },
      ],
      title: "La parte lineal del sistema",
      tool: "system-graph",
      content: [
        "La ecuación $y - x = 1$ es una recta. Las soluciones del sistema deben estar sobre ella. La segunda ecuación ($x^2 + y^2 = 5$) sería una circunferencia; aquí ves la recta donde buscamos los puntos de corte.",
      ],
      graph: {
        lines: [
          { id: "r1", label: "$y - x = 1$", form: "standard", a: -1, b: 1, c: 1, color: "#2f5fe0" },
        ],
        highlightPoints: [
          { x: 1, y: 2, label: "(1, 2)" },
          { x: -2, y: -1, label: "(-2, -1)" },
        ],
        xMin: -4,
        xMax: 3,
        yMin: -3,
        yMax: 4,
      },
    },
    {
      id: "check-tipo",
      type: "classify",
      help: [
        {
          label: "¿Qué hace lineal a un sistema?",
          message: "Que todas sus ecuaciones sean de primer grado: las incógnitas con exponente $1$ y sin multiplicarse entre sí.",
        },
        {
          label: "Detectores rápidos",
          message: "$x^2$, $y^2$ o $xy$ delatan una ecuación no lineal. Basta una de ellas para que el sistema entero deje de ser lineal.",
          math: ["x^2 \\quad y^2 \\quad xy \\quad \\text{(no lineales)}"],
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Clasifica cada sistema como lineal o no lineal.",
      groups: [
        { id: "lineal", label: "Lineal", tone: "cobalt" },
        { id: "no-lineal", label: "No lineal", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$y - x = 1$ / $2x + y = 3$", group: "lineal" },
        { id: "b", text: "$y - x = 1$ / $x^2 + y^2 = 5$", group: "no-lineal" },
        { id: "c", text: "$3x + 2y = 0$ / $x - y = 4$", group: "lineal" },
        { id: "d", text: "$xy = 6$ / $x + y = 5$", group: "no-lineal" },
        { id: "e", text: "$y = x^2$ / $y = 4$", group: "no-lineal" },
        { id: "f", text: "$x = 3$ / $y = -1$", group: "lineal" },
      ],
      hint: "Busca incógnitas al cuadrado o multiplicadas entre sí: basta una ecuación así para que el sistema no sea lineal.",
      explanation:
        "Son no lineales los que tienen alguna ecuación de grado mayor que $1$: $x^2 + y^2 = 5$, $xy = 6$ o $y = x^2$. En los lineales todas las incógnitas aparecen con exponente $1$ y sin multiplicarse.",
    },
    {
      id: "despejar",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué quiero conseguir?",
          message: "Dejar $y$ sola en un miembro de la igualdad.",
        },
        {
          label: "¿Qué le hace la $x$ a la $y$?",
          message: "Le está restando. Para quitarla, haz la operación inversa en los dos miembros y fíjate bien en el signo.",
        },
      ],
      title: "Practica — Despejar",
      question: "Si despejamos $y$ en $y - x = 1$, obtenemos: $y =$",
      correctAnswers: ["1 + x", "x + 1", "1+x", "x+1"],
      hint: "Suma $x$ a ambos lados.",
      explanation: "$y = 1 + x$.",
    },
    {
      id: "soluciones",
      type: "classify",
      help: [
        {
          label: "Un par solo vale si cumple las dos",
          message: "Sustituye el par en cada ecuación. Es solución del sistema únicamente si salen dos igualdades verdaderas.",
        },
        {
          label: "Una estrategia ordenada",
          message: "Prueba primero con la ecuación más sencilla. Si el par la incumple, ya puedes descartarlo sin mirar la otra.",
        },
        {
          label: "Ojo con el orden y los signos",
          message: "En $(x, y)$ el primer número es $x$. Y cuidado: $(-2)^2 = 4$, no $-4$.",
          math: ["(-2)^2 = (-2)(-2) = 4"],
        },
      ],
      title: "Practica — Soluciones completas",
      question:
        "Sustituye cada par $(x, y)$ en el sistema $\\begin{cases} y - x = 1 \\\\ x^2 + y^2 = 5 \\end{cases}$ y clasifícalo.",
      groups: [
        { id: "si", label: "Es solución del sistema", tone: "emerald" },
        { id: "no", label: "No es solución", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$(1, 2)$", group: "si" },
        { id: "b", text: "$(-2, -1)$", group: "si" },
        { id: "c", text: "$(2, 1)$", group: "no" },
        { id: "d", text: "$(-1, -2)$", group: "no" },
        { id: "e", text: "$(0, 1)$", group: "no" },
        { id: "f", text: "$(1, -2)$", group: "no" },
      ],
      hint: "Un par es solución solo si cumple **las dos** ecuaciones a la vez. Empieza por $y - x = 1$, que es la más rápida.",
      explanation:
        "$(1, 2)$ y $(-2, -1)$ cumplen $y - x = 1$ y $x^2 + y^2 = 5$. $(2, 1)$ y $(-1, -2)$ dan $y - x = -1$; $(0, 1)$ cumple la primera pero $0 + 1 \\neq 5$; $(1, -2)$ cumple la segunda pero $-2 - 1 = -3$.",
    },
  ],
};
