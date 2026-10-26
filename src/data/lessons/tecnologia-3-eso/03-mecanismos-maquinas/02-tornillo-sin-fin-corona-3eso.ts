import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tornilloSinFinCorona3esoLesson: InteractiveLesson = {
  slug: "tornillo-sin-fin-corona-3eso",
  title: "2. Tornillo sin fin y corona",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una reducción enorme en poco espacio", [
      { kind: "definition", text: "Un **tornillo sin fin** es un tornillo que engrana con una **rueda dentada (corona)**. Por cada vuelta del tornillo, la corona avanza **tantos dientes como entradas** tiene la rosca del tornillo: una reducción muy grande en poco espacio." },
      { kind: "steps", items: [
        "**Relación**: i = dientes de la corona / entradas del tornillo.",
        "Los ejes se cruzan a **90°**.",
        "Suele ser **irreversible**: la corona no puede mover al tornillo (autobloqueo). Es una ventaja en ascensores y grúas.",
        "Tiene **bajo rendimiento** por el rozamiento entre los dientes y se calienta.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Reduce y multiplica el par", [
      { kind: "text", text: "Cambia los dientes de la corona, las entradas del tornillo y el rendimiento." },
    ], tool("eso3-sin-fin-explorador"), "visual-top"),
    slide("usos", "Aplicaciones", [
      { kind: "steps", items: [
        "**Clavijas de guitarra**: ajustan la tensión de la cuerda sin que se destense.",
        "**Cabrestantes y grúas**: mantienen la carga sin deslizarse.",
        "**Reductores de motor** y cintas transportadoras.",
        "**Mecanismos de precisión**: telescopios, cierres de puertas.",
      ] },
    ]),
    calc("calc-i", "Relación de reducción", "Un tornillo sin fin de una entrada engrana con una corona de 30 dientes. ¿Cuántas vueltas da el tornillo por cada vuelta de la corona?", nums(30), "i = 30 / 1 = 30 vueltas.", "Dientes entre entradas."),
    calc("calc-n", "Velocidad de salida", "El motor gira a 1 500 rpm con esa reducción de 30 : 1. ¿A cuántas rpm gira la corona?", nums(50), "1 500 / 30 = 50 rpm.", "n_salida = n_entrada / i."),
    calc("calc-par", "Par de salida", "El motor da 0,5 N·m, la relación es 30 : 1 y el rendimiento es del 40 %. ¿Qué par hay en la corona, en N·m?", nums(6), "0,5 · 30 · 0,40 = 6 N·m.", "Par · i · rendimiento."),
    sort("clasifica-sf", "Ventaja o inconveniente", "Clasifica cada característica del tornillo sin fin.",
      [["ven", "Ventaja", "emerald"], ["inc", "Inconveniente", "rose"]],
      [["Gran reducción de velocidad en poco espacio", "ven"], ["Funcionamiento silencioso", "ven"], ["Autobloqueo: mantiene la carga", "ven"], ["Bajo rendimiento", "inc"], ["Se calienta por el rozamiento", "inc"], ["No se puede usar para multiplicar la velocidad", "inc"]],
      "Es ideal para reducir y sostener cargas, pero pierde mucha energía.",
    ),
    pick("check-corona", "Más dientes", "Si aumentas los dientes de la corona (con el mismo tornillo), ¿qué ocurre con la velocidad de salida?",
      "Disminuye, porque aumenta la relación de reducción",
      [["Aumenta", "Con más dientes gira más despacio."], ["No cambia", "i = z / entradas."], ["Se hace cero", "Sigue girando."]],
      "Cuanto mayor es z, mayor es la reducción y menor la velocidad de la corona.",
    ),
  ],
};
