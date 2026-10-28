import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const rozamientoFq2Lesson: InteractiveLesson = {
  slug: "rozamiento-fq2",
  title: "4. El rozamiento",
  subtitle: FQ2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una fuerza que frena", [
      { kind: "steps", items: [
        "El **rozamiento** es una fuerza de **contacto** entre dos superficies que **se opone** a su movimiento relativo (o a que empiece).",
        "Siempre tiene **sentido contrario** al del movimiento (o al de la fuerza que lo intentaría).",
        "Se debe a las **rugosidades** de las superficies, incluso de las que parecen lisas.",
        "Gracias a él podemos **andar**, **agarrar** objetos o **frenar** un coche.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Se mueve o no?", [
      { kind: "text", text: "Empuja un bloque sobre distintas superficies. Compara la fuerza aplicada con el rozamiento máximo." },
    ], tool("fq2-rozamiento-explorador"), "visual-top"),
    slide("factores", "De qué depende", [
      { kind: "steps", items: [
        "De la **naturaleza de las superficies**: el hielo resbala; la goma agarra. Se mide con el **coeficiente de rozamiento μ**.",
        "De la **fuerza normal N**, con que las superficies se aprietan (en una superficie horizontal, N = m · g, el peso).",
        "**No** depende (apenas) del **área** de contacto.",
        "**F_roz = μ · N** (valor máximo). Si la fuerza aplicada es menor, el rozamiento la iguala y el cuerpo no se mueve.",
      ] },
    ]),
    slide("util", "Ventajas e inconvenientes", [
      { kind: "steps", items: [
        "**Útil**: frenar, andar, escribir, sujetar tornillos, agarrar con los neumáticos.",
        "**Perjudicial**: **desgasta** las piezas, **calienta** y **gasta energía** en las máquinas.",
        "Se **reduce** con **lubricantes** (aceite, grasa), superficies pulidas o rodamientos; se **aumenta** con superficies rugosas (suelas, neumáticos).",
      ] },
    ]),
    calc("calc-N", "Fuerza normal", "Un bloque de 10 kg sobre el suelo (g = 9,8 N/kg). ¿Cuánto vale la fuerza normal, en N?", nums(98), "N = m · g = 10 · 9,8 = 98 N.", "Es igual al peso."),
    calc("calc-Fr", "Rozamiento máximo", "Con μ = 0,4 y N = 98 N, ¿cuál es el rozamiento máximo, en N? (un decimal)", nums(39.2), "0,4 · 98 = 39,2 N.", "Multiplica μ por N."),
    calc("calc-neta", "Fuerza neta", "Se empuja ese bloque con 60 N y el rozamiento es de 39,2 N. ¿Cuál es la fuerza neta, en N? (un decimal)", nums(20.8), "60 − 39,2 = 20,8 N hacia delante.", "Resta el rozamiento a la fuerza aplicada."),
    sort("clasifica", "Ventaja o inconveniente", "Clasifica cada situación.",
      [["uti", "Rozamiento útil", "cobalt"], ["per", "Rozamiento perjudicial", "amber"]],
      [["Poder andar sin resbalar", "uti"], ["Frenar un coche", "uti"], ["Sujetar un tornillo", "uti"], ["Desgaste de un motor", "per"], ["Pérdida de energía en una cadena", "per"], ["Calentamiento de las piezas", "per"]],
      "Útil si ayuda; perjudicial si desgasta o gasta energía.",
    ),
    pick("check", "Reducirlo", "¿Cómo se reduce el rozamiento entre dos piezas de una máquina?",
      "Con un lubricante",
      [["Apretándolas más", "Aumentaría la normal."], ["Usando superficies más rugosas", "Aumentaría el rozamiento."], ["Aumentando el peso", "Aumentaría N."]],
      "El aceite o la grasa forman una película que separa las superficies.",
    ),
  ],
};
