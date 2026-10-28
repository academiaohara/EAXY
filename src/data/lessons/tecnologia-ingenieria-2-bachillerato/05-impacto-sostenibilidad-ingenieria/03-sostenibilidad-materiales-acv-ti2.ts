import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sostenibilidadMaterialesAcvTi2Lesson: InteractiveLesson = {
  slug: "sostenibilidad-materiales-acv-ti2",
  title: "3. Sostenibilidad de los materiales y análisis de ciclo de vida",
  subtitle: TECTI2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "El ciclo de vida de un material", [
      { kind: "steps", items: [
        "Un material tiene impacto en **todas** sus etapas: extracción, transformación, fabricación, transporte, **uso** y fin de vida.",
        "El **análisis de ciclo de vida (ACV)** cuantifica ese impacto (energía, emisiones de CO₂, agua, residuos) para comparar alternativas.",
        "Se compara siempre por una **unidad funcional**: no «un envase frente a otro», sino «transportar un litro durante un año».",
        "El resultado depende de los **límites** del estudio y de las hipótesis: hay que explicarlos.",
      ] },
    ], undefined, "stack"),
    slide("acv", "Desechable frente a reutilizable", [
      { kind: "text", text: "Fabricar un envase reutilizable cuesta más CO₂, pero se reparte entre sus usos. ¿Cuántos hacen falta para que compense?" },
    ], tool("ti2-acv-explorador"), "visual-top"),
    slide("criterios", "Elegir un material sostenible", [
      { kind: "steps", items: [
        "**Energía incorporada**: la que se gastó en obtenerlo (el aluminio primario es muy alta; el reciclado ahorra cerca del 95 %).",
        "**Durabilidad y reparabilidad**: lo que dura más y se repara reduce el material por año de servicio.",
        "**Origen**: contenido reciclado, materias renovables y certificadas, proximidad de la fuente.",
        "**Fin de vida**: ¿se puede separar, reutilizar o reciclar? Los materiales mezclados e inseparables son un problema.",
        "**Seguridad**: ausencia de sustancias tóxicas durante la fabricación, el uso y el desecho.",
      ] },
    ]),
    calc("calc-uso", "Impacto por uso", "Un envase reutilizable emite 1 kg de CO₂ al fabricarse y 0,02 kg al lavarlo en cada uso. Tras 50 usos, ¿cuántos kg de CO₂ por uso? (1/50 + 0,02)", nums(0.04), "1/50 = 0,02; más 0,02 de lavado: 0,04 kg por uso.", "Reparte la fabricación entre los usos."),
    calc("calc-eq", "Cuándo compensa", "El desechable emite 0,08 kg por uso. ¿Desde cuántos usos gana el reutilizable? 1/(0,08 − 0,02) = 16,7; redondea al entero superior.", nums(17, 16.67), "1/0,06 ≈ 16,7: a partir de 17 usos el reutilizable emite menos.", "Divide la fabricación entre el ahorro por uso."),
    sort("clasifica-etapa", "¿En qué etapa ocurre?", "Asocia cada impacto a la etapa del ciclo de vida.",
      [["obt", "Obtención y fabricación", "cobalt"], ["uso", "Uso", "amber"], ["fin", "Fin de vida", "emerald"]],
      [["Minería de la materia prima", "obt"], ["Fundición y moldeo de las piezas", "obt"], ["Electricidad que consume el aparato", "uso"], ["Lavado de un envase reutilizable", "uso"], ["Vertedero o incineración", "fin"], ["Reciclaje del metal", "fin"]],
      "El ACV suma todas las etapas; en muchos productos el uso domina.",
    ),
    pick("check-acv", "Qué es lo decisivo", "Un envase reutilizable de vidrio se usa solo dos veces antes de tirarse. ¿Qué se puede decir?",
      "Probablemente impacte más que uno desechable, porque no compensa su fabricación",
      [["Es siempre mejor por ser reutilizable", "Solo si se reutiliza de verdad."], ["El ACV no sirve para compararlos", "Sí permite compararlos."], ["Es mejor porque el vidrio es reciclable", "Dos usos no compensan su fabricación."]],
      "Un producto reutilizable solo es sostenible si de verdad se reutiliza muchas veces.",
    ),
  ],
};
