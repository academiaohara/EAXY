import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const redesLocalesTopologias3esoLesson: InteractiveLesson = {
  slug: "redes-locales-topologias-3eso",
  title: "2. Redes informáticas y topologías",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Equipos que comparten", [
      { kind: "definition", text: "Una **red informática** es un conjunto de dispositivos conectados para **compartir información y recursos** (archivos, impresoras, conexión a Internet)." },
      { kind: "steps", items: [
        "**LAN**: red local (casa, aula). **WAN**: red de área extensa (entre ciudades). **Internet**: la red de redes.",
        "**Nodo**: cada equipo conectado. **Medio**: cable o aire.",
        "**Switch (conmutador)**: conecta los equipos de una LAN. **Router**: conecta la LAN con otras redes (Internet).",
        "**Punto de acceso**: da cobertura Wi-Fi.",
      ] },
    ], undefined, "stack"),
    slide("topo", "Formas de conectarse", [
      { kind: "text", text: "Elige una topología y el número de equipos. Mira los cables que hacen falta y qué pasa si algo falla." },
    ], tool("eso3-topologia-explorador"), "visual-top"),
    slide("casa", "La red de una casa o un aula", [
      { kind: "steps", items: [
        "Normalmente es una **estrella**: todos los equipos se conectan a un **switch** o al **router**.",
        "El **router** de casa suele incluir switch, punto de acceso Wi-Fi y conexión al operador.",
        "Los equipos pueden conectarse por **cable Ethernet** (más estable) o por **Wi-Fi**.",
      ] },
    ]),
    calc("calc-malla", "Una red en malla", "En una red en malla completa de 6 equipos, cada equipo se une con todos los demás. ¿Cuántos enlaces hacen falta? (n · (n − 1) / 2)", nums(15), "6 · 5 / 2 = 15 enlaces.", "Cada pareja de equipos necesita un enlace."),
    calc("calc-estrella", "Una estrella", "Una red en estrella con 8 equipos y un switch central, ¿cuántos cables necesita?", nums(8), "Uno por equipo: 8 cables.", "Un cable de cada equipo al switch."),
    sort("clasifica-red", "Topología", "Relaciona cada descripción con su topología.",
      [["est", "Estrella", "cobalt"], ["bus", "Bus", "amber"], ["mal", "Malla", "emerald"]],
      [["Todos los equipos se conectan a un switch central", "est"], ["Si falla el switch, se cae la red", "est"], ["Todos comparten un único cable troncal", "bus"], ["Un corte en el troncal afecta a toda la red", "bus"], ["Cada equipo se conecta con varios otros", "mal"], ["Si falla un enlace, hay rutas alternativas", "mal"]],
      "La estrella depende de un nodo central; la malla ofrece rutas alternativas pero cuesta más.",
    ),
    pick("check-router", "Router y switch", "¿Qué diferencia hay entre un switch y un router?",
      "El switch conecta equipos de una misma red; el router conecta redes distintas, como la tuya con Internet",
      [["Son lo mismo", "Tienen funciones distintas."], ["El router solo sirve para el Wi-Fi", "Su función es encaminar entre redes."], ["El switch conecta con Internet", "Eso lo hace el router."]],
      "El router encamina los paquetes entre redes distintas.",
    ),
  ],
};
