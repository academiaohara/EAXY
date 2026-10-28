import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disenoSostenibilidadProyectoDt2Lesson: InteractiveLesson = {
  slug: "diseno-sostenibilidad-proyecto-dt2",
  title: "6. Diseño, proyecto y sostenibilidad",
  subtitle: DT2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del encargo al plano", [
      { kind: "steps", items: [
        "Un **proyecto** de diseño pasa por fases: **necesidad**, **ideas** (bocetos), **desarrollo** (planos, cálculo, materiales), **prototipo**, **evaluación** y **documentación** final.",
        "El **dibujo técnico** es el lenguaje de todo el proceso: boceto a mano, planos normalizados, modelos 3D.",
        "La **documentación** del proyecto reúne memoria, planos, pliego de condiciones y presupuesto.",
        "Las decisiones de diseño condicionan el **coste**, la **fabricación** y el **impacto ambiental** del producto.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Material y huella", [
      { kind: "text", text: "Cambia el material, el volumen y el porcentaje de reciclado. Compara la masa y la huella orientativa de la pieza." },
    ], tool("dt2-huella-material-explorador"), "visual-top"),
    slide("eco", "Ecodiseño", [
      { kind: "steps", items: [
        "Se considera todo el **ciclo de vida**: materias primas, fabricación, transporte, uso, mantenimiento y **fin de vida**.",
        "Estrategias: **reducir material** (aligerar, optimizar la forma), usar **materiales reciclados o reciclables**, evitar **mezclas** difíciles de separar.",
        "Diseñar para **alargar la vida** (reparable, actualizable, modular) y para **desmontar** fácilmente.",
        "La **normalización** ayuda: piezas estándar se reutilizan y se reparan.",
      ] },
    ]),
    slide("eval", "Evaluar alternativas", [
      { kind: "steps", items: [
        "Se comparan alternativas con **criterios** (coste, resistencia, fabricabilidad, peso, impacto) y se **ponderan**.",
        "Las cifras ambientales son **órdenes de magnitud**: sirven para comparar, no para certificar.",
        "Un buen diseño no es el más barato ni el más ligero, sino el que **cumple la función** con menos recursos a lo largo de su vida.",
      ] },
    ]),
    calc("calc-masa", "Masa de una pieza", "Una pieza de acero de 200 cm³ (7,85 g/cm³). ¿Cuántos kg pesa?", nums(1.57), "7,85 · 200 = 1570 g = 1,57 kg.", "Densidad por volumen, en kg."),
    calc("calc-alu", "Cambio de material", "La misma pieza en aluminio (2,7 g/cm³), ¿cuántos kg pesa? (dos decimales)", nums(0.54), "2,7 · 200 = 540 g = 0,54 kg.", "Densidad por volumen."),
    sort("clasifica", "Estrategia de ecodiseño", "Clasifica cada medida según la fase del ciclo de vida a la que ayuda.",
      [["mat", "Materias y fabricación", "cobalt"], ["uso", "Uso y vida útil", "amber"], ["fin", "Fin de vida", "emerald"]],
      [["Aligerar la pieza", "mat"], ["Usar material reciclado", "mat"], ["Diseñar piezas reparables", "uso"], ["Hacer el producto modular y actualizable", "uso"], ["Facilitar el desmontaje", "fin"], ["Evitar mezclas de materiales", "fin"]],
      "Cada medida actúa en una fase del ciclo de vida.",
    ),
    pick("check", "Ciclo de vida", "¿Qué fases abarca el análisis del ciclo de vida de un producto?",
      "Desde las materias primas hasta su fin de vida",
      [["Solo la fabricación", "Es más amplio."], ["Solo el uso", "Es más amplio."], ["Solo el reciclaje", "Es más amplio."]],
      "Se consideran materias primas, fabricación, transporte, uso y fin de vida.",
    ),
  ],
};
