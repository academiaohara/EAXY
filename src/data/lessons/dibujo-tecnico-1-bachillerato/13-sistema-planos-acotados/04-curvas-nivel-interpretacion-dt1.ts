import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { anim, slide } from "@/data/lessons/tec1-helpers";

export const curvasNivelInterpretacionDt1Lesson: InteractiveLesson = {
  slug: "curvas-nivel-interpretacion-dt1",
  title: "4. Superficies topográficas, perfiles y dibujo topográfico",
  subtitle: DT1_SUBTITLES[13],
  stage: { theme: "board" },
  steps: [
    slide("topografica", "Superficies topográficas", [
      { kind: "text", text: "La aplicación más importante del sistema es la representación de la **superficie de la Tierra**. Como no es una superficie geométrica, se sustituye por otra convencional: la **superficie topográfica**, que se representa con las proyecciones acotadas de las **secciones horizontales** producidas por planos horizontales que la cortan." },
      { kind: "steps", items: [
        "El contorno de cada sección es una **curva de nivel**. La separación fija entre planos es la **equidistancia**. Todos los puntos de una curva tienen la misma cota.",
        "La superficie se aproxima más a la terrestre cuanto **más pequeña** es la equidistancia.",
        "Si la cota de las curvas **aumenta hacia dentro**, es un monte o colina; si **aumenta hacia afuera**, un valle o hondonada.",
        "Si el terreno tiene poca pendiente se intercalan **curvas intercalares**, dibujadas a trazos.",
        "La intersección de la superficie con un plano se halla con los puntos de encuentro de cada curva con la horizontal del plano de la misma cota. Si el plano es vertical, la sección se llama **perfil**.",
      ] },
    ], anim("dt1-curvas-nivel"), "visual-top"),
    slide("perfiles", "Perfiles", [
      { kind: "text", text: "Para construir el **perfil** que produce en el terreno un plano vertical, se trazan perpendiculares a la traza del plano en los puntos en que corta a las curvas de nivel, y sobre ellas se llevan las **cotas** de cada curva. Uniendo los puntos se obtiene el perfil abatido aproximado. Para medir las cotas se suelen emplear **escalas más pequeñas** que las del dibujo, para resaltar las diferencias." },
    ], undefined, "stack"),
    ...construccionPasos("acotados-perfil"),
    slide("desmonte", "Desmonte y terraplén de un camino", [
      { kind: "text", text: "**Problema:** determinar el desmonte y el terraplén entre dos puntos $A$ y $B$ en la dirección del eje de un camino de pendiente uniforme. Se abate la sección que produce en el terreno el plano vertical por $AB$, tomando las alturas respectivas. La parte comprendida entre $B$ y $N$ es **desmonte** y la comprendida entre $N$ y $A$ es **terraplén**. La tangente del ángulo $B'AB$ es la pendiente del camino." },
    ], undefined, "stack"),
    ...construccionPasos("acotados-perfil-camino"),
    ...construccionPasos("acotados-explanacion"),
    slide("explanacion", "Explanación de una superficie topográfica", [
      { kind: "text", text: "La forma de la explanación es la de un rectángulo rematado por un semicírculo. Se toman las l.m.p. de los planos inclinados y del tronco de cono cuya base menor es el citado semicírculo, y se hallan los puntos de intersección de las horizontales de plano con las curvas de nivel de igual cota. El perfil transversal se obtiene tomando sobre el eje $\\alpha_0$ los puntos $C, B, A, N, M, L$, trazando perpendiculares y llevando las cotas." },
    ], undefined, "stack"),
    slide("dibujo-topografico", "Dibujo topográfico", [
      { kind: "text", text: "El dibujo topográfico representa, mediante **curvas de nivel acotadas**, una parte de la superficie terrestre y, con ayuda de **símbolos**, indica los accidentes naturales del terreno y las obras artificiales hechas por el hombre. Quienes confeccionan estos planos deben conocer los símbolos y los métodos propios de ellos." },
    ], anim("dt1-simbolos-topograficos"), "visual-top"),
  ],
};
