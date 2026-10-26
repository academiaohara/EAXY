import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadUsoCriticoRecursosDigitales3esoLesson: InteractiveLesson = {
  slug: "seguridad-uso-critico-recursos-digitales-3eso",
  title: "7. Seguridad, privacidad y uso crítico de los recursos digitales",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("redes", "Proteger tu red", [
      { kind: "steps", items: [
        "**Cambia** la contraseña del Wi-Fi y la del acceso al router (las de fábrica son conocidas).",
        "Usa cifrado **WPA2 o WPA3**; evita las redes abiertas o con WEP.",
        "Mantén el **firmware** del router y de los dispositivos **actualizado**.",
        "En redes **públicas**, evita operaciones delicadas (banca) o usa conexiones **HTTPS**/VPN.",
        "Crea una red de **invitados** para visitas y dispositivos IoT.",
      ] },
    ], undefined, "stack"),
    slide("clave", "¿Cuánto tarda en adivinarse?", [
      { kind: "text", text: "Prueba distintas longitudes y tipos de caracteres. Hipótesis: un atacante prueba mil millones de claves por segundo." },
    ], tool("eso3-clave-wifi-explorador"), "visual-top"),
    slide("situ", "Situaciones reales", [
      { kind: "text", text: "Decide cómo actuar ante situaciones de seguridad y privacidad." },
    ], tool("situaciones-digitales-explorador"), "visual-top"),
    slide("critico", "Uso crítico y responsable", [
      { kind: "steps", items: [
        "**Contrasta** la información en varias **fuentes fiables** antes de compartirla.",
        "Desconfía de los **mensajes alarmistas** y de los **enlaces** inesperados (phishing).",
        "Respeta la **propiedad intelectual** y las **licencias**; cita las fuentes.",
        "Cuida tu **huella digital** y la de otras personas: pide permiso antes de publicar.",
        "Si sufres o ves **acoso en línea**, guarda las pruebas, bloquea y pide ayuda.",
      ] },
    ]),
    calc("calc-min", "Combinaciones de una clave", "Una contraseña de 4 letras minúsculas (26 posibles por carácter), ¿cuántas combinaciones tiene? (26⁴)", nums(456976), "26⁴ = 456 976.", "26 elevado al número de caracteres."),
    calc("calc-num", "Un PIN de 8 dígitos", "Una clave de 8 dígitos (10 posibles por carácter), ¿cuántas combinaciones tiene? (10⁸)", nums(100000000), "10⁸ = 100 000 000.", "10 elevado a 8."),
    sort("clasifica-seg", "Buenas o malas prácticas", "Clasifica cada hábito.",
      [["bue", "Buena práctica", "emerald"], ["mal", "Mala práctica", "rose"]],
      [["Usar una frase larga como contraseña", "bue"], ["Cambiar la contraseña por defecto del router", "bue"], ["Activar WPA3 o WPA2", "bue"], ["Dejar la clave de fábrica del router", "mal"], ["Compartir la contraseña en una red social", "mal"], ["Conectarse a cualquier Wi-Fi abierta para entrar en el banco", "mal"]],
      "La seguridad depende de pequeños hábitos que conviene repetir.",
    ),
    pick("check-largo", "Longitud o complejidad", "¿Qué ofrece más seguridad, normalmente?",
      "Una contraseña más larga, porque cada carácter multiplica el número de combinaciones",
      [["Una contraseña muy corta con un símbolo", "Pocas combinaciones."], ["La misma contraseña en todos los sitios", "Si se filtra, todas las cuentas caen."], ["Una contraseña con el nombre de tu mascota", "Es fácil de adivinar."]],
      "Cada carácter extra multiplica el esfuerzo del atacante por el número de posibilidades.",
    ),
  ],
};
