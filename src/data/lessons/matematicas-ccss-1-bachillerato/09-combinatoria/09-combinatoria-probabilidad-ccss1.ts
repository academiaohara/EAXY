import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_9_SUBTITLE } from "@/data/lessons/shared";

export const combinatoriaProbabilidadCcss1Lesson: InteractiveLesson = {
  slug: "combinatoria-probabilidad-ccss1",
  title: "9. Combinatoria y cálculo de probabilidades",
  subtitle: TEMA_CCSS1_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "laplace-comb",
      type: "slide",
      help: [{ label: "Idea", message: "Si todos los resultados son equiprobables, P = casos favorables / casos posibles, y los dos números se cuentan con combinatoria." }],
      title: "Laplace con combinatoria",
      blocks: [
        { kind: "rule", title: "Regla de Laplace", formula: "P(A) = \\dfrac{\\text{casos favorables}}{\\text{casos posibles}}", text: "Válida cuando todos los resultados elementales son **equiprobables**." },
        { kind: "text", text: "Cuando hay muchos casos, no se listan: se **cuentan** con permutaciones, variaciones o combinaciones. En una extracción sin orden, los casos son combinaciones." },
        {
          kind: "example",
          title: "Urna con 10 bolas, 4 rojas; se extraen 3 a la vez",
          lines: [
            { math: "\\text{casos posibles} = \\binom{10}{3} = 120" },
            { math: "\\text{favorables (3 rojas)} = \\binom{4}{3} = 4", note: "elegir 3 de las 4 rojas" },
            { math: "P(\\text{3 rojas}) = \\dfrac{4}{120} = \\dfrac{1}{30}" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "combinatoria-explorador", params: { a: 10, b: 3 }, hint: "Con m = 10 y n = 3, las combinaciones C(10, 3) son los casos posibles al extraer 3 bolas a la vez." },
    },
    {
      id: "check-bolas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Casos posibles: $\\binom{10}{3}$. Favorables: $\\binom{4}{3}$." }],
      title: "Tres bolas rojas",
      question: "En la urna anterior, ¿cuántos casos favorables hay para sacar **tres bolas rojas**? (solo el número)",
      correctAnswers: ["4"],
      explanation: "Hay que elegir $3$ de las $4$ rojas: $\\binom{4}{3} = 4$. La probabilidad es $\\dfrac{4}{120} = \\dfrac{1}{30}$.",
    },
    {
      id: "check-comite",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Favorables: $\\binom{12}{2}\\cdot\\binom{8}{2}$. Posibles: $\\binom{20}{4} = 4\\,845$." }],
      title: "Un comité",
      question: "En un grupo hay $12$ chicas y $8$ chicos. Se elige al azar un comité de $4$ personas. ¿Cuántos comités distintos tienen **exactamente 2 chicas**? (solo el número)",
      correctAnswers: ["1848"],
      explanation: "Se eligen $2$ de las $12$ chicas y $2$ de los $8$ chicos: $\\binom{12}{2}\\binom{8}{2} = 66\\cdot 28 = 1\\,848$. Como hay $\\binom{20}{4} = 4\\,845$ comités posibles, la probabilidad es $\\dfrac{1\\,848}{4\\,845} \\approx 0{,}381$.",
    },
    {
      id: "check-primitiva",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En una primitiva se eligen $6$ números de $49$ sin importar el orden." }],
      title: "La lotería primitiva",
      question: "Para acertar los $6$ números de la primitiva (se eligen $6$ de $49$, sin importar el orden), ¿cuántas combinaciones posibles hay?",
      choices: [
        { id: "a", label: "$\\binom{49}{6} = 13\\,983\\,816$" },
        { id: "b", label: "$49\\cdot 48\\cdot 47\\cdot 46\\cdot 45\\cdot 44$", incorrectFeedback: "Eso cuenta variaciones: las mismas seis bolas en distinto orden contarían como boletos distintos." },
        { id: "c", label: "$49^6$", incorrectFeedback: "Eso permitiría repetir números, y en la primitiva no se repiten." },
        { id: "d", label: "$6!$", incorrectFeedback: "$6!$ son las formas de ordenar seis números, no de elegirlos entre 49." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "No importa el orden y no hay repetición: combinaciones. $\\binom{49}{6} = 13\\,983\\,816$, así que un boleto tiene una probabilidad de $\\dfrac{1}{13\\,983\\,816}$ de ganar.",
    },
    {
      id: "check-contrario",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pista", message: "«Al menos una defectuosa» es el contrario de «ninguna defectuosa»: $1 - \\dfrac{\\binom{30}{5}}{\\binom{35}{5}}$." }],
      title: "Al menos una",
      question: "Entre $35$ piezas hay $5$ defectuosas. Se eligen $5$ al azar. ¿Cuál es la probabilidad de que **al menos una** sea defectuosa? (con dos decimales; solo el número)",
      correctAnswers: ["0,56", "0.56"],
      explanation: "$P(\\text{ninguna}) = \\dfrac{\\binom{30}{5}}{\\binom{35}{5}} = \\dfrac{142\\,506}{324\\,632} \\approx 0{,}439$. Luego $P(\\text{al menos una}) = 1 - 0{,}439 \\approx 0{,}56$.",
    },
  ],
};
