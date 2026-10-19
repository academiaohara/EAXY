import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasPoligonosLesson: InteractiveLesson = {
  slug: "areas-poligonos",
  title: "3. Medidas en los polígonos",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "irregular",
      type: "slide",
      help: [
        {
          label: "Divide y suma",
          message: "Traza segmentos para partir la figura en triángulos o rectángulos cuyas fórmulas conoces. Suma las áreas.",
        },
        {
          label: "¿Qué descomposición elijo?",
          message: "La que use menos piezas y cuyas alturas sean fáciles de medir.",
        },
      ],
      title: "Polígonos irregulares",
      blocks: [
        {
          kind: "definition",
          text: "Para hallar el área de un polígono cualquiera, se **descompone en triángulos** y se suman las áreas de cada uno.",
        },
        {
          kind: "text",
          text: "El perímetro sigue siendo la suma de todos los lados del contorno.",
        },
      ],
      visual: { kind: "anim", scene: "area-poligono-triangulos", beatMs: 3200 },
    },
    {
      id: "check-cuadrilatero",
      type: "fill_in_blank",
      help: [
        {
          label: "Dos triángulos rectángulos",
          message: "El cuadrilátero se parte con una diagonal en dos triángulos rectángulos. Calcula el área de cada uno con sus catetos.",
        },
        {
          label: "¿Qué lado es común?",
          message: "El lado de $5$ cm es hipotenusa del primero y cateto del segundo.",
        },
      ],
      title: "Un cuadrilátero irregular",
      question:
        "Un cuadrilátero se compone de dos triángulos rectángulos: uno de catetos 3 cm y 4 cm (hipotenusa 5 cm) y otro de catetos 5 cm y 12 cm (hipotenusa 13 cm). ¿Cuál es el área del cuadrilátero, en cm²? (escribe solo el número)",
      correctAnswers: ["36", "36 cm2", "36 cm²"],
      hint: "Suma las áreas de los dos triángulos.",
      explanation: "$A = \\dfrac{3 \\cdot 4}{2} + \\dfrac{5 \\cdot 12}{2} = 6 + 30 = 36\\,\\mathrm{cm}^2$. Su perímetro es $3 + 4 + 12 + 13 = 32$ cm.",
    },
    {
      id: "regular",
      type: "slide",
      help: [
        {
          label: "Triángulos desde el centro",
          message: "Une el centro con los vértices: salen $n$ triángulos iguales de base $l$ y altura $a$ (la apotema).",
        },
        {
          label: "¿Por qué sale $\\dfrac{P \\cdot a}{2}$?",
          message: "Porque $n$ triángulos de base $l$ suman una base total $n \\cdot l = P$, y todos tienen altura $a$.",
        },
      ],
      title: "Polígonos regulares",
      blocks: [
        {
          kind: "definition",
          text: "Un polígono **regular** se descompone en **tantos triángulos iguales como lados** tiene, de base $l$ y altura $a$, la **apotema**.",
        },
        {
          kind: "rule",
          title: "Área de un polígono regular",
          text: "Con $n$ lados y perímetro $P = n \\cdot l$:",
          formula: "A = \\dfrac{P \\cdot a}{2}",
        },
      ],
      visual: { kind: "anim", scene: "area-poligono-regular", beatMs: 3500 },
    },
    {
      id: "explora-regular",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Con el lado fijo, al añadir lados el polígono se acerca a un círculo: la apotema y el área crecen.",
        },
      ],
      title: "Explora: n triángulos iguales",
      blocks: [
        {
          kind: "text",
          text: "Cambia el número de lados y el lado. ¿Cuánto vale el área de un hexágono de lado $4$ cm?",
        },
      ],
      visual: { kind: "tool", tool: "poligono-regular-area", params: { n: 6, a: 4 } },
    },
    {
      id: "check-hexagono",
      type: "fill_in_blank",
      help: [
        {
          label: "Primero el perímetro",
          message: "Un hexágono tiene $6$ lados: $P = 6 \\cdot l$.",
        },
        {
          label: "Después el área",
          message: "Usa $A = \\dfrac{P \\cdot a}{2}$ con el perímetro y la apotema.",
        },
      ],
      title: "Hexágono regular",
      question:
        "Un hexágono regular tiene lado de 4 cm y apotema de 3,5 cm. ¿Cuál es su área en cm²? (escribe solo el número)",
      correctAnswers: ["42", "42 cm2", "42 cm²"],
      hint: "El perímetro es $6 \\cdot 4 = 24$ cm.",
      explanation: "$P = 6 \\cdot 4 = 24$ cm y $A = \\dfrac{24 \\cdot 3{,}5}{2} = 42\\,\\mathrm{cm}^2$.",
    },
    {
      id: "check-octogono",
      type: "fill_in_blank",
      help: [
        {
          label: "El orden de la cuenta",
          message: "Primero el perímetro (lados por lado) y después el área (perímetro por apotema entre dos).",
        },
        {
          label: "Comprueba la fórmula con algo conocido",
          message: "En un cuadrado de lado $10$ la apotema es $5$: $\\frac{40 \\cdot 5}{2} = 100$, el área esperada. La fórmula funciona.",
        },
      ],
      title: "Octógono regular",
      question:
        "El lado de un octógono regular mide 15 cm y su apotema, 18 cm. ¿Cuál es su área en cm²? (escribe solo el número)",
      correctAnswers: ["1080", "1 080", "1080 cm2", "1080 cm²"],
      hint: "El perímetro es $8 \\cdot 15$.",
      explanation: "$P = 8 \\cdot 15 = 120$ cm y $A = \\dfrac{120 \\cdot 18}{2} = 1\\,080\\,\\mathrm{cm}^2$.",
    },
    {
      id: "baldosa",
      type: "predict",
      help: [
        {
          label: "¿Qué piezas hay?",
          message: "Une el centro con los vértices: salen triángulos iguales. Calcula uno y multiplica por cuántos hay.",
        },
        {
          label: "¿Qué número no me sirve?",
          message: "La fórmula usa el perímetro total y la apotema. El lado y el radio no entran de forma directa.",
        },
      ],
      title: "Un patio hexagonal",
      question:
        "Un patio tiene forma de hexágono regular de 6 m de lado y 5,2 m de apotema. ¿Cuántos metros cuadrados de suelo hay que pavimentar?",
      mode: "choice",
      choices: [
        { id: "a", label: "$93{,}6\\ \\mathrm{m}^2$" },
        {
          id: "b",
          label: "$187{,}2\\ \\mathrm{m}^2$",
          incorrectFeedback: "$187{,}2$ es $P \\cdot a$ ($36 \\cdot 5{,}2$): falta dividir entre $2$, porque son triángulos.",
        },
        {
          label: "$31{,}2\\ \\mathrm{m}^2$",
          id: "c",
          incorrectFeedback: "$31{,}2$ es $6 \\cdot 5{,}2$: has usado el lado en lugar del perímetro y tampoco has dividido entre $2$.",
        },
        {
          id: "d",
          label: "$36\\ \\mathrm{m}^2$",
          incorrectFeedback: "$36$ es el **perímetro** del hexágono en metros ($6 \\cdot 6$); no es una superficie.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$P = 6 \\cdot 6 = 36$ m y $A = \\dfrac{36 \\cdot 5{,}2}{2} = 93{,}6\\ \\mathrm{m}^2$.",
    },
  ],
};
