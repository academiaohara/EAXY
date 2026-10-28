import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const gestionCostesViabilidad4esoLesson: InteractiveLesson = {
  slug: "gestion-costes-viabilidad-4eso",
  title: "5. Costes, presupuesto y viabilidad económica",
  subtitle: TECESO4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿Sale a cuenta?", [
      { kind: "steps", items: [
        "**Costes fijos**: no dependen de cuántas unidades se hagan (diseño, moldes, máquinas, alquiler).",
        "**Costes variables**: crecen con cada unidad (materiales, energía, mano de obra directa).",
        "**Coste total** = fijos + variables · unidades.",
        "**Punto de equilibrio**: unidades a partir de las cuales se empieza a ganar dinero.",
        "Un proyecto es **viable** técnica, económica y ambientalmente.",
      ] },
    ], undefined, "stack"),
    slide("via", "Punto de equilibrio", [
      { kind: "text", text: "Cambia costes, precio y unidades vendidas. Mira cuándo el beneficio pasa a ser positivo." },
    ], tool("eso4-viabilidad-explorador"), "visual-top"),
    slide("pres", "El presupuesto", [
      { kind: "text", text: "Un presupuesto suma cantidades por precios unitarios de cada material." },
    ], tool("presupuesto-explorador"), "visual-top"),
    slide("optim", "Reducir costes sin perder calidad", [
      { kind: "steps", items: [
        "**Simplificar** el diseño: menos piezas y menos tipos de material.",
        "**Normalizar**: usar componentes estándar, más baratos y fáciles de reponer.",
        "**Aprovechar** el material (despiece optimizado).",
        "Comprar **al por mayor** cuando se fabrican muchas unidades.",
        "No recortar en lo que afecta a la **seguridad** o a la **función** del producto.",
      ] },
    ]),
    calc("calc-eq", "Punto de equilibrio", "Coste fijo 2 000 €, coste variable 8 € por unidad y precio de venta 20 €. ¿Cuántas unidades hay que vender para no perder dinero?", nums(167), "2 000 / (20 − 8) = 166,7 → 167 unidades.", "Fijo entre margen por unidad, redondeando hacia arriba."),
    calc("calc-ben", "Beneficio", "Si se venden 300 unidades en las condiciones anteriores, ¿qué beneficio queda, en €? (300·12 − 2 000)", nums(1600), "3 600 − 2 000 = 1 600 €.", "Unidades por margen menos coste fijo."),
    sort("clasifica-coste", "¿Fijo o variable?", "Clasifica cada coste de fabricar un producto.",
      [["fij", "Coste fijo", "cobalt"], ["var", "Coste variable", "amber"]],
      [["Diseño del producto", "fij"], ["Molde de inyección", "fij"], ["Alquiler del taller", "fij"], ["Material de cada unidad", "var"], ["Energía por unidad", "var"], ["Embalaje de cada unidad", "var"]],
      "Los fijos se pagan aunque no se fabrique nada.",
    ),
    pick("check-via", "No es viable", "El precio de venta es menor que el coste variable por unidad. ¿Qué ocurre?",
      "Se pierde dinero con cada unidad vendida: nunca se alcanza el equilibrio",
      [["Se compensa vendiendo muchas", "Vender más aumenta las pérdidas."], ["Se gana solo con el coste fijo", "No es posible."], ["No importa", "Importa mucho."]],
      "Hay que revisar precio o costes.",
    ),
  ],
};
