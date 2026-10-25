import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const algoritmosDiagramasFlujoLesson: InteractiveLesson = {
  slug: "algoritmos-diagramas-flujo",
  title: "4. Algoritmos y representación de soluciones",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es un algoritmo", [
      { kind: "definition", text: "Un **algoritmo** es una secuencia **finita**, **ordenada** y **sin ambigüedad** de pasos que resuelve un problema a partir de unas **entradas** y produce unas **salidas**." },
      { kind: "steps", title: "Antes de programar", items: [
        "**Entradas**: qué datos tengo (la nota, un número N, tres valores).",
        "**Proceso**: qué hay que hacer con ellos.",
        "**Salidas**: qué resultado debe aparecer.",
        "**Casos límite**: qué pasa con el 0, con valores negativos o con datos vacíos.",
      ] },
      { kind: "warning", title: "Un algoritmo debe terminar", text: "Si los pasos se repiten sin condición de parada, no es un algoritmo válido. Todo bucle necesita una condición que acabe cumpliéndose." },
    ], undefined, "stack"),
    slide("estructuras", "Secuencia, decisión y repetición", [
      { kind: "steps", items: [
        "**Secuencia**: los pasos se ejecutan uno tras otro.",
        "**Decisión (condicional)**: según una condición, se sigue un camino u otro.",
        "**Repetición (bucle)**: un bloque se repite mientras se cumpla una condición o un número de veces.",
      ] },
      { kind: "text", text: "Con estas tres estructuras se puede expresar **cualquier** algoritmo." },
    ]),
    slide("simbolos", "Diagramas de flujo", [
      { kind: "facts", items: [
        { tex: "\\text{óvalo}", label: "inicio y fin" },
        { tex: "\\text{paralelogramo}", label: "entrada / salida de datos" },
        { tex: "\\text{rectángulo}", label: "proceso (asignación, cálculo)" },
        { tex: "\\text{rombo}", label: "decisión: sale por «sí» y por «no»" },
      ] },
      { kind: "text", text: "Las flechas indican el orden. Un bucle es una flecha que **vuelve atrás** a una decisión." },
    ]),
    slide("decision", "Ejecuta una decisión", [
      { kind: "text", text: "Cambia la nota y ejecuta el diagrama paso a paso: ¿qué camino sigue cada vez? El nodo amarillo es el que se está ejecutando." },
    ], tool("diagrama-flujo-explorador", { n: 0 }), "visual-top"),
    slide("bucle", "Ejecuta un bucle", [
      { kind: "text", text: "Este algoritmo suma los números de 1 a N. Observa cómo las variables `suma` e `i` cambian en cada vuelta y cuándo se sale del bucle." },
    ], tool("diagrama-flujo-explorador", { n: 1 }), "visual-top"),
    slide("pseudocodigo", "Pseudocódigo", [
      { kind: "text", text: "El **pseudocódigo** describe el algoritmo con frases estructuradas, sin la sintaxis de un lenguaje concreto. Es el paso intermedio entre el diagrama y el código." },
      { kind: "example", title: "El mayor de tres números", lines: [
        { math: "\\text{leer } a, b, c" },
        { math: "m \\leftarrow a" },
        { math: "\\text{si } b > m \\text{ entonces } m \\leftarrow b" },
        { math: "\\text{si } c > m \\text{ entonces } m \\leftarrow c" },
        { math: "\\text{mostrar } m" },
      ] },
    ], tool("diagrama-flujo-explorador", { n: 2 }), "split"),
    calc("calc-suma", "Resultado de un algoritmo", "Aplica el algoritmo «suma de 1 a N» con N = 6. ¿Qué valor muestra al final?",
      nums(21), "$1 + 2 + 3 + 4 + 5 + 6 = 21$.", "Suma los números de 1 a 6."),
    sort("clasifica-simbolo", "Símbolo de diagrama", "Asocia cada acción con el símbolo del diagrama de flujo que la representa.",
      [["io", "Entrada / salida", "cobalt"], ["proc", "Proceso", "amber"], ["dec", "Decisión", "emerald"]],
      [["Leer la nota del teclado", "io"], ["Mostrar el resultado", "io"], ["suma ← suma + i", "proc"], ["i ← i + 1", "proc"], ["¿nota ≥ 5?", "dec"], ["¿i ≤ N?", "dec"]],
      "Los paralelogramos son para entrada y salida, los rectángulos para cálculos y los rombos para preguntas con dos respuestas.",
    ),
    pick("check-infinito", "Detectar un error lógico", "Un algoritmo hace «mientras i ≤ N: suma ← suma + i» pero nunca modifica i dentro del bucle. ¿Qué ocurre?",
      "Nunca termina: la condición siempre es cierta porque i no cambia",
      [["Termina enseguida", "La condición se sigue cumpliendo; no hay motivo para parar."], ["Calcula bien la suma", "Suma siempre el mismo valor sin avanzar."], ["Da error de sintaxis", "No es un error de sintaxis, sino de lógica."]],
      "Hace falta actualizar la variable que interviene en la condición (i ← i + 1) para que el bucle acabe.",
    ),
    pick("check-correccion", "Corrección y eficiencia", "Dos algoritmos calculan la suma de 1 a 1000: uno hace 1000 sumas y otro usa la fórmula N·(N+1)/2. ¿Qué es cierto?",
      "Los dos son correctos; el segundo es más eficiente porque hace menos operaciones",
      [["Solo el primero es correcto", "La fórmula da el mismo resultado: 500 500."], ["El segundo es menos fiable por ser corto", "La brevedad no influye en la corrección."], ["Ninguno es correcto", "Ambos dan 500 500."]],
      "Un algoritmo es correcto si da el resultado esperado para todas las entradas válidas; es eficiente si gasta pocos recursos (tiempo, memoria).",
    ),
  ],
};
