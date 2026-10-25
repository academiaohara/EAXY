import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadResiduosIndustriaLesson: InteractiveLesson = {
  slug: "seguridad-residuos-industria",
  title: "12. Seguridad, residuos y sostenibilidad industrial",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("prevencion", "Prevención de riesgos", [
      { kind: "definition", text: "Un **riesgo** es la posibilidad de que un peligro cause un daño. Se previene actuando por orden: **eliminar** el peligro, **proteger** colectivamente y, por último, proteger a **cada persona**." },
      { kind: "steps", title: "Orden de prioridad", items: [
        "**Eliminar o sustituir** (usar un disolvente menos tóxico).",
        "**Proteger en origen** (resguardos, extracción de humos, cabinas insonorizadas).",
        "**Organizar** (formación, procedimientos, señalización).",
        "**Equipos de protección individual** (EPI): gafas, guantes, calzado, casco, protectores auditivos. Son la última barrera.",
      ] },
      { kind: "warning", title: "Un EPI no elimina el riesgo", text: "Solo reduce el daño. Si falla o se usa mal, la persona queda expuesta; por eso no sustituye a las medidas en origen." },
    ], undefined, "stack"),
    slide("fabrica", "Recorre la fábrica virtual", [
      { kind: "text", text: "Pulsa cada puesto y decide qué riesgo hay y qué medida lo reduce. Distingue riesgos **para las personas** y **para el medio ambiente**." },
    ], tool("fabrica-riesgos-explorador"), "visual-top"),
    slide("residuos", "Residuos industriales", [
      { kind: "steps", items: [
        "**Inertes**: escombros, vidrio, cerámica; no reaccionan.",
        "**No peligrosos**: embalajes, chatarra, plástico limpio; se pueden valorizar.",
        "**Peligrosos**: aceites usados, disolventes, baterías, taladrinas; requieren gestor autorizado.",
      ] },
      { kind: "text", text: "Jerarquía de gestión: **prevenir → reutilizar → reciclar → valorizar energéticamente → eliminar**." },
    ]),
    slide("reciclado", "Reciclar ahorra energía", [
      { kind: "text", text: "Producir un metal a partir de chatarra requiere mucha menos energía que a partir del mineral. Elige un material y cambia el porcentaje de material reciclado." },
    ], tool("reciclaje-energia-explorador", { n: 0, a: 50, b: 10 }), "visual-top"),
    slide("circular", "Economía circular en la industria", [
      { kind: "compare",
        left: { title: "Economía lineal", text: "Extraer → fabricar → usar → tirar.", tone: "warn" },
        right: { title: "Economía circular", text: "Diseñar para durar, reparar, reutilizar y recuperar materiales para que vuelvan al proceso.", tone: "ok" } },
      { kind: "text", text: "Ejemplos industriales: recuperar el calor residual, reutilizar agua de refrigeración, reciclar viruta metálica y usar subproductos de un proceso como materia prima de otro." },
    ]),
    calc("calc-energia", "Energía con material reciclado", "Aluminio: la producción primaria requiere $170$ MJ/kg y la reciclada $9$ MJ/kg. Una pieza tiene un $50\\,\\%$ de material reciclado. ¿Cuántos MJ por kg?",
      nums(89.5), "$0{,}5\\cdot 170 + 0{,}5\\cdot 9 = 85 + 4{,}5 = 89{,}5$ MJ/kg, un ahorro del 47 % frente al primario.", "Haz la media ponderada con 50 % de cada uno."),
    sort("clasifica-epi", "Medida de protección", "Clasifica cada medida según el nivel de prevención.",
      [["orig", "En origen (colectiva)", "emerald"], ["epi", "Equipo de protección individual", "amber"]],
      [["Resguardo fijo en la sierra", "orig"], ["Extracción de humos de soldadura", "orig"], ["Cabina insonorizada", "orig"], ["Gafas de seguridad", "epi"], ["Guantes", "epi"], ["Protectores auditivos", "epi"]],
      "Las medidas en origen protegen a todos y actúan sobre el peligro; los EPI protegen a una sola persona y dependen de que se usen bien.",
    ),
    pick("check-residuo", "Gestión del residuo", "Un taller de mecanizado genera aceite de corte usado. ¿Qué debe hacer?",
      "Almacenarlo separado y entregarlo a un gestor autorizado de residuos peligrosos",
      [["Echarlo al desagüe con agua abundante", "Contamina las aguas y está prohibido."], ["Mezclarlo con las virutas para que ocupe menos", "Hace imposible reciclar las virutas y complica la gestión."], ["Quemarlo en el patio", "Genera emisiones tóxicas y es ilegal."]],
      "Los residuos peligrosos se separan, se etiquetan y los trata un gestor autorizado.",
    ),
  ],
};
