import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const impactoAmbientalProductosLesson: InteractiveLesson = {
  slug: "impacto-ambiental-productos",
  title: "4. Impacto ambiental de materiales y productos",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("fases", "El impacto está repartido en el ciclo de vida", [
      { kind: "text", text: "El impacto de un producto no está solo en su uso: aparece en la **extracción**, la **transformación**, el **transporte**, el **uso** y la **eliminación**. Pulsa cada fase y observa qué entra y qué sale." },
    ], anim("ciclo-vida-fases"), "split"),
    slide("tipos", "Tipos de impacto", [
      { kind: "steps", items: [
        "**Emisiones**: CO₂ y otros gases de efecto invernadero, óxidos de nitrógeno y azufre, partículas.",
        "**Residuos**: sólidos, peligrosos, electrónicos.",
        "**Contaminación** de agua y suelo (vertidos, lixiviados).",
        "**Uso de recursos**: agua, energía, suelo y materiales.",
      ] },
      { kind: "compare",
        left: { title: "Impacto local", text: "Ruido, polvo, vertidos en el entorno de una mina o fábrica.", tone: "info" },
        right: { title: "Impacto global", text: "Calentamiento global, pérdida de biodiversidad, agotamiento de recursos.", tone: "key" } },
    ]),
    slide("comparar", "Desechable frente a reutilizable", [
      { kind: "text", text: "Compara una botella de acero reutilizable con botellas de plástico de un solo uso. Desplaza el número de usos y busca el punto en el que el producto reutilizable compensa su impacto inicial." },
    ], tool("producto-impacto-explorador", { a: 20 }), "visual-top"),
    slide("durabilidad", "Durabilidad y reparabilidad", [
      { kind: "text", text: "Un producto que dura el doble reparte su impacto de fabricación entre el doble de uso. Por eso la **durabilidad** y la **reparabilidad** son criterios ambientales: una reparación casi siempre pesa menos que fabricar de nuevo." },
      { kind: "formula", tex: "\\text{impacto por año de uso} = \\dfrac{\\text{impacto total}}{\\text{años de vida}}" },
    ]),
    calc("calc-co2", "Convertir energía en CO₂", "Un aparato consume $500$ kWh al año y la electricidad emite $0{,}2$ kg de CO₂ por kWh. ¿Cuántos kg de CO₂ se emiten al año?",
      nums(100), "$500\\cdot 0{,}2 = 100$ kg de CO₂.", "Multiplica kWh por el factor de emisión."),
    calc("calc-anio", "Impacto por año", "Fabricar un electrodoméstico emite $300$ kg de CO₂. Si dura $10$ años, ¿cuántos kg de CO₂ de fabricación corresponden a cada año?",
      nums(30), "$300/10 = 30$ kg por año. Si durase 5 años serían 60.", "Divide entre los años de vida."),
    sort("clasifica-fase", "¿En qué fase ocurre?", "Asigna cada impacto a la fase del ciclo de vida.",
      [["ext", "Extracción", "amber"], ["fab", "Fabricación", "cobalt"], ["uso", "Uso", "emerald"], ["fin", "Fin de vida", "violet"]],
      [["Minería a cielo abierto", "ext"], ["Consumo de agua para el cultivo de algodón", "ext"], ["Emisiones de una fundición", "fab"], ["Residuos de proceso industrial", "fab"], ["Electricidad que gasta el aparato", "uso"], ["Pilas en un vertedero", "fin"], ["Plástico que acaba en el mar", "fin"]],
      "Cada impacto se localiza en la fase donde se produce, aunque el producto acabe en manos del usuario.",
    ),
    pick("check-global", "Local o global", "Las emisiones de CO₂ de una fábrica, ¿qué tipo de impacto producen principalmente?",
      "Global: contribuyen al cambio climático, sea cual sea el lugar donde se emitan",
      [["Solo local: afectan al barrio de la fábrica", "El CO₂ se mezcla en la atmósfera y actúa a escala planetaria."], ["Ninguno: el CO₂ es natural", "Es natural, pero el exceso antropogénico altera el clima."], ["Solo económico", "También hay impactos ambientales y sociales."]],
      "El CO₂ es un contaminante global; el polvo o el ruido, en cambio, son sobre todo locales.",
    ),
  ],
};
