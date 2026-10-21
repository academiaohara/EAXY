import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const aleacionesSolucionSolidaLesson: InteractiveLesson = {
  slug: "aleaciones-solucion-solida",
  title: "1. Aleaciones y disoluciones sólidas",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-es-aleacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué se alean los metales?",
          message: "Los metales puros tienen poca utilidad industrial: o tienen impurezas o no cumplen las especificaciones técnicas. Al mezclarlos con otros elementos se mejoran propiedades como la tenacidad, la dureza o la conductividad.",
        },
      ],
      title: "Qué es una aleación",
      blocks: [
        {
          kind: "definition",
          text: "**Aleación** es todo producto que resulta de la unión de dos o más elementos químicos, uno de los cuales tiene carácter metálico.",
        },
        {
          kind: "steps",
          title: "Para que haya aleación se debe cumplir",
          items: [
            "Los elementos son **totalmente miscibles en estado líquido**, de modo que al solidificar resulta un producto homogéneo.",
            "El producto conserva el **carácter metálico**: los enlaces metálicos permanecen.",
          ],
        },
        {
          kind: "text",
          text: "Pueden ser binarias o de más elementos: el acero es Fe + C; un acero rápido lleva hierro, carbono, cobalto, wolframio, cromo, vanadio y molibdeno.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "concentracion",
      type: "slide",
      help: [
        {
          label: "¿Quién es el disolvente?",
          message: "Normalmente el que está en mayor proporción. Si los elementos tienen redes distintas, es el que conserva su red, aunque sea el minoritario.",
        },
      ],
      title: "Disolvente, soluto y concentración",
      blocks: [
        {
          kind: "definition",
          text: "El **disolvente** es el componente en mayor proporción (o el que conserva la red cristalina); el **soluto** es el que se disuelve en él.",
        },
        {
          kind: "rule",
          title: "Concentración en masa",
          formula: "C = \\dfrac{m_s}{m_s + m_D}\\cdot 100",
          text: "$m_s$ es la masa de soluto y $m_D$ la de disolvente. Se expresa en %.",
        },
        {
          kind: "example",
          title: "85 kg de Co en 1 tm de acero",
          lines: [
            { math: "m_s = 85\\ \\text{kg},\\quad m_D = 1\\,000\\ \\text{kg}" },
            { math: "C_{Co} = \\dfrac{85}{85 + 1\\,000}\\cdot 100 = 7{,}8\\,\\%" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "aleacion-concentracion", params: { a: 85, b: 1000 } },
    },
    {
      id: "check-concentracion",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        { label: "Masa total", message: "La masa de aleación es la de soluto más la de disolvente: $m_s + m_D$." },
      ],
      title: "Concentración de titanio",
      question: "Una aleación lleva $220$ kg de Ti, $14{,}5$ kg de Al y $9{,}5$ kg de V. ¿Qué porcentaje en masa es titanio? (redondea a una décima, solo el número)",
      correctAnswers: ["90,2", "90.2"],
      explanation: "La masa total es $220 + 14{,}5 + 9{,}5 = 244$ kg y $\\dfrac{220}{244}\\cdot 100 = 90{,}2\\,\\%$.",
    },
    {
      id: "check-cantidad-cromo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        { label: "Plantea la ecuación", message: "$0{,}85 = \\dfrac{m}{m + 2\\,000}\\cdot 100$. Despeja $m$, que aparece arriba y abajo." },
        { label: "Unidades", message: "$2$ tm de acero son $2\\,000$ kg." },
      ],
      title: "Cuánto cromo añadir",
      question: "Se quiere una aleación de acero con el $0{,}85\\,\\%$ de Cr. ¿Cuántos kg de Cr hay que añadir a $2$ tm de acero sin cromo? (redondea a una décima, solo el número)",
      correctAnswers: ["17,1", "17.1"],
      explanation: "$m = \\dfrac{0{,}85\\cdot 2\\,000}{100 - 0{,}85} = \\dfrac{1\\,700}{99{,}15} = 17{,}1$ kg.",
    },
    {
      id: "sustitucion-insercion",
      type: "slide",
      help: [
        {
          label: "¿Por qué se deforma la red?",
          message: "Si el átomo que entra no tiene el tamaño del hueco que ocupa, empuja o deja que se acerquen sus vecinos. La red se distorsiona y aparecen tensiones internas.",
        },
      ],
      title: "Tipos de disoluciones sólidas",
      blocks: [
        {
          kind: "compare",
          left: { title: "Por sustitución", text: "Disolvente y soluto tienen **estructura cristalina similar**: los átomos del soluto reemplazan a los del disolvente (Cu–Zn).", tone: "info" },
          right: { title: "Por inserción", text: "Los átomos del soluto son **muy pequeños** y se colocan en los intersticios de la red (C en hierro).", tone: "key" },
        },
        {
          kind: "warning",
          title: "Efecto sobre el material",
          text: "Un átomo mayor o menor que el que sustituye deforma la red y crea tensiones. Sube el **límite elástico** y la carga de rotura, pero el material se vuelve **más frágil**.",
        },
      ],
      visual: { kind: "anim", scene: "red-solucion-solida", beatMs: 4000 },
    },
    {
      id: "check-limite-elastico",
      type: "predict",
      help: [
        { label: "Piensa en la red", message: "Un átomo que no encaja deforma la red. ¿Eso la hace más fácil o más difícil de deslizar?" },
      ],
      title: "Átomo de soluto más grande",
      question: "A un metal se le añade un elemento cuyos átomos son **mayores** y sustituyen a los del disolvente. ¿Qué cabe esperar?",
      mode: "choice",
      choices: [
        { id: "sube", label: "Aumenta el límite elástico, pero el material se vuelve más frágil" },
        { id: "baja", label: "Disminuye el límite elástico porque la red se afloja", incorrectFeedback: "La deformación de la red dificulta el movimiento de los planos: el límite elástico sube, no baja." },
        { id: "igual", label: "No cambia: el tamaño del átomo no importa", incorrectFeedback: "El tamaño importa: la diferencia de tamaño crea tensiones internas en la red." },
      ],
      correctChoiceId: "sube",
      shuffleChoices: true,
      explanation: "La red se deforma, aparecen tensiones internas y el efecto es como el de una deformación en frío: más límite elástico y carga de rotura, pero más fragilidad.",
    },
    {
      id: "check-disolvente",
      type: "predict",
      help: [
        { label: "Recuerda", message: "Cuando soluto y disolvente no comparten red, no basta con mirar las proporciones." },
      ],
      title: "Quién es el disolvente",
      question: "En una disolución en la que soluto y disolvente no tienen la misma red cristalina, se considera disolvente al elemento que:",
      mode: "choice",
      choices: [
        { id: "conserva", label: "Conserva su red cristalina en la disolución" },
        { id: "mayor", label: "Está presente en mayor proporción", incorrectFeedback: "Es el criterio inicial, pero cuando las redes son distintas manda la red que se conserva." },
        { id: "pierde", label: "No conserva su red en la disolución", incorrectFeedback: "Es justo al revés: es el soluto el que se incorpora a la red del otro." },
      ],
      correctChoiceId: "conserva",
      shuffleChoices: true,
      explanation: "Es disolvente el elemento que conserva la red, aunque esté en menor proporción.",
    },
  ],
};
