import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const isotoposMasaAtomicaFq3Lesson: InteractiveLesson = {
  slug: "isotopos-masa-atomica-fq3",
  title: "3. Isótopos y masa atómica media",
  subtitle: FQ3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Mismo elemento, distinta masa", [
      { kind: "steps", items: [
        "Los **isótopos** son átomos del **mismo elemento** (mismo Z) con **distinto número de neutrones** (distinto A).",
        "Se nombran con el símbolo y el número másico: **cloro-35** y **cloro-37**. Químicamente se comportan casi igual.",
        "Algunos isótopos son **radiactivos** (carbono-14, uranio-235) y se usan en **datación**, **medicina** y **energía nuclear**.",
        "En la naturaleza, un elemento suele ser una **mezcla** de isótopos en proporciones fijas (**abundancia natural**).",
      ] },
    ], undefined, "stack"),
    slide("explora", "La masa media", [
      { kind: "text", text: "Cambia la abundancia de cada isótopo. ¿Cómo varía la masa atómica del elemento?" },
    ], tool("fq3-masa-atomica-media-explorador"), "visual-top"),
    slide("media", "Masa atómica media", [
      { kind: "steps", items: [
        "La **masa atómica** de la tabla periódica es la **media ponderada** de las masas de los isótopos naturales.",
        "**Masa media = Σ (masa del isótopo · abundancia %) / 100**.",
        "Por eso no es un número entero y se acerca a la masa del isótopo **más abundante**.",
        "Se mide en **unidades de masa atómica (u)**: 1 u es la doceava parte de la masa del carbono-12.",
      ] },
    ]),
    calc("calc-cl", "Cloro", "El cloro tiene 75 % de ³⁵Cl y 25 % de ³⁷Cl. ¿Cuál es su masa atómica media, en u?", nums(35.5), "(35 · 75 + 37 · 25) / 100 = 35,5 u.", "Pondera cada masa por su abundancia."),
    calc("calc-b", "Boro", "El boro tiene 20 % de ¹⁰B y 80 % de ¹¹B. ¿Cuánto vale su masa atómica media, en u?", nums(10.8), "(10 · 20 + 11 · 80) / 100 = 10,8 u.", "La media queda más cerca del isótopo más abundante."),
    calc("calc-ab", "Abundancia desconocida", "Un elemento tiene dos isótopos, de masas 10 u y 11 u, y masa media 10,5 u. ¿Qué porcentaje tiene el isótopo de 10 u?", nums(50), "10,5 está justo en medio: 50 % y 50 %.", "Si la media es el punto medio, abundan igual."),
    sort("clasifica", "Isótopo o no", "¿Son isótopos entre sí? Clasifica cada pareja.",
      [["si", "Isótopos", "emerald"], ["no", "No son isótopos", "rose"]],
      [["¹²C y ¹⁴C", "si"], ["³⁵Cl y ³⁷Cl", "si"], ["¹H y ²H", "si"], ["¹²C y ¹⁴N", "no"], ["²³Na y ²⁴Mg", "no"], ["¹⁶O y ¹⁹F", "no"]],
      "Mismo Z y distinto A.",
    ),
    pick("check", "Masa decimal", "¿Por qué la masa atómica del cloro es 35,45 u y no un número entero?",
      "Porque es la media de sus isótopos naturales",
      [["Porque los protones pesan decimales", "Pesan cerca de 1 u."], ["Porque se mide con error", "Es un promedio, no un error."], ["Porque los electrones pesan mucho", "Su masa es casi despreciable."]],
      "Media ponderada de ³⁵Cl y ³⁷Cl.",
    ),
  ],
};
