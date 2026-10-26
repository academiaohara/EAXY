import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const comunicacionDigitalTransmisionDatosLesson: InteractiveLesson = {
  slug: "comunicacion-digital-transmision-datos",
  title: "3. Comunicación digital y transmisión de datos",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Emisor, canal y receptor", [
      { kind: "definition", text: "Toda comunicación digital tiene un **emisor** que envía datos, un **canal** por el que viajan y un **receptor** que los recibe. Los datos se transmiten en forma de **bits**." },
      { kind: "compare",
        left: { title: "Conexiones alámbricas", text: "Usan cables: **par trenzado** (ethernet), **coaxial** y **fibra óptica** (luz). Más estables y rápidas.", tone: "info" },
        right: { title: "Conexiones inalámbricas", text: "Usan ondas: **wifi**, **Bluetooth**, **datos móviles** (4G/5G) y NFC. Más cómodas, pero con más interferencias.", tone: "key" } },
    ], undefined, "stack"),
    slide("paquetes", "Cómo viaja un archivo", [
      { kind: "text", text: "Los datos se dividen en paquetes que viajan por la red y se reconstruyen en el destino." },
    ], anim("paquetes-red"), "text-top"),
    slide("velocidad", "¿Cuánto tarda?", [
      { kind: "text", text: "Elige una conexión y el tamaño del archivo. Recuerda que 1 byte son 8 bits." },
    ], tool("tiempo-descarga-explorador", { n: 3, a: 500 }), "visual-top"),
    calc("calc-descarga", "Tiempo de descarga", "Descargas un archivo de 100 MB con una conexión de 80 Mb/s. ¿Cuántos segundos tarda? (Recuerda: 1 byte = 8 bits.)",
      nums(10), "100 MB = 800 Mb. 800 ÷ 80 = 10 s.", "Convierte MB a Mb (× 8) y divide entre la velocidad."),
    sort("clasifica-red", "Alámbrico o inalámbrico", "Clasifica cada tecnología.",
      [["ala", "Alámbrica", "amber"], ["ina", "Inalámbrica", "cobalt"]],
      [["Fibra óptica", "ala"], ["Cable ethernet", "ala"], ["Wifi", "ina"], ["Bluetooth", "ina"], ["Datos móviles 5G", "ina"], ["Cable coaxial", "ala"]],
      "Las alámbricas usan un medio físico (cable); las inalámbricas, ondas electromagnéticas.",
    ),
    pick("check-uso", "Elegir la conexión", "Vas a enviar auriculares a un móvil a un metro de distancia sin cables. ¿Qué tecnología encaja mejor?",
      "Bluetooth, de corto alcance y bajo consumo",
      [["Fibra óptica", "Necesita cable."], ["Datos móviles 5G", "Es para conectar con la red de un operador, no para dos dispositivos cercanos."], ["Cable coaxial", "Necesita cable."]],
      "Bluetooth sirve para conectar dispositivos cercanos con poco consumo de energía.",
    ),
  ],
};
