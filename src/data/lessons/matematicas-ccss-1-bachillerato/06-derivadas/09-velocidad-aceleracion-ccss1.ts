import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_6_SUBTITLE } from "@/data/lessons/shared";

export const velocidadAceleracionCcss1Lesson: InteractiveLesson = {
  slug: "velocidad-aceleracion-ccss1",
  title: "9. Velocidad y aceleración",
  subtitle: TEMA_CCSS1_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "derivadas-sucesivas",
      type: "slide",
      help: [{ label: "Unidades", message: "Si el espacio está en metros y el tiempo en segundos, la velocidad está en m/s y la aceleración en m/s²." }],
      title: "Posición, velocidad y aceleración",
      blocks: [
        { kind: "rule", title: "Derivadas sucesivas", formula: "v(t) = e'(t)\\qquad a(t) = v'(t) = e''(t)" },
        { kind: "example", title: "e(t) = 1,2t + 0,08t²", lines: [
          { math: "v(t) = e'(t) = 1{,}2 + 0{,}16\\,t\\ \\Rightarrow\\ v(1) = 1{,}36\\ \\text{m/s}" },
          { math: "a(t) = v'(t) = 0{,}16\\ \\text{m/s}^2\\ \\text{(constante)}" },
        ] },
      ],
      visual: { kind: "tool", tool: "velocidad-aceleracion-explorador", initial: [0, 10], hint: "La curva azul es la posición y la naranja, su derivada (la velocidad). Cuando e crece más deprisa, v es mayor." },
    },
    {
      id: "check-v",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$e(t) = 20t + 0{,}5t^2 \\Rightarrow v(t) = 20 + t$." }],
      title: "Velocidad de un coche",
      question: "Un coche recorre $e(t) = 20t + 0{,}5t^2$ km en $t$ horas. ¿Cuál es su velocidad (km/h) en $t = 4$? (solo el número)",
      correctAnswers: ["24"],
      explanation: "$v(t) = e'(t) = 20 + t$, así que $v(4) = 24$ km/h.",
    },
    {
      id: "check-limite",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Resuelve $20 + t = 120$." }],
      title: "¿Cuándo sobrepasa 120 km/h?",
      question: "Con ese mismo coche, ¿en qué instante $t$ (horas) alcanza los $120$ km/h? (solo el número)",
      correctAnswers: ["100"],
      explanation: "$20 + t = 120 \\Rightarrow t = 100$ h. Su aceleración es $a = v' = 1$ km/h².",
    },
    {
      id: "check-lanzamiento",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$h(t) = 40t - 5t^2$ y $h'(t) = 40 - 10t$, que se anula en $t = 4$." }],
      title: "Altura máxima",
      question: "Un objeto lanzado hacia arriba alcanza $h(t) = 40t - 5t^2$ metros a los $t$ segundos. ¿Cuál es la altura máxima? (solo el número)",
      correctAnswers: ["80"],
      explanation: "$v(t) = 40 - 10t = 0 \\Rightarrow t = 4$ s, y $h(4) = 160 - 80 = 80$ m. En ese instante el objeto se detiene un momento.",
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Con $v(t) = 40 - 10t$, evalúa en $t = 6$." }],
      title: "El signo de la velocidad",
      question: "En el lanzamiento anterior, a los $6$ s, $v(6) = -20$ m/s. Eso significa que el objeto…",
      choices: [
        { id: "a", label: "está bajando: $h$ decrece" },
        { id: "b", label: "sigue subiendo, más despacio", incorrectFeedback: "Subiría con $v > 0$. Con $v < 0$ la altura disminuye." },
        { id: "c", label: "está parado", incorrectFeedback: "Estaría parado con $v = 0$ (a los $4$ s)." },
        { id: "d", label: "ha tocado el suelo", incorrectFeedback: "$h(6) = 240 - 180 = 60$ m: todavía está en el aire." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El signo de $v = h'$ dice si $h$ crece o decrece: $v(6) < 0$ implica que el objeto desciende. La aceleración, $a = -10$ m/s², es la gravedad aproximada.",
    },
  ],
};
