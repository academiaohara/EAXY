import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const listasEstructurasDatos4esoLesson: InteractiveLesson = {
  slug: "listas-estructuras-datos-4eso",
  title: "3. Listas: guardar varios datos",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una variable, muchos valores", [
      { kind: "steps", items: [
        "Una **lista** guarda varios valores ordenados: `temps = [18, 21, 25]`.",
        "Cada elemento tiene un **índice** que **empieza en 0**: `temps[0]` es 18 y `temps[-1]` es el último.",
        "`len(lista)` da el número de elementos; `append(x)` añade uno al final.",
        "`max`, `min`, `sum` y `sorted` resumen u ordenan.",
        "Se recorre con un bucle: `for t in temps:`.",
      ] },
    ], undefined, "stack"),
    slide("prog", "Una lista en acción", [
      { kind: "text", text: "Ejecuta el programa paso a paso y observa cómo crece la lista." },
    ], tool("python-traza-explorador", { n: 8 }), "visual-top"),
    slide("bucle", "Recorrer y acumular", [
      { kind: "text", text: "Un bucle con acumulador recorre una lista para sumar sus valores. Sigue la traza." },
    ], tool("python-traza-explorador", { n: 2 }), "visual-top"),
    slide("otras", "Otras estructuras", [
      { kind: "steps", items: [
        "**Tupla**: como una lista pero **inmutable** (coordenadas).",
        "**Diccionario**: pares clave-valor (`{\"lun\": 5}`).",
        "**Pila**: lo último que entra es lo primero que sale; **cola**: el primero que entra es el primero que sale.",
        "Elegir la estructura adecuada simplifica el programa.",
      ] },
    ]),
    calc("calc-idx", "Índices", "Una lista tiene 6 elementos. ¿Cuál es el índice del último?", nums(5), "Los índices van de 0 a 5.", "El primero es el 0."),
    calc("calc-len", "Longitud", "datos = [4, 8, 15], y se hace datos.append(16) dos veces. ¿Cuánto vale len(datos)?", nums(5), "3 elementos más 2 añadidos: 5.", "Cada append añade uno."),
    calc("calc-media", "Media", "Con datos = [18, 21, 25, 19, 23], ¿cuánto vale sum(datos) / len(datos)?", nums(21.2), "106 / 5 = 21,2.", "Suma entre número de elementos."),
    sort("clasifica-list", "¿Qué hace?", "Relaciona cada operación con su efecto.",
      [["aña", "Añade o modifica", "cobalt"], ["con", "Consulta", "amber"], ["res", "Resume", "emerald"]],
      [["lista.append(5)", "aña"], ["lista[0] = 9", "aña"], ["lista[2]", "con"], ["len(lista)", "con"], ["sum(lista)", "res"], ["max(lista)", "res"]],
      "Unas operaciones cambian la lista, otras solo la leen.",
    ),
    pick("check-ind", "Índice", "En datos = [7, 9, 11], ¿qué valor tiene datos[1]?",
      "9, porque el primer elemento tiene el índice 0",
      [["7", "Ese es el índice 0."], ["11", "Ese es el índice 2."], ["Da error", "El índice 1 existe."]],
      "Empezar a contar desde 0 es la causa de muchos errores.",
    ),
  ],
};
