import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const comunicacionesIotProyecto4esoLesson: InteractiveLesson = {
  slug: "comunicaciones-iot-proyecto-4eso",
  title: "8. Comunicaciones, IoT y proyecto de sistema automatizado",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Objetos conectados", [
      { kind: "steps", items: [
        "El **internet de las cosas (IoT)** conecta sensores y actuadores a la red para medir y controlar a distancia.",
        "Un nodo IoT: **sensor + microcontrolador + comunicación inalámbrica + alimentación**.",
        "Los datos viajan a un **servidor o la nube**, se almacenan, se analizan y se muestran en un **panel**.",
        "Protocolos habituales: **MQTT** (mensajes ligeros), **HTTP** (web), **LoRaWAN** (largo alcance).",
        "La **seguridad** es crítica: contraseñas, cifrado y actualizaciones.",
      ] },
    ], undefined, "stack"),
    slide("proto", "Elige la tecnología", [
      { kind: "text", text: "Indica el alcance, la velocidad y si va con pilas: mira qué tecnologías lo permiten." },
    ], tool("eso4-iot-explorador"), "visual-top"),
    slide("bat", "Cuánto dura la pila", [
      { kind: "text", text: "Un nodo con batería debe consumir poco. Estima su autonomía." },
    ], tool("eso3-bateria-iot-explorador"), "visual-top"),
    slide("proy", "Proyecto: sistema automatizado", [
      { kind: "steps", items: [
        "**1. Especifica**: qué debe controlar y con qué precisión (por ejemplo, riego automático de un huerto).",
        "**2. Elige** sensores, controlador, actuadores y comunicación.",
        "**3. Diseña** el lazo (todo-nada o PID) y la secuencia de funcionamiento.",
        "**4. Programa y simula**, luego **monta y prueba**.",
        "**5. Documenta** y **evalúa**: medidas, consumo, coste y mejoras.",
      ] },
    ]),
    calc("calc-dia", "Datos al día", "Un sensor envía 20 bytes cada 10 minutos. ¿Cuántos bytes al día? (144 envíos)", nums(2880), "20 · 144 = 2 880 bytes.", "Envíos por día por tamaño."),
    calc("calc-env", "Envíos", "Si el nodo envía un dato cada 10 minutos, ¿cuántos envíos hace en un día?", nums(144), "24 · 6 = 144.", "Seis por hora por 24 horas."),
    sort("clasifica-iot", "¿Qué tecnología?", "Relaciona cada caso con la tecnología más adecuada.",
      [["lora", "LoRa", "cobalt"], ["wif", "Wi-Fi", "amber"], ["ble", "Bluetooth LE", "emerald"]],
      [["Sensor de humedad en un campo a 2 km, con pilas", "lora"], ["Contador en una finca extensa", "lora"], ["Cámara de vigilancia en casa", "wif"], ["Altavoz inteligente", "wif"], ["Pulsera de actividad", "ble"], ["Termómetro que se conecta al móvil", "ble"]],
      "Cada tecnología equilibra alcance, velocidad y consumo.",
    ),
    pick("check-iot", "Seguridad", "Un dispositivo IoT se instala con la contraseña de fábrica. ¿Cuál es el problema?",
      "Cualquiera podría acceder a él: hay que cambiarla y mantener el dispositivo actualizado",
      [["Ninguno", "Es un riesgo."], ["Gasta más batería", "No tiene relación."], ["Va más lento", "No tiene relación."]],
      "Muchos ataques usan contraseñas por defecto.",
    ),
  ],
};
