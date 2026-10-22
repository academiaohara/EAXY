import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_14_SUBTITLE } from "@/data/lessons/shared";

export const probExperiencias4esoLesson: InteractiveLesson = {
  slug: "prob-experiencias-4eso",
  title: "1. Experiencias regulares e irregulares",
  subtitle: TEMA_4ESO_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "irregulares",
      type: "slide",
      help: [
        { label: "Frecuencia relativa", message: "$fr = \\frac{\\text{nº de veces que ocurre}}{\\text{nº de veces que se repite la experiencia}}$. Con muchas repeticiones se acerca a la probabilidad." },
        { label: "Cuántas veces", message: "Cuantas más veces se repita la experiencia, más fiable es el valor asignado." },
      ],
      title: "Experiencias irregulares: experimentar",
      blocks: [
        { kind: "text", text: "Una chincheta, un dado cargado, una bolsa de composición desconocida… **no hay modo de calcular** su probabilidad: hay que **experimentar** y asignar la **frecuencia relativa** como valor aproximado." },
      ],
      visual: { kind: "anim", scene: "frecuencias-dado" },
    },
    {
      id: "check-fr",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Frecuencia relativa", message: "$\\frac{34}{100}$." }],
      title: "Una bolsa de colores",
      question: "Se extrae, mira y devuelve una bola $100$ veces, y el color azul sale $34$. ¿Qué probabilidad aproximada se le asigna? (con coma)",
      correctAnswers: ["0,34", "0.34"],
      explanation: "$P \\approx fr = \\frac{34}{100} = 0{,}34$.",
    },
    {
      id: "check-dado",
      type: "predict",
      mode: "choice",
      help: [{ label: "1/6", message: "Un dado correcto: $\\frac{1}{6} \\approx 0{,}167$ para cada cara." }],
      title: "¿Es correcto este dado?",
      question: "Tras $1\\,000$ lanzamientos de un dado, las frecuencias relativas son $0{,}154;\\ 0{,}123;\\ 0{,}236;\\ 0{,}105;\\ 0{,}201;\\ 0{,}181$. ¿Qué concluyes?",
      choices: [
        { id: "def", label: "Es defectuoso: algunas se alejan mucho de $\\frac{1}{6} \\approx 0{,}167$" },
        { id: "ok", label: "Es correcto", incorrectFeedback: "Con $1\\,000$ lanzamientos se esperaría cerca de $0{,}167$ para todas; el $0{,}236$ y el $0{,}105$ están lejos." },
        { id: "nose", label: "No se puede saber con $1\\,000$ lanzamientos", incorrectFeedback: "$1\\,000$ lanzamientos son suficientes para detectar estas diferencias tan grandes." },
      ],
      correctChoiceId: "def",
      shuffleChoices: true,
      explanation: "Las frecuencias relativas son valores aproximados de las probabilidades de cada cara; el dado no es regular.",
    },
    {
      id: "laplace",
      type: "slide",
      help: [
        { label: "Experiencia regular", message: "Dado correcto, baraja completa, moneda equilibrada, bolas idénticas…: todos los casos tienen la **misma probabilidad**." },
        { label: "Suceso", message: "Un suceso es un conjunto de casos; si tiene $k$ casos de $n$, su probabilidad es $\\frac{k}{n}$." },
      ],
      title: "Experiencias regulares: Laplace",
      blocks: [
        { kind: "formula", tex: "P[S] = \\dfrac{\\text{casos favorables a } S}{\\text{casos posibles}}" },
        { kind: "text", text: "Si hay $n$ casos igualmente probables, cada uno tiene probabilidad $\\frac{1}{n}$." },
      ],
      visual: { kind: "anim", scene: "laplace-dado" },
    },
    {
      id: "check-bolas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Laplace", message: "$\\frac{15}{40}$." }],
      title: "40 bolas idénticas",
      question: "En una bolsa hay $40$ bolas idénticas salvo en el color, y $15$ son rojas. ¿Cuál es $P[\\text{roja}]$? (con coma)",
      correctAnswers: ["0,375", "0.375"],
      explanation: "$\\frac{15}{40} = \\frac{3}{8} = 0{,}375$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "¿Se pueden suponer casos iguales?", message: "Si el instrumento es regular, se aplica Laplace; si no, hay que experimentar." }],
      title: "¿Regular o irregular?",
      question: "Clasifica cada experiencia.",
      groups: [
        { id: "regular", label: "Regular (Laplace)", tone: "emerald" },
        { id: "irregular", label: "Irregular (experimentar)", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Lanzar un dado cúbico correcto", group: "regular" },
        { id: "b", text: "Lanzar una chincheta", group: "irregular" },
        { id: "c", text: "Sacar una carta de una baraja completa", group: "regular" },
        { id: "d", text: "Extraer una bola de una bolsa cuya composición ignoramos", group: "irregular" },
        { id: "e", text: "Lanzar un dado trucado", group: "irregular" },
        { id: "f", text: "Elegir una bola numerada al azar de 100 idénticas", group: "regular" },
      ],
      hint: "Regular: todos los casos igual de probables.",
    },
  ],
};
