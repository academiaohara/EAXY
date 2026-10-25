import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const repeticionesBuclesEsoLesson: InteractiveLesson = {
  slug: "repeticiones-bucles-eso",
  title: "6. Repeticiones: los bucles",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "No repitas, repite", [
      { kind: "definition", text: "Un **bucle** (o estructura repetitiva) ejecuta un grupo de instrucciones **varias veces**. Evita copiar y pegar el mismo código y hace que el programa sea más corto y más fácil de cambiar." },
      { kind: "compare",
        left: { title: "Repetir N veces", text: "Se sabe cuántas veces: «repetir 4 veces: avanzar».", tone: "info" },
        right: { title: "Repetir mientras", text: "Se repite mientras se cumpla una condición: «mientras no haya pared: avanzar».", tone: "key" } },
    ], undefined, "stack"),
    slide("anim", "Un bucle frente a copiar y pegar", [
      { kind: "text", text: "Compara escribir la misma instrucción cuatro veces con usar un bucle." },
    ], anim("bucle-repeticion-simple"), "text-top"),
    slide("escalera", "Sube la escalera con un bucle", [
      { kind: "text", text: "Fíjate en el patrón: avanzar, girar a la izquierda, avanzar, girar a la derecha. Se repite cuatro veces. Construye el programa con «repetir»." },
    ], tool("programa-bloques-explorador", { n: 1 }), "visual-top"),
    slide("contar", "Un bucle con una variable", [
      { kind: "text", text: "Este diagrama cuenta hasta 3: repite «escribir n» y «sumar 1» **mientras n ≤ 3**. Recórrelo y observa la variable." },
    ], tool("flujo-sencillo-explorador", { n: 2 }), "visual-top"),
    calc("calc-rep", "Cuántas veces", "Un bucle «repetir 5 veces» contiene dos instrucciones: avanzar y girar. ¿Cuántas instrucciones se ejecutan en total?",
      nums(10), "5 repeticiones × 2 instrucciones = 10.", "Multiplica las repeticiones por las instrucciones del cuerpo."),
    sort("clasifica-bucle", "¿Cuándo usar un bucle?", "Decide si conviene usar un bucle o no.",
      [["si", "Conviene un bucle", "emerald"], ["no", "No hace falta", "amber"]],
      [["Dibujar los 4 lados de un cuadrado", "si"], ["Contar de 1 a 100", "si"], ["Bajar el volumen mientras suene muy alto", "si"], ["Encender una luz una sola vez", "no"], ["Saludar una vez al empezar", "no"], ["Sumar dos números concretos", "no"]],
      "Los bucles son útiles cuando una acción se repite varias veces o mientras se cumpla algo.",
    ),
    pick("check-infinito", "Un bucle que no termina", "Un robot ejecuta «mientras no haya pared: girar a la derecha». ¿Qué ocurre?",
      "No termina nunca: gira sin parar, porque la condición no cambia",
      [["Llega a la meta", "Solo gira: nunca avanza."], ["Avanza hasta la pared", "El cuerpo del bucle no contiene «avanzar»."], ["Se detiene tras cuatro giros", "La condición no depende de los giros."]],
      "Si dentro del bucle nada cambia la condición, el bucle se repite indefinidamente (bucle infinito).",
    ),
  ],
};
