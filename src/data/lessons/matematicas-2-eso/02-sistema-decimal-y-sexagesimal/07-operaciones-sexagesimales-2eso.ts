import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const operacionesSexagesimales2esoLesson: InteractiveLesson = {
  slug: "operaciones-sexagesimales-2eso",
  title: "7. Operaciones con medidas sexagesimales",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [
        {
          label: "Normaliza al final",
          message: "Suma cada columna sin preocuparte de que pase de $60$; después convierte cada $60$ s en $1$ min y cada $60$ min en $1$ h.",
        },
        {
          label: "Misma idea con ángulos",
          message: "Con grados, minutos y segundos funciona igual: $60''$ = $1'$ y $60'$ = $1^\\circ$.",
        },
      ],
      title: "Sumar cantidades en forma compleja",
      blocks: [
        {
          kind: "text",
          text: "Un autobús tarda $2$ h $12$ min $34$ s en la ida y $1$ h $57$ min $46$ s en la vuelta. ¿Cuánto dura el viaje en total?",
        },
        {
          kind: "example",
          lines: [
            { math: "2\\,\\text{h}\\ 12\\,\\text{min}\\ 34\\,\\text{s} + 1\\,\\text{h}\\ 57\\,\\text{min}\\ 46\\,\\text{s} = 3\\,\\text{h}\\ 69\\,\\text{min}\\ 80\\,\\text{s}" },
            { math: "80\\,\\text{s} = 1\\,\\text{min}\\ 20\\,\\text{s} \\to 3\\,\\text{h}\\ 70\\,\\text{min}\\ 20\\,\\text{s}" },
            { math: "70\\,\\text{min} = 1\\,\\text{h}\\ 10\\,\\text{min} \\to 4\\,\\text{h}\\ 10\\,\\text{min}\\ 20\\,\\text{s}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "angulos-columna", params: { op: "+", a: 36, b: 45, c: 82, d: 56 } },
    },
    {
      id: "resta",
      type: "slide",
      help: [
        {
          label: "Pedir prestado",
          message: "Si en una columna el minuendo es menor que el sustraendo, se convierte una unidad superior en $60$ de la inferior, como al restar en columna con decimales.",
        },
        {
          label: "Ángulos",
          message: "$117^\\circ\\,55'\\,17'' - 43^\\circ\\,18'\\,25''$: los segundos no alcanzan ($17 < 25$); se toma $1'$ ($= 60''$) de los minutos.",
        },
      ],
      title: "Restar cantidades en forma compleja",
      blocks: [
        {
          kind: "text",
          text: "Un helicóptero recibe un aviso a las $18$ h $56$ min $45$ s y llega a las $19$ h $8$ min $15$ s. ¿Cuánto ha tardado?",
        },
        {
          kind: "example",
          lines: [
            { math: "19\\,\\text{h}\\ 8\\,\\text{min}\\ 15\\,\\text{s} = 18\\,\\text{h}\\ 67\\,\\text{min}\\ 75\\,\\text{s}", note: "se toma $1$ h y luego $1$ min" },
            { math: "18\\,\\text{h}\\ 67\\,\\text{min}\\ 75\\,\\text{s} - 18\\,\\text{h}\\ 56\\,\\text{min}\\ 45\\,\\text{s} = 0\\,\\text{h}\\ 11\\,\\text{min}\\ 30\\,\\text{s}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "angulos-columna", params: { op: "-", a: 87, b: 10, c: 36, d: 20 } },
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Multiplica cada parte",
          message: "Se multiplica por separado cada unidad y después se normaliza de abajo hacia arriba.",
        },
        {
          label: "Normalizar",
          message: "$650$ s son $10$ min y $50$ s; entonces $250 + 10 = 260$ min, que son $4$ h $20$ min.",
        },
      ],
      title: "Multiplicar por un número",
      blocks: [
        {
          kind: "text",
          text: "Una cadena de montaje lanza un lavavajillas cada $5$ min $13$ s. ¿Cuánto tarda en completar un pedido de $50$?",
        },
        {
          kind: "example",
          lines: [
            { math: "(5\\,\\text{min}\\ 13\\,\\text{s}) \\cdot 50 = 250\\,\\text{min}\\ 650\\,\\text{s}" },
            { math: "650\\,\\text{s} = 10\\,\\text{min}\\ 50\\,\\text{s} \\to 260\\,\\text{min}\\ 50\\,\\text{s}" },
            { math: "260\\,\\text{min} = 4\\,\\text{h}\\ 20\\,\\text{min} \\to 4\\,\\text{h}\\ 20\\,\\text{min}\\ 50\\,\\text{s}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "cociente",
      type: "slide",
      help: [
        {
          label: "De arriba abajo",
          message: "Se divide la unidad mayor; el resto se convierte en la unidad inferior (×60) y se suma a lo que ya hubiera.",
        },
        {
          label: "Un resto final",
          message: "Si al final queda resto, se puede dejar o seguir con décimas de segundo.",
        },
      ],
      title: "Dividir entre un número",
      blocks: [
        {
          kind: "text",
          text: "Una rotonda circular se divide en $7$ sectores iguales. ¿Cuánto mide el ángulo de cada uno?",
        },
        {
          kind: "example",
          lines: [
            { math: "360^\\circ : 7 = 51^\\circ \\quad (\\text{resto } 3^\\circ = 180')" },
            { math: "180' : 7 = 25' \\quad (\\text{resto } 5' = 300'')" },
            { math: "300'' : 7 = 42'' \\quad (\\text{resto } 6'')" },
            { math: "360^\\circ : 7 \\approx 51^\\circ\\,25'\\,42''" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["360°", ":", "7"], note: "dividimos los grados." },
            { tokens: ["51°", "resto 3° = 180′"], active: [0, 1], note: "el resto se convierte en minutos: $3 \\cdot 60$." },
            { tokens: ["51°", "25′", "resto 5′ = 300″"], active: [1, 2], note: "$180 : 7 = 25$, resto $5$; en segundos: $5 \\cdot 60 = 300$." },
            { tokens: ["51°", "25′", "42″"], fresh: [0, 2], note: "$300 : 7 = 42$, resto $6''$." },
          ],
        },
      },
    },
    {
      id: "check-suma",
      type: "predict",
      help: [
        {
          label: "Suma y normaliza",
          message: "$2\\,\\text{h}\\ 50\\,\\text{min} + 1\\,\\text{h}\\ 40\\,\\text{min} = 3\\,\\text{h}\\ 90\\,\\text{min}$. Pasa $60$ min a $1$ h.",
        },
      ],
      title: "Dos etapas",
      question: "Una etapa dura $2$ h $50$ min y la siguiente $1$ h $40$ min. ¿Cuánto duran entre las dos?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4$ h $30$ min" },
        { id: "b", label: "$3$ h $90$ min", incorrectFeedback: "Es la suma sin normalizar: $90$ min son $1$ h $30$ min." },
        { id: "c", label: "$3$ h $30$ min", incorrectFeedback: "Se te ha olvidado pasar la hora que sale de los $90$ min." },
        { id: "d", label: "$4$ h $90$ min", incorrectFeedback: "Has sumado una hora de más y no has normalizado." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3$ h $90$ min $= 3$ h $+ 1$ h $30$ min $= 4$ h $30$ min.",
    },
    {
      id: "check-resta",
      type: "predict",
      help: [
        {
          label: "Pide una hora",
          message: "$10$ min no alcanzan para restar $45$: convierte $1$ h en $60$ min: $4$ h $70$ min.",
        },
      ],
      title: "Un trayecto",
      question: "Un tren sale a las $5$ h $10$ min y llega a las $8$ h $5$ min. ¿Cuánto dura el viaje?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2$ h $55$ min" },
        { id: "b", label: "$3$ h $5$ min", incorrectFeedback: "$8$ h $5$ min $- 5$ h $10$ min no es $3$ h $5$ min: a $5$ min no se le puede restar $10$ sin pedir una hora." },
        { id: "c", label: "$3$ h $15$ min", incorrectFeedback: "Has sumado los minutos en lugar de restarlos." },
        { id: "d", label: "$2$ h $45$ min", incorrectFeedback: "Comprueba: $5$ h $10$ min $+ 2$ h $45$ min $= 7$ h $55$ min." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$8$ h $5$ min $= 7$ h $65$ min. $7$ h $65$ min $- 5$ h $10$ min $= 2$ h $55$ min.",
    },
    {
      id: "check-producto",
      type: "predict",
      help: [
        {
          label: "Cada parte por 3",
          message: "$1$ h $25$ min $\\cdot 3 = 3$ h $75$ min. Normaliza.",
        },
      ],
      title: "Tres veces",
      question: "Una tarea dura $1$ h $25$ min y se repite $3$ veces. ¿Cuánto dura todo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4$ h $15$ min" },
        { id: "b", label: "$3$ h $75$ min", incorrectFeedback: "Está sin normalizar: $75$ min son $1$ h $15$ min." },
        { id: "c", label: "$4$ h $75$ min", incorrectFeedback: "Has sumado la hora dos veces." },
        { id: "d", label: "$3$ h $15$ min", incorrectFeedback: "Has quitado la hora de los $75$ min en vez de sumarla." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(1\\,\\text{h}\\ 25\\,\\text{min}) \\cdot 3 = 3\\,\\text{h}\\ 75\\,\\text{min} = 4\\,\\text{h}\\ 15\\,\\text{min}$.",
    },
    {
      id: "check-cociente",
      type: "predict",
      help: [
        {
          label: "Divide por partes",
          message: "$100^\\circ : 3 = 33^\\circ$, resto $1^\\circ = 60'$. Ahora $60' : 3$.",
        },
      ],
      title: "Un ángulo en tres partes",
      question: "Un ángulo de $100^\\circ$ se divide en $3$ partes iguales. ¿Cuánto mide cada una?",
      mode: "choice",
      choices: [
        { id: "a", label: "$33^\\circ\\,20'$" },
        { id: "b", label: "$33^\\circ\\,33'$", incorrectFeedback: "El resto es $1^\\circ = 60'$, y $60' : 3 = 20'$." },
        { id: "c", label: "$33^\\circ\\,30'$", incorrectFeedback: "$30' \\cdot 3 = 90'$, no $60'$." },
        { id: "d", label: "$33^\\circ\\,10'$", incorrectFeedback: "$10' \\cdot 3 = 30'$, no $60'$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$100 : 3 = 33$ (resto $1^\\circ = 60'$) y $60' : 3 = 20'$: cada parte mide $33^\\circ\\,20'$.",
    },
  ],
};
