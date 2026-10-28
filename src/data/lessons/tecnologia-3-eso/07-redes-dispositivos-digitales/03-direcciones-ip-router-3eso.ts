import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const direccionesIpRouter3esoLesson: InteractiveLesson = {
  slug: "direcciones-ip-router-3eso",
  title: "3. Direcciones IP, máscara y router",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una dirección para cada equipo", [
      { kind: "steps", items: [
        "Cada dispositivo de una red necesita una **dirección IP** única, como la dirección de una casa.",
        "**IPv4**: 4 números de 0 a 255 separados por puntos (192.168.1.25). Son **32 bits**.",
        "La **máscara de red** (/24 equivale a 255.255.255.0) indica qué parte de la dirección identifica la **red** y qué parte, el **equipo**.",
        "La **puerta de enlace** es el router: por ahí salen los paquetes hacia otras redes.",
        "Las direcciones **privadas** (192.168.x.x, 10.x.x.x) se usan dentro de casa; el router tiene una **pública** hacia Internet.",
      ] },
    ], undefined, "stack"),
    slide("ip", "Calcula una red", [
      { kind: "text", text: "Cambia la dirección y la máscara. Observa la dirección de red, la de difusión y cuántos equipos caben." },
    ], tool("eso3-ip-explorador"), "visual-top"),
    slide("dhcp", "¿Quién asigna las direcciones?", [
      { kind: "steps", items: [
        "El servicio **DHCP** del router reparte direcciones a los equipos que se conectan, automáticamente.",
        "También se pueden configurar **a mano** (IP fija), útil para impresoras o servidores.",
        "No puede haber **dos equipos con la misma IP** en una red: provocaría un conflicto.",
      ] },
    ]),
    calc("calc-hosts", "Equipos en una red /24", "Una red con máscara /24 (255.255.255.0), ¿cuántos equipos puede tener? (2⁸ − 2: se descartan la dirección de red y la de difusión)", nums(254), "2⁸ = 256; se quitan 2: 254 equipos.", "256 menos 2."),
    calc("calc-hosts26", "Una red más pequeña", "Con una máscara /26, ¿cuántos equipos caben? (2⁶ − 2)", nums(62), "2⁶ = 64; se quitan 2: 62 equipos.", "64 menos 2."),
    calc("calc-bc", "La difusión", "En la red 192.168.1.0/24, ¿cuál es el último número de la dirección de difusión (broadcast)?", nums(255), "La dirección de difusión es 192.168.1.255.", "Todos los bits de equipo a 1."),
    sort("clasifica-ip", "¿Dirección válida?", "Decide si cada dirección puede asignarse a un equipo de la red 192.168.1.0/24.",
      [["val", "Válida para un equipo", "emerald"], ["inv", "No válida", "rose"]],
      [["192.168.1.25", "val"], ["192.168.1.254", "val"], ["192.168.1.100", "val"], ["192.168.1.0 (dirección de red)", "inv"], ["192.168.1.255 (difusión)", "inv"], ["192.168.2.10 (otra red)", "inv"]],
      "Una dirección de equipo debe estar en la misma red y no ser la de red ni la de difusión.",
    ),
    pick("check-ipconf", "Conflicto de IP", "Dos equipos de la misma red tienen la misma dirección IP. ¿Qué ocurre?",
      "Hay un conflicto y ambos pueden fallar o perder la conexión",
      [["Funcionan mejor", "No se mejora."], ["No pasa nada", "Los paquetes no sabrían a quién ir."], ["Se fusionan en un equipo", "No existe tal cosa."]],
      "Cada dispositivo debe tener una dirección única dentro de su red.",
    ),
  ],
};
