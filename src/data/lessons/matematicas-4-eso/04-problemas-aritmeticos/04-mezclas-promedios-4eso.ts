import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const mezclasPromedios4esoLesson: InteractiveLesson = {
  slug: "mezclas-promedios-4eso",
  title: "4. Mezclas y promedios",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tabla",
      type: "slide",
      help: [
        {
          label: "Por qué la tabla",
          message: "En un problema de mezclas hay cantidades, precios y costes de varias cosas. Ordenarlos en una tabla evita mezclar columnas.",
        },
        {
          label: "Media ponderada",
          message: "El precio de la mezcla es una **media ponderada**: cada precio cuenta tanto como cantidad hay de él. No es la media de los dos precios.",
        },
      ],
      title: "Precio de una mezcla: coste total entre cantidad total",
      blocks: [
        {
          kind: "text",
          text: "Se muelen $50$ kg de café a $8{,}80$ €/kg y $30$ kg de otro a $6{,}40$ €/kg. ¿A cómo sale el kilo de la mezcla?",
        },
        {
          kind: "rule",
          formula: "\\text{precio de la mezcla} = \\dfrac{\\text{coste total}}{\\text{cantidad total}}",
        },
        {
          kind: "warning",
          text: "No es la media de los precios: $\\frac{8{,}80 + 6{,}40}{2} = 7{,}60$ pero hay **más café caro**, así que la mezcla sale a $7{,}90$.",
        },
      ],
      visual: { kind: "anim", scene: "mezcla-tabla", params: { nums: [50, 8.8, 30, 6.4], titles: ["café superior", "café inferior"], unit: "kg|€" } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Siempre entre los dos",
          message: "El precio de la mezcla está **siempre entre** el menor y el mayor de los precios, y más cerca del producto del que haya más cantidad.",
        },
      ],
      title: "Explora: a quién se acerca la mezcla",
      blocks: [
        {
          kind: "text",
          text: "Cambia las cantidades y los precios. La mezcla (verde) se coloca entre los dos precios y **se desplaza hacia el que hay más**.",
        },
      ],
      visual: { kind: "tool", tool: "mezcla-explorador", initial: [50, 880, 30, 640], hint: "Pon la misma cantidad de los dos: ¿dónde queda el precio de la mezcla?" },
    },
    {
      id: "check-cafe",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Tabla",
          message: "Costes: $12 \\cdot 12{,}40 = 148{,}80$ y $8 \\cdot 7{,}40 = 59{,}20$. Total $208$ € entre $20$ kg.",
        },
      ],
      title: "Dos cafés",
      question: "Un comerciante mezcla $12$ kg de café de $12{,}40$ €/kg con $8$ kg de café de $7{,}40$ €/kg. ¿A cuántos euros resulta el kilo de la mezcla? (escribe el número con coma)",
      correctAnswers: ["10,4", "10.4", "10,40"],
      explanation: "$\\dfrac{12 \\cdot 12{,}40 + 8 \\cdot 7{,}40}{20} = \\dfrac{208}{20} = 10{,}40$ €/kg.",
    },
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "Partes en vez de litros",
          message: "Si solo se dan las **proporciones** (2 partes y 1 parte), se trabaja con esas partes como si fueran las cantidades. El resultado es el mismo.",
        },
      ],
      title: "Cuando se dan proporciones",
      blocks: [
        {
          kind: "example",
          title: "Mezcla de aceites: 2 partes de oliva por 1 de girasol",
          lines: [
            { math: "\\text{oliva: } 2 \\cdot 3{,}40 = 6{,}80 \\qquad \\text{girasol: } 1 \\cdot 1{,}60 = 1{,}60" },
            { math: "\\dfrac{6{,}80 + 1{,}60}{2 + 1} = \\dfrac{8{,}40}{3} = 2{,}80\\ €/\\text{l}" },
          ],
        },
        {
          kind: "text",
          text: "Sirve igual con **tres o más** componentes: se suman todos los costes y todas las cantidades.",
        },
      ],
      visual: { kind: "anim", scene: "mezcla-tabla", params: { nums: [2, 3.4, 1, 1.6], titles: ["aceite de oliva", "aceite de girasol"], unit: "partes|€" } },
    },
    {
      id: "check-colonia",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Tres componentes",
          message: "Costes: $1 \\cdot 200 = 200$; $5 \\cdot 6 = 30$; $2 \\cdot 1 = 2$. Total $232$ € y $8$ litros.",
        },
      ],
      title: "Una colonia",
      question: "Una colonia se fabrica con $1$ l de esencia ($200$ €/l), $5$ l de alcohol ($6$ €/l) y $2$ l de agua destilada ($1$ €/l). ¿Cuánto cuesta un litro de colonia? (solo el número, en euros)",
      correctAnswers: ["29"],
      explanation: "$\\dfrac{200 + 30 + 2}{1 + 5 + 2} = \\dfrac{232}{8} = 29$ €/l.",
    },
    {
      id: "promedios",
      type: "slide",
      help: [
        {
          label: "Ley de una aleación",
          message: "La **ley** es la proporción de metal puro. Se mezcla igual que un precio: $\\frac{\\text{metal puro total}}{\\text{peso total}}$.",
        },
        {
          label: "Velocidad media",
          message: "La velocidad media es **distancia total entre tiempo total**, no la media de las velocidades. Va ponderada por el tiempo.",
        },
      ],
      title: "Otros promedios: ley y velocidad media",
      blocks: [
        {
          kind: "compare",
          left: { title: "Ley de una aleación", text: "$50$ g de ley $0{,}89$ y $90$ g de ley $0{,}75$: $\\dfrac{50 \\cdot 0{,}89 + 90 \\cdot 0{,}75}{140} = 0{,}80$." },
          right: { title: "Velocidad media", text: "$90$ km/h durante $20$ min y $120$ km/h durante $10$ min: $\\dfrac{30 + 20}{0{,}5\\ \\text{h}} = 100$ km/h." },
        },
        {
          kind: "warning",
          text: "La velocidad media **no es** la media de las velocidades ($105$): hay más tiempo a la lenta.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-media",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Distancias",
          message: "$90 \\cdot \\frac{20}{60} = 30$ km y $120 \\cdot \\frac{10}{60} = 20$ km. En total $50$ km en $30$ min $= 0{,}5$ h.",
        },
      ],
      title: "Velocidad media",
      question: "Un coche va a $90$ km/h durante $20$ min y a $120$ km/h durante los $10$ min siguientes. ¿Cuál es su velocidad media en km/h? (solo el número)",
      correctAnswers: ["100"],
      explanation: "Recorre $30 + 20 = 50$ km en $30$ min $= 0{,}5$ h: $50 : 0{,}5 = 100$ km/h.",
    },
    {
      id: "check-ley",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Oro puro",
          message: "Oro puro: $50 \\cdot 0{,}89 = 44{,}5$ g y $90 \\cdot 0{,}75 = 67{,}5$ g. Total $112$ g en $140$ g de aleación.",
        },
      ],
      title: "Ley del brazalete",
      question: "Se funden un anillo de oro de $50$ g y ley $0{,}89$ con una pulsera de $90$ g y ley $0{,}75$. ¿Cuál es la ley del brazalete? (escribe el número con coma)",
      correctAnswers: ["0,8", "0.8", "0,80"],
      explanation: "$\\dfrac{44{,}5 + 67{,}5}{140} = \\dfrac{112}{140} = 0{,}80$.",
    },
  ],
};
