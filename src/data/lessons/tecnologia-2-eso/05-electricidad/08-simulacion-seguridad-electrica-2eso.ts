import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const simulacionSeguridadElectrica2esoLesson: InteractiveLesson = {
  slug: "simulacion-seguridad-electrica-2eso",
  title: "8. Simulación, montaje y seguridad eléctrica",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("simula", "Probar antes de montar", [
      { kind: "definition", text: "Un **simulador de circuitos** permite montar y medir un circuito en el ordenador sin riesgos y sin gastar componentes. Sirve para comprobar el diseño **antes** de montarlo." },
      { kind: "steps", items: [
        "**Simuladores** gratuitos como Tinkercad Circuits o PhET permiten colocar componentes, conectar cables y medir con polímetros virtuales.",
        "Primero se hace el **esquema**, se **calcula** lo esperado con la ley de Ohm y luego se **compara** con la simulación.",
        "Después se **monta** en una placa de prototipos o sobre un panel con el circuito desconectado.",
      ] },
    ], undefined, "stack"),
    slide("averias", "Diagnosticar una avería", [
      { kind: "text", text: "Cada avería deja una huella en las medidas. Elige una y observa tensión e intensidad." },
    ], tool("eso2-fallo-explorador"), "visual-top"),
    slide("seguridad", "Seguridad eléctrica", [
      { kind: "steps", items: [
        "En el aula trabajamos con **pilas y fuentes de baja tensión** (hasta 24 V): no son peligrosas.",
        "La red doméstica (**230 V**) **sí es peligrosa**: nunca se manipula.",
        "Se monta **siempre sin alimentación** y se conecta al final.",
        "Un **fusible** o un **magnetotérmico** corta si la corriente supera un valor seguro; el **diferencial** protege a las personas.",
        "Nunca con las manos mojadas ni con cables pelados.",
      ] },
    ]),
    slide("casos", "Situaciones de riesgo", [
      { kind: "text", text: "Decide qué hacer en cada situación." },
    ], tool("seguridad-electrica-explorador"), "visual-top"),
    calc("calc-fusible", "Elegir un fusible", "Un secador de 2 300 W se conecta a 230 V. ¿Qué intensidad consume, en A?", nums(10), "I = P / V = 2 300 / 230 = 10 A. El fusible debe soportar algo más de 10 A.", "I = P / V."),
    sort("clasifica-seg", "¿Seguro o peligroso?", "Clasifica cada acción.",
      [["seg", "Seguro", "emerald"], ["pel", "Peligroso", "rose"]],
      [["Montar el circuito con la pila desconectada", "seg"], ["Usar cables con la funda en buen estado", "seg"], ["Pedir ayuda al profesor si algo huele a quemado", "seg"], ["Tocar un enchufe con las manos mojadas", "pel"], ["Meter un clavo en un enchufe", "pel"], ["Abrir un cargador conectado a la red", "pel"]],
      "La seguridad eléctrica se basa en baja tensión, montajes desconectados y no tocar la red doméstica.",
    ),
    pick("check-corto", "Cortocircuito", "¿Por qué es peligroso un cortocircuito?",
      "La resistencia es casi nula y la corriente enorme calienta los cables",
      [["Porque la tensión se hace cero y no hay riesgo", "La corriente es lo peligroso."], ["Porque la lámpara luce demasiado", "La lámpara queda anulada."], ["Porque la pila se carga", "La pila se descarga rápidamente."]],
      "Con R casi nula, I = V / R se dispara; por eso se usan fusibles y magnetotérmicos.",
    ),
  ],
};
