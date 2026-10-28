import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cambiosPlanoDt2Lesson: InteractiveLesson = {
  slug: "cambios-plano-dt2",
  title: "4. Cambios de plano",
  subtitle: DT2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cambiar el punto de vista", [
      { kind: "steps", items: [
        "En un **cambio de plano** el objeto **no se mueve**: se sustituye uno de los planos de proyección por otro, perpendicular al que se conserva.",
        "Cambio de **plano vertical**: el PH se mantiene; la nueva **LT′** es una recta cualquiera del PH. La **cota** de cada punto se conserva.",
        "Cambio de **plano horizontal**: el PV se mantiene; se conserva el **alejamiento** de cada punto.",
        "La nueva proyección está sobre la **perpendicular a la nueva LT** que pasa por la antigua proyección que se conserva.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Nueva línea de tierra", [
      { kind: "text", text: "Gira la nueva LT′ y mueve el punto. Mira qué conserva la nueva proyección y qué cambia." },
    ], tool("dt2-cambio-plano-explorador"), "visual-top"),
    slide("uso", "Para qué sirve", [
      { kind: "steps", items: [
        "Una **recta** se ve en **verdadera magnitud** si se elige un plano paralelo a ella: LT′ paralela a su proyección horizontal.",
        "Un **plano** se proyecta como **una recta** (de canto) si el nuevo plano es perpendicular a él: LT′ perpendicular a una **horizontal** del plano.",
        "Un segundo cambio puede **ver la recta de punta** (como un punto) o el plano **en verdadera forma**.",
        "Estos cambios sustituyen a los abatimientos y giros cuando la figura es compleja.",
      ] },
    ]),
    calc("calc-cota", "La cota se conserva", "Un punto tiene cota 3 cm. Se cambia el plano vertical. ¿Cuál es su cota en el nuevo plano, en cm?", nums(3), "En un cambio de plano vertical, la cota no varía.", "Es la distancia al PH."),
    calc("calc-x", "Posición sobre LT′", "Un punto está en P′ = (2, 3) y la nueva LT′ forma 90° con la LT (pasa por el origen). Su posición x′ = x·cos ψ + e·sen ψ vale, en cm:", nums(3), "x′ = 2·0 + 3·1 = 3 cm.", "cos 90° = 0 y sen 90° = 1."),
    sort("clasifica", "Plano que se conserva", "Asocia cada cambio de plano con lo que se conserva.",
      [["v", "Cambio de plano vertical", "cobalt"], ["h", "Cambio de plano horizontal", "amber"]],
      [["Se conserva el PH", "v"], ["Se conserva la cota", "v"], ["La nueva LT′ está en el PH", "v"], ["Se conserva el PV", "h"], ["Se conserva el alejamiento", "h"], ["La nueva LT′ está en el PV", "h"]],
      "Cambiar el vertical conserva cota; cambiar el horizontal conserva alejamiento.",
    ),
    pick("check", "Recta en verdadera magnitud", "¿Cómo debe ser la nueva LT′ para ver una recta en verdadera magnitud?",
      "Paralela a la proyección de la recta en el plano que se conserva",
      [["Perpendicular a esa proyección", "Así se vería de punta, no en verdadera magnitud."], ["Paralela a la LT", "No tiene por qué."], ["Cualquiera", "Depende de la dirección."]],
      "Un plano paralelo a la recta la proyecta en verdadera magnitud.",
    ),
  ],
};
