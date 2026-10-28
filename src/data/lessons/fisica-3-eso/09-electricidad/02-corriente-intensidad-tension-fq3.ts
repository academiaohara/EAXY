import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const corrienteIntensidadTensionFq3Lesson: InteractiveLesson = {
  slug: "corriente-intensidad-tension-fq3",
  title: "2. Corriente eléctrica, intensidad y tensión",
  subtitle: FQ3_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Corriente y circuito", [
      { kind: "steps", items: [
        "La **corriente eléctrica** es el **movimiento ordenado de cargas** por un conductor.",
        "Un **circuito eléctrico** necesita: un **generador** (pila, batería), **conductores** (cables), **receptores** (bombilla, motor, resistencia) y un **interruptor**.",
        "La corriente solo circula si el circuito está **cerrado**.",
        "El **generador** da energía a las cargas; los **receptores** la transforman en luz, calor o movimiento.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Un circuito sencillo", [
      { kind: "text", text: "Cierra el interruptor y sigue el sentido de los electrones, el sentido convencional y los aparatos de medida." },
    ], anim("fq3-corriente"), "visual-top"),
    slide("explora", "Intensidad y tensión", [
      { kind: "text", text: "Cambia la carga, el tiempo y la energía. ¿Cómo varían I y V?" },
    ], tool("fq3-intensidad-tension-explorador"), "visual-top"),
    slide("mag", "Magnitudes eléctricas", [
      { kind: "steps", items: [
        "**Intensidad I** = carga / tiempo: **I = Q / t**. Se mide en **amperios (A)** con un **amperímetro en serie**.",
        "**Tensión V** (diferencia de potencial) = energía / carga: **V = E / Q**. Se mide en **voltios (V)** con un **voltímetro en paralelo**.",
        "Una **pila** de 4,5 V da 4,5 J a cada culombio que la atraviesa.",
        "La corriente **continua** (pilas) tiene siempre el mismo sentido; la **alterna** (red eléctrica) cambia de sentido periódicamente.",
      ] },
    ]),
    calc("calc-i", "Intensidad", "Por un cable pasan 6 C en 3 s. ¿Cuánta intensidad circula, en A?", nums(2), "I = 6 / 3 = 2 A.", "I = Q/t."),
    calc("calc-q", "Carga", "Una corriente de 0,5 A circula durante 20 s. ¿Cuántos culombios pasan?", nums(10), "Q = I · t = 0,5 · 20 = 10 C.", "Despeja Q."),
    calc("calc-v", "Tensión", "Una pila entrega 36 J a 6 C de carga. ¿Cuál es su tensión, en V?", nums(6), "V = 36 / 6 = 6 V.", "V = E/Q."),
    calc("calc-ma", "Miliamperios", "Una intensidad de 0,25 A, ¿cuántos mA son?", nums(250), "0,25 · 1000 = 250 mA.", "1 A = 1000 mA."),
    sort("clasifica", "Aparato de medida", "Asocia cada característica con el aparato.",
      [["am", "Amperímetro", "amber"], ["vo", "Voltímetro", "cobalt"]],
      [["Mide la intensidad", "am"], ["Se conecta en serie", "am"], ["Su resistencia es muy baja", "am"], ["Mide la tensión", "vo"], ["Se conecta en paralelo", "vo"], ["Su resistencia es muy alta", "vo"]],
      "El amperímetro se pone en serie; el voltímetro, en paralelo.",
    ),
    pick("check", "Sentido", "¿En qué sentido se mueven los electrones por fuera de una pila?",
      "Del polo negativo al positivo",
      [["Del positivo al negativo", "Ese es el sentido convencional de la corriente."], ["No se mueven", "Sí se mueven."], ["En los dos sentidos a la vez", "En corriente continua van en uno."]],
      "Los electrones tienen carga negativa; el convenio es opuesto.",
    ),
  ],
};
