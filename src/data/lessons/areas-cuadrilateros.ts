import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasCuadrilaterosLesson: InteractiveLesson = {
  slug: "areas-cuadrilateros",
  title: "1. Medidas en los cuadriláteros",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  steps: [
    {
      id: "contexto",
      type: "concept",
      title: "Área y perímetro",
      content: [
        "El **área** mide la superficie que ocupa una figura plana; el **perímetro** es la longitud de su contorno.",
        "Recuerda: **no hay relación fija** entre perímetro y área. Puedes tener figuras con el mismo perímetro y áreas muy distintas.",
        "Las mediciones pueden ser **directas** (con regla) o **indirectas** (calculando a partir de otras medidas).",
      ],
    },
    {
      id: "rectangulo",
      type: "concept",
      title: "Rectángulo y cuadrado",
      content: [
        "Rectángulo de base $a$ y altura $b$: $A = a \\cdot b$ y $P = 2a + 2b$.",
        "Cuadrado de lado $l$: $A = l^2$ y $P = 4l$.",
        "Si conoces el área de un cuadrado, el lado es $l = \\sqrt{A}$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Fórmulas básicas",
          items: [
            { title: "Rectángulo", math: "A = a \\cdot b", tone: "cobalt" },
            { title: "Cuadrado", math: "A = l^2", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "paralelogramo",
      type: "concept",
      title: "Paralelogramo y rombo",
      content: [
        "Todo paralelogramo se puede transformar en un rectángulo de base $b$ y altura $a$ (distancia entre lados opuestos). Entonces $A = a \\cdot b$.",
        "El perímetro con lados $b$ y $c$ es $P = 2b + 2c$, pero **no determina** el área: hace falta la altura.",
        "El **rombo** es un paralelogramo con lados iguales. Su área también vale $A = d \\cdot d' / 2$ si conoces las **diagonales** $d$ y $d'$.",
      ],
    },
    {
      id: "trapecio",
      type: "concept",
      title: "Trapecio",
      content: [
        "En un trapecio, los lados paralelos son las **bases** $b$ (mayor) y $b'$ (menor); $a$ es la **altura** (distancia entre bases).",
        "Duplicando el trapecio obtienes un paralelogramo de base $b + b'$ y altura $a$.",
        "Por tanto $A = \\dfrac{(b + b') \\cdot a}{2}$.",
      ],
    },
    {
      id: "ejemplo-habitacion",
      type: "animated_solution",
      title: "Ejemplo — habitación rectangular",
      content: ["Calculamos perímetro y área con las dimensiones del temario."],
      frames: [
        {
          caption: "Datos: $a = 6{,}4\\,\\mathrm{m}$, $b = 3{,}5\\,\\mathrm{m}$.",
          math: "P = 2(6{,}4 + 3{,}5) = 19{,}8\\,\\mathrm{m}",
        },
        {
          caption: "Superficie del suelo:",
          math: "A = 6{,}4 \\cdot 3{,}5 = 22{,}4\\,\\mathrm{m}^2",
        },
      ],
    },
    {
      id: "check-cuadrado",
      type: "multiple_choice",
      title: "Lado de un cuadrado",
      question: "¿Cuánto mide el lado de un cuadrado de $225\\,\\mathrm{cm}^2$ de área?",
      options: [
        { id: "a", text: "$12\\,\\mathrm{cm}$" },
        { id: "b", text: "$15\\,\\mathrm{cm}$" },
        { id: "c", text: "$22{,}5\\,\\mathrm{cm}$" },
      ],
      correctOptionId: "b",
      explanation: "$l = \\sqrt{225} = 15\\,\\mathrm{cm}$ porque $15^2 = 225$.",
    },
    {
      id: "check-rombo",
      type: "fill_in_blank",
      title: "Área de un rombo",
      question: "Las diagonales de un rombo miden $6\\,\\mathrm{cm}$ y $10\\,\\mathrm{cm}$. ¿Cuál es su área en $\\mathrm{cm}^2$?",
      correctAnswers: ["30", "30,0", "30.0"],
      explanation: "$A = \\dfrac{6 \\cdot 10}{2} = 30\\,\\mathrm{cm}^2$.",
    },
  ],
};
