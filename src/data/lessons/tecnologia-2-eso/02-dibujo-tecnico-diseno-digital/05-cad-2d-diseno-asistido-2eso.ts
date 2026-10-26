import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cad2dDisenoAsistido2esoLesson: InteractiveLesson = {
  slug: "cad-2d-diseno-asistido-2eso",
  title: "5. Diseño asistido por ordenador en 2D",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar con precisión en el ordenador", [
      { kind: "definition", text: "Un programa de **CAD** permite dibujar planos con precisión, modificarlos fácilmente y reutilizarlos. Se trabaja con **entidades** (líneas, círculos, arcos) cuya posición se define con coordenadas." },
      { kind: "steps", items: [
        "**Dibujo**: línea, rectángulo, círculo, arco, polígono.",
        "**Edición**: mover, copiar, girar, simetría, recortar, **matriz** (repetir en filas y columnas), **redondeo** de esquinas.",
        "**Anotación**: cotas, textos y tabla de piezas.",
        "**Capas**: contorno, cotas y ejes separados, que se pueden ocultar.",
      ] },
    ], undefined, "stack"),
    slide("ordenes", "Aplica órdenes a una placa", [
      { kind: "text", text: "Activa las órdenes una a una y observa el dibujo, el número de entidades y el material." },
    ], tool("eso2-cad-comandos-explorador"), "visual-top"),
    slide("matriz", "Una matriz de agujeros", [
      { kind: "text", text: "Cambia las medidas de una placa y la posición de los agujeros se recalcula sola." },
    ], tool("cad-placa-explorador", { a: 120, b: 70 }), "visual-top"),
    slide("exporta", "De la pantalla a la máquina", [
      { kind: "steps", items: [
        "Un dibujo CAD se guarda en formatos como **DXF** o **SVG**, que entienden máquinas de **corte láser** o **cortadoras de vinilo**.",
        "También se **imprime a escala** en papel.",
        "El mismo dibujo sirve como base para el **modelado 3D**.",
      ] },
    ]),
    calc("calc-matriz", "Cuántos agujeros", "Una matriz de 3 columnas por 4 filas de agujeros, ¿cuántos agujeros genera?", nums(12), "3 · 4 = 12 agujeros.", "Columnas por filas."),
    calc("calc-entidades", "Cuántas entidades", "Un dibujo tiene un rectángulo, un círculo central y una matriz 2 × 2 de círculos más pequeños. ¿Cuántas entidades hay en total?", nums(6), "1 rectángulo + 1 círculo + 4 círculos = 6.", "Cuenta cada entidad."),
    sort("clasifica-orden", "Dibujo, edición o anotación", "Clasifica cada orden de CAD.",
      [["dib", "Dibujo", "cobalt"], ["edi", "Edición", "amber"], ["ano", "Anotación", "emerald"]],
      [["Círculo", "dib"], ["Rectángulo", "dib"], ["Matriz", "edi"], ["Simetría", "edi"], ["Redondear esquinas", "edi"], ["Cota", "ano"], ["Texto", "ano"]],
      "Dibujo crea entidades, edición las modifica o repite y anotación las describe.",
    ),
    pick("check-cad2d", "Cambiar una medida", "Hay que alargar una placa 20 mm. ¿Qué ventaja tiene el CAD?",
      "Se modifica la medida y el dibujo (y las cotas) se actualizan; no hay que dibujar de nuevo",
      [["Hay que borrar y dibujar de nuevo", "Eso ocurre en el dibujo manual."], ["El CAD no permite cambios", "Lo permite fácilmente."], ["El ordenador decide la medida", "El diseño lo decide la persona."]],
      "La edición rápida y la reutilización son las grandes ventajas del CAD.",
    ),
  ],
};
