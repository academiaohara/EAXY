import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_9_SUBTITLE } from "@/data/lessons/shared";

export const combVariacionesRepeticionCcss1Lesson: InteractiveLesson = {
  slug: "comb-variaciones-repeticion-ccss1",
  title: "3. Variaciones con repetición",
  subtitle: TEMA_CCSS1_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "modelo",
      type: "slide",
      help: [
        { label: "Dos condiciones", message: "Se pueden repetir elementos **y** importa el orden. Con estas dos condiciones, cada posición se rellena de $m$ formas independientes." },
        { label: "Notación", message: "Se escribe $VR_{m,n}$ o $VR_m^n$ y se lee «variaciones con repetición de $m$ elementos tomados de $n$ en $n$»." },
      ],
      title: "Un modelo general",
      blocks: [
        { kind: "definition", text: "Con $m$ elementos formamos **tiras ordenadas** de $n$ de ellos, pudiendo repetirlos. Son las **variaciones con repetición**." },
        { kind: "rule", formula: "VR_{m,n} = m^n" },
        { kind: "example", lines: [{ math: "VR_{3,4} = 3^4 = 81", note: "quiniela de 4 partidos: 3 signos, 4 lugares" }] },
      ],
      visual: { kind: "tool", tool: "combinatoria-explorador", params: { a: 3, b: 4 }, hint: "Sube n con m fijo: la primera fila es mⁿ y crece muy deprisa." },
    },
    {
      id: "check-impares",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Cifras impares", message: "Hay $5$ cifras impares: $1,3,5,7,9$. Cada una de las $4$ posiciones se rellena de $5$ formas." }],
      title: "Números de cuatro cifras",
      question: "¿Cuántos números de $4$ cifras se pueden formar usando solo las cifras impares? (se pueden repetir; solo el número)",
      correctAnswers: ["625"],
      explanation: "$VR_{5,4} = 5^4 = 625$.",
    },
    {
      id: "check-dado",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Seis por cuatro", message: "Cada lanzamiento tiene $6$ resultados y se hacen $4$." }],
      title: "Un dado cuatro veces",
      question: "Lanzamos un dado $4$ veces y nos importa el orden en que salen los números. ¿Cuántos resultados distintos puede haber? (solo el número)",
      correctAnswers: ["1296", "1 296"],
      explanation: "$VR_{6,4} = 6^4 = 1\\,296$.",
    },
    {
      id: "check-banderas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Franjas", message: "Cada franja se pinta de uno de los $7$ colores, y dos o tres franjas pueden repetir color." }],
      title: "Banderas de tres franjas",
      question: "Con $7$ colores se pintan las tres franjas de una bandera (cada franja de un solo color, se pueden repetir colores). ¿Cuántas banderas salen? (solo el número)",
      correctAnswers: ["343"],
      explanation: "$VR_{7,3} = 7^3 = 343$.",
    },
    {
      id: "check-byte",
      type: "predict",
      mode: "choice",
      help: [{ label: "Dos símbolos", message: "Un byte tiene $8$ dígitos y cada uno es $0$ o $1$." }],
      title: "Un byte",
      question: "Un byte son $8$ dígitos, cada uno $0$ o $1$. ¿Cuántos bytes distintos hay?",
      choices: [
        { id: "a", label: "$2^8 = 256$" },
        { id: "b", label: "$8^2 = 64$", incorrectFeedback: "Has intercambiado base y exponente: son $2$ símbolos en $8$ lugares, $2^8$." },
        { id: "c", label: "$2 \\cdot 8 = 16$", incorrectFeedback: "No se suman las opciones: se multiplican, una por cada posición." },
        { id: "d", label: "$8! = 40\\,320$", incorrectFeedback: "Los dígitos se repiten (muchos ceros y unos): no son ordenaciones de elementos distintos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$m = 2$ símbolos en $n = 8$ lugares: $VR_{2,8} = 2^8 = 256$.",
    },
  ],
};
