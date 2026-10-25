import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const experimentosSucesos1bachLesson: InteractiveLesson = {
  slug: "experimentos-sucesos-1bach",
  title: "1. Experimentos aleatorios y sucesos",
  subtitle: TEMA_1BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "espacio-muestral",
      type: "slide",
      help: [{ label: "Vocabulario", message: "Un suceso es cualquier subconjunto del espacio muestral. Los sucesos elementales son los que tienen un solo resultado." }],
      title: "Espacio muestral y sucesos",
      blocks: [
        { kind: "definition", text: "Un **experimento aleatorio** es aquel que, repetido en las mismas condiciones, no permite predecir el resultado. El conjunto de resultados posibles es el **espacio muestral** $E$; cada resultado es un **suceso elemental** y un **suceso** es un subconjunto de $E$." },
      ],
      visual: { kind: "anim", scene: "espacio-muestral" },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Si conociendo las condiciones puedes saber el resultado de antemano, no es aleatorio." }],
      title: "¿Aleatorio o no?",
      question: "Clasifica cada experimento.",
      groups: [
        { id: "al", label: "Aleatorio", tone: "emerald" },
        { id: "no", label: "No aleatorio", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Lanzar dos dados y anotar la suma", group: "al" },
        { id: "b", text: "Calcular el área de un cuadrado de lado conocido", group: "no" },
        { id: "c", text: "Sacar una bola de una urna con bolas blancas y rojas", group: "al" },
        { id: "d", text: "Soltar un objeto y ver si cae", group: "no" },
        { id: "e", text: "Anotar el sexo del próximo bebé nacido en una clínica", group: "al" },
        { id: "f", text: "Calcular el precio de medio kilo a 3 € el kilo", group: "no" },
      ],
      hint: "Lo aleatorio depende del azar; lo determinista se calcula con los datos.",
    },
    {
      id: "check-dos-monedas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$E = \\{(C, C), (C, +), (+, C), (+, +)\\}$." }],
      title: "Dos monedas",
      question: "Al lanzar dos monedas, ¿cuántos sucesos elementales tiene el espacio muestral? (solo el número)",
      correctAnswers: ["4"],
      explanation: "$E = \\{(C, C), (C, +), (+, C), (+, +)\\}$: cuatro resultados. Importa el orden: $(C, +)$ y $(+, C)$ son distintos.",
    },
    {
      id: "check-suceso",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "«Exactamente una cara» se cumple con dos de los cuatro resultados." }],
      title: "Un suceso compuesto",
      question: "Al lanzar dos monedas, el suceso «sacar exactamente una cara» es…",
      choices: [
        { id: "a", label: "$\\{(C, +), (+, C)\\}$" },
        { id: "b", label: "$\\{(C, +)\\}$", incorrectFeedback: "Falta $(+, C)$: la cara puede salir en la primera o en la segunda moneda." },
        { id: "c", label: "$\\{(C, C), (+, +)\\}$", incorrectFeedback: "Son los resultados con dos caras y con ninguna." },
        { id: "d", label: "$\\{(C, C), (C, +), (+, C)\\}$", incorrectFeedback: "Eso es «al menos una cara», que incluye también $(C, C)$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El suceso está formado por dos sucesos elementales: $(C, +)$ y $(+, C)$.",
    },
    {
      id: "check-dado-moneda",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Por cada resultado del dado hay dos de la moneda: $6\\cdot 2$." }],
      title: "Dado y moneda",
      question: "Se lanzan un dado y una moneda. ¿Cuántos resultados tiene el espacio muestral? (solo el número)",
      correctAnswers: ["12"],
      explanation: "Cada uno de los $6$ resultados del dado se combina con $2$ de la moneda: $6\\cdot 2 = 12$.",
    },
  ],
};
