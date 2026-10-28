import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const levasBielasManivelas3esoLesson: InteractiveLesson = {
  slug: "levas-bielas-manivelas-3eso",
  title: "3. Levas, bielas y manivelas",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Una leva en acción", [
      { kind: "text", text: "Observa cómo el giro de una leva excéntrica mueve un seguidor arriba y abajo." },
    ], anim("eso3-leva-seguidor"), "text-top"),
    slide("perfil", "El perfil decide el movimiento", [
      { kind: "text", text: "Compara cómo se mueve el seguidor con tres tipos de leva." },
    ], tool("eso3-leva-explorador"), "visual-top"),
    slide("biela", "Biela y manivela", [
      { kind: "text", text: "La biela-manivela convierte el giro en vaivén (y al revés). Repasa cómo funciona y cómo se calcula la carrera." },
    ], tool("eso2-transformacion-explorador", { n: 2 }), "visual-top"),
    slide("uso", "Dónde se usan", [
      { kind: "steps", items: [
        "**Levas**: válvulas de los motores, juguetes con movimiento, máquinas de coser, impresoras.",
        "**Biela-manivela**: motores de combustión (el pistón mueve el cigüeñal), bombas, sierras.",
        "**Cigüeñal**: eje con varias manivelas; transforma los vaivenes de varios pistones en un giro continuo.",
        "**Excéntrica**: mecanismo similar a la leva con una pieza circular desplazada.",
      ] },
    ]),
    calc("calc-carrera", "Carrera de una excéntrica", "Una leva excéntrica tiene una excentricidad de 15 mm. ¿Cuál es la carrera del seguidor (2 · e), en mm?", nums(30), "2 · 15 = 30 mm.", "Doble de la excentricidad."),
    calc("calc-heart", "Leva de corazón", "Una leva de corazón con una carrera de 20 mm gira 90° (un cuarto de vuelta desde el punto más bajo). Sube a velocidad constante hasta 180°. ¿Qué altura tiene el seguidor, en mm?", nums(10), "A 90° está a la mitad del recorrido de subida (180°): 10 mm.", "Altura = (ángulo / 180°) · carrera."),
    sort("clasifica-leva", "¿Qué mecanismo es?", "Relaciona cada situación con el mecanismo.",
      [["lev", "Leva", "cobalt"], ["bie", "Biela-manivela", "emerald"]],
      [["Abre las válvulas de un motor", "lev"], ["Mueve el seguidor siguiendo un perfil", "lev"], ["Necesita un muelle para volver", "lev"], ["Convierte el vaivén del pistón en giro", "bie"], ["Se usa en una bomba de pistón", "bie"], ["Carrera = 2 · radio de la manivela", "bie"]],
      "La leva sigue un perfil; la biela-manivela relaciona giro y vaivén.",
    ),
    pick("check-muelle", "El muelle", "¿Por qué muchos mecanismos de leva llevan un muelle?",
      "Para mantener el seguidor siempre en contacto con la leva",
      [["Para frenar el giro", "No frena."], ["Para almacenar electricidad", "No es eléctrico."], ["No sirve para nada", "Garantiza el contacto."]],
      "Sin muelle, el seguidor se separaría de la leva al bajar.",
    ),
  ],
};
