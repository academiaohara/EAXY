import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadElectricaEsoLesson: InteractiveLesson = {
  slug: "seguridad-electrica-eso",
  title: "7. Seguridad eléctrica",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("riesgos", "Por qué es peligrosa la electricidad", [
      { kind: "definition", text: "El cuerpo humano **conduce la corriente**. Si cierra un circuito entre dos puntos de distinta tensión, pasa corriente por él: es una **descarga o electrocución**." },
      { kind: "steps", items: [
        "Una intensidad de unas **decenas de miliamperios** puede provocar contracciones musculares graves y paradas cardíacas.",
        "La **red doméstica (230 V)** es peligrosa. Las pilas de 1,5 o 4,5 V que usas en clase son seguras.",
        "El **agua** y la **humedad** reducen la resistencia de la piel y multiplican el riesgo.",
      ] },
      { kind: "warning", title: "Ojo", text: "Nunca se experimenta con la corriente de la red en el taller o en casa: los montajes de clase se hacen siempre con pilas." },
    ], undefined, "stack"),
    slide("corto", "Cortocircuito y fusibles", [
      { kind: "text", text: "Si la corriente es excesiva los cables se calientan. Mira cómo la limitan los fusibles." },
    ], anim("cortocircuito-fusible"), "split"),
    slide("proteccion", "Dispositivos de protección", [
      { kind: "steps", items: [
        "**Fusible**: un hilo fino que se funde si la corriente es excesiva. Hay que cambiarlo.",
        "**Interruptor magnetotérmico («automático»)**: corta la corriente si hay sobrecarga o cortocircuito y se rearma.",
        "**Interruptor diferencial**: corta la corriente si detecta una fuga, por ejemplo una descarga a través de una persona.",
        "**Toma de tierra**: lleva las derivaciones al suelo para que no pasen por quien toque el aparato.",
      ] },
    ]),
    slide("situaciones", "¿Peligroso o seguro?", [
      { kind: "text", text: "Decide si cada situación es peligrosa o segura. Verás una explicación después de cada respuesta." },
    ], tool("seguridad-electrica-explorador"), "visual-top"),
    slide("normas", "Normas básicas", [
      { kind: "steps", items: [
        "No uses aparatos eléctricos con las manos mojadas ni cerca del agua.",
        "No tires del cable para desenchufar: tira de la clavija.",
        "No introduzcas objetos en los enchufes ni los sobrecargues con muchas regletas.",
        "Sustituye los cables dañados o con el aislante roto.",
        "Desconecta un aparato antes de manipularlo, y no repares nada de la red sin ser profesional.",
        "Si alguien recibe una descarga: **no lo toques**; corta la corriente y llama al 112.",
      ] },
    ]),
    sort("clasifica-riesgo", "Hábito seguro o peligroso", "Clasifica cada hábito.",
      [["seg", "Seguro", "emerald"], ["pel", "Peligroso", "rose"]],
      [["Desenchufar tirando de la clavija", "seg"], ["Manos secas al enchufar", "seg"], ["Tapar los enchufes si hay niños pequeños", "seg"], ["Usar un cable pelado con cinta aislante vieja", "pel"], ["Enchufar muchos aparatos a una regleta", "pel"], ["Secador de pelo junto a la bañera llena", "pel"]],
      "Las costumbres seguras evitan que la corriente pase por el cuerpo o que los cables se sobrecalienten.",
    ),
    pick("check-descarga", "Si alguien se electrocuta", "Un compañero se ha quedado agarrado a un aparato que da descargas. ¿Qué haces?",
      "Cortar la corriente (si es seguro) y avisar al 112 sin tocarlo directamente",
      [["Tirar de él con las manos para separarlo", "Podrías recibir la descarga también."], ["Echarle agua", "El agua conduce la electricidad y empeora la situación."], ["Esperar a ver qué pasa", "Cada segundo cuenta: hay que cortar la corriente y pedir ayuda."]],
      "Primero hay que cortar la corriente y llamar al 112; si no es posible, separar a la persona con un material aislante seco (un palo de madera, por ejemplo).",
    ),
  ],
};
