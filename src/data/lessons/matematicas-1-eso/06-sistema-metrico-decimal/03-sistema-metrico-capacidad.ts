import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoCapacidadLesson: InteractiveLesson = {
  slug: "sistema-metrico-capacidad",
  title: "3. Medida de la capacidad",
  subtitle: TEMA_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "litro-cambio",
      type: "slide",
      help: [
        {
          label: "¿Cuánto es un litro?",
          message: "Lo que cabe en un cubo de $10$ cm de arista: una botella grande de agua. Esa es la referencia para saber si un resultado es razonable.",
        },
        {
          label: "La escalera",
          message: "De diez en diez: bajar un escalón (de $\\mathrm{l}$ a $\\mathrm{dl}$) multiplica por $10$ y subirlo divide entre $10$.",
          math: [
            "\\mathrm{kl} \\to \\mathrm{hl} \\to \\mathrm{dal} \\to \\mathrm{l} \\to \\mathrm{dl} \\to \\mathrm{cl} \\to \\mathrm{ml}",
          ],
        },
        {
          label: "¿Hacia dónde muevo la coma?",
          message: "A una unidad menor el número crece (coma a la derecha); a una mayor, decrece (a la izquierda). Cuenta los saltos para saber cuántos lugares.",
        },
      ],
      title: "El litro y sus cambios de unidad",
      blocks: [
        {
          kind: "definition",
          text: "El **litro** ($\\mathrm{l}$) es la unidad de capacidad: lo que cabe en un recipiente cúbico de **1 dm de arista**.",
        },
        {
          kind: "text",
          text: "Sus múltiplos son $\\mathrm{kl}$, $\\mathrm{hl}$ y $\\mathrm{dal}$; sus submúltiplos, $\\mathrm{dl}$, $\\mathrm{cl}$ y $\\mathrm{ml}$. Van **de 10 en 10** y se cambian de unidad **igual que en longitud**: la coma se mueve tantos lugares como saltos.",
        },
        {
          kind: "example",
          lines: [
            { math: "560\\ \\mathrm{l} = 5{,}6\\ \\mathrm{hl}", note: "2 saltos a la izquierda" },
            { math: "0{,}0268\\ \\mathrm{l} = 26{,}8\\ \\mathrm{ml}", note: "3 saltos a la derecha" },
            { math: "60\\ \\mathrm{cl} = 0{,}6\\ \\mathrm{l}", note: "2 saltos a la izquierda" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tabla-unidades", params: { units: "l", dec: "2,73", from: "kl", to: "l" } },
    },
    {
      id: "check-cisterna",
      type: "predict",
      help: [
        {
          label: "¿Crece o decrece?",
          message: "El litro es mucho menor que el kilolitro, así que en litros el número tiene que ser mayor.",
        },
        {
          label: "Cuenta los escalones",
          message: "Del kilolitro al litro hay que bajar por $\\mathrm{hl}$ y $\\mathrm{dal}$. Ese número de saltos es cuántos lugares mueves la coma.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Un camión cisterna lleva miles de litros. Descarta lo que sea de cientos o de unidades.",
        },
      ],
      title: "El camión cisterna",
      question: "Un camión cisterna transporta 2,73 kl de agua. ¿Cuántos litros son?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2\\,730\\ \\mathrm{l}$" },
        {
          id: "b",
          label: "$273\\ \\mathrm{l}$",
          incorrectFeedback:
            "Has movido la coma dos lugares: eso serían hectolitros. Del kilolitro al litro hay **tres** saltos.",
        },
        {
          id: "c",
          label: "$27\\,300\\ \\mathrm{l}$",
          incorrectFeedback: "Has movido la coma cuatro lugares. Son tres saltos: $\\mathrm{kl} \\to \\mathrm{hl} \\to \\mathrm{dal} \\to \\mathrm{l}$.",
        },
        {
          id: "d",
          label: "$0{,}00273\\ \\mathrm{l}$",
          incorrectFeedback:
            "Has movido la coma a la izquierda. El litro es menor que el kilolitro: el número tiene que **crecer**.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Tres saltos a la derecha: $2{,}73\\ \\mathrm{kl} = 2\\,730\\ \\mathrm{l}$. Un camión cisterna lleva miles de litros: tiene sentido.",
    },
    {
      id: "check-aceite",
      type: "predict",
      help: [
        {
          label: "¿Crece o decrece?",
          message: "El litro es mayor que el mililitro, así que el número de litros tiene que ser menor que $750$.",
        },
        {
          label: "Cuenta los escalones",
          message: "De $\\mathrm{ml}$ a $\\mathrm{l}$ subes por $\\mathrm{cl}$ y $\\mathrm{dl}$. Mueve la coma ese número de lugares a la izquierda.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Una botella de aceite suele ser de un litro o menos. Un resultado de varios litros no encaja.",
        },
      ],
      title: "La botella de aceite",
      question: "Una botella de aceite tiene 750 ml. ¿Cuántos litros de aceite contiene?",
      mode: "choice",
      choices: [
        { id: "a", label: "$0{,}75\\ \\mathrm{l}$" },
        {
          id: "b",
          label: "$7{,}5\\ \\mathrm{l}$",
          incorrectFeedback:
            "Has movido la coma dos lugares. De $\\mathrm{ml}$ a $\\mathrm{l}$ hay tres saltos: $\\mathrm{ml} \\to \\mathrm{cl} \\to \\mathrm{dl} \\to \\mathrm{l}$.",
        },
        {
          id: "c",
          label: "$75\\ \\mathrm{l}$",
          incorrectFeedback: "Has movido la coma un solo lugar: eso son centilitros. Falta dar dos saltos más.",
        },
        {
          id: "d",
          label: "$0{,}075\\ \\mathrm{l}$",
          incorrectFeedback: "Has movido la coma cuatro lugares: te has pasado un salto más allá del litro.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Tres saltos a la izquierda: $750\\ \\mathrm{ml} = 0{,}75\\ \\mathrm{l}$, tres cuartos de litro.",
    },
    {
      id: "compleja",
      type: "slide",
      help: [
        {
          label: "Una columna por unidad",
          message: "Escribe las unidades en columnas ($\\mathrm{kl}$, $\\mathrm{hl}$, $\\mathrm{dal}$, $\\mathrm{l}$, $\\mathrm{dl}$, $\\mathrm{cl}$, $\\mathrm{ml}$) y pon cada cifra en la suya.",
        },
        {
          label: "¿Por qué ceros?",
          message: "Una columna vacía vale $0$ y hay que escribirlo para que cada cifra quede en su sitio.",
        },
        {
          label: "Un ejemplo pequeño",
          message: "$2\\,\\mathrm{l}\\ 3\\,\\mathrm{cl}$ en litros: $2$ unidades, $0$ decilitros y $3$ centilitros, es decir, $2{,}03\\,\\mathrm{l}$.",
        },
      ],
      title: "Forma compleja e incompleja con litros",
      blocks: [
        {
          kind: "rule",
          text: "Mismo método que con la longitud: cada parte en la columna de su unidad, **ceros** en las vacías y la coma tras la unidad pedida.",
        },
        {
          kind: "example",
          title: "Juntar (en la animación)",
          lines: [{ math: "3\\ \\mathrm{kl}\\ 2\\ \\mathrm{dal}\\ 6\\ \\mathrm{l}\\ 5\\ \\mathrm{dl} = 3\\,026{,}5\\ \\mathrm{l}" }],
        },
        {
          kind: "example",
          title: "Separar",
          lines: [
            {
              math: "807{,}4\\ \\mathrm{l} = 8\\ \\mathrm{hl}\\ 7\\ \\mathrm{l}\\ 4\\ \\mathrm{dl}",
              note: "la columna de los dal vale 0 y no se escribe",
            },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-unidades",
        params: { units: "l", parts: ["3 kl", "2 dal", "6 l", "5 dl"], to: "l" },
      },
    },
    {
      id: "check-jarabe",
      type: "predict",
      help: [
        {
          label: "Una cifra por columna",
          message: "Tras la coma, cada unidad (dl, cl, ml) ocupa **una sola** cifra, una detrás de otra.",
        },
        {
          label: "Pon la coma tras los litros",
          message: "Los $4$ litros van delante de la coma. Después, las cifras de $\\mathrm{dl}$, $\\mathrm{cl}$ y $\\mathrm{ml}$ en ese orden.",
        },
        {
          label: "Comprueba con una suma",
          message: "Pasa cada parte a litros ($0{,}2$, $0{,}05$, $0{,}007$) y súmalas: tiene que coincidir con tu número.",
        },
      ],
      title: "El jarabe de la farmacia",
      question:
        "Una farmacia prepara un jarabe con 4 l, 2 dl, 5 cl y 7 ml de líquido. ¿Cuántos litros hay en total?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$4{,}257\\ \\mathrm{l}$" },
        {
          id: "b",
          label: "$4{,}2057\\ \\mathrm{l}$",
          incorrectFeedback:
            "Has dejado un hueco de más: cada columna ($\\mathrm{dl}$, $\\mathrm{cl}$, $\\mathrm{ml}$) lleva **una sola** cifra, una detrás de otra.",
        },
        {
          id: "c",
          label: "$4{,}27\\ \\mathrm{l}$",
          incorrectFeedback:
            "Falta una cifra: has escrito $2\\ \\mathrm{dl}$ y $7\\ \\mathrm{ml}$ pero te has saltado la columna de los centilitros ($5\\ \\mathrm{cl}$).",
        },
        {
          id: "d",
          label: "$42{,}57\\ \\mathrm{l}$",
          incorrectFeedback:
            "El $4$ son $4$ litros, en la columna de los litros, justo a la izquierda de la coma: el resto va detrás.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$4\\ \\mathrm{l} + 0{,}2\\ \\mathrm{l} + 0{,}05\\ \\mathrm{l} + 0{,}007\\ \\mathrm{l} = 4{,}257\\ \\mathrm{l}$: dl, cl y ml ocupan cada uno una cifra tras la coma.",
    },
    {
      id: "check-perfume",
      type: "predict",
      help: [
        {
          label: "Busca números cómodos",
          message: "La unidad adecuada es la que da cifras de pocos dígitos, ni decimales minúsculos ni números enormes.",
        },
        {
          label: "Imagina el frasco",
          message: "Un frasco de perfume cabe en la palma de la mano. ¿Es más parecido a una botella, a un cubo o a una cucharilla?",
        },
        {
          label: "Compara con un litro",
          message: "Si el frasco es mucho menor que un litro, necesitas una unidad menor que el litro.",
        },
      ],
      title: "El frasco de perfume",
      question:
        "En la etiqueta de un frasco de perfume hay que indicar su capacidad. ¿Qué unidad resulta más adecuada?",
      mode: "choice",
      choices: [
        { id: "a", label: "El mililitro ($\\mathrm{ml}$)" },
        {
          id: "b",
          label: "El hectolitro ($\\mathrm{hl}$)",
          incorrectFeedback: "Un hectolitro son $100$ litros: el frasco sería mil veces más pequeño y saldría un decimal minúsculo.",
        },
        {
          id: "c",
          label: "El kilolitro ($\\mathrm{kl}$)",
          incorrectFeedback: "Un kilolitro son $1\\,000$ litros: sirve para depósitos de agua, no para un frasco.",
        },
        {
          id: "d",
          label: "El decalitro ($\\mathrm{dal}$)",
          incorrectFeedback: "Un decalitro son $10$ litros, el contenido de un cubo: demasiado grande para un perfume.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Conviene la unidad que dé números cómodos: un frasco de perfume tiene decenas o pocas centenas de mililitros.",
    },
  ],
};
