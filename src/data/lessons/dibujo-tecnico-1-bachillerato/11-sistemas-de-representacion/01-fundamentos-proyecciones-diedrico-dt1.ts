import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const fundamentosProyeccionesDiedricoDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-proyecciones-diedrico-dt1",
  title: "1. Fundamentos de la geometría proyectiva y sistema diédrico",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("def", "Representar el espacio en un plano", [
      { kind: "steps", items: [
        "Un objeto tiene **tres dimensiones**; el papel, dos. Los **sistemas de representación** son métodos para pasar del espacio al plano **sin perder la posibilidad de volver**.",
        "Se basan en la **proyección**: desde un **centro de proyección** salen **rayos proyectantes** que atraviesan el objeto y cortan un **plano de proyección**; las intersecciones forman la imagen.",
        "Si el centro está a **distancia finita**, la proyección es **cónica** (el sistema cónico). Si está en el **infinito**, los rayos son **paralelos**: proyección **cilíndrica**.",
        "La cilíndrica es **ortogonal** si los rayos son **perpendiculares** al plano y **oblicua** si no lo son.",
      ] },
    ], undefined, "stack"),
    slide("sistemas", "Qué sistema usa cada proyección", [
      { kind: "steps", items: [
        "**Diédrico**: proyección cilíndrica **ortogonal** sobre **dos** planos perpendiculares. Exige **dos proyecciones** para definir cada elemento.",
        "**Axonométrico**: cilíndrica sobre **un** plano, **ortogonal** (isométrica…) u **oblicua** (caballera). Muestra el objeto en una sola imagen.",
        "**Planos acotados**: cilíndrica ortogonal sobre **un** plano horizontal, con la **altura** indicada con un número (cota).",
        "**Cónico**: proyección con centro **propio**; es la que más se parece a lo que vemos.",
      ] },
    ]),
    slide("diedrico", "El sistema diédrico", [
      { kind: "text", text: "Dos planos perpendiculares, un punto y el giro que convierte el espacio en un dibujo." },
    ], anim("dt1-abatimiento-diedrico"), "visual-top"),
    slide("cuadrantes", "Planos, línea de tierra y cuadrantes", [
      { kind: "steps", items: [
        "El **plano vertical (PV)** y el **plano horizontal (PH)** son perpendiculares y se cortan en la **línea de tierra (LT)**.",
        "Dividen el espacio en **cuatro diedros** o **cuadrantes**. El **1.º** es el que queda **delante del PV y sobre el PH**.",
        "Se **abate** el PH girándolo **90°** hasta que coincide con el PV: el semiplano horizontal **anterior** queda **bajo** la LT.",
        "La **épura** es el dibujo de las proyecciones sobre un único plano. Todo punto está en su **línea de referencia**, perpendicular a la LT.",
      ] },
    ]),
    calc("calc-cuad", "Cuadrantes", "Los planos vertical y horizontal dividen el espacio en cuántos cuadrantes?", nums(4), "Cuatro diedros: del 1.º al 4.º.", "Dos planos que se cortan dan cuatro regiones."),
    calc("calc-giro", "Abatimiento", "¿Cuántos grados se gira el PH para abatirlo sobre el PV?", nums(90), "Los planos son perpendiculares: se gira 90°.", "Es un ángulo recto."),
    sort("clasifica-sistema", "¿Qué sistema es?", "Relaciona cada característica con el sistema de representación.",
      [["die", "Diédrico", "cobalt"], ["axo", "Axonométrico", "amber"], ["aco", "Planos acotados", "emerald"], ["con", "Cónico", "rose"]],
      [["Dos planos perpendiculares y dos proyecciones", "die"], ["Línea de tierra y abatimiento", "die"], ["Ejes con coeficientes de reducción", "axo"], ["Perspectiva isométrica y caballera", "axo"], ["Alturas indicadas con números sobre un plano", "aco"], ["Mapas con curvas de nivel", "aco"], ["Centro de proyección a distancia finita", "con"], ["Líneas que convergen en puntos de fuga", "con"]],
      "Cada sistema se distingue por su centro de proyección, sus planos y su forma de informar de la altura.",
    ),
    pick("check-dos", "Dos proyecciones", "¿Por qué en el sistema diédrico hacen falta dos proyecciones para definir un punto?",
      "Porque una sola proyección ortogonal no determina la distancia del punto al plano de proyección",
      [["Porque los planos son dos y hay que usarlos", "La razón es geométrica, no una regla."], ["Porque la LT lo exige", "La LT solo es la intersección de los planos."], ["Porque el punto está siempre en el 1.er cuadrante", "Puede estar en cualquiera."]],
      "Todos los puntos de un mismo rayo proyectante comparten proyección; la segunda las distingue.",
    ),
  ],
};
