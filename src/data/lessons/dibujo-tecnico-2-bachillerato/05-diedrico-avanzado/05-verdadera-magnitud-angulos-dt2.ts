import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const verdaderaMagnitudAngulosDt2Lesson: InteractiveLesson = {
  slug: "verdadera-magnitud-angulos-dt2",
  title: "5. Verdadera magnitud y ángulos de una recta",
  subtitle: DT2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir lo que no se ve", [
      { kind: "steps", items: [
        "Una recta oblicua se proyecta **más corta** de lo que es. Su **verdadera magnitud** se obtiene por abatimiento, giro o cambio de plano.",
        "El método más rápido es el **triángulo de abatimiento**: catetos la **proyección** y la **diferencia de la tercera coordenada**; la hipotenusa es la longitud real.",
        "El ángulo en el vértice del triángulo es el que forma la recta con el **plano de proyección** usado.",
        "Con la proyección horizontal y la diferencia de **cotas** se obtiene el ángulo con el **PH**; con la vertical y la diferencia de **alejamientos**, el ángulo con el **PV**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Triángulo de abatimiento", [
      { kind: "text", text: "Mueve el extremo B de la recta. Mira cómo cambia el triángulo y los dos ángulos." },
    ], tool("dt2-magnitud-angulos-explorador"), "visual-top"),
    slide("casos", "Casos particulares", [
      { kind: "steps", items: [
        "Recta **horizontal** (cotas iguales): la proyección horizontal ya es la longitud real y el ángulo con el PH es 0°.",
        "Recta **frontal** (alejamientos iguales): se ve en verdadera magnitud en el PV y el ángulo con el PV es 0°.",
        "Los ángulos con el PH y con el PV cumplen **sen² α + sen² β ≤ 1**, con igualdad solo en las rectas de perfil.",
      ] },
    ]),
    calc("calc-real", "Longitud real", "Una recta tiene proyección horizontal de 6 cm y diferencia de cotas de 8 cm. ¿Cuánto mide en la realidad, en cm?", nums(10), "√(36 + 64) = 10 cm.", "Es un triángulo 6-8-10."),
    calc("calc-ang", "Ángulo con el PH", "Con esos datos, ¿qué ángulo forma la recta con el PH, α = atan(8/6)? (un decimal, en grados)", nums(53.1, 53.13), "atan(1,333) ≈ 53,1°.", "tan α = diferencia de cotas / proyección."),
    sort("clasifica", "Qué se mide", "Asocia cada dato con el ángulo o la longitud que permite hallar.",
      [["ph", "Ángulo con el PH", "cobalt"], ["pv", "Ángulo con el PV", "amber"], ["rea", "Longitud real", "emerald"]],
      [["Proyección horizontal y diferencia de cotas", "ph"], ["Diferencia de cotas dividida por la longitud real", "ph"], ["Proyección vertical y diferencia de alejamientos", "pv"], ["Diferencia de alejamientos dividida por la longitud real", "pv"], ["Hipotenusa del triángulo de abatimiento", "rea"], ["Es mayor que cualquiera de las proyecciones", "rea"]],
      "Cada ángulo se obtiene con las magnitudes del plano de proyección correspondiente.",
    ),
    pick("check", "Recta horizontal", "¿Qué ángulo forma una recta horizontal con el plano horizontal?",
      "0°",
      [["90°", "Sería perpendicular al PH."], ["45°", "No es el caso."], ["Depende de su longitud", "No depende de ella."]],
      "Las cotas de todos sus puntos son iguales: es paralela al PH.",
    ),
  ],
};
