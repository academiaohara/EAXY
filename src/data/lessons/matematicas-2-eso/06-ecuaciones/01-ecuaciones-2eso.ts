import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_6_SUBTITLE } from "@/data/lessons/shared";

export const ecuaciones2esoLesson: InteractiveLesson = {
  slug: "ecuaciones-2eso",
  title: "1. Ecuaciones",
  subtitle: TEMA_2ESO_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "identidad-ecuacion",
      type: "slide",
      help: [
        {
          label: "Prueba con valores",
          message: "Sustituye varios números. Si la igualdad sale siempre, es identidad; si solo sale con alguno, es ecuación.",
        },
        {
          label: "Qué es cada una",
          message: "$6x - 4x = 2x$ es cierta para cualquier $x$: es solo otra forma de escribir lo mismo. $3x - 4 = 8$ plantea una pregunta: ¿qué $x$ lo cumple?",
        },
      ],
      title: "Identidad y ecuación",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Identidad",
            text: "Igualdad algebraica que se cumple **siempre**, para cualquier valor de las letras.",
            math: ["6x - 4x = 2x"],
            tone: "ok",
          },
          right: {
            title: "Ecuación",
            text: "Igualdad que se cumple **solo para ciertos valores** de las letras.",
            math: ["3x - 4 = 8 \\quad (x = 4)"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "ecuacion-identidad" },
    },
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "Los miembros",
          message: "El signo igual divide la ecuación en dos: lo de la izquierda es el primer miembro y lo de la derecha, el segundo.",
        },
        {
          label: "Solución",
          message: "Es el valor de la incógnita que hace cierta la igualdad. Se comprueba sustituyéndolo.",
        },
      ],
      title: "Elementos de una ecuación",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "7x - 2x + 4 \;=\; 8 + 3x + 2", label: "primer miembro = segundo miembro" },
          ],
        },
        {
          kind: "steps",
          items: [
            "**Miembros**: las expresiones a cada lado del igual.",
            "**Términos**: los sumandos de cada miembro.",
            "**Incógnita**: la letra cuyo valor se busca.",
            "**Solución**: el valor de la incógnita que cumple la igualdad.",
          ],
        },
        {
          kind: "text",
          text: "Para **comprobar** una solución se sustituye en los dos miembros: si dan lo mismo, es solución.",
        },
      ],
      visual: { kind: "anim", scene: "comprobar-solucion" },
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Simplifica primero",
          message: "Reduce cada miembro. Si quedan idénticos, es identidad. Si no, hay un valor concreto de $x$.",
        },
      ],
      title: "Identidad o ecuación",
      question: "Clasifica cada igualdad.",
      groups: [
        { id: "identidad", label: "Identidad", tone: "cobalt" },
        { id: "ecuacion", label: "Ecuación", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$2x + x = 3x$", group: "identidad" },
        { id: "b", text: "$x + 5 = 9$", group: "ecuacion" },
        { id: "c", text: "$3(x + 1) = 3x + 3$", group: "identidad" },
        { id: "d", text: "$2x = 10$", group: "ecuacion" },
      ],
      explanation: "En las identidades, ambos miembros se reducen a la misma expresión. En las ecuaciones, la igualdad solo se cumple para un valor de $x$.",
    },
    {
      id: "suma-resta",
      type: "slide",
      help: [
        {
          label: "Misma operación en los dos lados",
          message: "Si a una balanza en equilibrio le quitas lo mismo en cada plato, sigue en equilibrio.",
        },
        {
          label: "Un atajo",
          message: "Quitar $4$ a los dos miembros equivale a «pasar» el $4$ al otro lado cambiando la operación: lo que suma pasa restando.",
        },
      ],
      title: "Resolver $x + a = b$ y $x - a = b$",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "$x + a = b$",
            text: "Se **resta** $a$ en los dos miembros: lo que suma, pasa restando.",
            math: ["x + 4 = 7 \\to x = 7 - 4 = 3"],
            tone: "ok",
          },
          right: {
            title: "$x - a = b$",
            text: "Se **suma** $a$ en los dos miembros: lo que resta, pasa sumando.",
            math: ["x - 2 = 6 \\to x = 6 + 2 = 8"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { a: 1, b: 4, c: 7, sign: "+" } },
    },
    {
      id: "producto-cociente",
      type: "slide",
      help: [
        {
          label: "Operación inversa",
          message: "Para dejar la $x$ sola se aplica la operación contraria a la que le afecta: dividir deshace multiplicar y multiplicar deshace dividir.",
        },
        {
          label: "Comprueba",
          message: "Sustituye: con $x = 5$, $3x = 15$ ✓. Con $x = 15$, $\\frac{x}{3} = 5$ ✓.",
        },
      ],
      title: "Resolver $ax = b$ y $x / a = b$",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "$ax = b$",
            text: "Se **divide** entre $a$ los dos miembros: lo que multiplica, pasa dividiendo.",
            math: ["3x = 15 \\to x = \\dfrac{15}{3} = 5"],
            tone: "ok",
          },
          right: {
            title: "$\\dfrac{x}{a} = b$",
            text: "Se **multiplica** por $a$ los dos miembros: lo que divide, pasa multiplicando.",
            math: ["\\dfrac{x}{3} = 5 \\to x = 5 \\cdot 3 = 15"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "balanza-ecuacion", params: { a: 3, b: 0, c: 15 } },
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      help: [
        {
          label: "Pasa el 9",
          message: "El $9$ suma en el primer miembro: pasa restando al segundo.",
        },
      ],
      title: "Una suma",
      question: "Resuelve $x + 9 = 15$ (solo el valor de $x$)",
      correctAnswers: ["6"],
      explanation: "$x = 15 - 9 = 6$. Comprobación: $6 + 9 = 15$.",
    },
    {
      id: "check-resta",
      type: "predict",
      help: [
        {
          label: "Resta que pasa sumando",
          message: "En $x - 5 = 2$, el $5$ resta: pasa sumando al otro miembro.",
        },
      ],
      title: "Una resta",
      question: "¿Cuál es la solución de $x - 5 = 2$?",
      mode: "choice",
      choices: [
        { id: "7", label: "$x = 7$" },
        { id: "-3", label: "$x = -3$", incorrectFeedback: "Has restado el $5$ otra vez: lo que resta pasa sumando." },
        { id: "3", label: "$x = 3$", incorrectFeedback: "Has hecho $5 - 2$; el $5$ pasa sumando al segundo miembro." },
        { id: "10", label: "$x = 10$", incorrectFeedback: "Has multiplicado $5 \\cdot 2$; aquí la operación es una resta." },
      ],
      correctChoiceId: "7",
      shuffleChoices: true,
      explanation: "$x = 2 + 5 = 7$. Comprobación: $7 - 5 = 2$.",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "Dividir",
          message: "El $4$ multiplica a la $x$: pasa dividiendo.",
        },
      ],
      title: "Un producto",
      question: "Resuelve $4x = 28$ (solo el valor de $x$)",
      correctAnswers: ["7"],
      explanation: "$x = 28 : 4 = 7$.",
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      help: [
        {
          label: "Multiplicar",
          message: "La $x$ está dividida entre $3$: el $3$ pasa multiplicando.",
        },
      ],
      title: "Un cociente",
      question: "Resuelve $\\dfrac{x}{3} = 5$ (solo el valor de $x$)",
      correctAnswers: ["15"],
      explanation: "$x = 5 \\cdot 3 = 15$.",
    },
  ],
};
