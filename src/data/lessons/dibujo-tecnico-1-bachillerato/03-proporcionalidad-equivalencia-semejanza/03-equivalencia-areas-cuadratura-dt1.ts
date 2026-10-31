import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const equivalenciaAreasCuadraturaDt1Lesson: InteractiveLesson = {
  slug: "equivalencia-areas-cuadratura-dt1",
  title: "3. Equivalencia de figuras y cuadratura",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Distinta forma, misma área", [
      { kind: "steps", items: [
        "Dos figuras son **equivalentes** si tienen la **misma área**, aunque su forma sea distinta.",
        "Un triángulo con la **misma base** que un rectángulo y el **doble de altura** es equivalente a él.",
        "**Triángulos con la misma base y la misma altura** son equivalentes: sus vértices están en una paralela a la base.",
        "La **cuadratura** de una figura es hallar el **cuadrado equivalente**. Se hace en dos pasos: transformarla en un **rectángulo** equivalente y después aplicar la **media proporcional**: lado $= \\sqrt{b \\cdot h}$.",
      ] },
    ], undefined, "stack"),
    slide("equiv", "Compara áreas", [
      { kind: "text", text: "Cambia la base y la altura del rectángulo y observa el cuadrado y el triángulo con su misma área." },
    ], tool("dt1-equivalencia-explorador"), "visual-top"),
    slide("transforma", "Transformaciones habituales", [
      { kind: "steps", items: [
        "**Triángulo → rectángulo**: misma base y mitad de la altura. $A = \\dfrac{b \\cdot h}{2}$.",
        "**Paralelogramo → rectángulo**: misma base y misma altura. $A = b \\cdot h$.",
        "**Polígono → triángulo**: se sustituyen vértices por otros situados en paralelas a una diagonal, reduciendo un lado cada vez.",
        "**Rectángulo → cuadrado**: lado = media proporcional de la base y la altura.",
      ] },
    ]),
    calc("calc-lado", "Cuadrado equivalente", "Un rectángulo de 8 × 2 cm. ¿Cuánto mide el lado, en cm, del cuadrado de igual área?", nums(4), "√(8 · 2) = √16 = 4 cm (área 16 cm²).", "Media proporcional de 8 y 2."),
    calc("calc-tri", "Área de un triángulo", "¿Cuál es el área, en cm², de un triángulo de base 6 cm y altura 4 cm?", nums(12), "6 · 4 / 2 = 12 cm².", "Base por altura entre dos."),
    calc("calc-alt", "Triángulo equivalente", "Un triángulo con base 5 cm debe tener el área de un rectángulo de 5 × 3 cm. ¿Qué altura necesita, en cm?", nums(6), "A = 15; h = 2 · 15 / 5 = 6 cm.", "Dobla la altura del rectángulo."),
    sort("clasifica-equiv", "¿Equivalentes?", "Clasifica cada pareja de figuras según su relación.",
      [["eq", "Equivalentes", "cobalt"], ["no", "No equivalentes", "amber"]],
      [["Rectángulo 6 × 2 y cuadrado de lado √12", "eq"], ["Triángulo base 4 h 6 y rectángulo 4 × 3", "eq"], ["Dos triángulos con la misma base y la misma altura", "eq"], ["Rectángulo 6 × 2 y rectángulo 5 × 2", "no"], ["Cuadrado de lado 4 y triángulo base 4 h 4", "no"]],
      "Equivalente significa igual área, no igual forma.",
    ),
    pick("check-cuad", "Cuadratura", "¿Qué construcción se usa para transformar un rectángulo en un cuadrado equivalente?",
      "La media proporcional de la base y la altura",
      [["La bisectriz", "No relaciona longitudes de ese modo."], ["La mediatriz", "No da la raíz del producto."], ["La suma de la base y la altura", "Eso no conserva el área."]],
      "El lado del cuadrado es √(b·h).",
    ),
  ],
};
