import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesComunDenominadorLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-comun-denominador",
  title: "1. Reducción a común denominador",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "trozos-distintos",
      type: "slide",
      help: [
        {
          label: "Piensa en trozos del mismo tamaño",
          message: "Comparar $\\frac{2}{7}$ con $\\frac{5}{7}$ es contar trozos iguales. Con tamaños distintos hay que igualarlos antes.",
        },
        {
          label: "¿Qué significa «equivalente»?",
          message: "Que vale lo mismo aunque se escriba distinto: la parte de la barra que ocupa no cambia.",
        },
        {
          label: "¿Por qué multiplico arriba y abajo?",
          message: "Si cortas cada trozo en $3$, hay $3$ veces más trozos en total (denominador) y $3$ veces más coloreados (numerador).",
        },
      ],
      title: "Comparar y sumar es contar trozos del mismo tamaño",
      blocks: [
        {
          kind: "definition",
          text: "Dos fracciones se pueden comparar, sumar o restar con facilidad cuando tienen el **mismo denominador**: los trozos son iguales y solo hay que contarlos.",
        },
        {
          kind: "compare",
          left: {
            title: "Mismo denominador",
            text: "Se comparan los numeradores.",
            math: ["\\frac{2}{7} < \\frac{5}{7}"],
            tone: "ok",
          },
          right: {
            title: "Distinto denominador",
            text: "Trozos de tamaño distinto: no se pueden contar juntos.",
            math: ["\\frac{2}{3}\\ \\text{y}\\ \\frac{4}{9}\\ ?"],
            tone: "warn",
          },
        },
        {
          kind: "rule",
          title: "Fracción equivalente",
          text: "Multiplicar numerador y denominador por el mismo número **no cambia el valor**.",
          formula: "\\frac{a}{b} = \\frac{a \\cdot k}{b \\cdot k}",
        },
        {
          kind: "warning",
          text: "Si multiplicas **solo** el denominador, cambias el valor: $\\frac{2}{3}$ y $\\frac{2}{9}$ no son lo mismo.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-equivalente", params: { a: 2, b: 3, c: 3 } },
    },
    {
      id: "metodo-mcm",
      type: "slide",
      help: [
        {
          label: "¿Por qué el m.c.m.?",
          message: "Es el menor número que todos los denominadores dividen. Un múltiplo mayor también vale, pero genera cifras más grandes.",
        },
        {
          label: "¿Por cuánto multiplico cada fracción?",
          message: "Por lo que le falta al denominador para llegar al común: el cociente entre el m.c.m. y ese denominador. Lo mismo arriba y abajo.",
        },
        {
          label: "¿Cómo calculo el m.c.m.?",
          message: "Descompón cada denominador en primos y quédate con cada primo elevado a su mayor exponente.",
        },
      ],
      title: "Reducir a común denominador con el m.c.m.",
      blocks: [
        {
          kind: "steps",
          title: "Método",
          items: [
            "Calcula el **m.c.m.** de los denominadores: será el denominador común $m$.",
            "Divide $m$ entre cada denominador: ese cociente es el número por el que se multiplica.",
            "Multiplica **numerador y denominador** de cada fracción por su cociente.",
          ],
        },
        {
          kind: "example",
          title: "Reducir $\\frac{1}{4}$ y $\\frac{1}{6}$",
          lines: [
            { math: "\\text{m.c.m.}(4, 6) = 12" },
            { math: "\\frac{1}{4} = \\frac{1 \\cdot 3}{4 \\cdot 3} = \\frac{3}{12}", note: "$12 : 4 = 3$" },
            { math: "\\frac{1}{6} = \\frac{1 \\cdot 2}{6 \\cdot 2} = \\frac{2}{12}", note: "$12 : 6 = 2$" },
          ],
        },
        {
          kind: "warning",
          text: "Cualquier múltiplo común sirve, pero el m.c.m. te da los números más pequeños y menos cuentas.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [4, 6], mode: "mcm" } },
    },
    {
      id: "pizzas",
      type: "predict",
      help: [
        {
          label: "¿Puedo comparar directamente?",
          message: "No: cuartos y octavos son trozos de distinto tamaño. Primero hay que escribirlas con el mismo denominador.",
        },
        {
          label: "¿Qué denominador uso?",
          message: "Uno que sea múltiplo de $4$ y de $8$. Fíjate: ¿$8$ ya es múltiplo de $4$?",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Imagina cada pizza partida en $8$ trozos. ¿Cuántos trozos son $\\frac{3}{4}$ de pizza?",
        },
      ],
      title: "Dos pizzas",
      question:
        "Lucía se come 3/4 de una pizza y Hugo 5/8 de otra pizza igual. ¿Quién ha comido más?",
      mode: "choice",
      choices: [
        { id: "a", label: "Lucía" },
        {
          id: "b",
          label: "Hugo",
          incorrectFeedback:
            "Has comparado solo los numeradores ($5 > 3$). Pero cuartos y octavos son trozos de distinto tamaño: $\\frac{3}{4}$ equivale a $\\frac{6}{8}$.",
        },
        {
          id: "c",
          label: "Los dos lo mismo",
          incorrectFeedback:
            "No coinciden: $\\frac{3}{4} = \\frac{6}{8}$ y Hugo se ha comido $\\frac{5}{8}$. Un trozo de diferencia.",
        },
        {
          id: "d",
          label: "No se puede saber sin dibujarlo",
          incorrectFeedback:
            "Sí se puede: reduciendo a común denominador las dos fracciones se comparan contando trozos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "m.c.m.$(4, 8) = 8$. $\\frac{3}{4} = \\frac{6}{8}$ y $\\frac{6}{8} > \\frac{5}{8}$: Lucía ha comido más.",
    },
    {
      id: "tres-fracciones",
      type: "slide",
      help: [
        {
          label: "Con tres fracciones",
          message: "Se hace igual: un único común denominador para las tres, calculado con los tres denominadores a la vez.",
        },
        {
          label: "Comprueba el valor",
          message: "$\\frac{5}{8}$ y $\\frac{15}{24}$ valen lo mismo: al dividir $5 : 8$ y $15 : 24$ sale el mismo decimal.",
        },
        {
          label: "¿Cómo ordeno después?",
          message: "Con el mismo denominador, la fracción mayor es la de mayor numerador.",
        },
      ],
      title: "Ordenar varias fracciones",
      blocks: [
        {
          kind: "text",
          text: "Para ordenar $\\frac{5}{8}$, $\\frac{3}{4}$ y $\\frac{7}{12}$ se calcula **un solo** denominador común para las tres.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{m.c.m.}(8, 4, 12) = 24" },
            { math: "\\frac{5}{8} = \\frac{15}{24}", note: "$24 : 8 = 3$" },
            { math: "\\frac{3}{4} = \\frac{18}{24}", note: "$24 : 4 = 6$" },
            { math: "\\frac{7}{12} = \\frac{14}{24}", note: "$24 : 12 = 2$" },
          ],
        },
        {
          kind: "rule",
          title: "Con el mismo denominador",
          text: "Gana la de **mayor numerador**: $\\frac{14}{24} < \\frac{15}{24} < \\frac{18}{24}$, es decir,",
          formula: "\\frac{7}{12} < \\frac{5}{8} < \\frac{3}{4}",
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [8, 4, 12], mode: "mcm" } },
    },
    {
      id: "ordenar",
      type: "predict",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Calcula el m.c.m. de $3$, $9$ y $6$ y escribe las tres fracciones con ese denominador.",
        },
        {
          label: "¿Qué orden piden?",
          message: "De menor a mayor: la primera de la lista es la más pequeña.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$\\frac{5}{6}$ está muy cerca de $1$ y $\\frac{4}{9}$ es menos que la mitad: ya sabes cuáles van en los extremos.",
        },
      ],
      title: "Tres tramos de una ruta",
      question:
        "Tres amigas han recorrido 2/3, 4/9 y 5/6 de una misma ruta. ¿Cuál es el orden de menor a mayor recorrido?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\frac{4}{9} < \\frac{2}{3} < \\frac{5}{6}$" },
        {
          id: "b",
          label: "$\\frac{2}{3} < \\frac{4}{9} < \\frac{5}{6}$",
          incorrectFeedback:
            "$\\frac{2}{3} = \\frac{6}{9}$, que es más que $\\frac{4}{9}$: el orden de esas dos está al revés.",
        },
        {
          id: "c",
          label: "$\\frac{5}{6} < \\frac{2}{3} < \\frac{4}{9}$",
          incorrectFeedback:
            "Ese es casi el orden de **mayor a menor** y además falla: $\\frac{4}{9}$ es la más pequeña de las tres.",
        },
        {
          id: "d",
          label: "$\\frac{2}{3} < \\frac{5}{6} < \\frac{4}{9}$",
          incorrectFeedback:
            "Con denominador $18$: $\\frac{12}{18}$, $\\frac{8}{18}$ y $\\frac{15}{18}$. $\\frac{4}{9} = \\frac{8}{18}$ es la menor, no la mayor.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "m.c.m.$(3, 9, 6) = 18$: $\\frac{2}{3} = \\frac{12}{18}$, $\\frac{4}{9} = \\frac{8}{18}$ y $\\frac{5}{6} = \\frac{15}{18}$. Ordenadas: $\\frac{8}{18} < \\frac{12}{18} < \\frac{15}{18}$.",
    },
    {
      id: "check-mcm",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué estamos haciendo?",
          message: "Cambiar la forma de escribir $\\frac{1}{2}$ sin cambiar su valor: sextos en lugar de medios.",
        },
        {
          label: "¿Por cuánto multiplico?",
          message: "El denominador pasa de $2$ a $6$. Multiplica el numerador por el mismo número para no cambiar el valor.",
          math: ["\\frac{1}{2} = \\frac{1 \\cdot ?}{2 \\cdot ?}"],
        },
        {
          label: "Visualízalo",
          message: "Cada mitad de la barra se corta en tantos trozos como sextos caben en un medio.",
        },
      ],
      title: "Comprueba el método",
      question:
        "Reducimos $\\frac{1}{2}$ y $\\frac{1}{3}$ a denominador común $6$: la barra ya está partida en sextos. Colorea $\\frac{1}{2}$ de la barra.",
      shape: "bar",
      numerator: 1,
      denominator: 2,
      parts: 6,
      hint: "Media barra es lo mismo que cierto número de sextos. ¿Cuántas veces cabe $2$ en $6$?",
      explanation:
        "Has coloreado $3$ sextos: $6 : 2 = 3$, así que se amplía multiplicando numerador y denominador **por $3$**: $\\frac{1}{2} = \\frac{1 \\cdot 3}{2 \\cdot 3} = \\frac{3}{6}$.",
    },
  ],
};
