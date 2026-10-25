import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_9_SUBTITLE } from "@/data/lessons/shared";

export const combArbolCcss1Lesson: InteractiveLesson = {
  slug: "comb-arbol-ccss1",
  title: "1. El diagrama en árbol",
  subtitle: TEMA_CCSS1_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "quiniela",
      type: "slide",
      help: [
        { label: "Pensar paso a paso", message: "Antes de cada paso pregúntate: ¿cuántas ramas salen de cada punto? Ese número se va multiplicando." },
        { label: "No hace falta dibujarlo", message: "Cuando solo quieres **contar**, puedes imaginar el árbol o dejarlo incompleto." },
      ],
      title: "Dos partidos, una quiniela",
      blocks: [
        { kind: "text", text: "En cada partido hay tres signos posibles: **1**, **X** o **2**. Para acertar la quiniela de dos partidos hay que rellenar todas las combinaciones." },
        { kind: "example", lines: [{ math: "3 \\cdot 3 = 9\\ \\text{quinielas}" }, { math: "\\text{con 4 partidos: } 3^4 = 81" }] },
      ],
      visual: { kind: "anim", scene: "arbol-conteo", params: { a: 3, b: 3, titles: ["1.er partido", "2.º partido"] } },
    },
    {
      id: "check-cuatro",
      type: "predict",
      mode: "numeric",
      help: [{ label: "En cada partido", message: "El resultado de un partido no depende de los anteriores: se multiplica por $3$ en cada uno." }],
      title: "Cuatro partidos",
      question: "¿Cuántas quinielas hay que rellenar para acertar con seguridad los resultados de $4$ partidos? (solo el número)",
      correctAnswers: ["81"],
      explanation: "$3 \\cdot 3 \\cdot 3 \\cdot 3 = 3^4 = 81$.",
    },
    {
      id: "trofeos",
      type: "slide",
      help: [{ label: "Sin repetir", message: "Si Antonio es campeón, ya no puede ser subcampeón: en el segundo paso quedan 3 aspirantes, no 4." }],
      title: "Cuando las opciones disminuyen",
      blocks: [
        { kind: "text", text: "Antonio, Beatriz, Carmen y Darío juegan la final de un campeonato. Hay una copa para el **campeón** y una placa para el **subcampeón**." },
        { kind: "example", lines: [{ math: "4 \\cdot 3 = 12\\ \\text{formas de repartir los trofeos}", note: "4 campeones; 3 subcampeones posibles para cada uno" }, { math: "4 \\cdot 3 \\cdot 2 \\cdot 1 = 24\\ \\text{clasificaciones finales}" }] },
      ],
      visual: { kind: "anim", scene: "arbol-conteo", params: { a: 4, b: 3, titles: ["Campeón", "Subcampeón"] } },
    },
    {
      id: "check-medallas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tres puestos", message: "Primera medalla: 12 candidatas; segunda: quedan 11; tercera: quedan 10." }],
      title: "Las medallas",
      question: "¿De cuántas formas se pueden repartir $3$ medallas (oro, plata, bronce) entre las $12$ participantes de una carrera? (solo el número)",
      correctAnswers: ["1320", "1 320"],
      explanation: "$12 \\cdot 11 \\cdot 10 = 1\\,320$ posibilidades.",
    },
    {
      id: "check-libros",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Libros distintos", message: "Alberto elige entre $10$; cuando elige Beatriz ese libro ya no está; y lo mismo con Claudia." }],
      title: "Elegir libros",
      question: "Alberto, Beatriz y Claudia eligen, por este orden, un libro cada uno entre $10$ libros distintos (no pueden coincidir). ¿De cuántas formas pueden hacer la elección? (solo el número)",
      correctAnswers: ["720"],
      explanation: "$10 \\cdot 9 \\cdot 8 = 720$.",
    },
    {
      id: "check-repetido",
      type: "predict",
      mode: "choice",
      help: [{ label: "Qué cambia entre pasos", message: "En las quinielas el número de opciones se mantiene; en los trofeos baja porque quien ya ha ganado no puede repetir." }],
      title: "¿Se repite o no?",
      question: "¿En cuál de estas situaciones **no** se pueden repetir elementos entre pasos?",
      choices: [
        { id: "a", label: "Repartir copa y placa entre cuatro jugadores" },
        { id: "b", label: "Rellenar una quiniela de 4 partidos", incorrectFeedback: "El mismo signo puede salir en varios partidos: se pueden repetir." },
        { id: "c", label: "Lanzar un dado 3 veces y anotar los resultados", incorrectFeedback: "Puede salir el mismo número varias veces: se pueden repetir." },
        { id: "d", label: "Formar un número de 3 cifras con dígitos cualesquiera", incorrectFeedback: "Las cifras se pueden repetir (por ejemplo, 777)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Una misma persona no puede ser campeón y subcampeón a la vez: el elemento ya usado desaparece.",
    },
  ],
};
