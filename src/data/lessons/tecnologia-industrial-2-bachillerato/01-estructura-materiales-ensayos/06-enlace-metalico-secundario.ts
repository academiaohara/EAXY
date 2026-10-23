import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const enlaceMetalicoSecundarioLesson: InteractiveLesson = {
  slug: "enlace-metalico-secundario",
  title: "6. Enlace metálico y enlaces secundarios",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metalico",
      type: "slide",
      help: [
        {
          label: "¿Qué es un catión metálico?",
          message: "Un átomo metálico al que se le han quitado sus electrones de valencia. Queda una carga positiva fija en la red.",
        },
      ],
      title: "Iones en un mar de electrones",
      blocks: [
        {
          kind: "text",
          text: "En un metal sólido los átomos están **empaquetados** en una red ordenada. Los electrones de valencia, atraídos por varios núcleos, **no pertenecen a un único átomo**.",
        },
        {
          kind: "definition",
          text: "**Enlace metálico**: cationes ordenados en una red, unidos por una **nube de electrones de valencia** compartida por todos. No es direccional.",
        },
      ],
      visual: { kind: "anim", scene: "metalico-nube", beatMs: 5200 },
    },
    {
      id: "check-conductividad-metal",
      type: "predict",
      help: [{ label: "Pista", message: "La nube de electrones es móvil." }],
      title: "Conductividad de los metales",
      question: "La conductividad eléctrica y térmica de los metales se debe a que:",
      mode: "choice",
      choices: [
        { id: "libres", label: "Los electrones de valencia pueden moverse con relativa libertad" },
        { id: "fijos", label: "Los electrones están fijos y sirven de puente a las cargas eléctricas", incorrectFeedback: "Si estuvieran fijos no podrían transportar carga." },
        { id: "orbitas", label: "Los electrones están en órbitas compartidas por dos átomos", incorrectFeedback: "Eso sería un enlace covalente: localizado entre dos átomos." },
      ],
      correctChoiceId: "libres",
      shuffleChoices: true,
      explanation: "La nube electrónica es móvil: transporta carga y calor, y permite que las capas de átomos resbalen sin romper el enlace (maleabilidad y ductilidad).",
    },
    {
      id: "metalico-energia",
      type: "slide",
      help: [
        {
          label: "¿Por qué el mercurio es líquido?",
          message: "Su energía de enlace es de solo $16$ kcal/mol: a temperatura ambiente basta la agitación térmica para que la red no se mantenga.",
        },
      ],
      title: "Metales muy distintos",
      blocks: [
        {
          kind: "text",
          text: "Las energías de enlace y los puntos de fusión de los metales varían muchísimo. En general, **cuantos menos electrones de valencia por átomo** participan en el enlace, más metálico es.",
        },
        {
          kind: "compare",
          left: { title: "Mercurio (Hg)", text: "Energía de enlace $16$ kcal/mol. Funde a $-39$ °C: líquido a temperatura ambiente.", tone: "info" },
          right: { title: "Wolframio (W)", text: "Energía de enlace $203$ kcal/mol. Funde a $3\\,410$ °C: el metal más refractario.", tone: "key" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "van-der-waals",
      type: "slide",
      help: [
        {
          label: "¿Por qué se licúan los gases nobles?",
          message: "Tienen la capa completa, así que no forman enlaces primarios. Aun así, al bajar la temperatura se licúan y solidifican: debe haber una atracción débil entre sus átomos.",
        },
      ],
      title: "Enlaces secundarios: Van der Waals",
      blocks: [
        {
          kind: "text",
          text: "Entre átomos o moléculas sin enlace primario actúan las **fuerzas de Van der Waals**, debidas a **dipolos eléctricos** que aparecen y desaparecen. Son débiles: $2$ kcal/mol en los gases nobles y hasta $7{,}5$ kcal/mol en Cl₂.",
        },
        {
          kind: "compare",
          left: {
            title: "Polarización",
            text: "Un átomo de la molécula atrae más los electrones: la molécula es un **dipolo** de polaridad según la distancia entre cargas.",
            tone: "key",
          },
          right: {
            title: "Dispersión",
            text: "El movimiento continuo de los electrones crea dipolos muy débiles y **cambiantes** incluso en moléculas simétricas y gases nobles.",
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "puente-hidrogeno",
      type: "slide",
      help: [
        {
          label: "¿Es un enlace «iónico»?",
          message: "Se parece: las zonas de signo contrario se atraen. Pero las cargas son parciales ($\\delta^+$, $\\delta^-$), no iones completos; por eso es mucho más débil.",
        },
      ],
      title: "Puente de hidrógeno",
      blocks: [
        {
          kind: "text",
          text: "El agua es una molécula **polar**: tiene un **dipolo permanente** porque los dos H no están opuestos al O (ángulo de $105°$). El H de una molécula atrae al O de otra: es el **puente de hidrógeno**, con $12{,}2$ kcal/mol, más fuerte que Van der Waals.",
        },
        {
          kind: "text",
          text: "Por esa polaridad el agua puede **disolver** sustancias iónicas: sus dipolos rodean a los iones.",
        },
      ],
      visual: { kind: "anim", scene: "agua-puente-h", beatMs: 5400 },
    },
    {
      id: "check-agua",
      type: "predict",
      help: [{ label: "Pista", message: "Mira la forma de la molécula: hay una zona negativa y otra positiva." }],
      title: "La polaridad del agua",
      question: "La polaridad de la molécula de agua se debe a que:",
      mode: "choice",
      choices: [
        { id: "asimetrico", label: "Los átomos de hidrógeno ocupan una posición asimétrica respecto del oxígeno (105°)" },
        { id: "neutra", label: "La molécula es neutra y por tanto las cargas están equilibradas", incorrectFeedback: "Es neutra en total, pero las cargas no están repartidas por igual." },
        { id: "tamano", label: "El oxígeno es de mayor tamaño que el hidrógeno", incorrectFeedback: "El tamaño no crea un dipolo: lo crea la asimetría de la distribución de carga." },
      ],
      correctChoiceId: "asimetrico",
      shuffleChoices: true,
      explanation: "Al no estar alineados, los centros de carga positiva y negativa no coinciden: hay un dipolo permanente.",
    },
    {
      id: "explora-fusion",
      type: "slide",
      help: [
        {
          label: "¿Qué ordena la gráfica?",
          message: "En el eje horizontal, la energía de enlace; en el vertical, la temperatura de fusión. Los enlaces secundarios quedan abajo a la izquierda; los iónicos, a la derecha.",
        },
      ],
      title: "La energía manda sobre la temperatura de fusión",
      blocks: [
        {
          kind: "text",
          text: "Los datos de la Tabla 1.4 del libro, en una gráfica. Filtra por tipo de enlace y usa el deslizador para estimar la energía de enlace de un metal a partir de su temperatura de fusión.",
        },
      ],
      visual: { kind: "tool", tool: "enlace-fusion-grafica", params: { a: 1500 } },
      arrange: "visual-top",
    },
    {
      id: "check-iridio",
      type: "predict",
      help: [{ label: "Pista", message: "Ordena los metales por temperatura de fusión: Ti $1\\,812$ °C, Ir $2\\,454$ °C, W $3\\,410$ °C." }],
      title: "El iridio",
      question: "El iridio funde a $2\\,454$ °C. Según la tendencia de los metales de la tabla, su energía de enlace será:",
      mode: "choice",
      choices: [
        { id: "entre", label: "Mayor que la del titanio (113 kcal/mol) y menor que la del wolframio (203 kcal/mol)" },
        { id: "menor", label: "Menor que la del titanio", incorrectFeedback: "Funde a mayor temperatura que el titanio: tiene que estar por encima." },
        { id: "mayor", label: "Mayor que la del wolframio", incorrectFeedback: "El wolframio funde a $3\\,410$ °C, a mayor temperatura que el iridio." },
      ],
      correctChoiceId: "entre",
      shuffleChoices: true,
      explanation: "En los metales, a mayor temperatura de fusión, mayor energía de enlace: el Ir queda entre el Ti y el W.",
    },
    {
      id: "clasifica-enlaces",
      type: "classify",
      help: [{ label: "Pista", message: "Primarios: iónico, covalente, metálico. Secundarios: entre moléculas." }],
      title: "¿Qué enlace es?",
      question: "Relaciona cada descripción con su tipo de enlace.",
      groups: [
        { id: "ionico", label: "Iónico", tone: "amber" },
        { id: "covalente", label: "Covalente", tone: "emerald" },
        { id: "metalico", label: "Metálico", tone: "cobalt" },
        { id: "secundario", label: "Secundario", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Un átomo transfiere un electrón a otro y se atraen los iones", group: "ionico" },
        { id: "b", text: "Dos átomos comparten pares de electrones", group: "covalente" },
        { id: "c", text: "Una nube de electrones mantiene unidos los cationes", group: "metalico" },
        { id: "d", text: "El H de una molécula de agua atrae al O de otra", group: "secundario" },
        { id: "e", text: "Un metal se deforma en láminas sin romperse", group: "metalico" },
        { id: "f", text: "El argón se licúa al bajar mucho la temperatura", group: "secundario" },
      ],
      hint: "Fíjate en qué se hace con los electrones: transferir, compartir entre dos, compartir entre todos, o solo dipolos.",
      explanation: "Iónico: transferencia. Covalente: compartidos entre dos. Metálico: nube de todos. Secundario: atracción entre dipolos.",
    },
    {
      id: "check-potasio-titanio",
      type: "predict",
      help: [{ label: "Pista", message: "Compara sus energías de enlace: $21{,}4$ y $113$ kcal/mol." }],
      title: "Potasio y titanio",
      question: "El potasio funde a $63{,}5$ °C y el titanio a $1\\,812$ °C. La diferencia se debe a que:",
      mode: "choice",
      choices: [
        { id: "energia", label: "El titanio tiene una energía de enlace mucho mayor (113 frente a 21,4 kcal/mol) porque aporta más electrones al enlace" },
        { id: "tamano", label: "El potasio tiene átomos más pequeños", incorrectFeedback: "El tamaño no explica por sí solo la diferencia: lo que cuenta es la energía de enlace." },
        { id: "ionico", label: "El titanio forma enlaces iónicos", incorrectFeedback: "Ambos son metales: los dos forman enlace metálico." },
      ],
      correctChoiceId: "energia",
      shuffleChoices: true,
      explanation: "El potasio aporta un electrón por átomo y el titanio, cuatro: el enlace es más fuerte y la red cuesta más fundir.",
    },
  ],
};
