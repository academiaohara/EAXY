import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const calculosPorcentajes4esoLesson: InteractiveLesson = {
  slug: "calculos-porcentajes-4eso",
  title: "6. Cálculos con porcentajes",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "de-cantidad",
      type: "slide",
      help: [
        {
          label: "A decimal",
          message: "El $35\\,\\%$ es $\\frac{35}{100} = 0{,}35$. Calcular el $35\\,\\%$ de una cantidad es **multiplicar** por $0{,}35$.",
        },
        {
          label: "Cálculo mental",
          message: "$10\\,\\% \\to$ dividir entre $10$; $50\\,\\% \\to$ la mitad; $25\\,\\% \\to$ la cuarta parte; $1\\,\\% \\to$ dividir entre $100$.",
        },
      ],
      title: "El tanto por ciento de una cantidad",
      blocks: [
        {
          kind: "rule",
          title: "Porcentaje de una cantidad",
          formula: "p\\,\\%\\ \\text{de}\\ C = C \\cdot \\dfrac{p}{100}",
        },
        {
          kind: "example",
          lines: [
            { math: "35\\,\\%\\ \\text{de}\\ 1\\,800 = 1\\,800 \\cdot 0{,}35 = 630" },
            { math: "140\\,\\%\\ \\text{de}\\ 900 = 900 \\cdot 1{,}40 = 1\\,260", note: "puede pasar del 100 %" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "porcentaje-mental", params: { a: 500 } },
    },
    {
      id: "visual",
      type: "slide",
      help: [
        {
          label: "100 casillas",
          message: "Un porcentaje es «tantas de cada cien». Con un total de $300$, cada casilla de $100$ representa $3$ unidades.",
        },
      ],
      title: "Visualizar el porcentaje",
      blocks: [
        {
          kind: "text",
          text: "Mueve el porcentaje y observa cuántas casillas de las $100$ se pintan. Después piensa cuánto es eso en cantidad real.",
        },
      ],
      visual: { kind: "tool", tool: "porcentaje-cuadricula", params: { a: 35 }, hint: "Fija 50 % y 25 %: ¿qué fracción del total son?" },
    },
    {
      id: "check-calculo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "A decimal",
          message: "$86\\,\\% \\to 0{,}86$. Multiplica por $60$.",
        },
      ],
      title: "Calcular un porcentaje",
      question: "Calcula el $86\\,\\%$ de $60$. (escribe el número con coma)",
      correctAnswers: ["51,6", "51.6"],
      explanation: "$60 \\cdot 0{,}86 = 51{,}6$.",
    },
    {
      id: "proporcion",
      type: "slide",
      help: [
        {
          label: "Una fracción por cien",
          message: "El porcentaje que representa una parte $P$ de un total $C$ es la fracción $\\frac{P}{C}$ expresada **sobre cien**: $\\frac{P}{C} \\cdot 100$.",
        },
      ],
      title: "¿Qué porcentaje es una parte del total?",
      blocks: [
        {
          kind: "rule",
          formula: "\\text{porcentaje} = \\dfrac{P}{C} \\cdot 100",
        },
        {
          kind: "example",
          lines: [
            { math: "630\\ \\text{de}\\ 1\\,800 \\to \\dfrac{630}{1\\,800} \\cdot 100 = 35\\,\\%" },
            { math: "\\text{Si ha pagado el } 65\\,\\% \\Rightarrow \\text{le queda el } 100 - 65 = 35\\,\\%" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "cuadricula-porcentaje", params: { a: 35, b: 1800 } },
    },
    {
      id: "check-reunion",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Parte entre total",
          message: "$\\frac{58}{145} = 0{,}4$, que es el $40\\,\\%$.",
        },
      ],
      title: "Asistencia a una reunión",
      question: "A una reunión de vecinos asistieron $58$ propietarios de un total de $145$. ¿Qué porcentaje asistió? (solo el número)",
      correctAnswers: ["40"],
      explanation: "$\\frac{58}{145} \\cdot 100 = 40\\,\\%$.",
    },
    {
      id: "check-television",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Parte entre total",
          message: "Elena gastó $750$ de $5\\,000$: $\\frac{750}{5\\,000} = 0{,}15$.",
        },
      ],
      title: "Ahorros gastados",
      question: "Elena tenía $5\\,000$ € y ha comprado un televisor de $750$ €. ¿Qué porcentaje de sus ahorros ha gastado? (solo el número)",
      correctAnswers: ["15"],
      explanation: "$\\frac{750}{5\\,000} \\cdot 100 = 15\\,\\%$.",
    },
    {
      id: "complementario",
      type: "slide",
      help: [
        {
          label: "El resto",
          message: "Si se conoce el porcentaje que ya se ha pagado, o el que se ha llenado, el que falta es **el que le falta hasta 100**.",
        },
      ],
      title: "Porcentajes complementarios",
      blocks: [
        {
          kind: "text",
          text: "Si el mayor de dos hermanos paga el $60\\,\\%$ de un balón de $42$ €, el pequeño paga el resto: $100 - 60 = 40\\,\\%$, es decir $0{,}40 \\cdot 42 = 16{,}80$ €.",
        },
        {
          kind: "text",
          text: "En una sala de $840$ localidades con el $65\\,\\%$ ocupadas, están vacías el $35\\,\\%$: $0{,}35 \\cdot 840 = 294$.",
        },
      ],
      visual: { kind: "tool", tool: "porcentaje-cuadricula", params: { a: 65 }, hint: "Pinta el 65 %. Las casillas sin pintar son el porcentaje complementario." },
    },
    {
      id: "check-bici",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Lo que queda",
          message: "Padre $50\\,\\%$ y abuela $30\\,\\%$ cubren el $80\\,\\%$. Alejandro paga el $20\\,\\%$ de $360$.",
        },
      ],
      title: "Una bicicleta",
      question: "Una bicicleta cuesta $360$ €. Su padre paga el $50\\,\\%$ y su abuela el $30\\,\\%$. ¿Cuánto paga Alejandro? (solo el número, en euros)",
      correctAnswers: ["72"],
      explanation: "Alejandro paga $100 - 50 - 30 = 20\\,\\%$ de $360$: $0{,}20 \\cdot 360 = 72$ €.",
    },
    {
      id: "total",
      type: "slide",
      help: [
        {
          label: "Hacia atrás",
          message: "Si el $88\\,\\%$ del total son $22$, entonces $0{,}88 \\cdot \\text{total} = 22$, y el total es $22 : 0{,}88$.",
        },
      ],
      title: "Al revés: del porcentaje al total",
      blocks: [
        {
          kind: "text",
          text: "Si se conoce la **parte** y el porcentaje que representa, se **divide** la parte entre el porcentaje en forma decimal para hallar el total.",
        },
        {
          kind: "example",
          title: "Aprobados",
          lines: [
            { math: "88\\,\\%\\ \\text{del total} = 22 \\ \\Rightarrow\\ 0{,}88 \\cdot T = 22" },
            { math: "T = 22 : 0{,}88 = 25\\ \\text{alumnos}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-teatro",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Divide",
          message: "$0{,}77 \\cdot T = 693$ → $T = 693 : 0{,}77$.",
        },
      ],
      title: "Aforo de un teatro",
      question: "Se han ocupado $693$ butacas, el $77\\,\\%$ del aforo. ¿Cuál es el aforo? (solo el número)",
      correctAnswers: ["900"],
      explanation: "$T = 693 : 0{,}77 = 900$ butacas.",
    },
    {
      id: "check-congreso",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Total primero",
          message: "$51$ europeos son el $34\\,\\%$: total $= 51 : 0{,}34 = 150$. Asiáticos: $100 - 34 - 18 - 32 = 16\\,\\%$.",
        },
      ],
      title: "Un congreso",
      question: "En un congreso, el $34\\,\\%$ son europeos ($51$ personas), el $18\\,\\%$ africanos, el $32\\,\\%$ americanos y el resto asiáticos. ¿Cuántos asiáticos hay? (solo el número)",
      correctAnswers: ["24"],
      explanation: "Total: $51 : 0{,}34 = 150$. Asiáticos: $100 - 34 - 18 - 32 = 16\\,\\%$ y $0{,}16 \\cdot 150 = 24$.",
    },
  ],
};
