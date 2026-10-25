import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_10_SUBTITLE } from "@/data/lessons/shared";

export const distribucionNormalCcss1Lesson: InteractiveLesson = {
  slug: "distribucion-normal-ccss1",
  title: "6. La distribución normal",
  subtitle: TEMA_CCSS1_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "campana",
      type: "slide",
      help: [{ label: "Idea", message: "La normal N(μ, σ) es la campana de Gauss: simétrica respecto de μ, con su anchura controlada por σ." }],
      title: "La campana de Gauss",
      blocks: [
        { kind: "definition", text: "Una variable sigue una **distribución normal** $N(\\mu, \\sigma)$ si su densidad es la curva de campana centrada en la media $\\mu$ y con desviación típica $\\sigma$. Describe estaturas, errores de medida, notas, consumos…, fenómenos donde influyen muchas causas pequeñas e independientes." },
        {
          kind: "facts",
          items: [
            { tex: "x = \\mu", label: "eje de simetría y máximo" },
            { tex: "\\mu \\pm \\sigma", label: "puntos de inflexión" },
            { tex: "\\text{media} = \\text{mediana} = \\text{moda}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "campana-normal" },
    },
    {
      id: "explorar",
      type: "slide",
      help: [{ label: "Idea", message: "Cambiar μ desplaza la campana; cambiar σ la hace más ancha (σ grande) o más estrecha (σ pequeña). El área total siempre es 1." }],
      title: "Efecto de μ y σ",
      blocks: [
        { kind: "text", text: "Mueve la media y la desviación típica y observa cómo cambia la campana. El área bajo la curva es siempre $1$, así que una campana más estrecha es también más alta." },
        { kind: "rule", title: "Regla 68 – 95 – 99,7", formula: "P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 0{,}68 \\quad P(\\mu \\pm 2\\sigma) \\approx 0{,}95 \\quad P(\\mu \\pm 3\\sigma) \\approx 0{,}997" },
      ],
      visual: { kind: "tool", tool: "normal-explorador", initial: [100, 15, 85, 115, 0], hint: "Con a = μ − σ y b = μ + σ el área es 0,68 sea cual sea μ y σ: es la regla 68–95–99,7." },
    },
    {
      id: "check-mitad",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La campana es simétrica respecto de la media." }],
      title: "Sin tabla ni cuentas",
      question: "Si $X \\sim N(\\mu, \\sigma)$, ¿cuánto vale $P(X < \\mu)$? (como decimal)",
      correctAnswers: ["0,5", "0.5"],
      explanation: "La curva es simétrica respecto de $x = \\mu$ y el área total es $1$: queda la mitad a cada lado, $P(X < \\mu) = 0{,}5$.",
    },
    {
      id: "check-regla",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Entre $\\mu - 2\\sigma$ y $\\mu + 2\\sigma$ queda aproximadamente el $95\\,\\%$." }],
      title: "La regla 68–95–99,7",
      question: "En una normal, ¿qué probabilidad hay de que un valor quede entre $\\mu - 2\\sigma$ y $\\mu + 2\\sigma$?",
      choices: [
        { id: "a", label: "Aproximadamente $0{,}95$" },
        { id: "b", label: "Aproximadamente $0{,}68$", incorrectFeedback: "El $68\\,\\%$ corresponde a $\\mu \\pm \\sigma$, no a $\\mu \\pm 2\\sigma$." },
        { id: "c", label: "Aproximadamente $0{,}997$", incorrectFeedback: "El $99{,}7\\,\\%$ corresponde a $\\mu \\pm 3\\sigma$." },
        { id: "d", label: "Depende de los valores de $\\mu$ y $\\sigma$", incorrectFeedback: "No: tras tipificar, todas las normales son iguales, y el porcentaje es siempre el mismo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) = P(-2 < Z < 2) = 0{,}9544$, sea cual sea la normal.",
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El intervalo «normal» es $[\\mu - \\sigma, \\mu + \\sigma]$." }],
      title: "El intervalo habitual",
      question: "El cociente intelectual se distribuye como $N(100, 15)$. ¿Cuál es el valor máximo del intervalo $[\\mu - \\sigma, \\mu + \\sigma]$ donde queda el $68\\,\\%$ de las personas? (solo el número)",
      correctAnswers: ["115"],
      explanation: "$[\\mu - \\sigma, \\mu + \\sigma] = [85, 115]$: aproximadamente el $68\\,\\%$ de la población tiene un CI entre $85$ y $115$.",
    },
    {
      id: "check-lluvia",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Es un año por encima de la media, entre $\\mu + \\sigma$ y $\\mu + 2\\sigma$." }],
      title: "Años secos y lluviosos",
      question: "Las precipitaciones anuales siguen una $N(450, 80)$ mm. ¿Cómo se considera un año con $570$ mm?",
      choices: [
        { id: "a", label: "Lluvioso: está entre $\\mu + \\sigma = 530$ y $\\mu + 2\\sigma = 610$" },
        { id: "b", label: "Normal", incorrectFeedback: "Lo normal es estar entre $\\mu \\pm \\sigma$, o sea entre $370$ y $530$ mm." },
        { id: "c", label: "Muy lluvioso", incorrectFeedback: "Muy lluvioso es entre $\\mu + 2\\sigma = 610$ y $\\mu + 3\\sigma = 690$ mm." },
        { id: "d", label: "Seco", incorrectFeedback: "Seco es por debajo de la media menos una desviación típica." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$530 < 570 < 610$, es decir, entre $\\mu + \\sigma$ y $\\mu + 2\\sigma$: un año lluvioso.",
    },
  ],
};
