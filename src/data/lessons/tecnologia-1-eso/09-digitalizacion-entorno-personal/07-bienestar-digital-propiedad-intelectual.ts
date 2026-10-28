import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const bienestarDigitalPropiedadIntelectualLesson: InteractiveLesson = {
  slug: "bienestar-digital-propiedad-intelectual",
  title: "7. Bienestar digital y propiedad intelectual",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("bienestar", "Cuidarte en el mundo digital", [
      { kind: "definition", text: "El **bienestar digital** es usar la tecnología de forma que cuide tu salud física, emocional y social: tiempo de pantalla equilibrado, relaciones respetuosas e intimidad protegida." },
      { kind: "steps", items: [
        "**Descanso**: limitar pantallas antes de dormir y hacer pausas.",
        "**Equilibrio**: combinar tiempo en línea con actividad física y amistades en persona.",
        "**Intimidad**: tu imagen y tu información son tuyas; también las de los demás.",
        "**Huella digital**: lo que publicas deja rastro y puede ser difícil de borrar.",
      ] },
    ], undefined, "stack"),
    slide("riesgos", "Riesgos: ciberacoso y sextorsión", [
      { kind: "compare",
        left: { title: "Ciberacoso", text: "Insultos, humillaciones, rumores o exclusión repetidos a través de medios digitales.", tone: "warn" },
        right: { title: "Sextorsión", text: "Amenazar con difundir imágenes íntimas para obtener dinero, más imágenes u otros favores.", tone: "warn" } },
      { kind: "steps", items: [
        "**No respondas** a las provocaciones.",
        "**Guarda pruebas** (capturas con fecha y usuario).",
        "**Bloquea y denuncia** a la persona en la plataforma.",
        "**Cuéntalo a un adulto de confianza** o al centro. No estás solo y no tienes culpa.",
      ] },
    ]),
    slide("situaciones", "¿Qué harías tú?", [
      { kind: "text", text: "Decide si cada respuesta ante una situación digital es buena o no." },
    ], tool("situaciones-digitales-explorador", { n: 1 }), "visual-top"),
    slide("autoria", "Propiedad intelectual y licencias", [
      { kind: "steps", items: [
        "Una imagen, canción, texto o programa **tiene autor** y está protegido por derechos de autor.",
        "Para usarlo **hay que pedir permiso o comprobar su licencia**.",
        "Las licencias **Creative Commons** permiten usar obras bajo condiciones que fija el autor.",
        "Siempre hay que **citar la fuente** de lo que no es tuyo.",
      ] },
    ]),
    slide("cc", "Elige una licencia", [
      { kind: "text", text: "Decide qué permitirías hacer con tu obra y mira qué licencia corresponde." },
    ], tool("licencias-cc-explorador"), "visual-top"),
    sort("clasifica-uso", "¿Puedo usarlo?", "Decide si cada uso es correcto.",
      [["si", "Uso correcto", "emerald"], ["no", "Uso incorrecto", "rose"]],
      [["Usar una foto con licencia CC BY citando al autor", "si"], ["Citar un texto con su fuente en un trabajo", "si"], ["Usar música con derechos de autor en un vídeo que subes público sin permiso", "no"], ["Copiar un trabajo de internet y presentarlo como tuyo", "no"]],
      "Se puede usar lo que tiene licencia que lo permite, citando al autor; copiar sin permiso o sin citar es incorrecto.",
    ),
    pick("check-captura", "Guardar pruebas", "Te llegan mensajes humillantes de un compañero en un chat. ¿Qué es lo primero que conviene hacer además de no responder?",
      "Guardar capturas y contárselo a un adulto de confianza",
      [["Borrar los mensajes para no verlos", "Sin pruebas es más difícil actuar."], ["Contestar con otros insultos", "Escalar el conflicto empeora la situación."], ["Mantenerlo en secreto", "Pedir ayuda es la mejor forma de pararlo."]],
      "Las pruebas y el apoyo de adultos permiten detener el acoso y proteger a la víctima.",
    ),
  ],
};
