import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const recursosNaturalesConsumoLesson: InteractiveLesson = {
  slug: "recursos-naturales-consumo",
  title: "2. Recursos naturales y consumo",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Renovables y no renovables", [
      { kind: "compare",
        left: { title: "Renovables", text: "Se regeneran a un ritmo comparable al de su consumo: agua dulce, biomasa, madera, energía solar, eólica, hidráulica. Pueden agotarse si se explotan más rápido de lo que se renuevan.", tone: "ok" },
        right: { title: "No renovables", text: "Se forman en escalas geológicas: petróleo, gas, carbón, uranio y minerales metálicos. Reciclar los minerales permite reutilizarlos, pero el yacimiento no se regenera.", tone: "warn" } },
      { kind: "warning", title: "Sobreexplotación", text: "Extraer un recurso renovable por encima de su tasa de renovación lo convierte, en la práctica, en no renovable (acuíferos, bancos de pesca, bosques)." },
    ], undefined, "stack"),
    slide("mapa", "Mapa de recursos de un producto", [
      { kind: "text", text: "Elige un producto y un recurso. ¿En qué fase se concentra el consumo? Compara el smartphone, la camiseta y la botella." },
    ], tool("mapa-recursos-explorador", { n: 0 }), "visual-top"),
    slide("disponibilidad", "Disponibilidad y dependencias", [
      { kind: "steps", items: [
        "**Disponibilidad**: reservas conocidas, ritmo de consumo y dificultad de extracción.",
        "**Dependencia**: muchos materiales críticos (litio, cobalto, tierras raras) se concentran en pocos países.",
        "**Alternativas**: sustitución por otros materiales, reducción de la cantidad, reciclaje y reutilización.",
      ] },
      { kind: "text", text: "El consumo de agua incluye la **huella hídrica**: el agua directa que se usa y la oculta que ha hecho falta para producir el bien (cultivo, minería, proceso industrial)." },
    ]),
    calc("calc-agua", "Agua oculta", "Una camiseta de algodón necesita unos $2\\,700$ L de agua en total. ¿Cuántos litros se «gastan» por las $4$ camisetas que compra una persona al año?",
      nums(10800), "$4\\cdot 2700 = 10\\,800$ L al año.", "Multiplica por el número de camisetas."),
    sort("clasifica-recurso", "¿Renovable?", "Clasifica cada recurso.",
      [["ren", "Renovable", "emerald"], ["nor", "No renovable", "amber"]],
      [["Energía del viento", "ren"], ["Madera de bosque gestionado", "ren"], ["Agua de lluvia", "ren"], ["Petróleo", "nor"], ["Mineral de hierro", "nor"], ["Gas natural", "nor"]],
      "Viento, madera gestionada y lluvia se renuevan en escalas humanas; petróleo, mineral y gas, no.",
    ),
    pick("check-fase", "Fase de mayor consumo", "En la mayoría de los smartphones, ¿qué fase consume más recursos (energía, agua, minerales)?",
      "La extracción y la fabricación, antes de que el usuario lo encienda por primera vez",
      [["El uso diario del teléfono", "El uso consume energía, pero mucho menos que producir el aparato."], ["El transporte hasta la tienda", "Es pequeño comparado con las demás fases."], ["El reciclaje", "Es una fase final de menor impacto."]],
      "Por eso alargar la vida del móvil (reparar, reutilizar) suele ser más eficaz que comprar uno «eficiente» cada año.",
    ),
  ],
};
