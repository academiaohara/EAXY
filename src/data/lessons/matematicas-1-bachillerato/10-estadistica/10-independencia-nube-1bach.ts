import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const independenciaNube1bachLesson: InteractiveLesson = {
  slug: "independencia-nube-1bach",
  title: "10. Independencia estadística y nube de puntos",
  subtitle: TEMA_1BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "independencia",
      type: "slide",
      help: [{ label: "Dos definiciones", message: "Equivalen: si todas las condicionadas coinciden con las marginales, entonces $f_{ij} = f_i\\,f_j$ en todas las casillas, y al revés." }],
      title: "Variables independientes",
      blocks: [
        { kind: "rule", title: "Independencia estadística", formula: "f_{ij} = f_{i\\cdot}\\cdot f_{\\cdot j}\\ \\text{para todo } i, j\\qquad (\\iff f_{i(j)} = f_{i\\cdot},\\ f_{(i)j} = f_{\\cdot j})" },
        { kind: "text", text: "Basta que **una** casilla no cumpla la igualdad para que las variables sean **dependientes**." },
      ],
      visual: { kind: "tool", tool: "doble-entrada-explorador", initial: [1, 0, 0], hint: "En la tabla de los tres fármacos, compara la frecuencia conjunta de la casilla con el producto de las marginales. ¿Coinciden?" },
    },
    {
      id: "check-indep",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si $f_{ij} \\neq f_i\\cdot f_j$ en alguna casilla, no hay independencia." }],
      title: "¿Independientes?",
      question: "En la tabla de las impresoras, la frecuencia conjunta de $(x = 3, y = 1)$ es $0{,}32$, pero el producto de las marginales es $0{,}48\\cdot 0{,}52 \\approx 0{,}25$. Las variables $X$ e $Y$ son…",
      choices: [
        { id: "a", label: "dependientes: $f_{ij} \\neq f_i\\cdot f_j$" },
        { id: "b", label: "independientes", incorrectFeedback: "La independencia exige la igualdad en todas las casillas." },
        { id: "c", label: "incompatibles", incorrectFeedback: "Ese término es de sucesos, no de variables." },
        { id: "d", label: "iguales", incorrectFeedback: "No tienen por qué ser la misma variable." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con una sola casilla que no cumpla $f_{ij} = f_{i\\cdot}f_{\\cdot j}$ ya son dependientes.",
    },
    {
      id: "nube",
      type: "slide",
      help: [{ label: "Qué se ve", message: "En una nube de puntos se miran la dirección (sube o baja), la forma (más o menos estrecha) y los datos que se salen del patrón." }],
      title: "Diagrama de dispersión",
      blocks: [
        { kind: "text", text: "El **diagrama de dispersión** representa cada par $(x_i, y_i)$ como un punto del plano. Permite ver si hay **relación lineal directa** (si $x$ crece, $y$ crece), **inversa** o **ninguna**." },
      ],
      visual: { kind: "tool", tool: "nube-regresion-explorador", initial: [6, 80], hint: "Mueve el coeficiente de correlación entre −1 y 1: la nube pasa de una relación inversa fuerte a ninguna y a una directa fuerte." },
    },
    {
      id: "check-tipo",
      type: "classify",
      help: [{ label: "Pista", message: "Directa: al subir X sube Y. Inversa: al subir X baja Y." }],
      title: "¿Qué relación hay?",
      question: "Clasifica cada pareja de variables según el tipo de relación que cabe esperar.",
      groups: [
        { id: "di", label: "Directa", tone: "emerald" },
        { id: "in", label: "Inversa", tone: "amber" },
        { id: "ni", label: "Ninguna", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Estatura y peso de las personas", group: "di" },
        { id: "b", text: "Distancia a la canasta y número de canastas encestadas", group: "in" },
        { id: "c", text: "Lluvia anual y cosecha", group: "di" },
        { id: "d", text: "Renta per cápita y mortalidad infantil de un país", group: "in" },
        { id: "e", text: "Talla de zapato de una persona y su nota de Matemáticas", group: "ni" },
        { id: "f", text: "Horas de estudio y calificación", group: "di" },
      ],
      hint: "La relación estadística es una tendencia, no una fórmula exacta.",
    },
    {
      id: "check-funcional",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En la relación funcional la nube de puntos coincide con la gráfica de una función." }],
      title: "Funcional o estadística",
      question: "El peso de una persona en función de su estatura, ¿es una relación funcional o estadística?",
      choices: [
        { id: "a", label: "Estadística: hay tendencia, pero no una fórmula exacta" },
        { id: "b", label: "Funcional: cada estatura determina el peso", incorrectFeedback: "Personas con la misma estatura pueden pesar distinto: no hay fórmula exacta." },
        { id: "c", label: "No hay relación", incorrectFeedback: "Sí hay relación: en general, más altos pesan más." },
        { id: "d", label: "Es una relación de independencia", incorrectFeedback: "Si fueran independientes, la estatura no daría ninguna pista sobre el peso." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Una relación **funcional** es exacta ($y = f(x)$, como la altura de una piedra lanzada); la **estadística** es aproximada: la nube se concentra alrededor de una curva.",
    },
  ],
};
