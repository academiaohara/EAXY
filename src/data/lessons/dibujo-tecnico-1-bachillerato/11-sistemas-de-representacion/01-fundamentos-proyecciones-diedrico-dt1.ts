import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide, diagrama } from "@/data/lessons/tec1-helpers";

export const fundamentosProyeccionesDiedricoDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-proyecciones-diedrico-dt1",
  title: "1. Geometría descriptiva y sistemas de representación",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("descriptiva", "La geometría descriptiva", [
      { kind: "definition", text: "La **geometría descriptiva** es la parte de la geometría que tiene por objeto la **representación de cuerpos mediante proyecciones planas**. Es una ciencia de aplicación: su primer tratado científico se debe a **Monge** (1746–1818), publicado en 1798." },
      { kind: "steps", title: "Para qué sirven las proyecciones", items: [
        "La obtención de **elementos geométricos**.",
        "La determinación de **verdaderas magnitudes** de segmentos, ángulos o superficies.",
        "La determinación de **secciones planas** de cuerpos y de **líneas de intersección** de superficies.",
        "La obtención del **desarrollo** de superficies y de las **sombras** propia y arrojada de un cuerpo.",
      ] },
      { kind: "rule", title: "El problema fundamental", text: "Reducir las construcciones del espacio a construcciones en el plano." },
    ], diagrama("d11-descriptiva"), "visual-top"),
    slide("proyecciones", "Sistemas de proyección", [
      { kind: "compare",
        left: { title: "Proyección paralela o cilíndrica", text: "Los rayos proyectantes son **paralelos**. Según sean **perpendiculares** u **oblicuos** al plano de proyección, la proyección es **ortogonal** u **oblicua**." },
        right: { title: "Proyección central o cónica", text: "Los rayos parten de un **punto propio** $V$, el punto de vista u ojo del observador." } },
    ], diagrama("d11-proyecciones"), "visual-top"),
    ...construccionPasos("proyeccion-ortogonal", "proyeccion-oblicua", "proyeccion-conica"),
    slide("sistemas", "Los cinco sistemas de representación", [
      { kind: "relations", items: [
        { left: "Sistema diédrico", relation: "usa", right: "proyección paralela ortogonal" },
        { left: "Sistema de planos acotados", relation: "usa", right: "proyección paralela ortogonal" },
        { left: "Sistema axonométrico", relation: "usa", right: "proyección paralela ortogonal" },
        { left: "Perspectiva caballera", relation: "usa", right: "proyección paralela oblicua" },
        { left: "Perspectiva cónica", relation: "usa", right: "proyección central o cónica" },
      ] },
      { kind: "text", text: "El diédrico y el de planos acotados son sistemas de **representación** de piezas y del terreno; el axonométrico, la caballera y la cónica son sistemas de **perspectiva**, que muestran el cuerpo en una sola vista." },
    ], diagrama("d11-sistemas"), "visual-top"),
    slide("diedrico", "Sistema diédrico: dibujos de taller", [
      { kind: "text", text: "Utiliza la proyección cilíndrica ortogonal sobre **dos planos perpendiculares**. Sus representaciones son los **dibujos de taller** o planos industriales." },
      { kind: "warning", title: "Su inconveniente", text: "Las caras perpendiculares a los planos de proyección se proyectan según una **recta** y no se aprecia su forma: las proyecciones de un cubo (planta y alzado) no bastan para afirmar que el cuerpo es un cubo. La indeterminación se resuelve con un tercer plano perpendicular: el **perfil**." },
    ], anim("dt1-vistas-pieza"), "visual-top"),
    slide("acotados", "Sistema de planos acotados", [
      { kind: "text", text: "Usa la proyección cilíndrica ortogonal sobre un **solo plano**, indicando las **cotas** o alturas de los puntos sobre ese plano: un cubo de arista 4 cm tiene cota 3 en la cara inferior y $3 + 4 = 7$ en la superior." },
      { kind: "text", text: "Su aplicación real es la **topografía**: el terreno se supone cortado por planos paralelos acotados, que producen las **curvas de nivel**. Su forma, su separación y su graduación permiten conocer el relieve, trazar perfiles y vías de comunicación o calcular desmontes y terraplenes." },
    ], diagrama("d11-acotados"), "visual-top"),
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
