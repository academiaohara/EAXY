import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const dilucionPropiedadesColigativasFb1Lesson: InteractiveLesson = {
  slug: "dilucion-propiedades-coligativas-fb1",
  title: "5. Dilución y propiedades coligativas",
  subtitle: FB1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("prep", "Preparar disoluciones", [
      { kind: "steps", items: [
        "**A partir de un sólido**: calcula la masa (**m = M·V·M_molar**), pésala en una balanza, **disuélvela** en poca agua en un vaso, pásala a un **matraz aforado** y enrasa con agua hasta la marca.",
        "**A partir de una disolución concentrada (dilución)**: toma el volumen necesario con una **pipeta** y llévalo al matraz aforado; enrasa con agua.",
        "Al diluir **no cambia la cantidad de soluto**: n₁ = n₂, es decir, **C₁·V₁ = C₂·V₂**.",
        "**Seguridad**: los ácidos concentrados se vierten **sobre el agua** lentamente (nunca al revés) y se usan gafas y guantes.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Dilución y coligativas", [
      { kind: "text", text: "En el modo «dilución», calcula cuánta disolución concentrada necesitas. Después cambia al modo «propiedades coligativas»." },
    ], tool("fb1-dilucion-coligativas-explorador"), "visual-top"),
    slide("col", "Propiedades coligativas", [
      { kind: "steps", items: [
        "Son propiedades de una disolución que dependen del **número de partículas de soluto** y no de su naturaleza (soluto **no volátil**, disolución diluida).",
        "**Descenso de la presión de vapor** (ley de Raoult): **ΔP = x_soluto · P°**.",
        "**Ascenso ebulloscópico**: **ΔT_e = K_e·m·i**. **Descenso crioscópico**: **ΔT_c = K_c·m·i**. Para el agua, K_e = 0,52 y K_c = 1,86 °C·kg/mol.",
        "**Presión osmótica**: **π = M·R·T·i**, la presión que hay que aplicar para detener la **ósmosis** (paso del disolvente a través de una membrana semipermeable hacia la disolución más concentrada).",
      ] },
    ], undefined, "stack"),
    slide("vant", "Factor de van't Hoff y aplicaciones", [
      { kind: "steps", items: [
        "El factor **i** cuenta las **partículas** en que se disocia el soluto: **glucosa** i = 1; **NaCl** i = 2; **CaCl₂** i = 3.",
        "**Sal en las carreteras** y **anticongelante** en los radiadores: bajan el punto de congelación del agua.",
        "**Suero fisiológico** (0,9 % NaCl): es **isotónico** con la sangre, sin ósmosis neta en las células. **Ósmosis inversa**: potabilización del agua de mar.",
        "**Conservación de alimentos** con sal o azúcar: la alta concentración extrae el agua de los microorganismos.",
      ] },
    ], undefined, "stack"),
    calc("calc-v1", "Dilución", "¿Qué volumen de disolución 2 M hay que tomar para preparar 100 mL de otra 0,5 M? (mL)", nums(25), "V₁ = C₂V₂/C₁ = 0,5·100/2 = 25 mL.", "C₁V₁ = C₂V₂."),
    calc("calc-v2", "Volumen final", "Se toman 50 mL de una disolución 1 M y se diluyen hasta 250 mL. ¿Cuál es la nueva concentración, en mol/L?", nums(0.2), "C₂ = 1·50/250 = 0,2 mol/L.", "C₁V₁ = C₂V₂."),
    calc("calc-dtc", "Descenso crioscópico", "Una disolución acuosa de glucosa (i = 1) tiene una molalidad 1 m. ¿Cuánto desciende su punto de congelación, en °C? (K_c = 1,86)", nums(1.86), "ΔT_c = 1,86·1·1 = 1,86 °C.", "ΔT_c = K_c·m·i."),
    calc("calc-nacl", "NaCl", "Para el NaCl (i = 2) en agua 1 m, ¿cuánto desciende el punto de congelación, en °C? (K_c = 1,86; redondea a 2 decimales)", nums(3.72), "ΔT_c = 1,86·1·2 = 3,72 °C.", "i = 2."),
    sort("clasifica", "Propiedad coligativa", "¿Qué efecto produce disolver un soluto no volátil en agua?",
      [["su", "Sube", "rose"], ["ba", "Baja", "cobalt"]],
      [["El punto de ebullición", "su"], ["El punto de congelación", "ba"], ["La presión de vapor", "ba"], ["La presión osmótica (respecto al agua pura)", "su"], ["La fracción molar del agua", "ba"], ["La temperatura de ebullición de una disolución más concentrada", "su"]],
      "El soluto «estorba» al disolvente: cuesta más hervir y menos congelar.",
    ),
    pick("check", "Ósmosis", "¿Hacia dónde se desplaza el agua en la ósmosis?",
      "Hacia la disolución más concentrada",
      [["Hacia la disolución más diluida", "Va hacia donde hay más soluto."], ["No se desplaza", "El agua atraviesa la membrana semipermeable."], ["Hacia el soluto sólido", "Es entre dos disoluciones."]],
      "El disolvente tiende a igualar las concentraciones.",
    ),
  ],
};
