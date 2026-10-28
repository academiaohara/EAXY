import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const busquedaOrdenacionAlgoritmos4esoLesson: InteractiveLesson = {
  slug: "busqueda-ordenacion-algoritmos-4eso",
  title: "6. Búsqueda, ordenación y eficiencia",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Buscar descartando la mitad", [
      { kind: "text", text: "Mira cómo la búsqueda binaria encuentra un número en una lista ordenada con muy pocas comparaciones." },
    ], anim("eso4-busqueda-binaria"), "text-top"),
    slide("busq", "Lineal frente a binaria", [
      { kind: "text", text: "Elige el número y compara cuántas comparaciones necesita cada método." },
    ], tool("eso4-busqueda-explorador"), "visual-top"),
    slide("prog", "La búsqueda en Python", [
      { kind: "text", text: "Este es el programa de la búsqueda binaria. Ejecútalo y sigue las variables bajo, alto y medio." },
    ], tool("python-traza-explorador", { n: 10 }), "visual-top"),
    slide("orden", "Ordenar una lista", [
      { kind: "text", text: "El método de la burbuja compara vecinos y los intercambia. Avanza paso a paso." },
    ], tool("eso4-ordenacion-explorador"), "visual-top"),
    slide("efic", "Eficiencia", [
      { kind: "text", text: "No todos los algoritmos crecen igual. Mira cuántas operaciones necesita cada uno al aumentar los datos." },
    ], tool("eso4-complejidad-explorador"), "visual-top"),
    calc("calc-bin", "Comparaciones", "¿Cuántas comparaciones, como máximo, necesita la búsqueda binaria en una lista de 16 elementos? (⌊log₂ 16⌋ + 1)", nums(5), "log₂ 16 = 4, y 4 + 1 = 5.", "Cada paso descarta la mitad."),
    calc("calc-lin", "Peor caso lineal", "En una lista de 1 000 elementos, ¿cuántas comparaciones hace como máximo la búsqueda lineal?", nums(1000), "Si el objetivo es el último o no está, revisa todos: 1 000.", "Revisa todos los elementos."),
    sort("clasifica-alg", "Búsqueda lineal o binaria", "Relaciona cada característica con el método.",
      [["lin", "Lineal", "cobalt"], ["bin", "Binaria", "amber"]],
      [["Funciona con listas sin ordenar", "lin"], ["Revisa elemento por elemento", "lin"], ["Muy rápida con muchos datos", "bin"], ["Requiere la lista ordenada", "bin"], ["Descarta la mitad en cada paso", "bin"], ["Sencilla de programar", "lin"]],
      "Cada método tiene su ventaja.",
    ),
    pick("check-orden", "Para qué ordenar", "¿Por qué compensa ordenar una lista que se va a consultar muchas veces?",
      "Porque permite usar búsqueda binaria, mucho más rápida que la lineal",
      [["Porque queda más bonita", "Es una razón técnica."], ["Porque ocupa menos memoria", "No cambia."], ["No compensa nunca", "Con muchas consultas sí."]],
      "Se paga una vez el coste de ordenar y se gana en cada consulta.",
    ),
  ],
};
