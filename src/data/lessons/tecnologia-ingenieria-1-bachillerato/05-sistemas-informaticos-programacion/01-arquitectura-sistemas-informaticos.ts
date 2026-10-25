import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const arquitecturaSistemasInformaticosLesson: InteractiveLesson = {
  slug: "arquitectura-sistemas-informaticos",
  title: "1. Arquitectura de los sistemas informáticos",
  subtitle: TEC1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("hw-sw", "Hardware y software", [
      { kind: "compare",
        left: { title: "Hardware", text: "Los componentes **físicos**: procesador, memoria, disco, placa base, periféricos. Se puede tocar.", tone: "info" },
        right: { title: "Software", text: "Los **programas** e instrucciones que se ejecutan: sistema operativo, aplicaciones, firmware. No se toca; se instala y se ejecuta.", tone: "key" } },
      { kind: "text", text: "Un sistema informático sigue el esquema **entrada → procesamiento → salida**, con **almacenamiento** de datos y programas en el medio." },
    ], undefined, "stack"),
    slide("componentes", "Componentes y funciones", [
      { kind: "text", text: "Explora cada componente: qué hace, con qué se conecta y a qué parte del esquema pertenece." },
    ], tool("ordenador-componentes-explorador", { n: 0 }), "visual-top"),
    slide("cpu", "Cómo ejecuta una CPU un programa", [
      { kind: "text", text: "La CPU repite sin parar el **ciclo de instrucción**: captar la instrucción de la memoria, decodificarla y ejecutarla. La **frecuencia** (GHz) indica cuántos ciclos de reloj por segundo." },
      { kind: "facts", items: [
        { tex: "1\\ \\text{GHz} = 10^{9}\\ \\text{ciclos/s}" },
        { tex: "\\text{más núcleos} \\Rightarrow \\text{más tareas a la vez}" },
      ] },
    ], anim("ciclo-instruccion"), "split"),
    slide("memorias", "Memoria RAM y almacenamiento", [
      { kind: "compare",
        left: { title: "RAM", text: "Rápida, **volátil** (se borra al apagar) y de acceso aleatorio. Guarda lo que se está usando ahora.", tone: "info" },
        right: { title: "SSD / HDD", text: "Más lenta, **no volátil** y de mayor capacidad. Guarda archivos y programas de forma permanente.", tone: "key" } },
      { kind: "text", text: "Jerarquía de memorias: **registros** (muy rápidos, minúsculos) → **caché** → **RAM** → **SSD/HDD**. Cuanto más rápida, más cara y más pequeña." },
    ]),
    slide("recorrido", "El viaje de un dato", [
      { kind: "text", text: "Sigue una pulsación de tecla desde el teclado hasta la pantalla y el disco. Avanza paso a paso e identifica si cada parada es entrada, procesamiento, almacenamiento o salida." },
    ], tool("ordenador-componentes-explorador", { n: 1 }), "visual-top"),
    calc("calc-ghz", "Ciclos de reloj", "Un procesador funciona a $3$ GHz. ¿Cuántos miles de millones de ciclos de reloj ejecuta por segundo?",
      nums(3), "$3\\ \\text{GHz} = 3\\cdot 10^{9}$ ciclos por segundo, es decir, 3 mil millones.", "1 GHz = mil millones de Hz."),
    sort("clasifica-comp", "Entrada, proceso, almacenamiento o salida", "Clasifica cada componente.",
      [["ent", "Entrada", "emerald"], ["pro", "Procesamiento", "amber"], ["alm", "Almacenamiento", "cobalt"], ["sal", "Salida", "violet"]],
      [["Teclado", "ent"], ["Micrófono", "ent"], ["CPU", "pro"], ["GPU", "pro"], ["SSD", "alm"], ["Memoria RAM", "alm"], ["Monitor", "sal"], ["Altavoces", "sal"]],
      "Los periféricos de entrada introducen datos; CPU y GPU los procesan; RAM y discos los almacenan; monitor y altavoces los presentan.",
    ),
    pick("check-ram", "Volátil o permanente", "Escribes un documento y se va la luz antes de guardarlo. ¿Dónde estaba el contenido?",
      "En la memoria RAM, que es volátil y se borra al perder la alimentación",
      [["En el disco SSD, que se borra sin corriente", "El SSD es no volátil: conserva los datos sin energía."], ["En la CPU, que lo guarda para siempre", "La CPU solo guarda datos mientras los procesa."], ["En el monitor", "El monitor solo muestra la imagen; no almacena el documento."]],
      "Lo que no se ha guardado en disco vive solo en la RAM, que pierde su contenido sin alimentación.",
    ),
    pick("check-sw", "¿Hardware o software?", "¿Cuál de estas cosas es software?",
      "El sistema operativo",
      [["La placa base", "Es un componente físico."], ["El disco duro", "Es hardware; lo que contiene (archivos, programas) puede ser software o datos."], ["La tarjeta gráfica", "Es hardware."]],
      "El software es el conjunto de programas; el hardware, los componentes físicos que los ejecutan.",
    ),
  ],
};
