import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const depuracionProyectoSoftware4esoLesson: InteractiveLesson = {
  slug: "depuracion-proyecto-software-4eso",
  title: "8. Depuración, pruebas y mini proyecto",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los errores son normales", [
      { kind: "steps", items: [
        "**Error de sintaxis**: el programa ni arranca (falta un `:` o un paréntesis).",
        "**Error de ejecución**: se interrumpe al ejecutar (índice fuera de rango, dividir entre 0).",
        "**Error lógico**: funciona pero da un resultado incorrecto. Son los más difíciles de detectar.",
        "**Depurar** es localizar y corregir errores: leer el mensaje, **trazar** las variables, probar con datos pequeños.",
      ] },
    ], undefined, "stack"),
    slide("dep1", "Un error lógico", [
      { kind: "text", text: "El máximo de estas notas debería ser -2, pero sale otra cosa. Ejecuta paso a paso, localiza el fallo y corrígelo." },
    ], tool("python-traza-explorador", { n: 14 }), "visual-top"),
    slide("dep2", "Un error de ejecución", [
      { kind: "text", text: "Este programa se interrumpe. Lee el mensaje, mira la línea y arréglalo." },
    ], tool("python-traza-explorador", { n: 15 }), "visual-top"),
    slide("test", "Probar con casos", [
      { kind: "text", text: "Las pruebas automáticas comprueban que una función da el resultado esperado en varios casos, incluidos los límites." },
    ], tool("tests-automaticos-explorador"), "visual-top"),
    slide("proy", "Mini proyecto: registro de temperaturas", [
      { kind: "steps", items: [
        "**Problema**: registrar temperaturas y avisar si alguna supera un umbral.",
        "**Descomposición**: leer datos, guardarlos en una lista, calcular media y máximo, filtrar las que superan el umbral, mostrar el resultado.",
        "**Cada parte, una función**, probada con casos normales y límite (lista vacía, un solo dato).",
        "**Documenta** el programa y explica qué hace cada función.",
      ] },
    ]),
    calc("calc-bug", "Índice fuera de rango", "En precios = [3, 5, 8] se recorre range(len(precios) + 1). ¿Cuántas vueltas válidas hay antes del error?", nums(3), "Los índices válidos son 0, 1 y 2: 3 vueltas.", "La cuarta vuelta pide el índice 3."),
    calc("calc-test", "Caso límite", "Una función media(lista) divide sum(lista) entre len(lista). ¿Cuánto vale len de la lista vacía, que provoca el error?", nums(0), "len([]) = 0, y dividir entre 0 da error.", "Una lista vacía no tiene elementos."),
    sort("clasifica-err", "¿Qué tipo de error?", "Clasifica cada fallo.",
      [["sin", "Sintaxis", "rose"], ["eje", "Ejecución", "amber"], ["log", "Lógico", "cobalt"]],
      [["if x > 5 sin los dos puntos", "sin"], ["Paréntesis sin cerrar", "sin"], ["Pedir lista[10] en una de 3 elementos", "eje"], ["Dividir entre cero", "eje"], ["Calcular la media dividiendo entre len + 1", "log"], ["Máximo inicializado a 0 con datos negativos", "log"]],
      "Los lógicos no producen mensaje: hay que comprobar los resultados.",
    ),
    pick("check-dep", "La mejor estrategia", "Un programa da un resultado incorrecto sin mostrar ningún error. ¿Qué haces primero?",
      "Trazar el programa con un ejemplo pequeño y comparar cada paso con lo que esperas",
      [["Reescribirlo entero", "Pierdes tiempo."], ["Cambiar cosas al azar", "Puede empeorar."], ["Darlo por bueno", "El resultado es erróneo."]],
      "Reducir el problema es la clave de la depuración.",
    ),
  ],
};
