import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const lugaresGeometricosDt1Lesson: InteractiveLesson = {
  slug: "lugares-geometricos-dt1",
  title: "3. Lugares geométricos fundamentales",
  subtitle: DT1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Todos los puntos que cumplen una condición", [
      { kind: "steps", items: [
        "Un **lugar geométrico** es el conjunto de **todos** los puntos del plano que cumplen una propiedad, y **solo** de ellos.",
        "**Circunferencia**: puntos a distancia fija $r$ de un punto $O$.",
        "**Mediatriz** de AB: puntos que **equidistan** de A y B. Es la perpendicular al segmento por su punto medio.",
        "**Bisectriz** de un ángulo: puntos que equidistan de **sus dos lados**.",
        "**Paralelas** a una recta $r$ a distancia $d$: dos rectas, una a cada lado.",
        "Resolver un problema de construcción suele ser **intersecar dos lugares geométricos**.",
      ] },
    ], undefined, "stack"),
    slide("lugares", "Comprueba cada lugar", [
      { kind: "text", text: "Elige un lugar, mueve el punto P y mira qué magnitudes se comparan. Encuentra varias posiciones donde se cumple." },
    ], tool("dt1-lugar-geometrico-explorador"), "visual-top"),
    slide("aplic", "Intersecar lugares", [
      { kind: "steps", items: [
        "**Circuncentro** del triángulo: intersección de **mediatrices**; equidista de los tres vértices.",
        "**Incentro**: intersección de **bisectrices**; equidista de los tres lados.",
        "Un punto **a 3 cm de A y a 4 cm de B**: intersección de dos circunferencias (hay 2 puntos, 1 o ninguno).",
        "Un punto **a igual distancia de dos rectas y a 2 cm de una de ellas**: bisectriz con una paralela.",
      ] },
    ]),
    calc("calc-pa", "Distancia a los extremos", "A(−3, 0) y B(3, 0). Un punto P de la mediatriz está a 4 cm de altura sobre AB. ¿Cuánto vale PA, en cm?", nums(5), "PA = √(3² + 4²) = 5 cm, y PB también.", "Pitágoras con catetos 3 y 4."),
    calc("calc-par", "Dos paralelas", "El lugar de los puntos a 2 cm de una recta son dos paralelas. ¿Qué distancia hay entre ellas, en cm?", nums(4), "2 + 2 = 4 cm.", "Una está a cada lado de la recta."),
    calc("calc-bis", "En la bisectriz", "Un punto de la bisectriz de un ángulo está a 2 cm de uno de sus lados. ¿A cuántos cm está del otro?", nums(2), "Equidista de ambos lados: 2 cm.", "Es la definición."),
    sort("clasifica-lugar", "¿Qué lugar es?", "Relaciona cada propiedad con el lugar geométrico.",
      [["cir", "Circunferencia", "cobalt"], ["med", "Mediatriz", "amber"], ["bis", "Bisectriz", "emerald"], ["par", "Paralelas", "rose"]],
      [["Puntos a 3 cm de un punto fijo", "cir"], ["Posiciones de un radar que alcanza 50 km", "cir"], ["Puntos a igual distancia de dos faros", "med"], ["Centro de la circunferencia que pasa por A y B", "med"], ["Puntos a igual distancia de los lados de un ángulo", "bis"], ["Centro de la circunferencia tangente a dos rectas", "bis"], ["Puntos a 5 m de una carretera recta", "par"], ["Posiciones a 2 cm del borde de una regla", "par"]],
      "La propiedad de distancia decide el lugar.",
    ),
    pick("check-centro", "Centro de la circunferencia por tres puntos", "¿Cómo se halla el centro de la circunferencia que pasa por tres puntos no alineados?",
      "Como intersección de las mediatrices de dos de los segmentos que los unen",
      [["Como intersección de las bisectrices", "Eso da el centro de la inscrita."], ["Trazando alturas", "Las alturas dan el ortocentro."], ["Tomando el punto medio de uno de los segmentos", "Solo sirve si es un diámetro."]],
      "El centro equidista de los tres puntos, así que está en dos mediatrices.",
    ),
  ],
};
