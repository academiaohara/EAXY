import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiaCineticaPotencialFq4Lesson: InteractiveLesson = {
  slug: "energia-cinetica-potencial-fq4",
  title: "2. Energías cinética y potencial",
  subtitle: FQ4_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("energia", "La energía", [
      { kind: "steps", items: [
        "La **energía** es la capacidad de un sistema para producir **cambios** o realizar **trabajo**. Se mide en **julios (J)**.",
        "La **energía mecánica** es la suma de la **cinética** (por el movimiento) y la **potencial** (por la posición o la deformación).",
        "La energía **ni se crea ni se destruye**: se **transforma** de una forma en otra y se **transfiere** entre cuerpos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Energía cinética y potencial", [
      { kind: "text", text: "Cambia la masa, la velocidad y la altura. ¿Qué energía crece más rápido al duplicar la velocidad?" },
    ], tool("fq4-energias-explorador"), "visual-top"),
    slide("cin", "Energía cinética", [
      { kind: "steps", items: [
        "**Ec = ½·m·v²**. Depende de la **masa** y del **cuadrado de la velocidad**.",
        "**Doble velocidad → Ec × 4**. Por eso la energía de un choque crece tanto con la velocidad.",
        "Nunca es negativa. Un cuerpo en reposo tiene Ec = 0.",
      ] },
    ], undefined, "stack"),
    slide("pot", "Energía potencial", [
      { kind: "steps", items: [
        "**Gravitatoria**: **Ep = m·g·h**, respecto a un nivel de referencia (h = 0) que se elige. Lo que importa son sus **diferencias**.",
        "**Elástica**: un muelle estirado o comprimido x almacena **Ep = ½·k·x²**.",
        "Un cuerpo en una posición alta o un muelle comprimido pueden **liberar** esa energía al descender o expandirse.",
      ] },
    ], undefined, "stack"),
    calc("calc-ec", "Energía cinética", "Un coche de 1000 kg circula a 20 m/s. ¿Cuál es su energía cinética, en kJ?", nums(200), "Ec = ½·1000·400 = 200 000 J = 200 kJ.", "Ec = ½·m·v²."),
    calc("calc-ep", "Energía potencial", "Una maceta de 3 kg está en un balcón a 10 m de altura. ¿Cuál es su Ep, en J? (g = 10 m/s²)", nums(300), "Ep = 3·10·10 = 300 J.", "Ep = m·g·h."),
    calc("calc-doble", "Doble velocidad", "Si un ciclista duplica su velocidad, su energía cinética se multiplica por… (factor)", nums(4), "Ec ∝ v²: 2² = 4.", "Depende del cuadrado."),
    calc("calc-muelle", "Energía elástica", "Un muelle de k = 200 N/m está comprimido 0,1 m. ¿Cuánta energía almacena, en J?", nums(1), "Ep = ½·200·0,01 = 1 J.", "Ep = ½·k·x²."),
    sort("clasifica", "¿Qué energía predomina?", "Clasifica cada situación.",
      [["cin", "Cinética", "rose"], ["gra", "Potencial gravitatoria", "cobalt"], ["ela", "Potencial elástica", "emerald"]],
      [["Un coche en la autopista", "cin"], ["Una piedra en lo alto de un acantilado", "gra"], ["Un arco tenso antes de soltar la flecha", "ela"], ["Un balón de fútbol en pleno chut", "cin"], ["El agua de un embalse en altura", "gra"], ["Un muelle comprimido en un bolígrafo", "ela"]],
      "Movimiento: cinética. Altura: gravitatoria. Deformación: elástica.",
    ),
    pick("check", "Referencia", "Una bola de 2 kg está en una mesa a 1 m del suelo. ¿Cuál es su Ep?",
      "Depende del nivel de referencia que se elija",
      [["Siempre 19,6 J", "Es así respecto al suelo, pero no es absoluto."], ["Siempre 0", "Solo si se toma la mesa como referencia."], ["Es negativa", "Solo con una referencia por encima."]],
      "La Ep es relativa: respecto al suelo valdría m·g·h = 19,6 J.",
    ),
  ],
};
