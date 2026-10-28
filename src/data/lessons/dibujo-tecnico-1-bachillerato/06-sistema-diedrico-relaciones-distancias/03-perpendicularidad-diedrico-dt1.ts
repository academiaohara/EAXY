import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const perpendicularidadDiedricoDt1Lesson: InteractiveLesson = {
  slug: "perpendicularidad-diedrico-dt1",
  title: "3. Perpendicularidad entre rectas y planos",
  subtitle: DT1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Condiciones de perpendicularidad", [
      { kind: "steps", items: [
        "**Recta perpendicular a un plano**: su proyección horizontal es **perpendicular a α₁** y su proyección vertical, **perpendicular a α₂**.",
        "Esto ocurre porque un ángulo **recto** se proyecta **en verdadera magnitud** cuando uno de sus lados es **paralelo** al plano de proyección (como las trazas).",
        "**Plano perpendicular a una recta**: sus trazas son perpendiculares a las proyecciones homónimas de la recta.",
        "**Plano perpendicular a otro plano**: contiene una **recta perpendicular** al primero.",
      ] },
    ], undefined, "stack"),
    slide("explora", "La normal al plano", [
      { kind: "text", text: "Cambia el plano y el punto: la recta perpendicular siempre es perpendicular a las trazas en cada proyección. Mira la distancia al plano." },
    ], tool("dt1-perpendicular-explorador"), "visual-top"),
    slide("dist", "Distancia de un punto a un plano", [
      { kind: "steps", items: [
        "Por el punto se traza la **recta perpendicular** al plano.",
        "Se halla el **punto de corte F** (pie) de esa recta con el plano, con un **plano auxiliar proyectante**.",
        "La distancia es la **verdadera magnitud del segmento AF** (se obtiene con un triángulo rectángulo o con un giro).",
        "Si el punto **pertenece** al plano, la distancia es **cero**.",
      ] },
    ]),
    calc("calc-d1", "Distancia a un plano", "El plano tiene trazas a 135° y 45° (z = x − e). Un punto está en (x = 0, e = 0, z = 3). ¿Qué distancia tiene al plano, en cm? (d = 1,5/√0,75, dos decimales)", nums(1.73, 1.732), "d = |3 − 0|/√3 ≈ 1,73 cm.", "El plano z = x − e tiene normal (−1, 1, 1)."),
    calc("calc-d2", "Otro punto", "El mismo plano y un punto en (x = 2, e = 0, z = 0). ¿Qué distancia tiene al plano, en cm? (dos decimales)", nums(1.15, 1.1547), "d = |0 − 2|/√3 ≈ 1,15 cm.", "d = |z − x + e|/√3."),
    calc("calc-d3", "Punto del plano", "El punto (x = 3, e = 3, z = 0) ¿qué distancia tiene al plano z = x − e, en cm?", nums(0), "0 = 3 − 3: el punto pertenece al plano, así que la distancia es 0.", "Comprueba si cumple la ecuación."),
    sort("clasifica-perp", "¿Perpendiculares?", "Clasifica cada situación respecto a un plano α.",
      [["si", "Perpendicular a α", "cobalt"], ["no", "No perpendicular a α", "amber"]],
      [["Recta con r ⟂ α₁ y r′ ⟂ α₂", "si"], ["Recta con la proyección horizontal perpendicular a α₁ y la vertical oblicua a α₂", "no"], ["Normal al plano trazada desde un punto", "si"], ["Recta paralela a α₁", "no"]],
      "Las dos proyecciones deben ser perpendiculares a sus trazas homónimas.",
    ),
    pick("check-ang", "Por qué se conserva", "¿Por qué la proyección de un ángulo recto es recta si un lado es paralelo al plano de proyección?",
      "Porque el otro lado, perpendicular al primero, se proyecta sobre una dirección también perpendicular",
      [["Porque todos los ángulos se conservan en la proyección", "No: solo ocurre en este caso."], ["Porque la LT es perpendicular a ambos", "No interviene la LT."], ["Porque la proyección es cónica", "Es ortogonal."]],
      "Teorema de las tres perpendiculares: ángulos rectos con un lado paralelo al plano se proyectan rectos.",
    ),
  ],
};
