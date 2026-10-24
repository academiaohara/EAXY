import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_11_SUBTITLE } from "@/data/lessons/shared";

export const combVariaciones4esobLesson: InteractiveLesson = {
  slug: "comb-variaciones-4esob",
  title: "4. Variaciones ordinarias",
  subtitle: TEMA_4ESOB_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "modelo",
      type: "slide",
      help: [
        { label: "Menos cada vez", message: "En cada puesto queda un candidato menos que en el anterior, porque los elementos no se pueden repetir." },
        { label: "Dónde parar", message: "Se multiplican exactamente $n$ factores, empezando en $m$." },
      ],
      title: "Importa el orden, sin repetir",
      blocks: [
        { kind: "definition", text: "Con $m$ elementos formamos tiras **ordenadas** de $n$ de ellos, **sin repetir** ninguno. Son las **variaciones ordinarias** (con $n \\leq m$)." },
        { kind: "rule", formula: "V_{m,n} = m \\cdot (m-1) \\cdot (m-2) \\cdots (m-n+1)\\quad (n\\ \\text{factores decrecientes})" },
        { kind: "example", lines: [{ math: "V_{8,3} = 8 \\cdot 7 \\cdot 6 = 336", note: "tres medallas entre ocho finalistas" }] },
      ],
      visual: { kind: "tool", tool: "combinatoria-explorador", params: { a: 8, b: 3 }, hint: "Compara VR y V con m = 8 y n = 3: sin repetir salen menos casos." },
    },
    {
      id: "check-v95",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Cinco factores", message: "$V_{9,5} = 9 \\cdot 8 \\cdot 7 \\cdot 6 \\cdot 5$." }],
      title: "Calcular V₉,₅",
      question: "Calcula $V_{9,5}$. (solo el número)",
      correctAnswers: ["15120", "15 120"],
      explanation: "$9 \\cdot 8 \\cdot 7 \\cdot 6 \\cdot 5 = 15\\,120$.",
    },
    {
      id: "check-delegado",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Dos cargos distintos", message: "Delegado y subdelegado son cargos diferentes: importa quién es cada uno. Y la misma persona no puede ocupar los dos." }],
      title: "Delegado y subdelegado",
      question: "En un curso hay $7$ candidatos para delegado y subdelegado. ¿De cuántas formas se pueden elegir los dos cargos? (solo el número)",
      correctAnswers: ["42"],
      explanation: "$V_{7,2} = 7 \\cdot 6 = 42$.",
    },
    {
      id: "check-comunidad",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tres cargos", message: "Presidente, secretario y tesorero son cargos distintos y no se acumulan." }],
      title: "Elecciones en una comunidad",
      question: "Se presentan $8$ candidatos para presidente, secretario y tesorero. ¿De cuántas formas se pueden cubrir los tres cargos? (solo el número)",
      correctAnswers: ["336"],
      explanation: "$V_{8,3} = 8 \\cdot 7 \\cdot 6 = 336$.",
    },
    {
      id: "check-modelo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Dos preguntas", message: "¿Se pueden repetir? ¿Importa el orden? Con las respuestas decides el modelo." }],
      title: "¿Variación con o sin repetición?",
      question: "Cuántos números de dos cifras se pueden formar con los dígitos $1, 2, 3, 4, 5, 6, 7, 8$ si **se pueden repetir** (por ejemplo, 33)?",
      choices: [
        { id: "a", label: "$VR_{8,2} = 64$" },
        { id: "b", label: "$V_{8,2} = 56$", incorrectFeedback: "$V_{8,2}$ obligaría a que las dos cifras fueran distintas, pero aquí 33 vale." },
        { id: "c", label: "$C_{8,2} = 28$", incorrectFeedback: "Las combinaciones no distinguen el orden, pero 12 y 21 son números distintos." },
        { id: "d", label: "$P_8 = 40\\,320$", incorrectFeedback: "No se están ordenando los 8 dígitos, solo se eligen 2." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Importa el orden (12 ≠ 21) y se pueden repetir: $VR_{8,2} = 8^2 = 64$.",
    },
  ],
};
