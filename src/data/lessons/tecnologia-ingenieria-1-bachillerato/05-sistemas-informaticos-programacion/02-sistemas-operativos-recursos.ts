import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sistemasOperativosRecursosLesson: InteractiveLesson = {
  slug: "sistemas-operativos-recursos",
  title: "2. Sistemas operativos y gestión de recursos",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("funciones", "Qué hace un sistema operativo", [
      { kind: "definition", text: "El **sistema operativo** (SO) es el software que gestiona los recursos del equipo y hace de intermediario entre los programas, el hardware y el usuario." },
      { kind: "steps", items: [
        "**Gestión de procesos**: decide qué programa usa la CPU y durante cuánto tiempo.",
        "**Gestión de memoria**: reparte la RAM y protege a unos programas de otros.",
        "**Gestión de archivos**: organiza la información en carpetas y controla quién puede leerla o modificarla.",
        "**Gestión de dispositivos**: controladores (drivers) para teclado, pantalla, impresora, red…",
        "**Interfaz de usuario**: gráfica (ventanas y ratón) o de línea de comandos.",
      ] },
    ], undefined, "stack"),
    slide("procesos", "Procesos y memoria", [
      { kind: "text", text: "Cada programa en ejecución es un **proceso**. Abre y cierra programas y mira cómo se reparten la CPU y la RAM. ¿Qué ocurre cuando la RAM no alcanza?" },
    ], tool("procesos-memoria-explorador", { a: 8, b: 4 }), "visual-top"),
    slide("archivos", "Archivos, carpetas y permisos", [
      { kind: "steps", items: [
        "Los archivos se organizan en un **árbol de carpetas**; cada archivo tiene **ruta**, nombre y extensión.",
        "Cada archivo tiene **propietario** y **permisos** de lectura (r), escritura (w) y ejecución (x) para propietario, grupo y otros.",
        "Los permisos protegen la información y el sistema: un usuario normal no puede borrar los archivos del sistema.",
      ] },
      { kind: "text", text: "En notación numérica r = 4, w = 2 y x = 1. Cada usuario suma sus permisos: $rwx = 7$, $r\\text{-}x = 5$, $r\\text{--} = 4$." },
    ], tool("permisos-archivos-explorador"), "split"),
    slide("interfaces", "Interfaz gráfica y línea de comandos", [
      { kind: "compare",
        left: { title: "Interfaz gráfica (GUI)", text: "Ventanas, iconos y ratón. Intuitiva y visual, ideal para el uso cotidiano.", tone: "info" },
        right: { title: "Línea de comandos (CLI)", text: "Se escriben órdenes (`ls`, `cd`, `chmod`). Más rápida y automatizable para tareas repetitivas y de administración.", tone: "key" } },
      { kind: "text", text: "Instalar una aplicación significa copiar sus archivos, registrar dependencias y configurar permisos. Desinstalarla debería revertirlo y liberar recursos." },
    ]),
    calc("calc-chmod", "Permisos en número", "Un archivo tiene permisos simbólicos `rwxr-x---`. ¿Cuál es su notación numérica de tres cifras?",
      nums(750), "Propietario $rwx = 4+2+1 = 7$; grupo $r\\text{-}x = 4+1 = 5$; otros $--- = 0$. Resultado: 750.", "r = 4, w = 2, x = 1."),
    sort("clasifica-gestion", "¿Qué gestiona el SO?", "Asocia cada tarea con el recurso que gestiona.",
      [["cpu", "Procesos / CPU", "cobalt"], ["mem", "Memoria", "amber"], ["arc", "Archivos", "emerald"]],
      [["Decidir qué programa se ejecuta ahora", "cpu"], ["Repartir tiempo entre procesos", "cpu"], ["Impedir que un programa lea la memoria de otro", "mem"], ["Usar el disco como memoria virtual", "mem"], ["Controlar quién puede leer un documento", "arc"], ["Organizar en carpetas", "arc"]],
      "El planificador reparte la CPU; la gestión de memoria protege y asigna RAM; el sistema de archivos organiza y controla el acceso.",
    ),
    pick("check-swap", "Demasiados programas", "Un equipo de 4 GB de RAM abre muchos programas y se vuelve muy lento, con el disco trabajando sin parar. ¿Qué ocurre?",
      "La RAM se llena y el sistema usa el disco como memoria virtual, que es mucho más lenta",
      [["La CPU se ha estropeado", "La CPU puede estar bien; el cuello de botella es la memoria."], ["El monitor consume demasiada energía", "No tiene relación con la lentitud del sistema."], ["Los archivos se han borrado", "No: se están moviendo datos entre la RAM y el disco."]],
      "Con la RAM llena, el SO descarga datos al disco (swap). Acceder al disco es órdenes de magnitud más lento que acceder a la RAM.",
    ),
    pick("check-permisos", "Proteger un archivo", "Un archivo con contraseñas solo debe poder leerlo y modificarlo su dueño. ¿Qué permisos le darías?",
      "600 (propietario lee y escribe; grupo y otros, nada)",
      [["777", "Da todos los permisos a todo el mundo, incluido leer las contraseñas."], ["644", "Los demás usuarios podrían leer el archivo."], ["444", "Nadie podría modificarlo, ni siquiera su dueño."]],
      "600 = rw- --- ---: solo el propietario puede leer y escribir.",
    ),
  ],
};
