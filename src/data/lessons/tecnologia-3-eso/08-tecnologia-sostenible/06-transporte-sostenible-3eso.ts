import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transporteSostenible3esoLesson: InteractiveLesson = {
  slug: "transporte-sostenible-3eso",
  title: "6. Transporte y movilidad sostenible",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Moverse con menos impacto", [
      { kind: "steps", items: [
        "El transporte es una de las mayores fuentes de **emisiones de CO₂** y de contaminación del aire en las ciudades.",
        "**Movilidad sostenible**: moverse con menos energía, menos emisiones y menos espacio.",
        "Jerarquía: **caminar** → **bicicleta** → **transporte público** → **coche compartido** → **coche privado**.",
        "**Vehículo eléctrico**: no emite en su uso, y es más limpio cuanto más renovable sea la electricidad.",
        "**Intermodalidad**: combinar medios (bici + tren, autobús + a pie).",
      ] },
    ], undefined, "stack"),
    slide("co2", "Compara tus trayectos", [
      { kind: "text", text: "Elige un medio de transporte y mira cuánto CO₂ emites al año en tu trayecto habitual." },
    ], tool("eso3-transporte-explorador"), "visual-top"),
    slide("bici", "La bicicleta", [
      { kind: "text", text: "La bici es muy eficiente. Con las marchas adecuadas se adapta a cualquier pendiente." },
    ], tool("bici-marchas-explorador"), "visual-top"),
    slide("ev", "Coche eléctrico", [
      { kind: "steps", items: [
        "Un motor eléctrico aprovecha **más del 85 %** de la energía; uno de gasolina, **menos del 35 %**.",
        "La **batería** es el elemento más caro y con más impacto de fabricación.",
        "Se recarga en casa o en **puntos de recarga**, mejor con electricidad renovable.",
        "El **hidrógeno** y los **biocombustibles** son alternativas para transporte pesado.",
        "En **Asturias**, el relieve y la red de cercanías y ferrocarril de vía estrecha hacen del tren una buena opción.",
      ] },
    ]),
    calc("calc-co2", "Emisiones anuales", "Un coche con 1 persona (170 g/km) hace 15 km de ida, ida y vuelta, 5 días a la semana durante 44 semanas. ¿Cuántos kg de CO₂ al año? (170 · 15 · 2 · 220 / 1 000, redondea)", nums(1122), "170 · 30 · 220 / 1 000 = 1 122 kg.", "g por km por distancia total, entre 1 000."),
    calc("calc-ahorro", "Cambio a tren", "Si ese mismo trayecto se hace en tren (30 g/km), ¿cuántos kg de CO₂ se ahorran al año? (redondea)", nums(924), "(170 − 30) · 30 · 220 / 1 000 = 924 kg.", "Diferencia de emisiones por km."),
    sort("clasifica-trans", "Más o menos sostenible", "Clasifica cada opción.",
      [["mas", "Más sostenible", "emerald"], ["men", "Menos sostenible", "rose"]],
      [["Ir a pie al instituto", "mas"], ["Bicicleta", "mas"], ["Autobús escolar", "mas"], ["Tren", "mas"], ["Coche con una sola persona", "men"], ["Avión para distancias cortas", "men"]],
      "Importan las emisiones por persona y kilómetro.",
    ),
    pick("check-trans", "Compartir coche", "¿Por qué compartir coche reduce las emisiones por persona?",
      "Porque las emisiones del trayecto se reparten entre más personas",
      [["Porque el motor contamina menos", "Contamina casi igual."], ["Porque el coche pesa menos", "Pesa más."], ["No las reduce", "Las reparte."]],
      "Un coche lleno emite por persona mucho menos.",
    ),
  ],
};
