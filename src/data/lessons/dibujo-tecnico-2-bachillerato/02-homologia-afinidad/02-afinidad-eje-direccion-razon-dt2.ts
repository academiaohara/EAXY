import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const afinidadEjeDireccionRazonDt2Lesson: InteractiveLesson = {
  slug: "afinidad-eje-direccion-razon-dt2",
  title: "2. Afinidad: eje, dirección y razón",
  subtitle: DT2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Elementos de una afinidad", [
      { kind: "steps", items: [
        "Una **afinidad** plana tiene un **eje** $e$ formado por **puntos dobles**, una **dirección** $d$ y una **razón** $k$.",
        "**Puntos homólogos** $A$ y $A'$: están en una recta **paralela a la dirección**, y $\\dfrac{d(A', e)}{d(A, e)} = k$ (con signo).",
        "**Rectas homólogas** se cortan en el **eje** (o son paralelas a él, si lo son también sus homólogas).",
        "**Paralelas** se transforman en **paralelas**; **la razón simple** de tres puntos alineados se conserva.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una afinidad en acción", [
      { kind: "text", text: "Cambia la razón y la dirección. Observa cómo se deforma el triángulo y qué ocurre con el área." },
    ], tool("dt2-afinidad-explorador"), "visual-top"),
    slide("determinacion", "Cómo se determina", [
      { kind: "steps", items: [
        "Una afinidad queda definida por el **eje**, la **dirección** y **un par de puntos homólogos** (o la razón).",
        "Para hallar el **homólogo de un punto P**: se traza por P una paralela a la dirección y se halla la **recta homóloga de una recta cualquiera que pase por P** (cortando el eje).",
        "El **homólogo de una recta** pasa por el punto donde esta corta al eje y por el homólogo de otro de sus puntos.",
        "Casos particulares: **k = 1** identidad; **k = −1** simetría; dirección perpendicular al eje: **afinidad ortogonal**.",
      ] },
    ]),
    calc("calc-orto", "Afinidad ortogonal", "El eje es y = 0, la dirección es vertical (90°) y k = 2. ¿Cuál es el homólogo del punto (2, 3)? Responde con la coordenada y.", nums(6), "Se mantiene x = 2 y la distancia al eje se duplica: y′ = 6.", "k · y."),
    calc("calc-obl", "Afinidad oblicua", "Eje y = 0, dirección 45° y k = 0,5. ¿Cuál es la coordenada x del homólogo de (2, 4)? (x′ = x + (k − 1)·y·cos δ/sen δ)", nums(0), "x′ = 2 + (−0,5)·4·1 = 0 (y′ = 2).", "cos 45°/sen 45° = 1."),
    calc("calc-area", "Áreas", "Una figura de 12 cm² se transforma con una afinidad de razón k = −1/3. ¿Qué área tiene su homóloga, en cm²?", nums(4), "12 · |−1/3| = 4 cm².", "Las áreas se multiplican por |k|."),
    sort("clasifica-afi", "¿Cierto o falso?", "Clasifica cada afirmación sobre las afinidades.",
      [["ver", "Verdadera", "cobalt"], ["fal", "Falsa", "amber"]],
      [["Los puntos del eje son dobles", "ver"], ["Las rectas homólogas se cortan en el eje", "ver"], ["Los puntos homólogos están en una paralela a la dirección", "ver"], ["Las afinidades conservan los ángulos", "fal"], ["Una afinidad convierte paralelas en rectas que se cortan", "fal"]],
      "La afinidad conserva el paralelismo, pero no los ángulos.",
    ),
    pick("check-doble", "Puntos dobles", "¿Qué puntos coinciden con su homólogo en una afinidad (k ≠ 1)?",
      "Los puntos del eje",
      [["Los puntos de cualquier recta paralela a la dirección", "Esas rectas son dobles (se transforman en sí mismas), pero sus puntos no."], ["Ninguno", "Los puntos del eje son dobles."], ["Solo el origen", "Todos los puntos del eje lo son."]],
      "Los puntos del eje están a distancia 0 del eje y su homólogo también.",
    ),
  ],
};
