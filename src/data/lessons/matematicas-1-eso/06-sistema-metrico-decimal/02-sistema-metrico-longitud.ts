import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoLongitudLesson: InteractiveLesson = {
  slug: "sistema-metrico-longitud",
  title: "2. Medida de la longitud",
  subtitle: TEMA_6_SUBTITLE,
  steps: [
    {
      id: "tabla",
      type: "concept",
      help: [
        {
          label: "La misma escalera",
          message: "Las unidades bajan de $10$ en $10$ desde el kilómetro hasta el milímetro. Aprende el orden y el resto sale.",
        },
        {
          label: "Referencias reales",
          message: "Un paso largo es casi un metro; el grosor de tu uña, un centímetro; el de la mina de un lápiz, un milímetro.",
        },
        {
          label: "Un truco para el orden",
          message: "Los prefijos están en orden alfabético inverso respecto a la escalera: kilo, hecto, deca… (de mayor a menor).",
        },
      ],
      title: "Unidades de longitud",
      content: [
        "La unidad base es el **metro**. Recuerda la escala (de diez en diez):",
        "$\\mathrm{km}$, $\\mathrm{hm}$, $\\mathrm{dam}$, $\\mathrm{m}$, $\\mathrm{dm}$, $\\mathrm{cm}$, $\\mathrm{mm}$.",
        "$1\\,\\mathrm{km} = 1000\\,\\mathrm{m}$, $1\\,\\mathrm{m} = 10\\,\\mathrm{dm} = 100\\,\\mathrm{cm} = 1000\\,\\mathrm{mm}$.",
      ],
    },
    {
      id: "cambio-coma",
      type: "concept",
      help: [
        {
          label: "¿Por qué la coma bajo la unidad?",
          message: "Porque marca dónde están las unidades enteras. Los saltos se cuentan desde ahí.",
        },
        {
          label: "Dirección",
          message: "Hacia una unidad más pequeña, el número crece (coma a la derecha). Hacia una más grande, decrece (a la izquierda).",
        },
        {
          label: "Un ejemplo con otra cantidad",
          message: "$3\\,\\mathrm{m}$ a $\\mathrm{cm}$: dos saltos hacia abajo, la coma se mueve dos lugares a la derecha: $300\\,\\mathrm{cm}$.",
        },
      ],
      title: "Cambios de unidad con la tabla",
      content: [
        "1. Escribe la cantidad en la columna de su unidad (pon la coma bajo la letra de la unidad).",
        "2. **Mueve la coma** tantos lugares como saltos haya hasta la unidad pedida (a la derecha si bajas de orden, a la izquierda si subes).",
        "Ejemplos del temario: $15\\,\\mathrm{km} \\rightarrow 15\\,000\\,\\mathrm{m}$; $0{,}062\\,\\mathrm{dam} \\rightarrow 6{,}2\\,\\mathrm{dm}$; $243\\,\\mathrm{cm} \\rightarrow 2{,}43\\,\\mathrm{m}$.",
      ],
    },
    {
      id: "compleja",
      type: "animated_solution",
      help: [
        {
          label: "¿Qué es compleja e incompleja?",
          message: "Compleja: varias unidades juntas ($2\\,\\mathrm{m}\\ 5\\,\\mathrm{dm}$). Incompleja: una sola ($2{,}5\\,\\mathrm{m}$).",
        },
        {
          label: "De compleja a incompleja",
          message: "Convierte cada parte a la unidad pedida y suma.",
        },
        {
          label: "De incompleja a compleja",
          message: "Coloca el número en la tabla y lee cada columna con su unidad, de mayor a menor.",
        },
      ],
      title: "Forma compleja e incompleja",
      content: [
        "**Compleja**: varias unidades ($2\\,\\mathrm{m}\\ 5\\,\\mathrm{dm}$). **Incompleja**: una sola ($2{,}5\\,\\mathrm{m}$ o $250\\,\\mathrm{cm}$).",
        "Resuelve el ejercicio del libro paso a paso.",
      ],
      frames: [
        {
          caption: "1.º Pasar $12{,}06\\,\\mathrm{hm}$ a forma compleja (tabla en hm):",
          math: "12{,}06\\,\\mathrm{hm} \\rightarrow 1\\,\\mathrm{km}\\ 2\\,\\mathrm{hm}\\ 6\\,\\mathrm{m}",
        },
        {
          caption: "2.º Pasar $3\\,\\mathrm{dam}\\ 8\\,\\mathrm{m}\\ 7\\,\\mathrm{cm}$ a metros:",
          math: "3\\,\\mathrm{dam} = 30\\,\\mathrm{m};\\ 8\\,\\mathrm{m};\\ 7\\,\\mathrm{cm} = 0{,}07\\,\\mathrm{m}",
        },
        {
          caption: "3.º Suma en metros:",
          math: "30 + 8 + 0{,}07 = 38{,}07\\,\\mathrm{m}",
        },
        {
          caption: "4.º Otra forma (ejemplo del temario):",
          math: "2\\,\\mathrm{m}\\ 5\\,\\mathrm{dm} = 2{,}5\\,\\mathrm{m} = 250\\,\\mathrm{cm}",
        },
      ],
    },
    {
      id: "grandes-pequenas",
      type: "concept",
      help: [
        {
          label: "¿Para qué más unidades?",
          message: "Porque el metro no sirve igual de bien para medir un átomo o la distancia a una galaxia.",
        },
        {
          label: "Referencias",
          message: "La micra es una milésima de milímetro (el tamaño de una bacteria). El año luz es lo que recorre la luz en un año.",
        },
      ],
      title: "Longitudes muy pequeñas y muy grandes",
      content: [
        "Más pequeñas que el milímetro: **micra** ($1\\,\\mu\\mathrm{m} = 0{,}001\\,\\mathrm{mm}$), **nanómetro**, **ángstrom** (distancias atómicas).",
        "Más grandes que el kilómetro: **unidad astronómica** (UA, distancia Tierra–Sol) y **año luz** (distancias entre galaxias).",
      ],
    },
    {
      id: "check-dm",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Crece o decrece el número?",
          message: "El centímetro es más pequeño que el metro: en un metro caben muchos. El número aumenta.",
        },
        {
          label: "Descomponlo",
          message: "$1{,}28\\,\\mathrm{m} = 1\\,\\mathrm{m} + 0{,}28\\,\\mathrm{m}$. Pasa cada parte a centímetros y suma.",
        },
      ],
      title: "Centímetros en un metro",
      question: "¿Cuántos centímetros hay en $1{,}28\\,\\mathrm{m}$? (solo el número)",
      correctAnswers: ["128", "128 cm"],
      hint: "Del metro al centímetro bajas dos escalones: multiplica por $100$.",
      explanation: "$1\\,\\mathrm{m} = 100\\,\\mathrm{cm}$, así $1{,}28\\,\\mathrm{m} = 128\\,\\mathrm{cm}$.",
    },
    {
      id: "check-metros",
      type: "fill_in_blank",
      help: [
        {
          label: "Pasa cada término a metros",
          message: "Convierte por separado kilómetros, hectómetros y decámetros a metros, y suma los tres resultados.",
        },
        {
          label: "Usa columnas",
          message: "Escribe una cifra por unidad ($\\mathrm{km}$, $\\mathrm{hm}$, $\\mathrm{dam}$, $\\mathrm{m}$) y lee el número de seguido.",
          branches: [
            {
              label: "Un ejemplo",
              message: "$2\\,\\mathrm{km}\\ 3\\,\\mathrm{hm}$ en metros: columnas $2 \\mid 3 \\mid 0 \\mid 0$, es decir, $2300\\,\\mathrm{m}$.",
            },
          ],
        },
        {
          label: "Si falta una unidad",
          message: "Si una unidad no aparece, su columna vale $0$. Aquí no hay metros sueltos.",
        },
      ],
      title: "Suma en metros",
      question:
        "Expresa en metros: $6\\,\\mathrm{km}\\ 4\\,\\mathrm{hm}\\ 8\\,\\mathrm{dam}$ (usa coma decimal, sin unidad).",
      correctAnswers: ["6480", "6480,0", "6480.0"],
      hint: "$6\\,\\mathrm{km} = 6000\\,\\mathrm{m}$, $4\\,\\mathrm{hm} = 400\\,\\mathrm{m}$, $8\\,\\mathrm{dam} = 80\\,\\mathrm{m}$.",
      explanation: "$6000 + 400 + 80 = 6480\\,\\mathrm{m}$.",
    },
  ],
};
