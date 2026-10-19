import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadFrecuenciasLesson: InteractiveLesson = {
  slug: "probabilidad-frecuencias",
  title: "4. Frecuencia absoluta y relativa",
  subtitle: TEMA_15_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definiciones",
      type: "slide",
      help: [
        {
          label: "Absoluta frente a relativa",
          message: "La absoluta cuenta **cuántas veces**. La relativa dice **qué proporción** del total.",
        },
        {
          label: "Dos comprobaciones",
          message: "Las absolutas suman $n$. Las relativas suman $1$. Si no ocurre, hay un error.",
        },
      ],
      title: "Frecuencias",
      blocks: [
        {
          kind: "text",
          text: "Repetimos un experimento aleatorio $n$ veces y anotamos cuántas veces ocurre cada suceso.",
        },
        {
          kind: "rule",
          title: "Frecuencia relativa",
          formula: "h_i = \\dfrac{f_i}{n}",
          text: "$f_i$ es la **frecuencia absoluta** (cuántas veces ocurre). Las absolutas suman $n$ y las relativas, $1$.",
        },
      ],
      visual: { kind: "anim", scene: "frecuencias-dado", beatMs: 3500 },
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Absoluta o relativa?",
          message: "La absoluta es **cuántas veces** sale. La relativa es la **proporción** que supone del total de repeticiones.",
        },
        {
          label: "¿Cómo la calculo?",
          message: "Divide lo que ha ocurrido entre el número total de pruebas.",
          math: ["h = \\frac{f}{n}"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "La frecuencia relativa siempre está entre $0$ y $1$. Si te sale mayor que $1$, has dividido al revés.",
        },
      ],
      title: "Frecuencia relativa de una cara",
      question:
        "En $50$ lanzamientos de un dado sale la cara $3$ exactamente $14$ veces. ¿Cuál es la frecuencia relativa $h_3$? (en decimal, con coma)",
      correctAnswers: ["0,28", "0.28", ",28", "14/50", "7/25"],
      hint: "La frecuencia relativa es la absoluta dividida entre el número total de lanzamientos.",
      explanation: "$h_3 = f_3 / n = 14/50 = 0{,}28$. Ojo: $14$ es la frecuencia **absoluta** $f_3$.",
    },
    {
      id: "probabilidad-frecuencia",
      type: "slide",
      help: [
        {
          label: "Una idea clave",
          message: "Con pocos lanzamientos las frecuencias bailan. Con muchos, se estabilizan alrededor de un valor: la probabilidad.",
        },
        {
          label: "Con la moneda",
          message: "En $10$ lanzamientos puede salir $7$ veces cara. En $10\\,000$, lo normal es acercarse a la mitad.",
        },
      ],
      title: "Las frecuencias se estabilizan",
      blocks: [
        {
          kind: "definition",
          text: "La **probabilidad** de un suceso es el número al que se **acerca** su frecuencia relativa cuando se repite el experimento **muchas** veces.",
        },
        {
          kind: "text",
          text: "Por eso las frecuencias relativas y la probabilidad comparten propiedades: valen entre $0$ y $1$ y todas suman $1$.",
        },
      ],
      visual: { kind: "anim", scene: "grandes-numeros", beatMs: 3500 },
    },
    {
      id: "explora-simulador",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Con pocas tiradas las barras son muy distintas. Al acumular cientos de lanzamientos se acercan a la línea punteada.",
        },
      ],
      title: "Experimenta: lanza el dado",
      blocks: [
        {
          kind: "text",
          text: "Pulsa **Lanzar ×1000** varias veces. ¿Hacia qué valor se acerca la frecuencia relativa de cada cara?",
        },
      ],
      visual: { kind: "tool", tool: "dado-simulador", params: { a: 6 } },
    },
    {
      id: "moneda-10",
      type: "predict",
      help: [
        {
          label: "Pocos lanzamientos",
          message: "Con pocas repeticiones, la frecuencia relativa puede estar lejos de la probabilidad.",
        },
        {
          label: "Muchas repeticiones",
          message: "Cuantas más veces se repite, más se acerca la frecuencia relativa a la probabilidad.",
        },
      ],
      title: "Dos series de lanzamientos",
      question:
        "Lanzas una moneda 10 veces y sale cara 7 veces. Después la lanzas 10 000 veces. ¿Qué es más razonable esperar de la frecuencia relativa de cara en la segunda serie?",
      mode: "choice",
      choices: [
        { id: "a", label: "Que esté muy cerca de $0{,}5$" },
        {
          id: "b",
          label: "Que vuelva a ser $0{,}7$, como en la primera serie",
          incorrectFeedback: "Con $10$ lanzamientos la frecuencia varía mucho por azar. Con $10\\,000$ se estabiliza hacia la probabilidad, no hacia el $0{,}7$.",
        },
        {
          id: "c",
          label: "Que sea exactamente $0{,}5$",
          incorrectFeedback: "Será muy cercana a $0{,}5$, pero no tiene por qué ser exactamente $0{,}5$: el azar siempre deja pequeñas diferencias.",
        },
        {
          id: "d",
          label: "Que salgan solo caras",
          incorrectFeedback: "Una moneda equilibrada no se comporta así: con muchos lanzamientos caras y cruces se reparten casi a partes iguales.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Al aumentar el número de lanzamientos, la frecuencia relativa de cara se acerca a la probabilidad, $0{,}5$.",
    },
    {
      id: "bombo",
      type: "slide",
      help: [
        {
          label: "¿Qué es el reemplazo?",
          message: "Que la bola vuelve al bombo tras cada extracción, así que las condiciones no cambian.",
        },
        {
          label: "Sucesos compuestos",
          message: "Para «múltiplo de $3$» sumas las frecuencias de $3$, $6$ y $9$: es la suma de sus partes.",
        },
      ],
      title: "Frecuencia de un suceso compuesto",
      blocks: [
        {
          kind: "text",
          text: "En un bombo con bolas $0$–$9$ se repite $100$ veces la extracción (con reemplazo) y se calcula $h_i = f_i / 100$ para cada bola.",
        },
        {
          kind: "rule",
          title: "Suceso compuesto",
          text: "Para $A =$ «múltiplo de $3$» $= \\{3, 6, 9\\}$, se suman las frecuencias de sus elementales:",
          formula: "h_A = h_3 + h_6 + h_9",
        },
      ],
    },
    {
      id: "check-bombo",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma las partes",
          message: "La frecuencia absoluta del suceso es la suma de las de sus sucesos elementales.",
        },
        {
          label: "Después divide",
          message: "Divide esa suma entre el total de extracciones, $100$.",
        },
      ],
      title: "Múltiplo de 3 en el bombo",
      question:
        "En 100 extracciones del bombo, el 3 sale 9 veces, el 6 sale 12 veces y el 9 sale 14 veces. ¿Cuál es la frecuencia relativa del suceso «múltiplo de 3»? (en decimal, con coma)",
      correctAnswers: ["0,35", "0.35", "35/100", "7/20"],
      hint: "Primero suma las frecuencias absolutas.",
      explanation: "$f = 9 + 12 + 14 = 35$ y $h = \\dfrac{35}{100} = 0{,}35$.",
    },
  ],
};
