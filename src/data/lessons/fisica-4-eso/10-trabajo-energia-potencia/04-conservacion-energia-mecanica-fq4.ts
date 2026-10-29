import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conservacionEnergiaMecanicaFq4Lesson: InteractiveLesson = {
  slug: "conservacion-energia-mecanica-fq4",
  title: "4. Conservación de la energía mecánica",
  subtitle: FQ4_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Una pista sin rozamiento", [
      { kind: "steps", items: [
        "Si solo actúan **fuerzas conservativas** (peso, fuerza elástica), la **energía mecánica se conserva**: **Ec + Ep = constante**.",
        "Al bajar, la Ep se transforma en Ec; al subir, la Ec en Ep.",
        "Se cumple en la **caída libre**, el **péndulo**, la **montaña rusa** sin rozamiento…",
      ] },
    ], anim("fq4-conservacion-pista"), "visual-top"),
    slide("explora", "Prueba con la pista", [
      { kind: "text", text: "Mueve la bola por la pista. Después añade rozamiento y observa qué pasa con la energía mecánica." },
    ], tool("fq4-conservacion-energia-explorador"), "visual-top"),
    slide("ecuacion", "La ecuación", [
      { kind: "steps", items: [
        "**Em₁ = Em₂**: **½·m·v₁² + m·g·h₁ = ½·m·v₂² + m·g·h₂**. La masa **se cancela**.",
        "Desde el reposo, tras bajar una altura Δh: **v = √(2·g·Δh)**, igual que en caída libre y **sin importar la forma de la pista**.",
        "Con **rozamiento** (fuerza no conservativa): **Em₂ = Em₁ + W_roz** (W_roz < 0). La energía mecánica **disminuye**; la que falta se **disipa como calor**.",
        "La **energía total** del universo siempre se conserva (**principio de conservación de la energía**).",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo", [
      { kind: "text", text: "Un niño se deja caer desde lo alto de un tobogán de 5 m, sin rozamiento. Em₁ = m·g·5. Abajo: ½·m·v² = m·g·5, luego **v = √(2·10·5) = 10 m/s**. Sale igual para un niño de 20 kg que para uno de 50 kg." },
    ]),
    calc("calc-v", "Velocidad al pie", "Una bola se suelta desde 20 m de altura sin rozamiento. ¿Con qué velocidad llega abajo, en m/s? (g = 10 m/s²)", nums(20), "v = √(2·10·20) = 20 m/s.", "v = √(2·g·Δh)."),
    calc("calc-h", "Altura alcanzada", "Se lanza una bola hacia arriba a 10 m/s. ¿Qué altura máxima alcanza, en m? (g = 10 m/s²; sin rozamiento)", nums(5), "½·v² = g·h → h = 100/20 = 5 m.", "Ec se convierte en Ep."),
    calc("calc-ec", "Energía cinética", "Una piedra de 2 kg cae desde 10 m. ¿Cuál es su Ec justo antes de llegar al suelo, en J? (g = 10 m/s²)", nums(200), "Ec = Ep inicial = 2·10·10 = 200 J.", "Se conserva Em."),
    sort("clasifica", "¿Se conserva la Em?", "Indica si se conserva la energía mecánica.",
      [["si", "Se conserva", "emerald"], ["no", "Disminuye", "rose"]],
      [["Una piedra en caída libre (sin aire)", "si"], ["Un coche que frena", "no"], ["Una bola que rueda sin rozamiento por una pista", "si"], ["Un trineo que desliza por nieve con rozamiento", "no"], ["Un péndulo ideal", "si"], ["Una caja arrastrada por el suelo", "no"]],
      "Si hay rozamiento, parte se convierte en calor.",
    ),
    pick("check", "Calor", "Con rozamiento, ¿adónde va la energía mecánica que «desaparece»?",
      "Se transforma en calor (energía térmica)",
      [["Se destruye", "La energía no se destruye."], ["Se convierte en masa del cuerpo", "No."], ["Aumenta la energía potencial", "Disminuye."]],
      "La energía total se conserva; la mecánica se disipa en calor.",
    ),
  ],
};
