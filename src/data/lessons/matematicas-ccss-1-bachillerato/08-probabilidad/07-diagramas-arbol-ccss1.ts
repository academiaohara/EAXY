import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_8_SUBTITLE } from "@/data/lessons/shared";

export const diagramasArbolCcss1Lesson: InteractiveLesson = {
  slug: "diagramas-arbol-ccss1",
  title: "7. Diagramas de árbol",
  subtitle: TEMA_CCSS1_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reglas",
      type: "slide",
      help: [{ label: "Comprobación", message: "Las probabilidades de las ramas que salen de un mismo nodo suman $1$, y las de todos los resultados finales también." }],
      title: "Cómo se usa un árbol",
      blocks: [
        { kind: "steps", items: [
          "Cada **rama** lleva la probabilidad de ese resultado (condicionada a lo anterior).",
          "La probabilidad de un **camino** completo se obtiene **multiplicando** sus ramas.",
          "La probabilidad de un suceso con varios caminos se obtiene **sumando** los caminos.",
        ] },
        { kind: "example", title: "Dos incendios, P(intencionado) = 0,6", lines: [
          { math: "P(I\\cap I) = 0{,}36\\quad P(I\\cap \\bar I) = 0{,}24\\quad P(\\bar I\\cap I) = 0{,}24\\quad P(\\bar I\\cap \\bar I) = 0{,}16" },
          { math: "P(\\text{al menos uno}) = 1 - P(\\bar I\\cap\\bar I) = 1 - 0{,}16 = 0{,}84" },
        ] },
      ],
      visual: { kind: "tool", tool: "independientes-explorador", initial: [60, 2], hint: "Con p = 60 % y n = 2: P(alguna) = 1 − 0,4² = 0,84. Sube n para ver cómo crece." },
    },
    {
      id: "check-tres",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$P(\\text{ninguno intencionado}) = 0{,}4^3$." }],
      title: "Tres incendios",
      question: "Con $P(\\text{intencionado}) = 0{,}6$, ¿cuál es la probabilidad de que, entre **tres** incendios, al menos uno haya sido intencionado? (decimal)",
      correctAnswers: ["0,936", "0.936"],
      explanation: "$1 - 0{,}4^3 = 1 - 0{,}064 = 0{,}936$.",
    },
    {
      id: "check-dispositivos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Falla cada uno con probabilidad $1 - P$: $0{,}04$, $0{,}02$ y $0{,}01$. Son independientes." }],
      title: "Tres dispositivos de seguridad",
      question: "Una aeronave tiene tres dispositivos A, B y C que funcionan con probabilidades $0{,}96$, $0{,}98$ y $0{,}99$. Si falla uno entra el siguiente. ¿Cuál es la probabilidad de que fallen los **tres**? (decimal)",
      correctAnswers: ["0,000008", "0.000008", "8e-6", "0,000008"],
      explanation: "$0{,}04\\cdot 0{,}02\\cdot 0{,}01 = 0{,}000008$. La probabilidad de que todo vaya bien es $1 - 0{,}000008 = 0{,}999992$.",
    },
    {
      id: "check-munecas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "«Solo una» se puede dar de dos maneras: la primera o la segunda. Se suman." }],
      title: "Muñecas defectuosas",
      question: "Una fábrica desecha el $0{,}3\\,\\%$ de las muñecas. Se cogen dos al azar. ¿Cuál es la probabilidad de desechar **exactamente una**? (decimal con 6 cifras)",
      correctAnswers: ["0,005982", "0.005982"],
      explanation: "$2\\cdot 0{,}003\\cdot 0{,}997 = 0{,}005982$ (dos caminos: la primera sí y la segunda no, o al revés).",
    },
    {
      id: "moneda",
      type: "slide",
      help: [{ label: "Árbol", message: "La experiencia termina en cuanto salen dos lados iguales seguidos. Cada vez hay una sola rama que continúa: la que alterna." }],
      title: "Lanzar hasta repetir lado",
      blocks: [
        { kind: "text", text: "Se lanza una moneda hasta que sale **dos veces seguidas el mismo lado**. Para terminar en el lanzamiento $n$, los $n - 1$ primeros deben alternar y el último repetir." },
        { kind: "example", title: "Probabilidades", lines: [
          { math: "P(\\text{termina en el 2.º}) = \\dfrac{1}{2}\\qquad P(\\text{3.º}) = \\dfrac{1}{4}\\qquad P(\\text{4.º}) = \\dfrac{1}{8}" },
          { math: "P(\\text{a lo sumo en el 4.º}) = \\dfrac{1}{2} + \\dfrac{1}{4} + \\dfrac{1}{8} = \\dfrac{7}{8}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-moneda",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Para terminar en el 3.º: el 2.º distinto del 1.º ($\\frac{1}{2}$) y el 3.º igual al 2.º ($\\frac{1}{2}$)." }],
      title: "Terminar en el tercer lanzamiento",
      question: "¿Cuál es la probabilidad de que la experiencia termine exactamente en el **tercer** lanzamiento? (fracción)",
      correctAnswers: ["1/4", "0,25", "0.25"],
      explanation: "Hay que alternar en el 2.º ($\\frac{1}{2}$) y repetir en el 3.º ($\\frac{1}{2}$): $\\dfrac{1}{2}\\cdot\\dfrac{1}{2} = \\dfrac{1}{4}$.",
    },
  ],
};
