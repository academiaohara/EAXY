import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_9_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const poligonosRegulares2esoLesson: InteractiveLesson = {
  slug: "poligonos-regulares-2eso",
  title: "3. Polígonos regulares",
  subtitle: TEMA_2ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regular",
      type: "slide",
      help: [
        {
          label: "Dos condiciones",
          message: "Lados iguales **y** ángulos iguales. Un rombo tiene lados iguales pero no ángulos; un rectángulo, ángulos iguales pero no lados.",
        },
        {
          label: "Centro y radio",
          message: "El centro es el centro de la circunferencia circunscrita (la que pasa por todos los vértices) y el radio es el de esa circunferencia.",
        },
      ],
      title: "Polígono regular",
      blocks: [
        {
          kind: "definition",
          text: "Un **polígono regular** tiene **todos sus lados iguales** y **todos sus ángulos iguales**. Todo polígono regular tiene una **circunferencia circunscrita**.",
        },
        {
          kind: "text",
          text: "El **centro** $O$ y el **radio** $r$ del polígono son los de esa circunferencia.",
        },
      ],
      visual: { kind: "anim", scene: "poligono-regular-circunscrito", beatMs: 3200 },
    },
    {
      id: "apotema",
      type: "slide",
      help: [
        {
          label: "Punto medio",
          message: "La apotema es perpendicular al lado y lo corta en su punto medio. Junto con el radio y media lado forma un triángulo rectángulo.",
        },
        {
          label: "Relación",
          message: "El radio es la hipotenusa: $r^2 = a^2 + (l/2)^2$.",
        },
      ],
      title: "La apotema",
      blocks: [
        {
          kind: "definition",
          text: "La **apotema** $a$ es el segmento perpendicular desde el centro $O$ a un lado $l$. Siempre corta al lado en su **punto medio**.",
        },
        {
          kind: "rule",
          text: "Radio, apotema y media lado forman un triángulo rectángulo (el radio es la hipotenusa).",
          formula: "r^2 = a^2 + \\left(\\dfrac{l}{2}\\right)^2",
        },
      ],
      visual: { kind: "anim", scene: "poligono-apotema", beatMs: 3200 },
    },
    {
      id: "explorador",
      type: "slide",
      help: [
        {
          label: "Ángulo central",
          message: "Un polígono regular de $n$ lados se parte en $n$ triángulos iguales; el ángulo central vale $360^\\circ : n$.",
        },
      ],
      title: "Explora un polígono regular",
      blocks: [
        {
          kind: "text",
          text: "Cambia el número de lados y el radio y observa la apotema y el lado.",
        },
      ],
      visual: { kind: "tool", tool: "poligono-regular-explorador", params: { n: 6, a: 6 }, hint: "Aumenta el número de lados: el polígono se parece cada vez más a una circunferencia." },
    },
    {
      id: "check-central",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide la vuelta",
          message: "Un ángulo completo mide $360^\\circ$ y se reparte entre los $8$ triángulos iguales.",
        },
      ],
      title: "Ángulo central",
      question: "¿Cuánto mide el ángulo central de un octógono regular, en grados? (solo el número)",
      correctAnswers: ["45"],
      explanation: "$360^\\circ : 8 = 45^\\circ$.",
    },
    {
      id: "check-apotema",
      type: "fill_in_blank",
      help: [
        {
          label: "Hexágono",
          message: "En un hexágono regular el lado es igual al radio: $r = 10$. La mitad del lado es $5$.",
        },
        {
          label: "Pitágoras",
          message: "$a = \\sqrt{10^2 - 5^2} = \\sqrt{75}$.",
        },
      ],
      title: "Apotema de un hexágono",
      question: "Un hexágono regular tiene $10$ cm de lado. ¿Cuánto mide su apotema, redondeada a las centésimas? (escribe el número con coma)",
      correctAnswers: ["8,66", "8.66"],
      explanation: "En un hexágono regular $r = l = 10$. $a = \\sqrt{10^2 - 5^2} = \\sqrt{75} \\approx 8{,}66$ cm.",
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Ambas condiciones",
          message: "Para ser regular, el polígono necesita lados iguales y ángulos iguales a la vez.",
        },
      ],
      title: "¿Regular o no?",
      question: "Decide si cada polígono es regular.",
      groups: [
        { id: "si", label: "Regular", tone: "emerald" },
        { id: "no", label: "No regular", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Cuadrado", group: "si" },
        { id: "b", text: "Triángulo equilátero", group: "si" },
        { id: "c", text: "Rectángulo no cuadrado", group: "no" },
        { id: "d", text: "Rombo no cuadrado", group: "no" },
        { id: "e", text: "Pentágono con todos los lados y ángulos iguales", group: "si" },
      ],
      explanation: "El rectángulo tiene ángulos iguales pero lados desiguales; el rombo tiene lados iguales pero ángulos desiguales.",
    },
  ],
};
