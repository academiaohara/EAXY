import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hidrocarburosFq4Lesson: InteractiveLesson = {
  slug: "hidrocarburos-fq4",
  title: "2. Hidrocarburos",
  subtitle: FQ4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué son los hidrocarburos", [
      { kind: "steps", items: [
        "Los **hidrocarburos** son compuestos formados **solo por carbono e hidrógeno**.",
        "**Alcanos** (saturados): solo enlaces sencillos. Fórmula general **CₙH₂ₙ₊₂**.",
        "**Alquenos**: un enlace doble C=C. Fórmula general **CₙH₂ₙ**.",
        "**Alquinos**: un enlace triple C≡C. Fórmula general **CₙH₂ₙ₋₂**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Construye hidrocarburos", [
      { kind: "text", text: "Elige el tipo, el número de carbonos y la posición del enlace múltiple. Observa la fórmula y el nombre." },
    ], tool("fq4-hidrocarburos-explorador"), "visual-top"),
    slide("nom", "Nomenclatura", [
      { kind: "steps", items: [
        "**Raíz** según el número de carbonos: **met-** (1), **et-** (2), **prop-** (3), **but-** (4), **pent-** (5), **hex-** (6), **hept-** (7), **oct-** (8), **non-** (9), **dec-** (10).",
        "**Terminación**: **-ano** (alcano), **-eno** (alqueno), **-ino** (alquino): *propano*, *propeno*, *propino*.",
        "A partir de 4 carbonos, un **número** indica dónde empieza el enlace múltiple, el **más bajo posible**: *but-1-eno* (CH₂=CH–CH₂–CH₃), *but-2-eno* (CH₃–CH=CH–CH₃).",
        "Las cadenas **ramificadas** se nombran con la cadena principal más larga y los radicales (*metil*, *etil*) con su posición: 2-metilbutano.",
      ] },
    ], undefined, "stack"),
    slide("prop", "Propiedades", [
      { kind: "text", text: "Los hidrocarburos son **apolares**: no se disuelven en agua y arden con facilidad. Al crecer la cadena aumentan las fuerzas de London y con ellas el punto de ebullición: **metano, etano, propano y butano** son gases; del pentano al hexadecano son líquidos; los más largos son sólidos (parafinas). Los alquenos y alquinos son más **reactivos** que los alcanos gracias a su enlace múltiple." },
    ]),
    calc("calc-h", "Hidrógenos de un alcano", "El hexano es un alcano de 6 carbonos. ¿Cuántos átomos de hidrógeno tiene (2n + 2)?", nums(14), "CₙH₂ₙ₊₂ con n = 6 da C₆H₁₄.", "Sustituye n = 6."),
    calc("calc-eno", "Hidrógenos de un alqueno", "¿Cuántos hidrógenos tiene el propeno, de fórmula general CₙH₂ₙ, con n = 3?", nums(6), "C₃H₆: 2n = 6 hidrógenos.", "Fórmula CₙH₂ₙ."),
    sort("clasifica", "Tipo de hidrocarburo", "Clasifica según su fórmula.",
      [["al", "Alcano", "cobalt"], ["en", "Alqueno", "emerald"], ["in", "Alquino", "rose"]],
      [["CH₄", "al"], ["C₃H₈", "al"], ["C₂H₄", "en"], ["C₄H₈", "en"], ["C₂H₂", "in"], ["C₃H₄", "in"]],
      "Compara con CₙH₂ₙ₊₂ (alcano), CₙH₂ₙ (alqueno) y CₙH₂ₙ₋₂ (alquino).",
    ),
    pick("check", "Nombre", "¿Cómo se llama CH₃–CH=CH–CH₃?",
      "But-2-eno",
      [["But-1-eno", "El doble enlace está entre los carbonos 2 y 3."], ["Butano", "Tiene un enlace doble."], ["Butino", "No tiene triple enlace."]],
      "Cuatro carbonos, doble enlace en el 2.",
    ),
  ],
};
