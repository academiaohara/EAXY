import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const fasesProyectoTecnologicoLesson: InteractiveLesson = {
  slug: "fases-proyecto-tecnologico",
  title: "5. Las fases del proyecto tecnológico",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("idea", "Un método para resolver problemas", [
      { kind: "definition", text: "El **proceso tecnológico** es el método ordenado que se sigue para pasar de un problema a una solución construida y probada." },
      { kind: "text", text: "Seguir las fases evita improvisar: se gasta menos material, se ahorra tiempo y se detectan los fallos antes de construir." },
    ], undefined, "stack"),
    slide("ciclo", "Las siete fases", [
      { kind: "text", text: "Observa el recorrido completo. Fíjate en la última flecha: **si el resultado no es bueno, se vuelve atrás**." },
    ], anim("fases-proyecto-eso"), "text-top"),
    slide("documentar", "Documentar todo el proceso", [
      { kind: "steps", items: [
        "**Boceto y planos** de las ideas y del diseño final.",
        "**Lista de materiales** y herramientas.",
        "**Registro del trabajo**: qué se hizo, quién y cuándo.",
        "**Memoria técnica**: documento que resume el problema, las soluciones, el proceso y las conclusiones.",
      ] },
      { kind: "text", text: "Documentar permite repetir el proyecto, que otros lo entiendan y que tú mismo recuerdes por qué tomaste cada decisión." },
    ]),
    sort("ordena-fase", "¿En qué fase estamos?", "Coloca cada acción en la fase del proyecto a la que pertenece.",
      [["dis", "Diseño", "amber"], ["pla", "Planificación", "emerald"], ["con", "Construcción", "cobalt"], ["eva", "Evaluación", "violet"]],
      [["Dibujar tres ideas distintas", "dis"], ["Elegir la mejor idea con una tabla", "dis"], ["Repartir tareas y fijar el calendario", "pla"], ["Calcular el presupuesto", "pla"], ["Cortar y lijar las piezas", "con"], ["Ensamblar con cola y tornillos", "con"], ["Comprobar si aguanta el peso previsto", "eva"], ["Anotar los fallos detectados", "eva"]],
      "Diseñar es crear y elegir ideas; planificar, organizar recursos y tiempo; construir, fabricar; evaluar, comprobar si cumple los requisitos.",
    ),
    pick("check-orden", "El orden importa", "Un grupo empieza a cortar la madera sin haber dibujado el diseño ni calculado las medidas. ¿Qué es lo más probable que ocurra?",
      "Que haya errores, desperdicio de material y que haya que repetir piezas",
      [["Que ahorren tiempo sin ningún problema", "Saltarse fases suele costar más tiempo en errores y repeticiones."], ["Que el diseño salga perfecto por casualidad", "Sin medidas ni plano, es muy poco probable."], ["Que no necesiten evaluar después", "Siempre hay que comprobar si la solución cumple lo pedido."]],
      "Diseñar y planificar antes de construir evita errores y ahorra material y tiempo.",
    ),
    pick("check-vuelta", "Volver atrás", "Al probar el prototipo, el soporte se vence cuando se cuelgan las mochilas. ¿Qué debe hacer el equipo?",
      "Volver a la fase de diseño o construcción para reforzarlo y probarlo de nuevo",
      [["Darlo por terminado porque ya está construido", "No cumple el requisito de aguantar el peso."], ["Tirarlo y abandonar el proyecto", "El fallo es información útil para mejorar."], ["Cambiar el enunciado para que el fallo no importe", "Hay que mejorar la solución, no ocultar el problema."]],
      "El proceso tecnológico es cíclico: se evalúa, se detectan fallos y se vuelve a la fase necesaria hasta que la solución funciona.",
    ),
  ],
};
