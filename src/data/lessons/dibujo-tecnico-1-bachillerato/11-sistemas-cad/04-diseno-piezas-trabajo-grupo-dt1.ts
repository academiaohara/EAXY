import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disenoPiezasTrabajoGrupoDt1Lesson: InteractiveLesson = {
  slug: "diseno-piezas-trabajo-grupo-dt1",
  title: "4. Diseño de piezas complejas y trabajo en grupo",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Piezas simples, piezas complejas", [
      { kind: "steps", items: [
        "Una pieza compleja se forma **combinando piezas sencillas**: base, salientes, nervios, taladros, redondeos.",
        "Un buen modelo es **paramétrico**: las medidas son **parámetros** y las **relaciones** entre ellas (paralelo, tangente, igual) son **restricciones**. Al cambiar un parámetro, el modelo se actualiza.",
        "El **historial de operaciones** permite volver atrás, reordenar y corregir sin rehacer todo.",
        "Del modelo se obtienen **propiedades físicas**: volumen, masa, centro de gravedad.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Volumen y masa", [
      { kind: "text", text: "Una base, un saliente cilíndrico y un agujero pasante. Cambia el material y las medidas y observa el volumen y la masa." },
    ], tool("dt1-pieza-compuesta-explorador"), "visual-top"),
    slide("grupo", "Trabajo en grupo", [
      { kind: "steps", items: [
        "Las piezas complejas se reparten entre varias personas: cada una modela **componentes** que después se ensamblan en un **conjunto** (ensamblaje).",
        "Para colaborar hay que **acordar** el sistema de **unidades**, la **nomenclatura** de piezas y capas y el **origen de coordenadas**.",
        "Se trabaja con **control de versiones** y almacenamiento **en la nube** para que todos usen el archivo actualizado y se pueda volver a versiones anteriores.",
        "Para intercambiar modelos entre programas se usan formatos **neutros**: **STEP** o **IGES** (3D), **DXF/DWG** (2D) y **STL** (impresión 3D).",
      ] },
    ]),
    calc("calc-vol", "Volumen", "Con base 100 × 60 × 20 mm, un saliente de radio 15 y altura 30 mm y un taladro pasante de radio 5 mm (a través de los 50 mm), ¿qué volumen tiene la pieza, en cm³? (un decimal)", nums(137.3, 137.28), "120 + 21,2 − 3,9 ≈ 137,3 cm³.", "Suma el saliente y resta el taladro."),
    calc("calc-acero", "Masa en acero", "Con ese volumen y una densidad de 7,85 g/cm³, ¿cuántos gramos pesa la pieza de acero? (redondea a la unidad)", nums(1078, 1077.6), "137,28 · 7,85 ≈ 1078 g.", "Volumen por densidad."),
    calc("calc-alu", "Masa en aluminio", "Y si fuera de aluminio (2,70 g/cm³), ¿cuántos gramos? (redondea a la unidad)", nums(371, 370.7), "137,28 · 2,70 ≈ 371 g.", "Cambia la densidad."),
    sort("clasifica-formato", "¿Qué formato?", "Asocia cada formato con su uso.",
      [["step", "Modelo 3D neutro (STEP/IGES)", "cobalt"], ["dxf", "Dibujo 2D (DXF/DWG)", "amber"], ["stl", "Impresión 3D (STL)", "emerald"]],
      [["Intercambiar un modelo entre dos programas de CAD", "step"], ["Enviar la geometría exacta de una pieza al fabricante", "step"], ["Enviar un plano a un cortador láser", "dxf"], ["Compartir las vistas de un plano", "dxf"], ["Imprimir una pieza en 3D", "stl"], ["Malla de triángulos", "stl"]],
      "Cada formato sirve para un flujo de trabajo distinto.",
    ),
    pick("check-param", "Modelo paramétrico", "¿Qué ventaja principal tiene un modelo paramétrico?",
      "Al cambiar una medida, todo el modelo se actualiza respetando las relaciones definidas",
      [["Ocupa menos memoria siempre", "No es su ventaja principal."], ["No necesita dibujar bocetos", "Parte de bocetos con restricciones."], ["Solo funciona en 2D", "Se usa sobre todo en 3D."]],
      "Cambiar un parámetro propaga el cambio por el árbol de diseño.",
    ),
  ],
};
