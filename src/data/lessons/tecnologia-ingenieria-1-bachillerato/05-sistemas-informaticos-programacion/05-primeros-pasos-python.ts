import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const primerosPasosPythonLesson: InteractiveLesson = {
  slug: "primeros-pasos-python",
  title: "5. Primeros pasos en programación textual",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("lenguaje", "De las instrucciones a la ejecución", [
      { kind: "definition", text: "Un **lenguaje de programación** es un conjunto de reglas para escribir instrucciones que el ordenador puede ejecutar. En este curso usamos **Python**: claro, legible y muy usado en ingeniería y ciencia de datos." },
      { kind: "steps", items: [
        "**Sintaxis**: las reglas de escritura. Un error de sintaxis impide ejecutar el programa.",
        "**Intérprete**: ejecuta el código línea a línea.",
        "**Comentarios**: empiezan por `#` y el intérprete los ignora; explican el porqué del código.",
        "**Sangría**: en Python la indentación delimita los bloques.",
      ] },
    ], undefined, "stack"),
    slide("variables", "Variables y tipos de datos", [
      { kind: "definition", text: "Una **variable** es un nombre que apunta a un valor guardado en memoria. Se crea al **asignarle** un valor con `=`." },
      { kind: "facts", items: [
        { tex: "\\texttt{int}", label: "entero: 16, -3" },
        { tex: "\\texttt{float}", label: "decimal: 1.68, 3.14" },
        { tex: "\\texttt{str}", label: "texto: \"hola\"" },
        { tex: "\\texttt{bool}", label: "lógico: True, False" },
      ] },
      { kind: "warning", title: "= no es igual que ==", text: "`x = 5` asigna el valor 5 a x. `x == 5` pregunta si x vale 5 y da True o False." },
    ], tool("python-traza-explorador", { n: 0 }), "split"),
    slide("operadores", "Operadores aritméticos", [
      { kind: "facts", items: [
        { tex: "+\\ -\\ *\\ /", label: "suma, resta, producto, división (siempre float)" },
        { tex: "//", label: "división entera" },
        { tex: "\\%", label: "resto (módulo)" },
        { tex: "**", label: "potencia" },
      ] },
      { kind: "example", title: "Con 7 y 2", lines: [
        { math: "7 / 2 = 3.5", note: "división normal" },
        { math: "7 // 2 = 3", note: "cociente entero" },
        { math: "7 \\% 2 = 1", note: "resto" },
        { math: "7 ** 2 = 49", note: "potencia" },
      ] },
    ]),
    slide("tipos", "Los tipos importan", [
      { kind: "text", text: "Ejecuta el programa de los tipos de datos. La suma de un entero y un decimal es un decimal; sumar un texto y un número da un error. Se convierte con `int()`, `float()` y `str()`." },
    ], tool("python-traza-explorador", { n: 7 }), "visual-top"),
    slide("salida", "Entrada y salida de datos", [
      { kind: "steps", items: [
        "**Salida**: `print(valor1, valor2)` muestra datos separados por espacios.",
        "**f-strings**: `f\"Edad: {edad}\"` inserta valores dentro del texto; con `{x:.2f}` se fijan dos decimales.",
        "**Entrada**: `input(\"¿Edad?\")` lee texto del teclado y siempre devuelve un `str`, por lo que hay que convertirlo: `int(input(...))`.",
      ] },
      { kind: "text", text: "En este simulador no hay teclado: en su lugar se escribe el dato en una variable (por ejemplo `edad = 15`) y se cambia para probar." },
    ]),
    calc("calc-div", "División entera", "¿Qué muestra `print(17 // 5)`?",
      nums(3), "$17 // 5 = 3$ (cociente entero; el resto, 2, se obtiene con %).", "// descarta la parte decimal del cociente."),
    calc("calc-mod", "Resto", "¿Qué muestra `print(17 % 5)`?",
      nums(2), "$17 = 5\\cdot 3 + 2$, así que `17 % 5` es 2.", "% da el resto de la división entera."),
    calc("calc-pot", "Potencia", "¿Qué muestra `print(2 ** 3 + 1)`?",
      nums(9), "La potencia tiene prioridad: $2^3 = 8$ y $8 + 1 = 9$.", "Primero la potencia."),
    sort("clasifica-tipo", "Tipo de dato", "Clasifica cada valor de Python según su tipo.",
      [["int", "int (entero)", "cobalt"], ["float", "float (decimal)", "amber"], ["str", "str (texto)", "emerald"], ["bool", "bool (lógico)", "violet"]],
      [["42", "int"], ["-7", "int"], ["3.14", "float"], ["2.0", "float"], ["\"hola\"", "str"], ["\"3\"", "str"], ["True", "bool"], ["False", "bool"]],
      "Las comillas hacen que cualquier cosa sea texto, aunque parezca un número: \"3\" no es el entero 3.",
    ),
    pick("check-error", "Un error típico", "¿Qué ocurre con `print(\"edad: \" + 16)`?",
      "Da un error de tipos: no se puede sumar texto y número; hay que convertir con str(16)",
      [["Muestra edad: 16", "Python no convierte automáticamente un número a texto al sumarlos."], ["Muestra edad: 32", "No se suma nada: uno es texto."], ["No muestra nada pero no da error", "Falla con un TypeError."]],
      "Para unir texto y números se convierte el número con `str()` o se usa una f-string.",
    ),
  ],
};
