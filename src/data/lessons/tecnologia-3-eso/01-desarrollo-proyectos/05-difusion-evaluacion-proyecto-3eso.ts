import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const difusionEvaluacionProyecto3esoLesson: InteractiveLesson = {
  slug: "difusion-evaluacion-proyecto-3eso",
  title: "5. Difusión y evaluación del proyecto",
  subtitle: TECESO3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Comunicar lo que has hecho", [
      { kind: "steps", items: [
        "**Difundir** es dar a conocer el proyecto: exposición oral, póster, vídeo, web o repositorio.",
        "Adapta el mensaje a la **audiencia**: compañeros, familias, empresas, comunidad.",
        "Una buena presentación tiene **problema → solución → resultados → mejoras**.",
        "Muestra **datos** (medidas, costes, pruebas), no solo opiniones.",
        "Si el proyecto resuelve un problema real, la difusión ayuda a que otros lo **reutilicen**.",
      ] },
    ], undefined, "stack"),
    slide("pruebas", "Evaluar frente a las especificaciones", [
      { kind: "text", text: "Compara las medidas finales con cada requisito para saber qué se cumplió." },
    ], tool("eso2-pruebas-prototipo-explorador"), "visual-top"),
    slide("univ", "Diseño para todas las personas", [
      { kind: "text", text: "Evalúa también si el producto es utilizable por personas con distintas capacidades." },
    ], tool("eso2-diseno-universal-explorador"), "visual-top"),
    slide("lic", "Compartir con licencia", [
      { kind: "steps", items: [
        "Una **licencia abierta** (Creative Commons, hardware abierto) dice qué pueden hacer otros con tu trabajo.",
        "**Reconocimiento**: se cita siempre al autor.",
        "Algunas permiten **modificar y compartir**; otras prohíben el uso comercial.",
        "Compartir un diseño abierto permite que la comunidad lo **mejore**.",
      ] },
    ]),
    calc("calc-eval", "Nota de cumplimiento", "Un prototipo cumple 7 de sus 8 requisitos. ¿Qué porcentaje cumple? (redondea a un entero)", nums(88, 87.5), "7 / 8 = 0,875 = 87,5 % ≈ 88 %.", "Cumplidos entre totales."),
    sort("clasifica-dif", "¿A quién y cómo?", "Relaciona cada formato con el mejor uso.",
      [["ora", "Exposición oral", "cobalt"], ["pos", "Póster o infografía", "amber"], ["web", "Web o repositorio", "emerald"]],
      [["Defender el proyecto ante la clase", "ora"], ["Responder preguntas en directo", "ora"], ["Resumir el proyecto en una página", "pos"], ["Mostrar en una feria", "pos"], ["Compartir planos y archivos 3D", "web"], ["Permitir que otros lo mejoren", "web"]],
      "El formato depende de la audiencia y del objetivo.",
    ),
    pick("check-mejora", "Cerrar el ciclo", "Tras evaluar, un requisito no se cumple. ¿Qué hace un buen equipo?",
      "Lo anota como mejora y propone cambios para una nueva versión",
      [["Lo oculta", "Los fallos enseñan."], ["Cambia el requisito para que se cumpla", "Se haría trampa."], ["Da el proyecto por perdido", "Se mejora con una nueva iteración."]],
      "El ciclo tecnológico es iterativo: evaluar lleva a mejorar.",
    ),
  ],
};
