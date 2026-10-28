import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aplicacionesInteligenciaArtificialLesson: InteractiveLesson = {
  slug: "aplicaciones-inteligencia-artificial",
  title: "5. Aplicaciones sencillas e inteligencia artificial",
  subtitle: TECESO1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("apps", "Aplicaciones para ordenador y móvil", [
      { kind: "definition", text: "Una **aplicación** es un programa para una tarea concreta. Se compone de una **interfaz** (botones, pantallas, imágenes) y de una **lógica** (lo que ocurre cuando el usuario hace algo)." },
      { kind: "text", text: "Con herramientas de **programación por bloques** (App Inventor, Scratch) puedes crear aplicaciones sencillas para móvil u ordenador sin escribir código." },
    ], undefined, "stack"),
    slide("eventos", "Eventos y acciones", [
      { kind: "text", text: "Una aplicación espera **eventos** (un toque, un sensor, un temporizador) y ejecuta **acciones**. Provoca cada evento y mira qué ocurre en la app." },
    ], tool("app-eventos-explorador"), "visual-top"),
    slide("ia", "Qué es la inteligencia artificial", [
      { kind: "definition", text: "La **inteligencia artificial (IA)** es el conjunto de técnicas con las que un programa realiza tareas que normalmente requieren inteligencia humana: reconocer imágenes y voz, traducir, recomendar o conversar." },
      { kind: "steps", items: [
        "Muchos sistemas de IA **aprenden de ejemplos**: se les muestra una gran cantidad de datos y encuentran patrones.",
        "**No entienden** el mundo como las personas: calculan probabilidades.",
        "Se usa en asistentes de voz, traductores, filtros de correo o recomendaciones.",
      ] },
    ]),
    slide("entrena", "Entrena un clasificador", [
      { kind: "text", text: "El programa aprende a distinguir manzanas de plátanos por su longitud y su color. Dale más ejemplos y luego prueba con datos sesgados." },
    ], tool("clasificador-ia-explorador", { a: 2 }), "visual-top"),
    slide("uso", "Uso responsable", [
      { kind: "steps", items: [
        "**Sesgos**: si los datos de entrenamiento no representan a todos, el sistema puede tratar peor a algunas personas.",
        "**Errores**: la IA se equivoca y a veces «inventa» respuestas. Hay que **verificar** lo que dice.",
        "**Privacidad**: los datos que le das pueden guardarse.",
        "**Trabajo propio**: usar la IA para copiar un trabajo y presentarlo como tuyo es un engaño.",
        "Se usa como **ayuda**, no como sustituto de pensar y aprender.",
      ] },
    ]),
    sort("clasifica-ia", "¿Buen uso de la IA?", "Decide si cada uso es responsable.",
      [["bue", "Uso responsable", "emerald"], ["mal", "Uso irresponsable", "rose"]],
      [["Pedir ideas y revisar después la información en fuentes fiables", "bue"], ["Usar un traductor para entender un texto y comprobarlo", "bue"], ["Copiar una respuesta y entregarla como trabajo propio", "mal"], ["Compartir tus datos personales con un chat sin pensarlo", "mal"]],
      "La IA es una herramienta: se usa con espíritu crítico, citándola y protegiendo tus datos.",
    ),
    pick("check-sesgo", "Datos sesgados", "Un sistema de reconocimiento se entrena casi solo con fotos de manzanas y luego falla con los plátanos. ¿Cuál es la causa?",
      "Los datos de entrenamiento no representaban a todas las clases: eran sesgados",
      [["El ordenador está estropeado", "El fallo viene de los datos, no del equipo."], ["Los plátanos no existen en el mundo real", "Existen; no estaban en el entrenamiento."], ["La IA nunca se equivoca", "Se equivoca, sobre todo con datos pobres o sesgados."]],
      "Un modelo solo aprende lo que ve: datos equilibrados y variados dan mejores resultados.",
    ),
  ],
};
