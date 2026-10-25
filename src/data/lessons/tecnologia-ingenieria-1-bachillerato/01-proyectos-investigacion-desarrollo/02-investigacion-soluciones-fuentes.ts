import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const investigacionSolucionesFuentesLesson: InteractiveLesson = {
  slug: "investigacion-soluciones-fuentes",
  title: "2. Investigación y búsqueda de soluciones",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Investigar antes de diseñar", [
      { kind: "definition", text: "La **investigación previa** consiste en reunir información fiable sobre el problema y sobre las **soluciones que ya existen** para no reinventar lo ya resuelto y detectar sus carencias." },
      { kind: "steps", title: "Qué se busca", items: [
        "**Antecedentes**: quién ya intentó resolver este problema y cómo.",
        "**Productos existentes**: precio, prestaciones, materiales, puntos débiles.",
        "**Normativa y patentes**: qué está regulado y qué está protegido.",
        "**Datos técnicos**: cifras (cargas, consumos, dimensiones) de fuentes verificables.",
      ] },
      { kind: "text", text: "El resultado no es una lista de enlaces, sino una **comparativa** que permita decidir con criterio." },
    ], undefined, "stack"),
    slide("fuentes", "Fuentes: no todas pesan igual", [
      { kind: "compare",
        left: { title: "Más fiable", text: "Normas (UNE, ISO), fichas técnicas del fabricante, artículos revisados por pares, organismos oficiales, libros técnicos.", tone: "ok" },
        right: { title: "Hay que contrastar", text: "Foros, vídeos sin referencias, blogs comerciales, reseñas anónimas, páginas sin autor ni fecha.", tone: "warn" } },
      { kind: "steps", title: "Test rápido de una fuente", items: [
        "¿Quién la firma y qué experiencia tiene?",
        "¿Cuándo se publicó? ¿Sigue vigente?",
        "¿Da datos y cita sus fuentes?",
        "¿Tiene interés comercial o ideológico en que pienses algo?",
        "¿Coincide con al menos otra fuente independiente?",
      ] },
    ]),
    slide("patentes", "Patentes y propiedad industrial", [
      { kind: "definition", text: "Una **patente** da a su titular el derecho exclusivo de explotar una invención durante un tiempo limitado (normalmente 20 años) a cambio de hacerla pública." },
      { kind: "text", text: "Consultar bases de patentes (como Espacenet u OEPM) sirve para dos cosas: **aprender** cómo se resolvió algo y **evitar copiar** una solución protegida." },
      { kind: "warning", title: "Ideas y derechos de autor", text: "Una idea abstracta no se patenta, pero un procedimiento técnico concreto sí. Reutilizar texto, imágenes o código sin citar o sin licencia es un problema de autoría, aunque la fuente sea pública." },
    ]),
    slide("comparar", "Comparar alternativas con criterios", [
      { kind: "text", text: "Al comparar soluciones se eligen **criterios** (precio, eficacia, sostenibilidad, dificultad) y se da a cada uno una **importancia**. Cambia los pesos y observa si cambia la ganadora." },
    ], tool("matriz-decision-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-fuentes", "¿Fuente fiable o a contrastar?", "Decide qué fuentes usarías como base técnica y cuáles solo como pista que hay que verificar.",
      [["fiable", "Fuente fiable", "emerald"], ["contrastar", "Contrastar antes de usar", "amber"]],
      [["Ficha técnica del fabricante de un motor", "fiable"], ["Norma UNE sobre resistencia de materiales", "fiable"], ["Artículo en una revista científica con revisión por pares", "fiable"], ["Vídeo sin autor que dice «el truco que los ingenieros esconden»", "contrastar"], ["Reseña anónima de una tienda online", "contrastar"], ["Entrada de foro sin referencias", "contrastar"]],
      "Las fuentes con autoría, método y revisión externa merecen más confianza. Las demás sirven para orientarse, pero hay que comprobar los datos en una fuente fiable.",
      "Piensa en quién responde si la información es errónea."),
    pick("check-fuente", "Justificar una fuente", "Necesitas saber la carga máxima de una escuadra de acero para una estantería. ¿Qué fuente justifica mejor tu cálculo?",
      "La ficha técnica del fabricante con la carga admisible y la norma aplicada",
      [["Un vídeo con muchas visualizaciones donde alguien la prueba", "Una prueba aislada no equivale a un ensayo normalizado ni da un margen de seguridad."], ["Un comentario en un foro de bricolaje", "No es verificable ni dice en qué condiciones se midió."], ["La publicidad de la tienda", "Tiene interés comercial y suele omitir condiciones de uso."]],
      "Para un dato del que depende la seguridad conviene la fuente con método de medida, condiciones y responsabilidad: fabricante y norma.",
    ),
    pick("check-patente", "Patente y reutilización", "Encuentras una patente caducada de un mecanismo de cierre. ¿Qué puedes hacer?",
      "Estudiarlo y aprovechar la idea, porque al caducar pasa a dominio público",
      [["Nada, porque sigue siendo exclusivo de su titular", "La exclusividad termina al caducar la patente."], ["Copiarlo y registrarlo como tuyo", "No puedes registrar como propia una invención que ya es pública."], ["Ignorarla, las patentes no sirven para investigar", "Al contrario: describen con detalle cómo se resolvió el problema."]],
      "Las patentes vigentes protegen; las caducadas se pueden usar libremente. En ambos casos son una fuente de información técnica.",
    ),
  ],
};
