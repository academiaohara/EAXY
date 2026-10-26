import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const nubeAlmacenamientoCopias2esoLesson: InteractiveLesson = {
  slug: "nube-almacenamiento-copias-2eso",
  title: "5. Almacenamiento local y en la nube",
  subtitle: TECESO2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Cómo se sincroniza la nube", [
      { kind: "text", text: "Observa cómo un cambio hecho en un dispositivo llega a los demás." },
    ], anim("eso2-sincronizacion-nube"), "text-top"),
    slide("tipos", "Local frente a nube", [
      { kind: "compare",
        left: { title: "Almacenamiento local", text: "Disco del equipo, **disco externo**, pendrive. Funciona **sin internet** y tú controlas físicamente los datos, pero se puede **perder o estropear**.", tone: "info" },
        right: { title: "Nube", text: "Servidores en internet (Drive, OneDrive…). **Accesible desde cualquier sitio** y compartible, pero requiere **conexión** y confiar en un tercero.", tone: "key" } },
    ]),
    slide("capacidad", "¿Cuánto espacio necesito?", [
      { kind: "text", text: "Calcula cuántos archivos caben en un dispositivo de almacenamiento." },
    ], tool("capacidad-almacenamiento-explorador"), "visual-top"),
    slide("copias", "La regla 3-2-1", [
      { kind: "steps", items: [
        "**3** copias de tus datos (el original y dos copias).",
        "En **2** tipos de soporte distintos (disco del equipo y disco externo, por ejemplo).",
        "**1** copia fuera de casa (en la nube).",
      ] },
      { kind: "text", text: "Comprueba qué combinación de copias sobrevive a cada desastre." },
    ], tool("copia-seguridad-explorador"), "visual-top"),
    slide("subida", "¿Cuánto tarda una copia en la nube?", [
      { kind: "text", text: "Calcula el tiempo de subida con la velocidad de tu conexión." },
    ], tool("eso2-subida-nube-explorador"), "visual-top"),
    calc("calc-subida", "Tiempo de subida", "Subes 10 GB (1 GB = 8 000 megabits) con una velocidad de subida de 80 Mbps. ¿Cuántos segundos tarda?", nums(1000), "10 · 8 000 = 80 000 megabits; 80 000 / 80 = 1 000 s.", "Tiempo = datos en megabits entre velocidad."),
    calc("calc-mbs", "De Mbps a MB/s", "Una conexión sube a 20 Mbps (megabits por segundo). ¿Cuántos megabytes por segundo son? (1 byte = 8 bits)", nums(2.5), "20 / 8 = 2,5 MB/s.", "Divide entre 8."),
    sort("clasifica-copia", "Local o en la nube", "Clasifica cada opción de almacenamiento.",
      [["loc", "Local", "cobalt"], ["nub", "Nube", "emerald"]],
      [["Disco duro externo", "loc"], ["Pendrive", "loc"], ["Disco del ordenador", "loc"], ["Google Drive", "nub"], ["OneDrive", "nub"], ["Servicio de copias en internet", "nub"]],
      "Local es el que tienes físicamente; nube es el que está en servidores de internet.",
    ),
    pick("check-nube", "¿Es una copia de seguridad?", "Sincronizas una carpeta con la nube. Si borras un archivo por error en el ordenador, ¿qué ocurre?",
      "Se borra también en la nube (puede haber papelera durante un tiempo)",
      [["Se conserva siempre en la nube", "La sincronización replica los borrados."], ["Se convierte en una copia automática", "No es una copia de seguridad independiente."], ["Nada, la nube es inmune", "Ninguna nube es inmune."]],
      "Sincronizar no es lo mismo que hacer copia de seguridad: guarda un histórico aparte.",
    ),
  ],
};
