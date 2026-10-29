import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceIonicoRedesCristalinasFq4Lesson: InteractiveLesson = {
  slug: "enlace-ionico-redes-cristalinas-fq4",
  title: "1. Enlace iónico y redes cristalinas",
  subtitle: FQ4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Por qué se enlazan los átomos", [
      { kind: "steps", items: [
        "Los átomos se unen porque así alcanzan una situación de **menor energía** y mayor **estabilidad**: casi siempre, una capa externa **completa** (**regla del octeto**: 8 electrones; 2 en el H y el He).",
        "El **enlace iónico** se da entre un elemento de **baja electronegatividad** (metal) y otro de **alta** (no metal): diferencia de electronegatividad **mayor de ≈ 1,7**.",
        "El metal **cede** electrones y forma un **catión**; el no metal los **gana** y forma un **anión**. Los iones de carga opuesta se **atraen** por fuerzas electrostáticas.",
        "No se forman moléculas aisladas, sino una **red cristalina** de iones alternados.",
      ] },
    ], undefined, "stack"),
    slide("explora", "La fuerza de la red", [
      { kind: "text", text: "Compara cinco compuestos iónicos: tamaño de los iones, cargas, índice reticular y punto de fusión." },
    ], tool("fq4-red-ionica-explorador"), "visual-top"),
    slide("ener", "Energía reticular", [
      { kind: "steps", items: [
        "La **energía reticular** es la energía que se libera al formarse **1 mol** de cristal iónico a partir de sus iones en estado gaseoso. A mayor energía reticular, **más estable** es el cristal.",
        "Según la **ley de Coulomb**, F ∝ q₊·q₋ / d²: aumenta con las **cargas** de los iones y al **disminuir la distancia** entre ellos (iones más pequeños).",
        "Por eso el **MgO** (Mg²⁺ y O²⁻) funde a **2850 °C** y el **NaCl** (Na⁺ y Cl⁻), a **801 °C**.",
        "**Fórmula empírica**: indica la **proporción** de iones (MgCl₂: un Mg²⁺ por cada dos Cl⁻), no una molécula.",
      ] },
    ]),
    calc("calc-q", "Fórmula iónica", "Se combina Al³⁺ con O²⁻. En la fórmula Al₂O₃, ¿cuántos iones O²⁻ hay por cada 2 iones Al³⁺?", nums(3), "Carga positiva: 2·3 = 6; negativa: 3·2 = 6.", "Iguala las cargas."),
    calc("calc-ele", "Electrones transferidos", "El calcio (grupo 2) y el cloro (grupo 17) forman CaCl₂. ¿Cuántos electrones cede cada átomo de Ca?", nums(2), "Ca pasa a Ca²⁺: cede 2 electrones.", "Mira la carga del catión."),
    calc("calc-rel", "Atracción de iones", "Al duplicar la distancia entre dos iones, ¿por cuánto se divide la fuerza de atracción?", nums(4), "F ∝ 1/d²: se divide entre 2² = 4.", "La fuerza depende del cuadrado de la distancia."),
    calc("calc-cargas", "Efecto de la carga", "Si las dos cargas se duplican (de 1 a 2), ¿por cuánto se multiplica la fuerza (a igual distancia)?", nums(4), "F ∝ q₊·q₋: 2·2 = 4.", "Producto de las cargas."),
    sort("clasifica", "Propiedades de un cristal iónico", "Clasifica cada afirmación sobre los cristales iónicos.",
      [["ve", "Cierta", "emerald"], ["fa", "Falsa", "rose"]],
      [["Tienen puntos de fusión altos", "ve"], ["No conducen la electricidad en estado sólido", "ve"], ["Son duros pero frágiles", "ve"], ["Forman moléculas aisladas", "fa"], ["Conducen la electricidad en estado sólido", "fa"], ["Son blandos y de bajo punto de fusión", "fa"]],
      "Los iones están fijos en la red; al fundirse o disolverse se mueven.",
    ),
    pick("check", "Mayor energía reticular", "¿Qué compuesto tiene mayor energía reticular?",
      "MgO, por las cargas 2+ y 2− y el menor tamaño de los iones",
      [["NaCl, porque es el más común", "No es un criterio."], ["KCl, porque K⁺ es el ion más grande", "Un ion grande da menor energía reticular."], ["Todos tienen la misma", "Dependen de cargas y distancias."]],
      "Las cargas se multiplican y la distancia es pequeña.",
    ),
  ],
};
