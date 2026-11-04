import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, slide, diagrama } from "@/data/lessons/tec1-helpers";

export const fundamentosProyeccionesDiedricoIIDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-proyecciones-diedrico-ii-dt1",
  title: "2. Geometría descriptiva y sistemas de representación II",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("sistemas", "Los cinco sistemas de representación", [], diagrama("d11-sistemas"), "visual-top"),
    slide("diedrico", "Sistema diédrico: dibujos de taller", [
      { kind: "text", text: "Utiliza la proyección cilíndrica ortogonal sobre **dos planos perpendiculares**. Sus representaciones son los **dibujos de taller** o planos industriales." },
      { kind: "warning", title: "Su inconveniente", text: "Las caras perpendiculares a los planos de proyección se proyectan según una **recta** y no se aprecia su forma: las proyecciones de un cubo (planta y alzado) no bastan para afirmar que el cuerpo es un cubo. La indeterminación se resuelve con un tercer plano perpendicular: el **perfil**." },
    ], anim("dt1-vistas-pieza"), "visual-top"),
    slide("acotados", "Sistema de planos acotados", [], diagrama("d11-acotados"), "visual-top"),
    slide("axonometrico", "Sistemas axonométrico y de perspectiva caballera", [
      { kind: "text", text: "El **axonométrico** proyecta ortogonalmente el cuerpo sobre un triedro trirrectángulo y, a su vez, el cuerpo y las tres proyecciones sobre un plano que no es uno del triedro. Según la inclinación de los ejes, es **isométrico**, **dimétrico** o **trimétrico**; en la práctica se usa el isométrico por ser el más rápido." },
      { kind: "text", text: "La **perspectiva caballera** es el único que emplea la proyección cilíndrica **oblicua**. Todo lo paralelo al plano del dibujo aparece **sin deformarse**; las aristas en profundidad se reducen según un coeficiente de reducción. Por eso se llama también **perspectiva rápida**." },
    ], anim("dt1-cubo-isometrico"), "visual-top"),
    slide("conico", "Sistema de perspectiva cónica", [
      { kind: "text", text: "Utiliza la proyección central: se proyecta un cuerpo sobre un plano, el **cuadro**, desde un punto de vista que hace de ojo. Son las perspectivas **más reales**, las que vería un ser humano con visión monocular." },
      { kind: "text", text: "Las rectas paralelas en el espacio que no lo son al cuadro **convergen** o «fugan» en un **punto de fuga** $P$ común a todas las paralelas entre sí." },
    ], anim("dt1-perspectiva-frontal"), "visual-top"),
  ],
};
