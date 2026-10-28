import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const optimizacionProcesosFabricacionTi2Lesson: InteractiveLesson = {
  slug: "optimizacion-procesos-fabricacion-ti2",
  title: "4. Optimización de procesos de fabricación",
  subtitle: TECTI2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Fabricar mejor, no solo más", [
      { kind: "steps", items: [
        "Optimizar un proceso es **producir lo mismo con menos recursos**: menos tiempo, energía, material, defectos y residuos.",
        "Un residuo es una **pérdida**: material comprado, mano de obra y energía invertidos en algo que no se vende.",
        "La **fabricación ajustada (lean)** busca eliminar los **desperdicios**: sobreproducción, esperas, transporte, exceso de inventario, movimientos, defectos y procesos innecesarios.",
        "Para mejorar hay que **medir**: sin datos, las decisiones se basan en impresiones.",
      ] },
    ], undefined, "stack"),
    slide("oee", "Eficiencia global de un equipo (OEE)", [
      { kind: "text", text: "El OEE separa las pérdidas en tres: paradas, velocidad y defectos." },
    ], tool("ti2-oee-explorador"), "visual-top"),
    slide("metodos", "Herramientas de mejora", [
      { kind: "steps", items: [
        "**Mejora continua (kaizen)**: pequeños cambios constantes propuestos por quien hace el trabajo.",
        "**Ciclo PDCA**: planificar, hacer, verificar y actuar; se repite para consolidar cada mejora.",
        "**Mantenimiento preventivo y predictivo** con sensores para reducir averías.",
        "**Control estadístico**: gráficos de control que detectan una deriva del proceso antes de producir defectos.",
        "**Eficiencia de materiales**: optimizar cortes (anidado), reutilizar recortes y diseñar para reducir el material sin perder función.",
      ] },
    ]),
    calc("calc-disp", "Disponibilidad", "Un turno planificado de 480 min tiene 60 min de paradas. ¿Qué disponibilidad tiene, en %?", nums(87.5), "420 / 480 = 0,875.", "Tiempo operativo entre tiempo planificado."),
    calc("calc-cal", "Calidad", "De 700 piezas fabricadas, 665 son buenas. ¿Qué calidad hay, en %?", nums(95), "665 / 700 = 0,95.", "Buenas entre fabricadas."),
    calc("calc-oee", "OEE del turno", "Con disponibilidad 87,5 %, rendimiento 83,3 % y calidad 95 %, ¿cuánto vale el OEE, en %? (un decimal)", nums(69.3, 69.27), "0,875 · 0,833 · 0,95 ≈ 0,693: queda lejos del 85 % de referencia.", "Multiplica los tres factores."),
    sort("clasifica-perdida", "¿Qué pérdida es?", "Clasifica cada problema según el factor del OEE que penaliza.",
      [["dis", "Disponibilidad", "cobalt"], ["ren", "Rendimiento", "amber"], ["cal", "Calidad", "emerald"]],
      [["Avería de la máquina durante una hora", "dis"], ["Cambio de formato largo", "dis"], ["La máquina funciona más lenta de lo ideal", "ren"], ["Microparadas por atascos", "ren"], ["Piezas defectuosas que se desechan", "cal"], ["Reprocesar piezas fuera de tolerancia", "cal"]],
      "Cada tipo de pérdida pide una acción distinta.",
    ),
    pick("check-lean", "Un desperdicio", "Una línea fabrica más piezas de las que se piden y las almacena. ¿Qué desperdicio lean es?",
      "Sobreproducción y exceso de inventario",
      [["Espera", "No hay tiempos muertos."], ["Defecto", "Las piezas no son defectuosas."], ["Movimiento innecesario", "El problema es producir de más."]],
      "Producir más de lo que se necesita inmoviliza material y energía.",
    ),
  ],
};
