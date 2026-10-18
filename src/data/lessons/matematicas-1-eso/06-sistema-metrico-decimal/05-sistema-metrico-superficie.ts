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
      help: [
        {
          label: "Contar cuadrados",
          message: "Medir una superficie es ver cuántos cuadrados de lado fijo caben. Por eso la unidad es un cuadrado.",
        },
        {
          label: "¿Por qué $100$ y no $10$?",
          message: "Un metro cuadrado tiene $10$ filas de $10$ decímetros cuadrados: $10 \\cdot 10 = 100$.",
        },
      ],
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
      help: [
        {
          label: "Dos escaleras",
          message: "En longitud cada escalón es $10$. En superficie, $100$: el cuadrado de $10$.",
        },
        {
          label: "Unidades agrarias",
          message: "La hectárea ($\\mathrm{hm}^2$), el área ($\\mathrm{dam}^2$) y la centiárea ($\\mathrm{m}^2$) tienen nombres propios para medir terrenos.",
        },
      ],
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
      help: [
        {
          label: "Dos lugares por salto",
          message: "Cada escalón mueve la coma dos lugares. Dos escalones, cuatro lugares.",
        },
        {
          label: "Comprueba el sentido",
          message: "Si pasas de $\\mathrm{m}^2$ a $\\mathrm{hm}^2$ (más grande), el número tiene que bajar mucho.",
        },
      ],
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
      help: [
        {
          label: "Mismo método, otro factor",
          message: "Convierte cada parte a la unidad pedida y suma, pero entre columnas se multiplica por $100$.",
        },
        {
          label: "Un ejemplo pequeño",
          message: "$2\\,\\mathrm{m}^2\\ 30\\,\\mathrm{dm}^2$ son $200\\,\\mathrm{dm}^2 + 30\\,\\mathrm{dm}^2 = 230\\,\\mathrm{dm}^2$.",
        },
      ],
      title: "Forma compleja en superficie",
      content: [
        "Puedes expresar $587{,}24\\,\\mathrm{hm}^2$ en km², hm², dam²… igual que con longitud, pero recuerda el factor **100** entre columnas.",
        "Ejemplo: $5\\,\\mathrm{km}^2\\ 48\\,\\mathrm{hm}^2\\ 25\\,\\mathrm{dam}^2$ se pasa a $\\mathrm{m}^2$ sumando: $5\\,000\\,000 + 480\\,000 + 2500\\,\\mathrm{m}^2$.",
      ],
    },
    {
      id: "check-dm2",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por qué no es $10$?",
          message: "En superficies hay que contar en dos direcciones: el largo y el ancho se multiplican por $10$ cada uno.",
        },
        {
          label: "Con la escalera de superficie",
          message: "En superficie, cada escalón de unidad multiplica por $100$, no por $10$. ¿Cuántos escalones hay de $\\mathrm{m}^2$ a $\\mathrm{dm}^2$?",
        },
      ],
      title: "Decímetros cuadrados en un metro cuadrado",
      question: "¿Cuántos $\\mathrm{dm}^2$ hay en $1\\,\\mathrm{m}^2$? (solo el número)",
      correctAnswers: ["100", "100 dm2"],
      hint: "Un cuadrado de $1\\,\\mathrm{m}$ de lado mide $10\\,\\mathrm{dm}$ de lado. ¿Cuántos cuadraditos de $1\\,\\mathrm{dm}$ caben?",
      explanation: "Un metro cuadrado son $10 \\times 10 = 100$ decímetros cuadrados.",
    },
    {
      id: "check-ha",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es una hectárea?",
          message: "Una hectárea es $1\\,\\mathrm{hm}^2$: un cuadrado de $100\\,\\mathrm{m}$ de lado, es decir, $10\\,000\\,\\mathrm{m}^2$.",
        },
        {
          label: "¿Más grande o más pequeña?",
          message: "La hectárea es mucho mayor que el metro cuadrado, así que el número de hectáreas es menor que $50\\,700$.",
        },
        {
          label: "Mueve la coma",
          message: "Como cada escalón de superficie son dos lugares, de $\\mathrm{m}^2$ a $\\mathrm{hm}^2$ la coma se desplaza cuatro lugares a la izquierda.",
        },
      ],
      title: "Hectáreas",
      question: "Expresa $50\\,700\\,\\mathrm{m}^2$ en hectáreas (coma decimal).",
      correctAnswers: ["5,07", "5.07"],
      hint: "Divide entre $10\\,000$ (1 ha = 1 hm²).",
      explanation: "$50\\,700 : 10\\,000 = 5{,}07\\,\\mathrm{ha}$.",
    },
  ],
};
