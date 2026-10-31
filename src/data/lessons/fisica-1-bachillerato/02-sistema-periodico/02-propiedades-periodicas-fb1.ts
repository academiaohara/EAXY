import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesPeriodicasFb1Lesson: InteractiveLesson = {
  slug: "propiedades-periodicas-fb1",
  title: "2. Propiedades periódicas",
  subtitle: FB1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("zef", "Carga nuclear efectiva y radio", [
      { kind: "steps", items: [
        "La **carga nuclear efectiva (Zef)** es la que siente un electrón externo: la del núcleo **menos el apantallamiento** de los electrones internos.",
        "En un **periodo**, Zef crece (misma capa, más protones): el átomo se **contrae**. En un **grupo**, se añade una capa: el átomo **crece**.",
        "El **radio atómico** disminuye hacia la derecha y aumenta hacia abajo.",
      ] },
    ], anim("fb1-radio-atomico"), "visual-top"),
    slide("explora", "Mapa de tendencias", [
      { kind: "text", text: "Cambia de propiedad y mira el mapa de colores. ¿Dónde está el máximo de cada una? Elige un elemento y compáralo con sus vecinos." },
    ], tool("fb1-tendencias-explorador"), "visual-top"),
    slide("prop", "Las propiedades", [
      { kind: "steps", items: [
        "**Energía (potencial) de ionización**: energía mínima para arrancar un electrón de un átomo gaseoso aislado. **Aumenta hacia la derecha y hacia arriba**. Irregularidades: Be > B (subnivel s lleno) y N > O (p semilleno).",
        "**Afinidad electrónica**: energía que se **libera** al captar un electrón. **Máxima en los halógenos**; casi nula en gases nobles y alcalinotérreos.",
        "**Electronegatividad** (Pauling): tendencia a atraer los electrones de un enlace. **Aumenta hacia la derecha y arriba**: F = 3,98 (máxima), Fr ≈ 0,7.",
        "**Carácter metálico**: aumenta hacia la **izquierda y hacia abajo** (el Cs es el más metálico).",
      ] },
    ], undefined, "stack"),
    slide("iones", "Radio iónico", [
      { kind: "text", text: "Un **catión** es **menor** que su átomo; un **anión**, **mayor**. En una **serie isoelectrónica** (iones con el mismo número de electrones, como N³⁻, O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺) el radio **disminuye al aumentar Z**: más protones atraen más a los mismos electrones." },
    ], tool("fb1-radios-ionicos-explorador"), "visual-top"),
    calc("calc-ion", "Primera y segunda ionización", "Para un átomo, ¿qué energía de ionización es mayor: la primera o la segunda? (escribe 2 si la segunda)", nums(2), "La segunda: se arranca un electrón a un ion positivo, más atraído.", "Es más difícil quitar un electrón a un catión."),
    calc("calc-contar", "Mayor electronegatividad", "De los elementos Na (grupo 1), Mg (grupo 2) y Cl (grupo 17), todos del periodo 3, ¿cuál tiene mayor electronegatividad? Escribe su grupo.", nums(17), "El cloro: a la derecha del periodo.", "Aumenta hacia la derecha."),
    calc("calc-radio", "Ordenar radios", "Entre Na, Mg y Al (periodo 3), ¿cuál tiene el menor radio atómico? Escribe su número atómico.", nums(13), "El Al (Z = 13), a la derecha del periodo.", "Disminuye hacia la derecha."),
    sort("clasifica", "Tendencia en un periodo", "Al avanzar de izquierda a derecha en un periodo, ¿cómo cambia cada propiedad?",
      [["au", "Aumenta", "rose"], ["di", "Disminuye", "cobalt"]],
      [["Energía de ionización", "au"], ["Radio atómico", "di"], ["Electronegatividad", "au"], ["Carácter metálico", "di"], ["Carga nuclear efectiva", "au"], ["Afinidad electrónica (en general)", "au"]],
      "La carga nuclear efectiva crece y atrae más a los electrones.",
    ),
    pick("check", "Isoelectrónicos", "Entre O²⁻, F⁻, Na⁺ y Mg²⁺ (todos con 10 electrones), ¿cuál tiene mayor radio?",
      "O²⁻",
      [["Mg²⁺", "Es el de más protones, el más pequeño."], ["F⁻", "Es menor que O²⁻."], ["Na⁺", "Es menor que los aniones."]],
      "A igual nº de electrones, menos protones implica mayor radio.",
    ),
  ],
};
