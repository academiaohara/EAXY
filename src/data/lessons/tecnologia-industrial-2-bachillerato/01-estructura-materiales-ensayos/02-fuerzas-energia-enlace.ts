import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const fuerzasEnergiaEnlaceLesson: InteractiveLesson = {
  slug: "fuerzas-energia-enlace",
  title: "2. Fuerzas y energía de enlace",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "fuerzas",
      type: "slide",
      help: [
        {
          label: "¿Y la gravedad o el magnetismo?",
          message: "Existen, pero a escala atómica son muchísimo más débiles que las fuerzas eléctricas: se pueden despreciar.",
        },
      ],
      title: "Dos fuerzas enfrentadas",
      blocks: [
        {
          kind: "text",
          text: "Entre dos átomos contiguos actúan dos tipos de fuerzas. Su equilibrio decide a qué distancia se colocan.",
        },
        {
          kind: "compare",
          left: {
            title: "Atractivas",
            text: "Por la naturaleza del enlace y por la atracción electrostática entre cada **núcleo** y la **nube electrónica** del otro.",
            tone: "ok",
          },
          right: {
            title: "Repulsivas",
            text: "Entre los **núcleos** (ambos positivos) y entre las **nubes electrónicas** (ambas negativas).",
            tone: "warn",
          },
        },
      ],
      visual: { kind: "anim", scene: "enlace-curva-energia", beatMs: 5200 },
    },
    {
      id: "equilibrio",
      type: "slide",
      help: [
        {
          label: "¿Por qué los átomos se enlazan?",
          message: "Porque al enlazarse la energía potencial del conjunto **disminuye**: los átomos unidos son más estables que libres. Para separarlos hay que devolver esa energía.",
        },
      ],
      title: "Distancia de equilibrio y energía de enlace",
      blocks: [
        {
          kind: "text",
          text: "La suma de las curvas de atracción y repulsión tiene un **mínimo**. En esa distancia $a_0$ (para muchos átomos, $0{,}3$ nm $= 3$ Å) las fuerzas se igualan y el sistema es estable.",
        },
        {
          kind: "definition",
          text: "**Energía de enlace**: la energía necesaria para separar los átomos o moléculas que forman el enlace hasta una distancia infinita; es decir, para destruir el enlace.",
        },
      ],
      visual: { kind: "tool", tool: "curva-enlace-explorador", params: { a: 55, b: 100 } },
    },
    {
      id: "check-equilibrio",
      type: "predict",
      help: [{ label: "Pista", message: "Mira el mínimo de la curva azul de la herramienta." }],
      title: "En la distancia de equilibrio",
      question: "A la distancia de equilibrio de dos átomos que forman un enlace, la energía es:",
      mode: "choice",
      choices: [
        { id: "min", label: "Mínima, debido a la suma de las energías de atracción y repulsión" },
        { id: "nula", label: "Nula, por eso los enlaces atómicos son muy estables", incorrectFeedback: "No es cero: es negativa y mínima; la energía cero corresponde a átomos infinitamente separados." },
        { id: "max", label: "La mayor posible, para que los átomos estén fijos en la posición", incorrectFeedback: "Al revés: es el punto más bajo, y por eso es estable." },
      ],
      correctChoiceId: "min",
      shuffleChoices: true,
      explanation: "En $a_0$ la energía neta es mínima y las fuerzas de atracción y repulsión se compensan.",
    },
    {
      id: "enlace-tipo",
      type: "slide",
      help: [
        {
          label: "¿Qué es un mol?",
          message: "La masa molecular expresada en gramos. Un mol de cualquier sustancia contiene $6{,}02\\cdot 10^{23}$ partículas (número de Avogadro).",
        },
      ],
      title: "La energía de enlace caracteriza al enlace",
      blocks: [
        {
          kind: "text",
          text: "Esa energía varía de una sustancia a otra y con su estado físico. Los **sólidos a temperatura ambiente** tienen energías de enlace elevadas, y por eso puede considerarse la **temperatura de fusión** como un indicador de la energía de enlace.",
        },
        {
          kind: "facts",
          items: [
            { tex: "N_A = 6{,}02\\cdot 10^{23}\\ \\text{mol}^{-1}", label: "número de Avogadro" },
            { tex: "1\\ \\text{mol Fe} = 55{,}8\\ \\text{g}", label: "masa de un mol de hierro" },
            { tex: "1\\ \\text{mol Mg} = 24{,}3\\ \\text{g}", label: "masa de un mol de magnesio" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-moles",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasa a gramos", message: "$1$ t $= 10^6$ g. Divide entre la masa de un mol." }],
      title: "Una tonelada de hierro: moles",
      question: "¿Cuántos moles de hierro hay en una tonelada ($55{,}8$ g/mol)? Redondea a la unidad.",
      correctAnswers: ["17921", "17 921", "17921,1", "17921.1"],
      explanation: "$n = 10^6\\ \\text{g}/55{,}8\\ \\text{g/mol} = 17\\,921$ mol.",
    },
    {
      id: "check-atomos",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Avogadro", message: "Multiplica los moles por $6{,}02\\cdot 10^{23}$ átomos/mol." }],
      title: "Una tonelada de hierro: átomos",
      question: "¿Cuántos átomos hay en esa tonelada? Escribe el coeficiente con dos decimales, en unidades de $10^{28}$.",
      correctAnswers: ["1,08", "1.08"],
      explanation: "$17\\,921\\cdot 6{,}02\\cdot 10^{23} \\approx 1{,}08\\cdot 10^{28}$ átomos.",
    },
    {
      id: "check-fusion",
      type: "predict",
      help: [{ label: "Pista", message: "Mayor energía de enlace → hace falta más calor para romper la red → mayor temperatura de fusión." }],
      title: "¿Cuál funde a mayor temperatura?",
      question: "Energías de enlace: mercurio $16$ kcal/mol, hierro $97$ kcal/mol, wolframio $203$ kcal/mol. ¿Cuál tendrá la mayor temperatura de fusión?",
      mode: "choice",
      choices: [
        { id: "w", label: "El wolframio" },
        { id: "hg", label: "El mercurio", incorrectFeedback: "Tiene la menor energía de enlace: es líquido a temperatura ambiente." },
        { id: "fe", label: "El hierro", incorrectFeedback: "Su energía es intermedia; el wolframio la duplica." },
      ],
      correctChoiceId: "w",
      shuffleChoices: true,
      explanation: "A mayor energía de enlace, mayor temperatura de fusión: W $3\\,410$ °C, Fe $1\\,536$ °C, Hg $-39$ °C.",
    },
  ],
};
