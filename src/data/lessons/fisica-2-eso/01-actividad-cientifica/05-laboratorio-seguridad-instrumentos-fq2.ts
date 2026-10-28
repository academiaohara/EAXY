import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const laboratorioSeguridadInstrumentosFq2Lesson: InteractiveLesson = {
  slug: "laboratorio-seguridad-instrumentos-fq2",
  title: "5. El laboratorio: instrumentos y seguridad",
  subtitle: FQ2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir con el instrumento adecuado", [
      { kind: "steps", items: [
        "Cada instrumento tiene una **resolución** (la división más pequeña que distingue) y un **alcance** (el valor máximo que mide).",
        "El **vaso de precipitados** sirve para **mezclar y calentar**, no para medir con precisión; la **probeta** y la **pipeta** miden **volúmenes**.",
        "Para la **masa** se usa la **balanza**; para la **longitud**, regla o **calibre**; para la **temperatura**, el **termómetro**; para el **tiempo**, el **cronómetro**.",
        "Se elige el instrumento cuya **resolución** es igual o menor que el **error** que se admite.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Elegir el instrumento", [
      { kind: "text", text: "Elige la magnitud y el error que admites. Mira qué instrumentos son suficientes y cuál conviene." },
    ], tool("fq2-instrumentos-laboratorio-explorador"), "visual-top"),
    slide("seguridad", "Normas de seguridad", [
      { kind: "steps", items: [
        "Usa **bata** y **gafas** de protección; recoge el pelo y no lleves colgantes.",
        "**No pruebes** ni **huelas** directamente los productos; no comas ni bebas en el laboratorio.",
        "Lee las **etiquetas** y los **pictogramas** de peligro antes de usar un producto.",
        "Calienta con el tubo **apuntando hacia un lugar seguro** y nunca hacia ti ni hacia otra persona.",
        "**Avisa al profesor** ante cualquier accidente, derrame o rotura, y deja el material **limpio y ordenado**.",
      ] },
    ]),
    slide("lectura", "Leer un instrumento", [
      { kind: "steps", items: [
        "En una **probeta** se lee el volumen en la parte baja del **menisco**, con los ojos a la **altura** del líquido.",
        "Antes de pesar se **tara** la balanza (se pone a cero con el recipiente).",
        "En una **regla** se mira **perpendicularmente** para evitar el error de **paralaje**.",
        "El resultado se anota con las **cifras** que permite el instrumento y con su **unidad**.",
      ] },
    ]),
    calc("calc-res", "Resolución", "Una probeta tiene divisiones cada 1 mL. Quieres medir 50 mL con un error de 2 mL como máximo. ¿Cuál es la resolución, en mL, del instrumento?", nums(1), "La resolución de la probeta es 1 mL, menor que el error admitido (2 mL): sirve.", "Es la división más pequeña."),
    calc("calc-tara", "Tarar", "Un vaso vacío pesa 45 g. Al añadir agua, la balanza marca 195 g. ¿Cuántos gramos de agua hay?", nums(150), "195 − 45 = 150 g.", "Resta la masa del vaso."),
    sort("clasifica", "Material de laboratorio", "Asocia cada instrumento con la magnitud que mide.",
      [["vol", "Volumen", "cobalt"], ["mas", "Masa", "amber"], ["tem", "Temperatura", "emerald"]],
      [["Probeta", "vol"], ["Pipeta", "vol"], ["Balanza", "mas"], ["Báscula de laboratorio", "mas"], ["Termómetro", "tem"], ["Sonda de temperatura digital", "tem"]],
      "Cada instrumento mide una magnitud concreta.",
    ),
    pick("check", "Seguridad", "Un producto de laboratorio desprende un olor fuerte. ¿Qué debes hacer para olerlo?",
      "No olerlo directamente: avisar al profesor o abanicar los vapores con la mano con cuidado",
      [["Acercar la nariz para olerlo bien", "Puede ser tóxico o irritante."], ["Probarlo con un poco de agua", "Nunca se prueban los productos."], ["Taparlo con la mano y guardarlo", "No es la forma correcta de actuar."]],
      "Nunca se huele ni se prueba un producto directamente; si hace falta, se abanica con cuidado.",
    ),
  ],
};
