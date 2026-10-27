import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const emprendimientoViabilidadComunicacionTi2Lesson: InteractiveLesson = {
  slug: "emprendimiento-viabilidad-comunicacion-ti2",
  title: "5. Emprendimiento, viabilidad económica y comunicación de resultados",
  subtitle: TECTI2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "De un proyecto a una empresa", [
      { kind: "steps", items: [
        "**Emprender** es convertir una idea en un proyecto que crea valor para otras personas, con sus riesgos.",
        "El **modelo de negocio** responde: ¿a quién se vende (**segmento de clientes**)?, ¿qué problema resuelve (**propuesta de valor**)?, ¿cómo llega (**canales**)?, ¿cómo se gana dinero (**ingresos**) y qué cuesta (**costes**)?",
        "Una **startup** es una empresa que busca un modelo de negocio **repetible y escalable** en condiciones de mucha incertidumbre.",
        "El **plan de empresa** reúne el mercado, el producto, el equipo, los recursos y la **previsión económica**.",
      ] },
    ], undefined, "stack"),
    slide("equilibrio", "Punto de equilibrio", [
      { kind: "text", text: "Costes fijos, variables y precio: ¿cuántas unidades hay que vender para no perder dinero?" },
    ], tool("eso4-viabilidad-explorador"), "visual-top"),
    slide("van", "Valor actual neto", [
      { kind: "text", text: "Una inversión se compara con sus ingresos futuros descontados. Cambia la inversión, el beneficio, los años y la tasa." },
    ], tool("ti2-van-explorador"), "visual-top"),
    slide("comu", "Comunicar los resultados", [
      { kind: "steps", items: [
        "Adapta el mensaje a la **audiencia**: técnicos, inversores, usuarios, jurado.",
        "Un buen **pitch** (3–5 minutos) cuenta el **problema**, la **solución**, el **mercado**, el **equipo**, la **tracción** y lo que se **necesita**.",
        "Usa **datos y demostraciones**; los gráficos deben ser claros y no engañar.",
        "Informa también de los **impactos ambientales y sociales** y de las **limitaciones** del proyecto.",
        "**Cita las fuentes**, respeta las licencias y reconoce el trabajo de otras personas.",
      ] },
    ]),
    calc("calc-van", "Valor actual", "Una inversión de 100 mil € produce 120 mil € dentro de un año. Con una tasa del 10 %, ¿cuántos miles de € vale el VAN? (−100 + 120/1,1, un decimal)", nums(9.1, 9.09), "120 / 1,1 = 109,09; menos 100 = 9,09.", "Descuenta el flujo futuro."),
    calc("calc-pb", "Plazo de recuperación", "Con una inversión de 100 mil € y un beneficio de 30 mil € al año, ¿cuántos años tarda en recuperarse? (redondea a un decimal)", nums(3.3, 3.33), "100 / 30 ≈ 3,3 años.", "Inversión entre beneficio anual."),
    calc("calc-eq", "Punto de equilibrio", "Costes fijos de 2 000 €, coste variable de 8 € y precio de 20 €. ¿Cuántas unidades para no perder dinero? (redondea hacia arriba)", nums(167), "2 000 / 12 = 166,7 → 167 unidades.", "Fijo entre margen por unidad."),
    sort("clasifica-canvas", "¿Qué bloque del modelo de negocio?", "Relaciona cada elemento con su bloque.",
      [["val", "Propuesta de valor", "cobalt"], ["cli", "Clientes y canales", "amber"], ["eco", "Ingresos y costes", "emerald"]],
      [["Un repuesto reparable que dura el doble", "val"], ["Resolver un problema real de los usuarios", "val"], ["Jóvenes que usan transporte compartido", "cli"], ["Venta en línea y tiendas", "cli"], ["Suscripción mensual", "eco"], ["Coste de fabricar cada unidad", "eco"]],
      "Cada bloque responde a una pregunta del modelo de negocio.",
    ),
    pick("check-van", "VAN negativo", "Un proyecto tiene un VAN negativo con la tasa exigida. ¿Qué significa?",
      "Que no rinde lo que se pide a la inversión: con esas hipótesis no compensa",
      [["Que pierde dinero seguro", "Puede devolver la inversión sin llegar a la tasa exigida."], ["Que es técnicamente imposible", "Es una cuestión económica."], ["Que hay que invertir más", "No es la conclusión."]],
      "Hay que revisar costes, ingresos o la tasa exigida.",
    ),
  ],
};
