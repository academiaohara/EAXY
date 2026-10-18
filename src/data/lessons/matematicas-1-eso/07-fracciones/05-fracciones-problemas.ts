import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesProblemasLesson: InteractiveLesson = {
  slug: "fracciones-problemas",
  title: "5. Problemas con fracciones",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tipos",
      type: "slide",
      help: [
        {
          label: "¿Qué datos tengo?",
          message: "Mira qué te dan: ¿parte y total? ¿total y fracción? Cada pareja lleva a una cuenta distinta.",
        },
        {
          label: "Un truco",
          message: "Si la respuesta tiene que ser una fracción, probablemente te dan parte y total. Si tiene que ser una cantidad, te dan una fracción.",
        },
      ],
      title: "Dos problemas, dos preguntas",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "¿Qué fracción es?",
            text: "Conoces la **parte** y el **total**: parte entre total, y se simplifica.",
            math: ["\\frac{540}{1800} = \\frac{3}{10}"],
            tone: "info",
          },
          right: {
            title: "¿Cuánto es?",
            text: "Conoces el **total** y la **fracción**: se divide entre el denominador y se multiplica por el numerador.",
            math: ["\\frac{3}{10}\\ \\text{de}\\ 1800 = (1800 : 10)\\cdot 3 = 540"],
            tone: "key",
          },
        },
        {
          kind: "example",
          title: "Un sueldo de 1 800 € al mes",
          lines: [
            { math: "540\\ \\text{€ de hipoteca}\;\\longrightarrow\;\\frac{540}{1800} = \\frac{3}{10}", note: "dan la parte → piden la fracción" },
            { math: "\\tfrac{3}{10}\\ \\text{del sueldo}\;\\longrightarrow\;540\\ \\text{€}", note: "dan la fracción → piden la parte" },
          ],
        },
      ],
    },
    {
      id: "check-hipoteca-fraccion",
      type: "predict",
      help: [
        {
          label: "Parte entre total",
          message: "La fracción siempre es lo que te dan dividido entre el total.",
        },
        {
          label: "Simplificar",
          message: "Dividir entre el m.c.d. ($180$) simplifica en un solo paso.",
        },
      ],
      title: "Qué fracción del sueldo",
      question:
        "Un empleado gana 1 800 € al mes y dedica 540 € a pagar la hipoteca. ¿Qué fracción de su sueldo va a la hipoteca? (en su forma irreducible)",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\frac{3}{10}$" },
        {
          id: "b",
          label: "$\\frac{1800}{540}$",
          incorrectFeedback:
            "Está al revés: el total no va arriba. Esa fracción vale más que $1$ y la hipoteca es una parte del sueldo, menos que el sueldo entero.",
        },
        {
          id: "c",
          label: "$\\frac{54}{180}$",
          incorrectFeedback:
            "Es equivalente, pero no está simplificada: $54$ y $180$ siguen compartiendo divisores ($18$, por ejemplo).",
        },
        {
          id: "d",
          label: "$\\frac{540}{1260}$",
          incorrectFeedback:
            "Has puesto lo que **queda** del sueldo ($1800 - 540 = 1260$) como total. El total es el sueldo completo, $1800$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{540}{1800} = \\frac{540 : 180}{1800 : 180} = \\frac{3}{10}$.",
    },
    {
      id: "check-hipoteca-numero",
      type: "predict",
      help: [
        {
          label: "Es el caso anterior al revés",
          message: "Antes conocías parte y total y buscabas la fracción. Ahora conoces total y fracción y buscas la parte.",
        },
        {
          label: "Un décimo primero",
          message: "$1800 : 10$ es un décimo. Tres décimos son el triple.",
        },
      ],
      title: "Cuánto paga de hipoteca",
      question:
        "El mismo empleado, con un sueldo de 1 800 € al mes, dedica tres décimas partes del sueldo a la hipoteca. ¿Cuántos euros paga al mes?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$540$ €" },
        {
          id: "b",
          label: "$5\\,400$ €",
          incorrectFeedback:
            "Has multiplicado $1800 \\cdot 3$ sin dividir entre $10$. Una fracción menor que $1$ da una parte, menos que el sueldo entero.",
        },
        {
          id: "c",
          label: "$180$ €",
          incorrectFeedback:
            "Eso es **un** décimo ($1800 : 10$). Faltan multiplicar por el numerador: pagas tres décimos.",
        },
        {
          id: "d",
          label: "$600$ €",
          incorrectFeedback:
            "Has dividido entre el numerador, $3$. Se divide entre el denominador, $10$, y después se multiplica por $3$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{3}{10}$ de $1800 = (1800 : 10)\\cdot 3 = 180 \\cdot 3 = 540$ €.",
    },
    {
      id: "inverso",
      type: "slide",
      help: [
        {
          label: "Es deshacer la fracción",
          message: "Calcular la fracción de un número es dividir y multiplicar; el problema inverso deshace esos pasos en orden contrario.",
        },
        {
          label: "Un quinto primero",
          message: "Si dos quintos son $14$ €, un quinto es $7$ €. El total son cinco de esos.",
        },
      ],
      title: "Problema inverso: te dan la parte y la fracción",
      blocks: [
        {
          kind: "rule",
          title: "Cuando se conoce la parte",
          text: "Si la parte es $\\frac{n}{d}$ del total, **primero** se divide entre el numerador (cuánto vale una parte) y **después** se multiplica por el denominador (todas las partes).",
          formula: "\\text{total} = (\\text{parte} : n)\\cdot d",
        },
        {
          kind: "example",
          title: "Rosario saca $\\frac{3}{5}$ de su hucha y le quedan 14 €",
          lines: [
            { math: "1 - \\tfrac{3}{5} = \\tfrac{2}{5}", note: "lo que queda es $\\frac{2}{5}$ del total" },
            { math: "14 : 2 = 7", note: "euros que vale cada quinto" },
            { math: "7 \\cdot 5 = 35", note: "el total son cinco quintos: tenía 35 €" },
          ],
        },
        {
          kind: "warning",
          text: "Atención a **qué parte** te dan: aquí los $14$ € son lo que **queda** ($\\frac{2}{5}$), no lo que sacó ($\\frac{3}{5}$).",
        },
      ],
    },
    {
      id: "check-bidon",
      type: "predict",
      help: [
        {
          label: "¿Qué sé y qué busco?",
          message: "Conoces una parte ($8$ litros) y qué fracción del total es. Buscas el total: es un problema inverso.",
        },
        {
          label: "Comprueba el resultado",
          message: "Calcula $\\frac{2}{5}$ de tu resultado: tiene que dar $8$.",
        },
      ],
      title: "Capacidad de un bidón",
      question:
        "En un bidón hay 8 litros de agua, que son $\\frac{2}{5}$ de su capacidad total. ¿Cuántos litros caben en el bidón lleno?",
      mode: "choice",
      choices: [
        { id: "a", label: "$20$ litros" },
        {
          id: "b",
          label: "$3{,}2$ litros",
          incorrectFeedback:
            "Has calculado $\\frac{2}{5}$ de $8$, como si $8$ fuera el total. Pero $8$ es la parte, y el bidón lleno tiene que ser más grande.",
        },
        {
          id: "c",
          label: "$12$ litros",
          incorrectFeedback:
            "$8 : 2 \\cdot 3$ usa el $3$ de «lo que falta». Hay que multiplicar por el denominador, $5$, para tener todas las partes.",
        },
        {
          id: "d",
          label: "$40$ litros",
          incorrectFeedback:
            "Has multiplicado $8 \\cdot 5$ sin dividir antes entre $2$. Dos quintos no son un quinto: hay que saber cuánto vale **un** quinto.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$8 : 2 = 4$ litros cada quinto; $4 \\cdot 5 = 20$ litros en total.",
    },
    {
      id: "check-empanada",
      type: "predict",
      help: [
        {
          label: "¿Es directo o inverso?",
          message: "Conoces lo que has comprado ($300$ g) y qué fracción es del total. Buscas el total.",
        },
        {
          label: "Razonable",
          message: "Si $300$ g son menos de la mitad de la empanada ($\\frac{2}{5}$), la empanada entera pesa más del doble de $300$.",
        },
      ],
      title: "La empanada",
      question:
        "He comprado $\\frac{2}{5}$ de una empanada y el trozo pesa 300 gramos. ¿Cuánto pesa la empanada entera?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$750$ g" },
        {
          id: "b",
          label: "$120$ g",
          incorrectFeedback:
            "Has hecho $\\frac{2}{5}$ de $300$. Pero los $300$ g ya son los $\\frac{2}{5}$: la empanada entera debe pesar más que el trozo.",
        },
        {
          id: "c",
          label: "$1\\,500$ g",
          incorrectFeedback:
            "Has multiplicado $300 \\cdot 5$ sin dividir entre $2$. Los $300$ g son **dos** quintos, no uno.",
        },
        {
          id: "d",
          label: "$450$ g",
          incorrectFeedback:
            "Has sumado la mitad de $300$ al trozo. Hay que saber cuánto pesa un quinto ($300 : 2 = 150$) y multiplicar por $5$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Un quinto: $300 : 2 = 150$ g. Entera: $150 \\cdot 5 = 750$ g.",
    },
    {
      id: "check-finca",
      type: "predict",
      help: [
        {
          label: "¿Qué fracción queda sin sembrar?",
          message: "Si se ha sembrado $\\frac{4}{5}$, el resto es $1 - \\frac{4}{5}$. Esa es la fracción que corresponde a los $600$ m².",
        },
        {
          label: "Comprueba",
          message: "Los $\\frac{4}{5}$ de tu resultado más los $600$ m² que quedan deben dar el total.",
        },
      ],
      title: "La finca",
      question:
        "En una finca se ha sembrado alfalfa en los $\\frac{4}{5}$ de su superficie, y aún quedan 600 m² sin sembrar. ¿Cuál es la superficie total de la finca?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$3\\,000$ m²" },
        {
          id: "b",
          label: "$750$ m²",
          incorrectFeedback:
            "Has tratado los $600$ m² como $\\frac{4}{5}$ del total ($600 : 4 \\cdot 5$). Pero $600$ m² es lo que queda **sin sembrar**, o sea, $\\frac{1}{5}$.",
        },
        {
          id: "c",
          label: "$2\\,400$ m²",
          incorrectFeedback:
            "Eso son los metros **sembrados** ($600 \\cdot 4$). La pregunta es por la superficie total, que incluye también los $600$ m² sin sembrar.",
        },
        {
          id: "d",
          label: "$480$ m²",
          incorrectFeedback:
            "$\\frac{4}{5}$ de $600$ no es la respuesta: $600$ no es el total, sino la parte que falta.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Sin sembrar: $1 - \\frac{4}{5} = \\frac{1}{5}$, así que $\\frac{1}{5}$ de la finca son $600$ m². Total: $600 \\cdot 5 = 3\\,000$ m².",
    },
    {
      id: "reloj-minutos",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué representa cada porción?",
          message: "La esfera es una hora, es decir, $60$ minutos, partida en $20$ porciones iguales. Cada porción vale un tiempo fijo.",
        },
        {
          label: "De minutos a porciones",
          message: "Divide los minutos que piden entre lo que vale cada porción: te dice cuántas marcar.",
        },
      ],
      title: "Minutos en el reloj",
      question:
        "La esfera representa una hora y está dividida en $20$ porciones iguales de $3$ minutos. Marca $12$ minutos.",
      shape: "circle",
      numerator: 12,
      denominator: 60,
      parts: 20,
      itemLabel: "porción",
      hint: "Una hora son $60$ minutos. ¿Cuántas porciones de $3$ minutos hacen $12$ minutos?",
      explanation:
        "$12 : 3 = 4$ porciones de $20$: $\\frac{4}{20} = \\frac{12}{60}$ de hora.",
    },
    {
      id: "check-fraccion",
      type: "predict",
      help: [
        {
          label: "¿Cómo escribo «parte del total»?",
          message: "Parte entre total: los minutos que te dan sobre los minutos que tiene la hora.",
          math: ["\\frac{\\text{parte}}{\\text{total}}"],
        },
        {
          label: "Compruébalo",
          message: "Calcula tu fracción de $60$ minutos: tiene que dar $12$.",
        },
      ],
      title: "Minutos en una hora",
      question:
        "Una clase de repaso dura 12 minutos. ¿Qué fracción de hora es, escrita en su forma irreducible?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\frac{1}{5}$ de hora" },
        {
          id: "b",
          label: "$\\frac{12}{60}$ de hora",
          incorrectFeedback:
            "Es correcta, pero no irreducible: $12$ y $60$ comparten el divisor $12$, que da $\\frac{1}{5}$.",
        },
        {
          id: "c",
          label: "$\\frac{1}{12}$ de hora",
          incorrectFeedback:
            "Has dejado el $12$ en el denominador. El total de la hora son $60$ minutos, y los $12$ minutos son la parte.",
        },
        {
          id: "d",
          label: "$\\frac{1}{6}$ de hora",
          incorrectFeedback:
            "$\\frac{1}{6}$ de hora son $10$ minutos. Comprueba: $60 : 6 = 10$, no $12$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{12}{60} = \\frac{12 : 12}{60 : 12} = \\frac{1}{5}$ de hora.",
    },
  ],
};
