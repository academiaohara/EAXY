import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const condicionesBuclesDatos4esoLesson: InteractiveLesson = {
  slug: "condiciones-bucles-datos-4eso",
  title: "4. Condiciones y bucles aplicados a listas",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Decidir y repetir", [
      { kind: "steps", items: [
        "**`if / elif / else`** elige un camino según una condición.",
        "**`for`** repite para cada elemento de una lista o un rango; **`while`** repite mientras se cumpla la condición.",
        "Se combinan: recorrer una lista y actuar **solo con los elementos que cumplen** algo (filtrar).",
        "**`break`** sale del bucle; hay que asegurar que un `while` siempre termina.",
      ] },
    ], undefined, "stack"),
    slide("dec", "Una decisión", [
      { kind: "text", text: "Mira cómo el programa elige entre varias ramas según el valor." },
    ], tool("python-traza-explorador", { n: 1 }), "visual-top"),
    slide("fil", "Filtrar datos", [
      { kind: "text", text: "Recorre la lista de temperaturas y guarda solo las que superan un umbral. Cambia el umbral." },
    ], tool("python-traza-explorador", { n: 13 }), "visual-top"),
    slide("bucle", "Bucle con contador", [
      { kind: "text", text: "Un bucle while con contador. Observa cuándo deja de cumplirse la condición." },
    ], tool("python-traza-explorador", { n: 3 }), "visual-top"),
    calc("calc-iter", "Vueltas del bucle", "for i in range(3, 10): ¿cuántas veces se repite el cuerpo?", nums(7), "Valores 3, 4, 5, 6, 7, 8 y 9: 7 vueltas.", "range(a, b) no incluye b."),
    calc("calc-acum", "Acumulador", "suma = 0 y for x in [4, 7, 9]: suma += x. ¿Cuánto vale suma al final?", nums(20), "4 + 7 + 9 = 20.", "Va sumando cada elemento."),
    calc("calc-filtro", "Filtrar", "Con temps = [12, 14, 9, 17, 21, 25, 19] y umbral 15, ¿cuántos valores cumplen t > 15?", nums(4), "Son 17, 21, 25 y 19: 4.", "Cuenta los mayores que 15."),
    sort("clasifica-bucle", "¿for o while?", "Elige el bucle más natural en cada caso.",
      [["for", "for", "cobalt"], ["whi", "while", "amber"]],
      [["Recorrer los 12 meses", "for"], ["Sumar los elementos de una lista", "for"], ["Repetir 10 veces", "for"], ["Esperar hasta que el sensor lea más de 50", "whi"], ["Repetir hasta que el usuario acierte", "whi"], ["Mover el robot hasta tocar la pared", "whi"]],
      "for cuando sabes cuántas veces; while cuando depende de una condición.",
    ),
    pick("check-inf", "Bucle infinito", "while x > 0: print(x) (sin cambiar x). ¿Qué ocurre?",
      "Es un bucle infinito: la condición nunca deja de cumplirse",
      [["Imprime x una vez", "Se repite sin fin."], ["Da error de sintaxis", "La sintaxis es correcta."], ["Se detiene al llegar a 0", "x no cambia."]],
      "Dentro de un while hay que modificar algo de la condición.",
    ),
  ],
};
