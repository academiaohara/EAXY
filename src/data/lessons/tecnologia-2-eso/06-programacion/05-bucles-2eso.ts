import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const bucles2esoLesson: InteractiveLesson = {
  slug: "bucles-2eso",
  title: "5. Bucles: repetir con para y mientras",
  subtitle: TECESO2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Repetir sin copiar y pegar", [
      { kind: "definition", text: "Un **bucle** repite un bloque de instrucciones. Evita escribir lo mismo muchas veces y permite repetir un número de veces que no se conoce de antemano." },
      { kind: "steps", items: [
        "**para … de … a …**: repite un **número fijo** de veces; una variable contador (i) cambia sola.",
        "**mientras condición**: repite **mientras la condición sea verdadera**; hay que cambiar algo dentro para que algún día deje de serlo.",
        "Un bucle que nunca termina se llama **bucle infinito** y es un error típico.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Un bucle paso a paso", [
      { kind: "text", text: "Sigue una traza: mira cómo cambian las variables en cada vuelta." },
    ], anim("eso2-bucle-traza"), "text-top"),
    slide("traza", "Bucle para y bucle mientras", [
      { kind: "text", text: "Compara la suma con «para», la cuenta atrás con «mientras» y el factorial." },
    ], tool("eso2-traza-explorador", { n: 2 }), "visual-top"),
    calc("calc-vueltas", "Cuántas vueltas", "Un bucle «para i de 3 a 10» ¿cuántas veces se ejecuta?", nums(8), "i toma los valores 3, 4, …, 10: son 8 vueltas (10 − 3 + 1).", "Cuenta los valores de i."),
    calc("calc-factorial", "Factorial", "f ← 1; para i de 1 a 4: f ← f · i. ¿Cuánto vale f?", nums(24), "1 · 2 · 3 · 4 = 24.", "Multiplica en cada vuelta."),
    sort("clasifica-bucle", "¿Para o mientras?", "Elige el bucle más adecuado.",
      [["par", "para", "cobalt"], ["mie", "mientras", "amber"]],
      [["Escribir los números del 1 al 100", "par"], ["Repetir 5 veces un sonido", "par"], ["Dibujar un cuadrado (4 lados)", "par"], ["Pedir la contraseña hasta que sea correcta", "mie"], ["Avanzar hasta encontrar una pared", "mie"], ["Esperar a que se pulse el botón", "mie"]],
      "Si sabes cuántas veces, usa para; si depende de una condición, usa mientras.",
    ),
    pick("check-infinito", "Un bucle infinito", "n ← 3; mientras n > 0: mostrar n. ¿Qué falla?",
      "Dentro del bucle no se cambia n, así que la condición siempre es verdadera",
      [["Que n vale 3", "El valor inicial no es el problema."], ["Que se usa «mostrar»", "Mostrar es válido."], ["Nada: el programa es correcto", "Nunca terminaría."]],
      "Hay que modificar la variable de la condición (por ejemplo, n ← n − 1) para que el bucle acabe.",
    ),
  ],
};
