import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_9_SUBTITLE } from "@/data/lessons/shared";

export const circuitosAplicacionesLesson: InteractiveLesson = {
  slug: "circuitos-aplicaciones",
  title: "10. Circuitos oleohidráulicos de aplicación",
  subtitle: TEMA_TI2_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "simple",
      type: "slide",
      help: [{ label: "¿Cuál es el grupo de accionamiento?", message: "El conjunto motor + bomba + válvula limitadora (y filtro y depósito), que eleva la presión del aceite hasta la de trabajo que marca el manómetro." }],
      title: "Gobierno de un cilindro de simple efecto",
      blocks: [
        { kind: "text", text: "Hay un grupo de accionamiento (motor + bomba + limitadora). El cilindro se acciona con una **válvula 3/2 de mando mecánico**, **normalmente cerrada**, con **retorno por muelle**." },
        { kind: "steps", items: [
          "Al accionarla, conmuta y deja pasar el aceite al cilindro: **avanza**.",
          "Al soltarla, vuelve a conmutar y el aceite a presión **sale del cilindro** hacia el depósito: el muelle lo recoge.",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "doble",
      type: "slide",
      help: [{ label: "¿Qué pasa en la posición central?", message: "En la 4/3 del libro es de centro abierto a descarga: el aceite pasa directamente de P al depósito y el cilindro se queda donde esté." }],
      title: "Cilindro de doble efecto con una 4/3",
      blocks: [
        { kind: "text", text: "Una válvula **4/3** de reposo central: al accionar la posición 1 conecta $P$ con $B$ y $A$ con escape (el vástago **avanza**); la posición 3, al revés (el vástago **retrocede**); la central lo **detiene**." },
      ],
      visual: { kind: "anim", scene: "valvula-43-cilindro", beatMs: 5800 },
    },
    {
      id: "check-43",
      type: "predict",
      help: [{ label: "Pista", message: "Si interrumpes la alimentación a los dos lados, el aceite no puede moverse." }],
      title: "Parar a mitad de carrera",
      question: "Con la válvula 4/3 llevada a la posición central a mitad de la carrera, el cilindro:",
      mode: "choice",
      choices: [
        { id: "para", label: "Se detiene en esa posición, porque el aceite es incompresible" },
        { id: "sigue", label: "Sigue avanzando por inercia hasta el final", incorrectFeedback: "El aceite bloqueado no deja moverse al émbolo." },
        { id: "vuelve", label: "Vuelve a su posición inicial", incorrectFeedback: "Solo retrocede con la posición 3." },
      ],
      correctChoiceId: "para",
      shuffleChoices: true,
      explanation: "Por eso la hidráulica permite paradas intermedias; con aire el émbolo «oscilaría».",
    },
    {
      id: "regulacion",
      type: "slide",
      help: [{ label: "¿Por qué el retorno tiene menos presión?", message: "Si el caudal se regula a la entrada, el aceite del lado del vástago sale libre al depósito, con una presión menor." }],
      title: "Regular la velocidad y la presión",
      blocks: [
        { kind: "steps", items: [
          "**Velocidad de avance**: una válvula reguladora de caudal en la **entrada** del cilindro (4/2 con retorno por muelle). El aceite del retorno tiene menos presión.",
          "**Caudal de entrada** con una 4/3 de enclavamiento: la regulación se consigue con la limitadora colocada en la **salida**.",
          "**Presión constante en el avance**: con una válvula reguladora de presión; en el retroceso, el aceite de la cámara del émbolo pasa por la **antirretorno**.",
        ] },
        { kind: "text", text: "Casos de aplicación: **elevadores** y **ascensores**, **rampas salvaescaleras**, plataformas elevadoras en autobuses y vehículos monovolumen, excavadoras y prensas." },
      ],
      arrange: "stack",
    },
    {
      id: "check-ascensor",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en la presión de servicio y el aire." }],
      title: "¿Por qué ascensores hidráulicos?",
      question: "En la elevación de cargas (por ejemplo, un ascensor de vivienda), la oleohidráulica es más interesante que la neumática porque:",
      mode: "choice",
      choices: [
        { id: "presion", label: "Trabaja a presiones diez a cien veces mayores y retiene la carga mucho tiempo sin pérdidas apreciables" },
        { id: "aire", label: "Porque el aire no existe en los edificios", incorrectFeedback: "No es la razón." },
        { id: "ruido", label: "Porque el aceite no necesita ninguna conducción", incorrectFeedback: "Sí necesita tuberías al cilindro, pero el grupo puede estar en cualquier sitio." },
      ],
      correctChoiceId: "presion",
      shuffleChoices: true,
      explanation: "Además, el grupo de presión puede ir lejos del actuador (por ejemplo, bajo la escalera) y pesa menos que un motor con caja reductora.",
    },
    {
      id: "check-calefaccion",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$Q = v\\,S$ con $D = 9{,}525$ mm y $v = 2$ m/s; $P = pQ/\\eta$." }],
      title: "Potencia de un circuito",
      question: "Circuito con tubería de $3/8''$ ($9{,}525$ mm), aceite a $2$ m/s y $45$ bar, con rendimiento del $70\\,\\%$. ¿Qué potencia absorbe, en W? (redondea a la decena)",
      correctAnswers: ["920", "916", "917"],
      explanation: "$Q = 2\\cdot 7{,}13\\cdot 10^{-5} = 1{,}43\\cdot 10^{-4}$ m³/s ($8{,}6$ l/min); $P = \\dfrac{45\\cdot 10^5\\cdot 1{,}43\\cdot 10^{-4}}{0{,}7} \\approx 916$ W.",
    },
    {
      id: "check-silenciador",
      type: "predict",
      help: [{ label: "Pista", message: "El filtro recoge las impurezas antes de llegar al depósito." }],
      title: "Dónde colocar el filtro",
      question: "En una instalación oleohidráulica, ¿dónde es más importante colocar un filtro?",
      mode: "choice",
      choices: [
        { id: "retorno", label: "En la línea de retorno (elimina las impurezas recogidas por el aceite antes de que lleguen al depósito); además, en la aspiración y delante de las válvulas más exigentes" },
        { id: "solo", label: "Solo en la aspiración", incorrectFeedback: "También el retorno y otros puntos." },
        { id: "nunca", label: "En ninguna parte: el aceite es limpio", incorrectFeedback: "El aceite arrastra partículas metálicas y de desgaste." },
      ],
      correctChoiceId: "retorno",
      shuffleChoices: true,
      explanation: "El filtro de retorno es el más importante; en válvulas muy exigentes se añaden filtros delante.",
    },
  ],
};
