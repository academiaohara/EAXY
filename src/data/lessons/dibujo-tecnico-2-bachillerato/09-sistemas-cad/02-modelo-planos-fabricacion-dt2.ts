import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modeloPlanosFabricacionDt2Lesson: InteractiveLesson = {
  slug: "modelo-planos-fabricacion-dt2",
  title: "2. Del modelo 3D a los planos y a la fabricación",
  subtitle: DT2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un modelo, muchos usos", [
      { kind: "steps", items: [
        "El **modelo 3D** es la **fuente única** de información de la pieza: de él se derivan **vistas**, **cortes**, **despieces**, **propiedades físicas** y el archivo para **fabricar**.",
        "Las **vistas** del plano (alzado, planta, perfil, isométrica) se **generan automáticamente** y se actualizan al cambiar el modelo.",
        "Los **cortes y secciones** se definen con un plano de corte; el programa **raya** las zonas cortadas.",
        "El **plano normalizado** se completa con **cotas**, **tolerancias**, **rugosidades** y el **cuadro de rotulación**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "De la pieza a las vistas", [
      { kind: "text", text: "Cambia las cotas de la pieza y el material. Mira cómo se actualizan las vistas, el volumen y la masa." },
    ], tool("dt2-modelo-a-vistas-explorador"), "visual-top"),
    slide("ensamblajes", "Ensamblajes y trabajo en equipo", [
      { kind: "steps", items: [
        "Un **ensamblaje** une varias piezas con **relaciones de montaje** (coincidente, concéntrico, tangente, distancia).",
        "Se puede **animar** y comprobar **interferencias** (piezas que chocan) antes de fabricar.",
        "Los **planos de conjunto** y las **listas de piezas** salen del ensamblaje.",
        "En equipo se usan **bibliotecas** de piezas normalizadas, **control de versiones** y **nombres** claros de archivo.",
      ] },
    ]),
    slide("fabricacion", "Del archivo a la pieza", [
      { kind: "steps", items: [
        "**Impresión 3D**: se exporta una malla (formato STL u otros) que se **corta en capas**.",
        "**Mecanizado CNC**: el programa **CAM** convierte el modelo en **trayectorias** de herramienta.",
        "**Corte por láser o plasma**: parte de los contornos 2D del modelo.",
        "**Intercambio** entre programas: formatos neutros (STEP, DXF, STL…) que evitan depender de un solo software.",
      ] },
    ]),
    calc("calc-area", "Sección en L", "Un perfil en L de ancho 60 mm, alto 50 mm y espesor 10 mm tiene área t·(a + b − t). ¿Cuánto vale, en mm²?", nums(1000), "10 · (60 + 50 − 10) = 1000 mm².", "Suma ancho y alto, resta el espesor."),
    calc("calc-vol", "Volumen extruido", "Con esa sección extruida 40 mm, ¿qué volumen tiene, en cm³?", nums(40), "1000 mm² · 40 mm = 40 000 mm³ = 40 cm³.", "Divide entre 1000 para pasar a cm³."),
    calc("calc-masa", "Masa en acero", "Con densidad 7,85 g/cm³, ¿cuántos gramos pesa esa pieza?", nums(314), "40 · 7,85 = 314 g.", "Volumen por densidad."),
    sort("clasifica", "¿Qué sale del modelo?", "Clasifica cada resultado según si se genera automáticamente del modelo o lo añade el diseñador.",
      [["aut", "Se genera del modelo", "cobalt"], ["dis", "Lo añade el diseñador", "amber"]],
      [["Las vistas ortogonales", "aut"], ["El volumen y la masa", "aut"], ["La lista de piezas de un ensamblaje", "aut"], ["Las tolerancias de ajuste", "dis"], ["El acabado superficial requerido", "dis"], ["La elección del material y del proceso", "dis"]],
      "El programa calcula la geometría; el diseñador decide la intención.",
    ),
    pick("check", "Fuente única", "¿Qué ventaja principal tiene partir de un único modelo 3D?",
      "Todo (vistas, cálculos, plano) se actualiza al cambiar una cota",
      [["Que no hace falta acotar", "Hay que acotar el plano."], ["Que desaparecen los errores", "Reduce errores, pero no los elimina."], ["Que no se necesita diseñador", "El diseño sigue siendo humano."]],
      "Una modificación se propaga a todas las vistas y documentos derivados.",
    ),
  ],
};
