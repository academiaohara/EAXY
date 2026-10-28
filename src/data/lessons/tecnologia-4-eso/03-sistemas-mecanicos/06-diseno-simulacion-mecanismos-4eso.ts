import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disenoSimulacionMecanismos4esoLesson: InteractiveLesson = {
  slug: "diseno-simulacion-mecanismos-4eso",
  title: "6. Diseño y simulación de mecanismos",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Probar antes de construir", [
      { kind: "steps", items: [
        "Un **mecanismo** se diseña a partir de lo que debe hacer: transformar un movimiento, reducir velocidad, elevar una carga.",
        "El software **CAD** permite modelar las piezas y ensamblarlas con **restricciones** (ejes, contactos, engranes).",
        "La **simulación cinemática** mueve el mecanismo y detecta **interferencias** y movimientos imposibles.",
        "Se comparan alternativas con **criterios**: relación necesaria, par, tamaño, coste, rendimiento.",
        "Después se **fabrica un prototipo** y se mide para validar el modelo.",
      ] },
    ], undefined, "stack"),
    slide("elev", "Dimensiona un elevador", [
      { kind: "text", text: "Una máquina completa: motor, reductora y polea para elevar una carga. Calcula lo que hace falta." },
    ], tool("eso2-elevador-explorador"), "visual-top"),
    slide("grua", "Una grúa", [
      { kind: "text", text: "Compara aparejos y comprueba cómo se reparten la fuerza y la distancia." },
    ], tool("eso3-grua-explorador"), "visual-top"),
    slide("biela", "Simula un mecanismo", [
      { kind: "text", text: "Cambia las medidas de la manivela y la biela y comprueba la carrera antes de fabricarlas." },
    ], tool("eso4-biela-explorador"), "visual-top"),
    slide("crit", "Criterios de selección", [
      { kind: "steps", items: [
        "**Necesidad**: ¿qué velocidad y par se necesitan a la salida?",
        "**Solución**: ¿engranajes, correa, cadena, tornillo?",
        "**Cálculo**: relación, rendimiento y potencia del motor con margen de seguridad.",
        "**Viabilidad**: tamaño, ruido, coste, mantenimiento y seguridad.",
      ] },
    ]),
    calc("calc-par", "Par necesario", "Para elevar una carga de 20 kg con un tambor de radio 0,05 m (g = 9,81), ¿qué par se necesita a la salida, en N·m? (m·g·r, redondea a un decimal)", nums(9.8, 9.81), "20 · 9,81 · 0,05 = 9,81 N·m.", "Fuerza (peso) por radio."),
    calc("calc-i", "Relación necesaria", "El motor da 0,1 N·m y se necesitan 9,81 N·m a la salida (rendimiento 0,9). ¿Qué relación de transmisión mínima hace falta? (9,81 / (0,1·0,9), redondea a un entero)", nums(109, 109.0), "9,81 / 0,09 ≈ 109.", "Par necesario entre par motor por rendimiento."),
    sort("clasifica-dis", "Orden del diseño", "Coloca cada acción en su fase.",
      [["ana", "Analizar", "cobalt"], ["dis", "Diseñar y simular", "amber"], ["val", "Validar", "emerald"]],
      [["Fijar el par y la velocidad de salida", "ana"], ["Elegir el tipo de mecanismo", "ana"], ["Modelar en CAD y mover el ensamblaje", "dis"], ["Comprobar interferencias", "dis"], ["Construir un prototipo y medirlo", "val"], ["Comparar medida y simulación", "val"]],
      "Se pasa de lo teórico a lo físico paso a paso.",
    ),
    pick("check-sim", "Limitación", "La simulación cinemática da que el mecanismo funciona, pero el prototipo se atasca. ¿Qué pudo faltar en el modelo?",
      "El rozamiento, las holguras y las tolerancias reales de fabricación",
      [["Nada, el prototipo está mal siempre", "El modelo puede ser incompleto."], ["El color de las piezas", "No influye."], ["La hora del día", "No influye."]],
      "Un modelo ideal ignora detalles que importan en la realidad.",
    ),
  ],
};
