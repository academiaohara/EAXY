import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const herramientasSeguridadTallerLesson: InteractiveLesson = {
  slug: "herramientas-seguridad-taller",
  title: "8. Herramientas básicas y normas de seguridad en el taller",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("herramientas", "Cada trabajo, su herramienta", [
      { kind: "steps", items: [
        "**Medir y marcar**: regla, flexómetro, escuadra, lápiz y granete.",
        "**Cortar**: serrucho, sierra de marquetería, tijeras de chapa, cúter.",
        "**Perforar**: taladro, berbiquí, punzón.",
        "**Dar forma y alisar**: lima, escofina, lija, cepillo.",
        "**Unir y sujetar**: martillo, destornillador, llave inglesa, alicates, tornillo de banco, cola y pistola de silicona.",
      ] },
      { kind: "warning", title: "Ojo", text: "Una herramienta se usa **solo para lo que fue hecha**: un destornillador no es un cincel ni una palanca." },
    ], undefined, "stack"),
    sort("clasifica-herr", "Elige la herramienta", "Asigna cada herramienta al trabajo que realiza.",
      [["med", "Medir y marcar", "cobalt"], ["cor", "Cortar", "amber"], ["uni", "Unir y sujetar", "emerald"], ["ali", "Alisar y dar forma", "violet"]],
      [["Flexómetro", "med"], ["Escuadra", "med"], ["Serrucho", "cor"], ["Cúter", "cor"], ["Destornillador", "uni"], ["Alicates", "uni"], ["Lima", "ali"], ["Lija", "ali"]],
      "Las herramientas se agrupan según su función: medir, cortar, unir o alisar.",
    ),
    slide("equipo", "Equipo de protección", [
      { kind: "steps", items: [
        "**Gafas de protección**: al cortar, taladrar o lijar saltan virutas y polvo.",
        "**Guantes**: para manejar chapas o piezas con bordes cortantes (pero no con máquinas que giran).",
        "**Mascarilla**: al lijar o pintar para no respirar polvo ni vapores.",
        "**Bata o ropa ajustada**, pelo recogido y sin pulseras ni colgantes.",
      ] },
    ]),
    slide("peligros", "Encuentra los peligros del taller", [
      { kind: "text", text: "Observa el taller e intenta localizar las seis situaciones peligrosas. Después de cada una verás cómo se corrige." },
    ], tool("taller-peligros-explorador"), "visual-top"),
    slide("normas", "Normas básicas del taller", [
      { kind: "steps", items: [
        "**Orden y limpieza**: cada herramienta en su sitio, suelo despejado.",
        "**Atención** al trabajo: no correr, no hacer bromas ni distraerse.",
        "Antes de usar una herramienta, **comprueba que está en buen estado** (mango firme, filo limpio).",
        "**Corta alejándote** de tu cuerpo y de los demás; sujeta la pieza con tornillo de banco.",
        "Ante un accidente, **avisa al profesor** inmediatamente.",
      ] },
    ]),
    pick("check-gafas", "Cuándo usar gafas", "¿En cuál de estas situaciones es imprescindible ponerse gafas de protección?",
      "Al lijar o taladrar una pieza de madera",
      [["Al medir con una regla", "No genera partículas ni proyecciones."], ["Al leer las instrucciones", "No hay riesgo para los ojos."], ["Al dibujar un boceto", "Es una tarea sin riesgo."]],
      "Siempre que puedan saltar virutas, polvo o chispas hay que proteger los ojos.",
    ),
    pick("check-corte", "Cortar con cúter", "Vas a cortar un cartón con un cúter. ¿Cuál es la forma segura de hacerlo?",
      "Sobre una base de corte, con la mano libre detrás de la hoja y cortando hacia fuera del cuerpo",
      [["Sobre tus rodillas para mayor comodidad", "Un resbalón podría cortarte la pierna."], ["Con la mano libre justo delante de la hoja para sujetar el cartón", "Si la hoja se desliza te cortarías."], ["Cortando hacia ti para tener más fuerza", "Es una de las causas más frecuentes de accidente."]],
      "La mano libre debe estar siempre fuera de la trayectoria del filo.",
    ),
  ],
};
