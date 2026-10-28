import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const gruasPolipastosPotencia3esoLesson: InteractiveLesson = {
  slug: "gruas-polipastos-potencia-3eso",
  title: "6. Grúas y polipastos: fuerza y potencia",
  subtitle: TECESO3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("repaso", "Repaso: máquinas simples", [
      { kind: "text", text: "Una grúa combina máquinas simples. Recuerda cómo un polipasto reduce la fuerza a costa de recoger más cable." },
    ], tool("eso2-ventaja-mecanica-explorador", { n: 1, a: 400 }), "visual-top"),
    slide("grua", "Dimensiona una grúa", [
      { kind: "text", text: "Elige la carga, los tramos de cable y la velocidad. Calcula la fuerza en el cable y la potencia del motor." },
    ], tool("eso3-grua-explorador"), "visual-top"),
    slide("formulas", "Las fórmulas", [
      { kind: "steps", items: [
        "**Peso**: P = m · g (g ≈ 9,8 m/s²).",
        "**Fuerza en el cable** con n tramos: F = P / n.",
        "**Potencia útil**: P_útil = m · g · v. **Potencia del motor**: P_útil / η.",
        "**Tiempo** de elevación: t = h / v.",
        "**Seguridad**: se aplica un **coeficiente de seguridad** (el cable aguanta bastante más que la carga).",
      ] },
    ]),
    calc("calc-fc", "Fuerza en el cable", "Un polipasto con 2 tramos de cable eleva una masa de 200 kg. ¿Qué fuerza soporta cada tramo, en N? (g = 9,8 m/s²)", nums(980), "200 · 9,8 / 2 = 980 N.", "Peso entre el número de tramos."),
    calc("calc-pot", "Potencia del motor", "Se eleva una masa de 200 kg a 0,2 m/s con un rendimiento del 70 %. ¿Qué potencia necesita el motor, en W? (m · g · v / η)", nums(560), "200 · 9,8 · 0,2 / 0,70 = 560 W.", "Potencia útil entre el rendimiento."),
    calc("calc-cable", "Cable recogido", "Para subir una carga 10 m con 2 tramos de cable, ¿cuántos metros de cable hay que recoger?", nums(20), "10 · 2 = 20 m.", "Altura por tramos."),
    sort("clasifica-grua", "Más tramos de cable", "¿Qué ocurre al aumentar los tramos de cable?",
      [["ven", "Ventaja", "emerald"], ["inc", "Inconveniente", "rose"]],
      [["Cada tramo soporta menos fuerza", "ven"], ["Se pueden usar cables más finos", "ven"], ["Hace falta un motor de menos fuerza", "ven"], ["Hay que recoger más cable", "inc"], ["Hay más rozamiento en las poleas", "inc"], ["La carga sube más despacio con el mismo motor", "inc"]],
      "Un polipasto reduce la fuerza a costa de recorrido y de rozamiento.",
    ),
    pick("check-pot", "Subir antes", "Quieres subir la misma carga en la mitad de tiempo. ¿Qué necesitas?",
      "Aproximadamente el doble de potencia",
      [["La misma potencia", "La potencia es trabajo por segundo."], ["La mitad de potencia", "Al revés."], ["Un cable más largo", "No es la causa."]],
      "Con la misma carga, doblar la velocidad doble la potencia.",
    ),
  ],
};
