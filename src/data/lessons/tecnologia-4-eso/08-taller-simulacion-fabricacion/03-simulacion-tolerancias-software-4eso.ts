import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const simulacionToleranciasSoftware4esoLesson: InteractiveLesson = {
  slug: "simulacion-tolerancias-software-4eso",
  title: "3. Software de diseño y simulación",
  subtitle: TECESO4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Del modelo a la pieza", [
      { kind: "text", text: "Observa el flujo completo de la fabricación digital y dónde interviene cada software." },
    ], anim("eso4-flujo-digital"), "text-top"),
    slide("def", "Familias de software", [
      { kind: "steps", items: [
        "**CAD** (Fusion, FreeCAD, Tinkercad): modelado 2D y 3D.",
        "**CAM**: genera las trayectorias de la herramienta y el código G.",
        "**Simulación de circuitos** (Tinkercad, Falstad, LTspice): comprueba el esquema antes de montarlo.",
        "**Simulación de mecanismos y estructuras** (CAD con análisis, FreeCAD FEM): movimiento y esfuerzos.",
        "**Slicers** (Cura, PrusaSlicer): preparan el modelo para imprimirlo.",
        "**Simuladores de robots** y de **procesos**: prueban el programa antes de ejecutarlo en la máquina real.",
      ] },
    ], undefined, "stack"),
    slide("tol", "Simular las tolerancias", [
      { kind: "text", text: "Al montar varias piezas, las tolerancias se acumulan. Mira cuánto varía la medida total." },
    ], tool("eso4-apilado-explorador"), "visual-top"),
    slide("viga", "Simular una estructura", [
      { kind: "text", text: "Una simulación sencilla permite comparar diseños sin gastar material." },
    ], tool("eso3-simulacion-viga-explorador"), "visual-top"),
    calc("calc-peor", "Caso peor", "Cuatro piezas en cadena tienen una tolerancia de ±0,1 mm cada una. ¿Cuánto vale el error máximo total, en mm?", nums(0.4), "4 · 0,1 = 0,4 mm.", "Suma todas las tolerancias."),
    calc("calc-rss", "Caso estadístico", "Para esas cuatro piezas, la raíz de la suma de cuadrados es √(4·0,1²). ¿Cuánto vale, en mm?", nums(0.2), "√0,04 = 0,2 mm.", "Raíz de cuatro centésimas."),
    sort("clasifica-soft", "¿Qué programa?", "Relaciona cada tarea con el tipo de software.",
      [["cad", "CAD", "cobalt"], ["cam", "CAM o slicer", "amber"], ["sim", "Simulación", "emerald"]],
      [["Modelar una carcasa en 3D", "cad"], ["Dibujar el plano acotado", "cad"], ["Generar el código G", "cam"], ["Preparar un STL para imprimir", "cam"], ["Probar un circuito virtual", "sim"], ["Comprobar el movimiento de un mecanismo", "sim"]],
      "Cada herramienta cubre una fase distinta.",
    ),
    pick("check-sim", "Por qué simular", "¿Qué ventaja principal tiene simular antes de fabricar?",
      "Detectar errores cuando corregirlos es barato, sin gastar material ni tiempo de máquina",
      [["Hace innecesario el prototipo", "Hay que validar el modelo."], ["Es siempre exacta", "Es una aproximación."], ["Solo sirve para presumir", "Ahorra costes."]],
      "La simulación descarta lo malo; el prototipo confirma lo bueno.",
    ),
  ],
};
