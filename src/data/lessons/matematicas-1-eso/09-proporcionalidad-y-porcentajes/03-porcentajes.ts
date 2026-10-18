import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const porcentajesLesson: InteractiveLesson = {
  slug: "porcentajes",
  title: "3. Porcentajes",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "¿Qué significa «por ciento»?",
          message: "Literalmente, «de cada cien». Un $20\\%$ es $20$ de cada $100$.",
        },
        {
          label: "¿Por qué siempre cien?",
          message: "Porque así se pueden comparar cantidades de tamaños distintos con la misma vara de medir.",
        },
      ],
      title: "Un porcentaje son partes de cada 100",
      blocks: [
        {
          kind: "definition",
          text: "Un **porcentaje** indica cuántas partes **de cada 100** se toman. Se escribe con el símbolo **%**, que se lee «por ciento».",
        },
        {
          kind: "facts",
          items: [
            { tex: "20\\% = 20 \\text{ de cada } 100", label: "veinte por ciento" },
            { tex: "4{,}5\\% = 4{,}5 \\text{ de cada } 100", label: "interés de un banco" },
          ],
        },
        {
          kind: "text",
          text: "Aparece en rebajas, intereses, encuestas y notas. Sirve para comparar: «el 80 % de posibilidades» significa lo mismo con 100 o con 5 000 casos.",
        },
      ],
      visual: { kind: "tool", tool: "porcentaje-cuadricula", params: { a: 35 } },
    },
    {
      id: "calcular",
      type: "slide",
      help: [
        {
          label: "¿Por qué divido entre 100?",
          message: "Porque el $1\\%$ es una de cada cien partes: dividir entre $100$ te da el valor de esa parte.",
        },
        {
          label: "Compruébalo",
          message: "El $20\\%$ es menos de la mitad: el resultado debe ser menor que la mitad del total.",
        },
      ],
      title: "Calcular el a % de una cantidad",
      blocks: [
        {
          kind: "story",
          text: "En un aparcamiento hay **300 coches** y el **20 %** son rojos. ¿Cuántos hay?",
        },
        {
          kind: "rule",
          title: "Se parte en cien y se toman a",
          formula: "a\\% \\text{ de } N = (N : 100) \\cdot a",
        },
        {
          kind: "example",
          title: "65 % de 540",
          lines: [
            { math: "540 : 100 = 5{,}4", note: "el 1 %" },
            { math: "5{,}4 \\cdot 65 = 351", note: "65 veces el 1 %" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cuadricula-porcentaje", params: { a: 20, b: 300 } },
    },
    {
      id: "predict-calcular",
      type: "predict",
      title: "El autobús del colegio",
      question:
        "En un colegio de $450$ alumnos, el $40\\%$ va en autobús escolar. ¿Cuántos alumnos usan el autobús?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$180$ alumnos" },
        {
          id: "b",
          label: "$18\\,000$ alumnos",
          incorrectFeedback:
            "Has multiplicado $450 \\cdot 40$ sin dividir entre $100$. Un porcentaje nunca puede dar más que el total: no caben $18\\,000$ alumnos entre $450$.",
        },
        {
          id: "c",
          label: "$410$ alumnos",
          incorrectFeedback:
            "Has restado $450 - 40$. El $40\\%$ no son $40$ alumnos: son $40$ de cada $100$.",
        },
        {
          id: "d",
          label: "$18$ alumnos",
          incorrectFeedback:
            "Has dividido entre $100$ pero no has multiplicado por $40$: $450 : 100 = 4{,}5$ es el $1\\%$, no el $40\\%$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "Primero, el 1 %",
          message: "Calcula cuántos alumnos son el $1\\%$ de $450$. Después piensa cuántos de esos trozos necesitas.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "El $40\\%$ es algo menos que la mitad. La mitad de $450$ es $225$: el resultado debe quedar por debajo.",
        },
      ],
      explanation: "$(450 : 100) \\cdot 40 = 4{,}5 \\cdot 40 = 180$ alumnos.",
    },
    {
      id: "fraccion",
      type: "slide",
      help: [
        {
          label: "¿Cómo saco el % de un conjunto?",
          message: "Escribe la fracción que representa la parte y busca una equivalente con denominador $100$.",
        },
        {
          label: "Si no puedo pasar a 100",
          message: "Divide: $3 : 5 = 0{,}6$, y ese decimal por $100$ es el porcentaje.",
        },
      ],
      title: "Un porcentaje es una fracción de denominador 100",
      blocks: [
        {
          kind: "rule",
          formula: "a\\% = \\dfrac{a}{100}",
        },
        {
          kind: "compare",
          left: {
            title: "Dividir y multiplicar",
            math: ["20\\% \\text{ de } 300", "(300 : 100) \\cdot 20 = 60"],
            tone: "key",
          },
          right: {
            title: "Fracción del total",
            math: ["\\dfrac{20}{100} \\text{ de } 300", "\\dfrac{20 \\cdot 300}{100} = 60"],
            tone: "ok",
          },
        },
        {
          kind: "example",
          title: "5 pelotas: 3 azules, 1 roja, 1 blanca",
          lines: [
            { math: "\\dfrac{3}{5} = \\dfrac{60}{100}", note: "fracción equivalente con denominador 100" },
            { math: "\\dfrac{3}{5} = 60\\%", note: "el 60 % de las pelotas son azules" },
          ],
        },
      ],
    },
    {
      id: "especiales",
      type: "slide",
      help: [
        {
          label: "¿Cómo hago el 5 %?",
          message: "El $5\\%$ es la mitad del $10\\%$. Calcula el $10\\%$ (divides entre $10$) y luego la mitad.",
        },
        {
          label: "Y el 75 %?",
          message: "Es tres cuartos: calcula un cuarto y multiplica por $3$.",
        },
      ],
      title: "Porcentajes que se hacen de cabeza",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "50\\% = \\tfrac{1}{2}", label: "se divide entre 2" },
            { tex: "25\\% = \\tfrac{1}{4}", label: "se divide entre 4" },
            { tex: "20\\% = \\tfrac{1}{5}", label: "se divide entre 5" },
            { tex: "10\\% = \\tfrac{1}{10}", label: "se divide entre 10" },
          ],
        },
        {
          kind: "example",
          title: "Con fracciones más grandes",
          lines: [{ math: "75\\% \\text{ de } 84 = (84 : 4) \\cdot 3 = 63", note: "tres cuartos" }],
        },
      ],
      arrange: "text-top",
      visual: { kind: "anim", scene: "porcentaje-mental", params: { a: 260 } },
    },
    {
      id: "predict-especial",
      type: "predict",
      title: "El club de ajedrez",
      question:
        "Un instituto tiene $240$ alumnos y el $25\\%$ pertenece al club de ajedrez. ¿Cuántos socios tiene el club?",
      mode: "choice",
      choices: [
        { id: "a", label: "$60$ socios" },
        {
          id: "b",
          label: "$120$ socios",
          incorrectFeedback: "Dividir entre $2$ da el $50\\%$. El $25\\%$ es la mitad de esa mitad: hay que dividir entre $4$.",
        },
        {
          id: "c",
          label: "$24$ socios",
          incorrectFeedback: "Dividir entre $10$ da el $10\\%$. El $25\\%$ es una cuarta parte: $240 : 4$.",
        },
        {
          id: "d",
          label: "$25$ socios",
          incorrectFeedback: "El $25\\%$ no son $25$ alumnos, son $25$ de cada $100$: sobre $240$ alumnos salen más.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Qué fracción es el 25 %?",
          message: "Veinticinco de cada cien. Simplifica esa fracción.",
        },
      ],
      explanation: "$25\\% = \\frac{1}{4}$, así que $240 : 4 = 60$ socios.",
    },
    {
      id: "check-formula",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es un $12\\%$?",
          message: "Doce de cada cien. Calcula cuánto es el $1\\%$ de $380$ y toma doce de esos trozos.",
        },
        {
          label: "Descomposición mental",
          message: "El $10\\%$ de un número se obtiene dividiendo entre $10$. Luego añade el $1\\%$ dos veces.",
          math: ["12\\% = 10\\% + 1\\% + 1\\%"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "El $12\\%$ es algo más que el $10\\%$, y el $10\\%$ de $380$ se calcula en un segundo. Tu resultado debe pasar un poco de esa cifra.",
        },
      ],
      title: "Practica la fórmula",
      question: "Calcula el $12\\%$ de $380$ (usa coma decimal si hace falta).",
      correctAnswers: ["45,6", "45.6"],
      explanation: "$(380 : 100) \\cdot 12 = 3{,}8 \\cdot 12 = 45{,}6$.",
    },
    {
      id: "check-cuadricula",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué fracción es el $25\\%$?",
          message: "Veinticinco de cada cien. Simplifica esa fracción: ¿qué parte del total es?",
        },
        {
          label: "Con porcentajes que ya conoces",
          message: "El $50\\%$ es la mitad. El $25\\%$ es la mitad de la mitad.",
        },
      ],
      title: "El 25 % en una cuadrícula",
      question: "La cuadrícula tiene $20$ casillas. Colorea el $25\\%$ de ella.",
      shape: "grid",
      numerator: 25,
      denominator: 100,
      parts: 20,
      columns: 5,
      itemLabel: "casilla",
      hint: "$25\\% = \\frac{25}{100}$. ¿Qué fracción sencilla es? Aplícala a las $20$ casillas.",
      explanation: "$25\\% = \\frac{25}{100} = \\frac{1}{4}$, la cuarta parte: $20 : 4 = 5$ casillas.",
    },
    {
      id: "plazos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué hago primero?",
          message: "Calcula cuánto se paga al contado (el $30\\%$) y réstalo del precio. Lo que queda se reparte.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Se paga menos de la mitad al contado: queda más de la mitad por pagar. Cada plazo, un sexto de eso.",
        },
      ],
      title: "El frigorífico a plazos",
      question:
        "Una familia compra un frigorífico de $840\\,€$ pagando el $30\\%$ al contado y el resto en $6$ plazos mensuales iguales. ¿Cuánto es cada plazo? (en euros, solo el número)",
      correctAnswers: ["98", "98 €", "98€", "98,00"],
      explanation: "Al contado: $0{,}30 \\cdot 840 = 252\\,€$. Resto: $840 - 252 = 588\\,€$. Plazo: $588 : 6 = 98\\,€$.",
    },
    {
      id: "zumos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué me piden?",
          message: "Solo una de las cuatro partes: la de zumo de naranja, que es el $45\\%$ de las botellas.",
        },
        {
          label: "Un atajo",
          message: "El $45\\%$ de $900$ es $45$ veces el $1\\%$, y el $1\\%$ de $900$ es $9$.",
        },
      ],
      title: "Las botellas de zumo",
      question:
        "En el estante hay $900$ botellas: un $25\\%$ de tomate, un $45\\%$ de naranja, un $20\\%$ de pera y el resto de melocotón. ¿Cuántas botellas de naranja hay?",
      correctAnswers: ["405"],
      explanation: "$45\\%$ de $900 = (900 : 100) \\cdot 45 = 9 \\cdot 45 = 405$.",
    },
  ],
};
