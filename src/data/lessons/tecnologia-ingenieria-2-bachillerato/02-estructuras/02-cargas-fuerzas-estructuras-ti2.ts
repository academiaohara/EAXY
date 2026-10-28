import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cargasFuerzasEstructurasTi2Lesson: InteractiveLesson = {
  slug: "cargas-fuerzas-estructuras-ti2",
  title: "2. Cargas y fuerzas sobre una estructura",
  subtitle: TECTI2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué cargas soporta", [
      { kind: "steps", items: [
        "**Permanentes**: el peso propio y los elementos fijos (cubierta, solados, instalaciones).",
        "**Variables o de uso**: personas, muebles, vehículos.",
        "**Ambientales**: viento, nieve, sismo, temperatura.",
        "Según su aplicación: **puntuales** (un pilar apoyado en una viga) y **repartidas** (el peso de un forjado), **uniformes** o **triangulares**.",
        "Las cargas se **combinan** y se **mayoran** (multiplican por un coeficiente) para dar margen de seguridad.",
      ] },
    ], undefined, "stack"),
    slide("res", "La resultante de una carga repartida", [
      { kind: "text", text: "Para calcular reacciones, una carga repartida se sustituye por una fuerza equivalente aplicada en su centro de gravedad." },
    ], tool("ti2-carga-repartida-explorador"), "visual-top"),
    slide("peso", "Peso propio", [
      { kind: "steps", items: [
        "Peso = volumen × **densidad** × g. Un metro de una viga de hormigón armado de 30 × 50 cm pesa unos 3,75 kN.",
        "En una viga larga el **peso propio** puede ser la carga principal.",
        "Se estima la sección y se recalcula (el diseño es **iterativo**).",
      ] },
    ]),
    calc("calc-q", "Resultante uniforme", "Una carga de 12 kN/m actúa sobre 5 m de viga. ¿Cuántos kN vale su resultante?", nums(60), "12 · 5 = 60 kN.", "Carga por longitud."),
    calc("calc-tri", "Resultante triangular", "Una carga triangular con máximo de 12 kN/m en 5 m, ¿cuántos kN vale su resultante? (q·L/2)", nums(30), "12 · 5 / 2 = 30 kN.", "Área del triángulo."),
    calc("calc-pos", "Posición", "Esa carga triangular, ¿a cuántos m del extremo sin carga se aplica la resultante? (2L/3, redondea a dos decimales)", nums(3.33), "2 · 5 / 3 = 3,33 m.", "Dos tercios de la longitud."),
    sort("clasifica-carga", "¿Qué tipo de carga?", "Clasifica cada acción.",
      [["per", "Permanente", "cobalt"], ["var", "Variable o de uso", "amber"], ["amb", "Ambiental", "emerald"]],
      [["Peso de la propia estructura", "per"], ["Solado y tabiques fijos", "per"], ["Personas y muebles", "var"], ["Vehículos sobre un puente", "var"], ["Viento sobre una fachada", "amb"], ["Nieve sobre la cubierta", "amb"]],
      "Cada tipo se trata con coeficientes distintos.",
    ),
    pick("check-res", "Para qué sirve", "¿Para qué se sustituye una carga repartida por su resultante?",
      "Para calcular las reacciones y el equilibrio global de forma sencilla",
      [["Para calcular la flecha exacta en cada punto", "Para eso hay que usar la carga real."], ["Para eliminar la carga", "La carga sigue existiendo."], ["Para reducir el peso", "No cambia el peso."]],
      "La resultante es equivalente solo a efectos de equilibrio global.",
    ),
  ],
};
