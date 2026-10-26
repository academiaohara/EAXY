import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadPrivacidadBienestar2esoLesson: InteractiveLesson = {
  slug: "seguridad-privacidad-bienestar-2eso",
  title: "6. Seguridad, privacidad y bienestar digital",
  subtitle: TECESO2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("contra", "Contraseñas seguras", [
      { kind: "text", text: "La longitud y la variedad de caracteres hacen que una contraseña tarde mucho más en ser adivinada." },
    ], tool("contrasena-fortaleza-explorador"), "visual-top"),
    slide("riesgos", "Riesgos habituales", [
      { kind: "steps", items: [
        "**Phishing**: mensajes falsos que imitan a un banco o a un servicio para robar tus datos.",
        "**Malware**: programas dañinos (virus, ransomware, espías).",
        "**Ingeniería social**: engañar a la persona, no al ordenador.",
        "**Protección**: actualizar el sistema, usar antivirus, no abrir adjuntos desconocidos y activar la **verificación en dos pasos**.",
      ] },
    ]),
    slide("situaciones", "¿Qué harías?", [
      { kind: "text", text: "Decide cómo actuar en situaciones reales de seguridad y privacidad." },
    ], tool("situaciones-digitales-explorador"), "visual-top"),
    slide("huella", "Privacidad y huella digital", [
      { kind: "steps", items: [
        "Todo lo que publicas deja una **huella digital** difícil de borrar.",
        "Configura la **privacidad** de tus perfiles y piensa antes de publicar fotos de otras personas.",
        "No compartas **datos personales** (dirección, contraseñas, ubicación en tiempo real) con desconocidos.",
        "Si algo te hace daño en línea, **guarda las pruebas** y pide ayuda a una persona adulta de confianza.",
      ] },
    ]),
    slide("bienestar", "Bienestar digital", [
      { kind: "text", text: "Anota tu tiempo con pantallas y comprueba el equilibrio entre estudio y ocio." },
    ], tool("eso2-tiempo-pantalla-explorador"), "visual-top"),
    calc("calc-ocio", "Horas de ocio", "Un día tienes 2 h de pantalla para estudio, 1,5 h de redes sociales y 1 h de vídeos. ¿Cuántas horas de ocio con pantalla son?", nums(2.5), "1,5 + 1 = 2,5 h de ocio.", "No cuentes las horas de estudio."),
    sort("clasifica-seguro", "Seguro o arriesgado", "Clasifica cada conducta.",
      [["seg", "Segura", "emerald"], ["rie", "Arriesgada", "rose"]],
      [["Activar la verificación en dos pasos", "seg"], ["Usar una contraseña distinta en cada servicio", "seg"], ["Actualizar el sistema y los programas", "seg"], ["Abrir un adjunto de un remitente desconocido", "rie"], ["Compartir tu contraseña con un amigo", "rie"], ["Pinchar en un enlace de un premio inesperado", "rie"]],
      "Las buenas prácticas reducen los riesgos; los atajos y la confianza ciega los aumentan.",
    ),
    pick("check-phishing", "Un mensaje sospechoso", "Recibes un correo de «tu banco» con un enlace urgente para «verificar la cuenta». ¿Qué haces?",
      "No pinchar: acceder a la web del banco escribiendo tú la dirección o llamar al banco",
      [["Pinchar rápido para no perder la cuenta", "La urgencia es típica del phishing."], ["Responder con tu contraseña", "Un banco nunca la pide por correo."], ["Reenviarlo a todos tus contactos", "Propagarías el engaño."]],
      "Ante la duda, nunca uses el enlace del mensaje: entra tú por tu cuenta.",
    ),
  ],
};
