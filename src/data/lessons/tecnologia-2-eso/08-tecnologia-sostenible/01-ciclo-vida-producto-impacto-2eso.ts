import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cicloVidaProductoImpacto2esoLesson: InteractiveLesson = {
  slug: "ciclo-vida-producto-impacto-2eso",
  title: "1. Ciclo de vida de un producto y su impacto",
  subtitle: TECESO2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Del origen al residuo", [
      { kind: "text", text: "Todo producto pasa por varias fases. Cada una consume recursos y genera impacto ambiental." },
    ], anim("ciclo-vida-producto-eso"), "text-top"),
    slide("fases", "Las fases y su impacto", [
      { kind: "steps", items: [
        "**Extracción**: minería, tala, petróleo… consumo de materias primas y de energía.",
        "**Fabricación**: transformación de los materiales; consumo de energía, agua y emisiones.",
        "**Transporte**: combustible y emisiones.",
        "**Uso**: energía, agua o consumibles que necesita el producto.",
        "**Fin de vida**: reutilización, reciclaje o vertedero.",
      ] },
      { kind: "text", text: "El **análisis del ciclo de vida (ACV)** mide el impacto de todas las fases para descubrir dónde conviene actuar." },
    ]),
    slide("impacto", "¿Dónde está el impacto?", [
      { kind: "text", text: "Elige un producto y observa qué fase pesa más. Los datos son orientativos, para entender las proporciones." },
    ], tool("eso2-ciclo-vida-fases-explorador"), "visual-top"),
    slide("huella", "Huella de un producto", [
      { kind: "text", text: "Compara la huella de distintos productos cotidianos." },
    ], tool("huella-producto-explorador"), "visual-top"),
    calc("calc-anual", "Impacto por año de uso", "Un móvil tiene un impacto total (ejemplo didáctico) de 60 kg de CO₂ equivalente. Si dura 4 años, ¿cuántos kg de CO₂ por año de uso son?", nums(15), "60 / 4 = 15 kg por año. Con 2 años serían 30: alargar la vida reduce el impacto anual.", "Impacto total entre los años de uso."),
    sort("clasifica-fase", "¿En qué fase ocurre?", "Relaciona cada actividad con su fase.",
      [["ext", "Extracción", "cobalt"], ["fab", "Fabricación", "amber"], ["uso", "Uso", "emerald"], ["fin", "Fin de vida", "rose"]],
      [["Extraer el mineral de una mina", "ext"], ["Talar árboles para obtener madera", "ext"], ["Fundir y moldear piezas", "fab"], ["Ensamblar una máquina en una fábrica", "fab"], ["Cargar el móvil cada noche", "uso"], ["Encender un frigorífico durante años", "uso"], ["Llevar el aparato al punto limpio", "fin"], ["Separar los plásticos para reciclarlos", "fin"]],
      "Cada actividad pertenece a una fase distinta del ciclo de vida.",
    ),
    pick("check-vida", "Alargar la vida", "En un producto cuyo mayor impacto está en la fabricación (como un móvil), ¿qué medida reduce más el impacto?",
      "Usarlo más años y repararlo en lugar de cambiarlo",
      [["Cambiarlo cada año por el modelo nuevo", "Cada fabricación suma impacto."], ["Cargarlo más rápido", "La fase de uso pesa poco en este producto."], ["Tirarlo a la basura común", "Pierde su valor y contamina."]],
      "Dividir el impacto de fabricación entre más años de uso lo reduce cada año.",
    ),
  ],
};
