import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const dispositivosHardwareSoftwareLesson: InteractiveLesson = {
  slug: "dispositivos-hardware-software",
  title: "1. Dispositivos digitales: hardware y software",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Hardware y software", [
      { kind: "definition", text: "Un **dispositivo digital** (ordenador, tableta, móvil) procesa información en forma de datos binarios. Se compone de **hardware**, las piezas físicas, y de **software**, los programas que le dicen qué hacer." },
      { kind: "compare",
        left: { title: "Hardware", text: "Lo que se puede **tocar**: procesador, memoria, disco, pantalla, teclado, batería.", tone: "info" },
        right: { title: "Software", text: "Lo que **no se toca**: sistema operativo, aplicaciones, archivos y datos.", tone: "key" } },
    ], undefined, "stack"),
    slide("capas", "Un dispositivo por capas", [
      { kind: "text", text: "El usuario no maneja el hardware directamente: lo hace a través del sistema operativo y de las aplicaciones." },
    ], anim("capas-entorno-digital"), "split"),
    slide("partes", "Recorre los componentes", [
      { kind: "text", text: "Pulsa cada componente de un ordenador y de un móvil y descubre su función. Fíjate en cuáles son hardware y cuáles software." },
    ], tool("dispositivo-componentes-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-hs", "¿Hardware o software?", "Clasifica cada elemento.",
      [["hw", "Hardware", "amber"], ["sw", "Software", "cobalt"]],
      [["Teclado", "hw"], ["Pantalla", "hw"], ["Memoria RAM", "hw"], ["Procesador", "hw"], ["Sistema operativo", "sw"], ["Navegador web", "sw"], ["Un juego instalado", "sw"], ["Un documento de texto", "sw"]],
      "El hardware es físico; el software son programas y datos que se guardan en el hardware.",
    ),
    slide("diagnostico", "Resolver problemas técnicos sencillos", [
      { kind: "text", text: "Muchas averías se resuelven revisando lo más simple primero. Prueba con cuatro problemas habituales." },
    ], tool("diagnostico-tecnico-explorador", { n: 0 }), "visual-top"),
    pick("check-ram", "RAM y disco", "Estás escribiendo un trabajo y se va la luz antes de guardarlo. ¿Qué has perdido y por qué?",
      "Lo que no guardaste, porque estaba en la memoria RAM, que se borra al apagarse",
      [["Todo el disco duro", "El disco guarda los datos de forma permanente."], ["Nada, la RAM guarda siempre los datos", "La RAM es temporal."], ["Solo el sistema operativo", "El sistema operativo sigue en el disco."]],
      "La RAM almacena temporalmente lo que se está usando; el disco, de forma permanente: por eso conviene guardar con frecuencia.",
    ),
    pick("check-lento", "Un equipo lento", "Tu ordenador va muy lento con muchas pestañas y programas abiertos. ¿Qué es lo más sencillo para probar primero?",
      "Cerrar lo que no uses para liberar memoria",
      [["Comprar otro ordenador", "Antes hay que probar soluciones sencillas."], ["Cambiar el papel de fondo", "No influye en la velocidad."], ["Desenchufar el ratón", "No tiene relación con el rendimiento."]],
      "Cerrar programas libera memoria RAM y procesador; es el primer paso del diagnóstico.",
    ),
  ],
};
