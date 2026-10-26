import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const componentesPerifericosDispositivos3esoLesson: InteractiveLesson = {
  slug: "componentes-perifericos-dispositivos-3eso",
  title: "1. Componentes, periféricos y dispositivos conectados",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un sistema informático por dentro", [
      { kind: "steps", items: [
        "**Procesador (CPU)**: ejecuta las instrucciones. **Memoria RAM**: datos en uso. **Almacenamiento**: guarda archivos (SSD, disco).",
        "**Placa base**: conecta todos los componentes. **Fuente de alimentación**: da la energía.",
        "**Periféricos**: dispositivos externos de **entrada** (teclado, ratón, cámara), **salida** (pantalla, impresora) o **almacenamiento** (disco externo).",
        "**Sistema operativo**: gestiona los recursos y los periféricos mediante **controladores** (drivers).",
      ] },
    ], undefined, "stack"),
    slide("perifericos", "Entrada, salida y conexión", [
      { kind: "text", text: "Elige un periférico y consulta cómo se conecta y qué tipo de datos intercambia." },
    ], tool("eso3-periferico-explorador"), "visual-top"),
    slide("conex", "Formas de conectar", [
      { kind: "compare",
        left: { title: "Con cable", text: "**USB**, **HDMI**, **DisplayPort**, **Ethernet**. Más estables y rápidas; no necesitan batería.", tone: "info" },
        right: { title: "Sin cable", text: "**Bluetooth** (cortas distancias, poco consumo) y **Wi-Fi** (más datos). Más cómodas; dependen de batería e interferencias.", tone: "key" } },
    ]),
    calc("calc-usb", "De Gbps a MB/s", "Un puerto USB 3.0 transmite hasta 5 Gbps (gigabits por segundo). ¿Cuántos MB por segundo son aproximadamente? (1 Gbps = 1 000 Mbps; 1 byte = 8 bits)", nums(625), "5 000 Mbps / 8 = 625 MB/s.", "Pasa a megabits y divide entre 8."),
    calc("calc-copia", "Tiempo de copia", "Copias un archivo de 2 GB (2 000 MB) a un disco que escribe a 100 MB/s. ¿Cuántos segundos tarda?", nums(20), "2 000 / 100 = 20 s.", "Tamaño entre velocidad."),
    sort("clasifica-perif", "Entrada, salida o almacenamiento", "Clasifica cada periférico.",
      [["ent", "Entrada", "cobalt"], ["sal", "Salida", "amber"], ["alm", "Almacenamiento", "emerald"]],
      [["Teclado", "ent"], ["Webcam", "ent"], ["Micrófono", "ent"], ["Pantalla", "sal"], ["Impresora", "sal"], ["Altavoces", "sal"], ["Pendrive", "alm"], ["Disco duro externo", "alm"]],
      "Entrada envía datos al ordenador; salida los recibe; almacenamiento hace las dos cosas.",
    ),
    pick("check-driver", "El controlador", "Conectas una impresora nueva y el ordenador no la reconoce. ¿Qué suele faltar?",
      "El controlador (driver) que permite al sistema operativo comunicarse con ella",
      [["Más memoria RAM", "No tiene relación."], ["Un procesador mejor", "No tiene relación."], ["Un disco duro nuevo", "No es necesario."]],
      "El controlador traduce las órdenes del sistema operativo al lenguaje del periférico.",
    ),
  ],
};
