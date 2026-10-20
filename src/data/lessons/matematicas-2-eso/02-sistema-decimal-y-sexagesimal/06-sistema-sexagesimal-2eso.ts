import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const sistemaSexagesimal2esoLesson: InteractiveLesson = {
  slug: "sistema-sexagesimal-2eso",
  title: "6. Sistema sexagesimal",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "base-60",
      type: "slide",
      help: [
        {
          label: "Un origen posible",
          message: "Se cree que viene de contar con las doce falanges de una mano usando el pulgar y, en la otra mano, los cinco dedos: $5 \\cdot 12 = 60$.",
        },
        {
          label: "Quiénes lo crearon",
          message: "Lo desarrollaron los babilonios hace unos cuatro mil años.",
        },
      ],
      title: "Contar de 60 en 60",
      blocks: [
        {
          kind: "definition",
          text: "El **sistema sexagesimal** se basa en agrupar de **60 en 60**, igual que el decimal agrupa de $10$ en $10$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "5 \\cdot 12 = 60", label: "doce falanges × cinco dedos" },
          ],
        },
        {
          kind: "text",
          text: "Hoy se usa para medir el **tiempo** y la **amplitud de los ángulos**: cada unidad se divide en $60$ de la inferior.",
        },
      ],
      visual: { kind: "anim", scene: "grado-minuto", beatMs: 3000 },
    },
    {
      id: "unidades",
      type: "slide",
      help: [
        {
          label: "Un truco",
          message: "De hora a segundo: $60 \\cdot 60 = 3\\,600$. Una hora tiene $3\\,600$ segundos.",
        },
        {
          label: "Mismo reparto en ángulos",
          message: "Un grado tiene $60'$ y un minuto de arco tiene $60''$: también $3\\,600''$ en un grado.",
        },
      ],
      title: "Tiempo y ángulos",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Tiempo",
            text: "hora (h) → minuto (min) → segundo (s)",
            math: ["1\\,\\text{h} = 60\\,\\text{min}", "1\\,\\text{min} = 60\\,\\text{s}", "1\\,\\text{h} = 3\\,600\\,\\text{s}"],
            tone: "ok",
          },
          right: {
            title: "Amplitud angular",
            text: "grado (°) → minuto (′) → segundo (″)",
            math: ["1^\\circ = 60'", "1' = 60''", "1^\\circ = 3\\,600''"],
            tone: "info",
          },
        },
        {
          kind: "text",
          text: "Para pasar a una unidad inferior se **multiplica por $60$**; para pasar a una superior, se **divide entre $60$**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "complejo-incomplejo",
      type: "slide",
      help: [
        {
          label: "Una sola unidad",
          message: "En forma incompleja la cantidad se expresa solo en una unidad: $75$ min, o $1{,}25$ h.",
        },
        {
          label: "Para resolver problemas",
          message: "Conviene pasar todo a una sola unidad (forma incompleja) antes de operar.",
        },
      ],
      title: "Forma compleja e incompleja",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Forma compleja",
            text: "Varias unidades a la vez.",
            math: ["1\\,\\text{h } 15\\,\\text{min}", "13^\\circ\\,12'"],
            tone: "ok",
          },
          right: {
            title: "Forma incompleja",
            text: "Una única unidad.",
            math: ["1{,}25\\,\\text{h} = 75\\,\\text{min}", "13{,}2^\\circ = 792'"],
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "a-incompleja",
      type: "slide",
      help: [
        {
          label: "Cada parte, a su unidad",
          message: "Convierte cada parte a la unidad final y suma: horas ×3600, minutos ×60, segundos tal cual.",
        },
        {
          label: "Si la unidad final es mayor",
          message: "Para pasar a minutos, los segundos se dividen entre $60$ y se obtiene un decimal.",
        },
      ],
      title: "De complejo a incomplejo",
      blocks: [
        {
          kind: "text",
          text: "Pasa **cada parte** a la unidad que pides y **suma**.",
        },
        {
          kind: "example",
          title: "3 h 10 min 50 s",
          lines: [
            { math: "3 \\cdot 3\\,600 + 10 \\cdot 60 + 50 = 11\\,450\\,\\text{s}" },
            { math: "3 \\cdot 60 + 10 + \\dfrac{50}{60} \\approx 190{,}83\\,\\text{min}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["A segundos", "A minutos"],
          expr: [
            { tokens: ["3h", "10min", "50s"], note: "pasamos cada parte a segundos." },
            { tokens: ["3·3600", "+", "10·60", "+", "50"], active: [0, 4], note: "horas ×3600, minutos ×60." },
            { tokens: ["10800", "+", "600", "+", "50"], fresh: [0, 0], note: "se suman." },
            { tokens: ["11450 s"], fresh: [0, 0], note: "forma incompleja en segundos." },
          ],
          expr2: [
            { tokens: ["3h", "10min", "50s"], note: "pasamos cada parte a minutos." },
            { tokens: ["3·60", "+", "10", "+", "50/60"], active: [0, 4], note: "horas ×60; los segundos, entre 60." },
            { tokens: ["180", "+", "10", "+", "0,83"], fresh: [0, 0], note: "se suman." },
            { tokens: ["190,83 min"], fresh: [0, 0], note: "forma incompleja en minutos (aprox.)." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "a-compleja",
      type: "slide",
      help: [
        {
          label: "Los restos son las unidades sueltas",
          message: "En cada división entre $60$, el cociente pasa a la unidad superior y el resto se queda en la inferior.",
        },
        {
          label: "Comprueba",
          message: "Vuelve a pasar a segundos: $2 \\cdot 3\\,600 + 7 \\cdot 60 + 4 = 7\\,624$.",
        },
      ],
      title: "De incomplejo a complejo",
      blocks: [
        {
          kind: "steps",
          items: [
            "Divide entre $60$: el **resto** son las unidades de esa clase.",
            "Divide el **cociente** otra vez entre $60$.",
            "El último cociente son las **unidades mayores**.",
          ],
        },
        {
          kind: "example",
          title: "7 624 s",
          lines: [
            { math: "7\\,624 : 60 = 127 \\quad (\\text{resto } 4\\,\\text{s})" },
            { math: "127 : 60 = 2 \\quad (\\text{resto } 7\\,\\text{min})" },
            { math: "7\\,624\\,\\text{s} = 2\\,\\text{h } 7\\,\\text{min } 4\\,\\text{s}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["7624 s"], note: "dividimos entre 60." },
            { tokens: ["7624", ":", "60", "=", "127", "resto 4"], active: [0, 2], note: "quedan $4$ s sueltos." },
            { tokens: ["127", ":", "60", "=", "2", "resto 7"], active: [0, 2], note: "quedan $7$ min sueltos." },
            { tokens: ["2h", "7min", "4s"], fresh: [0, 2], note: "$2$ horas, $7$ minutos y $4$ segundos." },
          ],
        },
      },
    },
    {
      id: "check-a-minutos",
      type: "fill_in_blank",
      help: [
        {
          label: "Horas a minutos",
          message: "Cada hora son $60$ min: $2 \\cdot 60$ y suma los $5$ min.",
        },
      ],
      title: "A minutos",
      question: "Expresa $2$ h $5$ min en minutos (solo el número)",
      correctAnswers: ["125"],
      explanation: "$2 \\cdot 60 + 5 = 125$ min.",
    },
    {
      id: "check-a-compleja",
      type: "predict",
      help: [
        {
          label: "Divide entre 60",
          message: "$4\\,000 : 60 = 66$ con resto $40$; después $66 : 60 = 1$ con resto $6$.",
        },
      ],
      title: "A horas, minutos y segundos",
      question: "Expresa $4\\,000$ s en horas, minutos y segundos.",
      mode: "choice",
      choices: [
        { id: "a", label: "$1$ h $6$ min $40$ s" },
        { id: "b", label: "$1$ h $40$ min $6$ s", incorrectFeedback: "Los restos están intercambiados: los segundos sueltos son $40$ y los minutos $6$." },
        { id: "c", label: "$6$ h $40$ min $1$ s", incorrectFeedback: "Comprueba: eso son más de $24\\,000$ s." },
        { id: "d", label: "$66$ h $40$ min", incorrectFeedback: "$66$ son los minutos totales, no las horas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$4\\,000 : 60 = 66$ (resto $40$ s); $66 : 60 = 1$ (resto $6$ min). Son $1$ h $6$ min $40$ s.",
    },
    {
      id: "suma-angulos",
      type: "slide",
      help: [
        {
          label: "Llevada de 60",
          message: "Cuando los minutos suman $60$ o más, se pasa $1$ a los grados por cada $60$.",
        },
        {
          label: "Con el tiempo es igual",
          message: "$2$ h $45$ min $+ 1$ h $30$ min $= 3$ h $75$ min $= 4$ h $15$ min.",
        },
      ],
      title: "Sumar en forma compleja",
      blocks: [
        {
          kind: "text",
          text: "Se suma **unidad con unidad**. Si una unidad llega a $60$ o más, se pasa a la unidad superior por cada $60$.",
        },
        {
          kind: "example",
          lines: [
            { math: "36^\\circ\\,45' + 82^\\circ\\,56' = 118^\\circ\\,101'" },
            { math: "101' = 1^\\circ\\,41' \\ \\Rightarrow\\  119^\\circ\\,41'" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "angulos-columna", params: { op: "+", a: 36, b: 45, c: 82, d: 56 } },
    },
    {
      id: "check-suma-tiempo",
      type: "predict",
      help: [
        {
          label: "Suma por separado",
          message: "Horas con horas ($2 + 1$) y minutos con minutos ($50 + 25$).",
        },
        {
          label: "Normaliza",
          message: "$75$ min no se queda así: son $1$ h y $15$ min.",
        },
      ],
      title: "Duración total",
      question: "Una película dura $2$ h $50$ min y otra $1$ h $25$ min. ¿Cuánto duran entre las dos?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4$ h $15$ min" },
        { id: "b", label: "$3$ h $75$ min", incorrectFeedback: "Es correcto sin normalizar, pero $75$ min es más de una hora: pásala a horas." },
        { id: "c", label: "$3$ h $15$ min", incorrectFeedback: "Se te ha olvidado la hora que sale de los $75$ min." },
        { id: "d", label: "$4$ h $75$ min", incorrectFeedback: "Has sumado una hora de más antes de normalizar." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2$ h $50$ min $+ 1$ h $25$ min $= 3$ h $75$ min $= 4$ h $15$ min.",
    },
  ],
};
