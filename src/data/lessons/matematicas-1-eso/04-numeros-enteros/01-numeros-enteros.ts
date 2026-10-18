import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const numerosEnterosLesson: InteractiveLesson = {
  slug: "numeros-enteros",
  title: "1. Los números enteros",
  subtitle: TEMA_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cuando-no-bastan",
      type: "slide",
      title: "Cuando los naturales no bastan",
      blocks: [
        {
          kind: "story",
          text: "El termómetro de la calle marca **8**. ¿Ocho grados de calor o de frío? Con los naturales no se distingue: hace falta un signo.",
        },
        {
          kind: "definition",
          text: "Un **número negativo** es el que está por debajo del $0$ y se escribe con el signo $-$. Sin signo, un número es **positivo**: $3 = +3$.",
        },
        {
          kind: "compare",
          left: {
            title: "Una posición",
            text: "Dice **dónde** estás: un piso, un saldo, una temperatura.",
            math: ["\\text{sexto piso} \\to +6", "\\text{segundo sótano} \\to -2", "\\text{debo } 85 \\text{ €} \\to -85"],
            tone: "info",
          },
          right: {
            title: "Una variación",
            text: "Dice **cuánto cambia** algo y en qué sentido: subir o bajar, ganar o perder.",
            math: ["\\text{subes 3 plantas} \\to +3", "\\text{bajas 5 plantas} \\to -5", "\\text{baja 2 °C} \\to -2"],
            tone: "key",
          },
        },
      ],
      visual: { kind: "anim", scene: "ascensor-enteros", params: { a: 3, b: -5 } },
    },
    {
      id: "conjunto-z",
      type: "slide",
      title: "Los enteros: naturales, opuestos y el cero",
      blocks: [
        {
          kind: "definition",
          text: "Los **números enteros**, $\\mathbb{Z}$, son los naturales, sus **opuestos negativos** y el $0$.",
        },
        {
          kind: "rule",
          title: "Opuesto de un número",
          text: "El opuesto de $a$ es $-a$: está a la **misma distancia** del $0$, pero al otro lado. El opuesto de $0$ es $0$.",
          formula: "\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}",
        },
        {
          kind: "warning",
          title: "Cómo se escriben",
          text: "Sin signo, el número es positivo. En las operaciones, los negativos van **entre paréntesis**: $5 + (-2)$ o $(-4) \\cdot (-3)$.",
        },
      ],
      visual: { kind: "anim", scene: "recta-enteros" },
    },
    {
      id: "check-signo",
      type: "predict",
      help: [
        {
          label: "¿Posición o movimiento?",
          message: "La **posición** dice dónde estás respecto al nivel del mar. El **movimiento** dice cuánto y en qué sentido te desplazas. La pregunta pide lo segundo.",
        },
        {
          label: "¿Qué signo tiene subir?",
          message: "Ascender es ir hacia arriba, hacia números mayores. ¿Qué signo le damos a una variación hacia arriba?",
        },
        {
          label: "Descarta opciones",
          message: "Algunas opciones son coordenadas: dicen dónde está el buceador, no cuánto ha cambiado.",
        },
      ],
      title: "Posición o variación",
      question:
        "Un buceador está a **12 m** bajo el nivel del mar y asciende **5 m**. ¿Qué número entero expresa su **movimiento** (no dónde queda)?",
      mode: "choice",
      choices: [
        {
          id: "mas5",
          label: "$+5$",
        },
        {
          id: "menos5",
          label: "$-5$",
          incorrectFeedback: "Ascender es subir, y subir es positivo. $-5$ sería descender $5$ m.",
        },
        {
          id: "menos12",
          label: "$-12$",
          incorrectFeedback: "$-12$ es dónde estaba el buceador (una **posición**), no cuánto se mueve.",
        },
        {
          id: "menos7",
          label: "$-7$",
          incorrectFeedback: "$-7$ es dónde acaba ($-12 + 5$): una posición. El enunciado pide la variación.",
        },
      ],
      correctChoiceId: "mas5",
      shuffleChoices: true,
      explanation:
        "El movimiento es una **variación**: sube $5$ m, así que es $+5$. Su posición pasa de $-12$ a $-7$.",
    },
    {
      id: "valor-absoluto",
      type: "slide",
      title: "Valor absoluto: la distancia al cero",
      blocks: [
        {
          kind: "story",
          text: "Un buceador a **7 m** bajo el nivel del mar y un globo a **7 m** por encima: en lados opuestos, pero igual de lejos del nivel del mar.",
        },
        {
          kind: "definition",
          text: "El **valor absoluto** de un entero es su **distancia al cero** en la recta. Equivale al número **sin su signo**.",
        },
        {
          kind: "example",
          lines: [
            { math: "|-7| = 7", note: "7 unidades a la izquierda del $0$" },
            { math: "|+4| = 4", note: "4 unidades a la derecha" },
            { math: "|0| = 0", note: "está en el propio $0$" },
          ],
        },
        {
          kind: "warning",
          text: "Dos números **opuestos** tienen el mismo valor absoluto: $|-7| = |+7| = 7$. Y un valor absoluto nunca es negativo.",
        },
      ],
      visual: { kind: "anim", scene: "valor-absoluto", params: { a: -7, b: 4 } },
    },
    {
      id: "check-absoluto",
      type: "predict",
      help: [
        {
          label: "¿Qué mide el valor absoluto?",
          message: "La distancia al cero, y las distancias nunca son negativas.",
          branches: [
            {
              label: "Aplícalo",
              message: "¿A cuántas unidades del $0$ está $-9$? ¿Y $+9$?",
            },
          ],
        },
        {
          label: "¿Mismo valor absoluto significa mismo número?",
          message: "No. Dos números con el mismo valor absoluto pueden estar a lados opuestos del cero. Piensa: ¿hace el mismo frío a $-9$ °C que a $+9$ °C?",
        },
      ],
      title: "Mismo valor absoluto",
      question:
        "Una estación meteorológica anota $-9$ °C por la mañana y $+9$ °C a mediodía. ¿Cuál de estas afirmaciones es correcta?",
      mode: "choice",
      choices: [
        {
          id: "mismo-abs",
          label: "Tienen el mismo valor absoluto, pero no son el mismo número",
        },
        {
          id: "iguales",
          label: "Son iguales, porque $|-9| = |+9|$",
          incorrectFeedback:
            "Mismo valor absoluto no significa mismo número: están en lados distintos del $0$, a $18$ grados de distancia.",
        },
        {
          id: "abs-negativo",
          label: "El valor absoluto de $-9$ es $-9$",
          incorrectFeedback: "El valor absoluto es una distancia, y una distancia no es negativa: $|-9| = 9$.",
        },
        {
          id: "mayor-abs",
          label: "$+9$ tiene mayor valor absoluto que $-9$",
          incorrectFeedback: "El valor absoluto ignora el signo: los dos están a $9$ unidades del $0$.",
        },
      ],
      correctChoiceId: "mismo-abs",
      shuffleChoices: true,
      explanation:
        "$|-9| = |+9| = 9$: ambos distan $9$ del $0$. Pero $-9$ y $+9$ son opuestos, números distintos.",
    },
    {
      id: "comparar",
      type: "slide",
      title: "Comparar: el de más a la derecha es el mayor",
      blocks: [
        {
          kind: "rule",
          text: "Entre dos enteros, el **mayor** es el que queda **más a la derecha** en la recta.",
          formula: "-20 < -8 < 0 < +3",
        },
        {
          kind: "facts",
          items: [
            { tex: "+8 > 0 > -8", label: "positivo, cero, negativo" },
            { tex: "+20 > +8", label: "dos positivos: mayor valor absoluto" },
            { tex: "-8 > -20", label: "dos negativos: menor valor absoluto" },
          ],
        },
        {
          kind: "warning",
          text: "Con negativos el orden **se invierte**: $|-20| > |-8|$, pero $-20$ está más lejos del $0$ hacia la izquierda, así que es **menor**.",
        },
      ],
      visual: { kind: "anim", scene: "comparar-enteros", params: { a: -8, b: -20 } },
    },
    {
      id: "check-ordenar",
      type: "predict",
      help: [
        {
          label: "¿Cómo ordeno negativos?",
          message: "Imagina la recta numérica: el menor es el que está más a la izquierda. Cuanto más lejos del cero hacia la izquierda, menor es el número.",
        },
        {
          label: "No te fijes solo en la cifra",
          message: "Con negativos se invierte el orden: $12 > 7$ pero $-12 < -7$. Para temperaturas, $-12$ °C es más frío que $-7$ °C.",
        },
        {
          label: "Separa primero por signo",
          message: "Todo negativo es menor que cualquier positivo. Coloca primero el $+2$ y ordena después los negativos entre sí.",
        },
      ],
      title: "Ordenar temperaturas",
      question:
        "Las mínimas de una noche de invierno fueron: Burgos $-7$ °C, Soria $-12$ °C, Teruel $-3$ °C y León $+2$ °C. ¿Cómo quedan ordenadas de la **más fría a la menos fría**?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$-12,\; -7,\; -3,\; +2$" },
        {
          id: "reves",
          label: "$+2,\; -3,\; -7,\; -12$",
          incorrectFeedback: "Esa es la lista de la menos fría a la más fría: está al revés.",
        },
        {
          id: "abs",
          label: "$-3,\; -7,\; -12,\; +2$",
          incorrectFeedback:
            "Has ordenado los negativos por valor absoluto creciente. Entre negativos, el de mayor valor absoluto es el **menor**.",
        },
        {
          id: "cero",
          label: "$+2,\; -12,\; -7,\; -3$",
          incorrectFeedback: "Has puesto el positivo el primero y luego los negativos de mayor a menor valor absoluto: no sigue el orden de la recta.",
        },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "De izquierda a derecha en la recta: $-12 < -7 < -3 < +2$.",
    },
    {
      id: "check-saldos",
      type: "predict",
      help: [
        {
          label: "¿Qué significa estar mejor?",
          message: "Tener un saldo mayor, es decir, más a la derecha en la recta numérica.",
        },
        {
          label: "Cuidado con «debe menos»",
          message: "Un saldo negativo es una deuda: $-85$ es deber $85$ €. ¿Quién debe menos, el que debe $85$ € o el que debe $120$ €?",
        },
        {
          label: "Valor absoluto y valor",
          message: "El valor absoluto dice cuánto dinero hay en juego, pero no si es a favor o en contra. Para comparar saldos hay que mirar el signo.",
        },
      ],
      title: "Quién está mejor",
      question:
        "El saldo de Ana es $-120$ €, el de Luis $-85$ € y el de Marta $+40$ €. ¿Cuál de estas afirmaciones es verdadera?",
      mode: "choice",
      choices: [
        { id: "luis-ana", label: "$-85 > -120$, así que Luis debe menos que Ana" },
        {
          id: "ana-luis",
          label: "$-120 > -85$, porque $120 > 85$",
          incorrectFeedback:
            "$120 > 85$ es cierto en valor absoluto, pero con saldos negativos $120$ significa **más deuda**: $-120$ queda a la izquierda de $-85$.",
        },
        {
          id: "ana-marta",
          label: "Ana está mejor que Marta, porque $|-120| > |+40|$",
          incorrectFeedback: "El valor absoluto no dice quién tiene más dinero: $-120 < +40$.",
        },
        {
          id: "iguales",
          label: "Ana y Luis tienen el mismo saldo, porque los dos son negativos",
          incorrectFeedback: "Ser negativos no los hace iguales: $-120$ y $-85$ son números distintos.",
        },
      ],
      correctChoiceId: "luis-ana",
      shuffleChoices: true,
      explanation: "En la recta, $-120 < -85 < +40$: Luis está mejor que Ana, y Marta mejor que los dos.",
    },
  ],
};
