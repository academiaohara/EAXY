import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const coordenadasGeograficas3esoLesson: InteractiveLesson = {
  slug: "coordenadas-geograficas-3eso",
  title: "9. Coordenadas geográficas y husos horarios",
  subtitle: TEMA_3ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "esfera-terrestre",
      type: "slide",
      help: [
        {
          label: "Círculo máximo",
          message: "Un círculo máximo es el que resulta de cortar la esfera con un plano que pasa por su centro: los meridianos y el ecuador lo son.",
        },
        {
          label: "Paralelos",
          message: "Los paralelos son circunferencias cada vez más pequeñas según se acercan a los polos; el ecuador es el mayor.",
        },
      ],
      title: "Polos, meridianos, paralelos y ecuador",
      blocks: [
        {
          kind: "definition",
          text: "La Tierra gira alrededor de un **eje** que la corta en los **polos**. Los planos que contienen el eje cortan la superficie en **meridianos**; los planos perpendiculares al eje, en **paralelos**.",
        },
        {
          kind: "text",
          text: "El **ecuador** es el paralelo mayor: una circunferencia máxima que divide la Tierra en dos **hemisferios**, norte y sur.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "coordenadas",
      type: "slide",
      help: [
        {
          label: "Dos ángulos",
          message: "Un punto de la esfera se localiza con dos ángulos: uno respecto al ecuador (latitud) y otro respecto al meridiano de Greenwich (longitud).",
        },
        {
          label: "Antípodas",
          message: "Los antípodas se hallan cambiando N por S, y calculando $180^\\circ$ menos la longitud, cambiando E por O.",
        },
      ],
      title: "Latitud y longitud",
      blocks: [
        {
          kind: "compare",
          left: { title: "Latitud", text: "Ángulo del arco de **meridiano** entre el punto y el ecuador. Norte (N) o sur (S), de $0^\\circ$ a $90^\\circ$.", tone: "ok" },
          right: { title: "Longitud", text: "Ángulo entre el meridiano del lugar y el de **Greenwich**. Este (E) u oeste (O), de $0^\\circ$ a $180^\\circ$.", tone: "info" },
        },
        {
          kind: "example",
          title: "Auckland y Jerez de la Frontera",
          lines: [
            { math: "\\text{Auckland: } 174^\\circ\\,\\text{E},\\ 37^\\circ\\,\\text{S}" },
            { math: "\\text{Jerez: } 6^\\circ\\,\\text{O},\\ 37^\\circ\\,\\text{N}" },
            { math: "\\text{Son antípodas: } 174^\\circ + 6^\\circ = 180^\\circ" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "husos",
      type: "slide",
      help: [
        {
          label: "Regla",
          message: "Al este es más tarde y al oeste más pronto: suma una hora por cada huso hacia el este y réstala hacia el oeste.",
        },
        {
          label: "Contar husos",
          message: "Divide la longitud entre $15$ y redondea: $29 : 15 \\approx 2$ husos; $100 : 15 \\approx 7$ husos.",
        },
      ],
      title: "Husos horarios",
      blocks: [
        {
          kind: "text",
          text: "La Tierra da una vuelta ($360^\\circ$) en $24$ h: cada **huso horario** mide $360^\\circ : 24 = 15^\\circ$. El huso $0$ está centrado en Greenwich.",
        },
        {
          kind: "example",
          title: "En Bilbao son las 12 h",
          lines: [
            { math: "\\text{Estambul } (29^\\circ\\,\\text{E}):\\ 2 \\text{ husos al este} \\Rightarrow 12 + 2 = 14\\ \\text{h}" },
            { math: "\\text{Monterrey } (100^\\circ\\,\\text{O}):\\ 7 \\text{ husos al oeste} \\Rightarrow 12 - 7 = 5\\ \\text{h}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "husos-horarios" },
    },
    {
      id: "check-latitud",
      type: "predict",
      help: [
        {
          label: "Arco de meridiano",
          message: "La latitud se mide sobre el meridiano hasta el ecuador; la longitud, respecto a Greenwich.",
        },
      ],
      title: "Latitud o longitud",
      question: "El ángulo del arco de meridiano que va de un punto al ecuador, ¿qué coordenada es?",
      mode: "choice",
      choices: [
        { id: "lat", label: "La latitud" },
        { id: "lon", label: "La longitud", incorrectFeedback: "La longitud se mide respecto al meridiano de Greenwich, no respecto al ecuador." },
        { id: "alt", label: "La altitud", incorrectFeedback: "La altitud es la altura sobre el nivel del mar, no una coordenada angular." },
      ],
      correctChoiceId: "lat",
      shuffleChoices: true,
      explanation: "La latitud se mide sobre el meridiano desde el ecuador (N o S).",
    },
    {
      id: "check-huso",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Husos",
          message: "$74^\\circ : 15^\\circ \\approx 5$ husos al oeste de Greenwich.",
        },
      ],
      title: "Hora en Nueva York",
      question: "En Bilbao son las $12$ h. Nueva York está en $74^\\circ$ O, unos $5$ husos al oeste. ¿Qué hora es allí? (solo el número, de 0 a 24)",
      correctAnswers: ["7"],
      explanation: "$12 - 5 = 7$ h.",
    },
    {
      id: "check-tokio",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Hacia el este",
          message: "$140^\\circ : 15^\\circ \\approx 9$ husos al este: son $9$ horas más.",
        },
      ],
      title: "Hora en Tokio",
      question: "En Bilbao son las $12$ h. Tokio está en $140^\\circ$ E, unos $9$ husos al este. ¿Qué hora es allí? (solo el número, de 0 a 24)",
      correctAnswers: ["21"],
      explanation: "$12 + 9 = 21$ h.",
    },
    {
      id: "check-radio",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Longitud de la circunferencia",
          message: "El meridiano es una circunferencia máxima: $L = 2\\pi R$, luego $R = \\frac{L}{2\\pi}$.",
        },
      ],
      title: "Radio de la Tierra",
      question: "Un meridiano terrestre mide $40\\,000$ km. ¿Cuál es el radio de la Tierra en km, con $\\pi \\approx 3{,}14$ y redondeado a las unidades? (solo el número)",
      correctAnswers: ["6369"],
      explanation: "$R = \\frac{40\\,000}{2 \\cdot 3{,}14} \\approx 6\\,369$ km.",
    },
  ],
};
