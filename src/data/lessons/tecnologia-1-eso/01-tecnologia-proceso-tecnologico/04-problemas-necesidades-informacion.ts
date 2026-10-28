import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const problemasNecesidadesInformacionLesson: InteractiveLesson = {
  slug: "problemas-necesidades-informacion",
  title: "4. Identificar un problema y buscar información",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("problema", "Definir bien el problema", [
      { kind: "definition", text: "Un buen proyecto empieza por **definir el problema con precisión**: qué ocurre, a quién afecta y qué límites hay (tiempo, dinero, materiales)." },
      { kind: "compare",
        left: { title: "Enunciado vago", text: "«Hay que hacer algo con las mochilas.»", tone: "warn" },
        right: { title: "Enunciado preciso", text: "«Necesitamos un soporte para colgar 25 mochilas en la clase sin que toquen el suelo; con madera del taller y un coste máximo de 20 €.»", tone: "key" } },
    ], undefined, "stack"),
    slide("requisitos", "Requisitos y restricciones", [
      { kind: "steps", items: [
        "**Requisitos**: lo que la solución debe cumplir (aguantar 5 kg por gancho, ser fácil de limpiar).",
        "**Restricciones**: los límites del proyecto (presupuesto, plazo, herramientas disponibles).",
        "**Criterios de éxito**: cómo comprobaremos que funciona (¿aguanta el peso? ¿cabe en la pared?).",
      ] },
      { kind: "text", text: "Cuanto más concreto sea el enunciado, más fácil resulta evaluar el resultado final." },
    ]),
    sort("clasifica-req", "Requisito o restricción", "Clasifica cada condición de un proyecto de portalápices.",
      [["req", "Requisito (lo que debe cumplir)", "emerald"], ["res", "Restricción (límite del proyecto)", "amber"]],
      [["Debe sostener al menos 10 lápices", "req"], ["No debe volcarse al sacar un lápiz", "req"], ["Hay que terminarlo en 3 sesiones de taller", "res"], ["Presupuesto máximo de 8 €", "res"], ["Solo se puede usar madera de los recortes", "res"], ["Debe quedar a la altura de la mano", "req"]],
      "Los requisitos describen lo que el objeto debe lograr; las restricciones son los límites en los que hay que trabajar.",
    ),
    slide("fuentes", "Buscar información fiable", [
      { kind: "text", text: "Antes de diseñar conviene saber **qué soluciones ya existen** y qué materiales o técnicas se usan. No siempre hay que inventar desde cero." },
      { kind: "steps", items: [
        "Observa objetos parecidos: ¿cómo están hechos? ¿qué fallos tienen?",
        "Consulta fuentes fiables: libros, páginas de museos o universidades, catálogos de fabricantes.",
        "Contrasta al menos dos fuentes y anota de dónde procede cada dato.",
        "Pregunta a las personas que usarán el producto: ¿qué necesitan realmente?",
      ] },
      { kind: "warning", title: "Ojo", text: "No todo lo que aparece en internet es cierto. Desconfía de las páginas sin autor, sin fecha o que solo quieren venderte algo." },
    ]),
    slide("evalua-fuente", "Evalúa cuatro fuentes", [
      { kind: "text", text: "Revisa cada fuente con cinco criterios: autor, fecha, datos citados, intención y experiencia." },
    ], tool("fuente-fiable-explorador", { n: 0 }), "visual-top"),
    pick("check-fuente", "¿Qué fuente es más fiable?", "Para saber qué madera aguanta mejor la humedad, ¿qué fuente es más fiable?",
      "Un manual de carpintería o la web de una universidad de ingeniería forestal",
      [["Un comentario anónimo en un foro", "Sin autor ni datos contrastables no se puede confiar."], ["Un vídeo sin fuentes de un desconocido", "Puede contener errores y no cita datos."], ["Un anuncio de una tienda de muebles", "Su objetivo es vender, no informar con neutralidad."]],
      "Una fuente fiable tiene autor identificado, es especializada y aporta datos que se pueden contrastar.",
    ),
    pick("check-enunciado", "Enunciado de un problema", "¿Cuál de estos es el mejor enunciado para empezar un proyecto?",
      "Diseñar un cargador de móvil de mesa para dos dispositivos, de menos de 15 € y fabricable en el taller",
      [["Hacer algo para los móviles", "Es demasiado vago: no dice qué problema se resuelve ni los límites."], ["Un cargador bonito", "«Bonito» no se puede medir ni comprobar."], ["Cargadores", "Es solo un tema, no un problema planteado."]],
      "Un enunciado útil dice qué se quiere conseguir, para quién y con qué límites medibles.",
    ),
  ],
};
