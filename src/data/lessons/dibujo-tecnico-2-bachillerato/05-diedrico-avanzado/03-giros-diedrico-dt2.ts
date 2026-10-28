import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const girosDiedricoDt2Lesson: InteractiveLesson = {
  slug: "giros-diedrico-dt2",
  title: "3. Giros en el sistema diédrico",
  subtitle: DT2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Girar en lugar de proyectar de nuevo", [
      { kind: "steps", items: [
        "Un **giro** cambia la **posición** de un objeto respecto de los planos de proyección sin deformarlo, moviéndolo alrededor de un **eje**.",
        "Cada punto describe una **circunferencia** en un plano perpendicular al eje; su centro está en el eje.",
        "Con un eje **vertical** (perpendicular al PH): la proyección **horizontal** gira un ángulo θ y la **vertical** se desplaza en horizontal, a la misma cota.",
        "Con un eje **de punta** (perpendicular al PV): se gira la proyección **vertical** y la horizontal se desplaza paralela a la LT.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Girar una recta hasta hacerla frontal", [
      { kind: "text", text: "Gira AB alrededor del eje vertical por A. Cuando su proyección horizontal sea paralela a la LT, la recta es frontal y verás su longitud real en el PV." },
    ], tool("dt2-giro-recta-explorador"), "visual-top"),
    slide("reglas", "Reglas del giro", [
      { kind: "steps", items: [
        "Lo que está **en el eje** no se mueve.",
        "La **distancia** de un punto al eje se conserva: su proyección sobre el plano perpendicular al eje describe una circunferencia.",
        "Para girar una **figura**, se giran sus vértices **el mismo ángulo y en el mismo sentido** y se unen.",
        "Para girar un **plano** basta girar su **recta de máxima pendiente** o tres de sus puntos.",
      ] },
    ]),
    calc("calc-giro", "Ángulo de giro", "La proyección horizontal de AB forma 30° con la LT. ¿Cuántos grados hay que girarla, como mínimo, para que sea paralela a la LT y la recta sea frontal?", nums(30), "Basta girar 30° en sentido contrario para dejarla paralela a la LT.", "Es el ángulo con la LT."),
    calc("calc-long", "Longitud real", "Una recta frontal tiene diferencia de cotas 3 cm y su proyección horizontal mide 4 cm. ¿Cuánto mide la recta en la realidad, en cm?", nums(5), "Es un triángulo 3-4-5: 5 cm.", "Pitágoras con 3 y 4."),
    sort("clasifica", "¿Qué se conserva en el giro?", "Clasifica cada magnitud según se conserve o cambie al girar alrededor de un eje vertical.",
      [["con", "Se conserva", "cobalt"], ["cam", "Cambia", "amber"]],
      [["La cota de cada punto", "con"], ["La longitud real del segmento", "con"], ["La distancia al eje", "con"], ["La posición de la proyección horizontal", "cam"], ["La longitud de la proyección vertical", "cam"], ["La dirección respecto de la LT", "cam"]],
      "Las magnitudes reales se conservan; las proyecciones cambian.",
    ),
    pick("check", "Eje vertical", "Al girar un punto alrededor de un eje vertical, ¿qué trayectoria describe su proyección horizontal?",
      "Una circunferencia",
      [["Una recta paralela a la LT", "Esa es la trayectoria de la vertical."], ["Una elipse", "Solo si el eje fuese oblicuo."], ["Un punto fijo", "Sería un punto del eje."]],
      "Las proyecciones horizontales giran; la vertical solo se desplaza.",
    ),
  ],
};
