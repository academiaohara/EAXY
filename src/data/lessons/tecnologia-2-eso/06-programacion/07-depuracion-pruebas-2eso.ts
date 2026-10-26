import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const depuracionPruebas2esoLesson: InteractiveLesson = {
  slug: "depuracion-pruebas-2eso",
  title: "7. Pruebas y depuración",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los errores son normales", [
      { kind: "definition", text: "**Depurar** es encontrar y corregir los **errores** (bugs) de un programa. Ningún programa de cierta longitud sale perfecto a la primera: se **prueba**, se localiza el fallo y se corrige." },
      { kind: "steps", items: [
        "**Errores de sintaxis**: el programa no se entiende (una palabra mal escrita, un paréntesis sin cerrar).",
        "**Errores de ejecución**: el programa se rompe al funcionar (dividir entre cero).",
        "**Errores lógicos**: el programa funciona pero **da un resultado equivocado**. Son los más difíciles de ver.",
      ] },
    ], undefined, "stack"),
    slide("busca", "Encuentra el fallo", [
      { kind: "text", text: "Practica con programas que tienen un error." },
    ], tool("depura-programa-explorador"), "visual-top"),
    slide("casos", "Casos de prueba", [
      { kind: "text", text: "Esta función dice si un año es bisiesto. Parece correcta, pero tiene un error lógico. Pruébala con años distintos, incluidos casos límite." },
    ], tool("eso2-pruebas-explorador"), "visual-top"),
    slide("metodo", "Un método para depurar", [
      { kind: "steps", items: [
        "**Reproduce** el error con unos datos concretos.",
        "**Traza** el programa a mano o paso a paso y compara lo que debería pasar con lo que pasa.",
        "**Aísla** la parte donde se produce el fallo (prueba cada función por separado).",
        "**Corrige** una sola cosa cada vez y **vuelve a probar**, incluidos los casos que ya funcionaban.",
      ] },
    ]),
    calc("calc-bisiesto", "Un caso límite", "Con la regla «es bisiesto si el año es múltiplo de 4», ¿cuántos de los años 1900, 2000, 2023 y 2024 se consideran bisiestos?", nums(3), "1900, 2000 y 2024 son múltiplos de 4 (3 años). Pero 1900 no es realmente bisiesto: la regla es incorrecta.", "Comprueba cuáles son múltiplos de 4."),
    sort("clasifica-error", "Tipo de error", "Clasifica cada error.",
      [["sin", "Sintaxis", "cobalt"], ["eje", "Ejecución", "amber"], ["log", "Lógico", "rose"]],
      [["Falta cerrar un paréntesis", "sin"], ["Palabra reservada mal escrita", "sin"], ["Dividir entre cero", "eje"], ["Usar una variable que no existe", "eje"], ["Calcula 15 % de descuento restando 15 €", "log"], ["Suma en lugar de multiplicar", "log"]],
      "La sintaxis impide ejecutar; la ejecución rompe el programa en marcha; el error lógico da un resultado equivocado sin avisar.",
    ),
    pick("check-prueba", "Qué casos probar", "Quieres probar una función que clasifica notas de 0 a 10. ¿Qué conjunto de pruebas es mejor?",
      "Valores típicos y valores límite: 0, 4, 5, 10",
      [["Solo un valor, por ejemplo 7", "Un único caso no detecta errores en los límites."], ["Solo valores muy altos", "Los límites y los casos intermedios son importantes."], ["No hace falta probar", "Los errores aparecerían más tarde."]],
      "Los errores se esconden en los límites: 0, 5 (aprobado), 10.",
    ),
  ],
};
