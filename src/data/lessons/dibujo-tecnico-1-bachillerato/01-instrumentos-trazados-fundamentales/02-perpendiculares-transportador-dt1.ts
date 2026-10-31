import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const perpendicularesTransportadorDt1Lesson: InteractiveLesson = {
  slug: "perpendiculares-transportador-dt1",
  title: "2. Perpendiculares y ángulos con transportador",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("perpendicular", "Perpendicular por un punto con escuadra y cartabón", [], bench("perpendicular-escuadra-cartabon", [
      { title: "Apoya el cartabón sobre r", text: "Dada la recta $r$ y el punto $P$, coloca el **cartabón** con su cateto largo sobre $r$ y **sujétalo**: hará de guía." },
      { title: "Apoya la escuadra contra el cartabón", text: "Pon un cateto de la **escuadra** contra el cartabón. El **otro cateto** forma $90^\\circ$ con $r$: ese será tu filo perpendicular." },
      { title: "Desliza hasta P y traza", text: "**Arrastra la escuadra** a lo largo de $r$ hasta que su cateto vertical pase por $P$. Después traza por ese cateto.", fact: "La escuadra se desliza, no gira: su ángulo recto no cambia" },
    ], { a: 8, b: 80 }), "stack"),

    pick("check-perp", "Por qué sale perpendicular", "¿Por qué el cateto vertical de la escuadra traza siempre una perpendicular a r?",
      "Porque su ángulo recto no cambia: un cateto sigue sobre r (guiado por el cartabón) y el otro forma 90° con él",
      [["Porque el cartabón también tiene un ángulo recto", "El cartabón solo hace de guía: lo que importa es el ángulo recto de la escuadra, que viaja con ella."], ["Porque la escuadra gira 90° al llegar a P", "La escuadra no gira en ningún momento; solo se desplaza a lo largo de r."], ["Porque P está sobre la escuadra", "Que pase por P decide dónde se traza, no que sea perpendicular."]],
      "Al deslizar sin girar, el ángulo recto mantiene la dirección de sus lados: uno sigue paralelo a r y el otro, perpendicular.",
    ),

    calc("calc-perp", "Ángulo entre dos rectas", "Por P trazas la perpendicular a r y, además, otra recta que forma 30° con r. ¿Qué ángulo agudo forman entre sí esas dos rectas, en grados?",
      nums(60),
      "La perpendicular forma 90° con r y la otra, 30°: la diferencia es 90° − 30° = 60°.",
      "Las dos rectas parten de la misma dirección, r.",
    ),

    slide("transportador", "Medir y dibujar ángulos con el transportador", [], bench("transportador-medir", [
      { title: "Centra y alinea", text: "Coloca el **centro** del transportador sobre el vértice $V$ y el **0°** sobre uno de los lados. Si no coincide, el ángulo saldrá mal.", fact: "Centro en V · 0° sobre el lado" },
      { title: "Lee en la escala correcta", text: "Hay **dos escalas**: una parte de 0 por la derecha y otra por la izquierda. Lee la que **empieza en 0 sobre tu lado**. Arrastra el segundo lado y mira cómo cambia la lectura.", fact: "Escala exterior: 0° a la derecha · interior: 0° a la izquierda" },
      { title: "Dibuja un ángulo dado", text: "Ahora al revés: arrastra el segundo lado hasta que la lectura marque **130°**. En papel, marcarías ese punto sobre la hoja y lo unirías con $V$." },
    ], { a: 37, b: 130 }), "stack"),

    pick("check-escala", "Qué escala leo", "Pones el 0 de la escala exterior sobre un lado del ángulo y el otro lado cruza el 40 de esa escala y el 140 de la interior. Se ve claramente que el ángulo es agudo. ¿Cuánto mide?",
      "40°: se lee la escala que parte de 0 sobre el lado",
      [["140°", "Es la lectura de la otra escala, que parte de 0 en el otro lado; un ángulo agudo no puede medir 140°."], ["90°", "El 90° está en el centro de la escala; ninguna de las dos lecturas indica ese valor."]],
      "Siempre se lee la escala cuyo 0 está sobre el lado de partida. Y un ángulo agudo (menor de 90°) sirve de comprobación.",
    ),

    sort("clasifica-angulos", "Escuadra y cartabón o transportador", "Reparte los ángulos según cómo conviene trazarlos.",
      [["eyc", "Escuadra y cartabón (múltiplo de 15°)", "cobalt"], ["transp", "Transportador (otro valor)", "emerald"]],
      [["15°", "eyc"], ["60°", "eyc"], ["75°", "eyc"], ["105°", "eyc"], ["135°", "eyc"], ["37°", "transp"], ["52°", "transp"], ["128°", "transp"], ["170°", "transp"]],
      "Escuadra y cartabón dan los múltiplos de 15° (con restas y sumas). Cualquier otro valor se mide o se dibuja con el transportador.",
    ),

    slide("transferencia", "Otra recta, otro punto", [], bench("perpendicular-escuadra-cartabon", [
      { title: "Cartabón sobre r", text: "Ahora $r$ está inclinada hacia el otro lado y $P$ queda más arriba. Apoya el cartabón sobre $r$ como antes." },
      { title: "La escuadra, contra el cartabón", text: "Se apoya igual. Lo único distinto es **cuánto** tendrás que deslizarla hasta $P$." },
      { title: "Desliza y traza", text: "Arrastra la escuadra hasta que su cateto vertical pase por $P$ y traza.", fact: "Con escuadra y cartabón se trazan perpendiculares a cualquier recta" },
    ], { a: -8, b: 105 }), "stack"),
  ],
};
