import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const enlaceCovalenteCarbonoLesson: InteractiveLesson = {
  slug: "enlace-covalente-carbono",
  title: "5. Enlace covalente y el carbono",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "compartir",
      type: "slide",
      help: [
        {
          label: "¿Qué es el octeto?",
          message: "Tener 8 electrones en la capa externa (como un gas noble). El hidrógeno se conforma con 2, como el helio.",
        },
      ],
      title: "Compartir en lugar de ceder",
      blocks: [
        {
          kind: "definition",
          text: "**Enlace covalente**: se forma entre átomos con **pequeñas diferencias de electronegatividad**. Comparten electrones $s$ y $p$ para que cada uno alcance la configuración de gas noble.",
        },
        {
          kind: "text",
          text: "Cada átomo aporta un electrón por cada par compartido. Con más pares compartidos hay **enlaces múltiples**: simple, doble o triple.",
        },
      ],
      visual: { kind: "anim", scene: "covalente-multiple", beatMs: 5200 },
    },
    {
      id: "explora-covalente",
      type: "slide",
      help: [
        {
          label: "Una regla para recordar",
          message: "Pares compartidos $= 8 - $ electrones de valencia (para el hidrógeno, $2 - 1 = 1$). Funciona para los no metales de las moléculas diatómicas iguales.",
        },
      ],
      title: "¿Cuántos pares comparten?",
      blocks: [
        {
          kind: "rule",
          title: "Pares compartidos entre dos átomos iguales",
          formula: "\\text{pares} = 8 - \\text{electrones de valencia}",
          text: "Para el hidrógeno, que completa su capa con $2$ electrones: $2 - 1 = 1$ par.",
        },
        {
          kind: "text",
          text: "Cambia de elemento y comprueba la regla. El enlace es **direccional**: apunta de un átomo al otro.",
        },
      ],
      visual: { kind: "tool", tool: "covalente-explorador", params: { a: 3 } },
    },
    {
      id: "check-pares",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Cuenta", message: "El oxígeno tiene $6$ electrones de valencia y necesita $8$." }],
      title: "El oxígeno molecular",
      question: "¿Cuántos pares de electrones comparten los dos átomos de oxígeno en la molécula O₂?",
      correctAnswers: ["2"],
      explanation: "Cada oxígeno necesita 2 electrones para llegar a 8: comparten 2 pares y el enlace es doble, O=O.",
    },
    {
      id: "check-nitrogeno",
      type: "predict",
      help: [{ label: "Pista", message: "El nitrógeno tiene $5$ electrones de valencia." }],
      title: "El nitrógeno molecular",
      question: "En la molécula de nitrógeno, N₂, el enlace entre los dos átomos es:",
      mode: "choice",
      choices: [
        { id: "triple", label: "Triple: comparten tres pares de electrones" },
        { id: "simple", label: "Simple: comparten un par", incorrectFeedback: "Con un solo par cada nitrógeno tendría 6 electrones, no 8." },
        { id: "doble", label: "Doble: comparten dos pares", incorrectFeedback: "Con dos pares cada nitrógeno tendría 7 electrones." },
      ],
      correctChoiceId: "triple",
      shuffleChoices: true,
      explanation: "Al N le faltan 3 electrones para el octeto: comparte 3 pares, N≡N.",
    },
    {
      id: "hidrogeno",
      type: "slide",
      help: [
        {
          label: "¿Siempre es fuerte?",
          message: "No. Un enlace covalente puede ser muy fuerte (el diamante funde a $3\\,550$ °C) o muy débil (el bismuto funde a $270$ °C).",
        },
      ],
      title: "La molécula de hidrógeno",
      blocks: [
        {
          kind: "text",
          text: "Al acercarse dos átomos de H, sus nubes electrónicas **se solapan** y aumenta la probabilidad de encontrar los electrones **entre los dos núcleos**.",
        },
        {
          kind: "text",
          text: "En el proceso la energía potencial disminuye y se libera energía. Separarlos exige aportar esa energía de vuelta, porque los átomos aislados están en un estado más alto.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "hibridacion",
      type: "slide",
      help: [
        {
          label: "¿Y la energía de promoción?",
          message: "Hay que gastar energía para pasar un electrón $2s$ a $2p$, pero se recupera con creces al formar los cuatro enlaces.",
        },
      ],
      title: "El carbono: cuatro enlaces iguales",
      blocks: [
        {
          kind: "text",
          text: "El carbono es $1s^2\\,2s^2\\,2p^2$: parece que solo podría hacer dos enlaces. Pero hace **cuatro**, todos iguales. La explicación es la **hibridación**.",
        },
        {
          kind: "steps",
          items: [
            "Un electrón $2s$ se **promueve** a un orbital $2p$ libre.",
            "El orbital $2s$ y los tres $2p$ se mezclan en **cuatro orbitales $sp^3$** equivalentes.",
            "Los cuatro enlaces se orientan hacia los vértices de un **tetraedro** ($109{,}5°$).",
          ],
        },
      ],
      visual: { kind: "anim", scene: "hibridacion-sp3", beatMs: 5400 },
    },
    {
      id: "check-sp3",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en el tetraedro del diamante." }],
      title: "Carbono sp³",
      question: "Un átomo de carbono con hibridación $sp^3$ forma:",
      mode: "choice",
      choices: [
        { id: "cuatro", label: "Cuatro enlaces equivalentes, con ángulos de 109,5° entre sí" },
        { id: "dos", label: "Dos enlaces a 180°", incorrectFeedback: "Eso ocurriría con solo dos orbitales semillenos, sin hibridar." },
        { id: "tres", label: "Tres enlaces en un plano a 120°", incorrectFeedback: "Los orbitales $sp^3$ son cuatro y salen en el espacio, no en un plano." },
      ],
      correctChoiceId: "cuatro",
      shuffleChoices: true,
      explanation: "Cuatro orbitales $sp^3$ apuntan a los vértices de un tetraedro regular.",
    },
    {
      id: "check-diamante",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en cuántos enlaces fuertes hay y cómo se reparten." }],
      title: "¿Por qué el diamante es tan duro?",
      question: "¿Por qué el diamante es un material muy duro?",
      mode: "choice",
      choices: [
        { id: "red", label: "Cada átomo de C está unido a otros cuatro por enlaces covalentes fuertes en una red tridimensional" },
        { id: "ionico", label: "Porque sus átomos son iones que se atraen con mucha fuerza", incorrectFeedback: "En el diamante todos los átomos son carbono: no hay transferencia de electrones." },
        { id: "nube", label: "Porque tiene una nube de electrones que mantiene unidos los átomos", incorrectFeedback: "Eso describe el enlace metálico." },
      ],
      correctChoiceId: "red",
      shuffleChoices: true,
      explanation: "Estructura tetraédrica rígida de enlaces covalentes $sp^3$ fuertes. Por eso funde a $3\\,550$ °C.",
    },
    {
      id: "check-conductividad",
      type: "predict",
      help: [{ label: "Pista", message: "En el enlace covalente los electrones están localizados entre dos átomos." }],
      title: "Covalentes y electricidad",
      question: "Las sustancias formadas por enlaces covalentes, ¿serán buenas conductoras eléctricas?",
      mode: "choice",
      choices: [
        { id: "no", label: "En general no: los electrones están localizados en el enlace y no pueden moverse libremente" },
        { id: "si", label: "Sí, porque comparten electrones y los electrones se mueven", incorrectFeedback: "Compartir no es lo mismo que moverse libremente: los pares quedan fijos entre dos átomos." },
        { id: "iones", label: "Sí, porque forman iones", incorrectFeedback: "Los iones aparecen en el enlace iónico, no en el covalente." },
      ],
      correctChoiceId: "no",
      shuffleChoices: true,
      explanation: "A diferencia del enlace metálico, el covalente es direccional y localiza los electrones: son malos conductores (el grafito es una excepción conocida).",
    },
  ],
};
