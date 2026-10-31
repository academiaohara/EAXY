import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuerzaElasticaCentripetaFq4Lesson: InteractiveLesson = {
  slug: "fuerza-elastica-centripeta-fq4",
  title: "5. Fuerza elástica y fuerza centrípeta",
  subtitle: FQ4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("hooke", "Ley de Hooke", [
      { kind: "steps", items: [
        "Un cuerpo elástico (muelle) se **deforma** al aplicarle una fuerza y **recupera** su forma al retirarla.",
        "**Ley de Hooke**: la fuerza es **proporcional a la deformación**: **F = k·x**, con **k** la constante elástica (N/m) y x el alargamiento o compresión (m).",
        "La fuerza que ejerce el muelle apunta **hacia el equilibrio**: **F = −k·x**.",
        "Válida dentro del **límite elástico**; más allá, la deformación es permanente o se rompe. Se aplica en los **dinamómetros**.",
      ] },
    ], undefined, "stack"),
    slide("cent", "Fuerza centrípeta", [
      { kind: "steps", items: [
        "Para que un cuerpo describa una **curva** hace falta una fuerza neta dirigida **al centro**: **F_c = m·a_c = m·v²/R**.",
        "La **fuerza centrípeta** no es una fuerza nueva: la aportan el **rozamiento** (curva en carretera), la **tensión** (honda), la **gravedad** (satélites)…",
        "Si desaparece, el cuerpo sale despedido por la **tangente** (1.ª ley). Lo que se siente como «fuerza centrífuga» es **inercia**.",
        "En una curva plana: **v_máx = √(μ·g·R)**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Muelles y curvas", [
      { kind: "text", text: "Prueba los dos estudios: estira un muelle y toma una curva. ¿Qué cambia si llueve?" },
    ], tool("fq4-elastica-centripeta-explorador"), "visual-top"),
    slide("seg", "Seguridad en las curvas", [
      { kind: "text", text: "La velocidad máxima depende de μ y del radio, **no de la masa**. Con asfalto mojado (μ ≈ 0,4) baja respecto al seco (μ ≈ 0,7). Por eso las curvas se **peraltan** (inclinan hacia dentro) y se **señaliza** la velocidad máxima; reducir la velocidad a la mitad divide la fuerza necesaria entre 4." },
    ]),
    calc("calc-k", "Constante elástica", "Un muelle se alarga 0,1 m al aplicarle 20 N. ¿Cuánto vale su constante k, en N/m?", nums(200), "k = F/x = 20/0,1 = 200 N/m.", "k = F/x."),
    calc("calc-f", "Fuerza elástica", "Un muelle de k = 150 N/m se comprime 0,2 m. ¿Qué fuerza ejerce, en N?", nums(30), "F = k·x = 150·0,2 = 30 N.", "F = k·x."),
    calc("calc-fc", "Fuerza centrípeta", "Un coche de 1000 kg toma una curva de 50 m de radio a 10 m/s. ¿Qué fuerza centrípeta necesita, en N?", nums(2000), "F = m·v²/R = 1000·100/50 = 2000 N.", "F = m·v²/R."),
    calc("calc-vmax", "Velocidad máxima", "Una curva plana de 40 m de radio tiene μ = 0,4. ¿Cuál es la velocidad máxima, en m/s? (g = 10 m/s²)", nums(12.65, 12.6, 12.7), "v = √(0,4·10·40) = √160 ≈ 12,65 m/s.", "v = √(μ·g·R)."),
    sort("clasifica", "¿Quién hace de fuerza centrípeta?", "Relaciona cada movimiento con la fuerza que actúa de centrípeta.",
      [["roz", "Rozamiento", "cobalt"], ["ten", "Tensión", "emerald"], ["gra", "Gravedad", "rose"]],
      [["Un coche tomando una curva plana", "roz"], ["Una piedra atada a una cuerda que gira", "ten"], ["La Luna alrededor de la Tierra", "gra"], ["Un ciclista en una curva", "roz"], ["Una honda girando", "ten"], ["Un satélite en órbita", "gra"]],
      "Identifica qué fuerza apunta al centro en cada caso.",
    ),
    pick("check", "Doble de velocidad", "Si un coche duplica su velocidad en una curva, ¿cómo cambia la fuerza centrípeta necesaria?",
      "Se multiplica por 4",
      [["Se duplica", "Depende de v²."], ["Se reduce a la mitad", "Aumenta."], ["No cambia", "Cambia mucho."]],
      "F = m·v²/R: (2v)² = 4v².",
    ),
  ],
};
