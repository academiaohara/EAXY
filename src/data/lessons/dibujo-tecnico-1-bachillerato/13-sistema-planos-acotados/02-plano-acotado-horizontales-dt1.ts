import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const planoAcotadoHorizontalesDt1Lesson: InteractiveLesson = {
  slug: "plano-acotado-horizontales-dt1",
  title: "2. Representación del plano",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("lmp", "El plano por su línea de máxima pendiente", [
      { kind: "text", text: "En el sistema de planos acotados el plano viene determinado, en general, por su **línea de máxima pendiente** (l.m.p.) con relación al plano de proyección." },
      { kind: "steps", items: [
        "La **traza** del plano con el plano $\\pi$ es $\\alpha_0$ y la l.m.p. es **perpendicular a $\\alpha_0$**.",
        "Las rectas del plano paralelas a $\\pi$ y de cota entera son las **horizontales del plano**: perpendiculares a la l.m.p. por cada punto graduado. Todos los puntos de una horizontal tienen la misma cota.",
        "Un plano también queda definido por las proyecciones acotadas de **dos horizontales** cualesquiera: la l.m.p., perpendicular a ellas, se gradúa con dos puntos acotados.",
      ] },
    ], undefined, "stack"),
    ...construccionPasos("acotados-plano-lmp"),
    slide("angulo", "Ángulo del plano con el plano del cuadro", [
      { kind: "text", text: "Para obtener el ángulo $\\alpha$ del plano con el cuadro se **abate** la l.m.p.: sobre la horizontal de cota 3 se toman tres unidades (aquí, 3 cm) y se une el punto $C_0$ con $O$. Esa recta es la l.m.p. abatida y el ángulo que forma con la traza es $\\alpha$." },
    ], undefined, "stack"),
    slide("casos", "Planos particulares", [
      { kind: "steps", items: [
        "Un plano **paralelo al horizontal** no tiene representación gráfica, pero se puede operar con él.",
        "Un plano **perpendicular al plano de proyección** se representa por su traza y una letra griega. Se llama **plano de perfil** y es el que se utiliza para obtener los perfiles longitudinales y transversales de un terreno.",
      ] },
    ], undefined, "stack"),
  ],
};
