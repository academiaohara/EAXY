import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const bloquesCreacionDepuracionLesson: InteractiveLesson = {
  slug: "bloques-creacion-depuracion",
  title: "7. Programación por bloques: crear y depurar",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Programar con piezas", [
      { kind: "definition", text: "La **programación visual por bloques** (Scratch, Blockly, App Inventor) construye programas encajando bloques que representan instrucciones. Se evitan los errores de escritura y se ve la estructura del programa." },
      { kind: "steps", items: [
        "**Bloques de movimiento y acción**: avanzar, girar, decir, sonar.",
        "**Bloques de control**: repetir, si… entonces… si no.",
        "**Variables**: guardar y cambiar datos.",
        "**Eventos**: «cuando se pulse la bandera verde», «cuando se pulse una tecla».",
      ] },
    ], undefined, "stack"),
    slide("reto", "Reto: el laberinto", [
      { kind: "text", text: "Diseña un programa que lleve al robot hasta la meta esquivando los muros. Prueba con pocos bloques y usa «repetir» para acortarlo." },
    ], tool("programa-bloques-explorador", { n: 3 }), "visual-top"),
    slide("depurar", "Depurar: encontrar los errores", [
      { kind: "steps", items: [
        "**Ejecuta** el programa y observa qué hace distinto de lo que querías.",
        "**Reproduce** el error: ¿ocurre siempre o solo en algún caso?",
        "**Sigue el programa paso a paso**, línea a línea, como si fueras el ordenador.",
        "**Localiza** la instrucción que falla y **corrígela**.",
        "**Vuelve a probar** (¡también los casos extremos!).",
      ] },
      { kind: "text", text: "Equivocarse es normal: los programadores profesionales pasan mucho tiempo depurando." },
    ]),
    slide("errores", "Encuentra el error", [
      { kind: "text", text: "Cada programa tiene una línea con un error. Lee el objetivo y pulsa la línea incorrecta." },
    ], tool("depura-programa-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-error", "Tipo de error", "Clasifica cada error del programa.",
      [["ord", "Orden de las instrucciones", "amber"], ["con", "Condición mal escrita", "cobalt"], ["val", "Valor incorrecto", "emerald"]],
      [["Untar antes de tostar el pan", "ord"], ["Girar antes de avanzar cuando debía ser al revés", "ord"], ["Usar «n < 5» en lugar de «n ≤ 5»", "con"], ["Preguntar «¿hay pared?» cuando debía ser «¿no hay pared?»", "con"], ["Girar 45° en lugar de 90°", "val"], ["Repetir 3 veces en lugar de 4", "val"]],
      "Los errores más habituales son de orden, de condición y de valor; reconocerlos ayuda a corregirlos más rápido.",
    ),
    pick("check-depurar", "Qué hacer ante un error", "Tu programa no hace lo que esperabas. ¿Qué es lo más eficaz?",
      "Ejecutarlo paso a paso y comparar lo que hace con lo que debería hacer",
      [["Borrarlo todo y empezar de cero", "Pierdes lo que ya funcionaba y repites errores."], ["Cambiar instrucciones al azar", "Sin entender el fallo, puedes introducir nuevos errores."], ["Decir que el ordenador está roto", "Casi siempre el error está en el programa."]],
      "Depurar consiste en localizar el error con método, no a ciegas.",
    ),
  ],
};
