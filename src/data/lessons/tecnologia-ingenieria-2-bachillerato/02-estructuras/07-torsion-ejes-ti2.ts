import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const torsionEjesTi2Lesson: InteractiveLesson = {
  slug: "torsion-ejes-ti2",
  title: "7. Torsión en ejes",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando un eje transmite un par", [
      { kind: "steps", items: [
        "Un eje que transmite un **par de torsión T** se retuerce: cada sección gira respecto a la siguiente.",
        "La tensión cortante crece con la distancia al eje: **cero en el centro** y **máxima en la superficie**.",
        "Para un eje macizo circular: **$τ_{\\mathrm{máx}}$ = 16·T / (π·d³)**, con J = π·d⁴/32 (momento de inercia polar).",
        "El ángulo girado entre dos secciones es **θ = T·L / (G·J)**, siendo G el módulo de rigidez.",
        "Relación con la potencia: **P = T·ω**, por lo que un eje que gira más deprisa necesita menos par para la misma potencia.",
      ] },
    ], undefined, "stack"),
    slide("tool", "Un eje de acero", [
      { kind: "text", text: "Cambia el par, el diámetro y la longitud. Mira la tensión cortante y el giro." },
    ], tool("ti2-torsion-explorador"), "visual-top"),
    slide("hueco", "Ejes huecos", [
      { kind: "steps", items: [
        "El material cercano al centro trabaja poco: un **eje hueco** resiste casi lo mismo con mucho menos peso.",
        "Se usan en **árboles de transmisión** de vehículos, helicópteros y turbinas.",
        "Se comprueban tanto la **resistencia** (τ ≤ $τ_{\\mathrm{adm}}$) como la **rigidez** (θ por metro).",
      ] },
    ]),
    calc("calc-T", "Par", "Un motor entrega 15 kW a 1 500 rpm. ¿Qué par transmite, en N·m? (P·60/(2π·n), redondea a un entero)", nums(95, 95.5), "15 000 / 157,08 ≈ 95,5 N·m.", "T = P / ω con ω en rad/s."),
    calc("calc-tau", "Tensión", "Con 95,5 N·m en un eje de 30 mm, ¿qué tensión cortante máxima aparece, en MPa? (16·T·1000/(π·30³), redondea a un entero)", nums(18, 18.0), "16 · 95 500 / (π · 27 000) ≈ 18 MPa.", "Pasa el par a N·mm."),
    calc("calc-8", "Duplicar el diámetro", "Se duplica el diámetro de un eje con el mismo par. ¿Cuántas veces menor es la tensión cortante máxima?", nums(8), "Depende de 1/d³: 2³ = 8 veces menor.", "τ depende de la inversa del cubo del diámetro."),
    sort("clasifica-tor", "Torsión o no", "Decide si la pieza trabaja a torsión.",
      [["si", "Trabaja a torsión", "rose"], ["no", "No trabaja a torsión", "emerald"]],
      [["Eje que transmite el movimiento del motor", "si"], ["Destornillador al apretar", "si"], ["Llave de tubo al aflojar una tuerca", "si"], ["Cable que sostiene una carga", "no"], ["Pilar de un edificio", "no"], ["Remache que une dos chapas", "no"]],
      "La torsión aparece cuando hay un par alrededor del eje de la pieza.",
    ),
    pick("check-tor", "Ángulo de torsión", "¿Cómo varía el ángulo de torsión si el eje es el doble de largo (con igual par y sección)?",
      "Se duplica, porque es proporcional a la longitud",
      [["Se reduce a la mitad", "Crece con L."], ["No varía", "Depende de L."], ["Se cuadruplica", "Es lineal con L."]],
      "θ = T·L / (G·J).",
    ),
  ],
};
