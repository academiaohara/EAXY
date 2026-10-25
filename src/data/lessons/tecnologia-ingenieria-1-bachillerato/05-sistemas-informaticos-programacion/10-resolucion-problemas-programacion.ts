import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const resolucionProblemasProgramacionLesson: InteractiveLesson = {
  slug: "resolucion-problemas-programacion",
  title: "10. Resolución de problemas mediante programación",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("metodo", "Un método para resolver problemas", [
      { kind: "steps", items: [
        "**Entender**: ¿cuáles son las entradas, las salidas y los casos límite? Escribe un ejemplo a mano.",
        "**Descomponer**: divide el problema en subproblemas pequeños.",
        "**Diseñar**: algoritmo en pseudocódigo o diagrama; elige estructuras de datos.",
        "**Implementar** función a función.",
        "**Probar** con casos normales, límite e inesperados.",
        "**Mejorar**: legibilidad y eficiencia.",
      ] },
      { kind: "example", title: "Ejemplo: contar los números pares de una lista", lines: [
        { math: "\\text{Entrada: lista de enteros}\\ \\to\\ \\text{Salida: cuántos son pares}" },
        { math: "[1, 2, 3, 4]\\ \\to\\ 2", note: "ejemplo hecho a mano" },
        { math: "[\\,]\\ \\to\\ 0", note: "caso límite: lista vacía" },
      ] },
    ], undefined, "stack"),
    slide("listas", "Listas: una estructura de datos sencilla", [
      { kind: "steps", items: [
        "Una **lista** guarda varios valores ordenados: `notas = [6, 8, 10]`.",
        "Se accede por **índice** (empieza en 0): `notas[0]` es 6 y `notas[-1]` es el último.",
        "`len(notas)` da su longitud, `notas.append(5)` añade un elemento y `sum(notas)` suma todos.",
        "Con un `for` se recorre: `for n in notas:`.",
      ] },
      { kind: "warning", title: "Índices", text: "En una lista de 4 elementos, los índices válidos son 0, 1, 2 y 3. `notas[4]` provoca un IndexError." },
    ]),
    slide("reto1", "Reto: arregla la función", [
      { kind: "text", text: "La función `maximo(a, b, c)` debería devolver el mayor de tres números, pero ignora el tercero. Ejecuta las pruebas, mira qué casos fallan y corrige el código hasta que pasen todas." },
      { kind: "steps", title: "Criterios de éxito", items: [
        "Las 5 pruebas en verde.",
        "Sin usar `max()` de Python (aprende a hacerlo tú).",
        "Nombres claros y sin código duplicado.",
      ] },
    ], tool("tests-automaticos-explorador", { n: 2 }), "visual-top"),
    slide("reto2", "Reto: comprueba una función correcta", [
      { kind: "text", text: "Esta función cuenta los números pares de una lista y es correcta. Rómpela a propósito y observa **qué pruebas detectan** cada error: así se entiende para qué sirve cada caso de prueba." },
    ], tool("tests-automaticos-explorador", { n: 3 }), "visual-top"),
    slide("libs", "Bibliotecas y herramientas", [
      { kind: "text", text: "Casi nunca se programa todo desde cero. Las **bibliotecas** ofrecen funciones ya hechas y probadas: `math` (raíces, trigonometría), `random` (números aleatorios), `datetime`, o bibliotecas de gráficas y análisis de datos." },
      { kind: "example", title: "Usar una biblioteca", lines: [
        { math: "\\texttt{import math}" },
        { math: "\\texttt{print(math.sqrt(16))}", note: "4.0" },
      ] },
      { kind: "warning", title: "Elige con criterio", text: "Antes de usar una biblioteca comprueba que está mantenida, que su licencia te lo permite y que entiendes qué hace con tus datos." },
    ]),
    calc("calc-lista", "Predecir", "¿Qué muestra este programa? `notas = [6, 8, 10, 4]` / `print(len(notas) + notas[0])`",
      nums(10), "`len(notas)` es 4 y `notas[0]` es 6: $4 + 6 = 10$.", "Los índices empiezan en 0."),
    calc("calc-pares", "Contar pares", "¿Qué devuelve `cuenta_pares([1, 2, 3, 4])`, si cuenta los números pares?",
      nums(2), "Los pares son 2 y 4: devuelve 2.", "Cuenta los múltiplos de 2."),
    sort("clasifica-fase", "Fase de resolución", "Asigna cada acción a la fase del método de resolución en la que ocurre.",
      [["ent", "Entender y descomponer", "cobalt"], ["dis", "Diseñar", "amber"], ["imp", "Implementar y probar", "emerald"]],
      [["Escribir un ejemplo a mano con su resultado", "ent"], ["Listar los casos límite", "ent"], ["Dibujar el diagrama de flujo", "dis"], ["Elegir una lista para guardar las notas", "dis"], ["Programar la función", "imp"], ["Ejecutar las pruebas y corregir fallos", "imp"]],
      "Primero se entiende y se descompone el problema; luego se diseña la solución; por último se implementa y se prueba.",
    ),
    pick("check-metodo", "¿Por dónde empezar?", "Te piden un programa que calcule el resultado de una quiniela. ¿Cuál es el mejor primer paso?",
      "Escribir a mano un ejemplo con entradas y salida esperada para entender el problema",
      [["Escribir código directamente y ver qué sale", "Programar sin entender el problema suele producir código que hay que tirar."], ["Buscar una biblioteca que lo haga todo", "Se puede acabar usando una, pero primero hay que saber qué se necesita."], ["Elegir el color del editor", "No aporta a la resolución del problema."]],
      "Entender el problema con un ejemplo concreto es el paso más barato y evita errores caros después.",
    ),
    slide("proyecto", "Proyecto del tema", [
      { kind: "text", text: "**Proyecto integrador**: programa una aplicación útil que **procese datos, tome decisiones y muestre resultados**, con pruebas y documentación." },
      { kind: "steps", title: "Ideas y entregable", items: [
        "Ideas: gestor de notas con media y calificación, conversor de unidades, calculadora de consumo eléctrico, simulador de riego.",
        "Descripción del problema, entradas y salidas.",
        "Algoritmo (diagrama o pseudocódigo) y estructura en funciones.",
        "Código con nombres claros y comentarios.",
        "Al menos 5 casos de prueba (normales, límite e inesperados) y su resultado.",
      ] },
    ], undefined, "stack"),
  ],
};
