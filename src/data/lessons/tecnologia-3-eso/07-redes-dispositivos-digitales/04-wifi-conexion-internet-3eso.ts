import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const wifiConexionInternet3esoLesson: InteractiveLesson = {
  slug: "wifi-conexion-internet-3eso",
  title: "4. Wi-Fi y conexión a Internet",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo llega Internet a casa", [
      { kind: "steps", items: [
        "Un **proveedor** (operador) te conecta con **fibra óptica**, cable o redes móviles.",
        "El **módem o la ONT** convierte la señal del operador; el **router** la reparte por tu red local.",
        "La **velocidad contratada** se mide en **Mbps** (megabits por segundo), distinta para **bajada** y **subida**.",
        "El **Wi-Fi** es la forma sin cables de conectar: depende de la **distancia**, las **paredes** y la **banda**.",
      ] },
    ], undefined, "stack"),
    slide("wifi", "La cobertura Wi-Fi", [
      { kind: "text", text: "Aléjate del router, añade paredes y cambia de banda. Observa también cómo se reparte la velocidad entre varios dispositivos." },
    ], tool("eso3-wifi-explorador"), "visual-top"),
    slide("mejoras", "Mejorar la señal", [
      { kind: "steps", items: [
        "**Coloca el router** en un lugar **central** y alto, lejos de metales y microondas.",
        "Usa **5 GHz** si estás cerca y **2,4 GHz** si hay muchas paredes.",
        "Añade **repetidores** o **puntos de acceso** conectados por cable en casas grandes.",
        "Para tareas exigentes, usa **cable Ethernet**.",
      ] },
    ]),
    calc("calc-reparto", "Reparto de velocidad", "Una conexión de 600 Mbps se reparte por igual entre 4 dispositivos que descargan a la vez. ¿Cuántos Mbps recibe cada uno?", nums(150), "600 / 4 = 150 Mbps.", "Velocidad entre dispositivos."),
    calc("calc-mbs", "De Mbps a MB/s", "Una conexión de 100 Mbps, ¿cuántos megabytes por segundo descarga como máximo? (1 byte = 8 bits)", nums(12.5), "100 / 8 = 12,5 MB/s.", "Divide entre 8."),
    sort("clasifica-banda", "Banda de 2,4 GHz o de 5 GHz", "Relaciona cada característica con su banda.",
      [["b24", "2,4 GHz", "amber"], ["b5", "5 GHz", "cobalt"]],
      [["Mayor alcance", "b24"], ["Atraviesa mejor las paredes", "b24"], ["Más interferencias con otros aparatos", "b24"], ["Más velocidad", "b5"], ["Menos interferencias", "b5"], ["Alcance menor", "b5"]],
      "2,4 GHz llega más lejos; 5 GHz ofrece más velocidad a corta distancia.",
    ),
    pick("check-cable", "Cable o Wi-Fi", "Vas a jugar en línea y necesitas la conexión más estable. ¿Qué eliges?",
      "Cable Ethernet, que es más estable y tiene menos retardo",
      [["Wi-Fi en 2,4 GHz detrás de varias paredes", "Es lo menos estable."], ["Datos móviles en una zona con poca cobertura", "Es poco fiable."], ["Da igual", "Hay diferencias."]],
      "El cable evita interferencias y pérdidas de señal.",
    ),
  ],
};
