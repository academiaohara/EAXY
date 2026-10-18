import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const resolucionSistemasLinealesLesson: InteractiveLesson = {
  slug: "resolucion-sistemas-lineales",
  title: "3. Resolución de sistemas lineales",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "metodos",
      type: "concept",
      title: "Tres métodos algebraicos",
      content: [
        "Cuando la solución gráfica no es evidente, usamos métodos algebraicos:",
        "**Sustitución**: despejar una incógnita y sustituir en la otra ecuación.",
        "**Igualación**: despejar la misma incógnita en ambas ecuaciones e igualar.",
        "**Reducción**: preparar las ecuaciones para que al sumarlas desaparezca una incógnita.",
      ],
      warning:
        "El método de sustitución es especialmente útil cuando una incógnita tiene coeficiente $1$ o $-1$.",
      visuals: [
        {
          kind: "cards",
          title: "La idea de cada método",
          items: [
            {
              title: "Sustitución",
              math: "3(15 - 2y) - 5y = 1",
              caption: "Despejo y meto en la otra.",
              tone: "cobalt",
            },
            {
              title: "Igualación",
              math: "15 - 2y = \\tfrac{1 + 5y}{3}",
              caption: "Despejo lo mismo en las dos e igualo.",
              tone: "violet",
            },
            {
              title: "Reducción",
              math: "\\cancel{3x} - \\cancel{3x} = 0",
              caption: "Sumo y una letra desaparece.",
              tone: "emerald",
            },
          ],
        },
      ],
    },
    {
      id: "sustitucion-animada",
      type: "animated_solution",
      title: "Ejemplo resuelto — Método de sustitución",
      content: [
        "Resolvemos el sistema del libro de texto. Pulsa **Ver siguiente paso** para seguir el razonamiento.",
      ],
      math: ["\\begin{cases} 3x - 5y = 1 \\\\ x + 2y = 15 \\end{cases}"],
      frames: [
        {
          caption: "1.º Despejamos $x$ en la segunda ecuación (es la más fácil):",
          math: "x = 15 - 2y",
        },
        {
          caption: "2.º Sustituimos en la primera ecuación:",
          math: "3(15 - 2y) - 5y = 1",
        },
        {
          caption: "3.º Resolvemos la ecuación con una sola incógnita:",
          math: "45 - 6y - 5y = 1 \\implies -11y = -44 \\implies y = 4",
        },
        {
          caption: "4.º Sustituimos $y = 4$ en $x = 15 - 2y$:",
          math: "x = 15 - 2 \\cdot 4 = 7",
        },
        {
          caption: "5.º Solución del sistema:",
          math: "x = 7,\\; y = 4",
        },
        {
          caption: "6.º Comprobación en el sistema original:",
          math: "3 \\cdot 7 - 5 \\cdot 4 = 1 \\quad\\checkmark \\qquad 7 + 2 \\cdot 4 = 15 \\quad\\checkmark",
        },
      ],
    },
    {
      id: "reduccion-concepto",
      type: "concept",
      title: "Método de reducción (idea clave)",
      content: [
        "Multiplicamos una o ambas ecuaciones para que una incógnita tenga el mismo coeficiente con signo opuesto.",
        "Al **sumar** las ecuaciones, esa incógnita desaparece y resolvemos la que queda.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Mira cómo desaparece la $x$",
          rows: ["\\cancel{3x} - 5y = 1", "\\cancel{-3x} - 6y = -45"],
          operator: "+",
          result: "-11y = -44",
          caption: "La 2.ª ecuación se ha multiplicado por $-3$ para que $3x$ y $-3x$ se anulen.",
        },
      ],
    },
    {
      id: "reduccion-animada",
      type: "animated_solution",
      title: "Ejemplo — Método de reducción",
      math: ["\\begin{cases} 3x - 5y = 1 \\\\ x + 2y = 15 \\end{cases}"],
      frames: [
        {
          caption: "Multiplicamos la 2.ª ecuación por $-3$ y sumamos:",
          math: "\\begin{cases} 3x - 5y = 1 \\\\ -3x - 6y = -45 \\end{cases} \\xrightarrow{\\text{suma}} -11y = -44",
        },
        {
          caption: "Despejamos $y$:",
          math: "y = 4",
        },
        {
          caption: "Sustituimos en $x + 2y = 15$:",
          math: "x + 8 = 15 \\implies x = 7",
        },
      ],
    },
    {
      id: "grafica-comprobacion",
      type: "interactive_tool",
      title: "Comprobación gráfica",
      tool: "system-graph",
      content: [
        "Las rectas del sistema se cortan en $(7, 4)$, la misma solución que obtuvimos por sustitución.",
      ],
      graph: {
        lines: [
          { id: "r1", label: "$3x - 5y = 1$", form: "standard", a: 3, b: -5, c: 1, color: "#2f5fe0" },
          { id: "r2", label: "$x + 2y = 15$", form: "standard", a: 1, b: 2, c: 15, color: "#c0392b" },
        ],
        highlightPoints: [{ x: 7, y: 4, label: "(7, 4)" }],
        xMin: 0,
        xMax: 10,
        yMin: 0,
        yMax: 10,
      },
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué significa despejar?",
          message: "Dejar la incógnita sola en un miembro de la igualdad, haciendo siempre lo mismo en los dos lados.",
        },
        {
          label: "¿Qué le hace el $2y$ a la $x$?",
          message: "Se está sumando a $x$. La operación inversa de sumar es restar: pasa el término al otro miembro cambiado de signo.",
        },
        {
          label: "¿Cómo compruebo mi despeje?",
          message: "Sustituye tu expresión en lugar de $x$ en $x + 2y$: tiene que volver a salir $15$, sea cual sea $y$.",
        },
      ],
      title: "Practica",
      question: "En $x + 2y = 15$, si despejamos $x$ obtenemos: $x =$",
      correctAnswers: ["15 - 2y", "15-2y", "-2y + 15"],
      hint: "Resta $2y$ a ambos lados.",
      explanation: "$x = 15 - 2y$. Este despeje es el primer paso del método de sustitución.",
    },
  ],
};
