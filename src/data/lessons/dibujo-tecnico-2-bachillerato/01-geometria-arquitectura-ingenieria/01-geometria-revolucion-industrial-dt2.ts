import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const geometriaRevolucionIndustrialDt2Lesson: InteractiveLesson = {
  slug: "geometria-revolucion-industrial-dt2",
  title: "1. La geometría desde la Revolución Industrial",
  subtitle: DT2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Nuevos materiales, nuevas formas", [
      { kind: "steps", items: [
        "La **Revolución Industrial** (siglos XVIII–XIX) trae el **hierro**, el **acero**, el **vidrio** plano y, más tarde, el **hormigón armado**: materiales que permiten **grandes luces** y estructuras ligeras.",
        "Aparece la **prefabricación**: piezas repetidas y modulares que se fabrican en taller y se montan en obra, como en el **Crystal Palace** de Paxton (Londres, 1851).",
        "La **ingeniería** (puentes colgantes, ferrocarril, la **Torre Eiffel**, 1889) y la **arquitectura** se acercan: la forma depende del **cálculo** y de la **geometría**.",
        "El dibujo técnico se convierte en el **lenguaje común** entre quien proyecta, calcula y construye.",
      ] },
    ], undefined, "stack"),
    slide("catenaria", "Catenaria, parábola y arco", [
      { kind: "text", text: "Gaudí colgaba cadenas y pesos para hallar el arco ideal. Compara la catenaria con la parábola." },
    ], tool("dt2-catenaria-explorador"), "visual-top"),
    slide("maestros", "Geometría al servicio de la estructura", [
      { kind: "steps", items: [
        "**Antoni Gaudí** usó **catenarias** (maquetas funiculares), **paraboloides hiperbólicos** e **hiperboloides** para lograr estructuras que trabajan a compresión.",
        "**Félix Candela** construyó **cascarones** de hormigón con forma de **paraboloide hiperbólico**, muy finos y resistentes.",
        "**Buckminster Fuller** popularizó la **cúpula geodésica**, formada por triángulos que reparten las cargas.",
        "**Frei Otto** estudió las **estructuras tensadas** (cubiertas de membranas y cables), como la del Estadio Olímpico de Múnich (1972).",
      ] },
    ]),
    calc("calc-parabola", "Altura de un arco parabólico", "Un arco parabólico tiene 20 m de luz y 5 m de flecha: y = 5·(1 − 4x²/400). ¿Qué altura tiene a 5 m del eje, en m?", nums(3.75), "5 · (1 − 100/400) = 3,75 m.", "Sustituye x = 5."),
    calc("calc-cat", "Longitud de una catenaria", "Una catenaria de 20 m de luz y 5 m de flecha tiene longitud 23,02 m. La cuerda recta entre los apoyos mide 20 m. ¿Cuántos metros de arco hay más que de cuerda? (un decimal)", nums(3, 3.0), "23,0 − 20 = 3,0 m.", "Resta la cuerda."),
    calc("calc-ratio", "Relación flecha/luz", "Una cercha tiene 24 m de luz y 6 m de flecha. ¿Cuánto vale la relación flecha/luz?", nums(0.25), "6/24 = 0,25.", "Divide."),
    sort("clasifica-hit", "¿Quién y qué?", "Asocia cada hito con su aportación.",
      [["pax", "Paxton / Eiffel", "cobalt"], ["gau", "Gaudí", "amber"], ["can", "Candela", "emerald"], ["ful", "Fuller / Otto", "rose"]],
      [["Estructura prefabricada de hierro y vidrio", "pax"], ["Torre de hierro de unos 300 m", "pax"], ["Maquetas de cadenas y pesos", "gau"], ["Arcos catenarios", "gau"], ["Cascarones de hormigón de doble curvatura", "can"], ["Paraboloides hiperbólicos de hormigón", "can"], ["Cúpulas geodésicas", "ful"], ["Cubiertas tensadas de cables y membranas", "ful"]],
      "Cada autor explora una geometría que optimiza una forma de trabajo estructural.",
    ),
    pick("check-cat", "Por qué una cadena", "¿Por qué sirve una cadena colgada para diseñar un arco?",
      "Porque, invertida, su forma hace que todo el arco trabaje a compresión",
      [["Porque es más barata", "Es una cuestión estructural."], ["Porque la catenaria es una circunferencia", "No lo es."], ["Porque la cadena es rígida", "Una cadena solo resiste tracción."]],
      "La cadena solo soporta tracción; al invertirla, las fuerzas se vuelven compresiones.",
    ),
  ],
};
