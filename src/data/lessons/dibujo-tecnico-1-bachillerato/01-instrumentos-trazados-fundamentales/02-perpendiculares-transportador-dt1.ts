import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchTask } from "@/data/lessons/tec1-helpers";

export const perpendicularesTransportadorDt1Lesson: InteractiveLesson = {
  slug: "perpendiculares-transportador-dt1",
  title: "2. Perpendiculares y ángulos con transportador",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    benchTask("perpendicular", "Perpendicular por un punto con escuadra y cartabón", "perpendicular-escuadra-cartabon", [
      { title: "Apoya el cartabón sobre r", text: "Dada la recta $r$ y el punto $P$, coloca el **cartabón** con su cateto largo sobre $r$ y **sujétalo**: hará de guía." },
      { title: "Apoya la escuadra contra el cartabón", text: "Pon un cateto de la **escuadra** contra el cartabón. El **otro cateto** forma $90^\\circ$ con $r$: ese será tu filo perpendicular." },
      { title: "Traza la perpendicular por P", text: "**Arrastra la escuadra** a lo largo de $r$ hasta que su cateto vertical pase por $P$.", fact: "La escuadra se desliza, no gira: su ángulo recto no cambia" },
    ], {
      question: "Traza por P la perpendicular a r deslizando la escuadra a lo largo de r.",
      hint: "Desliza la escuadra hasta que el cateto vertical pase por P.",
      explanation: "Al deslizar sin girar, el ángulo recto mantiene la dirección de sus lados: uno sigue sobre r y el otro es perpendicular a r.",
      params: { a: 8, b: 80 },
    }),

    benchTask("transportador", "Medir y dibujar ángulos con el transportador", "transportador-medir", [
      { title: "Centra y alinea", text: "Coloca el **centro** del transportador sobre el vértice $V$ y el **0°** sobre uno de los lados. Si no coincide, el ángulo saldrá mal.", fact: "Centro en V; 0° sobre el lado" },
      { title: "Lee en la escala correcta", text: "Hay **dos escalas**: una parte de 0 por la derecha y otra por la izquierda. Lee la que **empieza en 0 sobre tu lado**. Arrastra el segundo lado y mira cómo cambia la lectura.", fact: "Escala exterior: 0° a la derecha; interior: 0° a la izquierda" },
      { title: "Dibuja un ángulo de 130°", text: "Ahora al revés: arrastra el segundo lado hasta marcar un ángulo de **130°**. En papel, marcarías ese punto y lo unirías con $V$." },
    ], {
      question: "Dibuja un ángulo de 130° con el transportador.",
      hint: "Usa la escala que parte de 0 sobre el lado de partida.",
      explanation: "El ángulo se lee en la escala cuyo 0 está sobre el lado de partida; el segundo lado debe cruzar la marca de 130° de esa escala.",
      params: { a: 37, b: 130 },
    }),
  ],
};
