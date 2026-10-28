import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tangentesPropiedadReflexivaDt2Lesson: InteractiveLesson = {
  slug: "tangentes-propiedad-reflexiva-dt2",
  title: "5. Tangentes a las cónicas y propiedad reflexiva",
  subtitle: DT2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "La tangente en un punto", [
      { kind: "steps", items: [
        "La **tangente** a una cónica en un punto P toca la curva solo en P y deja la curva a un lado.",
        "En la **elipse** es la **bisectriz exterior** del ángulo que forman los radios focales PF y PF′.",
        "En la **hipérbola** es la **bisectriz interior** de ese ángulo.",
        "En la **parábola** es la bisectriz del ángulo formado por el radio focal y la **perpendicular a la directriz** por P.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ángulos iguales", [
      { kind: "text", text: "Elige una cónica y mueve el punto de tangencia. La recta forma siempre ángulos iguales con los dos radios." },
    ], tool("dt2-tangentes-conicas-explorador"), "visual-top"),
    slide("reflexiva", "Propiedad reflexiva", [
      { kind: "steps", items: [
        "Un rayo que sale de un **foco** de una **elipse** se refleja en la curva y pasa por el **otro foco**.",
        "En una **hipérbola**, un rayo dirigido a un foco se refleja hacia el otro.",
        "En una **parábola**, un rayo que sale del foco se refleja **paralelo al eje**, y al revés.",
        "Aplicaciones: **antenas**, **espejos de telescopio**, **reflectores** de focos y las **galerías de susurros**.",
      ] },
    ]),
    slide("trazado", "Cómo se traza", [
      { kind: "steps", items: [
        "**Elipse**: se une P con los dos focos y se traza la **bisectriz exterior** del ángulo FPF′.",
        "**Hipérbola**: se traza la **bisectriz interior** de FPF′.",
        "**Parábola**: se une P con el foco y se traza la **mediatriz** de FQ, siendo Q la proyección de P sobre la directriz (la mediatriz pasa por P y es la tangente).",
        "Para trazar tangentes **desde un punto exterior** se usan las **circunferencias focales**: de centro un foco y radio 2a.",
      ] },
    ]),
    calc("calc-ang", "Ángulos iguales", "La tangente a una elipse en un punto P forma 35° con el radio focal PF. ¿Qué ángulo agudo forma con PF′, en grados?", nums(35), "Forma ángulos iguales con los dos radios focales: 35°.", "Es la propiedad reflexiva."),
    calc("calc-bis", "Ángulo entre radios", "En una hipérbola, el ángulo FPF′ vale 70°. La tangente es su bisectriz interior. ¿Qué ángulo forma con cada radio, en grados?", nums(35), "La bisectriz divide el ángulo en dos partes iguales: 35°.", "Divide 70 entre 2."),
    sort("clasifica", "¿Qué bisectriz?", "Asocia cada cónica con la tangente en un punto.",
      [["ext", "Bisectriz exterior de FPF′", "cobalt"], ["int", "Bisectriz interior de FPF′", "amber"], ["par", "Bisectriz del radio focal y la perpendicular a la directriz", "emerald"]],
      [["Elipse", "ext"], ["Hipérbola", "int"], ["Parábola", "par"], ["La tangente separa los radios hacia fuera", "ext"], ["La tangente pasa entre los dos radios focales", "int"], ["Uno de los lados es perpendicular a la directriz", "par"]],
      "Elipse: exterior; hipérbola: interior; parábola: con la perpendicular a la directriz.",
    ),
    pick("check", "Antena parabólica", "¿Por qué una antena parabólica concentra la señal en un punto?",
      "Los rayos paralelos al eje se reflejan hacia el foco",
      [["Porque la parábola tiene dos focos", "Tiene uno solo."], ["Porque todos los puntos están a la misma distancia del vértice", "Eso sería una circunferencia."], ["Porque la tangente es siempre perpendicular al eje", "No lo es."]],
      "Por la propiedad reflexiva, todo rayo paralelo al eje pasa por el foco tras reflejarse.",
    ),
  ],
};
