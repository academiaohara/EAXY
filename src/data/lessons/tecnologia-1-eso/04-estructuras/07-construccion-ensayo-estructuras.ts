import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const construccionEnsayoEstructurasLesson: InteractiveLesson = {
  slug: "construccion-ensayo-estructuras",
  title: "7. Construcción y ensayo de pequeñas estructuras",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("reto", "Un reto: el puente de papel", [
      { kind: "text", text: "En el taller se ponen a prueba las ideas con **maquetas**. Un reto clásico: construir un puente con folios que aguante el máximo peso con el mínimo material." },
      { kind: "steps", items: [
        "**Diseñar**: bocetos con forma, apoyos y refuerzos.",
        "**Planificar** materiales, herramientas y tiempos.",
        "**Construir** con cuidado (cortar, doblar, pegar).",
        "**Ensayar**: añadir carga poco a poco hasta que falle.",
        "**Evaluar y mejorar**: ¿dónde se rompió? ¿Qué se puede reforzar?",
      ] },
    ], undefined, "stack"),
    slide("ensayo", "Pon a prueba tu puente", [
      { kind: "text", text: "Cambia la forma del papel, la triangulación y la distancia entre apoyos. Añade carga hasta que se rompa." },
    ], tool("ensayo-puente-explorador", { n: 0, a: 20 }), "visual-top"),
    slide("criterio", "Cómo se mide el éxito", [
      { kind: "rule", title: "Relación resistencia / peso", formula: "\\text{eficiencia} = \\dfrac{\\text{carga máxima (g)}}{\\text{peso de la estructura (g)}}" },
      { kind: "text", text: "No gana el puente que más aguanta, sino el que **más aguanta en relación con lo que pesa**. Un puente de 10 g que aguanta 500 g es mejor que uno de 100 g que aguanta 800 g." },
    ]),
    calc("calc-efic", "Calcula la eficiencia", "Un puente de papel de 20 g aguanta 1 000 g antes de romperse. ¿Cuántas veces su propio peso soporta?",
      nums(50), "Eficiencia = 1 000 g ÷ 20 g = 50 veces su peso.", "Divide la carga máxima entre el peso del puente."),
    sort("clasifica-mejora", "¿Cómo se mejora?", "Relaciona cada fallo del ensayo con la mejora más adecuada.",
      [["tri", "Triangular", "amber"], ["can", "Poner de canto o aumentar la altura", "emerald"], ["uni", "Reforzar la unión", "cobalt"]],
      [["El puente se aplasta de lado", "tri"], ["Un lado se deforma como un paralelogramo", "tri"], ["La viga central se dobla mucho", "can"], ["El papel plano cede por la mitad", "can"], ["Se despega la unión entre dos piezas", "uni"], ["La cola se rompe antes que el papel", "uni"]],
      "Los fallos de forma se corrigen triangulando; los de flexión, con más altura de sección; los de unión, reforzándola.",
    ),
    pick("check-ensayo", "Un buen ensayo", "¿Cómo debe hacerse el ensayo de carga para obtener un resultado fiable?",
      "Añadiendo la carga poco a poco, anotando el valor cuando falla y repitiendo",
      [["Dejando caer un peso muy grande de golpe", "Un golpe no mide la resistencia estática."], ["Probando una sola vez sin anotar nada", "Sin registro no se puede comparar ni mejorar."], ["Cargando solo con la mano", "No es medible ni reproducible."]],
      "Un ensayo repetible y bien anotado permite comparar prototipos y detectar qué mejora funciona.",
    ),
  ],
};
