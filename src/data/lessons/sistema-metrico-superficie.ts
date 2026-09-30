import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoSuperficieLesson: InteractiveLesson = {
  slug: "sistema-metrico-superficie",
  title: "5. Medida de la superficie",
  subtitle: TEMA_6_SUBTITLE,
  steps: [
    {
      id: "idea",
      type: "concept",
      title: "Unidades cuadradas",
      content: [
        "Medir una **superficie** es contar cuántos **cuadrados** de lado fijo ($1\\,\\mathrm{u.c.}$) caben en ella.",
        "La unidad del S.M.D. es el **metro cuadrado** ($\\mathrm{m}^2$).",
        "A diferencia de longitud, aquí cada salto de unidad multiplica o divide por **100** (no por 10): $1\\,\\mathrm{m}^2 = 100\\,\\mathrm{dm}^2$.",
      ],
    },
    {
      id: "escala",
      type: "concept",
      title: "Múltiplos y submúltiplos",
      content: [
        "$\\mathrm{km}^2$, $\\mathrm{hm}^2$, $\\mathrm{dam}^2$, $\\mathrm{m}^2$, $\\mathrm{dm}^2$, $\\mathrm{cm}^2$, $\\mathrm{mm}^2$.",
        "$1\\,\\mathrm{km}^2 = 1\\,000\\,000\\,\\mathrm{m}^2$; $1\\,\\mathrm{hm}^2 = 10\\,000\\,\\mathrm{m}^2$; $1\\,\\mathrm{dam}^2 = 100\\,\\mathrm{m}^2$.",
        "**Unidades agrarias**: $1\\,\\mathrm{ha} = 1\\,\\mathrm{hm}^2 = 10\\,000\\,\\mathrm{m}^2$; $1\\,\\mathrm{a} = 1\\,\\mathrm{dam}^2 = 100\\,\\mathrm{m}^2$; $1\\,\\mathrm{ca} = 1\\,\\mathrm{m}^2$.",
      ],
    },
    {
      id: "cambio",
      type: "animated_solution",
      title: "Cambios de unidad (de 100 en 100)",
      content: [
        "En la tabla, **cada salto desplaza la coma dos lugares** (dos saltos = cuatro lugares si vas de m² a hm²).",
      ],
      frames: [
        {
          caption: "a) $47\\,200\\,\\mathrm{m}^2$ → hectómetros cuadrados (dos saltos):",
          math: "47\\,200 : 10\\,000 = 4{,}72\\,\\mathrm{hm}^2",
        },
        {
          caption: "b) $6{,}2\\,\\mathrm{dm}^2$ → centímetros cuadrados (un salto):",
          math: "6{,}2 \\cdot 100 = 620\\,\\mathrm{cm}^2",
        },
        {
          caption: "c) $1{,}25\\,\\mathrm{a}$ → metros cuadrados:",
          math: "1{,}25 \\cdot 100 = 125\\,\\mathrm{m}^2",
        },
        {
          caption: "d) $252\\,800\\,\\mathrm{m}^2$ → hectáreas:",
          math: "252\\,800 : 10\\,000 = 25{,}28\\,\\mathrm{ha}",
        },
      ],
    },
    {
      id: "compleja",
      type: "concept",
      title: "Forma compleja en superficie",
      content: [
        "Puedes expresar $587{,}24\\,\\mathrm{hm}^2$ en km², hm², dam²… igual que con longitud, pero recuerda el factor **100** entre columnas.",
        "Ejemplo: $5\\,\\mathrm{km}^2\\ 48\\,\\mathrm{hm}^2\\ 25\\,\\mathrm{dam}^2$ se pasa a $\\mathrm{m}^2$ sumando: $5\\,000\\,000 + 480\\,000 + 2500\\,\\mathrm{m}^2$.",
      ],
    },
    {
      id: "check-dm2",
      type: "multiple_choice",
      title: "Decímetros cuadrados en un metro cuadrado",
      question: "¿Cuántos $\\mathrm{dm}^2$ hay en $1\\,\\mathrm{m}^2$?",
      options: [
        { id: "a", text: "$10$" },
        { id: "b", text: "$100$" },
        { id: "c", text: "$1000$" },
      ],
      correctOptionId: "b",
      explanation: "Un metro cuadrado son $10 \\times 10 = 100$ decímetros cuadrados.",
    },
    {
      id: "check-ha",
      type: "fill_in_blank",
      title: "Hectáreas",
      question: "Expresa $50\\,700\\,\\mathrm{m}^2$ en hectáreas (coma decimal).",
      correctAnswers: ["5,07", "5.07"],
      hint: "Divide entre $10\\,000$ (1 ha = 1 hm²).",
      explanation: "$50\\,700 : 10\\,000 = 5{,}07\\,\\mathrm{ha}$.",
    },
  ],
};
