import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const tendenciasPeriodicidad3esoLesson: InteractiveLesson = {
  slug: "tendencias-periodicidad-3eso",
  title: "4. Tendencias y periodicidad",
  subtitle: TEMA_3ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tendencia",
      type: "slide",
      help: [
        {
          label: "A largo plazo",
          message: "La tendencia dice qué ocurre con la función cuando $x$ se hace muy grande, aunque no conozcamos más gráfica.",
        },
        {
          label: "Sin llegar",
          message: "Tender a $20$ °C no significa alcanzarlo: el agua se acerca cada vez más sin llegar nunca a igualarlo exactamente.",
        },
      ],
      title: "Tendencia de una función",
      blocks: [
        {
          kind: "text",
          text: "En algunas funciones podemos **predecir** el comportamiento lejos del tramo conocido porque sus ramas tienen una **tendencia** muy clara.",
        },
        {
          kind: "example",
          title: "Una olla de agua hirviendo en una habitación a 20 °C",
          lines: [
            { math: "\\text{Al pasar el tiempo, la temperatura se acerca a } 20\\ °\\text{C}" },
            { math: "\\text{Decimos que la temperatura tiende a } 20\\ °\\text{C}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "funcion-tendencia-periodo" },
    },
    {
      id: "periodica",
      type: "slide",
      help: [
        {
          label: "Un periodo basta",
          message: "Si conoces cómo es la función en un periodo, la conoces entera: es copiar ese tramo una y otra vez.",
        },
        {
          label: "Ejemplos",
          message: "El cometa Halley vuelve cada $76$ años; las estaciones se repiten cada año; las mareas, cada día aproximadamente.",
        },
      ],
      title: "Funciones periódicas",
      blocks: [
        {
          kind: "definition",
          text: "Una función es **periódica** cuando su comportamiento se **repite** cada vez que la variable independiente recorre un cierto intervalo. La longitud de ese intervalo es el **periodo**.",
        },
        {
          kind: "example",
          title: "Distancia del cometa Halley al Sol",
          lines: [
            { math: "\\text{La órbita se repite cada 76 años} \\Rightarrow \\text{periodo} = 76\\ \\text{años}" },
            { math: "\\text{Si pasó en 1986, volverá en } 1986 + 76 = 2062" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tendencia",
      type: "predict",
      help: [
        {
          label: "Hacia dónde va",
          message: "El café se enfría hasta igualar la temperatura de lo que lo rodea.",
        },
      ],
      title: "Hacia dónde tiende",
      question: "Un café a $80$ °C se deja en una habitación a $22$ °C. ¿Hacia qué temperatura tiende el café con el paso del tiempo?",
      mode: "choice",
      choices: [
        { id: "22", label: "$22$ °C" },
        { id: "0", label: "$0$ °C", incorrectFeedback: "Un objeto no se enfría por debajo de la temperatura del ambiente." },
        { id: "80", label: "$80$ °C", incorrectFeedback: "Esa es su temperatura inicial: va bajando." },
      ],
      correctChoiceId: "22",
      shuffleChoices: true,
      explanation: "Se acerca a la temperatura ambiente, $22$ °C.",
    },
    {
      id: "check-periodo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Suma el periodo",
          message: "Si el fenómeno se repite cada $12$ horas, vuelve a ocurrir $12$ horas más tarde, y otras $12$ más después.",
        },
      ],
      title: "Repetición",
      question: "La marea alta ocurre a las $4$ h y se repite cada $12$ h aproximadamente. ¿A qué hora (en horas, de 0 a 24) será la siguiente marea alta tras la de las $4$ h? (solo el número)",
      correctAnswers: ["16"],
      explanation: "$4 + 12 = 16$ h.",
    },
    {
      id: "check-tipo",
      type: "predict",
      help: [
        {
          label: "Repetición",
          message: "Una función periódica repite su gráfica; una con tendencia se estabiliza.",
        },
      ],
      title: "Reconoce el tipo",
      question: "La altura de una persona montada en una noria, según el tiempo, sube y baja de forma que la gráfica se repite en cada vuelta. ¿Cómo es esta función?",
      mode: "choice",
      choices: [
        { id: "per", label: "Periódica, con periodo igual a lo que dura una vuelta" },
        { id: "ten", label: "Con una tendencia a un valor fijo", incorrectFeedback: "No se estabiliza: sube y baja siempre." },
        { id: "cre", label: "Creciente", incorrectFeedback: "También baja: no es siempre creciente." },
      ],
      correctChoiceId: "per",
      shuffleChoices: true,
      explanation: "El movimiento se repite en cada vuelta, así que es periódica y su periodo es el tiempo de una vuelta.",
    },
  ],
};
