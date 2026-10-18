import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesProblemasLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-problemas",
  title: "4. Problemas con fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "dos-tipos",
      type: "slide",
      help: [
        {
          label: "La pregunta clave",
          message: "¿La segunda fracción se aplica al total inicial o a lo que quedaba tras la primera? Eso decide si sumas o multiplicas.",
        },
        {
          label: "Una imagen",
          message: "Si gastas $\\frac{1}{3}$ **de lo que queda**, ese $\\frac{1}{3}$ es de un trozo más pequeño que el total, así que es menos que $\\frac{1}{3}$ del dinero.",
        },
        {
          label: "¿Cómo lo detecto en el enunciado?",
          message: "Busca expresiones como «de lo que quedaba», «del resto» o «de esos»: señalan multiplicación.",
        },
      ],
      title: "Dos situaciones distintas: del total o del resto",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Fracciones del total",
            text: "Gasto $\\frac{1}{2}$ y $\\frac{1}{3}$ de **todo** el dinero.",
            math: ["\\frac{1}{2} + \\frac{1}{3}"],
            tone: "info",
          },
          right: {
            title: "Fracción de lo que queda",
            text: "Gasto $\\frac{1}{2}$ y después $\\frac{1}{3}$ **de lo que quedaba**.",
            math: ["\\frac{1}{3} \\cdot \\frac{1}{2}"],
            tone: "key",
          },
        },
        {
          kind: "rule",
          title: "Pista del enunciado",
          text: "«**de lo que queda**», «**del resto**», «**de esos**» → la segunda fracción actúa sobre un trozo más pequeño: se **multiplica**.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-de-fraccion", params: { a: 1, b: 3, c: 1, d: 2 } },
    },
    {
      id: "marta",
      type: "slide",
      help: [
        {
          label: "¿Por qué multiplico?",
          message: "Porque la segunda fracción es de lo que le quedaba, no del total.",
        },
        {
          label: "¿Cuánto es la revista respecto al total?",
          message: "Es un tercio de la mitad, es decir, una sexta parte del dinero inicial.",
        },
        {
          label: "Comprueba el total",
          message: "Concierto, revista y lo que queda deben sumar la unidad.",
        },
      ],
      title: "Un problema completo: Marta",
      blocks: [
        {
          kind: "story",
          text: "Marta gasta $\\frac{1}{2}$ de su dinero en un concierto y $\\frac{1}{3}$ **de lo que le quedaba** en una revista. ¿Qué fracción ha gastado en total? ¿Cuánto le queda?",
        },
        {
          kind: "steps",
          items: [
            "Tras el concierto le queda $\\frac{1}{2}$ del dinero.",
            "La revista es $\\frac{1}{3}$ **de** $\\frac{1}{2}$: se multiplica.",
            "En total se suman las dos compras, con común denominador.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "\\frac{1}{3} \\cdot \\frac{1}{2} = \\frac{1}{6}", note: "revista" },
            { math: "\\frac{1}{2} + \\frac{1}{6} = \\frac{3}{6} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}", note: "gastado" },
            { math: "1 - \\frac{2}{3} = \\frac{1}{3}", note: "queda" },
          ],
        },
      ],
    },
    {
      id: "check-tipo",
      type: "classify",
      help: [
        {
          label: "¿Mismo total o «de lo que queda»?",
          message: "Si las dos fracciones se refieren al mismo total, se suman. Si una se aplica a lo que queda tras la otra, se multiplican.",
        },
        {
          label: "Pregunta de control",
          message: "Pregúntate: ¿esa fracción es «del total» o «de esos, de lo que sobra»? Lo primero es suma; lo segundo, producto.",
        },
      ],
      title: "¿Suma o producto?",
      question: "Lee cada situación y decide qué operación hay que hacer para responderla.",
      groups: [
        { id: "suma", label: "Sumar fracciones", tone: "cobalt" },
        { id: "producto", label: "Multiplicar (fracción de una fracción)", tone: "violet" },
      ],
      items: [
        {
          id: "a",
          text: "Iván gasta $\\frac{2}{3}$ del dinero en una camisa y $\\frac{1}{5}$ **de lo que le quedaba** en una corbata. ¿Qué fracción gasta en la corbata?",
          group: "producto",
        },
        {
          id: "b",
          text: "Ana lee $\\frac{1}{4}$ del libro el lunes y $\\frac{1}{3}$ del libro el martes. ¿Qué fracción ha leído?",
          group: "suma",
        },
        {
          id: "c",
          text: "La mitad de la clase va en autobús y, de esos, $\\frac{2}{5}$ son chicas. ¿Qué fracción de la clase son chicas que van en autobús?",
          group: "producto",
        },
        {
          id: "d",
          text: "Pinta $\\frac{2}{7}$ de la valla por la mañana y $\\frac{3}{7}$ por la tarde. ¿Qué fracción lleva pintada?",
          group: "suma",
        },
        {
          id: "e",
          text: "Tiene $\\frac{3}{4}$ de una pizza y se come $\\frac{1}{3}$ **de lo que tiene**. ¿Qué fracción de pizza se come?",
          group: "producto",
        },
        {
          id: "f",
          text: "Un grifo llena $\\frac{1}{2}$ del depósito y otro $\\frac{1}{6}$. ¿Qué fracción del depósito está llena?",
          group: "suma",
        },
      ],
      hint: "Busca la expresión «de lo que…» o «de esos»: si la fracción se aplica a **otra parte**, no al total, se multiplica.",
      explanation:
        "Si las dos partes se refieren al mismo total, se suman. Si una es parte **de otra parte**, se multiplica. Por ejemplo, tras la camisa a Iván le queda $1 - \\frac{2}{3} = \\frac{1}{3}$, y la corbata es $\\frac{1}{5} \\cdot \\frac{1}{3} = \\frac{1}{15}$ del dinero.",
    },
    {
      id: "ivan-dinero",
      type: "predict",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Calcula qué fracción del dinero le queda tras la camisa y cuánto es la corbata respecto al dinero total.",
          math: ["1 - \\frac{2}{3}", "\\frac{1}{5} \\cdot \\frac{1}{3}"],
        },
        {
          label: "¿Qué fracción son los 20 €?",
          message: "Los $20$ € son lo que queda al final: al dinero inicial le quitas la camisa y la corbata. Esa fracción es la que corresponde a $20$ €.",
        },
        {
          label: "De la parte al todo",
          message: "Si $4$ partes valen $20$ €, ¿cuánto vale una parte? Después, ¿cuántas partes tiene el total?",
        },
      ],
      title: "¿Cuánto dinero tenía Iván?",
      question:
        "Iván gasta 2/3 de su dinero en una camisa y 1/5 de lo que le quedaba en una corbata. Al final le quedan 20 €. ¿Cuánto dinero tenía al principio?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$75$ €" },
        {
          id: "b",
          label: "$60$ €",
          incorrectFeedback:
            "Has tomado $20$ € como el $\\frac{1}{3}$ que queda tras la camisa. Pero después compró la corbata: al final queda menos de $\\frac{1}{3}$.",
        },
        {
          id: "c",
          label: "$100$ €",
          incorrectFeedback:
            "$\\frac{1}{5}$ es lo que gasta en la corbata **de lo que le quedaba**, no lo que le queda al final del todo.",
        },
        {
          id: "d",
          label: "$300$ €",
          incorrectFeedback:
            "Si $\\frac{4}{15}$ del dinero son $20$ €, cada $\\frac{1}{15}$ son $5$ €, no $20$ €. Hay que dividir entre el numerador $4$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Tras la camisa queda $\\frac{1}{3}$; la corbata cuesta $\\frac{1}{5} \\cdot \\frac{1}{3} = \\frac{1}{15}$. Al final queda $\\frac{1}{3} - \\frac{1}{15} = \\frac{4}{15}$. Si $\\frac{4}{15}$ son $20$ €, cada $\\frac{1}{15}$ son $5$ € y el total es $15 \\cdot 5 = 75$ €.",
    },
    {
      id: "queso",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué operación es?",
          message: "Lo que se queda es lo que compró menos lo que regaló: una resta con común denominador.",
        },
        {
          label: "Mismo denominador",
          message: "Antes de restar, escribe $\\frac{1}{2}$ como cuartos: así los trozos son del mismo tamaño.",
        },
      ],
      title: "El queso de Rosa",
      question:
        "Rosa compra $\\frac{3}{4}$ kg de queso y regala $\\frac{1}{2}$ kg a su hija. ¿Qué fracción de kilo le queda? (escríbela, por ejemplo, 5/7)",
      correctAnswers: ["1/4"],
      hint: "$\\frac{1}{2}$ son $\\frac{2}{4}$. Resta los cuartos.",
      explanation: "$\\frac{3}{4} - \\frac{1}{2} = \\frac{3}{4} - \\frac{2}{4} = \\frac{1}{4}$ kg.",
    },
    {
      id: "senderista",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Las tres fracciones son partes del mismo camino: primero se suman para saber lo recorrido y después se resta de la unidad.",
        },
        {
          label: "¿Qué denominador común uso?",
          message: "Uno que sea múltiplo de $6$, de $3$ y de $9$: pista, el m.c.m. es $18$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Ha recorrido más de la mitad ($\\frac{1}{6} + \\frac{1}{3} = \\frac{1}{2}$ y todavía suma el miércoles). Le falta menos de la mitad.",
        },
      ],
      title: "Un camino en tres días",
      question:
        "Un senderista recorre 1/6 del camino el lunes, 1/3 el martes y 2/9 el miércoles. ¿Qué fracción del camino le falta?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{5}{18}$" },
        {
          id: "b",
          label: "$\\dfrac{13}{18}$",
          incorrectFeedback:
            "Eso es lo que ya ha **recorrido** ($\\frac{3}{18} + \\frac{6}{18} + \\frac{4}{18}$). Falta restarlo de la unidad.",
        },
        {
          id: "c",
          label: "$\\dfrac{2}{9}$",
          incorrectFeedback:
            "Has sumado los numeradores ($1 + 1 + 2 = 4$) sin escribir las fracciones con denominador común, y has tomado ese $\\frac{4}{18}$ como lo que falta. Reescribe cada fracción con denominador $18$ **antes** de sumar y luego resta de la unidad.",
        },
        {
          id: "d",
          label: "$\\dfrac{7}{18}$",
          incorrectFeedback:
            "Falta contar bien el miércoles: $\\frac{2}{9} = \\frac{4}{18}$, no $\\frac{2}{18}$. Al ampliar, se multiplica **arriba y abajo**.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Recorrido: $\\frac{3}{18} + \\frac{6}{18} + \\frac{4}{18} = \\frac{13}{18}$. Le falta $1 - \\frac{13}{18} = \\frac{5}{18}$ del camino.",
    },
  ],
};
