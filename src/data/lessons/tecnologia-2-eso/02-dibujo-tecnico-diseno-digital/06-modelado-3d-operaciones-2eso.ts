import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modelado3dOperaciones2esoLesson: InteractiveLesson = {
  slug: "modelado-3d-operaciones-2eso",
  title: "6. Modelado 3D y representación digital de piezas",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una pieza virtual", [
      { kind: "definition", text: "El **modelado 3D** crea una pieza virtual con volumen. A partir de ella el programa obtiene **vistas**, **volumen** y **masa**, y se puede **simular**, **imprimir en 3D** o **cortar** con máquinas de control numérico." },
      { kind: "steps", items: [
        "**Croquis** 2D acotado sobre un plano.",
        "**Extrusión**: se da altura al croquis.",
        "**Operaciones**: agujeros, cortes, chaflanes y redondeos.",
        "**Material**: se asigna para calcular la masa.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Del croquis al sólido", [
      { kind: "text", text: "Mira cómo se construye un modelo 3D por extrusión." },
    ], anim("extrusion-perfil"), "text-top"),
    slide("explora", "Extruye un perfil", [
      { kind: "text", text: "Prueba distintos perfiles y alturas." },
    ], tool("extrusion-explorador", { n: 4, a: 4, b: 6 }), "visual-top"),
    slide("taladro", "Quitar material: agujeros", [
      { kind: "text", text: "Haz un taladro pasante o ciego y observa cuánto material se quita y cuánto cambia la masa." },
    ], tool("eso2-solido-operaciones-explorador"), "visual-top"),
    calc("calc-vol", "Volumen de un bloque", "Un bloque de 40 × 30 × 20 mm, ¿cuántos cm³ tiene? (1 cm³ = 1 000 mm³)", nums(24), "40 · 30 · 20 = 24 000 mm³ = 24 cm³.", "Multiplica las tres medidas y divide entre 1 000."),
    calc("calc-masa", "Masa de la pieza", "Una pieza de aluminio de 10 cm³ tiene densidad 2,7 g/cm³. ¿Cuántos gramos pesa?", nums(27), "m = V · densidad = 10 · 2,7 = 27 g.", "Masa = volumen · densidad."),
    sort("clasifica-op3d", "¿Qué operación es?", "Clasifica cada acción de modelado.",
      [["ext", "Añade volumen", "emerald"], ["qui", "Quita material", "rose"], ["sua", "Suaviza aristas", "amber"]],
      [["Extruir un croquis", "ext"], ["Convertir un cuadrado en un prisma", "ext"], ["Hacer un taladro", "qui"], ["Cortar una ranura", "qui"], ["Redondear una arista", "sua"], ["Hacer un chaflán", "sua"]],
      "Extruir añade volumen, taladrar y cortar lo quitan, y redondear o achaflanar suavizan aristas.",
    ),
    pick("check-3d", "Ventaja del modelo 3D", "¿Qué ventaja ofrece un modelo 3D frente a un dibujo 2D?",
      "Permite calcular el volumen y la masa, simular y fabricar la pieza directamente",
      [["Es más fácil de dibujar a mano", "Se hace con el ordenador."], ["No necesita acotación", "Se necesita igualmente para el diseño."], ["Solo sirve para videojuegos", "Se usa en la industria y el taller."]],
      "El modelo contiene toda la información de la pieza y se puede usar para analizarla y fabricarla.",
    ),
  ],
};
