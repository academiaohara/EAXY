import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maquinasMecanismosElementosLesson: InteractiveLesson = {
  slug: "maquinas-mecanismos-elementos",
  title: "1. Máquinas, mecanismos y sistemas mecánicos",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Máquina, mecanismo y elemento", [
      { kind: "definition", text: "Una **máquina** es un conjunto de elementos que transforma energía y realiza un trabajo útil. Un **mecanismo** es la parte de la máquina que transmite o transforma movimiento y fuerza." },
      { kind: "steps", items: [
        "**Elemento**: pieza o conjunto de piezas con una función (polea, engranaje, eje, leva).",
        "**Mecanismo**: elementos conectados que transmiten o transforman movimiento (cadena y piñones).",
        "**Máquina**: mecanismos más una fuente de energía y una función útil (bicicleta, taladro).",
        "**Estructura**: soporta cargas sin moverse; no es un mecanismo (cuadro de la bici).",
      ] },
    ], undefined, "stack"),
    slide("flujo", "Entrada, transmisión, transformación y salida", [
      { kind: "text", text: "Una forma útil de analizar cualquier máquina es seguir el **flujo de movimiento y fuerza** desde donde entra hasta donde se entrega." },
      { kind: "steps", items: [
        "**Entrada**: aporta la energía (motor, pedales, manivela).",
        "**Transmisión**: lleva el movimiento sin cambiar su tipo (poleas, engranajes, cadenas).",
        "**Transformación**: cambia el tipo de movimiento (giro ↔ vaivén o avance).",
        "**Salida**: realiza la tarea (broca, rueda, escobilla).",
      ] },
    ], anim("transmision-flujo"), "split"),
    slide("desmontaje", "Desmonta una máquina", [
      { kind: "text", text: "Elige una máquina y pulsa cada pieza: decide si recibe, transmite, transforma o entrega el movimiento." },
    ], tool("maquina-desmontaje-explorador", { n: 0 }), "visual-top"),
    slide("movimientos", "Tipos de movimiento y grados de libertad", [
      { kind: "compare",
        left: { title: "Movimientos básicos", text: "**Lineal** (a lo largo de una recta), **circular** (giro alrededor de un eje), **alternativo** (vaivén lineal) y **oscilante** (vaivén angular).", tone: "info" },
        right: { title: "Grados de libertad", text: "Movimientos independientes que puede hacer una pieza: un eje que gira tiene **1**; una pieza libre en el plano tiene **3**.", tone: "key" } },
      { kind: "text", text: "Un mecanismo útil **restringe** los grados de libertad hasta dejar un único movimiento controlado (por ejemplo, el émbolo solo se mueve en línea recta)." },
    ]),
    sort("clasifica-mov", "Tipo de movimiento", "Clasifica el movimiento de cada elemento.",
      [["cir", "Circular", "cobalt"], ["lin", "Lineal", "emerald"], ["alt", "Alternativo / oscilante", "amber"]],
      [["Rueda de bicicleta", "cir"], ["Hélice de ventilador", "cir"], ["Cabina de ascensor", "lin"], ["Cajón que se desliza", "lin"], ["Émbolo de una bomba", "alt"], ["Escobilla del limpiaparabrisas", "alt"]],
      "El giro alrededor de un eje es circular; el desplazamiento en línea recta, lineal; el vaivén, alternativo (recto) u oscilante (angular).",
    ),
    sort("clasifica-papel", "Papel en la cadena cinemática", "Asigna cada elemento de una bicicleta su papel.",
      [["ent", "Entrada", "emerald"], ["tra", "Transmisión", "cobalt"], ["sal", "Salida", "violet"]],
      [["Pedales", "ent"], ["Plato", "tra"], ["Cadena", "tra"], ["Piñón", "tra"], ["Rueda trasera", "sal"]],
      "El ciclista entrega movimiento por los pedales; plato, cadena y piñón lo transmiten; la rueda lo convierte en avance.",
    ),
    pick("check-transf", "¿Transmite o transforma?", "En un taladro, la palanca hace girar un piñón que mueve una cremallera y baja el husillo. ¿Qué hace ese mecanismo?",
      "Transforma: convierte un giro en un movimiento lineal",
      [["Transmite un giro a otro eje sin cambiar el tipo de movimiento", "El resultado es un avance lineal, no otro giro."], ["Es la fuente de energía de la máquina", "La energía la aporta el operario o el motor; esto solo cambia el tipo de movimiento."], ["Es una estructura fija", "Se mueve: la cremallera avanza."]],
      "Un mecanismo de transformación cambia el tipo de movimiento: aquí giro → lineal.",
    ),
  ],
};
