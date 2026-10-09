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
          kind: "cards",
          title: "Ejemplos del temario",
          items: [
            {
              title: "Precio de una vivienda",
              math: "268\\,251 \\approx 270\\,000",
              caption: "Redondeo a las decenas de millar.",
              tone: "cobalt",
            },
            {
              title: "Población",
              math: "6\\,035\\,192 \\approx 6\\,000\\,000",
              caption: "Redondeo al millón más cercano.",
              tone: "emerald",
            },
          ],
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
      type: "predict",
      title: "Elige la cifra que manda",
      question:
        "Al redondear $24\\,963$ a los millares, ¿qué cifra debes mirar para decidir si el millar sube o se queda igual?",
      mode: "choice",
      choices: [
        { id: "centenas", label: "La cifra de las centenas ($9$)" },
        {
          id: "decenas",
          label: "La cifra de las decenas ($6$)",
          incorrectFeedback:
            "Debes mirar la primera cifra que queda a la derecha de los millares.",
        },
        {
          id: "millares",
          label: "La cifra de los millares ($4$)",
          incorrectFeedback:
            "Esa cifra puede subir; la decisión la toma la primera cifra que quitamos.",
        },
      ],
      correctChoiceId: "centenas",
      explanation:
        "Al redondear a los millares, la primera cifra que desaparece es la de las centenas: como es $9$, el resultado sube a $25\\,000$.",
    },
  ],
};
