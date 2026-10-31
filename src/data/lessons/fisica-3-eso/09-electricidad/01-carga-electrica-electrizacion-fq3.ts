import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cargaElectricaElectrizacionFq3Lesson: InteractiveLesson = {
  slug: "carga-electrica-electrizacion-fq3",
  title: "1. Carga eléctrica y electrización",
  subtitle: FQ3_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "La carga eléctrica", [
      { kind: "steps", items: [
        "La materia está formada por átomos con **protones** (carga **positiva**), **electrones** (carga **negativa**) y neutrones (sin carga).",
        "Un cuerpo es **neutro** si tiene tantos protones como electrones. Si **gana electrones** queda cargado **negativamente**; si los **pierde**, **positivamente**. Solo se mueven los electrones.",
        "La carga se mide en **culombios (C)**. La carga de un electrón es de **1,6 · 10⁻¹⁹ C**.",
        "La **carga se conserva**: no se crea ni se destruye, solo pasa de un cuerpo a otro.",
      ] },
    ], undefined, "stack"),
    slide("elec", "Electrizar un cuerpo", [
      { kind: "steps", items: [
        "**Por frotamiento**: al frotar dos materiales, pasan electrones de uno a otro (un peine con el pelo, un globo con un jersey).",
        "**Por contacto**: un cuerpo cargado cede o recibe electrones al tocar a otro.",
        "**Por inducción**: un cuerpo cargado, sin tocar, reorganiza las cargas de otro.",
        "Los **conductores** (metales) dejan que las cargas se muevan por ellos; los **aislantes** (plástico, vidrio, madera seca) no.",
      ] },
    ]),
    slide("explora", "Ley de Coulomb", [
      { kind: "text", text: "Cambia el signo y el valor de las dos cargas y la distancia. ¿Cuándo se atraen y cuándo se repelen?" },
    ], tool("fq3-carga-coulomb-explorador"), "visual-top"),
    slide("coulomb", "La fuerza entre cargas", [
      { kind: "steps", items: [
        "Cargas de **igual signo** se **repelen**; de **signo contrario** se **atraen**.",
        "**Ley de Coulomb**: F = k · |q₁ · q₂| / r², con k ≈ 9 · 10⁹ N·m²/C².",
        "Si se **duplica** la distancia, la fuerza se divide por **4**; si se duplica una carga, la fuerza se **duplica**.",
      ] },
    ]),
    calc("calc-q", "Carga neta", "Un objeto neutro pierde 3 electrones. ¿Cuántas cargas elementales positivas tiene en exceso? (número)", nums(3), "Ha perdido 3 cargas negativas: queda con +3 cargas elementales.", "Pierde electrones, queda positivo."),
    calc("calc-f", "Fuerza", "Dos cargas de 4 µC están a 0,5 m. F = 9·10⁹ · (4·10⁻⁶)² / 0,5². ¿Cuánto vale F, en N? (redondea a un decimal)", nums(0.6, 0.58, 0.576), "F = 9·10⁹ · 16·10⁻¹² / 0,25 = 0,576 N.", "Sustituye en la ley de Coulomb."),
    calc("calc-r", "Doble de distancia", "Dos cargas se repelen con 8 N. Si se duplica la distancia, ¿con qué fuerza se repelen, en N?", nums(2), "Se divide entre 2² = 4: 2 N.", "La fuerza depende de 1/r²."),
    sort("clasifica", "Conductor o aislante", "Clasifica cada material.",
      [["co", "Conductor", "amber"], ["ai", "Aislante", "cobalt"]],
      [["Cobre", "co"], ["Aluminio", "co"], ["Agua con sales", "co"], ["Plástico", "ai"], ["Vidrio", "ai"], ["Madera seca", "ai"]],
      "Los conductores permiten el paso de cargas.",
    ),
    pick("check", "Atracción", "Un globo frotado con lana se pega a la pared. ¿Por qué?",
      "Porque el globo cargado induce carga contraria en la pared y se atraen",
      [["Porque la pared tiene imanes", "No es magnetismo."], ["Porque el globo pesa menos", "No es cuestión de peso."], ["Porque el aire lo empuja", "No es el aire."]],
      "Fuerza eléctrica entre cargas de signo contrario.",
    ),
  ],
};
