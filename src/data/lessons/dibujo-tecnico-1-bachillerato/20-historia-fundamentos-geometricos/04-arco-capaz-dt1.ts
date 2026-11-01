import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { slide, tool } from "@/data/lessons/tec1-helpers";

export const arcoCapazDt1Lesson: InteractiveLesson = {
  slug: "arco-capaz-dt1",
  title: "4. Ver un segmento bajo el mismo ángulo",
  subtitle: DT1_SUBTITLES[20],
  stage: { theme: "board" },
  steps: [
    {
      id: "pregunta-central", type: "storyboard", title: "¿Desde dónde se ve AB con el mismo ángulo?", scene: "dt1-arco-capaz-invariancia",
      phases: [
        { eyebrow: "Observa", text: "Desde un punto P, las visuales hacia A y B forman un ángulo α.", highlights: [{ text: "ángulo α", tone: "amber" }] },
        { eyebrow: "Mueve P", text: "Al desplazar P por un arco concreto cambian las distancias, pero el ángulo permanece.", highlights: [{ text: "arco", tone: "violet" }, { text: "permanece", tone: "emerald" }] },
        { eyebrow: "Nombra el lugar", text: "Ese conjunto de posiciones es el arco capaz de α sobre el segmento AB.", highlights: [{ text: "arco capaz", tone: "emerald" }, { text: "AB", tone: "cobalt" }] },
      ],
      help: [{ label: "¿Qué permanece y qué cambia?", message: "Al mover P, compara por separado las longitudes PA, PB y la abertura entre ambas visuales; solo una de esas magnitudes define este lugar." }],
    },
    { id: "taller-1", type: "interactive_tool", tool: "dt1-workshop", scene: "view-angle", title: "Encuentra el encuadre de 90°", transfer: false, help: [{ label: "¿Qué condición compruebo?", message: "Para un ángulo recto, busca puntos de la semicircunferencia de diámetro AB por encima del segmento." }] },
    slide("explora-arco", "Comprueba la invariancia", [
      { kind: "text", text: "Cambia α y mueve P por el arco. Después separa P del arco y observa cómo deja de cumplirse la condición." },
      { kind: "compare", left: { title: "Sobre el arco", text: "∠APB mantiene el valor elegido.", tone: "ok" }, right: { title: "Fuera del arco", text: "El ángulo aumenta o disminuye.", tone: "warn" } },
      { kind: "text", text: "Con α = 90° aparece la semicircunferencia de diámetro AB: es la propiedad de Tales vista en la lección 2." },
    ], tool("dt1-arco-capaz-explorador"), "visual-top"),
    {
      id: "construccion", type: "storyboard", title: "Construye el lugar, no lo memorices", scene: "dt1-arco-capaz-construccion",
      phases: [
        { eyebrow: "Centro posible", text: "El centro O equidista de A y B, por eso debe estar en la mediatriz de AB.", highlights: [{ text: "equidista", tone: "emerald" }, { text: "mediatriz", tone: "violet" }] },
        { eyebrow: "Dirección del radio", text: "La perpendicular a la tangente trazada por A corta la mediatriz en O.", highlights: [{ text: "perpendicular", tone: "cobalt" }, { text: "O", tone: "cobalt" }] },
        { eyebrow: "Trazado final", text: "Con centro O y radio OA dibujamos la circunferencia; el tramo útil es el arco capaz.", highlights: [{ text: "arco capaz", tone: "emerald" }] },
      ],
      help: [{ label: "¿De dónde sale el centro?", message: "Combina dos condiciones sobre O: debe estar a igual distancia de A y B, y el radio OA debe ser perpendicular a la tangente en A." }],
    },
    { id: "taller-2", type: "interactive_tool", tool: "dt1-workshop", scene: "view-angle", title: "Busca un encuadre de 60°", transfer: true, help: [{ label: "¿Qué condición compruebo?", message: "Con 60° la cámara debe alejarse respecto a la posición central de 90°. Observa el ángulo, no solo una distancia." }] },
    {
      id: "localizacion-dos-arcos", type: "storyboard", title: "Localiza una posición con dos observaciones", scene: "dt1-localizacion-dos-arcos", autoplay: false,
      phases: [
        { eyebrow: "Primera observación", text: "Ver A y B bajo 40° sitúa al observador en un primer arco capaz.", highlights: [{ text: "primer arco", tone: "cobalt" }] },
        { eyebrow: "Segunda observación", text: "Ver B y C bajo 55° genera un segundo arco capaz.", highlights: [{ text: "segundo arco", tone: "violet" }] },
        { eyebrow: "Posición", text: "La intersección compatible de los dos arcos determina la ubicación del observador.", highlights: [{ text: "intersección", tone: "emerald" }, { text: "ubicación", tone: "emerald" }] },
      ],
      help: [{ label: "Ampliación: calcular el radio", message: "Si conoces AB y α, el radio es R = AB / (2 · sen α). La construcción gráfica anterior permite resolver el problema sin empezar por la fórmula." }],
    },
  ],
};
