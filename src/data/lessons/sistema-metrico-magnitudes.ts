import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_6_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMetricoMagnitudesLesson: InteractiveLesson = {
  slug: "sistema-metrico-magnitudes",
  title: "1. Magnitudes y el Sistema Métrico Decimal",
  subtitle: TEMA_6_SUBTITLE,
  steps: [
    {
      id: "magnitudes",
      type: "concept",
      title: "Qué es medir una magnitud",
      content: [
        "Para describir objetos usamos **magnitudes** medibles: longitud, peso, capacidad, superficie, temperatura…",
        "**Medir** es comparar una cantidad con otra fija llamada **unidad de medida**. La unidad debe ser **convencional** (conocida por todos).",
        "Si dices «mi jarra tiene 5 vasos» sin decir qué vaso usaste, la medida no sirve para comparar con otra persona.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Magnitudes del temario",
          items: [
            { title: "Longitud", math: "\\mathrm{m}", caption: "Distancias, alturas…", tone: "cobalt" },
            { title: "Capacidad", math: "\\mathrm{l}", caption: "Líquidos en recipientes.", tone: "emerald" },
            { title: "Peso", math: "\\mathrm{g}", caption: "Masa de los cuerpos (en la práctica, kg).", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "historia",
      type: "concept",
      title: "Por qué existe el S.M.D.",
      content: [
        "Antes cada región usaba unidades distintas (codos, fanegas, yugadas…). El **Sistema Métrico Decimal** se propuso en **1792** en Francia.",
        "Hoy lo usa la mayor parte del mundo. Las unidades fundamentales del temario son el **metro** (longitud), el **litro** (capacidad) y el **gramo** (peso).",
        "El meridiano terrestre mide unos $40\\,000\\,\\mathrm{km}$; el metro se relaciona con esa referencia histórica.",
      ],
    },
    {
      id: "prefijos",
      type: "concept",
      title: "Múltiplos y submúltiplos",
      content: [
        "Cada unidad tiene **múltiplos** (kilo, hecto, deca) y **submúltiplos** (deci, centi, mili).",
        "En longitud, capacidad y peso del S.M.D., **diez** unidades de un orden forman **una** del orden superior.",
        "Los prefijos valen para las tres magnitudes: por ejemplo $1\\,\\mathrm{km} = 1000\\,\\mathrm{m}$ y $1\\,\\mathrm{kg} = 1000\\,\\mathrm{g}$.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Prefijos (U = unidad base)",
          items: [
            { title: "kilo", math: "1000\\,\\mathrm{U}", tone: "cobalt" },
            { title: "hecto", math: "100\\,\\mathrm{U}", tone: "violet" },
            { title: "deca", math: "10\\,\\mathrm{U}", tone: "emerald" },
            { title: "deci", math: "0{,}1\\,\\mathrm{U}", tone: "amber" },
            { title: "centi", math: "0{,}01\\,\\mathrm{U}", tone: "rose" },
            { title: "mili", math: "0{,}001\\,\\mathrm{U}", tone: "cobalt" },
          ],
        },
      ],
    },
    {
      id: "check-magnitud",
      type: "multiple_choice",
      title: "Unidades y magnitudes",
      question: "¿Qué magnitud se mide con el gramo?",
      options: [
        { id: "a", text: "Longitud" },
        { id: "b", text: "Peso (masa)" },
        { id: "c", text: "Capacidad" },
      ],
      correctOptionId: "b",
      explanation: "En el S.M.D., la unidad principal de peso es el gramo (aunque en la vida diaria usamos kilogramos).",
    },
    {
      id: "check-kilo",
      type: "fill_in_blank",
      title: "Equivalencia",
      question: "¿Cuántos metros hay en un kilómetro? (solo el número)",
      correctAnswers: ["1000", "1.000"],
      hint: "El prefijo kilo significa mil.",
      explanation: "$1\\,\\mathrm{km} = 1000\\,\\mathrm{m}$.",
    },
  ],
};
