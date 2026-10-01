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
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "¿Cuál de estos experimentos es determinista?",
      options: [
        { id: "a", text: "Lanzar un dado al aire" },
        { id: "b", text: "Sacar una carta de una baraja española" },
        { id: "c", text: "El resultado de dividir $10$ entre $2$" },
      ],
      correctOptionId: "c",
      explanation:
        "La división $10 : 2 = 5$ siempre da el mismo resultado; los otros dependen del azar.",
    },
  ],
};
