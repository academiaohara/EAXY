import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_5_SUBTITLE } from "@/data/lessons/shared";

export const divisionNumerosDecimalesLesson: InteractiveLesson = {
  slug: "division-numeros-decimales",
  title: "3. División de números decimales",
  subtitle: TEMA_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "divisor-natural",
      type: "slide",
      help: [
        {
          label: "Piensa en el reparto de la paga",
          message: "Reparte primero los euros enteros. Lo que sobra se convierte en décimas y se sigue repartiendo.",
        },
        {
          label: "¿Cuándo pongo la coma?",
          message: "En cuanto bajes la primera cifra decimal (o un cero). Antes de eso no hay decimales en el cociente.",
        },
        {
          label: "Dividendo menor que divisor",
          message: "En $1 : 4$ no cabe ni una unidad entera, así que el cociente empieza por $0{,}$ y se baja un cero.",
        },
      ],
      title: "Dividir entre un natural: la coma sube al cociente",
      blocks: [
        {
          kind: "story",
          text: "Cuatro hermanos se reparten **35 €** de la paga del abuelo. ¿Cuánto toca a cada uno?",
        },
        {
          kind: "steps",
          items: [
            "Se divide la **parte entera**: cociente y resto.",
            "Si queda resto, al bajar la primera cifra decimal (o un **0**) se pone la **coma en el cociente**.",
            "Se sigue hasta resto $0$ o hasta las cifras decimales que se pidan.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "8{,}5 : 5 = 1{,}7", note: "el dividendo ya tiene decimales: la coma sube al bajar el $5$" },
            { math: "1 : 4 = 0{,}25", note: "si el dividendo es menor que el divisor, el cociente empieza por $0{,}$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["35", "4"], places: 2 } },
    },
    {
      id: "check-botes",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Repartir en partes iguales es dividir: el peso total entre el número de botes.",
        },
        {
          label: "¿Dónde pongo la coma?",
          message: "En cuanto bajes la primera cifra decimal del dividendo, pones la coma en el cociente. Antes de eso, el cociente lleva un $0$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Si cada bote pesara $1\\,\\mathrm{kg}$, los seis pesarían $6\\,\\mathrm{kg}$. Compara con $2{,}07$: ¿cada bote pesa más o menos de un kilo?",
        },
      ],
      title: "Seis botes de refresco",
      question:
        "Seis botes iguales de refresco pesan en total 2,07 kg. ¿Cuánto pesa cada bote?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$0{,}345$ kg" },
        {
          id: "b",
          label: "$0{,}45$ kg",
          incorrectFeedback:
            "Has dividido $2{,}7 : 6$. Pero $2{,}07$ lleva un cero en las décimas: ese cero también hay que bajar y dividir.",
        },
        {
          id: "c",
          label: "$3{,}45$ kg",
          incorrectFeedback:
            "Cada bote no puede pesar más que los seis juntos ($2{,}07$ kg): la coma del cociente está mal puesta.",
        },
        {
          id: "d",
          label: "$0{,}0345$ kg",
          incorrectFeedback:
            "Comprueba: $6$ botes de $0{,}0345$ kg pesarían $0{,}207$ kg, no $2{,}07$. Has dejado un cero de más.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$2 : 6 = 0$, resto $2$; $20 : 6 = 3$, resto $2$; $27 : 6 = 4$, resto $3$; $30 : 6 = 5$. Cociente $0{,}345$ y comprobación: $6 \\cdot 0{,}345 = 2{,}07$.",
    },
    {
      id: "periodico",
      type: "slide",
      help: [
        {
          label: "¿Por qué no termina?",
          message: "Si en algún momento el resto se repite, las cifras siguientes se repetirán igual para siempre.",
        },
        {
          label: "¿Aproximación o igualdad?",
          message: "Al cortar el cociente ya no es el resultado exacto: $3 \\cdot 2{,}43 = 7{,}29$, no $7{,}3$. Por eso se escribe $\\approx$.",
        },
        {
          label: "¿Cuántas cifras corto?",
          message: "Las que pida el enunciado. Calcula una cifra más y redondea.",
        },
      ],
      title: "Cuando la división no termina: cociente periódico",
      blocks: [
        {
          kind: "story",
          text: "De una pieza de **7,3 m** de tela se hacen **3 vestidos** iguales. ¿Cuánta tela lleva cada uno?",
        },
        {
          kind: "rule",
          text: "Si el resto **se repite**, la división no acaba nunca: el cociente es **periódico**. Se corta en las cifras decimales que se pidan y se **redondea**.",
        },
        {
          kind: "warning",
          text: "$2{,}43$ es una **aproximación**: $3 \\cdot 2{,}43 = 7{,}29 \\neq 7{,}3$. Se escribe $\\approx$, no $=$.",
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["7,3", "3"], places: 2 } },
    },
    {
      id: "check-cronometro",
      type: "predict",
      help: [
        {
          label: "¿Cuántos decimales calculo?",
          message: "Redondear a céntimos es dejar dos decimales, así que necesitas calcular una cifra más para decidir si la segunda sube.",
          math: ["30 : 7 = 4{,}\\_\\_\\_\\dots"],
        },
        {
          label: "¿Cuándo sube la centésima?",
          message: "Mira la tercera cifra decimal: si es $5$ o más, la segunda sube una unidad; si es menor, se queda igual.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$7 \\cdot 4 = 28$ y $7 \\cdot 5 = 35$, así que $30 : 7$ está entre $4$ y $5$.",
        },
      ],
      title: "Un regalo entre siete",
      question:
        "Siete atletas se reparten el coste de un cronómetro de 30 €. ¿Cuánto paga cada uno si se redondea a céntimos?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$4{,}29\\,€$" },
        {
          id: "b",
          label: "$4{,}28\\,€$",
          incorrectFeedback:
            "Has cortado en $4{,}28$ sin redondear. La cifra que viene es $5$ ($4{,}2857\\ldots$), y con $5$ o más la anterior sube.",
        },
        {
          id: "c",
          label: "$4{,}30\\,€$",
          incorrectFeedback:
            "Eso es aproximar a las **décimas** ($4{,}3$). A céntimos son dos cifras decimales: $4{,}29$.",
        },
        {
          id: "d",
          label: "$4{,}20\\,€$",
          incorrectFeedback:
            "Siete pagos de $4{,}20\\,€$ suman $29{,}40\\,€$: no llegan a los $30\\,€$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$30 : 7 = 4{,}2857\\ldots$ La tercera cifra decimal es $5$, así que la segunda sube: $4{,}29\\,€$.",
    },
    {
      id: "divisor-decimal",
      type: "slide",
      help: [
        {
          label: "¿Por qué no cambia el cociente?",
          message: "Multiplicar dividendo y divisor por lo mismo no altera el resultado, igual que $\\frac{1}{2} = \\frac{10}{20}$.",
          math: ["7{,}5 : 0{,}25 = 750 : 25"],
        },
        {
          label: "¿Cuántos lugares muevo la coma?",
          message: "Tantos como cifras decimales tenga el **divisor**, y en los dos números.",
        },
        {
          label: "Si el dividendo no tiene decimales",
          message: "Añade ceros: $90 : 2{,}5$ pasa a ser $900 : 25$.",
        },
      ],
      title: "Divisor decimal: se multiplica todo hasta que sea natural",
      blocks: [
        {
          kind: "story",
          text: "Se corta una cinta de **7,5 m** en trozos de **0,25 m**. ¿Cuántos trozos salen?",
        },
        {
          kind: "steps",
          items: [
            "Se quita la coma al divisor multiplicándolo por $10$, $100$… y **lo mismo** al dividendo.",
            "En el dividendo la coma se desplaza **igual**; si faltan cifras, se añaden **ceros**.",
            "Se divide como en el caso anterior: el cociente no cambia.",
          ],
        },
        {
          kind: "example",
          title: "Dividendo natural",
          lines: [{ math: "90 : 2{,}5 = 900 : 25 = 36", note: "se añaden tantos ceros como cifras decimales tiene el divisor" }],
        },
        {
          kind: "warning",
          text: "La coma se mueve tantos lugares como cifras decimales tiene el **divisor**, en los **dos** números.",
        },
      ],
      visual: { kind: "anim", scene: "division-coma-divisor", params: { terms: ["7,5", "0,25"] } },
    },
    {
      id: "check-cinta",
      type: "predict",
      help: [
        {
          label: "¿Qué operación es?",
          message: "«Cuántos trozos salen» es ver cuántas veces cabe $0{,}15$ en $4{,}5$: una división.",
        },
        {
          label: "El divisor decimal me estorba",
          message: "Multiplica dividendo y divisor por la misma potencia de $10$ hasta que el divisor sea natural. El cociente no cambia.",
          math: ["4{,}5 : 0{,}15 = \\;?\\; : \\;?"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "Con trozos de $0{,}1$ m saldrían $45$; con trozos de $0{,}2$ m, unos $22$. La respuesta está entre esas dos cifras.",
        },
      ],
      title: "Trozos de cinta",
      question:
        "Un rollo de 4,5 m de cinta se corta en trozos de 0,15 m. ¿Cuántos trozos salen?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$30$ trozos" },
        {
          id: "b",
          label: "$3$ trozos",
          incorrectFeedback:
            "Has desplazado la coma un solo lugar ($45 : 1{,}5$). $0{,}15$ tiene **dos** cifras decimales: hay que multiplicar por $100$.",
        },
        {
          id: "c",
          label: "$0{,}3$ trozos",
          incorrectFeedback:
            "Has quitado la coma al divisor ($4{,}5 : 15$) sin tocar el dividendo. Hay que multiplicar **los dos** por $100$.",
        },
        {
          id: "d",
          label: "$300$ trozos",
          incorrectFeedback:
            "Has desplazado la coma **tres** lugares ($4500 : 15$). $0{,}15$ solo tiene dos cifras decimales.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$4{,}5 : 0{,}15 = 450 : 15 = 30$. Comprobación: $30 \\cdot 0{,}15 = 4{,}5$.",
    },
    {
      id: "potencias-10",
      type: "slide",
      help: [
        {
          label: "Es el espejo de la multiplicación",
          message: "Al multiplicar por $10$, $100$… la coma va a la derecha. Al dividir, a la izquierda. Se mueve tantos lugares como ceros.",
        },
        {
          label: "¿Y cuando faltan cifras?",
          message: "Rellena con ceros entre la coma y la primera cifra: $15{,}3 : 1000 = 0{,}0153$.",
        },
        {
          label: "Piénsalo con dinero",
          message: "De euros a céntimos se multiplica por $100$ (coma a la derecha). De céntimos a euros, se divide entre $100$ (coma a la izquierda).",
        },
      ],
      title: "Entre 10, 100, 1000…: la coma va hacia la izquierda",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Multiplicar por 10, 100, 1000…",
            text: "La coma va a la **derecha**: el número crece.",
            math: ["2{,}45 \\cdot 100 = 245"],
            tone: "ok",
          },
          right: {
            title: "Dividir entre 10, 100, 1000…",
            text: "La coma va a la **izquierda**: el número disminuye.",
            math: ["15{,}3 : 100 = 0{,}153"],
            tone: "info",
          },
        },
        {
          kind: "rule",
          text: "Cuando se acaban las cifras, se rellenan con **ceros** entre la coma y la primera cifra (y un $0$ delante de la coma).",
          formula: "\\begin{gathered} 15{,}3 : 10 = 1{,}53 \\\\ 15{,}3 : 100 = 0{,}153 \\\\ 15{,}3 : 1000 = 0{,}0153 \\end{gathered}",
        },
      ],
      visual: { kind: "anim", scene: "coma-potencias10", params: { dec: "15,3", dir: "div" } },
    },
    {
      id: "check-clips",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "El precio de uno se obtiene repartiendo el precio total entre las unidades: una división.",
        },
        {
          label: "¿Cómo se divide entre $100$?",
          message: "La coma se desplaza hacia la izquierda tantos lugares como ceros tiene el divisor. Si faltan cifras, se añaden ceros.",
          math: ["3{,}7 : 10 = 0{,}37 \\qquad 3{,}7 : 100 = ?"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "Un clip es solo una pieza de cien: tiene que costar muchísimo menos que $1$ €.",
        },
      ],
      title: "El precio de un clip",
      question:
        "Una caja de 100 clips cuesta 2,5 €. ¿Cuánto cuesta cada clip?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$0{,}025\\,€$" },
        {
          id: "b",
          label: "$0{,}25\\,€$",
          incorrectFeedback:
            "Has desplazado la coma un solo lugar (entre $10$). Entre $100$ son **dos** lugares, con un cero de relleno.",
        },
        {
          id: "c",
          label: "$0{,}0025\\,€$",
          incorrectFeedback:
            "Has desplazado la coma **tres** lugares (como entre $1000$). Entre $100$ son dos.",
        },
        {
          id: "d",
          label: "$25\\,€$",
          incorrectFeedback:
            "Has movido la coma hacia la **derecha**, que es multiplicar. Un clip no puede costar más que la caja entera.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$2{,}5 : 100 = 0{,}025$: la coma se desplaza dos lugares a la izquierda, y falta una cifra, que se rellena con un cero.",
    },
    {
      id: "check-media",
      type: "predict",
      help: [
        {
          label: "¿Qué es la media?",
          message: "Se suman todos los valores y el resultado se divide entre cuántos son. Aquí son tres notas.",
        },
        {
          label: "Suma con decimales distintos",
          message: "Escribe $7$ como $7{,}00$ y $5{,}5$ como $5{,}50$ para alinear las comas antes de sumar.",
        },
        {
          label: "¿Cuántos decimales calculo?",
          message: "Te piden dos. Calcula una cifra más y mira si la segunda sube.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "La media siempre queda entre la nota más baja y la más alta, y aquí hay una nota muy baja que tira de ella.",
        },
      ],
      title: "La nota media",
      question:
        "Raquel ha sacado un 5,5, un 7 y un 2,40 en tres exámenes. ¿Cuál es su nota media, con dos cifras decimales?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$4{,}97$" },
        {
          id: "b",
          label: "$4{,}96$",
          incorrectFeedback:
            "Has cortado $4{,}9666\\ldots$ sin redondear. La cifra siguiente es $6 \\geq 5$, así que la última sube.",
        },
        {
          id: "c",
          label: "$14{,}90$",
          incorrectFeedback:
            "Eso es solo la **suma** de las tres notas. La media se obtiene dividiendo entre el número de exámenes.",
        },
        {
          id: "d",
          label: "$6{,}25$",
          incorrectFeedback:
            "Has hecho la media de solo dos notas ($5{,}5$ y $7$): faltan los $2{,}40$ y dividir entre $3$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$(5{,}5 + 7 + 2{,}4) : 3 = 14{,}9 : 3 = 4{,}9666\\ldots \\approx 4{,}97$.",
    },
    {
      id: "check-lazos",
      type: "predict",
      help: [
        {
          label: "¿Qué se divide entre qué?",
          message: "Los metros de cinta se reparten entre el número de lazos: $20$ entre $25$, no al revés.",
        },
        {
          label: "El dividendo es menor que el divisor",
          message: "No se puede repartir $20$ en $25$ partes enteras, así que el cociente empieza por $0$. Pon la coma y baja un cero para seguir.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Con menos de un metro de cinta por lazo no salen $25$ lazos de $20$ m: cada uno debe medir menos de $1$ m.",
        },
      ],
      title: "Lazos de cinta",
      question:
        "Con una cinta de 20 m se hacen 25 lazos iguales. ¿Cuánto mide el trozo de cinta de cada lazo?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$0{,}8$ m" },
        {
          id: "b",
          label: "$8$ m",
          incorrectFeedback:
            "Con $25$ lazos de $8$ m harían falta $200$ m de cinta. Cada lazo debe medir **menos** de un metro.",
        },
        {
          id: "c",
          label: "$1{,}25$ m",
          incorrectFeedback:
            "Has dividido al revés ($25 : 20$). El reparto es de **20 m entre 25 lazos**.",
        },
        {
          id: "d",
          label: "$0{,}08$ m",
          incorrectFeedback:
            "Comprueba: $25$ lazos de $0{,}08$ m usarían solo $2$ m de cinta, no $20$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$20 : 25$: como $20 < 25$, el cociente empieza por $0{,}$; $200 : 25 = 8$. Resultado $0{,}8$ m. Comprobación: $25 \\cdot 0{,}8 = 20$.",
    },
  ],
};
