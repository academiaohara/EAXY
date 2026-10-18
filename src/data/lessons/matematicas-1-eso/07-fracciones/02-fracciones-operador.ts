import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesOperadorLesson: InteractiveLesson = {
  slug: "fracciones-operador",
  title: "2. La fracción como operador",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regla",
      type: "slide",
      help: [
        {
          label: "En dos tiempos",
          message: "Primero repartes en $d$ partes iguales (divides) y luego coges $n$ de ellas (multiplicas).",
        },
        {
          label: "Con bombones",
          message: "$\\frac{2}{5}$ de $20$ bombones: $5$ filas de $4$, y coges $2$ filas.",
        },
        {
          label: "¿Importa el orden?",
          message: "Dividir y multiplicar da lo mismo en cualquier orden, pero dividir primero suele dar números más manejables.",
        },
      ],
      title: "Una fracción de una cantidad: dividir y multiplicar",
      blocks: [
        {
          kind: "story",
          text: "Un bidón de **20 litros** y la orden «saca $\\frac{2}{5}$». La fracción **opera** sobre la cantidad: la reparte y se queda con una parte.",
          src: "/lesson/fracciones/bidon.png",
          alt: "Bidón de plástico para agua",
          side: "right",
        },
        {
          kind: "rule",
          title: "Fracción de un número",
          formula: "\\frac{n}{d}\\ \\text{de}\\ N = (N : d)\\cdot n",
        },
        {
          kind: "warning",
          text: "Se divide entre el **denominador** (cuánto vale cada parte) y se multiplica por el **numerador** (cuántas partes). Dividir entre el numerador es el error más habitual.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-operador", params: { a: 20, b: 5, c: 2 } },
    },
    {
      id: "mental",
      type: "slide",
      help: [
        {
          label: "Parte de una parte conocida",
          message: "Si sabes lo que vale una parte ($\\frac{1}{4}$ de $8$), las demás son múltiplos de ella.",
        },
        {
          label: "Haz tu propio ejemplo",
          message: "$\\frac{1}{5}$ de $10$ es $2$. ¿Cuánto es $\\frac{3}{5}$ de $10$?",
        },
      ],
      title: "Cálculo mental: primero la unidad fraccionaria",
      arrange: "stack",
      blocks: [
        {
          kind: "text",
          text: "Si conoces **una parte** ($\\frac{1}{d}$ de la cantidad), las demás salen multiplicando.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\tfrac{1}{4}\\ \\text{de}\\ 8 = 2 \;\\Rightarrow\; \\tfrac{3}{4}\\ \\text{de}\\ 8 = 3\\cdot 2 = 6", note: "cada cuarto son 2" },
            { math: "\\tfrac{1}{3}\\ \\text{de}\\ 12 = 4 \;\\Rightarrow\; \\tfrac{2}{3}\\ \\text{de}\\ 12 = 2\\cdot 4 = 8", note: "cada tercio son 4" },
            { math: "\\tfrac{1}{5}\\ \\text{de}\\ 40 = 8 \;\\Rightarrow\; \\tfrac{4}{5}\\ \\text{de}\\ 40 = 4\\cdot 8 = 32", note: "cada quinto son 8" },
          ],
        },
      ],
    },
    {
      id: "marca-canicas",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué significa «$\\frac{2}{3}$ de»?",
          message: "El denominador dice en cuántos grupos iguales reparto las canicas; el numerador, cuántos grupos cojo.",
        },
        {
          label: "Imagínalo con cajas",
          message: "Piensa en $3$ cajas con las mismas canicas cada una y $12$ en total. Marcas las de dos cajas.",
        },
      ],
      title: "Marca la fracción de un conjunto",
      question: "Tienes $12$ canicas. Marca $\\frac{2}{3}$ de ellas.",
      shape: "set",
      numerator: 2,
      denominator: 3,
      parts: 12,
      columns: 6,
      itemLabel: "canica",
      hint: "Primero reparte las $12$ canicas en $3$ grupos iguales: ¿cuántas hay en cada tercio?",
      explanation:
        "$\\frac{1}{3}$ de $12 = 12 : 3 = 4$ canicas, así que $\\frac{2}{3}$ de $12 = 4 \\cdot 2 = 8$ canicas.",
    },
    {
      id: "check-descuento",
      type: "predict",
      help: [
        {
          label: "¿Qué parte pagas?",
          message: "Lee bien el enunciado: lo que se paga son tres de las cuatro partes del precio. Esa es la fracción que opera.",
        },
        {
          label: "Una comprobación",
          message: "Tres cuartos es más que la mitad y menos que el total: el resultado debe quedar entre $40$ € y $80$ €.",
        },
      ],
      title: "Precio con descuento",
      question:
        "Unas zapatillas cuestan 80 € y esta semana se pagan los $\\frac{3}{4}$ de su precio. ¿Cuánto hay que pagar?",
      mode: "choice",
      choices: [
        { id: "a", label: "$60$ €" },
        {
          id: "b",
          label: "$20$ €",
          incorrectFeedback:
            "Eso es $\\frac{1}{4}$ de $80$: lo que **te ahorras**. Te piden lo que pagas, que son tres de esas partes.",
        },
        {
          id: "c",
          label: "$240$ €",
          incorrectFeedback:
            "Has multiplicado por el numerador sin dividir antes entre el denominador. Una fracción menor que $1$ nunca hace crecer la cantidad.",
        },
        {
          id: "d",
          label: "$26{,}67$ €",
          incorrectFeedback:
            "Has dividido entre el numerador ($80 : 3$). Se divide entre el **denominador**, $4$, y después se multiplica por $3$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{3}{4}$ de $80 = (80 : 4)\\cdot 3 = 20 \\cdot 3 = 60$ €.",
    },
    {
      id: "queda",
      type: "slide",
      help: [
        {
          label: "¿Por qué restar a 1?",
          message: "La unidad entera es $\\frac{d}{d}$. Si coges $\\frac{n}{d}$, lo que queda es $\\frac{d - n}{d}$.",
        },
        {
          label: "Dos caminos",
          message: "Puedes calcular lo que se toma y restarlo del total, o calcular directamente la fracción que queda. Debe salir lo mismo.",
        },
      ],
      title: "Lo que queda: la fracción complementaria",
      blocks: [
        {
          kind: "definition",
          text: "Lo que **queda** es lo que le falta a la fracción tomada para completar la unidad: si se toma $\\frac{n}{d}$, queda $\\frac{d-n}{d}$.",
        },
        {
          kind: "example",
          title: "Caja de 24 bombones, se consume $\\frac{1}{6}$",
          lines: [
            { math: "\\tfrac{1}{6}\\ \\text{de}\\ 24 = 24 : 6 = 4", note: "se han comido" },
            { math: "24 - 4 = 20", note: "quedan" },
            { math: "\\tfrac{5}{6}\\ \\text{de}\\ 24 = (24:6)\\cdot 5 = 20", note: "lo mismo, calculando la fracción que queda" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-partes", params: { a: 1, b: 6 } },
    },
    {
      id: "check-clase",
      type: "predict",
      help: [
        {
          label: "¿Qué me dan y qué me piden?",
          message: "Te dan la fracción de **chicas**. La pregunta es por los **chicos**: otra parte del total.",
        },
        {
          label: "Compruébalo",
          message: "Chicas más chicos tienen que sumar el total de la clase.",
        },
      ],
      title: "Chicos y chicas",
      question:
        "En una clase de 27 estudiantes, las chicas son los $\\frac{4}{9}$ del total. ¿Cuántos chicos hay en la clase?",
      mode: "choice",
      choices: [
        { id: "a", label: "$15$ chicos" },
        {
          id: "b",
          label: "$12$ chicos",
          incorrectFeedback:
            "$12$ es el número de **chicas**: $\\frac{4}{9}$ de $27 = (27 : 9)\\cdot 4$. Los chicos son lo que queda.",
        },
        {
          id: "c",
          label: "$3$ chicos",
          incorrectFeedback:
            "$27 : 9 = 3$ es lo que vale **una** novena parte. Las chicas son cuatro de ellas, y los chicos, cinco.",
        },
        {
          id: "d",
          label: "$108$ chicos",
          incorrectFeedback: "Multiplicar $27 \\cdot 4$ no tiene sentido aquí: en la clase no pueden ser más chicos que el total, $27$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Chicas: $(27 : 9)\\cdot 4 = 12$. Chicos: $27 - 12 = 15$ (o bien $\\frac{5}{9}$ de $27 = 15$).",
    },
    {
      id: "check-precio",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hay?",
          message: "Es una fracción de un número, aunque sea decimal: se divide entre el denominador y se multiplica por el numerador.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$\\frac{3}{4}$ de kilo es menos de un kilo, así que cuesta menos de $5{,}4$ €, pero más que la mitad ($2{,}7$ €).",
        },
      ],
      title: "Fracción de un precio",
      question:
        "En la pescadería, los boquerones cuestan $5{,}4$ € el kilo. ¿Cuánto hay que pagar por $\\frac{3}{4}$ de kilo?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$4{,}05$ €" },
        {
          id: "b",
          label: "$1{,}35$ €",
          incorrectFeedback:
            "Eso es el precio de **un cuarto** de kilo ($5{,}4 : 4$). Falta multiplicar por $3$ para tener tres cuartos.",
        },
        {
          id: "c",
          label: "$16{,}2$ €",
          incorrectFeedback:
            "Has multiplicado $5{,}4 \\cdot 3$ sin dividir antes entre $4$. Tres cuartos de kilo no pueden costar más que un kilo entero.",
        },
        {
          id: "d",
          label: "$7{,}2$ €",
          incorrectFeedback:
            "Has dividido entre $3$ y multiplicado por $4$: justo al revés. Eso daría $\\frac{4}{3}$ de kilo, más de un kilo.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{3}{4}$ de $5{,}4 = (5{,}4 : 4)\\cdot 3 = 1{,}35 \\cdot 3 = 4{,}05$ €.",
    },
  ],
};
