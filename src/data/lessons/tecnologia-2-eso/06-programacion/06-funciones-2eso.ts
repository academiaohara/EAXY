import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const funciones2esoLesson: InteractiveLesson = {
  slug: "funciones-2eso",
  title: "6. Funciones y procedimientos",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Trocear un programa en partes", [
      { kind: "definition", text: "Una **función** es un bloque de instrucciones con un **nombre** que se puede **llamar** desde cualquier parte del programa. Un **procedimiento** hace una tarea pero no devuelve ningún valor." },
      { kind: "steps", items: [
        "**Parámetros**: datos que recibe al definirla (base, altura).",
        "**Argumentos**: valores concretos con los que se llama (8 y 5).",
        "**Valor devuelto**: el resultado que entrega la función.",
        "Ventajas: **no repetir código**, **leer mejor** el programa y **probar** cada parte por separado.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Define y llama", [
      { kind: "text", text: "Elige una función y cambia los argumentos de la llamada." },
    ], tool("eso2-funcion-explorador"), "visual-top"),
    slide("bloques", "En programación por bloques", [
      { kind: "text", text: "En Scratch o App Inventor, las funciones se llaman **bloques personalizados** o **procedimientos**: se crean una vez, con sus parámetros, y se usan en todo el proyecto." },
    ]),
    calc("calc-area", "Llamada a una función", "area_rectangulo(base, altura) devuelve base · altura. ¿Qué devuelve area_rectangulo(8, 5)?", nums(40), "8 · 5 = 40.", "Sustituye los argumentos."),
    calc("calc-fahr", "Conversor", "a_fahrenheit(celsius) devuelve celsius · 9 / 5 + 32. ¿Qué devuelve a_fahrenheit(100)?", nums(212), "100 · 9 / 5 + 32 = 180 + 32 = 212.", "Primero el producto y la división; luego la suma."),
    sort("clasifica-func", "Partes de una función", "Relaciona cada elemento con su nombre.",
      [["par", "Parámetro", "cobalt"], ["arg", "Argumento", "amber"], ["dev", "Valor devuelto", "emerald"]],
      [["base y altura en la definición", "par"], ["celsius en la definición", "par"], ["El 8 y el 5 en la llamada area(8, 5)", "arg"], ["El 100 en a_fahrenheit(100)", "arg"], ["El 40 que da area(8, 5)", "dev"], ["El 212 que da a_fahrenheit(100)", "dev"]],
      "Los parámetros son los nombres de la definición, los argumentos son los valores de la llamada y el valor devuelto es el resultado.",
    ),
    pick("check-reuso", "¿Por qué una función?", "Necesitas calcular el área de rectángulos en diez sitios del programa. ¿Qué conviene?",
      "Definir una función y llamarla diez veces",
      [["Copiar y pegar la fórmula diez veces", "Si hay que corregirla, hay que cambiarla en diez sitios."], ["Calcularlo a mano", "Para eso se programa."], ["Escribir diez programas distintos", "No es necesario."]],
      "Una función se escribe, se prueba y se corrige en un único sitio.",
    ),
  ],
};
