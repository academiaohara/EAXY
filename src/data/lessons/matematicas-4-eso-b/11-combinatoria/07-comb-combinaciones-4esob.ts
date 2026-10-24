import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_11_SUBTITLE } from "@/data/lessons/shared";

export const combCombinaciones4esobLesson: InteractiveLesson = {
  slug: "comb-combinaciones-4esob",
  title: "7. Combinaciones",
  subtitle: TEMA_4ESOB_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        { label: "Significado preciso", message: "En lenguaje corriente «combinar» significa muchas cosas. En este tema, **combinación** es solo la agrupación que no tiene en cuenta el orden y no repite." },
        { label: "Notación", message: "$C_{m,n}$ se lee «combinaciones de $m$ elementos tomados de $n$ en $n$»." },
      ],
      title: "Elegir sin importar el orden",
      blocks: [
        { kind: "definition", text: "De $m$ elementos tomamos $n$ **sin que importe el orden** y **sin repetir**. Son las **combinaciones** $C_{m,n}$." },
        { kind: "rule", formula: "C_{m,n} = \\dfrac{V_{m,n}}{P_n} = \\dfrac{m(m-1)\\cdots(m-n+1)}{n(n-1)\\cdots3\\cdot2\\cdot1}" },
        { kind: "example", lines: [{ math: "C_{10,3} = \\dfrac{10\\cdot9\\cdot8}{3\\cdot2\\cdot1} = 120" }] },
      ],
      visual: { kind: "tool", tool: "combinatoria-explorador", params: { a: 10, b: 3 }, hint: "Mira la nota final: cada combinación está contada n! veces en las variaciones." },
    },
    {
      id: "check-c64",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Elegir 4 de 6", message: "Es lo mismo que elegir los 2 que **no** se llevan: $C_{6,4} = C_{6,2}$." }],
      title: "Calcular C₆,₄",
      question: "Calcula $C_{6,4}$. (solo el número)",
      correctAnswers: ["15"],
      explanation: "$\\dfrac{6\\cdot5\\cdot4\\cdot3}{4\\cdot3\\cdot2\\cdot1} = \\dfrac{360}{24} = 15$.",
    },
    {
      id: "check-pinturas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Mezcla de tres", message: "Una mezcla no depende del orden en que añadas los colores. Elige 3 de 8." }],
      title: "Mezclas de colores",
      question: "Con $8$ tarros de pintura de colores distintos, ¿cuántas mezclas de **tres** colores en cantidades iguales se pueden hacer? (solo el número)",
      correctAnswers: ["56"],
      explanation: "$C_{8,3} = \\dfrac{8\\cdot7\\cdot6}{3\\cdot2\\cdot1} = 56$.",
    },
    {
      id: "check-examen",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Qué problemas hago", message: "Elegir 5 problemas de 7 es lo mismo que elegir los 2 que se dejan sin hacer." }],
      title: "Un examen con elección",
      question: "En un examen hay $7$ problemas y hay que elegir $5$. ¿Cuántas elecciones puede plantearse un alumno? (solo el número)",
      correctAnswers: ["21"],
      explanation: "$C_{7,5} = C_{7,2} = \\dfrac{7 \\cdot 6}{2} = 21$.",
    },
    {
      id: "check-planos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tres puntos", message: "Con 6 puntos no alineados ni coplanarios cuatro a cuatro, cada plano queda determinado por 3 puntos." }],
      title: "Planos que pasan por tres puntos",
      question: "Tenemos $6$ puntos en el espacio sin tres alineados ni cuatro en un mismo plano. ¿Cuántos planos pasan por **tres** de ellos? (solo el número)",
      correctAnswers: ["20"],
      explanation: "$C_{6,3} = \\dfrac{6\\cdot5\\cdot4}{3\\cdot2\\cdot1} = 20$.",
    },
  ],
};
