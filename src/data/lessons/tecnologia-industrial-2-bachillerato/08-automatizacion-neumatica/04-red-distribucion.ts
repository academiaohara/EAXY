import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_8_SUBTITLE } from "@/data/lessons/shared";

export const redDistribucionLesson: InteractiveLesson = {
  slug: "red-distribucion",
  title: "4. Red de distribución y tratamiento del aire",
  subtitle: TEMA_TI2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "red",
      type: "slide",
      help: [{ label: "¿Por qué soldadura y a veces racores?", message: "La soldadura da más estanqueidad y menor coste, pero se oxida; los racores (biconos o de anillo) permiten montar y desmontar y usar plástico en tramos cortos y de baja presión." }],
      title: "De dónde sale y a dónde va el aire",
      blocks: [
        { kind: "text", text: "La **red de distribución** es el conjunto de tuberías que lleva el aire comprimido desde el depósito a todos los elementos, garantizando la presión y la velocidad en cada punto. El diámetro depende de la velocidad del aire, la caída de presión, la presión de trabajo, la longitud y las estrangulaciones (codos, derivaciones)." },
        { kind: "facts", items: [
          { tex: "6\\text{–}10\\ \\text{m/s}", label: "velocidad habitual del aire" },
          { tex: "\\Delta p \\le 0{,}1\\ \\text{bar}", label: "caída de presión máxima" },
          { tex: "1\\text{–}3°", label: "inclinación de la línea principal" },
        ] },
      ],
      visual: { kind: "anim", scene: "red-distribucion-aire", beatMs: 5800 },
    },
    {
      id: "check-pendiente",
      type: "predict",
      help: [{ label: "Pista", message: "El agua condensada se desliza por gravedad." }],
      title: "¿Por qué una línea inclinada?",
      question: "La línea principal de una red de aire comprimido se instala con una ligera pendiente de 1 a 3° para:",
      mode: "choice",
      choices: [
        { id: "agua", label: "Que el agua condensada resbale hasta puntos bajos donde se purga" },
        { id: "presion", label: "Aumentar la presión del aire", incorrectFeedback: "La pendiente no cambia la presión de forma apreciable." },
        { id: "vel", label: "Que el aire vaya más deprisa", incorrectFeedback: "La velocidad la fija el caudal y el diámetro." },
      ],
      correctChoiceId: "agua",
      shuffleChoices: true,
      explanation: "Las bajantes salen por arriba para no coger el agua, y en los puntos bajos se coloca un purgador.",
    },
    {
      id: "deposito",
      type: "slide",
      help: [{ label: "¿Mejor un depósito grande?", message: "Si hay duda, siempre es mejor colocar uno que cumpla de sobra las exigencias del circuito antes que uno que las cumpla de forma escasa." }],
      title: "Depósitos y acumuladores",
      blocks: [
        { kind: "compare",
          left: { title: "Depósito", text: "Mantiene un **nivel de presión** adecuado acumulando aire. Si hay un fallo o falta electricidad, el circuito sigue funcionando un tiempo. Su tamaño depende del caudal consumido y de la potencia del compresor.", tone: "key" },
          right: { title: "Acumuladores", text: "Parecidos pero **más pequeños**: mantienen la presión en niveles similares en todos los elementos y compensan las pérdidas de conducciones largas.", tone: "info" } },
      ],
      arrange: "stack",
    },
    {
      id: "tratamiento",
      type: "slide",
      help: [{ label: "¿Qué hace el purgador?", message: "Expulsa el agua acumulada en el fondo del vaso del filtro. El recipiente de vidrio ayuda a ver cuándo hay agua." }],
      title: "Tratamiento del aire comprimido",
      blocks: [
        { kind: "text", text: "Como el aire es atmosférico, lleva partículas y humedad. Hay tres tipos de aparatos para acondicionarlo: **filtros**, **separadores** (quitan el aceite del compresor) y **colectores de condensación** (eliminan el agua)." },
        { kind: "compare",
          left: { title: "Si no se trata el aire", text: "Desgaste rápido de juntas, válvulas agarrotadas por el aceite, silenciadores obstruidos y exceso de agua en el filtro.", tone: "warn" },
          right: { title: "Si hay mucha humedad", text: "Corrosión en tuberías y cilindros, pérdida de lubricación, perturbaciones en las válvulas y daños en productos delicados (pintura, alimentación).", tone: "warn" } },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-tratamiento",
      type: "classify",
      help: [{ label: "Pista", message: "Piensa en qué elimina cada aparato: partículas, aceite o agua." }],
      title: "¿Qué quita cada aparato?",
      question: "Asigna cada elemento.",
      groups: [
        { id: "particulas", label: "Partículas sólidas", tone: "amber" },
        { id: "aceite", label: "Aceite del compresor", tone: "cobalt" },
        { id: "agua", label: "Agua", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Filtro", group: "particulas" },
        { id: "b", text: "Separador", group: "aceite" },
        { id: "c", text: "Colector de condensación", group: "agua" },
        { id: "d", text: "Purgador en un punto bajo de la red", group: "agua" },
      ],
      hint: "Tres aparatos, tres contaminantes.",
      explanation: "Filtros (partículas), separadores (aceite) y colectores de condensación (agua).",
    },
    {
      id: "check-red",
      type: "predict",
      help: [{ label: "Pista", message: "El depósito está justo después del compresor." }],
      title: "Misión del depósito",
      question: "¿Cuál es la misión principal del depósito de una instalación neumática?",
      mode: "choice",
      choices: [
        { id: "mantener", label: "Mantener un nivel de presión adecuado acumulando aire, y seguir funcionando si falla el compresor un rato" },
        { id: "comprimir", label: "Comprimir el aire", incorrectFeedback: "Eso lo hace el compresor." },
        { id: "filtrar", label: "Eliminar el polvo del aire", incorrectFeedback: "Para eso están los filtros." },
      ],
      correctChoiceId: "mantener",
      shuffleChoices: true,
      explanation: "El depósito estabiliza la presión y compensa picos de consumo.",
    },
  ],
};
