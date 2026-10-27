import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const voluntariadoServicioComunidad4esoLesson: InteractiveLesson = {
  slug: "voluntariado-servicio-comunidad-4eso",
  title: "7. Voluntariado tecnológico y proyectos de servicio a la comunidad",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Aprender sirviendo", [
      { kind: "steps", items: [
        "Un proyecto de **aprendizaje-servicio** resuelve una **necesidad real** de la comunidad mientras se aprenden competencias técnicas.",
        "Ejemplos: **reparar** equipos para una asociación, hacer **accesible** una web, instalar **sensores** de calidad del aire, diseñar **ayudas técnicas** impresas en 3D.",
        "El **voluntariado tecnológico** pone conocimientos al servicio de personas y entidades sin ánimo de lucro.",
        "Se trabaja **con** la comunidad, no **para** ella: se pregunta qué necesita y se evalúa con las personas usuarias.",
      ] },
    ], undefined, "stack"),
    slide("elige", "Elige el proyecto", [
      { kind: "text", text: "Compara varias ideas de servicio con criterios ponderados: utilidad, viabilidad, impacto y coste." },
    ], tool("matriz-decision-explorador"), "visual-top"),
    slide("presu", "Presupuesto realista", [
      { kind: "text", text: "Calcula los materiales y busca financiación o materiales reutilizados." },
    ], tool("presupuesto-explorador"), "visual-top"),
    slide("huella", "Impacto del proyecto", [
      { kind: "text", text: "Mide el impacto ambiental evitado por tu proyecto (por ejemplo, equipos reparados en vez de comprados)." },
    ], tool("eso4-huella-hogar-explorador"), "visual-top"),
    slide("fases", "Fases del proyecto", [
      { kind: "steps", items: [
        "**1. Detectar** la necesidad con la entidad o el grupo al que se sirve.",
        "**2. Especificar** y **planificar** (tareas, recursos, plazos, camino crítico).",
        "**3. Diseñar, construir y probar** con las personas usuarias.",
        "**4. Entregar, documentar y formar** para que el resultado se pueda mantener.",
        "**5. Evaluar** el impacto y **comunicar** lo aprendido; reconocer y respetar licencias.",
      ] },
    ]),
    calc("calc-rep", "Equipos reparados", "Un grupo repara 15 ordenadores que se iban a tirar. Cada ordenador nuevo costaría 400 €. ¿Cuántos € se han evitado?", nums(6000), "15 · 400 = 6 000 €.", "Equipos por precio."),
    calc("calc-co2", "CO₂ evitado", "Fabricar un ordenador emite unos 300 kg de CO₂. Si se reparan 15 en vez de fabricar nuevos, ¿cuántos kg de CO₂ se evitan (en teoría)?", nums(4500), "15 · 300 = 4 500 kg.", "Equipos por CO₂ de fabricación."),
    sort("clasifica-aps", "¿Es aprendizaje-servicio?", "Decide si cada actividad es un proyecto de servicio a la comunidad.",
      [["si", "Sí lo es", "emerald"], ["no", "No lo es", "rose"]],
      [["Instalar una wifi en un centro social con sus vecinos", "si"], ["Reparar ordenadores para una asociación", "si"], ["Hacer una web accesible para una ONG", "si"], ["Un trabajo teórico que nadie utiliza", "no"], ["Imponer una solución sin preguntar", "no"], ["Una práctica de taller sin destinatario real", "no"]],
      "Hay una necesidad real, un destinatario y un aprendizaje.",
    ),
    pick("check-com", "Con la comunidad", "¿Qué es lo primero en un proyecto de servicio a la comunidad?",
      "Escuchar a las personas para conocer su necesidad real",
      [["Decidir la solución en clase", "Puede no responder a la necesidad."], ["Comprar los materiales", "Es prematuro."], ["Hacer un vídeo", "Va al final."]],
      "El servicio solo es útil si responde a lo que se necesita.",
    ),
  ],
};
