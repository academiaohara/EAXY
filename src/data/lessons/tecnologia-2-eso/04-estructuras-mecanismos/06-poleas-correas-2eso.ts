import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poleasCorreas2esoLesson: InteractiveLesson = {
  slug: "poleas-correas-2eso",
  title: "6. Poleas con correa y ruedas de fricción",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Transmisión por correa", [
      { kind: "text", text: "Una correa une dos poleas alejadas y transmite el giro. Abierta mantiene el sentido; cruzada lo invierte." },
    ], anim("correa-abierta-cruzada"), "text-top"),
    slide("rel", "Relación entre diámetros", [
      { kind: "rule", title: "Poleas con correa", text: "Como la correa recorre la misma longitud en las dos poleas, el producto del diámetro por la velocidad se conserva.", formula: "n₁ · d₁ = n₂ · d₂" },
      { kind: "steps", items: [
        "La polea **pequeña** gira **más deprisa**.",
        "La relación de transmisión es **i = d₂ / d₁**.",
        "Se usan **correas planas, trapezoidales o dentadas** (estas últimas no resbalan).",
        "**Ruedas de fricción**: dos ruedas en contacto que transmiten el giro por rozamiento; giran en sentidos contrarios y pueden resbalar.",
      ] },
    ], undefined, "stack"),
    slide("prueba", "Prueba tus poleas", [
      { kind: "text", text: "Cambia los diámetros, la distancia entre ejes y el tipo de correa." },
    ], tool("eso2-poleas-correas-explorador"), "visual-top"),
    calc("calc-n2", "Velocidad de la polea conducida", "Un motor de 1 200 rpm lleva una polea de 40 mm que mueve otra de 120 mm. ¿A cuántas rpm gira la conducida?", nums(400), "n₂ = n₁ · d₁ / d₂ = 1 200 · 40 / 120 = 400 rpm.", "n₁ · d₁ = n₂ · d₂."),
    calc("calc-d2", "Diseña la polea", "Un motor de 1 500 rpm con polea de 40 mm debe mover un eje a 600 rpm. ¿Qué diámetro, en mm, debe tener la polea conducida?", nums(100), "d₂ = n₁ · d₁ / n₂ = 1 500 · 40 / 600 = 100 mm.", "Despeja d₂ de n₁ · d₁ = n₂ · d₂."),
    sort("clasifica-correa", "¿Qué tipo de transmisión es?", "Relaciona cada característica.",
      [["ab", "Correa abierta", "cobalt"], ["cr", "Correa cruzada", "amber"], ["fr", "Ruedas de fricción", "violet"]],
      [["Las dos poleas giran en el mismo sentido", "ab"], ["Es la más sencilla", "ab"], ["Invierte el sentido de giro", "cr"], ["Los tramos de correa se cruzan", "cr"], ["No hay correa: se tocan las ruedas", "fr"], ["Puede resbalar si hay mucha carga", "fr"]],
      "La correa abierta conserva el sentido, la cruzada lo invierte y las ruedas de fricción giran en sentidos contrarios por contacto directo.",
    ),
    pick("check-resbala", "Una correa que patina", "Una correa plana patina cuando el motor arranca con carga. ¿Qué solución es más adecuada?",
      "Una correa dentada, que engrana con la polea y no resbala",
      [["Poner una polea más pequeña", "No resuelve el deslizamiento."], ["Engrasar la correa", "Resbalaría aún más."], ["Quitar la correa", "Se dejaría de transmitir el movimiento."]],
      "Las correas dentadas engranan con poleas dentadas y mantienen la relación de velocidades exacta.",
    ),
  ],
};
