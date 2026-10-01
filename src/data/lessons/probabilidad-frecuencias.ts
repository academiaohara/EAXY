import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadFrecuenciasLesson: InteractiveLesson = {
  slug: "probabilidad-frecuencias",
  title: "4. Frecuencia absoluta y relativa",
  subtitle: TEMA_15_SUBTITLE,
  steps: [
    {
      id: "definiciones",
      type: "concept",
      title: "Frecuencias",
      content: [
        "Repetimos un experimento aleatorio $n$ veces y anotamos cuántas veces ocurre cada suceso.",
        "La **frecuencia absoluta** $f_i$ de un suceso es el **número de veces** que aparece.",
        "La **frecuencia relativa** $h_i$ es el cociente $h_i = \\dfrac{f_i}{n}$.",
        "La suma de todas las frecuencias absolutas es $n$; la suma de las frecuencias relativas es $1$ (o $100\\,\\%$).",
      ],
    },
    {
      id: "ejemplo-dado",
      type: "animated_solution",
      title: "Roberto lanza un dado 50 veces",
      content: ["Completamos la tabla del temario y leemos las frecuencias."],
      frames: [
        {
          caption: "Frecuencias absolutas (ejemplo):",
          math: "f_1=7,\\ f_2=6,\\ f_3=14,\\ f_4=9,\\ f_5=10,\\ f_6=4",
        },
        {
          caption: "Suma:",
          math: "7+6+14+9+10+4 = 50 = n",
        },
        {
          caption: "Frecuencia relativa de la cara $3$:",
          math: "h_3 = \\dfrac{14}{50} = 0{,}28",
        },
        {
          caption: "Todas las $h_i$ suman $1$.",
          math: "0{,}14+0{,}12+0{,}28+0{,}18+0{,}20+0{,}08 = 1",
        },
      ],
    },
    {
      id: "probabilidad-frecuencia",
      type: "concept",
      title: "Puente hacia la probabilidad",
      content: [
        "La **probabilidad** de un suceso es el número al que se **aproxima** su frecuencia relativa cuando $n$ es muy grande.",
        "Por eso las propiedades de las frecuencias relativas (entre $0$ y $1$, suman $1$) se parecen a las de la probabilidad.",
        "Si lanzamos una moneda muchas veces, $h_{\\text{cara}}$ y $h_{\\text{cruz}}$ se acercan a $0{,}5$.",
      ],
    },
    {
      id: "bombo",
      type: "concept",
      title: "Bombo del 0 al 9",
      content: [
        "En un bombo con bolas $0$–$9$ se repite $100$ veces la extracción (con reemplazo).",
        "Con la tabla de $f_i$ calculamos $h_i = f_i / 100$ para cada bola.",
        "Para un suceso compuesto, por ejemplo $A =$ «múltiplo de $3$» $= \\{3,6,9\\}$, sumamos las frecuencias relativas: $h_A = h_3 + h_6 + h_9$.",
        "Lo mismo vale para unión e intersección de sucesos: $h_{A \\cup B}$ suma conteos de elementales distintos; $h_{A \\cap B}$ solo los comunes.",
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "En $50$ lanzamientos de un dado sale la cara $3$ exactamente $14$ veces. ¿Cuál es $h_3$?",
      options: [
        { id: "a", text: "$14$" },
        { id: "b", text: "$0{,}28$" },
        { id: "c", text: "$0{,}50$" },
      ],
      correctOptionId: "b",
      explanation: "$h_3 = f_3 / n = 14/50 = 0{,}28$.",
    },
  ],
};
