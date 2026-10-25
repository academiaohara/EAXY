import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const buclesForWhileLesson: InteractiveLesson = {
  slug: "bucles-for-while",
  title: "7. Bucles e iteraciones",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("for", "El bucle for", [
      { kind: "definition", text: "Un bucle **for** repite un bloque **una vez por cada elemento** de una secuencia. Se usa cuando se sabe cuántas veces o sobre qué se va a iterar." },
      { kind: "rule", title: "range", formula: "\\texttt{range(n)}\\to 0,1,\\dots,n-1\\qquad \\texttt{range(a, b)}\\to a,\\dots,b-1\\qquad \\texttt{range(a, b, p)}\\to\\text{de } p \\text{ en } p" },
      { kind: "warning", title: "El final no se incluye", text: "`range(1, 4)` produce 1, 2, 3, no el 4." },
    ], anim("bucle-iteraciones"), "split"),
    slide("acumulador", "Contadores y acumuladores", [
      { kind: "steps", items: [
        "**Contador**: variable que aumenta de uno en uno (`contador += 1`) para contar cuántas veces ocurre algo.",
        "**Acumulador**: variable que va guardando un total (`suma += i`).",
        "**Inicialización**: ambos se ponen a un valor de partida (0, normalmente) **antes** del bucle.",
      ] },
      { kind: "text", text: "Ejecuta el programa de la suma y fíjate en cuántas veces se ejecuta la línea del `for` (una más que el cuerpo: la última comprueba que ya no quedan valores)." },
    ], tool("python-traza-explorador", { n: 2 }), "visual-top"),
    slide("while", "El bucle while", [
      { kind: "definition", text: "Un bucle **while** repite el bloque **mientras una condición sea verdadera**. Se usa cuando no se sabe de antemano cuántas vueltas habrá." },
      { kind: "text", text: "Sigue el programa del combustible. Cambia el valor inicial y observa cómo la variable de la condición se acerca a 0." },
    ], tool("python-traza-explorador", { n: 3 }), "visual-top"),
    slide("errores", "Bucles infinitos", [
      { kind: "warning", title: "Qué falla", text: "Un `while` en el que la variable de la condición no se modifica nunca (o se modifica en sentido contrario) no termina: el programa se queda atascado." },
      { kind: "compare",
        left: { title: "Falla", text: "`while n > 0:` con `n += 1` dentro: n crece, la condición siempre es cierta.", tone: "warn" },
        right: { title: "Funciona", text: "`while n > 0:` con `n -= 1` dentro: n llega a 0 y se sale.", tone: "ok" } },
      { kind: "text", text: "Antes de ejecutar un `while`, piensa: ¿qué instrucción hace que la condición acabe siendo falsa?" },
    ]),
    calc("calc-vueltas", "Cuántas vueltas", "¿Cuántas veces se ejecuta el cuerpo de `for i in range(2, 10, 2):`?",
      nums(4), "Toma los valores 2, 4, 6 y 8 (el 10 no se incluye): 4 vueltas.", "Escribe los valores que toma i."),
    calc("calc-suma", "Suma acumulada", "¿Qué muestra este programa? `suma = 0` / `for i in range(1, 11):` / `    suma += i` / `print(suma)`",
      nums(55), "$1 + 2 + \\dots + 10 = 55$.", "Suma de 1 a 10."),
    sort("clasifica-bucle", "for o while", "Elige el bucle más natural para cada situación.",
      [["for", "for", "cobalt"], ["while", "while", "amber"]],
      [["Imprimir los números del 1 al 10", "for"], ["Recorrer los elementos de una lista", "for"], ["Sumar las notas de 30 alumnos", "for"], ["Repetir hasta que el usuario escriba «salir»", "while"], ["Esperar a que un sensor supere un umbral", "while"], ["Dividir entre 2 hasta llegar a 1 sin saber cuántas veces", "while"]],
      "El for es natural cuando se conoce la secuencia; el while, cuando se repite hasta que algo ocurra.",
    ),
    pick("check-infinito", "Detectar el bucle infinito", "¿Cuál de estos bucles no termina nunca?",
      "i = 1 · while i <= 3: print(i)",
      [["i = 1 · while i <= 3: print(i); i += 1", "Este termina: i llega a 4 y la condición falla."], ["for i in range(3): print(i)", "Este termina tras 3 vueltas."], ["n = 3 · while n > 0: n -= 1", "Este termina cuando n vale 0."]],
      "En el primero, `i` no se modifica dentro del bucle, así que `i <= 3` siempre es verdadera.",
    ),
  ],
};
