import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const divisionOrdenOperacionesNaturalesLesson: InteractiveLesson = {
  slug: "division-orden-operaciones-naturales",
  title: "4. Orden de operaciones",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "paper" },
  steps: [
    {
      id: "exploracion-quien",
      type: "predict",
      title: "¿Quién tiene razón?",
      question:
        "Ana calcula $4 + 3 \\times 2$ y obtiene $14$. Leo obtiene $10$. ¿Quién aplica correctamente la prioridad de operaciones y por qué?",
      mode: "choice",
      choices: [
        { id: "a", label: "Ana" },
        { id: "l", label: "Leo" },
      ],
      correctChoiceId: "l",
      module: "jerarquia-operaciones",
      scene: "exploracion-ana-leo",
      explanation: "Primero $3 \\times 2 = 6$; luego $4 + 6 = 10$.",
    },
    {
      id: "explicacion-niveles",
      type: "narrate",
      title: "El orden de las operaciones",
      module: "jerarquia-operaciones",
      scene: "niveles-reglas",
    },
    {
      id: "orden-ejemplos",
      type: "slide",
      title: "Mismos números, distinto resultado",
      blocks: [
        {
          kind: "text",
          text: "Las normas del lenguaje matemático aseguran que cada expresión tenga **un único significado**. Por eso $6 + 2 \\cdot 4$ y $(6 + 2) \\cdot 4$ **no** son lo mismo.",
        },
        {
          kind: "steps",
          title: "Cómo resolver una expresión",
          items: [
            "Busca la operación con **más prioridad** (paréntesis, luego $\\cdot$ y $:$, luego $+$ y $-$).",
            "Calcúlala y **reescribe** la expresión con el resultado.",
            "Repite hasta que quede **un solo número**.",
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Sin paréntesis", "Con paréntesis"],
          expr: [
            { tokens: ["6", "+", "2", "·", "4"], active: [2, 4], note: "primero la multiplicación: $2 \\cdot 4 = 8$." },
            { tokens: ["6", "+", "8"], active: [0, 2], fresh: [2, 2], note: "ahora la suma: $6 + 8 = 14$." },
            { tokens: ["14"], fresh: [0, 0], note: "resultado: $14$." },
          ],
          expr2: [
            { tokens: ["(6", "+", "2)", "·", "4"], active: [0, 2], note: "primero el paréntesis: $6 + 2 = 8$." },
            { tokens: ["8", "·", "4"], active: [0, 2], fresh: [0, 0], note: "ahora el producto: $8 \\cdot 4 = 32$." },
            { tokens: ["32"], fresh: [0, 0], note: "resultado: $32$." },
          ],
        },
      },
    },
    {
      id: "practica-mul-primero",
      type: "explore",
      title: "Pulsa lo primero",
      question: "Pulsa la operación que harías primero en $4 + 3 − 2 × 3$.",
      module: "jerarquia-operaciones",
      scene: "practica-reducir",
      goal: {
        kind: "hierarchy-reduce",
        tokens: ["4", "+", "3", "−", "2", "×", "3"],
      },
      explanation: "Primero $2 \\times 3 = 6$; al final queda $1$.",
    },
    {
      id: "practica-parentesis",
      type: "explore",
      title: "Pulsa lo primero",
      question: "Ahora con paréntesis: $4 + ( 3 − 2 ) × 3$.",
      module: "jerarquia-operaciones",
      scene: "practica-reducir",
      goal: {
        kind: "hierarchy-reduce",
        tokens: ["4", "+", "(", "3", "−", "2", ")", "×", "3"],
      },
      explanation: "$(3 - 2) = 1$, luego $1 \\times 3 = 3$ y $4 + 3 = 7$.",
    },
    {
      id: "practica-orden-niveles",
      type: "explore",
      title: "Ordena la prioridad",
      question:
        "Arrastra cada nivel al puesto correcto: arriba va lo que se calcula antes.",
      module: "jerarquia-operaciones",
      scene: "orden-prioridad",
      goal: {
        kind: "hierarchy-sequence",
        sequence: ["parentesis", "mul-div", "sum-resta"],
      },
      explanation:
        "Primero paréntesis, luego multiplicación y división, y al final suma y resta.",
    },
    {
      id: "misma-prioridad",
      type: "slide",
      title: "Mismo nivel: de izquierda a derecha",
      blocks: [
        {
          kind: "rule",
          title: "Si hay empate",
          text: "Las operaciones del **mismo nivel** se resuelven en el orden en que aparecen, de **izquierda a derecha**.",
        },
        {
          kind: "warning",
          title: "Error típico",
          text: "$24 : 4 \\cdot 2$ **no** es $24 : 8$. Primero $24 : 4 = 6$ y luego $6 \\cdot 2 = 12$. Multiplicar no pasa por delante de dividir.",
        },
        {
          kind: "text",
          text: "Con la resta ocurre igual: $13 - 9 + 3$ es $4 + 3$, no $13 - 12$. Si quieres sumar antes, **tienes que usar paréntesis**.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Sin paréntesis", "Con paréntesis"],
          expr: [
            { tokens: ["13", "−", "9", "+", "3"], active: [0, 2], note: "de izquierda a derecha: $13 - 9 = 4$." },
            { tokens: ["4", "+", "3"], active: [0, 2], fresh: [0, 0], note: "después: $4 + 3 = 7$." },
            { tokens: ["7"], fresh: [0, 0], note: "resultado: $7$." },
          ],
          expr2: [
            { tokens: ["13", "−", "(9", "+", "3)"], active: [2, 4], note: "el paréntesis manda: $9 + 3 = 12$." },
            { tokens: ["13", "−", "12"], active: [0, 2], fresh: [2, 2], note: "ahora la resta: $13 - 12 = 1$." },
            { tokens: ["1"], fresh: [0, 0], note: "resultado: $1$." },
          ],
        },
      },
    },
    {
      id: "izq-der-predict",
      type: "predict",
      title: "¿Quién tiene razón?",
      question:
        "Dos compañeros calculan $18 : 3 \\cdot 2$. Uno obtiene $12$ y el otro $3$. ¿Quién lo ha hecho bien?",
      mode: "choice",
      choices: [
        { id: "12", label: "El que obtiene $12$" },
        {
          id: "3",
          label: "El que obtiene $3$",
          incorrectFeedback:
            "Ese hizo antes $3 \\cdot 2 = 6$ y luego $18 : 6$. Pero $:$ y $\\cdot$ tienen la misma prioridad: se empieza por la izquierda.",
        },
      ],
      correctChoiceId: "12",
      explanation: "$18 : 3 = 6$ y después $6 \\cdot 2 = 12$.",
    },
    {
      id: "hortelano-predict",
      type: "predict",
      title: "Del problema a la expresión",
      question:
        "Un hortelano lleva al mercado $85$ kg de tomates a $2$ €/kg y $35$ kg de frambuesas a $3$ €/kg. ¿Qué expresión da lo que ingresa por todo?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$85 \\cdot 2 + 35 \\cdot 3$" },
        {
          id: "mix",
          label: "$(85 + 35) \\cdot (2 + 3)$",
          incorrectFeedback:
            "Eso mezcla los kilos de las dos frutas con los dos precios; cada precio va solo con su fruta.",
        },
        {
          id: "flat",
          label: "$85 + 35 \\cdot 2 \\cdot 3$",
          incorrectFeedback: "Los kilos de tomate se quedan sin multiplicar por su precio.",
        },
      ],
      correctChoiceId: "ok",
      explanation:
        "Tomates: $85 \\cdot 2 = 170$ €. Frambuesas: $35 \\cdot 3 = 105$ €. Total: $170 + 105 = 275$ €. No hacen falta paréntesis porque el producto ya tiene prioridad.",
    },
  ],
};
