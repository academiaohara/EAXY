import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigCalculadora4esobLesson: InteractiveLesson = {
  slug: "trig-calculadora-4esob",
  title: "6. La calculadora en trigonometría",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "modo",
      type: "slide",
      help: [
        { label: "Tres modos", message: "DEG (grados sexagesimales), GRA (grados centesimales) y RAD (radianes). Este curso usa **DEG**; los radianes se estudian el curso próximo." },
        { label: "Cómo cambiar", message: "En la mayoría de calculadoras científicas es la tecla de configuración (SHIFT + MODE o SETUP) y se elige «Degree». Mira el indicador **D** o **DEG** en la pantalla." },
      ],
      title: "Antes de empezar: modo DEG",
      blocks: [
        { kind: "facts", items: [{ tex: "\\text{DEG}", label: "grados sexagesimales: el que usamos" }, { tex: "\\text{GRA}", label: "grados centesimales: un recto = 100" }, { tex: "\\text{RAD}", label: "radianes: el curso que viene" }] },
        { kind: "warning", text: "Con el modo equivocado, $\\operatorname{sen} 30$ no da $0{,}5$. Es el error más típico: **comprueba el modo** antes de calcular." },
      ],
    },
    {
      id: "check-modo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Un ángulo conocido", message: "Prueba con un ángulo cuyo seno conoces de memoria: $\\operatorname{sen} 30° = 0{,}5$." }],
      title: "¿Está bien configurada?",
      question: "Pulsas $\\operatorname{sen}\\ 30$ y la calculadora muestra $-0{,}988$. ¿Qué ha pasado?",
      choices: [
        { id: "a", label: "Está en modo radianes (RAD), no en grados" },
        { id: "b", label: "El seno de 30° vale −0,988", incorrectFeedback: "El seno de un ángulo agudo es siempre positivo: $\\operatorname{sen} 30° = 0{,}5$." },
        { id: "c", label: "Se ha roto la calculadora", incorrectFeedback: "Funciona perfectamente: calculó $\\operatorname{sen}$ de 30 **radianes**." },
        { id: "d", label: "Hay que usar la tecla de tangente", incorrectFeedback: "El problema no es la tecla, sino la unidad de ángulo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con $30$ **radianes**, $\\operatorname{sen} 30 \\approx -0{,}988$. En modo DEG daría $0{,}5$.",
    },
    {
      id: "grados-minutos",
      type: "slide",
      help: [
        { label: "Tecla °′″", message: "Para escribir $38°\\,25'\\,36''$ se pulsa 38, la tecla °′″, 25, °′″, 36, °′″. Así la calculadora entiende grados, minutos y segundos." },
        { label: "Forma decimal", message: "$38°\\,25'\\,36'' = 38 + \\frac{25}{60} + \\frac{36}{3600} = 38{,}4267°$." },
      ],
      title: "Ángulos en grados, minutos y segundos",
      blocks: [
        { kind: "text", text: "Un ángulo se puede dar como $47°\\,25'$ (grados y minutos). La calculadora lo acepta con la tecla **°′″**; puede mostrarlo también en forma decimal." },
        { kind: "example", lines: [{ math: "\\operatorname{sen}(47°\\,25') = 0{,}736" }, { math: "1° = 60',\\quad 1' = 60''" }] },
      ],
      visual: { kind: "tool", tool: "trig-resolver-explorador", params: { n: 0, a: 47, b: 10 }, hint: "Cambia el ángulo y observa que los resultados se muestran en grados, minutos y segundos." },
    },
    {
      id: "check-sen",
      type: "predict",
      mode: "numeric",
      help: [{ label: "En DEG", message: "$47°\\,25' = 47{,}4167°$. Usa la tecla sen con el ángulo." }],
      title: "Seno con la calculadora",
      question: "Con la calculadora en modo DEG, ¿cuánto vale $\\operatorname{sen}(47°\\,25')$? (redondea a las milésimas, con coma)",
      correctAnswers: ["0,736", "0.736"],
      explanation: "$\\operatorname{sen}(47°\\,25') \\approx 0{,}7363 \\to 0{,}736$.",
    },
    {
      id: "inversas",
      type: "slide",
      help: [
        { label: "sen⁻¹", message: "Es la función inversa: dado el valor de la razón, devuelve el ángulo. Se obtiene con SHIFT + sen, SHIFT + cos o SHIFT + tan." },
        { label: "No es 1/sen", message: "$\\operatorname{sen}^{-1}$ no es $1/\\operatorname{sen}$: es la función que «deshace» el seno." },
      ],
      title: "Al revés: de la razón al ángulo",
      blocks: [
        { kind: "text", text: "Si conoces el valor de una razón y quieres el **ángulo**, usa las funciones inversas: SHIFT + sen, SHIFT + cos, SHIFT + tan." },
        { kind: "example", lines: [{ math: "\\operatorname{sen}\\alpha = 0{,}5 \\Rightarrow \\alpha = 30°" }, { math: "\\operatorname{tg}\\alpha = 3 \\Rightarrow \\alpha = 71°\\,33'\\,54''" }] },
      ],
    },
    {
      id: "check-inversa",
      type: "predict",
      mode: "numeric",
      help: [{ label: "SHIFT + cos", message: "Introduce $0{,}75$ y pulsa la inversa del coseno. Verás $41{,}41\\ldots°$, es decir, $41°\\,24'\\,35''$." }],
      title: "Hallar un ángulo",
      question: "Si $\\cos\\alpha = 0{,}75$, ¿cuántos grados **enteros** tiene $\\alpha$? (solo la parte entera de los grados)",
      correctAnswers: ["41"],
      explanation: "$\\alpha = \\cos^{-1} 0{,}75 \\approx 41{,}41° = 41°\\,24'\\,35''$. La parte entera son $41$ grados.",
    },
    {
      id: "check-tg",
      type: "predict",
      mode: "numeric",
      help: [{ label: "De la razón al ángulo", message: "Calcula $\\operatorname{tg}\\alpha = \\frac{56}{100}\\ldots$ Aquí es más directo: $\\operatorname{sen}\\alpha = 0{,}5$ es un valor que conoces." }],
      title: "Ángulo notable",
      question: "Si $\\operatorname{sen}\\alpha = 0{,}5$ y $\\alpha$ es agudo, ¿cuántos grados mide $\\alpha$? (solo el número)",
      correctAnswers: ["30"],
      explanation: "$\\operatorname{sen} 30° = \\tfrac12 = 0{,}5$, así que $\\alpha = 30°$ (también lo da $\\operatorname{sen}^{-1}0{,}5$).",
    },
  ],
};
