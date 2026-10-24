import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const conicasGenerales1bachLesson: InteractiveLesson = {
  slug: "conicas-generales-1bach",
  title: "13. Cónicas con centro fuera del origen",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "traslacion",
      type: "slide",
      help: [{ label: "Como las rectas", message: "Es la misma idea que trasladar una recta: la curva se desplaza $h$ a la derecha y $k$ hacia arriba, y en la ecuación $x$ se sustituye por $x - h$ e $y$ por $y - k$." }],
      title: "Trasladar una cónica",
      blocks: [
        { kind: "rule", title: "Centro (o vértice) en (h, k)", text: "Se sustituye $x \\to x - h$ e $y \\to y - k$ en la ecuación reducida:" },
        { kind: "facts", items: [
          { tex: "(x - h)^2 + (y - k)^2 = r^2", label: "circunferencia" },
          { tex: "\\tfrac{(x-h)^2}{a^2} + \\tfrac{(y-k)^2}{b^2} = 1", label: "elipse" },
          { tex: "\\tfrac{(x-h)^2}{a^2} - \\tfrac{(y-k)^2}{b^2} = 1", label: "hipérbola" },
          { tex: "(y - k)^2 = 2p\\,(x - h)", label: "parábola" },
        ] },
      ],
      visual: { kind: "tool", tool: "conica-explorador", initial: [1, 4, 3, 2, -1], hint: "Mueve h y k: la curva se traslada sin cambiar de forma, y los focos van con ella." },
    },
    {
      id: "check-centro",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$(x - 2)^2$ da $h = 2$ y $(y + 1)^2 = (y - (-1))^2$ da $k = -1$." }],
      title: "El centro",
      question: "¿Cuál es el centro de la elipse $\\dfrac{(x - 2)^2}{16} + \\dfrac{(y + 1)^2}{9} = 1$?",
      choices: [
        { id: "a", label: "$(2,\\ -1)$" },
        { id: "b", label: "$(-2,\\ 1)$", incorrectFeedback: "Has cambiado los signos: $(x - 2)$ corresponde a $h = +2$ y $(y + 1)$ a $k = -1$." },
        { id: "c", label: "$(2,\\ 1)$", incorrectFeedback: "$(y + 1) = (y - (-1))$: $k = -1$, no $+1$." },
        { id: "d", label: "$(4,\\ 3)$", incorrectFeedback: "$4$ y $3$ son los semiejes $a$ y $b$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$h = 2$ y $k = -1$. Semiejes $a = 4$, $b = 3$; $c = \\sqrt{7}$ y focos $(2 \\pm \\sqrt{7},\\ -1)$.",
    },
    {
      id: "clasificar",
      type: "slide",
      help: [{ label: "Truco", message: "Si $x^2$ e $y^2$ tienen coeficientes del mismo signo, es elipse o circunferencia; de signos opuestos, hipérbola; si solo hay un cuadrado, parábola." }],
      title: "¿Qué cónica es?",
      blocks: [
        { kind: "steps", items: [
          "Mira los términos cuadráticos: si solo aparece **uno** ($y^2$ o $x^2$), es una **parábola**.",
          "Si aparecen $x^2$ e $y^2$ con el **mismo signo**: **elipse** (circunferencia si los coeficientes son iguales).",
          "Si aparecen con **signos distintos**: **hipérbola**.",
        ] },
        { kind: "example", lines: [
          { math: "4x^2 + 9y^2 = 36\\ \\Rightarrow\\ \\tfrac{x^2}{9} + \\tfrac{y^2}{4} = 1\\ \\text{(elipse)}" },
          { math: "x^2 - y^2 = 4\\ \\text{(hipérbola equilátera)}\\qquad y^2 = 6x\\ \\text{(parábola)}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Compara los signos de los términos en $x^2$ e $y^2$; con uno solo, parábola. Dividir entre el término independiente deja la forma reducida." }],
      title: "Reconoce la cónica",
      question: "Clasifica cada ecuación.",
      groups: [
        { id: "cir", label: "Circunferencia", tone: "cobalt" },
        { id: "eli", label: "Elipse", tone: "emerald" },
        { id: "hip", label: "Hipérbola", tone: "amber" },
        { id: "par", label: "Parábola", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$x^2 + y^2 = 9$", group: "cir" },
        { id: "b", text: "$\\dfrac{x^2}{4} + \\dfrac{y^2}{9} = 1$", group: "eli" },
        { id: "c", text: "$x^2 - 4y^2 = 4$", group: "hip" },
        { id: "d", text: "$y^2 = 6x$", group: "par" },
        { id: "e", text: "$4x^2 + 9y^2 = 36$", group: "eli" },
        { id: "f", text: "$xy = 5$", group: "hip" },
      ],
      hint: "$xy = 5$ es la hipérbola equilátera con los ejes como asíntotas.",
    },
    {
      id: "check-parabola",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(y - 1)^2 = 8(x - 2)$ tiene $2p = 8$, $p = 4$ y vértice $(2, 1)$; el foco está $\\frac{p}{2}$ a la derecha." }],
      title: "El foco de una parábola trasladada",
      question: "¿Cuál es la abscisa del foco de la parábola $(y - 1)^2 = 8(x - 2)$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "Vértice $(2, 1)$, $p = 4$ y el foco está en $\\left(2 + \\frac{p}{2}, 1\\right) = (4, 1)$.",
    },
    {
      id: "check-circ",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Completa cuadrados: $x^2 - 4x + y^2 + 2y = 4 \\to (x - 2)^2 + (y + 1)^2 = 9$." }],
      title: "El radio de una circunferencia trasladada",
      question: "¿Cuál es el radio de $x^2 + y^2 - 4x + 2y - 4 = 0$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$(x - 2)^2 + (y + 1)^2 = 4 + 4 + 1 = 9$: centro $(2, -1)$ y radio $3$.",
    },
  ],
};
