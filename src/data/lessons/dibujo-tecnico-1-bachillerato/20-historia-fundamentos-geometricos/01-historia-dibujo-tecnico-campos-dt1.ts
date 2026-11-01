import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { slide } from "@/data/lessons/tec1-helpers";

export const historiaDibujoTecnicoCamposDt1Lesson: InteractiveLesson = {
  slug: "historia-dibujo-tecnico-campos-dt1",
  title: "1. Un lenguaje para construir",
  subtitle: DT1_SUBTITLES[20],
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
      help: [{ label: "¿Qué cambia en cada fase?", message: "Compara qué duda elimina cada capa del plano: primero la forma, después el tamaño y por último la interpretación común." }],
    },
    { id: "taller-1", type: "interactive_tool", tool: "dt1-workshop", scene: "plan-repair", title: "Repara el plano antes de fabricar", transfer: false, help: [{ label: "¿Qué condición compruebo?", message: "Compara las dimensiones reales del encargo con las medidas en papel. Las cotas no son las longitudes que mides en el documento." }] },
    {
      id: "documentos-profesionales", type: "storyboard", title: "El mismo lenguaje, documentos distintos", scene: "dt1-documentos-profesionales", autoplay: false,
      phases: [
        { eyebrow: "Arquitectura", text: "Una planta organiza espacios y usa escalas como 1:50 para representar un edificio completo.", highlights: [{ text: "planta", tone: "cobalt" }, { text: "1:50", tone: "amber" }] },
        { eyebrow: "Mecánica", text: "Un plano de pieza añade cotas y tolerancias porque unas décimas pueden decidir si encaja.", highlights: [{ text: "tolerancias", tone: "amber" }] },
        { eyebrow: "Electricidad", text: "Un esquema prioriza conexiones y símbolos: importa cómo funciona el circuito.", highlights: [{ text: "conexiones", tone: "emerald" }, { text: "símbolos", tone: "emerald" }] },
        { eyebrow: "Territorio", text: "Un mapa topográfico usa curvas de nivel para convertir alturas en información legible.", highlights: [{ text: "curvas de nivel", tone: "violet" }] },
      ],
      help: [{ label: "¿Cómo comparo los documentos?", message: "Piensa qué decisión debe tomar quien lo recibe: distribuir espacio, fabricar, conectar o comprender el relieve." }],
    },
    { id: "taller-2", type: "interactive_tool", tool: "dt1-workshop", scene: "plan-repair", title: "Nuevo encargo: otra placa", transfer: true, help: [{ label: "¿Qué condición compruebo?", message: "La escala cambia la proporción papel/realidad, pero las cotas siguen expresando el tamaño de fabricación." }] },
    slide("manual-cad", "Del croquis al lenguaje técnico compartido", [
      { kind: "compare", left: { title: "A mano", text: "El croquis permite pensar, probar y comunicar una idea con rapidez.", tone: "info" }, right: { title: "Con CAD", text: "Facilita editar, medir, reutilizar y compartir un modelo con precisión.", tone: "ok" } },
      { kind: "rule", title: "Lo que ambos necesitan", text: "Los trazados geométricos, la perspectiva del Renacimiento y la geometría descriptiva hicieron posible pasar de observar a definir objetos. La industrialización añadió normas compartidas y el CAD facilitó su edición. El cambio de herramienta mantiene la necesidad de un mensaje preciso." },
    ]),
    {
      id: "transferencia", type: "storyboard", title: "Antes de entregar, comprueba el mensaje", scene: "dt1-plano-revision", autoplay: false,
      phases: [
        { eyebrow: "Forma", text: "¿Se entiende la geometría completa sin imaginar caras ocultas?", highlights: [{ text: "geometría", tone: "cobalt" }] },
        { eyebrow: "Tamaño", text: "¿Las cotas y la escala permiten obtener las dimensiones reales?", highlights: [{ text: "cotas", tone: "amber" }, { text: "escala", tone: "amber" }] },
        { eyebrow: "Lectura", text: "¿Los símbolos siguen una convención que entiende quien recibirá el documento?", highlights: [{ text: "símbolos", tone: "emerald" }] },
      ],
      help: [{ label: "¿Cómo reviso mi propio plano?", message: "Pide a otra persona que responda tres preguntas sin tu ayuda: qué forma tiene, cuánto mide y qué significan sus signos." }],
    },
  ],
};
