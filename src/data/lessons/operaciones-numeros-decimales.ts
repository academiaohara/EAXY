import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_5_SUBTITLE } from "@/data/lessons/shared";

export const operacionesNumerosDecimalesLesson: InteractiveLesson = {
  slug: "operaciones-numeros-decimales",
  title: "2. Operaciones con números decimales",
  subtitle: TEMA_5_SUBTITLE,
  steps: [
    {
      id: "suma-resta",
      type: "concept",
      title: "Suma y resta",
      content: [
        "Coloca los números **en columna** alineando las comas.",
        "Suma o resta unidades con unidades, décimas con décimas, etc.",
        "Las reglas de signos de los enteros valen igual con decimales.",
      ],
    },
    {
      id: "hucha",
      type: "animated_solution",
      title: "Problema resuelto — la hucha de Iván",
      content: ["Saldo inicial $134{,}56\\,€$, ingresos y extracciones del temario."],
      frames: [
        {
          caption: "Ingresos: $134{,}56 + 5{,}06 + 13{,}70$",
          math: "153{,}32\\,€",
        },
        {
          caption: "Extracciones: $12{,}80 + 5{,}75$",
          math: "18{,}55\\,€",
        },
        {
          caption: "Saldo final:",
          math: "153{,}32 - 18{,}55 = 134{,}77\\,€",
        },
      ],
    },
    {
      id: "multiplicacion",
      type: "concept",
      title: "Multiplicación",
      content: [
        "Multiplica como si fueran enteros y coloca la coma contando **todas** las cifras decimales de los factores.",
        "Por $10$, $100$, $1000$… desplaza la coma a la **derecha** uno, dos, tres… lugares.",
        "En dinero, redondea a **centésimas** (céntimos) cuando haga falta.",
      ],
    },
    {
      id: "tela",
      type: "animated_solution",
      title: "Problema resuelto — tela de Marta",
      content: ["$3{,}5\\,\\mathrm{m}$ a $12{,}85\\,€/\\mathrm{m}$."],
      frames: [
        { caption: "Producto exacto:", math: "12{,}85 \\cdot 3{,}5 = 44{,}975\\,€" },
        {
          caption: "Redondeo a céntimos (primera cifra suprimida $7 \\geq 5$):",
          math: "44{,}98\\,€",
        },
      ],
    },
    {
      id: "potencias-10",
      type: "concept",
      title: "Multiplicar por potencias de 10",
      content: [
        "$2{,}45 \\cdot 10 = 24{,}5$ $2{,}45 \\cdot 100 = 245$",
        "$2{,}45 \\cdot 1000 = 2450$ $2{,}45 \\cdot 10\\,000 = 24\\,500$",
      ],
    },
    {
      id: "check-coma",
      type: "multiple_choice",
      title: "Colocar la coma",
      question: "¿Cuánto es $0{,}25 \\cdot 4$?",
      options: [
        { id: "a", text: "$1$" },
        { id: "b", text: "$0{,}1$" },
        { id: "c", text: "$10$" },
      ],
      correctOptionId: "a",
      explanation: "$25 \\cdot 4 = 100$; dos cifras decimales → $1{,}00$.",
    },
    {
      id: "check-expresion",
      type: "fill_in_blank",
      title: "Prioridad de operaciones",
      question: "Calcula $5{,}6 - 2{,}1 \\cdot (0{,}5 - 1{,}2)$. Respuesta con coma decimal.",
      correctAnswers: ["7,07", "7.07"],
      hint: "Primero el paréntesis; luego la multiplicación.",
      explanation:
        "$(0{,}5 - 1{,}2) = -0{,}7$; $2{,}1 \\cdot (-0{,}7) = -1{,}47$; $5{,}6 - (-1{,}47) = 7{,}07$.",
    },
  ],
};
