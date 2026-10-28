import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const internetDeLasCosas3esoLesson: InteractiveLesson = {
  slug: "internet-de-las-cosas-3eso",
  title: "6. Internet de las cosas (IoT)",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Objetos conectados", [
      { kind: "definition", text: "El **Internet de las cosas (IoT)** conecta a Internet objetos cotidianos con **sensores y actuadores**, para que envíen datos, reciban órdenes y se coordinen: termostatos, bombillas, cerraduras, relojes, electrodomésticos, sensores agrícolas…" },
      { kind: "steps", items: [
        "**Dispositivo**: placa o chip con sensores (temperatura, luz, movimiento).",
        "**Conectividad**: Wi-Fi, Bluetooth, redes de bajo consumo (LoRa, Zigbee) o móvil.",
        "**Plataforma en la nube**: guarda los datos y permite verlos o analizarlos.",
        "**Aplicación**: panel en el móvil o en el ordenador para controlar el dispositivo.",
      ] },
    ], undefined, "stack"),
    slide("bateria", "¿Cuánto dura la batería?", [
      { kind: "text", text: "Un sensor IoT duerme casi siempre. Calcula cuánto dura según cada cuánto envía un dato." },
    ], tool("eso3-bateria-iot-explorador"), "visual-top"),
    slide("ejemplos", "Aplicaciones", [
      { kind: "steps", items: [
        "**Hogar inteligente**: calefacción, persianas y luces controladas desde el móvil.",
        "**Agricultura**: sensores de humedad que activan el riego.",
        "**Ciudades**: aparcamientos libres, contenedores llenos, alumbrado eficiente.",
        "**Salud**: pulseras que miden pulsaciones y sueño.",
        "**Industria**: mantenimiento predictivo de máquinas.",
      ] },
    ]),
    calc("calc-dias", "Autonomía", "Una batería de 2 000 mAh alimenta un sensor con un consumo medio de 0,1 mA. ¿Cuántos días dura aproximadamente? (capacidad / consumo / 24, redondea a un entero)", nums(833), "2 000 / 0,1 = 20 000 h; 20 000 / 24 ≈ 833 días.", "Horas = mAh / mA; días = horas / 24."),
    calc("calc-datos", "Envíos al día", "Un sensor envía un dato cada 10 minutos. ¿Cuántos datos manda al día? (24 · 60 / 10)", nums(144), "1 440 min / 10 = 144 datos.", "Minutos del día entre el intervalo."),
    sort("clasifica-iot", "¿Sensor o actuador?", "Clasifica cada elemento de un sistema IoT.",
      [["sen", "Sensor", "cobalt"], ["act", "Actuador", "emerald"]],
      [["Sensor de humedad del suelo", "sen"], ["Termómetro de una habitación", "sen"], ["Detector de movimiento", "sen"], ["Electroválvula del riego", "act"], ["Cerradura eléctrica", "act"], ["Bombilla inteligente", "act"]],
      "Los sensores miden; los actuadores actúan.",
    ),
    pick("check-iot", "Un riesgo", "¿Qué riesgo importante tienen muchos dispositivos IoT mal configurados?",
      "Pueden ser atacados o espiar si usan contraseñas por defecto o no se actualizan",
      [["Gastan demasiada tinta", "No usan tinta."], ["Funcionan sin electricidad", "Necesitan alimentación."], ["No tienen ningún riesgo", "Hay riesgos de seguridad y privacidad."]],
      "Hay que cambiar las contraseñas por defecto y mantener el dispositivo actualizado.",
    ),
  ],
};
