import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tecnologiaSostenibleAsturiasOdsLesson: InteractiveLesson = {
  slug: "tecnologia-sostenible-asturias-ods",
  title: "7. Desarrollo tecnológico, ODS y el entorno asturiano",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("ods", "La tecnología y los Objetivos de Desarrollo Sostenible", [
      { kind: "definition", text: "Los **Objetivos de Desarrollo Sostenible (ODS)** son 17 metas de las Naciones Unidas para la Agenda 2030: acabar con la pobreza, cuidar el planeta y garantizar el bienestar de las personas." },
      { kind: "steps", items: [
        "**ODS 6 – Agua limpia y saneamiento**: depuradoras y sistemas de ahorro de agua.",
        "**ODS 7 – Energía asequible y no contaminante**: energías renovables.",
        "**ODS 9 – Industria, innovación e infraestructuras**: tecnología al servicio de la sociedad.",
        "**ODS 11 – Ciudades y comunidades sostenibles**: transporte público, gestión de residuos.",
        "**ODS 12 – Producción y consumo responsables**: reducir, reutilizar y reciclar.",
        "**ODS 13 – Acción por el clima**: reducir las emisiones.",
      ] },
    ], undefined, "stack"),
    slide("etica", "Una tecnología con ética", [
      { kind: "compare",
        left: { title: "Pregunta antes de crear", text: "¿A quién beneficia? ¿Quién podría salir perjudicado? ¿Qué residuos genera? ¿Puede repararse?", tone: "key" },
        right: { title: "Pregunta después de usar", text: "¿Lo necesito? ¿Cuánto durará? ¿Qué hago con él cuando deje de funcionar?", tone: "info" } },
      { kind: "text", text: "Compara la huella de un producto según cuánto dure: alargar su vida reduce el impacto por año de uso." },
    ], tool("huella-producto-explorador"), "text-top"),
    slide("asturias", "La tecnología en el entorno asturiano", [
      { kind: "text", text: "Asturias ha tenido una larga relación con la tecnología y la industria, y hoy afronta una transición hacia un modelo más sostenible." },
      { kind: "steps", items: [
        "**Minería del carbón y siderurgia**: tradicionalmente motores de la industria asturiana, con un gran impacto ambiental y paisajístico.",
        "**Energía**: aprovechamiento de la fuerza del agua (centrales hidráulicas) y del viento (parques eólicos) en zonas de montaña y costa.",
        "**Gestión de residuos**: el consorcio público Cogersa gestiona en Asturias la recogida selectiva, el reciclaje y el vertedero de residuos.",
        "**Recuperación del paisaje**: restauración de antiguas explotaciones mineras y patrimonio industrial.",
      ] },
      { kind: "text", text: "Piensa en tu concejo: ¿qué industria, instalación o servicio tecnológico tienes cerca?" },
    ]),
    sort("clasifica-ods", "Tecnología y ODS", "Relaciona cada actuación con el ODS al que más contribuye.",
      [["ene", "ODS 7: energía limpia", "amber"], ["res", "ODS 12: consumo responsable", "emerald"], ["agu", "ODS 6: agua limpia", "cobalt"]],
      [["Instalar un parque eólico", "ene"], ["Colocar paneles solares en un colegio", "ene"], ["Reparar un aparato en vez de tirarlo", "res"], ["Separar los residuos para reciclar", "res"], ["Depurar el agua de un río", "agu"], ["Instalar grifos que ahorran agua", "agu"]],
      "Una misma tecnología puede contribuir a varios ODS; lo importante es entender qué problema resuelve.",
    ),
    pick("check-etica", "Decisión de diseño", "Una empresa puede fabricar un aparato que dura 10 años y es reparable, o uno más barato que dura 2 y no se puede abrir. Desde el punto de vista del desarrollo sostenible, ¿cuál es preferible?",
      "El duradero y reparable, porque genera menos residuos y consume menos recursos",
      [["El barato, porque se vende más", "Vender más no es sostenible si genera más residuos."], ["Ambos son iguales", "Producir y desechar más cuesta más recursos."], ["El que no se puede abrir, por seguridad", "La reparabilidad no está reñida con la seguridad."]],
      "Alargar la vida útil de los productos es una de las medidas más eficaces para reducir el impacto.",
    ),
  ],
};
