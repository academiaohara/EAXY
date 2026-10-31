import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiaPotencialFuerzasConservativasFb1Lesson: InteractiveLesson = {
  slug: "energia-potencial-fuerzas-conservativas-fb1",
  title: "3. Fuerzas conservativas y energía potencial",
  subtitle: FB1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("cons", "Fuerzas conservativas", [
      { kind: "steps", items: [
        "Una fuerza es **conservativa** si el trabajo que realiza entre dos puntos **no depende del camino**, o, de forma equivalente, si el trabajo en una **trayectoria cerrada es nulo**.",
        "Ejemplos: **peso**, **fuerza elástica**, **gravitatoria**, **eléctrica**. **No conservativas**: **rozamiento**, resistencia del aire, tensión de un motor.",
        "Para una fuerza conservativa se define una **energía potencial** Ep tal que **W = −ΔEp**: la fuerza realiza trabajo positivo cuando la Ep disminuye.",
      ] },
    ], undefined, "stack"),
    slide("tipos", "Tipos de energía potencial", [
      { kind: "steps", items: [
        "**Gravitatoria cerca de la Tierra**: **Ep = m·g·h** (h se mide desde un nivel de referencia que se elige libremente; solo importan las **diferencias** ΔEp).",
        "**Elástica**: **Ep = ½·k·x²** (x = deformación respecto a la longitud natural).",
        "**Gravitatoria general** (Newton): Ep = −G·M·m/r (se verá en el tema 12).",
        "**Otras energías**: térmica, química, eléctrica, nuclear, radiante. El **calor** es energía en tránsito por diferencia de temperatura.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una rampa con y sin rozamiento", [
      { kind: "text", text: "Deja deslizar el bloque con y sin rozamiento. Mira cómo se reparte la energía entre potencial, cinética y calor a lo largo de la rampa." },
    ], tool("fb1-rampa-energia-explorador"), "visual-top"),
    slide("muelle", "Energía elástica", [
      { kind: "text", text: "Comprime un muelle y suéltalo: la energía almacenada se convierte en energía cinética. ¿Qué altura alcanzaría el cuerpo?" },
    ], tool("fb1-muelle-energia-explorador"), "visual-top"),
    calc("calc-ep", "Energía potencial", "Un libro de 2 kg está sobre una estantería a 1,5 m del suelo. ¿Qué energía potencial gravitatoria tiene respecto al suelo, en J? (g = 10 m/s²)", nums(30), "Ep = 2·10·1,5 = 30 J.", "Ep = m g h."),
    calc("calc-dep", "Variación de Ep", "Una piedra de 0,5 kg cae 20 m. ¿Cuánto vale ΔEp, en J? (g = 10 m/s²; con signo)", nums(-100), "ΔEp = −0,5·10·20 = −100 J.", "Al bajar disminuye."),
    calc("calc-el", "Energía elástica", "Un muelle de k = 500 N/m está estirado 0,2 m. ¿Qué energía elástica almacena, en J?", nums(10), "Ep = ½·500·0,04 = 10 J.", "Ep = ½ k x²."),
    calc("calc-pot2", "Trabajo y Ep", "Un cuerpo de 4 kg sube 3 m. ¿Qué trabajo mínimo debe hacer la fuerza externa, en J? (g = 10 m/s²)", nums(120), "W = ΔEp = 4·10·3 = 120 J.", "Sube a velocidad constante."),
    sort("clasifica", "¿Conservativa o no?", "Clasifica cada fuerza.",
      [["con", "Conservativa", "emerald"], ["noc", "No conservativa", "rose"]],
      [["Peso", "con"], ["Rozamiento", "noc"], ["Fuerza elástica de un muelle", "con"], ["Resistencia del aire", "noc"], ["Fuerza gravitatoria entre dos masas", "con"], ["Fuerza del motor de un coche", "noc"]],
      "Si el trabajo depende del camino, no es conservativa.",
    ),
    pick("check", "Nivel de referencia", "¿Qué ocurre si cambias el nivel de referencia en la Ep gravitatoria m·g·h?",
      "Cambia Ep, pero no la variación ΔEp entre dos puntos",
      [["Cambia también ΔEp", "ΔEp es independiente del origen."], ["La Ep se vuelve negativa siempre", "Puede ser positiva, negativa o nula."], ["No se puede elegir libremente", "Sí se puede."]],
      "Solo tienen significado físico las diferencias de energía potencial.",
    ),
  ],
};
