import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const analisisCicloVidaLesson: InteractiveLesson = {
  slug: "analisis-ciclo-vida",
  title: "8. Análisis del ciclo de vida",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es un ACV", [
      { kind: "definition", text: "El **análisis del ciclo de vida (ACV)** cuantifica los impactos ambientales de un producto a lo largo de **todas** sus etapas, para compararlo de forma justa con alternativas." },
      { kind: "steps", title: "Fases de un ACV", items: [
        "**Objetivo y alcance**: qué se compara, para qué y hasta dónde se mira.",
        "**Inventario**: entradas y salidas (energía, materiales, emisiones, residuos) de cada etapa.",
        "**Evaluación de impacto**: se traducen a indicadores (kg CO₂e, MJ, litros de agua).",
        "**Interpretación**: conclusiones, límites e incertidumbres.",
      ] },
    ], anim("ciclo-vida-fases"), "split"),
    slide("uf", "La unidad funcional", [
      { kind: "definition", text: "La **unidad funcional** es el servicio que se compara, y debe ser **equivalente** entre alternativas. Comparar «una bombilla» con «otra bombilla» es injusto si una dura 1 000 h y la otra, 25 000: la unidad funcional correcta es «dar luz durante 25 000 horas»." },
      { kind: "text", text: "Por eso los resultados de un ACV se expresan **por unidad funcional**: por kg de producto, por km recorrido, por hora de luz, por año de servicio." },
    ]),
    slide("bombillas", "ACV de tres bombillas", [
      { kind: "text", text: "Compara incandescente, fluorescente y LED para una misma cantidad de horas de luz. ¿Qué fase domina? Cambia el mix eléctrico y la incertidumbre y comprueba si la conclusión es robusta." },
    ], tool("acv-explorador", { a: 25000, b: 150, c: 20 }), "visual-top"),
    slide("limites", "Límites e incertidumbres", [
      { kind: "steps", items: [
        "**Límites del sistema**: lo que se incluye y lo que no (¿se cuenta el transporte? ¿el fin de vida?). Cambiarlos puede cambiar el resultado.",
        "**Calidad de los datos**: promedios, proveedores distintos, años distintos.",
        "**Indicadores distintos** (clima, agua, residuos) pueden dar ganadores distintos: no existe un número único «de impacto».",
        "**Incertidumbre**: si la diferencia entre dos alternativas es menor que la incertidumbre de los datos, no se puede concluir que una sea mejor.",
      ] },
    ]),
    calc("calc-unidades", "Alternativas equivalentes", "Para dar luz durante $25\\,000$ h con bombillas incandescentes de $1\\,000$ h de vida, ¿cuántas bombillas hacen falta?",
      nums(25), "$25\\,000/1\\,000 = 25$ bombillas.", "Horas totales entre la vida de cada bombilla."),
    calc("calc-uso", "Impacto de la fase de uso", "Una bombilla incandescente de $60$ W funciona $25\\,000$ h con electricidad de $150$ g CO₂/kWh. ¿Cuántos kg de CO₂ se emiten en la fase de uso?",
      nums(225), "Energía: $0{,}06\\ \\text{kW}\\cdot 25\\,000\\ \\text{h} = 1\\,500$ kWh. Emisiones: $1500\\cdot 0{,}150 = 225$ kg.", "Pasa W a kW y g a kg."),
    sort("clasifica-acv", "Fase del ACV", "Asigna cada tarea a la fase del ACV.",
      [["obj", "Objetivo y alcance", "cobalt"], ["inv", "Inventario", "amber"], ["imp", "Impacto", "emerald"], ["int", "Interpretación", "violet"]],
      [["Decidir que se compara «luz durante 25 000 h»", "obj"], ["Fijar si se incluye el transporte", "obj"], ["Recopilar los kWh y kg de cada etapa", "inv"], ["Medir las emisiones de la fábrica", "inv"], ["Convertir las emisiones en kg de CO₂e", "imp"], ["Concluir qué alternativa es mejor y con qué dudas", "int"]],
      "Primero se define el alcance, luego se recopilan datos, se traducen a impactos y por último se interpretan.",
    ),
    pick("check-incert", "Diferencia pequeña", "Un ACV da 100 kg CO₂e a la alternativa A y 104 kg a la B, con una incertidumbre de ±15 % en los datos. ¿Qué se puede concluir?",
      "Que la diferencia no es concluyente: está dentro de la incertidumbre",
      [["Que A es claramente mejor", "Un 4 % de diferencia queda dentro del ±15 %."], ["Que B es claramente mejor", "Es la que tiene más impacto, y de todos modos no es concluyente."], ["Que el ACV no sirve", "Sirve, pero hay que interpretar con honestidad sus límites."]],
      "Solo se puede afirmar que una alternativa es mejor si la diferencia supera la incertidumbre.",
    ),
  ],
};
