import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const puntoPlanoAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "punto-plano-axonometria-dt1",
  title: "4. Punto, recta y plano en axonometría",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("def", "Elementos básicos", [
      { kind: "steps", items: [
        "Un **punto** se define por sus **coordenadas** (x, y, z). Se llevan sobre los ejes con el **coeficiente** correspondiente.",
        "Para evitar ambigüedades se dibuja también su **proyección secundaria** (la del plano XY) y se une con él por una paralela al eje Z.",
        "Una **recta** se define por **dos puntos**. Sus **trazas** son los puntos donde corta a los planos coordenados (XY, XZ y YZ).",
        "Un **plano** se define por las **rectas** (trazas) en que corta a los planos coordenados, es decir, por los puntos donde corta a los **ejes**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Punto y plano", [
      { kind: "text", text: "Coloca un punto con sus coordenadas, y después un plano por sus cortes con los ejes." },
    ], tool("dt1-axo-punto-plano-explorador"), "visual-top"),
    slide("operaciones", "Qué se puede resolver", [
      { kind: "steps", items: [
        "**Pertenencia**: un punto está en un plano si está en una recta del plano.",
        "**Intersección de dos planos**: la recta que une los puntos donde se cortan sus trazas homónimas.",
        "**Verdaderas magnitudes**: se obtienen **abatiendo** el plano sobre uno de los coordenados; el triángulo de trazas se abate sobre el cuadro.",
        "Estas construcciones son análogas a las del sistema **diédrico**, pero con una sola imagen.",
      ] },
    ]),
    calc("calc-dist", "Distancia al origen", "El punto P(3, 4, 12). ¿A qué distancia está del origen, en cm?", nums(13), "√(9 + 16 + 144) = √169 = 13 cm.", "Pitágoras en 3D."),
    calc("calc-area", "Triángulo de trazas", "Un plano corta a los ejes en a = b = c = 3 cm. El triángulo de trazas tiene área ½·√((ab)² + (bc)² + (ca)²). ¿Cuánto vale, en cm²? (dos decimales)", nums(7.79, 7.7942), "½ · √243 ≈ 7,79 cm².", "(ab)² = 81, tres veces."),
    calc("calc-d0", "Distancia del origen al plano", "Para ese mismo plano, la distancia del origen es abc/√((ab)² + (bc)² + (ca)²). ¿Cuánto vale, en cm? (dos decimales)", nums(1.73, 1.7321), "27 / 15,59 ≈ 1,73 cm.", "√243 = 15,59."),
    sort("clasifica-elem", "¿Qué elemento?", "Clasifica cada dato.",
      [["pun", "Punto", "cobalt"], ["rec", "Recta", "amber"], ["pla", "Plano", "emerald"]],
      [["Tres coordenadas (x, y, z)", "pun"], ["Proyección secundaria en el plano XY", "pun"], ["Dos puntos", "rec"], ["Sus trazas están en los planos coordenados", "rec"], ["Se define por sus cortes con los ejes", "pla"], ["Triángulo de trazas", "pla"]],
      "Cada elemento tiene su forma habitual de definirse.",
    ),
    pick("check-secundaria", "Proyección secundaria", "¿Para qué se dibuja la proyección secundaria de un punto?",
      "Para eliminar la ambigüedad: una sola imagen no determina la posición del punto en el espacio",
      [["Para abreviar el dibujo", "Añade un elemento, no lo quita."], ["Para calcular el coeficiente de reducción", "No tiene relación."], ["Porque la normativa lo exige", "Es un recurso geométrico."]],
      "Un punto de la imagen puede corresponder a infinitos puntos del espacio sobre su rayo proyectante.",
    ),
  ],
};
