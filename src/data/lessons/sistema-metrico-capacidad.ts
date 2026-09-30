import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoCapacidadLesson: InteractiveLesson = {
  slug: "sistema-metrico-capacidad",
  title: "3. Medida de la capacidad",
  subtitle: TEMA_6_SUBTITLE,
  steps: [
    {
      id: "litro",
      type: "concept",
      title: "El litro",
      content: [
        "La unidad de **capacidad** es el **litro**: volumen de un cubo de $1\\,\\mathrm{dm}$ de arista ($1\\,\\mathrm{l} = 1\\,\\mathrm{dm}^3$).",
        "Escala (de diez en diez): $\\mathrm{kl}$, $\\mathrm{hl}$, $\\mathrm{dal}$, $\\mathrm{l}$, $\\mathrm{dl}$, $\\mathrm{cl}$, $\\mathrm{ml}$.",
        "$1\\,\\mathrm{kl} = 1000\\,\\mathrm{l}$, $1\\,\\mathrm{l} = 10\\,\\mathrm{dl} = 100\\,\\mathrm{cl} = 1000\\,\\mathrm{ml}$.",
      ],
    },
    {
      id: "cambios",
      type: "concept",
      title: "Cambios de unidad",
      content: [
        "Usa la misma tabla que en longitud: coloca la coma y desplázala según los saltos entre unidades.",
        "Ejemplos: $2{,}73\\,\\mathrm{kl} = 2730\\,\\mathrm{l}$; $560\\,\\mathrm{l} = 5{,}6\\,\\mathrm{hl}$; $60\\,\\mathrm{cl} = 0{,}6\\,\\mathrm{l}$; $0{,}0268\\,\\mathrm{l} = 26{,}8\\,\\mathrm{ml}$.",
      ],
    },
    {
      id: "resuelto",
      type: "animated_solution",
      title: "Ejercicios resueltos del temario",
      content: ["Paso a paso: forma compleja ↔ litros."],
      frames: [
        {
          caption: "a) $3\\,\\mathrm{kl}\\ 2\\,\\mathrm{dal}\\ 6\\,\\mathrm{l}\\ 5\\,\\mathrm{dl}$ → litros:",
          math: "3000 + 20 + 6 + 0{,}5 = 3026{,}5\\,\\mathrm{l}",
        },
        {
          caption: "b) $807{,}4\\,\\mathrm{l}$ → forma compleja:",
          math: "807{,}4\\,\\mathrm{l} = 8\\,\\mathrm{hl}\\ 7\\,\\mathrm{l}\\ 4\\,\\mathrm{dl}",
        },
        {
          caption: "Comprobación rápida (tabla en litros):",
          math: "8\\,\\mathrm{hl} = 800\\,\\mathrm{l};\\ +7\\,\\mathrm{l};\\ +4\\,\\mathrm{dl} = 0{,}4\\,\\mathrm{l}",
        },
      ],
    },
    {
      id: "check-hl",
      type: "multiple_choice",
      title: "Decilitros en un litro",
      question: "¿Cuántos decilitros hay en $1{,}3\\,\\mathrm{l}$?",
      options: [
        { id: "a", text: "$13\\,\\mathrm{dl}$" },
        { id: "b", text: "$130\\,\\mathrm{dl}$" },
        { id: "c", text: "$1{,}3\\,\\mathrm{dl}$" },
      ],
      correctOptionId: "a",
      explanation: "$1\\,\\mathrm{l} = 10\\,\\mathrm{dl}$, así $1{,}3\\,\\mathrm{l} = 13\\,\\mathrm{dl}$.",
    },
    {
      id: "check-ml",
      type: "fill_in_blank",
      title: "Mililitros",
      question: "Expresa $580\\,\\mathrm{ml}$ en litros (coma decimal).",
      correctAnswers: ["0,58", "0.58"],
      hint: "Divide entre $1000$ o mueve la coma tres lugares a la izquierda desde ml.",
      explanation: "$580\\,\\mathrm{ml} = 0{,}58\\,\\mathrm{l}$.",
    },
  ],
};
