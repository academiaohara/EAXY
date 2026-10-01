import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasCirculoLesson: InteractiveLesson = {
  slug: "areas-circulo",
  title: "4. Medidas en el círculo",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  steps: [
    {
      id: "pi",
      type: "concept",
      title: "El número $\\pi$",
      content: [
        "La longitud de una circunferencia es algo más de **tres veces** su diámetro: $l = \\pi d = 2\\pi r$.",
        "Los egipcios usaron $\\pi \\approx 3{,}16$; Arquímedes lo acotó cerca de $3{,}141$. Hoy usamos $\\pi \\approx 3{,}14$ o $3{,}1416$.",
        "La letra $\\pi$ viene de *perifereia* (circunferencia en griego).",
      ],
    },
    {
      id: "perimetro",
      type: "concept",
      title: "Perímetro (longitud) del círculo",
      content: [
        "Al **perímetro** de un círculo también se le llama **longitud de la circunferencia**.",
        "$P = 2\\pi r = \\pi d$, con $r$ radio y $d$ diámetro.",
        "En problemas compuestos, suma los arcos y tramos rectos que formen el contorno.",
      ],
    },
    {
      id: "area",
      type: "concept",
      title: "Área del círculo",
      content: [
        "Partiendo el círculo en sectores muy finos (casi triángulos de altura $r$), la suma de las bases es $2\\pi r$.",
        "El área resulta $A = \\pi r^2$.",
        "Para una **corona circular** (dos circunferencias concéntricas), resta áreas: $A = \\pi R^2 - \\pi r^2$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Círculo",
          items: [
            { title: "Longitud", math: "l = 2\\pi r", tone: "cobalt" },
            { title: "Área", math: "A = \\pi r^2", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "corona",
      type: "animated_solution",
      title: "Ejercicio resuelto — corona circular",
      content: ["Radios $5\\,\\mathrm{cm}$ y $3\\,\\mathrm{cm}$ (circunferencias concéntricas)."],
      frames: [
        {
          caption: "Área de la corona:",
          math: "A = \\pi \\cdot 5^2 - \\pi \\cdot 3^2 = 16\\pi \\approx 50{,}26\\,\\mathrm{cm}^2",
        },
        {
          caption: "Perímetro del recinto (las dos circunferencias):",
          math: "P = 2\\pi \\cdot 5 + 2\\pi \\cdot 3 = 16\\pi \\approx 50{,}26\\,\\mathrm{cm}",
        },
      ],
    },
    {
      id: "check-area",
      type: "fill_in_blank",
      title: "Área con el radio",
      question:
        "Un círculo tiene radio $4\\,\\mathrm{dm}$. Usando $\\pi \\approx 3{,}14$, ¿cuál es su área aproximada en $\\mathrm{dm}^2$?",
      correctAnswers: ["50,24", "50.24", "50,2", "50.2"],
      explanation: "$A = \\pi r^2 = 3{,}14 \\cdot 16 = 50{,}24\\,\\mathrm{dm}^2$.",
    },
    {
      id: "check-longitud",
      type: "multiple_choice",
      title: "Longitud de la circunferencia",
      question: "Diámetro $10\\,\\mathrm{m}$. ¿Cuál es la longitud aproximada con $\\pi \\approx 3{,}14$?",
      options: [
        { id: "a", text: "$31{,}4\\,\\mathrm{m}$" },
        { id: "b", text: "$314\\,\\mathrm{m}$" },
        { id: "c", text: "$78{,}5\\,\\mathrm{m}$" },
      ],
      correctOptionId: "a",
      explanation: "$l = \\pi d = 3{,}14 \\cdot 10 = 31{,}4\\,\\mathrm{m}$.",
    },
  ],
};
