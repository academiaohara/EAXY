import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const conservacionEnergiaMecanicaFb1Lesson: InteractiveLesson = {
  slug: "conservacion-energia-mecanica-fb1",
  title: "4. Conservación de la energía mecánica",
  subtitle: FB1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("em", "Energía mecánica", [
      { kind: "steps", items: [
        "La **energía mecánica** es la suma de la cinética y las potenciales: **Em = Ec + Ep**.",
        "Si solo actúan **fuerzas conservativas** (o las demás no trabajan), **Em se conserva**: **Ec₁ + Ep₁ = Ec₂ + Ep₂**.",
        "Si actúan fuerzas **no conservativas** (rozamiento): **ΔEm = W_nc**, que es **negativo** si disipan energía: la Em final es menor. La energía no desaparece: se convierte en **calor**.",
      ] },
    ], undefined, "stack"),
    slide("anim", "De potencial a cinética", [
      { kind: "text", text: "Observa cómo la energía pasa de potencial a cinética al bajar, y qué ocurre cuando hay rozamiento." },
    ], anim("fb1-conservacion"), "visual-top"),
    slide("aplic", "Aplicaciones típicas", [
      { kind: "steps", items: [
        "**Caída libre y lanzamientos**: v = √(2·g·h) sin rozamiento. **Montaña rusa**: la velocidad en cada punto depende solo de la **altura** perdida.",
        "**Péndulo**: en el punto más bajo, v = √(2·g·h). La tensión no trabaja (⟂ al desplazamiento).",
        "**Muelle vertical** o con masas: ½·m·v² + m·g·h + ½·k·x² constante. **Rizo**: velocidad mínima arriba v² ≥ g·R.",
        "**Con rozamiento**: Ec₂ + Ep₂ = Ec₁ + Ep₁ − |W_roz|; se usa para hallar el **calor generado** o la **distancia recorrida** hasta pararse.",
      ] },
    ], undefined, "stack"),
    calc("calc-v", "Velocidad en caída", "Una bola cae desde 20 m sin rozamiento. ¿Con qué velocidad llega al suelo, en m/s? (g = 10 m/s²)", nums(20), "v = √(2·10·20) = 20 m/s.", "m g h = ½ m v²."),
    calc("calc-h", "Altura alcanzada", "Se lanza una piedra verticalmente a 15 m/s. ¿Qué altura máxima alcanza, en m? (g = 10 m/s²; usa la conservación de la energía)", nums(11.25, 11.3), "½ v² = g h → h = 225/20 = 11,25 m.", "Ec inicial = Ep final."),
    calc("calc-pen", "Péndulo", "Un péndulo se suelta desde una altura de 0,8 m sobre su punto más bajo. ¿Qué velocidad lleva en ese punto, en m/s? (g = 10 m/s²)", nums(4), "v = √(2·10·0,8) = 4 m/s.", "v = √(2 g h)."),
    calc("calc-q", "Calor por rozamiento", "Un bloque de 2 kg baja 3 m por una rampa y llega abajo con 4 m/s. ¿Qué calor se ha disipado, en J? (g = 10 m/s²)", nums(44), "Q = 2·10·3 − ½·2·16 = 60 − 16 = 44 J.", "Q = Ep inicial − Ec final."),
    sort("clasifica", "¿Se conserva la Em?", "Indica si se conserva la energía mecánica del cuerpo (sin otras fuerzas).",
      [["si", "Se conserva", "emerald"], ["no", "No se conserva", "rose"]],
      [["Una piedra que cae en el vacío", "si"], ["Un coche que frena", "no"], ["Un péndulo ideal", "si"], ["Un bloque que desliza con rozamiento", "no"], ["Una masa que oscila en un muelle ideal", "si"], ["Un paracaidista a velocidad constante", "no"]],
      "Solo si no actúan fuerzas no conservativas que trabajen.",
    ),
    pick("check", "Velocidad en la rampa", "Sin rozamiento, ¿de qué depende la velocidad al pie de una rampa?",
      "Solo de la altura desde la que se suelta",
      [["De la masa", "Se simplifica."], ["De la inclinación", "Solo cuenta h."], ["De la longitud de la rampa", "Solo la altura."]],
      "v = √(2·g·h).",
    ),
  ],
};
