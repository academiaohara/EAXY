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
      type: "fill_in_blank",
      help: [
        {
          label: "¿La unidad nueva es mayor o menor?",
          message: "El decilitro es más pequeño que el litro: caben más en lo mismo. Por eso el número tiene que crecer.",
        },
        {
          label: "Ordena la escalera",
          message: "Las unidades bajan de $10$ en $10$ en este orden; cada escalón hacia abajo multiplica por $10$.",
          math: [
            "\\mathrm{kl} \\to \\mathrm{hl} \\to \\mathrm{dal} \\to \\mathrm{l} \\to \\mathrm{dl} \\to \\mathrm{cl} \\to \\mathrm{ml}",
          ],
        },
        {
          label: "Mueve la coma",
          message: "Cada escalón desplaza la coma un lugar. Si te faltan cifras, añade ceros.",
        },
      ],
      title: "Decilitros en un litro",
      question: "¿Cuántos decilitros hay en $1{,}3\\,\\mathrm{l}$? (solo el número)",
      correctAnswers: ["13", "13 dl"],
      hint: "Del litro al decilitro bajas un escalón: multiplica por $10$.",
      explanation: "$1\\,\\mathrm{l} = 10\\,\\mathrm{dl}$, así $1{,}3\\,\\mathrm{l} = 13\\,\\mathrm{dl}$.",
    },
    {
      id: "check-ml",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Más grande o más pequeña?",
          message: "El litro es mayor que el mililitro, así que el número en litros tiene que ser menor que $580$.",
        },
        {
          label: "¿Cuántos escalones subo?",
          message: "De ml a l son tres escalones hacia arriba. Cada uno divide entre $10$.",
        },
        {
          label: "Comprueba el sentido",
          message: "Un litro son $1000$ ml. $580$ ml son menos que eso: ¿tu resultado es menos de un litro?",
        },
      ],
      title: "Mililitros",
      question: "Expresa $580\\,\\mathrm{ml}$ en litros (coma decimal).",
      correctAnswers: ["0,58", "0.58"],
      hint: "Divide entre $1000$ o mueve la coma tres lugares a la izquierda desde ml.",
      explanation: "$580\\,\\mathrm{ml} = 0{,}58\\,\\mathrm{l}$.",
    },
  ],
};
