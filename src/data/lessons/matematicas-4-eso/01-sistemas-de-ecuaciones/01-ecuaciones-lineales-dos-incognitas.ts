import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesLinealesDosIncognitasLesson: InteractiveLesson = {
  slug: "ecuaciones-lineales-dos-incognitas",
  title: "1. Ecuaciones lineales con dos incógnitas",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      help: [
        {
          label: "¿Por qué «lineal»?",
          message: "Porque sus soluciones, dibujadas, forman una recta. No hay potencias ni productos de incógnitas.",
        },
        {
          label: "¿Cómo compruebo una solución?",
          message: "Sustituye $x$ e $y$ en la ecuación y mira si sale $c$.",
        },
        {
          label: "¿Por qué infinitas?",
          message: "Porque eliges $x$ libremente y $y$ se ajusta para que la igualdad se cumpla.",
        },
      ],
      title: "¿Qué es una ecuación lineal con dos incógnitas?",
      content: [
        "Una ecuación lineal con dos incógnitas se puede escribir como $ax + by = c$, donde $a$, $b$ y $c$ son números reales.",
        "Una **solución** es un par de valores $(x, y)$ que hace cierta la igualdad. Por ejemplo, en $x + 2y = 4$, el par $(2, 1)$ es solución porque $2 + 2 \\cdot 1 = 4$.",
        "Esta ecuación tiene **infinitas soluciones**: $(0, 2)$, $(4, 0)$, $(-2, 3)$…",
      ],
      visuals: [
        {
          kind: "equation-anatomy",
          title: "Las piezas de la ecuación",
          parts: [
            { tex: "a", label: "número", tone: "violet" },
            { tex: "x", label: "incógnita", tone: "cobalt" },
            { tex: "+" },
            { tex: "b", label: "número", tone: "violet" },
            { tex: "y", label: "incógnita", tone: "cobalt" },
            { tex: "=" },
            { tex: "c", label: "término independiente", tone: "emerald" },
          ],
        },
        {
          kind: "solution-check",
          title: "¿Es solución? Pulsa un par",
          a: 1,
          b: 2,
          c: 4,
          pairs: [
            [2, 1],
            [0, 2],
            [1, 1],
            [-2, 3],
          ],
        },
      ],
    },
    {
      id: "grafica-recta",
      type: "interactive_tool",
      help: [
        {
          label: "¿Por qué una recta?",
          message: "Cada solución es un punto, y juntas se alinean porque la relación entre $x$ e $y$ es siempre la misma.",
        },
        {
          label: "Dos puntos bastan",
          message: "Dos puntos determinan una recta: calcula dos soluciones, márcalas y únelas.",
        },
      ],
      title: "Representación gráfica",
      tool: "system-graph",
      content: [
        "Si interpretamos las soluciones como puntos del plano, todas caen sobre la **misma recta**.",
        "Para dibujarla basta con conocer **dos puntos**. Activa o desactiva la recta y observa su trazado.",
      ],
      graph: {
        lines: [
          {
            id: "main",
            label: "$x + 2y = 4$",
            form: "standard",
            a: 1,
            b: 2,
            c: 4,
            color: "#2f5fe0",
          },
        ],
        highlightPoints: [
          { x: 2, y: 1, label: "(2, 1)" },
          { x: 0, y: 2, label: "(0, 2)" },
          { x: 4, y: 0, label: "(4, 0)" },
        ],
        xMin: -3,
        xMax: 5,
        yMin: -1,
        yMax: 5,
      },
    },
    {
      id: "rectas-especiales",
      type: "concept",
      help: [
        {
          label: "Horizontal frente a vertical",
          message: "En $y = k$ la altura es siempre $k$ aunque cambie $x$: recta horizontal. En $x = k$ el lugar horizontal es siempre $k$: recta vertical.",
        },
        {
          label: "Algunos puntos",
          message: "$y = 3$ pasa por $(0, 3)$ y $(5, 3)$. $x = 2$ pasa por $(2, 0)$ y $(2, 5)$.",
        },
      ],
      title: "Rectas horizontales y verticales",
      content: [
        "Las ecuaciones $y = k$ se representan con rectas **horizontales**.",
        "Las ecuaciones $x = k$ se representan con rectas **verticales**.",
      ],
      visuals: [
        {
          kind: "graph-gallery",
          items: [
            {
              caption: "Horizontales: $y = k$",
              detail: "$y = 3$ y $y = -2$",
              graph: {
                lines: [
                  { id: "h1", label: "$y = 3$", form: "horizontal", y: 3, color: "#2f5fe0" },
                  { id: "h2", label: "$y = -2$", form: "horizontal", y: -2, color: "#c0392b" },
                ],
                xMin: -3,
                xMax: 3,
                yMin: -3,
                yMax: 4,
              },
            },
            {
              caption: "Verticales: $x = k$",
              detail: "$x = -\\frac{5}{2}$ y $x = \\frac{1}{2}$",
              graph: {
                lines: [
                  { id: "v1", label: "$x = -5/2$", form: "vertical", x: -2.5, color: "#16a085" },
                  { id: "v2", label: "$x = 1/2$", form: "vertical", x: 0.5, color: "#d35400" },
                ],
                xMin: -3,
                xMax: 3,
                yMin: -3,
                yMax: 4,
              },
            },
          ],
        },
      ],
    },
    {
      id: "grafica-especiales",
      type: "interactive_tool",
      help: [
        {
          label: "Qué observar",
          message: "En cada recta mira qué coordenada no cambia nunca.",
        },
        {
          label: "¿Dónde se cruzan?",
          message: "Una horizontal y una vertical siempre se cortan en un punto: sus constantes son las coordenadas.",
        },
      ],
      title: "Explora rectas especiales",
      tool: "system-graph",
      content: [
        "Pulsa cada ecuación para mostrar u ocultar su recta en el plano.",
      ],
      graph: {
        lines: [
          { id: "h1", label: "$y = 3$", form: "horizontal", y: 3, color: "#2f5fe0" },
          { id: "h2", label: "$y = -2$", form: "horizontal", y: -2, color: "#c0392b" },
          { id: "v1", label: "$x = -2$", form: "vertical", x: -2, color: "#16a085" },
          { id: "v2", label: "$x = 1$", form: "vertical", x: 1, color: "#d35400" },
        ],
        xMin: -4,
        xMax: 4,
        yMin: -4,
        yMax: 4,
      },
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "¿Cuándo es solución un par?",
          message: "Cuando, al sustituir sus valores en la ecuación, los dos miembros quedan iguales.",
        },
        {
          label: "¿Qué va en cada sitio?",
          message: "En $(a, b)$ el primer número es $x$ y el segundo es $y$. No los cambies de orden.",
          math: ["(2, 1) \\;\\Rightarrow\\; x = 2,\\ y = 1"],
        },
        {
          label: "Cuidado con los signos",
          message: "Haz primero el producto $2y$ y luego la suma. Con valores negativos, $-2 + 2 \\cdot 1$ no es $-2 + 2$ y luego por $1$.",
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Sustituye cada par en $x + 2y = 4$ y clasifícalo.",
      groups: [
        { id: "si", label: "Es solución", tone: "emerald" },
        { id: "no", label: "No es solución", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$(2, 1)$", group: "si" },
        { id: "b", text: "$(4, 0)$", group: "si" },
        { id: "c", text: "$(6, -1)$", group: "si" },
        { id: "d", text: "$(1, 1{,}5)$", group: "si" },
        { id: "e", text: "$(1, 1)$", group: "no" },
        { id: "f", text: "$(3, 1)$", group: "no" },
        { id: "g", text: "$(-2, 1)$", group: "no" },
      ],
      hint: "Calcula $x + 2y$ con cada par: es solución si da exactamente $4$.",
      explanation:
        "$2 + 2 = 4$, $4 + 0 = 4$, $6 - 2 = 4$ y $1 + 3 = 4$: son soluciones. $(1,1)$ da $3$, $(3,1)$ da $5$ y $(-2,1)$ da $0$. Para cualquier $x$ hay un $y$ que cumple la ecuación: tiene **infinitas soluciones**, todas sobre la misma recta.",
    },
    {
      id: "check-infinitas",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué hago con el $10$?",
          message: "Sustitúyelo en la ecuación en lugar de $x$. Te queda una ecuación con una sola incógnita.",
          math: ["10 + 2y = 4"],
        },
        {
          label: "¿Cómo despejo $y$?",
          message: "Pasa el $10$ al otro miembro y luego divide entre el coeficiente de $y$. El resultado puede salir negativo.",
        },
        {
          label: "¿Por qué hay infinitas soluciones?",
          message: "Porque para cada valor de $x$ que elijas, la ecuación te da un $y$. Prueba con otro $x$ y compruébalo.",
        },
      ],
      title: "Siempre hay otra solución",
      question: "Busca una solución más de $x + 2y = 4$: si $x = 10$, ¿cuánto vale $y$? (solo el número)",
      correctAnswers: ["-3"],
      hint: "Sustituye $x = 10$ y despeja: $10 + 2y = 4$.",
      explanation:
        "$2y = 4 - 10 = -6 \\Rightarrow y = -3$. Elijas el $x$ que elijas, encuentras su $y$: la ecuación tiene infinitas soluciones.",
    },
  ],
};
