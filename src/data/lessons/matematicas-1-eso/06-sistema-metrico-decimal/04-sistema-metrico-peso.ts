import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoPesoLesson: InteractiveLesson = {
  slug: "sistema-metrico-peso",
  title: "4. Medida del peso",
  subtitle: TEMA_6_SUBTITLE,
  steps: [
    {
      id: "gramo",
      type: "concept",
      help: [
        {
          label: "¿Cuánto es un gramo?",
          message: "Muy poco: una pequeña gominola. Por eso en la vida diaria usamos más el kilogramo.",
        },
        {
          label: "Peso y masa",
          message: "En la escuela se usa «peso» para lo que mide la balanza; en física se llama masa.",
        },
        {
          label: "Unidades grandes",
          message: "El quintal son $100$ kg y la tonelada $1000$ kg.",
        },
      ],
      title: "El gramo y sus múltiplos",
      content: [
        "La unidad de **peso** (masa) es el **gramo**: peso del agua que cabe en $1\\,\\mathrm{cm}^3$.",
        "En la práctica usamos el **kilogramo** ($1\\,\\mathrm{kg} = 1000\\,\\mathrm{g}$).",
        "Escala: $\\mathrm{kg}$, $\\mathrm{hg}$, $\\mathrm{dag}$, $\\mathrm{g}$, $\\mathrm{dg}$, $\\mathrm{cg}$, $\\mathrm{mg}$ (de diez en diez).",
        "Para masas grandes: **quintal** ($1\\,\\mathrm{q} = 100\\,\\mathrm{kg}$) y **tonelada** ($1\\,\\mathrm{t} = 1000\\,\\mathrm{kg}$).",
      ],
    },
    {
      id: "cambios",
      type: "animated_solution",
      help: [
        {
          label: "¿Cuántos saltos?",
          message: "Cuenta los escalones entre las dos unidades: son los lugares que mueves la coma.",
        },
        {
          label: "Unidades fuera de la escalera",
          message: "La tonelada no está entre las siete de la escalera: $1\\,\\mathrm{t} = 1000\\,\\mathrm{kg}$, así que de kg a t divides entre $1000$.",
        },
      ],
      title: "Cambios de unidad (ejercicios resueltos)",
      content: ["Misma idea que longitud y capacidad: tabla y coma decimal."],
      frames: [
        {
          caption: "a) $0{,}0583\\,\\mathrm{kg}$ → gramos (tres saltos hasta g):",
          math: "0{,}0583 \\cdot 1000 = 58{,}3\\,\\mathrm{g}",
        },
        {
          caption: "b) $630\\,\\mathrm{cg}$ → gramos (dos saltos):",
          math: "630 : 100 = 6{,}3\\,\\mathrm{g}",
        },
        {
          caption: "c) $13\\,500\\,\\mathrm{kg}$ → toneladas:",
          math: "13\\,500 : 1000 = 13{,}5\\,\\mathrm{t}",
        },
      ],
    },
    {
      id: "compleja",
      type: "animated_solution",
      help: [
        {
          label: "Compleja a gramos",
          message: "Convierte cada unidad a gramos y suma. Cada parte menor que el gramo se escribe como decimal.",
        },
        {
          label: "Un problema con restas",
          message: "Pasa los dos pesos a la misma unidad (gramos) antes de restar.",
        },
      ],
      title: "Forma compleja",
      content: ["Ejemplos del libro con varias unidades."],
      frames: [
        {
          caption: "a) $8\\,\\mathrm{hg}\\ 6\\,\\mathrm{g}\\ 7\\,\\mathrm{dg}\\ 5\\,\\mathrm{cg}$ → gramos:",
          math: "800 + 6 + 0{,}7 + 0{,}05 = 806{,}75\\,\\mathrm{g}",
        },
        {
          caption: "b) $1206\\,\\mathrm{g}$ → forma compleja:",
          math: "1206\\,\\mathrm{g} = 1\\,\\mathrm{kg}\\ 2\\,\\mathrm{hg}\\ 6\\,\\mathrm{g}",
        },
        {
          caption: "c) Problema: perro $4\\,\\mathrm{kg}\\ 50\\,\\mathrm{g}$, después $3985\\,\\mathrm{g}$. Pelo cortado:",
          math: "4050 - 3985 = 65\\,\\mathrm{g}",
        },
      ],
    },
    {
      id: "check-kg",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Crece o decrece el número?",
          message: "El gramo es más pequeño que el kilogramo: en cada kilo caben muchos gramos. El número crece.",
        },
        {
          label: "Descomponlo",
          message: "$4{,}08\\,\\mathrm{kg} = 4\\,\\mathrm{kg} + 0{,}08\\,\\mathrm{kg}$. Pasa cada parte a gramos.",
        },
        {
          label: "Cuidado con los ceros",
          message: "Al mover la coma tres lugares, a $4{,}08$ solo le quedan dos cifras decimales: tendrás que añadir un cero.",
        },
      ],
      title: "Kilogramos y gramos",
      question: "¿Cuántos gramos hay en $4{,}08\\,\\mathrm{kg}$? (solo el número)",
      correctAnswers: ["4080", "4.080", "4080 g"],
      hint: "Del kilogramo al gramo bajas tres escalones: mueve la coma tres lugares a la derecha.",
      explanation: "Multiplica por $1000$: $4{,}08 \\cdot 1000 = 4080\\,\\mathrm{g}$.",
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      help: [
        {
          label: "Usa columnas",
          message: "Una cifra por unidad ($\\mathrm{kg}$, $\\mathrm{hg}$, $\\mathrm{dag}$, $\\mathrm{g}$) y lee el número de seguido.",
          branches: [
            {
              label: "Un ejemplo",
              message: "$3\\,\\mathrm{kg}\\ 2\\,\\mathrm{hg}\\ 5\\,\\mathrm{g}$: columnas $3 \\mid 2 \\mid 0 \\mid 5$, es decir, $3205\\,\\mathrm{g}$. El $0$ marca la unidad que no aparece.",
            },
          ],
        },
        {
          label: "Quiero saber si es razonable",
          message: "El resultado en gramos tiene que quedar un poco por encima de $5000$, que son los $5\\,\\mathrm{kg}$.",
        },
      ],
      title: "Expresar en gramos",
      question: "Expresa en gramos: $5\\,\\mathrm{kg}\\ 3\\,\\mathrm{hg}\\ 7\\,\\mathrm{dag}\\ 8\\,\\mathrm{g}$ (solo número).",
      correctAnswers: ["5378", "5378,0", "5378.0"],
      hint: "$5\\,\\mathrm{kg} = 5000\\,\\mathrm{g}$, $3\\,\\mathrm{hg} = 300\\,\\mathrm{g}$, $7\\,\\mathrm{dag} = 70\\,\\mathrm{g}$.",
      explanation: "$5000 + 300 + 70 + 8 = 5378\\,\\mathrm{g}$.",
    },
  ],
};
