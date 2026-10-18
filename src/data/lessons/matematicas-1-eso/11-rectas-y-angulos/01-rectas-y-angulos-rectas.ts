import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const rectasYAngulosRectasLesson: InteractiveLesson = {
  slug: "rectas-y-angulos-rectas",
  title: "1. Rectas, semirrectas y segmentos",
  subtitle: TEMA_1ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "recta-semirrecta-segmento",
      type: "slide",
      help: [
        {
          label: "¿En qué se diferencian?",
          message: "Mira cuántos extremos tiene cada una: la recta, ninguno; la semirrecta, uno; el segmento, dos.",
        },
        {
          label: "¿Qué quiere decir «infinitos puntos»?",
          message: "Que por muchos puntos que marques, siempre cabe otro entre dos cualesquiera. No hay un último punto en la recta.",
        },
      ],
      title: "Recta, semirrecta y segmento",
      blocks: [
        {
          kind: "definition",
          text: "Una **recta** es una línea continua formada por infinitos puntos, sin principio ni fin.",
        },
        {
          kind: "text",
          text: "Las rectas se nombran con letras minúsculas: $r$, $s$, $t$…",
        },
        {
          kind: "compare",
          left: {
            title: "Semirrecta",
            text: "Tiene **principio, pero no fin**. Un punto cualquiera de una recta la divide en dos semirrectas.",
            tone: "key",
          },
          right: {
            title: "Segmento",
            text: "Es la parte de una recta **entre dos puntos**. Tiene principio y fin, así que se puede medir.",
            math: ["\\overline{MN}"],
            tone: "ok",
          },
        },
      ],
      visual: { kind: "anim", scene: "recta-semirrecta" },
    },
    {
      id: "laser",
      type: "predict",
      help: [
        {
          label: "¿Qué me piden?",
          message: "Qué figura describe mejor la trayectoria de la luz: ¿tiene un punto de salida? ¿Tiene un punto donde se detiene?",
        },
        {
          label: "Un descarte rápido",
          message: "Si tuviera principio y fin se podría medir con una regla; la luz del puntero, en cambio, sigue sin parar.",
        },
      ],
      title: "El puntero láser",
      question:
        "Apuntas con un láser al cielo de noche. El haz sale del puntero y sigue sin detenerse, perdiéndose en la oscuridad. ¿Qué figura geométrica lo representa mejor?",
      mode: "choice",
      choices: [
        { id: "a", label: "Una semirrecta" },
        {
          id: "b",
          label: "Una recta",
          incorrectFeedback:
            "Una recta no tiene principio: se extendería también por detrás del puntero. El haz sí empieza en el puntero.",
        },
        {
          id: "c",
          label: "Un segmento",
          incorrectFeedback:
            "Un segmento tiene un final, y aquí la luz no se detiene en ningún punto: continúa indefinidamente.",
        },
        {
          id: "d",
          label: "Un punto",
          incorrectFeedback:
            "Un punto no tiene longitud. El haz parte de un punto, el puntero, pero recorre una línea.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Tiene un principio (el puntero) y ningún final: es una **semirrecta**.",
    },
    {
      id: "posiciones",
      type: "slide",
      help: [
        {
          label: "¿Las perpendiculares son secantes?",
          message: "Sí. Son secantes porque se cortan en un punto; y además lo hacen formando ángulos de $90^\\circ$.",
        },
        {
          label: "¿Y si dos rectas se tocan en todos sus puntos?",
          message: "Entonces son la misma recta, no dos. Dos rectas distintas tienen como mucho **un** punto en común.",
        },
      ],
      title: "Posiciones relativas de dos rectas",
      blocks: [
        {
          kind: "rule",
          title: "Paralelas",
          text: "No se cortan nunca: no tienen ningún punto en común.",
          formula: "r \\parallel s",
        },
        {
          kind: "rule",
          title: "Secantes",
          text: "Se cortan en **un punto**.",
          formula: "r \\cap s = \\{P\\}",
        },
        {
          kind: "rule",
          title: "Perpendiculares",
          text: "Son secantes y forman un ángulo de $90^\\circ$.",
          formula: "r \\perp s",
        },
      ],
      visual: { kind: "anim", scene: "posiciones-rectas" },
    },
    {
      id: "explora-rectas",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Hay un único giro en el que la recta $s$ no corta a $r$ (paralela) y uno solo en el que forman esquinas rectas. En todos los demás son secantes.",
        },
      ],
      title: "Explora: gira la recta s",
      blocks: [
        {
          kind: "text",
          text: "La recta $s$ gira alrededor de $P$ mientras $r$ queda fija. Busca la posición en que **deja de cortar** a $r$ y la posición en que forman **cuatro esquinas iguales**.",
        },
        {
          kind: "warning",
          text: "Las rectas no terminan donde acaba el dibujo: si parecen no cortarse, comprueba si es porque se cortan más lejos.",
        },
      ],
      visual: { kind: "tool", tool: "rectas-posicion", params: { a: 60 } },
    },
    {
      id: "calles",
      type: "predict",
      help: [
        {
          label: "Dibújalo",
          message: "Haz un esquema con tres rectas: dos que van siempre a la misma distancia y una que las cruza.",
        },
        {
          label: "¿Qué dato decide?",
          message: "Fíjate en cómo son las esquinas que forma la calle Nueva: ¿rectas, o de otra amplitud?",
        },
      ],
      title: "Un plano de barrio",
      question:
        "En el plano de un barrio, la calle Mayor y la calle del Sol van siempre a la misma distancia y no llegan a cruzarse. La calle Nueva corta a las dos formando esquinas de 90°. ¿Cómo es la calle Nueva respecto de la calle Mayor?",
      mode: "choice",
      choices: [
        { id: "a", label: "Perpendicular" },
        {
          id: "b",
          label: "Paralela",
          incorrectFeedback:
            "Las paralelas no se cortan, y la calle Nueva sí cruza la calle Mayor. Paralelas son la Mayor y la del Sol entre sí.",
        },
        {
          id: "c",
          label: "Secante, pero no perpendicular",
          incorrectFeedback:
            "Formar esquinas de 90° es justo lo que hace perpendicular a una secante. Si el ángulo fuera otro, sí sería «solo» secante.",
        },
        {
          id: "d",
          label: "Coincidente",
          incorrectFeedback:
            "Coincidentes serían dos calles que son la misma. Aquí la Nueva cruza la Mayor en un solo punto.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Se cortan en un punto y forman ángulos de $90^\\circ$: son **perpendiculares**.",
    },
    {
      id: "esquinas",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué ángulo forman?",
          message: "Dos rectas perpendiculares forman cuatro ángulos iguales. Piensa en la esquina de una hoja de papel.",
        },
        {
          label: "Con una cuenta",
          message: "Alrededor de un punto caben $360^\\circ$. Si hay cuatro ángulos iguales, reparte $360^\\circ$ entre cuatro.",
        },
      ],
      title: "Cuatro esquinas iguales",
      question:
        "Dos rectas se cortan formando cuatro ángulos iguales entre sí. ¿Cuántos grados mide cada uno? (escribe solo el número)",
      correctAnswers: ["90", "90º", "90°"],
      hint: "Alrededor de un punto completo hay $360^\\circ$.",
      explanation: "$360^\\circ : 4 = 90^\\circ$: las rectas son perpendiculares.",
    },
  ],
};
