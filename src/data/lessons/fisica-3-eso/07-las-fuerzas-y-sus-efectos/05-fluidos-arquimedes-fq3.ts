import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fluidosArquimedesFq3Lesson: InteractiveLesson = {
  slug: "fluidos-arquimedes-fq3",
  title: "5. Presión en los fluidos y principio de Arquímedes",
  subtitle: FQ3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Presión en un fluido", [
      { kind: "steps", items: [
        "Un **fluido** (líquido o gas) ejerce presión sobre las paredes del recipiente y sobre los cuerpos sumergidos, **en todas las direcciones**.",
        "En un líquido, la **presión hidrostática** aumenta con la **profundidad**: **P = ρ · g · h**, donde ρ es la densidad.",
        "A 10 m de profundidad en el agua la presión (sin contar la atmosférica) es de casi **1 atm**. Por eso a los buceadores les duelen los oídos.",
        "La **presión atmosférica** (≈ 1 atm a nivel del mar) es el peso del aire por unidad de superficie; **disminuye con la altura**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Flota o se hunde?", [
      { kind: "text", text: "Elige un objeto y un fluido. ¿Qué parte queda sumergida?" },
    ], tool("fq3-flotacion-explorador"), "visual-top"),
    slide("arq", "Principio de Arquímedes", [
      { kind: "steps", items: [
        "**Todo cuerpo sumergido en un fluido recibe un empuje vertical y hacia arriba igual al peso del fluido que desaloja**: **E = ρ(fluido) · g · V(sumergido)**.",
        "Si **E < P**: el cuerpo se **hunde**. Si **E = P**: **flota** en equilibrio. Si **E > P** (totalmente sumergido): **sube** hasta flotar.",
        "Un cuerpo flota si su **densidad es menor** que la del fluido. El hielo (920 kg/m³) flota en el agua (1000 kg/m³) con el 92 % sumergido, igual que los icebergs.",
        "Los **barcos** flotan porque su casco encierra mucho aire: su **densidad media** es menor que la del agua.",
      ] },
    ]),
    calc("calc-h", "Presión a una profundidad", "¿Qué presión hidrostática hay a 5 m de profundidad en agua (ρ = 1000 kg/m³, g = 10 m/s²), en Pa?", nums(50000), "P = 1000 · 10 · 5 = 50 000 Pa.", "P = ρ·g·h."),
    calc("calc-e", "Empuje", "Un objeto de 2 litros (0,002 m³) está totalmente sumergido en agua. ¿Qué empuje recibe, en N? (g = 10 m/s²)", nums(20), "E = 1000 · 10 · 0,002 = 20 N.", "E = ρ·g·V."),
    calc("calc-frac", "Fracción sumergida", "Un bloque de madera de 500 kg/m³ flota en agua de 1000 kg/m³. ¿Qué porcentaje de su volumen queda sumergido?", nums(50), "500 / 1000 = 0,5 → 50 %.", "Cociente de densidades."),
    calc("calc-pes", "Se hunde o flota", "Un objeto pesa 30 N y, sumergido del todo, recibe un empuje de 20 N. Escribe 1 si flota y 2 si se hunde.", nums(2), "Como E < P, se hunde.", "Compara empuje y peso."),
    sort("clasifica", "Flota o se hunde en agua", "Clasifica según su densidad (agua: 1000 kg/m³).",
      [["fl", "Flota en agua", "emerald"], ["hu", "Se hunde en agua", "rose"]],
      [["Corcho (240)", "fl"], ["Madera de pino (500)", "fl"], ["Hielo (920)", "fl"], ["Aluminio (2700)", "hu"], ["Hierro (7870)", "hu"], ["Plomo (11 340)", "hu"]],
      "Flota si su densidad es menor que la del agua.",
    ),
    pick("check", "Barco de acero", "¿Por qué flota un barco de acero, si el acero es más denso que el agua?",
      "Porque su densidad media es menor, al contener mucho aire",
      [["Porque el acero flota", "El acero macizo se hunde."], ["Porque el agua del mar es más densa que el acero", "No lo es."], ["Porque no pesa", "Sí pesa, pero el empuje lo compensa."]],
      "El empuje iguala al peso gracias al gran volumen desalojado.",
    ),
  ],
};
