import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_5_SUBTITLE } from "@/data/lessons/shared";

export const operacionesNumerosDecimalesLesson: InteractiveLesson = {
  slug: "operaciones-numeros-decimales",
  title: "2. Operaciones con números decimales",
  subtitle: TEMA_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      title: "Sumar: coma bajo coma",
      blocks: [
        {
          kind: "story",
          text: "Cuatro amigos juntan dinero para un regalo: Juan **4,35 €**, María **3,1 €**, Carla **6,22 €** y Sergio **5,3 €**. ¿Cuánto reúnen?",
        },
        {
          kind: "steps",
          items: [
            "Se colocan en columna **coma bajo coma**: unidades con unidades, décimas con décimas…",
            "Se rellenan con **ceros** los huecos a la derecha de la coma ($3{,}1 = 3{,}10$).",
            "Se suma como con naturales, de derecha a izquierda, y la coma **baja** al resultado.",
          ],
        },
        {
          kind: "warning",
          text: "Se alinea por la **coma**, no por el final de cada número: si no, se suman décimas con centésimas.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "decimal-columna",
        params: { terms: ["4,35", "3,1", "6,22", "5,3"], op: "+" },
      },
    },
    {
      id: "resta",
      type: "slide",
      title: "Restar: igual que sumar, y los ceros ya no son opcionales",
      blocks: [
        {
          kind: "rule",
          text: "Se alinean las comas y, si el minuendo tiene menos cifras decimales, se le añaden **ceros** para poder restar columna a columna.",
          formula: "18{,}6 - 7{,}45 = 18{,}60 - 7{,}45 = 11{,}15",
        },
        {
          kind: "warning",
          title: "Comprueba",
          text: "Una estimación detecta errores de coma: $18{,}6 - 7{,}45 \\approx 19 - 7 = 12$. El resultado debe quedar cerca de $12$: $11{,}15$ cuadra.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "decimal-columna",
        params: { terms: ["18,6", "7,45"], op: "-" },
      },
    },
    {
      id: "check-ticket",
      type: "predict",
      title: "El ticket del súper",
      question:
        "En la panadería pagas el pan por 1,20 €, la leche por 0,95 € y la fruta por 2,5 €. ¿Cuánto es el total de la compra?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$4{,}65\\,€$" },
        {
          id: "b",
          label: "$2{,}40\\,€$",
          incorrectFeedback:
            "Has alineado $2{,}5$ por la derecha, como si fuera $0{,}25$. La fruta son $2{,}50\\,€$: la coma debe quedar bajo las demás.",
        },
        {
          id: "c",
          label: "$3{,}65\\,€$",
          incorrectFeedback:
            "Falta una unidad: $1{,}20 + 0{,}95 = 2{,}15$, y al sumar $2{,}50$ las unidades dan $4$, no $3$. Revisa las llevadas.",
        },
        {
          id: "d",
          label: "$4{,}15\\,€$",
          incorrectFeedback:
            "Te has dejado los $0{,}50\\,€$ de la fruta: $2{,}5$ son dos euros **y cincuenta céntimos**.",
        },
      ],
      correctChoiceId: "a",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Piensa en tu cartera: cada cosa que coges es dinero que sale, y «el total» es todo lo que sale junto.",
          detail: ["Juntar cantidades de dinero es sumar. Aquí no hay nada que repartir ni que comparar: solo tres precios que se acumulan."],
          branches: [
            {
              label: "¿Cómo coloco los números?",
              message: "Escribe $2{,}5$ como $2{,}50$ para que los tres precios tengan dos decimales, y pon las comas en vertical:",
              visual: { kind: "stack", rows: ["1{,}20", "0{,}95", "2{,}50"], operator: "+", result: "?" },
            },
          ],
        },
        {
          label: "Quiero saber si mi resultado es razonable",
          message: "Antes de sumar, redondea cada precio al euro más cercano: $1 + 1 + 3$.",
          detail: [
            "Eso te da una referencia: el total real tiene que andar cerca de esa cifra. Compara con las opciones y desconfía de las que se alejen mucho.",
          ],
        },
        {
          label: "Me lío con las comas",
          message: "La coma solo separa los **euros** de los **céntimos**: $0{,}95$ son $95$ céntimos y $2{,}5$ son $2$ euros y $50$ céntimos.",
          branches: [
            {
              label: "¿Y si lo hago todo en céntimos?",
              message: "Pasa cada precio a céntimos y suma números enteros, sin comas:",
              math: ["120 + 95 + 250 = \;?\\text{ céntimos}"],
              detail: ["Cuando tengas el total, conviértelo a euros dividiendo entre $100$: la coma vuelve a dejar dos decimales."],
            },
          ],
        },
      ],
      shuffleChoices: true,
      explanation:
        "$1{,}20 + 0{,}95 + 2{,}50 = 4{,}65$: con las comas alineadas, centésimas con centésimas y décimas con décimas.",
    },
    {
      id: "check-cambio",
      type: "predict",
      title: "El cambio",
      question:
        "Pagas con un billete de 20 € una compra de 13,85 €. ¿Cuánto dinero te tienen que devolver?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$6{,}15\\,€$" },
        {
          id: "b",
          label: "$7{,}15\\,€$",
          incorrectFeedback:
            "Eso es $20 - 12{,}85$. Has restado $13$ y después has **sumado** los $0{,}85$ en vez de quitarlos también.",
        },
        {
          id: "c",
          label: "$6{,}25\\,€$",
          incorrectFeedback:
            "En la cadena de préstamos, la columna de las décimas se queda en $9$ (no en $10$): $9 - 8 = 1$, no $2$.",
        },
        {
          id: "d",
          label: "$-6{,}15\\,€$",
          incorrectFeedback:
            "El cambio no puede ser negativo: pagas con **más** dinero del que cuesta la compra.",
        },
      ],
      correctChoiceId: "a",
      help: [
        {
          label: "¿Suma o resta?",
          message: "El cambio es lo que **te falta** para llegar a lo que has dado.",
          detail: [
            "Se cumple siempre que *cambio + precio = billete*. Si despejas el cambio, queda una resta: el billete menos el precio.",
          ],
        },
        {
          label: "Quiero saber si mi resultado es razonable",
          message: "Redondea la compra: $13{,}85$ es casi $14$ €, y de $14$ a $20$ hay una distancia fácil de calcular de cabeza.",
          detail: ["El cambio real será un poco mayor que esa estimación, porque has redondeado la compra hacia arriba."],
        },
        {
          label: "Restar con tantos decimales me cuesta",
          message: "Puedes evitar la resta en columna contando **hacia arriba**, como hace un cajero.",
          detail: ["Primero lo que falta para llegar a un número redondo; después, el resto hasta el billete."],
          branches: [
            {
              label: "¿Cómo se hace?",
              message: "De $13{,}85$ a $14$ faltan $0{,}15$. Ahora cuenta de $14$ a $20$ y junta los dos trozos.",
              math: ["13{,}85 \\xrightarrow{+\\,0{,}15} 14 \\xrightarrow{+\\,?} 20"],
            },
          ],
        },
      ],
      shuffleChoices: true,
      explanation:
        "$20{,}00 - 13{,}85 = 6{,}15$. Se pide prestado en cadena: $10 - 5 = 5$ centésimas, $9 - 8 = 1$ décima y $19 - 13 = 6$ unidades.",
    },
    {
      id: "hucha",
      type: "slide",
      title: "Ingresos y gastos: valen las reglas de los enteros",
      arrange: "text-top",
      blocks: [
        {
          kind: "story",
          text: "La hucha de Iván tiene **134,56 €**. Ingresa **13,70 €** y **5,06 €**, y saca **12,80 €** y **5,75 €**. ¿Cuánto le queda?",
        },
        {
          kind: "rule",
          text: "Con decimales valen las **mismas reglas que con enteros**: los ingresos suman, las extracciones restan, y se puede operar en orden o **agrupar** ingresos por un lado y gastos por otro.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["En orden", "Agrupando"],
          expr: [
            { tokens: ["134,56", "+", "13,70", "+", "5,06", "−", "12,80", "−", "5,75"], active: [0, 2], note: "$134{,}56 + 13{,}70 = 148{,}26$." },
            { tokens: ["148,26", "+", "5,06", "−", "12,80", "−", "5,75"], active: [0, 2], fresh: [0, 0], note: "$148{,}26 + 5{,}06 = 153{,}32$." },
            { tokens: ["153,32", "−", "12,80", "−", "5,75"], active: [0, 2], fresh: [0, 0], note: "$153{,}32 - 12{,}80 = 140{,}52$." },
            { tokens: ["140,52", "−", "5,75"], active: [0, 2], fresh: [0, 0], note: "$140{,}52 - 5{,}75 = 134{,}77$." },
            { tokens: ["134,77"], fresh: [0, 0], note: "le quedan $134{,}77\\,€$." },
          ],
          expr2: [
            { tokens: ["134,56", "+", "13,70", "+", "5,06", "−", "12,80", "−", "5,75"], note: "agrupamos: lo que entra por un lado y lo que sale por otro." },
            { tokens: ["(134,56", "+", "13,70", "+", "5,06)", "−", "(12,80", "+", "5,75)"], active: [0, 4], note: "ingresos: $153{,}32$. Gastos: $18{,}55$." },
            { tokens: ["153,32", "−", "18,55"], active: [0, 2], fresh: [0, 2], note: "$153{,}32 - 18{,}55 = 134{,}77$." },
            { tokens: ["134,77"], fresh: [0, 0], note: "el mismo resultado: $134{,}77\\,€$." },
          ],
        },
      },
    },
    {
      id: "multiplicacion",
      type: "slide",
      title: "Multiplicar: sin comas, y se cuentan los decimales",
      blocks: [
        {
          kind: "story",
          text: "Marta compra una pieza de **3,5 m** de tela que se vende a **12,85 € el metro**. ¿Cuánto paga?",
          src: "/lesson/decimales/rollo-tela.png",
          alt: "Rollo de tela con una cinta métrica",
          side: "right",
        },
        {
          kind: "steps",
          items: [
            "Se multiplica como si fueran **naturales**, sin comas.",
            "Se cuentan las cifras decimales de **todos los factores**.",
            "En el producto se separan **tantas cifras decimales** como se hayan contado.",
          ],
        },
        {
          kind: "warning",
          title: "Con dinero",
          text: "Se redondea a **céntimos**: $44{,}975\\,€ \\approx 44{,}98\\,€$.",
        },
      ],
      visual: { kind: "anim", scene: "decimal-producto", params: { terms: ["12,85", "3,5"], places: 2 } },
    },
    {
      id: "check-baldosa",
      type: "predict",
      title: "Superficie de una baldosa",
      question:
        "Una baldosa rectangular mide 0,4 m de ancho y 0,3 m de largo. ¿Cuál es su superficie en metros cuadrados?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$0{,}12\\ \\mathrm{m}^2$" },
        {
          id: "b",
          label: "$1{,}2\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has separado una sola cifra decimal. Cada factor aporta una: $1 + 1 = 2$ cifras decimales en el producto.",
        },
        {
          id: "c",
          label: "$0{,}012\\ \\mathrm{m}^2$",
          incorrectFeedback:
            "Has separado tres cifras decimales; solo hay dos en total ($0{,}4$ y $0{,}3$ tienen una cada uno).",
        },
        {
          id: "d",
          label: "$0{,}7\\ \\mathrm{m}^2$",
          incorrectFeedback: "Eso es la **suma** $0{,}4 + 0{,}3$. La superficie de un rectángulo se obtiene multiplicando.",
        },
      ],
      correctChoiceId: "a",
      help: [
        {
          label: "¿Qué operación me piden?",
          message: "La superficie de un rectángulo es **ancho × largo**, igual que con números enteros: que sean decimales no cambia la fórmula.",
          detail: ["Sumar los lados daría el recorrido alrededor de la baldosa, no lo que ocupa."],
        },
        {
          label: "¿Dónde pongo la coma?",
          message: "Olvídate de las comas, multiplica como si fueran naturales y coloca la coma al final.",
          detail: [
            "Cuenta los decimales de **cada factor** y súmalos: ese es el número de cifras decimales que debe tener el producto.",
          ],
          math: ["0{,}4 \\cdot 0{,}3 \;\\to\; 4 \\cdot 3 = ?\;\;\\text{y}\;\;1+1\\text{ decimales}"],
          branches: [
            {
              label: "¿Cómo sé si he acertado con la coma?",
              message: "Mira el tamaño: $0{,}4$ es menos de medio metro y $0{,}3$ también, así que la baldosa es **más pequeña** que cualquiera de sus lados expresado en metros.",
              detail: ["Multiplicar por un número menor que $1$ hace el resultado más pequeño. Si te sale mayor que $0{,}4$, la coma está mal."],
            },
          ],
        },
      ],
      shuffleChoices: true,
      explanation:
        "$4 \\cdot 3 = 12$, con $1 + 1 = 2$ cifras decimales: $0{,}12\\ \\mathrm{m}^2$. Es menor que $0{,}3$: multiplicar por un número menor que $1$ reduce.",
    },
    {
      id: "potencias-10",
      type: "slide",
      title: "Por 10, 100, 1000…: la coma se desplaza",
      blocks: [
        {
          kind: "rule",
          text: "Multiplicar por $10$, $100$, $1000$… es **desplazar la coma** a la derecha $1$, $2$, $3$… lugares. Si faltan cifras, se añaden ceros.",
          formula: "\\begin{gathered} 2{,}45 \\cdot 10 = 24{,}5 \\\\ 2{,}45 \\cdot 100 = 245 \\\\ 2{,}45 \\cdot 1000 = 2450 \\end{gathered}",
        },
        {
          kind: "example",
          title: "Por un natural acabado en ceros",
          lines: [
            { math: "3{,}52 \\cdot 500 = (3{,}52 \\cdot 5) \\cdot 100", note: "se separan los ceros y se multiplica primero por $5$" },
            { math: "= 17{,}6 \\cdot 100 = 1760" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "coma-potencias10", params: { dec: "2,45", dir: "mul" } },
    },
    {
      id: "check-gramos",
      type: "predict",
      title: "De kilos a gramos",
      question:
        "Una receta pide 0,125 kg de harina. Sabiendo que 1 kg son 1000 g, ¿cuántos gramos hay que echar?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$125$ g" },
        {
          id: "b",
          label: "$1250$ g",
          incorrectFeedback:
            "Has desplazado la coma **cuatro** lugares. Para multiplicar por $1000$ (tres ceros) son tres lugares.",
        },
        {
          id: "c",
          label: "$12{,}5$ g",
          incorrectFeedback:
            "Has desplazado solo **dos** lugares (como por $100$). Por $1000$ son tres.",
        },
        {
          id: "d",
          label: "$0{,}125$ g",
          incorrectFeedback:
            "Si la coma no se mueve, el número no cambia: pasar de kg a g tiene que dar una cantidad **mayor**.",
        },
      ],
      correctChoiceId: "a",
      help: [
        {
          label: "¿Multiplico o divido?",
          message: "Un gramo es una cantidad muy pequeña: en un kilo caben mil. Por tanto, la misma harina se expresa con un número **mucho mayor** en gramos.",
          detail: ["Si la unidad es más pequeña, el número crece: se multiplica."],
        },
        {
          label: "¿Cuántos lugares muevo la coma?",
          message: "Tantos como ceros tiene lo que multiplicas, hacia la derecha. Un ejemplo con otro número:",
          math: ["0{,}4 \\cdot 100 = 40 \\qquad (\\text{dos ceros} \\Rightarrow \\text{dos lugares})"],
          detail: ["Si te quedas sin cifras, se añaden ceros. Ahora cuenta los ceros de $1000$."],
        },
      ],
      shuffleChoices: true,
      explanation:
        "$0{,}125 \\cdot 1000 = 125$: la coma se desplaza tres lugares a la derecha.",
    },
    {
      id: "check-aceite",
      type: "predict",
      title: "Una botella de aceite",
      question:
        "El aceite cuesta 3,15 € el litro. ¿Cuánto cuesta una botella de 0,75 l, redondeando a céntimos?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$2{,}36\\,€$" },
        {
          id: "b",
          label: "$2{,}37\\,€$",
          incorrectFeedback:
            "El producto es $2{,}3625$: la primera cifra suprimida es $2$, menor que $5$, así que la centésima **no sube**.",
        },
        {
          id: "c",
          label: "$23{,}63\\,€$",
          incorrectFeedback:
            "La coma está mal colocada: hay $2 + 2 = 4$ cifras decimales en los factores, y una botella de menos de un litro no puede costar más que el litro.",
        },
        {
          id: "d",
          label: "$3{,}90\\,€$",
          incorrectFeedback: "Eso es la **suma** $3{,}15 + 0{,}75$. El precio de una cantidad se calcula multiplicando.",
        },
      ],
      correctChoiceId: "a",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Si un litro cuesta $3{,}15$ €, tres cuartos de litro cuestan **menos** que eso. Lo que pagas es *precio del litro × litros*.",
          detail: ["Sumar no tiene sentido: no estás juntando dos precios, estás calculando una parte del precio de un litro."],
        },
        {
          label: "Quiero saber si mi resultado es razonable",
          message: "Como $0{,}75$ es casi un litro, el precio tiene que ser **algo menor que $3{,}15$**.",
          detail: ["Cualquier opción mayor que el precio del litro queda descartada sin hacer ninguna cuenta."],
        },
        {
          label: "Hay demasiadas cifras",
          message: "Hazlo en dos fases: primero la multiplicación sin comas, después la coma.",
          math: ["315 \\cdot 75 = ?", "2 + 2 = 4 \\text{ decimales}"],
          branches: [
            {
              label: "¿Cómo redondeo a céntimos?",
              message: "Céntimos son **dos decimales**. Mira la tercera cifra decimal: si es $5$ o más, la centésima sube; si es menor, se queda igual.",
            },
          ],
        },
      ],
      shuffleChoices: true,
      explanation:
        "$315 \\cdot 75 = 23\\,625$, con $4$ cifras decimales: $2{,}3625\\,€ \\approx 2{,}36\\,€$.",
    },
  ],
};
