import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemaOperativoAlmacenamientoCopiasLesson: InteractiveLesson = {
  slug: "sistema-operativo-almacenamiento-copias",
  title: "2. Sistema operativo, almacenamiento y copias de seguridad",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("so", "Qué hace el sistema operativo", [
      { kind: "steps", items: [
        "**Gestiona los archivos y carpetas**: crear, copiar, mover, renombrar y borrar.",
        "**Controla los programas** y la memoria, y se comunica con los periféricos (impresora, ratón).",
        "**Ofrece utilidades**: propiedades del sistema, espacio de almacenamiento, ajustes de seguridad y actualizaciones.",
        "**Permite instalar y desinstalar** aplicaciones. Solo se instala software de fuentes fiables.",
      ] },
      { kind: "warning", title: "Ojo", text: "Las **actualizaciones** corrigen fallos y vulnerabilidades. Posponerlas deja el equipo expuesto a ataques." },
    ], undefined, "stack"),
    slide("unidades", "Medir la información", [
      { kind: "rule", title: "Unidades de almacenamiento", text: "1 byte = 8 bits · 1 KB ≈ 1 000 bytes · 1 MB ≈ 1 000 KB · 1 GB ≈ 1 000 MB · 1 TB ≈ 1 000 GB." },
      { kind: "text", text: "Una foto ocupa unos 4 MB, una canción unos 5 MB y un minuto de vídeo en alta definición unos 100 MB." },
    ]),
    slide("espacio", "¿Cabe todo?", [
      { kind: "text", text: "Elige un soporte y añade fotos, música, vídeos y aplicaciones. Comprueba cuándo se llena." },
    ], tool("capacidad-almacenamiento-explorador", { n: 1 }), "visual-top"),
    calc("calc-gb", "Cuántas fotos caben", "Un USB de 16 GB está vacío. Si cada foto ocupa 4 MB, ¿cuántas fotos caben? (1 GB = 1 000 MB)",
      nums(4000), "16 GB = 16 000 MB. 16 000 ÷ 4 = 4 000 fotos.", "Pasa los GB a MB y divide entre el tamaño de una foto."),
    slide("copias", "Copias de seguridad", [
      { kind: "text", text: "Una **copia de seguridad** es un duplicado de tus archivos en otro lugar para recuperarlos si se pierden. La regla **3-2-1**: tres copias, en dos soportes distintos y una fuera de casa." },
    ], tool("copia-seguridad-explorador"), "visual-top"),
    sort("clasifica-riesgo", "¿Protege una copia?", "Decide si cada caso protege de verdad frente a la pérdida de datos.",
      [["si", "Protege", "emerald"], ["no", "No protege", "rose"]],
      [["Copia en la nube y en un disco externo", "si"], ["Disco externo guardado en otra casa", "si"], ["Copia en la misma carpeta del ordenador", "no"], ["Pendrive pegado siempre al ordenador que se roba", "no"]],
      "Una copia en el mismo lugar o en el mismo equipo desaparece con el original si el fallo es general.",
    ),
    pick("check-copia", "La mejor práctica", "Tienes los apuntes del curso solo en el portátil. ¿Qué haces?",
      "Guardar una copia en la nube y otra en un disco externo",
      [["Nada: el portátil es fiable", "Todo equipo puede fallar o perderse."], ["Copiarlos en otra carpeta del mismo portátil", "Si se estropea el disco, se pierden las dos."], ["Imprimirlos todos", "Sirve, pero no es una buena solución para archivos digitales."]],
      "Varias copias en soportes y sitios distintos reducen el riesgo de perder los datos.",
    ),
  ],
};
