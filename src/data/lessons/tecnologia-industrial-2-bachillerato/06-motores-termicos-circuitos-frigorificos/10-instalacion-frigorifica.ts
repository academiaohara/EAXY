import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const instalacionFrigorificaLesson: InteractiveLesson = {
  slug: "instalacion-frigorifica",
  title: "10. La instalación frigorífica",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "circuito",
      type: "slide",
      help: [
        {
          label: "¿Por qué no se usa el ciclo de Carnot tal cual?",
          message: "Porque los procesos reales no son reversibles y, sobre todo, comprimir una mezcla de líquido y vapor da problemas. Se comprime solo vapor y se sustituye la turbina de expansión por una válvula.",
        },
      ],
      title: "Los cuatro elementos de un circuito frigorífico",
      blocks: [
        {
          kind: "text",
          text: "Por el circuito circula un **fluido refrigerante** que cambia de fase continuamente.",
        },
        {
          kind: "steps",
          items: [
            "**Compresor**: aspira el vapor frío a baja presión y lo comprime. Consume trabajo.",
            "**Condensador**: intercambiador de calor; el vapor cede $Q_c$ al ambiente y **condensa**.",
            "**Válvula de expansión**: baja la presión del líquido hasta la del evaporador.",
            "**Evaporador**: el refrigerante absorbe $Q_f$ del recinto y se **evapora**.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "frigorifico-circuito", beatMs: 5800 },
    },
    {
      id: "clasifica-componentes",
      type: "classify",
      help: [{ label: "Pista", message: "Piensa qué ocurre con la presión y con el calor en cada elemento." }],
      title: "¿Qué hace cada elemento?",
      question: "Relaciona cada función con su elemento.",
      groups: [
        { id: "compresor", label: "Compresor", tone: "emerald" },
        { id: "condensador", label: "Condensador", tone: "rose" },
        { id: "valvula", label: "Válvula de expansión", tone: "amber" },
        { id: "evaporador", label: "Evaporador", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "Consume el trabajo W y aumenta la presión del vapor", group: "compresor" },
        { id: "b", text: "Cede calor al ambiente y el vapor pasa a líquido", group: "condensador" },
        { id: "c", text: "Reduce la presión del líquido y lo enfría", group: "valvula" },
        { id: "d", text: "Absorbe calor del recinto y el líquido se evapora", group: "evaporador" },
        { id: "e", text: "Son los serpentines de la parte trasera de la nevera", group: "condensador" },
        { id: "f", text: "Son las placas del interior, donde se forma la escarcha", group: "evaporador" },
      ],
      hint: "Alta presión y caliente: compresor y condensador. Baja presión y frío: válvula y evaporador.",
      explanation: "En el condensador (calor fuera) y en el evaporador (calor del interior) hay cambio de fase a presión y temperatura constantes.",
    },
    {
      id: "check-evaporador",
      type: "predict",
      help: [{ label: "Pista", message: "Evaporar absorbe calor." }],
      title: "El evaporador",
      question: "El evaporador de una máquina frigorífica tiene la misión de:",
      mode: "choice",
      choices: [
        { id: "absorber", label: "Absorber calor por la evaporación del líquido que le llega" },
        { id: "ceder", label: "Ceder calor al condensar el líquido que llega comprimido del compresor", incorrectFeedback: "Esa es la función del condensador." },
        { id: "reducir", label: "Reducir la presión a la salida del condensador", incorrectFeedback: "Eso lo hace la válvula de expansión." },
      ],
      correctChoiceId: "absorber",
      shuffleChoices: true,
      explanation: "El refrigerante hierve a baja presión y temperatura y toma el calor del recinto.",
    },
    {
      id: "valvula",
      type: "slide",
      help: [
        {
          label: "¿Qué es el «bulbo» de la válvula?",
          message: "Un sensor térmico a la salida del evaporador que permite abrir más o menos la válvula según la temperatura del gas: es un sistema termostático.",
        },
      ],
      title: "La válvula de expansión",
      blocks: [
        {
          kind: "text",
          text: "El líquido saturado que sale del condensador debería expandirse en una **turbina**, pero el trabajo que se obtendría es mucho menor que el necesario en el compresor, y sería caro. Se sustituye por una **válvula estranguladora**, simple y barata, que además **dosifica el refrigerante**.",
        },
        {
          kind: "text",
          text: "A su salida el fluido es una mezcla de líquido y vapor que acabará de evaporarse en el evaporador. En esa válvula no se realiza trabajo, pero el proceso **no es reversible**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-valvula",
      type: "predict",
      help: [{ label: "Pista", message: "Va entre el condensador (alta presión) y el evaporador (baja presión)." }],
      title: "¿Para qué sirve la válvula?",
      question: "La válvula de expansión de un circuito frigorífico sirve para:",
      mode: "choice",
      choices: [
        { id: "reducir", label: "Reducir la presión del líquido del condensador hasta la del evaporador y dosificar el refrigerante" },
        { id: "inverso", label: "Evitar que el refrigerante circule en sentido inverso", incorrectFeedback: "Esa función la cumplen las válvulas antirretorno." },
        { id: "comprimir", label: "Comprimir el vapor antes del condensador", incorrectFeedback: "Esa es la tarea del compresor." },
      ],
      correctChoiceId: "reducir",
      shuffleChoices: true,
      explanation: "Baja la presión (y la temperatura) para que el fluido pueda evaporarse a baja temperatura.",
    },
    {
      id: "gas-vapor",
      type: "slide",
      help: [
        {
          label: "¿Por qué se usa aire en aviación?",
          message: "En los sistemas de gas el refrigerante es aire, no tóxico ni inflamable: ideal en recintos donde otros fluidos serían peligrosos. Pero el vapor suele ser más eficiente.",
        },
      ],
      title: "Refrigeración por gas y por vapor",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Sistemas de gas",
            text: "El refrigerante (aire) **siempre es gas**. Es un ciclo Brayton invertido: expansión en turbina, calentamiento en un intercambiador, compresión y enfriamiento. Se usa donde otros sistemas son peligrosos, como en aviación.",
            tone: "info",
          },
          right: {
            title: "Sistemas de vapor",
            text: "El refrigerante **condensa y se evapora** alternativamente (ciclo inverso de Rankine). Es el más utilizado: el cambio de fase absorbe y cede mucho calor a presión y temperatura constantes.",
            tone: "key",
          },
        },
        {
          kind: "rule",
          title: "Eficiencia en un ciclo de vapor",
          formula: "\\text{COP} = \\dfrac{q_{abs}}{q_{ced} - q_{abs}}",
        },
      ],
      arrange: "stack",
    },
    {
      id: "fluidos",
      type: "slide",
      help: [
        {
          label: "¿Qué es el Protocolo de Montreal?",
          message: "Un acuerdo internacional que prohíbe el uso del cloro en los fluidos refrigerantes para proteger la capa de ozono. Está prohibido en instalaciones nuevas.",
        },
      ],
      title: "Los fluidos refrigerantes",
      blocks: [
        {
          kind: "steps",
          title: "Qué propiedades debe tener un fluido criogénico",
          items: [
            "**Presión de evaporación alta**, mayor que la atmosférica.",
            "**Calor latente de vaporización** lo más alto posible.",
            "**Calor específico en estado líquido** muy pequeño.",
            "No reaccionar con el agua o el aire de la instalación.",
            "Intercambio de calor por unidad de masa muy alto: intercambiadores pequeños.",
          ],
        },
        {
          kind: "text",
          text: "Los refrigerantes con **cloro** (como el R-12) se sustituyen por otros, como el **R-134a**, que hierve a unos $-26$ °C a $1$ bar. Los usos de la refrigeración van de la conservación de alimentos al aire acondicionado, la criocirugía, la licuefacción de gases o la conservación de plasma sanguíneo.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-r12",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en la capa de ozono y el Protocolo de Montreal." }],
      title: "Del R-12 al R-134a",
      question: "¿Por qué el R-12 se sustituye por el R-134a?",
      mode: "choice",
      choices: [
        { id: "cloro", label: "Porque el R-12 contiene cloro, que está prohibido en instalaciones nuevas por su efecto sobre el ozono" },
        { id: "caro", label: "Porque el R-134a es mucho más barato", incorrectFeedback: "La razón no es económica, sino ambiental." },
        { id: "no-hierve", label: "Porque el R-12 no puede evaporarse", incorrectFeedback: "El R-12 sí se evapora; funcionaba bien como refrigerante." },
      ],
      correctChoiceId: "cloro",
      shuffleChoices: true,
      explanation: "El R-134a no contiene cloro y tiene propiedades aptas para usarse como fluido refrigerante.",
    },
  ],
};
