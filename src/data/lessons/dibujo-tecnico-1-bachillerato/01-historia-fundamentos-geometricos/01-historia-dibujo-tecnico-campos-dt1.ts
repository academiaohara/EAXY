import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const historiaDibujoTecnicoCamposDt1Lesson: InteractiveLesson = {
  slug: "historia-dibujo-tecnico-campos-dt1",
  title: "1. Un lenguaje para construir",
  subtitle: DT1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    {
      id: "pregunta-central", type: "storyboard", title: "¿Cómo construimos todos el mismo objeto?", scene: "dt1-plano-informacion",
      phases: [
        { eyebrow: "El problema", text: "Un dibujo bonito puede sugerir una pieza, pero obliga a imaginar lo que no se ve.", highlights: [{ text: "imaginar", tone: "amber" }] },
        { eyebrow: "Primera respuesta", text: "Las vistas describen cada cara y eliminan la ambigüedad de la forma.", highlights: [{ text: "vistas", tone: "cobalt" }, { text: "forma", tone: "cobalt" }] },
        { eyebrow: "Tamaño real", text: "Las medidas y la escala permiten fabricar el objeto con el tamaño correcto.", highlights: [{ text: "medidas", tone: "amber" }, { text: "escala", tone: "amber" }] },
        { eyebrow: "Lenguaje común", text: "Los símbolos y la normalización hacen que dos técnicos interpreten lo mismo.", highlights: [{ text: "símbolos", tone: "emerald" }, { text: "normalización", tone: "emerald" }] },
      ],
    },
    pick("diagnostica-plano", "Detecta la información que falta", "Un taller recibe una perspectiva de una pieza con buen aspecto, pero sin cotas ni escala. ¿Qué impide fabricarla con seguridad?", "No se conoce su tamaño real: distintas piezas podrían corresponder al mismo dibujo", [["Falta colorearla para distinguir las caras", "El color puede ayudar a verla, pero no fija ninguna dimensión."], ["Falta indicar quién hizo el dibujo", "La autoría no permite deducir el tamaño."], ["No se ha usado un programa CAD", "Un croquis manual bien acotado sí puede comunicar el tamaño."]], "La forma y el tamaño son informaciones distintas. Las cotas y la escala evitan que el fabricante tenga que adivinar.", "Pregúntate qué dato necesitarías para elegir una medida de material."),
    {
      id: "documentos-profesionales", type: "storyboard", title: "El mismo lenguaje, documentos distintos", scene: "dt1-plano-informacion", autoplay: false,
      phases: [
        { eyebrow: "Arquitectura", text: "Una planta organiza espacios y usa escalas como 1:50 para representar un edificio completo.", highlights: [{ text: "planta", tone: "cobalt" }, { text: "1:50", tone: "amber" }] },
        { eyebrow: "Mecánica", text: "Un plano de pieza añade cotas y tolerancias porque unas décimas pueden decidir si encaja.", highlights: [{ text: "tolerancias", tone: "amber" }] },
        { eyebrow: "Electricidad", text: "Un esquema prioriza conexiones y símbolos: importa cómo funciona el circuito.", highlights: [{ text: "conexiones", tone: "emerald" }, { text: "símbolos", tone: "emerald" }] },
        { eyebrow: "Territorio", text: "Un mapa topográfico usa curvas de nivel para convertir alturas en información legible.", highlights: [{ text: "curvas de nivel", tone: "violet" }] },
      ],
    },
    sort("elige-documento", "Elige el documento útil", "Clasifica cada encargo por el documento que permitiría tomar decisiones sin adivinar.", [["arq", "Planta o plano de espacios", "cobalt"], ["mec", "Plano de pieza", "amber"], ["ele", "Esquema de conexiones", "emerald"], ["top", "Mapa topográfico", "violet"]], [["Distribuir aulas en un instituto", "arq"], ["Comprobar si un eje entra en un rodamiento", "mec"], ["Localizar por qué no se enciende una lámpara", "ele"], ["Trazar una carretera evitando una fuerte pendiente", "top"], ["Definir el grosor de una arandela", "mec"], ["Decidir dónde situar una escalera", "arq"]], "El documento se elige por la decisión que debe permitir: espacio, fabricación, conexión o relieve."),
    slide("manual-cad", "La herramienta cambia; el lenguaje permanece", [
      { kind: "compare", left: { title: "A mano", text: "El croquis permite pensar, probar y comunicar una idea con rapidez.", tone: "info" }, right: { title: "Con CAD", text: "Facilita editar, medir, reutilizar y compartir un modelo con precisión.", tone: "ok" } },
      { kind: "rule", title: "Lo que ambos necesitan", text: "Vistas, escala, cotas, símbolos y normas siguen siendo necesarios: el programa no decide qué información debe comunicar el plano." },
    ]),
    {
      id: "transferencia", type: "storyboard", title: "Antes de entregar, comprueba el mensaje", scene: "dt1-plano-informacion", autoplay: false,
      phases: [
        { eyebrow: "Forma", text: "¿Se entiende la geometría completa sin imaginar caras ocultas?", highlights: [{ text: "geometría", tone: "cobalt" }] },
        { eyebrow: "Tamaño", text: "¿Las cotas y la escala permiten obtener las dimensiones reales?", highlights: [{ text: "cotas", tone: "amber" }, { text: "escala", tone: "amber" }] },
        { eyebrow: "Lectura", text: "¿Los símbolos siguen una convención que entiende quien recibirá el documento?", highlights: [{ text: "símbolos", tone: "emerald" }] },
      ],
    },
  ],
};
