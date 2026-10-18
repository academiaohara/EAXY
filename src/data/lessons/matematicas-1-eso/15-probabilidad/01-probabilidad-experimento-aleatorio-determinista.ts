import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadExperimentoAleatorioDeterministaLesson: InteractiveLesson = {
  slug: "probabilidad-experimento-aleatorio-determinista",
  title: "1. Experimento aleatorio y determinista",
  subtitle: TEMA_15_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "¿Qué es la probabilidad?",
      content: [
        "El estudio matemático de la **probabilidad** nació ligado a los juegos de azar, pero hoy se usa en seguros, control de calidad industrial, medicina y muchas otras áreas junto con la Estadística.",
        "En esta unidad los cálculos son sencillos; lo importante es entender bien los conceptos: experimento, espacio muestral, suceso, frecuencias y **regla de Laplace**.",
      ],
    },
    {
      id: "determinista",
      type: "concept",
      title: "Experimento determinista",
      content: [
        "Un **experimento determinista** es aquel cuyo resultado podemos **predecir** antes de realizarlo, una vez conocidas las condiciones.",
        "Ejemplos del temario:",
        "— Calentar agua: a $100\\,°\\text{C}$ el agua hierve.",
        "— Un coche a $100\\ \\text{km/h}$ durante $2$ horas recorre $200\\ \\text{km}$.",
        "Suele expresarse con frases del tipo: «Es seguro que…».",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Determinista",
          items: [
            { title: "División exacta", math: "10 : 2 = 5", caption: "Siempre el mismo resultado", tone: "emerald" },
            { title: "Cuadrado", math: "7^2 = 49", caption: "Predecible", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "aleatorio",
      type: "concept",
      title: "Experimento aleatorio",
      content: [
        "Un **experimento aleatorio** es aquel cuyo resultado **no se puede predecir**, aunque repitamos el experimento en las mismas condiciones.",
        "El lenguaje habitual habla de incertidumbre: «es más probable», «es imposible», «es casi seguro», «es poco probable»…",
        "Ejemplos: lanzar un dado, sacar una carta de una baraja o una bola de una urna con varios colores.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Aleatorio",
          items: [
            { title: "Dado", math: "E = \\{1,2,3,4,5,6\\}", caption: "No sabemos la cara", tone: "cobalt" },
            { title: "Moneda", math: "E = \\{\\text{cara},\\text{ cruz}\\}", caption: "Azar", tone: "cobalt" },
          ],
        },
      ],
    },
    {
      id: "ejemplo-clasificar",
      type: "animated_solution",
      title: "Clasificar experimentos",
      content: ["Decidimos si «lanzar una moneda» es determinista o aleatorio."],
      frames: [
        {
          caption: "¿Podemos saber de antemano si saldrá cara o cruz?",
          math: "\\text{No, aunque repitamos el lanzamiento}",
        },
        {
          caption: "Conclusión:",
          math: "\\text{Lanzar una moneda es un experimento aleatorio}",
        },
        {
          caption: "Posible resultado (ejemplo):",
          math: "\\text{cara}",
        },
      ],
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
          label: "Aleatorio no es «raro»",
          message: "Aleatorio significa que no puedes saber el resultado antes de hacerlo, aunque conozcas todas las posibilidades.",
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
  ],
};
