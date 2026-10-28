import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poliedrosRegularesDt2Lesson: InteractiveLesson = {
  slug: "poliedros-regulares-dt2",
  title: "4. Poliedros regulares",
  subtitle: DT2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los cinco sólidos platónicos", [
      { kind: "steps", items: [
        "Un **poliedro regular** tiene todas las **caras** iguales (polígonos regulares) y en cada **vértice** concurren las mismas caras.",
        "Solo existen **cinco**: **tetraedro** (4 caras triangulares), **cubo** (6 cuadrados), **octaedro** (8 triángulos), **dodecaedro** (12 pentágonos) e **icosaedro** (20 triángulos).",
        "Todos cumplen la **relación de Euler**: **V − A + C = 2**.",
        "Se llaman también **sólidos platónicos**: Platón los asoció a los cuatro elementos y al cosmos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Los cinco poliedros", [
      { kind: "text", text: "Elige un poliedro. Comprueba caras, aristas y vértices, y observa cómo crecen su área y su volumen con la arista." },
    ], tool("dt2-poliedros-regulares-explorador"), "visual-top"),
    slide("dualidad", "Dualidad y simetrías", [
      { kind: "steps", items: [
        "El **cubo** y el **octaedro** son **duales**: los centros de las caras de uno son los vértices del otro. También el **dodecaedro** y el **icosaedro**.",
        "El **tetraedro** es dual de sí mismo.",
        "Todos se pueden **inscribir en una esfera**: sus vértices están a la misma distancia del centro (radio circunscrito).",
        "En diédrico se representan colocando una cara o una arista en el PH y hallando los demás vértices con **giros y abatimientos**.",
      ] },
    ]),
    calc("calc-euler", "Euler", "Un dodecaedro tiene 12 caras y 30 aristas. Según Euler, ¿cuántos vértices tiene?", nums(20), "V = 2 + A − C = 2 + 30 − 12 = 20.", "Despeja V en V − A + C = 2."),
    calc("calc-cubo", "Volumen del cubo", "Un cubo de arista 4 cm. ¿Qué volumen tiene, en cm³?", nums(64), "4³ = 64 cm³.", "Arista al cubo."),
    calc("calc-oct", "Aristas del octaedro", "Un octaedro tiene 6 vértices y 8 caras. ¿Cuántas aristas tiene?", nums(12), "A = V + C − 2 = 6 + 8 − 2 = 12.", "Euler."),
    sort("clasifica", "Caras de cada poliedro", "Clasifica cada poliedro según la forma de sus caras.",
      [["tri", "Caras triangulares", "cobalt"], ["cua", "Caras cuadradas", "amber"], ["pen", "Caras pentagonales", "emerald"]],
      [["Tetraedro", "tri"], ["Octaedro", "tri"], ["Icosaedro", "tri"], ["Cubo", "cua"], ["Hexaedro regular", "cua"], ["Dodecaedro", "pen"]],
      "Tres poliedros con triángulos, el cubo con cuadrados y el dodecaedro con pentágonos.",
    ),
    pick("check", "Dual", "¿Cuál es el poliedro dual del cubo?",
      "El octaedro",
      [["El tetraedro", "Es dual de sí mismo."], ["El dodecaedro", "Su dual es el icosaedro."], ["El prisma", "No es regular."]],
      "Los centros de las caras del cubo son los vértices de un octaedro.",
    ),
  ],
};
