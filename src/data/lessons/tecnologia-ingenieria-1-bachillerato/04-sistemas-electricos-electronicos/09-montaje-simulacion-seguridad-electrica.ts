import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const montajeSimulacionSeguridadElectricaLesson: InteractiveLesson = {
  slug: "montaje-simulacion-seguridad-electrica",
  title: "9. Montaje, simulación y seguridad eléctrica",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("flujo", "De la teoría al montaje", [
      { kind: "steps", items: [
        "**Esquema** del circuito con todos los valores.",
        "**Cálculos** previos: corrientes, potencias, valores de resistencia normalizados.",
        "**Simulación**: comprueba el comportamiento antes de gastar componentes.",
        "**Montaje** en placa de pruebas (protoboard), de la fuente al final y con la alimentación apagada.",
        "**Medidas** con el multímetro y comparación con lo calculado y simulado.",
        "**Corrección** de las diferencias (tolerancias, errores de cableado).",
      ] },
      { kind: "warning", title: "Simulación no es medición", text: "Un simulador usa modelos ideales. Las resistencias reales tienen tolerancia (±5 %), las pilas tienen resistencia interna y los cables también resisten. Hay que comprobar con medidas reales." },
    ], undefined, "stack"),
    slide("seguridad", "Seguridad eléctrica", [
      { kind: "steps", title: "Reglas básicas", items: [
        "Trabaja siempre con **baja tensión** (pilas, fuentes de 5–12 V) en el aula. Nunca abras ni manipules la red de 230 V.",
        "**Desconecta** la alimentación antes de cambiar el montaje.",
        "Comprueba la **polaridad** y los valores antes de conectar.",
        "Evita **cortocircuitos**: cables pelados cruzados, herramientas metálicas sobre la placa.",
        "Si algo huele a quemado, **desconecta** primero y pregunta después.",
      ] },
      { kind: "compare",
        left: { title: "Baja tensión (< 50 V)", text: "Riesgo bajo para las personas, pero puede quemar componentes o cables si hay cortocircuito.", tone: "ok" },
        right: { title: "230 V de la red", text: "Peligro real de electrocución. Protegen el diferencial, el magnetotérmico y la toma de tierra.", tone: "warn" } },
    ]),
    slide("reto", "Reto: encender LED con seguridad", [
      { kind: "text", text: "Diseña un circuito con LED rojos ($V_f \\approx 2$ V) en serie con una resistencia. Criterios de éxito: **8 a 20 mA**, **potencia en la resistencia ≤ 0,25 W** y fuente mayor que la suma de umbrales. Prueba combinaciones." },
    ], tool("reto-led-explorador", { a: 9, b: 1 }), "visual-top"),
    slide("fallos", "Fallos típicos y cómo detectarlos", [
      { kind: "steps", items: [
        "**Contacto flojo** en la placa de pruebas: medidas intermitentes. Reinserta el componente.",
        "**Polaridad invertida** en LED, condensador electrolítico o pila: no funciona o se daña.",
        "**Resistencia equivocada**: comprueba el código de colores o mide con el óhmetro sin alimentación.",
        "**Pila baja**: la tensión medida cae al conectar la carga.",
      ] },
      { kind: "text", text: "Método: comprueba **alimentación → continuidad → polaridad → valores**, de la fuente hacia el receptor." },
    ]),
    calc("calc-3led", "Tres LED en serie", "Se montan $3$ LED de $V_f = 2$ V en serie con una fuente de $12$ V. Se quiere $I = 20$ mA. ¿Qué resistencia, en Ω?",
      nums(300), "$R = (12 - 3\\cdot 2)/0{,}020 = 6/0{,}020 = 300\\ \\Omega$.", "Las tensiones umbral se suman."),
    calc("calc-pot", "Potencia en la resistencia", "Esa resistencia de $300\\ \\Omega$ con $20$ mA disipa $P = I^2 R$. ¿Cuántos mW?",
      nums(120), "$P = (0{,}02)^2\\cdot 300 = 0{,}12$ W $= 120$ mW. Una resistencia de ¼ W (250 mW) es suficiente.", "I en amperios y R en ohmios dan vatios."),
    sort("clasifica-seg", "¿Seguro o peligroso?", "Clasifica cada práctica.",
      [["seg", "Buena práctica", "emerald"], ["pel", "Práctica peligrosa", "amber"]],
      [["Apagar la fuente antes de modificar el montaje", "seg"], ["Comprobar la polaridad antes de conectar", "seg"], ["Usar pilas o fuentes de baja tensión en el aula", "seg"], ["Abrir un enchufe de la red para sacar cables", "pel"], ["Cambiar componentes con el circuito encendido", "pel"], ["Dejar herramientas metálicas sobre la placa conectada", "pel"]],
      "La prudencia consiste en cortar la alimentación antes de manipular, verificar antes de conectar y no tocar nunca la red de 230 V.",
    ),
    pick("check-sim", "Simulado y medido", "El simulador da 15 mA y el multímetro mide 13,8 mA. ¿Cuál es la explicación más razonable?",
      "Las tolerancias de los componentes y la resistencia interna de la pila, que el modelo ideal ignora",
      [["El simulador está mal siempre", "Los simuladores son útiles: solo usan modelos ideales."], ["El multímetro es poco fiable", "Es un instrumento de medida; la diferencia tiene explicación física."], ["La corriente cambia de sentido", "Es corriente continua: no cambia de sentido."]],
      "Una diferencia pequeña entre simulación y medida es normal por tolerancias (±5 %), resistencias internas y de contacto.",
    ),
    slide("proyecto", "Proyecto del tema", [
      { kind: "text", text: "**Proyecto integrador**: diseña y simula un circuito de control sencillo (por ejemplo, un indicador luminoso de nivel con un LED y un transistor o una alarma de apertura de puerta)." },
      { kind: "steps", title: "Entregable", items: [
        "Esquema con todos los valores y la fuente de alimentación.",
        "Cálculos: corrientes, potencias, valor de las resistencias normalizadas.",
        "Tabla de tensiones e intensidades esperadas (y medidas, si se monta).",
        "Análisis de seguridad: fusible, polaridad, límite de potencia.",
        "Conclusión: qué cumple y qué mejorarías.",
      ] },
    ], undefined, "stack"),
  ],
};
