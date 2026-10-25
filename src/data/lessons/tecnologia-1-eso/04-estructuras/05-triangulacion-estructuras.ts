import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const triangulacionEstructurasLesson: InteractiveLesson = {
  slug: "triangulacion-estructuras",
  title: "5. Triangulación",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "El triángulo no se deforma", [
      { kind: "definition", text: "**Triangular** una estructura es añadir barras (diagonales) para dividirla en **triángulos**. El triángulo es el único polígono **indeformable**: no puede cambiar sus ángulos si sus lados no cambian de longitud." },
      { kind: "text", text: "Un cuadrilátero con las barras articuladas se deforma como un paralelogramo; con una diagonal, se vuelve rígido." },
    ], undefined, "stack"),
    slide("anim", "Cuadrilátero frente a triángulo", [
      { kind: "text", text: "Empuja los dos marcos de lado y observa cuál se deforma." },
    ], anim("triangulo-rigido"), "text-top"),
    slide("explora", "Añade diagonales", [
      { kind: "text", text: "Sin diagonales el marco se aplasta; con una diagonal, apenas se mueve. Prueba también con la fuerza máxima." },
    ], tool("triangulacion-explorador", { n: 0, a: 60 }), "visual-top"),
    slide("usos", "Dónde se ve la triangulación", [
      { kind: "steps", items: [
        "**Cerchas** de tejados y de puentes metálicos.",
        "**Grúas**, torres eléctricas y antenas.",
        "**Cuadro de una bicicleta**: dos triángulos unidos.",
        "**Escuadras** metálicas que refuerzan una estantería.",
        "**Cubiertas** y estructuras espaciales (tetraedros).",
      ] },
      { kind: "warning", title: "Ojo", text: "Una diagonal trabaja a **tracción o compresión** según de qué lado empuje la fuerza. Por eso se ponen a veces dos en cruz (aspas)." },
    ]),
    sort("clasifica-rigido", "¿Rígida o deformable?", "Decide si cada estructura con barras articuladas es rígida o se deforma.",
      [["rig", "Rígida", "emerald"], ["def", "Deformable", "amber"]],
      [["Triángulo", "rig"], ["Cuadrado con una diagonal", "rig"], ["Pentágono con dos diagonales desde un mismo vértice", "rig"], ["Cuadrado sin diagonales", "def"], ["Rectángulo sin diagonales", "def"], ["Hexágono sin diagonales", "def"]],
      "Si todo el polígono queda dividido en triángulos, es rígido. Un polígono de más de tres lados sin diagonales se deforma.",
    ),
    pick("check-diag", "Una estantería que se tambalea", "Una estantería de listones se mueve de lado. ¿Qué es lo más eficaz para evitarlo?",
      "Clavar una tabla en diagonal en la parte trasera, formando triángulos",
      [["Pintar los listones", "No cambia la rigidez."], ["Poner más libros", "El peso no evita el movimiento lateral."], ["Quitar una balda", "Podría empeorar la situación."]],
      "La diagonal convierte el rectángulo en dos triángulos y evita que se deforme lateralmente.",
    ),
  ],
};
