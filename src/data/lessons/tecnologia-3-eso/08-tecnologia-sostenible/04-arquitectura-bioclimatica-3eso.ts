import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const arquitecturaBioclimatica3esoLesson: InteractiveLesson = {
  slug: "arquitectura-bioclimatica-3eso",
  title: "4. Arquitectura bioclimática y aislamiento",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Una casa que aprovecha el clima", [
      { kind: "text", text: "Observa cómo una casa bioclimática usa el sol, el aislamiento y el aire." },
    ], anim("eso3-casa-bioclimatica"), "text-top"),
    slide("estrategias", "Estrategias principales", [
      { kind: "steps", items: [
        "**Orientación**: ventanas grandes al sur (en el hemisferio norte) y pequeñas al norte.",
        "**Captación y protección solar**: sol de invierno sí, sol de verano no (aleros, toldos, árboles de hoja caduca).",
        "**Aislamiento**: en muros, cubierta y ventanas (doble acristalamiento).",
        "**Inercia térmica**: materiales pesados guardan el calor y lo devuelven por la noche.",
        "**Ventilación natural** y **enfriamiento pasivo**.",
      ] },
    ]),
    slide("aislar", "Cuánto calor se escapa", [
      { kind: "text", text: "Las pérdidas valen U · A · ΔT. Añade aislante y comprueba cuánto bajan." },
    ], tool("eso3-aislamiento-explorador"), "visual-top"),
    slide("ahorro", "Hábitos que ayudan", [
      { kind: "text", text: "Además de la casa, los hábitos cuentan. Estima cuánto ahorras con pequeños cambios." },
    ], tool("ahorro-energia-explorador"), "visual-top"),
    calc("calc-u", "Pérdidas de un muro", "Un muro de 60 m² con U = 0,5 W/m²K y una diferencia de 15 °C, ¿cuántos W pierde? (U · A · ΔT)", nums(450), "0,5 · 60 · 15 = 450 W.", "Multiplica U, área y diferencia de temperatura."),
    calc("calc-r", "Resistencia añadida", "Un aislante de 8 cm con λ = 0,04 W/mK añade una resistencia de e / λ. ¿Cuántos m²K/W? (e en metros)", nums(2), "0,08 / 0,04 = 2 m²K/W.", "Pasa el espesor a metros y divide entre λ."),
    sort("clasifica-bio", "¿Verano o invierno?", "Decide en qué estación ayuda cada estrategia.",
      [["inv", "Invierno", "cobalt"], ["ver", "Verano", "amber"]],
      [["Dejar entrar el sol por las ventanas del sur", "inv"], ["Cerrar las ventanas por la noche", "inv"], ["Aislar para que no escape el calor", "inv"], ["Alero o toldo sobre la ventana", "ver"], ["Ventilación cruzada nocturna", "ver"], ["Árbol de hoja caduca al sur", "ver"]],
      "Muchas estrategias funcionan a la vez en las dos estaciones.",
    ),
    pick("check-bio", "Hoja caduca", "¿Por qué un árbol de hoja caduca junto a la ventana sur es útil?",
      "En verano da sombra con sus hojas y en invierno deja pasar el sol",
      [["Porque da frutos", "No es la razón."], ["Porque nunca pierde hojas", "Es lo contrario."], ["Porque calienta la casa", "No emite calor."]],
      "Es una protección solar que se adapta sola a la estación.",
    ),
  ],
};
