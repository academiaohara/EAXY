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
      help: [
        {
          label: "¿Qué es medir?",
          message: "Comparar una cantidad con otra fija que todos aceptamos, la unidad.",
        },
        {
          label: "Un ejemplo que falla",
          message: "Si dices que tu jarra mide «5 vasos» sin decir qué vaso, nadie puede comparar contigo.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué hacía falta?",
          message: "Cada región tenía sus medidas. Comerciar o construir juntos se complicaba mucho.",
        },
        {
          label: "¿Por qué decimal?",
          message: "Porque cada unidad se relaciona con la siguiente multiplicando o dividiendo por $10$, como en nuestro sistema de numeración.",
        },
      ],
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
      help: [
        {
          label: "Los prefijos",
          message: "Kilo, hecto y deca multiplican por $1000$, $100$ y $10$. Deci, centi y mili dividen entre $10$, $100$ y $1000$.",
        },
        {
          label: "Valen para todo",
          message: "El mismo prefijo significa lo mismo con metros, gramos o litros: un kilómetro, un kilogramo, un kilolitro.",
        },
      ],
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
      type: "classify",
      help: [
        {
          label: "¿Qué mide cada una?",
          message: "Longitud: distancias. Peso (masa): cuánto pesa algo. Capacidad: cuánto cabe en un recipiente. Piensa qué medirías con esa unidad.",
        },
        {
          label: "Los prefijos no cambian la magnitud",
          message: "$\\mathrm{km}$, $\\mathrm{cm}$ y $\\mathrm{mm}$ miden lo mismo que el metro. Fíjate en la unidad base que queda al quitar el prefijo.",
        },
      ],
      title: "Unidades y magnitudes",
      question: "Coloca cada unidad junto a la magnitud que mide.",
      groups: [
        { id: "longitud", label: "Longitud", tone: "cobalt" },
        { id: "peso", label: "Peso (masa)", tone: "amber" },
        { id: "capacidad", label: "Capacidad", tone: "emerald" },
      ],
      items: [
        { id: "g", text: "Gramo ($\\mathrm{g}$)", group: "peso" },
        { id: "kg", text: "Kilogramo ($\\mathrm{kg}$)", group: "peso" },
        { id: "m", text: "Metro ($\\mathrm{m}$)", group: "longitud" },
        { id: "km", text: "Kilómetro ($\\mathrm{km}$)", group: "longitud" },
        { id: "cm", text: "Centímetro ($\\mathrm{cm}$)", group: "longitud" },
        { id: "l", text: "Litro ($\\mathrm{l}$)", group: "capacidad" },
        { id: "ml", text: "Mililitro ($\\mathrm{ml}$)", group: "capacidad" },
      ],
      hint: "Fíjate en la unidad principal que va detrás del prefijo: metro, gramo o litro.",
      explanation:
        "En el S.M.D. la longitud se mide en metros, el peso en gramos (aunque a diario usamos kilogramos) y la capacidad en litros; los prefijos no cambian la magnitud.",
    },
    {
      id: "check-kilo",
      type: "fill_in_blank",
      help: [
        {
          label: "Mira otros casos",
          message: "En «kilogramo» y «kilolitro» el prefijo significa lo mismo. ¿Cuántos gramos tiene un kilogramo?",
        },
        {
          label: "Aplícalo al metro",
          message: "Si «kilo» es el mismo número delante de cualquier unidad, ¿cuántas unidades base hay en un kilómetro?",
        },
      ],
      title: "Equivalencia",
      question: "¿Cuántos metros hay en un kilómetro? (solo el número)",
      correctAnswers: ["1000", "1.000"],
      hint: "El prefijo kilo significa mil.",
      explanation: "$1\\,\\mathrm{km} = 1000\\,\\mathrm{m}$.",
    },
  ],
};
