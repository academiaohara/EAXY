import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cadVectorialCoordenadasDt1Lesson: InteractiveLesson = {
  slug: "cad-vectorial-coordenadas-dt1",
  title: "1. Dibujo vectorial 2D: elementos y coordenadas",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar con coordenadas", [
      { kind: "steps", items: [
        "**CAD** (*Computer Aided Design*) es el diseño asistido por ordenador: se dibuja, edita, acota y archiva con un programa.",
        "Una imagen **vectorial** guarda cada elemento (línea, arco, círculo…) con sus **coordenadas y propiedades**; una imagen de **mapa de bits** guarda **píxeles**.",
        "El vectorial se puede **ampliar sin perder calidad**, se **mide** con precisión y se **edita** elemento a elemento. Es el formato de los planos técnicos.",
        "Se organiza en **capas** (contornos, ejes, cotas…) que se pueden mostrar, ocultar o bloquear.",
      ] },
    ], undefined, "stack"),
    slide("elementos", "Elementos y órdenes", [
      { kind: "steps", items: [
        "**Elementos de dibujo**: punto, línea, polilínea, rectángulo, polígono regular, círculo, arco, elipse, **spline**, texto, **cota**, rayado.",
        "**Órdenes de edición**: borrar, mover, copiar, girar, escalar, simetría, matriz (repetición), recortar, alargar, empalme (**redondeo**) y chaflán.",
        "**Ayudas**: rejilla, ortogonal, **referencia a objetos** (extremo, punto medio, centro, intersección, perpendicular, tangente) y **coordenadas**.",
        "Todas las órdenes trabajan con **precisión numérica**, no «a ojo».",
      ] },
    ]),
    slide("coordenadas", "Tres formas de dar un punto", [
      { kind: "text", text: "Cambia el modo de introducción de coordenadas y comprueba que el mismo punto se puede escribir de tres maneras." },
    ], tool("dt1-coordenadas-cad-explorador"), "visual-top"),
    calc("calc-dist", "De relativas a polares", "Desde P₀ se introduce @4,3 (relativas). ¿Qué distancia recorre, en cm?", nums(5), "√(4² + 3²) = 5 cm.", "Pitágoras."),
    calc("calc-ang", "Ángulo", "Y ¿qué ángulo forma con el eje X, en grados? (un decimal)", nums(36.9, 36.87), "arctg(3/4) ≈ 36,9°.", "Arcotangente de 3/4."),
    calc("calc-pol", "De polares a absolutas", "P₀ = (2, 1). Se introduce @6<90 (6 cm a 90°). ¿Cuál es la coordenada y del nuevo punto?", nums(7), "90° apunta hacia arriba: y = 1 + 6 = 7; x no cambia.", "El desplazamiento es vertical."),
    calc("calc-rel", "Relativas", "P₀ = (2, 1). Se introduce @3,−2. ¿Cuál es la coordenada x del nuevo punto?", nums(5), "x = 2 + 3 = 5; y = 1 − 2 = −1.", "Suma el desplazamiento."),
    sort("clasifica-cad", "¿Vectorial o mapa de bits?", "Clasifica cada característica.",
      [["vec", "Vectorial", "cobalt"], ["bit", "Mapa de bits", "amber"]],
      [["Se amplía sin perder nitidez", "vec"], ["Guarda coordenadas y propiedades", "vec"], ["Se edita elemento a elemento", "vec"], ["Está formado por píxeles", "bit"], ["Una fotografía", "bit"], ["Al ampliar se ve pixelado", "bit"]],
      "Los planos técnicos son vectoriales; las fotografías son mapas de bits.",
    ),
    pick("check-capas", "Capas", "¿Para qué sirven las capas en un dibujo CAD?",
      "Para organizar los elementos por tipo y poder mostrarlos, ocultarlos o bloquearlos",
      [["Para dibujar en 3D", "Eso son los sistemas de coordenadas y las vistas."], ["Para aumentar la resolución", "Es un dibujo vectorial: no tiene resolución."], ["Para cambiar la escala", "La escala no depende de las capas."]],
      "Cada capa agrupa un tipo de información: contornos, ejes, cotas, rayados…",
    ),
  ],
};
