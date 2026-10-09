import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const aproximacionRedondeoNaturalesLesson: InteractiveLesson = {
  slug: "aproximacion-redondeo-naturales",
  title: "2. Aproximación por redondeo",
  subtitle: TEMA_1_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "¿Por qué aproximamos?",
      content: [
        "Cuando un número tiene muchas cifras, conviene usar un valor **aproximado** más manejable, casi siempre terminado en ceros.",
        "En la vida real hablamos así: «la casa cuesta unos 270 000 €» en lugar de $268\\,251$ €, o «la ciudad tiene 6 millones de habitantes» en lugar de $6\\,035\\,192$.",
        "La forma más habitual es el **redondeo**: elegimos un orden (decenas, millares, millones…) y simplificamos.",
      ],
      visuals: [
        {
          kind: "number-line",
          title: "El precio de la vivienda, entre dos decenas de millar",
          min: 260_000,
          max: 270_000,
          step: 5_000,
          showPositiveSign: false,
          points: [
            { value: 260_000, label: "$260\\,000$", tone: "cobalt" },
            { value: 265_000, label: "$265\\,000$ · mitad", tone: "amber" },
            { value: 268_251, label: "$268\\,251$", tone: "rose" },
            { value: 270_000, label: "$270\\,000$", tone: "emerald" },
          ],
          caption:
            "$268\\,251$ está a $1\\,749$ de $270\\,000$ y a $8\\,251$ de $260\\,000$: está más cerca de $270\\,000$.",
        },
      ],
    },
    {
      id: "regla",
      type: "concept",
      title: "Regla del redondeo",
      content: [
        "Para **redondear** a un orden concreto:",
        "1. Sustituye por ceros todas las cifras a la derecha de ese orden.",
        "2. Si la primera cifra que quitas es $5$ o mayor, suma 1 a la cifra del orden elegido.",
        "Si es menor que $5$, dejas esa cifra igual.",
      ],
      warning:
        "No confundas «aproximar» con «truncar»: al truncar solo cortas cifras, sin mirar si debes subir.",
    },
    {
      id: "293518",
      type: "animated_solution",
      title: "Redondeando $293\\,518$",
      content: [
        "Vamos a redondear el mismo número a distintos órdenes, como en el libro.",
      ],
      frames: [
        {
          caption:
            "A las centenas de millar (miramos la cifra de decenas de millar: $9$):",
          math: "293\\,518 \\longrightarrow 300\\,000",
        },
        {
          caption: "A las decenas de millar (miramos la cifra de millar: $3$):",
          math: "293\\,518 \\longrightarrow 290\\,000",
        },
        {
          caption: "A los millares (miramos la cifra de centenas: $5$):",
          math: "293\\,518 \\longrightarrow 294\\,000",
        },
      ],
    },
    {
      id: "check-regla",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "redondeo-corte",
      title: "Marca dónde se corta el número",
      roundingExercise: { n: 24_963, orderId: "millares" },
    },
  ],
};
