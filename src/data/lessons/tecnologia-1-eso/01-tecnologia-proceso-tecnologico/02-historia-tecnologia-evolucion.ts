import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const historiaTecnologiaEvolucionLesson: InteractiveLesson = {
  slug: "historia-tecnologia-evolucion",
  title: "2. Evolución histórica de la tecnología",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("idea", "Cada época resolvió sus problemas", [
      { kind: "definition", text: "La historia de la tecnología es la historia de **cómo las personas han ido resolviendo sus necesidades** con los recursos y conocimientos de cada época." },
      { kind: "text", text: "Los inventos no aparecen de golpe: cada uno se apoya en los anteriores. La rueda dio lugar al carro; el carro, al ferrocarril; el ferrocarril, al tren de alta velocidad." },
    ], undefined, "stack"),
    slide("linea", "Recorre las épocas", [
      { kind: "text", text: "Desliza por las siete etapas y observa **qué inventos** aparecen y **qué cambia** en la vida de las personas." },
    ], tool("linea-tiempo-explorador", { n: 0 }), "visual-top"),
    slide("hitos", "Tres grandes saltos", [
      { kind: "steps", items: [
        "**Neolítico**: la agricultura y la ganadería permiten vivir en un lugar fijo.",
        "**Revolución Industrial**: las máquinas de vapor y las fábricas multiplican la producción.",
        "**Era digital**: los ordenadores e internet hacen que la información viaje al instante.",
      ] },
      { kind: "text", text: "Cada salto cambió el trabajo, las ciudades y la forma de vivir. El siguiente ya está en marcha: la automatización y la inteligencia artificial." },
    ]),
    sort("clasifica-epoca", "¿De qué época es?", "Coloca cada invento en la etapa en la que apareció.",
      [["pre", "Prehistoria y Antigüedad", "amber"], ["ind", "Revolución Industrial", "cobalt"], ["dig", "Era digital", "emerald"]],
      [["Rueda", "pre"], ["Control del fuego", "pre"], ["Escritura", "pre"], ["Máquina de vapor", "ind"], ["Ferrocarril", "ind"], ["Telar mecánico", "ind"], ["Internet", "dig"], ["Teléfono móvil", "dig"], ["Impresión 3D", "dig"]],
      "Fuego, rueda y escritura son muy antiguos; vapor, ferrocarril y telar mecánico son del XVIII–XIX; internet, móvil e impresión 3D son recientes.",
    ),
    pick("check-vapor", "El cambio de la máquina de vapor", "¿Qué cambió principalmente con la máquina de vapor en el siglo XVIII?",
      "Las fábricas pudieron producir mucho más porque las máquinas no dependían de la fuerza humana o animal",
      [["Desaparecieron los artesanos al instante", "Los oficios cambiaron poco a poco, no de un día para otro."], ["Se inventó la escritura", "La escritura es de hace más de 5000 años."], ["Las personas dejaron de necesitar energía", "Al contrario: se empezó a consumir mucho carbón como fuente de energía."]],
      "El vapor aportó una fuente de energía potente y constante que impulsó fábricas, minas y ferrocarriles.",
    ),
    pick("check-evolucion", "Inventos que se apoyan en otros", "¿Qué frase refleja mejor cómo evoluciona la tecnología?",
      "Los inventos se construyen sobre conocimientos y objetos anteriores",
      [["Cada invento aparece de la nada, sin relación con otros", "Casi todos los inventos mejoran algo previo."], ["Solo los científicos crean tecnología", "También artesanos, obreros y usuarios han mejorado herramientas durante siglos."], ["La tecnología deja de cambiar cuando se inventa algo útil", "Todo objeto se sigue mejorando: la bicicleta actual no se parece a la de 1860."]],
      "La tecnología es acumulativa: lo nuevo se apoya en lo anterior y se mejora de forma continua.",
    ),
  ],
};
