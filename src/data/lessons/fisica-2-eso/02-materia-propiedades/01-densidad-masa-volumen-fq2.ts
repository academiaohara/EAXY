import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const densidadMasaVolumenFq2Lesson: InteractiveLesson = {
  slug: "densidad-masa-volumen-fq2",
  title: "1. Masa, volumen y densidad",
  subtitle: FQ2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿Qué es la materia?", [
      { kind: "steps", items: [
        "**Materia** es todo lo que tiene **masa** y ocupa un **volumen**, es decir, un lugar en el espacio.",
        "La **masa** mide la cantidad de materia; se expresa en **kg** (o g). No cambia de un lugar a otro.",
        "El **volumen** mide el espacio que ocupa; se expresa en **m³**, **L** o **cm³** (1 L = 1000 cm³ = 1000 mL).",
        "Son propiedades **generales**: las tienen todos los cuerpos. Otras, como la densidad, son **características** de cada sustancia.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Flota o se hunde?", [
      { kind: "text", text: "Cambia la masa y el volumen del bloque y el líquido. Compara la densidad del bloque con la del líquido." },
    ], tool("fq2-densidad-flotacion-explorador"), "visual-top"),
    slide("dens", "La densidad", [
      { kind: "steps", items: [
        "La **densidad** relaciona masa y volumen: **ρ = m / V**.",
        "Se mide en **g/cm³** o en **kg/m³** (1 g/cm³ = 1000 kg/m³).",
        "Es una **propiedad característica**: un trozo pequeño de hierro y uno grande tienen la **misma densidad**, aunque distinta masa.",
        "Sirve para **identificar** sustancias y para saber si un cuerpo **flota** (menos denso que el líquido) o se **hunde** (más denso).",
      ] },
    ]),
    slide("volumen", "Medir el volumen de un sólido", [
      { kind: "steps", items: [
        "Si el sólido tiene **forma regular**, se calcula con una fórmula: cubo = lado³.",
        "Si es **irregular**, se **sumerge** en una probeta con agua: el **volumen** del sólido es lo que sube el nivel.",
        "La masa se mide con una **balanza** y después se aplica ρ = m / V.",
      ] },
    ]),
    calc("calc-rho", "Calcula una densidad", "Un trozo de metal tiene 270 g de masa y ocupa 100 cm³. ¿Cuál es su densidad, en g/cm³?", nums(2.7), "ρ = 270 / 100 = 2,7 g/cm³ (la del aluminio).", "Divide la masa entre el volumen."),
    calc("calc-m", "Calcula una masa", "El agua tiene 1 g/cm³. ¿Qué masa tienen 250 cm³ de agua, en g?", nums(250), "m = ρ · V = 1 · 250 = 250 g.", "Multiplica la densidad por el volumen."),
    calc("calc-v", "Calcula un volumen", "El aceite tiene 0,92 g/cm³. ¿Qué volumen ocupan 46 g de aceite, en cm³?", nums(50), "V = m / ρ = 46 / 0,92 = 50 cm³.", "Divide la masa entre la densidad."),
    sort("clasifica", "¿Flota en agua?", "Compara con la densidad del agua (1 g/cm³) y clasifica cada material.",
      [["flo", "Flota en agua", "cobalt"], ["hun", "Se hunde en agua", "amber"]],
      [["Corcho (0,24 g/cm³)", "flo"], ["Madera de pino (0,5 g/cm³)", "flo"], ["Hielo (0,92 g/cm³)", "flo"], ["Hierro (7,9 g/cm³)", "hun"], ["Aluminio (2,7 g/cm³)", "hun"], ["Plomo (11,3 g/cm³)", "hun"]],
      "Flota lo que tiene menos densidad que el líquido.",
    ),
    pick("check", "Propiedad característica", "Se corta un trozo de un cubo de hierro. ¿Qué ocurre con la densidad del trozo?",
      "Es la misma que la del cubo entero",
      [["Es menor, porque pesa menos", "La densidad no depende de la cantidad."], ["Es mayor, porque es más pequeño", "Tampoco aumenta."], ["Depende del color", "No tiene que ver con el color."]],
      "La densidad es una propiedad característica: no cambia con la cantidad de sustancia.",
    ),
  ],
};
