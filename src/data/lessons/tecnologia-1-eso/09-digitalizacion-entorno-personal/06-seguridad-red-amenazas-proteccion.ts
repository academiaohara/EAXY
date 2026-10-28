import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadRedAmenazasProteccionLesson: InteractiveLesson = {
  slug: "seguridad-red-amenazas-proteccion",
  title: "6. Seguridad en la red: amenazas y protección",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("amenazas", "Amenazas habituales", [
      { kind: "steps", items: [
        "**Malware**: programas dañinos (virus, troyanos, spyware, ransomware que cifra tus archivos y pide un rescate).",
        "**Phishing**: mensajes falsos que imitan a una empresa o persona conocida para robarte datos.",
        "**Ingeniería social**: engañar a la persona, no al ordenador, para que entregue información.",
        "**Redes wifi públicas inseguras**, que pueden interceptar lo que envías.",
      ] },
    ], undefined, "stack"),
    slide("fraude", "¿Fraude o legítimo?", [
      { kind: "text", text: "Lee cada mensaje y decide si es un intento de fraude. Presta atención al remitente, a las prisas y a lo que te piden." },
    ], tool("situaciones-digitales-explorador", { n: 0 }), "visual-top"),
    slide("medidas", "Cómo protegerte", [
      { kind: "steps", items: [
        "Mantén el **sistema y las aplicaciones actualizados**.",
        "Usa **antivirus** y descarga programas solo de fuentes oficiales.",
        "No abras **enlaces ni archivos adjuntos** de mensajes sospechosos.",
        "Usa **contraseñas fuertes** y verificación en dos pasos.",
        "Comprueba que la web usa **HTTPS** (candado) antes de introducir datos.",
        "Haz **copias de seguridad** periódicas.",
      ] },
    ]),
    sort("clasifica-medida", "Amenaza o medida", "Clasifica cada elemento.",
      [["ame", "Amenaza", "rose"], ["med", "Medida de protección", "emerald"]],
      [["Phishing", "ame"], ["Ransomware", "ame"], ["Virus adjunto en un correo", "ame"], ["Actualizar el sistema", "med"], ["Verificación en dos pasos", "med"], ["Copia de seguridad", "med"], ["Antivirus", "med"]],
      "Las amenazas buscan robar o dañar tus datos; las medidas reducen el riesgo o las consecuencias.",
    ),
    pick("check-enlace", "Un enlace sospechoso", "Recibes un mensaje de un amigo con un enlace y «mira esto» sin más explicación. Tu amigo no suele escribir así. ¿Qué haces?",
      "No pulso el enlace y le pregunto por otro medio si lo ha enviado él",
      [["Lo pulso por curiosidad", "Su cuenta podría estar comprometida."], ["Lo reenvío a los demás", "Difundirías el problema."], ["Pulso y, si no pasa nada, no importa", "El daño puede no ser visible al instante."]],
      "Una cuenta comprometida envía enlaces maliciosos a los contactos: conviene verificar por otro medio.",
    ),
    pick("check-https", "El candado de la web", "¿Qué significa que una web use HTTPS?",
      "Que la comunicación va cifrada, aunque eso no garantiza que la web sea fiable",
      [["Que la web es siempre segura y de confianza", "Cifrar no demuestra la honestidad del sitio."], ["Que es una web del gobierno", "No tiene relación con quién la publica."], ["Que no contiene virus", "Una web con HTTPS puede ser maliciosa."]],
      "HTTPS protege la transmisión de los datos, no el contenido del sitio.",
    ),
  ],
};
