import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const funcionesProgramacionModular4esoLesson: InteractiveLesson = {
  slug: "funciones-programacion-modular-4eso",
  title: "5. Funciones y programación modular",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Trozos reutilizables", [
      { kind: "steps", items: [
        "Una **función** agrupa instrucciones con un nombre: `def media(lista):`.",
        "Recibe **parámetros** (entradas) y devuelve un valor con **`return`**.",
        "Se **llama** cuando se necesita, tantas veces como haga falta.",
        "**Programación modular**: el programa se divide en funciones, cada una con una tarea.",
        "Ventajas: menos repetición, programas legibles y partes que se **prueban por separado**.",
      ] },
    ], undefined, "stack"),
    slide("fun", "Funciones en acción", [
      { kind: "text", text: "Observa cómo el control salta a la función y vuelve con un resultado." },
    ], tool("python-traza-explorador", { n: 12 }), "visual-top"),
    slide("mini", "Una función con parámetros", [
      { kind: "text", text: "Una función como una máquina: entra un valor y sale otro. Cambia la entrada." },
    ], tool("eso2-funcion-explorador"), "visual-top"),
    slide("local", "Variables locales", [
      { kind: "steps", items: [
        "Las variables creadas dentro de una función son **locales**: no existen fuera.",
        "Los parámetros son copias de los valores que se pasan.",
        "Una función debería hacer **una sola cosa** y tener un nombre que lo diga: `calcular_media`, `es_par`.",
        "Escribe **comentarios** y prueba cada función con casos normales y casos límite.",
      ] },
    ]),
    calc("calc-ret", "Valor devuelto", "def doble(x): return 2 * x. ¿Cuánto vale doble(7) + doble(1)?", nums(16), "14 + 2 = 16.", "Calcula cada llamada y suma."),
    calc("calc-area", "Función área", "def area(b, h): return b * h / 2. ¿Cuánto vale area(6, 4)?", nums(12), "6 · 4 / 2 = 12.", "Sustituye b y h."),
    sort("clasifica-mod", "¿Ventaja o inconveniente?", "Decide si cada afirmación es una ventaja de usar funciones.",
      [["ven", "Ventaja", "emerald"], ["inc", "No es una ventaja", "rose"]],
      [["Evita repetir código", "ven"], ["Permite probar cada parte por separado", "ven"], ["El programa principal queda más legible", "ven"], ["Aumenta el tamaño del programa sin motivo", "inc"], ["Hace imposible reutilizar código", "inc"], ["Obliga a escribir todo en una línea", "inc"]],
      "Programar modularmente reduce errores y facilita el trabajo en equipo.",
    ),
    pick("check-local", "Variable local", "Una variable creada dentro de una función, ¿se puede usar fuera?",
      "No: es local y solo existe mientras se ejecuta la función",
      [["Sí, siempre", "Es local."], ["Solo si es un número", "No depende del tipo."], ["Sí, si se llama dos veces", "No."]],
      "Para sacar un valor se usa return.",
    ),
  ],
};
