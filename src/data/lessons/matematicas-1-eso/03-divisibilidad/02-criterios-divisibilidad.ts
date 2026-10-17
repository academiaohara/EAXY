import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const criteriosDivisibilidadLesson: InteractiveLesson = {
  slug: "criterios-divisibilidad",
  title: "2. Criterios de divisibilidad",
  subtitle: TEMA_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea-criterios",
      type: "slide",
      title: "Decidir sin dividir",
      blocks: [
        {
          kind: "story",
          text: "Hay que repartir **1 350 €** entre **5** amigos sin partir ningún euro. ¿Se puede? Sin dividir: acaba en $0$, así que sí.",
          src: "/lesson/divisibilidad/hucha-amigos.png",
          alt: "Hucha con monedas y un grupo de amigos",
        },
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "2", label: "acaba en cifra par" },
            { tex: "5", label: "acaba en 0 o en 5" },
            { tex: "10", label: "acaba en 0" },
          ],
        },
        {
          kind: "text",
          text: "Basta la última cifra porque $10$, $100$, $1\\,000$… ya son múltiplos de $2$, de $5$ y de $10$: solo las unidades pueden cambiar el resultado.",
        },
        {
          kind: "example",
          lines: [
            { math: "1\\,350 \\to \\text{acaba en } 0", note: "divisible entre $2$, $5$ y $10$" },
            { math: "1\\,357 \\to \\text{acaba en } 7", note: "no es divisible entre $2$, $5$ ni $10$" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-3-9",
      type: "slide",
      title: "Entre 3 y entre 9: la suma de las cifras",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 3 y del 9",
          text: "Un número es divisible entre $3$ si la **suma de sus cifras** es múltiplo de $3$. Con el $9$, igual: la suma debe ser múltiplo de $9$.",
        },
        {
          kind: "example",
          lines: [
            { math: "135 \\to 1 + 3 + 5 = 9", note: "múltiplo de $3$ y de $9$" },
            { math: "418 \\to 4 + 1 + 8 = 13", note: "ni de $3$ ni de $9$" },
          ],
        },
        {
          kind: "warning",
          text: "La suma no tiene por qué ser $3$ o $9$: basta con que sea **múltiplo** ($12$, $15$, $18$…). Si es grande, vuelve a sumar sus cifras.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-suma-cifras", params: { n: 462 } },
    },
    {
      id: "check-nueve",
      type: "predict",
      title: "Folletos en paquetes de 9",
      question:
        "Una imprenta empaqueta folletos en paquetes de **9**. ¿Cuál de estas tiradas se puede empaquetar sin que sobre ninguno?",
      mode: "choice",
      choices: [
        {
          id: "4207",
          label: "$4\\,207$",
          incorrectFeedback: "$4 + 2 + 0 + 7 = 13$, que no es múltiplo de $9$.",
        },
        { id: "5328", label: "$5\\,328$" },
        {
          id: "6134",
          label: "$6\\,134$",
          incorrectFeedback: "$6 + 1 + 3 + 4 = 14$, que no es múltiplo de $9$.",
        },
        {
          id: "7431",
          label: "$7\\,431$",
          incorrectFeedback: "$7 + 4 + 3 + 1 = 15$ es múltiplo de $3$, pero no de $9$: sobrarían folletos.",
        },
      ],
      correctChoiceId: "5328",
      shuffleChoices: true,
      explanation: "$5 + 3 + 2 + 8 = 18 = 9 \\cdot 2$. Es la única tirada cuya suma de cifras es múltiplo de $9$.",
    },
    {
      id: "criterio-4",
      type: "slide",
      title: "Entre 4: las dos últimas cifras",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 4",
          text: "Un número es divisible entre $4$ si el número que forman sus **dos últimas cifras** es múltiplo de $4$ (o son $00$).",
        },
        {
          kind: "text",
          text: "Como $100 = 4 \\cdot 25$, las centenas, los millares… ya son múltiplos de $4$. Solo importan las decenas y las unidades.",
        },
        {
          kind: "example",
          lines: [
            { math: "1\\,5\\underline{32} \\to 32 = 4 \\cdot 8", note: "divisible entre $4$" },
            { math: "7\\,2\\underline{18} \\to 18", note: "$18$ no es múltiplo de $4$: no" },
            { math: "3\\,6\\underline{00} \\to 00", note: "divisible entre $4$" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterios-compuestos",
      type: "slide",
      title: "Entre 6 y entre 12: combinar criterios",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Entre 6",
            text: "Divisible entre $2$ **y** entre $3$.",
            math: ["6 = 2 \\cdot 3"],
            tone: "ok",
          },
          right: {
            title: "Entre 12",
            text: "Divisible entre $3$ **y** entre $4$.",
            math: ["12 = 3 \\cdot 4"],
            tone: "info",
          },
        },
        {
          kind: "example",
          title: "¿Es 7 392 divisible entre 12?",
          lines: [
            { math: "7 + 3 + 9 + 2 = 21", note: "múltiplo de $3$" },
            { math: "\\underline{92} = 4 \\cdot 23", note: "múltiplo de $4$" },
            { math: "7\\,392 = 12 \\cdot 616", note: "sí, es divisible entre $12$" },
          ],
        },
        {
          kind: "warning",
          text: "Solo se combinan criterios de números **sin factores comunes**: $3$ y $4$ sí, pero $2$ y $6$ no. $18$ es divisible entre $2$ y entre $6$, y no lo es entre $12$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-doce",
      type: "predict",
      title: "Lápices en cajas de 12",
      question:
        "Una fábrica tiene **5 148** lápices y quiere guardarlos en cajas de **12** sin que sobre ninguno. ¿Es posible?",
      mode: "choice",
      choices: [
        {
          id: "par",
          label: "Sí: acaba en cifra par, así que es divisible entre $12$",
          incorrectFeedback: "Acabar en cifra par solo asegura la divisibilidad entre $2$. Para el $12$ hay que comprobar el $3$ y el $4$.",
        },
        {
          id: "no-cero",
          label: "No: no acaba en $0$",
          incorrectFeedback: "Acabar en $0$ es el criterio del $10$, no del $12$.",
        },
        { id: "si", label: "Sí: sus cifras suman $18$ (múltiplo de $3$) y $48$ es múltiplo de $4$" },
        {
          id: "no-seis",
          label: "No: no es divisible entre $6$",
          incorrectFeedback: "Sí lo es: es par y sus cifras suman $18$. Pero para el $12$ se comprueba con el $3$ y el $4$.",
        },
      ],
      correctChoiceId: "si",
      shuffleChoices: true,
      explanation: "$5 + 1 + 4 + 8 = 18$ es múltiplo de $3$ y $48 = 4 \\cdot 12$ es múltiplo de $4$. Se pueden llenar $429$ cajas: $5\\,148 = 12 \\cdot 429$.",
    },
    {
      id: "criterio-11",
      type: "slide",
      title: "Entre 11: suma alterna de cifras",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 11",
          text: "Numera las cifras desde la derecha. Si la suma de las de **posición impar** menos la suma de las de **posición par** da $0$ o un múltiplo de $11$, el número es divisible entre $11$.",
        },
        {
          kind: "example",
          lines: [
            { math: "2\\,915 \\to (5 + 9) - (1 + 2) = 11", note: "múltiplo de $11$" },
            { math: "4\\,718 \\to (8 + 7) - (1 + 4) = 10", note: "no lo es" },
            { math: "3\\,003 \\to (3 + 0) - (0 + 3) = 0", note: "$0$ también vale" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "criterio-alternada", params: { n: 2915 } },
    },
    {
      id: "check-once",
      type: "predict",
      title: "El candado de 11",
      question:
        "La clave de un candado tiene 4 cifras y se sabe que es divisible entre **11**. ¿Cuál de estas puede ser?",
      mode: "choice",
      choices: [
        {
          id: "4718",
          label: "$4\\,718$",
          incorrectFeedback: "$(8 + 7) - (1 + 4) = 10$, que no es $0$ ni múltiplo de $11$.",
        },
        { id: "6391", label: "$6\\,391$" },
        {
          id: "3502",
          label: "$3\\,502$",
          incorrectFeedback: "$(2 + 5) - (0 + 3) = 4$, que no es $0$ ni múltiplo de $11$.",
        },
        {
          id: "8260",
          label: "$8\\,260$",
          incorrectFeedback: "$(0 + 2) - (6 + 8) = -12$, que no es múltiplo de $11$.",
        },
      ],
      correctChoiceId: "6391",
      shuffleChoices: true,
      explanation: "$(1 + 3) - (9 + 6) = 4 - 15 = -11$, múltiplo de $11$. Comprobación: $6\\,391 = 11 \\cdot 581$.",
    },
  ],
};
