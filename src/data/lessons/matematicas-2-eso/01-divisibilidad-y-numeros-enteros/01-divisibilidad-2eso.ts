import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const divisibilidad2esoLesson: InteractiveLesson = {
  slug: "divisibilidad-2eso",
  title: "1. Divisibilidad: múltiplos y divisores",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "relacion-divisibilidad",
      type: "slide",
      help: [
        {
          label: "Una igualdad, tres palabras",
          message: "Si $60 : 20 = 3$ es exacta, también $60 = 20 \\cdot 3$. De ahí salen «divisible», «múltiplo» y «divisor».",
        },
        {
          label: "¿Y si hay resto?",
          message: "Con resto distinto de $0$ ya no hay relación de divisibilidad: $30 : 7$ da cociente $4$ y resto $2$.",
        },
      ],
      title: "La relación de divisibilidad",
      blocks: [
        {
          kind: "definition",
          text: "Un número es **divisible** entre otro cuando su cociente es **exacto**: el resto es $0$.",
        },
        {
          kind: "example",
          lines: [
            { math: "10 : 2 = 5 \\quad (\\text{resto } 0)", note: "$10$ es divisible entre $2$" },
            { math: "30 : 7 = 4 \\quad (\\text{resto } 2)", note: "$30$ no es divisible entre $7$" },
          ],
        },
        {
          kind: "relations",
          items: [
            { left: "10", relation: "es múltiplo de", right: "2", tone: "ok" },
            { left: "2", relation: "es divisor de", right: "10", tone: "info" },
          ],
        },
        {
          kind: "rule",
          text: "Si la división $a : b$ es exacta, $a$ es **múltiplo** de $b$ y $b$ es **divisor** de $a$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "divisibilidad-grupos",
        params: { a: 10, b: 2, extra: 1 },
      },
    },
    {
      id: "multiplos",
      type: "slide",
      help: [
        {
          label: "Contar de $n$ en $n$",
          message: "Los múltiplos de $2$ son $2, 4, 6, 8, 10\\dots$ Se pasa de uno al siguiente sumando siempre $2$.",
        },
        {
          label: "Siempre hay dos seguros",
          message: "Cualquier número es múltiplo de $1$ ($a \\cdot 1 = a$) y de sí mismo.",
        },
      ],
      title: "Los múltiplos de un número",
      blocks: [
        {
          kind: "text",
          text: "Los múltiplos de un número lo contienen una cantidad exacta de veces: se obtienen **multiplicándolo por cualquier natural**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "2 \\cdot 1 = 2" },
            { tex: "2 \\cdot 2 = 4" },
            { tex: "2 \\cdot 3 = 6" },
            { tex: "2 \\cdot 4 = 8" },
            { tex: "2 \\cdot 5 = 10" },
          ],
        },
        {
          kind: "rule",
          title: "Infinitos, y dos siempre",
          text: "Un número tiene **infinitos** múltiplos. Todo número es múltiplo de $1$ y de sí mismo.",
        },
      ],
      visual: { kind: "anim", scene: "multiplos-saltos", params: { a: 2 } },
    },
    {
      id: "suma-multiplos",
      type: "slide",
      help: [
        {
          label: "¿Por qué funciona?",
          message: "Sacas factor común: $3 \\cdot 5 + 4 \\cdot 5 = (3 + 4) \\cdot 5$. Sigue siendo un número por $5$.",
        },
        {
          label: "Si uno no es múltiplo",
          message: "$20 + 3$: el $20$ es múltiplo de $5$ y el $3$ no. El resultado, $23$, deja resto $3$.",
        },
      ],
      title: "Una propiedad de los múltiplos",
      blocks: [
        {
          kind: "rule",
          title: "Suma de múltiplos",
          text: "La suma de dos múltiplos de $a$ es otro múltiplo de $a$.",
          formula: "m \\cdot a + n \\cdot a = (m + n) \\cdot a",
        },
        {
          kind: "example",
          lines: [
            { math: "3 \\cdot 5 + 4 \\cdot 5 = (3 + 4) \\cdot 5 = 7 \\cdot 5", note: "$15 + 20 = 35$" },
          ],
        },
        {
          kind: "warning",
          text: "Si a un múltiplo de $a$ le sumas un número que **no** lo es, el resultado tampoco es múltiplo de $a$.",
        },
      ],
      visual: { kind: "anim", scene: "area-distributiva", params: { a: 5, b: 3, c: 4 } },
    },
    {
      id: "check-suma",
      type: "predict",
      help: [
        {
          label: "Escribe cada número como múltiplo",
          message: "$35 = 7 \\cdot 5$ y $60 = 12 \\cdot 5$. Sumados: $(7 + 12) \\cdot 5$.",
        },
        {
          label: "Mira el que no encaja",
          message: "Una de las sumas incluye un número que no es múltiplo de $5$: eso rompe la propiedad.",
        },
      ],
      title: "¿Sigue siendo múltiplo?",
      question: "¿Cuál de estas sumas es **seguro** un múltiplo de $5$?",
      mode: "choice",
      choices: [
        { id: "35-60", label: "$35 + 60$" },
        {
          id: "35-62",
          label: "$35 + 62$",
          incorrectFeedback: "El $62$ no es múltiplo de $5$, así que la suma tampoco.",
        },
        {
          id: "40-3",
          label: "$40 + 3$",
          incorrectFeedback: "El $3$ no es múltiplo de $5$: la suma deja resto $3$.",
        },
        {
          id: "21-14",
          label: "$21 + 14$",
          incorrectFeedback: "Ninguno de los dos es múltiplo de $5$ (aunque la suma, $35$, casualmente sí lo sea).",
        },
      ],
      correctChoiceId: "35-60",
      shuffleChoices: true,
      explanation: "$35 = 7 \\cdot 5$ y $60 = 12 \\cdot 5$: la suma es $(7 + 12) \\cdot 5 = 19 \\cdot 5 = 95$.",
    },
    {
      id: "divisores",
      type: "slide",
      help: [
        {
          label: "Por qué van en parejas",
          message: "Cada división exacta da dos divisores a la vez: $12 : 3 = 4$ nos da el $3$ y el $4$.",
        },
        {
          label: "Cuándo parar",
          message: "Cuando el cociente ya es menor que el divisor que pruebas, las parejas empiezan a repetirse.",
        },
      ],
      title: "Los divisores de un número",
      blocks: [
        {
          kind: "text",
          text: "Los divisores de un número están contenidos en él una cantidad exacta de veces: lo dividen con **cociente exacto**.",
        },
        {
          kind: "example",
          title: "Divisores de 12",
          lines: [
            { math: "12 = 1 \\cdot 12 = 2 \\cdot 6 = 3 \\cdot 4" },
            { math: "D(12) = \\{1, 2, 3, 4, 6, 12\\}", note: "salen por parejas" },
          ],
        },
        {
          kind: "rule",
          title: "Finitos, y dos siempre",
          text: "Un número tiene una cantidad **finita** de divisores y, como mínimo, dos: **él mismo y la unidad**.",
        },
      ],
      visual: { kind: "anim", scene: "divisores-rectangulos", params: { n: 12 } },
    },
    {
      id: "check-divisores-75",
      type: "fill_in_blank",
      help: [
        {
          label: "Ve probando en orden",
          message: "Prueba $1, 2, 3, 4, 5\\dots$ y anota cada pareja que sale. Para el $2$ y el $4$ mira la última cifra: $75$ es impar.",
        },
        {
          label: "Las parejas",
          message: "$75 = 1 \\cdot 75 = 3 \\cdot 25 = 5 \\cdot 15$. ¿Cuántos números distintos aparecen?",
        },
      ],
      title: "Cuántos divisores",
      question: "¿Cuántos divisores tiene el $75$? (solo el número)",
      correctAnswers: ["6"],
      hint: "Busca las parejas que multiplican $75$.",
      explanation: "$D(75) = \\{1, 3, 5, 15, 25, 75\\}$: seis divisores, en tres parejas.",
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "¿Quién es el grande?",
          message: "Un múltiplo de $12$ nunca es menor que $12$. Un divisor de $12$ nunca es mayor.",
        },
        {
          label: "Comprueba con la división",
          message: "Si $36 : 12$ es exacta, $36$ es múltiplo. Si $12 : 4$ es exacta, $4$ es divisor.",
        },
      ],
      title: "Múltiplo o divisor de 12",
      question: "Reparte los números según su relación con el $12$.",
      groups: [
        { id: "divisor", label: "Divisor de 12", tone: "cobalt" },
        { id: "multiplo", label: "Múltiplo de 12", tone: "amber" },
      ],
      items: [
        { id: "1", text: "1", group: "divisor" },
        { id: "3", text: "3", group: "divisor" },
        { id: "4", text: "4", group: "divisor" },
        { id: "6", text: "6", group: "divisor" },
        { id: "24", text: "24", group: "multiplo" },
        { id: "36", text: "36", group: "multiplo" },
        { id: "60", text: "60", group: "multiplo" },
        { id: "120", text: "120", group: "multiplo" },
      ],
      explanation: "Los divisores no pasan de $12$ ($12 : 4 = 3$ exacta); los múltiplos son $12 \\cdot 2$, $12 \\cdot 3$, $12 \\cdot 5$, $12 \\cdot 10$.",
    },
  ],
};
