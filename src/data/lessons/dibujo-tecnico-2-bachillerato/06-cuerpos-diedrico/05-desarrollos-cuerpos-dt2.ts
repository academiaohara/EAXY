import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const desarrollosCuerposDt2Lesson: InteractiveLesson = {
  slug: "desarrollos-cuerpos-dt2",
  title: "5. Desarrollos de cuerpos",
  subtitle: DT2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del cuerpo al patrón", [
      { kind: "steps", items: [
        "El **desarrollo** de un cuerpo es la figura plana que se obtiene al **extender** su superficie sobre un plano, sin deformarla.",
        "Es el **patrón de corte** de piezas de chapa, cartón o tela: de él se pasa al cuerpo **plegando**.",
        "Los poliedros se desarrollan **cara a cara**; los cuerpos de revolución (cilindro, cono) tienen superficies **desarrollables**.",
        "Hace falta la **verdadera magnitud** de cada arista y generatriz.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tres desarrollos", [
      { kind: "text", text: "Elige un cuerpo y cambia radio y altura. Observa la forma del patrón y el área lateral." },
    ], tool("dt2-desarrollo-cuerpos-explorador"), "visual-top"),
    slide("cono-anim", "De cono a sector", [
      { kind: "text", text: "Mira cómo se desarrolla un cono y de dónde salen el radio y el ángulo del sector." },
    ], anim("dt2-desarrollo-cono"), "visual-top"),
    slide("reglas", "Cómo se desarrolla", [
      { kind: "steps", items: [
        "**Prisma recto**: un rectángulo de largo la suma de los lados de la base y alto la altura (más las dos bases).",
        "**Pirámide recta**: **n triángulos** de base el lado y altura la **apotema lateral**, unidos por el vértice; más la base.",
        "**Cilindro**: un **rectángulo** de 2πr × h.",
        "**Cono**: un **sector circular** de radio la generatriz **g** y ángulo **360° · r / g**.",
        "Cuando el cuerpo está **cortado** por un plano, se calcula el desarrollo del tramo que queda, hallando la verdadera magnitud de cada arista cortada.",
      ] },
    ]),
    calc("calc-gen", "Generatriz", "Un cono de radio 3 cm y altura 4 cm. ¿Cuánto mide su generatriz, en cm?", nums(5), "√(9 + 16) = 5 cm.", "Triángulo 3-4-5."),
    calc("calc-sector", "Sector del cono", "Con ese cono, ¿qué ángulo tiene el sector desarrollado, 360 · r / g, en grados?", nums(216), "360 · 3 / 5 = 216°.", "Multiplica 360 por 3/5."),
    calc("calc-cil", "Rectángulo del cilindro", "Un cilindro de radio 2 cm y altura 5 cm. ¿Qué área lateral tiene, 2πrh, en cm²? (un decimal)", nums(62.8, 62.83), "2 · π · 2 · 5 ≈ 62,8 cm².", "2π por 10."),
    sort("clasifica", "Desarrollo de cada cuerpo", "Asocia cada característica con el cuerpo.",
      [["cil", "Cilindro", "cobalt"], ["con", "Cono", "amber"], ["pir", "Pirámide", "emerald"]],
      [["Rectángulo de 2πr × h", "cil"], ["El ancho del rectángulo es la longitud de la circunferencia", "cil"], ["Sector circular", "con"], ["Radio del sector: la generatriz", "con"], ["Triángulos unidos por el vértice", "pir"], ["Altura de los triángulos: la apotema lateral", "pir"]],
      "Cada cuerpo tiene su patrón característico.",
    ),
    pick("check", "Altura de las caras", "En el desarrollo de una pirámide recta de base regular, ¿qué es la altura de cada triángulo lateral?",
      "La apotema lateral",
      [["La altura de la pirámide", "Es menor que la altura del triángulo."], ["El lado de la base", "Es la base del triángulo."], ["El radio de la base", "No es."]],
      "Es la altura de cada cara lateral, √(h² + apotema de la base²).",
    ),
  ],
};
