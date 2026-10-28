import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cicloVidaSeguridadMateriales4esoLesson: InteractiveLesson = {
  slug: "ciclo-vida-seguridad-materiales-4eso",
  title: "7. Ciclo de vida de los materiales, seguridad y prevención",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la mina al reciclado", [
      { kind: "steps", items: [
        "El **análisis del ciclo de vida (ACV)** estudia el impacto de un producto desde la **extracción** de la materia prima hasta su **fin de vida**.",
        "Fases: **extracción → fabricación → transporte → uso → fin de vida** (reutilizar, reciclar, valorizar o depositar).",
        "A veces la fase de **uso** pesa más que la fabricación (un coche, un electrodoméstico).",
        "La **energía incorporada** de un material baja mucho si se usa **material reciclado**.",
      ] },
    ], undefined, "stack"),
    slide("ciclo", "Las fases", [
      { kind: "text", text: "Reparte el impacto de un producto entre sus fases y descubre cuál pesa más." },
    ], tool("eso2-ciclo-vida-fases-explorador"), "visual-top"),
    slide("energia", "Energía y reciclado", [
      { kind: "text", text: "Compara la energía de fabricar con material virgen y con material reciclado." },
    ], tool("eso3-impacto-material-explorador"), "visual-top"),
    slide("riesgos", "Seguridad en el taller", [
      { kind: "text", text: "Antes de trabajar se evalúa cada peligro: probabilidad por gravedad." },
    ], tool("eso3-riesgos-explorador"), "visual-top"),
    slide("norm", "Normas y etiquetas", [
      { kind: "steps", items: [
        "**Marcado CE**: el producto cumple las normas europeas de seguridad.",
        "**Pictogramas de peligro** (inflamable, corrosivo, tóxico) en productos químicos: se leen **antes** de usarlos.",
        "**EPI**: gafas, guantes y mascarilla según la tarea.",
        "**Fichas de seguridad** de los materiales y resinas; trabajar con **ventilación** y con **supervisión**.",
      ] },
    ]),
    calc("calc-ahorro", "Ahorro de energía", "Fabricar aluminio nuevo cuesta unos 170 MJ/kg y reciclado, unos 10 MJ/kg. Para 5 kg, ¿cuántos MJ se ahorran?", nums(800), "(170 − 10) · 5 = 800 MJ.", "Diferencia por kilos."),
    calc("calc-riesgo", "Valor del riesgo", "Una tarea tiene probabilidad 4 y gravedad 3. ¿Cuánto vale el riesgo (probabilidad × gravedad)?", nums(12), "4 · 3 = 12: riesgo medio.", "Multiplica probabilidad por gravedad."),
    sort("clasifica-fase", "¿En qué fase?", "Relaciona cada hecho con la fase del ciclo de vida.",
      [["ext", "Extracción y fabricación", "amber"], ["uso", "Uso", "cobalt"], ["fin", "Fin de vida", "emerald"]],
      [["Minería del mineral de hierro", "ext"], ["Fundición del acero", "ext"], ["Consumo eléctrico de un electrodoméstico", "uso"], ["Mantenimiento y reparaciones", "uso"], ["Separar los materiales para reciclar", "fin"], ["Reutilizar piezas de un aparato viejo", "fin"]],
      "Cada fase aporta una parte del impacto.",
    ),
    pick("check-acv", "Reducir el impacto", "Un electrodoméstico gasta el 85 % de su impacto durante el uso. ¿Dónde se logra mayor mejora?",
      "En reducir el consumo de energía durante el uso (eficiencia)",
      [["En reducir el embalaje solamente", "Pesa muy poco."], ["En cambiar el color", "No cambia el impacto."], ["En fabricarlo más lejos", "Empeoraría el transporte."]],
      "Hay que actuar donde está la mayor parte del impacto.",
    ),
  ],
};
