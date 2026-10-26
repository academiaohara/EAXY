import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const diodosLed3esoLesson: InteractiveLesson = {
  slug: "diodos-led-3eso",
  title: "3. El diodo y el LED",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Una válvula para la corriente", [
      { kind: "text", text: "Observa cómo un diodo deja pasar la corriente solo en un sentido." },
    ], anim("eso3-diodo-sentido"), "text-top"),
    slide("def", "Diodo y LED", [
      { kind: "steps", items: [
        "El **diodo** es un componente **con polaridad**: ánodo (+) y cátodo (−).",
        "Conduce en **polarización directa** si la tensión supera su **umbral** (≈ 0,7 V en silicio).",
        "El **LED** (diodo emisor de luz) brilla al conducir; su tensión directa depende del color (rojo ≈ 2 V, azul ≈ 3 V).",
        "Un LED soporta unos **20 mA**: sin limitar la corriente, se funde.",
      ] },
    ], undefined, "stack"),
    slide("calc", "Calcula la resistencia de un LED", [
      { kind: "rule", title: "Resistencia limitadora", text: "Se resta a la tensión de la pila la tensión del LED y se divide entre la corriente deseada.", formula: "R = (V − Vf) / I" },
      { kind: "text", text: "Elige el color del LED, la pila y la corriente." },
    ], tool("eso3-led-resistencia-explorador"), "visual-top"),
    slide("usos", "Aplicaciones del diodo", [
      { kind: "steps", items: [
        "**Señalización**: LED de estado, pantallas, semáforos y alumbrado.",
        "**Protección**: un diodo en paralelo con un motor o relé evita picos de tensión.",
        "**Rectificación**: convierte la corriente alterna en continua en los cargadores.",
      ] },
    ]),
    calc("calc-rled", "Resistencia del LED rojo", "Un LED rojo (Vf = 2 V) se alimenta con una pila de 9 V y debe pasar 10 mA. ¿Qué resistencia necesita, en Ω?", nums(700), "R = (9 − 2) / 0,010 = 700 Ω.", "R = (V − Vf) / I, con la corriente en amperios."),
    calc("calc-e12", "Valor normalizado", "No existe una resistencia de 700 Ω. Del valor normalizado inmediatamente superior (680, 820…), ¿cuál eliges, en Ω?", nums(820), "El siguiente valor de la serie E12 que no baja de 700 Ω es 820 Ω; así la corriente es algo menor de 10 mA.", "Busca el valor superior más cercano."),
    sort("clasifica-diodo", "¿Conduce?", "Decide si el diodo conduce en cada situación.",
      [["con", "Conduce", "emerald"], ["no", "No conduce", "rose"]],
      [["Ánodo al positivo y cátodo al negativo (con tensión suficiente)", "con"], ["LED conectado correctamente con resistencia", "con"], ["Polarización directa superior a 0,7 V", "con"], ["Ánodo al negativo y cátodo al positivo", "no"], ["Polarización directa de solo 0,3 V", "no"], ["LED conectado al revés", "no"]],
      "El diodo conduce solo si está en directa y supera su tensión umbral.",
    ),
    pick("check-led", "Sin resistencia", "Conectas un LED directamente a una pila de 9 V, sin resistencia. ¿Qué ocurre?",
      "Pasa demasiada corriente y el LED se funde",
      [["Brilla más y no pasa nada", "Se daña."], ["No se enciende", "Conduce, pero con exceso de corriente."], ["Se enfría", "Se calienta."]],
      "La resistencia en serie limita la corriente a un valor seguro.",
    ),
  ],
};
