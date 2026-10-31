import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fenomenosAstronomicosFq4Lesson: InteractiveLesson = {
  slug: "fenomenos-astronomicos-fq4",
  title: "4. Fenómenos astronómicos",
  subtitle: FQ4_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("mov", "Movimientos de la Tierra y la Luna", [
      { kind: "steps", items: [
        "**Rotación** de la Tierra (24 h): produce el **día y la noche**.",
        "**Traslación** (365,25 días) con el eje inclinado ≈ 23,5°: produce las **estaciones**, no la distancia al Sol.",
        "La **Luna** gira alrededor de la Tierra en ≈ 27,3 días y siempre nos muestra la **misma cara**; el ciclo de fases dura ≈ **29,5 días**.",
        "El Sol y la Luna son los responsables de las **mareas** (atracción gravitatoria).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Fases de la Luna", [
      { kind: "text", text: "Mueve la Luna en su órbita. ¿Cuándo hay luna llena? ¿Y cuándo son las mareas más altas?" },
    ], tool("fq4-fases-lunares-explorador"), "visual-top"),
    slide("fases", "Fases", [
      { kind: "steps", items: [
        "La Luna **refleja** la luz solar: siempre está iluminada una mitad; vemos más o menos de ella según su posición.",
        "**Luna nueva**: entre la Tierra y el Sol; no la vemos. **Cuarto creciente**: vemos la mitad. **Luna llena**: la Tierra entre el Sol y la Luna, se ve completa.",
        "Después de la llena, la parte iluminada **mengua** hasta el **cuarto menguante** y vuelve a la nueva.",
        "Las fases se repiten cada ≈ **29,5 días** (un **mes lunar**) porque la Luna también avanza en su órbita mientras la Tierra gira alrededor del Sol.",
      ] },
    ], undefined, "stack"),
    slide("eclipses", "Eclipses y mareas", [
      { kind: "steps", items: [
        "**Eclipse de Sol**: la Luna se interpone entre el Sol y la Tierra (**luna nueva**).",
        "**Eclipse de Luna**: la Tierra se interpone entre el Sol y la Luna (**luna llena**).",
        "No hay eclipses cada mes porque la órbita de la Luna está **inclinada ≈ 5°**: solo ocurren cuando la alineación coincide con el plano de la órbita terrestre.",
        "**Mareas vivas** (mayores) con luna nueva y llena; **mareas muertas** (menores) en los cuartos.",
      ] },
    ], undefined, "stack"),
    calc("calc-dias", "Ciclo lunar", "Aproximadamente, ¿cuántos días dura el ciclo completo de fases de la Luna? (redondea)", nums(30, 29.5, 29, 28), "Unos 29,5 días.", "Un mes lunar."),
    calc("calc-rot", "Rotación", "¿Cuántas horas tarda la Tierra en dar una vuelta sobre su eje?", nums(24), "Una rotación dura ≈ 24 h.", "Día y noche."),
    sort("clasifica", "Fase de la Luna", "¿En qué posición está la Luna para cada fenómeno?",
      [["nue", "Luna nueva", "cobalt"], ["lle", "Luna llena", "rose"], ["cua", "Cuartos", "emerald"]],
      [["Posible eclipse de Sol", "nue"], ["Posible eclipse de Luna", "lle"], ["Mareas muertas", "cua"], ["La Luna está entre la Tierra y el Sol", "nue"], ["La Tierra está entre el Sol y la Luna", "lle"], ["La Luna está a 90° del Sol", "cua"]],
      "Vivas en las alineaciones; muertas con el Sol y la Luna en ángulo recto.",
    ),
    pick("check", "Estaciones", "¿Qué causa las estaciones del año?",
      "La inclinación del eje de la Tierra",
      [["La distancia de la Tierra al Sol", "La distancia varía poco y no es la causa."], ["La rotación de la Tierra", "Produce el día y la noche."], ["Las fases de la Luna", "No tienen relación."]],
      "El eje inclinado cambia la altura del Sol y la duración del día.",
    ),
  ],
};
