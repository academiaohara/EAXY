import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-ecuaciones",
  title: "3. Ecuaciones",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ecuacion-identidad",
      type: "slide",
      help: [
        {
          label: "¿Cómo distingo una de otra?",
          message: "Prueba con dos o tres valores de $x$. Si la igualdad solo sale con alguno, es ecuación; si sale con todos, identidad.",
        },
        {
          label: "¿Por qué $6x - 4x = 2x$ es siempre cierta?",
          message: "Porque al restar monomios semejantes obtienes exactamente $2x$, valga lo que valga $x$.",
        },
      ],
      title: "Ecuación o identidad: ¿para qué valores se cumple?",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Ecuación",
            text: "Solo se cumple para **algunos** valores de la letra.",
            math: ["3x - 4 = 8 \\quad\\text{solo si } x = 4"],
            tone: "key",
          },
          right: {
            title: "Identidad",
            text: "Se cumple **siempre**, valga lo que valga la letra.",
            math: ["6x - 4x = 2x \\quad\\text{para todo } x"],
            tone: "ok",
          },
        },
        {
          kind: "warning",
          text: "Toda ecuación es una igualdad, pero no toda igualdad algebraica es una ecuación: las identidades no tienen nada que «resolver».",
        },
      ],
    },
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "Miembros y términos",
          message: "Los miembros son los dos lados del $=$. Los términos son los sumandos dentro de cada miembro.",
        },
        {
          label: "¿Qué es el grado de la ecuación?",
          message: "El mayor exponente de la incógnita. Aquí todas tienen $x$ sin exponente: son de **primer grado**.",
        },
      ],
      title: "Las piezas de una ecuación",
      blocks: [
        { kind: "formula", tex: "\\underbrace{4x - 5}_{\\text{1.er miembro}} \;=\; \\underbrace{2x + 1}_{\\text{2.º miembro}}" },
        {
          kind: "facts",
          items: [
            { tex: "4x,\\ -5,\\ 2x,\\ 1", label: "términos" },
            { tex: "x", label: "incógnita" },
            { tex: "x = 3", label: "solución" },
          ],
        },
        {
          kind: "text",
          text: "Esta es una ecuación de **primer grado con una incógnita**: la letra aparece sin exponente.",
        },
      ],
    },
    {
      id: "solucion",
      type: "slide",
      help: [
        {
          label: "¿Cómo compruebo una solución?",
          message: "Sustituye la letra por el valor en **los dos miembros**. Si dan lo mismo, es solución.",
        },
        {
          label: "¿Puede haber más de una?",
          message: "En las de primer grado como esta, una sola. Más adelante verás ecuaciones con más.",
        },
      ],
      title: "Solución: el valor que hace cierta la igualdad",
      blocks: [
        {
          kind: "definition",
          text: "La **solución** es el valor de la incógnita que hace que los dos miembros valgan lo mismo.",
        },
        {
          kind: "text",
          text: "Para comprobarlo se sustituye la letra en cada miembro y se calcula.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["4x", "−", "5", "=", "2x", "+", "1"], active: [0, 6], note: "Sustituimos $x$ por $3$ en **los dos** miembros." },
            { tokens: ["4·3", "−", "5", "=", "2·3", "+", "1"], active: [0, 2], note: "Primero los productos." },
            { tokens: ["12", "−", "5", "=", "6", "+", "1"], active: [0, 6], note: "Ahora sumamos y restamos." },
            { tokens: ["7", "=", "7"], fresh: [0, 2] },
          ],
        },
      },
    },
    {
      id: "tarifas",
      type: "predict",
      help: [
        {
          label: "¿Qué me piden?",
          message: "El número de gigas para el que las dos tarifas cuestan **lo mismo**: la ecuación es $5x - 3 = 2x + 3$.",
        },
        {
          label: "¿Cómo pruebo?",
          message: "Calcula el precio de cada tarifa con cada opción y fíjate en cuándo coinciden.",
        },
        {
          label: "Un descarte rápido",
          message: "Con $x = 0$, una tarifa daría negativo: no tiene sentido. Y cuanto más crece $x$, más rápido sube la tarifa A.",
        },
      ],
      title: "Dos tarifas de datos",
      question:
        "Una tarifa A cuesta 5x − 3 euros y una tarifa B cuesta 2x + 3 euros, siendo x los gigas consumidos. ¿Para cuántos gigas cuestan lo mismo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$x = 2$" },
        {
          id: "b",
          label: "$x = 1$",
          incorrectFeedback:
            "Con $x = 1$ la tarifa A vale $5 \\cdot 1 - 3 = 2$ y la B, $2 \\cdot 1 + 3 = 5$. No coinciden.",
        },
        {
          id: "c",
          label: "$x = 3$",
          incorrectFeedback:
            "Con $x = 3$ la tarifa A vale $5 \\cdot 3 - 3 = 12$ y la B, $2 \\cdot 3 + 3 = 9$. Ya se ha pasado el punto de igualdad.",
        },
        {
          id: "d",
          label: "$x = 6$",
          incorrectFeedback:
            "Con $x = 6$ la tarifa A vale $27$ y la B, $15$. Muy lejos de coincidir.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Con $x = 2$: $5 \\cdot 2 - 3 = 7$ y $2 \\cdot 2 + 3 = 7$. Los dos miembros valen lo mismo.",
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "Pruébalo con un número",
          message: "Elige un valor concreto, por ejemplo $x = 1$, y mira si se cumple. Luego prueba con otro: si cambia, es ecuación.",
        },
        {
          label: "Reduce primero",
          message: "Si al operar un miembro sale exactamente el otro, la igualdad vale siempre: es una identidad.",
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Clasifica cada igualdad como ecuación o identidad.",
      groups: [
        { id: "ecuacion", label: "Ecuación", tone: "cobalt" },
        { id: "identidad", label: "Identidad", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$x + 3 = 7$", group: "ecuacion" },
        { id: "b", text: "$x + x = 2x$", group: "identidad" },
        { id: "c", text: "$3x = 12$", group: "ecuacion" },
        { id: "d", text: "$2(x + 1) = 2x + 2$", group: "identidad" },
        { id: "e", text: "$5x - 1 = 9$", group: "ecuacion" },
        { id: "f", text: "$7x - 3x = 4x$", group: "identidad" },
      ],
      hint: "Si al simplificar un miembro sale el otro, es identidad.",
      explanation:
        "Las ecuaciones solo se cumplen para un valor ($x + 3 = 7$ solo con $x = 4$). Las identidades siempre: $x + x$ **es** $2x$, y $2(x+1)$ **es** $2x + 2$.",
    },
    {
      id: "tanteo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué número pruebo?",
          message: "Piensa en un número cuya mitad y cuyo tercio sean enteros: así evitas fracciones al tantear.",
        },
        {
          label: "Un descarte",
          message: "Si $x = 6$ no sale, el resultado queda demasiado pequeño o demasiado grande: ajusta con otro múltiplo de $6$.",
        },
      ],
      title: "Busca la solución por tanteo",
      question: "Por tanteo, ¿qué valor de $x$ cumple $\\dfrac{x}{2} + \\dfrac{x}{3} = 5$? (escribe solo el número)",
      correctAnswers: ["6", "x=6"],
      hint: "Prueba con un número que sea múltiplo de $2$ y de $3$.",
      explanation: "Con $x = 6$: $\\frac{6}{2} + \\frac{6}{3} = 3 + 2 = 5$. Se cumple.",
    },
  ],
};
