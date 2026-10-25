import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pruebasDepuracionCodigoLesson: InteractiveLesson = {
  slug: "pruebas-depuracion-codigo",
  title: "9. Pruebas, depuración y calidad del código",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("errores", "Tres tipos de error", [
      { kind: "steps", items: [
        "**De sintaxis**: el código no respeta las reglas del lenguaje (falta un `:`). El programa **no arranca** y el intérprete señala la línea.",
        "**De ejecución**: el código es válido pero falla al ejecutarse (dividir entre 0, usar una variable que no existe). El programa **se detiene** con un mensaje.",
        "**De lógica**: el programa se ejecuta sin quejas y da un **resultado incorrecto**. Son los más difíciles de encontrar.",
      ] },
      { kind: "text", text: "Aprende a leer los mensajes de error: indican el **tipo**, la **línea** y una pista de la causa." },
    ], undefined, "stack"),
    slide("sintaxis", "Leer un mensaje de error", [
      { kind: "text", text: "Este programa no se puede ejecutar. Lee el mensaje: dice el tipo de error y la línea. Corrígelo en el editor y vuelve a ejecutar." },
    ], tool("python-traza-explorador", { n: 6 }), "visual-top"),
    slide("traza", "Depurar con una traza", [
      { kind: "text", text: "Aquí el programa **no da error**, pero la media sale mal. Avanza paso a paso y mira `total`: ¿a qué línea se debe la diferencia? Pon un **punto de interrupción** en la línea sospechosa para llegar a ella directamente." },
      { kind: "steps", title: "Método de depuración", items: [
        "**Reproduce** el fallo con unos datos concretos.",
        "**Predice** qué debería valer cada variable en cada paso.",
        "**Compara** con la traza real: el primer paso donde no coinciden señala el error.",
        "**Corrige** una sola cosa y vuelve a probar.",
      ] },
    ], tool("python-traza-explorador", { n: 5 }), "visual-top"),
    slide("pruebas", "Casos de prueba", [
      { kind: "steps", items: [
        "**Casos normales**: los datos típicos.",
        "**Casos límite**: valores frontera (0, el mínimo, el máximo, lista vacía).",
        "**Casos inesperados**: datos fuera de lo previsto (negativos, texto).",
      ] },
      { kind: "text", text: "Una prueba automática compara el resultado **esperado** con el **obtenido**. Ejecuta las pruebas de esta función incompleta e identifica qué caso falla." },
    ], tool("tests-automaticos-explorador", { n: 0 }), "visual-top"),
    slide("calidad", "Calidad del código", [
      { kind: "steps", items: [
        "**Nombres significativos**: `media_notas` en vez de `x1`.",
        "**Comentarios** que explican el porqué, no lo obvio.",
        "**Funciones pequeñas** con una única responsabilidad.",
        "**Sin duplicación**: si copias un bloque, probablemente necesitas una función.",
        "**Formato consistente**: sangría y estilo uniformes.",
      ] },
      { kind: "text", text: "Código legible es código mantenible: dentro de seis meses, el que tendrá que entenderlo serás tú." },
    ]),
    calc("calc-media", "El resultado esperado", "Antes de ejecutar, predice: la media de las notas 6, 8, 10 y 4. ¿Qué valor debe mostrar un programa correcto?",
      nums(7), "$(6 + 8 + 10 + 4)/4 = 28/4 = 7$. Si sale 5,6, el divisor está mal (se dividió entre 5).", "Suma los cuatro valores y divide entre 4."),
    sort("clasifica-error", "¿Qué tipo de error es?", "Clasifica cada fallo.",
      [["sin", "Sintaxis", "cobalt"], ["eje", "Ejecución", "amber"], ["log", "Lógica", "emerald"]],
      [["Falta el «:» al final del if", "sin"], ["Un paréntesis sin cerrar", "sin"], ["Dividir entre una variable que vale 0", "eje"], ["Usar una variable que no se ha definido", "eje"], ["Calcular la media dividiendo entre n + 1", "log"], ["Usar `<` donde tocaba `<=`", "log"]],
      "Sintaxis: no se puede ni empezar; ejecución: se detiene con un mensaje; lógica: funciona pero da un resultado incorrecto.",
    ),
    pick("check-limite", "Elegir casos de prueba", "Vas a probar una función `es_par(n)`. ¿Qué conjunto de pruebas es el más completo?",
      "4, 7, 0 y −2: un par, un impar, el cero y un negativo",
      [["4, 6 y 8", "Todos son pares y de signo positivo: no detectarías muchos errores."], ["Solo 1", "Una sola prueba no basta."], ["100, 1000 y 10000", "Son casos parecidos entre sí; falta variedad y casos límite."]],
      "Combina casos normales, límite (0) y especiales (negativos); cada uno puede revelar un error distinto.",
    ),
    pick("check-pasa", "Pasar las pruebas", "Una función pasa las 4 pruebas que escribiste. ¿Qué puedes concluir?",
      "Que funciona en esos casos; puede haber errores en otros casos no probados",
      [["Que está libre de errores", "Las pruebas solo demuestran la presencia de errores, nunca su ausencia."], ["Que el código es de buena calidad", "La calidad también incluye legibilidad y mantenimiento."], ["Que las pruebas están mal", "Pasar no significa que estén mal; solo que son insuficientes para garantizarlo todo."]],
      "Probar más casos reduce el riesgo, pero no lo elimina.",
    ),
  ],
};
