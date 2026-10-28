import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const acerosTratamientosTermicos4esoLesson: InteractiveLesson = {
  slug: "aceros-tratamientos-termicos-4eso",
  title: "3. Aceros, fundiciones y tratamientos térmicos",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Aleaciones de hierro y carbono", [
      { kind: "steps", items: [
        "Una **aleación** mezcla un metal con otros elementos para mejorar sus propiedades.",
        "**Acero**: hierro con **hasta un 2,1 % de carbono**. **Fundición**: más del 2,1 %.",
        "Más carbono = **más dureza y resistencia**, pero **menos ductilidad** y peor soldabilidad.",
        "Se añaden otros elementos: **cromo** (resistencia a la corrosión: acero inoxidable), **níquel**, **manganeso**, **vanadio**.",
        "Las **aleaciones no férreas** (aluminio, cobre, titanio) se eligen por su ligereza, conductividad o resistencia a la corrosión.",
      ] },
    ], undefined, "stack"),
    slide("acero", "El carbono decide", [
      { kind: "text", text: "Cambia el porcentaje de carbono: mira el tipo de acero y su dureza recocido y templado." },
    ], tool("eso4-acero-explorador"), "visual-top"),
    slide("trat", "Tratamientos térmicos", [
      { kind: "steps", items: [
        "**Temple**: calentar por encima de ~800 °C y enfriar **rápido** (agua, aceite): máxima dureza, pero fragilidad.",
        "**Revenido**: calentar moderadamente tras el temple: **reduce la fragilidad** y conserva buena dureza.",
        "**Recocido**: calentar y enfriar **muy lentamente**: ablanda y elimina tensiones.",
        "**Normalizado**: enfriar al aire: afina el grano.",
        "Los **tratamientos superficiales** (cementación, nitruración) endurecen solo la capa exterior.",
      ] },
    ]),
    slide("prest", "Elegir el material", [
      { kind: "text", text: "Compara resistencia, densidad y coste de varios materiales para una aplicación." },
    ], tool("eso3-prestaciones-explorador"), "visual-top"),
    calc("calc-c", "Tipo de acero", "Un acero tiene un 0,45 % de carbono. ¿Es de bajo, medio o alto carbono? (responde 1, 2 o 3)", nums(2), "Entre 0,25 % y 0,6 % es de medio carbono: 2.", "Compara con los intervalos."),
    calc("calc-fe", "Hierro en una aleación", "Un acero tiene un 1,2 % de carbono y un 0,8 % de otros elementos. ¿Qué porcentaje es hierro?", nums(98), "100 − 1,2 − 0,8 = 98 %.", "Resta lo demás al 100 %."),
    sort("clasifica-trat", "¿Qué tratamiento?", "Relaciona cada efecto con el tratamiento.",
      [["tem", "Temple", "rose"], ["rev", "Revenido", "amber"], ["rec", "Recocido", "cobalt"]],
      [["Enfriamiento rápido en agua", "tem"], ["Máxima dureza", "tem"], ["Se hace después del temple", "rev"], ["Reduce la fragilidad", "rev"], ["Enfriamiento muy lento en el horno", "rec"], ["Ablanda y elimina tensiones", "rec"]],
      "Cada tratamiento busca un equilibrio distinto entre dureza y tenacidad.",
    ),
    pick("check-inox", "Inoxidable", "¿Qué elemento de aleación hace que un acero sea inoxidable?",
      "El cromo, que forma una capa protectora",
      [["El plomo", "No protege."], ["El carbono", "Lo endurece."], ["El oxígeno", "Lo oxidaría."]],
      "Con más del 10,5 % de cromo se forma la capa de óxido protectora.",
    ),
  ],
};
