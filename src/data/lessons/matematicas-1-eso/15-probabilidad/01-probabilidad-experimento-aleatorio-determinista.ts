import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadExperimentoAleatorioDeterministaLesson: InteractiveLesson = {
  slug: "probabilidad-experimento-aleatorio-determinista",
  title: "1. Experimento aleatorio y determinista",
  subtitle: TEMA_15_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      help: [
        {
          label: "¿Para qué sirve?",
          message: "Para medir cuánta confianza podemos tener en que ocurra algo cuando no podemos estar seguros.",
        },
        {
          label: "¿De dónde viene?",
          message: "De los juegos de azar, pero se usa en seguros, medicina o fábricas para decidir con incertidumbre.",
        },
      ],
      title: "¿Qué es la probabilidad?",
      blocks: [
        {
          kind: "definition",
          text: "La **probabilidad** mide la confianza que podemos tener en que ocurra algo cuando no podemos estar seguros del resultado.",
        },
        {
          kind: "text",
          text: "Nació ligada a los juegos de azar, pero hoy se usa en seguros, control de calidad, medicina… En esta unidad veremos experimento, espacio muestral, suceso, frecuencias y la **regla de Laplace**.",
        },
      ],
    },
    {
      id: "determinista-aleatorio",
      type: "slide",
      help: [
        {
          label: "Un test mental",
          message: "Si repites el experimento con las mismas condiciones, ¿saldrá siempre lo mismo? Entonces es determinista.",
        },
        {
          label: "Aleatorio no es «raro»",
          message: "Aleatorio significa que no puedes saber el resultado antes de hacerlo, aunque conozcas todas las posibilidades.",
        },
      ],
      title: "Determinista o aleatorio",
      blocks: [
        {
          kind: "compare",
          left: { title: "Determinista", text: "Se puede predecir el resultado antes de hacerlo: «es seguro que…». Calentar agua a 100 °C.", tone: "ok" },
          right: { title: "Aleatorio", text: "No se puede predecir aunque se repita en las mismas condiciones. Lanzar un dado.", tone: "key" },
        },
        {
          kind: "text",
          text: "El lenguaje de lo aleatorio habla de incertidumbre: «es más probable», «es poco probable», «es imposible».",
        },
      ],
      visual: { kind: "anim", scene: "exp-determinista-aleatorio", beatMs: 3500 },
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "¿Cómo los distingo?",
          message: "Repite el experimento en las mismas condiciones. Si siempre sale lo mismo, es determinista; si el resultado cambia, es aleatorio.",
        },
        {
          label: "Conocer las opciones no basta",
          message: "En una moneda sabes que saldrá cara o cruz, pero no cuál. Conocer las opciones no es predecir.",
        },
      ],
      title: "Comprueba lo aprendido",
      question: "Clasifica cada experimento como aleatorio o determinista.",
      groups: [
        { id: "aleatorio", label: "Aleatorio", tone: "cobalt" },
        { id: "determinista", label: "Determinista", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Lanzar un dado al aire", group: "aleatorio" },
        { id: "b", text: "Sacar una carta de una baraja española", group: "aleatorio" },
        { id: "c", text: "El resultado de dividir $10$ entre $2$", group: "determinista" },
        { id: "d", text: "Calentar agua hasta que hierva y anotar la temperatura (a nivel del mar)", group: "determinista" },
        { id: "e", text: "Sacar una bola de una urna con bolas de varios colores", group: "aleatorio" },
        { id: "f", text: "Distancia que recorre un coche a $60\\ \\text{km/h}$ durante $3$ horas", group: "determinista" },
      ],
      hint: "Pregúntate: ¿puedo saber el resultado **antes** de hacerlo?",
      explanation:
        "Son deterministas los que siempre dan lo mismo: $10 : 2 = 5$, el agua hierve a $100\\,°\\text{C}$ y el coche recorre $180\\ \\text{km}$. El dado, la carta y la bola dependen del azar.",
    },
    {
      id: "pronostico",
      type: "predict",
      help: [
        {
          label: "Mira el verbo",
          message: "«Es seguro que…» es lenguaje determinista. «Es probable que…» es lenguaje aleatorio.",
        },
        {
          label: "¿Se puede asegurar?",
          message: "Si hay alguna posibilidad de que no ocurra, no es seguro: es aleatorio.",
        },
      ],
      title: "El pronóstico del tiempo",
      question:
        "La previsión dice: «mañana la probabilidad de lluvia es del 70 %». ¿Qué tipo de experimento describe el tiempo de mañana?",
      mode: "choice",
      choices: [
        { id: "a", label: "Aleatorio: no se puede asegurar si lloverá" },
        {
          id: "b",
          label: "Determinista: sabemos con certeza lo que pasará",
          incorrectFeedback: "Si fuese determinista, la previsión diría «lloverá» o «no lloverá». Hablar de probabilidad indica incertidumbre.",
        },
        {
          id: "c",
          label: "Ninguno: el tiempo no se puede estudiar",
          incorrectFeedback: "Sí se puede estudiar: la probabilidad sirve precisamente para medir la incertidumbre de fenómenos así.",
        },
        {
          id: "d",
          label: "Determinista, porque el $70\\,\\%$ es casi seguro",
          incorrectFeedback: "El $70\\,\\%$ no es $100\\,\\%$: aún puede no llover. Casi seguro no es seguro.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Que se hable de probabilidad ($70\\,\\%$) indica que el resultado no se puede predecir con certeza: es un experimento aleatorio.",
    },
  ],
};
