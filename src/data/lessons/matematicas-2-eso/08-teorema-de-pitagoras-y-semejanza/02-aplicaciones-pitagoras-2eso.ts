import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_8_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const aplicacionesPitagoras2esoLesson: InteractiveLesson = {
  slug: "aplicaciones-pitagoras-2eso",
  title: "2. Aplicaciones del teorema de Pitágoras",
  subtitle: TEMA_2ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "buscar-triangulo",
      type: "slide",
      help: [
        {
          label: "Busca un ángulo recto",
          message: "El teorema solo vale si hay un triángulo rectángulo. Muchas figuras lo esconden: diagonales, alturas, apotemas, radios.",
        },
        {
          label: "Dibuja el triángulo",
          message: "Haz un dibujo y marca el ángulo recto. Identifica cuál es la hipotenusa y qué lados conoces.",
        },
      ],
      title: "Descubrir triángulos rectángulos",
      blocks: [
        {
          kind: "text",
          text: "En muchas figuras hay un triángulo rectángulo escondido. Detectarlo permite calcular **longitudes desconocidas**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{diagonal de un rectángulo}" },
            { tex: "\\text{altura de un triángulo isósceles}" },
            { tex: "\\text{lado de un rombo}" },
            { tex: "\\text{apotema de un polígono regular}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "diagonal",
      type: "slide",
      help: [
        {
          label: "La diagonal es hipotenusa",
          message: "La diagonal divide el rectángulo en dos triángulos rectángulos: los lados del rectángulo son los catetos.",
        },
      ],
      title: "Diagonal de un rectángulo",
      blocks: [
        {
          kind: "rule",
          text: "Los lados de un rectángulo son catetos y la diagonal, la hipotenusa.",
          formula: "d = \\sqrt{\\text{largo}^2 + \\text{ancho}^2}",
        },
        {
          kind: "example",
          lines: [
            { math: "d = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10" },
            { math: "\\text{lados } 8 \\text{ y } 6 \\ \\Rightarrow\\  \\text{diagonal } 10" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "rombo",
      type: "slide",
      help: [
        {
          label: "Mitades de las diagonales",
          message: "Las diagonales de un rombo se cortan en perpendicular en sus puntos medios: cada lado es la hipotenusa de un triángulo con catetos iguales a la mitad de cada diagonal.",
        },
      ],
      title: "Lado de un rombo",
      blocks: [
        {
          kind: "text",
          text: "Las diagonales de un rombo miden $130$ cm y $144$ cm. ¿Cuánto mide su lado?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{catetos: } 130 : 2 = 65 \\text{ y } 144 : 2 = 72" },
            { math: "l = \\sqrt{65^2 + 72^2} = \\sqrt{4\\,225 + 5\\,184} = \\sqrt{9\\,409} = 97\\,\\text{cm}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "altura",
      type: "slide",
      help: [
        {
          label: "La altura parte la base",
          message: "En un triángulo isósceles o equilátero, la altura sobre la base la divide en dos mitades iguales.",
        },
        {
          label: "Aproximar",
          message: "$\\sqrt{75} = 8{,}660\\dots$ Redondeamos a las centésimas: $8{,}66$.",
        },
      ],
      title: "Altura de un triángulo equilátero",
      blocks: [
        {
          kind: "text",
          text: "Un triángulo equilátero de lado $10$ cm. Su altura lo parte en dos triángulos rectángulos de hipotenusa $10$ y un cateto $5$.",
        },
        {
          kind: "example",
          lines: [
            { math: "h^2 = 10^2 - 5^2 = 100 - 25 = 75" },
            { math: "h = \\sqrt{75} \\approx 8{,}66\\,\\text{cm}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-diagonal",
      type: "fill_in_blank",
      help: [
        {
          label: "Hipotenusa",
          message: "$24^2 + 7^2 = 576 + 49 = 625$.",
        },
      ],
      title: "Una pantalla",
      question: "Una pantalla rectangular mide $24$ cm de ancho y $7$ cm de alto. ¿Cuánto mide su diagonal en cm? (solo el número)",
      correctAnswers: ["25"],
      explanation: "$d = \\sqrt{24^2 + 7^2} = \\sqrt{625} = 25$ cm.",
    },
    {
      id: "check-escalera",
      type: "predict",
      help: [
        {
          label: "Dibuja",
          message: "La escalera es la hipotenusa; la distancia al suelo y la altura en la pared, los catetos.",
        },
        {
          label: "Cateto",
          message: "Como la escalera es la hipotenusa, la altura es la raíz de $2{,}5^2 - 1{,}5^2$.",
        },
      ],
      title: "Una escalera",
      question: "Una escalera de $2{,}5$ m se apoya en una pared con su base a $1{,}5$ m de ella. ¿A qué altura llega?",
      mode: "choice",
      choices: [
        { id: "2", label: "$2$ m" },
        { id: "1", label: "$1$ m", incorrectFeedback: "$1 \\text{ m}$ es la diferencia de longitudes. Hay que restar los cuadrados: $6{,}25 - 2{,}25 = 4$." },
        { id: "2.9", label: "$2{,}9$ m", incorrectFeedback: "Has sumado cuadrados: eso da la hipotenusa, pero la escalera ya es la hipotenusa." },
        { id: "4", label: "$4$ m", incorrectFeedback: "Has sumado las longitudes ($2{,}5 + 1{,}5$): no se puede, hay que usar cuadrados." },
      ],
      correctChoiceId: "2",
      shuffleChoices: true,
      explanation: "$h^2 = 2{,}5^2 - 1{,}5^2 = 6{,}25 - 2{,}25 = 4 \\Rightarrow h = 2$ m.",
    },
    {
      id: "check-altura",
      type: "fill_in_blank",
      help: [
        {
          label: "Hexágono",
          message: "En un hexágono regular de lado $12$, el apotema cumple $a^2 + 6^2 = 12^2$ (la mitad del lado es $6$).",
        },
      ],
      title: "Apotema de un hexágono",
      question: "Calcula el apotema de un hexágono regular de lado $12$ cm, redondeado a las décimas (escribe el número con coma).",
      correctAnswers: ["10,4", "10.4"],
      explanation: "$a = \\sqrt{12^2 - 6^2} = \\sqrt{108} = 10{,}39\\dots \\approx 10{,}4$ cm.",
    },
  ],
};
