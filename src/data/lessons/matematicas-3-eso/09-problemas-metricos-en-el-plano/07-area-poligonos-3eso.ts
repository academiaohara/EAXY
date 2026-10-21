import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const areaPoligonos3esoLesson: InteractiveLesson = {
  slug: "area-poligonos-3eso",
  title: "7. Área de los polígonos",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cualquiera",
      type: "slide",
      help: [
        {
          label: "Triángulos desde un vértice",
          message: "Traza todas las diagonales desde un mismo vértice: un polígono de $n$ lados se parte en $n - 2$ triángulos.",
        },
        {
          label: "Otras particiones",
          message: "También puedes partirlo en rectángulos, trapecios y triángulos si los datos lo facilitan.",
        },
      ],
      title: "Polígono cualquiera: se descompone en triángulos",
      blocks: [
        {
          kind: "text",
          text: "Para hallar el área de un polígono irregular se **descompone en triángulos** (o en figuras conocidas), se calcula el área de cada uno y se **suman**.",
        },
        {
          kind: "example",
          lines: [
            { math: "A = A_1 + A_2 + A_3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "area-poligono-triangulos" },
    },
    {
      id: "regular",
      type: "slide",
      help: [
        {
          label: "Apotema",
          message: "La apotema es el segmento del centro al punto medio de un lado: es la altura de cada triángulo.",
        },
        {
          label: "n triángulos",
          message: "Cada triángulo tiene área $\\frac{l \\cdot ap}{2}$; hay $n$, así que $A = n \\cdot \\frac{l \\cdot ap}{2} = \\frac{P \\cdot ap}{2}$.",
        },
      ],
      title: "Polígono regular",
      blocks: [
        {
          kind: "rule",
          text: "Un polígono regular de $n$ lados se descompone en $n$ triángulos iguales de base el lado $l$ y altura la **apotema** $ap$:",
          formula: "A = \\dfrac{P \\cdot ap}{2}",
        },
        {
          kind: "example",
          title: "Hexágono regular de lado 10 cm",
          lines: [
            { math: "ap = \\sqrt{10^2 - 5^2} \\approx 8{,}66\\ \\text{cm}" },
            { math: "A = \\dfrac{60 \\cdot 8{,}66}{2} \\approx 259{,}8\\ \\text{cm}^2" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "poligono-regular-area", params: { n: 6, a: 6 }, hint: "Cambia el número de lados y el lado: observa el área." },
    },
    {
      id: "pentagono",
      type: "slide",
      help: [
        {
          label: "Constante",
          message: "El factor $0{,}6882$ sale de la trigonometría; por ahora se usa como dato.",
        },
        {
          label: "Con Pitágoras",
          message: "En el hexágono, el triángulo central es equilátero y la apotema sale por Pitágoras con el lado y su mitad.",
        },
      ],
      title: "Apotema del pentágono regular",
      blocks: [
        {
          kind: "text",
          text: "En el **pentágono** regular es difícil obtener la apotema a partir del lado con lo que sabemos. Se usa esta relación:",
        },
        {
          kind: "formula",
          tex: "ap = l \\cdot \\sqrt{\\dfrac{25 + 10\\sqrt{5}}{10}} \\approx 0{,}6882\\,l",
        },
        {
          kind: "example",
          title: "Pentágono regular de lado 10 cm",
          lines: [
            { math: "ap \\approx 0{,}6882 \\cdot 10 = 6{,}88\\ \\text{cm}" },
            { math: "A = \\dfrac{50 \\cdot 6{,}88}{2} \\approx 172{,}05\\ \\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-hexagono",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Perímetro",
          message: "$P = 6 \\cdot 10 = 60$ cm; la apotema vale unos $8{,}66$ cm.",
        },
      ],
      title: "Hexágono regular",
      question: "Calcula el área de un hexágono regular de $10$ cm de lado, con la apotema $8{,}66$ cm, aproximada a las unidades. (solo el número, en cm²)",
      correctAnswers: ["260", "259,8", "259.8", "259,80"],
      explanation: "$A = \\frac{60 \\cdot 8{,}66}{2} = 259{,}8 \\approx 260$ cm².",
    },
    {
      id: "check-triangulos",
      type: "predict",
      help: [
        {
          label: "Un vértice",
          message: "Desde un vértice de un polígono de $n$ lados salen $n - 3$ diagonales que lo parten en $n - 2$ triángulos.",
        },
      ],
      title: "Triángulos en un polígono",
      question: "¿En cuántos triángulos se descompone un octógono (8 lados) trazando las diagonales desde un vértice?",
      mode: "choice",
      choices: [
        { id: "6", label: "$6$" },
        { id: "8", label: "$8$", incorrectFeedback: "Esos serían los de un polígono regular partido desde el centro; desde un vértice son $n - 2$." },
        { id: "5", label: "$5$", incorrectFeedback: "Son $8 - 2 = 6$." },
      ],
      correctChoiceId: "6",
      shuffleChoices: true,
      explanation: "$8 - 2 = 6$ triángulos.",
    },
    {
      id: "check-octogono",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cuántos lados",
          message: "El perímetro de un octógono regular de lado $6$ es $8 \\cdot 6 = 48$.",
        },
      ],
      title: "Octógono regular",
      question: "Un octógono regular de lado $6$ cm tiene apotema $7{,}24$ cm. ¿Cuál es su área, aproximada a las unidades? (solo el número, en cm²)",
      correctAnswers: ["174", "173,8", "173.8", "173,76", "173.76"],
      explanation: "$A = \\frac{48 \\cdot 7{,}24}{2} = 173{,}76 \\approx 174$ cm².",
    },
  ],
};
