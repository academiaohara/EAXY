import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const medicionMarcadoPieDeRey2esoLesson: InteractiveLesson = {
  slug: "medicion-marcado-pie-de-rey-2eso",
  title: "7. Medición y marcado: el pie de rey",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("instr", "Instrumentos de medida y trazado", [
      { kind: "steps", items: [
        "**Regla y flexómetro**: longitudes con precisión de 1 mm.",
        "**Escuadra y cartabón**: ángulos de 90°, 45°, 30° y 60°.",
        "**Transportador**: mide ángulos cualesquiera.",
        "**Pie de rey (calibre)**: mide diámetros exteriores, interiores y profundidades con **0,1 mm** o menos.",
        "**Gramil, punta de trazar y granete**: marcar líneas y puntos sobre metal.",
      ] },
    ], undefined, "stack"),
    slide("calibre", "Lee un pie de rey", [
      { kind: "text", text: "Abre las mordazas y comprueba cómo se lee: primero los milímetros enteros en la regla, después las décimas con el nonio." },
    ], tool("eso2-calibre-explorador"), "visual-top"),
    slide("buenas", "Medir bien", [
      { kind: "steps", items: [
        "**Mide dos veces**, corta una.",
        "Coloca la pieza bien **apoyada** y las mordazas **sin apretar de más**.",
        "Lee con la vista **perpendicular** a la escala para evitar el error de paralaje.",
        "Anota siempre las **unidades**.",
        "Tu medida nunca es exacta: hay un **error** asociado a la apreciación del instrumento.",
      ] },
    ]),
    calc("calc-lectura", "Una lectura", "En un pie de rey, el cero del nonio queda entre 23 y 24 mm y la división 4 del nonio coincide con una marca de la regla. ¿Cuánto mide la pieza, en mm?", nums(23.4), "23 mm enteros + 4 décimas = 23,4 mm.", "Enteros de la regla más las décimas del nonio."),
    calc("calc-precision", "Apreciación", "Un nonio tiene 10 divisiones y cada milímetro de la regla es la unidad. ¿Cuál es la apreciación del instrumento, en mm?", nums(0.1), "1 mm / 10 divisiones = 0,1 mm.", "Divide la unidad de la regla entre el número de divisiones."),
    calc("calc-radio", "Del diámetro al radio", "Un pie de rey mide el diámetro exterior de un tubo: 12,6 mm. ¿Cuánto vale su radio, en mm?", nums(6.3), "r = d / 2 = 12,6 / 2 = 6,3 mm.", "El radio es la mitad del diámetro."),
    sort("clasifica-medida", "¿Qué instrumento?", "Elige el instrumento más adecuado.",
      [["reg", "Regla o flexómetro", "cobalt"], ["pie", "Pie de rey", "emerald"], ["esc", "Escuadra", "amber"]],
      [["Medir una tabla de 1,2 m", "reg"], ["Medir una distancia de la pared", "reg"], ["Medir el diámetro de un tornillo", "pie"], ["Medir el espesor de una chapa", "pie"], ["Comprobar un ángulo de 90°", "esc"], ["Trazar una línea perpendicular", "esc"]],
      "Para medidas grandes basta la regla; para medidas pequeñas y precisas, el pie de rey.",
    ),
    pick("check-paralaje", "El paralaje", "¿Por qué se lee un instrumento con la vista perpendicular a la escala?",
      "Porque mirando de lado la marca parece estar en otra posición (error de paralaje)",
      [["Porque así se ve mejor el color", "No tiene que ver con el color."], ["Para no cansar la vista", "Es por exactitud."], ["No importa desde dónde se mire", "Sí importa."]],
      "El paralaje desplaza visualmente la lectura si se mira en ángulo.",
    ),
  ],
};
