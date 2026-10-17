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
          kind: "text",
          text: "Hay que repartir **1 350 €** entre **5** amigos sin partir ningún euro. ¿Se puede? Sin dividir: acaba en $0$, así que sí.",
        },
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "text",
          text: "Veremos un criterio por cada número: el **2**, el **3**, el **4**, el **5**, el **6**, el **9**, el **10**, el **11** y el **12**. Cada uno tiene sus ejemplos, y al final lo pones a prueba en una cuadrícula.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-2",
      type: "slide",
      title: "Entre 2: la última cifra",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 2",
          text: "Un número es divisible entre $2$ si **acaba en cifra par**: $0$, $2$, $4$, $6$ u $8$.",
        },
        {
          kind: "text",
          text: "Basta la última cifra porque $10$, $100$, $1\\,000$… ya son múltiplos de $2$: solo las unidades pueden cambiar el resultado.",
        },
        {
          kind: "example",
          lines: [
            { math: "5\\,28\\underline{8} \\to \\text{acaba en } 8", note: "par: divisible entre $2$" },
            { math: "1\\,30\\underline{0} \\to \\text{acaba en } 0", note: "par: divisible entre $2$" },
            { math: "9\\,47\\underline{3} \\to \\text{acaba en } 3", note: "impar: no es divisible entre $2$" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-3",
      type: "slide",
      title: "Entre 3: la suma de las cifras",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 3",
          text: "Un número es divisible entre $3$ si la **suma de sus cifras** es múltiplo de $3$.",
        },
        {
          kind: "example",
          lines: [
            { math: "135 \\to 1 + 3 + 5 = 9", note: "múltiplo de $3$: sí" },
            { math: "2\\,472 \\to 2 + 4 + 7 + 2 = 15", note: "múltiplo de $3$: sí" },
            { math: "418 \\to 4 + 1 + 8 = 13", note: "no es múltiplo de $3$: no" },
          ],
        },
        {
          kind: "warning",
          text: "La suma no tiene por qué ser $3$: basta con que sea **múltiplo** ($6$, $9$, $12$, $15$…). Si es grande, vuelve a sumar sus cifras.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-suma-cifras", params: { n: 462 } },
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
            { math: "3\\,6\\underline{00} \\to 00", note: "divisible entre $4$" },
            { math: "7\\,2\\underline{18} \\to 18", note: "no es múltiplo de $4$ ($16$, $20$…): no" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-5",
      type: "slide",
      title: "Entre 5: acaba en 0 o en 5",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 5",
          text: "Un número es divisible entre $5$ si **acaba en $0$ o en $5$**.",
        },
        {
          kind: "text",
          text: "Los múltiplos de $5$ son $5, 10, 15, 20, 25$…: sus últimas cifras se repiten siempre como $5, 0, 5, 0$…",
        },
        {
          kind: "example",
          lines: [
            { math: "2\\,38\\underline{5} \\to \\text{acaba en } 5", note: "divisible entre $5$" },
            { math: "6\\,41\\underline{0} \\to \\text{acaba en } 0", note: "divisible entre $5$" },
            { math: "7\\,14\\underline{2} \\to \\text{acaba en } 2", note: "no es divisible entre $5$" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-6",
      type: "slide",
      title: "Entre 6: criterio del 2 y del 3",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 6",
          text: "Un número es divisible entre $6$ si es divisible entre $2$ **y** entre $3$.",
          formula: "6 = 2 \\cdot 3",
        },
        {
          kind: "example",
          lines: [
            { math: "4\\,752", note: "acaba en $2$ (par) y $4+7+5+2=18$ (múltiplo de $3$): sí" },
            { math: "2\\,630", note: "es par, pero $2+6+3+0=11$ no es múltiplo de $3$: no" },
            { math: "1\\,575", note: "$1+5+7+5=18$ es múltiplo de $3$, pero acaba en $5$ (impar): no" },
          ],
        },
        {
          kind: "warning",
          text: "Si falla **uno** de los dos criterios, ya no es divisible entre $6$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-9",
      type: "slide",
      title: "Entre 9: la suma de las cifras",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 9",
          text: "Un número es divisible entre $9$ si la **suma de sus cifras** es múltiplo de $9$.",
        },
        {
          kind: "text",
          text: "Es el mismo método que con el $3$, pero la suma tiene que ser múltiplo de $9$ ($9$, $18$, $27$…).",
        },
        {
          kind: "example",
          lines: [
            { math: "5\\,328 \\to 5 + 3 + 2 + 8 = 18", note: "múltiplo de $9$: sí" },
            { math: "729 \\to 7 + 2 + 9 = 18", note: "múltiplo de $9$: sí" },
            { math: "2\\,463 \\to 2 + 4 + 6 + 3 = 15", note: "múltiplo de $3$, pero no de $9$: no" },
          ],
        },
        {
          kind: "warning",
          text: "Todo múltiplo de $9$ lo es también de $3$, pero **no al revés**.",
        },
      ],
      arrange: "stack",
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
      id: "criterio-10",
      type: "slide",
      title: "Entre 10: acaba en 0",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 10",
          text: "Un número es divisible entre $10$ si **acaba en $0$**.",
        },
        {
          kind: "text",
          text: "Ser divisible entre $10$ es serlo entre $2$ **y** entre $5$ a la vez: la única cifra final que cumple las dos cosas es el $0$.",
        },
        {
          kind: "example",
          lines: [
            { math: "1\\,35\\underline{0} \\to \\text{acaba en } 0", note: "divisible entre $10$" },
            { math: "8\\,00\\underline{0} \\to \\text{acaba en } 0", note: "divisible entre $10$" },
            { math: "4\\,76\\underline{5} \\to \\text{acaba en } 5", note: "divisible entre $5$, pero **no** entre $10$" },
          ],
        },
      ],
      arrange: "stack",
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
            { math: "2\\,915 \\to (5 + 9) - (1 + 2) = 11", note: "múltiplo de $11$: sí" },
            { math: "3\\,003 \\to (3 + 0) - (0 + 3) = 0", note: "$0$ también vale: sí" },
            { math: "4\\,718 \\to (8 + 7) - (1 + 4) = 10", note: "no es $0$ ni múltiplo de $11$: no" },
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
    {
      id: "criterio-12",
      type: "slide",
      title: "Entre 12: criterio del 3 y del 4",
      blocks: [
        {
          kind: "rule",
          title: "Criterio del 12",
          text: "Un número es divisible entre $12$ si es divisible entre $3$ **y** entre $4$.",
          formula: "12 = 3 \\cdot 4",
        },
        {
          kind: "example",
          lines: [
            { math: "7\\,392", note: "$7+3+9+2=21$ (múltiplo de $3$) y $92 = 4 \\cdot 23$: sí" },
            { math: "1\\,320", note: "$1+3+2+0=6$ y $20 = 4 \\cdot 5$: sí" },
            { math: "2\\,150", note: "$2+1+5+0=8$ no es múltiplo de $3$: no" },
          ],
        },
        {
          kind: "warning",
          text: "Se combinan criterios de números **sin factores comunes**: $3$ y $4$ sí, pero $2$ y $6$ no. $18$ es divisible entre $2$ y entre $6$, y no lo es entre $12$.",
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
      id: "cuadricula-basicos",
      type: "divisibility_grid",
      title: "Cuadrícula: del 2 al 5",
      question: "Marca **Sí** o **No** en cada casilla: ¿es el número de la fila divisible entre el de la columna?",
      numbers: [3640, 1575, 2148],
      divisors: [2, 3, 4, 5],
    },
    {
      id: "cuadricula-compuestos",
      type: "divisibility_grid",
      title: "Cuadrícula: del 6 al 12",
      question: "Ahora con el $6$, el $9$, el $10$, el $11$ y el $12$. Marca **Sí** o **No** en cada casilla.",
      numbers: [4752, 2926, 1890],
      divisors: [6, 9, 10, 11, 12],
    },
  ],
};
