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
      help: [
        {
          label: "¿Por qué sirve un criterio?",
          message: "Dividir números grandes lleva tiempo. Mirar las cifras es instantáneo y te da la misma respuesta.",
        },
        {
          label: "Cómo ordenar lo que viene",
          message: "Los criterios se agrupan: los de la última(s) cifra(s) ($2$, $4$, $5$, $10$), los de la suma de cifras ($3$, $9$), los que combinan otros ($6$, $12$) y el especial del $11$.",
        },
      ],
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
          text: "Veremos un criterio por cada número: el **2**, el **3**, el **4**, el **5**, el **6**, el **9**, el **10**, el **11** y el **12**. Cada uno tiene sus ejemplos, y al final los pones a prueba en una cuadrícula.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "criterio-2",
      type: "slide",
      help: [
        {
          label: "¿Por qué solo la última cifra?",
          message: "Porque $10$ es múltiplo de $2$: todo lo que hay antes de las unidades ya lo es. Solo falta mirar las unidades.",
          math: ["1\\,236 = 1\\,230 + 6"],
        },
        {
          label: "Dos ejemplos",
          message: "$348$ acaba en $8$ (par): divisible. $215$ acaba en $5$ (impar): no.",
        },
      ],
      title: "Entre 2: la última cifra",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 2",
          text: "Un número es divisible entre $2$ si **acaba en cifra par**: $0$, $2$, $4$, $6$ u $8$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 2, nums: [5288, 1300, 9473] } },
    },
    {
      id: "criterio-3",
      type: "slide",
      help: [
        {
          label: "¿Por qué suman las cifras?",
          message: "Porque $10$, $100$, $1000$… dejan resto $1$ al dividir entre $3$. Así cada cifra «pesa» lo mismo que ella misma y solo importa su suma.",
        },
        {
          label: "Dos ejemplos",
          message: "$462$: $4 + 6 + 2 = 12$, múltiplo de $3$, así que es divisible. $463$: la suma es $13$, no lo es.",
        },
        {
          label: "Un truco",
          message: "Si la suma tiene dos cifras, súmalas otra vez: $12 \\to 1 + 2 = 3$.",
        },
      ],
      title: "Entre 3: la suma de las cifras",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 3",
          text: "Un número es divisible entre $3$ si la **suma de sus cifras** es múltiplo de $3$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 3, nums: [135, 2472, 418] } },
    },
    {
      id: "criterio-4",
      type: "slide",
      help: [
        {
          label: "¿Por qué dos cifras?",
          message: "Porque $100$ es múltiplo de $4$: todo lo anterior a las dos últimas cifras ya lo es.",
        },
        {
          label: "Dos ejemplos",
          message: "$1\\,324$: $24$ es múltiplo de $4$, así que sí. $1\\,326$: $26$ no lo es, así que no.",
        },
      ],
      title: "Entre 4: las dos últimas cifras",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 4",
          text: "Un número es divisible entre $4$ si el número que forman sus **dos últimas cifras** es múltiplo de $4$ (o son $00$).",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 4, nums: [1532, 3600, 7218] } },
    },
    {
      id: "criterio-5",
      type: "slide",
      help: [
        {
          label: "¿Por qué $0$ o $5$?",
          message: "Porque $10$ es múltiplo de $5$: solo importa la última cifra, y los múltiplos de $5$ acaban siempre en $0$ o en $5$.",
        },
        {
          label: "Dos ejemplos",
          message: "$470$ y $485$ son múltiplos de $5$; $482$ no lo es.",
        },
      ],
      title: "Entre 5: acaba en 0 o en 5",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 5",
          text: "Un número es divisible entre $5$ si **acaba en $0$ o en $5$**.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 5, nums: [2385, 6410, 7142] } },
    },
    {
      id: "criterio-6",
      type: "slide",
      help: [
        {
          label: "¿Por qué el $2$ y el $3$ a la vez?",
          message: "Porque $6 = 2 \\cdot 3$ y el $2$ y el $3$ no comparten factores, así que ser divisible entre los dos asegura serlo entre $6$.",
        },
        {
          label: "Cuidado",
          message: "No basta con ser par: $8$ es par pero no es múltiplo de $6$.",
        },
        {
          label: "Un ejemplo",
          message: "$54$: es par y $5 + 4 = 9$ es múltiplo de $3$. Divisible entre $6$.",
        },
      ],
      title: "Entre 6: criterio del 2 y del 3",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 6",
          text: "Un número es divisible entre $6$ si es divisible entre $2$ **y** entre $3$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 6, nums: [4752, 2630, 1575] } },
    },
    {
      id: "criterio-9",
      type: "slide",
      help: [
        {
          label: "Como el del $3$",
          message: "Misma idea: $10$, $100$… dejan resto $1$ al dividir entre $9$, así que cuenta la suma de las cifras.",
        },
        {
          label: "Ojo con el $3$ y el $9$",
          message: "Todo múltiplo de $9$ lo es de $3$, pero no al revés: $12$ suma $3$ (múltiplo de $3$) y no es múltiplo de $9$.",
        },
        {
          label: "Un ejemplo",
          message: "$738$: $7 + 3 + 8 = 18$, múltiplo de $9$. Es divisible.",
        },
      ],
      title: "Entre 9: la suma de las cifras",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 9",
          text: "Un número es divisible entre $9$ si la **suma de sus cifras** es múltiplo de $9$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 9, nums: [5328, 729, 2463] } },
    },
    {
      id: "check-nueve",
      type: "predict",
      help: [
        {
          label: "¿Cuál era el criterio del $9$?",
          message: "Un número es divisible entre $9$ si la suma de sus cifras también lo es. Es la misma idea que con el $3$.",
        },
        {
          label: "¿Cómo sumo las cifras rápido?",
          message: "Agrupa las que sumen $9$ o $10$. Y ten a mano los múltiplos de $9$ para comparar.",
          math: ["9,\\ 18,\\ 27,\\ 36,\\ \\dots"],
        },
        {
          label: "Tengo que revisarlas todas",
          message: "Prueba cada tirada por separado: solo una tiene la suma de cifras en esa lista.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué acaba en $0$?",
          message: "Un múltiplo de $10$ es lo que resulta de añadir un $0$ al final de otro número.",
        },
        {
          label: "Relación con el $2$ y el $5$",
          message: "Si un número acaba en $0$, es divisible entre $2$, entre $5$ y entre $10$ a la vez.",
        },
      ],
      title: "Entre 10: acaba en 0",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 10",
          text: "Un número es divisible entre $10$ si **acaba en $0$**.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 10, nums: [1350, 8000, 4765] } },
    },
    {
      id: "criterio-11",
      type: "slide",
      help: [
        {
          label: "Numera las cifras",
          message: "La primera es la de las unidades, la segunda la de las decenas… siempre de derecha a izquierda.",
        },
        {
          label: "Un ejemplo",
          message: "En $2\\,849$: posiciones impares $9 + 8 = 17$; pares $4 + 2 = 6$. $17 - 6 = 11$: divisible.",
          math: ["(9 + 8) - (4 + 2) = 11"],
        },
        {
          label: "¿Y si sale negativo?",
          message: "Da igual: lo que importa es que sea $0$ o un múltiplo de $11$, también $-11$, $-22$…",
        },
      ],
      title: "Entre 11: suma alterna de cifras",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 11",
          text: "Numera las cifras desde la derecha. Si la suma de las de **posición impar** menos la suma de las de **posición par** da $0$ o un múltiplo de $11$, el número es divisible entre $11$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 11, nums: [2915, 3003, 4718] } },
    },
    {
      id: "check-once",
      type: "predict",
      help: [
        {
          label: "¿Cómo funciona la suma alterna?",
          message: "Numera las cifras de derecha a izquierda. Suma las de posición impar por un lado y las de posición par por otro, y resta los dos totales.",
          branches: [
            {
              label: "Un ejemplo con otro número",
              message: "Para $2\\,849$: las cifras desde la derecha son $9, 4, 8, 2$. Impares: $9 + 8$; pares: $4 + 2$.",
              math: ["(9 + 8) - (4 + 2) = 11 \\;\\Rightarrow\\; \\text{divisible entre } 11"],
            },
          ],
        },
        {
          label: "¿Qué resultados valen?",
          message: "Vale que la resta dé $0$, o un múltiplo de $11$, positivo o negativo: $\\pm 11,\\ \\pm 22\\dots$",
        },
      ],
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
      help: [
        {
          label: "¿Por qué el $3$ y el $4$?",
          message: "Porque $12 = 3 \\cdot 4$ y el $3$ y el $4$ no comparten factores.",
        },
        {
          label: "Por qué no el $2$ y el $6$",
          message: "Comparten el factor $2$. Un contraejemplo: $18$ es divisible entre $2$ y entre $6$, pero no entre $12$.",
        },
        {
          label: "Un ejemplo",
          message: "$132$: $1 + 3 + 2 = 6$ (múltiplo de $3$) y $32$ es múltiplo de $4$. Divisible.",
        },
      ],
      title: "Entre 12: criterio del 3 y del 4",
      blocks: [
        {
          kind: "definition",
          text: "Un **criterio de divisibilidad** es una regla que decide si un número es divisible entre otro **mirando solo sus cifras**.",
        },
        {
          kind: "rule",
          title: "Criterio del 12",
          text: "Un número es divisible entre $12$ si es divisible entre $3$ **y** entre $4$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 12, nums: [7392, 1320, 2150] } },
    },
    {
      id: "check-doce",
      type: "predict",
      help: [
        {
          label: "¿Cómo se combinan los criterios?",
          message: "$12 = 3 \\cdot 4$ y el $3$ y el $4$ no comparten factores. Por eso un número es divisible entre $12$ si lo es entre $3$ y entre $4$ a la vez.",
          branches: [
            {
              label: "¿Por qué no basta con el $2$ y el $6$?",
              message: "Porque comparten el factor $2$. Un contraejemplo: $18$ es divisible entre $2$ y entre $6$, pero no entre $12$.",
            },
          ],
        },
        {
          label: "Quiero descartar opciones",
          message: "Para cada afirmación pregúntate si su razón es suficiente para asegurar la divisibilidad entre $12$. Busca un número pequeño que cumpla la razón y no sea múltiplo de $12$.",
        },
      ],
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
      id: "cuadricula",
      type: "divisibility_grid",
      help: [
        {
          label: "¿Cómo trabajo con la cuadrícula?",
          message: "Cada casilla pregunta si el número de la fila es múltiplo del de la columna. Ve columna por columna aplicando un solo criterio cada vez.",
        },
        {
          label: "La columna del $6$",
          message: "Un número es divisible entre $6$ si lo es entre $2$ y entre $3$. Marca el $6$ solo en las filas que tengan ✓ en esas dos columnas.",
        },
      ],
      title: "Cuadrícula de criterios",
      question:
        "Toca las casillas en las que el número de la fila es divisible entre el de la columna. Los ✓ del $2$ y del $3$ te ayudan con el $6$.",
      numbers: [135, 232, 418, 220, 300],
      divisors: [2, 3, 4, 5, 6, 9, 10, 11, 12],
    },
  ],
};
