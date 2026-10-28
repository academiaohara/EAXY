import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const impactoAmbientalProductosEsoLesson: InteractiveLesson = {
  slug: "impacto-ambiental-productos-eso",
  title: "1. Impacto ambiental de los productos tecnológicos",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Todo producto deja huella", [
      { kind: "definition", text: "El **impacto ambiental** es el efecto que una actividad o un producto produce en el entorno: consumo de recursos, contaminación, residuos y cambio climático." },
      { kind: "steps", items: [
        "**Consumo de recursos**: materias primas, energía y agua.",
        "**Emisiones**: gases que contaminan el aire o aumentan el efecto invernadero (CO₂).",
        "**Residuos**: lo que se desecha en cada etapa y al final de la vida del producto.",
      ] },
    ], undefined, "stack"),
    slide("ciclo", "El ciclo de vida de un producto", [
      { kind: "text", text: "El impacto no se produce solo cuando lo usamos: empieza antes de que llegue a nuestras manos y continúa cuando lo tiramos." },
    ], anim("ciclo-vida-producto-eso"), "text-top"),
    slide("explora", "¿Dónde está el impacto?", [
      { kind: "text", text: "Compara cuatro productos. Después alarga su vida útil y mira cómo disminuye el impacto de cada año." },
    ], tool("huella-producto-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-fase", "¿En qué fase ocurre?", "Relaciona cada impacto con la fase del ciclo de vida.",
      [["ext", "Extracción", "emerald"], ["fab", "Fabricación", "amber"], ["tra", "Transporte", "cobalt"], ["fin", "Fin de vida", "rose"]],
      [["Minas que alteran el paisaje", "ext"], ["Tala de bosques para obtener madera", "ext"], ["Fábricas que consumen energía y agua", "fab"], ["Emisiones de las chimeneas industriales", "fab"], ["Un barco que lleva piezas a otro continente", "tra"], ["Un camión de reparto", "tra"], ["Un móvil tirado en un vertedero", "fin"], ["Pilas que contaminan el suelo", "fin"]],
      "El impacto se reparte por todo el ciclo de vida: extracción, fabricación, transporte, uso y fin de vida.",
    ),
    pick("check-vida", "Alargar la vida útil", "Un móvil de 70 kg de CO₂ de huella se usa 2 años o se usa 5 años. ¿Cuál tiene menos impacto por año?",
      "El de 5 años: 14 kg al año frente a 35 kg al año",
      [["El de 2 años", "Cuanto menos se usa, más impacto por año."], ["Tienen el mismo impacto anual", "Al repartir la misma huella en más años, cada año pesa menos."], ["No se puede saber", "Basta dividir la huella entre los años: 70 ÷ 5 = 14 y 70 ÷ 2 = 35."]],
      "El impacto de fabricar un producto se reparte entre los años que se usa: alargar su vida lo reduce mucho.",
    ),
    pick("check-fase", "La fase que más pesa", "En un teléfono móvil, ¿en qué fase se concentra la mayor parte de su huella ambiental?",
      "En la fabricación y la obtención de materiales, antes de usarlo",
      [["En el uso diario", "La electricidad del uso pesa mucho menos que la fabricación."], ["En el transporte", "El transporte es una parte pequeña del total."], ["En el momento de tirarlo", "El fin de vida pesa poco comparado con la fabricación."]],
      "Por eso comprar menos, reparar y reutilizar es mejor que cambiar de móvil con frecuencia.",
    ),
  ],
};
