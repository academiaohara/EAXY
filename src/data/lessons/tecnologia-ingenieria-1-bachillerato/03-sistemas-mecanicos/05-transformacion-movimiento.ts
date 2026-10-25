import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transformacionMovimientoLesson: InteractiveLesson = {
  slug: "transformacion-movimiento",
  title: "5. Transformación del movimiento",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Cambiar el tipo de movimiento", [
      { kind: "steps", items: [
        "**Biela-manivela**: giro continuo ↔ vaivén lineal (motor de combustión, limpiaparabrisas).",
        "**Leva y seguidor**: giro → movimiento lineal programado por la forma de la leva (válvulas del motor).",
        "**Piñón-cremallera**: giro ↔ avance lineal (dirección de un coche, taladro de columna).",
        "**Tornillo-tuerca**: giro → avance lineal lento y con mucha fuerza (gato, prensa, impresora 3D).",
        "**Mecanismos articulados**: barras unidas por articulaciones que guían un movimiento (cuadrilátero articulado, pantógrafo).",
      ] },
      { kind: "text", text: "Muchos de estos mecanismos son **reversibles** (el movimiento lineal puede generar giro) y otros no, y eso condiciona su uso." },
    ], undefined, "stack"),
    slide("biela", "Biela-manivela", [
      { kind: "text", text: "Gira la manivela de 0° a 360° y observa el émbolo. La **carrera** es el recorrido total del émbolo y vale **2R**." },
    ], anim("biela-manivela-ciclo"), "split"),
    slide("biela-sim", "Manipula la biela-manivela", [
      { kind: "text", text: "Cambia el radio de la manivela y la longitud de la biela. ¿Qué dato modifica la carrera y cuál solo cambia el movimiento intermedio?" },
    ], tool("biela-manivela-explorador"), "visual-top"),
    slide("leva", "Leva y seguidor", [
      { kind: "definition", text: "Una **leva** es una pieza de perfil especial que, al girar, empuja a un **seguidor** y le obliga a subir y bajar según una ley prefijada. El perfil de la leva *programa* el movimiento." },
    ], tool("leva-seguidor-explorador"), "split"),
    slide("lineal", "Piñón-cremallera y tornillo-tuerca", [
      { kind: "facts", items: [
        { tex: "d = 2\\pi r\\cdot N", label: "piñón-cremallera: avance tras N vueltas" },
        { tex: "d = p\\cdot N", label: "tornillo-tuerca: avance = paso × vueltas" },
      ] },
      { kind: "text", text: "Compara cuánto avanza cada mecanismo por vuelta: por eso el tornillo se usa para mover cargas con precisión." },
    ], tool("cremallera-tornillo-explorador", { n: 0, a: 20, c: 60 }), "visual-top"),
    calc("calc-carrera", "Carrera del émbolo", "La manivela de un mecanismo biela-manivela mide $R = 40$ mm. ¿Cuál es la carrera del émbolo, en mm?",
      nums(80), "La carrera es la distancia entre los dos puntos muertos: $2R = 80$ mm.", "2·R."),
    calc("calc-tornillo", "Avance de un tornillo", "Un tornillo de paso $1{,}5$ mm da $20$ vueltas en una tuerca fija. ¿Cuántos mm avanza?",
      nums(30), "$d = p\\cdot N = 1{,}5\\cdot 20 = 30$ mm.", "Paso por número de vueltas."),
    sort("clasifica-mec", "¿Qué mecanismo usarías?", "Asigna el mecanismo más adecuado a cada necesidad.",
      [["bm", "Biela-manivela", "cobalt"], ["lev", "Leva y seguidor", "amber"], ["pc", "Piñón-cremallera", "emerald"], ["tt", "Tornillo-tuerca", "violet"]],
      [["Convertir el giro de un motor en vaivén de un émbolo", "bm"], ["Abrir una válvula en un instante determinado del ciclo", "lev"], ["Mover rápido la columna de dirección de un coche", "pc"], ["Elevar un coche con un gato de manivela", "tt"], ["Mover la cabeza de una impresora 3D con precisión", "tt"], ["Hacer que una escobilla vaya y venga", "bm"]],
      "Cada mecanismo tiene su ventaja: la biela-manivela da vaivén; la leva, movimiento programado; la cremallera, avance rápido; el tornillo, fuerza y precisión.",
    ),
    pick("check-irrev", "Reversible o no", "¿Qué mecanismo suele ser irreversible, de modo que la carga no puede hacer girar el tornillo?",
      "Tornillo-tuerca con paso pequeño",
      [["Piñón-cremallera", "Es reversible: si empujas la cremallera, el piñón gira."], ["Biela-manivela", "Es reversible: un émbolo empujado hace girar la manivela."], ["Cadena y piñón", "Es reversible: tirar de la cadena hace girar los piñones."]],
      "Un tornillo de paso pequeño tiene mucho rozamiento frente a la fuerza axial: se autoblocan. Por eso sostiene la carga de un gato.",
    ),
  ],
};
