import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tecnologiaNecesidadesHumanasLesson: InteractiveLesson = {
  slug: "tecnologia-necesidades-humanas",
  title: "1. La tecnología y las necesidades humanas",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "La tecnología nace de un problema", [
      { kind: "definition", text: "La **tecnología** es el conjunto de conocimientos, técnicas y productos con los que las personas resuelven problemas y satisfacen **necesidades**, transformando su entorno." },
      { kind: "steps", title: "Del problema a la innovación", items: [
        "**Necesidad**: algo que falta o que se quiere conseguir (moverse sin esfuerzo, tener luz de noche).",
        "**Problema**: obstáculo concreto que impide cubrirla (la bicicleta no se ve en la oscuridad).",
        "**Idea**: posible camino para resolverlo (una luz alimentada por el pedaleo).",
        "**Solución**: idea desarrollada, probada y que funciona (dinamo de buje).",
        "**Innovación**: solución nueva que además se **usa** y mejora algo de forma apreciable.",
      ] },
      { kind: "warning", title: "Invención no es innovación", text: "Una invención es un objeto o método nuevo. Solo es innovación cuando llega a usuarios reales y cambia cómo se hace algo." },
    ], undefined, "stack"),
    slide("explora", "Cada objeto responde a una necesidad", [
      { kind: "text", text: "Pulsa distintos objetos y fíjate en el patrón: detrás de cada uno hay **alguien con una necesidad** y un **problema concreto**." },
      { kind: "text", text: "Filtra por tipo: la tecnología no es solo industria; también atiende la **accesibilidad**, lo **social** y lo **ambiental**." },
    ], tool("objeto-problema-explorador", { a: 1 }), "visual-top"),
    slide("contexto", "Usuarios, contexto y limitaciones", [
      { kind: "definition", text: "Un buen planteamiento nombra **para quién** (usuarios), **dónde y cuándo** (contexto) y **qué límites** hay (tiempo, dinero, materiales, seguridad, normativa)." },
      { kind: "compare",
        left: { title: "Planteamiento pobre", text: "«Hace falta una aplicación para ahorrar agua.»", tone: "warn" },
        right: { title: "Planteamiento útil", text: "«Los vecinos de un bloque de 24 viviendas no saben cuánta agua gastan; necesitan ver su consumo semanal con un coste inferior a 15 € por vivienda.»", tone: "ok" } },
      { kind: "warning", title: "No metas la solución en el problema", text: "«Necesito una app» ya es una solución. El problema es qué no pueden hacer los usuarios hoy. Si fijas la solución demasiado pronto, no exploras alternativas." },
    ]),
    sort("clasifica-necesidad", "¿Qué tipo de necesidad atienden?", "Reparte cada tecnología según la necesidad principal que cubre.",
      [["acc", "Accesibilidad", "cobalt"], ["amb", "Ambiental", "emerald"], ["ind", "Industrial", "amber"]],
      [["Rampa con pendiente normalizada", "acc"], ["Subtítulos automáticos", "acc"], ["Planta de reciclaje de plásticos", "amb"], ["Panel fotovoltaico en un tejado", "amb"], ["Robot soldador en una cadena de montaje", "ind"], ["Sensor de vibraciones en un motor", "ind"]],
      "La rampa y los subtítulos eliminan barreras de uso; reciclar y generar energía limpia reducen el impacto ambiental; el robot y el sensor mejoran la producción y el mantenimiento.",
      "Pregúntate: ¿quién se beneficia y qué obstáculo desaparece?"),
    pick("check-problema", "¿Cuál es un buen problema?", "Un grupo quiere mejorar el reparto del material en el taller del centro. ¿Cuál de estos enunciados está planteado como **problema** y no como solución?",
      "Los alumnos tardan 8 minutos en localizar una herramienta y pierden un tercio de la clase",
      [["Hay que comprar un armario nuevo con cerraduras", "Es una solución concreta: ya has decidido qué hacer antes de entender el problema."], ["Instalar un programa de inventario en el ordenador", "También es una solución; el problema no se ha descrito."], ["Todo el mundo debería ser más ordenado", "Es una opinión sin usuarios, contexto ni forma de medir si mejora."]],
      "Un problema describe lo que no funciona, para quién y con qué efecto medible. Las soluciones llegan después, tras investigar y comparar alternativas.",
      "Busca el enunciado con datos y sin objeto propuesto."),
    pick("check-innovacion", "Invención o innovación", "Una empresa patenta un sensor de humedad muy ingenioso, pero nunca llega a venderse ni a usarse. ¿Qué es?",
      "Una invención, pero no una innovación",
      [["Una innovación, porque es nueva", "La novedad no basta: la innovación exige que se use y aporte valor."], ["Ninguna de las dos, porque no se vende", "Sigue siendo una invención: existe y es original, aunque no se haya extendido."], ["Una necesidad", "Las necesidades son lo que falta, no el objeto que se crea."]],
      "Inventar es crear algo nuevo; innovar es lograr que ese algo se adopte y mejore una situación real.",
    ),
    slide("actividad", "Actividad: redacta el planteamiento", [
      { kind: "steps", title: "Plantilla de cinco líneas", items: [
        "**Usuarios**: quién tiene el problema.",
        "**Contexto**: dónde y cuándo ocurre.",
        "**Problema**: qué no pueden hacer o qué les cuesta hoy (con un dato si lo hay).",
        "**Límites**: dinero, tiempo, seguridad, materiales.",
        "**Criterio de éxito**: cómo sabremos que está resuelto.",
      ] },
      { kind: "example", title: "Ejemplo", lines: [
        { math: "\\text{Usuarios: personas mayores del barrio}" },
        { math: "\\text{Problema: no oyen el timbre cuando están en el patio}", note: "dato: el 40 % tarda más de 2 min en abrir" },
        { math: "\\text{Éxito: avisar con luz visible a menos de } 10\\ \\text{m}" },
      ] },
      { kind: "text", text: "Elige un problema de tu centro y escribe sus cinco líneas. Si en alguna aparece un objeto concreto como respuesta, **reformúlala**." },
    ], undefined, "stack"),
  ],
};
