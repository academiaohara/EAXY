import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

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
    pick("predice-faro", "Predice antes de trazar", "Dos faros A y B deben oírse con la misma intensidad. Si solo importa la distancia, ¿por dónde puede moverse el barco?", "Por la mediatriz de AB, porque todos sus puntos equidistan de ambos faros", [["Por la circunferencia con centro A", "Esa condición solo fija la distancia a A."], ["Por el propio segmento AB", "Salvo el punto medio, sus puntos no equidistan de A y B."], ["Por cualquier paralela a AB", "La distancia a los faros cambia a lo largo de la paralela."]], "Traducir «misma distancia a A y B» conduce directamente a la mediatriz."),
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
    sort("traduce-condicion", "Traduce condiciones a lugares", "Asocia cada condición con el trazado que contiene todas sus soluciones.", [["cir", "Circunferencia", "cobalt"], ["med", "Mediatriz", "violet"], ["bis", "Bisectriz", "amber"], ["par", "Dos paralelas", "emerald"]], [["A 4 cm de un punto O", "cir"], ["A igual distancia de A y B", "med"], ["A igual distancia de dos paredes que forman una esquina", "bis"], ["A 2 m del borde recto de una carretera", "par"], ["Centro de una circunferencia que pasa por A y B", "med"], ["Posiciones alcanzadas por un radar con radio fijo", "cir"]], "La frase de distancia es el dato operativo: identifica qué elementos permanecen fijos y qué igualdad debe cumplir P."),
    slide("transferencia-localizacion", "Diseña una localización", [
      { kind: "story", text: "Una antena debe quedar a 5 km de A y a la misma distancia de los pueblos B y C. Traza primero la circunferencia de centro A y radio 5 km; después, la mediatriz de BC. Cada intersección es una ubicación posible." },
      { kind: "rule", title: "Método", text: "Traduce cada condición a un lugar, dibuja los lugares e interpreta sus intersecciones. En la próxima lección una condición angular generará un nuevo lugar: el arco capaz." },
    ]),
  ],
};
