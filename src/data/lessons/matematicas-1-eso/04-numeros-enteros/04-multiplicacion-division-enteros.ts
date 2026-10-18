import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionEnterosLesson: InteractiveLesson = {
  slug: "multiplicacion-division-enteros",
  title: "4. Multiplicación y división de enteros",
  subtitle: TEMA_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Repetir o anular",
          message: "El primer factor dice si «repites» (positivo) o «anulas» (negativo) lo que expresa el segundo.",
        },
        {
          label: "Piensa en deudas",
          message: "Tres deudas de $5$ € son $-15$. Si te quitan esas tres deudas, tu situación mejora.",
        },
        {
          label: "Valores absolutos",
          message: "La cifra sale igual que con naturales. Lo nuevo es solo el signo.",
        },
      ],
      title: "Multiplicar: de dónde sale el signo",
      blocks: [
        {
          kind: "story",
          text: "Una gestoría recibe **3 facturas** de **5 €** cada una: pierde 15 €. Pero si el proveedor **anula** esas 3 facturas, ¿gana o pierde?",
        },
        {
          kind: "text",
          text: "Se multiplican los **valores absolutos**, igual que con los naturales: $3 \\cdot 5 = 15$. Lo nuevo es el **signo**: el primer factor dice si se **repite** (positivo) o se **anula** (negativo) lo que expresa el segundo.",
        },
        {
          kind: "compare",
          left: {
            title: "Repetir una factura",
            text: "Tres facturas de $5$ €: pierdes dinero.",
            math: ["(+3) \\cdot (-5) = -15"],
            tone: "warn",
          },
          right: {
            title: "Anular tres facturas",
            text: "Te quitan deudas: ganas dinero.",
            math: ["(-3) \\cdot (-5) = +15"],
            tone: "ok",
          },
        },
      ],
      visual: { kind: "anim", scene: "producto-signos", params: { a: 3, b: 5 } },
    },
    {
      id: "regla-signos",
      type: "slide",
      help: [
        {
          label: "La regla en una frase",
          message: "Signos iguales dan positivo; signos distintos, negativo.",
        },
        {
          label: "Con tres o más factores",
          message: "Multiplica de dos en dos, o cuenta los negativos: número par, $+$; número impar, $-$.",
        },
        {
          label: "Un truco para recordarlo",
          message: "«El enemigo de mi enemigo es mi amigo»: dos negativos dan un positivo.",
        },
      ],
      title: "La regla de los signos",
      blocks: [
        {
          kind: "rule",
          title: "Regla de los signos",
          text: "Signos **iguales** → resultado **positivo**. Signos **distintos** → resultado **negativo**.",
          formula: "\\begin{gathered} (+)\\cdot(+) = + \\qquad (-)\\cdot(-) = + \\\\ (+)\\cdot(-) = - \\qquad (-)\\cdot(+) = - \\end{gathered}",
        },
        {
          kind: "example",
          lines: [
            { math: "3 \\cdot (-2) = -6", note: "distintos" },
            { math: "(-2) \\cdot (-4) = +8", note: "iguales" },
            { math: "(-5) \\cdot (+3) = -15", note: "distintos" },
          ],
        },
        {
          kind: "warning",
          title: "Con tres o más factores",
          text: "Se multiplica de dos en dos, y el orden de agrupar no cambia el resultado. Atajo: un número **par** de factores negativos da $+$; un número **impar**, $-$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Primero los dos de la izquierda", "Primero los dos de la derecha"],
          expr: [
            { tokens: ["(−2)", "·", "(−3)", "·", "(−5)"], active: [0, 2], note: "$(-2)\\cdot(-3) = +6$ (signos iguales)." },
            { tokens: ["(+6)", "·", "(−5)"], active: [0, 2], fresh: [0, 0], note: "$(+6)\\cdot(-5) = -30$ (signos distintos)." },
            { tokens: ["−30"], fresh: [0, 0], note: "resultado: $-30$." },
          ],
          expr2: [
            { tokens: ["(−2)", "·", "(−3)", "·", "(−5)"], active: [2, 4], note: "$(-3)\\cdot(-5) = +15$ (signos iguales)." },
            { tokens: ["(−2)", "·", "(+15)"], active: [0, 2], fresh: [2, 2], note: "$(-2)\\cdot(+15) = -30$ (signos distintos)." },
            { tokens: ["−30"], fresh: [0, 0], note: "resultado: $-30$." },
          ],
        },
      },
    },
    {
      id: "check-tiempo",
      type: "predict",
      help: [
        {
          label: "¿Qué significa $-2$ horas?",
          message: "Mirar hacia atrás en el tiempo. Hacia delante la temperatura baja; hacia atrás hace el camino inverso.",
        },
        {
          label: "Piénsalo sin números",
          message: "Si ahora hace $10$ °C y la temperatura baja cada hora, ¿había más o menos grados hace una hora?",
        },
        {
          label: "Decide el signo antes de calcular",
          message: "Con el sentido común sabes si hace dos horas hacía más calor o más frío. Eso te da el signo del resultado.",
        },
      ],
      title: "Hacia atrás en el tiempo",
      question:
        "El termómetro baja **3 °C cada hora** (variación $-3$ por hora). ¿Cuál fue la variación de temperatura respecto de ahora **hace 2 horas** (es decir, $-2$ horas)?",
      mode: "choice",
      choices: [
        { id: "mas6", label: "$+6$ °C: hace dos horas marcaba $6$ grados más" },
        {
          id: "menos6",
          label: "$-6$ °C: hace dos horas marcaba $6$ grados menos",
          incorrectFeedback:
            "Si baja con el tiempo, mirando **hacia atrás** estaba más alto, no más bajo. Es $(-3)\\cdot(-2)$: signos iguales, positivo.",
        },
        {
          id: "mas5",
          label: "$+5$ °C",
          incorrectFeedback: "Has sumado $-3$ y $-2$ (o algo parecido). Aquí se **multiplica**: $|-3| \\cdot |-2| = 6$.",
        },
        {
          id: "menos5",
          label: "$-5$ °C",
          incorrectFeedback: "Has sumado en lugar de multiplicar. La variación por hora se repite durante dos horas: $(-3)\\cdot(-2)$.",
        },
      ],
      correctChoiceId: "mas6",
      shuffleChoices: true,
      explanation:
        "$(-3)\\cdot(-2) = +6$. Cuando algo baja con el tiempo, mirar atrás es subir: dos negativos dan un positivo.",
    },
    {
      id: "check-juego",
      type: "predict",
      help: [
        {
          label: "Multiplica en cadena",
          message: "Ve de izquierda a derecha, un factor cada vez, anotando el resultado parcial.",
        },
        {
          label: "Un atajo para el signo",
          message: "Cuenta cuántos factores son negativos: si hay un número par, el producto es positivo; si es impar, negativo.",
        },
        {
          label: "Valores absolutos",
          message: "Multiplica solo los números sin signo y pon el signo al final.",
        },
      ],
      title: "Factores en cadena",
      question:
        "En un juego, tu puntuación se multiplica en cada ronda por un factor: $-2$, $+3$, $-4$ y $-1$. Si empiezas con $1$ punto, ¿en cuánto acabas?",
      mode: "choice",
      choices: [
        { id: "m24", label: "$-24$" },
        {
          id: "p24",
          label: "$+24$",
          incorrectFeedback:
            "El valor absoluto es correcto, pero hay **tres** factores negativos (número impar), así que el signo es $-$.",
        },
        {
          id: "m4",
          label: "$-4$",
          incorrectFeedback: "Has sumado los factores ($-2 + 3 - 4 - 1 = -4$). Aquí se multiplican entre sí.",
        },
        {
          id: "m9",
          label: "$-9$",
          incorrectFeedback: "Has sumado los valores absolutos ($2 + 3 + 4$). Hay que multiplicarlos: $2 \\cdot 3 \\cdot 4 \\cdot 1 = 24$.",
        },
      ],
      correctChoiceId: "m24",
      shuffleChoices: true,
      explanation:
        "$(-2)\\cdot 3 = -6$; $(-6)\\cdot(-4) = +24$; $24\\cdot(-1) = -24$. Tres negativos (impar) → resultado negativo.",
    },
    {
      id: "division",
      type: "slide",
      help: [
        {
          label: "¿Por qué la misma regla?",
          message: "Dividir deshace multiplicar: si $(-3) \\cdot (+4) = -12$, entonces $(-12) : (+4) = -3$.",
        },
        {
          label: "¿Siempre hay cociente entero?",
          message: "Solo cuando la división es exacta.",
        },
        {
          label: "Cuidado con agrupar",
          message: "La división no es asociativa: el orden de agrupar cambia el resultado. Respeta los paréntesis.",
        },
      ],
      title: "Dividir: la operación inversa",
      blocks: [
        {
          kind: "definition",
          text: "Dividir deshace multiplicar, así que la **regla de los signos es la misma**: iguales, $+$; distintos, $-$.",
        },
        {
          kind: "example",
          lines: [
            { math: "(-12) : (+4) = -3", note: "distintos → $-$" },
            { math: "(+30) : (-5) = -6", note: "distintos → $-$" },
            { math: "(-15) : (-3) = +5", note: "iguales → $+$" },
            { math: "(+18) : (+9) = +2", note: "iguales → $+$" },
          ],
        },
        {
          kind: "warning",
          title: "Dos precauciones",
          text: "La división **no es asociativa**: $[(-60):(+6)]:(-2) = +5$, pero $(-60):[(+6):(-2)] = +20$. Y solo hay cociente entero si la división es **exacta**: $(-4):(+3)$ no es un entero.",
        },
      ],
      visual: { kind: "anim", scene: "division-inversa", params: { a: 4, b: 5 } },
    },
    {
      id: "combinadas",
      type: "slide",
      help: [
        {
          label: "El mismo orden de siempre",
          message: "Paréntesis, luego productos y cocientes, luego sumas y restas. Lo único nuevo son los signos.",
        },
        {
          label: "¿Qué hago con los signos de los resultados?",
          message: "Cada resultado parcial arrastra su signo: $6 - (-3)$ pasa a ser $6 + 3$.",
        },
      ],
      title: "Operaciones combinadas con enteros",
      blocks: [
        {
          kind: "steps",
          title: "Orden de prioridad",
          items: [
            "**Paréntesis** y corchetes, de dentro hacia fuera.",
            "**Multiplicaciones y divisiones**, de izquierda a derecha.",
            "**Sumas y restas**.",
          ],
        },
        {
          kind: "warning",
          text: "Los resultados parciales **arrastran su signo**: tras $(-12):(+4) = -3$, el paso siguiente es $6 - (-3)$, que es $6 + 3$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["15", "−", "3", "·", "[6", "−", "(−12)", ":", "(+4)]"], active: [6, 8], note: "dentro del corchete, primero la división: $(-12):(+4) = -3$." },
            { tokens: ["15", "−", "3", "·", "[6", "−", "(−3)]"], active: [4, 6], fresh: [6, 6], note: "el corchete: $6 - (-3) = 6 + 3 = 9$." },
            { tokens: ["15", "−", "3", "·", "9"], active: [2, 4], fresh: [4, 4], note: "ahora la multiplicación: $3 \\cdot 9 = 27$." },
            { tokens: ["15", "−", "27"], active: [0, 2], fresh: [2, 2], note: "por último la resta: $15 - 27 = -12$." },
            { tokens: ["−12"], fresh: [0, 0], note: "resultado: $-12$." },
          ],
        },
      },
    },
    {
      id: "check-combinada",
      type: "predict",
      help: [
        {
          label: "¿En qué orden?",
          message: "Primero los dos productos y después la resta. Cuidado: la resta tiene delante un producto con signo.",
        },
        {
          label: "Restar un negativo",
          message: "Restar un número negativo equivale a sumar su opuesto.",
          math: ["12 - (-5) = 12 + 5"],
        },
        {
          label: "Un producto cada vez",
          message: "Resuelve cada producto por separado con la regla de los signos antes de combinarlos.",
        },
      ],
      title: "Productos con resta",
      question:
        "Una aplicación calcula la diferencia entre dos balances: $(-3)\\cdot(-4) - (+2)\\cdot(-9)$. ¿Qué resultado da?",
      mode: "choice",
      choices: [
        { id: "30", label: "$30$" },
        {
          id: "m6",
          label: "$-6$",
          incorrectFeedback:
            "Has hecho $12 - 18$. Pero se resta $(-18)$, y restar un negativo es **sumar** $18$: $12 + 18$.",
        },
        {
          id: "m30",
          label: "$-30$",
          incorrectFeedback: "El primer producto, $(-3)\\cdot(-4)$, es $+12$: signos iguales dan positivo.",
        },
        {
          id: "p6",
          label: "$6$",
          incorrectFeedback:
            "Has calculado $18 - 12$. El segundo producto vale $-18$, y la expresión es $12 - (-18)$.",
        },
      ],
      correctChoiceId: "30",
      shuffleChoices: true,
      explanation:
        "$(+12) - (-18) = 12 + 18 = 30$: primero los productos, después la resta.",
    },
    {
      id: "check-reparto",
      type: "predict",
      help: [
        {
          label: "¿Qué signo tiene lo que toca a cada uno?",
          message: "La deuda es negativa. Si se reparte entre varias personas, cada una sigue debiendo una parte: sigue siendo una deuda.",
        },
        {
          label: "¿Qué operación es?",
          message: "Repartir a partes iguales es dividir: la deuda entre los amigos.",
        },
        {
          label: "Divide y pon el signo",
          message: "Divide los valores absolutos y decide el signo con la regla: ¿signos iguales o distintos?",
        },
      ],
      title: "Repartir una deuda",
      question:
        "Un grupo de **9** amigos reparte a partes iguales una deuda de **45 €**, que es $-45$ €. ¿Qué número entero expresa lo que le toca a cada uno?",
      mode: "choice",
      choices: [
        { id: "m5", label: "$-5$ €" },
        {
          id: "p5",
          label: "$+5$ €",
          incorrectFeedback:
            "Una deuda repartida sigue siendo deuda: $(-45):(+9)$ tiene signos distintos, así que el cociente es negativo.",
        },
        {
          id: "m36",
          label: "$-36$ €",
          incorrectFeedback: "Has restado ($-45 + 9$) en lugar de dividir.",
        },
        {
          id: "m405",
          label: "$-405$ €",
          incorrectFeedback: "Has multiplicado ($-45 \\cdot 9$). Repartir entre $9$ es dividir.",
        },
      ],
      correctChoiceId: "m5",
      shuffleChoices: true,
      explanation: "$(-45):(+9) = -5$: signos distintos dan negativo y $45 : 9 = 5$.",
    },
  ],
};
