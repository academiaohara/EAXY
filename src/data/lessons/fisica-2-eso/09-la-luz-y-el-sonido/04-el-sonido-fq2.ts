import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elSonidoFq2Lesson: InteractiveLesson = {
  slug: "el-sonido-fq2",
  title: "4. El sonido",
  subtitle: FQ2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una onda mecánica", [
      { kind: "steps", items: [
        "El **sonido** se produce por una **vibración** (cuerda, membrana, cuerdas vocales) que se **propaga** en forma de **onda** a través de un medio.",
        "Es una **onda mecánica**: necesita un **medio material** (sólido, líquido o gas). En el **vacío no se propaga**.",
        "Es una onda **longitudinal**: las partículas del medio vibran en la misma dirección en que avanza la onda.",
        "Llega a nuestro oído, donde el **tímpano** vibra y el cerebro interpreta la señal.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Frecuencia, amplitud y medio", [
      { kind: "text", text: "Cambia la frecuencia, la amplitud y el medio. Observa la onda, la velocidad y la longitud de onda." },
    ], tool("fq2-onda-sonido-explorador"), "visual-top"),
    slide("cual", "Cualidades del sonido", [
      { kind: "steps", items: [
        "**Tono**: depende de la **frecuencia** (Hz). Frecuencia alta → sonido **agudo**; baja → **grave**.",
        "**Intensidad** (volumen): depende de la **amplitud**. Más amplitud → sonido **más fuerte**.",
        "**Timbre**: nos permite distinguir un instrumento de otro aunque toquen la misma nota.",
        "El oído humano oye entre unos **20 Hz y 20 000 Hz**. Por debajo están los **infrasonidos** y por encima los **ultrasonidos**.",
      ] },
    ]),
    slide("vel", "Velocidad y eco", [
      { kind: "steps", items: [
        "La velocidad del sonido en el **aire** es de unos **343 m/s** a 20 °C; en el **agua**, unos **1 500 m/s**; en el **acero**, unos **5 000 m/s**.",
        "La luz es mucho más rápida: por eso vemos el **relámpago** antes de oír el **trueno**.",
        "El **eco** es el sonido que se **refleja** en un obstáculo y vuelve. Para oírlo separado, el obstáculo debe estar a más de unos **17 m**.",
        "Los murciélagos y los delfines usan la **ecolocalización** para orientarse.",
      ] },
    ]),
    calc("calc-eco", "Distancia al obstáculo", "Gritas y oyes el eco 2 s después. El sonido va a 340 m/s. ¿A qué distancia está el obstáculo, en m?", nums(340), "El sonido va y vuelve: d = 340 · 2 / 2 = 340 m.", "Divide entre 2 la distancia total recorrida."),
    calc("calc-lambda", "Longitud de onda", "Una nota de 340 Hz se propaga en el aire a 340 m/s. ¿Cuánto vale su longitud de onda, en m? (λ = v / f)", nums(1), "λ = 340 / 340 = 1 m.", "Divide la velocidad entre la frecuencia."),
    calc("calc-trueno", "Distancia a la tormenta", "Oyes un trueno 3 s después de ver el relámpago. El sonido va a 340 m/s. ¿A qué distancia cayó el rayo, en m? (ignora el tiempo de la luz)", nums(1020), "d = 340 · 3 = 1020 m.", "Multiplica velocidad por tiempo."),
    sort("clasifica", "Tono o intensidad", "Asocia cada característica con la cualidad del sonido que describe.",
      [["to", "Tono (frecuencia)", "cobalt"], ["in", "Intensidad (amplitud)", "amber"]],
      [["Grave o agudo", "to"], ["Se mide en hercios", "to"], ["Una flauta frente a un bombo", "to"], ["Fuerte o débil", "in"], ["Se relaciona con el volumen", "in"], ["Gritar frente a susurrar", "in"]],
      "Frecuencia → tono; amplitud → intensidad.",
    ),
    pick("check", "En el espacio", "¿Por qué en el espacio no se oyen las explosiones?",
      "Porque en el vacío el sonido no se propaga",
      [["Porque la luz va más rápido", "No es la causa."], ["Porque hace mucho frío", "No es la causa."], ["Porque el sonido es muy débil", "Es que no hay medio."]],
      "El sonido necesita un medio material.",
    ),
  ],
};
