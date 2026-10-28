import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const solubilidadCristalizacionFq3Lesson: InteractiveLesson = {
  slug: "solubilidad-cristalizacion-fq3",
  title: "2. Solubilidad y cristalización",
  subtitle: FQ3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Hasta dónde se disuelve", [
      { kind: "steps", items: [
        "La **solubilidad** es la **máxima cantidad de soluto** que se disuelve en una cantidad de disolvente a una **temperatura** dada (por ejemplo, g por 100 g de agua).",
        "**Insaturada**: tiene menos soluto que el máximo; todavía admite más. **Saturada**: tiene justo el máximo. **Sobresaturada**: tiene más del máximo (es inestable y el exceso precipita).",
        "La solubilidad de la mayoría de los **sólidos aumenta con la temperatura**; la de los **gases** en agua **disminuye** (por eso un refresco caliente pierde gas).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Enfriar una disolución", [
      { kind: "text", text: "Disuelve una sal y enfría la disolución. ¿Cuánta cristaliza?" },
    ], tool("fq3-cristalizacion-explorador"), "visual-top"),
    slide("curvas", "Curvas de solubilidad", [
      { kind: "steps", items: [
        "Una **curva de solubilidad** representa la solubilidad frente a la **temperatura**.",
        "Un punto **sobre la curva** es una disolución saturada; **debajo**, insaturada; **encima**, sobresaturada.",
        "Para obtener cristales se prepara una disolución **saturada en caliente** y se **enfría**: lo que ya no cabe, **cristaliza**.",
      ] },
    ]),
    calc("calc-sat", "Cantidad que cristaliza", "A 60 °C el KNO₃ tiene solubilidad 110 g/100 g de agua y a 20 °C, 32 g/100 g. Si se enfría una disolución saturada a 60 °C que contiene 100 g de agua, ¿cuántos g cristalizan?", nums(78), "110 − 32 = 78 g.", "La diferencia de solubilidades."),
    calc("calc-masa", "Masa máxima", "Si la solubilidad de una sal es 36 g/100 g de agua, ¿cuántos gramos se disuelven como máximo en 250 g de agua?", nums(90), "36 · 2,5 = 90 g.", "250 g de agua son 2,5 veces 100 g."),
    calc("calc-gas", "Gases", "Un refresco a 5 °C retiene más CO₂ disuelto que a 25 °C. Si la solubilidad del CO₂ baja con la temperatura, ¿qué pasa al calentarlo? Escribe 1 si desprende gas, 2 si lo absorbe.", nums(1), "Desprende gas: pierde burbujas.", "La solubilidad de los gases disminuye al calentar."),
    sort("clasifica", "Tipo de disolución", "Clasifica cada situación (sal con solubilidad 36 g/100 g de agua).",
      [["in", "Insaturada", "cobalt"], ["sa", "Saturada", "amber"], ["so", "Sobresaturada", "rose"]],
      [["20 g en 100 g de agua", "in"], ["30 g en 100 g de agua", "in"], ["36 g en 100 g de agua", "sa"], ["72 g en 200 g de agua", "sa"], ["50 g en 100 g de agua", "so"], ["100 g en 200 g de agua", "so"]],
      "Compara lo disuelto con la solubilidad.",
    ),
    pick("check", "Enfriar", "Una disolución saturada de KNO₃ se enfría. ¿Qué ocurre?",
      "Cristaliza parte de la sal",
      [["Se disuelve más sal", "Al enfriarse disuelve menos."], ["No cambia nada", "La solubilidad baja con la temperatura."], ["Se evapora el agua", "No es por enfriar."]],
      "La solubilidad disminuye al bajar la temperatura.",
    ),
  ],
};
