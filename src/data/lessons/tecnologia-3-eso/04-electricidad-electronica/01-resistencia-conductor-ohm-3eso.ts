import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const resistenciaConductorOhm3esoLesson: InteractiveLesson = {
  slug: "resistencia-conductor-ohm-3eso",
  title: "1. La resistencia de un conductor y la ley de Ohm",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("repaso", "Un repaso con intención", [
      { kind: "steps", items: [
        "**Ley de Ohm**: I = V / R (V en voltios, I en amperios, R en ohmios).",
        "**Potencia**: P = V · I; **energía**: E = P · t.",
        "En **serie** se suman las resistencias; en **paralelo**, sus inversas.",
        "Ahora queremos saber **de qué depende** la resistencia de un cable o de un componente.",
      ] },
    ], undefined, "stack"),
    slide("formula", "La resistencia de un conductor", [
      { kind: "rule", title: "Segunda ley de Ohm", text: "La resistencia de un conductor es proporcional a su longitud y a la resistividad del material, e inversamente proporcional a su sección.", formula: "R = ρ · L / S" },
      { kind: "text", text: "ρ (resistividad) se mide en Ω·mm²/m si L va en metros y S en mm². Cambia el material, la longitud y la sección." },
    ], tool("eso3-conductor-explorador"), "visual-top"),
    slide("uso", "Por qué importa", [
      { kind: "steps", items: [
        "Un **cable largo y fino** se calienta y pierde tensión: por eso las instalaciones usan **secciones mayores** para más corriente.",
        "El **cobre** conduce muy bien y es el más usado; el **aluminio** es más ligero (líneas de alta tensión).",
        "Las **resistencias** y las estufas usan materiales de **resistividad alta** (nicrom, constantán) para calentarse.",
      ] },
    ]),
    calc("calc-r", "Calcula la resistencia", "Un hilo de constantán de ρ = 0,5 Ω·mm²/m tiene 10 m de longitud y 0,5 mm² de sección. ¿Cuál es su resistencia, en Ω?", nums(10), "R = ρ · L / S = 0,5 · 10 / 0,5 = 10 Ω.", "R = ρ · L / S."),
    calc("calc-doble", "Doble sección", "Ese mismo hilo se sustituye por otro igual pero de sección doble (1 mm²). ¿Cuánto vale ahora su resistencia, en Ω?", nums(5), "R = 0,5 · 10 / 1 = 5 Ω: con el doble de sección, la mitad de resistencia.", "La sección está en el denominador."),
    calc("calc-i", "Con la ley de Ohm", "Ese hilo de 5 Ω se conecta a 10 V. ¿Qué intensidad circula, en A?", nums(2), "I = V / R = 10 / 5 = 2 A.", "I = V / R."),
    sort("clasifica-r", "¿Aumenta o disminuye R?", "Clasifica cada cambio en un cable.",
      [["aum", "Aumenta la resistencia", "rose"], ["dis", "Disminuye la resistencia", "emerald"]],
      [["Alargar el cable", "aum"], ["Usar un cable más fino", "aum"], ["Usar un material de mayor resistividad", "aum"], ["Acortar el cable", "dis"], ["Usar un cable más grueso", "dis"], ["Cambiar el hierro por cobre", "dis"]],
      "R = ρ · L / S: crece con L y ρ, y disminuye con S.",
    ),
    pick("check-cable", "Un cable largo", "Para alimentar un aparato lejano se usa un cable muy largo y fino. ¿Qué efecto tendrá?",
      "Mayor resistencia: se calienta y llega menos tensión",
      [["Menor resistencia", "Alargar y adelgazar aumenta R."], ["Ninguno", "R depende de L y S."], ["Mejor conducción", "Empeora."]],
      "Los cables largos requieren más sección para evitar pérdidas.",
    ),
  ],
};
