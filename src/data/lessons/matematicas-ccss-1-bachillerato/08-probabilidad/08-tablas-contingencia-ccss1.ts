import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_8_SUBTITLE } from "@/data/lessons/shared";

export const tablasContingenciaCcss1Lesson: InteractiveLesson = {
  slug: "tablas-contingencia-ccss1",
  title: "8. Tablas de contingencia",
  subtitle: TEMA_CCSS1_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tabla",
      type: "slide",
      help: [{ label: "Sucesos incompatibles", message: "Para confeccionar una tabla, las categorías de cada variable deben ser incompatibles dos a dos y cubrir todos los casos." }],
      title: "Todas las probabilidades en una tabla",
      blocks: [
        { kind: "text", text: "Una **tabla de contingencia** recoge las probabilidades de las intersecciones y, en los márgenes, las de cada suceso. Con $500$ enfermos del hígado (diagnóstico correcto o incorrecto y lesión maligna o benigna):" },
        { kind: "example", title: "Frecuencias relativas = probabilidades", lines: [
          { math: "P(M\\cap C) = 0{,}412\\quad P(M\\cap I) = 0{,}024\\quad P(B\\cap C) = 0{,}536\\quad P(B\\cap I) = 0{,}028" },
          { math: "P(M) = 0{,}436\\quad P(B) = 0{,}564\\quad P(C) = 0{,}948\\quad P(I) = 0{,}052" },
        ] },
      ],
      visual: { kind: "tool", tool: "tabla-contingencia-explorador", initial: [0], hint: "Aquí A = diagnóstico correcto y B = lesión maligna. Cambia los datos y observa cómo se recalculan las probabilidades y la independencia." },
    },
    {
      id: "check-interseccion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Divide la casilla entre el total de enfermos: $\\frac{206}{500}$." }],
      title: "Una casilla",
      question: "En el estudio, $206$ de $500$ enfermos tienen lesión maligna y diagnóstico correcto. ¿Cuánto vale $P(M \\cap C)$? (decimal)",
      correctAnswers: ["0,412", "0.412"],
      explanation: "$P(M \\cap C) = \\dfrac{206}{500} = 0{,}412$.",
    },
    {
      id: "check-condicionada",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P(C/M) = \\dfrac{P(M \\cap C)}{P(M)} = \\dfrac{206}{218}$." }],
      title: "Probabilidad condicionada",
      question: "¿Cuánto vale $P(C/M)$, la probabilidad de diagnóstico correcto si la lesión es maligna? (decimal con 3 cifras)",
      correctAnswers: ["0,945", "0.945"],
      explanation: "$P(C/M) = \\dfrac{0{,}412}{0{,}436} \\approx 0{,}945$, muy cerca de $P(C) = 0{,}948$: casi independientes.",
    },
    {
      id: "accidentes",
      type: "slide",
      help: [{ label: "Completar", message: "Cada casilla interior es la diferencia entre el total de su fila (o columna) y la otra casilla de esa fila (o columna)." }],
      title: "Completar una tabla",
      blocks: [
        { kind: "text", text: "En un estudio de accidentes se sabe: $P(V \\cap C) = 0{,}27$, $P(V) = 0{,}56$ y $P(C) = 0{,}58$ (con víctimas, y en carretera). Se rellena restando:" },
        { kind: "example", title: "Casillas que faltan", lines: [
          { math: "P(V\\cap U) = 0{,}56 - 0{,}27 = 0{,}29\\qquad P(M\\cap C) = 0{,}58 - 0{,}27 = 0{,}31" },
          { math: "P(U) = 1 - 0{,}58 = 0{,}42\\qquad P(M) = 1 - 0{,}56 = 0{,}44\\qquad P(M\\cap U) = 0{,}13" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-VU",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P(V) = P(V \\cap C) + P(V \\cap U)$." }],
      title: "Casilla que falta",
      question: "Con $P(V \\cap C) = 0{,}27$ y $P(V) = 0{,}56$, ¿cuánto vale $P(V \\cap U)$? (decimal)",
      correctAnswers: ["0,29", "0.29"],
      explanation: "$P(V \\cap U) = P(V) - P(V \\cap C) = 0{,}56 - 0{,}27 = 0{,}29$.",
    },
    {
      id: "check-dependencia",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Compara $P(V/C) = \\frac{0{,}27}{0{,}58} \\approx 0{,}466$ con $P(V) = 0{,}56$." }],
      title: "¿Independientes?",
      question: "En el estudio de accidentes, ¿son independientes «con víctimas» y «en carretera»?",
      choices: [
        { id: "a", label: "No: $P(V/C) \\approx 0{,}466 \\neq P(V) = 0{,}56$" },
        { id: "b", label: "Sí: $P(V \\cap C)$ es positivo", incorrectFeedback: "Que la intersección no sea vacía no basta: hay que comparar $P(V\\cap C)$ con $P(V)\\cdot P(C)$." },
        { id: "c", label: "Sí: $P(V) + P(C) > 1$", incorrectFeedback: "Esa suma no decide la independencia." },
        { id: "d", label: "No se puede saber con esos datos", incorrectFeedback: "La tabla completa permite calcular $P(V/C)$ y compararla con $P(V)$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$P(V)\\cdot P(C) = 0{,}56\\cdot 0{,}58 = 0{,}3248 \\neq 0{,}27 = P(V \\cap C)$: son dependientes.",
    },
  ],
};
