import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const evaluacionImpactoAmbientalSocialTi2Lesson: InteractiveLesson = {
  slug: "evaluacion-impacto-ambiental-social-ti2",
  title: "1. Evaluación del impacto ambiental y social",
  subtitle: TECTI2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Antes de construir, evaluar", [
      { kind: "steps", items: [
        "Toda obra, instalación o producto **transforma su entorno**: consume recursos, emite residuos y cambia el paisaje y la vida de las personas.",
        "La **evaluación de impacto ambiental (EIA)** es el procedimiento que obliga a **prever esos efectos antes de aprobar** el proyecto, no a lamentarlos después.",
        "Se estudian impactos **ambientales** (aire, agua, suelo, biodiversidad, paisaje) y **sociales** (empleo, salud, patrimonio, convivencia).",
        "Un impacto se describe por su **signo** (positivo o negativo), **magnitud**, **importancia**, **duración** y si es **reversible**.",
      ] },
    ], undefined, "stack"),
    slide("fases", "Las cuatro fases", [
      { kind: "text", text: "Mira cómo se encadenan: identificar, valorar, corregir y vigilar." },
    ], anim("ti2-fases-eia"), "visual-top"),
    slide("matriz", "La matriz de impacto", [
      { kind: "text", text: "Compara tres proyectos y comprueba cuánto cambian los resultados al aplicar medidas correctoras." },
    ], tool("ti2-eia-explorador"), "visual-top"),
    slide("medidas", "Prevenir, corregir, compensar", [
      { kind: "steps", items: [
        "**Preventivas**: evitan el impacto desde el diseño (otro emplazamiento, otra tecnología).",
        "**Correctoras**: reducen el impacto que no se ha podido evitar (pantallas acústicas, depuradoras, filtros).",
        "**Compensatorias**: restauran o compensan lo inevitable (reforestación, restauración de una cantera).",
        "Se analiza también la **alternativa cero** (no hacer el proyecto) y se elige con la matriz **y** con la participación pública.",
      ] },
    ]),
    calc("calc-celda", "Una celda de la matriz", "Un efecto de magnitud −6 sobre un factor de importancia 7 vale (magnitud × importancia)…", nums(-42), "−6 · 7 = −42 puntos.", "Multiplica con su signo."),
    calc("calc-total", "Valoración del parque fotovoltaico", "Magnitudes 8, −1, −4, −3, −4 y 4 con importancias 8, 9, 7, 8, 5 y 6. ¿Cuánto suma la valoración?", nums(7), "64 − 9 − 28 − 24 − 20 + 24 = 7: ligeramente positivo.", "Suma los seis productos."),
    sort("clasifica-medidas", "¿Qué tipo de medida es?", "Clasifica cada actuación.",
      [["pre", "Preventiva", "cobalt"], ["cor", "Correctora", "amber"], ["com", "Compensatoria", "emerald"]],
      [["Trazar una carretera lejos de una zona protegida", "pre"], ["Elegir una tecnología que no emite el contaminante", "pre"], ["Instalar filtros en la chimenea", "cor"], ["Construir una depuradora antes del vertido", "cor"], ["Reforestar otra zona por los árboles talados", "com"], ["Restaurar el terreno al cerrar una mina", "com"]],
      "Prevenir evita, corregir reduce y compensar repone lo que no se pudo evitar.",
    ),
    pick("check-vigilancia", "El plan de vigilancia", "¿Para qué sirve el plan de vigilancia ambiental?",
      "Para medir durante la vida del proyecto si los impactos son los previstos y corregirlos",
      [["Para sustituir a la evaluación previa", "Es posterior y complementario."], ["Para decidir si se aprueba el proyecto", "Eso ocurre antes."], ["Para calcular el beneficio económico", "Es un control ambiental."]],
      "La vigilancia comprueba que lo previsto se cumple y activa nuevas correcciones.",
    ),
  ],
};
