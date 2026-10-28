import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const consumoResponsableEsoLesson: InteractiveLesson = {
  slug: "consumo-responsable-eso",
  title: "2. Consumo responsable",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Comprar con cabeza", [
      { kind: "definition", text: "El **consumo responsable** consiste en elegir lo que compramos y usamos teniendo en cuenta su **impacto ambiental y social**, no solo su precio." },
      { kind: "steps", items: [
        "**¿Lo necesito?** Distinguir entre necesidad y deseo antes de comprar.",
        "**¿Es duradero y reparable?** Un producto que dura el doble gasta la mitad de recursos.",
        "**¿Tiene un envase excesivo?** Mejor a granel o con envase reutilizable.",
        "**¿De dónde viene?** Productos locales y de temporada reducen el transporte.",
      ] },
    ], undefined, "stack"),
    slide("obsolescencia", "Obsolescencia", [
      { kind: "compare",
        left: { title: "Obsolescencia programada", text: "El fabricante diseña el producto para que **dure poco** o deje de funcionar, y así comprar uno nuevo.", tone: "warn" },
        right: { title: "Obsolescencia percibida", text: "El producto funciona, pero **lo cambiamos** porque la moda o la publicidad dicen que está «anticuado».", tone: "info" } },
      { kind: "text", text: "Reparar, actualizar y reutilizar son la respuesta: en la Unión Europea ya se está regulando el «derecho a reparar»." },
    ]),
    slide("habitos", "Pequeños hábitos, gran efecto", [
      { kind: "text", text: "Activa los hábitos que podrías adoptar y mira cuánto se acumula al mes en CO₂, residuos y agua." },
    ], tool("consumo-habitos-explorador"), "visual-top"),
    sort("clasifica-consumo", "Consumo responsable o no", "Decide si cada acción es de consumo responsable.",
      [["res", "Responsable", "emerald"], ["irr", "Poco responsable", "rose"]],
      [["Reparar el móvil en vez de comprar otro", "res"], ["Llevar tu bolsa de tela al comprar", "res"], ["Comprar fruta de temporada de tu zona", "res"], ["Cambiar de zapatillas cada mes por moda", "irr"], ["Comprar agua en botellas pequeñas de plástico cada día", "irr"], ["Tirar los alimentos caducados sin planificar la compra", "irr"]],
      "El consumo responsable evita lo innecesario, alarga la vida de los productos y reduce residuos.",
    ),
    pick("check-compra", "Antes de comprar", "Quieres una mochila nueva y la tuya aún está bien, solo con una cremallera rota. ¿Qué es lo más responsable?",
      "Arreglar la cremallera y seguir usándola",
      [["Comprar otra y tirar la vieja", "Generas un residuo y consumes recursos sin necesidad."], ["Comprar dos para tener repuesto", "Aumenta el consumo y los residuos."], ["Tirarla y no tener mochila", "Una reparación sencilla resuelve el problema."]],
      "La primera pregunta es siempre: ¿puedo arreglarlo o seguir usándolo?",
    ),
    pick("check-obs", "Qué es la obsolescencia programada", "¿Qué es la obsolescencia programada?",
      "Diseñar un producto para que dure un tiempo limitado y haya que reemplazarlo",
      [["Un producto muy duradero", "Es lo contrario."], ["Una moda pasajera entre jóvenes", "Eso es la obsolescencia percibida (de moda)."], ["Una ley que obliga a reciclar", "No se refiere a una ley de reciclaje."]],
      "Un diseño que limita la vida útil aumenta las ventas, pero también los residuos.",
    ),
  ],
};
