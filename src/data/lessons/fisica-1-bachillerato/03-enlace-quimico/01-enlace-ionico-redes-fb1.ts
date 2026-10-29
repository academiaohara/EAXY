import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceIonicoRedesFb1Lesson: InteractiveLesson = {
  slug: "enlace-ionico-redes-fb1",
  title: "1. Enlace iónico y redes cristalinas",
  subtitle: FB1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("estab", "Por qué se unen los átomos", [
      { kind: "steps", items: [
        "Los átomos se unen para alcanzar un estado de **menor energía** y mayor **estabilidad**: normalmente una capa de valencia completa (**octeto**).",
        "Según la **diferencia de electronegatividad (Δχ)** se distinguen: **iónico** (Δχ grande, > 1,7 aprox.: transferencia de electrones), **covalente** (compartición) y **metálico** (electrones deslocalizados).",
        "Un enlace es una **tendencia continua**: entre iónico puro y covalente puro hay enlaces intermedios (covalentes polares).",
      ] },
    ], undefined, "stack"),
    slide("ionico", "El enlace iónico", [
      { kind: "steps", items: [
        "Se forma entre un **metal** (baja energía de ionización) y un **no metal** (alta afinidad electrónica): el metal **cede** electrones y se convierte en **catión**; el no metal los **capta** y se convierte en **anión**.",
        "La unión es la **atracción electrostática** entre iones de signo contrario, **no direccional**: cada ion se rodea del mayor número posible de iones opuestos y forma una **red cristalina** (NaCl: **6:6**; CsCl: 8:8).",
        "El compuesto es **neutro**: la fórmula indica la **proporción mínima** de iones (CaCl₂: 1 Ca²⁺ por 2 Cl⁻); no existen «moléculas» de NaCl.",
        "El proceso de formación **no es espontáneo** solo por transferir electrones (la ionización cuesta energía): lo que estabiliza es la **energía reticular** liberada al formarse la red (**ciclo de Born-Haber**).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Energía reticular", [
      { kind: "text", text: "Cambia de compuesto y compara su energía reticular y su temperatura de fusión. ¿Qué influye más: la carga o el tamaño de los iones?" },
    ], tool("fb1-energia-reticular-explorador"), "visual-top"),
    slide("prop", "Propiedades de los compuestos iónicos", [
      { kind: "steps", items: [
        "**Altos puntos de fusión y ebullición**: hay que vencer fuertes atracciones electrostáticas. Crecen con U.",
        "**Duros pero frágiles**: al desplazar una capa se enfrentan iones de igual carga y el cristal se rompe.",
        "**No conducen la electricidad en estado sólido** (iones fijos) pero **sí fundidos o disueltos** (iones móviles).",
        "**Solubles en agua** en general: las moléculas polares del agua rodean (**hidratan**) a los iones y los separan; insolubles en disolventes apolares.",
      ] },
    ], undefined, "stack"),
    calc("calc-ratio", "Efecto de la carga", "Dos cristales tienen iones del mismo tamaño. En uno las cargas son 1+/1− y en otro 2+/2−. ¿Cuántas veces mayor es, aproximadamente, la energía reticular del segundo? (U ∝ q₁·q₂)", nums(4), "q₁q₂ pasa de 1 a 4: U se multiplica por 4.", "U ∝ |q₁·q₂|."),
    calc("calc-formula", "Fórmula", "Un metal forma el catión Al³⁺ y se une al anión O²⁻. ¿Cuántos iones Al³⁺ hay en la fórmula más sencilla? (Al₂O₃)", nums(2), "Para neutralizar: 2·(+3) + 3·(−2) = 0 → Al₂O₃.", "Carga total nula."),
    calc("calc-dist", "Distancia entre núcleos", "En el NaCl, r(Na⁺) = 102 pm y r(Cl⁻) = 181 pm. ¿Cuál es la distancia entre los centros de los dos iones, en pm?", nums(283), "d = 102 + 181 = 283 pm.", "Suma de radios."),
    sort("clasifica", "Compuesto iónico o no", "Clasifica según el tipo de sólido.",
      [["ion", "Sólido iónico", "rose"], ["otr", "No iónico", "cobalt"]],
      [["NaCl", "ion"], ["MgO", "ion"], ["CaF₂", "ion"], ["CH₄", "otr"], ["Cu", "otr"], ["CO₂", "otr"]],
      "Iónico: metal + no metal.",
    ),
    pick("check", "Conductividad", "¿Cuándo conduce la corriente el cloruro de sodio?",
      "Fundido o disuelto en agua",
      [["Siempre, también sólido", "Los iones están fijos en la red."], ["Nunca", "Fundido o en disolución los iones se mueven."], ["Solo sólido", "Es al revés."]],
      "Hacen falta iones móviles.",
    ),
  ],
};
