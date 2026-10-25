import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reutilizacionEconomiaCircularEsoLesson: InteractiveLesson = {
  slug: "reutilizacion-economia-circular-eso",
  title: "5. Reutilización y economía circular",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("lineal", "Una economía en línea recta", [
      { kind: "definition", text: "La **economía lineal** sigue el esquema «extraer → fabricar → usar → tirar»: consume recursos limitados y genera grandes cantidades de residuos. La **economía circular** busca que lo que hoy es un residuo sea mañana un recurso." },
    ], undefined, "stack"),
    slide("circular", "De línea a círculo", [
      { kind: "text", text: "Observa las diferencias entre los dos modelos y las prioridades de las «erres»." },
    ], anim("economia-lineal-circular"), "text-top"),
    slide("principios", "Principios de la economía circular", [
      { kind: "steps", items: [
        "**Diseñar para durar** y para poder **reparar y desmontar**.",
        "**Reutilizar** objetos y componentes: ropa, muebles, envases retornables.",
        "**Compartir** (alquilar, prestar) en vez de comprar cosas que se usan poco.",
        "**Reciclar** los materiales al final de la vida del producto.",
        "**Regenerar** la naturaleza: compostaje, energías renovables.",
      ] },
    ]),
    slide("explora", "Reutiliza y recicla más", [
      { kind: "text", text: "Mueve los controles y observa cómo disminuyen a la vez la materia prima nueva y los residuos." },
    ], tool("lineal-circular-eso-explorador", { a: 0, b: 0 }), "visual-top"),
    sort("clasifica-circular", "Lineal o circular", "Decide a qué modelo corresponde cada práctica.",
      [["lin", "Economía lineal", "rose"], ["cir", "Economía circular", "emerald"]],
      [["Comprar, usar una vez y tirar", "lin"], ["Envases que se compran y se tiran", "lin"], ["Botellas de vidrio retornables", "cir"], ["Alquilar herramientas que se usan poco", "cir"], ["Convertir restos orgánicos en compost", "cir"], ["Diseñar un móvil con piezas que se pueden cambiar", "cir"]],
      "Lineal: se produce un residuo al final. Circular: se reparan, reutilizan y reciclan los productos y materiales.",
    ),
    pick("check-circ", "Un ejemplo de economía circular", "¿Cuál es un ejemplo de economía circular?",
      "Una tienda de ropa de segunda mano",
      [["Una fábrica que produce y vende objetos de usar y tirar", "Es economía lineal."], ["Un vertedero que acumula residuos", "Los residuos no se aprovechan."], ["Un producto diseñado para durar un año", "El diseño limita la vida útil."]],
      "La ropa de segunda mano evita fabricar prendas nuevas y alarga la vida de las que ya existen.",
    ),
  ],
};
