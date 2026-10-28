import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const homologiaEjeCentroDt2Lesson: InteractiveLesson = {
  slug: "homologia-eje-centro-dt2",
  title: "4. Homología: eje, centro y rectas límite",
  subtitle: DT2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "La perspectiva de una figura plana", [
      { kind: "steps", items: [
        "La **homología** es la transformación que relaciona dos figuras planas obtenidas al **proyectar** desde un punto: la figura y su **perspectiva** (sombra, imagen en el cuadro).",
        "Elementos: el **eje** (de **puntos dobles**), el **centro O** (punto doble desde el que se proyecta) y la **razón** o un par de puntos homólogos.",
        "**Puntos homólogos**: están **alineados con O**. **Rectas homólogas**: se cortan en el **eje**.",
        "Las **rectas límite** son: la de la figura, que se transforma en la **recta del infinito**; y la de la imagen, que es la transformada del **infinito**. Son **paralelas al eje**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una homología en acción", [
      { kind: "text", text: "Cambia el parámetro y el centro. Mira las rectas límite y qué le pasa a la figura al acercarse a la suya." },
    ], tool("dt2-homologia-explorador"), "visual-top"),
    slide("constr", "Construir la figura homóloga", [
      { kind: "text", text: "Sigue paso a paso cómo se halla la figura homóloga con el eje, el centro y un par de puntos homólogos." },
    ], anim("dt2-homologia-construccion"), "visual-top"),
    slide("casos", "Casos particulares", [
      { kind: "steps", items: [
        "**Afinidad**: el **centro** está en el **infinito** (los rayos son paralelos a una dirección).",
        "**Homotecia**: el **eje** está en el **infinito** (todos los puntos están alineados con el centro y sus razones son constantes).",
        "**Traslación**: homología de eje y centro **impropios** (en el infinito).",
        "**Homología armónica**: su razón doble es −1, así que aplicada dos veces da la identidad (es **involutiva**): cada punto y su homólogo son **conjugados armónicos** respecto del centro y del eje.",
      ] },
    ]),
    calc("calc-y", "Un homólogo", "Homología de eje y = 0, centro O(0, 5) y μ = 0,2. El homólogo de P(2, 2) tiene y′ = y·(1 + μ·Oy)/(1 + μ·y). ¿Cuánto vale y′? (dos decimales)", nums(2.86, 2.857), "2 · 2 / 1,4 ≈ 2,86.", "1 + 0,2·5 = 2; 1 + 0,2·2 = 1,4."),
    calc("calc-rl", "Recta límite", "La recta límite de la figura es y = −1/μ. Con μ = 0,2, ¿cuánto vale y?", nums(-5), "−1/0,2 = −5.", "Inverso con signo."),
    calc("calc-rli", "Recta límite de la imagen", "La recta límite de la imagen es y = (1 + μ·Oy)/μ. Con μ = 0,2 y Oy = 5, ¿cuánto vale y?", nums(10), "(1 + 1)/0,2 = 10.", "Divide entre μ."),
    sort("clasifica-hom", "¿Qué es?", "Asocia cada elemento con su definición.",
      [["eje", "Eje", "cobalt"], ["cen", "Centro", "amber"], ["lim", "Recta límite", "emerald"]],
      [["Sus puntos son todos dobles", "eje"], ["Las rectas homólogas se cortan en él", "eje"], ["Los homólogos están alineados con él", "cen"], ["Punto doble desde el que se proyecta", "cen"], ["Su homóloga es la recta del infinito", "lim"], ["Es paralela al eje", "lim"]],
      "El eje corta las rectas; el centro alinea los puntos; las rectas límite llevan al infinito.",
    ),
    pick("check-afin", "Centro en el infinito", "Si el centro de una homología se aleja al infinito, ¿en qué transformación se convierte?",
      "En una afinidad",
      [["En una homotecia", "Esa tiene el eje en el infinito."], ["En una simetría central", "No es el caso."], ["Deja de ser transformación", "Se convierte en afinidad."]],
      "Los rayos desde un centro impropio son paralelos a una dirección: la dirección de afinidad.",
    ),
  ],
};
