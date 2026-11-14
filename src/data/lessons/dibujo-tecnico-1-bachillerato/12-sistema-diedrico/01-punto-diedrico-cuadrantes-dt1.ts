import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const puntoDiedricoCuadrantesDt1Lesson: InteractiveLesson = {
  slug: "punto-diedrico-cuadrantes-dt1",
  title: "1. Fundamentos, notación y representación del punto I",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("fundamentos", "Fundamentos del sistema diédrico", [], diagrama("d12-fundamentos"), "visual-top"),
    slide("diedros", "Los cuatro diedros", [], diagrama("d12-diedros"), "visual-top"),
    slide("punto-reversible", "Un punto tiene dos proyecciones", [], diagrama("d12-reversible"), "visual-top"),
    slide("abatimiento", "El abatimiento del plano vertical", [], diagrama("d12-abatimiento")),
    slide("perfil-punto", "La tercera proyección y el plano de perfil", [], diagrama("d12-perfil-punto")),
    slide("notacion", "Notación", [], diagrama("d12-notacion"), "visual-top"),
    slide("cota-alejamiento", "Cota y alejamiento", [], diagrama("d12-cota-alej"), "visual-top"),
  ],
};
