import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoDiedricoCuadrantesDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-dt1",
  title: "1. Fundamentos, notación y representación del punto I",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("fundamentos", "Fundamentos del sistema diédrico", [], diagrama("d12-fundamentos"), "visual-top"),
    slide("diedros", "Los cuatro diedros", [], diagrama("d12-diedros"), "visual-top"),
    slide("punto-reversible", "Un punto tiene dos proyecciones", [], diagrama("d12-reversible"), "visual-top"),
    slide("abatimiento", "El abatimiento del plano vertical", [
      { kind: "text", text: "Para dibujar sobre el papel se **abate** el plano $V$ alrededor de la L.T. hasta hacerlo coincidir con el $H$, girando en el sentido **contrario a las agujas del reloj**. El semiplano vertical superior coincide con el horizontal posterior, y el vertical inferior con el horizontal anterior." },
      { kind: "rule", title: "Propiedad fundamental", text: "Tras el abatimiento, $A'$ y $A''$ quedan en la **misma perpendicular a la L.T.**: la **línea de referencia**. Dos proyecciones que no estén en una misma perpendicular no pueden ser las de un punto del espacio." },
    ], anim("dt1-abatimiento-diedrico"), "visual-top"),
    slide("notacion", "Notación", [], diagrama("d12-notacion"), "visual-top"),
    slide("cota-alejamiento", "Cota y alejamiento", [], diagrama("d12-cota-alej"), "visual-top"),
  ],
};
