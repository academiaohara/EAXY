import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const diagramaIsomorfoCuNiLesson: InteractiveLesson = {
  slug: "diagrama-isomorfo-cu-ni",
  title: "5. Aleaciones isomorfas: Cu-Ni",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "por-que-isomorfo",
      type: "slide",
      help: [
        {
          label: "¿Qué quiere decir isomorfo?",
          message: "Que en estado sólido solo existe una fase: el cobre y el níquel se disuelven por completo y forman una única solución sólida α.",
        },
      ],
      title: "Cu-Ni: el sistema isomorfo clásico",
      blocks: [
        {
          kind: "text",
          text: "El cobre y el níquel son **totalmente solubles** en estado líquido y sólido: tienen la misma estructura cristalina (FCC), radios atómicos y electronegatividades casi idénticos y valencias parecidas.",
        },
        {
          kind: "facts",
          items: [
            { tex: "T_f(\\text{Cu}) = 1\\,085\\ °\\text{C}" },
            { tex: "T_f(\\text{Ni}) = 1\\,455\\ °\\text{C}" },
          ],
        },
        {
          kind: "text",
          text: "El diagrama tiene tres campos: líquido ($L$), sólido ($\\alpha$) y la zona bifásica $\\alpha + L$ entre las líneas de «liquidus» y «solidus».",
        },
      ],
      visual: { kind: "tool", tool: "diagrama-binario", params: { a: 35, b: 1250 } },
    },
    {
      id: "check-fases",
      type: "predict",
      help: [{ label: "Usa la herramienta", message: "Pulsa «Punto A» y mira en qué zona cae." }],
      title: "Punto A",
      question: "El punto A es una aleación con el $60\\,\\%$ de Ni a $1\\,100$ °C. ¿Qué fases hay?",
      mode: "choice",
      choices: [
        { id: "a", label: "Una sola: la fase sólida α" },
        { id: "al", label: "Dos: α y líquido", incorrectFeedback: "A 1 100 °C el punto está por debajo de la línea de solidus." },
        { id: "l", label: "Una sola: líquido", incorrectFeedback: "1 100 °C está muy por debajo del liquidus de esa composición." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En una región monofásica la composición de la fase coincide con la de la aleación: $60\\,\\%$ de Ni y $40\\,\\%$ de Cu.",
    },
    {
      id: "recta-reparto",
      type: "slide",
      help: [
        {
          label: "¿Y si el punto está en una zona monofásica?",
          message: "Entonces no hace falta recta de reparto: la fase es el 100 % y su composición es la de la aleación.",
        },
      ],
      title: "Composición y cantidad de cada fase",
      blocks: [
        {
          kind: "steps",
          title: "Dentro de la zona α + L",
          items: [
            "Traza la **recta de reparto** (isoterma) a la temperatura de la aleación.",
            "Marca sus cortes con las líneas de fase y baja perpendiculares al eje: leerás $C_L$ y $C_\\alpha$.",
            "Aplica la **regla de la palanca** con $C$, $C_L$ y $C_\\alpha$.",
          ],
        },
        {
          kind: "example",
          title: "Punto B: 35 % Ni a 1 250 °C",
          lines: [
            { math: "C_L = 32\\,\\%,\\quad C_\\alpha = 43\\,\\%" },
            { math: "W_L = \\dfrac{C_\\alpha - C}{C_\\alpha - C_L} = \\dfrac{43 - 35}{43 - 32} = 0{,}73" },
            { math: "W_\\alpha = \\dfrac{C - C_L}{C_\\alpha - C_L} = \\dfrac{35 - 32}{43 - 32} = 0{,}27" },
          ],
        },
        {
          kind: "warning",
          text: "No confundas la **composición** de cada fase (se lee en los extremos de la recta de reparto) con la **cantidad** de cada una (regla de la palanca).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-liquido",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Los datos", message: "$C = 35$, $C_L = 32$ y $C_\\alpha = 43$." }],
      title: "Fracción de líquido",
      question: "En el punto B ($35\\,\\%$ Ni, $1\\,250$ °C), con $C_L = 32\\,\\%$ y $C_\\alpha = 43\\,\\%$, ¿cuál es la fracción de líquido $W_L$? (en tanto por uno, con dos decimales)",
      correctAnswers: ["0,73", "0.73"],
      explanation: "$W_L = \\dfrac{43 - 35}{43 - 32} = \\dfrac{8}{11} = 0{,}73$.",
    },
    {
      id: "hume-rothery",
      type: "slide",
      help: [
        {
          label: "¿Y si no se cumple alguna?",
          message: "La solubilidad total deja de ser posible: aparecen fases distintas o compuestos, como en los diagramas eutécticos que veremos después.",
        },
      ],
      title: "Cuándo dos elementos son totalmente solubles",
      blocks: [
        {
          kind: "steps",
          title: "Para que se disuelvan por completo",
          items: [
            "La **estructura cristalina** de los dos elementos debe ser la misma.",
            "El **tamaño de los átomos** debe ser semejante.",
            "No deben estar muy distantes en la tabla de **electronegatividades** (si lo estuvieran, formarían compuestos).",
            "Deben tener la misma **valencia**.",
          ],
        },
        {
          kind: "text",
          text: "Ejemplo del libro: Cu y Ni son ambos FCC y sus radios son $0{,}128$ y $0{,}125$ nm.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-pareja",
      type: "predict",
      help: [{ label: "Compara", message: "Mira la estructura cristalina y el radio atómico de cada pareja." }],
      title: "¿Qué pareja puede ser isomorfa?",
      question: "Datos: Cu (FCC, $0{,}128$ nm), Ni (FCC, $0{,}125$ nm), W (BCC, $0{,}137$ nm), Na (BCC, $0{,}185$ nm), K (BCC, $0{,}231$ nm). ¿Qué pareja puede formar una aleación isomorfa?",
      mode: "choice",
      choices: [
        { id: "cuni", label: "Cu y Ni: misma red FCC y tamaños casi iguales" },
        { id: "cuw", label: "Cu y W", incorrectFeedback: "Una es FCC y la otra BCC: no comparten estructura." },
        { id: "nak", label: "Na y K", incorrectFeedback: "Tienen la misma red, pero el radio del K es mucho mayor que el del Na." },
      ],
      correctChoiceId: "cuni",
      shuffleChoices: true,
      explanation: "Cu–Ni cumple las reglas: misma estructura y radios casi idénticos.",
    },
    {
      id: "check-fusion-50",
      type: "predict",
      help: [{ label: "Herramienta", message: "Pon el control de composición en $50\\,\\%$ y recorre la temperatura: observa cuándo aparece el líquido y cuándo desaparece lo sólido." }],
      title: "Intervalo de fusión",
      question: "Una aleación con el $50\\,\\%$ de Ni (y $50\\,\\%$ de Cu) se calienta. ¿Entre qué temperaturas funde?",
      mode: "choice",
      choices: [
        { id: "rango", label: "Empieza a fundir a unos 1 280 °C y termina a unos 1 320 °C" },
        { id: "cu", label: "Funde de golpe a 1 085 °C, como el cobre", incorrectFeedback: "Una aleación isomorfa no funde a una única temperatura ni a la de uno de sus componentes." },
        { id: "ni", label: "Funde de golpe a 1 455 °C, como el níquel", incorrectFeedback: "Esa es la temperatura de fusión del Ni puro, no la de la aleación." },
      ],
      correctChoiceId: "rango",
      shuffleChoices: true,
      explanation: "Entre el «solidus» y el «liquidus» coexisten sólido y líquido; la proporción de líquido aumenta con la temperatura hasta fundir todo.",
    },
  ],
};
