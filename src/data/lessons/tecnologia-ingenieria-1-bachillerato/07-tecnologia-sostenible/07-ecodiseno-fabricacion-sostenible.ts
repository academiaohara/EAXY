import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ecodisenoFabricacionSostenibleLesson: InteractiveLesson = {
  slug: "ecodiseno-fabricacion-sostenible",
  title: "7. Fabricación sostenible y ecodiseño",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Diseñar para el ciclo de vida", [
      { kind: "definition", text: "El **ecodiseño** integra el impacto ambiental desde el **principio** del diseño, cuando todavía se puede cambiar casi todo y cuesta poco: aproximadamente el 80 % del impacto de un producto se decide en esa fase." },
      { kind: "steps", items: [
        "**Reducir** materiales y energía: menos masa, menos piezas, menos tipos de material.",
        "**Diseño modular**: se cambia solo la pieza que falla o se mejora.",
        "**Reparabilidad**: tornillos en lugar de pegamento, piezas de repuesto, manuales.",
        "**Procesos menos contaminantes**: menos disolventes, energía renovable, reutilización del calor.",
        "**Envases y transporte**: menos embalaje, formas que se apilan, producción cercana.",
      ] },
    ], undefined, "stack"),
    slide("comparar", "Compara tres diseños de un móvil", [
      { kind: "text", text: "Compara un diseño sellado con pegamento, uno modular y uno reforzado y pesado. Cambia la importancia de masa, durabilidad, reparabilidad y consumo de recursos y razona qué diseño elegirías en cada caso." },
    ], tool("matriz-decision-explorador", { n: 4 }), "visual-top"),
    slide("material", "Elegir el material por su impacto", [
      { kind: "text", text: "El material influye mucho. Reciclar un metal ahorra mucha energía (sobre todo el aluminio). Experimenta con el porcentaje de contenido reciclado de un material." },
    ], tool("reciclaje-energia-explorador", { n: 0, a: 50, b: 10 }), "visual-top"),
    slide("envase", "Optimizar un envase", [
      { kind: "text", text: "Reducir el espesor de un envase sin perder función ahorra material en la fabricación y combustible en el transporte, que depende de la masa transportada. Pero conviene comprobar que sigue protegiendo el contenido: un envase que se rompe genera más residuo que el que ahorra." },
      { kind: "warning", title: "Cuidado con el «lavado verde»", text: "No basta con declarar «ecológico»: hay que poder demostrar con datos (análisis de ciclo de vida) que el impacto es menor que el del diseño anterior." },
    ]),
    calc("calc-envase", "Ahorro de material", "Un envase de $40$ g se rediseña con un $15\\,\\%$ menos de masa. Si se fabrican $1\\,000\\,000$ de unidades, ¿cuántos kg de material se ahorran?",
      nums(6000), "Ahorro por envase: $0{,}15\\cdot 40 = 6$ g. En $10^6$ unidades: $6\\cdot 10^6$ g $= 6\\,000$ kg.", "Calcula el ahorro por unidad y multiplícalo."),
    calc("calc-aluminio", "Aluminio reciclado", "Producir aluminio primario requiere $170$ MJ/kg y producirlo a partir de chatarra, $9$ MJ/kg. ¿Qué porcentaje de energía se ahorra al usar solo aluminio reciclado? (redondea a la unidad)",
      nums(95), "$1 - 9/170 = 0{,}947 \\approx 95\\,\\%$.", "1 menos el cociente de energías."),
    sort("clasifica-eco", "¿Ecodiseño o no?", "Decide qué decisiones de diseño siguen el ecodiseño.",
      [["si", "Ecodiseño", "emerald"], ["no", "Contrario al ecodiseño", "amber"]],
      [["Batería reemplazable por el usuario", "si"], ["Un solo tipo de plástico por pieza", "si"], ["Piezas con tornillos accesibles", "si"], ["Pegar todos los componentes", "no"], ["Mezclar cinco materiales inseparables", "no"], ["Obsolescencia programada", "no"]],
      "Modularidad, un solo material y uniones desmontables permiten reparar y reciclar; pegar y mezclar lo impide.",
    ),
    pick("check-diseno", "El momento de decidir", "¿Cuándo es más barato y eficaz reducir el impacto ambiental de un producto?",
      "En la fase de diseño, antes de fabricar nada",
      [["Cuando ya está en las tiendas", "Entonces cambiarlo exige rediseñar y retirar unidades."], ["Cuando el usuario lo tira", "Para entonces ya no se puede modificar casi nada."], ["Da igual cuándo", "La mayor parte del impacto se decide en el diseño."]],
      "Las decisiones de material, forma, uniones y procesos se toman en el diseño y condicionan todo el ciclo de vida.",
    ),
  ],
};
