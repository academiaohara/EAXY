import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const factoresPrimosLesson: InteractiveLesson = {
  slug: "factores-primos",
  title: "3. Descomposición en factores primos",
  subtitle: TEMA_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "primos-compuestos",
      type: "slide",
      title: "Primos y compuestos",
      blocks: [
        {
          kind: "definition",
          text: "Un número es **primo** si solo tiene dos divisores: el $1$ y él mismo. Si tiene más, es **compuesto**.",
        },
        {
          kind: "compare",
          left: {
            title: "Primo",
            text: "No se puede romper en factores menores.",
            math: ["D(13) = \\{1, 13\\}"],
            tone: "ok",
          },
          right: {
            title: "Compuesto",
            text: "Se escribe como producto de números menores.",
            math: ["D(12) = \\{1, 2, 3, 4, 6, 12\\}"],
            tone: "info",
          },
        },
        {
          kind: "warning",
          title: "Casos especiales",
          text: "El $1$ no es primo ni compuesto (solo tiene un divisor). El $2$ es el único primo par.",
        },
      ],
      visual: { kind: "anim", scene: "criba-eratostenes", params: { n: 50 } },
    },
    {
      id: "factores-idea",
      type: "slide",
      title: "Todo compuesto se construye con primos",
      blocks: [
        {
          kind: "text",
          text: "Los primos son las piezas que no se pueden partir. Cualquier número compuesto se **construye multiplicando primos**, y de una única manera.",
        },
        {
          kind: "rule",
          title: "Descomposición en factores primos",
          text: "Escribir un número como **producto de primos**. Los factores repetidos se agrupan en **potencias**.",
          formula: "360 = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 3 \\cdot 5 = 2^3 \\cdot 3^2 \\cdot 5",
        },
        {
          kind: "text",
          text: "El orden de los factores da igual, pero no hay otra combinación de primos que dé $360$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "metodo-division",
      type: "slide",
      title: "Método: dividir entre el primo más pequeño",
      blocks: [
        {
          kind: "steps",
          items: [
            "Escribe el número y traza una **línea vertical** a su derecha.",
            "Divide entre el **primo más pequeño** que lo divida ($2, 3, 5, 7\\dots$) y escribe el cociente debajo.",
            "Repite con cada cociente, empezando de nuevo por el primo que sirvió.",
            "Para al llegar a **1**. Los primos de la columna derecha son los factores.",
          ],
        },
        {
          kind: "text",
          text: "Los **criterios de divisibilidad** te dicen qué primo probar sin hacer la división.",
        },
        {
          kind: "warning",
          text: "Divide siempre entre **primos**. Dividir entre $4$ o entre $6$ funciona, pero el resultado no estaría completamente descompuesto.",
        },
      ],
      visual: { kind: "anim", scene: "descomposicion-primos", params: { n: 180 } },
    },
    {
      id: "check-sesenta",
      type: "predict",
      help: [
        {
          label: "¿Qué es un número primo?",
          message: "Uno que solo tiene dos divisores: el $1$ y él mismo. Mira si $4$ y $15$ lo son.",
        },
        {
          label: "¿Cuándo termina una descomposición?",
          message: "Cuando todos los factores son primos. Si queda alguno compuesto, hay que seguir descomponiéndolo.",
        },
        {
          label: "Comprueba cada afirmación",
          message: "Multiplica los factores de la propuesta: ¿salen $60$? Después pregunta si alguno se puede descomponer más.",
        },
      ],
      title: "¿Está completa la descomposición?",
      question:
        "Un compañero descompone $60 = 4 \\cdot 15$ y dice que ya ha terminado. ¿Qué le falta?",
      mode: "choice",
      choices: [
        {
          id: "nada",
          label: "Nada: el producto es correcto",
          incorrectFeedback: "El producto sí da $60$, pero $4$ y $15$ son compuestos: $4 = 2 \\cdot 2$ y $15 = 3 \\cdot 5$. Los factores deben ser primos.",
        },
        { id: "seguir", label: "Seguir: $4$ y $15$ no son primos, y $60 = 2^2 \\cdot 3 \\cdot 5$" },
        {
          id: "mal",
          label: "Está mal: $4 \\cdot 15$ no es $60$",
          incorrectFeedback: "$4 \\cdot 15 = 60$ es correcto. El fallo es otro: los factores no son primos.",
        },
        {
          id: "orden",
          label: "Ordenar los factores de menor a mayor",
          incorrectFeedback: "El orden de los factores no cambia nada. Lo que importa es que cada factor sea primo.",
        },
      ],
      correctChoiceId: "seguir",
      shuffleChoices: true,
      explanation: "$60 = 4 \\cdot 15 = (2 \\cdot 2) \\cdot (3 \\cdot 5) = 2^2 \\cdot 3 \\cdot 5$.",
    },
    {
      id: "check-ochenta-y-cuatro",
      type: "predict",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Divide entre el primo más pequeño que pueda (el $2$) mientras la división sea exacta. Después pasa al siguiente primo.",
        },
        {
          label: "Descarta opciones",
          message: "En la descomposición correcta todos los factores son primos. Tacha las opciones que contengan $4$, $14$ o $21$.",
        },
        {
          label: "Compruébalo",
          message: "Multiplica los factores de la opción que elijas: tiene que dar $84$.",
        },
      ],
      title: "Las butacas del cine",
      question:
        "Un cine tiene **84** butacas. Al descomponer 84 en factores primos, ¿qué resultado es correcto?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$2^2 \\cdot 3 \\cdot 7$" },
        {
          id: "14",
          label: "$2 \\cdot 3 \\cdot 14$",
          incorrectFeedback: "$14$ no es primo: $14 = 2 \\cdot 7$.",
        },
        {
          id: "4",
          label: "$4 \\cdot 3 \\cdot 7$",
          incorrectFeedback: "$4$ no es primo: $4 = 2 \\cdot 2 = 2^2$.",
        },
        {
          id: "21",
          label: "$2^2 \\cdot 21$",
          incorrectFeedback: "$21$ no es primo: $21 = 3 \\cdot 7$.",
        },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$84 : 2 = 42$, $42 : 2 = 21$, $21 : 3 = 7$, $7 : 7 = 1$. Así que $84 = 2 \\cdot 2 \\cdot 3 \\cdot 7 = 2^2 \\cdot 3 \\cdot 7$.",
    },
    {
      id: "check-divisores-de-potencias",
      type: "predict",
      help: [
        {
          label: "¿Qué puede tener un divisor?",
          message: "Los divisores de $n$ se construyen solo con los primos de $n$. Pregúntate si alguna opción usa un primo que $n$ no tiene.",
          branches: [
            {
              label: "¿Y los exponentes?",
              message: "Aunque use los mismos primos, un divisor no puede repetir un primo más veces que $n$: $2^4$ no cabe en $2^3 \\cdot 5$.",
            },
          ],
        },
        {
          label: "Descompón las opciones",
          message: "Escribe cada opción como producto de primos y compárala con $2^3 \\cdot 5$ primo a primo.",
        },
      ],
      title: "Divisores desde la descomposición",
      question:
        "Un número se descompone en $n = 2^3 \\cdot 5$. Sin calcular $n$, ¿cuál de estos números es divisor suyo?",
      mode: "choice",
      choices: [
        { id: "10", label: "$10 = 2 \\cdot 5$" },
        {
          id: "15",
          label: "$15 = 3 \\cdot 5$",
          incorrectFeedback: "$n$ no tiene el factor $3$, así que $15$ no puede dividirlo.",
        },
        {
          id: "16",
          label: "$16 = 2^4$",
          incorrectFeedback: "$n$ solo tiene tres factores $2$ y $16$ necesita cuatro.",
        },
        {
          id: "12",
          label: "$12 = 2^2 \\cdot 3$",
          incorrectFeedback: "$n$ no tiene el factor $3$, así que $12$ no puede dividirlo.",
        },
      ],
      correctChoiceId: "10",
      shuffleChoices: true,
      explanation: "Un divisor de $n$ solo puede usar los primos de $n$ y con exponentes iguales o menores. $10 = 2 \\cdot 5$ cumple ambas cosas. Esta idea es la base del m.c.d.",
    },
  ],
};
