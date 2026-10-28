import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modeladoParametricoRestriccionesDt2Lesson: InteractiveLesson = {
  slug: "modelado-parametrico-restricciones-dt2",
  title: "1. Modelado paramétrico: croquis y restricciones",
  subtitle: DT2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Diseñar con intención", [
      { kind: "steps", items: [
        "En el **modelado paramétrico**, la pieza no es solo una forma: es un **conjunto de reglas** (restricciones y cotas) que la definen.",
        "Se parte de un **croquis** 2D en un plano. Sus elementos (líneas, arcos, círculos) se **restringen** geométricamente.",
        "Después se aplican **operaciones** sobre el croquis: **extrusión**, **revolución**, **barrido**, **corte**, **vaciado**, **redondeos**…",
        "Cambiar una **cota** actualiza todo el modelo, incluidas las vistas del plano: de ahí su productividad.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Grados de libertad", [
      { kind: "text", text: "Añade restricciones y cotas a un rectángulo. Mira cuántos grados de libertad quedan y el estado del croquis." },
    ], tool("dt2-croquis-restricciones-explorador"), "visual-top"),
    slide("tipos", "Tipos de restricciones", [
      { kind: "steps", items: [
        "**Geométricas**: horizontal, vertical, paralela, perpendicular, tangente, concéntrica, coincidente, simétrica, igual.",
        "**Dimensionales** (cotas): longitud, ángulo, radio o diámetro, distancia entre elementos.",
        "**Fijas**: anclan un punto o una línea al origen para que el croquis no «flote».",
        "Un croquis **totalmente definido** es estable; uno **infradefinido** puede cambiar de forma al arrastrar; uno **sobredefinido** tiene restricciones en conflicto.",
      ] },
    ]),
    slide("operaciones", "De croquis a sólido", [
      { kind: "steps", items: [
        "**Extrusión**: se estira el croquis una distancia en la dirección perpendicular al plano.",
        "**Revolución**: se gira alrededor de un eje (ejes, pomos, piezas torneadas).",
        "**Barrido**: se desplaza a lo largo de una trayectoria (tubos, perfiles curvos).",
        "**Cortes y vaciados**: se sustrae material; **redondeos y chaflanes** suavizan aristas. Todas son operaciones **booleanas** con el sólido.",
      ] },
    ]),
    calc("calc-gdl", "Grados de libertad", "Un rectángulo en un croquis tiene cuatro vértices, y cada uno puede moverse en x e y. ¿Cuántos grados de libertad tiene?", nums(8), "4 vértices · 2 = 8.", "Dos coordenadas por vértice."),
    calc("calc-res", "Restricciones necesarias", "Un rectángulo tiene 2 lados horizontales, 2 lados verticales (4 restricciones), 2 cotas y 1 vértice fijo (2 grados). ¿Cuántos grados quedan libres?", nums(0), "8 − 4 − 2 − 2 = 0: totalmente definido.", "Resta todos los que se eliminan."),
    sort("clasifica", "Tipo de restricción", "Clasifica cada restricción.",
      [["geo", "Geométrica", "cobalt"], ["dim", "Dimensional (cota)", "amber"]],
      [["Dos rectas paralelas", "geo"], ["Un arco tangente a una recta", "geo"], ["Un lado horizontal", "geo"], ["Longitud de un lado: 40 mm", "dim"], ["Diámetro de un agujero: 8 mm", "dim"], ["Ángulo de 30° entre dos líneas", "dim"]],
      "Las geométricas fijan relaciones; las cotas fijan valores.",
    ),
    pick("check", "Sobredefinido", "¿Qué significa que un croquis esté sobredefinido?",
      "Tiene restricciones de más, en conflicto",
      [["Le faltan restricciones", "Eso es infradefinido."], ["Es más grande de lo normal", "No tiene que ver con el tamaño."], ["Está terminado", "Está en conflicto."]],
      "Hay más condiciones que grados de libertad: no se pueden cumplir todas a la vez.",
    ),
  ],
};
