import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const sobrealimentacionTurbocompresorLesson: InteractiveLesson = {
  slug: "sobrealimentacion-turbocompresor",
  title: "8. Sobrealimentación y turbocompresor",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formas",
      type: "slide",
      help: [
        {
          label: "¿Qué factor se mejora con la sobrealimentación?",
          message: "La densidad del aire $d_a$: si el aire entra comprimido, cabe más masa en el mismo volumen.",
        },
      ],
      title: "Cómo aumentar la potencia",
      blocks: [
        {
          kind: "text",
          text: "En $P = \\dfrac{N}{2}V_T\\,d_a\\,\\delta\\,Q_c\\,\\eta$ hay varias formas de aumentar la potencia:",
        },
        {
          kind: "steps",
          items: [
            "**Subir $N$**: más vueltas. Complica el sincronismo y otros factores empeoran.",
            "**Subir $V_T$**: más cilindros o más cilindrada.",
            "**Mejorar los rendimientos**: inyección en lugar de carburador o mayor compresión (con gasolinas de más octanaje).",
            "**Subir $d_a$**: comprimir el aire antes de que entre en el cilindro. Es la **sobrealimentación**.",
          ],
        },
        {
          kind: "text",
          text: "Con más aire se puede quemar más combustible: la misma potencia con un **motor más pequeño**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "turbo",
      type: "slide",
      help: [
        {
          label: "¿Por qué se llama radial?",
          message: "Porque los gases entran y salen del rodete en dirección radial. En las turbinas axiales, como las de gas o vapor, entran y salen en el sentido del eje.",
        },
      ],
      title: "El turbocompresor: energía «gratis» del escape",
      blocks: [
        {
          kind: "text",
          text: "Una turbina es lo inverso de un compresor: baja la presión de los gases y **cede trabajo**. Si se coloca en el escape, ese trabajo mueve un compresor que sobrealimenta el motor. De ahí viene el nombre: **turbo-compresor**.",
        },
        {
          kind: "text",
          text: "Los gases de escape salen a unos $950$ °C y $2$ bar; el compresor entrega aire a $1{,}5$ bar y unos $100$ °C.",
        },
      ],
      visual: { kind: "anim", scene: "turbocompresor-flujo", beatMs: 5800 },
    },
    {
      id: "check-mision",
      type: "predict",
      help: [{ label: "Pista", message: "Mira el factor $d_a$ de la fórmula de la potencia." }],
      title: "Misión del turbo",
      question: "El turbocompresor acoplado a un motor Otto o Diesel tiene como misión:",
      mode: "choice",
      choices: [
        { id: "mas", label: "Introducir más cantidad de aire del que le correspondería por su cilindrada" },
        { id: "llenado", label: "Facilitar el llenado del cilindro con combustible y aire", incorrectFeedback: "Eso lo hace la admisión; el turbo añade presión." },
        { id: "salida", label: "Facilitar la salida de los gases de escape", incorrectFeedback: "Los gases de escape solo mueven la turbina; no es su objetivo facilitar su salida." },
      ],
      correctChoiceId: "mas",
      shuffleChoices: true,
      explanation: "Más masa de aire permite quemar más combustible y obtener más potencia con el mismo motor.",
    },
    {
      id: "check-energia-turbo",
      type: "predict",
      help: [{ label: "Pista", message: "Mira dónde está la turbina." }],
      title: "¿De dónde sale la energía?",
      question: "¿Qué mueve el compresor de un turbocompresor?",
      mode: "choice",
      choices: [
        { id: "escape", label: "La turbina movida por los gases de escape, a través de un eje común" },
        { id: "motor", label: "Una correa conectada al cigüeñal", incorrectFeedback: "Esos son los compresores mecánicos (volumétricos), no el turbocompresor." },
        { id: "bateria", label: "Un motor eléctrico alimentado por la batería", incorrectFeedback: "No lleva motor eléctrico: aprovecha la energía del escape." },
      ],
      correctChoiceId: "escape",
      shuffleChoices: true,
      explanation: "Aprovecha energía (presión y velocidad) que el escape perdería.",
    },
    {
      id: "check-densidad",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Proporcional", message: "A igual temperatura, la densidad del aire es proporcional a su presión." }],
      title: "Más presión, más aire",
      question: "Si el aire entra en el cilindro a $1{,}5$ bar en lugar de $1$ bar, y se enfría hasta la misma temperatura, ¿cuántas veces mayor es la masa de aire que cabe?",
      correctAnswers: ["1,5", "1.5"],
      explanation: "A temperatura constante, $d_a \\propto p$: $1{,}5/1 = 1{,}5$ veces más masa de aire (y de combustible que se puede quemar).",
    },
    {
      id: "intercooler",
      type: "slide",
      help: [
        {
          label: "¿Qué significa «Turbo Intercooler»?",
          message: "El término inglés para turbocompresor con un intercambiador de calor (radiador) intermedio entre el compresor y el motor.",
        },
      ],
      title: "El intercooler",
      blocks: [
        {
          kind: "text",
          text: "A la salida del compresor, además de salir a alta presión, el aire sale **caliente**. Eso perjudica el objetivo: el aire caliente es **menos denso**.",
        },
        {
          kind: "text",
          text: "Se soluciona con un **intercambiador de calor** (radiador) que **enfría el aire** antes de entrar al motor. Por eso algunos vehículos llevan en su ficha la denominación *Turbo Intercooler*.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-intercooler",
      type: "predict",
      help: [{ label: "Pista", message: "Densidad, temperatura y presión están relacionadas." }],
      title: "¿Para qué enfriar el aire?",
      question: "¿Por qué se coloca un intercooler entre el compresor y el motor?",
      mode: "choice",
      choices: [
        { id: "densidad", label: "Para que el aire, más frío y por tanto más denso, llene más el cilindro" },
        { id: "presion", label: "Para subir todavía más la presión del aire", incorrectFeedback: "Enfriar el aire a presión constante reduce su volumen, no aumenta la presión." },
        { id: "gases", label: "Para enfriar los gases de escape", incorrectFeedback: "El intercooler actúa sobre el aire de admisión." },
      ],
      correctChoiceId: "densidad",
      shuffleChoices: true,
      explanation: "Más densidad del aire significa más masa por cilindro y mejor combustión.",
    },
  ],
};
