import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const materiasPrimasMaterialesLesson: InteractiveLesson = {
  slug: "materias-primas-materiales",
  title: "1. Materias primas y materiales transformados",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la naturaleza al objeto", [
      { kind: "definition", text: "Las **materias primas** son los recursos que se extraen de la naturaleza sin transformar. Los **materiales** son lo que resulta de transformarlas para poder fabricar objetos." },
      { kind: "text", text: "Casi todo lo que usas empezó siendo una materia prima: el cuaderno, un árbol; la bicicleta, mineral de hierro; la botella de plástico, petróleo." },
    ], undefined, "stack"),
    slide("cadena", "Tres cadenas de transformación", [
      { kind: "text", text: "Observa tres recorridos completos, de la materia prima al objeto." },
    ], anim("materias-primas-proceso"), "text-top"),
    slide("origen", "Según su origen", [
      { kind: "steps", items: [
        "**Vegetal**: madera, algodón, lino, corcho, caucho natural.",
        "**Animal**: lana, seda, cuero.",
        "**Mineral**: piedra, arcilla, arena, mineral de hierro o de cobre.",
        "**Fósil**: petróleo y carbón, de los que se obtienen los plásticos y los combustibles.",
      ] },
      { kind: "warning", title: "Ojo", text: "Muchos de estos recursos son **limitados** (petróleo, minerales) o tardan mucho en renovarse (bosques). Por eso importa usarlos con cuidado y reciclarlos." },
    ]),
    sort("clasifica-origen", "¿De dónde viene?", "Clasifica cada materia prima según su origen.",
      [["veg", "Vegetal", "emerald"], ["ani", "Animal", "amber"], ["min", "Mineral", "cobalt"], ["fos", "Fósil", "violet"]],
      [["Algodón", "veg"], ["Corcho", "veg"], ["Lana", "ani"], ["Seda", "ani"], ["Arcilla", "min"], ["Mineral de cobre", "min"], ["Petróleo", "fos"], ["Carbón", "fos"]],
      "Las plantas dan madera, algodón o corcho; los animales, lana o seda; el subsuelo, minerales; y los restos fósiles, petróleo y carbón.",
    ),
    sort("clasifica-estado", "¿Materia prima o material transformado?", "Decide si cada elemento es una materia prima o un material ya transformado.",
      [["mp", "Materia prima", "emerald"], ["mt", "Material transformado", "amber"]],
      [["Tronco de árbol", "mp"], ["Mineral de hierro", "mp"], ["Petróleo", "mp"], ["Tablero de contrachapado", "mt"], ["Acero", "mt"], ["Plástico PVC", "mt"], ["Papel", "mt"], ["Vidrio", "mt"]],
      "Si se extrae directamente de la naturaleza es materia prima; si se ha sometido a procesos (aserrado, fundición, refinado) es un material transformado.",
    ),
    pick("check-cadena", "El recorrido del plástico", "¿Cuál es el orden correcto para fabricar una botella de plástico?",
      "Petróleo → refinado → plástico → botella",
      [["Botella → plástico → petróleo", "Es el orden inverso: se empieza siempre por la materia prima."], ["Plástico → petróleo → botella", "El plástico se obtiene del petróleo, no al revés."], ["Petróleo → botella → plástico", "La botella es el objeto final, no el material."]],
      "Materia prima (petróleo) → proceso (refinado y polimerización) → material (plástico) → objeto (botella).",
    ),
  ],
};
