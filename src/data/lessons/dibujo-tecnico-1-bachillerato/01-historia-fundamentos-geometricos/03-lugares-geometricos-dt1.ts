import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { slide, tool } from "@/data/lessons/tec1-helpers";

export const lugaresGeometricosDt1Lesson: InteractiveLesson = {
  slug: "lugares-geometricos-dt1",
  title: "3. Encontrar puntos mediante condiciones",
  subtitle: DT1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    {
      id: "pregunta-central", type: "storyboard", title: "¿Dónde están todos los puntos que cumplen una condición?", scene: "dt1-lugares-condiciones",
      phases: [
        { eyebrow: "De un punto a un conjunto", text: "Un lugar geométrico reúne todos los puntos que cumplen una condición y excluye los demás.", highlights: [{ text: "todos", tone: "cobalt" }, { text: "condición", tone: "cobalt" }] },
        { eyebrow: "Dos puntos fijos", text: "Los puntos que equidistan de A y B forman su mediatriz.", highlights: [{ text: "equidistan", tone: "emerald" }, { text: "mediatriz", tone: "violet" }] },
        { eyebrow: "Dos lados fijos", text: "Los puntos que equidistan de los lados de un ángulo forman su bisectriz.", highlights: [{ text: "equidistan", tone: "emerald" }, { text: "bisectriz", tone: "amber" }] },
      ],
      help: [{ label: "¿Cómo descubro el lugar?", message: "Mueve mentalmente P y pregunta qué medida debe permanecer igual. La igualdad te dice qué trazado contiene todas las posiciones válidas." }],
    },
    { id: "taller-1", type: "interactive_tool", tool: "dt1-workshop", scene: "locus", title: "Sitúa la instalación con dos condiciones", transfer: false, help: [{ label: "¿Qué condición compruebo?", message: "Para igualar PA y PB, busca primero la mediatriz; después ajusta la distancia de 5 km." }] },
    slide("explora-lugares", "Mueve P y comprueba la condición", [
      { kind: "text", text: "Elige circunferencia, mediatriz, bisectriz o paralelas. Mueve P primero fuera del lugar, predice qué medidas serán distintas y llévalo después a una posición que las iguale." },
      { kind: "warning", title: "No busques un único punto", text: "Encuentra varias posiciones correctas: el conjunto completo es el lugar geométrico." },
    ], tool("dt1-lugar-geometrico-explorador"), "visual-top"),
    {
      id: "intersecciones", type: "storyboard", title: "Dos condiciones se resuelven a la vez", scene: "dt1-interseccion-lugares",
      phases: [
        { eyebrow: "Sin encuentro", text: "Si dos lugares no se cortan, ninguna posición cumple ambas condiciones.", highlights: [{ text: "ninguna", tone: "rose" }] },
        { eyebrow: "Tangencia", text: "Si solo se tocan, existe una única solución.", highlights: [{ text: "única solución", tone: "amber" }] },
        { eyebrow: "Dos cruces", text: "Si se cortan en dos puntos, ambos son soluciones y hace falta otro dato para elegir.", highlights: [{ text: "dos puntos", tone: "emerald" }, { text: "otro dato", tone: "cobalt" }] },
      ],
      help: [{ label: "¿Por qué cambia el número de soluciones?", message: "Imagina que desplazas uno de los lugares: puede quedar separado, tocar al otro o atravesarlo. Cada contacto común es una solución." }],
    },
    { id: "taller-2", type: "interactive_tool", tool: "dt1-workshop", scene: "locus", title: "Resuelve otra separación entre referencias", transfer: true, help: [{ label: "¿Qué condición compruebo?", message: "Hay una solución a cada lado del segmento. Refleja la coordenada y y comprueba ambas." }] },
    slide("transferencia-localizacion", "Diseña una localización", [
      { kind: "story", text: "Una antena debe quedar a 5 km de A y a la misma distancia de los pueblos B y C. Traza primero la circunferencia de centro A y radio 5 km; después, la mediatriz de BC. Cada intersección es una ubicación posible." },
      { kind: "rule", title: "Método", text: "Traduce cada condición a un lugar, dibuja los lugares e interpreta sus intersecciones. En la próxima lección una condición angular generará un nuevo lugar: el arco capaz." },
    ]),
  ],
};
