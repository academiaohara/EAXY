import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sonidoFq4Lesson: InteractiveLesson = {
  slug: "sonido-fq4",
  title: "3. El sonido",
  subtitle: FQ4_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es el sonido", [
      { kind: "steps", items: [
        "El **sonido** es una onda **mecánica longitudinal**: un cuerpo que vibra produce **compresiones y enrarecimientos** del medio que se propagan.",
        "**Necesita un medio** (aire, agua, sólidos): no se propaga en el vacío.",
        "El oído humano capta frecuencias de **20 Hz a 20 000 Hz**. Por debajo: **infrasonidos** (elefantes, terremotos); por encima: **ultrasonidos** (murciélagos, delfines, ecografías).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cualidades del sonido", [
      { kind: "text", text: "Cambia el medio, la frecuencia y la distancia. ¿En qué medio es más rápido el sonido? ¿Cuándo se oye el eco?" },
    ], tool("fq4-sonido-explorador"), "visual-top"),
    slide("cual", "Cualidades", [
      { kind: "steps", items: [
        "**Tono**: depende de la **frecuencia** (grave: baja f; agudo: alta f).",
        "**Intensidad** (volumen): depende de la **amplitud**; se mide en **decibelios (dB)**.",
        "**Timbre**: permite distinguir dos instrumentos con el mismo tono; depende de los armónicos que acompañan a la nota.",
        "La **velocidad** en el aire a 20 °C es de **343 m/s**; en el agua ≈ 1480 m/s; en el acero ≈ 5000 m/s.",
      ] },
    ], undefined, "stack"),
    slide("fen", "Fenómenos del sonido", [
      { kind: "steps", items: [
        "**Reflexión**: el sonido rebota en superficies. Si el obstáculo está a más de ≈ **17 m**, se oye el **eco** (≥ 0,1 s después); si no, **reverberación**.",
        "**Refracción**: cambia de dirección al pasar de un medio a otro.",
        "**Absorción**: materiales porosos (corcho, cortinas) absorben el sonido y se usan para **aislar**.",
        "**Sonar y ecografía**: miden distancias o imágenes con el **eco** de ultrasonidos: **d = v·t/2**.",
      ] },
    ], undefined, "stack"),
    calc("calc-eco", "Eco", "Se oye el eco de un grito 2 s después. ¿A qué distancia está el obstáculo, en m? (v = 340 m/s)", nums(340), "d = v·t/2 = 340·2/2 = 340 m.", "El sonido va y vuelve."),
    calc("calc-tormenta", "Distancia de un rayo", "Se oye un trueno 3 s después de ver el relámpago. ¿A qué distancia cayó el rayo, en m? (v = 340 m/s; la luz se supone instantánea)", nums(1020), "d = 340·3 = 1020 m.", "d = v·t."),
    calc("calc-lambda", "Longitud de onda del sonido", "Un sonido de 680 Hz viaja a 340 m/s. ¿Qué longitud de onda tiene, en m?", nums(0.5), "λ = v/f = 340/680 = 0,5 m.", "λ = v/f."),
    sort("clasifica", "Cualidad del sonido", "¿Qué cualidad cambia en cada caso?",
      [["ton", "Tono", "cobalt"], ["int", "Intensidad", "rose"], ["tim", "Timbre", "emerald"]],
      [["Subir el volumen de la radio", "int"], ["Una nota más aguda", "ton"], ["Distinguir una guitarra de un piano tocando la misma nota", "tim"], ["Alejarse del altavoz", "int"], ["Una voz grave frente a una aguda", "ton"], ["Reconocer la voz de un amigo", "tim"]],
      "Tono: frecuencia. Intensidad: amplitud. Timbre: forma de la onda.",
    ),
    pick("check", "Velocidad", "¿En qué medio se propaga más rápido el sonido?",
      "En un sólido, como el acero",
      [["En el aire", "Es el más lento de los tres."], ["En el vacío", "No se propaga."], ["Es igual en todos", "Depende del medio."]],
      "Más rígido y denso en partículas: más rápido.",
    ),
  ],
};
