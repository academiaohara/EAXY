import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poleasPolipastoBasicoLesson: InteractiveLesson = {
  slug: "poleas-polipasto-basico",
  title: "3. Poleas y polipastos",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una rueda con una cuerda", [
      { kind: "definition", text: "Una **polea** es una rueda con una ranura por la que pasa una cuerda. Sirve para **cambiar la dirección de una fuerza** o para **reducirla**." },
      { kind: "steps", items: [
        "**Polea fija**: su eje no se mueve. Solo cambia la dirección de la fuerza: $F = R$.",
        "**Polea móvil**: el eje sube con la carga y la cuerda tiene un extremo fijo. Reduce la fuerza a la mitad: $F = R/2$.",
        "**Polipasto (aparejo)**: combina varias poleas fijas y móviles. Con $n$ cuerdas sosteniendo la carga: $F = R/n$.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Fija frente a móvil", [
      { kind: "text", text: "Compara la fuerza que hay que hacer sin polea, con polea fija y con polea móvil." },
    ], anim("polea-fija-movil"), "split"),
    slide("explora", "Cuantas más cuerdas, menos fuerza", [
      { kind: "text", text: "Aumenta el número de cuerdas que sostienen la carga y mira cómo baja la fuerza. Fíjate también en cuánta cuerda hay que recoger." },
    ], tool("poleas-aparejo-explorador", { n: 1, a: 80 }), "visual-top"),
    calc("calc-movil", "Con polea móvil", "Una carga de 90 kg cuelga de una polea móvil (dos cuerdas). ¿Qué fuerza en kg hay que hacer?",
      nums(45), "F = R ÷ 2 = 90 ÷ 2 = 45 kg.", "La polea móvil reparte la carga entre dos cuerdas."),
    calc("calc-polipasto", "Con un polipasto", "Un polipasto tiene 4 cuerdas sosteniendo una carga de 200 kg. ¿Qué fuerza hay que hacer, en kg?",
      nums(50), "F = R ÷ n = 200 ÷ 4 = 50 kg.", "Divide la carga entre el número de cuerdas."),
    calc("calc-cuerda", "Cuerda recogida", "Con el polipasto anterior (4 cuerdas), ¿cuántos metros de cuerda hay que recoger para subir la carga 2 m?",
      nums(8), "Se recoge n veces la altura: 4 · 2 m = 8 m.", "Multiplica el número de cuerdas por la altura."),
    sort("clasifica-polea", "Fija, móvil o polipasto", "Relaciona cada situación con el tipo de polea.",
      [["fij", "Polea fija", "cobalt"], ["mov", "Polea móvil", "amber"], ["pol", "Polipasto", "emerald"]],
      [["Subir una cubeta de un pozo tirando hacia abajo", "fij"], ["La cuerda de una persiana", "fij"], ["Una polea cuyo eje sube con la carga", "mov"], ["Reduce la fuerza a la mitad", "mov"], ["Varias poleas fijas y móviles combinadas", "pol"], ["Elevar un motor en un taller con un aparejo", "pol"]],
      "La fija solo cambia la dirección; la móvil divide la fuerza entre dos; el polipasto combina varias para dividirla aún más.",
    ),
    pick("check-polea", "¿Qué ganas con la polea fija?", "¿Cuál es la ventaja de una polea fija?",
      "Cambia la dirección de la fuerza: se tira hacia abajo para subir la carga",
      [["Reduce la fuerza a la mitad", "Eso lo hace la polea móvil."], ["Reduce el recorrido de la cuerda", "No cambia el recorrido: se tira lo mismo que sube la carga."], ["Hace que la carga pese menos", "El peso de la carga no cambia."]],
      "La polea fija no reduce el esfuerzo, pero permite aprovechar tu propio peso al tirar hacia abajo.",
    ),
  ],
};
