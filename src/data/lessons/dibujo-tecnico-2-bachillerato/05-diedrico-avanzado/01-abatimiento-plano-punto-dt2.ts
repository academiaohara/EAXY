import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const abatimientoPlanoPuntoDt2Lesson: InteractiveLesson = {
  slug: "abatimiento-plano-punto-dt2",
  title: "1. Abatimiento de un plano: el punto y la charnela",
  subtitle: DT2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Por qué abatir", [
      { kind: "steps", items: [
        "Una figura contenida en un plano **oblicuo** se proyecta **deformada**: no se ven sus ángulos ni sus longitudes reales.",
        "El **abatimiento** gira el plano alrededor de una de sus **trazas** (la **charnela**) hasta hacerlo coincidir con el PH o el PV. Así se ve la figura **en verdadera forma**.",
        "En el giro, cada punto describe una **circunferencia** perpendicular a la charnela: en el PH, el punto abatido queda sobre la **perpendicular a la traza** por su proyección.",
        "Se llama **desabatimiento** a la operación inversa: devolver la figura a su posición.",
      ] },
    ], undefined, "stack"),
    slide("explora", "El triángulo de abatimiento", [
      { kind: "text", text: "Cambia la cota del punto y la inclinación del plano. Observa dónde cae el punto abatido P₀." },
    ], tool("dt2-abatimiento-punto-explorador"), "visual-top"),
    slide("triangulo", "El triángulo de abatimiento", [
      { kind: "text", text: "Sigue la construcción: de P′ y la cota al punto abatido P₀." },
    ], anim("dt2-abatimiento-punto"), "visual-top"),
    slide("pasos", "Cómo se abate un punto", [
      { kind: "steps", items: [
        "Se traza por **P′** la perpendicular a la traza horizontal (la charnela).",
        "Se mide la **distancia real** de P a la traza: es la hipotenusa del triángulo con catetos la **cota** y la **distancia de P′ a la traza**.",
        "Con el compás, centrado en el pie de la perpendicular sobre la traza, se lleva esa distancia sobre la perpendicular y se obtiene **P₀**.",
        "El **sentido** (hacia dónde cae P₀) depende de a qué lado de la traza queda el plano.",
      ] },
    ]),
    calc("calc-real", "Distancia real", "Un punto de cota 2 cm está en un plano inclinado 30° respecto del PH. ¿Cuál es su distancia real a la traza horizontal, z / sen φ, en cm?", nums(4), "2 / sen 30° = 2 / 0,5 = 4 cm.", "sen 30° = 0,5."),
    calc("calc-horiz", "Distancia horizontal", "Con esos mismos datos, ¿a qué distancia de la traza está P′ en la proyección horizontal, z / tg φ? (dos decimales, en cm)", nums(3.46, 3.464), "2 / tg 30° = 2 / 0,577 ≈ 3,46 cm.", "tg 30° ≈ 0,577."),
    sort("clasifica", "Elementos del abatimiento", "Asigna cada concepto a su descripción.",
      [["cha", "Charnela", "cobalt"], ["tri", "Triángulo de abatimiento", "amber"], ["des", "Desabatimiento", "emerald"]],
      [["Traza alrededor de la cual se gira el plano", "cha"], ["Sus puntos no se mueven al abatir", "cha"], ["Catetos: cota y distancia horizontal", "tri"], ["Su hipotenusa es la distancia real a la traza", "tri"], ["Devolver la figura a su posición original", "des"], ["Operación inversa del abatimiento", "des"]],
      "La charnela es fija; el triángulo da la distancia; el desabatimiento deshace el giro.",
    ),
    pick("check", "Distancias", "Al abatir un plano sobre el PH, ¿cómo es la distancia real de un punto a la charnela frente a la distancia de su proyección horizontal?",
      "Mayor o igual",
      [["Menor", "La hipotenusa nunca es menor que el cateto."], ["Siempre igual", "Solo si el plano es horizontal."], ["Depende del cuadrante", "La relación no cambia."]],
      "La distancia real es la hipotenusa; la proyectada, un cateto.",
    ),
  ],
};
