import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const sumaRestaEnterosLesson: InteractiveLesson = {
  slug: "suma-resta-enteros",
  title: "2. Sumas y restas de enteros",
  subtitle: TEMA_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mismo-signo",
      type: "slide",
      help: [
        {
          label: "Piensa en pérdidas seguidas",
          message: "Si te quitan $3$ € y luego $8$ €, pierdes $11$ €. Las dos pérdidas van en el mismo sentido y se acumulan.",
        },
        {
          label: "En la recta",
          message: "Dos pasos hacia el mismo lado suman la distancia recorrida.",
        },
        {
          label: "Dos ejemplos",
          message: "$4 + 3 = +7$ (dos ganancias) y $-3 - 8 = -11$ (dos pérdidas).",
        },
      ],
      title: "Mismo signo: las distancias se suman",
      blocks: [
        {
          kind: "story",
          text: "Te quitan **3 €** de la cartera y, un rato después, otros **8 €**. Dos pérdidas seguidas: has perdido **11 €** en total.",
        },
        {
          kind: "rule",
          title: "Dos números con el mismo signo",
          text: "Se **suman** los valores absolutos y se deja el **mismo signo**.",
          formula: "4 + 3 = +7 \\qquad -3 - 8 = -11",
        },
        {
          kind: "example",
          lines: [
            { math: "4 + 3 = +7", note: "me dan 4 y me dan 3: gano 7" },
            { math: "-3 - 8 = -11", note: "me quitan 3 y me quitan 8: pierdo 11" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "suma-recta", params: { a: -3, b: -8 } },
    },
    {
      id: "distinto-signo",
      type: "slide",
      help: [
        {
          label: "Piensa en ganar y perder",
          message: "Si te dan $8$ € y te quitan $2$ €, ganas $6$ €. Lo que ganas y pierdes se compensa.",
        },
        {
          label: "¿Qué signo queda?",
          message: "El del que más pesa: tiene mayor valor absoluto, mayor «fuerza».",
        },
        {
          label: "El orden no importa",
          message: "Siempre que cada número conserve su signo, puedes cambiar el orden: $+2 - 5 = -5 + 2$.",
        },
      ],
      title: "Distinto signo: las distancias se restan",
      blocks: [
        {
          kind: "rule",
          title: "Dos números con distinto signo",
          text: "Se **restan** los valores absolutos (el mayor menos el menor) y se pone el signo del que tiene **mayor** valor absoluto.",
        },
        {
          kind: "example",
          lines: [
            { math: "-2 + 8 = +6", note: "me quitan 2 y me dan 8: gano 6" },
            { math: "+4 - 9 = -5", note: "me dan 4 y me quitan 9: pierdo 5" },
          ],
        },
        {
          kind: "warning",
          title: "El orden no importa",
          text: "Mientras cada número conserve **su signo**, se pueden intercambiar: $+2 - 5 = -5 + 2 = -3$.",
        },
      ],
      visual: { kind: "anim", scene: "fichas-opuestos", params: { a: 4, b: -9 } },
    },
    {
      id: "check-frio",
      type: "predict",
      help: [
        {
          label: "¿Sube o baja?",
          message: "Baja $7$ grados: la temperatura final es menor que $-4$, es decir, más a la izquierda en la recta.",
        },
        {
          label: "Dibújalo en la recta",
          message: "Parte de $-4$ y avanza $7$ pasos hacia la izquierda. Las dos cantidades van en el mismo sentido, por eso se suman las distancias.",
        },
        {
          label: "Descarta opciones",
          message: "Alguna opción es positiva. ¿Puede bajar la temperatura y acabar por encima de cero?",
        },
      ],
      title: "Dos bajadas seguidas",
      question:
        "Esta mañana el termómetro marcaba $-4$ °C y a lo largo del día ha bajado **7** grados más. ¿Qué temperatura marca ahora?",
      mode: "choice",
      choices: [
        { id: "m11", label: "$-11$ °C" },
        {
          id: "m3",
          label: "$-3$ °C",
          incorrectFeedback:
            "Has restado $7 - 4$. Pero $-4$ y $-7$ tienen el **mismo signo**: bajar desde un valor ya negativo hace el número más negativo, y se suman.",
        },
        {
          id: "p11",
          label: "$+11$ °C",
          incorrectFeedback: "La suma de valores absolutos es correcta, pero el signo no cambia: seguimos por debajo de $0$.",
        },
        {
          id: "p3",
          label: "$+3$ °C",
          incorrectFeedback: "Si empiezas bajo cero y sigues bajando, no puedes acabar por encima de $0$.",
        },
      ],
      correctChoiceId: "m11",
      shuffleChoices: true,
      explanation: "$-4 - 7 = -11$: mismo signo, se suman $4 + 7 = 11$ y se mantiene el $-$.",
    },
    {
      id: "check-saldo",
      type: "predict",
      help: [
        {
          label: "¿Qué hace un ingreso?",
          message: "Aumenta el saldo: te acerca al cero desde la deuda.",
        },
        {
          label: "¿Sales del rojo?",
          message: "Con una deuda de $35$ € y un ingreso de $20$ €, ¿te queda deuda o ya tienes saldo a favor?",
        },
        {
          label: "Signos distintos",
          message: "Se resta la distancia menor de la mayor, y el resultado lleva el signo del número que está más lejos del cero.",
        },
      ],
      title: "Saldo en rojo",
      question:
        "Una cuenta tiene un saldo de $-35$ € y hoy se ingresan **20 €**. ¿Cuál es el saldo ahora?",
      mode: "choice",
      choices: [
        { id: "m15", label: "$-15$ €" },
        {
          id: "m55",
          label: "$-55$ €",
          incorrectFeedback:
            "Has sumado $35 + 20$ como si los dos fueran deudas. Un ingreso va en sentido contrario a la deuda: se **restan** $35 - 20$.",
        },
        {
          id: "p15",
          label: "$+15$ €",
          incorrectFeedback:
            "La resta es correcta, pero el signo es el del número de mayor valor absoluto: $35 > 20$, y el $35$ era negativo.",
        },
        {
          id: "p55",
          label: "$+55$ €",
          incorrectFeedback: "El saldo sigue en rojo: el ingreso de $20$ € no cubre la deuda de $35$ €.",
        },
      ],
      correctChoiceId: "m15",
      shuffleChoices: true,
      explanation:
        "$-35 + 20$: distinto signo, se restan los valores absolutos ($35 - 20 = 15$) y gana el signo de $35$, que es $-$. Queda $-15$.",
    },
    {
      id: "varios-numeros",
      type: "slide",
      help: [
        {
          label: "Dos caminos",
          message: "Operar de izquierda a derecha o agrupar positivos por un lado y negativos por otro. El resultado es el mismo.",
        },
        {
          label: "Cuidado al agrupar",
          message: "El signo viaja con el número: en $3 - 8 + 6 - 4$, el $-8$ y el $-4$ son negativos y van juntos.",
        },
      ],
      title: "Varios números: dos caminos, mismo resultado",
      blocks: [
        {
          kind: "rule",
          title: "Con más de dos números",
          text: "Puedes operar **de izquierda a derecha**, de dos en dos, o **agrupar**: todo lo positivo por un lado, todo lo negativo por otro, y restar los dos resultados.",
        },
        {
          kind: "warning",
          text: "Al agrupar, cada número **lleva su signo**: en $3 - 8 + 6 - 4$ el $-8$ y el $-4$ van al grupo de los negativos.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Paso a paso", "Agrupando"],
          expr: [
            { tokens: ["3", "−", "8", "+", "6", "−", "4"], active: [0, 2], note: "de izquierda a derecha: $3 - 8 = -5$." },
            { tokens: ["−5", "+", "6", "−", "4"], active: [0, 2], fresh: [0, 0], note: "después: $-5 + 6 = 1$." },
            { tokens: ["1", "−", "4"], active: [0, 2], fresh: [0, 0], note: "y por último: $1 - 4 = -3$." },
            { tokens: ["−3"], fresh: [0, 0], note: "resultado: $-3$." },
          ],
          expr2: [
            { tokens: ["3", "−", "8", "+", "6", "−", "4"], note: "reordenamos: positivos juntos y negativos juntos, cada uno con su signo." },
            { tokens: ["3", "+", "6", "−", "8", "−", "4"], active: [0, 6], note: "sumamos cada grupo: $3 + 6 = 9$ y $8 + 4 = 12$." },
            { tokens: ["9", "−", "12"], active: [0, 2], fresh: [0, 0], note: "ahora los dos grupos: $9 - 12 = -3$." },
            { tokens: ["−3"], fresh: [0, 0], note: "resultado: $-3$." },
          ],
        },
      },
    },
    {
      id: "check-cuenta",
      type: "predict",
      help: [
        {
          label: "Ordena ingresos y pagos",
          message: "Los ingresos suman y los pagos restan. Haz una lista con los movimientos: $+7$, $-12$, $+5$, $-3$.",
        },
        {
          label: "Dos caminos",
          message: "Puedes ir de izquierda a derecha, o juntar por un lado todo lo positivo y por otro todo lo negativo, y restar los dos totales.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Entre los pagos hay $15$ € y solo tenías $7$ € más el ingreso de $5$ €. ¿Te quedas en positivo o en negativo?",
        },
      ],
      title: "Movimientos de una cuenta",
      question:
        "El saldo de una cuenta es $+7$ €. Pagas una factura de **12 €**, te ingresan **5 €** y pagas otra factura de **3 €**. ¿Cuál es el saldo final?",
      mode: "choice",
      choices: [
        { id: "m3", label: "$-3$ €" },
        {
          id: "p3",
          label: "$+3$ €",
          incorrectFeedback:
            "Los valores absolutos de la resta son correctos, pero ganan los negativos: $12 + 3 = 15$ frente a $7 + 5 = 12$, así que el signo es $-$.",
        },
        {
          id: "m13",
          label: "$-13$ €",
          incorrectFeedback: "Has tratado el ingreso de $5$ € como si fuera un pago. Los ingresos son positivos: $7 - 12 + 5 - 3$.",
        },
        {
          id: "p27",
          label: "$+27$ €",
          incorrectFeedback:
            "Has sumado todos los valores absolutos ($7 + 12 + 5 + 3$). Eso solo vale cuando todos los números llevan el mismo signo.",
        },
      ],
      correctChoiceId: "m3",
      shuffleChoices: true,
      explanation:
        "$7 - 12 + 5 - 3 = (7 + 5) - (12 + 3) = 12 - 15 = -3$.",
    },
    {
      id: "check-bolsa",
      type: "predict",
      help: [
        {
          label: "Agrupa por signo",
          message: "Junta las subidas ($+6$ y $+5$) y las bajadas ($-9$ y $-4$) por separado.",
        },
        {
          label: "Compara los dos totales",
          message: "¿Ganas más de lo que pierdes, o al revés? Eso decide el signo del resultado.",
        },
        {
          label: "Descarta opciones",
          message: "Ni $+24$ ni $-24$ pueden ser: eso sería sumar todos los números sin tener en cuenta los signos.",
        },
      ],
      title: "Variación total",
      question:
        "Una acción cambia en cuatro sesiones seguidas: $+6$, $-9$, $-4$ y $+5$ euros. ¿Cuál es la variación total?",
      mode: "choice",
      choices: [
        { id: "m2", label: "$-2$ €" },
        {
          id: "p2",
          label: "$+2$ €",
          incorrectFeedback:
            "Las dos sumas son correctas ($6 + 5 = 11$ y $9 + 4 = 13$) pero has puesto el signo del grupo equivocado: los negativos pesan más ($13 > 11$).",
        },
        {
          id: "p24",
          label: "$+24$ €",
          incorrectFeedback: "Has sumado los cuatro valores absolutos. Solo se suman así los que llevan el mismo signo.",
        },
        {
          id: "m24",
          label: "$-24$ €",
          incorrectFeedback: "Los valores absolutos solo se suman entre números del mismo signo; aquí hay dos subidas y dos bajadas.",
        },
      ],
      correctChoiceId: "m2",
      shuffleChoices: true,
      explanation: "$+6 - 9 - 4 + 5 = (6 + 5) - (9 + 4) = 11 - 13 = -2$.",
    },
  ],
};
