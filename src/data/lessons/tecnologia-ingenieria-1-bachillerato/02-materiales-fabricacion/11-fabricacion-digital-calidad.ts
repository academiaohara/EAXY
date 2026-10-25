import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fabricacionDigitalCalidadLesson: InteractiveLesson = {
  slug: "fabricacion-digital-calidad",
  title: "11. Fabricación digital y control de calidad",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("cadena", "Del modelo a la pieza", [
      { kind: "steps", items: [
        "**CAD** (diseño asistido): modelo 3D y planos con cotas y tolerancias.",
        "**CAM** (fabricación asistida): genera las trayectorias de la máquina a partir del modelo.",
        "**CNC** (control numérico): la máquina ejecuta el programa (código G) con gran precisión y repetibilidad.",
        "**Fabricación aditiva (impresión 3D)**: se construye la pieza capa a capa, depositando material.",
        "**Inspección**: se mide la pieza y se compara con el modelo y las tolerancias.",
      ] },
      { kind: "compare",
        left: { title: "Sustractiva (CNC)", text: "Se quita material de un bloque. Buen acabado y precisión; desperdicia material.", tone: "info" },
        right: { title: "Aditiva (3D)", text: "Se añade material solo donde hace falta. Formas complejas y huecas; más lenta y a veces menos resistente.", tone: "key" } },
    ], undefined, "stack"),
    slide("print", "Estimar una pieza impresa", [
      { kind: "text", text: "Modifica el tamaño, el relleno y la altura de capa y observa material, tiempo y coste. Un relleno menor ahorra material, pero la pieza será menos resistente." },
    ], tool("impresion-3d-explorador", { a: 60, b: 40, c: 20 }), "visual-top"),
    slide("tolerancias", "Tolerancias: variar dentro de un margen", [
      { kind: "definition", text: "Ninguna pieza sale exactamente a la medida: la **tolerancia** es la variación admisible alrededor de la cota nominal. Cuanto más estricta, más cara es la fabricación." },
      { kind: "example", title: "Cota 20 ± 0,1 mm", lines: [
        { math: "L_{\\max} = 20{,}1\\ \\text{mm}" },
        { math: "L_{\\min} = 19{,}9\\ \\text{mm}" },
        { math: "\\text{tolerancia} = 0{,}2\\ \\text{mm}", note: "diferencia entre los límites" },
      ] },
    ]),
    slide("calidad", "Control de calidad", [
      { kind: "text", text: "Se miden piezas de muestra. Cada punto es una pieza: está bien si cae dentro de la banda verde. Observa el efecto de descentrar el proceso o de aumentar su dispersión." },
    ], tool("tolerancia-calidad-explorador"), "visual-top"),
    calc("calc-tolerancia", "Dentro o fuera", "Un eje debe medir $12{,}00 \\pm 0{,}05$ mm. Se miden estos valores: 12,03; 11,96; 12,06; 12,01. ¿Cuántas piezas están fuera de tolerancia?",
      nums(1), "Límites: $11{,}95$ a $12{,}05$ mm. Las medidas 12,03; 11,96 y 12,01 están dentro. Solo 12,06 supera el máximo: 1 pieza fuera.", "Calcula primero los dos límites."),
    sort("clasifica-inspeccion", "¿Qué se inspecciona?", "Asocia cada instrumento o técnica con lo que comprueba.",
      [["dim", "Dimensiones", "cobalt"], ["sup", "Defectos internos o superficiales", "amber"]],
      [["Pie de rey", "dim"], ["Micrómetro", "dim"], ["Galga pasa / no pasa", "dim"], ["Ultrasonidos", "sup"], ["Líquidos penetrantes", "sup"], ["Radiografía", "sup"]],
      "Pie de rey, micrómetro y galgas controlan medidas. Ultrasonidos, penetrantes y radiografía buscan grietas y poros.",
    ),
    pick("check-3d", "Cuándo imprimir", "¿En qué caso compensa más la fabricación aditiva?",
      "Una pieza con canales internos complejos, en pocas unidades",
      [["10 000 tapones iguales", "Para miles de piezas iguales es mejor un molde de inyección."], ["Una barra recta de acero", "Se compra ya fabricada: imprimirla sería absurdo."], ["Una placa plana de gran tamaño", "Es mejor cortarla de una chapa."]],
      "La impresión 3D brilla con geometrías difíciles y series cortas, donde un molde no sale a cuenta.",
    ),
  ],
};
