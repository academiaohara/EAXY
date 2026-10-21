import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const solidificacionMetalesLesson: InteractiveLesson = {
  slug: "solidificacion-metales",
  title: "2. Solidificación de metales y aleaciones",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "curvas-enfriamiento",
      type: "slide",
      help: [
        {
          label: "¿Adónde va el calor durante el tramo horizontal?",
          message: "El metal sigue cediendo calor al entorno, pero ese calor sale del propio cambio de estado (calor latente de fusión), no de bajar la temperatura.",
        },
      ],
      title: "Curvas de enfriamiento",
      blocks: [
        {
          kind: "text",
          text: "En un **metal puro** la solidificación ocurre a **temperatura constante**. En un metal con otros elementos disueltos, en general, no.",
        },
        {
          kind: "definition",
          text: "**Subfusión**: el líquido se enfría por debajo de la temperatura de solidificación sin cristalizar. Es un estado inestable: una pequeña perturbación basta para que empiece a solidificar.",
        },
        {
          kind: "text",
          text: "La aleación **eutéctica** es la única que, con otros elementos, solidifica a temperatura constante como un metal puro.",
        },
      ],
      visual: { kind: "anim", scene: "curva-enfriamiento", beatMs: 4000 },
    },
    {
      id: "check-curva",
      type: "predict",
      help: [
        { label: "Mira el tramo horizontal", message: "En la curva de un metal puro hay un escalón: ¿qué pasa con la temperatura mientras dura?" },
      ],
      title: "Metal puro",
      question: "Mientras solidifica un **metal puro**, la temperatura:",
      mode: "choice",
      choices: [
        { id: "cte", label: "Se mantiene constante hasta completar la solidificación" },
        { id: "baja", label: "Disminuye progresivamente hasta completar la solidificación", incorrectFeedback: "Eso ocurre en una aleación no eutéctica, no en un metal puro." },
        { id: "sube", label: "Aumenta ligeramente por el calor latente", incorrectFeedback: "El calor latente se cede al entorno; la temperatura no sube (salvo el breve repunte tras la subfusión)." },
      ],
      correctChoiceId: "cte",
      shuffleChoices: true,
      explanation: "Es el tramo horizontal de la curva: todo el calor que se cede es calor latente.",
    },
    {
      id: "energia-fundir",
      type: "slide",
      help: [
        {
          label: "¿Por qué dos términos?",
          message: "Primero hay que subir la temperatura hasta la de fusión ($m\\,c\\,\\Delta t$). Después, ya a esa temperatura, se aporta la energía del cambio de estado ($m\\,C$).",
        },
      ],
      title: "Energía necesaria para fundir",
      blocks: [
        {
          kind: "rule",
          title: "Sin contar pérdidas",
          formula: "Q = m\\,c\\,\\Delta t \\;+\\; m\\,C",
          text: "$c$ es el calor específico, $\\Delta t$ la variación hasta la fusión y $C$ el calor latente de fusión.",
        },
        {
          kind: "example",
          title: "1 tm de aluminio desde 25 °C",
          lines: [
            { math: "Q_1 = 1\\,000 \\cdot 0{,}215 \\cdot (660 - 25) = 136\\,525\\ \\text{kcal}" },
            { math: "Q_2 = 1\\,000 \\cdot 92{,}7 = 92\\,700\\ \\text{kcal}" },
            { math: "Q = 229\\,225\\ \\text{kcal} \\;/\\; 861{,}24 = 266\\ \\text{kWh}", note: "1 kWh = 861,24 kcal" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "energia-fusion", params: { a: 2, b: 1000 } },
    },
    {
      id: "check-cobre",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        { label: "Calor específico", message: "En la tabla el cobre tiene $91$ cal/kg·°C, es decir, $0{,}091$ kcal/kg·°C." },
        { label: "Dos términos", message: "$Q_1 = m\\,c\\,\\Delta t$ con $\\Delta t = 1\\,083 - 25$ y $Q_2 = m\\,C$ con $C = 48{,}8$." },
      ],
      title: "Fundir una tonelada de cobre",
      question: "¿Qué energía, en kcal, hace falta para fundir $1$ tm de Cu desde $25$ °C? ($c = 0{,}091$ kcal/kg·°C; $C = 48{,}8$ kcal/kg; $T_s = 1\\,083$ °C). Solo el número, redondeado a la unidad.",
      correctAnswers: ["145078", "145.078"],
      explanation: "$Q_1 = 1\\,000 \\cdot 0{,}091 \\cdot 1\\,058 = 96\\,278$ kcal y $Q_2 = 48\\,800$ kcal. Total: $145\\,078$ kcal (unos $168$ kWh).",
    },
    {
      id: "etapas",
      type: "slide",
      help: [
        {
          label: "¿Qué es una dendrita?",
          message: "Un cristal con ramas, como un copo de nieve, que crece en las tres direcciones del espacio a partir del núcleo.",
        },
      ],
      title: "Etapas de la solidificación",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Nucleación**: se forman núcleos estables. Hace falta subenfriamiento para que los embriones no vuelvan a fundirse.",
            "**Cristalización**: cada núcleo crece formando dendritas.",
            "**Formación del grano**: los cristales se juntan y quedan separados por los bordes de grano.",
          ],
        },
        {
          kind: "rule",
          text: "Interesa un **grano pequeño**: más núcleos de cristalización. Por eso se añaden **afinadores de grano** al metal fundido.",
        },
      ],
      visual: { kind: "anim", scene: "solidificacion-etapas", beatMs: 4000 },
    },
    {
      id: "defectos",
      type: "slide",
      help: [
        {
          label: "¿Por qué se forman?",
          message: "Al enfriarse el metal se contrae. Si en la superficie libre o en el interior falta metal líquido que rellene el hueco, aparece un defecto.",
        },
      ],
      title: "Solidificación en molde y defectos",
      blocks: [
        {
          kind: "compare",
          left: { title: "Cerca de la pared", text: "Enfriamiento más rápido y el metal se adhiere al molde: muchos núcleos y **granos pequeños** (equiaxiales).", tone: "ok" },
          right: { title: "Hacia el centro", text: "Enfriamiento más lento: menos núcleos y **granos mayores**, en columnas perpendiculares a la pared.", tone: "warn" },
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{rechupe}", label: "falta de metal en la superficie libre del molde" },
            { tex: "\\text{sopladura}", label: "hueco en el interior por la contracción" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-sopladuras",
      type: "predict",
      help: [{ label: "Piensa en la contracción", message: "El metal ocupa menos volumen al solidificar. ¿Qué queda donde faltaba metal?" }],
      title: "Sopladuras",
      question: "Las sopladuras en los metales fundidos son:",
      mode: "choice",
      choices: [
        { id: "huecos", label: "Huecos que quedan al solidificar debido a la contracción del material" },
        { id: "aire", label: "Corrientes de aire que lo enfrían", incorrectFeedback: "No tienen que ver con el aire exterior, sino con el propio material que se contrae." },
        { id: "extrano", label: "Material extraño atrapado durante la solidificación", incorrectFeedback: "Eso serían inclusiones. Las sopladuras son huecos." },
      ],
      correctChoiceId: "huecos",
      shuffleChoices: true,
      explanation: "Son huecos en el interior; los rechupes, en cambio, aparecen en la superficie libre.",
    },
    {
      id: "check-grano",
      type: "predict",
      help: [{ label: "Núcleos", message: "Cada núcleo da origen a un grano. Si hay más núcleos en el mismo volumen, ¿cómo serán los granos?" }],
      title: "Afinadores de grano",
      question: "¿Qué efecto buscan los afinadores de grano que se añaden al metal fundido?",
      mode: "choice",
      choices: [
        { id: "pequeño", label: "Más núcleos de cristalización y, por tanto, granos más pequeños" },
        { id: "grande", label: "Menos núcleos para obtener granos grandes", incorrectFeedback: "Los granos grandes empeoran las propiedades mecánicas." },
        { id: "temp", label: "Bajar la temperatura de fusión del metal", incorrectFeedback: "No modifican la temperatura de fusión, sino el número de núcleos." },
      ],
      correctChoiceId: "pequeño",
      shuffleChoices: true,
      explanation: "Más núcleos significa más granos y más pequeños, lo que mejora las propiedades mecánicas.",
    },
  ],
};
