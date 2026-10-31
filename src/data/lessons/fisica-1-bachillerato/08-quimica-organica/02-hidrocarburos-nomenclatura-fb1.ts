import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hidrocarburosNomenclaturaFb1Lesson: InteractiveLesson = {
  slug: "hidrocarburos-nomenclatura-fb1",
  title: "2. Hidrocarburos y su nomenclatura",
  subtitle: FB1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Tipos de hidrocarburos", [
      { kind: "steps", items: [
        "Los **hidrocarburos** contienen solo **C e H**. **Alcanos**: enlaces sencillos (**CₙH₂ₙ₊₂**; saturados). **Alquenos**: un doble enlace (**CₙH₂ₙ**). **Alquinos**: un triple (**CₙH₂ₙ₋₂**).",
        "**Cicloalcanos** (CₙH₂ₙ): cadena cerrada. **Aromáticos**: derivados del **benceno** (C₆H₆), con electrones π deslocalizados.",
        "**Raíces**: met-, et-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-. **Terminaciones**: **-ano**, **-eno**, **-ino**.",
        "**Radicales** alquilo (R–): **metil** (–CH₃), **etil** (–CH₂CH₃), **propil**, **isopropil**… al quitar un H a un alcano.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Construye y nombra", [
      { kind: "text", text: "Elige el tipo, la longitud de la cadena, la posición del enlace múltiple y una ramificación. ¿Cómo se numera para que los localizadores sean mínimos?" },
    ], tool("fb1-ramificados-explorador"), "visual-top"),
    slide("reglas", "Reglas de nomenclatura IUPAC", [
      { kind: "steps", items: [
        "**1.** Cadena **principal**: la más larga que contenga los enlaces múltiples.",
        "**2.** Se **numera** para dar el **menor localizador** al enlace múltiple y, a igualdad, a las **ramificaciones**.",
        "**3.** Los **radicales** se nombran **delante**, con su localizador y **por orden alfabético**; con varios iguales se usan **di-, tri-**: 2,3-dimetilbutano.",
        "**4.** El **enlace múltiple** lleva su localizador delante de la terminación: **but-1-eno**, **pent-2-ino**. En los ciclos, **ciclo-** delante: ciclohexano. Benceno es un nombre propio; sus derivados: metilbenceno (tolueno).",
      ] },
    ], undefined, "stack"),
    slide("prop", "Propiedades y reactividad", [
      { kind: "steps", items: [
        "**Propiedades físicas**: apolares, insolubles en agua, menos densos que ella. La T de ebullición **crece con la masa** (London) y **disminuye con la ramificación**.",
        "**Alcanos**: poco reactivos; **combustión** y **sustitución** con halógenos (luz UV).",
        "**Alquenos y alquinos**: más reactivos por el enlace π: **adición** de H₂, X₂, HX y H₂O.",
        "**Benceno**: muy estable; reacciona por **sustitución** (nitración, halogenación) y no por adición.",
      ] },
    ], undefined, "stack"),
    calc("calc-c", "Carbonos del alqueno", "El but-1-eno tiene 4 carbonos. ¿Cuántos hidrógenos tiene su fórmula C₄H_x?", nums(8), "CₙH₂ₙ: 2·4 = 8 → C₄H₈.", "Alqueno: 2n H."),
    calc("calc-loc", "Localizador", "¿Qué número va delante de «eno» en CH₃–CH₂–CH=CH₂ si se numera por el extremo correcto?", nums(1), "El doble enlace empieza en el C1 si se numera desde el lado derecho: but-1-eno.", "Menor localizador al enlace múltiple."),
    calc("calc-mas", "Carbonos totales", "El 3-etilhexano tiene una cadena principal de 6 carbonos y un etilo. ¿Cuántos carbonos tiene en total?", nums(8), "6 + 2 = 8 → C₈H₁₈.", "Suma cadena y radical."),
    calc("calc-alq", "Alquino", "Un alquino de 3 carbonos (propino), ¿cuántos hidrógenos tiene? (CₙH₂ₙ₋₂)", nums(4), "C₃H₄: 2·3 − 2 = 4.", "Alquino: 2n − 2."),
    sort("clasifica", "Tipo de hidrocarburo", "Clasifica según su fórmula.",
      [["al", "Alcano", "cobalt"], ["en", "Alqueno o cicloalcano (CₙH₂ₙ)", "emerald"], ["in", "Alquino (CₙH₂ₙ₋₂)", "rose"]],
      [["C₅H₁₂", "al"], ["C₇H₁₆", "al"], ["C₄H₈", "en"], ["C₆H₁₂", "en"], ["C₃H₄", "in"], ["C₅H₈", "in"]],
      "Compara con 2n+2, 2n y 2n−2.",
    ),
    pick("check", "Nombre", "¿Cómo se llama CH₃–CH(CH₃)–CH₂–CH₃?",
      "2-metilbutano",
      [["3-metilbutano", "Se numera por el extremo que da el localizador menor."], ["Pentano", "Es un isómero ramificado, no el lineal."], ["Dimetilpropano", "La cadena principal tiene 4 carbonos."]],
      "Cadena de 4 C con un metilo en el carbono 2.",
    ),
  ],
};
