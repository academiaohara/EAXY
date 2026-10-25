import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const condicionadaIndependencia1bachLesson: InteractiveLesson = {
  slug: "condicionada-independencia-1bach",
  title: "6. Probabilidad condicionada e independencia",
  subtitle: TEMA_1BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "con-sin",
      type: "slide",
      help: [{ label: "Condicionada", message: "$P(B/A)$ es la probabilidad de $B$ sabiendo que ya ha ocurrido $A$. Se lee «probabilidad de $B$ condicionado a $A$»." }],
      title: "Con y sin reemplazamiento",
      blocks: [
        { kind: "text", text: "En una bolsa con $3$ bolas verdes y $2$ rojas, la probabilidad de sacar dos verdes **depende** de si se devuelve la primera bola o no." },
        { kind: "example", title: "Con reemplazamiento (independientes)", lines: [
          { math: "P(V \\cap V) = \\dfrac{3}{5}\\cdot\\dfrac{3}{5} = \\dfrac{9}{25}" },
        ] },
        { kind: "example", title: "Sin reemplazamiento (dependientes)", lines: [
          { math: "P(V \\cap V) = P(V)\\cdot P(V/V) = \\dfrac{3}{5}\\cdot\\dfrac{2}{4} = \\dfrac{3}{10}" },
        ] },
      ],
      visual: { kind: "anim", scene: "arbol-urna", params: { nums: [3, 2, 0] } },
    },
    {
      id: "formulas",
      type: "slide",
      help: [{ label: "Más general", message: "La fórmula con $P(B/A)$ vale siempre: si son independientes, $P(B/A) = P(B)$ y se reduce al producto." }],
      title: "Intersección e independencia",
      blocks: [
        { kind: "facts", items: [
          { tex: "P(A \\cap B) = P(A)\\cdot P(B/A)", label: "siempre" },
          { tex: "P(B/A) = \\dfrac{P(A \\cap B)}{P(A)}", label: "condicionada" },
          { tex: "P(A \\cap B) = P(A)\\cdot P(B)", label: "si A y B son independientes" },
        ] },
        { kind: "text", text: "$A$ y $B$ son **independientes** si saber que ocurre $A$ no cambia la probabilidad de $B$: $P(B/A) = P(B)$." },
      ],
      visual: { kind: "tool", tool: "urna-arbol-explorador", initial: [3, 2, 0], hint: "Con 3 verdes y 2 rojas, sin reemplazamiento: VV = 3/10, VR = 3/10, RV = 3/10, RR = 1/10. Marca «con reemplazamiento» y compara." },
    },
    {
      id: "check-ases",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Primer as: $\\frac{4}{40}$. Segundo as, sin reemplazo: quedan $3$ ases en $39$ cartas." }],
      title: "Dos ases sin reemplazamiento",
      question: "Se sacan dos cartas de la baraja de $40$ sin reemplazamiento. ¿Cuál es la probabilidad de que las dos sean ases? (fracción simplificada)",
      correctAnswers: ["1/130", "12/1560"],
      explanation: "$\\dfrac{4}{40}\\cdot\\dfrac{3}{39} = \\dfrac{12}{1560} = \\dfrac{1}{130}$.",
    },
    {
      id: "check-reemplazo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con reemplazamiento los sucesos son independientes: $\\frac{1}{10}\\cdot\\frac{1}{10}$." }],
      title: "Dos ases con reemplazamiento",
      question: "Y si se devuelve la primera carta antes de sacar la segunda, ¿cuál es la probabilidad de dos ases? (fracción)",
      correctAnswers: ["1/100", "0,01", "0.01", "16/1600"],
      explanation: "$\\dfrac{4}{40}\\cdot\\dfrac{4}{40} = \\dfrac{1}{10}\\cdot\\dfrac{1}{10} = \\dfrac{1}{100}$: más probable que sin reemplazamiento ($\\frac{1}{130}$).",
    },
    {
      id: "check-seis-doble",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Los dos lanzamientos son independientes: $\\frac{1}{6}\\cdot\\frac{1}{6}$." }],
      title: "Seis doble",
      question: "Al tirar un dado dos veces, ¿cuál es la probabilidad de sacar dos seises? (fracción)",
      correctAnswers: ["1/36"],
      explanation: "$P(6)\\cdot P(6) = \\dfrac{1}{6}\\cdot\\dfrac{1}{6} = \\dfrac{1}{36}$.",
    },
    {
      id: "check-alguno",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "«Al menos un 6» es el contrario de «ningún 6»: $1 - \\left(\\frac{5}{6}\\right)^2$." }],
      title: "Al menos un 6 en dos tiradas",
      question: "Al tirar un dado dos veces, ¿cuál es la probabilidad de sacar **al menos un 6**? (fracción)",
      correctAnswers: ["11/36"],
      explanation: "$1 - \\dfrac{5}{6}\\cdot\\dfrac{5}{6} = 1 - \\dfrac{25}{36} = \\dfrac{11}{36}$.",
    },
    {
      id: "check-indep",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si $P(B/A) \\neq P(B)$, saber que ha ocurrido $A$ cambia la probabilidad de $B$." }],
      title: "¿Independientes?",
      question: "Si $P(B/A) \\neq P(B)$, los sucesos $A$ y $B$ son…",
      choices: [
        { id: "a", label: "dependientes: $A$ influye en $B$" },
        { id: "b", label: "independientes", incorrectFeedback: "La independencia exige $P(B/A) = P(B)$." },
        { id: "c", label: "incompatibles", incorrectFeedback: "Incompatibles significa $A \\cap B = \\varnothing$, que es otra cosa." },
        { id: "d", label: "contrarios", incorrectFeedback: "Contrarios es $B = A^c$, no tiene que ver con $P(B/A)$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Hay que distinguir: **independientes** ($P(B/A) = P(B)$) e **incompatibles** ($A \\cap B = \\varnothing$) no son lo mismo; de hecho, dos sucesos incompatibles con probabilidad no nula son dependientes.",
    },
  ],
};
