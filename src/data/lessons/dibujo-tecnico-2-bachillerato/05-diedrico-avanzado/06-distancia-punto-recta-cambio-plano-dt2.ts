import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const distanciaPuntoRectaCambioPlanoDt2Lesson: InteractiveLesson = {
  slug: "distancia-punto-recta-cambio-plano-dt2",
  title: "6. Distancia de un punto a una recta",
  subtitle: DT2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "La recta de punta", [
      { kind: "steps", items: [
        "La **distancia** de un punto P a una recta r es la longitud del segmento perpendicular desde P hasta r.",
        "En proyecciones no se ve en verdadera magnitud salvo que r sea **perpendicular** a un plano de proyección.",
        "Para conseguirlo se hacen **dos cambios de plano**: primero uno paralelo a r (la recta se ve en verdadera magnitud) y luego otro **perpendicular** a r.",
        "En la última vista la recta se proyecta como **un punto** r*, y la distancia de P a r es la distancia de P* a r*.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Vista de punta", [
      { kind: "text", text: "Mueve el punto P. A la derecha ves la recta de punta y la distancia como segmento en verdadera magnitud." },
    ], tool("dt2-distancia-punto-recta-explorador"), "visual-top"),
    slide("pasos", "Construcción", [
      { kind: "steps", items: [
        "**Primer cambio**: LT′ paralela a la proyección horizontal de r. En el nuevo plano, r y P se ven con las **cotas** originales.",
        "**Segundo cambio**: LT″ **perpendicular** a r′ (la nueva proyección de r). La recta se proyecta como un **punto**.",
        "Se mide **P″r″**: es la distancia buscada.",
        "Para obtener las proyecciones del **pie de la perpendicular**, se vuelve atrás: por la perpendicular a r en la última vista (que es toda la recta en verdadera magnitud en el cambio anterior).",
      ] },
    ]),
    slide("generalizacion", "Otros problemas con el mismo método", [
      { kind: "steps", items: [
        "**Distancia entre dos rectas** que se cruzan: se ve una de ellas de punta; la distancia mínima a la otra es la distancia pedida.",
        "**Distancia de un punto a un plano**: se hace el plano **de canto** (una recta) con un cambio de plano.",
        "**Ángulo entre dos planos**: se ven los dos de canto en la misma vista, a la vez, mirando según su recta de intersección.",
      ] },
    ]),
    calc("calc-d", "Distancia", "En la vista de frente, la recta se ve como el punto (0, 0) y el punto P como (3, 4). ¿Cuál es la distancia de P a la recta, en cm?", nums(5), "√(9 + 16) = 5 cm.", "Pitágoras con 3 y 4."),
    calc("calc-n", "Número de cambios", "¿Cuántos cambios de plano se necesitan, en general, para ver una recta oblicua de punta?", nums(2), "Dos: uno para verla en verdadera magnitud y otro perpendicular a ella.", "Primero paralelo, luego perpendicular."),
    sort("clasifica", "Resultado de cada vista", "Clasifica cada plano de proyección según cómo se ve la recta en él.",
      [["vm", "Verdadera magnitud", "cobalt"], ["pt", "De punta (un punto)", "amber"], ["obl", "Oblicua (acortada)", "emerald"]],
      [["Plano paralelo a la recta", "vm"], ["La recta es frontal en esa vista", "vm"], ["Plano perpendicular a la recta", "pt"], ["La recta se proyecta como un punto", "pt"], ["Plano oblicuo a la recta", "obl"], ["La proyección es más corta que la recta", "obl"]],
      "Paralelo: verdadera magnitud; perpendicular: de punta; oblicuo: acortada.",
    ),
    pick("check", "Distancia verdadera", "¿Por qué en la vista de punta se ve la distancia de P a la recta en verdadera magnitud?",
      "Porque el segmento perpendicular a la recta es paralelo al plano de proyección",
      [["Porque la recta es horizontal", "No lo es."], ["Porque se conserva la cota", "No es la razón."], ["Porque P está sobre la recta", "No lo está."]],
      "Al ser el plano perpendicular a la recta, el segmento perpendicular a ella queda paralelo al plano.",
    ),
  ],
};
